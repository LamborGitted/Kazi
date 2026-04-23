"use client";

import { useEffect, useState } from "react";
import { github_config } from "@/config/social.data";
import Image from "next/image";
import SocialCard from "@/components/SocialComponent/SocialCard";
import type { GitHubUser, GitHubRepo } from "@/config/schemas";

export default function GithubCard() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const username = github_config.homepage_url
      .split("/")
      .filter(Boolean)
      .pop();
    if (!username) return;

    fetch(`/api/github?username=${username}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setUser(d.user);
        if (d.repos) setRepos(d.repos);
      });
  }, []);

  if (!github_config.show) return null;

  return (
    <SocialCard
      backgroundImg={github_config.background_img}
      fallbackColor="59,130,246"
      homepageUrl={github_config.homepage_url}
      buttonLabel="View on GitHub"
      accentHex="#58a6ff"
    >
      <div className="flex items-center gap-4 mb-6">
        {user ? (
          <Image
            src={user.avatar_url}
            alt={user.name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full ring-2 ring-white/10 shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-white/10 animate-pulse shrink-0" />
        )}
        <div className="min-w-0">
          <h3 className="text-white text-lg font-bold tracking-tight truncate">
            {user?.name ?? "Loading..."}
          </h3>
          <p className="text-white/40 text-sm font-mono">
            @{user?.login ?? "..."}
          </p>
        </div>
        <div className="ml-auto shrink-0">
          <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 opacity-20">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
      </div>

      {user?.bio && (
        <p className="text-white/50 text-sm mb-6 leading-relaxed">
          {user.bio}
        </p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/repo rounded-xl p-3 transition-all duration-300 hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <p className="text-white/90 text-xs font-semibold truncate mb-1.5">
              {repo.name}
            </p>
            <div className="flex items-center gap-1">
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-3 h-3 text-yellow-400/70"
              >
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              <span className="text-white/40 text-[10px] font-mono">
                {repo.stargazers_count}
              </span>
            </div>
          </a>
        ))}
      </div>
    </SocialCard>
  );
}
