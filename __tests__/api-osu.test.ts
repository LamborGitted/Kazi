import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

global.fetch = vi.fn();

const mockOsuUser = {
  id: 1,
  username: 'testplayer',
  avatar_url: 'https://example.com/avatar.png',
  country: { code: 'JP' },
  statistics: { global_rank: 1000, pp: 5000 },
};

const mockOsuScores = [
  { id: 1, beatmapset: { title: 'Song 1' }, beatmap: { version: 'Hard', url: 'https://osu.ppy.sh/1' }, rank: 'S', accuracy: 0.98 },
];

describe('OSU API Route', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', fetch);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should require uid parameter', async () => {
    const req = new Request('https://example.com/api/osu');
    
    const { GET } = await import('../app/api/osu/route');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('uid is required');
  });

  it('should fetch user data with valid uid', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'test-token', expires_in: 3600 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockOsuUser,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockOsuScores,
      });

    const req = new Request('https://example.com/api/osu?uid=1&mode=osu');
    const { GET } = await import('../app/api/osu/route');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.user).toBeDefined();
    expect(data.scores).toBeDefined();
  });
});