"use client";

import { CheckCircle2, CircleDashed, Clock3 } from "lucide-react";

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
    progress: 100,
    status: "done",
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
    progress: 100,
    status: "done",
    items: [
      "compiler rewrite",
      "bootstrap process",
      "validation",
      "compiler stability",
    ],
  },
  {
    phase: 4,
    title: "Expanding Language Features",
    description:
      "Introduce explicit error handling, compile-time execution, and core build tooling to make Cyrus production-ready.",
    progress: 0,
    status: "in-progress",
    items: [
      "error handling",
      "comptime execution",
      "foreach loop",
      "testing framework",
      "babylon package manager",
      "slices",
    ],
  },
  {
    phase: 5,
    title: "Extending Standard Library",
    description:
      "Equip the standard library with specialized allocators, data serialization, I/O primitives, and systems-level utilities for real-world applications.",
    progress: 0,
    status: "planned",
    items: [
      "arena & pool allocators",
      "buffered & stream I/O",
      "JSON & TOML parsers",
      "compression",
      "networking",
      "async APIs",
      "collections",
      "formatting",
      "package ecosystem",
    ],
  },
  {
    phase: 6,
    title: "Developer Tooling & IDE Support",
    description:
      "Deliver a first-class developer experience with editor integrations, static analysis, and debugging utilities.",
    progress: 0,
    status: "planned",
    items: [
      "language server (LSP)",
      "code formatter",
      "linter & static analysis",
      "debugger integration",
      "doc generator"
    ],
  },
  {
    phase: 7,
    title: "Cross-Platform Support",
    description:
      "Extend compiler backends, system bindings, and standard library abstractions to natively support Windows and macOS.",
    progress: 0,
    status: "planned",
    items: [
      "Win32 API bindings",
      "macOS / Darwin bindings",
      "cross-compilation targets",
      "COFF & Mach-O linking",
      "platform-agnostic filesystem & I/O",
      "release binaries & installers",
    ],
  },
];

function StatusIcon({ status }: { status: Status }) {
  if (status === "done") {
    return (
      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
        <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      </div>
    );
  }

  if (status === "in-progress") {
    return (
      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
        <Clock3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  return (
    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
      <CircleDashed className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "done") {
    return (
      <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400">
        Done
      </Badge>
    );
  }

  if (status === "in-progress") {
    return (
      <Badge className="border-blue-500/30 bg-blue-500/10 text-blue-700 hover:bg-blue-500/10 dark:text-blue-400">
        In Progress
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="text-muted-foreground">
      Planned
    </Badge>
  );
}

export function RoadmapTimeline() {
  return (
    <section className="mt-8 w-full min-w-0">
      <div className="w-full overflow-hidden rounded-xl border bg-background shadow-xs">
        {phases.map((phase, index) => (
          <div
            key={phase.phase}
            className={cn(
              "relative grid grid-cols-1 gap-4 p-5 sm:p-6 md:grid-cols-[120px_minmax(0,1fr)] md:gap-6",
              index !== phases.length - 1 && "border-b border-border/60"
            )}
          >
            {/* Left timeline column */}
            <div className="relative flex items-center justify-between gap-3 md:items-start md:justify-start">
              {index !== phases.length - 1 && (
                <div className="hidden md:block absolute ltr:left-4 rtl:right-4 top-9 h-[calc(100%+20px)] w-px bg-border" />
              )}

              <div className="flex items-center gap-3 md:items-start">
                <StatusIcon status={phase.status} />

                <div className="leading-tight md:pt-0.5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Phase
                  </div>
                  <div className="font-mono text-base font-bold text-foreground">
                    {String(phase.phase).padStart(2, "0")}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 md:hidden">
                <StatusBadge status={phase.status} />
              </div>
            </div>

            {/* Content */}
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  {phase.title}
                </h3>

                <div className="hidden md:inline-flex">
                  <StatusBadge status={phase.status} />
                </div>

                {phase.status === "in-progress" && (
                  <Badge className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/10">
                    Current Focus
                  </Badge>
                )}
              </div>

              <p className="mb-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {phase.description}
              </p>

              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-mono text-muted-foreground">
                    {phase.progress}%
                  </span>
                </div>

                <Progress value={phase.progress} className="h-2" />
              </div>

              <div className="flex flex-wrap gap-2">
                {phase.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border/60 bg-muted/50 px-2.5 py-1 text-xs sm:text-sm text-foreground/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
