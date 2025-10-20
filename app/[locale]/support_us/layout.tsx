import Layout from "@/components/layout";
import { ReactNode } from "react";

export default async function SupportUsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <Layout locale={locale} footer>
      {children}
    </Layout>
  );
}
