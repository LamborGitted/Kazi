"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { techStack } from "@/config/about.data";
import { useLanguage } from "@/components/LanguageProvider";
import EnhancedTimeline from "@/components/EnhancedTimeline";

interface TechItem {
  label: string;
  color: string;
  category: string;
}

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

const techCategoryOrder = ["language", "framework", "tooling", "runtime"] as const;

const techCategoryLabels: Record<(typeof techCategoryOrder)[number], string> = {
  language: "语言",
  framework: "框架",
  tooling: "工具",
  runtime: "运行时",
};

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

// function OrbitingTags({
//   items,
// }: {
//   items: { label: string; color: string }[];
// }) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-40px" });

//   return (
//     <div ref={ref} className="flex flex-wrap gap-2">
//       {items.map((item, i) => (
//         <motion.span
//           key={item.label}
//           initial={{ opacity: 0, scale: 0.8, y: 10 }}
//           animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
//           transition={{
//             delay: 0.2 + i * 0.06,
//             duration: 0.4,
//             type: "spring",
//             stiffness: 150,
//             damping: 15,
//           }}
//           whileHover={{ scale: 1.08, y: -2 }}
//           className="px-3 py-1.5 rounded-full border border-border bg-surface/80 text-xs font-mono whitespace-nowrap flex items-center gap-1.5 hover:border-accent/40 transition-colors cursor-default"
//         >
//           <span
//             className="w-1.5 h-1.5 rounded-full shrink-0"
//             style={{ backgroundColor: item.color }}
//           />
//           {item.label}
//         </motion.span>
//       ))}
//     </div>
//   );
// }

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

export function TechReveal({ items }: { items: TechItem[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();
  const groupedItems = techCategoryOrder.map((category) => ({
    category,
    label: techCategoryLabels[category],
    items: items.filter((item) => item.category === category),
  }));

  return (
    <div ref={ref} className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="border-y border-border py-8 sm:py-10"
      >
        <span className="text-xs font-mono text-accent tracking-[0.28em] uppercase">
          Tech Stack
        </span>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          用尽量少的形式，清楚说明我实际在用什么。
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/50 sm:text-base">
          按语言、框架、工具、运行时分组。去掉装饰性卡片，只保留文字层级、留白和入场节奏。
        </p>
      </motion.div>

      <div className="mt-10 sm:mt-14">
        {groupedItems.map((group, groupIndex) => (
          <motion.section
            key={group.category}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              delay: 0.08 + groupIndex * 0.1,
              duration: 0.65,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="grid grid-cols-1 gap-4 border-b border-border/70 py-6 sm:gap-6 sm:py-8 lg:grid-cols-[140px_minmax(0,1fr)] lg:items-start"
          >
            <div className="pt-1 text-xs font-mono uppercase tracking-[0.22em] text-foreground/42">
              {group.label}
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 sm:gap-x-5 sm:gap-y-3">
              {group.items.map((item, itemIndex) => {
                const isLast = itemIndex === group.items.length - 1;

                return (
                <motion.span
                  key={item.label}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    delay: 0.16 + groupIndex * 0.1 + itemIndex * 0.05,
                    duration: 0.48,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-flex items-baseline gap-4"
                >
                  <span className="text-3xl font-semibold tracking-tight text-foreground/92 sm:text-4xl lg:text-5xl">
                    {item.label}
                  </span>
                  {!isLast ? (
                    <span className="text-xl font-light text-foreground/18 sm:text-2xl">
                      /
                    </span>
                  ) : null}
                </motion.span>
              )})}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

function ContactCta({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/6 blur-3xl sm:h-80 sm:w-80" />
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
      >
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-[0.28em] text-accent">
            {eyebrow}
          </div>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-foreground/52 sm:text-base sm:leading-7">
            {description}
          </p>
        </div>

        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 }}
          animate={isInView ? { opacity: 1, x: 0 } : undefined}
          transition={{
            delay: 0.12,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/contact"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-foreground/10 bg-foreground px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent"
          >
            <span>{primary}</span>
            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              ↗
            </span>
          </Link>

          <div className="inline-flex min-h-12 items-center rounded-full border border-border bg-surface/55 px-5 py-3 text-sm text-foreground/48 backdrop-blur-sm">
            {secondary}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}



export default function AboutPage() {
  const { t } = useLanguage();
  const about = t.about;
  const translatedTimeline = about.timeline;
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
      <section ref={sectionRef} className="relative w-full h-[100vw]">

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
              transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
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
      {/*技术栈*/}
      <section className="relative w-full py-16 sm:py-24 px-6">
          <TechReveal items={techStack} />
      </section>

      <ContactCta
        eyebrow={about.cta.eyebrow}
        title={about.cta.title}
        description={about.cta.description}
        primary={about.cta.primary}
        secondary={about.cta.secondary}
      />

      

      <div className="h-20" />
    </div>
  );
}
