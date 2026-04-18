"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  index: number;
}

export default function BlogCard({
  slug,
  title,
  date,
  excerpt,
  tags,
  readingTime,
  index,
}: BlogCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/blog/${slug}`}>
        <motion.article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="group relative rounded-2xl border overflow-hidden cursor-pointer"
          style={{
            borderColor: hovered ? "var(--accent)" : "var(--border)",
            background: hovered ? "var(--surface)" : "transparent",
            transition: "border-color 0.3s, background 0.3s",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 20% 100%, var(--accent-glow), transparent 60%)",
            }}
          />

          <div className="relative z-10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs tracking-wider uppercase"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {formattedDate}
              </span>
              <span
                className="h-px flex-1"
                style={{ background: "var(--border)" }}
              />
              <span
                className="text-xs tracking-wider"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {readingTime} min read
              </span>
            </div>

            <h3
              className="text-xl sm:text-2xl font-bold tracking-tight mb-3 transition-colors duration-300"
              style={{
                color: hovered ? "var(--accent)" : "var(--foreground)",
              }}
            >
              {title}
            </h3>

            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--muted)" }}
            >
              {excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs tracking-wide border"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                    background: hovered ? "var(--accent-glow)" : "transparent",
                    transition: "background 0.3s",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 h-px transition-all duration-500"
            style={{
              width: hovered ? "100%" : "0%",
              background:
                "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
        </motion.article>
      </Link>
    </motion.div>
  );
}
