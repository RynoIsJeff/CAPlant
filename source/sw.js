// Service Worker for Civils Agri Plant
const CACHE_NAME = 'caplant-v2.0.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/images/logo.png',
  '/plugins/bootstrap/bootstrap.min.css',
  '/plugins/fontawesome/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Use addAll but catch errors for individual files
        return Promise.allSettled(
          urlsToCache.map(function(url) {
            return fetch(url)
              .then(function(response) {
                if (response.ok) {
                  return cache.put(url, response);
                }
                console.log('Failed to cache:', url, response.status);
              })
              .catch(function(error) {
                console.log('Error caching:', url, error);
              });
          })
        );
      })
      .then(function() {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  // Always prefer fresh HTML from network for page navigations.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(function(networkResponse) {
          return caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(function() {
          return caches.match(event.request).then(function(cachedResponse) {
            if (cachedResponse) {
              return cachedResponse;
            }
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/html'
              })
            });
          });
        })
    );
    return;
  }

  // Cache-first for non-navigation requests (assets).
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(function(error) {
          console.log('Fetch failed for:', event.request.url, error);
          return new Response('Network error', {
            status: 408,
            statusText: 'Request Timeout'
          });
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
