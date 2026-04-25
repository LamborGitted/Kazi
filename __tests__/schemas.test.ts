import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  ContactFormSchema,
  PostFrontmatterSchema,
  GitHubUserSchema,
  GitHubRepoSchema,
  BilibiliUserSchema,
  BilibiliVideoSchema,
  OsuUserSchema,
  OsuScoreSchema,
} from '../config/schemas';

describe('ContactFormSchema', () => {
  it('validates valid contact form', () => {
    const valid = { name: 'John', email: 'john@example.com', subject: 'Hello', message: 'Hi there' };
    expect(ContactFormSchema.parse(valid)).toEqual(valid);
  });

  it('rejects missing name', () => {
    const invalid = { name: '', email: 'john@example.com', subject: 'Hello', message: 'Hi' };
    expect(() => ContactFormSchema.parse(invalid)).toThrow();
  });

  it('rejects invalid email', () => {
    const invalid = { name: 'John', email: 'invalid', subject: 'Hello', message: 'Hi' };
    expect(() => ContactFormSchema.parse(invalid)).toThrow();
  });

  it('rejects missing subject', () => {
    const invalid = { name: 'John', email: 'john@example.com', subject: '', message: 'Hi' };
    expect(() => ContactFormSchema.parse(invalid)).toThrow();
  });

  it('rejects missing message', () => {
    const invalid = { name: 'John', email: 'john@example.com', subject: 'Hello', message: '' };
    expect(() => ContactFormSchema.parse(invalid)).toThrow();
  });
});

describe('PostFrontmatterSchema', () => {
  it('parses valid frontmatter with defaults', () => {
    const input = { title: 'Test', tags: ['tech'] };
    const result = PostFrontmatterSchema.parse(input);
    expect(result.title).toBe('Test');
    expect(result.tags).toEqual(['tech']);
    expect(result.excerpt).toBe('');
    expect(result.date).toBeDefined();
  });

  it('applies defaults for missing fields', () => {
    const result = PostFrontmatterSchema.parse({});
    expect(result.title).toBe('');
    expect(result.tags).toEqual([]);
    expect(result.excerpt).toBe('');
    expect(result.date).toBeDefined();
  });
});

describe('GitHubUserSchema', () => {
  it('validates valid GitHub user', () => {
    const user = { avatar_url: 'https://example.com/avatar.png', name: 'John', bio: 'Dev', login: 'johndoe' };
    expect(GitHubUserSchema.parse(user)).toEqual(user);
  });

  it('rejects missing required fields', () => {
    const invalid = { avatar_url: 'https://example.com/avatar.png', name: 'John' };
    expect(() => GitHubUserSchema.parse(invalid)).toThrow();
  });
});

describe('GitHubRepoSchema', () => {
  it('validates valid repo', () => {
    const repo = { id: 1, name: 'my-repo', stargazers_count: 100, html_url: 'https://github.com/user/repo' };
    expect(GitHubRepoSchema.parse(repo)).toEqual(repo);
  });
});

describe('BilibiliUserSchema', () => {
  it('validates valid bilibili user', () => {
    const user = { name: 'User', avatar: 'avatar.png', sign: 'Hi', mid: '123', fans: 1000, likes: 500 };
    expect(BilibiliUserSchema.parse(user)).toEqual(user);
  });
});

describe('BilibiliVideoSchema', () => {
  it('validates valid bilibili video', () => {
    const video = { bvid: 'BV123', title: 'Video', play: 10000, pic: 'cover.jpg' };
    expect(BilibiliVideoSchema.parse(video)).toEqual(video);
  });
});

describe('OsuUserSchema', () => {
  it('validates valid osu user', () => {
    const user = { username: 'player', avatar_url: 'avatar.png', global_rank: 1000, pp: 5000, country_code: 'JP' };
    expect(OsuUserSchema.parse(user)).toEqual(user);
  });

  it('allows null global_rank', () => {
    const user = { username: 'player', avatar_url: 'avatar.png', global_rank: null, pp: 0, country_code: 'US' };
    expect(OsuUserSchema.parse(user)).toEqual(user);
  });
});

describe('OsuScoreSchema', () => {
  it('validates valid osu score', () => {
    const score = { id: 1, title: 'Song', difficulty: 'Hard', rank: 'S', accuracy: 98.5, url: 'https://osu.ppy.sh/1' };
    expect(OsuScoreSchema.parse(score)).toEqual(score);
  });
});