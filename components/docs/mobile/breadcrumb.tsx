"use client";

import { usePathname } from "next/navigation";

// function getSectionTitle(pathname: string) {
//   const group = sidebarItems.find(
//     (section) => section.href === pathname
//   );
//   if (group) return group.title;

//   for (const section of sidebarItems) {
//     const item = section.items.find((item) => item.href === pathname);
//     if (item) return item.title;
//   }

//   const last = pathname.split("/").filter(Boolean).pop() || "";
//   return last.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
// }

export default function Breadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const hrefs = parts.map((_, idx) => "/" + parts.slice(0, idx + 1).join("/"));

  let visibleCrumbs: { href: string; title: string }[] = [];

  // if (hrefs.length <= 2) {
  //   visibleCrumbs = hrefs.map((href) => ({
  //     href,
  //     title: getSectionTitle(href),
  //   }));
  // } else {
  //   const lastTwo = hrefs.slice(-2);
  //   visibleCrumbs = lastTwo.map((href) => ({
  //     href,
  //     title: getSectionTitle(href),
  //   }));
  // }

  return (
    <nav
      className="flex items-center text-sm space-x-1 rtl:space-x-reverse"
      aria-label="Breadcrumb"
    >
      {visibleCrumbs.map((crumb, idx) => (
        <span key={idx} className="flex items-center">
          {idx !== 0 && (
            <svg
              className="w-3 h-3 mx-1 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {idx === visibleCrumbs.length - 1 ? (
            <span className="font-semibold text-foreground">{crumb.title}</span>
          ) : (
            <span className="text-muted-foreground">{crumb.title}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
