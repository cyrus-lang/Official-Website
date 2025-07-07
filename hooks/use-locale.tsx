import { useLocale } from "next-intl";

export function useLocaleInfo() {
  const locale = useLocale();

  return {
    locale,
    isPersian: locale === "fa",
    isRTL: isLocaleRTL(locale),
    fontFamily: locale === "fa" ? "font-fa" : "font-sans",
  };
}

export function isLocaleRTL(locale: string) {
  return locale === "fa";
}