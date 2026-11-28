"use client";

import graphData from "@/content/reference/effect-graph.json";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Portal } from "@radix-ui/react-tooltip";
import { Grip, Minus, PanelLeftOpen, Plus, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import GraphInspector, { type GraphNode, type GraphTab } from "./graph-inspector";

type Point = { x: number; y: number };
type Drag = { pointer: number; start: Point; offset: Point };

const center = { x: 0, y: 0 };
const toolbarStart = { x: 12, y: 12 };
const nodeColors = new Map([
  ["red", "#e48282"],
  ["orange", "#edaa70"],
  ["yellow", "#dbd953"],
  ["white", "#bcbcbc"],
]);
const graph: { nodes: GraphNode[]; edges: { from: string; to: string }[] } = graphData;
const effects = [...new Set(graph.nodes.flatMap((node) => node.effects ?? []))];
const nodeLabels = new Map(graph.nodes.map(({ id, label }) => [id, label]));
const radius = Math.max(94, graph.nodes.length * 23);
const positions = new Map(graph.nodes.map((node, index) => {
  const angle = index / graph.nodes.length * Math.PI * 2 - Math.PI / 2;
  return [node.id, {
    x: Math.round(Math.cos(angle) * radius),
    y: Math.round(Math.sin(angle) * radius),
  }] as const;
}));

function startDrag(event: PointerEvent<HTMLElement>, offset: Point): Drag {
  event.currentTarget.setPointerCapture(event.pointerId);
  return { pointer: event.pointerId, start: { x: event.clientX, y: event.clientY }, offset };
}

function dragPosition(event: PointerEvent<HTMLElement>, drag: Drag): Point {
  return { x: drag.offset.x + event.clientX - drag.start.x, y: drag.offset.y + event.clientY - drag.start.y };
}

export default function GraphEditor() {
  const t = useTranslations("Reference.graph");
  const [selected, setSelected] = useState<string | null>(null);
  const [offset, setOffset] = useState(center);
  const [zoom, setZoom] = useState(1);
  const [toolbarPosition, setToolbarPosition] = useState(toolbarStart);
  const [panning, setPanning] = useState(false);
  const [tab, setTab] = useState<GraphTab>("overview");
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const toolbar = useRef<HTMLDivElement>(null);
  const openInspector = useRef<HTMLButtonElement>(null);
  const panDrag = useRef<Drag | null>(null);
  const toolbarDrag = useRef<Drag | null>(null);
  const active = graph.nodes.find((node) => node.id === selected);
  const connections = graph.edges
    .filter(({ from, to }) => from === selected || to === selected)
    .map(({ from, to }) => ({ from: nodeLabels.get(from) ?? from, to: nodeLabels.get(to) ?? to }));

  function inspectNode(id: string) {
    setSelected(id);
    setTab("node");
    setMobileInspectorOpen(true);
  }

  function clampToolbar(point: Point) {
    const right = (viewport.current?.clientWidth ?? 0) - (toolbar.current?.offsetWidth ?? 0);
    const bottom = (viewport.current?.clientHeight ?? 0) - (toolbar.current?.offsetHeight ?? 0);
    return { x: Math.min(Math.max(0, point.x), Math.max(0, right)), y: Math.min(Math.max(0, point.y), Math.max(0, bottom)) };
  }

  function changeZoom(delta: number) {
    setZoom((current) => Math.min(2.5, Math.max(0.4, Math.round((current + delta) * 100) / 100)));
  }

  function endPan(event: PointerEvent<HTMLElement>) {
    if (panDrag.current?.pointer !== event.pointerId) return;
    panDrag.current = null;
    setPanning(false);
  }

  function endToolbarDrag(event: PointerEvent<HTMLElement>) {
    if (toolbarDrag.current?.pointer === event.pointerId) toolbarDrag.current = null;
  }

  return (
    <section dir="ltr" className="relative isolate flex min-h-80 flex-1 overflow-hidden" aria-label={t("title")}>
      <h1 className="sr-only">{t("title")}</h1>
      <GraphInspector
        active={active}
        connections={connections}
        effects={effects}
        tab={tab}
        onTabChange={setTab}
        mobileOpen={mobileInspectorOpen}
        onClose={() => {
          setMobileInspectorOpen(false);
          openInspector.current?.focus();
        }}
      />
      <div
      ref={viewport}
      role="region"
      aria-label={t("canvas")}
      className={`relative min-w-0 flex-1 touch-none overflow-hidden ${panning ? "cursor-grabbing" : "cursor-grab"}`}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0 || !(event.target instanceof Element) || event.target.closest("button, [data-graph-overlay]")) return;
        panDrag.current = startDrag(event, offset);
        setPanning(true);
      }}
      onPointerMove={(event) => {
        const drag = panDrag.current;
        if (drag?.pointer === event.pointerId) setOffset(dragPosition(event, drag));
      }}
      onPointerUp={endPan}
      onPointerCancel={endPan}
      onLostPointerCapture={endPan}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        const shift: Record<string, Point> = {
          ArrowLeft: { x: -32, y: 0 }, ArrowRight: { x: 32, y: 0 },
          ArrowUp: { x: 0, y: -32 }, ArrowDown: { x: 0, y: 32 },
        };
        const delta = shift[event.key];
        if (delta) {
          event.preventDefault();
          setOffset((point) => ({ x: point.x + delta.x, y: point.y + delta.y }));
        }
      }}
    >
      <div className="absolute top-1/2 left-1/2" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}>
        {graph.edges.map(({ from, to }, index) => {
          const start = positions.get(from);
          const end = positions.get(to);
          if (!start || !end) return null;
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const highlighted = from === selected || to === selected;
          return (
            <span
              aria-hidden="true"
              key={index}
              className={`pointer-events-none absolute h-px origin-left ${highlighted ? "bg-primary text-primary" : "bg-muted-foreground/45 text-muted-foreground"}`}
              style={{
                left: start.x,
                top: start.y,
                width: Math.round(Math.hypot(dx, dy) * 100) / 100,
                transform: `rotate(${Number(Math.atan2(dy, dx).toFixed(4))}rad)`,
              }}
            >
              <span className="absolute top-0 left-[62%] size-1.5 -translate-y-1/2 rotate-45 border-e border-t border-current" />
            </span>
          );
        })}
        <TooltipProvider delayDuration={180}>
          {graph.nodes.map((node) => {
            const point = positions.get(node.id)!;
            const accent = nodeColors.get(node.color ?? "");

            return (
              <Tooltip key={node.id}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-pressed={selected === node.id}
                    onClick={() => inspectNode(node.id)}
                    className={`absolute z-10 w-max max-w-28 -translate-x-1/2 -translate-y-1/2 break-words rounded-md border px-3 py-2 text-sm font-medium shadow-sm hover:border-primary focus-visible:outline-2 focus-visible:outline-primary aria-pressed:border-primary aria-pressed:text-primary ${accent ? "border-[color:color-mix(in_srgb,var(--graph-node-accent)_38%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--graph-node-accent)_15%,var(--color-background))]" : "bg-background"}`}
                    style={{ left: point.x, top: point.y, "--graph-node-accent": accent } as CSSProperties}
                  >
                    {node.label}
                  </button>
                </TooltipTrigger>
                <Portal>
                  <TooltipContent side="top" sideOffset={8} collisionPadding={8} className="max-w-56 px-3 py-2">
                    <p dir="auto" className="font-semibold">{node.label}</p>
                    {node.preview ? (
                      <p dir="auto" className="mt-1 text-xs text-muted-foreground">{node.preview}</p>
                    ) : (
                      <code dir="ltr" className="text-xs text-muted-foreground">{node.id}</code>
                    )}
                  </TooltipContent>
                </Portal>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
      <div ref={toolbar} data-graph-overlay className="absolute z-20 flex flex-col items-center rounded-lg border bg-background p-1 shadow-md [--graph-tools-height:14rem] md:[--graph-tools-height:12rem]" style={{ top: `min(${toolbarPosition.y}px, calc(100% - var(--graph-tools-height)))`, left: `min(${toolbarPosition.x}px, calc(100% - 3rem))` }}>
        <button
          ref={openInspector}
          type="button"
          aria-label={t("openInspector")}
          aria-controls="graph-inspector"
          aria-expanded={mobileInspectorOpen}
          onClick={() => setMobileInspectorOpen(true)}
          className="grid size-9 place-items-center rounded-md hover:bg-muted md:hidden"
        >
          <PanelLeftOpen size={17} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={t("moveTools")}
          title={t("moveTools")}
          className="grid size-9 cursor-move place-items-center rounded-md hover:bg-muted"
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0 || !toolbar.current) return;
            const { offsetLeft, offsetTop } = toolbar.current;
            toolbarDrag.current = startDrag(event, { x: offsetLeft, y: offsetTop });
          }}
          onPointerMove={(event) => {
            const drag = toolbarDrag.current;
            if (drag?.pointer === event.pointerId) setToolbarPosition(clampToolbar(dragPosition(event, drag)));
          }}
          onPointerUp={endToolbarDrag}
          onPointerCancel={endToolbarDrag}
          onLostPointerCapture={endToolbarDrag}
          onKeyDown={(event) => {
            const delta = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[event.key];
            if (!delta || !toolbar.current) return;
            event.preventDefault();
            setToolbarPosition(clampToolbar({ x: toolbar.current.offsetLeft + delta[0], y: toolbar.current.offsetTop + delta[1] }));
          }}
        >
          <Grip size={16} aria-hidden="true" />
        </button>
        <button type="button" title={t("zoomIn")} aria-label={t("zoomIn")} disabled={zoom === 2.5} onClick={() => changeZoom(0.2)} className="grid size-9 place-items-center rounded-md hover:bg-muted disabled:opacity-40"><Plus size={17} aria-hidden="true" /></button>
        <output aria-label={t("zoom")} className="py-1 text-xs tabular-nums">{Math.round(zoom * 100)}%</output>
        <button type="button" title={t("zoomOut")} aria-label={t("zoomOut")} disabled={zoom === 0.4} onClick={() => changeZoom(-0.2)} className="grid size-9 place-items-center rounded-md hover:bg-muted disabled:opacity-40"><Minus size={17} aria-hidden="true" /></button>
        <button type="button" title={t("resetView")} aria-label={t("resetView")} onClick={() => { setZoom(1); setOffset(center); }} className="grid size-9 place-items-center rounded-md hover:bg-muted"><RotateCcw size={16} aria-hidden="true" /></button>
      </div>
      </div>
    </section>
  );
}
