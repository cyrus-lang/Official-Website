import { ReactNode } from "react";
import Layout from "@/components/layout";

export default async function ContributorsLayout({
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
