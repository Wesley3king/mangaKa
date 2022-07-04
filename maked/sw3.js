// Criando um nome para o arquivo de cache
const staticCache = "0.0.1";

// Lista de arquivos que devem ser cacheados
const files = [
  './',
  './index.html',
  './static/css/main.b2209928.css',
  './static/js/main.46e8bfe2.js'
];

// Faz cache dos arquivos ao instalar
this.addEventListener("install", event => {
  this.skipWaiting();

  event.waitUntil(
    caches.open(staticCache)
      .then(cache => {
        return cache.addAll(files);
    })
  )
});

// Limpa o cache antigo
this.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => (cacheName.startsWith('meu-site-')))
          .filter(cacheName => (cacheName !== staticCache))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Responde o request direto do cache
this.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o cache
        if (response) {
          return response;
        }
        // Faz a requisição
        return fetch(event.request);
      })
      .catch(() => {
        // Mostra uma página de offline
        return caches.match('./index.html');
      })
  )
});