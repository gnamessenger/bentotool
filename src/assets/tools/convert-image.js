import { TU, EXT, batchTool, field, select, loadImage, toCanvas, canvasBlob, stripExt } from "../common.js";

const target = select([["image/jpeg", "JPG"], ["image/png", "PNG"], ["image/webp", "WEBP"]]);

const tool = batchTool({
  accept: "image/*",
  zipName: "converted.zip",
  options: [field(TU.target, target)],
  async process(file) {
    const img = await loadImage(file);
    const type = target.value;
    const canvas = toCanvas(img, img.width, img.height, type === "image/jpeg" ? "#FFFFFF" : null);
    const blob = await canvasBlob(canvas, type, 0.92);
    return { blob, name: stripExt(file.name) + EXT[type] };
  },
});

target.addEventListener("change", tool.rerun);
