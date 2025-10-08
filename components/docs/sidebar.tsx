"use client";

import { useState } from "react";
import { DocNavItem } from "@/app/types/doc_nav_item";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { useLocaleInfo } from "@/hooks/use-locale";
import { Link, usePathname } from "@/i18n/navigation";

export interface SidebarProps {
  navigationItems: DocNavItem[];
}

// Inline SVG for the caret icon (down arrow)
const CaretIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("w-4 h-4 transition-transform duration-200", {
      "rotate-0": isOpen, // Down when open
      "-rotate-90": !isOpen, // Rotated left when closed
    })}
  >
    <path
      fillRule="evenodd"
      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

interface CollapsibleNavItemProps {
  item: DocNavItem;
  pathname: string;
  locale: string;
  renderChildren: (items: DocNavItem[]) => JSX.Element[];
}

const CollapsibleNavItem = ({
  item,
  renderChildren,
}: CollapsibleNavItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isRTL } = useLocaleInfo();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mb-3">
      {/* Mimics SidebarGroup */}
      <div className="text-xs font-semibold uppercase text-muted-foreground ">
        <div
          className={cn(
            "flex items-center justify-between w-full cursor-pointer",
            isRTL ? "flex-row-reverse text-right" : ""
          )}
        >
          {/* Link for directory title */}
          <a
            className={cn(
              "text-muted-foreground grow py-2 rounded-md px-2 my-1"
            )}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            {item.title}
          </a>

          {/* Toggle Button for Dropdown */}
          {item.children &&
            item.children.length > 0 && ( // Only show caret if there are children
              <button
                onClick={toggleOpen} // Only the button toggles
                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-border dark:focus:bg-border ml-2"
                aria-expanded={isOpen}
                aria-controls={`sidebar-group-content-${item.slug}`}
              >
                <CaretIcon isOpen={isOpen} />
              </button>
            )}
        </div>
      </div>
      {/* Render children only if open and children exist */}
      {isOpen && item.children && item.children.length > 0 && (
        <div id={`sidebar-group-content-${item.slug}`} className="ml-2">
          {/* Mimics SidebarGroupContent */}
          <ul className={cn("space-y-1", isRTL ? "text-right mr-5" : "text-left ml-5")}>
            {/* Mimics SidebarMenu */}
            {renderChildren(item.children)}{" "}
            {/* Call renderChildren with only the items */}
          </ul>
        </div>
      )}
    </div>
  );
};

// Main Sidebar component
export function Sidebar({ navigationItems }: SidebarProps) {
  const pathname = usePathname(); // Get current pathname once
  const t = useTranslations("Docs");
  const locale = useLocale();

  // Helper function to render nested navigation items
  const renderNavItems = (items: DocNavItem[]) => {
    // Removed currentBasePath parameter
    return items.map((item) => {
      // Construct the full href for any item (file or directory's main page)
      // item.slug already contains the full path from /docs/
      const itemHref =
        item.slug === "" ? `/docs` : `/docs/${item.slug}`;

      if (item.type === "directory") {
        return (
          <CollapsibleNavItem
            key={item.slug}
            item={item}
            // currentBasePath is technically not used within CollapsibleNavItem's itemHref logic anymore
            // but keeping it as a prop for now for type compatibility if you have other uses for it.
            // If not, you can remove it from CollapsibleNavItemProps and here.
            pathname={pathname}
            locale={locale}
            renderChildren={renderNavItems} // Pass the helper itself for recursion
          />
        );
      } else {
        // type === 'file'
        return (
          <li key={item.slug} className="mb-1 list-none">
            <Link
              href={itemHref} // Use the correctly calculated itemHref
              className={cn(
                "block w-full py-1 px-2 rounded-md text-md",
                pathname === itemHref ||
                  (item.slug === "" && pathname === `/${locale}/docs`) // Handle root active state
                  ? "text-white font-medium bg-primary" // Active state background
                  : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted"
              )}
            >
              {item.title}
            </Link>
          </li>
        );
      }
    });
  };

  return (
    <div className="bg-background md:bg-inherit dark:bg-background md:dark:bg-inherit py-4 px-2">
      <div className="flex flex-col h-full">
          <nav className="px-2" aria-label={t("sidebar.navigation")}>
            {renderNavItems(navigationItems)}{" "}
          </nav>
      </div>
    </div>
  );
}
