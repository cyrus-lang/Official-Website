"use client";

import { Logo } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import Breadcrumb from "./breadcrumb";
import { Sidebar, SidebarProps } from "../sidebar";
export default function MobileSidebar({
  navigationItems,
  title,
  pathname,
}: SidebarProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Docs");
  const sheetTriggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="md:hidden block">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Breadcrumb onOpenSidebar={() => setOpen(true)} title={title!!} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-full h-full flex flex-col dark:bg-background backdrop-blur-xs bg-white"
        >
          <div className="flex items-center justify-between mb-0 p-4 pb-1">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <Logo />
              <span className="text-md font-bold brand-text text-black dark:text-white pt-1">
                {t("title")}
              </span>
            </Link>
            <SheetTrigger ref={sheetTriggerRef} asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background/40"
              >
                <X className="size-5.5!" />
                <span className="sr-only">{t("mobile.closeMenu")}</span>
              </Button>
            </SheetTrigger>
          </div>
          <ScrollArea className="flex-1">
            {/* Pass close callback to Sidebar */}
            <Sidebar
              pathname={pathname}
              navigationItems={navigationItems}
              clickTrigger={() => {
                sheetTriggerRef.current?.click();
              }}
            />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
