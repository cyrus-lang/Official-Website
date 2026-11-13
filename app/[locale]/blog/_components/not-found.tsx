import { Translation } from "@/types/translation";

export const BlogNotFound = ({
  isVisible,
  t,
}: {
  isVisible: boolean;
  t: Translation;
}) => {
  if (!isVisible) return null;

  return (
    <div className="w-full text-center py-16 bg-background border rounded-xl shadow-xs">
      <p className="text-muted-foreground">{t("emptyState")}</p>
    </div>
  );
};
