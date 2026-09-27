import { h, TU, EXT, batchTool, field, select, loadImage, toCanvas, canvasBlob, stripExt } from "../common.js";

const mode = select([["percent", TU.byPercent], ["width", TU.byWidth]]);
const value = h("input", { type: "number", min: 1, value: 50 });
const unit = h("span", {}, "%");

const tool = batchTool({
  accept: "image/*",
  zipName: "resized.zip",
  options: [field(TU.mode, mode), field(TU.value, value, unit)],
  async process(file) {
    const img = await loadImage(file);
    const v = Math.max(1, +value.value || 1);
    const scale = mode.value === "percent" ? v / 100 : v / img.width;
    const w = Math.max(1, Math.round(img.width * scale));
    const hgt = Math.max(1, Math.round(img.height * scale));
    const type = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
    const canvas = toCanvas(img, w, hgt, type === "image/jpeg" ? "#FFFFFF" : null);
    const blob = await canvasBlob(canvas, type, 0.92);
    return { blob, name: `${stripExt(file.name)}_${w}x${hgt}${EXT[type]}`, note: `${img.width}×${img.height} → ${w}×${hgt}` };
  },
});

mode.addEventListener("change", () => {
  const pct = mode.value === "percent";
  value.value = pct ? 50 : 1280;
  unit.textContent = pct ? "%" : "px";
  tool.rerun();
});
value.addEventListener("input", tool.rerun);
