import MDXContent from "@/components/mdx-content";
import { ScrollToElement } from "@/components/scroll-to-element";
import { redirect } from "@/i18n/navigation";
import fs from "fs/promises";
import { getLocale, getTranslations } from "next-intl/server";
import path from "path";
import { getContentBasePath } from "../base_path";
import { getMdxData } from "../mdx";

const DOCS_DEFAULT_PAGE = "/docs/getting-started/introduction";

async function DocumentNotFoundComponent() {
  const t = await getTranslations("DocsError.notFound");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}

/**
 * Looks up the full path to an MDX document based on a slug array and locale.
 * It searches for both a directory with an index.mdx and a direct .mdx file.
 * @param slugArray An array of path segments (e.g., ['tutorial', 'introduction'])
 * @param locale The current locale for content selection
 * @returns The full path to the MDX file or null if not found.
 */
async function lookupDocumentContent(
  slugArray: string[],
  locale: string
): Promise<string | null> {
  const contentBasePath = getContentBasePath(locale);
  const joinedSlug = slugArray.join(path.sep);
  const directPath = path.join(contentBasePath, `${joinedSlug}.mdx`);
  try {
    await fs.access(directPath);
    return directPath;
  } catch (error) {
    console.error(error);
  }
  const indexPath = path.join(contentBasePath, joinedSlug, "index.mdx");
  try {
    await fs.access(indexPath);
    return indexPath;
  } catch (error) {
    console.error(error);
  }

  return null;
}

export default async function ShowDocumentPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const locale = await getLocale();
  const slug = params.slug || [];
  let filePath: string | null = null;
  if (slug.length === 0) {
    redirect({ href: `${DOCS_DEFAULT_PAGE}`, locale });
  } else {
    filePath = await lookupDocumentContent(slug, locale);
  }

  if (!filePath) {
    return DocumentNotFoundComponent();
  }

  let mdxSource;
  const relativeContentPath = filePath.replace(process.cwd() + "/", "");

  try {
    const { content } = await getMdxData(filePath);
    mdxSource = content;
  } catch (error) {
    console.error(`Failed to read MDX file at ${filePath}:`, error);
    return DocumentNotFoundComponent();
  }
  return (
    <div className="prose lg:prose-xl sm:container mx-auto sm:px-0 px-1 py-5 pt-8 text-xl">
      <MDXContent source={mdxSource} />
      <ScrollToElement />
      <div className="mt-8 flex justify-end">
        <a
          className="text-sm text-primary hover:underline"
          href={`https://github.com/cyrus-lang/Official-Website/edit/v2/${relativeContentPath}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit this page on GitHub
        </a>
      </div>
    </div>
  );
}
