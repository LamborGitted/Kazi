"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  timeline: TimelineItem[];
  subtitle: string;
  heading: string;
  description: string;
}

// Horizontal scroller: vertical scroll drives horizontal translation
export default function EnhancedTimeline({ timeline, subtitle, heading, description }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // Scroll progress across the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Measure the total horizontal width and the viewport width to determine max translate
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    // When the content is laid out, the max horizontal translate is (contentWidth - viewportWidth)
    const max = Math.max(0, track.scrollWidth - container.clientWidth);
    setMaxTranslate(max);
  }, [timeline.length]);

  // Map vertical scroll progress to horizontal translation in px
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={containerRef} style={{ height: `${timeline.length * 100}vh` }} className="relative">
      <div className="sticky top-20 flex h-screen items-center overflow-hidden bg-background">
        {/* 左侧固定标题区域 - 增加一点深度感 */}
        <div className="absolute top-12 left-6 sm:left-12 z-20 max-w-md">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-xs font-mono text-accent tracking-widest uppercase"
          >
            {subtitle}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mt-2 tracking-tight"
          >
            {heading}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-foreground/50 text-sm sm:text-base leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* 动态滑动的水平内容 */}
        <motion.div ref={trackRef} style={{ x: springX }} className="flex gap-16 px-[10vw] sm:px-[20vw] items-center">
          {timeline.map((item, i) => (
            <div key={i} className="relative flex-shrink-0 w-[280px] sm:w-[450px]">
              {/* 背景装饰大字：年份
              <div className="absolute -top-16 -left-8 pointer-events-none select-none">
                <span className="text-[10rem] sm:text-[14rem] font-black text-foreground/[0.03] leading-none">
                  {item.year.split('-')[0]}
                </span>
              </div> */}

              {/* 卡片内容 */}
              <div className="relative z-10 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px w-8 bg-accent/50" />
                  <span className="text-sm font-mono text-accent font-bold tracking-tighter">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-4 text-foreground/60 text-sm sm:text-base leading-relaxed border-l-2 border-border/50 pl-4">
                  {item.description}
                </p>
                {/* 装饰性小圆点 */}
                <div className="absolute -left-[33px] top-[10px] w-2 h-2 rounded-full bg-border group-hover:bg-accent transition-colors shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]" />
              </div>
            </div>
          ))}

          {/* 结尾提示 */}
          <div className="flex-shrink-0 w-[200px] flex flex-col items-center justify-center opacity-20">
            <div className="w-12 h-[1px] bg-foreground mb-4" />
            <span className="text-xs font-mono uppercase tracking-widest text-center">To Be Continued</span>
          </div>
        </motion.div>

        {/* 底部进度条提示 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <span className="text-[10px] font-mono text-foreground/30 uppercase">Scroll to explore</span>
          <div className="w-32 h-[2px] bg-border relative overflow-hidden">
            <motion.div 
              style={{ scaleX: scrollYProgress }} 
              className="absolute inset-y-0 left-0 w-full bg-accent origin-left" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
