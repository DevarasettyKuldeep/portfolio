export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  pushed_at: string;
  topics: string[];
}

const GITHUB_USERNAME = "DevarasettyKuldeep";

// Repos already showcased in the manual curated projects list
const CURATED_REPO_NAMES = new Set([
  "Spam-Email-Detection", // org repo but listed
  "Mark-X",
  "Job-Tracker",
  "Mark-I",
  "nitrostack",
  "Car-Dealership-Platform",
  "Hand-Tracking-using-MediaPipe-and-OpenCV",
  "Experimental-Operating-System-",
  "reconpilot",
  "portfolio", // this portfolio itself
  "DevarasettyKuldeep", // profile README repo
]);

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&direction=desc`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // revalidate every hour on Vercel
      }
    );

    if (!res.ok) return [];

    const repos: GitHubRepo[] = await res.json();

    return repos
      .filter(
        (repo) =>
          !repo.fork &&
          !CURATED_REPO_NAMES.has(repo.name) &&
          repo.name !== ".github"
      )
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );
  } catch {
    return [];
  }
}

// Language → color mapping for badges
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00ADD8",
  Ruby: "#701516",
  "Jupyter Notebook": "#DA5B0B",
};
