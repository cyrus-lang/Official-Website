import { isLocaleRTL } from "@/hooks/use-locale";
import { getLocale } from "next-intl/server";

export async function getLocaleInfo() {
  const locale = await getLocale();

  return {
    locale,
    isPersian: locale === "fa",
    isRTL: isLocaleRTL(locale),
    fontFamily: locale === "fa" ? "font-fa" : "font-sans",
  };
}
