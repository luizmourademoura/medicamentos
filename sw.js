const CACHE_NAME = "aquarismo-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./verdemalaquita.html",
  "./mebendazol.html",
  "./niclosamida.html",
  "./albendazol.html",
  "./piperazina.html",
  "./formol.html",
  "./sulfatocobre.html",
  "./fembendazol.html",
  "./azulmetileno.html",
  "./permanganatopotassio.html",
  "./sulfatodeneomicina.html",
  "./acidoxolinico.html",
  "./nitrofurantoina.html",
  "./azitromicina.html",
  "./levamisol.html",
  "./metronidazol.html",
  "./kanamicina.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
