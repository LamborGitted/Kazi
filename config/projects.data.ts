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
    title: "XLA Blog",
    description:
      "我单独制作的第一个网站，使用Vue3和Typescript。虽然不是特别完美。",
    href: "https://github.com/LamborGitted/xla-blog",
    tags: ["Vue.js", "Vite", "TypeScript"],
    year: "2025",
    visible: true,
  },
  {
    id: "oss-2",
    category: "opensource",
    title: "My Arch Dotfiles",
    description:
      "从第一次更广阔的认识Linux，到折腾出还算不错的Arch Linux配置。",
    href: "https://github.com/LamborGitted/my-arch-dotfiles",
    tags: ["Shell", "Linux", "DevOps"],
    year: "2025",
    visible: true,
  },
  {
    id: "mc-1",
    category: "minecraft",
    title: "MineShell",
    description:
      "一个实现了基本功能的在Java版MC里运行的Shell（未完善）",
    href: "https://github.com/LamborGitted/MineShell",
    tags: ["Fabric", "Gameplay"],
    year: "2026",
    visible: true,
  },
];

export const projects = allProjects.filter((p) => p.visible);
