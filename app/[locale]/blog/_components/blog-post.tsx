import Link from "next/link";
import { BlogPostType } from "../page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { TranslationProps } from "@/types/translation";

interface BlogPostProps extends TranslationProps {
  locale: "fa" | "en";
  post: BlogPostType;
}

export const BlogPost = ({ post, locale, t }: BlogPostProps) => {
  const isRtl = locale === "fa";

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group h-full">
      <Card className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-secondary transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl dark:bg-secondary/60">
        {/* IMAGE */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* HEADER */}
        <CardHeader className="space-y-3 p-6">
          <div className="flex items-center justify-between">
            <Badge className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
              {post.category}
            </Badge>

            <span className="text-xs text-muted-foreground">
              {post.readTime}
            </span>
          </div>

          <h3 className="line-clamp-2 text-lg font-extrabold leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary">
            {post.title}
          </h3>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="grow px-6 pb-0">
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="mt-auto p-6 pt-6">
          <div className="flex w-full items-center gap-3">
            <Avatar className="h-9 w-9 rounded-full ring-1 ring-border transition group-hover:ring-primary/40">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-primary/10">
                {post.author.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col text-xs leading-tight">
              <span className="font-semibold">
                {post.author.name}
              </span>
              <span className="text-muted-foreground">
                {post.date}
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className={`${isRtl ? "mr-auto" : "ml-auto"} rounded-full px-3 transition-all duration-300 group-hover:text-primary group-hover:bg-primary/5`}
            >
              {t("readButton")}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
