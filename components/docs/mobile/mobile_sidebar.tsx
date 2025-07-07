import { Logo } from "@/components/header";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "./breadcrumb";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarProps } from "../sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslations } from "next-intl";

export default function MobileSidebar({ navigationItems }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Docs");

  return (
    <div className="fixed flex items-center w-full px-4 py-2 md:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-foreground border-b border-border transition-colors"
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            aria-label={t("mobile.openMenu")}
            size="icon"
            className="xl:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">{t("mobile.toggleMenu")}</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="p-0 w-full h-full flex flex-col">
          <div className="flex items-center justify-between mb-0 p-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold">Cyrus</span>
            </Link>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <X className="h-6 w-6" />
                <span className="sr-only">{t("mobile.closeMenu")}</span>
              </Button>
            </SheetTrigger>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Sidebar navigationItems={navigationItems} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex ml-3">
        <nav className="flex items-center space-x-1 rtl:space-x-reverse">
          <Breadcrumb />
        </nav>
      </div>
    </div >
  );
}
