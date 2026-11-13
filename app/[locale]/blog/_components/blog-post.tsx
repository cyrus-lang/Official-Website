import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogPostType } from "../page";
import { TranslationProps } from "@/types/translation";

interface BlogPostProps extends TranslationProps {
  locale: "fa" | "en";
  post: BlogPostType;
}

export const BlogPost = ({ post, locale, t }: BlogPostProps) => {
  const isRtl = locale === "fa";

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
      <article className="bg-background rounded-xl shadow-xs border overflow-hidden flex flex-col justify-between hover:border-primary/50 transition-all duration-300 h-full">
        <div>
          <div className="relative aspect-video w-full overflow-hidden bg-muted border-b border-border/60">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>

          <div className="p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-md border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {post.readTime}
              </span>
            </div>

            <h3 className="line-clamp-2 text-xl font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            <p className="line-clamp-3 text-sm md:text-base leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-6 pb-5 pt-4 border-t border-border/60 mt-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar className="h-8 w-8 rounded-full overflow-hidden border bg-muted shrink-0">
              <AvatarImage
                src={post.author.avatar}
                alt={post.author.name}
                className="h-full w-full object-cover"
              />
              <AvatarFallback className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-medium text-primary">
                {post.author.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col text-xs leading-snug min-w-0">
              <span className="font-semibold text-foreground truncate">
                {post.author.name}
              </span>
              <span className="text-muted-foreground">{post.date}</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors shrink-0">
            {t("readButton")}
            {isRtl ? (
              <ArrowLeft className="h-3.5 w-3.5" />
            ) : (
              <ArrowRight className="h-3.5 w-3.5" />
            )}
          </span>
        </div>
      </article>
    </Link>
  );
};
