"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    observerRef.current = observer;

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="relative"
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between mb-4 cursor-pointer"
      >
        <span
          className="text-xs tracking-[0.2em] uppercase font-medium"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Contents
        </span>
        <motion.svg
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3"
          viewBox="0 0 12 12"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </motion.svg>
      </button>

      <motion.div
        animate={{
          height: isCollapsed ? 0 : "auto",
          opacity: isCollapsed ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
          />

          {headings.map((heading, i) => (
            <button
              key={heading.id}
              onClick={() => handleClick(heading.id)}
              className="block w-full text-left cursor-pointer group relative"
              style={{
                paddingLeft: `${(heading.level - 2) * 12 + 16}px`,
              }}
            >
              <div
                className="absolute left-0 w-px transition-all duration-300"
                style={{
                  top: `${(i / headings.length) * 100}%`,
                  height: `${100 / headings.length}%`,
                  background:
                    activeId === heading.id
                      ? "var(--accent)"
                      : "transparent",
                }}
              />

              <span
                className="block py-1.5 text-xs leading-snug transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color:
                    activeId === heading.id
                      ? "var(--accent)"
                      : "var(--muted)",
                  fontWeight:
                    activeId === heading.id ? 600 : 400,
                }}
              >
                {heading.text}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
