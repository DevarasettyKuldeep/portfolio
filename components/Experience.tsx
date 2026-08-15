"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Folder,
  Brain,
  Sparkles,
  Trophy,
  Cpu,
  Heart,
  GraduationCap,
  MapPin,
  Calendar,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { experienceItems } from "@/data/journey";
import { educationList } from "@/data/personal";

const iconMap: Record<string, React.ElementType> = {
  Folder,
  Brain,
  Sparkles,
  Trophy,
  Cpu,
  Heart,
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Experience & Education"
          subtitle="Technical development activities, academic background, and community involvement."
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Experience / Activities (7 cols) */}
          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6">
              Technical Activities & Exploration
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {experienceItems.map((item, i) => {
                const Icon = iconMap[item.icon];
                return (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group bg-[#0d0d0d] border border-white/5 rounded-xl p-4 hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-accent/10 transition-colors">
                        <Icon
                          size={14}
                          className="text-gray-400 group-hover:text-accent transition-colors"
                        />
                      </div>
                      <h3 className="text-white text-sm font-semibold">
                        {item.category}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Education (5 cols) */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-6">
              Education
            </p>
            <div className="space-y-4">
              {educationList.map((edu, i) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  className="bg-[#0d0d0d] border border-white/5 rounded-xl p-5 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-accent/10 rounded-lg shrink-0 mt-0.5">
                      <GraduationCap size={18} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base">
                        {edu.institution}
                      </h3>
                      <p className="text-gray-300 text-sm font-medium mt-0.5">
                        {edu.degree}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pl-1 text-xs text-gray-400">
                    <p className="text-accent font-mono">
                      {edu.minor}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar size={12} className="text-accent" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <MapPin size={12} className="text-accent" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="inline-block px-2.5 py-0.5 bg-accent/10 text-accent font-mono text-xs rounded-md border border-accent/20">
                        {edu.details}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
