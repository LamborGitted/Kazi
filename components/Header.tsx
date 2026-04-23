"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { navLinks } from "@/config/header.data";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";

const underlineVariants = {
  rest: { width: 0, left: "50%" },
  hover: { width: "100%", left: "0%" },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const lastScrollY = useRef(0);

  useEffect(() => setMounted(true), []);

  const translatedNavLinks = navLinks.map((link) => ({
    ...link,
    label: t.nav[link.id as keyof typeof t.nav] || link.label,
  }));

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > lastScrollY.current && currentY > 56) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out"
      style={{
        backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: mounted && resolvedTheme === "dark" ? "#1a1a1a" : "#000000",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 transition-opacity duration-500"
        style={{
          opacity: scrolled ? 1 : 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--border), var(--accent), var(--border), transparent)",
        }}
      />

      <div className="relative w-full max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* <Link href="/" className="group flex items-center gap-1.5 relative">
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {"Lant"}
            <span className="text-accent">xx</span>
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent"
            style={{
              opacity: scrolled ? 0 : 1,
              transition: "opacity 0.3s",
            }}
          />
        </Link> */}

        <nav className="hidden md:flex items-center gap-1 ml-auto">
          {translatedNavLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href || "/"}
              className="relative px-3 py-1.5 text-sm tracking-wide"
              style={{
                fontFamily: "var(--font-geist-mono)",
                color:
                  pathname === link.href
                    ? "var(--accent)"
                    : "var(--muted)",
              }}
            >
              <motion.div
                className="absolute bottom-0 h-px bg-accent"
                variants={underlineVariants}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  width: pathname === link.href ? "100%" : 0,
                  left: pathname === link.href ? "0%" : "50%",
                }}
              />
              <span
                className="relative transition-colors duration-300"
                style={{
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLElement).style.color = "var(--foreground)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLElement).style.color = "var(--muted)";
                  }
                }}
              >
                {link.label}
              </span>
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-0 left-0 right-0 h-px bg-accent"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <div className="ml-2">
            <LanguageToggle />
          </div>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex md:hidden items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <button
            className="relative w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className="block h-px w-full transition-all duration-300 origin-center"
                style={{
                  background: "var(--foreground)",
                  transform: mobileOpen
                    ? "rotate(45deg) translateY(3.5px)"
                    : "none",
                }}
              />
              <span
                className="block h-px w-full transition-all duration-300 origin-center"
                style={{
                  background: "var(--foreground)",
                  transform: mobileOpen
                    ? "rotate(-45deg) translateY(-3.5px)"
                    : "none",
                }}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden relative overflow-hidden"
            style={{ background: "var(--background)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-1 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              {translatedNavLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href || "/"}
                    className="block py-3 text-2xl font-light tracking-tight transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      color:
                        pathname === link.href
                          ? "var(--accent)"
                          : "var(--muted)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <span className="text-accent/40 mr-3 text-sm">
                      0{i + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="mt-4 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--accent), transparent)",
                }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
