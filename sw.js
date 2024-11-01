// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE_NAME = 'testamentos-cache-v1';

// Recursos para pre-cachear
const PRECACHE_ASSETS = [
    '/',
    '/testamento-amor.html',
    '/offline.html',
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

// Instalación y pre-cache
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        console.log('Cacheando recursos iniciales');
        try {
            await cache.addAll(PRECACHE_ASSETS);
            console.log('Recursos pre-cacheados exitosamente');
            self.skipWaiting();
        } catch (error) {
            console.error('Error pre-cacheando recursos:', error);
        }
    })());
});

// Activación y reclamación de clientes
self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Eliminando cache antiguo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});

if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}

// Estrategia cache-first para fetch
self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        try {
            const cache = await caches.open(CACHE_NAME);
            
            // Intentar obtener del cache
            const cachedResponse = await cache.match(event.request);
            
            if (cachedResponse !== undefined) {
                console.log('Cache hit:', event.request.url);
                return cachedResponse;
            } else {
                console.log('Cache miss, fetching:', event.request.url);
                try {
                    // Si no está en cache, ir a la red
                    const networkResponse = await fetch(event.request);
                    
                    // Guardar la nueva respuesta en cache
                    if (networkResponse.ok) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    
                    return networkResponse;
                } catch (error) {
                    // Si falla la red, devolver página offline
                    console.log('Error de red, devolviendo offline page');
                    return cache.match('/offline.html');
                }
            }
        } catch (error) {
            console.error('Error en fetch:', error);
            return cache.match('/offline.html');
        }
    })());
});

// Manejo de errores
self.addEventListener('error', event => {
    console.error('Service Worker error:', event.error);
});