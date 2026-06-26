const CACHE_NAME = 'student-revenue-calc-v3';
const FILES_TO_CACHE = ['./index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  // Firebase APIはキャッシュせず常にネットワークから取得する
  if (e.request.url.includes('firebaseapp') || e.request.url.includes('googleapis')) return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
