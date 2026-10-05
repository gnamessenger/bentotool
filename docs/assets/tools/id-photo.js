import { h, TU, root, dropzone, download, stripExt, canvasBlob, loadImage, fill, progressBox } from "../common.js";

// 규격: 실제 크기(mm)와 300dpi 기준 픽셀. head = 얼굴 안내선 높이(사진 세로 대비, 참고용)
// 여권 3.5×4.5cm, 정수리~턱 3.2~3.6cm (외교부) · 미국 비자 2×2인치, 머리 1~1⅜인치 (미 국무부)
const SPECS = [
  { id: "half", mm: [30, 40], px: [354, 472], head: 0.7 },
  { id: "passport", mm: [35, 45], px: [413, 531], head: 34 / 45 },
  { id: "card", mm: [50, 70], px: [591, 827], head: 0.6 },
  { id: "usvisa", mm: [51, 51], px: [600, 600], head: 1.1875 / 2 },
];
const COLORS = [["#FFFFFF", TU.white], ["#DCE9F7", TU.blue], ["#E9E9EC", TU.gray]];
const MAX_EDGE = 3000;             // 너무 큰 사진은 줄여서 다뤄요 (속도·메모리)
const SHEET = [1800, 1200];       // 4×6인치 @300dpi
const SHEET_MARGIN = 36, SHEET_GAP = 24;

let spec = SPECS[0];
let bg = "#FFFFFF";               // "" = 원본 배경 그대로
let cropper = null;
let base = null;                  // { canvas, url, name }
let cut = null;                   // 배경 지운 ImageBitmap
let aiJob = null;
let removeBackground = null;

// ---------- 화면 ----------
const drop = dropzone({ accept: "image/*", multiple: false, onFiles: (f) => open(f[0]) });
const uploadCard = h("div", { class: "tool-card" }, drop);

const img = h("img", { alt: "", class: "crop-img" });
const stage = h("div", { class: "crop-stage ip-stage" }, img);

const specBtns = SPECS.map((s) =>
  h("button", { class: "chip", type: "button", onclick: () => setSpec(s) }, TU.specs[s.id]));

const swatches = h("div", { class: "swatches" });
const origSw = h("div", { class: "sw ip-orig", title: TU.original, onclick: () => pickBg(origSw, "") }, "⛰");
swatches.append(origSw);
const colorSws = COLORS.map(([c, label]) => {
  const sw = h("div", { class: "sw", title: label, style: `background:${c}` });
  sw.onclick = () => pickBg(sw, c);
  swatches.append(sw);
  return sw;
});
const colorInput = h("input", { type: "color", value: "#F2E6D9" });
const pickSw = h("label", { class: "sw pick", title: TU.custom }, "+", colorInput);
colorInput.addEventListener("input", () => { pickSw.style.background = colorInput.value; pickBg(pickSw, colorInput.value); });
swatches.append(pickSw);
const bgName = h("p", { class: "note ip-bgname" });

const prog = progressBox();
const progWrap = h("div", { class: "ip-prog", hidden: true }, prog.el, h("small", {}, TU.firstNote));
const aiError = h("div", { class: "error-box", hidden: true }, TU.fail);

const sizeInfo = h("p", { class: "note" });
const sheetInfo = h("p", { class: "note" });
const specWarn = h("div", { class: "ip-warn", hidden: true });
const saveBtn = h("button", { class: "btn", type: "button", onclick: saveOne }, TU.saveOne);
const sheetBtn = h("button", { class: "btn ghost", type: "button", onclick: saveSheet }, TU.saveSheet);

const editCard = h("div", { class: "tool-card", hidden: true },
  h("div", { class: "rb-result ip-layout" },
    h("div", {},
      h("div", { class: "chips" },
        h("button", { class: "chip ghost", type: "button", onclick: () => cropper?.zoom(0.1) }, TU.zoomIn),
        h("button", { class: "chip ghost", type: "button", onclick: () => cropper?.zoom(-0.1) }, TU.zoomOut),
        h("button", { class: "chip ghost", type: "button", onclick: () => cropper?.rotate(90) }, TU.rotate)),
      stage,
      h("p", { class: "rb-hint" }, TU.guideHint)),
    h("div", { class: "rb-side" },
      h("div", {}, h("h3", {}, TU.spec), h("div", { class: "chips" }, specBtns)),
      h("div", {}, h("h3", {}, TU.background), swatches, bgName, progWrap, aiError),
      specWarn,
      h("div", { class: "ip-out" }, saveBtn, sizeInfo, sheetBtn, sheetInfo),
      h("p", { class: "note ip-legal" }, TU.legal),
      h("button", { class: "btn ghost small", type: "button", onclick: reset }, TU.another))));

root().replaceChildren(uploadCard, editCard);
setSpec(SPECS[0], true);
markBg(colorSws[0], "#FFFFFF");

// ---------- 동작 ----------
async function open(file) {
  let src;
  try { src = await loadImage(file); } catch (e) { console.error(e); return; }
  const w0 = src.width, h0 = src.height;
  const k = Math.min(1, MAX_EDGE / Math.max(w0, h0));
  const c = document.createElement("canvas");
  c.width = Math.round(w0 * k); c.height = Math.round(h0 * k);
  const ctx = c.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(src, 0, 0, c.width, c.height);
  if (base) URL.revokeObjectURL(base.url);
  base = { canvas: c, url: URL.createObjectURL(await canvasBlob(c, "image/png")), name: stripExt(file.name) };
  cut = null;
  aiJob = null;
  aiError.hidden = true;
  saveBtn.disabled = sheetBtn.disabled = false;
  uploadCard.hidden = true;
  editCard.hidden = false;
  startCropper(base.url);
  if (bg) runAI();
}

function startCropper(url) {
  cropper?.destroy();
  img.src = url;
  img.onload = () => {
    img.onload = null;
    cropper = new window.Cropper(img, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: spec.px[0] / spec.px[1],
      autoCropArea: 0.75,
      background: false,
      responsive: true,
      toggleDragModeOnDblclick: false,
      async ready() {
        addGuide();
        if (bg && cut && img.src === base?.url) swapImage(await composite());
      },
    });
  };
}

// 얼굴 위치 안내선 (점선 타원 + 가운데 세로선) — 크롭 틀 안에 표시
function addGuide() {
  const box = stage.querySelector(".cropper-crop-box");
  if (!box) return;
  box.querySelector(".ip-guide")?.remove();
  const hr = spec.head;
  const top = (1 - hr) * 0.42;
  const wPct = (hr * 0.74 * spec.px[1] / spec.px[0]) * 100;
  box.append(h("div", { class: "ip-guide" },
    h("i", { class: "ip-oval", style: `top:${top * 100}%;height:${hr * 100}%;width:${wPct}%;left:${50 - wPct / 2}%` }),
    h("i", { class: "ip-vline" })));
}

function setSpec(s, first) {
  spec = s;
  specBtns.forEach((b, i) => b.classList.toggle("active", SPECS[i] === s));
  sizeInfo.textContent = fill(TU.outSize, { w: s.px[0], h: s.px[1], cw: s.mm[0] / 10, ch: s.mm[1] / 10 });
  sheetInfo.textContent = fill(TU.sheetInfo, { n: sheetLayout().n });
  const warn = TU.warn[s.id];
  specWarn.hidden = !warn;
  specWarn.textContent = warn || "";
  if (!first && cropper) { cropper.setAspectRatio(s.px[0] / s.px[1]); addGuide(); }
}

function markBg(el, color) {
  swatches.querySelectorAll(".sw").forEach((s) => s.classList.remove("active"));
  el.classList.add("active");
  bg = color;
  bgName.textContent = color ? `${TU.background}: ${el.title || color} (${color})` : TU.originalNote;
}

async function pickBg(el, color) {
  markBg(el, color);
  if (!base) return;
  if (!color) return swapImage(base.url);
  if (!cut) { await runAI(); return; }
  swapImage(await composite());
}

async function runAI() {
  if (aiJob) return aiJob;
  const myBase = base;
  aiJob = (async () => {
    aiError.hidden = true;
    progWrap.hidden = false;
    saveBtn.disabled = sheetBtn.disabled = true;
    prog.set(TU.loadingModel, 0);
    try {
      if (!removeBackground) {
        ({ removeBackground } = await import("https://cdn.jsdelivr.net/npm/@imgly/background-removal@1/+esm"));
      }
      const blob = await removeBackground(await canvasBlob(myBase.canvas, "image/png"), {
        output: { format: "image/png", quality: 1 },
        progress: (key, cur, total) => {
          if (key.startsWith("fetch")) prog.set(TU.downloadingModel, total ? cur / total : 0);
          else if (key.startsWith("compute")) prog.set(TU.removing, total ? cur / total : 0.5);
        },
      });
      if (base !== myBase) return;
      cut = await createImageBitmap(blob);
      if (bg) swapImage(await composite());
    } catch (err) {
      console.error(err);
      if (base !== myBase) return;
      aiError.hidden = false;
      markBg(origSw, "");
      swapImage(base.url);
      aiJob = null;
    } finally {
      if (base === myBase) {
        progWrap.hidden = true;
        saveBtn.disabled = sheetBtn.disabled = false;
      }
    }
  })();
  return aiJob;
}

async function composite() {
  const { canvas } = base;
  const c = document.createElement("canvas");
  c.width = canvas.width; c.height = canvas.height;
  const ctx = c.getContext("2d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(cut, 0, 0, c.width, c.height);
  return URL.createObjectURL(await canvasBlob(c, "image/png"));
}

let shownUrl = null;
function swapImage(url) {
  if (!cropper) return;
  if (shownUrl && shownUrl !== base?.url) URL.revokeObjectURL(shownUrl);
  shownUrl = url;
  cropper.replace(url, true);   // 같은 크기 → 크롭 위치·확대 그대로
}

function photoCanvas() {
  return cropper.getCroppedCanvas({
    width: spec.px[0], height: spec.px[1],
    fillColor: bg || "#FFFFFF",
    imageSmoothingEnabled: true, imageSmoothingQuality: "high",
  });
}

// JPG에 300dpi 정보 넣기 (JFIF 헤더의 밀도 값만 바꿔요)
async function jpg300(canvas) {
  const buf = new Uint8Array(await (await canvasBlob(canvas, "image/jpeg", 0.95)).arrayBuffer());
  if (buf[2] === 0xFF && buf[3] === 0xE0 && String.fromCharCode(...buf.slice(6, 11)) === "JFIF\0") {
    buf[13] = 1;                       // 단위: 인치
    buf[14] = 300 >> 8; buf[15] = 300 & 255;
    buf[16] = 300 >> 8; buf[17] = 300 & 255;
  }
  return new Blob([buf], { type: "image/jpeg" });
}

async function saveOne() {
  if (!cropper) return;
  download(await jpg300(photoCanvas()), `${base.name}_${spec.id}_${spec.px[0]}x${spec.px[1]}.jpg`);
}

function sheetLayout() {
  const [pw, ph] = spec.px;
  const fit = (W, H) => {
    const cols = Math.floor((W - 2 * SHEET_MARGIN + SHEET_GAP) / (pw + SHEET_GAP));
    const rows = Math.floor((H - 2 * SHEET_MARGIN + SHEET_GAP) / (ph + SHEET_GAP));
    return { W, H, cols, rows, n: Math.max(0, cols) * Math.max(0, rows) };
  };
  const a = fit(SHEET[0], SHEET[1]), b = fit(SHEET[1], SHEET[0]);
  return b.n > a.n ? b : a;
}

async function saveSheet() {
  if (!cropper) return;
  const photo = photoCanvas();
  const L = sheetLayout();
  const [pw, ph] = spec.px;
  const c = document.createElement("canvas");
  c.width = L.W; c.height = L.H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, L.W, L.H);
  const gw = L.cols * pw + (L.cols - 1) * SHEET_GAP;
  const gh = L.rows * ph + (L.rows - 1) * SHEET_GAP;
  const x0 = Math.round((L.W - gw) / 2), y0 = Math.round((L.H - gh) / 2);
  ctx.strokeStyle = "#C8C8C8";
  ctx.lineWidth = 1;
  for (let r = 0; r < L.rows; r++) {
    for (let k = 0; k < L.cols; k++) {
      const x = x0 + k * (pw + SHEET_GAP), y = y0 + r * (ph + SHEET_GAP);
      ctx.drawImage(photo, x, y);
      ctx.strokeRect(x - 1.5, y - 1.5, pw + 3, ph + 3);   // 자를 때 보는 얇은 선
    }
  }
  download(await jpg300(c), `${base.name}_${spec.id}_4x6_print.jpg`);
}

function reset() {
  cropper?.destroy();
  cropper = null;
  if (base) URL.revokeObjectURL(base.url);
  base = null; cut = null; aiJob = null;
  progWrap.hidden = true;
  editCard.hidden = true;
  uploadCard.hidden = false;
}
