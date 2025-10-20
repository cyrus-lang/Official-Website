import { redirect } from "@/i18n/navigation";

export const DEFAULT_DOCS_HREF = "/docs/getting-started/introduction";

export default async function DocsMainPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: DEFAULT_DOCS_HREF, locale });
}
