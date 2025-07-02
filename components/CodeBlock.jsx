"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/base16/bright.css";
// import 'highlight.js/styles/base16/default-dark.css';

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
      <pre
        className="!mt-0 !mb-0 rounded-lg  text-left"
        dir="ltr"
      >
        <code
          className={`language-${getLanguage(
            language
          )} text-sm md:text-base text-left`}
          dir="ltr"
        >
          {children}
        </code>
      </pre>
    </div>
  );
}
