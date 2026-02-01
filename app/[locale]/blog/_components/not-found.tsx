import { Translation } from "@/types/translation";

export const BlogNotFound = ({
  isVisible,
  t,
}: {
  isVisible: boolean;
  t: Translation;
}) => {
  if (isVisible) {
    return (
      <div className="w-full text-center py-20 bg-secondary/20 rounded-3xl">
        <p className="text-muted-foreground">{t("emptyState")}</p>
      </div>
    );
  }
};
