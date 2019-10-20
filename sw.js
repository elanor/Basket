/* const cacheName = "basketapp"; */
/* const staticAssets = [
    './',
    './index.html',
    './style.css',
    './index.js',
    './manifest.webmanifest'
]; */
self.addEventListener('install', function() {
    console.log('SW installed');
});

self.addEventListener('activate', function() {
    console.log('SW activated');

})