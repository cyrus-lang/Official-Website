"use client";

import { X } from "lucide-react";
import Breadcrumb from "./breadcrumb";
import { Logo } from "@/components/header";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarProps } from "../sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@/i18n/navigation";
export default function MobileSidebar({ navigationItems }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Docs");
  const sheetTriggerRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  return (
    <div className="md:hidden block">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Breadcrumb onClick={() => setOpen(true)} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-full h-full flex flex-col dark:bg-background/10 backdrop-blur-xs bg-white/65"
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
                <X className="h-6 w-6" />
                <span className="sr-only">{t("mobile.closeMenu")}</span>
              </Button>
            </SheetTrigger>
          </div>
          <ScrollArea className="flex-1">
            {/* Pass close callback to Sidebar */}
            <Sidebar
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
