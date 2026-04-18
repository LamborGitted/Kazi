"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { aboutConfig } from "@/config/about.data";

const charVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.07,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setStyle({
        transform: `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02,1.02,1.02)`,
        transition: "transform 0.15s ease-out",
      });
    },
    [intensity]
  );

  const handleLeave = useCallback(() => {
    setStyle({
      transform:
        "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)",
      transition: "transform 0.5s ease-out",
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMove, handleLeave]);

  return { ref, style };
}

function BentoCard({
  children,
  className = "",
  delay = 0,
  colSpan = "",
  rowSpan = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  colSpan?: string;
  rowSpan?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const tilt = useTilt(6);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`${colSpan} ${rowSpan}`}
    >
      <div
        ref={tilt.ref}
        style={tilt.style}
        className={`relative rounded-2xl border border-border bg-surface/60 backdrop-blur-sm p-6 sm:p-8 h-full overflow-hidden group ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-transparent to-accent/0 group-hover:from-accent/5 group-hover:to-accent/3 transition-all duration-700" />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <p ref={ref} className="text-base sm:text-lg leading-relaxed text-foreground/75">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 15, filter: "blur(4px)" }
          }
          transition={{
            delay: delay + i * 0.04,
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function OrbitingTags({
  items,
}: {
  items: { label: string; color: string }[];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative w-full h-full min-h-[200px] flex items-center justify-center">
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-accent/20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute w-px h-px">
        {items.map((item, i) => {
          const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
          const radiusX = 42;
          const radiusY = 32;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      x: Math.cos(angle) * radiusX,
                      y: Math.sin(angle) * radiusY,
                    }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                delay: 0.3 + i * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{
                  x: [
                    Math.cos(angle) * radiusX,
                    Math.cos(angle + 0.1) * radiusX,
                    Math.cos(angle) * radiusX,
                  ],
                  y: [
                    Math.sin(angle) * radiusY,
                    Math.sin(angle + 0.1) * radiusY,
                    Math.sin(angle) * radiusY,
                  ],
                }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="px-3 py-1.5 rounded-full border border-border bg-surface/80 text-xs font-mono whitespace-nowrap flex items-center gap-1.5 hover:border-accent/40 transition-colors cursor-default">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function TypingLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="flex items-center gap-2">
      <motion.span
        initial={{ width: 0 }}
        animate={isInView ? { width: "0.5rem" } : {}}
        transition={{ delay, duration: 0.3 }}
        className="h-px bg-accent shrink-0"
        style={{ width: 0 }}
      />
      <motion.span
        initial={{ opacity: 0, x: -5 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
        className="text-sm text-foreground/60 font-light"
      >
        {text}
      </motion.span>
    </div>
  );
}

function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-6">
      {aboutConfig.timeline.map((item, i) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            delay: 0.2 + i * 0.15,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="flex gap-4 items-start"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300, damping: 20 }}
              className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 mt-1.5"
            />
            {i < aboutConfig.timeline.length - 1 && (
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: "2rem" } : {}}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                className="w-px bg-border"
              />
            )}
          </div>
          <div>
            <span className="text-xs font-mono text-accent tracking-wider">
              {item.year}
            </span>
            <p className="text-sm font-medium mt-0.5">{item.title}</p>
            <p className="text-xs text-foreground/45 mt-0.5">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Marquee() {
  const items = [...aboutConfig.roles, ...aboutConfig.roles];

  return (
    <div className="w-full overflow-hidden py-8 border-y border-border">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {items.map((role, i) => (
          <span
            key={i}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground/[0.06] select-none flex items-center gap-8"
          >
            {role}
            <span className="text-accent/20 text-lg">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function InterestGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-2">
      {aboutConfig.interests.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.1 + i * 0.08,
            type: "spring",
            stiffness: 200,
            damping: 18,
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/40 border border-border/50 cursor-default"
        >
          <span className="text-base">{item.emoji}</span>
          <span className="text-xs text-foreground/60">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="relative">
      <section className="relative flex flex-col items-center justify-center py-28 sm:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float-delay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs font-mono text-accent tracking-widest uppercase"
          >
            Who am I
          </motion.span>

          <h1 className="mt-6 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none overflow-hidden [perspective:600px]">
            {"ABOUT".split("").map((char, i) => (
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
              transition={{
                delay: 1.2,
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-6 text-base sm:text-lg font-light text-foreground/50 max-w-md mx-auto font-mono"
          >
            {aboutConfig.tagline}
          </motion.p>
        </motion.div>
      </section>

      <Marquee />

      <section className="relative w-full py-16 sm:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <BentoCard
              colSpan="sm:col-span-2"
              delay={0.1}
            >
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                Bio
              </span>
              <div className="mt-4">
                <WordReveal text={aboutConfig.bio} delay={0.3} />
              </div>
              <motion.div
                className="mt-6 h-px w-16 bg-border relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </motion.div>
            </BentoCard>

            <BentoCard delay={0.2}>
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                Currently
              </span>
              <div className="mt-4 space-y-3">
                {aboutConfig.currently.map((item, i) => (
                  <TypingLine key={item} text={item} delay={0.4 + i * 0.15} />
                ))}
              </div>
              <motion.div
                className="mt-5 flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" />
                <span className="text-[10px] font-mono text-foreground/30 tracking-wider uppercase">
                  Active now
                </span>
              </motion.div>
            </BentoCard>

            <BentoCard delay={0.3}>
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                Philosophy
              </span>
              <div className="mt-4">
                <p className="text-sm italic text-foreground/60 leading-relaxed">
                  &ldquo;{aboutConfig.philosophy}&rdquo;
                </p>
              </div>
            </BentoCard>

            <BentoCard colSpan="sm:col-span-2" delay={0.35}>
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                Tech Stack
              </span>
              <div className="mt-2">
                <OrbitingTags items={aboutConfig.techStack} />
              </div>
            </BentoCard>

            <BentoCard delay={0.4}>
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                Interests
              </span>
              <div className="mt-3">
                <InterestGrid />
              </div>
            </BentoCard>

            <BentoCard colSpan="sm:col-span-2" delay={0.45}>
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                Journey
              </span>
              <div className="mt-4">
                <TimelineSection />
              </div>
            </BentoCard>

            <BentoCard
              delay={0.5}
              className="flex flex-col items-center justify-center text-center !p-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="text-4xl sm:text-5xl font-bold tracking-tighter leading-none"
              >
                <span className="text-accent">&infin;</span>
              </motion.div>
              <p className="mt-3 text-xs text-foreground/40 font-mono tracking-wider">
                THINGS TO LEARN
              </p>
              <Link
                href="/contact"
                className="mt-4 text-xs font-mono text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
              >
                Get in touch
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  &rarr;
                </motion.span>
              </Link>
            </BentoCard>
          </div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
