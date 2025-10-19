import Footer from "@/components/footer";
import Header, { HeaderProps } from "@/components/header";
import { PropsWithChildren } from "react";

interface LayoutProps {
  header?: HeaderProps | boolean;
  footer?: boolean;
  className?: string;
  pathname?: string;
}

export default function Layout({
  header = true,
  footer,
  pathname = "",
  className,
  children,
}: PropsWithChildren<LayoutProps>) {
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
