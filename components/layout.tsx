import Footer from "@/components/footer";
import Header, { HeaderProps } from "@/components/header";
import { setRequestLocale } from "next-intl/server";
import { PropsWithChildren } from "react";

interface LayoutProps {
  header?: HeaderProps | boolean;
  footer?: boolean;
  className?: string;
  locale?: string;
  pathname?: string;
}

export default function Layout({
  header = true,
  footer,
  pathname = "",
  className,
  children,
  locale = "fa",
}: PropsWithChildren<LayoutProps>) {
  setRequestLocale(locale);
  return (
    <main className={className}>
      {header && (
        <Header {...(typeof header !== "boolean" ? header : { pathname })} />
      )}
      {children}
      {footer && <Footer />}
    </main>
  );
}
