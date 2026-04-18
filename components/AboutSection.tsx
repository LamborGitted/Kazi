"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

interface TechItem {
  label: string;
  color: string;
}

const techStack: TechItem[] = [
  { label: "TypeScript", color: "#3178c6" },
  { label: "React", color: "#61dafb" },
  { label: "Next.js", color: "#000000" },
  { label: "Tailwind CSS", color: "#06b6d4" },
  { label: "Node.js", color: "#339933" },
  { label: "osu! Mania", color: "#ff66aa" },
];

function TechPill({ item, index }: { item: TechItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.8, y: 20 }
      }
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ scale: 1.08, y: -4 }}
      className="relative group cursor-default"
    >
      <div
        className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"
        style={{ backgroundColor: item.color }}
      />
      <div className="relative px-4 py-2 rounded-full border border-border bg-surface/80 backdrop-blur-sm text-sm font-mono text-foreground/80 flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: item.color }}
        />
        {item.label}
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-32 px-6" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            {(t.about as Record<string, string>).sectionTitle}
          </span>
        </motion.div>

        <div ref={lineRef} className="mt-4 h-px w-16 bg-border relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            initial={{ width: 0 }}
            animate={lineInView ? { width: "100%" } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="mt-8 text-xl sm:text-2xl font-light leading-relaxed text-foreground/80"
        >
          {(t.about as Record<string, string>).briefIntro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {techStack.map((item, i) => (
            <TechPill key={item.label} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
