import { h, U, TU, root, dropzone, field, select, download, stripExt, fill, fmtBytes, progressBox } from "../common.js";

const bitrate = select([["96", "96 kbps"], ["128", "128 kbps"], ["192", "192 kbps"], ["320", "320 kbps"]], "128");

const drop = dropzone({ accept: "video/*,audio/*,.mov,.mkv", multiple: false, onFiles: (f) => run(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop, h("div", { class: "options" }, field(TU.bitrate, bitrate)), error);
const prog = progressBox();
const progCard = h("div", { class: "tool-card", hidden: true }, prog.el);
const summary = h("p", { class: "big-result" });
const player = h("audio", { controls: true, class: "result-audio" });
const dlBtn = h("button", { class: "btn", type: "button" }, U.download);
const resultCard = h("div", { class: "tool-card center", hidden: true }, summary, player,
  h("div", { class: "batch-actions" }, dlBtn, h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, progCard, resultCard);

const tick = () => new Promise((r) => setTimeout(r, 0));

async function run(file) {
  error.hidden = true;
  uploadCard.hidden = true;
  progCard.hidden = false;
  prog.set(TU.decoding, 0);
  try {
    const ctx = new AudioContext({ sampleRate: 44100 });
    const audio = await ctx.decodeAudioData(await file.arrayBuffer());
    ctx.close();
    const channels = Math.min(2, audio.numberOfChannels);
    const enc = new window.lamejs.Mp3Encoder(channels, audio.sampleRate, +bitrate.value);
    const toInt16 = (f32) => {
      const out = new Int16Array(f32.length);
      for (let i = 0; i < f32.length; i++) {
        const s = Math.max(-1, Math.min(1, f32[i]));
        out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }
      return out;
    };
    const left = toInt16(audio.getChannelData(0));
    const right = channels > 1 ? toInt16(audio.getChannelData(1)) : null;
    const parts = [];
    const BLOCK = 1152, CHUNK = BLOCK * 200;
    for (let i = 0; i < left.length; i += CHUNK) {
      for (let j = i; j < Math.min(i + CHUNK, left.length); j += BLOCK) {
        const l = left.subarray(j, j + BLOCK);
        const buf = right ? enc.encodeBuffer(l, right.subarray(j, j + BLOCK)) : enc.encodeBuffer(l);
        if (buf.length) parts.push(new Uint8Array(buf));
      }
      const p = Math.min(1, (i + CHUNK) / left.length);
      prog.set(fill(TU.encoding, { p: Math.round(p * 100) }), p);
      await tick();
    }
    const end = enc.flush();
    if (end.length) parts.push(new Uint8Array(end));
    const blob = new Blob(parts, { type: "audio/mpeg" });
    summary.textContent = fill(TU.done, { size: fmtBytes(blob.size) });
    player.src = URL.createObjectURL(blob);
    dlBtn.onclick = () => download(blob, `${stripExt(file.name)}.mp3`);
    progCard.hidden = true;
    resultCard.hidden = false;
  } catch (err) {
    console.error(err);
    error.textContent = TU.fail;
    error.hidden = false;
    progCard.hidden = true;
    uploadCard.hidden = false;
  }
}

function reset() {
  player.pause();
  resultCard.hidden = true;
  uploadCard.hidden = false;
}
