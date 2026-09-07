import { TranslationProps } from "@/types/translation";
import {
  contributorsArray,
  categories,
} from "@/content/contributors/contributors-cards";
import { ContributorCard } from "./contributor-card";
import { ContributorCategory } from "@/content/contributors/type";

const getTranslatedCategory = (category: ContributorCategory, t: (key: string) => string) => {
  if (category === "Core Team") return t("categories.coreTeam");
  if (category === "Website Frontend Team") return t("categories.websiteFrontendTeam");
  return category;
};

export const ContributorsCards = ({ t }: TranslationProps) => (
  <div className="flex flex-col gap-10">
    {categories.map((category) => {
      const members = contributorsArray.filter((c) => c.category === category);
      return (
        <section key={category} className="mb-6">
          <h2 className="text-3xl font-bold mb-4">
            {getTranslatedCategory(category, t)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
