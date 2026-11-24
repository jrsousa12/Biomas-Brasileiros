// Motor 4: painel de conteúdo — quantidades por bioma e o que está faltando.
// Uso: node tools/contar.js
"use strict";
const { carregar } = require("./lib");

const META = 8; // perguntas sorteadas por partida
const D = carregar();
const col = (s, n) => String(s).padStart(n);
console.log("Bioma            cards  mc  tf ord  perg  esp");
const faltas = [];
for (const b of D.biomas) {
  const q = b.dados.q, c = (t) => q.filter((x) => x.t === t).length;
  console.log(b.nome.padEnd(16) + col(b.dados.cards.length, 6) + col(c("mc"), 4) + col(c("tf"), 4) + col(c("order"), 4) +
    col(q.length, 6) + col(b.dados.sp.length, 5));
  if (q.length < 2 * META) faltas.push(b.nome + ": " + q.length + " perguntas (sorteio de " + META + " fica repetitivo abaixo de " + 2 * META + ")");
  if (c("order") < 2) faltas.push(b.nome + ": só " + c("order") + " de ordenar");
  if (c("tf") < 2) faltas.push(b.nome + ": só " + c("tf") + " de verdadeiro/falso");
}
const verd = D.mitos.filter((m) => m.v).length;
console.log("\nMitos: " + D.mitos.length + " (" + verd + " verdades, " + (D.mitos.length - verd) + " mitos) · Fontes: " + D.fontes.length);
if (faltas.length) console.log("\nSugestões:\n- " + faltas.join("\n- "));
