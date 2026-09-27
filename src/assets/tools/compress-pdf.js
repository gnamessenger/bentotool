import { h, TU, root, dropzone, field, select, download, stripExt, fill, pdfjs, fmtBytes, progressBox } from "../common.js";

const lib = pdfjs();
// 렌더링 배율(1 = 72dpi)과 JPEG 품질
const LEVELS = { strong: [1.1, 0.5], medium: [1.5, 0.65], light: [2, 0.8] };
const level = select([["strong", TU.strong], ["medium", TU.medium], ["light", TU.light]], "medium");

const drop = dropzone({ accept: "application/pdf,.pdf", multiple: false, onFiles: (f) => run(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop,
  h("div", { class: "options" }, field(TU.level, level)), h("p", { class: "note" }, TU.note), error);
const prog = progressBox();
const progCard = h("div", { class: "tool-card", hidden: true }, prog.el);
const summary = h("p", { class: "big-result" });
const warn = h("p", { class: "note", hidden: true }, TU.notSmaller);
const dlBtn = h("button", { class: "btn", type: "button" }, TU.download);
const resultCard = h("div", { class: "tool-card center", hidden: true }, summary, warn,
  h("div", { class: "batch-actions" }, dlBtn, h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, progCard, resultCard);

async function run(file) {
  error.hidden = true;
  let pdf;
  try {
    pdf = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
  } catch {
    error.textContent = TU.encrypted;
    error.hidden = false;
    return;
  }
  uploadCard.hidden = true;
  progCard.hidden = false;
  const [scale, q] = LEVELS[level.value];
  const { jsPDF } = window.jspdf;
  let doc = null;
  for (let i = 1; i <= pdf.numPages; i++) {
    prog.set(fill(TU.working, { i, n: pdf.numPages }), (i - 1) / pdf.numPages);
    const page = await pdf.getPage(i);
    const base = page.getViewport({ scale: 1 });           // pt 단위 페이지 크기
    const vp = page.getViewport({ scale });
    const c = document.createElement("canvas");
    c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const data = c.toDataURL("image/jpeg", q);
    const orient = base.width > base.height ? "l" : "p";
    if (!doc) doc = new jsPDF({ unit: "pt", format: [base.width, base.height], orientation: orient, compress: true });
    else doc.addPage([base.width, base.height], orient);
    doc.addImage(data, "JPEG", 0, 0, base.width, base.height);
    page.cleanup();
  }
  pdf.destroy();
  const out = doc.output("blob");
  const smaller = out.size < file.size;
  const final = smaller ? out : file;
  summary.textContent = fill(TU.result, { a: fmtBytes(file.size), b: fmtBytes(final.size) }) +
    (smaller ? `  (-${Math.round((1 - out.size / file.size) * 100)}%)` : "");
  warn.hidden = smaller;
  dlBtn.onclick = () => download(final, `${stripExt(file.name)}_compressed.pdf`);
  progCard.hidden = true;
  resultCard.hidden = false;
}

function reset() {
  resultCard.hidden = true;
  uploadCard.hidden = false;
}
