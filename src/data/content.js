import {
  Blocks,
  Bot,
  BrainCircuit,
  Compass,
  Layers3,
  MousePointer2,
  PenTool,
  Sparkles,
  Store,
  TerminalSquare,
  WandSparkles
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
];

export const identityTags = [
  "Creative Technologist",
  "No-code Explorer",
  "AI-assisted Product Builder"
];

export const buildSignals = [
  "Prompt -> layout direction",
  "React + Vite prototype",
  "Motion + glass interface",
  "Replaceable video / screenshots"
];

export const creationFlow = [
  {
    step: "01",
    title: "Idea Capture",
    copy: "Start from a rough business or product idea, then define the user flow and first screen."
  },
  {
    step: "02",
    title: "AI-assisted Build",
    copy: "Use Codex, Claude and ChatGPT to turn the idea into a running prototype instead of a static mockup."
  },
  {
    step: "03",
    title: "Visual Iteration",
    copy: "Refine atmosphere, hierarchy, interaction and small details until the page feels like a real product."
  }
];

export const projects = [
  {
    title: "Personal Portfolio Website",
    description:
      "A dark, cinematic personal website designed as a digital space to present my identity, projects and creative direction.",
    tags: ["React", "Vite", "Personal Website", "Motion Design"],
    icon: Layers3,
    accent: "cyan",
    image: "images/optimized/portfolio-hero-shot.jpg",
    contribution: "Visual direction + frontend build",
    outcome: "Cinematic React experience"
  },
  {
    title: "AI Copywriting Mini Program Prototype",
    description:
      "A prototype concept for generating social media captions and hashtags through a simple three-step user flow.",
    tags: ["AI Tool", "WeChat Mini Program", "Content Creation", "Prototype"],
    icon: WandSparkles,
    accent: "green",
    image: "images/projects/ai-copywriting-prototype.png",
    contribution: "Product flow + prototype",
    outcome: "Three-step generation flow"
  },
  {
    title: "Pet Care App Prototype",
    description:
      "A Singapore-based temporary pet sitting service app prototype with login, sitter application and request posting functions.",
    tags: ["App Prototype", "UX Flow", "Pet Care", "Singapore"],
    icon: MousePointer2,
    accent: "green",
    image: "images/optimized/pet-care-app-prototype.jpg",
    contribution: "App structure + UX flow",
    outcome: "Core service journey"
  },
  {
    title: "Daily AI & Economy Briefing Automation",
    description:
      "A local automation project that collects public information and generates a daily AI and economy briefing in Markdown and HTML.",
    tags: ["Automation", "AI News", "Workflow", "Productivity"],
    icon: Bot,
    accent: "green",
    image: "images/projects/daily-ai-economy-briefing.png",
    contribution: "Workflow + output design",
    outcome: "Markdown + HTML briefing"
  },
  {
    title: "Traditional Business Website Concept",
    description:
      "A modern website concept for transforming a traditional hand tools business into a more premium and digital brand presence.",
    tags: ["Business Website", "Brand Upgrade", "Digital Transformation"],
    icon: Store,
    accent: "green",
    image: "images/optimized/traditional-business-website.jpg",
    contribution: "Brand direction + web concept",
    outcome: "Premium digital presence"
  }
];

export const strengths = [
  {
    title: "No-code Exploration",
    description:
      "I use AI tools and no-code thinking to quickly test digital product ideas.",
    icon: Blocks
  },
  {
    title: "AI-assisted Building",
    description:
      "I turn rough ideas into prototypes with the help of tools like ChatGPT, Claude and Codex.",
    icon: BrainCircuit
  },
  {
    title: "Product Thinking",
    description:
      "I focus on user flow, practical value and whether an idea can actually work.",
    icon: Compass
  },
  {
    title: "Visual Direction",
    description:
      "I care about atmosphere, layout, interaction and how a product feels at first glance.",
    icon: PenTool
  },
  {
    title: "Business Perspective",
    description:
      "I am interested in how digital tools can help traditional businesses improve their image and efficiency.",
    icon: Sparkles
  },
  {
    title: "Vibe Coding Process",
    description:
      "I learn by building in public: prompt, inspect, fix, polish and keep the result usable.",
    icon: TerminalSquare
  }
];
