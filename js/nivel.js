"use strict";
/* ============ NÍVEL das perguntas: Todos / Fácil / Médio / Desafio (só na trilha) ============ */
/* S.nivel: "t" todos, "f", "m", "d". Marcação em dados/niveis.js. */
function nivelAtual() {
  return S.nivel === "f" || S.nivel === "m" || S.nivel === "d" ? S.nivel : "t";
}

/* nível de uma pergunta (id = bioma + posição, ex. "amz12"); sem marca = médio */
function nivelDe(q) {
  var mapa, n;
  if (!q || !q.b || typeof NIVEL_Q === "undefined" || !NIVEL_Q[q.b]) return "m";
  mapa = NIVEL_Q[q.b].split(",");
  n = mapa[parseInt(String(q.id).slice(q.b.length), 10)];
  return n === "f" || n === "d" ? n : "m";
}

function nivelDefinir(n) {
  S.nivel = n;
  save();
  render();
}

/* lista já embaralhada → até "total" perguntas, as do nível escolhido primeiro e o resto completa */
function nivelFiltrar(lista, total) {
  var alvo = nivelAtual(), ordem = { f: ["f", "m", "d"], m: ["m", "f", "d"], d: ["d", "m", "f"] }[alvo], res = [], i, j;
  if (!ordem) return lista.slice(0, total);
  for (i = 0; i < ordem.length; i++) {
    for (j = 0; j < lista.length; j++) {
      if (nivelDe(lista[j]) === ordem[i]) res.push(lista[j]);
    }
  }
  return res.slice(0, total);
}

function nivelBtn(txt, val) {
  return '<button class="btn' + (nivelAtual() === val ? "" : " sec") + '" style="min-height:44px" onclick="nivelDefinir(\'' + val + '\')">' + txt + "</button>";
}

function nivelSeletorHTML() {
  return '<div class="card"><p class="small"><b>Nível das perguntas</b> (nas trilhas)</p><p>' +
    nivelBtn("🎲 Todos", "t") + " " + nivelBtn("🌱 Fácil", "f") + "</p><p>" +
    nivelBtn("🌿 Médio", "m") + " " + nivelBtn("🔥 Desafio", "d") + "</p></div>";
}
