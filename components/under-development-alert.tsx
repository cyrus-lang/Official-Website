import { useTranslations } from "next-intl";
import { ErrorAlert } from "@/components/ui/alert"

export default function UnderDevelopmentAlert() {
  const t = useTranslations("DocsContent.introduction.errorAlert");

  return (
    <ErrorAlert title={t("title")}>
      {t("content")}
    </ErrorAlert>
  );
}