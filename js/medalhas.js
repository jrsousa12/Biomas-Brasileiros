"use strict";
/* P3 – Medalhas: S.medalhas={id:dataISO}. checarMedalhas() ao fim do quiz e ao responder mito; vMedalhas() = view "medalhas". */

function totalTrilhasConcluidas() {
  var total = 0, i;
  for (i = 0; i < BIOMES.length; i++) {
    if (S.trails && S.trails[BIOMES[i].id]) { total++; }
  }
  return total;
}

function totalMitosAcertados() {
  var total = 0, i;
  if (!S.mitos || typeof MITOS === "undefined") { return 0; }
  for (i = 0; i < MITOS.length; i++) {
    if (S.mitos[i] !== undefined && S.mitos[i] === MITOS[i].v) { total++; }
  }
  return total;
}

function totalAcertosRegistrados() {
  var id, total = 0;
  for (id in (S.got || {})) {
    if (S.got.hasOwnProperty(id) && S.got[id]) { total++; }
  }
  return total;
}

var MEDALHAS = [
  { id: "primeira_trilha", emoji: "🌱", nome: "Primeiros passos", desc: "Concluiu sua primeira trilha.",
    teste: function () { return totalTrilhasConcluidas() >= 1; } },
  { id: "tres_trilhas", emoji: "🧭", nome: "Explorador de biomas", desc: "Concluiu três trilhas.",
    teste: function () { return totalTrilhasConcluidas() >= 3; } },
  { id: "todas_trilhas", emoji: "🌎", nome: "Guardião do Brasil", desc: "Concluiu as seis trilhas.",
    teste: function () { return totalTrilhasConcluidas() >= BIOMES.length; } },
  { id: "xp100", emoji: "⭐", nome: "Estrela em ascensão", desc: "Conquistou 100 XP.",
    teste: function () { return S.xp >= 100; } },
  { id: "xp500", emoji: "🏆", nome: "Mestre dos Biomas", desc: "Conquistou 500 XP.",
    teste: function () { return S.xp >= 500; } },
  { id: "mitos", emoji: "🔎", nome: "Caçador de mitos", desc: "Acertou todos os mitos e verdades.",
    teste: function () { return MITOS.length > 0 && totalMitosAcertados() >= MITOS.length; } },
  { id: "revisao", emoji: "🧠", nome: "Memória afiada", desc: "Zerou a lista de revisão.",
    teste: function () { return S.wrong.length === 0 && totalAcertosRegistrados() > 0; } },
  { id: "dez_cartas", emoji: "🃏", nome: "Colecionador", desc: "Conquistou dez cartas de espécies.",
    teste: function () { return S.cards.length >= 10; } },
  { id: "desafio_final", emoji: "🎓", nome: "Desafio vencido", desc: "Fez o desafio final.",
    teste: function () { return S.finalTries > 0; } },
  { id: "tres_dias", emoji: "🔥", nome: "Ritmo de estudo", desc: "Jogou por três dias seguidos.",
    teste: function () { return !!S.dias && Number(S.dias.max) >= 3; } }
];

function checarMedalhas() {
  var novas = [], agora = new Date().toISOString(), i, m;
  if (!S.medalhas) { S.medalhas = {}; }
  for (i = 0; i < MEDALHAS.length; i++) {
    m = MEDALHAS[i];
    if (!S.medalhas[m.id] && m.teste()) {
      S.medalhas[m.id] = agora;
      novas.push(m);
    }
  }
  if (novas.length) {
    save();
    for (i = 0; i < novas.length; i++) { avisoRapido("🏅 Nova medalha: " + novas[i].nome); }
  }
  return novas;
}

function medalhaHTML(m) {
  var ganhou = S.medalhas && S.medalhas[m.id];
  var estilo = ganhou ? "" : ' style="filter:grayscale(1);opacity:.48;background:var(--card);color:var(--ink)"';
  return '<div class="tile' + (ganhou ? ' medalha' : '') + '"' + estilo + '><div><div class="em">' + esc(m.emoji) + "</div>" +
    "<h3>" + esc(m.nome) + "</h3>" +
    '<div class="small">' + esc(m.desc) + "</div></div>" +
    '<div class="st">' + (ganhou ? "Conquistada" : "Bloqueada") + "</div></div>";
}

function vMedalhas() {
  var html, i, n = 0;
  if (!S.medalhas) { S.medalhas = {}; }
  checarMedalhas();
  for (i = 0; i < MEDALHAS.length; i++) { if (S.medalhas[MEDALHAS[i].id]) { n++; } }
  html = headerHTML("Medalhas 🏅", n + " de " + MEDALHAS.length + " conquistadas") + '<main><div class="tiles">';
  for (i = 0; i < MEDALHAS.length; i++) { html += medalhaHTML(MEDALHAS[i]); }
  return html + '</div><button class="btn sec" onclick="go(\'home\')">Voltar às trilhas</button></main>';
}
