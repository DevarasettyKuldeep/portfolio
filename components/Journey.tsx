"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Brain,
  Sparkles,
  Network,
  Eye,
  Bot,
  Cpu,
  Terminal,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { journeyMilestones } from "@/data/journey";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Brain,
  Sparkles,
  Network,
  Eye,
  Bot,
  Cpu,
  Terminal,
};

export default function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Technical Journey"
          subtitle="Areas I have explored and continue to build across."
        />

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-white/10 to-transparent md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {journeyMilestones.map((milestone, i) => {
              const Icon = iconMap[milestone.icon];
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-2.5 h-2.5 bg-accent rounded-full -translate-x-1/2 mt-6 z-10 shadow-[0_0_10px_rgba(0,212,170,0.4)]" />

                  {/* Spacer for mobile */}
                  <div className="w-10 md:hidden shrink-0" />

                  {/* Card */}
                  <div
                    className={`flex-1 md:w-[calc(50%-40px)] ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="group bg-[#0d0d0d] border border-white/5 rounded-xl p-5 hover:border-accent/20 transition-all duration-300">
                      <div
                        className={`flex items-center gap-3 mb-2 ${
                          isLeft ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Icon size={16} className="text-accent" />
                        </div>
                        <h3 className="text-white font-semibold text-base">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty half for desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
