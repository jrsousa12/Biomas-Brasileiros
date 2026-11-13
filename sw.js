/* Service worker: guarda o app no aparelho para funcionar offline.
   A versão abaixo é trocada automaticamente na publicação (GitHub Actions). */
const CACHE = "biomas-v1";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/app.css",
  "./js/dados/biomas.js",
  "./js/dados/mitos-fontes.js",
  "./js/estado.js",
  "./js/navegacao.js",
  "./js/telas/inicio.js",
  "./js/telas/trilha.js",
  "./js/quiz.js",
  "./js/telas/atividades.js",
  "./js/telas/resultado.js",
  "./js/main.js",
  "./js/pwa.js",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Páginas: tenta a rede primeiro (pega atualizações) e cai no cache se estiver offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }
  // Demais arquivos: cache primeiro.
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
