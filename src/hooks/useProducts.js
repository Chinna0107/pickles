import { useState, useEffect, useRef } from 'react';
import API from '../config';

// In-memory cache shared across hook instances
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const isFresh = (key) => {
  const entry = cache.get(key);
  return entry && Date.now() - entry.ts < CACHE_TTL;
};

const getCache = (key) => cache.get(key)?.data ?? null;
const setCache = (key, data) => cache.set(key, { data, ts: Date.now() });

// Generic fetch hook with cache
function useFetch(url, cacheKey) {
  const [data, setData] = useState(() => isFresh(cacheKey) ? getCache(cacheKey) : null);
  const [loading, setLoading] = useState(!isFresh(cacheKey));
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!url) return;
    if (isFresh(cacheKey)) {
      setData(getCache(cacheKey));
      setLoading(false);
      return;
    }

    abortRef.current = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: abortRef.current.signal })
      .then(r => r.json())
      .then(result => {
        setCache(cacheKey, result);
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => abortRef.current?.abort();
  }, [url, cacheKey]);

  return { data, loading, error };
}

// Hook: fetch all products (optionally by category)
export function useProducts(category = null) {
  const query = category ? `?category=${category}` : '';
  const cacheKey = `products:${category || 'all'}`;
  const { data, loading, error } = useFetch(`${API}/products${query}`, cacheKey);
  return { products: data ?? [], loading, error };
}

// Hook: fetch single product by slug
export function useProduct(slug) {
  const cacheKey = `product:${slug}`;
  const { data, loading, error } = useFetch(slug ? `${API}/products/${slug}` : null, cacheKey);
  return { product: data, loading, error };
}

// Invalidate cache (call after admin edits)
export function invalidateProductCache() {
  for (const key of cache.keys()) {
    if (key.startsWith('product')) cache.delete(key);
  }
}
