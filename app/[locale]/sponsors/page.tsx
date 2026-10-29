import { getTranslations, setRequestLocale } from "next-intl/server";

import { getDonations, getSponsorLogos } from "@/lib/sponsors";
import { DonationsTable } from "./_components/donations-table";
import { SponsorsLogos } from "./_components/sponsors-logos";

export const dynamic = "force-static";

export default async function SponsorsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "fa" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Sponsors");
  const donations = await getDonations(locale);

  return (
    <div className="container max-w-4xl sm:px-10 px-3 py-10 flex flex-col gap-8 mb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <SponsorsLogos logos={getSponsorLogos(donations)} />

      <DonationsTable
        donations={donations.map(({ slug, metadata }) => ({ slug, metadata }))}
      />
    </div>
  );
}
