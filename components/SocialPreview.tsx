"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  github_config,
  bilibili_config,
  osu_config,
  twitter_config,
} from "@/config/social.data";

interface SocialPreviewItem {
  label: string;
  href: string;
  bgImage: string;
  accentColor: string;
  description: string;
  visible: boolean;
}

const previews: SocialPreviewItem[] = [
  {
    label: "GitHub",
    href: github_config.homepage_url,
    bgImage: github_config.background_img,
    accentColor: "#58a6ff",
    description: "Open source projects & contributions",
    visible: github_config.show,
  },
  {
    label: "Bilibili",
    href: bilibili_config.homepage_url,
    bgImage: bilibili_config.background_img,
    accentColor: "#fb7299",
    description: "Videos & creative content",
    visible: bilibili_config.show,
  },
  {
    label: "osu!",
    href: osu_config.homepage_url,
    bgImage: osu_config.background_img,
    accentColor: "#ff66aa",
    description: "Rhythm game scores & stats",
    visible: osu_config.show,
  },
  {
    label: "Twitter",
    href: twitter_config.homepage_url,
    bgImage: twitter_config.background_img || "/image/3.webp",
    accentColor: "#1d9bf0",
    description: "Thoughts & updates",
    visible: twitter_config.show,
  },
].filter((p) => p.visible);

function PreviewCard({
  item,
  index,
}: {
  item: SocialPreviewItem;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={item.href} target="_blank" rel="noopener noreferrer">
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-border bg-surface cursor-pointer"
        >
          <div
            className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${item.accentColor}22 0%, transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute inset-0 blur-2xl opacity-30"
              style={{ backgroundColor: item.accentColor }}
            />
          </div>

          <div className="relative h-full p-6 flex flex-col justify-between z-10">
            <div className="flex items-center justify-between">
              <span
                className="text-2xl font-bold tracking-tight"
                style={{ color: item.accentColor }}
              >
                {item.label}
              </span>
              <motion.span
                className="text-muted text-lg"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                &rarr;
              </motion.span>
            </div>

            <div>
              <p className="text-sm text-foreground/60 font-light">
                {item.description}
              </p>
              <div
                className="mt-3 h-0.5 w-12 rounded-full group-hover:w-20 transition-all duration-500"
                style={{ backgroundColor: item.accentColor }}
              />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function SocialPreview() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-50px" });

  return (
    <section className="relative w-full py-32 px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono text-accent tracking-widest uppercase"
            >
              Connect
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Find Me Online
            </motion.h2>
            <div
              ref={lineRef}
              className="mt-4 h-px w-16 bg-border relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: 0 }}
                animate={lineInView ? { width: "100%" } : {}}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              href="/social"
              className="text-sm font-mono text-muted hover:text-accent transition-colors duration-300 flex items-center gap-1"
            >
              View All
              <span>&rarr;</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {previews.map((item, i) => (
            <PreviewCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
