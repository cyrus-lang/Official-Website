"use client";
import { getTitleId } from "@/lib/get-mdx";
import { Heading } from "@/lib/heading-parser";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export function HeadingTree({ items }: { items: Heading[] }) {
  const [hash, setHash] = useState("");
  const locale = useLocale();

  useEffect(() => {
    setHash(window.location.hash);

    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <ul className="space-y-1">
      {items.map((h, i) => {
        const slug = getTitleId(h.title);
        return (
          <li key={slug} className="text-sm">
            <a
              onClick={() => {
                if (i === 0) window.scrollTo({ top: 0 });
              }}
              href={`#${slug}`}
              className={cn(
                "block py-1 text-gray-400 text-wrap hover:underline transition",
                hash === `#${slug}` ? "text-primary":"hover:text-gray-600 dark:hover:text-gray-300"
              )}
            >
              {h.title}
            </a>

            {h.children && h.children.length > 0 && (
              <div
                className={cn(
                  "text-gray-400",
                  locale === "en" ? "ml-2 pl-2" : "mr-2 pr-2"
                )}
              >
                <HeadingTree items={h.children} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
