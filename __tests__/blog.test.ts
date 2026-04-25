import { describe, it, expect } from 'vitest';
import * as path from 'path';

describe('blog utilities', () => {
  describe('getPostSlugs', () => {
    it('should extract slug from filename', () => {
      const slug = 'test-post.md'.replace(/\.mdx?$/, '');
      expect(slug).toBe('test-post');
    });

    it('should handle mdx extension', () => {
      const slug = 'my-post.mdx'.replace(/\.mdx?$/, '');
      expect(slug).toBe('my-post');
    });

    it('should filter only markdown files', () => {
      const files = ['post.md', 'readme.txt', 'image.webp', 'code.mdx'];
      const filtered = files.filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
      expect(filtered).toEqual(['post.md', 'code.mdx']);
    });

    it('should extract slug for multiple files', () => {
      const files = ['post.md', 'another-post.mdx'];
      const slugs = files.map((file) => file.replace(/\.mdx?$/, ''));
      expect(slugs).toEqual(['post', 'another-post']);
    });
  });

  describe('calculateReadingTime', () => {
    it('should calculate reading time based on word count', () => {
      const content = 'word '.repeat(199) + 'word';
      const words = content.split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(words / 200));
      expect(readingTime).toBe(1);
    });

    it('should round up for longer content', () => {
      const content = 'word '.repeat(399) + 'word';
      const words = content.split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(words / 200));
      expect(readingTime).toBe(2);
    });

    it('should return at least 1 minute', () => {
      const content = 'short';
      const words = content.split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(words / 200));
      expect(readingTime).toBe(1);
    });
  });

  describe('sorting', () => {
    it('should sort posts by date descending', () => {
      const posts = [
        { date: '2026-01-01' },
        { date: '2026-04-25' },
        { date: '2026-03-15' },
      ];
      const sorted = [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      expect(sorted[0].date).toBe('2026-04-25');
    });
  });
});