import { h, TU, root, field, select, download, canvasBlob } from "../common.js";

const qrcode = window.qrcode;
qrcode.stringToBytes = qrcode.stringToBytesFuncs["UTF-8"];

let tab = "text";
const text = h("textarea", { class: "qr-text", placeholder: TU.textPh, rows: 3 });
const ssid = h("input", { type: "text", placeholder: TU.ssid });
const pass = h("input", { type: "text", placeholder: TU.password });
const sec = select([["WPA", "WPA/WPA2"], ["WEP", "WEP"], ["nopass", TU.none]]);
const fg = h("input", { type: "color", value: "#2B2440" });
const bg = h("input", { type: "color", value: "#FFFFFF" });
const size = select([["256", "256px"], ["512", "512px"], ["1024", "1024px"], ["2048", "2048px"]], "1024");

const textPane = h("div", {}, text);
const wifiPane = h("div", { class: "qr-wifi", hidden: true },
  field(TU.ssid, ssid), field(TU.password, pass), field(TU.security, sec));
const tabBtns = [["text", TU.tabText], ["wifi", TU.tabWifi]].map(([k, label]) =>
  h("button", { class: "qr-tab" + (k === tab ? " active" : ""), type: "button", "data-k": k, onclick: () => setTab(k) }, label));

const preview = h("canvas", { class: "qr-canvas" });
const empty = h("p", { class: "qr-empty" }, TU.empty);
const pngBtn = h("button", { class: "btn", type: "button" }, TU.png);
const svgBtn = h("button", { class: "btn ghost", type: "button" }, TU.svg);

root().replaceChildren(h("div", { class: "tool-card qr-layout" },
  h("div", {},
    h("div", { class: "qr-tabs" }, tabBtns),
    textPane, wifiPane,
    h("div", { class: "options" }, field(TU.fg, fg), field(TU.bg, bg), field(TU.size, size))),
  h("div", { class: "qr-side" }, h("div", { class: "qr-preview" }, preview, empty), pngBtn, svgBtn)));

function setTab(k) {
  tab = k;
  tabBtns.forEach((b) => b.classList.toggle("active", b.dataset.k === k));
  textPane.hidden = k !== "text";
  wifiPane.hidden = k !== "wifi";
  render();
}

const wifiEsc = (s) => s.replace(/([\\;,:"])/g, "\\$1");
function content() {
  if (tab === "text") return text.value.trim();
  if (!ssid.value) return "";
  return `WIFI:T:${sec.value};S:${wifiEsc(ssid.value)};${sec.value === "nopass" ? "" : `P:${wifiEsc(pass.value)};`};`;
}

function makeQr() {
  const data = content();
  if (!data) return null;
  const qr = qrcode(0, "M");
  qr.addData(data, "Byte");
  qr.make();
  return qr;
}

function draw(canvas, qr, px) {
  const count = qr.getModuleCount();
  const margin = 4;
  const cell = px / (count + margin * 2);
  canvas.width = canvas.height = px;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bg.value;
  ctx.fillRect(0, 0, px, px);
  ctx.fillStyle = fg.value;
  for (let r = 0; r < count; r++)
    for (let c = 0; c < count; c++)
      if (qr.isDark(r, c)) ctx.fillRect(Math.floor((c + margin) * cell), Math.floor((r + margin) * cell), Math.ceil(cell), Math.ceil(cell));
}

function svg(qr) {
  const count = qr.getModuleCount(), m = 4, n = count + m * 2;
  let path = "";
  for (let r = 0; r < count; r++)
    for (let c = 0; c < count; c++)
      if (qr.isDark(r, c)) path += `M${c + m} ${r + m}h1v1h-1z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="${bg.value}"/><path d="${path}" fill="${fg.value}"/></svg>`;
}

let current = null;
function render() {
  try {
    current = makeQr();
    empty.textContent = TU.empty;
  } catch {
    current = null;
    empty.textContent = TU.tooLong;
  }
  preview.hidden = !current;
  empty.hidden = !!current;
  pngBtn.disabled = svgBtn.disabled = !current;
  if (current) draw(preview, current, 512);
}

[text, ssid, pass].forEach((el) => el.addEventListener("input", render));
[sec, fg, bg].forEach((el) => el.addEventListener("input", render));

pngBtn.onclick = async () => {
  if (!current) return;
  const c = document.createElement("canvas");
  draw(c, current, +size.value);
  download(await canvasBlob(c, "image/png"), "qrcode.png");
};
svgBtn.onclick = () => current && download(new Blob([svg(current)], { type: "image/svg+xml" }), "qrcode.svg");

render();
