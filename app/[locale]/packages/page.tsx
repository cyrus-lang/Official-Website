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
  searchParams: Promise<{ query?: string }>;
}) {
  const { query = "" } = await searchParams;
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Packages");
  const isRtl = locale === "fa";
  const mockPackages = isRtl ? MOCK_PACKAGES_FA : MOCK_PACKAGES;
  const normalizedQuery = query.trim().toLowerCase();
  const packages = normalizedQuery
    ? mockPackages.filter(
        (item) =>
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.description.toLowerCase().includes(normalizedQuery)
      )
    : mockPackages;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-screen py-10">
      <div className="container mx-auto px-4 py-10">
        <PackagesHeaderSection t={t} isRtl={isRtl} />
        <PackagesCards
          locale={locale}
          packages={packages}
          emptyMessage={t("empty")}
        />
      </div>
    </div>
  );
}
