"use client";

import { useEffect, useState } from "react";
import { github_config } from "@/config/social.data";
import Image from "next/image";

interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
}

function extractDominantColor(imageSrc: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
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
        resolve("59,130,246");
        return;
      }

      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);

      // 饱和度增强，让光圈颜色更鲜艳
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const mid = (max + min) / 2;
      const boost = 1.6;
      r = Math.min(255, Math.round(mid + (r - mid) * boost));
      g = Math.min(255, Math.round(mid + (g - mid) * boost));
      b = Math.min(255, Math.round(mid + (b - mid) * boost));

      resolve(`${r},${g},${b}`);
    };
    img.onerror = () => resolve("59,130,246");
    img.src = imageSrc;
  });
}

export default function GithubCard() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [glowColor, setGlowColor] = useState("59,130,246");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    extractDominantColor(github_config.background_img).then(setGlowColor);

    const username = github_config.homepage_url
      .split("/")
      .filter(Boolean)
      .pop();
    if (!username) return;

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then(setUser);

    fetch(
      `https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=6`
    )
      .then((res) => res.json())
      .then((data) => setRepos(data.items || []));
  }, []);

  if (!github_config.show) return null;

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
          src={github_config.background_img}
          alt="Github"
          fill
          className="object-cover group-hover:scale-105 transition duration-500 z-1"
        />
      </div>

      {/* 右边：个人信息 + 热门仓库 */}
      <div className="w-1/3 h-full flex flex-col bg-zinc-800 p-4 overflow-hidden z-2">
        {/* 个人信息 */}
        {user && (
          <div className="flex items-center gap-3 mb-4">
            <Image
              src={user.avatar_url}
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
                @{user.login}
              </p>
              {user.bio && (
                <p className="text-zinc-400 text-xs line-clamp-2">
                  {user.bio}
                </p>
              )}
            </div>
          </div>
        )}

        {/* 热门仓库 3×2 卡片 */}
        <div className="grid grid-cols-2 gap-1.5 flex-1 content-start">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-700/60 rounded-lg p-2.5 hover:bg-zinc-600/60 transition-colors flex flex-col"
            >
              <p className="text-white text-xs font-semibold truncate mb-1">
                {repo.name}
              </p>
              <div className="flex items-center gap-1 mt-auto">
                <Image
                  src="/star.svg"
                  alt="★"
                  width={12}
                  height={12}
                  className="brightness-0 invert"
                />
                <span className="text-zinc-300 text-[10px]">
                  {repo.stargazers_count}
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
          onClick={() => window.open(github_config.homepage_url, "_blank")}
        >
          View on Github ⇁
        </button>
      </div>
    </div>
  );
}
