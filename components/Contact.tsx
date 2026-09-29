"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import SectionHeader from "./SectionHeader";
import { personal } from "@/data/personal";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-accent text-sm tracking-wider mb-3 block">
              {"// "}contact
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
              Let&apos;s Build Something
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10">
              I&apos;m interested in software engineering, AI/ML, agentic AI,
              MCP, full-stack development and IoT opportunities. Let&apos;s
              connect.
            </p>
          </motion.div>

          {/* Contact buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href={`mailto:${personal.email}`}
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-accent text-[#050505] font-semibold text-sm rounded-xl hover:bg-accent-light transition-all duration-300 shadow-[0_0_20px_rgba(0,212,170,0.2)]"
              aria-label="Send email"
            >
              <Mail size={16} />
              Email Me
              <ArrowUpRight
                size={14}
                className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-white text-sm rounded-xl hover:border-accent/50 hover:text-accent transition-all duration-300"
              aria-label="View GitHub"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-white text-sm rounded-xl hover:border-accent/50 hover:text-accent transition-all duration-300"
              aria-label="View LinkedIn"
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
          </motion.div>

          {/* Email display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <a
              href={`mailto:${personal.email}`}
              className="font-mono text-sm text-gray-500 hover:text-accent transition-colors"
            >
              {personal.email}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
