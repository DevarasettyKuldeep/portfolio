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
const GITHUB_ORG = "HackstreetBoyzz";

// Repos already showcased in the manual curated projects list
const CURATED_REPO_NAMES = new Set([
  "Spam-Email-Detection",
  "Mark-X",
  "Job-Tracker",
  "JobTracker",
  "Mark-I",
  "nitrostack",
  "Car-Dealership-Platform",
  "Hand-Tracking-using-MediaPipe-and-OpenCV",
  "Experimental-Operating-System-",
  "reconpilot",
  "render72_1",
  "render71_3",
  "render72_2",
  "portfolio",
  "DevarasettyKuldeep",
  "Autonomus-Robot-Navigation-System",
  "Autonomous-Robot-Navigation-System",
]);

// Friendly default descriptions for known repositories if GitHub description is empty
const REPO_FALLBACK_DESCRIPTIONS: Record<string, string> = {
  "campus-sarathi":
    "Campus Sarathi — mobile utility application built with Flutter & Dart for student services and campus navigation.",
  "Stock-Market-Trading-web-Application":
    "Nova Capital: Stock market portfolio web application featuring user authentication, virtual trading, transaction history, and financial metrics.",
  "simon_tatham_map_game":
    "Algorithm design benchmark comparing Greedy, Divide & Conquer, Dynamic Programming, and Backtracking strategies for map coloring problems.",
  "Cooperative-Map-Coloring-Divide-and-Conquer-Strategy":
    "Java Swing interactive visualization of the Map Coloring Constraint Satisfaction Problem (CSP) featuring human-AI cooperative game mechanics.",
  "Tatham-Map-Multi-Player":
    "Two-player cooperative map coloring game inspired by Simon Tatham's Map Puzzle, implemented with graph algorithms and constraint satisfaction.",
};

// High-quality fallback repositories if GitHub API is unreachable or rate-limited
export const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 87431201,
    name: "campus-sarathi",
    description:
      "Campus Sarathi — mobile utility application built with Flutter & Dart for student services and campus navigation.",
    html_url: "https://github.com/DevarasettyKuldeep/campus-sarathi",
    homepage: null,
    language: "Dart",
    stargazers_count: 0,
    fork: false,
    pushed_at: "2026-10-17T20:13:36Z",
    topics: ["flutter", "dart", "mobile-app"],
  },
  {
    id: 1011317816,
    name: "Stock-Market-Trading-web-Application",
    description:
      "Nova Capital: Stock market portfolio web app featuring virtual portfolio trading, transaction history, and market metrics.",
    html_url:
      "https://github.com/HackstreetBoyzz/Stock-Market-Trading-web-Application",
    homepage: null,
    language: "HTML",
    stargazers_count: 0,
    fork: false,
    pushed_at: "2026-04-13T14:13:31Z",
    topics: ["php", "mysql", "javascript", "finance"],
  },
  {
    id: 947261902,
    name: "simon_tatham_map_game",
    description:
      "Algorithm design benchmark comparing Greedy, Divide & Conquer, Dynamic Programming, and Backtracking strategies for map coloring problems.",
    html_url: "https://github.com/HackstreetBoyzz/simon_tatham_map_game",
    homepage: null,
    language: "Java",
    stargazers_count: 0,
    fork: false,
    pushed_at: "2026-03-12T09:54:32Z",
    topics: ["java", "algorithms", "graph-theory"],
  },
  {
    id: 934521789,
    name: "Cooperative-Map-Coloring-Divide-and-Conquer-Strategy",
    description:
      "Java Swing interactive visualization of the Map Coloring Constraint Satisfaction Problem (CSP) featuring human-AI cooperative game mechanics.",
    html_url:
      "https://github.com/HackstreetBoyzz/Cooperative-Map-Coloring-Divide-and-Conquer-Strategy",
    homepage: null,
    language: "Java",
    stargazers_count: 0,
    fork: false,
    pushed_at: "2026-02-18T10:07:49Z",
    topics: ["java", "swing", "csp", "graph-coloring"],
  },
  {
    id: 906234125,
    name: "Tatham-Map-Multi-Player",
    description:
      "Two-player cooperative map coloring game inspired by Simon Tatham's Map Puzzle, implemented with graph algorithms and constraint satisfaction.",
    html_url: "https://github.com/HackstreetBoyzz/Tatham-Map-Multi-Player",
    homepage: null,
    language: "Java",
    stargazers_count: 1,
    fork: false,
    pushed_at: "2025-12-22T04:38:08Z",
    topics: ["java", "game-development", "algorithms"],
  },
];

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-devarasettykuldeep",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, orgRes] = await Promise.allSettled([
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&direction=desc`,
        {
          headers,
          next: { revalidate: 900 }, // 15 mins ISR
        }
      ),
      fetch(
        `https://api.github.com/users/${GITHUB_ORG}/repos?per_page=100&sort=pushed&direction=desc`,
        {
          headers,
          next: { revalidate: 900 },
        }
      ),
    ]);

    const userRepos: GitHubRepo[] =
      userRes.status === "fulfilled" && userRes.value.ok
        ? await userRes.value.json()
        : [];

    const orgRepos: GitHubRepo[] =
      orgRes.status === "fulfilled" && orgRes.value.ok
        ? await orgRes.value.json()
        : [];

    const combined: GitHubRepo[] = [
      ...(Array.isArray(userRepos) ? userRepos : []),
      ...(Array.isArray(orgRepos) ? orgRepos : []),
    ];

    if (combined.length === 0) {
      return FALLBACK_REPOS;
    }

    const seenNames = new Set<string>();

    const filtered = combined
      .filter((repo) => {
        if (!repo || !repo.name) return false;
        if (repo.fork) return false;
        if (CURATED_REPO_NAMES.has(repo.name)) return false;
        if (repo.name.startsWith("render7")) return false;
        if (repo.name === ".github") return false;

        const lower = repo.name.toLowerCase();
        if (seenNames.has(lower)) return false;
        seenNames.add(lower);

        return true;
      })
      .map((repo) => ({
        ...repo,
        description:
          repo.description ||
          REPO_FALLBACK_DESCRIPTIONS[repo.name] ||
          "Open-source repository on GitHub.",
      }))
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );

    return filtered.length > 0 ? filtered : FALLBACK_REPOS;
  } catch {
    return FALLBACK_REPOS;
  }
}

// Language → color mapping for badges
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  Go: "#00ADD8",
  Ruby: "#701516",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  "Jupyter Notebook": "#DA5B0B",
};
