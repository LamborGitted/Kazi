import { getAllPosts, getAllTags } from "@/utils/blog";
import BlogClient from "@/components/blog/BlogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Lantxx",
  description: "Ideas, learnings, and explorations in code, design, and life.",
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts("en"), getAllTags("en")]);
  const [postsZh, tagsZh] = await Promise.all([getAllPosts("zh"), getAllTags("zh")]);

  return (
    <BlogClient
      posts={posts}
      postsZh={postsZh}
      tags={tags}
      tagsZh={tagsZh}
    />
  );
}
