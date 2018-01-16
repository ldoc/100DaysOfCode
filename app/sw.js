self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('funcam').then(function(cache) {
      return cache.addAll(
        [
          '/bundle.js',
          '/img/pokemon1.svg',
          '/img/pokemon2.svg',
          '/img/pokemon3.svg',
          '/img/pokemon4.svg',
          '/img/pokemon5.svg',
          '/img/pokemon6.svg'
        ]
      );
    })
  );
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