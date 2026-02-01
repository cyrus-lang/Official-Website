import { getTranslations, setRequestLocale } from "next-intl/server";

import { getBlogPosts, mapBlogPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";
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
  const { query } = await searchParams;

  setRequestLocale(locale);

  const t = await getTranslations("Blog");
  const isRtl = locale === "fa";

  const rawPosts = await getBlogPosts(locale);
  let posts: BlogPostType[] = mapBlogPosts(rawPosts, t);

  if (query) {
    const q = query.toLowerCase();
    posts = posts.filter((p) =>
      [p.title, p.excerpt, p.category].some((v) => v.toLowerCase().includes(q)),
    );
  }

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "container min-h-screen w-full mb-20 mt-10",
        isRtl && "font-vazir *:font-vazir **:font-vazir",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <BlogHeaderSection locale={locale} t={t} />

        <BlogFeaturedPost locale={locale} featuredPost={featuredPost} />

        <BlogPosts locale={locale} t={t} posts={regularPosts} />

        <BlogNotFound isVisible={!posts.length} t={t} />
      </div>
    </main>
  );
}
