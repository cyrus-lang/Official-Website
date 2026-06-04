"use client";

import { headerItems } from "@/content/header-items";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const HeaderNav = ({
  type = "desktop",
  isPhilosophy = false,
}: {
  type?: "mobile" | "desktop";
  isPhilosophy?: boolean;
}) => {
  const t = useTranslations("Header");
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        type == "mobile"
          ? "flex flex-col gap-4 mobile-nav"
          : "hidden xl:flex gap-6 pt-1 ms-3",
      )}
    >
      {headerItems.map((item) => (
        <Link
          key={item.content}
          href={item.path}
          className={cn(
            "text-sm font-medium hover:text-primary transition-colors ",
            isPhilosophy && "text-white",
            pathname.includes(item.path)
              ? isPhilosophy
                ? "dark:text-[#ff9967] text-[#ff9967]"
                : "dark:text-primary text-primary"
              : "",
            item?.className,
          )}
        >
          {t(item.content)}
        </Link>
      ))}
    </nav>
  );
};
