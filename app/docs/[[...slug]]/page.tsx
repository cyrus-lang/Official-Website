import fs from 'fs/promises';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { DocsPage } from './index';
import { CONTENT_BASE_PATH } from '../base_path';

function DocumentNotFoundComponent() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Document Not Found</h1>
      <p>The document you are looking for does not exist.</p>
    </div>
  );
}

/**
 * Looks up the full path to an MDX document based on a slug array.
 * It searches for both a directory with an index.mdx and a direct .mdx file.
 * @param slugArray An array of path segments (e.g., ['tutorial', 'introduction'])
 * @returns The full path to the MDX file or null if not found.
 */
async function lookupDocumentContent(slugArray: string[]): Promise<string | null> {
  const joinedSlug = slugArray.join(path.sep); // Use path.sep for cross-platform compatibility

  // 1. Check for a direct MDX file (e.g., docs/tutorial/introduction.mdx)
  const directPath = path.join(CONTENT_BASE_PATH, `${joinedSlug}.mdx`);
  try {
    await fs.access(directPath); // Check if file exists and is accessible
    return directPath;
  } catch (error) {
    // File doesn't exist or isn't accessible, continue to next check
  }

  // 2. Check for an index.mdx within a directory (e.g., docs/tutorial/introduction/index.mdx)
  const indexPath = path.join(CONTENT_BASE_PATH, joinedSlug, 'index.mdx');
  try {
    await fs.access(indexPath);
    return indexPath;
  } catch (error) {
    // Not found in either location
  }

  return null; // Document not found
}

export default async function ShowDocumentPage({ params }: {
  params: { slug?: string[] }
}) {
  const slug = params.slug || [];

  let filePath: string | null = null;
  if (slug.length === 0) {
    return DocsPage();
  } else {
    filePath = await lookupDocumentContent(slug);
  }

  if (!filePath) {
    return DocumentNotFoundComponent();
  }

  let mdxSource;
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    mdxSource = fileContent; // Just the content, MDXRemote will parse it
  } catch (error) {
    console.error(`Failed to read MDX file at ${filePath}:`, error);
    return DocumentNotFoundComponent();
  }

  return (
    <article className="prose lg:prose-xl mx-auto py-8">
      <MDXRemote source={mdxSource} />
    </article>
  );
}