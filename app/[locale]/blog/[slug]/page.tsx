import { RouteReadySignal } from "@/components/route-ready-signal";
import { getMDXComponents } from "@/lib/get-mdx";
import { getPostBySlug, getBlogPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

// Define the supported locales
const locales = ["en", "fa"] as const;

export async function generateStaticParams() {
  let allParams: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = await getBlogPosts(locale);
    const params = posts.map((post) => ({ 
      locale: locale, 
      slug: post.slug 
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
  
  // Required for next-intl static rendering
  setRequestLocale(locale);

  // Fetch post based on slug AND locale
  const post = await getPostBySlug(slug, locale);

  if (!post) notFound();

  const components = await getMDXComponents();
  const isRtl = locale === "fa";

  return (
    <article 
      dir={isRtl ? "rtl" : "ltr"} 
      className={`container mx-auto max-w-3xl py-12 px-6 ${isRtl ? "font-vazir" : ""}`}
    >
      <RouteReadySignal />
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          {post.metadata.title}
        </h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <time dateTime={post.metadata.date}>{post.metadata.date}</time>
          <span>•</span>
          <span>{post.metadata.category}</span>
        </div>
      </header>

      {/* The 'prose' class from Tailwind Typography handles Markdown styling */}
      <div className={`prose prose-neutral dark:prose-invert max-w-none 
        ${isRtl ? "prose-headings:font-bold" : ""}`}>
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}