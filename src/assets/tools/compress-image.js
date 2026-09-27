import { h, TU, EXT, batchTool, field, select, loadImage, toCanvas, canvasBlob, stripExt } from "../common.js";

const quality = h("input", { type: "range", min: 10, max: 100, value: 70 });
const qLabel = h("b", {}, "70");
const format = select([["image/jpeg", "JPG"], ["image/webp", "WEBP"]]);
const maxWidth = select([["0", TU.original], ["2560", "2560px"], ["1920", "1920px"], ["1280", "1280px"], ["800", "800px"]]);

const tool = batchTool({
  accept: "image/*",
  zipName: "compressed.zip",
  options: [
    field(TU.quality, quality, qLabel),
    field(TU.format, format),
    field(TU.maxWidth, maxWidth),
  ],
  async process(file) {
    const img = await loadImage(file);
    let w = img.width, hgt = img.height;
    const max = +maxWidth.value;
    if (max && w > max) { hgt = Math.round((hgt * max) / w); w = max; }
    const type = format.value;
    const canvas = toCanvas(img, w, hgt, type === "image/jpeg" ? "#FFFFFF" : null);
    const blob = await canvasBlob(canvas, type, quality.value / 100);
    if (blob.size >= file.size && w === img.width && file.type === type) {
      return { blob: file, name: file.name, note: TU.keptOriginal };
    }
    return { blob, name: stripExt(file.name) + EXT[type] };
  },
});

quality.addEventListener("input", () => { qLabel.textContent = quality.value; tool.rerun(); });
format.addEventListener("change", tool.rerun);
maxWidth.addEventListener("change", tool.rerun);
