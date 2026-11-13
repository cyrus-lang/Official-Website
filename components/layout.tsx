import Footer from "@/components/footer";
import Header, { HeaderProps } from "@/components/header";
import { cn } from "@/lib/utils";
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
    <div className="min-h-screen flex flex-col">
      {header && (
        <Header {...(typeof header !== "boolean" ? header : { pathname })} />
      )}
      <main className={cn("flex-1", className)}>{children}</main>
      {footer && <Footer />}
    </div>
  );
}
