import { h, TU, root, dropzone, download, stripExt, canvasBlob, fill, fmtBytes, EXT } from "../common.js";

// AI 화질 개선: Real-ESRGAN realesr-general-x4v3 (BSD-3-Clause) ONNX를 onnxruntime-web으로 실행해요.
// 사진을 작은 조각(타일)으로 나눠 하나씩 4배로 키우고, 2배는 4배 결과를 반으로 줄여 만들어요.
const ORT = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.30.0/dist/";
const MODEL = "https://huggingface.co/CoderViking/realesr-general-x4v3-onnx/resolve/c6a971706797c7502945a2b4c4274fce4900d4ab/realesr-general-x4v3.onnx";
const MODEL_SIZE = 4866417;
const PAD = 12;                                   // 조각 경계가 티 나지 않게 주변을 겹쳐서 처리
const TILE = { webgpu: 256, wasm: 192 };
// 입력 최대 크기(화소 수). 이보다 크면 먼저 줄여서 처리해요.
// GPU: 결과가 1,600만 화소를 넘지 않게(일부 휴대폰 브라우저의 그림 크기 한도·메모리). CPU: 너무 오래 걸리지 않게.
const MAX_PIXELS = { webgpu: { 2: 4_000_000, 4: 1_000_000 }, wasm: { 2: 1_000_000, 4: 1_000_000 } };
let gpuGuess = false;   // 모델 준비 전, WebGPU가 될 것 같은지
const gpuCheck = (async () => { try { return !!(navigator.gpu && (await navigator.gpu.requestAdapter())); } catch { return false; } })();

// ---------- 모델 준비 ----------
let ortP = null, sessionP = null, usedEP = "";
function loadOrt() {
  ortP ??= import(`${ORT}ort.webgpu.min.mjs`).then((ort) => {
    ort.env.wasm.numThreads = 1;
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
  const parts = [];
  let got = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    parts.push(value);
    got += value.length;
    onProgress(Math.min(1, got / total));
  }
  const data = new Uint8Array(got);
  let o = 0;
  for (const p of parts) { data.set(p, o); o += p.length; }
  try { await cache?.put(MODEL, new Response(data.slice())); } catch { /* 다음에 다시 받아요 */ }
  return data;
}

async function hasWebGPU() {
  try { return !!(navigator.gpu && (await navigator.gpu.requestAdapter())); } catch { return false; }
}

async function makeSession(ort, bytes, ep) {
  const s = await ort.InferenceSession.create(bytes, { executionProviders: [ep], logSeverityLevel: 3 });
  usedEP = ep;
  return { ort, s, bytes };
}

function getSession(onProgress) {
  sessionP ??= (async () => {
    const [ort, bytes] = await Promise.all([loadOrt(), fetchModel(onProgress)]);
    if (await hasWebGPU()) {
      try {
        const r = await makeSession(ort, bytes, "webgpu");
        // 작은 시험 실행으로 GPU가 제대로 도는지 확인
        const t = await r.s.run({ input: new ort.Tensor("float32", new Float32Array(3 * 16 * 16).fill(0.5), [1, 3, 16, 16]) });
        if (Number.isFinite(t.output.data[0])) return r;
      } catch (e) { console.warn("WebGPU unavailable, using WASM", e); }
    }
    return makeSession(ort, bytes, "wasm");
  })();
  sessionP.catch(() => { sessionP = null; });
  return sessionP;
}

// ---------- 화면 ----------
let file = null, bmp = null, scale = 2, busy = false, cancel = false, result = null;

const drop = dropzone({ accept: "image/*", multiple: false, onFiles: (f) => open(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadCard = h("div", { class: "tool-card" }, drop, error);

const chips = [2, 4].map((n) => h("button", { class: "chip" + (n === scale ? " active" : ""), type: "button", onclick: () => pickScale(n) }, fill(TU.times, { n })));
const preview = h("img", { class: "up-preview checker", alt: "" });
const info = h("p", { class: "up-info" });
const runBtn = h("button", { class: "btn", type: "button", onclick: run }, TU.run);
const setupCard = h("div", { class: "tool-card", hidden: true },
  h("div", { class: "up-layout" },
    preview,
    h("div", { class: "up-side" },
      h("div", {}, h("h3", {}, TU.scale), h("div", { class: "chips" }, chips)),
      info,
      runBtn,
      h("button", { class: "btn ghost small", type: "button", onclick: reset }, TU.another))));

const progText = h("p", { class: "progress-text" });
const barFill = h("div");
const progSub = h("small");
const stopBtn = h("button", { class: "btn ghost small", type: "button", onclick: () => { cancel = true; } }, TU.stop);
const progressCard = h("div", { class: "tool-card", hidden: true },
  h("div", { class: "progress" }, h("div", { class: "spinner" }), progText, h("div", { class: "bar" }, barFill), progSub,
    h("div", { class: "batch-actions" }, stopBtn)));

// 결과: 같은 부분을 원본(확대만)과 AI 결과로 나란히 비교
const cmpOrig = h("canvas", { class: "up-crop" });
const cmpNew = h("canvas", { class: "up-crop" });
const resultInfo = h("p", { class: "up-info center" });
const resultCard = h("div", { class: "tool-card", hidden: true },
  resultInfo,
  h("div", { class: "up-compare" },
    h("figure", {}, cmpOrig, h("figcaption", {}, TU.before)),
    h("figure", {}, cmpNew, h("figcaption", {}, TU.after))),
  h("p", { class: "hint-line" }, TU.compareHint),
  h("div", { class: "batch-actions" },
    h("button", { class: "btn", type: "button", onclick: save }, TU.save),
    h("button", { class: "btn ghost", type: "button", onclick: () => show("setup") }, TU.again),
    h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, setupCard, progressCard, resultCard);

function show(which) {
  uploadCard.hidden = which !== "upload";
  setupCard.hidden = which !== "setup";
  progressCard.hidden = which !== "work";
  resultCard.hidden = which !== "result";
}

function setProgress(text, ratio, sub = "") {
  progText.textContent = text;
  barFill.style.width = Math.round(Math.min(1, Math.max(0, ratio)) * 100) + "%";
  progSub.textContent = sub;
}

function inputSize() {
  const max = MAX_PIXELS[usedEP || (gpuGuess ? "webgpu" : "wasm")][scale];
  const k = Math.min(1, Math.sqrt(max / (bmp.width * bmp.height)));
  return { w: Math.max(1, Math.floor(bmp.width * k)), h: Math.max(1, Math.floor(bmp.height * k)), shrunk: k < 1 };
}

function updateInfo() {
  const s = inputSize();
  info.replaceChildren(
    fill(TU.sizeLine, { w: bmp.width, h: bmp.height, W: s.w * scale, H: s.h * scale }),
    s.shrunk ? h("span", { class: "warn" }, " " + fill(TU.shrunk, { w: s.w, h: s.h })) : "",
    (usedEP || (gpuGuess ? "webgpu" : "wasm")) === "wasm" ? h("span", { class: "up-cpu" }, TU.cpuNote) : "");
}

function pickScale(n) {
  scale = n;
  chips.forEach((c, i) => c.classList.toggle("active", [2, 4][i] === n));
  updateInfo();
}

async function open(f) {
  error.hidden = true;
  try { bmp = await createImageBitmap(f); }
  catch { error.textContent = TU.badFile; error.hidden = false; return; }
  file = f;
  preview.src = URL.createObjectURL(f);
  gpuGuess = await gpuCheck;
  updateInfo();
  show("setup");
  getSession(() => {}).then(() => { if (bmp && !busy) updateInfo(); }).catch(() => {});   // 미리 받아 두기
}

const nextFrame = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
const fmtTime = (sec) => sec < 60 ? fill(TU.sec, { n: Math.max(1, Math.round(sec)) }) : fill(TU.min, { m: Math.floor(sec / 60), s: Math.round(sec % 60) });

async function run() {
  if (busy) return;
  busy = true; cancel = false; result = null;
  show("work");
  setProgress(TU.preparing, 0);
  try {
    const { ort, s } = await getSession((p) => setProgress(fill(TU.downloading, { p: Math.round(p * 100), size: fmtBytes(MODEL_SIZE) }), p));
    const { w, h: hh } = inputSize();
    const src = document.createElement("canvas");
    src.width = w; src.height = hh;
    const sctx = src.getContext("2d", { willReadFrequently: true });
    sctx.imageSmoothingQuality = "high";
    sctx.drawImage(bmp, 0, 0, w, hh);

    const out = document.createElement("canvas");
    out.width = w * scale; out.height = hh * scale;
    const octx = out.getContext("2d");
    octx.imageSmoothingQuality = "high";

    const T = TILE[usedEP] || 128;
    const tiles = [];
    for (let y = 0; y < hh; y += T) for (let x = 0; x < w; x += T) tiles.push({ x, y, cw: Math.min(T, w - x), ch: Math.min(T, hh - y) });
    // 모든 조각을 같은 크기로 처리(가장자리 조각은 안쪽으로 밀어서)
    const SW = Math.min(w, T + PAD * 2), SH = Math.min(hh, T + PAD * 2);
    const tileCanvas = document.createElement("canvas");
    tileCanvas.width = SW * 4; tileCanvas.height = SH * 4;
    const tctx = tileCanvas.getContext("2d");
    const plane = SW * SH;
    const input = new Float32Array(3 * plane);
    const t0 = performance.now();
    const label = usedEP === "webgpu" ? TU.workingGpu : TU.workingCpu;

    for (let i = 0; i < tiles.length; i++) {
      if (cancel) throw new Error("cancelled");
      const t = tiles[i];
      const ix = Math.min(Math.max(0, t.x - PAD), w - SW), iy = Math.min(Math.max(0, t.y - PAD), hh - SH);
      const px = sctx.getImageData(ix, iy, SW, SH).data;
      for (let k = 0, j = 0; k < plane; k++, j += 4) {
        input[k] = px[j] / 255; input[plane + k] = px[j + 1] / 255; input[2 * plane + k] = px[j + 2] / 255;
      }
      const r = await s.run({ input: new ort.Tensor("float32", input, [1, 3, SH, SW]) });
      const o = r.output.data, OW = SW * 4, OP = OW * SH * 4;
      const img = new ImageData(OW, SH * 4);
      const d = img.data;
      for (let k = 0, j = 0; k < OP; k++, j += 4) {
        d[j] = o[k] * 255 + 0.5; d[j + 1] = o[OP + k] * 255 + 0.5; d[j + 2] = o[2 * OP + k] * 255 + 0.5; d[j + 3] = 255;
      }
      r.output.dispose?.();
      tctx.putImageData(img, 0, 0);
      octx.drawImage(tileCanvas, (t.x - ix) * 4, (t.y - iy) * 4, t.cw * 4, t.ch * 4, t.x * scale, t.y * scale, t.cw * scale, t.ch * scale);
      const done = i + 1, el = (performance.now() - t0) / 1000;
      setProgress(label, done / tiles.length,
        fill(TU.tileLine, { i: done, n: tiles.length }) + (done < tiles.length && el > 2 ? " · " + fill(TU.left, { t: fmtTime((el / done) * (tiles.length - done)) }) : ""));
      await nextFrame();
    }

    // 투명한 부분이 있는 사진은 투명도도 같이 키워요
    if (hasAlpha(sctx, w, hh)) {
      octx.globalCompositeOperation = "destination-in";
      octx.drawImage(src, 0, 0, out.width, out.height);
      octx.globalCompositeOperation = "source-over";
    }

    const sec = (performance.now() - t0) / 1000;
    result = { canvas: out, src, w, h: hh };
    resultInfo.textContent = fill(TU.doneLine, { w: out.width, h: out.height, t: fmtTime(sec) });
    drawCompare(0.5, 0.5);
    show("result");
  } catch (err) {
    if (err.message !== "cancelled") console.error(err);
    error.textContent = err.message === "cancelled" ? TU.cancelled : TU.fail;
    error.hidden = false;
    show("upload");
  } finally {
    busy = false;
  }
}

function hasAlpha(ctx, w, hh) {
  const d = ctx.getImageData(0, 0, w, hh).data;
  for (let i = 3; i < d.length; i += 4) if (d[i] < 255) return true;
  return false;
}

// 확대 비교: 결과 그림의 한 부분을 실제 픽셀 크기로 보여줘요
function drawCompare(fx, fy) {
  if (!result) return;
  const { canvas: out, src } = result;
  const V = Math.min(360, out.width, out.height);
  const cx = Math.round(Math.min(out.width - V, Math.max(0, fx * out.width - V / 2)));
  const cy = Math.round(Math.min(out.height - V, Math.max(0, fy * out.height - V / 2)));
  for (const c of [cmpOrig, cmpNew]) { c.width = V; c.height = V; }
  const a = cmpOrig.getContext("2d");
  a.imageSmoothingQuality = "high";
  a.drawImage(src, cx / scale, cy / scale, V / scale, V / scale, 0, 0, V, V);
  cmpNew.getContext("2d").drawImage(out, cx, cy, V, V, 0, 0, V, V);
}
for (const c of [cmpOrig, cmpNew]) {
  let drag = null;
  c.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY, fx: c.fx ?? 0.5, fy: c.fy ?? 0.5 }; c.setPointerCapture(e.pointerId); });
  c.addEventListener("pointermove", (e) => {
    if (!drag || !result) return;
    const k = c.width / c.getBoundingClientRect().width;
    const fx = Math.min(1, Math.max(0, drag.fx - ((e.clientX - drag.x) * k) / result.canvas.width));
    const fy = Math.min(1, Math.max(0, drag.fy - ((e.clientY - drag.y) * k) / result.canvas.height));
    cmpOrig.fx = cmpNew.fx = fx; cmpOrig.fy = cmpNew.fy = fy;
    drawCompare(fx, fy);
  });
  c.addEventListener("pointerup", () => { drag = null; });
}

async function save() {
  if (!result) return;
  const type = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
  download(await canvasBlob(result.canvas, type, 0.95), `${stripExt(file.name)}_x${scale}${EXT[type]}`);
}

function reset() {
  if (busy) return;
  result = null; bmp = null; file = null;
  cmpOrig.fx = cmpNew.fx = cmpOrig.fy = cmpNew.fy = undefined;
  show("upload");
}
