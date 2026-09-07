import { TranslationProps } from "@/types/translation";

export const HomeWhyCyrus = ({ t }: TranslationProps) => (
  <section id="why" className="py-20 bg-muted/50">
    <div className="container">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("why.title")}
          </h2>
        </div>
        <div className="animate-fade-in bg-background rounded-xl p-8 shadow-xs border relative overflow-hidden">
          <p className="text-lg max-md:text-base mb-6">{t("why.paragraph1")}</p>
          <p className="text-lg max-md:text-base mb-6">{t("why.paragraph2")}</p>
          <p className="text-lg max-md:text-base">{t("why.paragraph3")}</p>
        </div>
      </div>
    </div>
  </section>
);
