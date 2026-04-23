"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BlogPostMeta, TagInfo } from "./types";
import BlogCard from "@/components/blog/BlogCard";
import { useLanguage } from "@/components/LanguageProvider";

interface BlogClientProps {
  posts: BlogPostMeta[];
  postsZh: BlogPostMeta[];
  tags: TagInfo[];
  tagsZh: TagInfo[];
}

export default function BlogClient({ posts, postsZh, tags, tagsZh }: BlogClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-50px" });
  const { t, locale } = useLanguage();
  const blog = t.blog;

  const currentPosts = locale === "zh" ? postsZh : posts;
  const currentTags = locale === "zh" ? tagsZh : tags;

  const filteredPosts = currentPosts.filter((post) => {
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    const matchesSearch =
      !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) =>
        t.toLowerCase().includes(search.toLowerCase())
      );
    return matchesTag && matchesSearch;
  });

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl"
          style={{
            background: "var(--accent-glow)",
            opacity: 0.4,
          }}
        />
      </div>

      <section className="relative w-full pt-20 pb-16 px-6" ref={sectionRef}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span
              className="text-xs tracking-[0.2em] uppercase font-medium"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              {blog.sectionTitle}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
            className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-none"
          >
            {blog.heading}
            <span
              className="text-accent"
              style={{ textShadow: "0 0 40px var(--accent-glow)" }}
            >
              .
            </span>
          </motion.h1>

          <div
            ref={lineRef}
            className="mt-4 h-px w-16 relative overflow-hidden"
            style={{ background: "var(--border)" }}
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-sm leading-relaxed max-w-md"
            style={{ color: "var(--muted)" }}
          >
            {blog.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {currentTags.map((tg) => (
              <button
                key={tg.tag}
                onClick={() => setActiveTag(activeTag === tg.tag ? null : tg.tag)}
                className="px-3 py-1 rounded-full text-xs border transition-all duration-200 cursor-pointer"
                style={{
                  borderColor:
                    activeTag === tg.tag ? "var(--accent)" : "var(--border)",
                  color:
                    activeTag === tg.tag ? "var(--accent)" : "var(--muted)",
                  background:
                    activeTag === tg.tag ? "var(--accent-glow)" : "transparent",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {tg.tag}
                <span className="ml-1 opacity-50">{tg.count}</span>
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 relative max-w-sm"
          >
            <input
              type="text"
              placeholder={blog.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all duration-300 focus:border-accent"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
                fontFamily: "var(--font-geist-mono)",
              }}
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="var(--muted)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="M10.5 10.5L14 14" />
            </svg>
          </motion.div>

          {activeTag && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex items-center gap-2"
            >
              <span
                className="text-xs"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {blog.filteredBy}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs border"
                style={{
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {activeTag}
              </span>
              <button
                onClick={() => setActiveTag(null)}
                className="text-xs cursor-pointer transition-colors duration-200 hover:text-accent"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {blog.clear}
              </button>
            </motion.div>
          )}

          <div className="mt-10 flex flex-col gap-5">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, i) => (
                <BlogCard key={post.slug} {...post} index={i} minReadLabel={blog.minRead} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p
                  className="text-sm"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  {blog.noPostsFound}
                  {activeTag ? ` ${blog.withTag} "${activeTag}"` : ""}
                  {search ? ` ${blog.matching} "${search}"` : ""}
                </p>
                <button
                  onClick={() => {
                    setActiveTag(null);
                    setSearch("");
                  }}
                  className="mt-3 text-xs text-accent cursor-pointer hover:underline"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {blog.clearAllFilters}
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
