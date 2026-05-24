import LogoDark from "@/app/assets/logo-dark.png";
import LogoLight from "@/app/assets/logo-light.png";
import { Link } from "@/i18n/navigation";
import { getBreadcrumbTitle } from "@/lib/get-breadcrumb-title";
import { getLocaleInfo } from "@/lib/get-locale-info";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import MobileSidebar from "../docs/mobile-sidebar";
import { LanguageToggle } from "../language-toggle";
import SearchBar from "../search-bar";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";
import { HeaderNav } from "./header-nav";
import { DEFAULT_DOCS_HREF } from "@/app/[locale]/docs/_page";

export function Logo({ forceLightMode = false }: { forceLightMode?: boolean }) {
  if (forceLightMode) {
    return (
      <Image
        src={LogoLight}
        className="w-8 h-8"
        alt="logo-light"
      />
    );
  }

  return (
    <>
      <Image
        src={LogoDark}
        className="dark:block hidden w-8 h-8"
        alt="logo-dark"
      />
      <Image
        src={LogoLight}
        className="dark:hidden block w-8"
        alt="logo"
      />
    </>
  );
}

export interface HeaderProps {
  className?: string;
  pathname: string;

  variant?: "default" | "transparent";
  withBorder?: boolean;
  withBackdrop?: boolean;
}

export default async function Header({
  className,
  pathname = "/",
  variant = "default",
  withBorder = true,
  withBackdrop = true,
}: HeaderProps) {
  const t = await getTranslations("Header");
  const { fontFamily } = await getLocaleInfo();
  const isDocsRoute = pathname.includes("/docs");
  const { title, navigationItems } = await getBreadcrumbTitle(pathname);

  const forceLightMode = true;
  const isTransparent = variant === "transparent";

  return (
    <header
      className={cn(
        "select-none sticky top-0 left-0 right-0 z-50 header-fa",
        fontFamily,

        // variants
        variant === "default" &&
        "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60",

        variant === "transparent" && "bg-transparent backdrop-blur-0",

        // border toggle
        withBorder && "border-b",

        className,
      )}
    >
      <div className="px-4 flex items-center justify-between h-(--header-height)">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo forceLightMode={false} />
            <span className="text-md font-bold brand-text text-black dark:text-white pt-1">
              {t("brand")}
            </span>
          </Link>
          <HeaderNav />
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
