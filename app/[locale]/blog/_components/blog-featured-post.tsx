import { Badge } from "@/components/ui/badge";
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
    <section className="mb-20">
      <Link
        href={`/${locale}/blog/${featuredPost.slug}`}
        className="group block"
      >
        <div className="relative grid gap-8 overflow-hidden rounded-3xl border border-border bg-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl md:grid-cols-2 md:p-10 dark:bg-secondary/60">
          {/* IMAGE */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center space-y-5">
            <div className="flex items-center gap-3">
              <Badge className="rounded-full bg-primary/90 px-3 py-1 text-primary-foreground">
                {featuredPost.category}
              </Badge>

              <span className="text-sm text-muted-foreground">
                {featuredPost.readTime}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight transition-colors duration-300 group-hover:text-primary md:text-4xl">
              {featuredPost.title}
            </h2>

            <p className="line-clamp-3 text-base leading-relaxed text-muted-foreground md:text-lg">
              {featuredPost.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-4 border-t border-border/60 pt-5">
              <Avatar className="h-11 w-11 rounded-full ring-2 ring-background transition group-hover:ring-primary/40">
                <AvatarImage src={featuredPost.author.avatar} />
                <AvatarFallback className="bg-primary/10">
                  {featuredPost.author.name[0]}
                </AvatarFallback>
              </Avatar>

              <div className="text-sm leading-tight">
                <p className="font-semibold">
                  {featuredPost.author.name}
                </p>
                <p className="text-muted-foreground">
                  {featuredPost.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};
