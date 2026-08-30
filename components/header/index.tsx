import { getBreadcrumbTitle } from "@/lib/get-breadcrumb-title";
import { getLocaleInfo } from "@/lib/get-locale-info";
import { HeaderChrome } from "./header-chrome";

export { Logo } from "./logo";

export interface HeaderProps {
  className?: string;
  pathname: string;

  variant?: "default" | "transparent" | "dynamic";
  withBorder?: boolean;
  withBackdrop?: boolean;
}

export default async function Header({
  className,
  pathname = "/",
  variant = "default",
  withBorder = true,
  withBackdrop = true,
}: HeaderProps) {
  // Breadcrumb/locale data is fetched here, server-side; HeaderChrome
  // (client) owns the interactive bits, its own translations, and, for
  // "dynamic" headers, the scroll-reactive transparency.
  const { fontFamily } = await getLocaleInfo();
  const isDocsRoute = pathname.includes("/docs");
  const { title, navigationItems } = await getBreadcrumbTitle(pathname);

  return (
    <HeaderChrome
      className={className}
      pathname={pathname}
      variant={variant}
      withBorder={withBorder}
      withBackdrop={withBackdrop}
      fontFamily={fontFamily}
      isDocsRoute={isDocsRoute}
      title={title}
      navigationItems={navigationItems}
    />
  );
}
