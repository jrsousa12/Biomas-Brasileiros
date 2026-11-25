/* Service worker: guarda o app no aparelho para funcionar offline.
   A versão abaixo é trocada automaticamente na publicação (GitHub Actions). */
const CACHE = "biomas-v1";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/app.css",
  "./js/dados/biomas/amazonia.js",
  "./js/dados/biomas/cerrado.js",
  "./js/dados/biomas/mata-atlantica.js",
  "./js/dados/biomas/caatinga.js",
  "./js/dados/biomas/pampa.js",
  "./js/dados/biomas/pantanal.js",
  "./js/dados/biomas/mata-atlantica-extra.js",
  "./js/dados/biomas/caatinga-extra.js",
  "./js/dados/biomas/pampa-extra.js",
  "./js/dados/biomas/pantanal-extra.js",
  "./js/dados/mitos-fontes.js",
  "./js/dados/glossario.js",
  "./js/dados/textos/amazonia.js",
  "./js/dados/textos/cerrado.js",
  "./js/dados/textos/pantanal.js",
  "./js/dados/textos/caatinga.js",
  "./js/estado.js",
  "./js/navegacao.js",
  "./js/dialogo.js",
  "./js/sessao.js",
  "./js/voltar.js",
  "./js/sequencia.js",
  "./js/medalhas.js",
  "./js/mapa.js",
  "./js/telas/inicio.js",
  "./js/telas/trilha.js",
  "./js/quiz.js",
  "./js/telas/atividades.js",
  "./js/telas/resultado.js",
  "./js/quiz-pares.js",
  "./js/telas/glossario.js",
  "./js/telas/relatorio.js",
  "./js/qual-bioma.js",
  "./js/dados/biomas/amazonia-extra.js",
  "./js/dados/biomas/cerrado-extra.js",
  "./js/main.js",
  "./js/pwa.js",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./css/relatorio.css"
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
