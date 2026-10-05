import { h, TU, EXT, batchTool, field, select, toCanvas, canvasBlob, stripExt, fill } from "../common.js";
import { decodeAny } from "./heic-to-jpg-decode.js";

const format = select([["image/jpeg", "JPG"], ["image/png", "PNG"]]);
const quality = h("input", { type: "range", min: 50, max: 100, value: 90 });
const qLabel = h("b", {}, "90");
const qField = field(TU.quality, quality, qLabel);
const status = h("p", { class: "note", style: "flex-basis:100%;margin-top:0" }, TU.firstNote);

const tool = batchTool({
  accept: "image/heic,image/heif,.heic,.heif,image/*",
  zipName: "heic-to-jpg.zip",
  options: [field(TU.format, format), qField, status],
  async process(file) {
    const img = await decodeAny(file, () => { status.textContent = TU.loadingLib; });
    status.textContent = TU.firstNote;
    const type = format.value;
    const canvas = toCanvas(img, img.width, img.height, type === "image/jpeg" ? "#FFFFFF" : null);
    img.close?.();
    const blob = await canvasBlob(canvas, type, quality.value / 100);
    const note = fill(TU.size, { w: canvas.width, h: canvas.height });
    canvas.width = canvas.height = 1; // 메모리 바로 비우기
    return { blob, name: stripExt(file.name) + EXT[type], note };
  },
});

function syncQuality() { qField.hidden = format.value !== "image/jpeg"; }
syncQuality();
format.addEventListener("change", () => { syncQuality(); tool.rerun(); });
quality.addEventListener("input", () => { qLabel.textContent = quality.value; tool.rerun(); });
