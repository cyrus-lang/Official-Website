export type Heading = {
  title: string;
  level: number;
  children: Heading[];
};

export function parseHeadings(md: string): Heading[] {
  const lines = md.split("\n");

  const root: Heading[] = [];
  const stack: Heading[] = [];

  const headingRegex = /^(#+)\s*(.*)$/;

  for (const line of lines) {
    const match = line.match(headingRegex);
    if (!match) continue;

    const level = match[1].length;
    const title = match[2].trim();

    const node: Heading = { title, level, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  }
  return root;
}
