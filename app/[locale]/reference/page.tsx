import Layout from "@/components/layout";
import reference from "@/content/reference/stdlib.json";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ReferenceBrowser from "./reference-browser";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Reference" });
  return { title: t("title"), description: t("description") };
}

export default async function ReferencePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Layout locale={locale} pathname="/reference" footer>
      <ReferenceBrowser reference={reference} locale={locale === "fa" ? "fa" : "en"} />
    </Layout>
  );
}
