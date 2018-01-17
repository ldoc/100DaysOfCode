var CACHE_NAME = 'funcam';
var urlsToCache = [
  '/',
  '/bundle.js',
  '/0.bundle.js',
  '/1.bundle.js',
  '/img/pokemon1.svg',
  '/img/pokemon2.svg',
  '/img/pokemon3.svg',
  '/img/pokemon4.svg',
  '/img/pokemon5.svg',
  '/img/pokemon6.svg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');  
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});