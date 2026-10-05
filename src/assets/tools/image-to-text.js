import Tesseract from "https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/tesseract.esm.min.js";
import { h, TU, root, dropzone, field, select, download, stripExt, fill, loadImage, progressBox } from "../common.js";

// 글자 인식(OCR): tesseract.js. 프로그램·언어 데이터는 jsDelivr에서 받고, 한 번 받은 언어 데이터는 브라우저(IndexedDB)에 저장돼요.
const langSel = select([["kor+eng", TU.langKoEn], ["kor", TU.langKo], ["eng", TU.langEn]], "kor+eng");
langSel.addEventListener("change", () => { if (current) recognize(); });
// 사진 보정: 조명이 고르지 않거나 잡음이 많은 사진을 흑백으로 또렷하게 바꿔서 읽어요(사진 JPG는 자동으로 켜짐).
const enhanceChk = h("input", { type: "checkbox", onchange: () => { if (current) recognize(); } });

let worker = null;      // 한 번 만든 인식기는 계속 써요
let workerLangs = "";
let current = null;     // { canvas, url, name }
let busy = false;
let onLog = () => {};

const drop = dropzone({ accept: "image/*", multiple: false, onFiles: (f) => open(f[0]) });
const error = h("div", { class: "error-box", hidden: true });
const uploadView = h("div", {}, drop, h("p", { class: "note" }, TU.firstNote));

const prog = progressBox();
const progView = h("div", { hidden: true }, prog.el);

const preview = h("img", { class: "itt-img", alt: "" });
const text = h("textarea", { class: "itt-text", spellcheck: false });
const copyBtn = h("button", { class: "btn small", type: "button", onclick: copy }, TU.copy);
const emptyMsg = h("p", { class: "note", hidden: true }, TU.empty);
const resultView = h("div", { class: "itt-result", hidden: true },
  h("div", { class: "itt-pic checker" }, preview),
  h("div", { class: "itt-side" },
    h("h3", {}, TU.result),
    text,
    h("p", { class: "hint-line" }, TU.editHint),
    emptyMsg,
    h("div", { class: "batch-actions" },
      copyBtn,
      h("button", { class: "btn small ghost", type: "button", onclick: saveTxt }, TU.saveTxt),
      h("button", { class: "btn small ghost", type: "button", onclick: reset }, TU.another))));

root().replaceChildren(h("div", { class: "tool-card" },
  h("div", { class: "options itt-opts" }, field(TU.lang, langSel),
    h("label", { class: "field", title: TU.enhanceHint }, enhanceChk, TU.enhance),
    h("small", { class: "itt-hint" }, TU.enhanceHint)),
  uploadView, progView, resultView, error));

function show(which) {
  uploadView.hidden = which !== "upload";
  progView.hidden = which !== "work";
  resultView.hidden = which !== "result";
}

// 글씨가 작으면 키우고(인식률↑), 너무 크면 줄여요(속도·메모리).
function prepare(img) {
  const w = img.width, hgt = img.height, long = Math.max(w, hgt);
  let s = 1;
  if (long < 1500) s = Math.min(2, 3000 / long);
  else if (long > 4000) s = 4000 / long;
  const c = document.createElement("canvas");
  c.width = Math.round(w * s); c.height = Math.round(hgt * s);
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#fff";            // 투명 배경 PNG는 흰 바탕 위에서 읽어요
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, c.width, c.height);
  return c;
}

async function open(file) {
  if (busy) return;
  error.hidden = true;
  try {
    const img = await loadImage(file);
    if (current) URL.revokeObjectURL(current.url);
    current = { canvas: prepare(img), enhanced: null, url: URL.createObjectURL(file), name: stripExt(file.name) };
    enhanceChk.checked = file.type === "image/jpeg";
    img.close?.();
  } catch (err) {
    console.error(err);
    error.textContent = TU.fail;
    error.hidden = false;
    return;
  }
  preview.src = current.url;
  recognize();
}

// 흐림 살짝 → 흑백 → 주변 평균보다 어두운 곳만 글자로 남기기(적응형 이진화)
function enhance(src) {
  const W = src.width, H = src.height;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.filter = "blur(1.2px)";
  ctx.drawImage(src, 0, 0);
  const d = ctx.getImageData(0, 0, W, H), px = d.data;
  const g = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) g[i] = (px[i * 4] * 77 + px[i * 4 + 1] * 150 + px[i * 4 + 2] * 29) >> 8;
  const I = new Uint32Array((W + 1) * (H + 1));   // 누적합(적분 영상)
  for (let y = 0; y < H; y++) {
    let row = 0;
    for (let x = 0; x < W; x++) { row += g[y * W + x]; I[(y + 1) * (W + 1) + x + 1] = I[y * (W + 1) + x + 1] + row; }
  }
  const r = Math.max(8, Math.round(Math.min(W, H) / 16));
  for (let y = 0; y < H; y++) {
    const y0 = Math.max(0, y - r), y1 = Math.min(H, y + r + 1);
    for (let x = 0; x < W; x++) {
      const x0 = Math.max(0, x - r), x1 = Math.min(W, x + r + 1);
      const sum = I[y1 * (W + 1) + x1] - I[y0 * (W + 1) + x1] - I[y1 * (W + 1) + x0] + I[y0 * (W + 1) + x0];
      const v = g[y * W + x] * (x1 - x0) * (y1 - y0) < sum * 0.85 ? 0 : 255;
      const k = (y * W + x) * 4;
      px[k] = px[k + 1] = px[k + 2] = v; px[k + 3] = 255;
    }
  }
  ctx.putImageData(d, 0, 0);
  return c;
}

function logger(m) { onLog(m); }

async function getWorker(langs) {
  if (worker && workerLangs === langs) return worker;
  if (worker) await worker.reinitialize(langs);
  else worker = await Tesseract.createWorker(langs, 1, { logger });
  workerLangs = langs;
  await worker.setParameters({ preserve_interword_spaces: "1" });
  return worker;
}

async function recognize() {
  if (busy || !current) return;
  busy = true;
  langSel.disabled = enhanceChk.disabled = true;
  error.hidden = true;
  show("work");
  prog.set(TU.preparing, 0);
  onLog = (m) => {
    const p = Math.round((m.progress || 0) * 100);
    if (/traineddata/.test(m.status)) prog.set(fill(TU.downloading, { p }), m.progress || 0);
    else if (/recogniz/.test(m.status)) prog.set(fill(TU.recognizing, { p }), m.progress || 0);
    else prog.set(TU.preparing, m.progress || 0);
  };
  try {
    const w = await getWorker(langSel.value);
    let input = current.canvas;
    if (enhanceChk.checked) input = current.enhanced ||= enhance(current.canvas);
    const { data } = await w.recognize(input);
    const out = clean(data.text || "");
    text.value = out;
    emptyMsg.hidden = !!out;
    show("result");
  } catch (err) {
    console.error(err);
    try { await worker?.terminate(); } catch {}
    worker = null; workerLangs = "";
    error.textContent = TU.fail;
    error.hidden = false;
    show("upload");
  } finally {
    busy = false;
    langSel.disabled = enhanceChk.disabled = false;
  }
}

// 줄 앞뒤 공백, 잡티를 글자로 착각한 '.', ':' 같은 기호만 있는 짧은 줄, 빈 줄 여러 개 정리
const clean = (s) => s.split("\n")
  .map((l) => l.replace(/\s{3,}[^\p{L}\p{N}\s]{1,2}$/u, "").trim())   // 줄 끝에 멀리 떨어진 '.', ':' 잡티
  .filter((l) => !(l && l.length <= 3 && !/[\p{L}\p{N}]/u.test(l)))
  .join("\n").replace(/\n{3,}/g, "\n\n").trim();

async function copy() {
  try {
    await navigator.clipboard.writeText(text.value);
  } catch {
    text.select();
    document.execCommand("copy");
  }
  copyBtn.textContent = TU.copied;
  setTimeout(() => (copyBtn.textContent = TU.copy), 1500);
}

function saveTxt() {
  // 메모장에서 한글이 깨지지 않도록 BOM 포함 UTF-8, 줄바꿈은 CRLF
  const body = "﻿" + text.value.replace(/\r?\n/g, "\r\n");
  download(new Blob([body], { type: "text/plain;charset=utf-8" }), `${current?.name || "image"}_text.txt`);
}

function reset() {
  if (current) URL.revokeObjectURL(current.url);
  current = null;
  text.value = "";
  show("upload");
}
