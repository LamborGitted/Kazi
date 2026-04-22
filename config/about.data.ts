interface TechItem {
  label: string;
  color: string;
  category: string;
}

const techStack: TechItem[] = [
  { label: "TypeScript", color: "#3178c6", category: "language" },
  { label: "JavaScript", color: "#f7df1e", category: "language" },
  { label: "HTML/CSS", color: "#e34c26", category: "language" },
  { label: "React", color: "#61dafb", category: "framework" },
  { label: "Next.js", color: "#000000", category: "framework" },
  { label: "Tailwind CSS", color: "#06b6d4", category: "tooling" },
  { label: "Node.js", color: "#339933", category: "runtime" },
  { label: "Python", color: "#3776ab", category: "language" },
  { label: "Framer Motion", color: "#ff66aa", category: "tooling" },
  { label: "Git", color: "#f05032", category: "tooling" },
  { label: "Vue.js", color: "#42b883", category: "framework" },
  { label: "Qt/C++", color: "#41cd52", category: "framework" },
];

export { techStack };
