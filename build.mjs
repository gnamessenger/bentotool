// 사이트 빌드: node build.mjs  →  docs/ 폴더에 완성된 사이트가 만들어져요.
import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "./src/config.mjs";
import { site, tools } from "./src/content.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "docs");
const LANGS = ["ko", "en"];

const LIBS = {
  jszip: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  jspdf: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  pdflib: "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js",
  pdfjs: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  lamejs: "https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js",
  qrcode: "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js",
  cropper: "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.js",
  cropperCss: "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.css",
};
const isCss = (l) => LIBS[l].endsWith(".css");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const json = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

// 페이지 경로 ("" = 홈, "merge-pdf/" 등). 영어는 en/ 아래.
const pathFor = (lang, p) => (lang === "ko" ? "" : "en/") + p;
const rootFor = (lang, p) => "../".repeat((pathFor(lang, p).match(/\//g) || []).length) || "./";

function adSlot(name) {
  if (!config.adsenseClient || !config.adSlots[name]) return "";
  return `<div class="ad-slot"><ins class="adsbygoogle" style="display:block" data-ad-client="${config.adsenseClient}" data-ad-slot="${config.adSlots[name]}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`;
}

function promo(lang) {
  const p = config.promo[lang];
  if (!p) return "";
  return `<aside class="promo"><div><strong>${esc(p.title)}</strong><p>${esc(p.text)}</p></div><a class="btn small" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.cta)}</a></aside>`;
}

function layout({ lang, path, title, desc, main, T = null, libs = [], script = null, schema = null }) {
  const S = site[lang];
  const root = rootFor(lang, path);
  const other = lang === "ko" ? "en" : "ko";
  const url = (l) => `${config.domain}/${pathFor(l, path)}`;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url(lang)}">
${config.verify?.google ? `<meta name="google-site-verification" content="${esc(config.verify.google)}">` : ""}
${config.verify?.naver ? `<meta name="naver-site-verification" content="${esc(config.verify.naver)}">` : ""}
<link rel="alternate" hreflang="ko" href="${url("ko")}">
<link rel="alternate" hreflang="en" href="${url("en")}">
<link rel="alternate" hreflang="x-default" href="${url("en")}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url(lang)}">
<meta property="og:site_name" content="${esc(config.name[lang])}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22%237D55C7%22/><rect x=%2220%22 y=%2220%22 width=%2226%22 height=%2226%22 rx=%226%22 fill=%22white%22/><rect x=%2254%22 y=%2220%22 width=%2226%22 height=%2226%22 rx=%226%22 fill=%22%23E8E2F5%22/><rect x=%2220%22 y=%2254%22 width=%2260%22 height=%2226%22 rx=%226%22 fill=%22white%22/></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}assets/style.css">
${libs.filter(isCss).map((l) => `<link rel="stylesheet" href="${LIBS[l]}">`).join("\n")}
${config.adsenseClient ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsenseClient}" crossorigin="anonymous"></script>` : ""}
${schema ? `<script type="application/ld+json">${json(schema)}</script>` : ""}
</head>
<body>
<header class="site-header">
  <a class="logo" href="${root}${lang === "ko" ? "" : "en/"}">
    <span class="logo-mark"><i></i><i></i><i></i></span>${esc(config.name[lang])}
  </a>
  <nav>
    <a href="${root}${lang === "ko" ? "" : "en/"}#tools">${S.nav.tools}</a>
    <a class="lang" href="${root}${pathFor(other, path)}" hreflang="${other}">🌐 ${S.switchLabel}</a>
  </nav>
</header>
<main>
${main}
</main>
<footer class="site-footer">
  <p>${S.footer.note}</p>
  <p><a href="${root}${pathFor(lang, "privacy/")}">${S.footer.privacy}</a> · © ${new Date().getFullYear()} ${esc(config.name[lang])}</p>
</footer>
${T ? `<script>window.T=${json(T)};</script>` : ""}
${libs.filter((l) => !isCss(l)).map((l) => `<script src="${LIBS[l]}"></script>`).join("\n")}
${script ? `<script type="module" src="${root}assets/tools/${script}.js"></script>` : ""}
</body>
</html>
`;
}

function toolCard(lang, t, root) {
  return `<a class="tool-card-link" href="${root}${pathFor(lang, t.slug + "/")}">
    <span class="tool-icon">${t.icon}</span>
    <strong>${esc(t[lang].name)}</strong>
    <span>${esc(t[lang].short)}</span>
  </a>`;
}

function homePage(lang) {
  const S = site[lang];
  const root = rootFor(lang, "");
  const cats = [...new Set(tools.map((t) => t.cat))];
  const main = `
<section class="home-hero">
  <h1>${S.home.h1}</h1>
  <p>${esc(S.home.sub)}</p>
</section>
<section id="tools" class="home-tools">
  ${cats.map((c) => `
  <h2>${S.cats[c]}</h2>
  <div class="bento">
    ${tools.filter((t) => t.cat === c).map((t) => toolCard(lang, t, root)).join("")}
  </div>`).join("")}
</section>
${promo(lang)}
<section class="features">
  ${S.home.features.map(([icon, h, p]) => `<div><span>${icon}</span><strong>${esc(h)}</strong><p>${esc(p)}</p></div>`).join("")}
</section>
${adSlot("bottom")}`;
  return layout({
    lang, path: "", title: S.home.title, desc: S.home.desc, main,
    schema: { "@context": "https://schema.org", "@type": "WebSite", name: config.name[lang], url: `${config.domain}/${pathFor(lang, "")}` },
  });
}

function toolPage(lang, t) {
  const S = site[lang];
  const c = t[lang];
  const path = t.slug + "/";
  const root = rootFor(lang, path);
  const main = `
<section class="tool-hero">
  <h1>${esc(c.h1)}</h1>
  <p>${esc(c.sub)}</p>
  <span class="privacy-badge">${S.ui.privacyBadge}</span>
</section>
${adSlot("top")}
<section id="tool" class="tool-root"><noscript>JavaScript is required.</noscript></section>
${promo(lang)}
<section class="tool-info">
  <h2>${S.how}</h2>
  <ol class="steps">${c.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
  <h2>${S.faq}</h2>
  <div class="faq">${c.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
</section>
${adSlot("bottom")}
<section class="related">
  <h2>${S.related}</h2>
  <div class="bento">${[...tools.filter((x) => x !== t && x.cat === t.cat), ...tools.filter((x) => x.cat !== t.cat)]
    .slice(0, 8).map((x) => toolCard(lang, x, root)).join("")}</div>
</section>`;
  return layout({
    lang, path, title: c.title, desc: c.desc, main,
    T: { lang, ui: S.ui, tool: c.ui },
    libs: t.libs,
    script: t.slug,
    schema: [
      {
        "@context": "https://schema.org", "@type": "WebApplication", name: c.name,
        applicationCategory: "MultimediaApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: lang === "ko" ? "KRW" : "USD" },
      },
      {
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: c.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
      },
    ],
  });
}

function privacyPage(lang) {
  const P = site[lang].privacy;
  return layout({ lang, path: "privacy/", title: P.title, desc: P.desc, main: `<article class="doc"><h1>${P.h1}</h1>${P.body}</article>` });
}

// ---------- 출력 ----------
function write(rel, content) {
  const file = join(OUT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

// docs/ 안에서 CNAME 같은 수동 파일은 유지
const savedContent = {};
for (const f of ["CNAME"]) if (existsSync(join(OUT, f))) savedContent[f] = readFileSync(join(OUT, f));
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const [f, c] of Object.entries(savedContent)) writeFileSync(join(OUT, f), c);

cpSync(join(ROOT, "src", "assets"), join(OUT, "assets"), { recursive: true });

const urls = [];
for (const lang of LANGS) {
  write(pathFor(lang, "index.html"), homePage(lang));
  urls.push(pathFor(lang, ""));
  for (const t of tools) {
    write(pathFor(lang, `${t.slug}/index.html`), toolPage(lang, t));
    urls.push(pathFor(lang, t.slug + "/"));
  }
  write(pathFor(lang, "privacy/index.html"), privacyPage(lang));
}

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${config.domain}/${u}</loc></url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${config.domain}/sitemap.xml\n`);
write(".nojekyll", "");

console.log(`빌드 완료: 페이지 ${urls.length + LANGS.length}개 → docs/`);
