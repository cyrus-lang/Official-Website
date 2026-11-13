"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import ini from "highlight.js/lib/languages/ini";
import c from "highlight.js/lib/languages/c";
import rust from "highlight.js/lib/languages/rust";
import "highlight.js/styles/base16/bright.css";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

import "@/styles/panda-syntax-dark.css";
import "@/styles/panda-syntax-light.css";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("toml", ini);
hljs.registerLanguage("ini", ini);
hljs.registerLanguage("c", c);
hljs.registerLanguage("rust", rust);

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  disableBorder?: boolean;
}

export default function CodeBlock({
  children,
  language = "typescript",
  disableBorder = false,
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [isCopying, setIsCopying] = useState(false);
  const [mounted, setMounted] = useState(false);

  const resolvedLanguage =
    !language || language === "cyrus" ? "typescript" : language;

  useEffect(() => {
    setMounted(true);
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

  const themeClass = mounted
    ? resolvedTheme === "light"
      ? "hljs-light"
      : "hljs-dark"
    : "hljs-dark";

  return (
    <div
      className="my-6 overflow-x-auto relative group code-block rounded-xl border border-border/60 bg-background/60 dark:bg-zinc-950/60 backdrop-blur-xl"
      dir="ltr"
    >
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          disabled={isCopying}
        >
          {isCopying ? "Copying..." : "Copy"}
        </Button>
      </div>

      <div className={themeClass} suppressHydrationWarning>
        <pre
          className={`mt-0! mb-0! rounded-lg text-left ${disableBorder ? "" : "border"}`}
          dir="ltr"
        >
          <code
            ref={codeRef}
            className={`language-${resolvedLanguage} text-sm md:text-base text-left rounded-lg`}
            dir="ltr"
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}
