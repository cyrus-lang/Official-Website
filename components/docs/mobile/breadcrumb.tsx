"use client";

import React, { forwardRef } from "react"; // Import forwardRef
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbProps {
  className?: string;
  onClick?: () => void;
}

const Breadcrumb = forwardRef<HTMLButtonElement, BreadcrumbProps>( 
  ({ className, onClick }, ref) => {
    const t = useTranslations("Docs");

    return (
      <nav
        className={`relative md:hidden flex  px-4 pb-3 text-sm space-x-1 rtl:space-x-reverse ${className}`}
        aria-label={t("mobile.breadcrumb")}
      >
        <div className="flex flex-row items-center">
          <Button
            className="bg-transparent hover:bg-transparent"
            variant="outline"
            onClick={onClick}
            ref={ref} 
          >
            {t("mobile.breadcrumb")}
            <ChevronRight className="w-3 h-3 mx-1 text-muted-foreground" />
          </Button>

          <span className="ms-3">Basic Syntax</span>
        </div>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb"; 

export default Breadcrumb;