import Layout from "@/components/layout";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeCommunityCards } from "./_components/home-community";
import { HomeFeaturesCards } from "./_components/home-features";
import { HomeGetStartedCards } from "./_components/home-get-started";
import { HomeHero } from "./_components/home-hero";
import { HomeSponsors } from "./_components/home-sponsors";
// import { HomeNewsLetter } from "./_components/home-news-letter";

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
      <HomeFeaturesCards />
      <HomeGetStartedCards t={t} />
      <HomeCommunityCards t={t} />
      <HomeSponsors t={t} />
      {/* <HomeNewsLetter t={t} /> */}
    </Layout>
  );
}
