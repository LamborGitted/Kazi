interface AboutConfig {
  name: string;
  tagline: string;
  bio: string;
  philosophy: string;
  roles: string[];
  techStack: { label: string; color: string; category: string }[];
  interests: { label: string; emoji: string }[];
  currently: string[];
  timeline: { year: string; title: string; description: string }[];
}

const aboutConfig: AboutConfig = {
  name: "Lantxx",
  tagline: "Learn more, Build more",
  bio: "A developer who loves building things and exploring new technologies. Passionate about open source, rhythm games, and creative coding. Always chasing the next challenge — whether it's shipping a side project at 3am or hitting a new personal best on osu! Mania.",
  philosophy:
    "I believe the best way to learn is to build. Every project is a chance to experiment, break things, and discover something unexpected. Code is just another form of creative expression.",
  roles: [
    "Developer",
    "Creator",
    "Open Source Enthusiast",
    "osu! Mania Player",
    "Creative Coder",
    "Night Owl",
  ],
  techStack: [
    { label: "TypeScript", color: "#3178c6", category: "language" },
    { label: "React", color: "#61dafb", category: "framework" },
    { label: "Next.js", color: "#000000", category: "framework" },
    { label: "Tailwind CSS", color: "#06b6d4", category: "tooling" },
    { label: "Node.js", color: "#339933", category: "runtime" },
    { label: "Python", color: "#3776ab", category: "language" },
    { label: "Framer Motion", color: "#ff66aa", category: "tooling" },
    { label: "Git", color: "#f05032", category: "tooling" },
  ],
  interests: [
    { label: "Rhythm Games", emoji: "🎵" },
    { label: "Open Source", emoji: "🔓" },
    { label: "UI Design", emoji: "🎨" },
    { label: "Music", emoji: "🎧" },
    { label: "Anime", emoji: "✨" },
    { label: "Late Night Coding", emoji: "🌙" },
  ],
  currently: [
    "Building personal projects",
    "Playing osu! Mania",
    "Exploring new frameworks",
  ],
  timeline: [
    {
      year: "2024",
      title: "Building & Learning",
      description: "Started building personal homepage and open source projects",
    },
    {
      year: "2023",
      title: "Exploring Tech",
      description: "Deep dive into React, Next.js and modern web technologies",
    },
    {
      year: "2022",
      title: "Getting Started",
      description: "Began the coding journey, learning programming fundamentals",
    },
  ],
};

export { aboutConfig };
export type { AboutConfig };
