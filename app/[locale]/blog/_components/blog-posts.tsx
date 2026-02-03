import { TranslationProps } from "@/types/translation";
import { BlogPostType } from "../page";
import { BlogPost } from "./blog-post";

interface BlogPostsProps extends TranslationProps {
  posts: BlogPostType[];
  locale: "fa" | "en";
}
export const BlogPosts = ({ posts, locale, t }: BlogPostsProps) => {
  if (posts.length) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPost locale={locale} t={t} post={post} key={post.slug} />
        ))}
      </div>
    );
  }
};
