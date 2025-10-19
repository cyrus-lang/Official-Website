import MDXContent from "@/components/mdx-content";
import { getMdxData } from "@/lib/get-mdx-data";
import { getAllDocPaths, getDocPath } from "@/lib/get-docs-path";
import { redirect } from "next/navigation";
import { locales } from "@/i18n/routing";

export const DOCS_DEFAULT_PAGE = "/docs/getting-started/introduction";

interface ShowDocumentPageProps {
  params: { slug?: string[] };
  searchParams?: { locale?: string };
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
  searchParams,
}: ShowDocumentPageProps) {
  const slug = params.slug ?? [];
  const locale = searchParams?.locale ?? "en";
  if (slug.length === 0) {
    redirect(DOCS_DEFAULT_PAGE);
  }

  const filePath = await getDocPath(slug, locale);
  if (!filePath) {
    return <div>Document not found</div>;
  }

  try {
    const { content } = await getMdxData(filePath);
    const relativePath = filePath.replace(`${process.cwd()}/`, "");

    return (
      <div className="prose lg:prose-xl sm:container mx-auto sm:px-0 px-1 py-5 pt-8 text-xl">
        <MDXContent source={content} />
        <div className="mt-8 flex justify-end">
          <a
            className="text-sm text-primary hover:underline"
            href={`https://github.com/cyrus-lang/Official-Website/edit/v2/${relativePath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Edit this page on GitHub
          </a>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error loading MDX content from ${filePath}:`, error);
    return <div>Error loading document</div>;
  }
}

export const dynamic = "force-static";
