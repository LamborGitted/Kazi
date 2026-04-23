import { NextResponse } from "next/server";
import { withCache } from "@/utils/server-cache";
import { GitHubUserSchema, GitHubRepoSchema } from "@/config/schemas";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json(
      { error: "username is required" },
      { status: 400 }
    );
  }

  try {
    const [user, repos] = await Promise.all([
      withCache(`github:user:${username}`, async () => {
        const res = await fetch(`https://api.github.com/users/${username}`, {
          headers: { "User-Agent": "Lantxx-Homepage" },
        });
        if (!res.ok) return null;
        const data = await res.json();
        return GitHubUserSchema.safeParse({
          avatar_url: data.avatar_url || "",
          name: data.name || "",
          bio: data.bio || "",
          login: data.login || "",
        }).success
          ? GitHubUserSchema.parse({
              avatar_url: data.avatar_url || "",
              name: data.name || "",
              bio: data.bio || "",
              login: data.login || "",
            })
          : null;
      }),
      withCache(`github:repos:${username}`, async () => {
        const res = await fetch(
          `https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=6`,
          { headers: { "User-Agent": "Lantxx-Homepage" } }
        );
        if (!res.ok) return [];
        const data = await res.json();
        return (data.items || [])
          .map((r: Record<string, unknown>) =>
            GitHubRepoSchema.safeParse({
              id: r.id,
              name: r.name,
              stargazers_count: r.stargazers_count,
              html_url: r.html_url,
            })
          )
          .filter((r: { success: boolean }) => r.success)
          .map((r: { data: unknown }) => r.data);
      }),
    ]);

    return NextResponse.json({ user, repos });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
