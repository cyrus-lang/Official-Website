import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContributorsTitle } from "./_components/contributors-title";
import { ContributorsCards } from "./_components/contributors-cards";
import { GitHubContributors } from "./_components/github-contributors";

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
    <div className="container sm:px-10 px-4 py-12 md:py-16 flex flex-col gap-12 mb-10">
      <ContributorsTitle t={t} />
      <ContributorsCards t={t} />
      <GitHubContributors t={t} />
    </div>
  );
}
