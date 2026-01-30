import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { TranslationProps } from "@/types/translation";

export const HomeHero = ({ t }: TranslationProps) => (
  <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10 z-0"></div>
    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-5 z-0"></div>
    <div className="container relative z-10">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary">
          {t("hero.title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/docs">
            <Button size="lg" className="w-full sm:w-auto">
              {t("hero.getStarted")}
            </Button>
          </Link>
          <Link href="/#examples">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              {t("hero.seeExamples")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);
