import { TranslationProps } from "@/types/translation";
import { supportUsCardsArray } from "@/content/support-us/support-us-cards";
import { SupportUsCard } from "./support-us-card";

export const SupportUsCards = async ({ t }: TranslationProps) => {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {supportUsCardsArray(t).map((item, index) => (
        <SupportUsCard
          key={"support-us-card-" + index}
          {...item}
          index={index}
        />
      ))}
    </div>
  );
};
