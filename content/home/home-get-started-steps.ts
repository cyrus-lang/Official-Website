import { Translation } from "@/types/translation";

export const homeGetStartedStepsArray = (t: Translation) => [
  {
    number: 1,
    title: t("getStarted.steps.download.title"),
    desc: t("getStarted.steps.download.description"),
  },
  {
    number: 2,
    title: t("getStarted.steps.install.title"),
    desc: t("getStarted.steps.install.description"),
  },
  {
    number: 3,
    title: t("getStarted.steps.code.title"),
    desc: t("getStarted.steps.code.description"),
  },
];
