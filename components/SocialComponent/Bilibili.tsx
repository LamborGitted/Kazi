"use client";

import { useEffect, useState } from "react";
import { bilibili_config } from "@/config/social.data";
import Image from "next/image";
import { useSocialCard } from "@/components/SocialComponent/SocialCard";

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

function formatPlayCount(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  return String(n);
}

export default function BilibiliCard() {
  const [user, setUser] = useState<BilibiliUser | null>(null);
  const [videos, setVideos] = useState<BilibiliVideo[]>([]);
  const { glowColor, isHovered, setIsHovered } = useSocialCard(
    bilibili_config.background_img,
    "251,114,153"
  );

  useEffect(() => {
    const uid = bilibili_config.homepage_url
      .split("/")
      .filter(Boolean)
      .pop();
    if (!uid) return;

    fetch(`/api/bilibili?uid=${uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        if (data.videos) setVideos(data.videos);
      });
  }, []);

  if (!bilibili_config.show) return null;

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
          src={bilibili_config.background_img}
          alt="Bilibili"
          fill
          className="object-cover group-hover:scale-105 transition duration-500 z-1"
        />
      </div>

      <div className="w-1/3 h-full flex flex-col bg-zinc-800 p-4 overflow-hidden z-2">
        {user && (
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={user.avatar}
              alt={user.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 shrink-0"
              style={{ borderColor: `rgb(${glowColor})` }}
            />
            <div className="min-w-0">
              <p className="text-white font-bold text-sm truncate">
                {user.name}
              </p>
              <p className="text-zinc-500 text-xs truncate">
                UID: {user.mid}
              </p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="flex items-center gap-1 text-zinc-400 text-xs">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  {formatPlayCount(user.fans)}
                </span>
                <span className="flex items-center gap-1 text-zinc-400 text-xs">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                  </svg>
                  {formatPlayCount(user.likes)}
                </span>
              </div>
              {user.sign && (
                <p className="text-zinc-400 text-xs line-clamp-2">
                  {user.sign}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-1.5 flex-1 content-start">
          {videos.map((video) => (
            <a
              key={video.bvid}
              href={`https://www.bilibili.com/video/${video.bvid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-700/60 rounded-lg p-2.5 hover:bg-zinc-600/60 transition-colors flex flex-col"
            >
              <p className="text-white text-xs font-semibold truncate mb-1">
                {video.title}
              </p>
              <div className="flex items-center gap-1 mt-auto">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 text-zinc-300"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-zinc-300 text-[10px]">
                  {formatPlayCount(video.play)}
                </span>
              </div>
            </a>
          ))}
        </div>

        <button
          className="text-zinc-300 text-sm bg-zinc-700 font-bold px-4 py-1.5 rounded-lg hover:scale-105 transition-all mt-3 w-full"
          style={
            isHovered
              ? { backgroundColor: `rgb(${glowColor})` }
              : undefined
          }
          onClick={() => window.open(bilibili_config.homepage_url, "_blank")}
        >
          访问B站主页 ⇁
        </button>
      </div>
    </div>
  );
}
