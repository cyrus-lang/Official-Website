import { ReactNode } from "react";
import Layout from "@/components/layout";
import { setRequestLocale } from "next-intl/server";

export default async function BlogLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  return <Layout locale={locale}>{children}</Layout>;
}
