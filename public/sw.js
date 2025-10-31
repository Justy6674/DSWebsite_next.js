// Basic Service Worker for Push Notifications
// Note: Requires valid VAPID keys and a Push Subscription created on the client

self.addEventListener('install', () => {
  // Activate immediately after install
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  try {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Water Reminder';
    const options = {
      body: data.body || 'Time to hydrate – your body will thank you.',
      icon: data.icon || '/favicon-32x32.png',
      badge: data.badge || '/favicon-32x32.png',
      tag: data.tag || 'water-reminder',
      renotify: true,
      vibrate: data.vibrate || [200, 100, 200],
      data: {
        url: data.url || '/portal/water'
      }
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (e) {
    // Fallback minimal notification if payload isn't JSON
    event.waitUntil(
      self.registration.showNotification('Water Reminder', {
        body: 'Time to drink water',
        icon: '/favicon-32x32.png',
        vibrate: [200, 100, 200]
      })
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification && event.notification.data && event.notification.data.url) || '/portal/water';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// Message-based test notification fallback
self.addEventListener('message', (event) => {
  try {
    const data = event.data || {};
    if (data.type === 'test-notification') {
      const title = data.title || 'Water Reminder';
      const options = {
        body: data.body || 'Time to hydrate – your body will thank you.',
        icon: '/favicon-32x32.png',
        badge: '/favicon-32x32.png',
        vibrate: data.vibrate || [200, 100, 200],
        data: { url: '/portal/water' },
        tag: 'water-reminder-test'
      };
      event.waitUntil(self.registration.showNotification(title, options));
    }
  } catch (e) {
    // no-op
  }
});

// Service Worker for Performance Optimization
const CACHE_NAME = 'downscale-v1';
const STATIC_CACHE = [
  '/',
  '/manifest.json',
  '/lovable-uploads/a0c37573-face-441d-8873-97dfc850d27c.png',
  '/og-image.jpg'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event with network-first strategy for HTML, cache-first for assets
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'document') {
    // Network-first for HTML
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Cache-first for assets
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
});