import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { TranslationProps } from "@/types/translation";
import { HeroCode } from "./home-hero-code";
import { homeExamplesCodeSnippets } from "@/content/home/home-examples-code";

export const HomeHero = ({ t }: TranslationProps) => (
  <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-background via-background to-primary/10 z-0"></div>
    <div className="container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Title, Subtitle, Buttons */}
        <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-[1.1]">
            {t("hero.title")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/docs">
              <Button size="lg" className="w-full sm:w-auto">
                {t("hero.getStarted")}
              </Button>
            </Link>
            <Link href="/#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {t("hero.seeExamples")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side: Custom HeroCode component */}
        <div className="lg:col-span-7">
          <HeroCode code={homeExamplesCodeSnippets["hello"]} />
        </div>
      </div>
    </div>
  </section>
);
