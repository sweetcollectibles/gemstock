// Gemstock Service Worker — v3
const CACHE_NAME = 'gemstock-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo-neon.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// INSTALL — precache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
  // Force immediate activation (skip waiting)
  self.skipWaiting();
});

// ACTIVATE — delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH — network-first strategy
// Prova sempre la rete prima → fallback cache se offline
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests (fonts, etc.)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Save fresh response to cache
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => {
        // Network failed → serve from cache (offline mode)
        return caches.match(event.request).then(cached => {
          return cached || caches.match('./index.html');
        });
      })
  );
});
