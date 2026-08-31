"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/base16/bright.css";
import "@/styles/hero-code-theme.css";
import { Motion } from "@/components/motion";

interface HeroCodeProps {
  code: string;
}

export function HeroCode({ code }: HeroCodeProps) {
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <Motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="hero-code-theme rounded-2xl border border-border/60 bg-background/60 dark:bg-zinc-950/60 backdrop-blur-xl text-foreground shadow-lg dark:shadow-2xl overflow-hidden w-full relative"
      dir="ltr"
    >
      <div className="px-4 py-2.5 border-b border-border/40 bg-muted/30 flex items-center justify-between text-xs font-mono text-muted-foreground relative z-20">
        <span className="text-foreground/80 font-medium">main.cyrus</span>
      </div>
      <div className="p-3.5 overflow-x-auto text-left bg-transparent relative" dir="ltr">
        <pre className="m-0 text-sm md:text-base leading-relaxed font-mono bg-transparent! p-0!">
          <code ref={codeRef} className="language-typescript text-left bg-transparent!" dir="ltr">
            {code}
          </code>
        </pre>
      </div>
    </Motion>
  );
}
