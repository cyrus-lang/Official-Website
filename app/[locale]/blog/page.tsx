import { getTranslations, setRequestLocale } from "next-intl/server";

import { getBlogPosts, mapBlogPosts } from "@/lib/blog";
import { BlogFeaturedPost } from "./_components/blog-featured-post";
import { BlogHeaderSection } from "./_components/blog-header";
import { BlogPosts } from "./_components/blog-posts";
import { BlogNotFound } from "./_components/not-found";

export type BlogPostType = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: { name: string; avatar: string };
  category: string;
  image: string;
};

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "en" | "fa" }>;
  searchParams: Promise<{ query?: string }>;
}) {
  const { locale } = await params;
  const { query = "" } = await searchParams;

  setRequestLocale(locale);

  const t = await getTranslations("Blog");
  const isRtl = locale === "fa";

  const rawPosts = await getBlogPosts(locale);
  let posts: BlogPostType[] = mapBlogPosts(rawPosts, t);

  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery) {
    posts = posts.filter((p) =>
      [p.title, p.excerpt, p.category, p.author.name].some((v) =>
        v.toLowerCase().includes(normalizedQuery),
      ),
    );
  }

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="container sm:px-10 px-4 py-12 md:py-16 flex flex-col gap-10 mb-10"
    >
      <BlogHeaderSection locale={locale} t={t} />

      <BlogFeaturedPost locale={locale} featuredPost={featuredPost} />

      <BlogPosts locale={locale} t={t} posts={regularPosts} />

      <BlogNotFound isVisible={!posts.length} t={t} />
    </div>
  );
}
