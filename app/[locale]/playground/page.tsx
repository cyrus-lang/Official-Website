import { getTranslations, setRequestLocale } from "next-intl/server";
import { PlaygroundCodeEditor } from "./_components/playground-code-editor";
import { PlaygroundTitle } from "./_components/playground-title";

export default async function PlaygroundPage({
  params,
}: {
  params: Promise<{ locale: "en" | "fa" }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations("Playground");

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <PlaygroundTitle t={t} />
        <PlaygroundCodeEditor t={t} />
      </div>
    </div>
  );
}
