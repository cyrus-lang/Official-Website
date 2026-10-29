import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type DonationKind = "financial" | "non-financial";

export interface DonationFrontmatter {
  title: string;
  sponsor: string;
  kind: DonationKind;
  date?: string;
  value?: string;
  summary?: string;
  logo?: string;
  url?: string;
}

export interface Donation {
  slug: string;
  metadata: DonationFrontmatter;
  content: string;
}

const SPONSORS_ROOT = path.join(process.cwd(), "content/sponsors");

function getLocaleDir(locale: "en" | "fa") {
  const localeDir = path.join(SPONSORS_ROOT, locale);
  return fs.existsSync(localeDir) ? localeDir : path.join(SPONSORS_ROOT, "en");
}

export async function getDonations(locale: "en" | "fa"): Promise<Donation[]> {
  const localeDir = getLocaleDir(locale);

  if (!fs.existsSync(localeDir)) return [];

  const donations = fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => {
      const fileContent = fs.readFileSync(path.join(localeDir, file), "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug: file.replace(".mdx", ""),
        metadata: data as DonationFrontmatter,
        content,
      };
    });

  const time = (donation: Donation) =>
    donation.metadata.date ? new Date(donation.metadata.date).getTime() : 0;

  return donations.sort((a, b) => time(b) - time(a));
}

export async function getDonationBySlug(slug: string, locale: "en" | "fa") {
  const donations = await getDonations(locale);
  return donations.find((donation) => donation.slug === slug) ?? null;
}

export function getSponsorLogos(donations: Donation[]) {
  const logos = new Map<string, { name: string; logo: string; url?: string }>();

  for (const { metadata } of donations) {
    if (metadata.logo && !logos.has(metadata.sponsor)) {
      logos.set(metadata.sponsor, {
        name: metadata.sponsor,
        logo: metadata.logo,
        url: metadata.url,
      });
    }
  }

  return [...logos.values()];
}
