"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import SectionHeader from "./SectionHeader";
import { personal } from "@/data/personal";

export default function GitHubSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="GitHub"
          subtitle="Explore my repositories, contributions and open-source work."
        />

        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Personal GitHub */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0d0d0d] border border-white/5 rounded-xl p-6 hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-accent/10 transition-colors">
                    <GithubIcon
                      size={22}
                      className="text-gray-400 group-hover:text-accent transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      DevarasettyKuldeep
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      Personal Projects
                    </p>
                  </div>
                </div>
                <ExternalLink
                  size={16}
                  className="text-gray-600 group-hover:text-accent transition-colors"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI assistants, full-stack applications, MCP frameworks, computer
                vision and systems projects.
              </p>
            </a>

            {/* Organization GitHub */}
            <a
              href={personal.githubOrg}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0d0d0d] border border-white/5 rounded-xl p-6 hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-accent/10 transition-colors">
                    <GithubIcon
                      size={22}
                      className="text-gray-400 group-hover:text-accent transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      HackstreetBoyzz
                    </p>
                    <p className="text-gray-500 text-xs font-mono">
                      Team Projects
                    </p>
                  </div>
                </div>
                <ExternalLink
                  size={16}
                  className="text-gray-600 group-hover:text-accent transition-colors"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Collaborative projects including AI spam detection and
                autonomous robotics.
              </p>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
