"use client";

import {
  CheckCircle2,
  CircleDashed,
  Clock3,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Status = "done" | "in-progress" | "planned";

type Phase = {
  phase: number;
  title: string;
  description: string;
  progress: number;
  status: Status;
  items: string[];
};

const phases: Phase[] = [
  {
    phase: 1,
    title: "Bootstrap Compiler",
    description:
      "Build the initial compiler infrastructure and complete the core language pipeline.",
    progress: 100,
    status: "done",
    items: [
      "Lexer",
      "Parser",
      "Typed AST",
      "Resolver",
      "LLVM Backend",
      "Diagnostics",
    ],
  },
  {
    phase: 2,
    title: "Libc Binding + Minimal Standard Library",
    description:
      "Provide essential runtime APIs and low-level bindings required for practical development.",
    progress: 72,
    status: "in-progress",
    items: [
      "glibc bindings",
      "allocator",
      "strings",
      "filesystem",
      "array",
      "map",
    ],
  },
  {
    phase: 3,
    title: "Self Hosting",
    description:
      "Rewrite the compiler in Cyrus and establish a complete bootstrap pipeline.",
    progress: 10,
    status: "planned",
    items: [
      "compiler rewrite",
      "bootstrap process",
      "validation",
      "compiler stability",
    ],
  },
  {
    phase: 4,
    title: "Extend STD",
    description:
      "Expand the ecosystem with higher-level abstractions and modern tooling support.",
    progress: 0,
    status: "planned",
    items: [
      "async APIs",
      "networking",
      "collections",
      "formatting",
      "package ecosystem",
    ],
  },
];

function StatusIcon({ status }: { status: Status }) {
  if (status === "done") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 dark:border-emerald-500/30 dark:bg-emerald-500/10">
        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      </div>
    );
  }

  if (status === "in-progress") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 dark:border-blue-500/30 dark:bg-blue-500/10">
        <Clock3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900">
      <CircleDashed className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "done") {
    return (
      <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400">
        Done
      </Badge>
    );
  }

  if (status === "in-progress") {
    return (
      <Badge className="border-blue-500/20 bg-blue-500/10 text-blue-700 hover:bg-blue-500/10 dark:text-blue-400">
        In Progress
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-zinc-300 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
    >
      Planned
    </Badge>
  );
}

export function RoadmapTimeline() {
  return (
    <section className="relative mt-8">
      <div className="relative z-10">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/60">
          {phases.map((phase, index) => (
            <div
              key={phase.phase}
              className={cn(
                "relative grid gap-6 border-b border-zinc-200 p-6 dark:border-zinc-800 md:grid-cols-[120px_1fr]",
                index === phases.length - 1 && "border-b-0"
              )}
            >
              {/* left timeline column */}
              <div className="relative flex items-start gap-4">
                {/* vertical line */}
                {index !== phases.length - 1 && (
                  <div className="absolute left-4 top-10 hidden h-[calc(100%+24px)] w-px bg-zinc-200 dark:bg-zinc-800 md:block" />
                )}                
                <StatusIcon status={phase.status} />

                <div className="pt-1">
                  <div className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
                    PHASE
                  </div>

                  <div className="font-mono text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {String(phase.phase).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* content */}
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    {phase.title}
                  </h3>

                  <StatusBadge status={phase.status} />

                  {phase.status === "in-progress" && (
                    <Badge className="border-blue-500/20 bg-blue-500/10 text-blue-700 hover:bg-blue-500/10 dark:text-blue-300">
                      Current Focus
                    </Badge>
                  )}
                </div>

                <p className="mb-6 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-400">
                  {phase.description}
                </p>

                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Progress
                    </span>

                    <span className="font-mono text-sm text-zinc-500 dark:text-zinc-500">
                      {phase.progress}%
                    </span>
                  </div>

                  <Progress
                    value={phase.progress}
                    className="h-2 bg-zinc-200 dark:bg-zinc-800"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {phase.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-md border border-zinc-200 bg-zinc-100/80 px-3 py-1.5 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}