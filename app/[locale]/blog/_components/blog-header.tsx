import { TranslationProps } from "@/types/translation";
import { BlogSearchInput } from "./blog-search-input";

interface BlogHeaderSectionProps extends TranslationProps {
  locale: "fa" | "en";
}

export const BlogHeaderSection = ({ locale, t }: BlogHeaderSectionProps) => {
  const isRtl = locale === "fa";

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-8 text-start">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
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

        <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <div className="w-full md:w-auto md:min-w-[300px]">
        <BlogSearchInput isRtl={isRtl} />
      </div>
    </header>
  );
};
