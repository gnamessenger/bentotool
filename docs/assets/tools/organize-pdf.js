import { h, TU, root, dropzone, download, stripExt, fill, fmtBytes, pdfjs, canvasBlob, progressBox, pruneUnusedXObjects } from "../common.js";

const { PDFDocument, degrees } = window.PDFLib;
const lib = pdfjs();
const THUMB_W = 150; // 썸네일 가로(CSS px). 작게 그려야 큰 PDF도 가벼워요.

let srcBytes = null, pdf = null, name = "", items = [], allItems = [], dragItem = null;

// ---------- 화면 ----------
const drop = dropzone({ accept: "application/pdf,.pdf", multiple: false, onFiles: (f) => load(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop, error);
const prog = progressBox();
const progCard = h("div", { class: "tool-card", hidden: true }, prog.el);

const info = h("p", { class: "op-info" });
const grid = h("div", { class: "op-grid" });
const msg = h("div", { class: "error-box", hidden: true });
const saveBtn = h("button", { class: "btn", type: "button", onclick: save }, TU.save);
const workCard = h("div", { class: "tool-card", hidden: true },
  info,
  h("div", { class: "chips" },
    h("button", { class: "chip", type: "button", onclick: () => rotateAll(-90) }, TU.rotL),
    h("button", { class: "chip", type: "button", onclick: () => rotateAll(90) }, TU.rotR),
    h("button", { class: "chip ghost", type: "button", onclick: resetAll }, TU.resetAll)),
  h("p", { class: "hint-line op-hint" }, TU.hint),
  grid,
  msg,
  h("div", { class: "batch-actions" }, saveBtn,
    h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, progCard, workCard);

// ---------- 불러오기 ----------
async function load(file) {
  error.hidden = true;
  uploadCard.hidden = true;
  progCard.hidden = false;
  prog.set(TU.loading, 0.3);
  let bytes;
  try {
    bytes = new Uint8Array(await file.arrayBuffer());
    await PDFDocument.load(bytes); // 암호 걸린 PDF는 여기서 걸러져요
    // pdf.js는 넘겨받은 버퍼를 가져가 버려서 복사본을 줘요
    pdf = await lib.getDocument({ data: bytes.slice() }).promise;
  } catch (err) {
    console.error(err);
    error.textContent = TU.encrypted;
    error.hidden = false;
    progCard.hidden = true;
    uploadCard.hidden = false;
    return;
  }
  srcBytes = bytes;
  name = stripExt(file.name);
  info.textContent = `${file.name} · ${fmtBytes(file.size)} · ${pdf.numPages}${TU.pages}`;
  // 카드는 바로 만들고, 그림은 화면에 보이는 것부터 한 장씩 그려요
  items = [];
  for (let i = 0; i < pdf.numPages; i++) items.push(makeItem(i));
  allItems = [...items];
  progCard.hidden = true;
  workCard.hidden = false;
  render();
}

function makeItem(idx) {
  const img = h("img", { alt: "", draggable: false });
  const box = h("div", { class: "op-thumb" }, h("span", { class: "mini-spin" }));
  const label = h("span", { class: "op-label" });
  const item = { idx, rot: 0, img, box, label, state: "new" };
  const btns = {
    left: h("button", { class: "icon-btn", type: "button", title: TU.left, onclick: () => move(item, -1) }, "◀"),
    rot: h("button", { class: "icon-btn", type: "button", title: TU.rotate, onclick: () => rotate(item, 90) }, "↻"),
    del: h("button", { class: "icon-btn", type: "button", title: TU.del, onclick: () => remove(item) }, "✕"),
    right: h("button", { class: "icon-btn", type: "button", title: TU.right, onclick: () => move(item, 1) }, "▶"),
  };
  item.btns = btns;
  item.el = h("div", { class: "op-card", draggable: true },
    box, label, h("div", { class: "op-acts" }, btns.left, btns.rot, btns.del, btns.right));
  item.el._item = item;
  bindDrag(item);
  observer.observe(item.el);
  return item;
}

// ---------- 썸네일: 보이는 것만, 한 번에 한 장씩 ----------
const queue = [];
let busy = false;
const observer = new IntersectionObserver((entries) => {
  for (const e of entries) {
    const it = e.target._item;
    if (e.isIntersecting && it.state === "new") { it.state = "queued"; queue.push(it); }
  }
  pump();
}, { rootMargin: "600px 0px" });

async function pump() {
  if (busy) return;
  busy = true;
  const doc = pdf;
  while (queue.length && doc === pdf) {
    const it = queue.shift();
    try {
      const page = await doc.getPage(it.idx + 1);
      const base = page.getViewport({ scale: 1 });
      const scale = (THUMB_W * Math.min(2, window.devicePixelRatio || 1)) / Math.max(base.width, base.height);
      const vp = page.getViewport({ scale });
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.floor(vp.width));
      c.height = Math.max(1, Math.floor(vp.height));
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      page.cleanup();
      // 캔버스 대신 작은 JPG로 바꿔 두면 메모리를 덜 써요
      const blob = await canvasBlob(c, "image/jpeg", 0.75);
      c.width = c.height = 0;
      if (doc !== pdf) break;
      it.img.src = URL.createObjectURL(blob);
      it.box.replaceChildren(it.img);
      it.state = "done";
    } catch (err) {
      console.error(err);
      it.box.replaceChildren("📄");
      it.state = "done";
    }
  }
  busy = false;
}

// ---------- 편집 ----------
function render() {
  grid.replaceChildren(...items.map((it) => it.el));
  items.forEach((it, i) => {
    it.label.textContent = `${i + 1} · ${fill(TU.orig, { n: it.idx + 1 })}`;
    it.img.style.transform = it.rot ? `rotate(${it.rot}deg)` : "";
    it.btns.left.disabled = i === 0;
    it.btns.right.disabled = i === items.length - 1;
  });
  saveBtn.disabled = !items.length;
  msg.textContent = TU.empty;
  msg.hidden = items.length > 0;
}

function move(it, d) {
  const i = items.indexOf(it), j = i + d;
  if (j < 0 || j >= items.length) return;
  [items[i], items[j]] = [items[j], items[i]];
  render();
}
function rotate(it, d) { it.rot = (it.rot + d + 360) % 360; render(); }
function rotateAll(d) { items.forEach((it) => (it.rot = (it.rot + d + 360) % 360)); render(); }
function remove(it) { items.splice(items.indexOf(it), 1); render(); }

// 처음 상태로: 뺀 페이지도 다시 살리고 회전·순서를 원래대로 (이미 그린 썸네일은 그대로 써요)
function resetAll() {
  items = [...allItems];
  items.forEach((it) => (it.rot = 0));
  render();
}

// 끌어서 놓기 (PC)
function bindDrag(it) {
  const el = it.el;
  el.addEventListener("dragstart", (e) => {
    dragItem = it;
    el.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(it.idx));
  });
  el.addEventListener("dragend", () => {
    dragItem = null;
    el.classList.remove("dragging");
    grid.querySelectorAll(".drop-before,.drop-after").forEach((x) => x.classList.remove("drop-before", "drop-after"));
  });
  el.addEventListener("dragover", (e) => {
    if (!dragItem || dragItem === it) return;
    e.preventDefault();
    const after = isAfter(e, el);
    el.classList.toggle("drop-after", after);
    el.classList.toggle("drop-before", !after);
  });
  el.addEventListener("dragleave", () => el.classList.remove("drop-before", "drop-after"));
  el.addEventListener("drop", (e) => {
    if (!dragItem || dragItem === it) return;
    e.preventDefault();
    e.stopPropagation();
    const after = isAfter(e, el);
    el.classList.remove("drop-before", "drop-after");
    items.splice(items.indexOf(dragItem), 1);
    items.splice(items.indexOf(it) + (after ? 1 : 0), 0, dragItem);
    dragItem = null;
    render();
  });
}
function isAfter(e, el) {
  const r = el.getBoundingClientRect();
  return e.clientX > r.left + r.width / 2;
}

// ---------- 저장 ----------
async function save() {
  if (!items.length) return;
  saveBtn.disabled = true;
  saveBtn.textContent = TU.saving;
  try {
    const src = await PDFDocument.load(srcBytes);
    pruneUnusedXObjects(src);   // 뺀 쪽의 그림이 결과에 남지 않게
    const out = await PDFDocument.create();
    const pages = await out.copyPages(src, items.map((it) => it.idx));
    pages.forEach((p, k) => {
      const r = items[k].rot;
      if (r) p.setRotation(degrees((((p.getRotation().angle + r) % 360) + 360) % 360));
      out.addPage(p);
    });
    download(new Blob([await out.save()], { type: "application/pdf" }), `${name}_edited.pdf`);
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
  queue.length = 0;
  allItems.forEach((it) => { observer.unobserve(it.el); if (it.img.src) URL.revokeObjectURL(it.img.src); });
  pdf?.destroy();
  pdf = null;
  srcBytes = null;
  items = [];
  allItems = [];
  grid.replaceChildren();
  workCard.hidden = true;
  uploadCard.hidden = false;
}
