import Layout from "@/components/layout";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeCodeExamples } from "./_components/home-code-examples";
import { HomeCommunityCards } from "./_components/home-community-cards";
import { HomeFeaturesCards } from "./_components/home-features-cards";
import { HomeGetStartedCards } from "./_components/home-get-started-cards";
import { HomeHero } from "./_components/home-hero";
import { HomeNewsLetter } from "./_components/home-news-letter";
import { HomeWhyCyrus } from "./_components/home-why-cyrus";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: "en" | "fa" }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("HomePage");
  return (
    <Layout footer locale={locale}>
      <HomeHero t={t} />
      <HomeFeaturesCards t={t} />
      <HomeCodeExamples t={t} />
      <HomeWhyCyrus t={t} />
      <HomeGetStartedCards t={t} />
      <HomeCommunityCards t={t} />
      <HomeNewsLetter t={t} />
    </Layout>
  );
}
