/*
 * Simple service worker to enable offline support.
 *
 * This file caches the core assets during installation and serves
 * them from cache when offline. For all other requests it falls
 * back to the network and caches new responses on the fly. If the
 * network is unavailable, it will return a cached index.html for
 * navigation requests so the app can still load in offline mode.
 */

// Bump the cache version whenever core assets change so that
// previously cached resources are invalidated. This ensures users
// receive the latest styles and scripts without having to manually
// clear their browser cache. Increment the suffix each time you
// modify CSS, JS or HTML files.
const CACHE_NAME = 'english-pwa-v2';

// List of resources to precache on install. These are critical files
// required for the app shell to render.
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Clean up old caches when the service worker activates.
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise, attempt a network fetch and cache the result
      return caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            // Clone response so we can store a copy in cache
            const responseClone = response.clone();
            // Avoid caching opaque responses (e.g. cross-origin requests)
            if (!responseClone || responseClone.type === 'opaque') {
              return response;
            }
            cache.put(event.request, responseClone);
            return response;
          })
          .catch(() => {
            // If both cache and network fail, return a fallback HTML page for navigations
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match('/index.html');
            }
          });
      });
    })
  );
});