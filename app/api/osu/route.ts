import { NextResponse } from "next/server";
import { withCache } from "@/utils/server-cache";

let tokenCache: { token: string; expires: number } | null = null;

async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expires) {
    return tokenCache.token;
  }

  const res = await fetch("https://osu.ppy.sh/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.OSU_CLIENT_ID,
      client_secret: process.env.OSU_CLIENT_SECRET,
      grant_type: "client_credentials",
      scope: "public",
    }),
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error("Failed to get osu! token");
  }

  tokenCache = {
    token: data.access_token,
    expires: Date.now() + (data.expires_in - 60) * 1000,
  };

  return data.access_token;
}

async function osuFetch(path: string) {
  const token = await getToken();
  const res = await fetch(`https://osu.ppy.sh/api/v2${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");
  const mode = searchParams.get("mode") || "osu";
  if (!uid) {
    return NextResponse.json({ error: "uid is required" }, { status: 400 });
  }

  const result = await withCache(
    `osu:${uid}:${mode}`,
    async () => {
      let user = null;
      try {
        const userData = await osuFetch(`/users/${uid}/${mode}`);
        if (userData?.id) {
          user = {
            username: userData.username,
            avatar_url: userData.avatar_url,
            global_rank: userData.statistics?.global_rank ?? null,
            pp: userData.statistics?.pp ?? 0,
            country_code: userData.country?.code ?? "",
          };
        }
      } catch {}

      let scores: unknown[] = [];
      try {
        const scoresData = await osuFetch(
          `/users/${uid}/scores/best?limit=6&mode=${mode}`
        );
        if (Array.isArray(scoresData)) {
          scores = scoresData.map((s: Record<string, unknown>) => ({
            id: s.id,
            title: (s.beatmapset as Record<string, unknown>)?.title ?? "",
            difficulty: (s.beatmap as Record<string, unknown>)?.version ?? "",
            rank: s.rank ?? "",
            accuracy: s.accuracy
              ? Math.round((s.accuracy as number) * 10000) / 100
              : 0,
            url: (s.beatmap as Record<string, unknown>)?.url
              ? `https://osu.ppy.sh/beatmaps/${
                  (s.beatmap as Record<string, unknown>).id
                }`
              : "",
          }));
        }
      } catch {}

      return { user, scores };
    }
  );

  return NextResponse.json(result);
}
