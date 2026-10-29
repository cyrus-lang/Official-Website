import { homeSponsorsArray } from "@/content/home/home-sponsors";
import { Link } from "@/i18n/navigation";
import { TranslationProps } from "@/types/translation";
import { HomeSponsorCard } from "./home-sponsors-card";

export const HomeSponsors = ({ t }: TranslationProps) => (
  <section id="sponsors" className="py-20">
    <div className="container">
      <div className="text-center mb-7">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t("sponsors.title")}
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg mx-auto">
          {t("sponsors.subtitle")}
        </p>
      </div>

      <div className="mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {homeSponsorsArray.map((item) => (
            <HomeSponsorCard {...item} key={item.imageName} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/sponsors" className="text-primary hover:underline">
            {t("sponsors.seeDetails")}
          </Link>
        </div>
      </div>
    </div>
  </section>
);