import { MOCK_PACKAGES } from "@/content/packages/mock-packages";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PackagesCards } from "./_components/packages-cards";
import { PackagesHeaderSection } from "./_components/packages-header";
import { MOCK_PACKAGES_FA } from "@/content/packages/mock-packages-fa";

export default async function PackagesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "fa" | "en" }>;
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Packages");
  const isRtl = locale === "fa";
  const mockPackages = isRtl ? MOCK_PACKAGES_FA : MOCK_PACKAGES;
  const packages = mockPackages.filter(
    (item) => item.name.includes(query) || item.description.includes(query),
  );
  console.log(packages);
  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="min-h-screen py-10">
      <div className="container mx-auto px-4 py-10">
        <PackagesHeaderSection t={t} isRtl={isRtl} />
        <PackagesCards
          locale={locale}
          packages={query ? packages : mockPackages}
        />
      </div>
    </main>
  );
}
