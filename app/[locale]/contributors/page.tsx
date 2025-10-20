import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContributorsTitle } from "./_components/contributors-title";
import { ContributorsCards } from "./_components/contributors-cards";

export const dynamic = "force-static";

export default async function ContributorsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "fa" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contributors");

  return (
    <div className="container sm:px-10 px-3 py-10 flex flex-col gap-5 mb-10">
      <ContributorsTitle t={t} />
      <ContributorsCards t={t} />
    </div>
  );
}
