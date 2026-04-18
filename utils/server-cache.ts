const CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  expires: number;
}

const store = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    store.delete(key);
    return null;
  }
  return entry.data as T;
}

export function setCache<T>(key: string, data: T, ttl = CACHE_TTL): void {
  store.set(key, { data, expires: Date.now() + ttl });
}

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = CACHE_TTL
): Promise<T> {
  const cached = getCached<T>(key);
  if (cached !== null) return cached;

  const data = await fetcher();
  setCache(key, data, ttl);
  return data;
}
