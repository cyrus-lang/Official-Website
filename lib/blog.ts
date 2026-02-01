import { BlogPostType } from "@/app/[locale]/blog/page";
import { Translation } from "@/types/translation";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface BlogFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  image: string;
  authorName: string;
  authorAvatar: string;
}

export interface BlogType {
  slug: string;
  metadata: BlogFrontmatter;
  content: string;
  readTime: string;
}

// Base directory for blogs
const BLOG_ROOT = path.join(process.cwd(), "content/blog");

export async function getBlogPosts(locale: "en" | "fa") {
  const localeDir = path.join(BLOG_ROOT, locale);

  // Ensure the directory exists to prevent crashing
  if (!fs.existsSync(localeDir)) return [];

  const files = fs.readdirSync(localeDir);

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(localeDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const words = content.split(/\s+/gu).length;
      const readTime = `${Math.ceil(words / 200)} min read`;

      return {
        slug: file.replace(".mdx", ""),
        metadata: data as BlogFrontmatter,
        content,
        readTime,
      };
    });

  return posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );
}

export async function getPostBySlug(slug: string, locale: "en" | "fa") {
  try {
    const filePath = path.join(BLOG_ROOT, locale, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      metadata: data as BlogFrontmatter,
      content,
    };
  } catch (error) {
    return null;
  }
}
export function mapBlogPosts(
  posts: BlogType[],
  t: Translation,
): BlogPostType[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    excerpt: post.metadata.excerpt,
    date: post.metadata.date,
    readTime: `${post.readTime} ${t("readTime")}`,
    category: post.metadata.category,
    image: post.metadata.image,
    author: {
      name: post.metadata.authorName,
      avatar: post.metadata.authorAvatar,
    },
  }));
}
