export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming",
    icon: "Code2",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "C",
      "Embedded C",
      "SQL",
    ],
  },
  {
    name: "Frontend",
    icon: "Layout",
    skills: ["React", "Next.js", "Vite", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    name: "Backend",
    icon: "Server",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "MongoDB",
      "SQLite",
      "MySQL",
    ],
  },
  {
    name: "AI / ML",
    icon: "Brain",
    skills: [
      "Google Gemini API",
      "OpenRouter",
      "Scikit-Learn",
      "Pandas & NumPy",
      "Machine Learning",
      "Generative AI",
      "LLM Applications",
      "AI Assistants",
      "Computer Vision",
      "MediaPipe",
      "OpenCV",
      "Speech-to-Text",
    ],
  },
  {
    name: "Agentic AI / MCP",
    icon: "Sparkles",
    skills: [
      "Model Context Protocol (MCP)",
      "MCP Servers",
      "AI Tool Calling",
      "Tool Orchestration",
      "LLM Task Planning",
      "TypeScript",
      "Zod",
      "Dependency Injection",
    ],
  },
  {
    name: "IoT / Embedded / Robotics",
    icon: "Cpu",
    skills: [
      "STM32",
      "ESP32",
      "Raspberry Pi",
      "Arduino",
      "Embedded C",
      "Sensors",
      "Edge Computing",
      "Robotics",
    ],
  },
  {
    name: "Systems",
    icon: "Terminal",
    skills: [
      "Operating Systems",
      "Networking",
      "Object-Oriented Programming",
      "Data Structures",
      "Git",
      "GitHub",
      "Linux / WSL",
    ],
  },
];
