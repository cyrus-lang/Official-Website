import { TranslationProps } from "@/types/translation";
import { Motion } from "@/components/motion";

export const SupportUsFooter = ({ t }: TranslationProps) => (
  <Motion
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="text-center mt-12"
  >
    <p className="text-gray-600 dark:text-muted-foreground">{t("footer")}</p>
  </Motion>
);
