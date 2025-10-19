import { Translation } from "@/types/translation";
import { Github, MessageSquare, Send } from "lucide-react";
import { socialMedia } from "../social-media";
import { HomeCommunityType, HomeFeatureType } from "./type";

export const homeCommunityArray = (t: Translation): HomeCommunityType[] => [
  {
    icon: <Github className="h-12 w-12 mx-auto mb-4 text-primary" />,
    title: t("community.github.title"),
    desc: t("community.github.description"),
    link: socialMedia.github,
    button: t("community.github.button"),
  },
  {
    icon: <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />,
    title: t("community.discord.title"),
    desc: t("community.discord.description"),
    link: socialMedia.discord,
    button: t("community.discord.button"),
  },
  {
    icon: <Send className="h-12 w-12 mx-auto mb-4 text-primary" />,
    title: t("community.telegram.title"),
    desc: t("community.telegram.description"),
    link: "https://t.me/cyrus_lang",
    button: t("community.telegram.button"),
  },
];
