import { h, U, TU, root, download } from "../common.js";

const API = "https://api.openverse.org/v1/images/";
let query = "", aspect = "", page = 1, loading = false;

const input = h("input", { type: "search", placeholder: TU.placeholder, class: "fp-input" });
const searchBtn = h("button", { class: "btn", type: "button", onclick: () => search(true) }, TU.search);
const aspects = [["", TU.all], ["wide", TU.wide], ["tall", TU.tall], ["square", TU.square]].map(([v, label]) =>
  h("button", { class: "chip" + (v === "" ? " active" : ""), type: "button", "data-v": v, onclick: (e) => setAspect(v, e.currentTarget) }, label));
const chips = TU.chips.map(([label, q]) =>
  h("button", { class: "chip ghost", type: "button", onclick: () => { input.value = q; search(true); } }, label));
const grid = h("div", { class: "photo-grid" });
const status = h("p", { class: "status-line" });
const moreBtn = h("button", { class: "btn ghost", type: "button", hidden: true, onclick: () => search(false) }, TU.more);

root().replaceChildren(
  h("div", { class: "tool-card" },
    h("form", { class: "fp-form", onsubmit: (e) => { e.preventDefault(); search(true); } }, input, searchBtn),
    h("div", { class: "chips" }, aspects),
    h("div", { class: "chips" }, chips),
    TU.tip ? h("p", { class: "note" }, TU.tip) : null),
  status, grid, h("div", { class: "batch-actions" }, moreBtn));

// ---------- 미리보기 창 ----------
const dlg = h("dialog", { class: "fp-dialog" });
document.body.append(dlg);
dlg.addEventListener("click", (e) => e.target === dlg && dlg.close());

function setAspect(v, btn) {
  aspect = v;
  aspects.forEach((b) => b.classList.toggle("active", b === btn));
  if (query) search(true);
}

async function search(fresh) {
  const q = input.value.trim();
  if (!q || loading) return;
  if (fresh) { query = q; page = 1; grid.replaceChildren(); }
  loading = true;
  status.textContent = TU.loading;
  moreBtn.hidden = true;
  try {
    const params = new URLSearchParams({ q: query, license_type: "commercial", page_size: "20", page: String(page), mature: "false" });
    if (aspect) params.set("aspect_ratio", aspect);
    const res = await fetch(`${API}?${params}`);
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    status.textContent = data.result_count ? "" : TU.none;
    for (const r of data.results) grid.append(card(r));
    moreBtn.hidden = page >= (data.page_count || 1);
    page++;
  } catch (err) {
    console.error(err);
    status.textContent = TU.error;
  } finally {
    loading = false;
  }
}

function card(r) {
  const img = h("img", { alt: r.title || "", loading: "lazy" });
  img.src = r.thumbnail;
  img.onerror = () => el.remove();
  const el = h("button", { class: "photo", type: "button", onclick: () => preview(r) }, img);
  return el;
}

const licenseLabel = (r) => r.license === "cc0" ? "CC0" : r.license === "pdm" ? "Public Domain" : `CC ${r.license.toUpperCase()} ${r.license_version || ""}`.trim();
const noCredit = (r) => r.license === "cc0" || r.license === "pdm";

function preview(r) {
  const big = h("img", { alt: r.title || "", class: "fp-big" });
  big.src = r.thumbnail;
  const full = new Image();
  full.onload = () => (big.src = r.url);
  full.src = r.url;
  const copyBtn = h("button", { class: "btn ghost small", type: "button" }, TU.copyCredit);
  copyBtn.onclick = async () => {
    await navigator.clipboard.writeText(r.attribution || `${r.title} by ${r.creator} (${licenseLabel(r)})`);
    copyBtn.textContent = TU.copied;
    setTimeout(() => (copyBtn.textContent = TU.copyCredit), 1200);
  };
  const dlBtn = h("button", { class: "btn small", type: "button" }, U.download);
  dlBtn.onclick = async () => {
    try {
      const res = await fetch(r.url);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const ext = (blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
      download(blob, `${(r.title || "photo").replace(/[\\/:*?"<>|]+/g, " ").slice(0, 60)}.${ext}`);
    } catch {
      window.open(r.url, "_blank", "noopener");   // 원본 서버가 직접 받기를 막으면 새 탭으로 열어요
    }
  };
  dlg.replaceChildren(
    h("div", { class: "fp-dialog-body" },
      h("button", { class: "icon-btn fp-close", type: "button", onclick: () => dlg.close() }, "✕"),
      big,
      h("div", { class: "fp-info" },
        h("strong", {}, r.title || ""),
        h("p", {}, `${TU.by}: ${r.creator || "-"} · ${r.width || "?"}×${r.height || "?"} · ${r.source || ""}`),
        h("p", {}, `${TU.license}: `, h("a", { href: r.license_url, target: "_blank", rel: "noopener nofollow" }, licenseLabel(r)),
          " · ", h("span", { class: noCredit(r) ? "good" : "warn" }, noCredit(r) ? TU.noCredit : TU.needCredit)),
        h("div", { class: "fp-actions" }, dlBtn, noCredit(r) ? null : copyBtn,
          h("a", { class: "btn ghost small", href: r.foreign_landing_url, target: "_blank", rel: "noopener nofollow" }, TU.source)))));
  dlg.showModal();
}
