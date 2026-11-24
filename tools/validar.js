// Regras de formato (prompts A, B, C) e detecção de repetição.
"use strict";
const { norm } = require("./lib");

const STATUS = ["", "Vulnerável", "Em perigo", "Criticamente em perigo"];
const txt = (v) => typeof v === "string" && v.trim() !== "";
const frases = (s) => (String(s).match(/[.!?](\s|$)/g) || []).length;
const palavras = (s) => String(s).trim().split(/\s+/).length;

function tipoDe(o) {
  if (o && "t" in o) return "q";
  if (o && "n" in o) return "sp";
  if (o && "s" in o) return "mito";
  return null;
}

// Retorna {erros:[], avisos:[]} de um item. `tipo`: "q", "sp" ou "mito".
function validar(o, tipo) {
  const erros = [], avisos = [], E = (m) => erros.push(m), A = (m) => avisos.push(m);
  if (tipo === "q") {
    if (!["mc", "tf", "order"].includes(o.t)) E('tipo "t" inválido: ' + o.t);
    if (!txt(o.q)) E('falta a pergunta "q"');
    if (!txt(o.e)) E('falta a explicação "e"'); else if (frases(o.e) > 2) A('"e" com mais de 2 frases');
    if (o.t === "mc") {
      if (!Array.isArray(o.o) || o.o.length !== 4 || !o.o.every(txt)) E('"o" precisa de exatamente 4 opções com texto');
      else if (new Set(o.o.map(norm)).size !== 4) E("opções repetidas");
      if (!Number.isInteger(o.a) || o.a < 0 || o.a > 3) E('"a" precisa ser 0, 1, 2 ou 3');
      else if (Array.isArray(o.o) && o.o.length === 4) {
        const outras = o.o.filter((_, i) => i !== o.a).reduce((s, x) => s + x.length, 0) / 3;
        if (o.o[o.a].length > 2 * outras + 10) A("opção certa bem mais longa que as erradas (dá dica)");
      }
    }
    if (o.t === "tf") {
      if (typeof o.a !== "boolean") E('"a" precisa ser true ou false');
      else {
        const certo = o.a ? "Verdadeiro." : "Falso.", oposto = o.a ? "Falso." : "Verdadeiro.";
        if (String(o.e).startsWith(oposto)) E('"e" começa com "' + oposto + '" mas a resposta é ' + o.a);
        else if (!String(o.e).startsWith(certo)) A('"e" deveria começar com "' + certo + '"');
      }
      if (!/^verdadeiro ou falso/i.test(o.q || "")) A('"q" deveria começar com "Verdadeiro ou falso:"');
    }
    if (o.t === "order") {
      if (!Array.isArray(o.items) || o.items.length < 3 || !o.items.every(txt)) E('"items" precisa de 3+ itens com texto');
      else {
        if (new Set(o.items.map(norm)).size !== o.items.length) E("itens repetidos");
        if (o.items.length !== 4) A("o padrão é 4 itens");
      }
    }
  } else if (tipo === "sp") {
    if (!txt(o.n)) E('falta o nome "n"');
    if (!txt(o.e)) E('falta o emoji "e"');
    if (typeof o.st !== "string") E('"st" precisa ser texto ("" se não ameaçada)');
    else if (!STATUS.includes(o.st)) A('"st" fora da lista: ' + o.st);
    if (!txt(o.f)) E('falta a curiosidade "f"'); else if (palavras(o.f) > 15) A('"f" com mais de 15 palavras');
  } else if (tipo === "mito") {
    if (!txt(o.s)) E('falta a afirmação "s"');
    if (typeof o.v !== "boolean") E('"v" precisa ser true ou false');
    if (!txt(o.e)) E('falta a explicação "e"');
    else if (typeof o.v === "boolean") {
      const certo = o.v ? "Verdade." : "Mito.", oposto = o.v ? "Mito." : "Verdade.";
      if (o.e.startsWith(oposto)) E('"e" começa com "' + oposto + '" mas "v" é ' + o.v);
      else if (!o.e.startsWith(certo)) A('"e" deveria começar com "' + certo + '"');
    }
  } else E("item não reconhecido (esperava pergunta, espécie ou mito)");
  return { erros, avisos };
}

// Texto usado para comparar itens do mesmo tipo.
const chave = (o, tipo) => norm(tipo === "q" ? String(o.q).replace(/^verdadeiro ou falso:?/i, "") : tipo === "sp" ? o.n : o.s);
const PEQ = new Set(["que", "qual", "para", "com", "uma", "por", "dos", "das", "nos", "nas", "sao", "como", "mais", "seu", "sua"]);
const conj = (s) => new Set(s.split(" ").filter((w) => w.length > 2 && !PEQ.has(w)));
function parecido(a, b) {
  const A = conj(a), B = conj(b);
  if (!A.size || !B.size) return 0;
  let c = 0;
  A.forEach((w) => B.has(w) && c++);
  return c / (A.size + B.size - c);
}

// Compara `novo` com a lista `base`. Retorna {igual:texto} ou {parecido:texto, pct} ou null.
function repeticao(novo, base, tipo) {
  const k = chave(novo, tipo);
  let melhor = null;
  for (const b of base) {
    const kb = chave(b, tipo);
    if (kb === k) return { igual: tipo === "q" ? b.q : tipo === "sp" ? b.n : b.s };
    const p = parecido(k, kb);
    if (p >= 0.55 && (!melhor || p > melhor.pct)) melhor = { parecido: tipo === "q" ? b.q : tipo === "sp" ? b.n : b.s, pct: p };
  }
  return melhor;
}

module.exports = { tipoDe, validar, repeticao };
