/* ROLEPLAY – Service Worker

   Die App arbeitet vollständig lokal. Der Worker sorgt nur dafür, dass sie
   auch ohne Netz startet: beim Installieren wird die Hülle abgelegt, im
   Betrieb gilt "Netz zuerst, Cache als Rückfallebene". Dadurch ist eine neue
   Version sofort aktiv, ohne dass ein veralteter Stand hängenbleibt. */

const CACHE = "roleplay-v7-0-0";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./logic.js",
  "./app.js",
  "./manifest.webmanifest",
  "./logo-96.png",
  "./logo-192.png",
  "./logo-512.png",
  "./logo-maskable-192.png",
  "./logo-maskable-512.png",
  "./logo-180.png",
  "./logo-32.png",
  "./morning-header.jpg",
  "./evening-header.jpg",
  "./header-tag.jpg",
  "./header-daemmerung.jpg",
  "./header-zuhause.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      // Ein einzelnes fehlendes Bild darf die Installation nicht verhindern.
      .then(cache => Promise.all(ASSETS.map(asset => cache.add(asset).catch(() => null))))
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
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then(hit => hit || caches.match("./index.html")))
  );
});
