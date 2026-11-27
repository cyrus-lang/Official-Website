import hljs from "highlight.js/lib/core";
import type { HLJSApi } from "highlight.js";
import bash from "highlight.js/lib/languages/bash";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import go from "highlight.js/lib/languages/go";
import ini from "highlight.js/lib/languages/ini";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import rust from "highlight.js/lib/languages/rust";
import typescript from "highlight.js/lib/languages/typescript";

function cyrusLanguage(hljsApi: HLJSApi) {
  const NESTED_BLOCK_COMMENT = hljsApi.COMMENT("/\\*", "\\*/", {
    contains: ["self"],
  });

  const KEYWORDS = {
    keyword: [
      "if",
      "else",
      "goto",
      "for",
      "while",
      "switch",
      "case",
      "break",
      "continue",
      "return",
      "pub",
      "static",
      "mod",
      "defer",
      "fn",
      "macro",
      "import",
      "as",
      "var",
      "const",
      "type",
      "dynamic",
      "struct",
      "enum",
      "union",
      "interface",
      "extern",
      "comptime",
      "effect",
      "try",
      "catch",
    ],
    literal: ["true", "false", "null", "undefined"],
    type: [
      "int",
      "int8",
      "int16",
      "int32",
      "int64",
      "int128",
      "uint8",
      "uint16",
      "uint32",
      "uint64",
      "uint128",
      "intptr",
      "uintptr",
      "isize",
      "usize",
      "float16",
      "float32",
      "float64",
      "float128",
      "bool",
      "char",
      "string",
      "void",
      "any",
    ],
  };

  return {
    name: "Cyrus",
    aliases: ["cyrus", "cy"],
    keywords: KEYWORDS,
    contains: [
      hljsApi.C_LINE_COMMENT_MODE,
      NESTED_BLOCK_COMMENT,
      hljsApi.QUOTE_STRING_MODE,
      hljsApi.APOS_STRING_MODE,
      {
        className: "number",
        variants: [
          {
            begin:
              "\\b[0-9][0-9_]*(int(8|16|32|64|128)|float(16|32|64|128))\\b",
          },
          { begin: "\\b0[xX][0-9a-fA-F_]+" },
          { begin: "\\b0[bB][01_]+" },
          { begin: "\\b0[oO][0-7_]+" },
          { begin: "\\b[0-9][0-9_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?" },
        ],
        relevance: 0,
      },
      {
        className: "function",
        beginKeywords: "fn macro",
        end: "[\\({]",
        excludeEnd: true,
        contains: [hljsApi.UNDERSCORE_TITLE_MODE],
      },
      {
        className: "title.class",
        begin: "\\b[A-Za-z_][A-Za-z0-9_]*(?=::)",
        relevance: 0,
      },
      {
        className: "meta",
        begin: "@[A-Za-z_][A-Za-z0-9_]*",
      },
    ],
  };
}

hljs.registerLanguage("cyrus", cyrusLanguage);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("json", json);
hljs.registerLanguage("toml", ini);
hljs.registerLanguage("ini", ini);
hljs.registerLanguage("c", c);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("c++", cpp);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("go", go);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);

export function resolveLanguage(language?: string): string {
  if (!language || language === "cyrus") return "cyrus";
  if (language === "c++") return "cpp";
  if (language === "py") return "python";
  return language;
}

export { hljs };
