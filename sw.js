/* const cacheName = "basketapp"; */
/* const staticAssets = [
    './',
    './index.html',
    './style.css',
    './index.js',
    './manifest.webmanifest'
]; */
self.addEventListener('install', function(event) {
    console.log('SW installed');
    //event.waitUntil();
    caches.open('static')
    .then(function(cache){
       /*  caches.add('/index.js');
        caches.add('/');
        caches.add('/index.html'); */
        cache.addAll([
                './',
                './index.html',
                './style.css',
                './index.js',
                './manifest.json'
        ]);
    })
});

self.addEventListener('activate', function() {
    console.log('SW activated');

});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(res) {
            if (res) {
                return res;
            } else {
                return fetch(event.request);
            }
        })
        
    );
})