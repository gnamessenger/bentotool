import { h, TU, EXT, batchTool, field, select, toCanvas, canvasBlob, stripExt, fill, fmtBytes } from "../common.js";
import { decodeAny } from "./heic-to-jpg-decode.js";

// 1KB = 1,000바이트로 계산해요. (1,024로 계산하는 사이트에도 넉넉히 통과)
const KB = 1000;
const PRESETS = [20, 50, 100, 200, 300, 500, 1000, 2000];

const preset = select([...PRESETS.map((k) => [String(k), k >= 1000 ? `${k / 1000}MB` : `${k}KB`]), ["custom", TU.custom]], "100");
const customNum = h("input", { type: "number", min: 0.1, max: 100000, step: "any", value: 100, style: "width:90px" });
const customUnit = select([["1", "KB"], ["1000", "MB"]], "1");
const customBox = h("span", { class: "field", hidden: true }, customNum, customUnit);
const format = select([["image/jpeg", "JPG"], ["image/webp", "WEBP"]]);
const mode = select([["auto", TU.modeAuto], ["keep", TU.modeKeep]]);
const status = h("p", { class: "note", style: "flex-basis:100%;margin-top:0" }, TU.kbNote);

function targetBytes() {
  if (preset.value !== "custom") return +preset.value * KB;
  const n = +customNum.value > 0 ? +customNum.value : 100;
  return Math.max(100, Math.round(n * +customUnit.value * KB)); // 최소 0.1KB
}
const targetLabel = (t) => (t >= 1000 * KB && t % (1000 * KB) === 0 ? `${t / 1000 / KB}MB` : `${+(t / KB).toFixed(1)}KB`);

// 브라우저가 이 형식으로 저장할 수 있는지 (사파리 일부 버전은 WEBP 저장 불가 → JPG)
async function encoder(canvas, type) {
  const probe = await canvasBlob(canvas, type, 0.5);
  const t = probe.type === type ? type : "image/jpeg";
  return (q) => canvasBlob(canvas, t, q).then((b) => Object.assign(b, { _t: t }));
}

// 목표 용량 이하가 되는 가장 좋은 결과 찾기
// 1) 지금 크기에서 품질을 이분 탐색  2) 최저 품질로도 크면 가로세로를 줄여서 다시
async function fit(img, T, type, keepSize) {
  let w = img.width, hgt = img.height;
  const Q_MAX = 0.92;
  let smallest = null;
  for (let round = 0; round < 14; round++) {
    const long = Math.max(w, hgt);
    const qMin = keepSize ? 0.02 : long > 400 ? 0.5 : 0.1;
    const canvas = toCanvas(img, w, hgt, type === "image/jpeg" ? "#FFFFFF" : null);
    const enc = await encoder(canvas, type);
    const low = await enc(qMin);
    if (!smallest || low.size < smallest.blob.size) smallest = { blob: low, w, h: hgt, q: qMin };
    if (low.size <= T) {
      const top = await enc(Q_MAX);
      if (top.size <= T) return { ok: true, blob: top, w, h: hgt, q: Q_MAX };
      let good = { blob: low, q: qMin }, a = qMin, b = Q_MAX;
      for (let i = 0; i < 7; i++) {
        const m = (a + b) / 2;
        const bl = await enc(m);
        if (bl.size <= T) { good = { blob: bl, q: m }; a = m; } else b = m;
      }
      return { ok: true, ...good, w, h: hgt };
    }
    canvas.width = canvas.height = 1;
    if (keepSize || long <= 16) break;
    // 용량은 대략 픽셀 수에 비례 → 넓이 비율의 제곱근만큼 줄이기 (한 번에 너무 많이/적게는 안 줄임)
    const f = Math.max(0.3, Math.min(0.9, Math.sqrt(T / low.size) * 0.95));
    w = Math.max(1, Math.round(w * f));
    hgt = Math.max(1, Math.round(hgt * f));
  }
  return { ok: false, ...smallest };
}

const tool = batchTool({
  accept: "image/*,.heic,.heif",
  zipName: "resized-kb.zip",
  options: [
    field(TU.target, preset),
    customBox,
    field(TU.format, format),
    field(TU.mode, mode),
    status,
  ],
  async process(file) {
    const T = targetBytes();
    const type = format.value;
    const label = targetLabel(T);
    // 이미 목표 이하이고 같은 형식이면 원본 그대로
    if (file.size <= T && file.type === type) {
      return { blob: file, name: file.name, note: fill(TU.alreadyOk, { t: label }) };
    }
    const img = await decodeAny(file, () => { status.textContent = TU.loadingLib; });
    status.textContent = TU.kbNote;
    const r = await fit(img, T, type, mode.value === "keep");
    const ow = img.width, oh = img.height;
    img.close?.();
    const outType = r.blob._t || type;
    const name = stripExt(file.name) + EXT[outType];
    const dims = `${r.w}×${r.h}` + (r.w !== ow ? ` (${TU.from} ${ow}×${oh})` : "");
    const q = Math.round(r.q * 100);
    // 결과가 정말 목표 이하인지 마지막으로 다시 확인
    if (r.ok && r.blob.size <= T) {
      return { blob: r.blob, name, note: fill(TU.ok, { t: label, dims, q }) };
    }
    return { blob: r.blob, name, note: fill(mode.value === "keep" ? TU.failKeep : TU.failAuto, { t: label, min: fmtBytes(r.blob.size) }) };
  },
});

function syncCustom() {
  const c = preset.value === "custom";
  customBox.hidden = !c;
}
preset.addEventListener("change", () => { syncCustom(); tool.rerun(); });
customNum.addEventListener("input", tool.rerun);
customUnit.addEventListener("change", tool.rerun);
format.addEventListener("change", tool.rerun);
mode.addEventListener("change", tool.rerun);
