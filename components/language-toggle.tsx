"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function LanguageToggle() {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "fa" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="relative" disabled>
        <Languages className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleLanguage}
      title={locale === "en" ? "تغییر به فارسی" : "Switch to English"}
      className="relative"
    >
      <Languages className="h-4 w-4" />
      <span className="absolute -top-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
        {locale === "en" ? "fa" : "en"}
      </span>
    </Button>
  );
}
