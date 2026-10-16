"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  tag?: string;
  align?: "left" | "center";
  glowProgress?: number;
}

export default function SectionHeader({
  title,
  subtitle,
  tag,
  align = "left",
  glowProgress,
}: SectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displayTag = tag || title.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

  return (
    <div
      ref={ref}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono text-accent text-sm tracking-wider mb-3 block">
          {"// "}
          {displayTag}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        {glowProgress !== undefined ? (
          <div className="relative mt-5 h-px w-full max-w-md md:max-w-lg bg-white/10 overflow-hidden rounded-full">
            {/* Subtle base gradient track */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: `linear-gradient(90deg, 
                  rgba(0, 212, 170, ${Math.max(0.08, 0.45 - glowProgress * 0.38)}) 0%, 
                  rgba(0, 212, 170, 0.6) ${glowProgress * 100}%, 
                  rgba(0, 212, 170, ${Math.max(0.08, 0.08 + glowProgress * 0.38)}) 100%
                )`,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Simple, subtle sliding accent segment (no white dot, no heavy blur) */}
            <motion.div
              className="absolute top-0 bottom-0 pointer-events-none"
              animate={{
                left: `${glowProgress * 100}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 26,
              }}
              style={{
                transform: "translateX(-50%)",
              }}
            >
              {/* Clean accent line segment */}
              <div className="w-16 md:w-20 h-full bg-accent rounded-full shadow-[0_0_8px_rgba(0,212,170,0.45)]" />
            </motion.div>
          </div>
        ) : (
          <div className="mt-4 h-px bg-gradient-to-r from-accent/50 via-accent/20 to-transparent max-w-xs" />
        )}
      </motion.div>
    </div>
  );
}
