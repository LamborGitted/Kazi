"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";


export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-50px" });
  const { t } = useLanguage();

  return (
    <section className="relative w-full py-32 px-6" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="text-xs font-mono text-accent tracking-widest uppercase">
            {t.about.sectionTitle}
          </span>
        </motion.div>

        <div ref={lineRef} className="mt-4 h-px w-16 bg-border relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            initial={{ width: 0 }}
            animate={lineInView ? { width: "100%" } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="mt-8 text-xl sm:text-2xl font-light leading-relaxed text-foreground/80"
        >
          {t.about.briefIntro}
        </motion.p>

      </div>
    </section>
  );
}
