import { getContentBasePath } from "@/lib/get-content-base-path";
import path from "path";
import fs from "fs/promises";
/**
 * Looks up the full path to an MDX document based on a slug array and locale.
 * It searches for both a directory with an index.mdx and a direct .mdx file.
 * @param slugArray An array of path segments (e.g., ['tutorial', 'introduction'])
 * @param locale The current locale for content selection
 * @returns The full path to the MDX file or null if not found.
 */
export async function getDocPath(
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
