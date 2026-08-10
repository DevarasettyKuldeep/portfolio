"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Layout,
  Server,
  Brain,
  Sparkles,
  Cpu,
  Terminal,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { skillCategories } from "@/data/skills";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Layout,
  Server,
  Brain,
  Sparkles,
  Cpu,
  Terminal,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Skills"
          subtitle="Technologies and tools I work with across my projects."
        />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((category, i) => {
            const Icon = iconMap[category.icon];
            const isActive = activeCategory === category.name;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() =>
                  setActiveCategory(isActive ? null : category.name)
                }
                className={`group relative bg-[#0d0d0d] border rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "border-accent/40 shadow-[0_0_20px_rgba(0,212,170,0.08)]"
                    : "border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isActive ? "bg-accent/15 text-accent" : "bg-white/5 text-gray-400 group-hover:text-accent"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <h3 className="text-white font-semibold text-sm">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-accent/10 text-accent border border-accent/20"
                          : "bg-white/5 text-gray-400 border border-transparent group-hover:border-white/5"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
