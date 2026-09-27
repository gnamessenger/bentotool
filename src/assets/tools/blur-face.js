import { h, TU, root, dropzone, field, select, download, stripExt, canvasBlob, fill, EXT } from "../common.js";

const MP = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
const MODEL = "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite";

let bitmap = null, file = null, boxes = [];

// ---------- 화면 ----------
const drop = dropzone({ accept: "image/*", multiple: false, onFiles: (f) => open(f[0]) });
const uploadCard = h("div", { class: "tool-card" }, drop);

const canvas = h("canvas", { class: "bf-canvas" });
const overlay = h("div", { class: "bf-overlay" });
const stage = h("div", { class: "bf-stage checker" }, canvas, overlay);
const status = h("p", { class: "bf-status" });
const mode = select([["mosaic", TU.mosaic], ["blur", TU.blur]]);
const strength = h("input", { type: "range", min: 1, max: 10, value: 6 });
const editCard = h("div", { class: "tool-card", hidden: true },
  status,
  h("div", { class: "options" }, field(TU.mode, mode), field(TU.strength, strength),
    h("button", { class: "chip", type: "button", onclick: () => detect() }, TU.redetect),
    h("button", { class: "chip", type: "button", onclick: () => { boxes = []; update(); } }, TU.clearAll)),
  stage,
  h("p", { class: "hint-line" }, TU.hint),
  h("div", { class: "batch-actions" },
    h("button", { class: "btn", type: "button", onclick: save }, TU.save),
    h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, editCard);
mode.addEventListener("change", render);
strength.addEventListener("input", render);

async function open(f) {
  file = f;
  bitmap = await createImageBitmap(f);
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  stage.style.setProperty("--ar", bitmap.width / bitmap.height);
  boxes = [];
  uploadCard.hidden = true;
  editCard.hidden = false;
  update();
  detect();
}

// ---------- 얼굴 찾기 (MediaPipe) ----------
let detectorP = null;
function getDetector() {
  detectorP ??= (async () => {
    const { FilesetResolver, FaceDetector } = await import(`${MP}/vision_bundle.mjs`);
    const fileset = await FilesetResolver.forVisionTasks(`${MP}/wasm`);
    return FaceDetector.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MODEL, delegate: "CPU" },
      runningMode: "IMAGE",
      minDetectionConfidence: 0.5,
    });
  })();
  return detectorP;
}

// 이 모델은 가까운 얼굴용이라, 사진을 여러 조각으로 나눠 작은 얼굴도 찾아요
async function findFaces(bmp) {
  const det = await getDetector();
  const W = bmp.width, H = bmp.height, found = [];
  for (const g of [1, 2, 3]) {
    const tw = W / g, th = H / g;
    if (g > 1 && Math.min(tw, th) < 180) continue;
    for (let gy = 0; gy < g; gy++) {
      for (let gx = 0; gx < g; gx++) {
        const x0 = Math.max(0, gx * tw - tw * 0.15), y0 = Math.max(0, gy * th - th * 0.15);
        const x1 = Math.min(W, (gx + 1) * tw + tw * 0.15), y1 = Math.min(H, (gy + 1) * th + th * 0.15);
        const s = Math.min(1, 640 / Math.max(x1 - x0, y1 - y0));
        const tile = document.createElement("canvas");
        tile.width = Math.round((x1 - x0) * s);
        tile.height = Math.round((y1 - y0) * s);
        tile.getContext("2d").drawImage(bmp, x0, y0, x1 - x0, y1 - y0, 0, 0, tile.width, tile.height);
        for (const d of det.detect(tile).detections) {
          const b = d.boundingBox;
          found.push({ x: x0 + b.originX / s, y: y0 + b.originY / s, w: b.width / s, h: b.height / s, score: d.categories[0]?.score || 0 });
        }
      }
    }
  }
  // 겹치는 것 정리
  found.sort((a, b) => b.score - a.score);
  const kept = [];
  for (const f of found) {
    if (kept.some((k) => overlap(k, f) > 0.4)) continue;
    kept.push(f);
  }
  // 이마·머리까지 덮도록 조금 넓히기
  return kept.map((f) => clampBox({ x: f.x - f.w * 0.15, y: f.y - f.h * 0.3, w: f.w * 1.3, h: f.h * 1.45 }));
}

function overlap(a, b) {
  const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return (ix * iy) / Math.min(a.w * a.h, b.w * b.h);
}

function clampBox(b) {
  const x = Math.max(0, b.x), y = Math.max(0, b.y);
  return { x, y, w: Math.min(bitmap.width - x, b.w - (x - b.x)), h: Math.min(bitmap.height - y, b.h - (y - b.y)) };
}

async function detect() {
  status.textContent = TU.loading;
  status.classList.add("busy");
  try {
    const faces = await findFaces(bitmap);
    boxes = [...boxes.filter((b) => b.manual), ...faces];
    status.textContent = faces.length ? fill(TU.found, { n: faces.length }) : TU.none;
  } catch (err) {
    console.error(err);
    status.textContent = TU.none;
  }
  status.classList.remove("busy");
  update();
}

// ---------- 그리기 ----------
function applyEffect(ctx, b) {
  const s = +strength.value;
  if (mode.value === "mosaic") {
    const px = Math.max(3, Math.round(Math.max(b.w, b.h) * (0.025 + s * 0.012)));
    const tw = Math.max(1, Math.ceil(b.w / px)), th = Math.max(1, Math.ceil(b.h / px));
    const tmp = document.createElement("canvas");
    tmp.width = tw; tmp.height = th;
    tmp.getContext("2d").drawImage(bitmap, b.x, b.y, b.w, b.h, 0, 0, tw, th);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tmp, 0, 0, tw, th, b.x, b.y, b.w, b.h);
    ctx.imageSmoothingEnabled = true;
  } else {
    const r = Math.max(4, Math.max(b.w, b.h) * (0.02 + s * 0.012));
    ctx.save();
    ctx.beginPath();
    ctx.rect(b.x, b.y, b.w, b.h);
    ctx.clip();
    ctx.filter = `blur(${r}px)`;
    const m = r * 3;
    ctx.drawImage(bitmap, b.x - m, b.y - m, b.w + m * 2, b.h + m * 2, b.x - m, b.y - m, b.w + m * 2, b.h + m * 2);
    ctx.restore();
  }
}

function render() {
  if (!bitmap) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0);
  boxes.forEach((b) => applyEffect(ctx, b));
}

function update() {
  render();
  overlay.replaceChildren(...boxes.map((b, i) => {
    const el = h("div", { class: "bf-box" },
      h("button", { class: "bf-del", type: "button", title: "✕", onclick: (e) => { e.stopPropagation(); boxes.splice(i, 1); update(); } }, "✕"));
    Object.assign(el.style, pct(b));
    return el;
  }));
}

const pct = (b) => ({
  left: (b.x / bitmap.width) * 100 + "%", top: (b.y / bitmap.height) * 100 + "%",
  width: (b.w / bitmap.width) * 100 + "%", height: (b.h / bitmap.height) * 100 + "%",
});

// ---------- 끌어서 영역 추가 ----------
let dragStart = null, ghost = null;
function toImg(e) {
  const r = overlay.getBoundingClientRect();
  return { x: ((e.clientX - r.left) / r.width) * bitmap.width, y: ((e.clientY - r.top) / r.height) * bitmap.height };
}
overlay.addEventListener("pointerdown", (e) => {
  if (e.target !== overlay) return;
  e.preventDefault();
  overlay.setPointerCapture(e.pointerId);
  dragStart = toImg(e);
  ghost = h("div", { class: "bf-box ghost" });
  overlay.append(ghost);
});
overlay.addEventListener("pointermove", (e) => {
  if (!dragStart) return;
  const p = toImg(e);
  Object.assign(ghost.style, pct(rectFrom(dragStart, p)));
});
overlay.addEventListener("pointerup", (e) => {
  if (!dragStart) return;
  const b = rectFrom(dragStart, toImg(e));
  dragStart = null;
  ghost?.remove();
  if (b.w > 6 && b.h > 6) boxes.push({ ...clampBox(b), manual: true });
  update();
});
const rectFrom = (a, b) => ({ x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), w: Math.abs(a.x - b.x), h: Math.abs(a.y - b.y) });

// ---------- 저장 ----------
async function save() {
  render();
  const type = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
  download(await canvasBlob(canvas, type, 0.95), `${stripExt(file.name)}_blur${EXT[type]}`);
}

function reset() {
  bitmap = null;
  boxes = [];
  editCard.hidden = true;
  uploadCard.hidden = false;
}
