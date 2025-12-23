// Sidebar.tsx (Server Component)
import { DocNavItem } from "@/types/doc-nav-item";
import { useLocale } from "next-intl";
import { CollapsibleNavItemClient } from "./collapsible-nav-item";
import { SidebarItem } from "./sidebar-item";

export interface SidebarProps {
  navigationItems: DocNavItem[];
  pathname: string;
  title?: string;
  clickTrigger?: () => void;
  isRTL?: boolean;
}

export function Sidebar({
  navigationItems,
  pathname,
  clickTrigger,
  isRTL = false,
}: SidebarProps) {
  const locale = useLocale();

  const renderNavItems = (items: DocNavItem[]): React.ReactNode[] => {
    return items.map((item) => {
      const itemHref = item.slug === "" ? `/docs` : `/docs/${item.slug}`;

      if (item.type === "directory" && item.children) {
        return (
          <CollapsibleNavItemClient
            key={item.slug}
            title={item.title}
            slug={item.slug}
            isRTL={isRTL}
          >
            {renderNavItems(item.children)}
          </CollapsibleNavItemClient>
        );
      }
      return (
        <SidebarItem
          key={item.slug}
          title={item.title}
          href={itemHref}
          isActive={
            pathname === itemHref ||
            (item.slug === "" && pathname === `/${locale}/docs`)
          }
          onClick={clickTrigger}
        />
      );
    });
  };

  return (
    <div className="bg-transparent md:bg-inherit md:dark:bg-inherit py-4 px-2">
      <div className="flex flex-col h-full overflow-hidden">
        <nav aria-label="Sidebar navigation" className="px-2">
          {renderNavItems(navigationItems)}
        </nav>
      </div>
    </div>
  );
}
