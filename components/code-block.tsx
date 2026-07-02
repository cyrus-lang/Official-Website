"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/base16/bright.css";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

import "@/styles/panda-syntax-dark.css";
import "@/styles/panda-syntax-light.css";

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

  useEffect(() => {
    setMounted(true);
    hljs.highlightAll();
  }, []);

  const getLanguage = (lang: string) =>
    lang === "cyrus" ? "typescript" : lang;

  const handleCopy = async () => {
    if (!codeRef.current) return;
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(codeRef.current.innerText || "");
      toast({ title: "Copied", description: "Code copied to clipboard." });
    } catch (e) {
      toast({ title: "Copy failed", description: "Could not copy code." });
    } finally {
      setTimeout(() => {
        setIsCopying(false);
      }, 1000);
    }
  };

  const themeClass = mounted
    ? (resolvedTheme === "light" ? "hljs-light" : "hljs-dark")
    : "hljs-dark";

  return (
    <div 
      className="my-6 overflow-x-auto relative group code-block" 
      dir="ltr"
    >
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
            className={`language-${getLanguage(
              language
            )} text-sm md:text-base text-left rounded-lg`}
            dir="ltr"
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}