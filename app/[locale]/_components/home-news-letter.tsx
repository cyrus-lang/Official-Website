import { Motion } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { TranslationProps } from "@/types/translation";

export const HomeNewsLetter = ({ t }: TranslationProps) => (
  <section className="py-20">
    <div className="container">
      <Motion
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto bg-primary/5 rounded-lg p-8 border border-primary/20"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {t("newsletter.title")}
          </h2>
          <p className="text-muted-foreground">{t("newsletter.subtitle")}</p>
        </div>
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder={t("newsletter.placeholder")}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button className="sm:w-auto">{t("newsletter.button")}</Button>
        </form>
      </Motion>
    </div>
  </section>
);
