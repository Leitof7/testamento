// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";
const CACHE_NAME = 'testamentos-v2';

// Página de fallback offline
const offlineFallbackPage = "testamento-amor.html";

// Archivos a cachear
const urlsToCache = [
    '/',
    '/testamento-amor.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    'https://raw.githubusercontent.com/Leitof7/testamento/main/icon-192x192.png',
    'https://raw.githubusercontent.com/Leitof7/testamento/main/icon-512x512.png'
];

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

// Instalación
self.addEventListener('install', async (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME)
                .then(cache => {
                    console.log('Cache abierto');
                    return cache.addAll(urlsToCache);
                }),
            caches.open(CACHE)
                .then((cache) => cache.add(offlineFallbackPage))
        ])
    );
});

if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}

// Fetch
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResp = await event.preloadResponse;

                if (preloadResp) {
                    return preloadResp;
                }

                const networkResp = await fetch(event.request);
                return networkResp;
            } catch (error) {
                const cache = await caches.open(CACHE);
                const cachedResp = await cache.match(offlineFallbackPage);
                return cachedResp;
            }
        })());
    }
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Manejo de errores
self.addEventListener('error', event => {
    console.error('Service Worker error:', event.error);
});