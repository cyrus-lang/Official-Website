// collector.ts (or docs.ts)
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { CONTENT_BASE_PATH } from './base_path';
import { DocNavItem } from '@/app/types/doc_nav_item';

/**
 * Normalizes a file or directory name into a human-readable title.
 * This function will be a fallback if no title is provided in frontmatter.
 */
function slugToTitle(slug: string): string {
    // Special case for the root 'docs' path, if its index.mdx is meant to be "Documentation Home"
    if (slug === '') return 'Documentation Home';

    return slug
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Reads frontmatter from an MDX file.
 * @param filePath The full path to the MDX file.
 * @returns An object containing the frontmatter data.
 */
async function getMdxFrontmatter(filePath: string): Promise<{ [key: string]: any }> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data: frontmatter } = matter(fileContent);
        return frontmatter;
    } catch (error) {
        console.error(`Error reading frontmatter from ${filePath}:`, error);
        return {};
    }
}

/**
 * Recursively scans the documentation directory and builds a nested navigation structure.
 * @param currentPath The current file system path being scanned.
 * @param currentSlug The current URL slug path being built (e.g., 'tutorial/introduction').
 * @returns A promise resolving to an array of DocNavItem.
 */
export async function getDocsNavigation(
    currentPath: string = CONTENT_BASE_PATH,
    currentSlug: string = ''
): Promise<DocNavItem[]> {
    const items: DocNavItem[] = [];
    let dirents;

    try {
        dirents = await fs.readdir(currentPath, { withFileTypes: true });
    } catch (error) {
        console.error(`Error reading directory: ${currentPath}`, error);
        return [];
    }

    // Separate directories and files for ordered processing
    const directories: string[] = [];
    const files: string[] = [];

    for (const dirent of dirents) {
        if (dirent.isDirectory()) {
            directories.push(dirent.name);
        } else if (dirent.isFile() && dirent.name.endsWith('.mdx')) {
            files.push(dirent.name);
        }
    }

    // --- 1. Determine the "main" file for the current directory (index.mdx or [dirName].mdx) ---
    const dirName = path.basename(currentPath); // Get the current directory's actual name
    const dirNamedMdxFile = `${dirName}.mdx`;

    let mainMdxFileName: string | undefined;

    // Prioritize index.mdx
    if (files.includes('index.mdx')) {
        mainMdxFileName = 'index.mdx';
    } else if (files.includes(dirNamedMdxFile)) {
        // Fallback to directory-named MDX if index.mdx doesn't exist
        mainMdxFileName = dirNamedMdxFile;
    }

    let mainFileItem: DocNavItem | undefined;
    let fileToExcludeFromChildren: string | undefined; // To prevent duplication

    if (mainMdxFileName) {
        const filePath = path.join(currentPath, mainMdxFileName);
        const frontmatter = await getMdxFrontmatter(filePath);

        const itemSlug = currentSlug; // The slug for the directory's main page is the directory's slug itself

        const title = frontmatter.title || slugToTitle(currentSlug);
        const weight = frontmatter.weight || 9999;

        mainFileItem = {
            title: title,
            slug: itemSlug,
            path: filePath,
            type: 'file', // Treat this as a 'file' type in the items array for direct access
            weight: weight,
        };
        items.push(mainFileItem);
        fileToExcludeFromChildren = mainMdxFileName;
    }

    // --- 2. Process subdirectories ---
    // Sort directories alphabetically by name first for consistent order before recursion
    for (const dirNameEntry of directories.sort()) { // Renamed dirName to dirNameEntry to avoid clash
        const dirPath = path.join(currentPath, dirNameEntry);
        const newSlug = currentSlug ? `${currentSlug}/${dirNameEntry}` : dirNameEntry;

        // Recursively get children for the subdirectory
        const children = await getDocsNavigation(dirPath, newSlug);

        // Find the main file item (index.mdx or [dirName].mdx) of the *child directory*
        const childMainDoc = children.find(child => child.slug === newSlug && child.type === 'file');
        
        if (children.length > 0) {
            items.push({
                title: childMainDoc?.title || slugToTitle(dirNameEntry), // Use main doc title if available, else derive
                slug: newSlug,
                path: dirPath,
                type: 'directory',
                // Filter out the main doc file if it was already included as a 'file' item within children
                children: children.filter(child => !(child.slug === newSlug && child.type === 'file')),
                weight: childMainDoc?.weight || 9999, // Use main doc weight for directory sorting, else default
            });
        }
    }

    // --- 3. Process remaining MDX files (excluding the 'main' file if one was identified) ---
    // Sort files alphabetically by name first for consistent order before content parsing
    for (const fileName of files.sort()) {
        if (fileName === fileToExcludeFromChildren) continue; // Skip the main file if it was processed

        const filePath = path.join(currentPath, fileName);
        const frontmatter = await getMdxFrontmatter(filePath); // Use the helper

        const fileSlug = fileName.replace(/\.mdx$/, '');
        const fullItemSlug = currentSlug ? `${currentSlug}/${fileSlug}` : fileSlug;

        const title = frontmatter.title || slugToTitle(fileSlug);
        const weight = frontmatter.weight || 9999;

        items.push({
            title: title,
            slug: fullItemSlug,
            path: filePath,
            type: 'file',
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

        // Fallback: directories before files (this might be less relevant if main files for dirs are handled as 'file' types at their level)
        // Re-evaluating this order for (items, directory) pairs:
        // A common pattern is that the directory's main page (the 'file' item for the directory's slug)
        // should appear first, followed by child directories, then by other individual files.
        // Let's refine this to place the "main" file (if exists and matches directory slug) first
        // among files, and directories before other files.

        // If 'a' is the main file for the current directory's slug, it should come first.
        // This implicitly assumes the main file's slug matches the current directory's slug.
        const aIsMainFile = a.type === 'file' && a.slug === currentSlug;
        const bIsMainFile = b.type === 'file' && b.slug === currentSlug;

        if (aIsMainFile && !bIsMainFile) return -1; // 'a' comes first
        if (!aIsMainFile && bIsMainFile) return 1;  // 'b' comes first

        // Then, directories before other files
        if (a.type === 'directory' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'directory') return 1;

        // Finally, secondary fallback: alphabetical sort by title
        return a.title.localeCompare(b.title);
    });

    return items;
}