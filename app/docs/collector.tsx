import fs from 'fs/promises';
import path from 'path';
import { CONTENT_BASE_PATH } from './base_path';
import { DocNavItem } from '@/app/types/doc_nav_item';

/**
 * Normalizes a file or directory name into a human-readable title.
 * You might want to enhance this (e.g., read from MDX frontmatter).
 */
function slugToTitle(slug: string): string {
    // Replace hyphens with spaces and capitalize each word
    return slug
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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
        return []; // Return empty if directory not found or inaccessible
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

    // Handle the 'index.mdx' file first if it exists in the current directory
    const indexMdxFile = files.find(file => file === 'index.mdx');
    if (indexMdxFile) {
        // This represents the current directory's main page
        const itemSlug = currentSlug === '' ? '' : currentSlug; // For root 'docs', slug is ''
        items.push({
            title: currentSlug === '' ? 'Documentation Home' : slugToTitle(path.basename(currentSlug)), // Or parse from MDX frontmatter for better titles
            slug: itemSlug,
            path: path.join(currentPath, indexMdxFile),
            type: 'file',
        });
    }

    // Process subdirectories
    for (const dirName of directories.sort()) { // Sort for consistent order
        const dirPath = path.join(currentPath, dirName);
        const newSlug = currentSlug ? `${currentSlug}/${dirName}` : dirName;
        const children = await getDocsNavigation(dirPath, newSlug);

        // Only add a directory if it has an index.mdx or other content
        if (children.length > 0) {
            // If the directory has an index.mdx, its content is already added as a 'file' item above
            // We still want a directory entry to act as a parent for its children
            // The `slug` for the directory itself will point to its `index.mdx` if available.
            const dirIndexFileExists = children.some(child => child.slug === newSlug && child.type === 'file');

            items.push({
                title: slugToTitle(dirName),
                slug: newSlug, // This slug will point to the directory's index.mdx if it exists
                path: dirPath, // Path to the directory
                type: 'directory',
                children: children.filter(child => child.slug !== newSlug), // Filter out the index.mdx content which is already captured as the directory's main entry
            });
        }
    }

    // Process remaining MDX files (excluding index.mdx, which was handled)
    for (const fileName of files.sort()) { // Sort for consistent order
        if (fileName === 'index.mdx') continue; // Skip as already handled

        const fileSlug = fileName.replace(/\.mdx$/, ''); // Remove .mdx extension
        const fullItemSlug = currentSlug ? `${currentSlug}/${fileSlug}` : fileSlug;

        items.push({
            title: slugToTitle(fileSlug),
            slug: fullItemSlug,
            path: path.join(currentPath, fileName),
            type: 'file',
        });
    }

    // Basic sorting: directories first, then files, both alphabetically by title
    items.sort((a, b) => {
        if (a.type === 'directory' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'directory') return 1;
        return a.title.localeCompare(b.title);
    });

    return items;
}