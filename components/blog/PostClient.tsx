"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import TableOfContents from "@/components/blog/TableOfContents";
import { useLanguage } from "@/components/LanguageProvider";
import type { BlogPostMeta, Heading } from "@/components/blog/types";

interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  htmlContent: string;
  headings: Heading[];
  readingTime: number;
}

interface PostClientProps {
  post: PostData;
  postZh: PostData;
  recentPosts: BlogPostMeta[];
  recentPostsZh: BlogPostMeta[];
}

export default function PostClient({ post, postZh, recentPosts, recentPostsZh }: PostClientProps) {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-50px" });
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-20px" });
  const { t, locale } = useLanguage();
  const blog = t.blog;
  const [copied, setCopied] = useState(false);

  const currentPost = locale === "zh" && postZh ? postZh : post;
  const currentRecent = locale === "zh" ? recentPostsZh : recentPosts;

  const formattedDate = new Date(currentPost.date).toLocaleDateString(
    locale === "zh" ? "zh-CN" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-150 h-75 rounded-full blur-3xl"
          style={{
            background: "var(--accent-glow)",
            opacity: 0.25,
          }}
        />
      </div>

      <article className="relative w-full pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="flex-1 min-w-0">
              <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs tracking-wide mb-8 transition-colors duration-200 hover:text-accent"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2L4 6L8 10" />
                  </svg>
                  {blog.backToBlog}
                </Link>

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
                    className="h-3 w-px"
                    style={{ background: "var(--border)" }}
                  />
                  <span
                    className="text-xs tracking-wider"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {currentPost.readingTime} {blog.minRead}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  {currentPost.title}
                </h1>

                <div className="flex flex-wrap gap-2 mt-5">
                  {currentPost.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="px-3 py-1 rounded-full text-xs border transition-all duration-200 hover:border-accent hover:text-accent"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--muted)",
                        fontFamily: "var(--font-geist-mono)",
                      }}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                <div
                  ref={lineRef}
                  className="mt-8 h-px w-full relative overflow-hidden"
                  style={{ background: "var(--border)" }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-accent"
                    initial={{ width: 0 }}
                    animate={lineInView ? { width: "100%" } : {}}
                    transition={{
                      duration: 1.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>
              </motion.div>

              <div className="mt-10">
                <MarkdownRenderer htmlContent={currentPost.htmlContent} />
              </div>

              <div
                className="mt-16 h-px w-full"
                style={{ background: "var(--border)" }}
              />

              <div className="mt-10">
                <span
                  className="text-xs tracking-[0.2em] uppercase font-medium"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  {blog.morePosts}
                </span>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentRecent.map((rp) => (
                    <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="group rounded-xl border p-4 transition-colors duration-300 hover:border-accent"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <h4
                          className="text-sm font-semibold tracking-tight group-hover:text-accent transition-colors duration-200 line-clamp-2"
                        >
                          {rp.title}
                        </h4>
                        <p
                          className="mt-2 text-xs line-clamp-2"
                          style={{ color: "var(--muted)" }}
                        >
                          {rp.excerpt}
                        </p>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden lg:block lg:w-[260px] shrink-0"
            >
              <div className="sticky top-24">
                <TableOfContents headings={currentPost.headings} />

                <div
                  className="mt-8 rounded-xl border p-5"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span
                    className="text-xs tracking-[0.2em] uppercase font-medium"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-geist-mono)",
                    }}
                  >
                    {blog.share}
                  </span>
                  <div className="mt-3 flex gap-2">
                    <motion.button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg border text-xs transition-all duration-200 hover:border-accent hover:text-accent cursor-pointer"
                      style={{
                        borderColor: copied ? "var(--accent)" : "var(--border)",
                        color: copied ? "var(--accent)" : "var(--muted)",
                        fontFamily: "var(--font-geist-geist-mono)",
                      }}
                    >
                      {copied ? blog.copied : blog.copyLink}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </article>
    </div>
  );
}
