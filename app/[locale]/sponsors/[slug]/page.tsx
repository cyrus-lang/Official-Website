import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getMDXComponents } from "@/lib/get-mdx";
import { getDonationBySlug, getDonations } from "@/lib/sponsors";

const locales = ["en", "fa"] as const;

export async function generateStaticParams() {
  const allParams: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const donations = await getDonations(locale);
    allParams.push(...donations.map(({ slug }) => ({ locale, slug })));
  }

  return allParams;
}

export default async function DonationPage({
  params,
}: {
  params: Promise<{ locale: "en" | "fa"; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const donation = await getDonationBySlug(slug, locale);
  if (!donation) notFound();

  const t = await getTranslations("Sponsors");
  const components = await getMDXComponents();
  const { metadata } = donation;

  return (
    <article className="container max-w-3xl sm:px-10 px-3 py-10 mb-10">
      <Link
        href="/sponsors"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        {t("back")}
      </Link>

      <header className="mt-4 mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{metadata.title}</h1>

        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <dt>{t("table.sponsor")}</dt>
          <dd className="text-foreground">
            {metadata.url ? (
              <a
                href={metadata.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {metadata.sponsor}
              </a>
            ) : (
              metadata.sponsor
            )}
          </dd>
          <dt>{t("table.type")}</dt>
          <dd className="text-foreground">{t(`kinds.${metadata.kind}`)}</dd>
          {metadata.value && (
            <>
              <dt>{t("table.value")}</dt>
              <dd className="text-foreground">{metadata.value}</dd>
            </>
          )}
          {metadata.date && (
            <>
              <dt>{t("table.date")}</dt>
              <dd className="text-foreground">{metadata.date}</dd>
            </>
          )}
        </dl>
      </header>

      <MDXRemote source={donation.content} components={components} />
    </article>
  );
}
