"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import SectionHeader from "./SectionHeader";
import ProjectModal from "./ProjectModal";
import { projects, projectFilters, Project } from "@/data/projects";

function ProjectCard({
  project,
  featured,
  index,
  onClick,
}: {
  project: Project;
  featured: boolean;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      layout
      className="group relative bg-[#0d0d0d] border border-white/5 rounded-xl p-5 md:p-6 hover:border-accent/30 transition-all duration-400 cursor-pointer flex flex-col justify-between"
      onClick={onClick}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      <div>
        {/* Category & Arrow */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <span className="font-mono text-accent text-xs tracking-wider">
            {featured && (
              <span className="text-gray-500 mr-1.5">
                {String(project.order).padStart(2, "0")} /
              </span>
            )}
            {project.category}
          </span>
          <ArrowUpRight
            size={16}
            className="text-gray-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5"
          />
        </div>

        {/* Title */}
        <h3 className="text-white font-bold text-base md:text-lg group-hover:text-accent transition-colors mb-2.5">
          {project.title}
        </h3>

        {/* Concise Description */}
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
      </div>

      <div>
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono bg-white/5 text-gray-400 rounded border border-white/5 group-hover:border-accent/15 group-hover:text-gray-300 transition-all"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-xs font-mono text-gray-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-gray-400 hover:text-accent transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubIcon size={14} />
              <span>Source</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-accent hover:text-accent-light transition-colors"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
          <span className="text-[11px] font-mono text-gray-600 group-hover:text-gray-400 transition-colors">
            Details ↗
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" />
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  const featuredProjects = filteredProjects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
  const additionalProjects = filteredProjects
    .filter((p) => !p.featured)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="what_i_build"
          title="Projects & Systems"
          subtitle="Practical implementations across artificial intelligence, backend engineering, robotics, and connected hardware."
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {projectFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-lg border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-accent/15 text-accent border-accent/30"
                  : "bg-white/5 text-gray-400 border-white/5 hover:border-white/15 hover:text-white"
              }`}
              aria-label={`Filter projects by ${filter}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-14">
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">
              Featured Builds
            </p>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {featuredProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featured={true}
                    index={i}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* Additional Projects */}
        {additionalProjects.length > 0 && (
          <div>
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">
              More Engineering Work
            </p>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {additionalProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featured={false}
                    index={i}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
