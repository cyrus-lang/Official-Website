"use client";

import { forwardRef, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "@/i18n/navigation";
import { getDocsNavigation } from "@/app/[locale]/docs/collector";

interface BreadcrumbProps {
  className?: string;
  onClick?: () => void;
}

const Breadcrumb = forwardRef<HTMLButtonElement, BreadcrumbProps>(
  ({ className, onClick }, ref) => {
    const t = useTranslations("Docs");
    const [title, setTitle] = useState("");

    const locale = useLocale();
    const pathname = usePathname();
    const [, , groupSlug, slug] = pathname.split("/");
    const getDocs = async () => {
      const docsNavigations = await getDocsNavigation(
        undefined,
        undefined,
        locale
      );
      const docsNavigation = docsNavigations.find(
        (item) => item.slug == groupSlug
      );
      const title = docsNavigation?.children?.find(
        (item) => item.slug == `${groupSlug}/${slug}`
      )?.title;
      setTitle(title || "");
    };
    useEffect(() => {
      getDocs();
    }, [pathname]);
    return (
      <nav
        className={`relative md:hidden flex  px-4 pb-3 text-sm space-x-1 rtl:space-x-reverse ${className}`}
        aria-label={t("mobile.breadcrumb")}
      >
        <div className="flex flex-row items-center">
          <Button
            className="bg-background/60 hover:bg-transparent"
            variant="outline"
            onClick={onClick}
            ref={ref}
          >
            {t("mobile.breadcrumb")}
            <ChevronRight className="w-3 h-3 mx-1 text-muted-foreground" />
          </Button>

          <span className="ms-3 font-bold">{title}</span>
        </div>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
