import React from "react";
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
import Link from "next/link";
import { useTranslations } from "next-intl";
import CodeBlock from "@/components/CodeBlock";

export function ErrorAlert({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  const t = useTranslations("DocsContent.introduction.errorAlert");

  const translatedTitle = title === "Under Development" ? t("title") : title;

  // Always use the translated content for the development warning
  const translatedContent = t("content");

  return (
    <div
      className="bg-red-50 border-t-4 border-red-500 p-3 md:p-4 dark:bg-red-800/20 mb-4 rounded-md"
      role="alert"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="shrink-0 mb-2 sm:mb-0">
          <span className="inline-flex justify-center items-center size-6 md:size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-950 dark:bg-red-800 dark:text-red-100">
            <svg
              className="shrink-0 size-3 md:size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
        </div>
        <div className="sm:ms-4">
          <h3
            id="hs-bordered-red-style-label"
            className="text-gray-800 font-semibold dark:text-white mb-2 text-base md:text-lg"
          >
            {translatedTitle || "Error!"}
          </h3>
          <div className="text-sm md:text-lg text-gray-700 dark:text-neutral-300 m-0">
            {translatedContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      const t = useTranslations("DocsContent.introduction");
      const tTutorial = useTranslations("DocsContent.tutorial");

      let translatedText = children;

      if (children === "Documentation") {
        translatedText = t("documentation");
      } else if (children === "Turorial into") {
        translatedText = tTutorial("installation.description");
      }

      return (
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
          {translatedText}
        </h1>
      );
    },
    h2: ({ children }) => (
      <h2 className="text-xl md:text-2xl font-bold mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg md:text-xl font-bold mb-2">{children}</h3>
    ),
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
          className="!mt-0 !mb-0 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 border overflow-x-auto text-left"
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
          className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm text-left"
          dir="ltr"
          {...props}
        >
          {children}
        </code>
      );
    },
    ErrorAlert,
    Button,
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle,
    Link,
    CodeBlock,
    ...components,
  };
}
