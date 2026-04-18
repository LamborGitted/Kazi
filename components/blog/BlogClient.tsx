"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BlogPostMeta, TagInfo } from "./types";
import BlogCard from "@/components/blog/BlogCard";
import TagCloud from "@/components/blog/TagCloud";

interface BlogClientProps {
  posts: BlogPostMeta[];
  tags: TagInfo[];
}

export default function BlogClient({ posts, tags }: BlogClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-50px" });

  const filteredPosts = posts.filter((post) => {
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
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            <div className="flex-1 min-w-0">
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
                  Blog
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
                className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-none"
              >
                Thoughts
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
                Ideas, learnings, and explorations in code, design, and life.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 relative max-w-sm"
              >
                <input
                  type="text"
                  placeholder="Search posts..."
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
                    Filtered by
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
                    Clear
                  </button>
                </motion.div>
              )}

              <div className="mt-10 flex flex-col gap-5">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, i) => (
                    <BlogCard key={post.slug} {...post} index={i} />
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
                      No posts found
                      {activeTag ? ` with tag "${activeTag}"` : ""}
                      {search ? ` matching "${search}"` : ""}
                    </p>
                    <button
                      onClick={() => {
                        setActiveTag(null);
                        setSearch("");
                      }}
                      className="mt-3 text-xs text-accent cursor-pointer hover:underline"
                      style={{ fontFamily: "var(--font-geist-mono)" }}
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="hidden lg:block lg:w-[340px] shrink-0"
            >
              <div className="sticky top-24">
                <div className="rounded-2xl border p-6" style={{ borderColor: "var(--border)" }}>
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-medium"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    Tag Cloud
                  </span>
                  <div className="mt-6">
                    <TagCloud
                      tags={tags}
                      activeTag={activeTag}
                      onTagClick={setActiveTag}
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border p-6" style={{ borderColor: "var(--border)" }}>
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-medium"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    Stats
                  </span>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <div
                        className="text-2xl font-bold"
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                        }}
                      >
                        {posts.length}
                      </div>
                      <div
                        className="text-xs mt-1"
                        style={{
                          color: "var(--muted)",
                          fontFamily: "var(--font-geist-mono)",
                        }}
                      >
                        Posts
                      </div>
                    </div>
                    <div>
                      <div
                        className="text-2xl font-bold"
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                        }}
                      >
                        {tags.length}
                      </div>
                      <div
                        className="text-xs mt-1"
                        style={{
                          color: "var(--muted)",
                          fontFamily: "var(--font-geist-mono)",
                        }}
                      >
                        Topics
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
}
