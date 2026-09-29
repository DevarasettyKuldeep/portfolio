"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const stats: StatItem[] = [
  { value: 10, suffix: "+", label: "Projects", sublabel: "Built & Shipped" },
  { value: 5, suffix: "+", label: "AI / ML", sublabel: "Intelligent Systems" },
  { value: 6, suffix: "+", label: "Domains", sublabel: "Tech Verticals" },
  { value: 1, suffix: "", label: "Paper", sublabel: "IEEE Conference" },
];

function AnimatedCounter({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const stepTime = Math.max(Math.floor(duration / target), 40);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 md:py-20 relative" aria-label="Statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative text-center p-6 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-accent/20 transition-all duration-400"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

              {/* Number */}
              <p className="relative text-3xl md:text-4xl font-bold text-accent mb-1 font-mono">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </p>

              {/* Label */}
              <p className="relative text-white text-sm font-semibold mb-0.5">
                {stat.label}
              </p>

              {/* Sublabel */}
              <p className="relative text-gray-500 text-xs font-mono">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
