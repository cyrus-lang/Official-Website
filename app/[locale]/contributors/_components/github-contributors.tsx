import { getRepositoryContributors } from "@/lib/github-contributors";
import { TranslationProps } from "@/types/translation";
import Image from "next/image";

export const GitHubContributors = async ({ t }: TranslationProps) => {
  const contributors = await getRepositoryContributors();

  if (contributors.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6 pt-8 border-t border-border/60">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t("communityTitle")}
          </h2>
          <span className="text-sm text-muted-foreground">
            {contributors.length}{" "}
            {contributors.length === 1 ? "contributor" : "contributors"}
          </span>
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
          {t("communitySubtitle")}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {contributors.map((contributor) => (
          <a
            key={contributor.id}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            title={contributor.login}
            aria-label={contributor.login}
            className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-xl border bg-muted hover:border-primary/50 hover:scale-105 transition-all duration-200"
          >
            <Image
              src={contributor.avatar_url}
              alt={contributor.login}
              fill
              sizes="64px"
              className="object-cover object-center"
            />
          </a>
        ))}
      </div>
    </section>
  );
};
