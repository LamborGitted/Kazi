import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { withCache } from "@/utils/server-cache";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const MIXIN_KEY_ENC_TAB = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
  33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 16, 22, 13, 6, 48, 44, 36, 17,
  4, 20, 21, 51, 11, 1, 37, 52, 7, 24, 34, 26, 55, 25, 0, 40, 30, 57, 56,
  54, 59, 61, 60, 63, 62,
];

function getMixinKey(raw: string): string {
  return MIXIN_KEY_ENC_TAB.map((i) => raw[i]).join("").slice(0, 32);
}

function signWbi(
  params: Record<string, string>,
  imgKey: string,
  subKey: string
): string {
  const mixinKey = getMixinKey(imgKey + subKey);
  const wts = Math.floor(Date.now() / 1000).toString();

  const allParams: Record<string, string> = { ...params, wts };
  const query = Object.keys(allParams)
    .sort()
    .map((key) => `${key}=${encodeURIComponent(allParams[key].replace(/[!'()*]/g, ""))}`)
    .join("&");

  const w_rid = createHash("md5").update(query + mixinKey).digest("hex");
  return `${query}&w_rid=${w_rid}`;
}

async function getWbiKeys() {
  const res = await fetch("https://api.bilibili.com/x/web-interface/nav", {
    headers: { "User-Agent": UA },
  });
  const data = await res.json();
  const { img_url, sub_url } = data.data?.wbi_img || {};
  if (!img_url || !sub_url) return null;

  const imgKey = img_url.split("/").pop()?.split(".")[0] || "";
  const subKey = sub_url.split("/").pop()?.split(".")[0] || "";
  return { imgKey, subKey };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");
  if (!uid) {
    return NextResponse.json({ error: "uid is required" }, { status: 400 });
  }

  const result = await withCache(
    `bilibili:${uid}`,
    async () => {
      let user = null;
      try {
        const userRes = await fetch(
          `https://api.bilibili.com/x/web-interface/card?mid=${uid}`,
          { headers: { "User-Agent": UA } }
        );
        const userData = await userRes.json();
        const card = userData.data?.card;
        if (card) {
          user = {
            name: card.name || "",
            avatar: card.face || "",
            sign: card.sign || "",
            mid: String(card.mid || uid),
            fans: card.fans || 0,
            likes: userData.data?.like_num || 0,
          };
        }
      } catch {}

      let videos: unknown[] = [];
      try {
        const keys = await getWbiKeys();
        if (keys) {
          const signed = signWbi(
            { mid: uid, ps: "6", order: "click" },
            keys.imgKey,
            keys.subKey
          );
          const videosRes = await fetch(
            `https://api.bilibili.com/x/space/wbi/arc/search?${signed}`,
            { headers: { "User-Agent": UA } }
          );
          const videosData = await videosRes.json();
          const vlist = videosData.data?.list?.vlist || [];
          videos = vlist.map((v: Record<string, unknown>) => ({
            bvid: v.bvid,
            title: v.title,
            play: v.play,
            pic: v.pic,
          }));
        }
      } catch {}

      return { user, videos };
    }
  );

  return NextResponse.json(result);
}
