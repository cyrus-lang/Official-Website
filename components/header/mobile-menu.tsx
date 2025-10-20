import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Logo } from "../header";
import SearchBar from "../search-bar";
import { LanguageToggle } from "../language-toggle";
import { ThemeToggle } from "../theme-toggle";
import { Translation } from "@/types/translation";
import { HeaderNav } from "./header-nav";

export default function MobileMenu({
  headerItems,
  pathname,
  t,
}: {
  headerItems: { path: string; content: string; className?: string }[];
  pathname: string;
  t: Translation;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="xl:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">{t("buttons.toggleMenu")}</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full fixed inset-0 ml-auto">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold brand-text">{t("brand")}</span>
            </Link>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <X className="h-6 w-6" />
                <span className="sr-only">{t("buttons.closeMenu")}</span>
              </Button>
            </SheetTrigger>
          </div>
          <HeaderNav type="mobile" />

          <div className="mt-auto flex flex-col gap-2">
            <div className="flex gap-2 mb-4">
              <SearchBar />
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <Link href="/docs" className="w-full">
              <Button className="w-full">{t("buttons.getStarted")}</Button>
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
  );
}
