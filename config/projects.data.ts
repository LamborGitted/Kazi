export const categories = ["all", "opensource", "minecraft"] as const;
export type Category = (typeof categories)[number];

type ProjectCategory = "opensource" | "minecraft";

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
  href: string;
  tags: readonly string[];
  year: string;
  visible: boolean;
}

const allProjects: Project[] = [
  {
    id: "oss-1",
    category: "opensource",
    title: "Lantxx Blog",
    description:
      "Personal blog and homepage built with Next.js, Tailwind CSS, and Motion. Featuring dark mode, i18n, and smooth animations.",
    href: "https://github.com/LamborGitted",
    tags: ["Next.js", "React", "TypeScript"],
    year: "2024",
    visible: true,
  },
  {
    id: "oss-2",
    category: "opensource",
    title: "Dotfiles",
    description:
      "Personal development environment configuration. Managed with GNU Stow for easy setup across machines.",
    href: "https://github.com/LamborGitted",
    tags: ["Shell", "Linux", "DevOps"],
    year: "2024",
    visible: true,
  },
  {
    id: "oss-3",
    category: "opensource",
    title: "CLI Toolkit",
    description:
      "A collection of command-line utilities for everyday development workflows. Built with Node.js and TypeScript.",
    href: "https://github.com/LamborGitted",
    tags: ["Node.js", "CLI", "TypeScript"],
    year: "2023",
    visible: true,
  },
  {
    id: "mc-1",
    category: "minecraft",
    title: "Enhanced Mechanics",
    description:
      "A gameplay overhaul mod that adds new combat mechanics, tool upgrades, and progression systems to Minecraft.",
    href: "#",
    tags: ["Fabric", "Gameplay"],
    year: "2024",
    visible: true,
  },
  {
    id: "mc-2",
    category: "minecraft",
    title: "Visual Overhaul",
    description:
      "Shader-compatible visual enhancement mod with custom particle effects, improved lighting, and atmospheric rendering.",
    href: "#",
    tags: ["Fabric", "Visual"],
    year: "2023",
    visible: true,
  },
  {
    id: "mc-3",
    category: "minecraft",
    title: "World Gen Plus",
    description:
      "Custom world generation mod adding new biomes, terrain features, and structure variations for fresh exploration.",
    href: "#",
    tags: ["Fabric", "World Gen"],
    year: "2023",
    visible: true,
  },
];

export const projects = allProjects.filter((p) => p.visible);
