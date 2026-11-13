import { TranslationProps } from "@/types/translation";

export const SupportUsFooter = ({ t }: TranslationProps) => (
  <div className="text-center mt-12">
    <p className="text-gray-600 dark:text-muted-foreground">{t("footer")}</p>
  </div>
);
