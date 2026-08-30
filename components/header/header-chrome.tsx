"use client";

import { DEFAULT_DOCS_HREF } from "@/app/[locale]/docs/_page";
import { Link } from "@/i18n/navigation";
import { HERO_SCROLL_SENTINEL_ID } from "@/lib/hero-sentinel";
import { cn } from "@/lib/utils";
import { useScrolledPastHero } from "@/hooks/use-scrolled-past-hero";
import { useTranslations } from "next-intl";
import MobileSidebar from "../docs/mobile-sidebar";
import { LanguageToggle } from "../language-toggle";
import SearchBar from "../search-bar";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { HeaderNav } from "./header-nav";
import { Logo } from "./logo";
import MobileMenu from "./mobile-menu";
import type { DocNavItem } from "@/types/doc-nav-item";

export interface HeaderChromeProps {
  className?: string;
  pathname: string;
  variant: "default" | "transparent" | "dynamic";
  withBorder: boolean;
  withBackdrop: boolean;
  fontFamily: string;
  isDocsRoute: boolean;
  title?: string;
  navigationItems?: DocNavItem[];
}

export function HeaderChrome({
  className,
  pathname,
  variant,
  withBorder,
  fontFamily,
  isDocsRoute,
  title,
  navigationItems,
}: HeaderChromeProps) {
  const t = useTranslations("Header");

  const pastHero = useScrolledPastHero(HERO_SCROLL_SENTINEL_ID);
  const isDynamic = variant === "dynamic";
  const isTransparent = isDynamic ? !pastHero : variant === "transparent";

  const isPhilosophy = pathname.includes("philosophy");

  return (
    <header
      className={cn(
        "select-none sticky top-0 left-0 right-0 z-50 header-fa transition-colors duration-300",
        fontFamily,

        isTransparent
          ? "bg-transparent backdrop-blur-0"
          : "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60",

        withBorder && !isTransparent && "border-b",

        className,
      )}
    >
      <div className="px-4 flex items-center justify-between h-(--header-height)">
        <div className="flex items-center">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2",
              isPhilosophy && "invert dark:invert-0",
            )}
          >
            <Logo forceDarkMode={isDynamic && isTransparent} />
            <span
              className={cn(
                "text-md font-bold brand-text pt-1",
                isDynamic && isTransparent
                  ? "text-white"
                  : "text-black dark:text-white",
              )}
            >
              {t("brand")}
            </span>
          </Link>
          <HeaderNav isPhilosophy={isPhilosophy} isTransparent={isDynamic && isTransparent} />
        </div>

        <div className="flex items-center gap-4">
          <SearchBar isTransparent={isTransparent} />
          <LanguageToggle isTransparent={isTransparent} />
          <ThemeToggle isTransparent={isTransparent} />

          <Link href={DEFAULT_DOCS_HREF} className="hidden xl:inline-flex">
            <Button variant={isTransparent ? "glass" : "outline"}>
              {t("buttons.documentation")}
            </Button>
          </Link>

          <Link href={DEFAULT_DOCS_HREF} className="hidden xl:inline-flex">
            <Button variant={isTransparent ? "glass" : "default"}>
              {t("buttons.getStarted")}
            </Button>
          </Link>

          <MobileMenu isTransparent={isTransparent} />
        </div>
      </div>

      {isDocsRoute && navigationItems && (
        <MobileSidebar
          pathname={pathname}
          navigationItems={navigationItems}
          title={title}
        />
      )}
    </header>
  );
}
