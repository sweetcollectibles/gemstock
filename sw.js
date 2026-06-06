// Sweethome Service Worker — v4
const CACHE_NAME = 'sweethome-v31';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo-neon.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './ghost-tile.png',
  './ghost-empty.png',
  './icon-carte.png',
  './icon-sealed.png',
  './icon-wishlist.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() =>
        caches.match(event.request).then(cached => cached || caches.match('./index.html'))
      )
  );
});
