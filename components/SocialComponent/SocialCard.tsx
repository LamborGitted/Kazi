"use client";

import {
  useEffect,
  useState,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import { extractDominantColor } from "@/utils/color";

interface SocialCardProps {
  backgroundImg: string;
  fallbackColor: string;
  homepageUrl: string;
  buttonLabel: string;
  accentHex: string;
  children: ReactNode;
}

export function useSocialCard(backgroundImg: string, fallbackColor: string) {
  const [glowColor, setGlowColor] = useState(fallbackColor);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    extractDominantColor(backgroundImg, fallbackColor).then(setGlowColor);
  }, [backgroundImg, fallbackColor]);

  return { glowColor, isHovered, setIsHovered };
}

export default function SocialCard({
  backgroundImg,
  fallbackColor,
  homepageUrl,
  buttonLabel,
  accentHex,
  children,
}: SocialCardProps) {
  const { glowColor, isHovered, setIsHovered } = useSocialCard(
    backgroundImg,
    fallbackColor
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -6, y: (px - 0.5) * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, [setIsHovered]);

  return (
    <div
      ref={cardRef}
      className="w-full rounded-2xl overflow-hidden relative group"
      style={{
        boxShadow: isHovered
          ? `0 30px 80px -20px rgba(${glowColor}, 0.45), 0 0 0 1px rgba(${glowColor}, 0.15)`
          : `0 4px 24px rgba(0,0,0,0.06)`,
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -6 : 0}px)`,
        transition: "transform 0.15s ease-out, box-shadow 0.4s ease-out",
        border: `1px solid ${isHovered ? `rgba(${glowColor}, 0.2)` : "var(--border)"}`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundImg}
          alt=""
          fill
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/15" />

      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isHovered ? 0.25 : 0.06,
          background: `radial-gradient(ellipse at 50% 80%, ${accentHex}, transparent 65%)`,
        }}
      />

      <div className="relative z-10 p-6 sm:p-8 flex flex-col min-h-[440px]">
        {children}

        <div className="mt-auto pt-6">
          <button
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: isHovered
                ? accentHex
                : "rgba(255,255,255,0.06)",
              color: isHovered ? "#000" : "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${
                isHovered
                  ? "transparent"
                  : "rgba(255,255,255,0.08)"
              }`,
            }}
            onClick={() => window.open(homepageUrl, "_blank")}
          >
            {buttonLabel}
            <svg
              className="w-4 h-4 transition-transform duration-300"
              style={{
                transform: isHovered ? "translateX(3px)" : "none",
              }}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
