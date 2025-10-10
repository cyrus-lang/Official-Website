import React, { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import CodeBlock from "@/components/CodeBlock";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { ErrorAlert, WarningAlert, InfoAlert } from "@/components/ui/alert";
import UnderDevelopmentAlert from "@/components/under-development-alert";
import { LinkIcon } from "lucide-react";

const getTitle = (node: ReactNode) => node?.toString()?.replaceAll(" ", "-");
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    hr: () => {
      return <hr className="my-8" />;
    },
    h1: ({ children }) => {
      const t = useTranslations("DocsContent.introduction");
      const tTutorial = useTranslations("DocsContent.tutorial");

      let translatedText = children?.toString();

      if (children === "Documentation") {
        translatedText = t("documentation");
      } else if (children === "Turorial into") {
        translatedText = tTutorial("installation.description");
      }
      const title = getTitle(translatedText);
      return (
        <h1 id={title} className="group heading heading-h1">
          <a href={`#${title}`}>
            {translatedText}
            <LinkIcon />
          </a>
        </h1>
      );
    },
    h2: ({ children }) => {
      const title = getTitle(children);
      return (
        <h2 id={title} className="group heading heading-h2">
          <a href={`#${title}`}>
            {children}
            <LinkIcon />
          </a>
        </h2>
      );
    },
    h3: ({ children }) => {
      const title = getTitle(children);
      return (
        <h3 id={title} className="group heading heading-h3">
          <a href={`#${title}`}>
            {children}
            <LinkIcon />
          </a>
        </h3>
      );
    },
    p: ({ children }) => {
      const t = useTranslations("DocsContent.introduction");
      const tTutorial = useTranslations("DocsContent.tutorial");

      let translatedText = children;

      if (typeof children === "string") {
        if (children.includes("Welcome to the official documentation")) {
          translatedText = t("welcome");
        } else if (children === "This guide will help you set up.") {
          translatedText = tTutorial("basicSyntax.description");
        }
      }

      return <p className="text-base md:text-lg my-2">{translatedText}</p>;
    },
    ul: ({ children }) => (
      // Added margin-bottom for spacing after the list and space-y-2 for spacing between list items
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    li: ({ children }) => <li className="text-base md:text-lg">{children}</li>,
    a: (
      { children, href } // Added 'a' component
    ) => (
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
        const codeProps = children.props;
        const className = codeProps.className || "";
        const language = className.replace("language-", "");

        return <CodeBlock language={language}>{codeProps.children}</CodeBlock>;
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
      if (className && className.startsWith("language-")) {
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
