export type ContributorCategory = "Core Team" | "Website Team";

export type ContributorTag =
  | "Creator"
  | "Website Frontend"
  | "Compiler"
  | "Standard library";

export interface Contributor {
  id: number;
  name: string;
  nameFa?: string;
  category: ContributorCategory;
  tags: ContributorTag[];
  picture: string;
  github?: string;
  mastodon?: string;
  daramet?: string;
  linkedin?: string;
  email?: string;
  telegram?: string;
}
