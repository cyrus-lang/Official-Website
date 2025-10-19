import { Translation } from "@/types/translation";
import { Code, Cpu, Github, Globe, Layers, Shield } from "lucide-react";
import { HomeFeatureType } from "./type";

export const homeFeaturesArray = (t: Translation): HomeFeatureType[] => [
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: t("features.cleanSyntax.title"),
    desc: t("features.cleanSyntax.description"),
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: t("features.typeSystem.title"),
    desc: t("features.typeSystem.description"),
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: t("features.crossPlatform.title"),
    desc: t("features.crossPlatform.description"),
  },
  {
    icon: <Cpu className="h-6 w-6 text-primary" />,
    title: t("features.concurrency.title"),
    desc: t("features.concurrency.description"),
  },
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: t("features.standardLibrary.title"),
    desc: t("features.standardLibrary.description"),
  },
  {
    icon: <Github className="h-6 w-6 text-primary" />,
    title: t("features.openSource.title"),
    desc: t("features.openSource.description"),
  },
];
