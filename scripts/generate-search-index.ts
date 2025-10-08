const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

interface DocEntry {
  id: string;
  title: string;
  path: string;
  content: string;
  searchable: string;
  language: 'en' | 'fa';
  category: string;
  weight: number;
}

const contentDir: string = path.join(process.cwd(), 'content');
const outputPath: string = path.join(process.cwd(), 'public/search-index.json');

function extractFirstParagraphAfterHeader(body: string): string {
  const lines = body.split('\n');
  let foundHeader = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.match(/^#+ /)) {
      foundHeader = true;
      continue;
    }

    if (foundHeader && line && !line.match(/^#+ |!?\[.*\]\(.*\)|```|>/)) {
      const cleanParagraph = line
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(\*|_)(.*?)\1/g, '$2')
        .replace(/`([^`]+)`/g, '$1')
        .trim();

      if (cleanParagraph) {
        return cleanParagraph.length > 500
          ? cleanParagraph.substring(0, 500) + '...'
          : cleanParagraph;
      }
    }
  }

  return (
    body
      .replace(/`{3}[\s\S]*?`{3}/g, '') // remove code blocks
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\!\[[^\]]*\]\([^\)]*\)/g, '') // remove images
      .replace(/\[[^\]]*\]\([^\)]*\)/g, '$1') // keep link text
      .replace(/#+\s+/g, '')
      .replace(/\n\s*\n/g, ' ')
      .trim()
      .substring(0, 500) + '...'
  );
}

function headingWeightFromFilename(file: string): number {
  // Simple heuristic: introduction/overview/getting-started more important
  const lower = file.toLowerCase();
  if (/(introduction|getting-started|overview|hello-world)/.test(lower)) return 3;
  if (/(guide|tutorial|basics)/.test(lower)) return 2;
  return 1;
}

function generateIndex(): void {
  const languages: ('en' | 'fa')[] = ['en', 'fa'];
  const index: DocEntry[] = [];

  languages.forEach((lang) => {
    const docsDir: string = path.join(contentDir, `${lang}-docs`);
    const categories: string[] = fs.readdirSync(docsDir).filter((dir: any) =>
      fs.statSync(path.join(docsDir, dir)).isDirectory()
    );

    categories.forEach((category) => {
      const categoryPath: string = path.join(docsDir, category);
      const files: string[] = fs
        .readdirSync(categoryPath)
        .filter((file: string) => file.endsWith('.mdx'));

      files.forEach((file: string) => {
        const filePath: string = path.join(categoryPath, file);
        const content: string = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content: body } = matter(content) as {
          data: { title?: string; description?: string; weight?: number };
          content: string;
        };

        const title = frontmatter.title || file.replace('.mdx', '');
        const description = frontmatter.description || extractFirstParagraphAfterHeader(body);
        const baseWeight = headingWeightFromFilename(file);
        const fmWeight = typeof frontmatter.weight === 'number' ? frontmatter.weight : 0;
        const weight = baseWeight + fmWeight;

        const searchableText: string = `${title} ${description} ${body
          .replace(/`{3}[\s\S]*?`{3}/g, '')
          .replace(/`([^`]+)`/g, '$1')
          .replace(/\n\s*\n/g, ' ')
          .trim()}`;

        index.push({
          id: `${lang}-${category}-${file.replace('.mdx', '')}`,
          title,
          path: `/${lang}/docs/${category}/${file.replace('.mdx', '')}`,
          content: description,
          searchable: searchableText.toLowerCase(),
          language: lang,
          category: category,
          weight,
        });
      });
    });
  });

  // Sort by weight desc then title asc for determinism
  index.sort((a, b) => (b.weight - a.weight) || a.title.localeCompare(b.title));

  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
  console.log(`Search index generated with ${index.length} entries.`);
}

generateIndex();