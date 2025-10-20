import { setRequestLocale } from "next-intl/server";

export default async function ForumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="w-full text-center py-10">
      <span>Coming soon...</span>
    </div>
  );
}
