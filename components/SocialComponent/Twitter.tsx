"use client";

import { twitter_config } from "@/config/social.data";
import SocialCard from "@/components/SocialComponent/SocialCard";

export default function TwitterCard() {
  if (!twitter_config.show) return null;

  const username = twitter_config.homepage_url
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace("@", "");

  return (
    <SocialCard
      backgroundImg={twitter_config.background_img || "/image/3.webp"}
      fallbackColor="29,155,240"
      homepageUrl={twitter_config.homepage_url}
      buttonLabel="View on X"
      accentHex="#1d9bf0"
    >
      <div className="flex flex-col items-center justify-center flex-1 text-center py-8">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center mb-6">
          <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 opacity-60">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>

        <h3 className="text-white text-2xl font-bold tracking-tight mb-2">
          @{username ?? "LamborGitted"}
        </h3>

        <p className="text-white/40 text-sm max-w-xs leading-relaxed">
          Thoughts, updates, and the occasional hot take. Find me on X.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <span className="flex items-center gap-1.5 text-white/30 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1d9bf0]/50" />
            @LamborGitted
          </span>
        </div>
      </div>
    </SocialCard>
  );
}
