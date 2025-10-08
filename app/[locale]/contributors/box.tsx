import Image from "next/image";
import { Participant } from "@/app/types/participant";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Box({ participant }: { participant: Participant }) {
  const t = useTranslations("Contributors.roles");
  const locale = useLocale();

  // Translate role titles
  const getTranslatedTitle = (title: string) => {
    if (title === "Creator") {
      return t("creator");
    } else if (title === "Contributor") {
      return t("contributor");
    }
    return title;
  };

  // Get the appropriate name based on locale
  const getDisplayName = () => {
    if (locale === "fa" && participant.nameFa) {
      return participant.nameFa;
    }
    return participant.name;
  };

  return (
    <div className="border-1 border-gray-100 rounded-sm flex flex-col gap-2">
      <div className="flex flex-col items-start w-full">
        <div className="text-center text-xl font-bold">{getDisplayName()}</div>
        <div className="text-center text-sm text-muted-foreground mt-1">
          {getTranslatedTitle(participant.title)}
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-[400px] sm:h-[300px] relative ">
        <Image
          src={participant.picture}
          alt={getDisplayName()}
          fill
          className="object-cover object-center relative rounded-lg "
        />
      </div>
      <div className="flex flex-row justify-evenly items-center gap-2 pb-1">
        {participant.github && (
          <Link
            href={participant.github}
            className="flex justify-center items-center w-10 h-10 "
          >
            <Image
              src={"/participants/github.svg"}
              alt={getDisplayName()}
              width={20}
              height={20}
              className="object-cover object-center  dark:brightness-100 dark:invert"
            />
          </Link>
        )}
        {participant.mastodon && (
          <Link
            href={participant.mastodon}
            className="flex justify-center items-center w-10 h-10 "
          >
            <Image
              src={"/participants/mastodon.svg"}
              alt={getDisplayName()}
              width={20}
              height={20}
              className="object-cover object-center dark:brightness-100 dark:invert"
            />
          </Link>
        )}
        {participant.daramet && (
          <Link
            href={participant.daramet}
            className="flex justify-center items-center w-10 h-10 "
          >
            <Image
              src={"/participants/daramet.svg"}
              alt={getDisplayName()}
              width={20}
              height={20}
              className="object-cover object-center dark:brightness-100 dark:invert"
            />
          </Link>
        )}
        {participant.telegram && (
          <Link
            href={participant.telegram}
            className="flex justify-center items-center w-10 h-10 "
          >
            <Image
              src={"/participants/telegram.svg"}
              alt={getDisplayName()}
              width={20}
              height={20}
              className="object-cover object-center dark:brightness-100 dark:invert"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
