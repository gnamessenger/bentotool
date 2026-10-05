// 영상 자막 만들기 — 음성 인식(Whisper)을 화면과 따로 돌리는 작업자(Web Worker).
// 화면(video-to-subtitles.js)이 16kHz 모노 소리를 보내면, 여기서 AI 모델을 받아 글자로 바꿔 돌려줘요.
import { pipeline, env, WhisperTextStreamer } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.0/dist/transformers.min.js";

env.allowLocalModels = false;

const CHUNK = 30; // Whisper는 한 번에 30초까지 들어요.

let asr = null;
let loadedKey = "";

// device: "webgpu" | "wasm"
async function load(model, device, dtype) {
  const key = `${model}|${device}|${JSON.stringify(dtype)}`;
  if (asr && loadedKey === key) return asr;
  if (asr) { try { await asr.dispose(); } catch {} asr = null; }
  const files = {};
  asr = await pipeline("automatic-speech-recognition", model, {
    device,
    dtype,
    progress_callback: (p) => {
      if (p.status === "progress" && p.total) {
        files[p.file] = { loaded: p.loaded, total: p.total };
        let loaded = 0, total = 0;
        for (const f of Object.values(files)) { loaded += f.loaded; total += f.total; }
        self.postMessage({ type: "download", loaded, total });
      }
    },
  });
  loadedKey = key;
  return asr;
}

// 30초씩 차례로 받아써요. 창 끝에서 잘린 문장은 버리고, 그 문장 시작점부터 다음 창을 열어요.
// (겹쳐 듣고 이어 붙이는 방식은 경계에서 같은 문장이 두 번 나오는 일이 잦았어요.)
async function transcribe({ audio, language }) {
  const SR = 16000, WIN = CHUNK * SR, len = audio.length;
  const out = [];
  let offset = 0;
  while (offset < len) {
    const end = Math.min(len, offset + WIN);
    const isLast = end >= len;
    const streamer = new WhisperTextStreamer(asr.tokenizer, {
      skip_prompt: true,
      callback_function: (text) => self.postMessage({ type: "text", text }),
    });
    const r = await asr(audio.subarray(offset, end), {
      language: language || null,
      task: "transcribe",
      return_timestamps: true,
      streamer,
    });
    const base = offset / SR;
    let chunks = (r.chunks || []).filter((c) => c.text.trim());
    let next = end;
    if (!isLast && chunks.length) {
      const last = chunks[chunks.length - 1];
      const lastEnd = last.timestamp[1];
      if (lastEnd == null || lastEnd > CHUNK - 0.5) {
        // 마지막 문장이 창 끝에서 잘렸어요 → 버리고 그 시작점부터 다시
        const s = Math.round((base + last.timestamp[0]) * SR);
        if (chunks.length > 1 && s > offset + SR) { chunks = chunks.slice(0, -1); next = s; }
      } else {
        next = Math.max(offset + SR, Math.min(end, Math.round((base + lastEnd) * SR)));
      }
    }
    for (const c of chunks) {
      const [s, e] = c.timestamp;
      out.push({ text: c.text, timestamp: [base + (s ?? 0), e == null ? null : base + e] });
    }
    offset = next;
    self.postMessage({ type: "step", done: Math.min(offset, len), total: len });
    self.postMessage({ type: "text", text: "\n" });
  }
  return { chunks: out, text: out.map((c) => c.text).join("") };
}

self.onmessage = async (e) => {
  const m = e.data;
  if (m.type !== "run") return;
  const t0 = performance.now();
  try {
    self.postMessage({ type: "stage", stage: "load" });
    await load(m.model, m.device, m.dtype);
    const t1 = performance.now();
    self.postMessage({ type: "stage", stage: "run" });
    const out = await transcribe(m);
    self.postMessage({ type: "done", text: out.text, chunks: out.chunks || [], loadMs: t1 - t0, runMs: performance.now() - t1 });
  } catch (err) {
    // 모델을 다시 받아야 할 수도 있으니 버려요.
    asr = null; loadedKey = "";
    self.postMessage({ type: "error", message: String(err?.message || err) });
  }
};
