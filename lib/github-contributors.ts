import { contributorsArray } from "@/content/contributors/contributors-cards";

export interface GitHubContributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

const getTeamGithubUsernames = (): Set<string> => {
  const usernames = new Set<string>();

  for (const member of contributorsArray) {
    if (member.github) {
      const slug = member.github.replace(/\/+$/, "").split("/").pop();
      if (slug) usernames.add(slug.toLowerCase());
    }
    if (member.handle) {
      usernames.add(member.handle.replace(/^@/, "").toLowerCase());
    }
  }

  return usernames;
};

export async function getRepositoryContributors(): Promise<GitHubContributor[]> {
  const teamUsernames = getTeamGithubUsernames();
  const seenLogins = new Set<string>();
  const results: GitHubContributor[] = [];

  try {
    for (let page = 1; page <= 5; page++) {
      const res = await fetch(
        `https://api.github.com/repos/cyrus-lang/Cyrus/contributors?per_page=100&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "cyrus-lang-website",
          },
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(5000),
        }
      );

      if (!res.ok) break;

      const data: GitHubContributor[] = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;

      for (const contributor of data) {
        const loginLower = contributor.login?.toLowerCase();
        if (!loginLower) continue;
        if (contributor.type === "Bot" || loginLower.endsWith("[bot]")) continue;
        if (teamUsernames.has(loginLower)) continue;
        if (seenLogins.has(loginLower)) continue;

        seenLogins.add(loginLower);
        results.push(contributor);
      }

      if (data.length < 100) break;
    }
  } catch {
    return results;
  }

  return results;
}
