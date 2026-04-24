"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/components/LanguageProvider";
import { localeNames } from "@/config/i18n/locales";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const { resolvedTheme } = useTheme();

  const chromeMuted = resolvedTheme === "dark"
    ? "var(--muted)"
    : "rgba(250, 250, 250, 0.68)";
  const chromeForeground = "rgba(250, 250, 250, 0.96)";

  const toggle = () => {
    setLocale(locale === "en" ? "zh" : "en");
  };

  return (
    <button
      onClick={toggle}
      className="relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 cursor-pointer"
      style={{
        color: chromeMuted,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = chromeForeground;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = chromeMuted;
      }}
      aria-label={`Switch language to ${locale === "en" ? "Chinese" : "English"}`}
    >
      <motion.span
        key={locale}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.2 }}
        className="text-xs font-bold tracking-wide"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        {localeNames[locale === "en" ? "zh" : "en"]}
      </motion.span>
    </button>
  );
}
