self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.error('Error fetching resource:', error);
            })
    );
});

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('multi-tab-app-cache')
            .then((cache) => {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/style.css',
                    '/script.js'
                ]);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.filter((cacheName) => cacheName !== 'multi-tab-app-cache')
                        .map((cacheName) => caches.delete(cacheName))
                );
            })
    );
});
