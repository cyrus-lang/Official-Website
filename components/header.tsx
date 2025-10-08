"use client";

import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import LogoDark from "@/app/assets/logo-dark.png";
import LogoLight from "@/app/assets/logo-light.png";
import { useLocaleInfo } from "@/hooks/use-locale";
import { useTranslations } from "next-intl";
import MobileSidebar from "./docs/mobile/mobile_sidebar";
import { DocNavItem } from "@/app/types/doc_nav_item";
import SearchBar from "./search-bar";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";

export function Logo() {
  const t = useTranslations("Header.logo");

  return (
    <>
      <Image
        src={LogoDark}
        className="h-8 w-8 dark:block hidden"
        alt={t("alt")}
      />
      <Image
        src={LogoLight}
        className="h-8 w-8 dark:hidden block"
        alt={t("altLight")}
      />
    </>
  );
}

const headerItems: { path: string; content: string; className?: string }[] = [
  { path: "/blog", content: "navigation.blog" },
  { path: "/forum", content: "navigation.forum" },
  { path: "/packages", content: "navigation.packages" },
  { path: "/playground", content: "navigation.playground" },
  { path: "/contributors", content: "navigation.contributors" },
  { path: "/support_us", content: "navigation.supportUs" },
];

export default function Header({
  className,
  navigationItems,
}: {
  className?: string;
  navigationItems?: DocNavItem[];
}) {
  const t = useTranslations("Header");
  const { fontFamily } = useLocaleInfo();
  const pathname = usePathname();
  const isDocsRoute = /^\/[a-z]{2}\/docs(\/.*)?$/.test(pathname);

  return (
    <>
      <header
        className={cn(
          `select-none border-b sticky top-0 left-0 right-0 py-3 z-50 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-b-gray-200 header-fa`,
          fontFamily,
          className
        )}
      >
        <div
          className="px-4 flex items-center justify-between"
          style={{ height: "var(--header-height)" }}
        >
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-md font-bold brand-text text-black dark:text-white pt-1">
                {t("brand")}
              </span>
            </Link>

            <nav className="hidden xl:flex gap-6 pt-1 ms-3">
              {headerItems.map((item) => (
                <Link
                  key={item.content}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium hover:text-primary transition-colors",
                    pathname.includes(item.path) && "text-primary",
                    item?.className
                  )}
                >
                  {t(item.content)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <SearchBar />
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/docs" className="hidden xl:inline-flex">
              <Button variant="outline">{t("buttons.documentation")}</Button>
            </Link>
            <Link href="/docs" className="hidden xl:inline-flex">
              <Button>{t("buttons.getStarted")}</Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="xl:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t("buttons.toggleMenu")}</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full fixed inset-0 ml-auto"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="flex items-center gap-2">
                      <Logo />
                      <span className="text-xl font-bold brand-text">
                        {t("brand")}
                      </span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">
                          {t("buttons.closeMenu")}
                        </span>
                      </Button>
                    </SheetTrigger>
                  </div>

                  <nav className="flex flex-col gap-4 mobile-nav">
                    {headerItems.map((item) => (
                      <Link
                        key={item.content}
                        href={item.path}
                        className={cn(
                          "text-lg font-medium hover:text-primary transition-colors",
                          pathname.includes(item.path) && "text-primary",
                          item?.className
                        )}
                      >
                        {t(item.content)}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex gap-2 mb-4">
                      <SearchBar />
                      <LanguageToggle />
                      <ThemeToggle />
                    </div>
                    <Link href="/docs" className="w-full">
                      <Button className="w-full">
                        {t("buttons.getStarted")}
                      </Button>
                    </Link>
                    <Link href="/docs" className="w-full">
                      <Button variant="outline" className="w-full">
                        {t("buttons.documentation")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {isDocsRoute && navigationItems && (
          <MobileSidebar navigationItems={navigationItems!} />
        )}
      </header>
    </>
  );
}
