const CACHE_NAME = 'maromba-burguer-v4';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/maromba.js',
  '/manifest.json',
  '/manifest-cliente.json',
  '/logo.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // NUNCA cacheia chamadas de API — sempre vai para a rede
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Para assets estáticos: cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
