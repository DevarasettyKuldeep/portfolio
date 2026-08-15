"use client";

import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { personal } from "@/data/personal";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-white text-sm">
              Kuldeep<span className="text-accent">.</span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-500 text-xs font-mono">
              Computer Science Engineer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-accent hover:bg-white/5 rounded-lg transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-accent hover:bg-white/5 rounded-lg transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
          </div>

          <p className="font-mono text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Kuldeep Devarasetty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
