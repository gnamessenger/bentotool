import { h, U, TU, root, dropzone, field, download, zipDownload, stripExt, fill, fmtBytes } from "../common.js";

const { PDFDocument } = window.PDFLib;

let src = null, name = "", pageCount = 0;

const drop = dropzone({ accept: "application/pdf,.pdf", multiple: false, onFiles: (f) => load(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop, error);

const info = h("div", { class: "file-row" });
const modePick = h("input", { type: "radio", name: "mode", value: "pick", checked: true });
const modeEach = h("input", { type: "radio", name: "mode", value: "each" });
const range = h("input", { type: "text", placeholder: TU.rangePh, class: "range-input" });
const msg = h("div", { class: "error-box", hidden: true });
const runBtn = h("button", { class: "btn", type: "button", onclick: run }, TU.run);
const workCard = h("div", { class: "tool-card", hidden: true },
  info,
  h("div", { class: "options col" },
    h("label", { class: "field" }, modePick, TU.pick, range),
    h("label", { class: "field" }, modeEach, TU.each)),
  msg,
  h("div", { class: "batch-actions" }, runBtn,
    h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, workCard);
range.addEventListener("focus", () => (modePick.checked = true));

async function load(file) {
  error.hidden = true;
  try {
    src = await PDFDocument.load(await file.arrayBuffer());
  } catch {
    error.textContent = TU.encrypted;
    error.hidden = false;
    return;
  }
  name = stripExt(file.name);
  pageCount = src.getPageCount();
  info.replaceChildren(
    h("div", { class: "thumb", style: "background:var(--purple-faint)" }, "📄"),
    h("div", { class: "info" }, h("div", { class: "name" }, file.name), h("div", { class: "meta" }, `${fmtBytes(file.size)} · ${pageCount} ${TU.pages}`)),
    h("span"));
  range.value = "";
  msg.hidden = true;
  uploadCard.hidden = true;
  workCard.hidden = false;
}

// "1-3, 5" → [0,1,2,4]
function parseRange(str, max) {
  const out = [];
  for (const part of str.split(/[,\s]+/).filter(Boolean)) {
    const m = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!m) return null;
    let a = +m[1], b = m[2] ? +m[2] : a;
    if (a > b) [a, b] = [b, a];
    if (a < 1 || b > max) return null;
    for (let i = a; i <= b; i++) if (!out.includes(i - 1)) out.push(i - 1);
  }
  return out.length ? out : null;
}

async function pagesToPdf(indices) {
  const doc = await PDFDocument.create();
  (await doc.copyPages(src, indices)).forEach((p) => doc.addPage(p));
  return new Blob([await doc.save()], { type: "application/pdf" });
}

async function run() {
  msg.hidden = true;
  runBtn.disabled = true;
  runBtn.textContent = U.processing;
  try {
    if (modeEach.checked) {
      const files = [];
      for (let i = 0; i < pageCount; i++) files.push({ name: `${name}_${i + 1}.pdf`, blob: await pagesToPdf([i]) });
      await zipDownload(files, `${name}_split.zip`);
    } else {
      const idx = parseRange(range.value, pageCount);
      if (!idx) {
        msg.textContent = fill(TU.bad, { n: pageCount });
        msg.hidden = false;
        return;
      }
      download(await pagesToPdf(idx), `${name}_${range.value.replace(/\s+/g, "").replace(/,/g, "_")}.pdf`);
    }
  } finally {
    runBtn.disabled = false;
    runBtn.textContent = TU.run;
  }
}

function reset() {
  src = null;
  workCard.hidden = true;
  uploadCard.hidden = false;
}
