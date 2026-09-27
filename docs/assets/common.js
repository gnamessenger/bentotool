// 모든 도구가 같이 쓰는 기능: 파일 받기, 목록 UI, 다운로드, 이미지 처리 도우미.
export const T = window.T || {};
export const U = T.ui || {};      // 공통 문구
export const TU = T.tool || {};   // 도구별 문구
export const root = () => document.getElementById("tool");

const PROPS = new Set(["value", "checked", "disabled", "multiple", "hidden", "selected", "textContent", "htmlFor"]);
export function h(tag, props = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (PROPS.has(k)) el[k] = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : String(c));
  return el;
}

export function fmtBytes(n) {
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
  return (n / 1024 / 1024).toFixed(1) + " MB";
}
export const stripExt = (name) => (name || "file").replace(/\.[^.]+$/, "") || "file";
export const EXT = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" };

export function download(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 10000);
}

export async function zipDownload(entries, zipName) {
  const zip = new window.JSZip();
  const used = new Set();
  for (const { name, blob } of entries) {
    let n = name, k = 2;
    while (used.has(n)) n = name.replace(/(\.[^.]+)?$/, `_${k++}$1`);
    used.add(n);
    zip.file(n, blob);
  }
  download(await zip.generateAsync({ type: "blob" }), zipName);
}

// ---------- 폼 도우미 ----------
export function select(options, value) {
  const s = h("select", {}, options.map(([v, label]) => h("option", { value: v }, label)));
  if (value != null) s.value = value;
  return s;
}
export const field = (label, ...controls) => h("label", { class: "field" }, label, ...controls);

// ---------- 이미지 ----------
export async function loadImage(file) {
  try {
    return await createImageBitmap(file);
  } catch {
    // 일부 형식은 <img>로만 열려요
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}
export function toCanvas(img, w, hgt, fill) {
  const c = document.createElement("canvas");
  c.width = w; c.height = hgt;
  const ctx = c.getContext("2d");
  if (fill) { ctx.fillStyle = fill; ctx.fillRect(0, 0, w, hgt); }
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, w, hgt);
  return c;
}
export const canvasBlob = (c, type, q) => new Promise((res, rej) =>
  c.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), type, q));

// ---------- 파일 받기 (버튼 / 끌어다 놓기 / 붙여넣기) ----------
function accepts(file, accept) {
  if (!file) return false;
  return accept.split(",").map((a) => a.trim()).some((a) =>
    a.endsWith("/*") ? file.type.startsWith(a.slice(0, -1))
      : a.startsWith(".") ? file.name.toLowerCase().endsWith(a)
      : file.type === a);
}

let activeHandler = null;
let depth = 0;
document.addEventListener("dragenter", (e) => { e.preventDefault(); depth++; document.body.classList.add("dragging"); });
document.addEventListener("dragleave", (e) => { e.preventDefault(); if (--depth <= 0) { depth = 0; document.body.classList.remove("dragging"); } });
document.addEventListener("dragover", (e) => e.preventDefault());
document.addEventListener("drop", (e) => {
  e.preventDefault(); depth = 0; document.body.classList.remove("dragging");
  activeHandler?.([...(e.dataTransfer?.files || [])]);
});
document.addEventListener("paste", (e) => {
  const files = [...(e.clipboardData?.items || [])].filter((i) => i.kind === "file").map((i) => i.getAsFile());
  if (files.length) activeHandler?.(files);
});

export function dropzone({ accept, multiple = true, onFiles }) {
  const input = h("input", { type: "file", accept, multiple, hidden: true });
  const handle = (files) => {
    const ok = files.filter((f) => accepts(f, accept));
    if (ok.length) onFiles(multiple ? ok : ok.slice(0, 1));
  };
  input.addEventListener("change", () => { handle([...input.files]); input.value = ""; });
  activeHandler = handle;
  const el = h("div", { class: "dropzone" },
    h("button", { class: "btn", type: "button", onclick: () => input.click() }, U.choose),
    h("p", {}, U.orDrop),
    h("small", {}, U.pasteHint),
    input);
  el.open = () => input.click();
  return el;
}

function thumbFor(file) {
  if (file.type.startsWith("image/")) {
    const img = h("img", { alt: "" });
    img.src = URL.createObjectURL(file);
    return h("div", { class: "thumb checker" }, img);
  }
  return h("div", { class: "thumb", style: "background:var(--purple-faint)" }, "📄");
}

// ---------- 여러 장 일괄 처리 도구 (압축·크기·변환) ----------
// process(file) → { blob, name, note? }  |  옵션이 바뀌면 전체를 다시 처리해요.
export function batchTool({ accept, options = [], process, zipName }) {
  const rows = [];
  const list = h("div", { class: "file-list" });
  const actions = h("div", { class: "batch-actions", hidden: true },
    h("button", { class: "btn", type: "button", onclick: downloadAll }, U.downloadAll),
    h("button", { class: "btn ghost", type: "button", onclick: clearAll }, U.clear));
  const drop = dropzone({ accept, onFiles: add });
  root().replaceChildren(
    h("div", { class: "tool-card" }, drop, options.length ? h("div", { class: "options" }, options) : null),
    list, actions);

  let queue = Promise.resolve();

  function add(files) {
    for (const file of files) {
      const meta = h("div", { class: "meta" });
      const acts = h("div", { class: "acts" });
      const item = { file, meta, acts, result: null };
      item.row = h("div", { class: "file-row" }, thumbFor(file),
        h("div", { class: "info" }, h("div", { class: "name" }, file.name), meta), acts);
      rows.push(item);
      list.append(item.row);
      run(item);
    }
    actions.hidden = false;
  }

  function run(item) {
    const token = (item.token = {});
    item.result = null;
    item.meta.replaceChildren(`${fmtBytes(item.file.size)} · ${U.waiting}`);
    item.acts.replaceChildren(h("span", { class: "mini-spin" }), removeBtn(item));
    queue = queue.then(async () => {
      if (item.token !== token || !rows.includes(item)) return;
      try {
        const r = await process(item.file);
        if (item.token !== token) return;
        item.result = r;
        const diff = Math.round((1 - r.blob.size / item.file.size) * 100);
        item.meta.replaceChildren(
          `${fmtBytes(item.file.size)} → ${fmtBytes(r.blob.size)} `,
          diff > 0 ? h("span", { class: "good" }, `-${diff}%`) : "",
          r.note ? ` · ${r.note}` : "");
        item.acts.replaceChildren(
          h("button", { class: "btn small", type: "button", onclick: () => download(r.blob, r.name) }, U.download),
          removeBtn(item));
      } catch (err) {
        console.error(err);
        if (item.token !== token) return;
        item.meta.replaceChildren(h("span", { class: "bad" }, U.failed));
        item.acts.replaceChildren(removeBtn(item));
      }
    });
  }

  function removeBtn(item) {
    return h("button", { class: "icon-btn", type: "button", title: U.remove, onclick: () => {
      rows.splice(rows.indexOf(item), 1);
      item.row.remove();
      if (!rows.length) actions.hidden = true;
    } }, "✕");
  }

  async function downloadAll() {
    const done = rows.filter((r) => r.result).map((r) => r.result);
    if (done.length === 1) download(done[0].blob, done[0].name);
    else if (done.length > 1) await zipDownload(done, zipName);
  }

  function clearAll() {
    rows.length = 0;
    list.replaceChildren();
    actions.hidden = true;
  }

  let timer;
  return { rerun: () => { clearTimeout(timer); timer = setTimeout(() => rows.forEach(run), 250); } };
}

// ---------- 순서가 있는 목록 도구 (이미지→PDF, PDF 합치기) ----------
// build(files) → Blob  |  meta(file) → 문자열 (선택)
export function orderedTool({ accept, options = [], buttonLabel, build, outName, meta, minFiles = 1, minMsg = "" }) {
  const items = [];
  const list = h("div", { class: "file-list" });
  const makeBtn = h("button", { class: "btn", type: "button", onclick: make }, buttonLabel);
  const msg = h("div", { class: "error-box", hidden: true });
  const actions = h("div", { class: "batch-actions", hidden: true },
    makeBtn,
    h("button", { class: "btn ghost", type: "button", onclick: () => { items.length = 0; render(); } }, U.clear));
  const drop = dropzone({ accept, onFiles: add });
  root().replaceChildren(
    h("div", { class: "tool-card" }, drop, options.length ? h("div", { class: "options" }, options) : null),
    list, actions, msg);

  function add(files) {
    for (const file of files) {
      const item = { file, info: "", thumb: thumbFor(file) };
      items.push(item);
      if (meta) meta(file).then((t) => { item.info = t; render(); });
    }
    render();
  }

  function move(i, d) {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
    render();
  }

  function render() {
    msg.hidden = true;
    actions.hidden = !items.length;
    list.replaceChildren(...items.map((it, i) => h("div", { class: "file-row" },
      it.thumb,
      h("div", { class: "info" },
        h("div", { class: "name" }, `${i + 1}. ${it.file.name}`),
        h("div", { class: "meta" }, fmtBytes(it.file.size), it.info ? ` · ${it.info}` : "")),
      h("div", { class: "acts" },
        h("button", { class: "icon-btn", type: "button", title: U.moveUp, disabled: i === 0, onclick: () => move(i, -1) }, "▲"),
        h("button", { class: "icon-btn", type: "button", title: U.moveDown, disabled: i === items.length - 1, onclick: () => move(i, 1) }, "▼"),
        h("button", { class: "icon-btn", type: "button", title: U.remove, onclick: () => { items.splice(i, 1); render(); } }, "✕")))));
  }

  async function make() {
    if (items.length < minFiles) { msg.textContent = minMsg; msg.hidden = false; return; }
    makeBtn.disabled = true;
    makeBtn.textContent = U.processing;
    try {
      const blob = await build(items.map((i) => i.file));
      download(blob, outName);
    } catch (err) {
      console.error(err);
      msg.textContent = `${U.failed}: ${err.message || err}`;
      msg.hidden = false;
    } finally {
      makeBtn.disabled = false;
      makeBtn.textContent = buttonLabel;
    }
  }
}
