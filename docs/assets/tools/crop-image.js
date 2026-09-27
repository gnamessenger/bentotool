import { h, TU, root, dropzone, download, stripExt, canvasBlob, EXT } from "../common.js";

const RATIOS = [[TU.free, NaN], ["1:1", 1], ["4:5", 4 / 5], ["3:4", 3 / 4], ["16:9", 16 / 9], ["9:16", 9 / 16]];

let cropper = null, file = null, flip = 1;

const drop = dropzone({ accept: "image/*", multiple: false, onFiles: (f) => open(f[0]) });
const uploadCard = h("div", { class: "tool-card" }, drop);

const img = h("img", { alt: "", class: "crop-img" });
const sizeLabel = h("span", { class: "meta" });
const ratioBtns = RATIOS.map(([label, r], i) =>
  h("button", { class: "chip" + (i === 0 ? " active" : ""), type: "button", onclick: (e) => setRatio(r, e.currentTarget) }, label));
const editCard = h("div", { class: "tool-card", hidden: true },
  h("div", { class: "chips" }, ratioBtns,
    h("span", { class: "tool-sep" }),
    h("button", { class: "chip", type: "button", onclick: () => cropper?.rotate(90) }, TU.rotate),
    h("button", { class: "chip", type: "button", onclick: () => { flip *= -1; cropper?.scaleX(flip); } }, TU.flipH)),
  h("div", { class: "crop-stage" }, img),
  h("div", { class: "batch-actions" },
    h("span", { class: "crop-size" }, TU.size, ": ", sizeLabel),
    h("button", { class: "btn", type: "button", onclick: save }, TU.save),
    h("button", { class: "btn ghost", type: "button", onclick: reset }, TU.another)));

root().replaceChildren(uploadCard, editCard);

function open(f) {
  file = f;
  flip = 1;
  cropper?.destroy();
  img.src = URL.createObjectURL(f);
  uploadCard.hidden = true;
  editCard.hidden = false;
  img.onload = () => {
    cropper = new window.Cropper(img, {
      viewMode: 1,
      autoCropArea: 0.9,
      background: false,
      responsive: true,
      crop(e) { sizeLabel.textContent = `${Math.round(e.detail.width)} × ${Math.round(e.detail.height)}px`; },
    });
    ratioBtns.forEach((b, i) => b.classList.toggle("active", i === 0));
  };
}

function setRatio(r, btn) {
  ratioBtns.forEach((b) => b.classList.toggle("active", b === btn));
  cropper?.setAspectRatio(r);
}

async function save() {
  if (!cropper) return;
  const type = ["image/png", "image/webp"].includes(file.type) ? file.type : "image/jpeg";
  const canvas = cropper.getCroppedCanvas({
    imageSmoothingQuality: "high",
    fillColor: type === "image/jpeg" ? "#fff" : "transparent",
  });
  download(await canvasBlob(canvas, type, 0.95), `${stripExt(file.name)}_crop${EXT[type]}`);
}

function reset() {
  cropper?.destroy();
  cropper = null;
  editCard.hidden = true;
  uploadCard.hidden = false;
}
