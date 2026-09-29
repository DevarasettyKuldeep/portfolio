"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-[#0d0d0d] border border-white/10 rounded-t-2xl md:rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div>
              <span className="font-mono text-accent text-xs tracking-wider">
                {project.category}
              </span>
              <h3 className="text-white text-xl font-bold mt-1">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-8">
            {/* Description */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                <ChevronRight size={14} className="text-accent" />
                Overview
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.detailedDescription}
              </p>
            </div>

            {/* Problem */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                <ChevronRight size={14} className="text-accent" />
                Problem
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Approach */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                <ChevronRight size={14} className="text-accent" />
                Approach
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.approach}
              </p>
            </div>

            {/* Architecture */}
            {project.architecture && (
              <div>
                <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <ChevronRight size={14} className="text-accent" />
                  Architecture
                </h4>
                <div className="bg-[#080808] border border-white/5 rounded-lg p-4 font-mono text-sm text-accent/80 whitespace-pre leading-relaxed overflow-x-auto">
                  {project.architecture}
                </div>
                {project.architectureAlt && (
                  <div className="bg-[#080808] border border-white/5 rounded-lg p-4 font-mono text-sm text-accent/80 whitespace-pre leading-relaxed mt-3 overflow-x-auto">
                    {project.architectureAlt}
                  </div>
                )}
              </div>
            )}

            {/* Highlights */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <ChevronRight size={14} className="text-accent" />
                Key Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-start gap-2 text-sm text-gray-400"
                  >
                    <span className="text-accent mt-1 shrink-0">▹</span>
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <ChevronRight size={14} className="text-accent" />
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-mono bg-accent/10 text-accent border border-accent/20 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Engineering Concepts */}
            {project.concepts.length > 0 && (
              <div>
                <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <ChevronRight size={14} className="text-accent" />
                  Engineering Concepts
                </h4>
                <div className="space-y-1.5">
                  {project.concepts.map((c) => (
                    <div
                      key={c}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span className="text-accent mt-0.5 shrink-0">◆</span>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex gap-3 pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-sm rounded-lg hover:border-accent/50 hover:text-accent transition-all"
              >
                <GithubIcon size={16} />
                View Source
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-[#050505] font-semibold text-sm rounded-lg hover:bg-accent-light transition-all"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
