import { getPathname } from "@/i18n/navigation";
import { headers } from "next/headers";

export const getServerPathname = () => {
  const currentPath = headers().get("x-current-path") || "/";
  const pathname = getPathname({ href: currentPath, locale: "" })
    .replaceAll("//", "/")
    .replace(/^\/(en|fa)(\/|$)/, "/");
  return pathname;
};
