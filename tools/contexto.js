// Motor 3: lista curta do que já existe, para colar nos prompts A, B e C (evita repetição).
// Uso: node tools/contexto.js <bioma>   → perguntas e espécies do bioma
//      node tools/contexto.js mitos     → afirmações de mito ou verdade
"use strict";
const { carregar, acharBioma } = require("./lib");

const chave = process.argv[2];
const D = carregar();
if (!chave) { console.log("Uso: node tools/contexto.js <bioma|mitos>  (biomas: " + D.biomas.map((b) => b.id).join(", ") + ")"); process.exit(1); }

if (/^mitos?$/i.test(chave)) {
  console.log("Mitos e verdades que já existem (" + D.mitos.length + "):");
  D.mitos.forEach((m) => console.log("- " + m.s + (m.v ? " (verdade)" : " (mito)")));
} else {
  const b = acharBioma(D.biomas, chave);
  if (!b) { console.log("Bioma não encontrado: " + chave); process.exit(1); }
  console.log("Bioma: " + b.nome);
  console.log("Assuntos das lições: " + b.dados.cards.map((c) => c.h).join("; "));
  console.log("Perguntas que já existem (" + b.dados.q.length + "):");
  b.dados.q.forEach((q) => console.log("- [" + q.t + "] " + q.q));
  console.log("Espécies que já existem: " + b.dados.sp.map((s) => s.n).join(", "));
}
