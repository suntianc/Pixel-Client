/**
 * Request Cache Layer
 * Provides caching for API requests to reduce network calls
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds (default: 5 minutes)
}

// Default TTL: 5 minutes
const DEFAULT_TTL = 5 * 60 * 1000;

// In-memory cache storage
const cacheStore = new Map<string, CacheEntry<unknown>>();

/**
 * Generate a cache key from arguments
 */
function generateCacheKey(prefix: string, args: unknown[]): string {
  const argsString = args
    .map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        // Sort object keys for consistent caching
        return JSON.stringify(arg, Object.keys(arg).sort());
      }
      return String(arg);
    })
    .join('-');
  return `${prefix}:${argsString}`;
}

/**
 * Get cached data if valid
 */
function getFromCache<T>(key: string, ttl: number): T | null {
  const entry = cacheStore.get(key) as CacheEntry<T> | undefined;
  
  if (!entry) {
    return null;
  }
  
  const isExpired = Date.now() - entry.timestamp > ttl;
  
  if (isExpired) {
    cacheStore.delete(key);
    return null;
  }
  
  return entry.data;
}

/**
 * Set data in cache
 */
function setCache<T>(key: string, data: T): void {
  cacheStore.set(key, {
    data,
    timestamp: Date.now()
  });
}

/**
 * Clear all cached data
 */
export function clearCache(): void {
  cacheStore.clear();
}

/**
 * Clear cache entries matching a prefix
 */
export function clearCacheByPrefix(prefix: string): void {
  const keysToDelete: string[] = [];
  
  cacheStore.forEach((_, key) => {
    if (key.startsWith(prefix)) {
      keysToDelete.push(key);
    }
  });
  
  keysToDelete.forEach(key => cacheStore.delete(key));
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cacheStore.size,
    keys: Array.from(cacheStore.keys())
  };
}

/**
 * Create a cached API function (no arguments)
 * Returns a function that when called returns a cached Promise
 */
export function createCachedApiFunction<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): () => Promise<T> {
  const { ttl = DEFAULT_TTL } = options;
  
  return async (): Promise<T> => {
    const cached = getFromCache<T>(cacheKey, ttl);
    if (cached !== null) {
      return cached;
    }
    
    const data = await fetcher();
    setCache(cacheKey, data);
    return data;
  };
}

/**
 * Create a cached API function with one argument
 */
export function createCachedApiFunctionWithArg<T, A>(
  prefix: string,
  fetcher: (arg: A) => Promise<T>,
  options: CacheOptions = {}
): (arg: A) => Promise<T> {
  const { ttl = DEFAULT_TTL } = options;
  
  return async (arg: A): Promise<T> => {
    const cacheKey = generateCacheKey(prefix, [arg]);
    const cached = getFromCache<T>(cacheKey, ttl);
    if (cached !== null) {
      return cached;
    }
    
    const data = await fetcher(arg);
    setCache(cacheKey, data);
    return data;
  };
}

/**
 * Create a cached API function with multiple arguments
 */
export function createCachedApiFunctionWithArgs<T, A extends unknown[]>(
  prefix: string,
  fetcher: (...args: A) => Promise<T>,
  options: CacheOptions = {}
): (...args: A) => Promise<T> {
  const { ttl = DEFAULT_TTL } = options;
  
  return async (...args: A): Promise<T> => {
    const cacheKey = generateCacheKey(prefix, args);
    const cached = getFromCache<T>(cacheKey, ttl);
    if (cached !== null) {
      return cached;
    }
    
    const data = await fetcher(...args);
    setCache(cacheKey, data);
    return data;
  };
}
