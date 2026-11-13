import { TranslationProps } from "@/types/translation";
import {
  contributorsArray,
  categories,
} from "@/content/contributors/contributors-cards";
import { ContributorCard } from "./contributor-card";
import { ContributorCategory } from "@/content/contributors/type";

const getTranslatedCategory = (category: ContributorCategory, t: (key: string) => string) => {
  if (category === "Core Team") return t("categories.coreTeam");
  if (category === "Website Team") return t("categories.websiteFrontendTeam");
  return category;
};

export const ContributorsCards = ({ t }: TranslationProps) => (
  <div className="flex flex-col gap-14">
    {categories.map((category) => {
      const members = contributorsArray.filter((c) => c.category === category);
      return (
        <section key={category} className="flex flex-col gap-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {getTranslatedCategory(category, t)}
            </h2>
            <span className="text-sm text-muted-foreground">
              {members.length} {members.length === 1 ? "member" : "members"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((contributor) => (
              <ContributorCard
                t={t}
                key={"contributor-" + contributor.id}
                contributor={contributor}
              />
            ))}
          </div>
        </section>
      );
    })}
  </div>
);
