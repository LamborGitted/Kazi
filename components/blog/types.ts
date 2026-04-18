export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

export interface TagInfo {
  tag: string;
  count: number;
}
