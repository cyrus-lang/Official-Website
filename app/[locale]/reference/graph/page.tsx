import Layout from "@/components/layout";
import { getTranslations, setRequestLocale } from "next-intl/server";
import GraphEditor from "./graph-editor";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Reference.graph" });
  return { title: t("title"), description: t("description") };
}

export default async function GraphPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Layout locale={locale} pathname="/reference/graph" className="flex flex-col">
      <GraphEditor />
    </Layout>
  );
}
