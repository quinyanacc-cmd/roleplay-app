const CACHE = "roleplay-v7-0-0";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./logo.jpeg",
  "./morning-header.jpg",
  "./evening-header.jpg",
  "./header-tag.jpg",
  "./header-daemmerung.jpg",
  "./header-zuhause.jpg",
  "./assets/mascots/ich.svg",
  "./assets/mascots/vitalist.svg",
  "./assets/mascots/absolvent.svg",
  "./assets/mascots/unternehmer.svg",
  "./assets/mascots/muslim.svg",
  "./assets/mascots/wirt.svg",
  "./assets/mascots/familienmensch.svg"
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
