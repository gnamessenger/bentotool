import { h, TU, root, dropzone, field, select, download, stripExt, fill, fmtBytes, progressBox } from "../common.js";

// 브라우저가 지원하는 저장 형식 (MP4 우선)
const MIME = [
  ["video/mp4;codecs=avc1.640028,mp4a.40.2", "mp4"],
  ["video/mp4", "mp4"],
  ["video/webm;codecs=vp9,opus", "webm"],
  ["video/webm", "webm"],
].find(([m]) => window.MediaRecorder && MediaRecorder.isTypeSupported(m));

// 1080p 기준 비트레이트(bps), 해상도에 비례해 조정
const QUALITY = { high: 5e6, medium: 2.5e6, low: 1.2e6 };

const resolution = select([["0", TU.original], ["1080", "1080p"], ["720", "720p"], ["480", "480p"]], "720");
const quality = select([["high", TU.high], ["medium", TU.medium], ["low", TU.low]], "medium");

const drop = dropzone({ accept: "video/*,.mov,.mkv", multiple: false, onFiles: (f) => run(f[0]) });
const error = h("div", { class: "error-box", hidden: !!MIME }, MIME ? "" : TU.unsupported);
const uploadCard = h("div", { class: "tool-card" }, drop,
  h("div", { class: "options" }, field(TU.resolution, resolution), field(TU.quality, quality)), error);
const prog = progressBox();
const progCard = h("div", { class: "tool-card", hidden: true }, prog.el);
const summary = h("p", { class: "big-result" });
const warn = h("p", { class: "note", hidden: true }, TU.notSmaller);
const dlBtn = h("button", { class: "btn", type: "button" }, TU.download);
const resultCard = h("div", { class: "tool-card center", hidden: true }, summary, warn,
  h("div", { class: "batch-actions" }, dlBtn, h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, progCard, resultCard);

async function run(file) {
  if (!MIME) return;
  error.hidden = true;
  uploadCard.hidden = true;
  progCard.hidden = false;
  prog.set(fill(TU.working, { p: 0 }), 0);

  const video = document.createElement("video");
  video.src = URL.createObjectURL(file);
  video.playsInline = true;
  try {
    await new Promise((res, rej) => { video.onloadedmetadata = res; video.onerror = rej; });
    const target = +resolution.value;
    const short = Math.min(video.videoHeight, video.videoWidth);   // 720p = 짧은 변 720
    const scale = target && short > target ? target / short : 1;
    const w = Math.round((video.videoWidth * scale) / 2) * 2;
    const hgt = Math.round((video.videoHeight * scale) / 2) * 2;
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = hgt;
    const ctx = canvas.getContext("2d");

    const stream = canvas.captureStream(30);
    // 소리: 영상 소리를 스피커로 내보내지 않고 녹음에만 연결
    const ac = new AudioContext();
    await ac.resume();
    const srcNode = ac.createMediaElementSource(video);
    const dest = ac.createMediaStreamDestination();
    srcNode.connect(dest);
    dest.stream.getAudioTracks().forEach((t) => stream.addTrack(t));

    const bps = Math.round(QUALITY[quality.value] * Math.max(0.25, (w * hgt) / (1920 * 1080)));
    const rec = new MediaRecorder(stream, { mimeType: MIME[0], videoBitsPerSecond: bps, audioBitsPerSecond: 128000 });
    const chunks = [];
    rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    const done = new Promise((res) => (rec.onstop = res));

    let drawing = true;
    const draw = () => {
      if (!drawing) return;
      ctx.drawImage(video, 0, 0, w, hgt);
      const p = video.currentTime / video.duration;
      prog.set(fill(TU.working, { p: Math.round(p * 100) }), p);
      video.requestVideoFrameCallback ? video.requestVideoFrameCallback(draw) : requestAnimationFrame(draw);
    };

    rec.start(1000);
    await video.play();
    draw();
    await new Promise((res) => (video.onended = res));
    drawing = false;
    rec.stop();
    await done;
    ac.close();

    const blob = new Blob(chunks, { type: MIME[0].split(";")[0] });
    const smaller = blob.size < file.size;
    summary.textContent = fill(TU.done, { a: fmtBytes(file.size), b: fmtBytes(blob.size) });
    warn.hidden = smaller;
    dlBtn.onclick = () => download(blob, `${stripExt(file.name)}_compressed.${MIME[1]}`);
    progCard.hidden = true;
    resultCard.hidden = false;
  } catch (err) {
    console.error(err);
    error.textContent = TU.fail;
    error.hidden = false;
    progCard.hidden = true;
    uploadCard.hidden = false;
  } finally {
    URL.revokeObjectURL(video.src);
  }
}

function reset() {
  resultCard.hidden = true;
  uploadCard.hidden = false;
}
