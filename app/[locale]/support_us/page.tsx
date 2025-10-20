import { getTranslations, setRequestLocale } from "next-intl/server";
import { SupportUsHeader } from "./_components/suport-us-header";
import { SupportUsCards } from "./_components/support-us-cards";
import { WhySupportUs } from "./_components/why-support-us";
import { SupportUsFooter } from "./_components/support-us-footer";

const SupportUsPage = async ({
  params,
}: {
  params: Promise<{ locale: "en" | "fa" }>;
}) => {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations("SupportUs");

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <SupportUsHeader t={t} />
        <SupportUsCards t={t} />
        <WhySupportUs t={t} />
        <SupportUsFooter t={t} />
      </div>
    </div>
  );
};
export default SupportUsPage;
