import { getPostBySlug, getPostSlugs, getAllPosts } from "@/utils/blog";
import { notFound } from "next/navigation";
import PostClient from "@/components/blog/PostClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.title} — Lantxx Blog`,
      description: post.excerpt,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const allPosts = await getAllPosts();
  const recentPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <PostClient
      post={post}
      recentPosts={recentPosts}
    />
  );
}
