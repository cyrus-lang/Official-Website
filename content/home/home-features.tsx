import { Translation } from "@/types/translation";
import { Code, Workflow, Cog, Timer, Zap, Link } from "lucide-react";
import { HomeFeatureType } from "./type";

export const homeFeaturesArray = (t: Translation): HomeFeatureType[] => [
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: t("features.minimalSyntax.title"),
    desc: t("features.minimalSyntax.description"),
    details: [
      t("features.minimalSyntax.details.0"),
      t("features.minimalSyntax.details.1"),
      t("features.minimalSyntax.details.2"),
    ],
  },
  {
    icon: <Workflow className="h-6 w-6 text-primary" />,
    title: t("features.effectSystem.title"),
    desc: t("features.effectSystem.description"),
    details: [
      t("features.effectSystem.details.0"),
      t("features.effectSystem.details.1"),
      t("features.effectSystem.details.2"),
    ],
  },
  {
    icon: <Cog className="h-6 w-6 text-primary" />,
    title: t("features.comptime.title"),
    desc: t("features.comptime.description"),
    details: [
      t("features.comptime.details.0"),
      t("features.comptime.details.1"),
      t("features.comptime.details.2"),
    ],
  },
  {
    icon: <Timer className="h-6 w-6 text-primary" />,
    title: t("features.buildTime.title"),
    desc: t("features.buildTime.description"),
    details: [
      t("features.buildTime.details.0"),
      t("features.buildTime.details.1"),
      t("features.buildTime.details.2"),
    ],
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: t("features.performance.title"),
    desc: t("features.performance.description"),
    details: [
      t("features.performance.details.0"),
      t("features.performance.details.1"),
      t("features.performance.details.2"),
    ],
  },
  {
    icon: <Link className="h-6 w-6 text-primary" />,
    title: t("features.cInteroperability.title"),
    desc: t("features.cInteroperability.description"),
    details: [
      t("features.cInteroperability.details.0"),
      t("features.cInteroperability.details.1"),
      t("features.cInteroperability.details.2"),
    ],
  },
];
