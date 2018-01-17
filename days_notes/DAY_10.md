# Day 10
## (17 January 2018)

*  I have extended the service worker functionality to cache some app resources:

```javascript
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
```

* After this I have created a listener to fetch that resources from the service worker instead of the web server

```javascript
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
```

* I have added two new configs to manifest.json:

```
  "background_color": "#2196F3",
  "theme_color": "#2196F3"
```

#### That's all folks,look at the commit for more info: https://github.com/ldoc/100DaysOfCode/commit/26ca51ffd56381477e1b568a3d2f3ae43a9b1fd7
