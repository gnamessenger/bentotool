import { h, T, TU, root, fill } from "../common.js";

const KEY = "bento-wordcount-draft";
const ko = T.lang === "ko";

const area = h("textarea", { class: "wc-area", placeholder: TU.placeholder, spellcheck: "false" });
const goal = h("input", { type: "number", min: 1, placeholder: TU.goalPh });
const goalMsg = h("span", { class: "wc-goal-msg" });
const goalBar = h("div");
const stats = h("div", { class: "wc-stats" });

const copyBtn = h("button", { class: "btn small", type: "button" }, TU.copy);
const clearBtn = h("button", { class: "btn ghost small", type: "button" }, TU.clear);

root().replaceChildren(h("div", { class: "tool-card" },
  stats,
  area,
  h("div", { class: "wc-foot" },
    h("label", { class: "field" }, TU.goal, goal),
    goalMsg,
    h("span", { class: "spacer" }),
    copyBtn, clearBtn),
  h("div", { class: "bar wc-goal-bar" }, goalBar)));

function count(text) {
  const withSpace = [...text.replace(/\r\n/g, "\n")].length;
  const noSpace = [...text.replace(/\s/g, "")].length;
  let b2 = 0;
  for (const ch of text.replace(/\r\n/g, "\n")) b2 += ch.charCodeAt(0) > 127 ? 2 : 1;
  const b3 = new TextEncoder().encode(text.replace(/\r\n/g, "\n")).length;
  const words = (text.trim().match(/\S+/g) || []).length;
  const lines = text ? text.split(/\n/).length : 0;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
  const sentences = (text.match(/[^.!?。？！\n]+[.!?。？！]+|[^.!?。？！\n]+$/gm) || []).filter((s) => s.trim()).length;
  // 한국어는 분당 약 500자, 영어는 분당 약 200단어
  const secs = ko ? Math.round((noSpace / 500) * 60) : Math.round((words / 200) * 60);
  return { withSpace, noSpace, b2, b3, words, lines, paragraphs, sentences, secs };
}

const n = (x) => x.toLocaleString();

function render() {
  const text = area.value;
  const c = count(text);
  const time = c.secs >= 60 ? `${Math.floor(c.secs / 60)}${TU.minutes} ${c.secs % 60}${TU.seconds}` : `${c.secs}${TU.seconds}`;
  const items = [
    [TU.withSpace, n(c.withSpace) + (TU.unit ? TU.unit : ""), true],
    [TU.noSpace, n(c.noSpace) + (TU.unit ? TU.unit : ""), true],
    [TU.words, n(c.words)],
    ko ? [TU.manuscript, n(Math.ceil(c.withSpace / 200)) + TU.sheets] : [TU.manuscript, n(c.sentences)],
    [TU.paragraphs, n(c.paragraphs)],
    [TU.lines, n(c.lines)],
    [TU.bytes2, n(c.b2)],
    [TU.bytes3, n(c.b3)],
    [TU.reading, time],
  ];
  stats.replaceChildren(...items.map(([label, value, big]) =>
    h("div", { class: "wc-stat" + (big ? " big" : "") }, h("b", {}, value), h("span", {}, label))));

  const g = +goal.value;
  if (g > 0) {
    const diff = g - c.withSpace;
    goalMsg.textContent = diff >= 0 ? fill(TU.left, { n: n(diff) }) : fill(TU.over, { n: n(-diff) });
    goalMsg.classList.toggle("over", diff < 0);
    goalBar.style.width = Math.min(100, (c.withSpace / g) * 100) + "%";
    goalBar.parentElement.hidden = false;
  } else {
    goalMsg.textContent = "";
    goalBar.parentElement.hidden = true;
  }
  try { localStorage.setItem(KEY, JSON.stringify({ text, goal: goal.value })); } catch {}
}

try {
  const saved = JSON.parse(localStorage.getItem(KEY) || "null");
  if (saved) { area.value = saved.text || ""; goal.value = saved.goal || ""; }
} catch {}

area.addEventListener("input", render);
goal.addEventListener("input", render);
copyBtn.onclick = async () => {
  await navigator.clipboard.writeText(area.value);
  copyBtn.textContent = TU.copied;
  setTimeout(() => (copyBtn.textContent = TU.copy), 1200);
};
clearBtn.onclick = () => { area.value = ""; render(); area.focus(); };
render();
