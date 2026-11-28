"use client";

import { Link } from "@/i18n/navigation";
import { ArrowUpRight, Hash, Network, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

type Locale = "en" | "fa";
type Localized = Record<Locale, string>;

type ReferenceItem = {
  name: string;
  kind: string;
  description: Localized;
  signature: string;
  parameters?: string[];
  returns?: string;
  example?: string;
};

type ReferenceModule = {
  id: string;
  path: string;
  description: Localized;
  items: ReferenceItem[];
};

type Reference = {
  source: string;
  modules: ReferenceModule[];
};

const scopes = ["all", "names", "parameters", "returns"] as const;
type Scope = (typeof scopes)[number];
const knownKinds = ["function", "struct", "interface", "constant"] as const;

function groupItems(items: ReferenceItem[]) {
  const groups = new Map<string, ReferenceItem[]>();
  for (const item of items) {
    const group = groups.get(item.kind);
    if (group) group.push(item);
    else groups.set(item.kind, [item]);
  }
  return [...groups];
}

function itemId(module: ReferenceModule, item: ReferenceItem) {
  return `${module.id}-${item.name}`;
}

export default function ReferenceBrowser({ reference, locale }: { reference: Reference; locale: Locale }) {
  const t = useTranslations("Reference");
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<Scope>("all");
  const [moduleFilter, setModuleFilter] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const searchResults = useRef<HTMLDivElement>(null);
  const term = query.trim().toLowerCase();

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if (event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest("input, textarea, select, [role='textbox']"))) return;
      event.preventDefault();
      input.current?.focus();
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const modules = reference.modules.filter((module) => !moduleFilter || module.id === moduleFilter);
  const results = modules.flatMap((module) => module.items
    .filter((item) => {
      const name = `${module.path}::${item.name}`;
      const fields = {
        all: [name, item.description[locale], item.signature, ...(item.parameters ?? []), item.returns ?? ""],
        names: [name],
        parameters: item.parameters ?? [],
        returns: item.returns ? [item.returns] : [],
      };
      return fields[scope].some((field) => field.toLowerCase().includes(term));
    })
    .map((item) => ({ module, item })));

  function openResult(module: ReferenceModule, item: ReferenceItem) {
    resetSearch();
    const id = itemId(module, item);
    window.location.hash = id;
    const section = document.getElementById(id);
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ block: "start" });
  }

  function resetSearch() {
    flushSync(() => {
      setQuery("");
      setModuleFilter("");
      setScope("all");
    });
  }

  function groupLabel(kind: string) {
    return knownKinds.some((known) => known === kind) ? t(`groups.${kind}`) : kind;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid max-w-[96rem] items-start gap-6 px-4 pt-12 pb-8 sm:px-8 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_17rem] xl:gap-x-10">
        <h1 className="min-w-0 self-center text-2xl font-bold tracking-tight sm:text-3xl lg:col-start-1 lg:row-start-1">{t("title")}</h1>
        <div className="flex w-full items-center gap-2 rounded-lg border px-3 focus-within:ring-2 focus-within:ring-primary/50 lg:col-start-2 lg:row-start-1">
            <Search size={19} className="shrink-0 text-primary" aria-hidden="true" />
            <input
              ref={input}
              type="search"
              aria-label={t("searchLabel")}
              placeholder={t("placeholder")}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setQuery("");
                if (event.key === "Enter" && term) searchResults.current?.querySelector<HTMLButtonElement>("li button")?.focus();
              }}
              className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button type="button" className="p-2 text-muted-foreground hover:text-foreground" aria-label={t("clear")} onClick={() => { setQuery(""); input.current?.focus(); }}>
                <X size={17} aria-hidden="true" />
              </button>
            ) : (
              <kbd className="hidden rounded border bg-muted px-2 py-0.5 text-xs text-muted-foreground sm:block" aria-hidden="true">/</kbd>
            )}
        </div>
        <div className="order-2 min-w-0 lg:order-none lg:col-start-1 lg:row-start-2">
          {term && (
            <div ref={searchResults} className="mb-8">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-semibold">{t("results")}</h2>
                <select
                  aria-label={t("filterModule")}
                  className="rounded-md border bg-background px-3 py-2 text-sm"
                  value={moduleFilter}
                  onChange={(event) => setModuleFilter(event.target.value)}
                >
                  <option value="">{t("allModules")}</option>
                  {reference.modules.map((module) => <option key={module.id} value={module.id}>{module.path}</option>)}
                </select>
              </div>
              <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label={t("filterScope")}>
                {scopes.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={scope === value}
                    onClick={() => setScope(value)}
                    className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted aria-pressed:border-primary/40 aria-pressed:bg-primary/10 aria-pressed:text-primary"
                  >
                    {t(`scope.${value}`)}
                  </button>
                ))}
              </div>
              <p role="status" className="mb-3 text-sm text-muted-foreground">{t("count", { count: results.length })}</p>
              {results.length ? (
                <ul className="divide-y overflow-hidden rounded-xl border bg-card">
                  {results.map(({ module, item }) => (
                    <li key={itemId(module, item)}>
                      <button type="button" onClick={() => openResult(module, item)} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-start hover:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
                        <span className="min-w-0">
                          <code dir="ltr" className="block break-all text-start text-sm font-medium text-primary">{module.path}::{item.name}</code>
                          <span className="text-sm text-muted-foreground">{item.description[locale]}</span>
                        </span>
                        <ArrowUpRight size={16} className="shrink-0 text-primary" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-xl border border-dashed p-5 text-sm text-muted-foreground">{t("empty")}</p>
              )}
            </div>
          )}
          <div hidden={!!term} className="space-y-9">
            {reference.modules.map((module) => (
              <section key={module.id} id={module.id} className="scroll-mt-[calc(var(--header-height)+1rem)]">
                <div className="mb-4 border-b pb-4">
                  <h2 className="text-2xl font-semibold"><code dir="ltr">{module.path}</code></h2>
                  <p className="mt-2 text-sm text-muted-foreground">{module.description[locale]}</p>
                </div>

                <div className="space-y-7">
                  {groupItems(module.items).map(([kind, items]) => (
                    <div key={kind}>
                      <h3 className="text-lg font-semibold">{groupLabel(kind)}</h3>
                      <ul className="mt-2 divide-y">
                        {items.map((item) => (
                          <li key={item.name}>
                            <article id={itemId(module, item)} tabIndex={-1} className="space-y-3 scroll-mt-[calc(var(--header-height)+1rem)] py-4 target:rounded-md target:bg-primary/5">
                              <h4>
                                <a href={`#${itemId(module, item)}`} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                                  <Hash size={14} aria-hidden="true" />
                                  <code dir="ltr">{item.name}</code>
                                </a>
                              </h4>
                              <p className="whitespace-pre-line text-sm text-muted-foreground">{item.description[locale]}</p>
                              <pre dir="ltr" className="overflow-x-auto rounded-md bg-muted p-3 text-left text-sm"><code>{item.signature}</code></pre>
                              {item.example && (
                                <div>
                                  <p className="mb-2 text-sm font-semibold">{t("example")}</p>
                                  <pre dir="ltr" className="overflow-x-auto rounded-md bg-muted p-3 text-left text-sm"><code>{item.example}</code></pre>
                                </div>
                              )}
                            </article>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <nav aria-label={t("index")} className={`flex min-w-0 flex-col rounded-lg border p-3 lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:order-none lg:col-start-2 lg:row-start-2 lg:max-h-[calc(100dvh-var(--header-height)-2rem)] ${term ? "order-3" : "order-1"}`}>
          <p className="mb-3 shrink-0 text-sm font-semibold">{t("index")}</p>
          <div className="min-h-0 max-h-52 overflow-auto lg:max-h-none">
            {reference.modules.map((module) => (
              <div key={module.id} className="mb-4 last:mb-0">
                <a href={`#${module.id}`} onClick={term ? resetSearch : undefined} className="block break-all text-xs font-semibold text-primary hover:underline"><code dir="ltr">{module.path}</code></a>
                {groupItems(module.items).map(([kind, items]) => (
                  <div key={kind} className="mt-2 border-s ps-2">
                    <p className="text-xs text-muted-foreground">{groupLabel(kind)}</p>
                    <ul>
                      {items.map((item) => (
                        <li key={item.name}><a href={`#${itemId(module, item)}`} onClick={term ? resetSearch : undefined} className="block break-all py-0.5 text-xs hover:text-primary hover:underline"><code dir="ltr">{item.name}</code></a></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-3 shrink-0 space-y-2 border-t pt-3">
            <a href={reference.source} className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-primary">
              <ArrowUpRight size={15} className="shrink-0" aria-hidden="true" /> {t("source")}
            </a>
            <Link href="/reference/graph" className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-primary">
              <Network size={15} className="shrink-0" aria-hidden="true" /> {t("graph.title")}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
