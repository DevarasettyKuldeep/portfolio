"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Cpu,
  Brain,
  Sparkles,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { aboutText, quickProfile } from "@/data/personal";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Cpu,
  Brain,
  Sparkles,
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="About Me" />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* About Text */}
          <div className="lg:col-span-3 space-y-5">
            {aboutText.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-gray-400 text-base md:text-lg leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Quick Profile Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 md:gap-4 content-start">
            {quickProfile.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group relative bg-[#0d0d0d] border border-white/5 rounded-xl p-4 md:p-5 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <Icon
                      size={20}
                      className="text-accent mb-3"
                    />
                    <p className="text-white font-semibold text-sm md:text-base">
                      {item.label}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
