"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import StarBorder from "@/components/StarBorder";

interface TerminalLine {
  type: "input" | "output";
  content: string;
}

const commands: Record<string, string> = {
  help: `Available commands:
  help        — Show this message
  whoami      — About me & education
  about       — Overview & background
  skills      — Technical skills & tools
  projects    — Selected engineering projects
  experience  — Activities & academic history
  research    — LiDAR perception paper (NEIeX 2026)
  mcp         — Model Context Protocol experience
  github      — GitHub profile
  resume      — Open updated resume
  contact     — Contact info & email
  clear       — Clear terminal`,

  whoami: `Kuldeep Devarasetty
B.Tech CSE (Minor: IoT) @ Amrita Vishwa Vidyapeetham
CGPA: 7.6 / 10 | Coimbatore, India`,

  about: `I build practical software and AI systems across
intelligent automation, full-stack engineering, MCP,
computer vision, robotics, and IoT.

Navigating to About section...`,

  skills: `Programming: Python, Java, JavaScript, TypeScript, C, SQL, Embedded C
Frontend: React, Vite, HTML, CSS, Tailwind CSS
Backend: Node.js, Express.js, MongoDB, REST APIs, JWT
AI/ML: LLMs, Generative AI, Computer Vision, MediaPipe, OpenCV
Agentic AI: MCP, Tool Calling, Task Planning, Zod
IoT: ESP32, Arduino, Raspberry Pi, Sensors, BLE
Systems: OS, Networking, Git, Linux / WSL

Navigating to Skills section...`,

  projects: `01 — Hybrid AI Spam Filter
02 — Mark-X (AI Desktop Assistant)
03 — JobTracker (Full-Stack MERN)
04 — Autonomous Robot Navigation
05 — Mark-I (Multimodal AI Assistant)
06 — NitroStack (MCP Server Framework)
07 — Car Dealership (Java OOP)
08 — Real-Time Hand Tracking (MediaPipe)
09 — Experimental Operating System (eXpOS)

Navigating to Projects section...`,

  research: `Paper: A Portable LiDAR-Based Adverse Weather Perception System
Conference: NEIeX 2026 (VIT Vellore / IEEE Madras Section)
Award: Certificate of Appreciation for Paper Presentation

Navigating to Research section...`,

  experience: `Technical Activities, Hackathons (NitroStack 2026),
IoT & Embedded systems, and Academic Background.

Navigating to Experience section...`,

  mcp: `Model Context Protocol (MCP)
MCP Server Development (NitroStack)
AI Tool Calling & Agentic AI Orchestration
TypeScript, Decorators, Dependency Injection, Zod

Navigating to Skills & Projects...`,

  github: `Personal: github.com/DevarasettyKuldeep
Team: github.com/HackstreetBoyzz

Opening GitHub...`,

  resume: `Opening updated resume...`,

  contact: `Email: kuldeepdevarasetty@yahoo.com
Phone: +91 8074619225
GitHub: github.com/DevarasettyKuldeep
LinkedIn: linkedin.com/in/devarasetty-kuldeep-8083b5350

Navigating to Contact section...`,
};

const sectionMap: Record<string, string> = {
  about: "#about",
  skills: "#skills",
  projects: "#projects",
  experience: "#experience",
  research: "#research",
  mcp: "#skills",
  contact: "#contact",
};

export default function TerminalComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: 'Welcome to Kuldeep\'s terminal. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && e.ctrlKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `$ ${input}` },
    ];

    if (cmd === "clear") {
      setLines([
        { type: "output", content: 'Terminal cleared. Type "help" for commands.' },
      ]);
      setInput("");
      return;
    }

    if (commands[cmd]) {
      newLines.push({ type: "output", content: commands[cmd] });

      // Navigate to section
      if (sectionMap[cmd]) {
        setTimeout(() => {
          const el = document.querySelector(sectionMap[cmd]);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false);
          }
        }, 800);
      }

      // Special actions
      if (cmd === "github") {
        setTimeout(() => {
          window.open("https://github.com/DevarasettyKuldeep", "_blank");
        }, 800);
      }
      if (cmd === "resume") {
        setTimeout(() => {
          window.open("/resume.pdf", "_blank");
        }, 800);
      }
    } else {
      newLines.push({
        type: "output",
        content: `Command not found: ${cmd}. Type "help" for available commands.`,
      });
    }

    setLines(newLines);
    setInput("");
  };

  return (
    <>
      {/* Toggle button with StarBorder animation */}
      <motion.div
        className="fixed bottom-6 right-6 z-[140]"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <StarBorder
          as="button"
          onClick={() => setIsOpen(!isOpen)}
          color="#00e5ff"
          speed="5.5s"
          className="group cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.8)] hover:shadow-[0_0_24px_rgba(0,229,255,0.3)] transition-shadow duration-300"
          aria-label="Toggle terminal"
          title="Toggle terminal (Ctrl+`)"
        >
          <div className="p-3 text-[#00e5ff] group-hover:text-white transition-colors duration-300 flex items-center justify-center">
            <TerminalSquare size={20} />
          </div>
        </StarBorder>
      </motion.div>

      {/* Terminal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[145] bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-4 md:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            >
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                      aria-label="Close terminal"
                    />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs text-gray-500 ml-2">
                    kuldeep@portfolio:~
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-500 hover:text-white transition-colors"
                  aria-label="Close terminal"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Terminal body */}
              <div
                ref={scrollRef}
                className="p-4 font-mono text-sm h-[300px] md:h-[400px] overflow-y-auto"
              >
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={`mb-1 whitespace-pre-wrap leading-relaxed ${
                      line.type === "input"
                        ? "text-accent"
                        : "text-gray-400"
                    }`}
                  >
                    {line.content}
                  </div>
                ))}

                {/* Input */}
                <form onSubmit={handleSubmit} className="flex items-center mt-1">
                  <span className="text-accent mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent text-white outline-none font-mono text-sm caret-accent"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Terminal input"
                  />
                </form>
              </div>

              {/* Hint */}
              <div className="px-4 py-2 border-t border-white/5">
                <span className="font-mono text-[10px] text-gray-600">
                  Ctrl+` to toggle • ESC to close • Type &quot;help&quot; for commands
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
