"use client";

import { useEffect, useState } from "react";
import { osu_config } from "@/config/social.data";
import Image from "next/image";
import SocialCard from "@/components/SocialComponent/SocialCard";

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

function fmtRank(r: number | null): string {
  if (!r) return "#---";
  return `#${r.toLocaleString()}`;
}

function fmtPP(pp: number): string {
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
      return "#999";
  }
}

const MODES = [
  { value: "osu", label: "osu!" },
  { value: "taiko", label: "Taiko" },
  { value: "fruits", label: "Catch" },
  { value: "mania", label: "Mania" },
] as const;

type OsuMode = (typeof MODES)[number]["value"];

export default function OsuCard() {
  const [user, setUser] = useState<OsuUser | null>(null);
  const [scores, setScores] = useState<OsuScore[]>([]);
  const [mode, setMode] = useState<OsuMode>(
    () => (osu_config.default_mode as OsuMode) || "osu"
  );

  useEffect(() => {
    const uid = osu_config.homepage_url
      .split("/")
      .filter(Boolean)
      .pop();
    if (!uid) return;

    fetch(`/api/osu?uid=${uid}&mode=${mode}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setUser(d.user);
        if (d.scores) setScores(d.scores);
      });
  }, [mode]);

  if (!osu_config.show) return null;

  return (
    <SocialCard
      backgroundImg={osu_config.background_img}
      fallbackColor="255,102,170"
      homepageUrl={osu_config.homepage_url}
      buttonLabel="View on osu!"
      accentHex="#ff66aa"
    >
      <div className="flex items-center gap-4 mb-5">
        {user ? (
          <Image
            src={user.avatar_url}
            alt={user.username}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full ring-2 ring-[#ff66aa]/20 shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-white/10 animate-pulse shrink-0" />
        )}
        <div className="min-w-0">
          <h3 className="text-white text-lg font-bold tracking-tight truncate">
            {user?.username ?? "Loading..."}
          </h3>
          <div className="flex items-center gap-4 mt-1">
            <span className="flex items-center gap-1.5 text-white/40 text-xs font-mono">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-yellow-400/60">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {user ? fmtRank(user.global_rank) : "..."}
            </span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs font-mono">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#ff66aa]/60">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
              {user ? fmtPP(user.pp) : "..."}
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1 shrink-0">
          {MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className="text-[10px] font-mono px-2 py-1 rounded-lg transition-all duration-200"
              style={{
                background:
                  mode === m.value
                    ? "rgba(255,102,170,0.25)"
                    : "rgba(255,255,255,0.04)",
                color:
                  mode === m.value
                    ? "#ff66aa"
                    : "rgba(255,255,255,0.4)",
                border: `1px solid ${
                  mode === m.value
                    ? "rgba(255,102,170,0.3)"
                    : "transparent"
                }`,
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {scores.map((s) => (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl p-3 transition-all duration-300 hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <p className="text-white/90 text-xs font-semibold truncate mb-0.5">
              {s.title}
            </p>
            <p className="text-white/30 text-[10px] truncate mb-1.5">
              {s.difficulty}
            </p>
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-black leading-none"
                style={{ color: rankColor(s.rank) }}
              >
                {s.rank}
              </span>
              <span className="text-white/30 text-[10px] font-mono">
                {s.accuracy.toFixed(2)}%
              </span>
            </div>
          </a>
        ))}
      </div>
    </SocialCard>
  );
}
