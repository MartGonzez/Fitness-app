self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fithome-store').then((cache) => {
      return cache.addAll([
        '/Fitness-app/',
        '/Fitness-app/index.html',
        '/Fitness-app/styles.css',
        '/Fitness-app/app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
