export interface JourneyMilestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    description: "Full-stack applications, backend systems and RESTful API development.",
    icon: "Code2",
    category: "Engineering",
  },
  {
    id: "ai-ml",
    title: "Artificial Intelligence",
    description: "Spam detection, AI assistants and LLM-based intelligent systems.",
    icon: "Brain",
    category: "AI",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    description: "Task planning, tool calling and AI-driven automation pipelines.",
    icon: "Sparkles",
    category: "AI",
  },
  {
    id: "mcp",
    title: "Model Context Protocol",
    description: "Hands-on exploration of MCP servers and AI-native backend architecture.",
    icon: "Network",
    category: "AI",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Real-time hand tracking with MediaPipe and OpenCV.",
    icon: "Eye",
    category: "Vision",
  },
  {
    id: "robotics",
    title: "Robotics",
    description: "Autonomous navigation, obstacle avoidance and embedded control systems.",
    icon: "Bot",
    category: "Hardware",
  },
  {
    id: "iot",
    title: "Internet of Things",
    description: "Connected systems, embedded platforms and edge computing.",
    icon: "Cpu",
    category: "Hardware",
  },
  {
    id: "systems",
    title: "Systems Programming",
    description: "Operating system implementation and low-level systems coursework.",
    icon: "Terminal",
    category: "Systems",
  },
];

export const experienceItems = [
  {
    category: "Technical Projects",
    description: "9+ engineering projects across AI, full-stack, robotics and systems programming.",
    icon: "Folder",
  },
  {
    category: "AI / ML Development",
    description: "Hybrid spam detection, LLM-based assistants, computer vision applications.",
    icon: "Brain",
  },
  {
    category: "MCP / Agentic AI",
    description: "MCP server framework development, AI tool calling, agentic automation systems.",
    icon: "Sparkles",
  },
  {
    category: "Hackathons",
    description: "NitroStack Agentic AI Hackathon 2026 — MCP server development and AI-native backends.",
    icon: "Trophy",
  },
  {
    category: "IoT / Embedded Systems",
    description: "Autonomous robot navigation, Arduino, ESP32 and sensor-based systems.",
    icon: "Cpu",
  },
  {
    category: "NSS / Community Work",
    description: "Community service and social responsibility initiatives.",
    icon: "Heart",
  },
];
