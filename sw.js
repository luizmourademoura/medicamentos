const CACHE_NAME = "aquarismo-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon_72x72.png",
  "./icon_96x96.png",
  "./icon_128x128.png",
  "./icon_144x144.png",
  "./icon_152x152.png",
  "./icon_192x192.png",
  "./icon_384x384.png",
  "./icon_512x512.png",
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
  // Estratégia: Cache primeiro para arquivos estáticos (HTML, JS, CSS e ícones)
  if (event.request.method === "GET" && (event.request.url.endsWith(".html") || event.request.url.endsWith(".png") || event.request.url.endsWith(".css"))) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            // Armazenar a resposta da rede no cache para futuras requisições
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  } else {
    // Para outras requisições (como JS, API, etc.), faz-se o fetch diretamente
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});

// Evento de ativação para limpar caches antigos, se necessário
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
