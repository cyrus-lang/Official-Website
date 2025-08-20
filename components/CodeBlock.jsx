"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/base16/bright.css";

export default function CodeBlock({ children, language = "typescript" }) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const getLanguage = (lang) => {
    if (lang === "cyrus") {
      return "typescript";
    }
    return lang;
  };

  return (
    <div className="my-2 overflow-x-auto">
      <pre className="!mt-0 !mb-0 rounded-lg border text-left" dir="ltr">
        <code
          className={`language-${getLanguage(
            language
          )} text-sm md:text-base text-left rounded-lg`}
          dir="ltr"
        >
          {children}
        </code>
      </pre>
    </div>
  );
}
