import Image from "next/image";
import { Participant } from "@/app/types/participant";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Box({ participant }: { participant: Participant }) {
  const t = useTranslations("Contributors.roles");
  const locale = useLocale();

  const getTranslatedTitle = (title: string) => {
    if (title === "Creator") return t("creator");
    if (title === "Contributor") return t("contributor");
    return title;
  };

  const getDisplayName = () =>
    locale === "fa" && participant.nameFa
      ? participant.nameFa
      : participant.name;

  const socialIcons = [
    {
      key: "github",
      url: participant.github,
      icon: "/participants/github.svg",
    },
    {
      key: "mastodon",
      url: participant.mastodon,
      icon: "/participants/mastodon.svg",
    },
    {
      key: "daramet",
      url: participant.daramet,
      icon: "/participants/daramet.svg",
    },
    {
      key: "telegram",
      url: participant.telegram,
      icon: "/participants/telegram.svg",
    },
  ];

  return (
    <div className="rounded-2xl pt-5 px-3 border hover:scale-105 duration-300 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col items-center w-full gap-2 mb-4">
        <div className="text-xl font-bold">{getDisplayName()}</div>
        <div className="text-sm text-muted-foreground">
          {getTranslatedTitle(participant.title)}
        </div>
      </div>

      <div className="flex justify-center items-center w-full h-[400px] sm:h-[300px] relative overflow-hidden rounded-lg">
        <Image
          src={participant.picture}
          alt={getDisplayName()}
          fill
          className="object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-row justify-evenly items-center gap-2 mt-3 pb-2">
        {socialIcons.map(
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
}
