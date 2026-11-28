import { readFile, writeFile } from "node:fs/promises";

// Usage: node scripts/export-package-docs.mjs package.json package.html [en|fa]
// Input shape: content/reference/stdlib.json. Text can also be a plain string.
const [input, output, locale = "en"] = process.argv.slice(2);

if (!input || !output || !["en", "fa"].includes(locale)) {
  console.error("Usage: node scripts/export-package-docs.mjs <input.json> <output.html> [en|fa]");
  process.exit(1);
}

const copy = {
  en: {
    title: "Package documentation", modules: "Modules", index: "Declaration index",
    source: "Source", search: "Search declarations", example: "Example", empty: "No declarations match.",
    groups: { function: "Functions", struct: "Structs", interface: "Interfaces", constant: "Constants" },
  },
  fa: {
    title: "مستندات پکیج", modules: "ماژول‌ها", index: "نمایهٔ اعضا",
    source: "کد منبع", search: "جست‌وجوی اعضا", example: "مثال", empty: "عضوی پیدا نشد.",
    groups: { function: "توابع", struct: "ساختارها", interface: "رابط‌ها", constant: "ثابت‌ها" },
  },
}[locale];

const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);
const localize = (value) => typeof value === "string" ? value : value?.[locale] ?? value?.en ?? "";
const code = (text) => `<code dir="ltr">${escape(text)}</code>`;

function makeHtml(data) {
  if (typeof data?.name !== "string" || !Array.isArray(data.modules)) {
    throw new Error("The input must contain a package name and a modules array.");
  }
  const modules = data.modules.map((module, moduleIndex) => {
    if (typeof module?.path !== "string" || !Array.isArray(module.items)) {
      throw new Error("Each module must contain a path and an items array.");
    }
    const id = `module-${moduleIndex}`;
    const groups = new Map();
    for (const [itemIndex, item] of module.items.entries()) {
      if (typeof item?.name !== "string" || typeof item.kind !== "string" || typeof item.signature !== "string") {
        throw new Error("Each item must contain a name, kind, and signature.");
      }
      if (!groups.has(item.kind)) groups.set(item.kind, []);
      groups.get(item.kind).push({ ...item, anchor: `${id}-${itemIndex}` });
    }
    return { ...module, anchor: id, groups };
  });
  const groupName = (kind) => escape(Object.hasOwn(copy.groups, kind) ? copy.groups[kind] : kind);
  const moduleIndex = modules.map((module) => `<li><a href="#${module.anchor}">${code(module.path)}</a></li>`).join("");
  const declarations = modules.map((module) => `
    <section id="${module.anchor}" data-module>
      <h2>${code(module.path)}</h2><p>${escape(localize(module.description))}</p>
      ${[...module.groups].map(([kind, items]) => `<section data-group><h3>${groupName(kind)}</h3>
        ${items.map((item) => `<article id="${item.anchor}" data-declaration>
          <h4><a href="#${item.anchor}">${code(item.name)}</a></h4>
          <p>${escape(localize(item.description))}</p><pre dir="ltr">${code(item.signature)}</pre>
          ${item.example ? `<p><strong>${copy.example}</strong></p><pre dir="ltr">${code(item.example)}</pre>` : ""}
        </article>`).join("")}</section>`).join("")}
    </section>`).join("");
  const declarationIndex = modules.map((module) => `<section>
    <a href="#${module.anchor}">${code(module.path)}</a>
    ${[...module.groups].map(([kind, items]) => `<p>${groupName(kind)}</p><ul>
      ${items.map((item) => `<li><a href="#${item.anchor}">${code(item.name)}</a></li>`).join("")}
    </ul>`).join("")}</section>`).join("");
  const source = typeof data.source === "string" && /^https?:\/\//i.test(data.source)
    ? `<p><a href="${escape(data.source)}">${copy.source}</a></p>` : "";

  return `<!doctype html>
<html lang="${locale}" dir="${locale === "fa" ? "rtl" : "ltr"}">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(data.name)} · ${copy.title}</title>
<style>
:root { color-scheme:light dark; --bg:#fff; --text:#1c1917; --muted:#f5f5f4; --border:#ddd6d3; --accent:#8c4a2e; }
@media(prefers-color-scheme:dark) { :root { --bg:#121212; --text:#f5f5f4; --muted:#202020; --border:#3b3531; --accent:#e6a080; } }
* { box-sizing:border-box; } body { margin:0; background:var(--bg); color:var(--text); font:1rem/1.55 system-ui,sans-serif; }
header { background:var(--muted); border-bottom:1px solid var(--border); }
header>div, .layout { max-width:90rem; margin:auto; padding:1.5rem; }
h1,h2,h3,h4,p { margin:0 0 .6rem; } h1 { font-size:2rem; }
a { color:var(--accent); text-underline-offset:.18em; } code { overflow-wrap:anywhere; }
input { width:min(100%,34rem); margin-top:.65rem; padding:.65rem .8rem; font:inherit; border:1px solid var(--border); border-radius:.45rem; background:var(--bg); color:var(--text); }
.layout { display:grid; grid-template-columns:13rem minmax(0,1fr) 11rem; gap:1.5rem; align-items:start; }
nav { position:sticky; top:1rem; max-height:calc(100dvh - 2rem); overflow:auto; padding:1rem; border:1px solid var(--border); border-radius:.6rem; }
nav ul { list-style:none; margin:0 0 .8rem; padding:0; font-size:.9rem; }
nav p { font-size:.85rem; margin:.5rem 0 .25rem; }
main>section { margin-bottom:2rem; } main [data-group] { margin-top:1.2rem; }
article { padding:.85rem 0; border-top:1px solid var(--border); }
article:target { background:var(--muted); } article p { white-space:pre-line; }
pre { margin:.5rem 0; overflow:auto; padding:.75rem; background:var(--muted); border-radius:.4rem; }
pre code { overflow-wrap:normal; } :target { scroll-margin-top:1rem; }
@media(max-width:65rem) { .layout { grid-template-columns:12rem minmax(0,1fr); } .index { display:none; } }
@media(max-width:44rem) { .layout { grid-template-columns:minmax(0,1fr); } nav { position:static; } }
</style>
<header><div><p>${copy.title}</p><h1>${escape(data.name)}</h1>
<input hidden type="search" id="search" placeholder="${copy.search}" aria-label="${copy.search}"></div></header>
<div class="layout">
<nav aria-label="${copy.modules}"><h2>${copy.modules}</h2><ul>${moduleIndex}</ul>${source}</nav>
<main><p hidden id="empty" role="status">${copy.empty}</p>${declarations}</main>
<nav class="index" aria-label="${copy.index}"><h2>${copy.index}</h2>${declarationIndex}</nav>
</div>
<script>
const search = document.getElementById('search');
const modules = Array.from(document.querySelectorAll('[data-module]'));
search.hidden = false;
search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  let matches = 0;
  for (const module of modules) {
    let moduleMatches = 0;
    for (const group of module.querySelectorAll('[data-group]')) {
      let groupMatches = 0;
      for (const item of group.querySelectorAll('[data-declaration]')) {
        item.hidden = !(module.querySelector('h2').textContent + '::' + item.textContent).toLowerCase().includes(query);
        if (!item.hidden) groupMatches++;
      }
      group.hidden = Boolean(query) && groupMatches === 0;
      moduleMatches += groupMatches;
    }
    module.hidden = Boolean(query) && moduleMatches === 0;
    matches += moduleMatches;
  }
  document.getElementById('empty').hidden = !query || matches > 0;
});
document.addEventListener('click', (event) => {
  if (search.value && event.target.closest('a[href^="#"]')) {
    search.value = '';
    search.dispatchEvent(new Event('input'));
  }
});
</script>
</html>`;
}

try {
  const data = JSON.parse(await readFile(input, "utf8"));
  await writeFile(output, makeHtml(data), "utf8");
} catch (error) {
  console.error(`Unable to export package documentation: ${error.message}`);
  process.exitCode = 1;
}
