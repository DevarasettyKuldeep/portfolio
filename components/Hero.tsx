"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { personal, terminalLines } from "@/data/personal";

function TerminalElement() {
  const [visibleLines, setVisibleLines] = useState(0);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg">
      {/* Terminal glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent/5 to-transparent rounded-xl blur-xl" />
      <div
        ref={termRef}
        className="relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-gray-500 ml-2">
            kuldeep@portfolio ~ 
          </span>
        </div>
        {/* Terminal content */}
        <div className="p-4 md:p-5 font-mono text-sm leading-relaxed min-h-[280px]">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-0.5"
            >
              {line.prompt ? (
                <span className="text-accent font-semibold">{line.prompt}</span>
              ) : line.output ? (
                <span className="text-gray-300 ml-2">{line.output}</span>
              ) : (
                <br />
              )}
            </motion.div>
          ))}
          {visibleLines >= terminalLines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center mt-1"
            >
              <span className="text-accent">$ </span>
              <motion.span
                className="inline-block w-2.5 h-5 bg-accent/80 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>
          )}
        </div>
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,212,170,0.015)_2px,rgba(0,212,170,0.015)_4px)] rounded-xl" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />

      {/* Accent glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text */}
          <div className="order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
            >
              <motion.p
                className="font-mono text-accent text-sm md:text-base mb-4 tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                {">"} Hello, World
              </motion.p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-4">
                {personal.name.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2.6 + i * 0.15 }}
                  >
                    {i === 1 ? (
                      <span className="text-accent">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                className="text-sm md:text-base text-gray-400 font-mono tracking-wide mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.0 }}
              >
                {personal.subtitle}
              </motion.p>

              <motion.p
                className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
              >
                {personal.supportingStatement}
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.4 }}
              >
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex items-center gap-2 px-5 py-2.5 bg-accent text-[#050505] font-semibold text-sm rounded-lg hover:bg-accent-light transition-all duration-300 shadow-[0_0_20px_rgba(0,212,170,0.2)]"
                >
                  View Projects
                  <ArrowDown
                    size={14}
                    className="group-hover:translate-y-0.5 transition-transform"
                  />
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white text-sm rounded-lg hover:border-accent/50 hover:text-accent transition-all duration-300"
                >
                  <GithubIcon size={16} />
                  GitHub
                </a>
                <a
                  href={personal.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white text-sm rounded-lg hover:border-accent/50 hover:text-accent transition-all duration-300"
                >
                  <FileDown size={16} />
                  Resume
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-white text-sm rounded-lg hover:border-accent/50 hover:text-accent transition-all duration-300"
                >
                  <LinkedinIcon size={16} />
                  LinkedIn
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Terminal */}
          <motion.div
            className="order-2 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            <TerminalElement />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-gray-500">scroll</span>
            <ArrowDown size={14} className="text-gray-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
