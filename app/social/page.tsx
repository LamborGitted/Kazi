"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BilibiliCard from "@/components/SocialComponent/Bilibili";
import GithubCard from "@/components/SocialComponent/Github";
import OsuCard from "@/components/SocialComponent/OSU";
import TwitterCard from "@/components/SocialComponent/Twitter";
import {
  github_config,
  bilibili_config,
  osu_config,
  twitter_config,
} from "@/config/social.data";

interface SocialSectionConfig {
  key: string;
  label: string;
  description: string;
  accentColor: string;
  accentHex: string;
  Component: React.ComponentType;
  visible: boolean;
  span?: string;
}

const sections: SocialSectionConfig[] = [
  {
    key: "github",
    label: "GitHub",
    description: "Open source projects & contributions",
    accentColor: "59,130,246",
    accentHex: "#58a6ff",
    Component: GithubCard,
    visible: github_config.show,
  },
  {
    key: "bilibili",
    label: "Bilibili",
    description: "Videos & creative content",
    accentColor: "251,114,153",
    accentHex: "#fb7299",
    Component: BilibiliCard,
    visible: bilibili_config.show,
  },
  {
    key: "osu",
    label: "osu!",
    description: "Rhythm game scores & stats",
    accentColor: "255,102,170",
    accentHex: "#ff66aa",
    Component: OsuCard,
    visible: osu_config.show,
  },
  {
    key: "twitter",
    label: "X / Twitter",
    description: "Thoughts & updates",
    accentColor: "29,155,240",
    accentHex: "#1d9bf0",
    Component: TwitterCard,
    visible: twitter_config.show,
  },
].filter((s) => s.visible);

const charVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.07,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

function SectionDivider({ accentColor }: { accentColor: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto px-6 py-12">
      <div className="h-px w-full relative overflow-hidden" style={{ background: "var(--border)" }}>
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ backgroundColor: `rgb(${accentColor})` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </div>
  );
}

function SocialSection({
  section,
  index,
}: {
  section: SocialSectionConfig;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {index > 0 && <SectionDivider accentColor={section.accentColor} />}

      <section
        ref={ref}
        className="relative w-full px-6 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: isInView ? 1 : 0,
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(${section.accentColor}, 0.04) 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-10 flex items-start gap-6 sm:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-2 pt-1"
            >
              <span
                className="text-6xl sm:text-7xl font-bold tracking-tighter leading-none opacity-[0.06]"
                style={{ color: `rgb(${section.accentColor})` }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: `rgb(${section.accentColor})` }}
                >
                  {section.key}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight"
              >
                {section.label}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-2 text-sm font-light text-foreground/50"
              >
                {section.description}
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              delay: 0.15,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <section.Component />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function SocialPage() {
  return (
    <main className="flex flex-col min-h-screen relative">
      <section className="relative flex flex-col items-center justify-center py-28 sm:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float-delay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs font-mono text-accent tracking-widest uppercase"
          >
            Connect
          </motion.span>

          <h1 className="mt-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none overflow-hidden [perspective:600px]">
            {"SOCIAL".split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          <div className="mt-8 h-px w-full max-w-xs mx-auto relative overflow-hidden" style={{ background: "var(--border)" }}>
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                delay: 1.2,
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-6 text-base sm:text-lg font-light text-foreground/50 max-w-md mx-auto"
          >
            Where I share, create, and connect with the world
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-muted/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-muted/40" />
          </motion.div>
        </motion.div>
      </section>

      {sections.map((section, i) => (
        <SocialSection key={section.key} section={section} index={i} />
      ))}

      <div className="h-24" />
    </main>
  );
}
