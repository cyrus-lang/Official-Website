"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Network, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export type GraphNode = {
  id: string;
  label: string;
  color?: string;
  preview?: string;
  effects?: string[];
  properties?: { name: string; value: string }[];
  references?: { name: string; kind: string }[];
};

export type GraphTab = "overview" | "node" | "references";

const tabStyle = "min-w-0 rounded-none px-1 py-2.5 text-xs hover:bg-muted/50 focus-visible:ring-inset focus-visible:ring-offset-0 data-[state=active]:bg-muted data-[state=active]:shadow-none sm:text-sm";

type Props = {
  active?: GraphNode;
  connections: { from: string; to: string }[];
  effects: string[];
  tab: GraphTab;
  onTabChange: (tab: GraphTab) => void;
  mobileOpen: boolean;
  onClose: () => void;
};

export default function GraphInspector({ active, connections, effects, tab, onTabChange, mobileOpen, onClose }: Props) {
  const t = useTranslations("Reference.graph");
  const dir = useLocale() === "fa" ? "rtl" : "ltr";

  return (
    <aside
      aria-labelledby="graph-inspector-title"
      id="graph-inspector"
      dir={dir}
      className={`absolute inset-y-0 left-0 z-30 w-[min(100%,21rem)] min-w-0 flex-col border-r bg-background md:static md:flex md:w-80 lg:w-88 ${mobileOpen ? "flex shadow-xl" : "hidden"}`}
    >
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <h2 id="graph-inspector-title" className="flex items-center gap-2 text-sm font-semibold">
          <Network size={17} className="text-primary" aria-hidden="true" />
          {t("inspector")}
        </h2>
        <button type="button" onClick={onClose} className="rounded p-2 hover:bg-muted md:hidden" aria-label={t("closeInspector")}>
          <X size={17} aria-hidden="true" />
        </button>
      </div>
      <Tabs dir={dir} value={tab} onValueChange={(value) => onTabChange(value as GraphTab)} className="flex min-h-0 flex-1 flex-col">
        <TabsList aria-label={t("inspector")} className="grid h-auto shrink-0 grid-cols-3 rounded-none border-b bg-transparent p-0">
          <TabsTrigger value="overview" className={tabStyle}>{t("tabs.overview")}</TabsTrigger>
          <TabsTrigger value="node" className={tabStyle}>{t("tabs.node")}</TabsTrigger>
          <TabsTrigger value="references" className={tabStyle}>{t("tabs.references")}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="m-0 flex-1 overflow-auto px-4 pt-4 pb-5">
          <h3 className="mb-2 text-sm font-semibold">{t("effectsUsed")}</h3>
          {effects.length ? (
            <ul className="space-y-1 text-sm">
              {effects.map((effect) => <li key={effect}><code dir="ltr">{effect}</code></li>)}
            </ul>
          ) : <p className="text-sm text-muted-foreground">{t("noEffects")}</p>}
        </TabsContent>
        <TabsContent value="node" className="m-0 flex-1 overflow-auto px-4 pt-4 pb-5">
          {active ? (
            <>
              <h3 className="text-base font-semibold" dir="auto">{active.label}</h3>
              <code dir="ltr" className="text-xs text-muted-foreground">{active.id}</code>
              <h4 className="mb-2 mt-5 border-t pt-3 text-sm font-semibold">{t("nodeEffects")}</h4>
              {active.effects?.length ? (
                <ul className="space-y-1 text-sm">
                  {active.effects.map((effect) => <li key={effect}><code dir="ltr">{effect}</code></li>)}
                </ul>
              ) : <p className="text-sm text-muted-foreground">{t("noEffects")}</p>}
              <h4 className="mb-2 mt-5 border-t pt-3 text-sm font-semibold">{t("properties")}</h4>
              {active.properties?.length ? (
                <dl className="space-y-2 text-sm">
                  {active.properties.map(({ name, value }) => (
                    <div key={name}><dt className="font-medium">{name}</dt><dd className="text-muted-foreground">{value}</dd></div>
                  ))}
                </dl>
              ) : <p className="text-sm text-muted-foreground">{t("noProperties")}</p>}
            </>
          ) : <p className="text-sm text-muted-foreground">{t("selectNode")}</p>}
        </TabsContent>
        <TabsContent value="references" className="m-0 flex-1 overflow-auto px-4 pt-4 pb-5">
          {active ? (
            <>
              <h3 className="text-base font-semibold" dir="auto">{active.label}</h3>
              <h4 className="mb-2 mt-4 text-sm font-semibold">{t("codeReferences")}</h4>
              {active.references?.length ? (
                <ul className="space-y-1 text-sm">
                  {active.references.map(({ name, kind }) => (
                    <li key={`${kind}:${name}`}><code dir="ltr">{name}</code> <span className="text-muted-foreground">{kind}</span></li>
                  ))}
                </ul>
              ) : <p className="text-sm text-muted-foreground">{t("noReferences")}</p>}
              <h4 className="mb-2 mt-5 border-t pt-3 text-sm font-semibold">{t("connections")}</h4>
              {connections.length ? (
                <ul dir="ltr" className="space-y-1 text-sm text-muted-foreground">
                  {connections.map(({ from, to }) => (
                    <li key={`${from}:${to}`} className="flex flex-wrap items-center gap-1.5">
                      {from}<ArrowRight size={13} aria-hidden="true" />{to}
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-muted-foreground">{t("noConnections")}</p>}
            </>
          ) : <p className="text-sm text-muted-foreground">{t("selectNode")}</p>}
        </TabsContent>
      </Tabs>
    </aside>
  );
}
