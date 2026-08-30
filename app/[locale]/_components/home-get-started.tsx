import { Button } from "@/components/ui/button";
import { homeGetStartedStepsArray } from "@/content/home/home-get-started-steps";
import { TranslationProps } from "@/types/translation";
import Link from "next/link";
import { HomeGetStartedCard } from "./home-get-stated-card";

export const HomeGetStartedCards = ({ t }: TranslationProps) => (
  <section id="get-started" className="py-20">
    <div className="container">
      <div className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          {t("getStarted.title")}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("getStarted.subtitle")}
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="bg-background rounded-lg p-8 shadow-xs border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeGetStartedStepsArray(t).map((step, idx) => (
              <HomeGetStartedCard
                key={step.number}
                number={step.number}
                title={step.title}
                desc={step.desc}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/docs/getting-started/install-compiler-binary">
              <Button size="lg" className="w-full sm:w-auto">
                {t("getStarted.installButton")}
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("getStarted.availability")}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
