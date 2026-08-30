import { Translation } from "@/types/translation";
import { Code, Workflow, Cog, Timer, Zap, Link } from "lucide-react";
import { HomeFeatureType } from "./type";

export const homeFeaturesArray = (t: Translation): HomeFeatureType[] => [
  {
    icon: <Workflow className="h-6 w-6 text-primary" />,
    title: t("features.effectSystem.title"),
    desc: t("features.effectSystem.description"),
  },
  {
    icon: <Cog className="h-6 w-6 text-primary" />,
    title: t("features.comptime.title"),
    desc: t("features.comptime.description"),
  },
  {
    icon: <Timer className="h-6 w-6 text-primary" />,
    title: t("features.buildTime.title"),
    desc: t("features.buildTime.description"),
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: t("features.performance.title"),
    desc: t("features.performance.description"),
  },
  {
    icon: <Link className="h-6 w-6 text-primary" />,
    title: t("features.cInteroperability.title"),
    desc: t("features.cInteroperability.description"),
  },
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: t("features.minimalSyntax.title"),
    desc: t("features.minimalSyntax.description"),
  },
];
