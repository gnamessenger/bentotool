import { h, TU, root, dropzone, field, download, stripExt, fill, fmtBytes, progressBox } from "../common.js";
import { loadFFmpeg, stopFFmpeg, mountInput, run, probe, takeOutput, fmtTime } from "./trim-video-ffmpeg.js";

const BIG = 500 * 1024 * 1024;   // 이보다 크면 메모리 경고
let file = null;
let duration = 0;
let mode = "fast";
let busy = false;
let resultUrl = null;
let cancelled = false;

const drop = dropzone({ accept: "video/*,.mov,.mkv,.avi,.m4v,.3gp,.ts", multiple: false, onFiles: (f) => open(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop);

const video = h("video", { controls: true, playsinline: true, preload: "metadata", class: "gif-video" });
const noPreview = h("p", { class: "note", hidden: true });
const start = h("input", { type: "number", min: 0, step: 0.1, value: 0, class: "tv-time" });
const end = h("input", { type: "number", min: 0, step: 0.1, value: 0, class: "tv-time" });
const setStartBtn = h("button", { class: "chip", type: "button", onclick: () => { start.value = video.currentTime.toFixed(1); update(); } }, TU.setStart);
const setEndBtn = h("button", { class: "chip", type: "button", onclick: () => { end.value = video.currentTime.toFixed(1); update(); } }, TU.setEnd);
const previewBtn = h("button", { class: "chip ghost", type: "button", onclick: previewClip }, TU.preview);
const lengthText = h("p", { class: "tv-length" });
start.addEventListener("input", update);
end.addEventListener("input", update);

const fastChip = h("button", { class: "chip active", type: "button", onclick: () => setMode("fast") }, TU.fast);
const exactChip = h("button", { class: "chip", type: "button", onclick: () => setMode("exact") }, TU.exact);
const modeNote = h("p", { class: "note" }, TU.fastNote);
const bigWarn = h("p", { class: "note warn", hidden: true });

const runBtn = h("button", { class: "btn", type: "button", onclick: trim }, TU.run);
const anotherBtn = h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another);
const prog = progressBox();
const leftText = h("small", {});
const cancelBtn = h("button", { class: "btn ghost small", type: "button", onclick: cancel }, TU.cancel);
const progBox = h("div", { hidden: true }, prog.el, h("div", { class: "batch-actions" }, cancelBtn));
prog.el.append(leftText);

const resultVideo = h("video", { controls: true, playsinline: true, class: "gif-video tv-result" });
const summary = h("p", { class: "big-result" });
const keptNote = h("p", { class: "note", hidden: true });
const dlBtn = h("button", { class: "btn", type: "button" }, TU.download);
const resultBox = h("div", { class: "center", hidden: true }, resultVideo, summary, keptNote, h("div", { class: "batch-actions" }, dlBtn));

const editCard = h("div", { class: "tool-card", hidden: true },
  video, noPreview,
  h("div", { class: "options" },
    field(TU.start, start, setStartBtn),
    field(TU.end, end, setEndBtn),
    previewBtn),
  lengthText,
  h("div", { class: "chips" }, h("strong", { class: "tv-label" }, TU.mode), fastChip, exactChip),
  modeNote, bigWarn,
  h("div", { class: "batch-actions" }, runBtn, anotherBtn),
  progBox, error, resultBox);

root().replaceChildren(uploadCard, editCard);

function setMode(m) {
  mode = m;
  fastChip.classList.toggle("active", m === "fast");
  exactChip.classList.toggle("active", m === "exact");
  modeNote.textContent = m === "fast" ? TU.fastNote : TU.exactNote;
}

function range() {
  const s = Math.max(0, +start.value || 0);
  let e = +end.value || 0;
  if (duration) e = Math.min(e, duration);
  return { s, e, len: e - s };
}

function update() {
  const { len } = range();
  lengthText.textContent = fill(TU.length, { t: len > 0 ? fmtTime(len) : "-" });
}

function open(f) {
  file = f;
  duration = 0;
  error.hidden = true;
  resultBox.hidden = true;
  noPreview.hidden = true;
  video.hidden = false;
  [setStartBtn, setEndBtn, previewBtn].forEach((b) => (b.hidden = false));
  if (video.src) URL.revokeObjectURL(video.src);
  video.src = URL.createObjectURL(f);
  start.value = 0;
  end.value = 0;
  update();
  bigWarn.hidden = f.size <= BIG;
  bigWarn.textContent = fill(TU.bigWarn, { size: fmtBytes(f.size) });
  uploadCard.hidden = true;
  editCard.hidden = false;
}

video.addEventListener("loadedmetadata", () => {
  if (!isFinite(video.duration)) return;
  duration = video.duration;
  end.value = duration.toFixed(1);
  update();
});
video.addEventListener("error", async () => {
  if (!file || !video.getAttribute("src")) return;
  // 미리보기가 안 되는 형식(AVI 등): ffmpeg로 길이만 읽어요
  video.hidden = true;
  [setStartBtn, setEndBtn, previewBtn].forEach((b) => (b.hidden = true));
  const f = file;
  try {
    const ff = await withEngine();
    const inp = await mountInput(ff, f);
    const info = await probe(ff, inp.path);
    await inp.cleanup();
    if (f !== file) return;
    duration = info.duration;
    end.value = duration.toFixed(1);
    update();
    noPreview.textContent = fill(TU.noPreview, { t: fmtTime(duration) });
    noPreview.hidden = false;
  } catch (err) {
    console.error(err);
  } finally {
    progBox.hidden = true;
  }
});

let stopAt = null;
function previewClip() {
  const { s, e } = range();
  if (!(e > s)) return;
  video.currentTime = s;
  stopAt = e;
  video.play();
}
video.addEventListener("timeupdate", () => {
  if (stopAt != null && video.currentTime >= stopAt) { video.pause(); stopAt = null; }
});
video.addEventListener("pause", () => (stopAt = null));

async function withEngine() {
  progBox.hidden = false;
  cancelBtn.hidden = true;
  leftText.textContent = "";
  prog.set(TU.preparing, 0);
  const ff = await loadFFmpeg((r) => prog.set(fill(TU.loading, { p: Math.round(r * 100) }), r));
  prog.set(TU.preparing, 0);
  return ff;
}

async function trim() {
  if (busy || !file) return;
  const { s, len } = range();
  if (!(len > 0)) { error.textContent = TU.badRange; error.hidden = false; return; }
  busy = true;
  cancelled = false;
  video.pause();
  error.hidden = true;
  resultBox.hidden = true;
  runBtn.disabled = true;
  const f = file;
  let inp = null;
  try {
    let ff;
    try { ff = await withEngine(); } catch (err) { throw Object.assign(err, { load: true }); }
    cancelBtn.hidden = false;
    inp = await mountInput(ff, f);
    const t0 = performance.now();
    const onTime = (t) => {
      const p = Math.min(1, t / len);
      prog.set(fill(TU.working, { p: Math.round(p * 100) }), p);
      const el = (performance.now() - t0) / 1000;
      leftText.textContent = p > 0.03 && el > 3 ? fill(TU.left, { t: fmtTime((el / p) * (1 - p)).replace(/\.\d$/, "") }) : "";
    };
    prog.set(fill(TU.working, { p: 0 }), 0);
    const common = ["-ss", s.toFixed(3), "-i", inp.path, "-t", len.toFixed(3), "-map", "0:v:0", "-map", "0:a:0?", "-sn", "-dn"];
    let out = "/out.mp4", type = "video/mp4", kept = false;
    let r, inCodec = "";
    if (mode === "fast") {
      inCodec = (await probe(ff, inp.path)).vcodec;
      r = await run(ff, [...common, "-c", "copy", "-avoid_negative_ts", "make_zero", "-movflags", "+faststart", "-y", out], onTime);
      if (r.ret !== 0 && [".webm", ".mkv", ".mov"].includes(inp.ext)) {
        // MP4에 그대로 못 담는 코덱이면 원래 형식으로 자르기
        try { await ff.deleteFile(out); } catch {}
        out = "/out" + inp.ext;
        type = f.type || "video/" + inp.ext.slice(1);
        kept = true;
        r = await run(ff, [...common, "-c", "copy", "-avoid_negative_ts", "make_zero", "-y", out], onTime);
      }
    } else {
      r = await run(ff, [...common, "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", "-y", out], onTime);
    }
    if (r.ret !== 0) { console.warn(r.log.slice(-2000)); throw new Error("ffmpeg exit " + r.ret); }
    const outLen = (await probe(ff, out)).duration || len;
    const blob = await takeOutput(ff, out, type);
    if (!blob.size) throw new Error("empty output");
    const ext = out.slice(out.lastIndexOf("."));
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    resultUrl = URL.createObjectURL(blob);
    resultVideo.src = resultUrl;
    summary.textContent = fill(TU.done, { len: fmtTime(outLen), size: fmtBytes(blob.size) });
    const odd = mode === "fast" && !kept && inCodec && !["h264", "hevc"].includes(inCodec);
    keptNote.hidden = !kept && !odd;
    keptNote.textContent = kept ? fill(TU.keptFormat, { ext: ext.slice(1).toUpperCase() }) : fill(TU.compat, { codec: inCodec.toUpperCase() });
    dlBtn.textContent = kept ? fill(TU.downloadAs, { ext: ext.slice(1).toUpperCase() }) : TU.download;
    dlBtn.onclick = () => download(blob, `${stripExt(f.name)}_${fmtTime(s).replace(/[:.]/g, "-")}${ext}`);
    resultBox.hidden = false;
  } catch (err) {
    if (!cancelled) {
      console.error(err);
      if (!err?.load) stopFFmpeg();   // 메모리 부족 등: 엔진을 새로 띄워요
      error.textContent = err?.load ? TU.loadFail : TU.fail;
      error.hidden = false;
    }
  } finally {
    if (inp) await Promise.race([inp.cleanup(), new Promise((r) => setTimeout(r, 1000))]);
    progBox.hidden = true;
    runBtn.disabled = false;
    busy = false;
  }
}

function cancel() {
  cancelled = true;
  stopFFmpeg();   // 진행 중인 exec는 오류로 끝나고, 다음에 다시 불러와요
  progBox.hidden = true;
}

function reset() {
  if (busy) cancel();
  video.pause();
  video.removeAttribute("src");
  video.load();
  file = null;
  editCard.hidden = true;
  uploadCard.hidden = false;
}
