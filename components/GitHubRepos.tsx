"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, GitFork, Star } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { GitHubRepo, languageColors } from "@/lib/github";

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );
  const intervals = [
    { label: "y", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
  ];
  for (const i of intervals) {
    const count = Math.floor(seconds / i.seconds);
    if (count >= 1) return `${count}${i.label} ago`;
  }
  return "just now";
}

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const langColor = repo.language
    ? languageColors[repo.language] || "#8b8b8b"
    : null;

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-[#0d0d0d] border border-white/5 rounded-xl p-5 hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Repo name */}
        <div className="flex items-center gap-2 mb-2">
          <GithubIcon
            size={14}
            className="text-gray-500 group-hover:text-accent transition-colors shrink-0"
          />
          <h4 className="text-white font-semibold text-sm group-hover:text-accent transition-colors truncate">
            {repo.name}
          </h4>
        </div>

        {/* Description */}
        {repo.description && (
          <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
            {repo.description}
          </p>
        )}
      </div>

      <div>
        {/* Footer: language + stats + time */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 pt-3 border-t border-white/5">
          <div className="flex items-center gap-3">
            {langColor && (
              <span className="flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: langColor }}
                />
                {repo.language}
              </span>
            )}
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-0.5">
                <Star size={11} />
                {repo.stargazers_count}
              </span>
            )}
          </div>
          <span className="font-mono">{timeAgo(repo.pushed_at)}</span>
        </div>

        {/* Live link if available */}
        {repo.homepage && (
          <div className="mt-2 pt-2 border-t border-white/5">
            <span className="flex items-center gap-1 text-accent text-[11px] font-mono">
              <ExternalLink size={11} />
              Live
            </span>
          </div>
        )}
      </div>
    </motion.a>
  );
}

export default function GitHubRepos({ repos }: { repos: GitHubRepo[] }) {
  if (repos.length === 0) return null;

  return (
    <div className="mt-14">
      <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">
        Explore More — Auto-synced from GitHub
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo, i) => (
          <RepoCard key={repo.id} repo={repo} index={i} />
        ))}
      </div>
      <p className="mt-4 text-center text-gray-600 text-xs font-mono">
        Auto-updated from{" "}
        <a
          href="https://github.com/DevarasettyKuldeep"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-light transition-colors"
        >
          github.com/DevarasettyKuldeep
        </a>
      </p>
    </div>
  );
}
