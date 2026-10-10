import { h, T, TU, root, dropzone, field, select, download, stripExt, fill, pdfjs, canvasBlob, loadImage } from "../common.js";

const { PDFDocument, degrees } = window.PDFLib;
const lib = pdfjs();

let srcBytes = null, pdf = null, name = "", cur = 0, sizes = [], assets = [], items = [], selected = null, renderTask = null;

// ---------- 화면: 올리기 ----------
const drop = dropzone({ accept: "application/pdf,.pdf", multiple: false, onFiles: (f) => load(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop, error);

// ---------- 화면: 서명 만들기 (그리기 / 이미지 / 글자) ----------
const tabBtns = {};
const panels = {};
const tabs = h("div", { class: "chips" }, ["draw", "image", "text"].map((k) => (tabBtns[k] =
  h("button", { class: "chip", type: "button", onclick: () => openTab(k) }, TU["tab_" + k]))));

// 그리기
const pad = h("canvas", { class: "sp-pad" });
const penColor = select([["#111111", TU.black], ["#1f3fbf", TU.blue], ["#c62828", TU.red]]);
const penSize = select([["2", TU.thin], ["3.5", TU.normal], ["6", TU.thick]], "3.5");
const padMsg = h("p", { class: "hint-line" }, TU.padHint);
panels.draw = h("div", { class: "sp-panel", hidden: true },
  h("div", { class: "sp-pad-wrap" }, pad),
  padMsg,
  h("div", { class: "options" }, field(TU.color, penColor), field(TU.size, penSize),
    h("button", { class: "chip", type: "button", onclick: clearPad }, TU.clearPad),
    h("span", { class: "spacer" }),
    h("button", { class: "btn small", type: "button", onclick: addDrawing }, TU.add)));

// 이미지
const imgInput = h("input", { type: "file", accept: "image/png,image/jpeg,image/webp", hidden: true });
const whiteBg = h("input", { type: "checkbox", checked: true });
const imgPreview = h("div", { class: "sp-img-preview checker", hidden: true });
const imgAddBtn = h("button", { class: "btn small", type: "button", hidden: true, onclick: addImage }, TU.add);
const imgMsg = h("div", { class: "error-box", hidden: true });
let imgSource = null, imgCanvas = null;
panels.image = h("div", { class: "sp-panel", hidden: true },
  h("div", { class: "options" },
    h("button", { class: "btn small ghost", type: "button", onclick: () => imgInput.click() }, TU.chooseImg),
    h("label", { class: "field" }, whiteBg, TU.whiteBg), imgInput),
  h("p", { class: "note" }, TU.imgNote),
  imgPreview, imgMsg,
  h("div", { class: "batch-actions" }, imgAddBtn));
imgInput.addEventListener("change", async () => {
  const f = imgInput.files[0];
  imgInput.value = "";
  if (!f) return;
  imgMsg.hidden = true;
  try {
    imgSource = await loadImage(f);
    prepImage();
  } catch (err) {
    console.error(err);
    imgMsg.textContent = TU.badImg;
    imgMsg.hidden = false;
  }
});
whiteBg.addEventListener("change", () => imgSource && prepImage());

// 글자
const textIn = h("input", { type: "text", placeholder: TU.textPh, class: "sp-text-in", maxlength: 80 });
const textColor = select([["#111111", TU.black], ["#1f3fbf", TU.blue], ["#c62828", TU.red]]);
const textBold = h("input", { type: "checkbox", checked: true });
panels.text = h("div", { class: "sp-panel", hidden: true },
  h("div", { class: "options" }, textIn,
    h("button", { class: "chip", type: "button", onclick: () => { textIn.value = [textIn.value.trim(), today()].filter(Boolean).join(" "); textIn.focus(); } }, TU.today)),
  h("div", { class: "options" }, field(TU.color, textColor), h("label", { class: "field" }, textBold, TU.bold),
    h("span", { class: "spacer" }),
    h("button", { class: "btn small", type: "button", onclick: addText }, TU.add)));

// 만든 서명 모음 (눌러서 또 넣기)
const assetRow = h("div", { class: "sp-assets" });
const assetBox = h("div", { class: "sp-asset-box", hidden: true }, h("p", { class: "note" }, TU.mine), assetRow);

// ---------- 화면: 페이지 미리보기 ----------
const canvas = h("canvas", { class: "sp-canvas" });
const overlay = h("div", { class: "sp-overlay" });
const stage = h("div", { class: "sp-stage" }, canvas, overlay);
const pageLabel = h("span", { class: "sp-page-label" });
const prevBtn = h("button", { class: "chip", type: "button", onclick: () => goto(cur - 1) }, "◀ " + TU.prev);
const nextBtn = h("button", { class: "chip", type: "button", onclick: () => goto(cur + 1) }, TU.next + " ▶");
const allBtn = h("button", { class: "chip ghost", type: "button", hidden: true, onclick: copyToAll }, TU.allPages);
const msg = h("div", { class: "error-box", hidden: true });
const saveBtn = h("button", { class: "btn", type: "button", onclick: save }, TU.save);

const editCard = h("div", { class: "tool-card", hidden: true },
  h("p", { class: "sp-step" }, TU.step1), tabs, panels.draw, panels.image, panels.text, assetBox,
  h("p", { class: "sp-step" }, TU.step2),
  h("div", { class: "chips sp-nav" }, prevBtn, pageLabel, nextBtn, h("span", { class: "spacer" }), allBtn),
  stage,
  h("p", { class: "hint-line" }, TU.hint),
  msg,
  h("p", { class: "note center" }, TU.legal),
  h("div", { class: "batch-actions" }, saveBtn,
    h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, editCard);

// ---------- 불러오기 ----------
async function load(file) {
  error.hidden = true;
  let bytes;
  try {
    bytes = new Uint8Array(await file.arrayBuffer());
    await PDFDocument.load(bytes);
    pdf = await lib.getDocument({ data: bytes.slice() }).promise;
  } catch (err) {
    console.error(err);
    error.textContent = TU.encrypted;
    error.hidden = false;
    return;
  }
  srcBytes = bytes;
  name = stripExt(file.name);
  sizes = new Array(pdf.numPages);
  items = [];
  selected = null;
  uploadCard.hidden = true;
  editCard.hidden = false;
  openTab("draw");
  await goto(0);
}

// 페이지 크기(회전 포함, pt) — 저장할 때 좌표 계산에도 써요
async function pageVp(i) {
  if (!sizes[i]) sizes[i] = pdf.getPage(i + 1).then((p) => p.getViewport({ scale: 1 }));
  return sizes[i];
}

async function goto(i) {
  if (!pdf || i < 0 || i >= pdf.numPages) return;
  cur = i;
  selected = null;
  pageLabel.textContent = fill(TU.pageOf, { i: i + 1, n: pdf.numPages });
  prevBtn.disabled = i === 0;
  nextBtn.disabled = i === pdf.numPages - 1;
  const vp1 = await pageVp(i);
  stage.style.setProperty("--ar", vp1.width / vp1.height);
  drawItems();
  await renderPage();
}

async function renderPage() {
  const i = cur;
  const page = await pdf.getPage(i + 1);
  if (i !== cur) return;
  const base = page.getViewport({ scale: 1 });
  const cssW = stage.clientWidth || 800;
  const scale = Math.min(3, (cssW * Math.min(2, window.devicePixelRatio || 1)) / base.width);
  const vp = page.getViewport({ scale });
  renderTask?.cancel();
  const off = document.createElement("canvas");
  off.width = Math.floor(vp.width);
  off.height = Math.floor(vp.height);
  const ctx = off.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, off.width, off.height);
  renderTask = page.render({ canvasContext: ctx, viewport: vp });
  try {
    await renderTask.promise;
  } catch (err) {
    if (err?.name === "RenderingCancelledException") return;
    throw err;
  }
  if (i !== cur) return;
  canvas.width = off.width;
  canvas.height = off.height;
  canvas.getContext("2d").drawImage(off, 0, 0);
}

let resizeTimer;
window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => pdf && renderPage(), 300); });

// ---------- 탭 ----------
function openTab(k) {
  for (const key of Object.keys(panels)) {
    panels[key].hidden = key !== k;
    tabBtns[key].classList.toggle("active", key === k);
  }
  if (k === "draw") setupPad();
  if (k === "text") textIn.focus();
}

// ---------- 그리기 판 ----------
let padReady = false, padDirty = false, last = null;
function setupPad() {
  const w = pad.clientWidth, hgt = pad.clientHeight;
  if (!w) return;
  const dpr = Math.min(3, window.devicePixelRatio || 1);
  if (padReady && pad.width === Math.round(w * dpr)) return;
  pad.width = Math.round(w * dpr);
  pad.height = Math.round(hgt * dpr);
  padReady = true;
  padDirty = false;
}
function padPos(e) {
  const r = pad.getBoundingClientRect();
  return { x: (e.clientX - r.left) * (pad.width / r.width), y: (e.clientY - r.top) * (pad.height / r.height) };
}
pad.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  setupPad();
  pad.setPointerCapture(e.pointerId);
  last = padPos(e);
  const ctx = pad.getContext("2d");
  const lw = +penSize.value * (pad.width / pad.clientWidth);
  ctx.fillStyle = penColor.value;
  ctx.beginPath();
  ctx.arc(last.x, last.y, lw / 2, 0, Math.PI * 2);
  ctx.fill();
  padDirty = true;
});
pad.addEventListener("pointermove", (e) => {
  if (!last) return;
  const p = padPos(e);
  const ctx = pad.getContext("2d");
  ctx.strokeStyle = penColor.value;
  ctx.lineWidth = +penSize.value * (pad.width / pad.clientWidth);
  ctx.lineCap = ctx.lineJoin = "round";
  const mid = { x: (last.x + p.x) / 2, y: (last.y + p.y) / 2 };
  ctx.beginPath();
  ctx.moveTo(last.mx ?? last.x, last.my ?? last.y);
  ctx.quadraticCurveTo(last.x, last.y, mid.x, mid.y);
  ctx.stroke();
  last = { ...p, mx: mid.x, my: mid.y };
});
const endStroke = () => { last = null; };
pad.addEventListener("pointerup", endStroke);
pad.addEventListener("pointercancel", endStroke);

function clearPad() {
  pad.getContext("2d").clearRect(0, 0, pad.width, pad.height);
  padDirty = false;
  padMsg.textContent = TU.padHint;
  padMsg.classList.remove("warn");
}

async function addDrawing() {
  const c = trim(pad);
  if (!padDirty || !c) {
    padMsg.textContent = TU.emptyPad;
    padMsg.classList.add("warn");
    return;
  }
  await addAsset(c, 45);
  clearPad();
}

// ---------- 이미지 ----------
function prepImage() {
  const max = 1600;
  const s = Math.min(1, max / Math.max(imgSource.width, imgSource.height));
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(imgSource.width * s));
  c.height = Math.max(1, Math.round(imgSource.height * s));
  const ctx = c.getContext("2d");
  ctx.drawImage(imgSource, 0, 0, c.width, c.height);
  if (whiteBg.checked) {
    // 종이 색에 가까운 부분을 투명하게 (경계는 부드럽게)
    // 종이가 순백이 아니고 가장자리로 갈수록 어두운 사진도 있어서, 자리마다 주변 종이 밝기와 비교해요
    const d = ctx.getImageData(0, 0, c.width, c.height);
    const p = d.data;
    const bg = paperMap(c);
    for (let y = 0, i = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++, i += 4) {
        const lo = Math.min(p[i], p[i + 1], p[i + 2]);
        if (Math.max(p[i], p[i + 1], p[i + 2]) - lo > 70) continue;   // 빨간 인주처럼 색이 진한 곳은 그대로
        const diff = bg(x, y) - lo;   // 종이보다 얼마나 진한지
        if (diff <= 25) p[i + 3] = 0;
        else if (diff < 60) p[i + 3] = Math.round(p[i + 3] * (diff - 25) / 35);
      }
    }
    ctx.putImageData(d, 0, 0);
  }
  // 옅게 남은 그늘·티끌은 무시하고 도장·서명이 있는 곳만 남기기
  imgCanvas = (whiteBg.checked ? trim(c, 128, 0.004) : trim(c)) || c;
  const view = h("canvas", { class: "sp-img-canvas" });
  view.width = imgCanvas.width;
  view.height = imgCanvas.height;
  view.getContext("2d").drawImage(imgCanvas, 0, 0);
  imgPreview.replaceChildren(view);
  imgPreview.hidden = false;
  imgAddBtn.hidden = false;
}

async function addImage() {
  if (!imgCanvas) return;
  await addAsset(imgCanvas, 70);
  imgCanvas = imgSource = null;
  imgPreview.hidden = true;
  imgAddBtn.hidden = true;
}

// ---------- 글자 (한글 폰트를 PDF에 넣지 않고 그림으로 바꿔서 넣어요) ----------
function today() {
  const d = new Date();
  if (T.lang === "ko") return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

async function addText() {
  const text = textIn.value.trim();
  if (!text) { textIn.focus(); return; }
  const px = 120;
  const font = `${textBold.checked ? 700 : 400} ${px}px "Noto Sans KR", system-ui, sans-serif`;
  try { await document.fonts.load(font, text); } catch {}
  const c = document.createElement("canvas");
  let ctx = c.getContext("2d");
  ctx.font = font;
  c.width = Math.ceil(ctx.measureText(text).width + px * 0.4);
  c.height = Math.ceil(px * 1.6);
  ctx = c.getContext("2d");
  ctx.font = font;
  ctx.fillStyle = textColor.value;
  ctx.textBaseline = "middle";
  ctx.fillText(text, px * 0.2, c.height / 2);
  const t = trim(c);
  if (!t) return;
  // 글자 높이(px)를 기준으로 페이지에서 약 12pt 크기가 되도록
  await addAsset(t, 12 * (t.height / px) * 1.1);
  textIn.value = "";
}

// 자리별 종이 밝기 지도: 사진을 작은 칸(약 1/24)으로 나눠 칸마다 '밝은 쪽 값'(상위 25%)을 종이 밝기로 봐요.
// 도장·글씨는 칸 안에서 일부라 밝은 쪽 값에는 영향이 적어요. 칸 사이는 부드럽게 이어 붙여요.
function paperMap(c) {
  const w = c.width, hgt = c.height;
  const p = c.getContext("2d").getImageData(0, 0, w, hgt).data;
  const cell = Math.max(8, Math.round(Math.max(w, hgt) / 24));
  const gw = Math.ceil(w / cell), gh = Math.ceil(hgt / cell);
  const grid = new Float32Array(gw * gh);
  for (let gy = 0; gy < gh; gy++) {
    for (let gx = 0; gx < gw; gx++) {
      const vals = [];
      for (let y = gy * cell; y < Math.min(hgt, (gy + 1) * cell); y += 2) {
        for (let x = gx * cell; x < Math.min(w, (gx + 1) * cell); x += 2) {
          const i = (y * w + x) * 4;
          vals.push(Math.min(p[i], p[i + 1], p[i + 2]));
        }
      }
      vals.sort((a, b) => a - b);
      grid[gy * gw + gx] = vals[Math.floor(vals.length * 0.75)] ?? 255;
    }
  }
  // 꽉 찬 도장처럼 칸 하나를 통째로 덮은 잉크를 종이로 착각하지 않게, 주변 5×5칸 중 가장 밝은 값을 써요
  const raw = grid.slice();
  for (let gy = 0; gy < gh; gy++) {
    for (let gx = 0; gx < gw; gx++) {
      let m = 0;
      for (let yy = Math.max(0, gy - 2); yy <= Math.min(gh - 1, gy + 2); yy++)
        for (let xx = Math.max(0, gx - 2); xx <= Math.min(gw - 1, gx + 2); xx++) m = Math.max(m, raw[yy * gw + xx]);
      grid[gy * gw + gx] = m;
    }
  }
  return (x, y) => {   // 칸 가운데 기준 양선형 보간
    const fx = Math.min(gw - 1, Math.max(0, x / cell - 0.5)), fy = Math.min(gh - 1, Math.max(0, y / cell - 0.5));
    const x0 = Math.floor(fx), y0 = Math.floor(fy), x1 = Math.min(gw - 1, x0 + 1), y1 = Math.min(gh - 1, y0 + 1);
    const tx = fx - x0, ty = fy - y0;
    const a = grid[y0 * gw + x0], b = grid[y0 * gw + x1], cc = grid[y1 * gw + x0], dd = grid[y1 * gw + x1];
    return (a * (1 - tx) + b * tx) * (1 - ty) + (cc * (1 - tx) + dd * tx) * ty;
  };
}

// 투명한 테두리 잘라내기
// minAlpha 보다 진한 점이 그 줄(가로·세로)에 minFrac 비율 넘게 있어야 '내용'으로 봐요 (흩어진 티끌 무시)
function trim(src, minAlpha = 8, minFrac = 0) {
  const ctx = src.getContext("2d");
  const { width: w, height: hgt } = src;
  if (!w || !hgt) return null;
  const d = ctx.getImageData(0, 0, w, hgt).data;
  const cols = new Uint32Array(w), rows = new Uint32Array(hgt);
  for (let y = 0; y < hgt; y++) {
    for (let x = 0; x < w; x++) {
      if (d[(y * w + x) * 4 + 3] > minAlpha) { cols[x]++; rows[y]++; }
    }
  }
  const colMin = Math.max(1, hgt * minFrac), rowMin = Math.max(1, w * minFrac);
  let x0 = 0, x1 = w - 1, y0 = 0, y1 = hgt - 1;
  while (x0 < w && cols[x0] < colMin) x0++;
  while (x1 >= 0 && cols[x1] < colMin) x1--;
  while (y0 < hgt && rows[y0] < rowMin) y0++;
  while (y1 >= 0 && rows[y1] < rowMin) y1--;
  if (x1 < x0 || y1 < y0) return null;
  const pad2 = 2;
  x0 = Math.max(0, x0 - pad2); y0 = Math.max(0, y0 - pad2);
  x1 = Math.min(w - 1, x1 + pad2); y1 = Math.min(hgt - 1, y1 + pad2);
  const out = document.createElement("canvas");
  out.width = x1 - x0 + 1;
  out.height = y1 - y0 + 1;
  out.getContext("2d").drawImage(src, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
  return out;
}

// ---------- 서명 모음 ----------
async function addAsset(c, heightPt) {
  const blob = await canvasBlob(c, "image/png");
  const asset = {
    bytes: new Uint8Array(await blob.arrayBuffer()),
    url: URL.createObjectURL(blob),
    ratio: c.width / c.height,
    heightPt,
  };
  assets.push(asset);
  assetRow.append(h("button", { class: "sp-asset checker", type: "button", title: TU.addAgain, onclick: () => place(asset) },
    h("img", { alt: "", src: asset.url })));
  assetBox.hidden = false;
  await place(asset);
}

// 지금 보는 페이지 가운데에 놓기 (x,y,w,hh는 페이지 대비 비율 0~1)
async function place(asset) {
  const vp = await pageVp(cur);
  let wPt = asset.heightPt * asset.ratio;
  wPt = Math.min(wPt, vp.width * 0.6);
  const w = wPt / vp.width;
  const hh = (wPt / asset.ratio) / vp.height;
  const n = items.filter((it) => it.page === cur).length;
  const off = (n % 5) * 0.03;
  const it = { asset, page: cur, x: Math.min(1 - w, 0.5 - w / 2 + off), y: Math.min(1 - hh, 0.5 - hh / 2 + off), w, hh };
  items.push(it);
  selected = it;
  msg.hidden = true;
  drawItems();
  stage.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

async function copyToAll() {
  const src = selected;
  if (!src) return;
  const vpSrc = await pageVp(src.page);
  const wPt = src.w * vpSrc.width;
  for (let p = 0; p < pdf.numPages; p++) {
    if (p === src.page) continue;
    const vp = await pageVp(p);
    const w = Math.min(1, wPt / vp.width);
    const hh = Math.min(1, (w * vp.width / src.asset.ratio) / vp.height);
    // 같은 자리에 이미 있으면 또 넣지 않아요
    if (items.some((it) => it.page === p && it.asset === src.asset && Math.abs(it.x - src.x) < 0.01 && Math.abs(it.y - src.y) < 0.01)) continue;
    items.push({ asset: src.asset, page: p, x: Math.min(src.x, 1 - w), y: Math.min(src.y, 1 - hh), w, hh });
  }
  allBtn.textContent = TU.allDone;
  setTimeout(() => (allBtn.textContent = TU.allPages), 1500);
}

// ---------- 페이지 위 배치 (옮기기·크기·빼기) ----------
function drawItems() {
  overlay.replaceChildren(...items.filter((it) => it.page === cur).map((it) => {
    const del = h("button", { class: "sp-del", type: "button", title: TU.remove, onclick: (e) => {
      e.stopPropagation();
      items.splice(items.indexOf(it), 1);
      if (selected === it) selected = null;
      drawItems();
    } }, "✕");
    const handle = h("span", { class: "sp-handle" });
    const el = h("div", { class: "sp-item" + (it === selected ? " selected" : "") },
      h("img", { alt: "", src: it.asset.url, draggable: false }), del, handle);
    position(el, it);
    el.addEventListener("pointerdown", (e) => startDrag(e, it, el, e.target === handle ? "resize" : "move"));
    return el;
  }));
  allBtn.hidden = !selected || pdf.numPages < 2;
}

function position(el, it) {
  Object.assign(el.style, { left: it.x * 100 + "%", top: it.y * 100 + "%", width: it.w * 100 + "%", height: it.hh * 100 + "%" });
}

let drag = null;
function startDrag(e, it, el, mode) {
  if (e.target.closest(".sp-del")) return;
  e.preventDefault();
  e.stopPropagation();
  if (selected !== it) {
    selected = it;
    overlay.querySelectorAll(".sp-item").forEach((x) => x.classList.toggle("selected", x === el));
    allBtn.hidden = pdf.numPages < 2;
  }
  const r = overlay.getBoundingClientRect();
  drag = { it, el, mode, r, sx: e.clientX, sy: e.clientY, ox: it.x, oy: it.y, ow: it.w };
  el.setPointerCapture(e.pointerId);
  el.addEventListener("pointermove", onDrag);
  el.addEventListener("pointerup", endDrag, { once: true });
  el.addEventListener("pointercancel", endDrag, { once: true });
}
function onDrag(e) {
  if (!drag) return;
  const { it, el, mode, r } = drag;
  const dx = (e.clientX - drag.sx) / r.width, dy = (e.clientY - drag.sy) / r.height;
  if (mode === "move") {
    it.x = clamp(drag.ox + dx, -it.w * 0.5, 1 - it.w * 0.5);
    it.y = clamp(drag.oy + dy, -it.hh * 0.5, 1 - it.hh * 0.5);
  } else {
    // 비율은 그대로, 오른쪽 아래 모서리로 크기 조절
    const pageAr = r.width / r.height;
    let w = clamp(drag.ow + dx, 0.03, 1.2);
    it.w = w;
    it.hh = (w * pageAr) / it.asset.ratio;
  }
  position(el, it);
}
function endDrag(e) {
  if (!drag) return;
  drag.el.removeEventListener("pointermove", onDrag);
  drag = null;
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

overlay.addEventListener("pointerdown", (e) => {
  if (e.target !== overlay || !selected) return;
  selected = null;
  drawItems();
});

// ---------- 저장 ----------
async function save() {
  if (!items.length) { msg.textContent = TU.noItems; msg.hidden = false; return; }
  msg.hidden = true;
  saveBtn.disabled = true;
  saveBtn.textContent = TU.saving;
  try {
    const doc = await PDFDocument.load(srcBytes);
    const embedded = new Map();
    for (const it of items) {
      let img = embedded.get(it.asset);
      if (!img) { img = await doc.embedPng(it.asset.bytes); embedded.set(it.asset, img); }
      const vp = await pageVp(it.page);
      const L = it.x * vp.width, Tp = it.y * vp.height, W = it.w * vp.width, H = it.hh * vp.height;
      // 화면에서 그림의 왼쪽 아래 모서리 → PDF 좌표. 회전된 페이지면 그림도 같이 돌려 똑바로 보이게.
      const [px, py] = vp.convertToPdfPoint(L, Tp + H);
      doc.getPage(it.page).drawImage(img, { x: px, y: py, width: W, height: H, rotate: degrees(vp.rotation || 0) });
    }
    download(new Blob([await doc.save()], { type: "application/pdf" }), `${name}_signed.pdf`);
  } catch (err) {
    console.error(err);
    msg.textContent = TU.fail;
    msg.hidden = false;
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = TU.save;
  }
}

function reset() {
  renderTask?.cancel();
  pdf?.destroy();
  pdf = null;
  srcBytes = null;
  items = [];
  selected = null;
  overlay.replaceChildren();
  editCard.hidden = true;
  uploadCard.hidden = false;
}
