export interface Contributor {
  id: number;
  name: string;
  nameFa?: string;
  title: "Creator" | "Contributor" | string;
  picture: string;
  github?: string;
  mastodon?: string;
  daramet?: string;
  linkedin?: string;
  email?: string;
  telegram?: string;
}
