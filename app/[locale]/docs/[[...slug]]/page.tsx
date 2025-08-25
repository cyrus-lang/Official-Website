import fs from "fs/promises";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getContentBasePath } from "../base_path";
import { getMdxData } from "../mdx";
import { useMDXComponents } from "../../../../mdx-components";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";

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
  const joinedSlug = slugArray.join(path.sep); // Use path.sep for cross-platform compatibility

  // 1. Check for a direct MDX file (e.g., content/en-docs/tutorial/introduction.mdx)
  const directPath = path.join(contentBasePath, `${joinedSlug}.mdx`);
  try {
    await fs.access(directPath); // Check if file exists and is accessible
    return directPath;
  } catch (error) {
    // File doesn't exist or isn't accessible, continue to next check
  }

  // 2. Check for an index.mdx within a directory (e.g., content/en-docs/tutorial/introduction/index.mdx)
  const indexPath = path.join(contentBasePath, joinedSlug, "index.mdx");
  try {
    await fs.access(indexPath);
    return indexPath;
  } catch (error) {
    // Not found in either location
  }

  return null; // Document not found
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
    redirect(`/${locale}${DOCS_DEFAULT_PAGE}`);
  } else {
    filePath = await lookupDocumentContent(slug, locale);
  }

  if (!filePath) {
    return DocumentNotFoundComponent();
  }

  let mdxSource;

  try {
    const { content } = await getMdxData(filePath);
    mdxSource = content;
  } catch (error) {
    console.error(`Failed to read MDX file at ${filePath}:`, error);
    return DocumentNotFoundComponent();
  }

  return (
    <div className="prose lg:prose-xl sm:container mx-auto sm:px-0 px-2 py-5 pt-8 text-xl">
      <MDXRemote source={mdxSource} components={useMDXComponents({})} />
    </div>
  );
}
