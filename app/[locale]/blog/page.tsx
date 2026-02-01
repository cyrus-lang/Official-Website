import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { getBlogPosts } from "@/lib/blog";

type BlogPost = {
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
}: {
  params: Promise<{ locale: "en" | "fa" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // load translations for the Blog namespace
  const t = await getTranslations("Blog");
  const isRtl = locale === "fa";

  const rawPosts = await getBlogPosts(locale);

  const posts: BlogPost[] = rawPosts.map((post) => ({
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

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className={`min-h-screen w-full bg-background pb-20 pt-10 ${isRtl ? "font-vazir" : ""}`}>
      <div className="container mx-auto px-4 md:px-6">

        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className={`space-y-2 text-center ${isRtl ? "md:text-right" : "md:text-left"}`}>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              {locale === "en" ? (
                <>Our <span className="text-primary">Blog</span></>
              ) : (
                <><span className="text-primary">وبلاگ</span> ما</>
              )}
            </h1>
            <p className="text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          <div className="relative w-full max-w-sm">
            <Search className={`absolute ${isRtl ? "right-3" : "left-3"} top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground`} />
            <Input
              placeholder={t("searchPlaceholder")}
              className={`${isRtl ? "pr-10" : "pl-10"} rounded-full `}
            />
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <Link href={`/${locale}/blog/${featuredPost.slug}`} className="group block">
              <div className="grid gap-8 overflow-hidden rounded-md bg-secondary/20 border border-border p-6 md:grid-cols-2 md:p-10 transition-all hover:border-primary/50 hover:shadow-lg">
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl md:aspect-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="default" className="rounded-full px-3 py-1">
                      {featuredPost.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground text-lg line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-3 pt-4">
                    <Avatar className="h-10 w-10 border-2 border-background">
                      <AvatarImage src={featuredPost.author.avatar} />
                      <AvatarFallback>{featuredPost.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{featuredPost.author.name}</p>
                      <p className="text-muted-foreground">{featuredPost.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Regular Posts Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group h-full">
              <Card className="h-full flex flex-col overflow-hidden rounded-md border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50">
                <div className="aspect-16/10 w-full overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <CardHeader className="space-y-2 p-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="rounded-full font-normal text-primary bg-primary/10 hover:bg-primary/20">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </CardHeader>

                <CardContent className="px-6 pb-0 grow">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="p-6 pt-6 mt-auto">
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-xs">
                      <span className="font-medium">{post.author.name}</span>
                      <span className="text-muted-foreground">{post.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" className={`${isRtl ? "mr-auto" : "ml-auto"} rounded-full group-hover:text-primary`}>
                      {t("readButton")}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="w-full text-center py-20 bg-secondary/20 rounded-3xl">
            <p className="text-muted-foreground">{t("emptyState")}</p>
          </div>
        )}
      </div>
    </main>
  );
}