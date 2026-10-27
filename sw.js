const CACHE_NAME = 'fithome-cache-v2';
const ASSETS_TO_CACHE = [
  '/Fitness-app/',
  '/Fitness-app/index.html',
  '/Fitness-app/styles.css',
  '/Fitness-app/app.js',
  '/Fitness-app/manifest.json',
  '/Fitness-app/img/icon.png',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
];

// Instalación del Service Worker y almacenamiento en caché de los recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Abriendo caché y guardando recursos');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Borrando caché antigua:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia de red: Primero busca en caché, si falla va a la red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Opcional: Guarda dinámicamente peticiones nuevas si es necesario
          return networkResponse;
        });
      }).catch(() => {
        // Fallback en caso de que no haya internet ni caché (opcionalmente una página offline)
        console.log('[Service Worker] Falló la petición sin conexión para:', event.request.url);
      });
    })
  );
});
