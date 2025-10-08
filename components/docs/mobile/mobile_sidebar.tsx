"use client"

import { X } from "lucide-react";
import Breadcrumb from "./breadcrumb";
import { Logo } from "@/components/header";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarProps } from "../sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@/i18n/navigation";

export default function MobileSidebar({ navigationItems }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Docs");

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
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Breadcrumb onClick={() => setOpen(true)} />
        </SheetTrigger>

        <SheetContent side="left" className="p-0 w-full h-full flex flex-col">
          <div className="flex items-center justify-between mb-0 p-4 pb-1">
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

          <ScrollArea className="flex-1">
            <Sidebar navigationItems={navigationItems} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}