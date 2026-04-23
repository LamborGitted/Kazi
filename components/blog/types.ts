export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  htmlContent: string;
  headings: Heading[];
}

export interface TagInfo {
  tag: string;
  count: number;
}
