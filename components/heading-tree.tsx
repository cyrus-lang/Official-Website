"use client";
import { getTitleId } from "@/lib/get-mdx";
import { Heading } from "@/lib/heading-parser";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function HeadingTree({
  items,
  activeHash,
}: {
  items: Heading[];
  activeHash?: string;
}) {
  const [hash, setHash] = useState("");
  const locale = useLocale();

  const isRoot = activeHash === undefined;
  const currentHash = isRoot ? hash : activeHash;

  useEffect(() => {
    if (!isRoot) return;

    setHash(window.location.hash);

    const ids: string[] = [];
    const flatten = (nodes: Heading[]) => {
      nodes.forEach((n) => {
        ids.push(getTitleId(n.title));
        if (n.children) flatten(n.children);
      });
    };
    flatten(items);

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const best = visible[0].target.id;
          setHash(`#${best}`);
          window.history.replaceState(null, "", `#${best}`);
        }
      },
      { rootMargin: "-100px 0px -75% 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [items, isRoot]);

  return (
    <ul className="space-y-1">
      {items.map((h, i) => (
        <HeadingItem
          key={getTitleId(h.title + i)}
          h={h}
          i={i}
          currentHash={currentHash}
          locale={locale}
        />
      ))}
    </ul>
  );
}

function HeadingItem({
  h,
  i,
  currentHash,
  locale,
}: {
  h: Heading;
  i: number;
  currentHash: string;
  locale: string;
}) {
  const slug = getTitleId(h.title);
  const isActive = currentHash === `#${slug}`;
  const itemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isActive]);

  return (
    <li className="text-sm">
      <a
        ref={itemRef}
        onClick={() => {
          if (i === 0) window.scrollTo({ top: 0 });
        }}
        href={`#${slug}`}
        className={cn(
          "block py-1 text-gray-400 text-wrap hover:underline transition",
          isActive
            ? "text-primary text-shadow-primary-light text-shadow-2xs dark:text-shadow-none"
            : "hover:text-gray-600 dark:hover:text-gray-300",
        )}
      >
        {h.title}
      </a>

      {h.children && h.children.length > 0 && (
        <div
          className={cn(
            "text-gray-400",
            locale === "en" ? "ml-2 pl-2" : "mr-2 pr-2",
          )}
        >
          <HeadingTree items={h.children} activeHash={currentHash} />
        </div>
      )}
    </li>
  );
}
