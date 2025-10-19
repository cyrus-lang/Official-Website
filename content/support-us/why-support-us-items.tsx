import { Translation } from "@/types/translation";
import { DollarSign, Heart, Mail } from "lucide-react";
import { WhySupportUsItemType } from "./type";

export const whySupportUsItemsArray = (
  t: Translation
): WhySupportUsItemType[] => [
  {
    icon: <Heart className="h-6 w-6 text-blue-600" />,
    bg: "bg-blue-100",
    title: t("whySupport.communityImpact.title"),
    desc: t("whySupport.communityImpact.description"),
  },
  {
    icon: <DollarSign className="h-6 w-6 text-green-600" />,
    bg: "bg-green-100",
    title: t("whySupport.transparentUse.title"),
    desc: t("whySupport.transparentUse.description"),
  },
  {
    icon: <Mail className="h-6 w-6 text-purple-600" />,
    bg: "bg-purple-100",
    title: t("whySupport.stayConnected.title"),
    desc: t("whySupport.stayConnected.description"),
  },
];
