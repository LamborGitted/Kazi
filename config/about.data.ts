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
  tagline: "Endless Curiosity, Boundless Creation",
  bio: "A developer who loves building things and exploring new technologies. Passionate about open source, rhythm games, Minecraft, and creative coding. Always chasing the next challenge — whether it's shipping a side project at 3am or hitting a new personal best on osu! Mania.",
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
      year: "2007-6",
      title: "Born",
      description: "A new journey began",
    },
    {
      year: "2019",
      title: "First Steps in Programming",
      description: "Started learning to code, teaching myself C++ and Python",
    },
    {
      year: "2022-4",
      title: "The Charm of Rhythm",
      description: "Got hooked on osu!, especially Mania mode — chasing higher scores and faster reflexes",
    },
    {
      year: "2025-6",
      title: "Weaving Melodies",
      description: "Started arranging music, creating electronic tracks and game soundtracks — turning ideas into sound",
    },
    {
      year: "2025-7",
      title: "Frontend Adventure",
      description: "Began learning frontend development, exploring the world of the web and vanilla JS — falling deeper in love with coding",
    },
    {
      year: "2025-11",
      title: "First Vue.js Blog Project Begins",
      description: "Continued exploring and learning in tech, constantly improving my skills",
    },
    {
      year: "2025-12",
      title: "First Vue.js Blog Project Completed",
      description: "Gained invaluable experience from this project, fueling my drive to keep moving forward in frontend development",
    },
    {
      year: "2026-3",
      title: "React & Next.js",
      description: "Started learning React and Next.js to build more complex, high-performance applications — quickly fell in love with component architecture and server-side rendering",
    },
    {
      year: "2026-4",
      title: "Building a React & Next.js Personal Homepage",
      description: "Discovered wonderful libraries and tools like Framer Motion, Tailwind CSS, and more — making the build process both challenging and endlessly fun",
    },
  ],
};

export { aboutConfig };
export type { AboutConfig };
