import { LinkIcon } from "lucide-react";
import type { MDXComponents } from "mdx/types";

import CodeBlock from "@/components/code-block";
import { ErrorAlert, InfoAlert, WarningAlert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UnderDevelopmentAlert from "@/components/under-development-alert";
import { Link } from "@/i18n/navigation";
import Image, { ImageProps } from "next/image";
import { getTranslations } from "next-intl/server";

const getTitleId = (text: string) => text?.replace(/\s+/g, "-");

export async function getMDXComponents(
  components?: MDXComponents
): Promise<MDXComponents> {
  let firstH1Rendered = false;

  const tIntro = await getTranslations("DocsContent.introduction");
  const tTutorial = await getTranslations("DocsContent.tutorial");
  return {
    h1: ({ children }) => {
      const rawText = children?.toString() || "";
      const id = getTitleId(rawText);

      if (!firstH1Rendered) {
        firstH1Rendered = true;
        return (
          <h1 className="heading heading-h1 rm-underline">
            <a className="rm-underline font-extrabold" href={`#${id}`}>
              {rawText}
            </a>
          </h1>
        );
      }

      return (
        <h1 id={id} className="group heading heading-h1">
          <a href={`#${id}`}>
            {rawText}
            <LinkIcon />
          </a>
        </h1>
      );
    },
    h2: ({ children }) => {
      const id = getTitleId(children?.toString() || "");
      return (
        <h2 id={id} className="group heading heading-h2">
          <a href={`#${id}`}>
            {children}
            <LinkIcon />
          </a>
        </h2>
      );
    },

    h3: ({ children }) => {
      const id = getTitleId(children?.toString() || "");
      return (
        <h3 id={id} className="group heading heading-h3">
          <a href={`#${id}`}>
            {children}
            <LinkIcon />
          </a>
        </h3>
      );
    },
    p: ({ children }) => {
      let content = children;

      if (typeof children === "string") {
        if (children.includes("Welcome to the official documentation")) {
          content = tIntro("welcome");
        } else if (children === "This guide will help you set up.") {
          content = tTutorial("basicSyntax.description");
        }
      }

      return <p className="text-base md:text-lg my-2">{content}</p>;
    },

    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),

    li: ({ children }) => <li className="text-base md:text-lg">{children}</li>,

    a: ({ children, href }) => (
      <a href={href} className="text-primary hover:underline">
        {children}
      </a>
    ),

    img: (props) => (
      <Image
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        style={{ width: "100%", height: "auto" }}
        className="rounded-lg shadow-md"
        {...(props as ImageProps)}
      />
    ),

    pre: ({ children, ...props }) => {
      if (children && typeof children === "object" && "props" in children) {
        const { className = "", children: code } = children.props;
        const language = className.replace("language-", "");
        return <CodeBlock language={language}>{code}</CodeBlock>;
      }

      return (
        <pre
          className="mt-0! mb-0! rounded-lg p-4 bg-gray-50 dark:bg-gray-900 border overflow-x-auto text-left"
          dir="ltr"
          {...props}
        >
          {children}
        </pre>
      );
    },

    code: ({ children, className, ...props }) => {
      if (className?.startsWith("language-")) {
        const language = className.replace("language-", "");
        return <CodeBlock language={language}>{children}</CodeBlock>;
      }

      return (
        <code
          className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 text-sm text-left rounded-xl"
          dir="ltr"
          {...props}
        >
          {children}
        </code>
      );
    },
    UnderDevelopmentAlert,
    ErrorAlert,
    WarningAlert,
    InfoAlert,
    Button,
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle,
    Link,
    CodeBlock,
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
    ...components,
  };
}
