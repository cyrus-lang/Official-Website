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
import { RoadmapTimeline } from '../components/roadmap-timeline';

export const getTitleId = (text: string) => encodeURIComponent(text?.replace(/\s+/g, "-"));

export async function getMDXComponents(
  components?: MDXComponents
): Promise<MDXComponents> {
  let firstAnyHeadingRendered = false;

  const tIntro = await getTranslations("DocsContent.introduction");
  const tTutorial = await getTranslations("DocsContent.tutorial");

  const getHeadingStyles = (baseClass: string) => {
    if (!firstAnyHeadingRendered) {
      firstAnyHeadingRendered = true;
      return `${baseClass} mt-0 mb-4`;
    }
    return `${baseClass} mt-10 mb-4`;
  };

  return {
    h1: ({ children }) => {
      const rawText = children?.toString() || "";
      const id = getTitleId(rawText);
      return (
        <h1 id={id} className={`group heading heading-h1 ${getHeadingStyles("rm-underline")}`}>
          <a href={`#${id}`} className="rm-underline font-extrabold flex items-center gap-2">
            {rawText}
            {firstAnyHeadingRendered && <LinkIcon className="opacity-0 group-hover:opacity-100 transition-opacity" />}
          </a>
        </h1>
      );
    },
    h2: ({ children }) => {
      const id = getTitleId(children?.toString() || "");
      return (
        <h2 id={id} className={`group heading heading-h2 ${getHeadingStyles("")}`}>
          <a href={`#${id}`} className="flex items-center gap-2">
            {children}
            <LinkIcon className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </h2>
      );
    },
    h3: ({ children }) => {
      const id = getTitleId(children?.toString() || "");
      return (
        <h3 id={id} className={`group heading heading-h3 ${getHeadingStyles("")}`}>
          <a href={`#${id}`} className="flex items-center gap-2">
            {children}
            <LinkIcon className="opacity-0 group-hover:opacity-100 transition-opacity" />
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
      return <p className="text-base md:text-lg my-3 leading-relaxed">{content}</p>;
    },
    ul: ({ children }) => (
      <ul className="list-disc list-outside ps-6 my-4 space-y-1.5 [&_ul]:my-2 [&_ol]:my-2 [&>li>p]:my-0">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside ps-6 my-4 space-y-1.5 [&_ul]:my-2 [&_ol]:my-2 [&>li>p]:my-0">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-base md:text-lg">{children}</li>,
    a: ({ children, href }) => (
      <a href={href} className="text-primary hover:underline font-medium">
        {children}
      </a>
    ),
    img: (props) => (
      <div className="my-8">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          style={{ width: "100%", height: "auto" }}
          className="rounded-lg shadow-sm border"
          {...(props as ImageProps)}
        />
      </div>
    ),
    pre: ({ children, ...props }) => {
      if (children && typeof children === "object" && "props" in children) {
        const { className = "", children: code } = (children as any).props;
        const language = className.replace("language-", "");
        return (
          <div className="my-6">
            <CodeBlock language={language}>{code}</CodeBlock>
          </div>
        );
      }
      return (
        <pre className="my-6 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 border overflow-x-auto text-left" dir="ltr" {...props}>
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
        <code className="bg-neutral-200! dark:bg-neutral-800! px-1.5 py-0.5 mx-0.5 text-sm rounded-sm font-mono" dir="ltr" {...props}>
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
    RoadmapTimeline,
    ...components,
  };
}
