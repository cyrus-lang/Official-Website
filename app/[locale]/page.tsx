import Layout from "@/components/layout";
import { RouteReadySignal } from "@/components/route-ready-signal";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeCodeExamples } from "./_components/home-code-examples";
import { HomeCommunityCards } from "./_components/home-community";
import { HomeFeaturesCards } from "./_components/home-features";
import { HomeGetStartedCards } from "./_components/home-get-started";
import { HomeHero } from "./_components/home-hero";
import { HomeWhyCyrus } from "./_components/home-why-cyrus";
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
      <RouteReadySignal />
      <HomeHero t={t} />
      <HomeFeaturesCards t={t} />
      <HomeCodeExamples t={t} />
      <HomeWhyCyrus t={t} />
      <HomeGetStartedCards t={t} />
      <HomeCommunityCards t={t} />
      <HomeSponsors t={t} />
      {/* <HomeNewsLetter t={t} /> */}
    </Layout>
  );
}
