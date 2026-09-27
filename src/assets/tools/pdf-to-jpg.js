import { h, U, TU, root, dropzone, field, select, download, zipDownload, stripExt, fill, pdfjs, canvasBlob, progressBox } from "../common.js";

const lib = pdfjs();
const quality = select([["1.5", TU.normal], ["3", TU.high]]);
const format = select([["image/jpeg", "JPG"], ["image/png", "PNG"]]);

const drop = dropzone({ accept: "application/pdf,.pdf", multiple: false, onFiles: (f) => run(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop,
  h("div", { class: "options" }, field(TU.quality, quality), field(TU.format, format)), error);
const prog = progressBox();
const progCard = h("div", { class: "tool-card", hidden: true }, prog.el);
const grid = h("div", { class: "page-grid" });
const resultCard = h("div", { class: "tool-card", hidden: true }, grid,
  h("div", { class: "batch-actions" },
    h("button", { class: "btn", type: "button", onclick: () => zipDownload(results, `${name}_images.zip`) }, U.downloadAll),
    h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, progCard, resultCard);

let results = [], name = "";

async function run(file) {
  error.hidden = true;
  name = stripExt(file.name);
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
  results = [];
  grid.replaceChildren();
  const type = format.value, ext = type === "image/png" ? "png" : "jpg";
  for (let i = 1; i <= pdf.numPages; i++) {
    prog.set(fill(TU.rendering, { i, n: pdf.numPages }), (i - 1) / pdf.numPages);
    const page = await pdf.getPage(i);
    const vp = page.getViewport({ scale: +quality.value });
    const c = document.createElement("canvas");
    c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const blob = await canvasBlob(c, type, 0.92);
    const item = { name: `${name}_${String(i).padStart(3, "0")}.${ext}`, blob };
    results.push(item);
    const img = h("img", { alt: "" });
    img.src = URL.createObjectURL(blob);
    grid.append(h("div", { class: "page-card" }, img,
      h("div", { class: "page-meta" }, `${i} ${TU.page} · ${c.width}×${c.height}`),
      h("button", { class: "btn small", type: "button", onclick: () => download(item.blob, item.name) }, U.download)));
    page.cleanup();
  }
  pdf.destroy();
  progCard.hidden = true;
  resultCard.hidden = false;
}

function reset() {
  resultCard.hidden = true;
  uploadCard.hidden = false;
}
