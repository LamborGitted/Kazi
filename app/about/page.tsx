"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { techStack } from "@/config/about.data";
import { useLanguage } from "@/components/LanguageProvider";
import EnhancedTimeline from "@/components/EnhancedTimeline";

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
    <div ref={ref} className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <motion.span
          key={item.label}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{
            delay: 0.2 + i * 0.06,
            duration: 0.4,
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
          whileHover={{ scale: 1.08, y: -2 }}
          className="px-3 py-1.5 rounded-full border border-border bg-surface/80 text-xs font-mono whitespace-nowrap flex items-center gap-1.5 hover:border-accent/40 transition-colors cursor-default"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </motion.span>
      ))}
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

function Marquee({ roles, reverse = false }: { roles: string[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let targetRate = 1;
    let currentRate = 1;
    let timeoutId: ReturnType<typeof setTimeout>;
    let rafId: number;

    const onScroll = () => {
      targetRate = 3.5;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        targetRate = 1;
      }, 200);
    };

    const tick = () => {
      if (currentRate !== targetRate) {
        currentRate += (targetRate - currentRate) * 0.12;
        if (Math.abs(currentRate - targetRate) < 0.01) currentRate = targetRate;
        el.getAnimations().forEach((a) => {
          a.playbackRate = currentRate;
        });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden py-8 border-y border-border">
      <div
        ref={trackRef}
        className={`flex w-max whitespace-nowrap will-change-transform ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center gap-8 pr-8">
            {roles.map((role) => (
              <span
                key={`${group}-${role}`}
                className="flex shrink-0 items-center gap-8 text-2xl font-bold tracking-tight text-foreground/[0.15] select-none sm:text-3xl"
              >
                {role}
                <span className="text-lg text-accent/20">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function InterestGrid({ items }: { items: { label: string; emoji: string }[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-2">
      {items.map((item, i) => (
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
  const { t } = useLanguage();
  const about = t.about;
  const cards = about.cards;
  const translatedTimeline = about.timeline;
  const translatedInterests = about.interests;
  const translatedCurrently = about.currently;
  const translatedRoles = about.roles;

  ///bio and philosophy 卡片的滚动动画  
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // 从容器顶部进入视口开始，到容器底部离开视口结束
    offset: ["start start", "end start"] 
  });

  const bioX = useTransform(scrollYProgress, [0, 0.3, 1], ["0%", "0%", "-120vw"]);
  const cardX = useTransform(scrollYProgress, [0, 0.3, 1], ["0%", "0%", "150vw"]);


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
            {about.whoAmI}
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
            {about.tagline}
          </motion.p>
        </motion.div>
      </section>

      <Marquee roles={translatedRoles} />
      <Marquee roles={translatedRoles} reverse />

      <EnhancedTimeline
        timeline={translatedTimeline}
        subtitle={about.timelineSubtitle}
        heading={about.timelineHeading}
        description={about.timelineDescription}
      />
      {/* 给容器 200vh 的高度，提供足够的滚动空间来播放飞走动画 */}
      <section ref={sectionRef} className="relative w-full h-[90vw]">

        {/* Sticky 容器：固定在屏幕正中间，并隐藏向左飞出的溢出部分 */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6">

          <div className="relative z-10 flex flex-col items-center gap-12 text-center">

            {/* Bio 区域：修复 transform 冲突，将 rotate-x-9 移入 style */}
            <motion.div 
              style={{ x: bioX, rotateX: 9 }} 
              className="max-w-2xl"
            >
              <WordReveal text={about.bio} delay={0.3} />
            </motion.div>

            {/* Philosophy 卡片 */}
            <motion.div
              style={{ x: cardX }}
              className="max-w-xl w-full rounded-2xl border border-border/50 bg-surface/40 backdrop-blur-md p-8 shadow-2xl shadow-black/10"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -5, borderColor: "rgba(var(--accent), 0.2)" }}
            >
              <div className="flex justify-center mb-4">
                <span className="w-8 h-px bg-accent/40" />
              </div>
              <p className="text-lg italic text-foreground/70 leading-relaxed font-light">
                &ldquo;{about.philosophy}&rdquo;
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="relative w-full py-16 sm:py-24 px-6">


      </section>



      <section className="relative w-full py-16 sm:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

            <BentoCard delay={0.2}>
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                {cards.currently}
              </span>
              <div className="mt-4 space-y-3">
                {translatedCurrently.map((item, i) => (
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
                  {cards.activeNow}
                </span>
              </motion.div>
            </BentoCard>

            <BentoCard colSpan="sm:col-span-2" delay={0.35}>
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                {cards.techStack}
              </span>
              <div className="mt-2">
                <OrbitingTags items={techStack} />
              </div>
            </BentoCard>

            <BentoCard delay={0.4}>
              <span className="text-xs font-mono text-accent tracking-widest uppercase">
                {cards.interests}
              </span>
              <div className="mt-3">
                <InterestGrid items={translatedInterests} />
              </div>
            </BentoCard>

            <BentoCard delay={0.5} className="flex flex-col justify-center !p-6 sm:!p-8">
                <div className="font-mono text-xs space-y-2">
                  <div className="flex items-center gap-2 text-foreground/40">
                    <span className="text-accent">$</span>
                    <span>cat contact.md</span>
                  </div>
                  <div className="pl-4 border-l border-border space-y-1">
                    <TypingLine text="let's build something" delay={0.6} />
                    <TypingLine text="amazing together." delay={0.8} />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-accent">$</span>
                    <Link href="/contact" className="group flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
                      <span>start-collaboration --no-limits</span>
                      <motion.span 
                        className="inline-block w-2 h-4 bg-accent/80 group-hover:bg-accent"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </Link>
                  </div>
                </div>
              </BentoCard>
          </div>
        </div>
      </section>

      

      <div className="h-20" />
    </div>
  );
}
