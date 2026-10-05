import { h, U, TU, root, dropzone, field, download, zipDownload, stripExt, fill, fmtBytes, loadImage, canvasBlob, pdfjs } from "../common.js";

// 워터마크 넣기: 이미지(JPG·PNG·WEBP…)와 PDF. 모든 쪽/장에 같은 워터마크를 그려요.
// PDF는 워터마크를 투명 PNG로 그려서 각 쪽 위에 얹어요(한글 글꼴을 PDF에 넣지 않아도 되게).
const PDFLIB = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const FONT = '"Noto Sans KR", system-ui, sans-serif';
const POS = ["tl", "tc", "tr", "ml", "mc", "mr", "bl", "bc", "br"];

const scripts = {};
function loadScript(src) {
  return (scripts[src] ||= new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = res;
    s.onerror = () => { delete scripts[src]; rej(new Error("load " + src)); };
    document.head.append(s);
  }));
}
const isPdf = (f) => f.type === "application/pdf" || /\.pdf$/i.test(f.name);

// ---------- 설정 ----------
const opt = { mode: "text", text: TU.defaultText, size: 8, color: "#808080", opacity: 40, angle: -30, pos: "mc", tile: false, logo: null, logoSize: 25 };

const sliders = {};
let angleTouched = false;
const range = (key, min, max, unit = "") => {
  const out = h("b", {}, opt[key] + unit);
  const input = h("input", { type: "range", min, max, value: opt[key], oninput: () => {
    opt[key] = +input.value; out.textContent = input.value + unit;
    if (key === "angle") angleTouched = true;
    refresh();
  } });
  sliders[key] = { input, out, unit };
  return [input, out];
};
function setSlider(key, v) {
  const s = sliders[key];
  opt[key] = v; s.input.value = v; s.out.textContent = v + s.unit;
}

const modeText = h("button", { class: "chip active", type: "button", onclick: () => setMode("text") }, TU.modeText);
const modeLogo = h("button", { class: "chip", type: "button", onclick: () => setMode("logo") }, TU.modeLogo);

const textInput = h("input", { type: "text", value: opt.text, placeholder: TU.textPh, maxlength: 80, oninput: () => { opt.text = textInput.value; refresh(); } });
const colorInput = h("input", { type: "color", value: opt.color, oninput: () => { opt.color = colorInput.value; refresh(); } });
const textBox = h("div", { class: "wm-group" },
  field(TU.text, textInput),
  field(TU.size, ...range("size", 2, 30, "%")),
  field(TU.color, colorInput));

const logoInput = h("input", { type: "file", accept: "image/*", hidden: true });
const logoName = h("span", { class: "wm-logo-name" }, TU.noLogo);
logoInput.addEventListener("change", async () => {
  const f = logoInput.files[0];
  logoInput.value = "";
  if (!f) return;
  try {
    opt.logo = await loadImage(f);
    logoName.textContent = f.name;
  } catch { logoName.textContent = U.failed; }
  refresh();
});
const logoBox = h("div", { class: "wm-group", hidden: true },
  h("div", { class: "field" }, h("button", { class: "btn small ghost", type: "button", onclick: () => logoInput.click() }, TU.pickLogo), logoName, logoInput),
  h("p", { class: "note" }, TU.logoTip),
  field(TU.logoSize, ...range("logoSize", 5, 80, "%")));

const posGrid = h("div", { class: "wm-pos" });
const posBtns = POS.map((p) => {
  const b = h("button", { type: "button", title: TU["pos_" + p], class: p === opt.pos ? "active" : "", onclick: () => { opt.pos = p; opt.tile = false; syncPos(); refresh(); } }, h("i"));
  posGrid.append(b);
  return b;
});
const tileBtn = h("button", { class: "chip", type: "button", onclick: () => { opt.tile = true; syncPos(); refresh(); } }, TU.tile);
function syncPos() {
  posBtns.forEach((b, i) => b.classList.toggle("active", !opt.tile && POS[i] === opt.pos));
  tileBtn.classList.toggle("active", opt.tile);
}

const options = h("div", { class: "wm-opts" },
  h("div", { class: "chips" }, modeText, modeLogo),
  textBox, logoBox,
  h("div", { class: "wm-group" },
    field(TU.opacity, ...range("opacity", 5, 100, "%")),
    field(TU.angle, ...range("angle", -90, 90, "°"))),
  h("div", { class: "wm-group" },
    h("span", { class: "wm-label" }, TU.position),
    h("div", { class: "wm-pos-row" }, posGrid, tileBtn)));

function setMode(m) {
  opt.mode = m;
  // 기울인 글자는 흔하지만 로고는 보통 똑바로 넣어요 (각도를 직접 바꾼 적이 없을 때만)
  if (!angleTouched) setSlider("angle", m === "logo" ? 0 : -30);
  modeText.classList.toggle("active", m === "text");
  modeLogo.classList.toggle("active", m === "logo");
  textBox.hidden = m !== "text";
  logoBox.hidden = m !== "logo";
  refresh();
}

// ---------- 워터마크 그리기 (미리보기·이미지·PDF 공통) ----------
// 크기는 그림의 짧은 변 기준 % 라서, 사진 크기가 달라도 같은 비율로 들어가요.
function drawWatermark(ctx, W, H) {
  const base = Math.min(W, H);
  const rad = (opt.angle * Math.PI) / 180;
  let w, hh, paint;
  if (opt.mode === "logo") {
    if (!opt.logo) return;
    w = (base * opt.logoSize) / 100;
    hh = (w * opt.logo.height) / opt.logo.width;
    paint = () => ctx.drawImage(opt.logo, -w / 2, -hh / 2, w, hh);
  } else {
    const t = opt.text.trim();
    if (!t) return;
    const fs = Math.max(4, (base * opt.size) / 100);
    ctx.font = `700 ${fs}px ${FONT}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    w = ctx.measureText(t).width;
    hh = fs * 1.2;
    ctx.fillStyle = opt.color;
    paint = () => ctx.fillText(t, 0, 0);
  }
  ctx.save();
  ctx.globalAlpha = opt.opacity / 100;
  if (opt.tile) {
    // 바둑판 반복: 회전한 좌표계에서 줄마다 반 칸씩 엇갈리게 채워요
    const sx = w + Math.max(hh * 2, base * 0.08), sy = hh + Math.max(hh * 2.2, base * 0.08);
    const R = Math.hypot(W, H) / 2 + Math.max(sx, sy);
    ctx.translate(W / 2, H / 2);
    ctx.rotate(rad);
    let row = 0;
    for (let y = -R; y <= R; y += sy, row++) {
      for (let x = -R + (row % 2 ? sx / 2 : 0); x <= R; x += sx) {
        ctx.save(); ctx.translate(x, y); paint(); ctx.restore();
      }
    }
  } else {
    // 회전한 뒤의 바깥 상자 크기로 가장자리 여백을 맞춰서, 기울여도 잘리지 않게
    const bw = Math.abs(w * Math.cos(rad)) + Math.abs(hh * Math.sin(rad));
    const bh = Math.abs(w * Math.sin(rad)) + Math.abs(hh * Math.cos(rad));
    const m = base * 0.04;
    const [v, hz] = opt.pos;
    const cx = hz === "l" ? m + bw / 2 : hz === "r" ? W - m - bw / 2 : W / 2;
    const cy = v === "t" ? m + bh / 2 : v === "b" ? H - m - bh / 2 : H / 2;
    ctx.translate(cx, cy);
    ctx.rotate(rad);
    paint();
  }
  ctx.restore();
}

// 한글 글꼴(Noto Sans KR)이 실제로 받아진 뒤에 그려야 기본 글꼴로 그려지는 일이 없어요
async function fontReady() {
  if (opt.mode !== "text" || !opt.text.trim()) return;
  try { await document.fonts.load(`700 40px ${FONT}`, opt.text); } catch {}
}

// ---------- 화면 ----------
const files = [];   // { file, row, meta, pdf?: { pages }, thumb }
let selected = null;

const drop = dropzone({ accept: "image/*,application/pdf,.pdf", onFiles: add });
const stageCanvas = h("canvas", { class: "wm-canvas" });
const stageNote = h("p", { class: "hint-line" });
const editor = h("div", { class: "tool-card wm-editor", hidden: true },
  h("div", { class: "wm-layout" },
    h("div", {}, h("div", { class: "wm-stage checker" }, stageCanvas), stageNote),
    options));
const list = h("div", { class: "file-list" });
const status = h("p", { class: "status-line", hidden: true });
const runBtn = h("button", { class: "btn", type: "button", onclick: runAll }, TU.run);
const actions = h("div", { class: "batch-actions", hidden: true },
  runBtn, h("button", { class: "btn ghost", type: "button", onclick: clearAll }, U.clear));

const dropCard = h("div", { class: "tool-card" }, drop);
const dropBtn = drop.querySelector("button");
root().replaceChildren(dropCard, editor, list, status, actions);
// 파일을 올린 뒤에는 올리는 칸을 작게 줄여서 미리보기가 바로 보이게
function compact(on) {
  dropCard.classList.toggle("wm-compact", on);
  dropBtn.textContent = on ? U.addMore : U.choose;
}

function add(newFiles) {
  for (const file of newFiles) {
    const meta = h("div", { class: "meta" }, fmtBytes(file.size));
    const item = { file, meta };
    const thumb = file.type.startsWith("image/")
      ? h("div", { class: "thumb checker" }, h("img", { alt: "", src: URL.createObjectURL(file) }))
      : h("div", { class: "thumb", style: "background:var(--purple-faint)" }, "📄");
    item.row = h("div", { class: "file-row wm-row", onclick: () => choose(item) }, thumb,
      h("div", { class: "info" }, h("div", { class: "name" }, file.name), meta),
      h("div", { class: "acts" }, h("button", { class: "icon-btn", type: "button", title: U.remove, onclick: (e) => { e.stopPropagation(); remove(item); } }, "✕")));
    files.push(item);
    list.append(item.row);
  }
  editor.hidden = actions.hidden = false;
  compact(true);
  if (!selected) choose(files[0]);
}

function remove(item) {
  files.splice(files.indexOf(item), 1);
  item.row.remove();
  if (selected === item) { selected = null; if (files[0]) choose(files[0]); }
  if (!files.length) clearAll();
}

function clearAll() {
  files.length = 0;
  selected = null;
  list.replaceChildren();
  editor.hidden = actions.hidden = status.hidden = true;
  compact(false);
}

// 미리보기용 원본(이미지 또는 PDF 첫 쪽)을 화면 크기로 한 번 그려 두고, 설정이 바뀔 때마다 그 위에 워터마크만 다시 그려요
let base = null;   // canvas
async function choose(item) {
  selected = item;
  files.forEach((f) => f.row.classList.toggle("active", f === item));
  base = null;
  stageNote.textContent = "";
  try {
    if (isPdf(item.file)) {
      await loadScript(PDFJS);
      const doc = await pdfjs().getDocument({ data: await item.file.arrayBuffer() }).promise;
      item.meta.textContent = `${fmtBytes(item.file.size)} · ${doc.numPages}${TU.pages}`;
      const page = await doc.getPage(1);
      const vp0 = page.getViewport({ scale: 1 });
      const vp = page.getViewport({ scale: Math.min(3, 1200 / Math.max(vp0.width, vp0.height)) });
      const c = document.createElement("canvas");
      c.width = Math.round(vp.width); c.height = Math.round(vp.height);
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      doc.destroy();
      if (selected !== item) return;
      base = c;
      stageNote.textContent = TU.pdfPreviewNote;
    } else {
      const img = await loadImage(item.file);
      const s = Math.min(1, 1200 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      if (selected !== item) return;
      base = c;
      item.meta.textContent = `${fmtBytes(item.file.size)} · ${img.width}×${img.height}`;
    }
  } catch (err) {
    console.error(err);
    item.meta.replaceChildren(h("span", { class: "bad" }, isPdf(item.file) ? TU.badPdf : U.failed));
    return;
  }
  refresh();
}

let raf = 0;
function refresh() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(async () => {
    if (!base) return;
    await fontReady();
    stageCanvas.width = base.width; stageCanvas.height = base.height;
    const ctx = stageCanvas.getContext("2d");
    ctx.drawImage(base, 0, 0);
    drawWatermark(ctx, base.width, base.height);
  });
}

// ---------- 저장 ----------
async function processImage(file) {
  const img = await loadImage(file);
  const c = document.createElement("canvas");
  c.width = img.width; c.height = img.height;
  const ctx = c.getContext("2d");
  const type = file.type === "image/png" ? "image/png" : file.type === "image/webp" ? "image/webp" : "image/jpeg";
  if (type === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, c.width, c.height); }
  ctx.drawImage(img, 0, 0);
  drawWatermark(ctx, c.width, c.height);
  const ext = { "image/png": ".png", "image/webp": ".webp", "image/jpeg": ".jpg" }[type];
  return { blob: await canvasBlob(c, type, 0.92), name: `${stripExt(file.name)}_watermark${ext}` };
}

async function processPdf(file) {
  await loadScript(PDFLIB);
  const { PDFDocument, degrees } = window.PDFLib;
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const cache = new Map();   // 같은 크기의 쪽은 같은 워터마크 그림을 다시 써요
  for (const page of doc.getPages()) {
    const box = page.getCropBox();
    const rot = (((page.getRotation().angle || 0) % 360) + 360) % 360;
    const side = rot === 90 || rot === 270;
    const vw = side ? box.height : box.width, vh = side ? box.width : box.height;   // 화면에 보이는 가로·세로
    const key = `${Math.round(vw)}x${Math.round(vh)}`;
    if (!cache.has(key)) {
      const s = Math.min(3, 2400 / Math.max(vw, vh));   // 인쇄해도 깨지지 않을 만큼 크게
      const c = document.createElement("canvas");
      c.width = Math.round(vw * s); c.height = Math.round(vh * s);
      drawWatermark(c.getContext("2d"), c.width, c.height);
      cache.set(key, await doc.embedPng(await (await canvasBlob(c, "image/png")).arrayBuffer()));
    }
    const png = cache.get(key);
    // 회전된 쪽은 그림도 같이 돌려서, 화면에서 똑바로 보이게
    const at = {
      0: [box.x, box.y], 90: [box.x + box.width, box.y],
      180: [box.x + box.width, box.y + box.height], 270: [box.x, box.y + box.height],
    }[rot];
    page.drawImage(png, { x: at[0], y: at[1], width: vw, height: vh, rotate: degrees(rot) });
  }
  const bytes = await doc.save();
  return { blob: new Blob([bytes], { type: "application/pdf" }), name: `${stripExt(file.name)}_watermark.pdf` };
}

async function runAll() {
  if (!files.length) return;
  if (opt.mode === "logo" && !opt.logo) { status.textContent = TU.needLogo; status.hidden = false; return; }
  if (opt.mode === "text" && !opt.text.trim()) { status.textContent = TU.needText; status.hidden = false; return; }
  runBtn.disabled = true;
  status.hidden = false;
  await fontReady();
  const out = [];
  let failed = 0;
  for (let i = 0; i < files.length; i++) {
    const it = files[i];
    status.textContent = fill(TU.working, { i: i + 1, n: files.length });
    try {
      const r = await (isPdf(it.file) ? processPdf(it.file) : processImage(it.file));
      out.push(r);
      it.meta.replaceChildren(`${fmtBytes(it.file.size)} → ${fmtBytes(r.blob.size)} `, h("span", { class: "good" }, "✔"));
    } catch (err) {
      console.error(err);
      failed++;
      it.meta.replaceChildren(h("span", { class: "bad" }, isPdf(it.file) ? TU.badPdf : U.failed));
    }
  }
  try {
    if (out.length === 1) download(out[0].blob, out[0].name);
    else if (out.length > 1) await zipDownload(out, `${TU.zipName}.zip`);
    status.textContent = fill(TU.done, { n: out.length }) + (failed ? " " + fill(TU.someFailed, { n: failed }) : "");
  } finally {
    runBtn.disabled = false;
  }
}
