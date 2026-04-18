"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

interface TagCloudProps {
  tags: { tag: string; count: number }[];
  activeTag: string | null;
  onTagClick: (tag: string | null) => void;
}

interface TagItem {
  tag: string;
  count: number;
  x: number;
  y: number;
  z: number;
  baseSize: number;
  opacity: number;
}

function initializeSphere(items: { tag: string; count: number }[]): TagItem[] {
  return items.map((item, i) => {
    const phi = Math.acos(-1 + (2 * i + 1) / items.length);
    const theta = Math.sqrt(items.length * Math.PI) * phi;
    return {
      tag: item.tag,
      count: item.count,
      x: Math.cos(theta) * Math.sin(phi),
      y: Math.sin(theta) * Math.sin(phi),
      z: Math.cos(phi),
      baseSize: Math.min(1.2 + item.count * 0.15, 1.8),
      opacity: 1,
    };
  });
}

export default function TagCloud({ tags, activeTag, onTagClick }: TagCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<TagItem[]>(() => initializeSphere(tags));
  const rotationRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0.002, y: 0.004 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const RADIUS = 140;

  const rotateItems = useCallback(
    (rx: number, ry: number) => {
      setItems((prev) =>
        prev.map((item) => {
          const cosY = Math.cos(ry);
          const sinY = Math.sin(ry);
          let x1 = item.x * cosY - item.z * sinY;
          let z1 = item.x * sinY + item.z * cosY;

          const cosX = Math.cos(rx);
          const sinX = Math.sin(rx);
          let y1 = item.y * cosX - z1 * sinX;
          let z2 = item.y * sinX + z1 * cosX;

          return {
            ...item,
            x: x1,
            y: y1,
            z: z2,
            opacity: 0.3 + (z2 + 1) * 0.35,
          };
        })
      );
    },
    []
  );

  useEffect(() => {
    const animate = () => {
      if (!isDragging.current) {
        rotationRef.current.x += velocityRef.current.x;
        rotationRef.current.y += velocityRef.current.y;
        rotateItems(
          rotationRef.current.x,
          rotationRef.current.y
        );
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [rotateItems]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      rotationRef.current.y += dx * 0.008;
      rotationRef.current.x += dy * 0.008;
      velocityRef.current = {
        x: dy * 0.0003,
        y: dx * 0.0003,
      };
      rotateItems(rotationRef.current.x, rotationRef.current.y);
      lastPos.current = { x: e.clientX, y: e.clientY };
    },
    [rotateItems]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    setItems(initializeSphere(tags));
  }, [tags]);

  return (
    <div className="relative flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative select-none cursor-grab active:cursor-grabbing"
        style={{ width: RADIUS * 2 + 60, height: RADIUS * 2 + 60 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {items.map((item, i) => {
          const scale = 1 / (1 - item.z * 0.3);
          const isActive = activeTag === item.tag;
          return (
            <motion.button
              key={item.tag}
              className="absolute left-1/2 top-1/2 whitespace-nowrap font-medium transition-colors duration-200"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: `${item.baseSize * 13 * scale}px`,
                opacity: item.opacity * (isActive ? 1 : 0.85),
                color: isActive
                  ? "var(--accent)"
                  : `var(--foreground)`,
                transform: `translate(-50%, -50%) translate(${item.x * RADIUS}px, ${item.y * RADIUS}px)`,
                zIndex: Math.floor((item.z + 1) * 100),
                textShadow: isActive
                  ? "0 0 20px var(--accent-glow)"
                  : "none",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(isActive ? null : item.tag);
              }}
              whileHover={{ scale: 1.15 }}
              layout
            >
              {item.tag}
              <span
                className="ml-1 text-[0.65em] opacity-50"
              >
                {item.count}
              </span>
            </motion.button>
          );
        })}

        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, var(--accent-glow) 0%, transparent 70%)",
            opacity: 0.3,
          }}
        />
      </div>

      <p
        className="mt-2 text-xs tracking-widest uppercase text-center"
        style={{ color: "var(--muted)", fontFamily: "var(--font-geist-mono)" }}
      >
        Drag to rotate &middot; Click to filter
      </p>
    </div>
  );
}
