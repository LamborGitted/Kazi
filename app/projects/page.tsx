"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects, categories, type Category, type Project } from "@/config/projects.data";
import { useLanguage } from "@/components/LanguageProvider";
import type { ProjectCategoriesTranslations } from "@/config/i18n/types";

const charVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.06,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const categoryIcons: Record<string, string> = {
  opensource: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  minecraft: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
};

const categoryAccentColors: Record<string, string> = {
  opensource: "#34d399",
  minecraft: "#f59e0b",
};

function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const d = categoryIcons[category];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || "w-5 h-5"}
    >
      <path d={d} />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const accent = categoryAccentColors[project.category] || "var(--accent)";

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group relative block rounded-2xl border border-border bg-surface/60 backdrop-blur-sm overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${accent}06 0%, transparent 50%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 120%, ${accent}12, transparent 60%)`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-accent/0 group-hover:from-accent/5 group-hover:to-accent/3 transition-all duration-700" />

        <div className="relative z-10 p-6 sm:p-7">
          <div className="flex items-start justify-between mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: `${accent}10`,
                color: accent,
              }}
            >
              <CategoryIcon category={project.category} className="w-5 h-5" />
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full border"
                style={{
                  color: accent,
                  borderColor: `${accent}30`,
                  background: `${accent}08`,
                }}
              >
                {project.year}
              </span>
              <svg
                className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12L12 4M12 4H6M12 4v6" />
              </svg>
            </div>
          </div>

          <h3 className="text-lg font-bold tracking-tight mb-2 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-sm text-foreground/50 font-light leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <div className="mt-5 flex items-center gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border bg-background/40 text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <div
              className="h-px flex-1 transition-all duration-500 group-hover:flex-[3]"
              style={{ background: `${accent}20` }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-500 group-hover:w-2 group-hover:h-2"
              style={{ background: accent, opacity: 0.4 }}
            />
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

function CategoryFilter({
  active,
  onChange,
  labels,
}: {
  active: Category;
  onChange: (c: Category) => void;
  labels: Record<string, string>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="flex flex-wrap items-center gap-2">
      {categories.map((cat, i) => {
        const isActive = active === cat;
        const accent = cat === "all" ? "var(--accent)" : categoryAccentColors[cat] || "var(--accent)";
        return (
          <motion.button
            key={cat}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
            onClick={() => onChange(cat)}
            className="relative px-4 py-2 rounded-full text-sm font-mono tracking-wide transition-all duration-300 cursor-pointer"
            style={{
              background: isActive ? `${accent}15` : "transparent",
              color: isActive ? accent : "var(--muted)",
              border: `1px solid ${isActive ? `${accent}40` : "var(--border)"}`,
            }}
          >
            {isActive && (
              <motion.div
                layoutId="category-indicator"
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${accent}` }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {cat === "all" ? labels.all : labels[cat]}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

function StatsBar({ filtered, labels }: { filtered: Project[]; labels: ProjectCategoriesTranslations }) {
  const counts: Record<string, number> = {};
  for (const p of filtered) {
    counts[p.category] = (counts[p.category] || 0) + 1;
  }

  return (
    <div className="flex items-center gap-4 text-xs font-mono text-muted">
      <span>
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </span>
      <span className="w-1 h-1 rounded-full bg-border" />
      {Object.entries(counts).map(([cat, count]) => (
        <span key={cat} className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: categoryAccentColors[cat] }}
          />
          {labels[cat as keyof ProjectCategoriesTranslations]} {count}
        </span>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { t } = useLanguage();
  const projectsT = t.projects;
  const categoryLabels = projectsT.categories;

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="relative">
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
            {projectsT.subtitle}
          </motion.span>

          <h1 className="mt-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none overflow-hidden [perspective:600px]">
            {(projectsT.heading).split("").map((char, i) => (
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

          <div className="mt-8 h-px w-full max-w-xs mx-auto bg-border relative overflow-hidden">
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
            className="mt-6 text-base sm:text-lg font-light text-foreground/50 max-w-lg mx-auto"
          >
            {projectsT.description}
          </motion.p>
        </motion.div>
      </section>

      <section className="relative w-full pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
              labels={{
                all: projectsT.filterAll,
                opensource: categoryLabels.opensource,
                minecraft: categoryLabels.minecraft,
              }}
            />
            <StatsBar filtered={filtered} labels={categoryLabels} />
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--muted)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-7"
                >
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                </svg>
              </div>
              <p className="text-sm text-muted font-mono">No projects in this category yet.</p>
            </motion.div>
          )}
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
