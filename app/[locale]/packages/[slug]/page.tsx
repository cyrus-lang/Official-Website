import { setRequestLocale, getTranslations } from "next-intl/server";
import { MOCK_PACKAGES_FA } from "@/content/packages/mock-packages-fa";
import { MOCK_PACKAGES } from "@/content/packages/mock-packages";
import { notFound } from "next/navigation";
import { PackageSlugHeader } from "./packages-slug-header";
import { PackageSlugInstall } from "./packages-slug-install";
import { PackageSlugReadme } from "./packages-slug-readme";
import { PackageSidebar } from "./packages-slug-sidebar";

export default async function PackageDetailPage({
  params,
}: PageProps<"/[locale]/packages/[slug]">) {
  const { locale, slug } = await params;

  setRequestLocale(locale);
  const t = await getTranslations("Packages");

  const isRtl = locale === "fa";
  const packages = isRtl ? MOCK_PACKAGES_FA : MOCK_PACKAGES;

  const pkg = packages.find((p) => p.name === slug);

  if (!pkg) notFound();

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={`min-h-screen pt-32 pb-20 ${isRtl ? "font-vazir" : ""}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PackageSlugHeader
              name={pkg.name}
              version={pkg.version}
              description={pkg.description}
            />

            <PackageSlugInstall name={pkg.name} isRtl={isRtl} />

            <PackageSlugReadme
              name={pkg.name}
              description={`${pkg.description}`}
              isRtl={isRtl}
            />
          </div>

          <PackageSidebar pkg={pkg} t={t} isRtl={isRtl} />
        </div>
      </div>
    </main>
  );
}
