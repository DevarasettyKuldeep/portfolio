"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  tag?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  title,
  subtitle,
  tag,
  align = "left",
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
        <div className="mt-4 h-px bg-gradient-to-r from-accent/50 via-accent/20 to-transparent max-w-xs" />
      </motion.div>
    </div>
  );
}
