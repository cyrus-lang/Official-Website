"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import "highlight.js/styles/base16/bright.css";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Check, Copy, Play, Terminal, X } from "lucide-react";
import { hljs, resolveLanguage } from "@/lib/hljs";

import "@/styles/hero-code-theme.css";

export interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  title?: string;
  runnable?: boolean;
  output?: string;
  onRun?: () => Promise<string> | string;
  disableBorder?: boolean;
}

export default function CodeBlock({
  children,
  language = "typescript",
  title,
  runnable = false,
  output,
  onRun,
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<string | null>(null);

  const resolvedLanguage = resolveLanguage(language);
  const canRun = runnable || output !== undefined || onRun !== undefined;

  useEffect(() => {
    if (codeRef.current && !codeRef.current.dataset.highlighted) {
      hljs.highlightElement(codeRef.current);
    }
  }, [children, resolvedLanguage]);

  const handleCopy = async () => {
    if (!codeRef.current) return;
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(codeRef.current.innerText || "");
      toast({ title: "Copied", description: "Code copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Could not copy code." });
    } finally {
      setTimeout(() => {
        setIsCopying(false);
      }, 1000);
    }
  };

  const handleRun = async () => {
    try {
      setIsRunning(true);
      if (onRun) {
        const result = await onRun();
        setRunResult(result);
      } else {
        setRunResult(output ?? "Program exited with status 0.");
      }
    } catch (err) {
      setRunResult(
        err instanceof Error ? `Error: ${err.message}` : "Execution failed."
      );
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div
      className="my-6 hero-code-theme rounded-lg border border-border/60 bg-background/60 dark:bg-zinc-950/60 backdrop-blur-xl text-foreground shadow-sm overflow-hidden w-full relative group code-block"
      dir="ltr"
    >
      <div className="px-4 py-2 border-b border-border/60 bg-transparent flex items-center justify-between text-xs font-mono text-muted-foreground relative z-20">
        <span className="text-foreground/80 font-medium">
          {title || language || "code"}
        </span>
        <div className="flex items-center gap-1">
          {canRun && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRun}
              disabled={isRunning}
              className="h-7 px-2 gap-1.5 text-xs text-primary hover:text-primary hover:bg-primary/10"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isRunning ? "Running..." : "Run"}</span>
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            disabled={isCopying}
            className="h-7 px-2 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            {isCopying ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div
        className="p-3.5 md:p-4 overflow-x-auto text-left bg-transparent relative"
        dir="ltr"
      >
        <pre
          className="m-0 text-sm md:text-base leading-relaxed font-mono bg-transparent! p-0! border-0!"
          dir="ltr"
        >
          <code
            ref={codeRef}
            className={`hljs language-${resolvedLanguage} text-left bg-transparent!`}
            dir="ltr"
          >
            {children}
          </code>
        </pre>
      </div>

      {runResult !== null && (
        <div
          className="border-t border-border/60 bg-transparent px-4 py-3 text-left"
          dir="ltr"
        >
          <div className="flex items-center justify-between mb-2 text-xs font-mono text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 text-foreground/80 font-medium">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              Output
            </span>
            <button
              type="button"
              onClick={() => setRunResult(null)}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear output"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          </div>
          <pre className="m-0! p-0! bg-transparent! border-0! text-xs md:text-sm font-mono leading-relaxed text-foreground/90 whitespace-pre-wrap overflow-x-auto">
            {runResult}
          </pre>
        </div>
      )}
    </div>
  );
}

export function RunnableCodeBlock(props: CodeBlockProps) {
  return <CodeBlock {...props} runnable />;
}
