// components/docs/sidebar.tsx
"use client";

import { useState } from "react";
import { DocNavItem } from '@/app/types/doc_nav_item'; // Adjust path if necessary
import { ScrollArea } from "@/components/ui/scroll-area"; // Keep ScrollArea if it's a generic utility
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the props for the main Sidebar component
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
      "rotate-0": isOpen,   // Down when open
      "-rotate-90": !isOpen // Rotated left when closed
    })}
  >
    <path
      fillRule="evenodd"
      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

// Minimal component for collapsible navigation items (directories)
interface CollapsibleNavItemProps {
  item: DocNavItem;
  currentBasePath: string;
  pathname: string;
  renderChildren: (items: DocNavItem[], basePath: string) => JSX.Element[];
}

const CollapsibleNavItem = ({ item, currentBasePath, pathname, renderChildren }: CollapsibleNavItemProps) => {
  const itemHref = item.slug === '' ? currentBasePath : `${currentBasePath}/${item.slug}`;

  const initialOpenState = pathname.startsWith(itemHref);
  const [isOpen, setIsOpen] = useState(initialOpenState);

  const toggleOpen = () => setIsOpen(!isOpen);

  const isActive = pathname === itemHref || pathname.startsWith(`${itemHref}/`);

  return (
    <div className="mb-2"> {/* Mimics SidebarGroup */}
      <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">
        <div className="flex items-center justify-between w-full cursor-pointer" onClick={toggleOpen}>
          {/* Link for directory title */}
          <Link
            href={itemHref}
            className={cn(
              "text-foreground flex-grow py-1 rounded-md px-2",
              // Prevent default click on link to allow button to handle toggle, but only if not navigating
              { 'pointer-events-none': !isActive && item.children && item.children.length > 0 } // Disable link if it's a parent with children and not active
            )}
            onClick={(e) => {
              if (item.type === 'directory' && pathname !== itemHref) {
                e.preventDefault();
              }
            }}
          >
            {item.title}
          </Link>

          {/* Toggle Button for Dropdown */}
          {item.children && item.children.length > 0 && ( // Only show caret if there are children
            <button
              onClick={toggleOpen}
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
        <div id={`sidebar-group-content-${item.slug}`} className="ml-2"> {/* Mimics SidebarGroupContent */}
          <ul className="space-y-1"> {/* Mimics SidebarMenu */}
            {renderChildren(item.children, currentBasePath)}
          </ul>
        </div>
      )}
    </div>
  );
};

// Main Sidebar component
export function Sidebar({ navigationItems }: SidebarProps) {
  const pathname = usePathname(); // Get current pathname once

  // Helper function to render nested navigation items
  const renderNavItems = (items: DocNavItem[], currentBasePath: string = '/docs') => {
    return items.map((item) => {
      // Construct the full href based on the current item's slug
      const itemHref = item.slug === '' ? currentBasePath : `${currentBasePath}/${item.slug}`;

      if (item.type === 'directory') {
        return (
          <CollapsibleNavItem
            key={item.slug}
            item={item}
            currentBasePath={itemHref}
            pathname={pathname}
            renderChildren={renderNavItems}
          />
        );
      } else { // type === 'file'
        return (
          <li key={item.slug} className="mb-1 list-none">
            <Link
              href={itemHref}
              className={cn(
                "block w-full py-1 px-2 rounded-md text-md",
                pathname === itemHref
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
    <div className="h-full bg-background md:bg-inherit dark:bg-background md:dark:bg-inherit py-4 px-2">
      <div className="flex flex-col h-full overflow-hidden">
        <ScrollArea className="h-[calc(100vh-3.5rem)] md:h-full">
          <nav className="px-2">
            {renderNavItems(navigationItems)}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}