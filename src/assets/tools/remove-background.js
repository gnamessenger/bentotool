import { removeBackground } from "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1/+esm";
import { h, TU, root, dropzone, download, stripExt, canvasBlob } from "../common.js";

const COLORS = [["#FFFFFF"], ["#000000"], ["#E8E2F5"], ["#7D55C7"], ["#F4E6D4"], ["#D6E8F7"]];

let busy = false;
let bgColor = "";
let current = null;   // { blob, bitmap, name }

const barFill = h("div");
const progText = h("p", { class: "progress-text" });
const progressCard = h("div", { class: "tool-card", hidden: true },
  h("div", { class: "progress" },
    h("div", { class: "spinner" }), progText, h("div", { class: "bar" }, barFill), h("small", {}, TU.firstNote)));
const error = h("div", { class: "error-box", hidden: true });

const drop = dropzone({ accept: "image/*", multiple: false, onFiles: (f) => run(f[0]) });
const uploadCard = h("div", { class: "tool-card" }, drop, error);

// 결과 화면
const sizer = h("img", { alt: "" });
const cutImg = h("img", { alt: "" });
const origImg = h("img", { alt: "" });
const cutLayer = h("div", { class: "layer" }, cutImg);
const stage = h("div", { class: "rb-stage checker" },
  sizer, cutLayer, h("div", { class: "layer orig" }, origImg), h("div", { class: "divider" }));

const swatches = h("div", { class: "swatches" });
const transSw = h("div", { class: "sw trans checker active", title: TU.transparent, onclick: () => pick(transSw, "") });
swatches.append(transSw);
for (const [c] of COLORS) {
  const sw = h("div", { class: "sw", title: c, style: `background:${c}` });
  sw.onclick = () => pick(sw, c);
  swatches.append(sw);
}
const colorInput = h("input", { type: "color", value: "#FFD6E0" });
const pickSw = h("label", { class: "sw pick", title: TU.custom }, "+", colorInput);
colorInput.addEventListener("input", () => { pickSw.style.background = colorInput.value; pick(pickSw, colorInput.value); });
swatches.append(pickSw);

const resultView = h("div", { class: "tool-card", hidden: true },
  h("div", { class: "rb-result" },
    h("div", {}, stage, h("p", { class: "rb-hint" }, TU.compareHint)),
    h("div", { class: "rb-side" },
      h("div", {}, h("h3", {}, TU.background), swatches),
      h("button", { class: "btn", type: "button", onclick: save }, window.T.ui.download),
      h("button", { class: "btn ghost small", type: "button", onclick: reset }, TU.another))));

root().replaceChildren(uploadCard, progressCard, resultView);

function show(which) {
  uploadCard.hidden = which !== "upload";
  progressCard.hidden = which !== "work";
  resultView.hidden = which !== "result";
}

function setProgress(text, ratio) {
  progText.textContent = text;
  barFill.style.width = Math.round(Math.min(1, Math.max(0, ratio)) * 100) + "%";
}

async function run(file) {
  if (busy) return;
  busy = true;
  error.hidden = true;
  show("work");
  setProgress(TU.loadingModel, 0);
  try {
    const blob = await removeBackground(file, {
      output: { format: "image/png", quality: 1 },
      progress: (key, cur, total) => {
        if (key.startsWith("fetch")) setProgress(TU.downloadingModel, total ? cur / total : 0);
        else if (key.startsWith("compute")) setProgress(TU.removing, total ? cur / total : 0.5);
      },
    });
    current = { blob, bitmap: await createImageBitmap(blob), name: stripExt(file.name) };
    const url = URL.createObjectURL(blob);
    sizer.src = url;
    cutImg.src = url;
    origImg.src = URL.createObjectURL(file);
    show("result");
  } catch (err) {
    console.error(err);
    error.textContent = TU.fail;
    error.hidden = false;
    show("upload");
  } finally {
    busy = false;
  }
}

function pick(el, color) {
  swatches.querySelectorAll(".sw").forEach((s) => s.classList.remove("active"));
  el.classList.add("active");
  bgColor = color;
  cutLayer.style.background = color || "transparent";
}

async function save() {
  if (!current) return;
  if (!bgColor) return download(current.blob, `${current.name}_nobg.png`);
  const c = document.createElement("canvas");
  c.width = current.bitmap.width; c.height = current.bitmap.height;
  const ctx = c.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(current.bitmap, 0, 0);
  download(await canvasBlob(c, "image/jpeg", 0.95), `${current.name}_nobg.jpg`);
}

function reset() {
  current = null;
  pick(transSw, "");
  show("upload");
}

// 원본 비교
function setPos(x) {
  const r = stage.getBoundingClientRect();
  stage.style.setProperty("--pos", Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)) + "%");
}
stage.addEventListener("pointermove", (e) => { stage.classList.add("comparing"); setPos(e.clientX); });
stage.addEventListener("pointerdown", (e) => { stage.classList.add("comparing"); setPos(e.clientX); });
stage.addEventListener("pointerleave", () => { stage.classList.remove("comparing"); stage.style.setProperty("--pos", "0%"); });
