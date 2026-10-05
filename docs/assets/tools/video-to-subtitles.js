import { h, T, U, TU, root, dropzone, field, select, download, stripExt, fill, fmtBytes, progressBox } from "../common.js";

// 모델과 장치별 파일 형식. mb = 첫 다운로드 크기 실측값(MiB, 모델 파일 기준. 실행 프로그램 약 6MB 별도).
// CPU(WASM): 8비트 압축 모델(q8). 그래픽카드(WebGPU)에서는 q8이 오히려 CPU보다 느려서(실측) 4비트·16비트 조합을 써요.
// 조합은 한국어 실측(글자 오류율)으로 골랐어요: base는 인코더를 4비트로 줄이면 오류가 크게 늘고, small은 그대로였어요.
const MODELS = {
  fast: {
    id: "onnx-community/whisper-base",
    wasm: { dtype: "q8", mb: 80 },
    webgpu: { dtype: { encoder_model: "fp32", decoder_model_merged: "q4" }, mb: 200 },
    webgpuF16: { dtype: { encoder_model: "fp16", decoder_model_merged: "q4" }, mb: 160 },
  },
  accurate: {
    id: "onnx-community/whisper-small",
    wasm: { dtype: "q8", mb: 240 },
    webgpu: { dtype: { encoder_model: "q4", decoder_model_merged: "q4" }, mb: 290 },
  },
  best: {
    // 그래픽카드(16비트 연산 지원) 전용. CPU로는 너무 크고 느려요.
    id: "onnx-community/whisper-large-v3-turbo",
    webgpuF16: { dtype: "q4f16", mb: 540 },
  },
};

const ko = T.lang === "ko";
let gpu = { ok: false, f16: false };
const langSel = select([["korean", TU.langKo], ["english", TU.langEn], ["", TU.langAuto]], ko ? "korean" : "");
const LABEL = { fast: TU.modelFast, accurate: TU.modelAccurate, best: TU.modelBest };
const modelSel = select(Object.keys(MODELS).map((k) => [k, label(k, "wasm")]), ko ? "accurate" : "fast");

function label(k, device) {
  const c = config(MODELS[k], device);
  return c ? fill(LABEL[k], { mb: c.mb }) : LABEL[k].replace(/\s*\(.*\)$/, "") + " " + TU.needGpu;
}

// 그래픽카드(WebGPU)를 쓸 수 있는지 미리 알아보고, 모델 이름 옆 크기를 맞춰 보여줘요.
const gpuReady = (async () => {
  try {
    const a = navigator.gpu && (await navigator.gpu.requestAdapter());
    if (a) gpu = { ok: true, f16: a.features.has("shader-f16") };
  } catch {}
  const device = gpu.ok ? "webgpu" : "wasm";
  for (const opt of modelSel.options) {
    opt.disabled = !config(MODELS[opt.value], device);
    opt.textContent = label(opt.value, device);
  }
  if (modelSel.selectedOptions[0]?.disabled) modelSel.value = "accurate";
})();

function config(m, device) {
  if (device === "webgpu") return (gpu.f16 && m.webgpuF16) || m.webgpu || null;
  return m.wasm || null;
}

const error = h("div", { class: "error-box", hidden: true });
const drop = dropzone({ accept: "video/*,audio/*,.mov,.mkv,.m4a,.mp3,.wav,.ogg,.flac,.aac", multiple: false, onFiles: (f) => run(f[0]) });
const uploadCard = h("div", { class: "tool-card" }, drop,
  h("div", { class: "options" }, field(TU.language, langSel), field(TU.model, modelSel)),
  h("p", { class: "note" }, TU.firstNote), error);

const prog = progressBox();
const live = h("div", { class: "vs-live" });
const cancelBtn = h("button", { class: "btn ghost small", type: "button", onclick: cancel }, TU.cancel);
const progCard = h("div", { class: "tool-card", hidden: true }, prog.el, live, h("div", { class: "batch-actions" }, cancelBtn));

const summary = h("p", { class: "big-result" });
const sub = h("p", { class: "hint-line" });
const stage = h("div", { class: "vs-stage" });
const caption = h("div", { class: "vs-caption" });
const list = h("div", { class: "vs-list" });
const copyBtn = h("button", { class: "btn ghost small", type: "button", onclick: copyText }, TU.copy);
const resultCard = h("div", { class: "tool-card", hidden: true },
  h("div", { class: "center" }, summary, sub),
  stage,
  h("p", { class: "note" }, TU.editHint),
  list,
  h("div", { class: "batch-actions" },
    h("button", { class: "btn", type: "button", onclick: () => save("srt") }, TU.saveSrt),
    h("button", { class: "btn", type: "button", onclick: () => save("vtt") }, TU.saveVtt),
    h("button", { class: "btn", type: "button", onclick: () => save("txt") }, TU.saveTxt),
    copyBtn,
    h("button", { class: "btn ghost small", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, progCard, resultCard);

let worker = null;
let job = null;      // { file, name, duration, segs: [{start,end,text}], media, mediaUrl }

function show(which) {
  uploadCard.hidden = which !== "upload";
  progCard.hidden = which !== "work";
  resultCard.hidden = which !== "result";
}

// ---------- 소리 읽기: 16kHz 모노 ----------
async function decode(file) {
  const ctx = new AudioContext({ sampleRate: 16000 });
  try {
    const buf = await ctx.decodeAudioData(await file.arrayBuffer());
    const n = buf.numberOfChannels;
    if (n === 1) return { audio: buf.getChannelData(0), duration: buf.duration };
    const out = new Float32Array(buf.length);
    for (let c = 0; c < n; c++) {
      const d = buf.getChannelData(c);
      for (let i = 0; i < d.length; i++) out[i] += d[i] / n;
    }
    return { audio: out, duration: buf.duration };
  } finally {
    ctx.close();
  }
}

function transcribe(audio, model, device, dtype, language, onMsg) {
  return new Promise((resolve, reject) => {
    worker ??= new Worker(new URL("./video-to-subtitles-worker.js", import.meta.url), { type: "module" });
    worker.onmessage = (e) => {
      const m = e.data;
      if (m.type === "done") resolve(m);
      else if (m.type === "error") reject(new Error(m.message));
      else onMsg(m);
    };
    worker.onerror = (e) => reject(new Error(e.message || "worker error"));
    // 소리 데이터는 복사하지 않고 넘겨요(메모리 절약).
    worker.postMessage({ type: "run", audio, model, device, dtype, language }, [audio.buffer]);
  });
}

const fmtClock = (s) => {
  s = Math.max(0, Math.round(s));
  const m = Math.floor(s / 60), r = s % 60;
  return m >= 60 ? `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${m}:${String(r).padStart(2, "0")}`;
};

async function run(file) {
  if (job) return;
  error.hidden = true;
  const me = (job = { file, name: stripExt(file.name) });
  show("work");
  live.textContent = "";
  prog.set(TU.decoding, 0);
  const language = langSel.value;
  try {
    const { audio, duration } = await decode(file);
    if (job !== me) return;
    me.duration = duration;
    if (duration < 0.5) throw new Error("empty");
    await gpuReady;
    let model = MODELS[modelSel.value];
    let device = gpu.ok && config(model, "webgpu") ? "webgpu" : "wasm";
    const t0 = performance.now();
    let runStart = 0;
    const onMsg = (m) => {
      if (job !== me) return;
      if (m.type === "download") prog.set(fill(TU.downloading, { a: fmtBytes(m.loaded), b: fmtBytes(m.total) }), m.loaded / m.total);
      else if (m.type === "stage" && m.stage === "load") prog.set(TU.loadingModel, 0);
      else if (m.type === "stage" && m.stage === "run") { runStart = performance.now(); prog.set(fill(TU.working, { p: 0, left: "…" }), 0); }
      else if (m.type === "step") {
        const r = m.done / m.total;
        const el = (performance.now() - runStart) / 1000;
        prog.set(fill(TU.working, { p: Math.round(r * 100), left: m.done < m.total ? fmtClock((el / m.done) * (m.total - m.done)) : "0:00" }), r);
      } else if (m.type === "text") {
        live.textContent += m.text;
        live.scrollTop = live.scrollHeight;
      }
    };
    let res;
    try {
      // 그래픽카드가 실패하면 CPU로 다시 해야 하니 그때만 소리 데이터를 복사해 둬요.
      res = await transcribe(device === "webgpu" ? audio.slice() : audio, model.id, device, config(model, device).dtype, language, onMsg);
    } catch (err) {
      if (job !== me || device !== "webgpu") throw err;
      // 그래픽카드(WebGPU)에서 실패하면 CPU(WASM)로 다시 해요. 그래픽카드 전용 모델이면 '정확' 모델로 바꿔요.
      console.warn("WebGPU failed, falling back to WASM:", err);
      worker?.terminate(); worker = null;
      device = "wasm";
      if (!config(model, "wasm")) model = MODELS.accurate;
      live.textContent = "";
      res = await transcribe(audio, model.id, device, config(model, device).dtype, language, onMsg);
    }
    if (job !== me) return;
    me.segs = toSegments(res.chunks, duration);
    if (!me.segs.length) throw new Error("empty");
    me.device = device;
    me.took = (performance.now() - t0) / 1000;
    showResult();
  } catch (err) {
    if (job !== me) return; // 취소됨
    console.error(err);
    error.textContent = err.message === "empty" ? TU.noSpeech : TU.fail;
    error.hidden = false;
    job = null;
    show("upload");
  }
}

function cancel() {
  worker?.terminate();
  worker = null;
  job = null;
  show("upload");
}

// ---------- 결과 정리 ----------
// Whisper가 주는 구간을 자막으로 보기 좋은 길이로 나눠요.
function toSegments(chunks, duration) {
  const segs = [];
  chunks.forEach((c, i) => {
    const text = dropLoops(c.text.trim());
    if (!text) return;
    let [start, end] = c.timestamp;
    start = start ?? 0;
    if (start >= duration - 0.05) return; // 영상이 끝난 뒤의 구간은 AI가 지어낸 말이에요.
    if (end == null || end <= start) end = Math.min(duration, chunks[i + 1]?.timestamp?.[0] ?? start + Math.max(2, text.length / 6));
    end = Math.min(end, duration);
    if (end <= start) end = Math.min(duration, start + 1);
    for (const part of splitText(text)) segs.push({ start: 0, end: 0, text: part, _w: [...part].length, _s: start, _e: end });
  });
  // 나눈 조각에 글자 수 비율로 시간 나누기
  let i = 0;
  while (i < segs.length) {
    let j = i; let total = 0;
    while (j < segs.length && segs[j]._s === segs[i]._s && segs[j]._e === segs[i]._e) total += segs[j++]._w;
    let t = segs[i]._s;
    const span = segs[i]._e - segs[i]._s;
    for (let k = i; k < j; k++) {
      segs[k].start = t;
      t += span * (segs[k]._w / total);
      segs[k].end = t;
    }
    i = j;
  }
  return segs.map(({ start, end, text }) => ({ start, end, text }));
}

// AI가 가끔 같은 말을 수십 번 되풀이해요(작은 모델에서 잦음). 3번 넘게 연달아 반복되면 한 번만 남겨요.
function dropLoops(text) {
  let w = text.split(/\s+/).filter(Boolean);
  for (let n = 1; n <= 6; n++) {
    const out = [];
    for (let i = 0; i < w.length;) {
      const gram = w.slice(i, i + n).join(" ");
      let k = 1;
      while (gram && w.slice(i + k * n, i + (k + 1) * n).join(" ") === gram) k++;
      if (k >= 3) { out.push(...w.slice(i, i + n)); i += k * n; }
      else out.push(w[i++]);
    }
    w = out;
  }
  return w.join(" ");
}

function splitText(text) {
  const max = /[가-힣぀-ヿ一-鿿]/.test(text) ? 40 : 84; // 한글·일본어·한자는 40자, 그 밖은 84자
  const chars = [...text];
  if (chars.length <= max) return [text];
  // 비슷한 길이로 나누되, 자르는 곳은 문장 끝 → 쉼표 → 띄어쓰기 순으로 골라요.
  const out = [];
  let rest = chars;
  while (rest.length > max) {
    const parts = Math.ceil(rest.length / max);
    const target = rest.length / parts;
    let best = -1, bestScore = Infinity;
    for (let i = Math.floor(target * 0.5); i < Math.min(max, rest.length - 1); i++) {
      const c = rest[i], next = rest[i + 1];
      if (next !== " " && c !== " ") continue;
      const kind = /[.!?。？！]/.test(c) ? 0 : /[,，、]/.test(c) ? 1 : c === " " ? 2 : 3;
      if (kind === 3) continue;
      const score = kind * target * 0.35 + Math.abs(i + 1 - target);
      if (score < bestScore) { bestScore = score; best = i + 1; }
    }
    if (best < 0) best = Math.min(max, Math.round(target));
    out.push(rest.slice(0, best).join("").trim());
    rest = rest.slice(best);
    while (rest[0] === " ") rest = rest.slice(1);
  }
  if (rest.length) out.push(rest.join("").trim());
  return out.filter(Boolean);
}

// ---------- 결과 화면 ----------
function showResult() {
  const { file, segs } = job;
  summary.textContent = fill(TU.done, { n: segs.length });
  sub.textContent = fill(TU.doneSub, { len: fmtClock(job.duration), took: fmtClock(job.took), dev: job.device === "webgpu" ? TU.devGpu : TU.devCpu });
  job.mediaUrl = URL.createObjectURL(file);
  const isVideo = file.type.startsWith("video/") || /\.(mp4|mov|mkv|webm|m4v)$/i.test(file.name);
  const media = isVideo
    ? h("video", { class: "vs-video", controls: true, playsinline: true, src: job.mediaUrl })
    : h("audio", { class: "result-audio", controls: true, src: job.mediaUrl });
  job.media = media;
  media.addEventListener("timeupdate", syncCaption);
  media.addEventListener("loadedmetadata", () => {
    // 소리만 있는 파일(또는 영상이 안 열리는 파일)은 플레이어 모양을 오디오로 바꿔요.
    if (isVideo && !media.videoWidth) media.className = "result-audio";
  });
  stage.replaceChildren(h("div", { class: "vs-player" + (isVideo ? " is-video" : "") }, media, caption));
  renderList();
  show("result");
}

const timeInput = (seg, key) => {
  const inp = h("input", { type: "text", class: "vs-time", value: fmtTime(seg[key], "."), inputmode: "decimal", "aria-label": key === "start" ? TU.start : TU.end });
  inp.addEventListener("change", () => {
    const v = parseTime(inp.value);
    if (v != null) seg[key] = v;
    inp.value = fmtTime(seg[key], ".");
    syncCaption();
  });
  return inp;
};

function renderList() {
  list.replaceChildren(...job.segs.map((seg, i) => {
    const text = h("textarea", { class: "vs-text", rows: 1, value: seg.text, "aria-label": TU.textLabel });
    text.addEventListener("input", () => { seg.text = text.value; syncCaption(); });
    const row = h("div", { class: "vs-row" },
      h("button", { class: "icon-btn vs-play", type: "button", title: TU.playHere, onclick: () => { job.media.currentTime = seg.start + 0.01; job.media.play(); } }, "▶"),
      h("div", { class: "vs-times" }, timeInput(seg, "start"), h("span", {}, "→"), timeInput(seg, "end")),
      text,
      h("button", { class: "icon-btn", type: "button", title: U.remove, onclick: () => { job.segs.splice(i, 1); renderList(); } }, "✕"));
    seg.row = row;
    return row;
  }));
  syncCaption();
}

function syncCaption() {
  if (!job?.media) return;
  const t = job.media.currentTime;
  let cur = null;
  for (const s of job.segs) {
    const on = t >= s.start && t < s.end;
    s.row?.classList.toggle("on", on);
    if (on) cur = s;
  }
  caption.textContent = cur ? cur.text : "";
  caption.hidden = !cur;
}

// ---------- 시간 표시 ----------
function fmtTime(s, sep) {
  const ms = Math.round(Math.max(0, s) * 1000);
  const hh = Math.floor(ms / 3600000), mm = Math.floor(ms / 60000) % 60, ss = Math.floor(ms / 1000) % 60, mmm = ms % 1000;
  const p = (n, w = 2) => String(n).padStart(w, "0");
  return `${p(hh)}:${p(mm)}:${p(ss)}${sep}${p(mmm, 3)}`;
}
function parseTime(str) {
  const m = String(str).trim().replace(",", ".").match(/^(?:(\d+):)?(?:(\d+):)?(\d+(?:\.\d+)?)$/);
  if (!m) return null;
  const parts = [m[1], m[2], m[3]].filter((x) => x != null).map(Number);
  let s = 0;
  for (const p of parts) s = s * 60 + p;
  return s;
}

// ---------- 저장 ----------
function build(kind) {
  const segs = job.segs.filter((s) => s.text.trim()).slice().sort((a, b) => a.start - b.start);
  if (kind === "txt") return segs.map((s) => s.text.trim()).join("\n") + "\n";
  if (kind === "srt") return segs.map((s, i) => `${i + 1}\n${fmtTime(s.start, ",")} --> ${fmtTime(Math.max(s.end, s.start + 0.1), ",")}\n${s.text.trim()}\n`).join("\n");
  return "WEBVTT\n\n" + segs.map((s) => `${fmtTime(s.start, ".")} --> ${fmtTime(Math.max(s.end, s.start + 0.1), ".")}\n${s.text.trim()}\n`).join("\n");
}

function save(kind) {
  const type = { srt: "application/x-subrip", vtt: "text/vtt", txt: "text/plain" }[kind];
  // 윈도우 메모장·일부 편집 프로그램에서 한글이 깨지지 않게 SRT·TXT 앞에 BOM을 붙여요.
  const bom = kind === "vtt" ? "" : "﻿";
  download(new Blob([bom + build(kind)], { type: type + ";charset=utf-8" }), `${job.name}.${kind}`);
}

async function copyText() {
  try {
    await navigator.clipboard.writeText(build("txt"));
    copyBtn.textContent = TU.copied;
    setTimeout(() => (copyBtn.textContent = TU.copy), 1200);
  } catch {}
}

function reset() {
  job?.media?.pause();
  if (job?.mediaUrl) URL.revokeObjectURL(job.mediaUrl);
  job = null;
  stage.replaceChildren();
  list.replaceChildren();
  show("upload");
}
