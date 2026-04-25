import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

global.fetch = vi.fn();

const mockGitHubUser = {
  avatar_url: 'https://example.com/avatar.png',
  name: 'Test User',
  bio: 'Test bio',
  login: 'testuser',
};

const mockGitHubRepos = {
  items: [
    { id: 1, name: 'repo1', stargazers_count: 100, html_url: 'https://github.com/test/repo1' },
  ],
};

describe('GitHub API Route', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', fetch);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should require username parameter', async () => {
    const req = new Request('https://example.com/api/github');
    
    const { GET } = await import('../app/api/github/route');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('username is required');
  });

  it('should fetch user and repos with valid username', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockGitHubUser,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockGitHubRepos,
      });

    const req = new Request('https://example.com/api/github?username=testuser');
    const { GET } = await import('../app/api/github/route');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.user).toBeDefined();
    expect(data.repos).toBeDefined();
  });

  it('should return null for non-existent user', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

    const req = new Request('https://example.com/api/github?username=nonexistent');
    const { GET } = await import('../app/api/github/route');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.user).toBeNull();
  });
});