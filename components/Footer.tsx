"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { appName } from "@/config/header.data";
import { socialLinks } from "@/config/home.data";

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "bilibili":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zm4 5.427c-.746 0-1.333-.6-1.333-1.334 0-.733.587-1.333 1.333-1.333s1.334.6 1.334 1.333c0 .734-.588 1.334-1.334 1.334zm5.334 0c-.746 0-1.334-.6-1.334-1.334 0-.733.588-1.333 1.334-1.333.746 0 1.333.6 1.333 1.333 0 .734-.587 1.334-1.333 1.334z" />
        </svg>
      );
    case "osu":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <circle cx="12" cy="12" r="10" />
          <text x="12" y="16" textAnchor="middle" fontSize="11" fill="white" fontFamily="var(--font-geist-mono)" fontWeight="bold">o!</text>
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-auto">
      <div className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, var(--accent) 20%, var(--accent) 80%, transparent 100%)",
          opacity: 0.3,
        }}
      />

      <div className="relative w-full max-w-5xl mx-auto px-6 pt-16 pb-8">
        <div className="relative flex flex-col items-center mb-16">
          <motion.span
            className="text-[8rem] sm:text-[10rem] md:text-[14rem] font-bold leading-none tracking-tighter select-none"
            style={{
              fontFamily: "var(--font-geist-sans)",
              color: "var(--foreground)",
              opacity: 0.03,
              lineHeight: 0.85,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.03, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Lantxx
          </motion.span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          <div className="flex flex-col gap-3">
            <span
              className="text-xs uppercase tracking-[0.2em] text-accent font-medium"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              About
            </span>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--muted)" }}
            >
              Personal corner on the internet. Building things, playing rhythm games, and exploring the web.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow"
              />
              <span
                className="text-xs tracking-wider uppercase"
                style={{ color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}
              >
                Online
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span
              className="text-xs uppercase tracking-[0.2em] text-accent font-medium"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Navigation
            </span>
            <nav className="flex flex-col gap-1.5">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Social", href: "/social" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-sm transition-colors duration-200"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                  }}
                >
                  <span
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: "var(--accent)", opacity: 0.5 }}
                  >
                    &rarr;
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <span
              className="text-xs uppercase tracking-[0.2em] text-accent font-medium"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Connect
            </span>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.icon}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted)",
                    background: "transparent",
                  }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "var(--accent)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.background = "var(--accent-glow)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  aria-label={link.label}
                >
                  <SocialIcon icon={link.icon} />
                </motion.a>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {[
                { name: "React", href: "https://react.dev/" },
                { name: "Next.js", href: "https://nextjs.org/" },
                { name: "Tailwind", href: "https://tailwindcss.com/" },
                { name: "Motion", href: "https://motion.dev/" },
              ].map((tech) => (
                <a
                  key={tech.name}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs transition-colors duration-200"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-geist-mono)",
                    opacity: 0.6,
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.opacity = "1";
                    (e.target as HTMLElement).style.color = "var(--foreground)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.opacity = "0.6";
                    (e.target as HTMLElement).style.color = "var(--muted)";
                  }}
                >
                  {tech.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="h-px w-full mb-6"
          style={{ background: "var(--border)" }}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-xs tracking-wide"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            &copy; {year} Lantxx
          </span>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-1.5 text-xs transition-colors duration-200 cursor-pointer"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
            }}
          >
            Back to top
            <svg
              className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 10V2M2 5l4-3 4 3" />
            </svg>
          </button>

          <span
            className="text-xs tracking-wide"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono)",
              opacity: 0.5,
            }}
          >
            Designed with intent
          </span>
        </div>
      </div>
    </footer>
  );
}
