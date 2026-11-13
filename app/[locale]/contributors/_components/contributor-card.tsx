import { Contributor, ContributorTag } from "@/content/contributors/type";
import { cn } from "@/lib/utils";
import { TranslationProps } from "@/types/translation";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import type { ReactNode } from "react";

interface SocialLink {
  key: string;
  label: string;
  url: string;
  icon: ReactNode;
}

const getSocialLinks = (contributor: Contributor): SocialLink[] => {
  const links: SocialLink[] = [];

  if (contributor.github) {
    links.push({
      key: "github",
      label: "GitHub",
      url: contributor.github,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    });
  }

  if (contributor.twitter) {
    links.push({
      key: "twitter",
      label: "X (Twitter)",
      url: contributor.twitter,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    });
  }

  if (contributor.website) {
    links.push({
      key: "website",
      label: "Website",
      url: contributor.website,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    });
  }

  if (contributor.telegram) {
    links.push({
      key: "telegram",
      label: "Telegram",
      url: contributor.telegram,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    });
  }

  if (contributor.mastodon) {
    links.push({
      key: "mastodon",
      label: "Mastodon",
      url: contributor.mastodon,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.433-.658-3.894-.935-6.451-.956h-.063c-2.557.021-5.016.298-6.45.956 0 0-2.843 1.272-2.843 5.61 0 .993-.019 2.181.012 3.441.103 4.243.778 8.425 4.701 9.463 1.809.479 3.362.579 4.612.51 2.268-.126 3.541-.809 3.541-.809l-.075-1.646s-1.621.511-3.441.449c-1.804-.062-3.707-.194-3.999-2.409a4.523 4.523 0 0 1-.04-.621s1.77.433 4.014.536c1.372.063 2.658-.08 3.965-.236 2.506-.299 4.688-1.843 4.962-3.254.434-2.223.398-5.424.398-5.424zm-3.353 5.59h-2.081V9.057c0-1.075-.452-1.62-1.357-1.62-1 0-1.501.647-1.501 1.927v2.79h-2.069V9.364c0-1.28-.501-1.927-1.502-1.927-.905 0-1.357.545-1.357 1.62v5.099H6.026V8.903c0-1.074.273-1.927.823-2.558.566-.631 1.307-.955 2.228-.955 1.065 0 1.872.409 2.405 1.228l.518.869.519-.869c.533-.819 1.34-1.228 2.405-1.228.92 0 1.662.324 2.228.955.549.631.822 1.484.822 2.558v5.253z" />
        </svg>
      ),
    });
  }

  if (contributor.linkedin) {
    links.push({
      key: "linkedin",
      label: "LinkedIn",
      url: contributor.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    });
  }

  if (contributor.email) {
    links.push({
      key: "email",
      label: "Email",
      url: `mailto:${contributor.email}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    });
  }

  if (contributor.daramet) {
    links.push({
      key: "daramet",
      label: "Support",
      url: contributor.daramet,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    });
  }

  return links;
};

const getGithubHandle = (contributor: Contributor): string | null => {
  if (contributor.handle) return contributor.handle;
  if (!contributor.github) return null;
  const parts = contributor.github.replace(/\/+$/, "").split("/");
  const username = parts[parts.length - 1];
  return username ? `@${username}` : null;
};

export const ContributorCard = async ({
  contributor,
  t,
}: TranslationProps & {
  contributor: Contributor;
}) => {
  const getTranslatedTag = (tag: ContributorTag) => {
    if (tag === "Creator") return t("tags.creator");
    if (tag === "Website Frontend") return t("tags.websiteFrontend");
    if (tag === "Compiler") return t("tags.compiler");
    if (tag === "Standard library") return t("tags.standardLibrary");
    return tag;
  };

  const locale = await getLocale();
  const displayName =
    locale === "fa" && contributor.nameFa
      ? contributor.nameFa
      : contributor.name;
  const displayBio =
    locale === "fa" && contributor.bioFa ? contributor.bioFa : contributor.bio;
  const handle = getGithubHandle(contributor);
  const socialLinks = getSocialLinks(contributor);

  return (
    <article className="bg-background rounded-xl p-5 shadow-xs border flex flex-col justify-between gap-4 hover:border-primary/50 transition-all duration-300 group">
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center gap-4">
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border bg-muted">
            <Image
              src={contributor.picture}
              alt={displayName}
              fill
              sizes="72px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold tracking-tight text-foreground truncate">
              {displayName}
            </h3>
            {handle &&
              (contributor.github ? (
                <a
                  href={contributor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="inline-block font-mono text-xs text-muted-foreground hover:text-primary transition-colors mt-0.5 truncate max-w-full"
                >
                  {handle}
                </a>
              ) : (
                <p
                  dir="ltr"
                  className="font-mono text-xs text-muted-foreground mt-0.5 truncate"
                >
                  {handle}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {contributor.tags.map((tag) => {
            const isCreator = tag === "Creator";
            return (
              <span
                key={tag}
                className={cn(
                  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium",
                  isCreator
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border/60 bg-muted/60 text-muted-foreground"
                )}
              >
                {getTranslatedTag(tag)}
              </span>
            );
          })}
        </div>

        {displayBio && (
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {displayBio}
          </p>
        )}
      </div>

      {socialLinks.length > 0 && (
        <div className="pt-4 border-t border-border/60 mt-auto flex items-center gap-1.5">
          {socialLinks.map((item) => (
            <a
              key={item.key}
              href={item.url}
              target={item.key === "email" ? undefined : "_blank"}
              rel={item.key === "email" ? undefined : "noopener noreferrer"}
              aria-label={`${displayName} on ${item.label}`}
              title={item.label}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-200"
            >
              {item.icon}
            </a>
          ))}
        </div>
      )}
    </article>
  );
};
