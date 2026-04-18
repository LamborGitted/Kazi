import { getAllPosts, getAllTags } from "@/utils/blog";
import BlogClient from "@/components/blog/BlogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Lantxx",
  description: "Ideas, learnings, and explorations in code, design, and life.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <BlogClient
      posts={posts}
      tags={tags}
    />
  );
}
