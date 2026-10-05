import { h, TU, root, dropzone, field, select, download, stripExt, fill, fmtBytes, progressBox } from "../common.js";
import { loadFFmpeg, stopFFmpeg, mountInput, run, probe, takeOutput, fmtTime } from "./trim-video-ffmpeg.js";

const BIG = 500 * 1024 * 1024;   // 이보다 크면 메모리 경고

const format = select([["mp4", TU.mp4], ["webm", TU.webm]], "mp4");
const resolution = select([["0", TU.original], ["1080", "1080p"], ["720", "720p"], ["480", "480p"]], "0");

const drop = dropzone({ accept: "video/*,.mov,.mkv,.avi,.m4v,.3gp,.ts,.wmv,.flv,.mts", multiple: false, onFiles: (f) => convert(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop,
  h("div", { class: "options" }, field(TU.format, format), field(TU.resolution, resolution)),
  h("p", { class: "note" }, TU.slowNote), error);

const prog = progressBox();
const leftText = h("small", {});
const warnText = h("p", { class: "note warn", hidden: true });
prog.el.append(leftText);
const progCard = h("div", { class: "tool-card", hidden: true }, prog.el, warnText,
  h("div", { class: "batch-actions" }, h("button", { class: "btn ghost small", type: "button", onclick: cancel }, TU.cancel)));

const resultVideo = h("video", { controls: true, playsinline: true, class: "gif-video tv-result" });
const summary = h("p", { class: "big-result" });
const infoText = h("p", { class: "note" });
const remuxNote = h("p", { class: "note", hidden: true }, TU.remuxed);
const dlBtn = h("button", { class: "btn", type: "button" }, TU.download);
const resultCard = h("div", { class: "tool-card center", hidden: true }, resultVideo, summary, infoText, remuxNote,
  h("div", { class: "batch-actions" }, dlBtn, h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, progCard, resultCard);

let busy = false;
let cancelled = false;
let resultUrl = null;

function fail(msg) {
  error.textContent = msg;
  error.hidden = false;
}

async function convert(file) {
  if (busy) return;
  busy = true;
  cancelled = false;
  error.hidden = true;
  uploadCard.hidden = true;
  progCard.hidden = false;
  leftText.textContent = "";
  warnText.hidden = file.size <= BIG;
  warnText.textContent = fill(TU.bigWarn, { size: fmtBytes(file.size) });
  prog.set(TU.preparing, 0);
  const fmt = format.value;
  const target = +resolution.value;
  let inp = null;
  try {
    let ff;
    try {
      ff = await loadFFmpeg((r) => prog.set(fill(TU.loading, { p: Math.round(r * 100) }), r));
    } catch (err) { console.error(err); throw "load"; }
    prog.set(TU.preparing, 0);
    inp = await mountInput(ff, file);
    const info = await probe(ff, inp.path);
    if (!info.vcodec) throw "novideo";

    const short = Math.min(info.width, info.height);
    const scale = target && short > target;
    // 코덱이 이미 맞으면 다시 만들지 않고 그대로 옮겨 담아요 (영상·소리 따로 판단)
    const copyV = !scale && (fmt === "mp4" ? info.vcodec === "h264" : ["vp8", "vp9"].includes(info.vcodec));
    const copyA = !info.acodec || (fmt === "mp4" ? ["aac", "mp3"] : ["opus", "vorbis"]).includes(info.acodec);

    const out = "/out." + fmt;
    const type = "video/" + fmt;
    const args = ["-i", inp.path, "-map", "0:v:0", "-map", "0:a:0?", "-sn", "-dn"];
    if (copyV) {
      args.push("-c:v", "copy");
    } else {
      // 짧은 변을 target으로 (키우지는 않음), 코덱 조건 때문에 가로·세로는 짝수로
      args.push("-vf", scale
        ? `scale=w='if(gt(iw,ih),-2,${target})':h='if(gt(iw,ih),${target},-2)'`
        : "scale=trunc(iw/2)*2:trunc(ih/2)*2");
      if (fmt === "mp4") {
        args.push("-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-pix_fmt", "yuv420p");
      } else {
        const px = scale ? target * target * 16 / 9 : Math.max(1, info.width * info.height);
        const kbps = Math.round(Math.min(8000, Math.max(800, (px / (1280 * 720)) * 2500)));
        args.push("-c:v", "libvpx", "-deadline", "realtime", "-cpu-used", "8", "-crf", "10", "-b:v", kbps + "k", "-pix_fmt", "yuv420p");
      }
    }
    if (copyA) args.push("-c:a", "copy");
    else args.push("-c:a", fmt === "mp4" ? "aac" : "libopus", "-b:a", "128k");
    if (fmt === "mp4") args.push("-movflags", "+faststart");
    args.push("-y", out);

    const t0 = performance.now();
    prog.set(fill(TU.working, { p: 0 }), 0);
    const r = await run(ff, args, (t) => {
      const p = info.duration ? Math.min(1, t / info.duration) : 0;
      prog.set(fill(TU.working, { p: Math.round(p * 100) }), p);
      const el = (performance.now() - t0) / 1000;
      leftText.textContent = p > 0.03 && el > 3 ? fill(TU.left, { t: fmtTime((el / p) * (1 - p)).replace(/\.\d$/, "") }) : "";
    });
    if (r.ret !== 0) { console.warn(r.log.slice(-2000)); throw new Error("ffmpeg exit " + r.ret); }
    const outInfo = await probe(ff, out);
    const blob = await takeOutput(ff, out, type);
    if (!blob.size) throw new Error("empty output");

    if (resultUrl) URL.revokeObjectURL(resultUrl);
    resultUrl = URL.createObjectURL(blob);
    resultVideo.src = resultUrl;
    summary.textContent = fill(TU.done, { a: fmtBytes(file.size), b: fmtBytes(blob.size) });
    infoText.textContent = fill(TU.info, {
      fmt: `${fmt.toUpperCase()} (${[outInfo.vcodec, outInfo.acodec].filter(Boolean).join(" · ").toUpperCase()})`,
      res: outInfo.width ? `${outInfo.width}×${outInfo.height}` : "-",
      len: fmtTime(outInfo.duration || info.duration),
    });
    remuxNote.hidden = !copyV;
    dlBtn.onclick = () => download(blob, `${stripExt(file.name)}.${fmt}`);
    progCard.hidden = true;
    resultCard.hidden = false;
  } catch (err) {
    if (!cancelled) {
      if (err !== "load" && err !== "novideo") { console.error(err); stopFFmpeg(); }   // 메모리 부족 등: 엔진을 새로 띄워요
      fail(err === "load" ? TU.loadFail : err === "novideo" ? TU.noVideo : TU.fail);
    }
    progCard.hidden = true;
    uploadCard.hidden = false;
  } finally {
    if (inp) await Promise.race([inp.cleanup(), new Promise((r) => setTimeout(r, 1000))]);
    busy = false;
  }
}

function cancel() {
  cancelled = true;
  stopFFmpeg();
}

function reset() {
  resultVideo.pause();
  resultCard.hidden = true;
  uploadCard.hidden = false;
}
