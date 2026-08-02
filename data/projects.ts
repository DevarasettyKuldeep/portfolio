export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  tags: string[];
  description: string;
  detailedDescription: string;
  problem: string;
  approach: string;
  architecture?: string;
  architectureAlt?: string;
  technologies: string[];
  highlights: string[];
  concepts: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    id: "spam-ai-filter",
    title: "Hybrid AI Spam Filter",
    shortTitle: "Spam AI Filter",
    category: "AI / Machine Learning / Backend",
    tags: ["AI / ML", "Systems"],
    description:
      "A hybrid email spam filtering system combining probabilistic data structures, domain reputation analysis and generative AI for intelligent spam detection.",
    detailedDescription:
      "This system goes beyond simple keyword matching or naive API calls. It combines classical data structures with modern AI to create a multi-layered spam detection pipeline that is both efficient and intelligent.",
    problem:
      "Traditional spam filters rely on either simple keyword matching or expensive AI-only approaches. There's a need for a system that combines efficient classical algorithms with modern AI for accurate and performant spam detection.",
    approach:
      "The system uses a multi-stage pipeline: Bloom Filter for fast candidate filtering using multiple hash functions (MurmurHash, FNV, DJB2, SDBM), followed by domain reputation analysis stored in a Red-Black Tree, and finally Google Gemini API for AI-assisted classification of ambiguous cases.",
    architecture: `Email
  ↓
Bloom Filter (MurmurHash, FNV, DJB2, SDBM)
  ↓
Candidate Filtering
  ↓
Domain Reputation (Red-Black Tree)
  ↓
AI Analysis (Gemini API)
  ↓
Spam / Not Spam`,
    technologies: [
      "Python",
      "Flask",
      "Google Gemini API",
      "REST API",
      "Bloom Filter",
      "Red-Black Tree",
    ],
    highlights: [
      "Bloom Filter with multiple hash functions",
      "MurmurHash, FNV, DJB2, SDBM implementations",
      "Red-Black Tree for domain reputation",
      "Google Gemini API integration",
      "Flask REST API backend",
      "AI-assisted classification",
    ],
    concepts: [
      "Classical Data Structures + Probabilistic Filtering + Generative AI",
      "Multi-stage pipeline architecture",
      "Hash function diversity for reduced false positives",
      "Domain reputation scoring",
    ],
    githubUrl: "https://github.com/HackstreetBoyzz/Spam-Email-Detection",
    featured: true,
    order: 1,
  },
  {
    id: "mark-x",
    title: "Mark-X — AI Desktop Assistant",
    shortTitle: "Mark-X",
    category: "AI / Agentic AI / Desktop Automation",
    tags: ["AI / ML", "Agentic AI"],
    description:
      "A Python desktop AI assistant combining voice input, text commands, LLM-based task planning, local memory and desktop automation.",
    detailedDescription:
      "Mark-X is a desktop AI assistant that bridges the gap between natural language understanding and system-level automation. It uses LLMs for intent detection and task planning, then executes structured actions through modular action modules.",
    problem:
      "Desktop AI assistants often lack the ability to understand complex multi-step tasks and execute them through structured, reliable pipelines.",
    approach:
      "The system receives voice or text input, processes it through an LLM for intent detection and task planning, then executes structured tasks through modular action modules covering desktop automation, web search, weather, messaging and more.",
    architecture: `User Input (Voice / Text)
  ↓
Speech-to-Text (faster-whisper)
  ↓
LLM Intent Detection (OpenRouter)
  ↓
Task Planning
  ↓
Action Module Execution
  ↓
Response (Text-to-Speech / UI)`,
    technologies: [
      "Python",
      "Tkinter",
      "OpenRouter API",
      "faster-whisper",
      "sounddevice",
      "pyttsx3",
      "SerpAPI",
      "python-dotenv",
    ],
    highlights: [
      "Text and voice command input",
      "LLM-powered intent detection",
      "LLM task planning",
      "Desktop application launching",
      "Web search integration",
      "Nearby-place searches",
      "Weather lookup",
      "WhatsApp message link generation",
      "Local memory storage",
      "Modular action modules",
      "Text-to-speech output",
    ],
    concepts: [
      "LLM → Structured Task → Action Execution",
      "Modular action architecture",
      "Voice-first interaction design",
      "Local memory persistence",
    ],
    githubUrl: "https://github.com/DevarasettyKuldeep/Mark-X",
    featured: true,
    order: 2,
  },
  {
    id: "jobtracker",
    title: "JobTracker — Full-Stack Job Application Manager",
    shortTitle: "JobTracker",
    category: "Full-Stack Development",
    tags: ["Full-Stack"],
    description:
      "A full-stack web application designed to organize and track job applications through a centralized dashboard and Kanban workflow.",
    detailedDescription:
      "JobTracker provides a complete solution for managing job applications with a dashboard, statistics tracking, Kanban board workflow, and secure user authentication. Built with modern React frontend and Node.js backend.",
    problem:
      "Job seekers need a centralized way to track and manage multiple job applications, their statuses, and related information without relying on spreadsheets.",
    approach:
      "Built a full-stack application with a React/Vite frontend providing a dashboard and Kanban board interface, backed by a Node.js/Express API with MongoDB for data persistence and JWT-based authentication.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
    ],
    highlights: [
      "Dashboard with application statistics",
      "Add, edit, delete applications",
      "Company and role tracking",
      "Salary and location fields",
      "Kanban board workflow",
      "User registration and login",
      "JWT authentication",
      "Protected user data",
    ],
    concepts: [
      "Full-stack MERN architecture",
      "RESTful API design",
      "Token-based authentication",
      "Kanban workflow management",
    ],
    githubUrl: "https://github.com/DevarasettyKuldeep/Job-Tracker",
    liveUrl: "https://job-tracker-seven-xi.vercel.app/",
    featured: true,
    order: 3,
  },
  {
    id: "robot-navigation",
    title: "Autonomous Robot Navigation System",
    shortTitle: "Robot Navigation",
    category: "Robotics / Embedded Systems / IoT",
    tags: ["Robotics", "IoT"],
    description:
      "An autonomous robotic system designed for navigation and real-time control using embedded systems, obstacle avoidance and line-following capabilities.",
    detailedDescription:
      "This project demonstrates hardware-software integration through an Arduino-based robot capable of autonomous navigation, obstacle avoidance, line following, and remote control via Bluetooth and a web interface.",
    problem:
      "Building a robotic system that can navigate autonomously while also supporting remote control requires tight integration between sensors, control logic, and communication interfaces.",
    approach:
      "Used Arduino with embedded C for core navigation logic, integrated multiple sensors for obstacle detection and line following, and added Bluetooth and web-based control interfaces for remote operation.",
    architecture: `Sensors
   ↓
Arduino
   ↓
Navigation Logic
   ↓
Motor Control
   ↓
Robot`,
    architectureAlt: `Web Interface
      ↓
Bluetooth
      ↓
Arduino
      ↓
Robot`,
    technologies: [
      "Arduino",
      "Embedded C",
      "HTML",
      "CSS",
      "JavaScript",
      "Bluetooth",
      "Sensors",
    ],
    highlights: [
      "Obstacle avoidance",
      "Line following",
      "Bluetooth-based control",
      "Web-based control interface",
      "Real-time navigation",
    ],
    concepts: [
      "Hardware-software integration",
      "Sensor fusion for navigation",
      "Multiple control interfaces",
      "Real-time embedded systems",
    ],
    githubUrl:
      "https://github.com/HackstreetBoyzz/Autonomus-Robot-Navigation-System",
    featured: true,
    order: 4,
  },
  {
    id: "mark-i",
    title: "Mark-I — Multimodal AI Voice & Text Assistant",
    shortTitle: "Mark-I",
    category: "AI / Automation",
    tags: ["AI / ML", "Agentic AI"],
    description:
      "A multimodal AI assistant with voice interaction, natural-language tool calling, structured JSON task execution and system automation.",
    detailedDescription:
      "Mark-I is the predecessor to Mark-X, featuring voice and text interaction with natural-language tool calling, task scheduling, and comprehensive system automation capabilities.",
    problem:
      "Creating an AI assistant that can bridge natural language commands with structured system automation across multiple domains.",
    approach:
      "Built a Python application using OpenRouter for LLM capabilities, faster-whisper for speech recognition, and a structured JSON task execution pipeline for reliable automation.",
    technologies: [
      "Python",
      "OpenRouter",
      "faster-whisper",
      "pyttsx3",
      "Tkinter",
    ],
    highlights: [
      "Voice and text interaction",
      "Natural-language tool calling",
      "Structured JSON task execution",
      "Task scheduler",
      "System automation",
      "Browser navigation",
      "Text-to-speech",
      "File operations",
      "Code sandbox",
      "Web search",
    ],
    concepts: [
      "Multimodal interaction",
      "Tool calling architecture",
      "Structured task execution",
    ],
    githubUrl: "https://github.com/DevarasettyKuldeep/Mark-I",
    featured: false,
    order: 5,
  },
  {
    id: "nitrostack",
    title: "NitroStack — MCP Server Framework",
    shortTitle: "NitroStack",
    category: "MCP / AI Infrastructure",
    tags: ["MCP", "Agentic AI"],
    description:
      "A TypeScript-based framework for building production-ready MCP servers and AI-native backends.",
    detailedDescription:
      "NitroStack provides a structured framework for building Model Context Protocol (MCP) servers with TypeScript decorators, dependency injection, authentication, middleware, Zod validation, and UI widgets for AI-native backend development.",
    problem:
      "Building MCP servers from scratch requires significant boilerplate and lacks standardized patterns for authentication, validation, and tool orchestration.",
    approach:
      "Created a TypeScript framework with decorator-based tool definitions, dependency injection, Zod validation, middleware pipeline, and built-in authentication to streamline MCP server development.",
    technologies: [
      "TypeScript",
      "MCP",
      "Zod",
      "Decorators",
      "Dependency Injection",
    ],
    highlights: [
      "MCP server development",
      "TypeScript decorators",
      "Dependency injection",
      "Authentication middleware",
      "Zod validation",
      "UI widgets",
      "Tool definitions",
      "NitroStudio",
      "AI-native backend architecture",
    ],
    concepts: [
      "Model Context Protocol",
      "AI-native backend architecture",
      "Decorator patterns",
      "Middleware pipelines",
    ],
    githubUrl: "https://github.com/DevarasettyKuldeep/nitrostack",
    featured: false,
    order: 6,
  },
  {
    id: "car-dealership",
    title: "Car Dealership Management System",
    shortTitle: "Car Dealership",
    category: "Java / OOP / Software Architecture",
    tags: ["Systems"],
    description:
      "A Java command-line application simulating dealership inventory, vehicle inspection, comparison, customer management and transaction processing.",
    detailedDescription:
      "A comprehensive Java application demonstrating advanced object-oriented programming principles through a simulated car dealership management system.",
    problem:
      "Demonstrating advanced OOP concepts through a practical, real-world simulation that covers inventory management, customer relationships, and transaction processing.",
    approach:
      "Designed a Java application using abstraction, interfaces, composition, and inheritance to model a complete dealership workflow from vehicle inspection to purchase.",
    technologies: ["Java"],
    highlights: [
      "Abstraction and interfaces",
      "Composition and inheritance",
      "ArrayList-based data management",
      "Customer management",
      "Purchase history tracking",
      "Transaction processing",
      "Vehicle comparison",
    ],
    concepts: [
      "Object-oriented design patterns",
      "SOLID principles",
      "Domain modeling",
    ],
    githubUrl:
      "https://github.com/DevarasettyKuldeep/Car-Dealership-Platform",
    featured: false,
    order: 7,
  },
  {
    id: "hand-tracking",
    title: "Real-Time Hand Tracking",
    shortTitle: "Hand Tracking",
    category: "Computer Vision",
    tags: ["Computer Vision", "AI / ML"],
    description:
      "A real-time computer vision application that detects hands and tracks 21 landmarks per hand using webcam input.",
    detailedDescription:
      "Uses MediaPipe and OpenCV to perform real-time hand detection and landmark tracking, rendering a skeleton overlay on webcam feed for up to two hands simultaneously.",
    problem:
      "Real-time hand tracking requires efficient computer vision pipelines that can process webcam frames with low latency while maintaining accurate landmark detection.",
    approach:
      "Leveraged MediaPipe's hand detection model with OpenCV for webcam capture and real-time visualization of 21 landmarks per hand.",
    technologies: ["Python", "MediaPipe", "OpenCV"],
    highlights: [
      "Up to two hands detection",
      "21 landmarks per hand",
      "Real-time skeleton rendering",
      "Webcam processing",
    ],
    concepts: [
      "Computer vision pipeline",
      "Landmark detection",
      "Real-time processing",
    ],
    githubUrl:
      "https://github.com/DevarasettyKuldeep/Hand-Tracking-using-MediaPipe-and-OpenCV",
    featured: false,
    order: 8,
  },
  {
    id: "experimental-os",
    title: "Experimental Operating System — eXpOS",
    shortTitle: "eXpOS",
    category: "Operating Systems / Systems",
    tags: ["Systems"],
    description:
      "An implementation-based operating systems project using the eXpOS educational platform, completed through Stage 10.",
    detailedDescription:
      "A hands-on operating systems project that involves implementing core OS concepts through staged development on the eXpOS educational platform.",
    problem:
      "Understanding operating system internals requires hands-on implementation of core concepts like process management, memory management, and system calls.",
    approach:
      "Followed the staged eXpOS curriculum to implement progressively complex OS components, building understanding from basic runtime environments to system-level operations.",
    technologies: ["eXpOS", "SPL", "ExpL"],
    highlights: [
      "OS concept implementation",
      "Runtime environment setup",
      "Staged development through Stage 10",
      "Low-level systems programming",
    ],
    concepts: [
      "Process management",
      "Memory management",
      "System calls",
      "OS architecture",
    ],
    githubUrl:
      "https://github.com/DevarasettyKuldeep/Experimental-Operating-System-",
    featured: false,
    order: 9,
  },
];

export const projectFilters = [
  "All",
  "AI / ML",
  "Agentic AI",
  "MCP",
  "Full-Stack",
  "Robotics",
  "IoT",
  "Computer Vision",
  "Systems",
];
