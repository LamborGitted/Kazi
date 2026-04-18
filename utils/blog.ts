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

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
  htmlContent: string;
  headings: Heading[];
  readingTime: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

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

export async function getPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(
    postsDirectory,
    fs.existsSync(path.join(postsDirectory, `${slug}.mdx`))
      ? `${slug}.mdx`
      : `${slug}.md`
  );

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);

  const htmlContent = String(result);
  const headings = extractHeadings(htmlContent);

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || "",
    tags: data.tags || [],
    content,
    htmlContent,
    headings,
    readingTime: calculateReadingTime(content),
  };
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(getPostBySlug));

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

export async function getAllTags(): Promise<
  { tag: string; count: number }[]
> {
  const posts = await getAllPosts();
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
