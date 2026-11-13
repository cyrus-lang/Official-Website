import { TranslationProps } from "@/types/translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { whySupportUsItemsArray } from "@/content/support-us/why-support-us-items";
import { WhySupportUsItem } from "./why-support-us-card";

export const WhySupportUs = ({ t }: TranslationProps) => {
  return (
    <Card className="mt-8 shadow-lg border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-center">{t("whySupport.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3 mt-2">
          {whySupportUsItemsArray(t).map((item, index) => (
            <WhySupportUsItem {...item} index={index} key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
