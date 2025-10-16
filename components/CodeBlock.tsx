"use client";

import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

// ✅ Import both themes statically
import "@/styles/panda-syntax-dark.css";
import "@/styles/panda-syntax-light.css";

interface CodeBlockProps {
  children: string;
  language?: string;
  disableBorder?: boolean;
}

export default function CodeBlock({
  children,
  language = "typescript",
  disableBorder = false,
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const { theme } = useTheme(); // "light" | "dark"

  useEffect(() => {
    hljs.highlightAll();
  }, [theme, children]);

  const getLanguage = (lang: string) => (lang === "cyrus" ? "typescript" : lang);

  const handleCopy = async () => {
    if (!codeRef.current) return;
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(codeRef.current.innerText || "");
      toast({ title: "Copied", description: "Code copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Could not copy code." });
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="my-2 overflow-x-auto relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="sm" variant="outline" onClick={handleCopy} disabled={isCopying}>
          {isCopying ? "Copying..." : "Copy"}
        </Button>
      </div>
      <div className={`${theme === "light" ? "hljs-light" : "hljs-dark"}`}>
        <pre
          className={`mt-0! mb-0! rounded-lg text-left ${disableBorder ? "" : "border"}`}
          dir="ltr"
        >
          <code
            ref={codeRef}
            className={`language-${getLanguage(language)} text-sm md:text-base text-left rounded-lg`}
            dir="ltr"
          >
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}
