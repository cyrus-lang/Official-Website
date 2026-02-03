import { TranslationProps } from "@/types/translation";
import { BlogSearchInput } from "./blog-search-input";

interface BlogHeaderSectionProps extends TranslationProps {
  locale: "fa" | "en";
}
export const BlogHeaderSection = ({ locale, t }: BlogHeaderSectionProps) => {
  const isRtl = locale === "fa";

  return (
    <div className="mb-14 grid gap-6 md:grid-cols-2 items-center">
      <div className={`space-y-3 ${isRtl ? "text-right" : "text-left"}`}>
        <h1 className="text-4xl font-black tracking-tight lg:text-5xl">
          {locale === "en" ? (
            <>
              Our <span className="text-primary">Blog</span>
            </>
          ) : (
            <>
              <span className="text-primary">وبلاگ</span> ما
            </>
          )}
        </h1>

        <p className="max-w-xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className={`flex ${isRtl ? "justify-start" : "justify-end"}`}>
        <BlogSearchInput isRtl={isRtl} />
      </div>
    </div>
  );
};
