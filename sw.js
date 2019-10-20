const cacheName = "basketapp";
const staticAssets = [
    './',
    './index.html',
    './style.css',
    './index.js',
    './manifest.webmanifest'
];
self.addEventListener('install', async e => {
    const cashe = await caches.open(cacheName);
    await caches.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim();
})