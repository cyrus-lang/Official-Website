import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { BlogPostType } from "../page";

interface BlogFeaturedPostProps {
  featuredPost: BlogPostType;
  locale: "fa" | "en";
}

export const BlogFeaturedPost = ({
  featuredPost,
  locale,
}: BlogFeaturedPostProps) => {
  if (!featuredPost) return null;

  return (
    <section>
      <Link
        href={`/${locale}/blog/${featuredPost.slug}`}
        className="group block"
      >
        <article className="grid md:grid-cols-2 overflow-hidden rounded-xl border bg-background shadow-xs hover:border-primary/50 transition-all duration-300">
          <div className="relative aspect-video md:aspect-auto md:min-h-[300px] w-full overflow-hidden bg-muted border-b md:border-b-0 md:ltr:border-r md:rtl:border-l border-border/60">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>

          <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-md border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {featuredPost.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>

              <p className="line-clamp-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border/60">
              <Avatar className="h-9 w-9 rounded-full overflow-hidden border bg-muted shrink-0">
                <AvatarImage
                  src={featuredPost.author.avatar}
                  alt={featuredPost.author.name}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-medium text-primary">
                  {featuredPost.author.name[0]}
                </AvatarFallback>
              </Avatar>

              <div className="text-xs leading-snug">
                <p className="font-semibold text-foreground">
                  {featuredPost.author.name}
                </p>
                <p className="text-muted-foreground">{featuredPost.date}</p>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </section>
  );
};
