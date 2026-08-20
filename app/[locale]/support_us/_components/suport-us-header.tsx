import { TranslationProps } from "@/types/translation";
import { Motion } from "@/components/motion";
import { Heart } from "lucide-react";

export const SupportUsHeader = ({ t }: TranslationProps) => {
  return (
    <Motion
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-12"
    >
      <Heart className="mx-auto h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
        {t("title")}
      </h1>
      <p className="text-xl text-gray-600 dark:text-muted-foreground max-w-2xl mx-auto">
        {t("subtitle")}
      </p>
    </Motion>
  );
};
