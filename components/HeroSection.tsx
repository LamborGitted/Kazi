"use client";

import { motion } from "framer-motion";
import { mainTitle } from "@/config/home.data";
import { useLanguage } from "@/components/LanguageProvider";

const charVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.8 + i * 0.04,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const lineVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 1.8 + i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};


export default function HeroSection() {
  const { t } = useLanguage();
  const translatedLines = t.hero.lines;

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float-delay" />
      </div>

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface/50 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
          <span className="text-xs font-mono text-muted tracking-wider uppercase">
            Available
          </span>
        </motion.div> */}

        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none overflow-hidden">
          {mainTitle.split("").map((char, i) => (
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
            transition={{ delay: 1.5, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        <div className="mt-8 flex items-center gap-3 flex-wrap justify-center">
          {translatedLines.map((line: string, i: number) => (
            <motion.span
              key={line}
              custom={i}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="text-sm sm:text-base font-mono text-muted tracking-wide"
            >
              {line}
              {i < translatedLines.length - 1 && (
                <span className="mx-2 text-border">/</span>
              )}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl font-light text-foreground/70 max-w-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="mt-16"
        >
          <Link
            href="/social"
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm hover:bg-accent transition-colors duration-300"
          >
            {(t.hero as Record<string, string>).explore}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              &rarr;
            </motion.span>
          </Link>
        </motion.div> */}
      </div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-muted/30 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-muted/40" />
        </motion.div>
      </motion.div> */}
    </section>
  );
}
