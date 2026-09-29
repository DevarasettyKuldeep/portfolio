"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, ExternalLink, Award, Users, Calendar, MapPin } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Research() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="research" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Research & Publications"
          subtitle="Academic research work in LiDAR perception systems, denoising algorithms, and embedded electronics."
        />

        <div ref={ref} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="group relative bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 hover:border-accent/40 transition-all duration-500 shadow-2xl overflow-hidden"
          >
            {/* Top accent gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-transparent" />

            {/* Conference Badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent font-mono text-xs font-medium">
                <Award size={13} className="text-accent" />
                NEIeX 2026 Conference Paper
              </span>
              <span className="px-2.5 py-1 bg-white/5 text-gray-400 font-mono text-xs rounded-full border border-white/5">
                IEEE Madras Section Co-Sponsored
              </span>
              <span className="px-2.5 py-1 bg-white/5 text-gray-400 font-mono text-xs rounded-full border border-white/5">
                ANRF Sponsored
              </span>
            </div>

            {/* Paper Title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-4 group-hover:text-accent transition-colors duration-300">
              A Portable LiDAR-Based Adverse Weather Perception System for Four-Wheelers with Multi-Stage Denoising
            </h3>

            {/* Conference / Organization */}
            <p className="text-gray-300 text-sm md:text-base font-medium mb-4 leading-relaxed">
              Presented at the 2nd International Conference on Next Generation Electronics (NEIeX 2026) organized by School of Electronics Engineering, VIT Vellore in association with IEEE Madras Section.
            </p>

            {/* Authors */}
            <div className="flex items-start gap-2 text-xs md:text-sm text-gray-400 mb-6 bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
              <Users size={16} className="text-accent shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-500 font-mono">Authors: </span>
                <span className="text-gray-300">
                  Namburi Vivek, Rudraraju Ethish, Pasumarthy Abhinav,{" "}
                  <strong className="text-accent font-semibold">Devarasetty Kuldeep</strong>, Harini N
                </span>
              </div>
            </div>

            {/* Key Contributions Summary */}
            <div className="space-y-3 mb-8">
              <h4 className="font-mono text-xs text-accent uppercase tracking-wider">
                Research Overview & Contributions
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Designed and validated a portable LiDAR perception pipeline engineered specifically for four-wheeler vehicular safety during adverse weather conditions (fog, rain, particulate noise). Integrated multi-stage spatial and temporal point-cloud denoising filters to improve obstacle detection reliability and reduce false positives in degraded atmospheric environments.
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Calendar size={14} className="text-accent" />
                <span>May 08 – 10, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin size={14} className="text-accent" />
                <span>Vellore Institute of Technology (VIT), Vellore, India</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/feed/update/urn:li:activity:7481368772864573440/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-[#050505] font-semibold text-sm rounded-xl hover:bg-accent-light transition-all shadow-[0_0_20px_rgba(0,212,170,0.2)]"
              >
                <ExternalLink size={15} />
                View LinkedIn Post
              </a>
              <a
                href="/certificates/neiex2026_certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/10 text-white text-sm rounded-xl hover:border-accent/40 hover:text-accent transition-all"
              >
                <FileText size={15} />
                View Certificate of Appreciation
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
