"use client";

import { useEffect, useState } from "react";
import { bilibili_config } from "@/config/social.data";
import Image from "next/image";
import SocialCard from "@/components/SocialComponent/SocialCard";

interface BilibiliUser {
  name: string;
  avatar: string;
  sign: string;
  mid: string;
  fans: number;
  likes: number;
}

interface BilibiliVideo {
  bvid: string;
  title: string;
  play: number;
  pic: string;
}

function fmt(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  return String(n);
}

export default function BilibiliCard() {
  const [user, setUser] = useState<BilibiliUser | null>(null);
  const [videos, setVideos] = useState<BilibiliVideo[]>([]);

  useEffect(() => {
    const uid = bilibili_config.homepage_url
      .split("/")
      .filter(Boolean)
      .pop();
    if (!uid) return;

    fetch(`/api/bilibili?uid=${uid}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setUser(d.user);
        if (d.videos) setVideos(d.videos);
      });
  }, []);

  if (!bilibili_config.show) return null;

  return (
    <SocialCard
      backgroundImg={bilibili_config.background_img}
      fallbackColor="251,114,153"
      homepageUrl={bilibili_config.homepage_url}
      buttonLabel="访问B站主页"
      accentHex="#fb7299"
    >
      <div className="flex items-center gap-4 mb-5">
        {user ? (
          <Image
            src={user.avatar}
            alt={user.name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full ring-2 ring-[#fb7299]/20 shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-white/10 animate-pulse shrink-0" />
        )}
        <div className="min-w-0">
          <h3 className="text-white text-lg font-bold tracking-tight truncate">
            {user?.name ?? "Loading..."}
          </h3>
          <div className="flex items-center gap-4 mt-1">
            <span className="flex items-center gap-1.5 text-white/40 text-xs">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              {user ? fmt(user.fans) : "..."}
            </span>
            <span className="flex items-center gap-1.5 text-white/40 text-xs">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
              </svg>
              {user ? fmt(user.likes) : "..."}
            </span>
          </div>
        </div>
        <div className="ml-auto shrink-0">
          <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 opacity-20">
            <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zm4 5.427c-.746 0-1.333-.6-1.333-1.334 0-.733.587-1.333 1.333-1.333s1.334.6 1.334 1.333c0 .734-.588 1.334-1.334 1.334zm5.334 0c-.746 0-1.334-.6-1.334-1.334 0-.733.588-1.333 1.334-1.333.746 0 1.333.6 1.333 1.333 0 .734-.587 1.334-1.333 1.334z" />
          </svg>
        </div>
      </div>

      {user?.sign && (
        <p className="text-white/40 text-sm mb-5 leading-relaxed line-clamp-1">
          {user.sign}
        </p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {videos.map((v) => (
          <a
            key={v.bvid}
            href={`https://www.bilibili.com/video/${v.bvid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl p-3 transition-all duration-300 hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <p className="text-white/90 text-xs font-semibold truncate mb-1.5">
              {v.title}
            </p>
            <div className="flex items-center gap-1">
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-3 h-3 text-[#fb7299]/60"
              >
                <path d="M4 2.5v11l9-5.5z" />
              </svg>
              <span className="text-white/40 text-[10px] font-mono">
                {fmt(v.play)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </SocialCard>
  );
}
