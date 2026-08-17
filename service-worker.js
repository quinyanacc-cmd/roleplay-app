const CACHE = "roleplay-v8-0";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./logo-32.png",
  "./logo-96.png",
  "./logo-180.png",
  "./logo-192.png",
  "./logo-512.png",
  "./logo-maskable-192.png",
  "./logo-maskable-512.png",
  "./morning-header.jpg",
  "./evening-header.jpg",
  "./header-tag.jpg",
  "./header-daemmerung.jpg",
  "./header-zuhause.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
