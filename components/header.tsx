import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "@/app/assets/logo-dark.png";
import LogoLight from "@/app/assets/logo-light.png";
import { getTranslations } from "next-intl/server";
import { useLocaleInfo } from "@/hooks/use-locale";
import {useTranslations} from 'next-intl';

export const HEADER_HEIGHT = "64px";

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

export default function Header() {
  const t = useTranslations("Header");
  const { isPersian, fontFamily } = useLocaleInfo();

  return (
    <>
      <header
        className={`select-none border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 header-fa ${fontFamily}`}
      >
        <div
          className="px-4 flex items-center justify-between"
          style={{ height: HEADER_HEIGHT }}
        >
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 pl-1 pr-8">
              <Logo />
              <span className="text-md font-bold  brand-text text-black dark:text-white">
                {t("brand")}
              </span>
            </Link>

            <nav className="hidden xl:flex gap-6 pt-1">
              <Link
                href="/docs"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t("navigation.documentation")}
              </Link>

              <Link
                href="/blog"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t("navigation.blog")}
              </Link>

              <Link
                href="/forum"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t("navigation.forum")}
              </Link>

              <Link
                href="/packages"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t("navigation.packages")}
              </Link>

              <Link
                href="/contributors"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t("navigation.contributors")}
              </Link>

              <Link
                href="/support_us"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {t("navigation.supportUs")}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
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
                    <Link
                      href="/docs"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {t("navigation.documentation")}
                    </Link>

                    <Link
                      href="/blog"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {t("navigation.blog")}
                    </Link>

                    <Link
                      href="/forum"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {t("navigation.forum")}
                    </Link>

                    <Link
                      href="/packages"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {t("navigation.packages")}
                    </Link>

                    <Link
                      href="/contributors"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {t("navigation.supportUs")}
                    </Link>

                    <Link
                      href="/support_us"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {t("navigation.contributors")}
                    </Link>
                  </nav>
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex gap-2 mb-4">
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
      </header>
    </>
  );
}
