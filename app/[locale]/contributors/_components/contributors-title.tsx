import { TranslationProps } from "@/types/translation";

export const ContributorsTitle = ({ t }: TranslationProps) => (
  <header className="flex flex-col gap-3 border-b border-border/60 pb-8 text-start">
    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
      {t("title")}
    </h1>
    <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
      {t("subtitle")}
    </p>
  </header>
);
