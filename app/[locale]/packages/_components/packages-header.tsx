import { Input } from "@/components/ui/input";
import { TranslationProps } from "@/types/translation";
import { Search } from "lucide-react";
import { PackagesSearchInput } from "./packages-search-input";

interface PackagesHeaderSectionProps extends TranslationProps {
  isRtl: boolean;
}
export const PackagesHeaderSection = ({
  t,
  isRtl,
}: PackagesHeaderSectionProps) => {
  return (
    <div className="flex flex-col items-center mb-12 text-center">
      <h1 className="text-4xl font-extrabold lg:text-5xl mb-4 rtl:flex-row-reverse flex gap-3">
        <span>{t("headerTitle.normal")}</span>
        <span className="text-primary"> {t("headerTitle.colored")}</span>
      </h1>
      <p className="text-muted-foreground max-w-xl">{t("subtitle")}</p>

      <PackagesSearchInput isRtl={isRtl} />
    </div>
  );
};
