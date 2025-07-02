import path from "path";

export function getContentBasePath(locale: string = "en"): string {
  const langFolder = locale === "fa" ? "fa-docs" : "en-docs";
  return path.join(process.cwd(), "content", langFolder);
}

export const CONTENT_BASE_PATH = path.join(process.cwd(), "content", "en-docs");
