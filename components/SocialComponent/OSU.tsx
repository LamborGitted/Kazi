"use client";

import { useEffect, useState } from "react";
import { osu_config } from "@/config/social.data";
import Image from "next/image";

interface OsuUser {
  username: string;
  avatar_url: string;
  global_rank: number | null;
  pp: number;
  country_code: string;
}

interface OsuScore {
  id: number;
  title: string;
  difficulty: string;
  rank: string;
  accuracy: number;
  url: string;
}

function extractDominantColor(imageSrc: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 50;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;

        let r = 0,
          g = 0,
          b = 0,
          count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const pr = data[i],
            pg = data[i + 1],
            pb = data[i + 2];
          const lum = (pr * 0.299 + pg * 0.587 + pb * 0.114) / 255;
          if (lum > 0.08 && lum < 0.92) {
            r += pr;
            g += pg;
            b += pb;
            count++;
          }
        }

        if (count === 0) {
          resolve("255,102,170");
          return;
        }

        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const mid = (max + min) / 2;
        const boost = 1.6;
        r = Math.min(255, Math.round(mid + (r - mid) * boost));
        g = Math.min(255, Math.round(mid + (g - mid) * boost));
        b = Math.min(255, Math.round(mid + (b - mid) * boost));

        resolve(`${r},${g},${b}`);
      } catch {
        resolve("255,102,170");
      }
    };
    img.onerror = () => resolve("255,102,170");
    img.src = imageSrc;
  });
}

function formatRank(rank: number | null): string {
  if (!rank) return "#---";
  return `#${rank.toLocaleString()}`;
}

function formatPP(pp: number): string {
  return `${Math.round(pp).toLocaleString()}pp`;
}

function rankColor(rank: string): string {
  switch (rank) {
    case "XH":
    case "X":
      return "#FFD700";
    case "SH":
    case "S":
      return "#FFB300";
    case "A":
      return "#66BB6A";
    case "B":
      return "#42A5F5";
    case "C":
      return "#FFA726";
    case "D":
      return "#EF5350";
    default:
      return "#999999";
  }
}

const OSU_MODES = [
  { value: "osu", label: "osu!" },
  { value: "taiko", label: "Taiko" },
  { value: "fruits", label: "Catch" },
  { value: "mania", label: "Mania" },
] as const;

type OsuMode = (typeof OSU_MODES)[number]["value"];

export default function OsuCard() {
  const [user, setUser] = useState<OsuUser | null>(null);
  const [scores, setScores] = useState<OsuScore[]>([]);
  const [glowColor, setGlowColor] = useState("255,102,170");
  const [isHovered, setIsHovered] = useState(false);
  const [mode, setMode] = useState<OsuMode>(
    () => (osu_config.default_mode as OsuMode) || "osu"
  );

  useEffect(() => {
    extractDominantColor(osu_config.background_img).then(setGlowColor);

    const uid = osu_config.homepage_url
      .split("/")
      .filter(Boolean)
      .pop();
    if (!uid) return;

    fetch(`/api/osu?uid=${uid}&mode=${mode}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        if (data.scores) setScores(data.scores);
      });
  }, [mode]);

  if (!osu_config.show) return null;

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
      {/* 左边背景图 */}
      <div className="w-2/3 relative">
        <Image
          src={osu_config.background_img}
          alt="osu!"
          fill
          className="object-cover group-hover:scale-105 transition duration-500 z-1"
        />
      </div>

      {/* 右边：个人信息 + 最近成绩 */}
      <div className="w-1/3 h-full flex flex-col bg-zinc-800 p-4 overflow-hidden z-2">
        {/* 个人信息 */}
        {user && (
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={user.avatar_url}
              alt={user.username}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 shrink-0"
              style={{ borderColor: `rgb(${glowColor})` }}
            />
            <div className="min-w-0">
              <p className="text-white font-bold text-sm truncate">
                {user.username}
              </p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="flex items-center gap-1 text-zinc-400 text-xs">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {formatRank(user.global_rank)}
                </span>
                <span className="flex items-center gap-1 text-zinc-400 text-xs">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                  </svg>
                  {formatPP(user.pp)}
                </span>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as OsuMode)}
                  className="ml-auto bg-zinc-700 text-zinc-300 text-[10px] rounded px-1.5 py-0.5 border-none outline-none cursor-pointer appearance-none hover:bg-zinc-600 transition-colors"
                >
                  {OSU_MODES.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 最好成绩 3×2 卡片 */}
        <div className="grid grid-cols-2 gap-1.5 flex-1 content-start">
          {scores.map((score) => (
            <a
              key={score.id}
              href={score.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-700/60 rounded-lg p-2.5 hover:bg-zinc-600/60 transition-colors flex flex-col"
            >
              <p className="text-white text-xs font-semibold truncate mb-0.5">
                {score.title}
              </p>
              <p className="text-zinc-500 text-[10px] truncate">
                {score.difficulty}
              </p>
              <div className="flex items-center gap-1.5 mt-auto">
                <span
                  className="text-xs font-black"
                  style={{ color: rankColor(score.rank) }}
                >
                  {score.rank}
                </span>
                <span className="text-zinc-300 text-[10px]">
                  {score.accuracy.toFixed(2)}%
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* 按钮 */}
        <button
          className="text-zinc-300 text-sm bg-zinc-700 font-bold px-4 py-1.5 rounded-lg hover:scale-105 transition-all mt-3 w-full"
          style={
            isHovered
              ? { backgroundColor: `rgb(${glowColor})` }
              : undefined
          }
          onClick={() => window.open(osu_config.homepage_url, "_blank")}
        >
          View on osu! ⇁
        </button>
      </div>
    </div>
  );
}
