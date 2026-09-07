import { TranslationProps } from "@/types/translation";
import { contributorsSocialIconsArray } from "@/content/contributors/contributors-social-icons";
import { Contributor, ContributorTag } from "@/content/contributors/type";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import Image from "next/image";

export const ContributorCard = async ({
  contributor,
  t,
}: TranslationProps & {
  contributor: Contributor;
}) => {
  const getTranslatedTag = (tag: ContributorTag) => {
    if (tag === "Creator") return t("tags.creator");
    if (tag === "Website Frontend") return t("tags.websiteFrontend");
    if (tag === "Compiler") return t("tags.compiler");
    if (tag === "Standard library") return t("tags.standardLibrary");
    return tag;
  };
  const locale = await getLocale();

  const getDisplayName = () =>
    locale === "fa" && contributor.nameFa
      ? contributor.nameFa
      : contributor.name;

  return (
    <div className="rounded-2xl pt-5 px-3 border hover:scale-105 duration-300 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col items-center w-full gap-2 mb-4">
        <div className="text-xl font-bold">{getDisplayName()}</div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {contributor.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary"
            >
              {getTranslatedTag(tag)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center w-full h-100 sm:h-75 relative overflow-hidden rounded-lg">
        <Image
          src={contributor.picture}
          alt={getDisplayName()}
          fill
          className="object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-row justify-evenly items-center gap-2 mt-3 pb-2">
        {contributorsSocialIconsArray(contributor).map(
          (item) =>
            item.url && (
              <Link
                key={item.key}
                href={item.url}
                className="flex justify-center items-center w-10 h-10 rounded-full transition transform duration-300 hover:bg-primary/10"
              >
                <Image
                  src={item.icon}
                  alt={getDisplayName()}
                  width={20}
                  height={20}
                  className="object-cover object-center dark:brightness-100 dark:invert hover:brightness-125 transition duration-300"
                />
              </Link>
            )
        )}
      </div>
    </div>
  );
};
