import MDXContent from "@/components/mdx-content";
import { ScrollToElement } from "@/components/scroll-to-element";
import { redirect } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { getAllDocPaths, getDocPath } from "@/lib/get-docs-path";
import { getMdxData } from "@/lib/get-mdx-data";
import { setRequestLocale } from "next-intl/server";
import { DEFAULT_DOCS_HREF } from "../_page";

interface ShowDocumentPageProps {
  params: Promise<{ slug?: string[]; locale: string }>;
}

export async function generateStaticParams() {
  const allPaths: Array<{ slug: string[] }> = [];

  for (const locale of locales) {
    const localePaths = await getAllDocPaths(locale);
    localePaths.forEach((p) => {
      allPaths.push({ slug: p.params.slug });
    });
  }

  return allPaths;
}

export default async function ShowDocumentPage({
  params,
}: ShowDocumentPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  if (!slug?.length) {
    redirect({ href: `/${DEFAULT_DOCS_HREF}`, locale });
  }
  const filePath = await getDocPath(slug!!, locale);
  if (!filePath) {
    return <div>Document not found</div>;
  }

  try {
    const { content } = await getMdxData(filePath);
    const relativePath = filePath.replace(`${process.cwd()}/`, "");

    return (
      <div className="px-1 py-5 pt-8 text-xl lg:mx-12 md:mx-6 sm:px-0">
        <MDXContent source={content} path={relativePath} />
        <ScrollToElement />
      </div>
    );
  } catch (error) {
    console.error(`Error loading MDX content from ${filePath}:`, error);
    return <div>Error loading document</div>;
  }
}
