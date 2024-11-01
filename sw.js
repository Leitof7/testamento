const CACHE_NAME = 'testamentos-v1';
const urlsToCache = [
    './',
    './testamento-amor.html',
    './styles.css',
    './script.js',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png'
];

// Instalación del SW
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Activación del SW
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Estrategia de cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Agregar manejo de errores
self.addEventListener('error', event => {
    console.error('Service Worker error:', event.error);
});