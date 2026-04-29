import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import type { Locale } from "@/config/i18n/locales";
import type { BlogPost, BlogPostMeta, Heading } from "@/components/blog/types";
import { PostFrontmatterSchema } from "@/config/schemas";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ""),
    });
  }
  return headings;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function resolvePostPath(
  slug: string,
  locale: Locale
): { filePath: string; effectiveSlug: string } | null {
  if (locale === "zh") {
    const zhPath = path.join(postsDirectory, "zh", `${slug}.md`);
    const zhPathMdx = path.join(postsDirectory, "zh", `${slug}.mdx`);
    if (fs.existsSync(zhPath)) {
      return { filePath: zhPath, effectiveSlug: slug };
    }
    if (fs.existsSync(zhPathMdx)) {
      return { filePath: zhPathMdx, effectiveSlug: slug };
    }
  }

  const enPath = path.join(postsDirectory, `${slug}.md`);
  const enPathMdx = path.join(postsDirectory, `${slug}.mdx`);
  if (fs.existsSync(enPath)) {
    return { filePath: enPath, effectiveSlug: slug };
  }
  if (fs.existsSync(enPathMdx)) {
    return { filePath: enPathMdx, effectiveSlug: slug };
  }

  return null;
}

export async function getPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export async function getPostBySlug(
  slug: string,
  locale: Locale = "en"
): Promise<BlogPost> {
  const resolved = resolvePostPath(slug, locale);
  if (!resolved) {
    throw new Error(`Post not found: ${slug}`);
  }

  const { filePath } = resolved;
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const parsed = PostFrontmatterSchema.parse({
    title: data.title || "",
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || "",
    tags: data.tags || [],
  });

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const htmlContent = String(result);
  const headings = extractHeadings(htmlContent);

  return {
    slug,
    title: parsed.title || slug,
    date: parsed.date,
    excerpt: parsed.excerpt,
    tags: parsed.tags,
    content,
    htmlContent,
    headings,
    readingTime: calculateReadingTime(content),
  };
}

export async function getAllPosts(
  locale: Locale = "en"
): Promise<BlogPostMeta[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, locale))
  );

  return posts
    .map(
      (post): BlogPostMeta => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags,
        readingTime: post.readingTime,
      })
    )
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export async function getAllTags(
  locale: Locale = "en"
): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllPosts(locale);
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
