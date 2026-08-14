"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";

const mcpConcepts = [
  "MCP Servers",
  "Tools",
  "Resources",
  "Prompts",
  "Tool Calling",
  "TypeScript",
  "Decorators",
  "Dependency Injection",
  "Zod Validation",
  "AI-native Backends",
];

const mcpArchitecture = `User
 ↓
AI Model
 ↓
MCP Client
 ↓
MCP Server
 ↓
Tools / Resources
 ↓
External Systems`;

export default function MCPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="research" className="py-24 md:py-32 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="MCP & Agentic AI"
          subtitle="Exploring and building with Model Context Protocol, AI tool calling and AI-native backend architectures."
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-accent text-xs font-medium">
                MCP / Agentic AI Experience
              </span>
            </div>

            <p className="text-gray-400 text-base leading-relaxed">
              I have been exploring and building with Model Context Protocol
              (MCP), AI tool calling and AI-native backend architectures, with
              hands-on work around MCP server development and the NitroStack
              ecosystem.
            </p>

            <p className="text-gray-400 text-base leading-relaxed">
              This includes working with MCP server frameworks, TypeScript
              decorator patterns, dependency injection, Zod validation,
              authentication middleware and tool orchestration for AI-native
              backends.
            </p>

            {/* Concept tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {mcpConcepts.map((concept, i) => (
                <motion.span
                  key={concept}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  className="px-3 py-1.5 text-xs font-mono bg-accent/5 text-accent/80 border border-accent/15 rounded-md hover:bg-accent/10 hover:text-accent transition-all cursor-default"
                >
                  {concept}
                </motion.span>
              ))}
            </div>

            {/* NitroStack reference */}
            <div className="bg-[#0d0d0d] border border-white/5 rounded-xl p-4 mt-4">
              <p className="text-white text-sm font-semibold mb-1">
                NitroStack — MCP Server Framework
              </p>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                A TypeScript-based framework for building production-ready MCP
                servers and AI-native backends, featuring decorators, DI, Zod
                validation and NitroStudio.
              </p>
              <a
                href="https://github.com/DevarasettyKuldeep/nitrostack"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-accent hover:text-accent-light transition-colors"
              >
                → View on GitHub
              </a>
            </div>
          </motion.div>

          {/* Right - Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-2xl blur-2xl" />

              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="font-mono text-xs text-gray-500 ml-2">
                    mcp_architecture.md
                  </span>
                </div>

                {/* Architecture diagram */}
                <div className="p-5 md:p-6">
                  <p className="font-mono text-xs text-gray-500 mb-4">
                    # MCP Data Flow
                  </p>
                  {mcpArchitecture.split("\n").map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      className={`font-mono text-sm ${
                        line.includes("↓")
                          ? "text-accent/40 ml-1"
                          : "text-accent font-medium"
                      } leading-relaxed`}
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>

                {/* Scanline */}
                <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,212,170,0.01)_2px,rgba(0,212,170,0.01)_4px)] rounded-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
