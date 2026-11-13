"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstallBlockProps {
  command: string;
  isRtl: boolean;
  translations: {
    label: string;
    tooltip: string;
    copied: string;
  };
}

export function InstallBlock({
  command,
  isRtl,
  translations,
}: InstallBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? translations.copied : translations.tooltip}
      className="w-full text-start cursor-pointer bg-background rounded-xl p-5 shadow-xs border transition-all duration-200 hover:border-primary/50 active:scale-[0.99] group"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          {translations.label}
        </span>

        <span className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
          {copied ? (
            <Check size={15} className="text-green-500" />
          ) : (
            <Copy size={15} />
          )}
        </span>
      </div>

      <div
        dir="ltr"
        className={cn(
          "font-mono text-sm sm:text-base font-medium text-foreground truncate",
          isRtl && "text-left"
        )}
      >
        <span className="text-primary select-none mr-2">$</span>
        <code>{command}</code>
      </div>
    </button>
  );
}
