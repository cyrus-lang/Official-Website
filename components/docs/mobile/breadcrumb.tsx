"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Breadcrumb({ className }: { className?: string }) {
  const pathname = usePathname();
  const t = useTranslations("Docs");

  return (
    <nav
      className={`relative px-4 pb-3 flex text-sm space-x-1 rtl:space-x-reverse ${className}`}
      aria-label={t("mobile.breadcrumb")}
    >
      <div className="flex flex-row items-center">
        <Button className="bg-transparent hover:bg-transparent" variant="outline">
          {t("mobile.breadcrumb")}
          <ChevronRight className="w-3 h-3 mx-1 text-muted-foreground" />
        </Button>

        <span className="ms-3">Basic Syntax</span>
      </div>
    </nav>
  );
}