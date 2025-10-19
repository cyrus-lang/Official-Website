import fs from "fs/promises";
import matter from "gray-matter";

/**
 * Reads frontmatter and content from an MDX file.
 * This function will now return both the frontmatter data and the content string (without frontmatter).
 * @param filePath The full path to the MDX file.
 * @returns An object containing the frontmatter data and the content string.
 */
type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  weight?: number;
  // add more fields as needed
};

export async function getMdxData(
  filePath: string
): Promise<{ frontmatter: Frontmatter; content: string }> {
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    // 'matter' returns 'data' for frontmatter and 'content' for the rest of the file
    const { data: frontmatter, content } = matter(fileContent);
    return { frontmatter, content };
  } catch (error) {
    console.error(`Error reading MDX data from ${filePath}:`, error);
    return { frontmatter: {}, content: "" }; // Return empty data on error
  }
}
