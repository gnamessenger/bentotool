import { GIFEncoder, quantize, applyPalette } from "https://cdn.jsdelivr.net/npm/gifenc@1.0.3/+esm";
import { h, TU, root, dropzone, field, select, download, stripExt, fill, fmtBytes, progressBox } from "../common.js";

const MAX_LEN = 15;
let file = null;

const drop = dropzone({ accept: "video/*,.mov,.mkv", multiple: false, onFiles: (f) => open(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop, error);

const video = h("video", { controls: true, muted: true, playsinline: true, class: "gif-video" });
const start = h("input", { type: "number", min: 0, step: 0.1, value: 0 });
const length = h("input", { type: "number", min: 0.5, max: MAX_LEN, step: 0.5, value: 3 });
const width = select([["240", "240px"], ["320", "320px"], ["480", "480px"], ["640", "640px"]], "480");
const fps = select([["8", "8"], ["10", "10"], ["15", "15"], ["20", "20"]], "10");
const makeBtn = h("button", { class: "btn", type: "button", onclick: make }, TU.make);
const prog = progressBox();
prog.el.hidden = true;
const resultImg = h("img", { alt: "", class: "gif-result" });
const resultBox = h("div", { class: "center", hidden: true }, resultImg, h("p", { class: "big-result" }),
  h("button", { class: "btn", type: "button" }, TU.download));

const editCard = h("div", { class: "tool-card", hidden: true },
  video,
  h("div", { class: "options" },
    field(TU.start, start, h("button", { class: "chip", type: "button", onclick: () => (start.value = video.currentTime.toFixed(1)) }, TU.setStart)),
    field(TU.length, length), field(TU.width, width), field(TU.fps, fps)),
  h("div", { class: "batch-actions" }, makeBtn, h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)),
  prog.el, resultBox);

root().replaceChildren(uploadCard, editCard);

function open(f) {
  file = f;
  error.hidden = true;
  video.src = URL.createObjectURL(f);
  start.value = 0;
  resultBox.hidden = true;
  uploadCard.hidden = true;
  editCard.hidden = false;
}

const seek = (t) => new Promise((res) => {
  video.addEventListener("seeked", res, { once: true });
  video.currentTime = t;
});

async function make() {
  makeBtn.disabled = true;
  resultBox.hidden = true;
  prog.el.hidden = false;
  video.pause();
  try {
    const s = Math.max(0, +start.value || 0);
    const len = Math.min(MAX_LEN, Math.max(0.5, +length.value || 3), Math.max(0.1, video.duration - s));
    const f = +fps.value;
    const w = Math.min(+width.value, video.videoWidth);
    const hgt = Math.round((video.videoHeight / video.videoWidth) * w / 2) * 2;
    const c = document.createElement("canvas");
    c.width = w; c.height = hgt;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    const gif = GIFEncoder();
    const frames = Math.max(1, Math.round(len * f));
    for (let i = 0; i < frames; i++) {
      await seek(s + i / f);
      ctx.drawImage(video, 0, 0, w, hgt);
      const { data } = ctx.getImageData(0, 0, w, hgt);
      const palette = quantize(data, 256);
      gif.writeFrame(applyPalette(data, palette), w, hgt, { palette, delay: Math.round(1000 / f) });
      const p = (i + 1) / frames;
      prog.set(fill(TU.making, { p: Math.round(p * 100) }), p);
    }
    gif.finish();
    const blob = new Blob([gif.bytes()], { type: "image/gif" });
    resultImg.src = URL.createObjectURL(blob);
    resultBox.querySelector(".big-result").textContent = fill(TU.done, { size: fmtBytes(blob.size) });
    resultBox.querySelector("button").onclick = () => download(blob, `${stripExt(file.name)}.gif`);
    resultBox.hidden = false;
  } catch (err) {
    console.error(err);
    error.textContent = TU.fail;
    error.hidden = false;
  } finally {
    prog.el.hidden = true;
    makeBtn.disabled = false;
  }
}

function reset() {
  video.pause();
  editCard.hidden = true;
  uploadCard.hidden = false;
}
