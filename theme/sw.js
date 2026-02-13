// Service Worker for Civils Agri Plant
const CACHE_NAME = 'caplant-v2.0.0';
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
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request).catch(function(error) {
          // If fetch fails, return a basic response to prevent errors
          console.log('Fetch failed for:', event.request.url, error);
          // For navigation requests, return a basic HTML response
          if (event.request.mode === 'navigate') {
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/html'
              })
            });
          }
          // For other requests, return a basic error response
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
