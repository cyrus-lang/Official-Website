"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { hljs, resolveLanguage } from "@/lib/hljs";
import { cn } from "@/lib/utils";
import "highlight.js/styles/base16/bright.css";
import "@/styles/hero-code-theme.css";

export interface CodeComparisonItem {
  label: string;
  language: string;
  code: string;
}

interface CodeComparisonProps {
  items: CodeComparisonItem[];
  title?: string;
}

function ComparisonPane({
  item,
  headerExtra,
}: {
  item: CodeComparisonItem;
  headerExtra?: React.ReactNode;
}) {
  const [isCopying, setIsCopying] = useState(false);
  const trimmedCode = item.code.trim();
  const resolvedLang = resolveLanguage(item.language);

  const highlightedHtml = hljs.getLanguage(resolvedLang)
    ? hljs.highlight(trimmedCode, { language: resolvedLang }).value
    : hljs.highlightAuto(trimmedCode).value;

  const handleCopy = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(trimmedCode);
      toast({ title: "Copied", description: "Code copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Could not copy code." });
    } finally {
      setTimeout(() => setIsCopying(false), 1000);
    }
  };

  return (
    <div className="flex flex-col min-w-0">
      <div className="px-4 py-2 border-b border-border/60 bg-transparent flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground">
        {headerExtra ?? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-border/60 bg-transparent text-foreground/80 font-medium">
            {item.label}
          </span>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          disabled={isCopying}
          className="h-7 px-2 gap-1.5 text-xs text-muted-foreground hover:text-foreground shrink-0"
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

      <div
        className="p-3.5 md:p-4 overflow-x-auto text-left bg-transparent flex-1"
        dir="ltr"
      >
        <pre
          className="m-0 text-sm md:text-base leading-relaxed font-mono bg-transparent! p-0! border-0!"
          dir="ltr"
        >
          <code
            className={`hljs language-${resolvedLang} text-left bg-transparent!`}
            dir="ltr"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>
    </div>
  );
}

/**
 * Side-by-side code comparison card matching hero-code-theme.
 * For 3+ items, keeps the first item pinned on the left and lets the user switch the right pane.
 */
export default function CodeComparison({ items, title }: CodeComparisonProps) {
  const [rightIndex, setRightIndex] = useState(1);

  if (!items.length) return null;

  const isSplit = items.length >= 2;
  const leftItem = items[0];
  const rightItem = items[Math.min(rightIndex, items.length - 1)];

  return (
    <div
      className="my-6 hero-code-theme rounded-lg border border-border/60 bg-background/60 dark:bg-zinc-950/60 backdrop-blur-xl text-foreground shadow-sm overflow-hidden w-full relative code-block"
      dir="ltr"
    >
      {title && (
        <div className="px-4 py-2 border-b border-border/60 bg-transparent text-xs font-mono text-foreground/80 font-medium">
          {title}
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-1",
          isSplit &&
            "lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border/60"
        )}
      >
        <ComparisonPane item={leftItem} />

        {isSplit && (
          <ComparisonPane
            item={rightItem}
            headerExtra={
              items.length > 2 ? (
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {items.slice(1).map((item, idx) => {
                    const actualIdx = idx + 1;
                    const active = actualIdx === rightIndex;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setRightIndex(actualIdx)}
                        className={cn(
                          "px-2 py-0.5 rounded-md text-xs font-mono border transition-colors",
                          active
                            ? "border-border bg-muted/80 dark:bg-zinc-900 text-foreground font-medium"
                            : "border-border/60 bg-transparent text-muted-foreground hover:text-foreground hover:border-border"
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              ) : undefined
            }
          />
        )}
      </div>
    </div>
  );
}
