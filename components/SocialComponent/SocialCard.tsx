"use client";

import { useEffect, useState, ReactNode } from "react";
import Image from "next/image";
import { extractDominantColor } from "@/utils/color";

interface SocialCardProps {
  show: boolean;
  backgroundImg: string;
  fallbackColor: string;
  homepageUrl: string;
  buttonLabel: string;
  children: ReactNode;
}

export function useSocialCard(
  backgroundImg: string,
  fallbackColor: string
) {
  const [glowColor, setGlowColor] = useState(fallbackColor);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    extractDominantColor(backgroundImg, fallbackColor).then(setGlowColor);
  }, [backgroundImg, fallbackColor]);

  return { glowColor, isHovered, setIsHovered };
}

export default function SocialCard({
  show,
  backgroundImg,
  fallbackColor,
  homepageUrl,
  buttonLabel,
  children,
}: SocialCardProps) {
  const { glowColor, isHovered, setIsHovered } = useSocialCard(
    backgroundImg,
    fallbackColor
  );

  if (!show) return null;

  return (
    <div
      className="w-[70vw] h-100 rounded-2xl overflow-hidden relative group flex transition-all duration-500"
      style={{
        boxShadow: isHovered
          ? `0 0 100px rgba(${glowColor}, 0.8)`
          : `0 0 20px rgba(${glowColor}, 0.3)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-2/3 relative">
        <Image
          src={backgroundImg}
          alt=""
          fill
          className="object-cover group-hover:scale-105 transition duration-500 z-1"
        />
      </div>

      <div className="w-1/3 h-full flex flex-col bg-zinc-800 p-4 overflow-hidden z-2">
        {children}

        <button
          className="text-zinc-300 text-sm bg-zinc-700 font-bold px-4 py-1.5 rounded-lg hover:scale-105 transition-all mt-3 w-full"
          style={
            isHovered
              ? { backgroundColor: `rgb(${glowColor})` }
              : undefined
          }
          onClick={() => window.open(homepageUrl, "_blank")}
        >
          {buttonLabel} ⇁
        </button>
      </div>
    </div>
  );
}
