import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getCached, setCache, withCache } from '../utils/server-cache';

describe('server-cache', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getCached', () => {
    it('returns null for non-existent key', () => {
      expect(getCached('missing')).toBeNull();
    });

    it('returns cached data if not expired', () => {
      setCache('test', { data: 'value' }, 60000);
      vi.advanceTimersByTime(10000);
      expect(getCached('test')).toEqual({ data: 'value' });
    });

    it('returns null and deletes if expired', () => {
      setCache('test', { data: 'value' }, 10000);
      vi.advanceTimersByTime(20000);
      expect(getCached('test')).toBeNull();
    });
  });

  describe('setCache', () => {
    it('stores data with TTL', () => {
      setCache('key', 'value', 5000);
      expect(getCached('key')).toBe('value');
    });
  });

  describe('withCache', () => {
    it('returns cached result if available', async () => {
      const fetcher = vi.fn().mockResolvedValue('fresh');
      setCache('cached-key', 'cached-value');

      const result = await withCache('cached-key', fetcher);

      expect(result).toBe('cached-value');
      expect(fetcher).not.toHaveBeenCalled();
    });

    it('calls fetcher and caches result if not cached', async () => {
      const fetcher = vi.fn().mockResolvedValue('new-value');

      const result = await withCache('new-key', fetcher);

      expect(result).toBe('new-value');
      expect(fetcher).toHaveBeenCalledTimes(1);
      expect(getCached('new-key')).toBe('new-value');
    });

    it('respects custom TTL', async () => {
      const fetcher = vi.fn().mockResolvedValue('value');
      
      await withCache('custom-ttl', fetcher, 1000);
      
      vi.advanceTimersByTime(500);
      expect(getCached('custom-ttl')).toBe('value');
      
      vi.advanceTimersByTime(1000);
      expect(getCached('custom-ttl')).toBeNull();
    });
  });
});