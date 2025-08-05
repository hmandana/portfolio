const CACHE_NAME = 'portfolio-cache-v1';
const STATIC_CACHE_NAME = 'portfolio-static-v1';
const DATA_CACHE_NAME = 'portfolio-data-v1';

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/skills/index.ts',
  // Add other static assets as needed
];

// API endpoints to cache
const DATA_ENDPOINTS = [
  '/graphql',
  // Add other API endpoints as needed
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DATA_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle GraphQL requests (data caching)
  if (url.pathname.includes('/graphql') || url.pathname.includes('/api/')) {
    event.respondWith(
      cacheFirstWithNetworkFallback(request, DATA_CACHE_NAME)
    );
    return;
  }

  // Handle static assets
  if (request.destination === 'document' || 
      request.destination === 'script' || 
      request.destination === 'style' ||
      request.destination === 'image') {
    event.respondWith(
      cacheFirstWithNetworkFallback(request, STATIC_CACHE_NAME)
    );
    return;
  }

  // Default: network first for everything else
  event.respondWith(
    networkFirstWithCacheFallback(request, CACHE_NAME)
  );
});

// Cache strategies
async function cacheFirstWithNetworkFallback(request, cacheName) {
  try {
    // Try cache first
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('Serving from cache:', request.url);
      
      // Update cache in background if it's older than 5 minutes
      if (shouldUpdateCache(cachedResponse)) {
        updateCacheInBackground(request, cache);
      }
      
      return cachedResponse;
    }

    // Fallback to network
    console.log('Cache miss, fetching from network:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    // Try to serve a fallback page for navigation requests
    if (request.destination === 'document') {
      const cache = await caches.open(STATIC_CACHE_NAME);
      return cache.match('/') || new Response('Offline', { status: 503 });
    }
    throw error;
  }
}

async function networkFirstWithCacheFallback(request, cacheName) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(cacheName);
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', request.url);
    
    // Fallback to cache
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Helper functions
function shouldUpdateCache(response) {
  const cacheDate = new Date(response.headers.get('date') || Date.now());
  const now = new Date();
  const fiveMinutes = 5 * 60 * 1000;
  
  return (now - cacheDate) > fiveMinutes;
}

async function updateCacheInBackground(request, cache) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
      console.log('Cache updated in background:', request.url);
    }
  } catch (error) {
    console.warn('Background cache update failed:', error);
  }
}

// Handle cache clearing messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('Clearing cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Periodic cache cleanup (runs every hour when SW is active)
setInterval(() => {
  console.log('Running periodic cache cleanup...');
  cleanupExpiredCache();
}, 60 * 60 * 1000);

async function cleanupExpiredCache() {
  try {
    const cache = await caches.open(DATA_CACHE_NAME);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response && shouldUpdateCache(response)) {
        await cache.delete(request);
        console.log('Removed expired cache entry:', request.url);
      }
    }
  } catch (error) {
    console.warn('Cache cleanup failed:', error);
  }
}
