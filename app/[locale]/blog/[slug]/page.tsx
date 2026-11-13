import { Link } from "@/i18n/navigation";
import { getBlogPosts, getPostBySlug } from "@/lib/blog";
import { getMDXComponents } from "@/lib/get-mdx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

const locales = ["en", "fa"] as const;

export async function generateStaticParams() {
  let allParams: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = await getBlogPosts(locale);
    const params = posts.map((post) => ({
      locale: locale,
      slug: post.slug,
    }));
    allParams = [...allParams, ...params];
  }

  return allParams;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: "en" | "fa"; slug: string }>;
}) {
  const { locale, slug } = await params;

  setRequestLocale(locale);

  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();

  const t = await getTranslations("Blog");
  const components = await getMDXComponents();
  const isRtl = locale === "fa";

  return (
    <article
      dir={isRtl ? "rtl" : "ltr"}
      className="container mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14"
    >
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        {isRtl ? (
          <ArrowRight className="h-4 w-4" />
        ) : (
          <ArrowLeft className="h-4 w-4" />
        )}
        <span>{isRtl ? "بازگشت به وبلاگ" : "Back to Blog"}</span>
      </Link>

      <header className="border-b border-border/60 pb-8 mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center rounded-md border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
            {post.metadata.category}
          </span>
          <span>•</span>
          <time dateTime={post.metadata.date}>{post.metadata.date}</time>
          <span>•</span>
          <span>
            {post.readTime} {t("readTime")}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          {post.metadata.title}
        </h1>

        {post.metadata.excerpt && (
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <img
            src={post.metadata.authorAvatar}
            alt={post.metadata.authorName}
            className="h-10 w-10 rounded-full border bg-muted object-cover"
          />
          <div className="text-sm leading-snug">
            <p className="font-semibold text-foreground">
              {post.metadata.authorName}
            </p>
            <p className="text-xs text-muted-foreground">
              {post.metadata.date}
            </p>
          </div>
        </div>
      </header>

      {post.metadata.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted mb-10">
          <img
            src={post.metadata.image}
            alt={post.metadata.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="space-y-4 text-foreground/90 leading-relaxed">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}
