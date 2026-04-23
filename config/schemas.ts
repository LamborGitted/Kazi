import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});
export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const PostFrontmatterSchema = z.object({
  title: z.string().default(""),
  date: z.string().default(() => new Date().toISOString()),
  excerpt: z.string().default(""),
  tags: z.array(z.string()).default([]),
});
export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;

export const GitHubUserSchema = z.object({
  avatar_url: z.string(),
  name: z.string(),
  bio: z.string(),
  login: z.string(),
});
export type GitHubUser = z.infer<typeof GitHubUserSchema>;

export const GitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  stargazers_count: z.number(),
  html_url: z.string(),
});
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;

export const BilibiliUserSchema = z.object({
  name: z.string(),
  avatar: z.string(),
  sign: z.string(),
  mid: z.string(),
  fans: z.number(),
  likes: z.number(),
});
export type BilibiliUser = z.infer<typeof BilibiliUserSchema>;

export const BilibiliVideoSchema = z.object({
  bvid: z.string(),
  title: z.string(),
  play: z.number(),
  pic: z.string(),
});
export type BilibiliVideo = z.infer<typeof BilibiliVideoSchema>;

export const OsuUserSchema = z.object({
  username: z.string(),
  avatar_url: z.string(),
  global_rank: z.number().nullable(),
  pp: z.number(),
  country_code: z.string(),
});
export type OsuUser = z.infer<typeof OsuUserSchema>;

export const OsuScoreSchema = z.object({
  id: z.number(),
  title: z.string(),
  difficulty: z.string(),
  rank: z.string(),
  accuracy: z.number(),
  url: z.string(),
});
export type OsuScore = z.infer<typeof OsuScoreSchema>;
