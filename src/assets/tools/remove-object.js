import { h, TU, root, dropzone, field, download, stripExt, canvasBlob, fill, fmtBytes, EXT } from "../common.js";

// AI 인페인팅: MI-GAN (Picsart AI Research, MIT 라이선스) ONNX 파이프라인을 onnxruntime-web으로 실행해요.
// 파이프라인이 칠한 부분 주변을 알아서 잘라 512px로 처리한 뒤 원본 크기에 다시 붙여요.
const ORT = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.30.0/dist/";
const MODEL = "https://huggingface.co/andraniksargsyan/migan/resolve/406830d0fa60666da0071c342ad2fbc8f30c5c64/migan_pipeline_v2.onnx";
const MODEL_SIZE = 28079181;
const MAX_SIDE = 4096;   // 이보다 큰 사진은 이 크기로 줄여서 작업해요
const HISTORY = 20;

// ---------- 모델 준비 (WebGPU가 되면 GPU, 아니면 CPU(WASM)) ----------
let ortP = null, sessionP = null, usedEP = "";
function loadOrt() {
  ortP ??= import(`${ORT}ort.webgpu.min.mjs`).then((ort) => {
    ort.env.wasm.numThreads = 1;          // GitHub Pages는 교차 출처 격리가 없어 스레드를 못 써요
    ort.env.wasm.wasmPaths = ORT;
    ort.env.logLevel = "error";
    return ort;
  });
  return ortP;
}

async function fetchModel(onProgress) {
  let cache = null;
  try { cache = await caches.open("bentotool-models"); const hit = await cache.match(MODEL); if (hit) return new Uint8Array(await hit.arrayBuffer()); } catch { cache = null; }
  const res = await fetch(MODEL);
  if (!res.ok) throw new Error("model " + res.status);
  const total = +res.headers.get("content-length") || MODEL_SIZE;
  const reader = res.body.getReader();
  const buf = new Uint8Array(total);
  let got = 0, chunks = null;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!chunks && got + value.length > total) chunks = [buf.slice(0, got)];
    if (chunks) chunks.push(value); else buf.set(value, got);
    got += value.length;
    onProgress(Math.min(1, got / total));
  }
  let data = buf.subarray(0, got);
  if (chunks) { data = new Uint8Array(got); let o = 0; for (const c of chunks) { data.set(c, o); o += c.length; } }
  try { await cache?.put(MODEL, new Response(data.slice())); } catch { /* 저장 공간이 없으면 다음에 다시 받아요 */ }
  return data;
}

async function hasWebGPU() {
  try { return !!(navigator.gpu && (await navigator.gpu.requestAdapter())); } catch { return false; }
}

function getSession(onProgress) {
  sessionP ??= (async () => {
    const [ort, bytes] = await Promise.all([loadOrt(), fetchModel(onProgress)]);
    if (await hasWebGPU()) {
      try { const s = await ort.InferenceSession.create(bytes, { executionProviders: ["webgpu"], logSeverityLevel: 3 }); usedEP = "webgpu"; return { ort, s, bytes }; }
      catch (e) { console.warn("WebGPU unavailable, using WASM", e); }
    }
    const s = await ort.InferenceSession.create(bytes, { executionProviders: ["wasm"], logSeverityLevel: 3 });
    usedEP = "wasm";
    return { ort, s, bytes };
  })();
  sessionP.catch(() => { sessionP = null; });
  return sessionP;
}

// ---------- 화면 ----------
let file = null, W = 0, H = 0;
let history = [];       // 되돌리기용 { img: ImageData | null, mask: ImageData }
let busy = false;

const drop = dropzone({ accept: "image/*", multiple: false, onFiles: (f) => open(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop, error);

const imgCanvas = h("canvas", { class: "ro-img" });
const maskCanvas = h("canvas", { class: "ro-mask" });
const origCanvas = h("canvas", { class: "ro-orig", hidden: true });
const cursor = h("div", { class: "ro-cursor", hidden: true });
const stage = h("div", { class: "ro-stage checker" }, imgCanvas, origCanvas, maskCanvas, cursor);
const status = h("p", { class: "bf-status" });
const barFill = h("div");
const bar = h("div", { class: "ro-bar", hidden: true }, barFill);

const sizeInput = h("input", { type: "range", min: 6, max: 120, value: 40 });
const sizeLabel = h("b", {}, "40");
const undoBtn = h("button", { class: "chip", type: "button", onclick: undo, disabled: true }, "↶ " + TU.undo);
const clearBtn = h("button", { class: "chip", type: "button", onclick: clearMask }, TU.clearMask);
const compareBtn = h("button", { class: "chip", type: "button", hidden: true }, TU.compare);
const runBtn = h("button", { class: "btn", type: "button", onclick: run, disabled: true }, TU.run);
const saveBtn = h("button", { class: "btn ghost", type: "button", onclick: save, hidden: true }, TU.save);

const editCard = h("div", { class: "tool-card", hidden: true },
  status, bar,
  h("div", { class: "options ro-tools" }, field(TU.brush, sizeInput, sizeLabel), undoBtn, clearBtn, compareBtn),
  stage,
  h("p", { class: "hint-line" }, TU.hint),
  h("div", { class: "batch-actions" }, runBtn, saveBtn,
    h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, editCard);
sizeInput.addEventListener("input", () => { sizeLabel.textContent = sizeInput.value; });

const mctx = () => maskCanvas.getContext("2d", { willReadFrequently: true });
const ictx = () => imgCanvas.getContext("2d", { willReadFrequently: true });

function setStatus(text, ratio = null) {
  status.textContent = text;
  status.classList.toggle("busy", ratio !== null);
  bar.hidden = ratio === null;
  if (ratio !== null) barFill.style.width = Math.round(Math.min(1, Math.max(0, ratio)) * 100) + "%";
}

async function open(f) {
  error.hidden = true;
  let bmp;
  try { bmp = await createImageBitmap(f); }
  catch { error.textContent = TU.badFile; error.hidden = false; return; }
  file = f;
  const s = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
  W = Math.round(bmp.width * s); H = Math.round(bmp.height * s);
  for (const c of [imgCanvas, maskCanvas, origCanvas]) { c.width = W; c.height = H; }
  ictx().drawImage(bmp, 0, 0, W, H);
  origCanvas.getContext("2d").drawImage(imgCanvas, 0, 0);
  bmp.close?.();
  mctx().clearRect(0, 0, W, H);
  stage.style.setProperty("--ar", W / H);
  history = [];
  saveBtn.hidden = true;
  compareBtn.hidden = true;
  uploadCard.hidden = true;
  editCard.hidden = false;
  setStatus(s < 1 ? fill(TU.shrunk, { w: W, h: H }) : TU.ready);
  updateButtons();
  // 사진을 칠하는 동안 모델을 미리 받아 둬요
  getSession((p) => { if (!busy && !dirty) setStatus(fill(TU.downloading, { p: Math.round(p * 100), size: fmtBytes(MODEL_SIZE) }), p); })
    .then(() => { if (!busy && !painting) setStatus(dirty ? TU.painted : TU.ready); })
    .catch((e) => { console.error(e); if (!busy) setStatus(TU.modelFail); });
}

// ---------- 칠하기 ----------
let painting = false, last = null, dirty = false;
function toImg(e) {
  const r = maskCanvas.getBoundingClientRect();
  return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H, k: W / r.width };
}
function brushPx(k) { return Math.max(2, +sizeInput.value * k); }

function stroke(a, b) {
  const ctx = mctx();
  ctx.strokeStyle = ctx.fillStyle = "#7D55C7";
  ctx.lineCap = ctx.lineJoin = "round";
  ctx.lineWidth = brushPx(b.k);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x + 0.01, b.y);
  ctx.stroke();
}

function moveCursor(e) {
  const r = stage.getBoundingClientRect();
  const d = +sizeInput.value;
  Object.assign(cursor.style, { width: d + "px", height: d + "px", left: e.clientX - r.left - d / 2 + "px", top: e.clientY - r.top - d / 2 + "px" });
}

maskCanvas.addEventListener("pointerdown", (e) => {
  if (busy) return;
  e.preventDefault();
  maskCanvas.setPointerCapture(e.pointerId);
  pushHistory(false);
  painting = true; dirty = true;
  last = toImg(e);
  stroke(last, last);
});
maskCanvas.addEventListener("pointermove", (e) => {
  if (e.pointerType === "mouse") { cursor.hidden = false; moveCursor(e); }
  if (!painting) return;
  const p = toImg(e);
  stroke(last, p);
  last = p;
});
const endStroke = () => {
  if (!painting) return;
  painting = false;
  setStatus(TU.painted);
  updateButtons();
};
maskCanvas.addEventListener("pointerup", endStroke);
maskCanvas.addEventListener("pointercancel", endStroke);
maskCanvas.addEventListener("pointerleave", () => { cursor.hidden = true; });

function hasMask() {
  if (!W) return false;
  if (!dirty) return false;
  const d = mctx().getImageData(0, 0, W, H).data;
  for (let i = 3; i < d.length; i += 4) if (d[i]) return true;
  dirty = false;
  return false;
}

function pushHistory(withImage) {
  history.push({ mask: mctx().getImageData(0, 0, W, H), img: withImage ? ictx().getImageData(0, 0, W, H) : null });
  if (history.length > HISTORY) history.shift();
}

function undo() {
  const st = history.pop();
  if (!st || busy) return;
  mctx().putImageData(st.mask, 0, 0);
  if (st.img) ictx().putImageData(st.img, 0, 0);
  dirty = true;
  setStatus(hasMask() ? TU.painted : TU.ready);
  updateButtons();
}

function clearMask() {
  if (busy || !hasMask()) return;
  pushHistory(false);
  mctx().clearRect(0, 0, W, H);
  dirty = false;
  setStatus(TU.ready);
  updateButtons();
}

function updateButtons() {
  const m = hasMask();
  runBtn.disabled = busy || !m;
  undoBtn.disabled = busy || !history.length;
  clearBtn.disabled = busy || !m;
}

// ---------- 지우기 실행 ----------
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));

async function run() {
  if (busy || !hasMask()) return;
  busy = true;
  updateButtons();
  try {
    setStatus(TU.preparing, 0);
    const { ort, s, bytes } = await getSession((p) => setStatus(fill(TU.downloading, { p: Math.round(p * 100), size: fmtBytes(MODEL_SIZE) }), p));
    setStatus(usedEP === "webgpu" ? TU.erasingGpu : TU.erasingCpu, 0.5);
    await nextFrame();

    // 칠한 곳 = 0(지울 곳), 나머지 = 255. 경계가 남지 않게 몇 픽셀 넓혀요.
    const grow = Math.max(3, Math.round(Math.max(W, H) * 0.004));
    const big = document.createElement("canvas");
    big.width = W; big.height = H;
    const bctx = big.getContext("2d", { willReadFrequently: true });
    for (let a = 0; a < 16; a++) {
      const t = (a / 16) * Math.PI * 2;
      bctx.drawImage(maskCanvas, Math.round(Math.cos(t) * grow), Math.round(Math.sin(t) * grow));
    }
    bctx.drawImage(maskCanvas, 0, 0);
    const md = bctx.getImageData(0, 0, W, H).data;
    const src = ictx().getImageData(0, 0, W, H);
    const N = W * H, sd = src.data;
    const img = new Uint8Array(3 * N), mask = new Uint8Array(N);
    for (let i = 0, j = 0; i < N; i++, j += 4) {
      img[i] = sd[j]; img[N + i] = sd[j + 1]; img[2 * N + i] = sd[j + 2];
      mask[i] = md[j + 3] > 20 ? 0 : 255;
    }
    const feeds = { image: new ort.Tensor("uint8", img, [1, 3, H, W]), mask: new ort.Tensor("uint8", mask, [1, 1, H, W]) };
    let out;
    try {
      out = (await s.run(feeds)).result.data;
    } catch (e) {
      if (usedEP !== "webgpu") throw e;
      // GPU에서 실패하면 CPU로 한 번 더
      console.warn("WebGPU run failed, retrying on WASM", e);
      const cpu = await ort.InferenceSession.create(bytes, { executionProviders: ["wasm"], logSeverityLevel: 3 });
      sessionP = Promise.resolve({ ort, s: cpu, bytes });
      usedEP = "wasm";
      setStatus(TU.erasingCpu, 0.5);
      await nextFrame();
      out = (await cpu.run(feeds)).result.data;
    }
    pushHistory(true);
    // 칠한 곳만 바꾸고 나머지 픽셀은 원래 그대로 둬요
    const rd = src.data;
    for (let i = 0, j = 0; i < N; i++, j += 4) {
      if (mask[i]) continue;
      rd[j] = out[i]; rd[j + 1] = out[N + i]; rd[j + 2] = out[2 * N + i];
    }
    ictx().putImageData(src, 0, 0);
    mctx().clearRect(0, 0, W, H);
    dirty = false;
    saveBtn.hidden = false;
    compareBtn.hidden = false;
    setStatus(TU.done);
  } catch (err) {
    console.error(err);
    setStatus(TU.fail);
  } finally {
    busy = false;
    updateButtons();
  }
}

// 원본 비교 (누르고 있는 동안)
const showOrig = (on) => { origCanvas.hidden = !on; maskCanvas.style.visibility = on ? "hidden" : ""; };
compareBtn.addEventListener("pointerdown", () => showOrig(true));
for (const ev of ["pointerup", "pointerleave", "pointercancel"]) compareBtn.addEventListener(ev, () => showOrig(false));

async function save() {
  const type = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
  download(await canvasBlob(imgCanvas, type, 0.95), `${stripExt(file.name)}_erased${EXT[type]}`);
}

function reset() {
  if (busy) return;
  file = null; history = []; W = H = 0;
  editCard.hidden = true;
  uploadCard.hidden = false;
}
