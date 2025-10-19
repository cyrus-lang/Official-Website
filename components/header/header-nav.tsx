"use client";
import { headerItems } from "@/content/header-items";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
export const HeaderNav = () => {
  const t = useTranslations("Header");
  const pathname = usePathname();
  return (
    <nav className="hidden xl:flex gap-6 pt-1 ms-3">
      {headerItems.map((item) => (
        <Link
          key={item.content}
          href={item.path}
          className={cn(
            "text-sm font-medium hover:text-primary transition-colors",
            pathname.includes(item.path) && "text-primary",
            item?.className
          )}
        >
          {t(item.content)}
        </Link>
      ))}
    </nav>
  );
};
