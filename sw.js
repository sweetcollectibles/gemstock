// Sweethome Service Worker — v5 (con cache foto Supabase)
const CACHE_NAME = 'sweethome-v87';
const PHOTO_CACHE = 'sweethome-photos-v1';

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

// Riconosce le richieste di foto delle carte (storage Supabase)
function isPhotoRequest(url) {
  return url.hostname.endsWith('.supabase.co') && url.pathname.includes('/storage/');
}

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
        // tieni la cache app corrente e la cache foto; cancella le vecchie
        keys.filter(k => k !== CACHE_NAME && k !== PHOTO_CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // 1) FOTO SUPABASE → cache-first (istantanee dopo il primo caricamento)
  if (isPhotoRequest(url)) {
    event.respondWith(
      caches.open(PHOTO_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached; // già in cache → istantanea
          return fetch(event.request).then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cached); // offline e non in cache → niente (placeholder lato app)
        })
      )
    );
    return;
  }

  // 2) Tutto il resto: solo stesso dominio (file dell'app) → network-first
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
