import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

global.fetch = vi.fn();

const mockBilibiliUser = {
  card: {
    name: 'TestUser',
    face: 'https://example.com/avatar.png',
    sign: 'Test signature',
    mid: 123456,
    fans: 1000,
  },
  like_num: 500,
};

const mockBilibiliVideos = {
  data: {
    list: {
      vlist: [
        { bvid: 'BV123', title: 'Video 1', play: 10000, pic: 'https://example.com/pic.jpg' },
      ],
    },
  },
};

const mockWbiKeys = {
  wbi_img: {
    img_url: 'https://example.com/img.png',
    sub_url: 'https://example.com/sub.png',
  },
};

describe('Bilibili API Route', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', fetch);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should require uid parameter', async () => {
    const req = new Request('https://example.com/api/bilibili');
    
    const { GET } = await import('../app/api/bilibili/route');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('uid is required');
  });

  it('should fetch user data with valid uid', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockWbiKeys,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockBilibiliUser,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockBilibiliVideos,
      });

    const req = new Request('https://example.com/api/bilibili?uid=123456');
    const { GET } = await import('../app/api/bilibili/route');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.user).toBeDefined();
    expect(data.videos).toBeDefined();
  });

  it('should handle missing wbi keys', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: {} }),
    });

    const req = new Request('https://example.com/api/bilibili?uid=123456');
    const { GET } = await import('../app/api/bilibili/route');
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.videos).toEqual([]);
  });
});