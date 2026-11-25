// Teste do motor de teoria: um caso que DEVE gerar cada aviso e um parecido que NÃO deve.
// Uso: node tests/teoria.js  → "OK" ou as falhas.
"use strict";
const { conferir, checarFicha } = require("../tools/teoria");
const mc = (q, o, a) => ({ t: "mc", q, o, a, e: "x" });
const tipos = (q, f) => conferir(q, f).map((a) => a.tipo);
const casos = [
  ["longa", mc("Qual é a cor do céu?", ["Azul claro durante o dia inteiro e sempre limpo", "Verde", "Roxo", "Preto"], 0), true],
  ["longa", mc("Qual é a cor do céu?", ["Azul", "Verde", "Roxo", "Preto"], 0), false],
  ["absoluta", mc("O que é seca?", ["Chuva", "Sempre molhado", "Nunca seco", "Falta de chuva"], 3), true],
  ["absoluta", mc("O que é seca?", ["Chuva", "Sempre molhado", "Sempre seco", "Sempre falta"], 3), false],
  ["eco", mc("Onde fica o Pampa gaúcho?", ["Pampa gaúcho no sul", "Norte", "Leste", "Oeste"], 0), true],
  ["eco", mc("Onde fica o Pampa gaúcho?", ["Pampa gaúcho no sul", "Pampa no norte", "Leste", "Oeste"], 0), false],
  ["anteriores", mc("Qual?", ["A", "B", "C", "Todas as anteriores"], 3), true],
  ["repetida", mc("Qual?", ["Azul", "azul ", "C", "D"], 2), true],
  ["negativa", mc("Qual NÃO é bioma?", ["a", "b", "c", "d"], 0), false],
  ["negativa", mc("Qual não é bioma?", ["a", "b", "c", "d"], 0), true],
];
const f = [];
casos.forEach(([t, q, deve], i) => { if (tipos(q).includes(t) !== deve) f.push("caso " + (i + 1) + " (" + t + "): " + (deve ? "deveria avisar" : "alarme falso")); });
const ficha = { teoria: [{ palavras: ["rios", "voadores"], ideia: "Rios sobre as árvores", por_que: "p" }] };
if (!tipos(mc("O que são rios voadores?", ["Vapor", "B", "C", "D"], 0), ficha).includes("sugestao")) f.push("ficha: deveria sugerir");
if (tipos(mc("O que são rios?", ["Vapor", "B", "C", "D"], 0), ficha).includes("sugestao")) f.push("ficha: com 1 palavra não deve sugerir");
if (!checarFicha({ teoria: [{ palavras: ["a"], ideia: "x" }] }, "t").length) f.push("checarFicha: deveria recusar");
console.log(f.length ? "FALHOU:\n- " + f.join("\n- ") : "OK");
process.exit(f.length ? 1 : 0);
