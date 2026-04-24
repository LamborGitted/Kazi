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

      <div className="absolute flex items-center justify-center">
        <motion.div
          className="absolute w-500 h-8 bg-accent blur-2xl"
          initial={{ rotate: 0, opacity: 1 }}
          animate={{ rotate: 30, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.div
          className="absolute w-500 h-8 bg-accent blur-2xl"
          initial={{ rotate: 0, opacity: 1 }}
          animate={{ rotate: 150, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>


      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center">

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

        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl font-light text-foreground/70 max-w-lg"
        >
          {t.hero.subtitle}
        </motion.p> */}

      </div>

      

    </section>
  );
}
