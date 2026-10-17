"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  GraduationCap,
  Cpu,
  Brain,
  Sparkles,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import SectionHeader from "./SectionHeader";
import { aboutText, quickProfile, educationList, personal } from "@/data/personal";

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Cpu,
  Brain,
  Sparkles,
};

function PortraitSpotlightCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState<string>("/profile.jpg");

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const quickSkills = [
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "Gemini API",
    "MCP",
    "IoT",
    "OpenCV",
  ];

  return (
    <div style={{ perspective: "1000px" }} className="w-full h-full flex flex-col">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full flex flex-col justify-between bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 md:p-7 shadow-2xl transition-shadow duration-300 hover:shadow-[0_0_35px_rgba(0,212,170,0.12)] group"
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-emerald-500/5 rounded-2xl pointer-events-none" />
        <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* Top & Middle Content Container */}
        <div>
          {/* Top bar: Status Pill & Location */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-mono text-[11px] text-emerald-400 font-medium tracking-wide">
                Available for Internships
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono text-gray-500">
              <MapPin size={12} className="text-gray-400" />
              <span>Coimbatore, IN</span>
            </div>
          </div>

          {/* Avatar Section: Large 140px squircle with essential text beside it */}
          <div className="flex items-center gap-5 mb-5">
            <div className="relative shrink-0">
              {/* Large Squircle container (clean, sharp, crystal clear, zero grain/scanlines) */}
              <div className="relative w-[136px] h-[136px] md:w-[144px] md:h-[144px] rounded-2xl overflow-hidden bg-[#050505] border border-white/15 hover:border-accent/40 shadow-xl group/avatar transition-all duration-300">
                <img
                  src={imgSrc}
                  alt={personal.name}
                  onError={() => {
                    setImgSrc("https://avatars.githubusercontent.com/u/198734253?v=4");
                  }}
                  className="w-full h-full object-cover rounded-2xl group-hover/avatar:scale-105 transition-transform duration-700 ease-out"
                  style={{ imageRendering: "auto" }}
                />

                {/* Glowing green dot in bottom-right corner signaling live availability */}
                <div
                  className="absolute bottom-1.5 right-1.5 flex items-center justify-center z-10"
                  title="Available for Internships & Projects"
                >
                  <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border-2 border-[#0d0d0d] shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                </div>
              </div>
            </div>

            {/* Essential Identity details beside the image */}
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight leading-snug">
                {personal.name}
              </h3>
              <p className="text-accent text-xs md:text-sm font-mono font-medium mt-1">
                B.Tech CSE • IoT Minor
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-mono text-gray-400">
                <GraduationCap size={13} className="text-accent shrink-0" />
                <span className="truncate">Amrita Vishwa Vidyapeetham</span>
              </div>
            </div>
          </div>

          {/* Descriptive text placed cleanly UNDER the image */}
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2.5">
            <p className="text-gray-200 text-sm font-medium leading-relaxed">
              Full-Stack Developer & Agentic AI / Embedded Systems Engineer
            </p>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Building practical software across intelligent automation, full-stack applications, MCP orchestration, computer vision, and IoT systems.
            </p>
          </div>

          {/* Quick highlight cards to evenly fill vertical space */}
          <div className="grid grid-cols-2 gap-2.5 mt-4 pt-2">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[10px] font-mono uppercase text-gray-500">Degree Focus</p>
              <p className="text-xs text-white font-semibold mt-0.5">CSE + IoT Minor</p>
              <p className="text-[11px] text-gray-400 font-mono mt-0.5">CGPA: 7.6 / 10</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-[10px] font-mono uppercase text-gray-500">Research Paper</p>
              <p className="text-xs text-white font-semibold mt-0.5">NEIeX 2026</p>
              <p className="text-[11px] text-gray-400 font-mono mt-0.5">VIT / IEEE Madras</p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Card: Live GitHub stats badge / quick skill chips (aligned flush at the bottom) */}
        <div className="mt-5 bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-3">
          {/* Live GitHub stats badge */}
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-black/40 border border-white/5 hover:border-accent/40 transition-all duration-300 group/gh"
          >
            <div className="flex items-center gap-2.5">
              <GithubIcon
                size={15}
                className="text-gray-400 group-hover/gh:text-accent transition-colors"
              />
              <span className="text-xs font-medium text-white group-hover/gh:text-accent transition-colors font-mono">
                DevarasettyKuldeep
              </span>
              <span className="text-[11px] text-gray-500 font-mono">
                • 13 Repos
              </span>
            </div>
            <ExternalLink size={12} className="text-gray-500 group-hover/gh:text-accent transition-colors" />
          </a>

          {/* Quick Skill Chips */}
          <div className="flex flex-wrap gap-1.5">
            {quickSkills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-[10px] md:text-[11px] font-mono bg-white/[0.03] text-gray-400 rounded border border-white/5 hover:border-accent/30 hover:text-white transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="About Me" />

        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch"
        >
          {/* Left Column: Visual Spotlight Card with 3D Tilt - Full Height */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col h-full"
          >
            <PortraitSpotlightCard />
          </motion.div>

          {/* Right Column: Bio Narrative + Educational Timeline + Quick Profile Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Bio Story */}
            <div className="space-y-4">
              {aboutText.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="text-gray-400 text-base md:text-lg leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Educational Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <h4 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-accent" />
                Education & Background
              </h4>
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                {educationList.map((edu, i) => (
                  <motion.div
                    key={edu.institution}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.15 }}
                    className="relative"
                  >
                    {/* Node dot */}
                    <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-accent ring-4 ring-[#050505] shadow-[0_0_8px_rgba(0,212,170,0.6)]" />

                    <div className="p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-accent/20 transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <h5 className="text-white font-semibold text-sm">
                          {edu.institution}
                        </h5>
                        <span className="text-[11px] font-mono text-accent">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-gray-300 text-xs font-medium">
                        {edu.degree} {edu.minor ? `• ${edu.minor}` : ""}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono mt-2 pt-2 border-t border-white/5">
                        <span>{edu.details}</span>
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Profile Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickProfile.map((item, i) => {
                const Icon = iconMap[item.icon];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.45 + i * 0.08 }}
                    className="group relative bg-[#0d0d0d] border border-white/5 rounded-xl p-3.5 hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="relative">
                      <Icon size={16} className="text-accent mb-2" />
                      <p className="text-white font-semibold text-xs md:text-sm">
                        {item.label}
                      </p>
                      <p className="text-gray-500 text-[11px] mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

