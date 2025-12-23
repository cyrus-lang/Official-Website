"use server";
// collector.ts (or docs.ts)
import path from "path";
import fs from "fs/promises";
import { getContentBasePath } from "./get-content-base-path";
import { DocNavItem } from "@/types/doc-nav-item";
import { getMdxData } from "@/lib/get-mdx-data";

/**
 * Normalizes a file or directory name into a human-readable title.
 * This function will be a fallback if no title is provided in frontmatter.
 */
function slugToTitle(slug: string): string {
  // Special case for the root 'docs' path
  if (slug === "") return "Documentation Home";

  return slug
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Recursively scans the documentation directory and builds a nested navigation structure.
 * @param currentPath The current file system path being scanned.
 * @param currentSlug The current URL slug path being built (e.g., 'tutorial/introduction').
 * @param locale The current locale for content selection.
 * @returns A promise resolving to an array of DocNavItem.
 */
export async function getDocsNavigation(
  currentPath?: string,
  currentSlug: string = "",
  locale: string = "en"
): Promise<DocNavItem[]> {
  // Use the appropriate content path based on locale
  const basePath = currentPath || getContentBasePath(locale);
  const items: DocNavItem[] = [];
  let dirents;

  try {
    dirents = await fs.readdir(basePath, { withFileTypes: true });
  } catch (error) {
    console.error(`Error reading directory: ${basePath}`, error);
    return [];
  }

  // Separate directories and files for ordered processing
  const directories: string[] = [];
  const files: string[] = [];

  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      directories.push(dirent.name);
    } else if (dirent.isFile() && dirent.name.endsWith(".mdx")) {
      files.push(dirent.name);
    }
  }

  // --- 1. Determine the "main" file for the current directory (index.mdx or [dirName].mdx) ---
  const dirName = path.basename(basePath);
  const dirNamedMdxFile = `${dirName}.mdx`;

  let mainMdxFileName: string | undefined;

  // Prioritize index.mdx
  if (files.includes("index.mdx")) {
    mainMdxFileName = "index.mdx";
  } else if (files.includes(dirNamedMdxFile)) {
    // Fallback to directory-named MDX if index.mdx doesn't exist
    mainMdxFileName = dirNamedMdxFile;
  }

  let fileToExcludeFromChildren: string | undefined; // To prevent duplication

  if (mainMdxFileName) {
    const filePath = path.join(basePath, mainMdxFileName);
    const { frontmatter, content } = await getMdxData(filePath); // Use getMdxData to get content

    const itemSlug = currentSlug; // The slug for the directory's main page is the directory's slug itself

    const title = frontmatter.title || slugToTitle(currentSlug);
    const weight = frontmatter.weight || 9999;

    items.push({
      title: title,
      slug: itemSlug,
      path: filePath,
      type: "file",
      weight: weight,
      content: content, // Now the DocNavItem includes the clean content
    });
    fileToExcludeFromChildren = mainMdxFileName;
  }

  // --- 2. Process subdirectories ---
  // Sort directories alphabetically by name first for consistent order before recursion
  for (const dirNameEntry of directories.sort()) {
    const dirPath = path.join(basePath, dirNameEntry);
    const newSlug = currentSlug
      ? `${currentSlug}/${dirNameEntry}`
      : dirNameEntry;

    // Recursively get children for the subdirectory
    const children = await getDocsNavigation(dirPath, newSlug, locale);

    // Find the main file item (index.mdx or [dirName].mdx) of the *child directory*
    const childMainDoc = children.find(
      (child) => child.slug === newSlug && child.type === "file"
    );

    if (children.length > 0) {
      const title = childMainDoc?.title || slugToTitle(dirNameEntry); // Use main doc title if available, else derive

      items.push({
        title: title,
        slug: newSlug,
        path: dirPath,
        type: "directory",
        // Filter out the main doc file if it was already included as a 'file' item within children
        children: children.filter(
          (child) => !(child.slug === newSlug && child.type === "file")
        ),
        weight: childMainDoc?.weight || 9999, // Use main doc weight for directory sorting, else default
      });
    }
  }

  // --- 3. Process remaining MDX files (excluding the 'main' file if one was identified) ---
  // Sort files alphabetically by name first for consistent order before content parsing
  for (const fileName of files.sort()) {
    if (fileName === fileToExcludeFromChildren) continue; // Skip the main file if it was processed

    const filePath = path.join(basePath, fileName);
    const { frontmatter } = await getMdxData(filePath);

    const fileSlug = fileName.replace(/\.mdx$/, "");
    const fullItemSlug = currentSlug ? `${currentSlug}/${fileSlug}` : fileSlug;

    const title = frontmatter.title || slugToTitle(fileSlug);
    const weight = frontmatter.weight || 9999;

    items.push({
      title: title,
      slug: fullItemSlug,
      path: filePath,
      type: "file",
      weight: weight,
    });
  }

  // --- Final Sorting Logic for the current level's items ---
  items.sort((a, b) => {
    // Prioritize items with explicit weights
    if (a.weight !== undefined && b.weight !== undefined) {
      if (a.weight !== b.weight) {
        return a.weight - b.weight;
      }
    }

    // If 'a' is the main file for the current directory's slug, it should come first.
    const aIsMainFile = a.type === "file" && a.slug === currentSlug;
    const bIsMainFile = b.type === "file" && b.slug === currentSlug;

    if (aIsMainFile && !bIsMainFile) return -1;
    if (!aIsMainFile && bIsMainFile) return 1;

    // Then, directories before other files
    if (a.type === "directory" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "directory") return 1;

    // Finally, secondary fallback: alphabetical sort by title
    return a.title.localeCompare(b.title);
  });

  return items;
}
