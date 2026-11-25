// Motor de teoria: confere perguntas (só avisos, nunca altera) e sugere erradas pelas fichas.
// Uso: node tools/teoria.js            → pente-fino do banco inteiro (resumo; detalhes em docs/teoria-relatorio.md)
//      node tools/teoria.js <arq.txt> [bioma]  → só as perguntas novas do arquivo, com avisos e sugestões
"use strict";
const fs = require("fs"), path = require("path");
const { ROOT, carregar, norm, acharBioma, extrairObjetos } = require("./lib");

const PEQ = new Set("que qual quais para com uma por dos das nos nas sao como mais seu sua foi ser tem sobre entre pelo pela uns umas esse essa isso ele ela eles elas nao sim bioma biomas brasil brasileiro".split(" "));
const ABS = /\b(sempre|nunca|apenas|somente|so|todos|todas|nenhum|nenhuma|jamais|totalmente)\b/;
const NEG = /\bqual\b.*\bnao\b|\bnao (e|sao|faz|fazem|pertence|ocorre|existe|aparece)\b|incorret|exceto/;
const palavras = (s) => norm(s).split(" ").filter((w) => w.length > 3 && !PEQ.has(w));

// A ficha é conferida antes de usar: formato errado vira erro, não alarme falso.
function checarFicha(f, nome) {
  const e = [];
  if (!f || !Array.isArray(f.teoria)) return [nome + ': falta a lista "teoria"'];
  f.teoria.forEach((x, i) => {
    if (!Array.isArray(x.palavras) || x.palavras.length < 2) e.push(nome + " item " + (i + 1) + ': "palavras" precisa de 2+ termos');
    if (typeof x.ideia !== "string" || !x.ideia.trim()) e.push(nome + " item " + (i + 1) + ': falta "ideia"');
    if (typeof x.por_que !== "string" || !x.por_que.trim()) e.push(nome + " item " + (i + 1) + ': falta "por_que"');
  });
  return e;
}

// Retorna [{tipo, msg}] de uma pergunta. `ficha` pode ser null.
function conferir(q, ficha) {
  const av = [], A = (tipo, msg) => av.push({ tipo, msg });
  if (NEG.test(norm(q.q)) && !/\b(NÃO|INCORRETA|INCORRETO|EXCETO)\b/.test(q.q)) A("negativa", "pergunta negativa sem destaque em MAIÚSCULAS");
  if (q.t !== "mc" || !Array.isArray(q.o) || q.o.length !== 4) return av;
  const certa = q.o[q.a], erradas = q.o.filter((_, i) => i !== q.a);
  const media = erradas.reduce((s, x) => s + x.length, 0) / 3;
  if (certa.length > 1.6 * media && certa.length - media > 15) A("longa", "certa bem mais longa que as erradas");
  if (ABS.test(norm(certa)) === false && erradas.filter((x) => ABS.test(norm(x))).length >= 2) A("absoluta", "palavra absoluta em 2+ erradas e não na certa");
  const pq = new Set(palavras(q.q)), eco = (x) => palavras(x).filter((w) => pq.has(w)).length;
  if (eco(certa) >= 2 && erradas.every((x) => eco(x) === 0)) A("eco", "só a certa repete palavras do enunciado");
  if (q.o.some((x) => /(todas|nenhuma) (as|das) (alternativas|anteriores|opcoes)|todas as anteriores/.test(norm(x)))) A("anteriores", '"todas/nenhuma das anteriores" com alternativas embaralhadas');
  if (new Set(q.o.map((x) => x.toLowerCase().replace(/\s+/g, " ").trim())).size < 4) A("repetida", "alternativas repetidas");
  const s = [];
  for (const it of (ficha && ficha.teoria) || []) {
    if (s.length >= 2) break;
    const n = norm(q.q + " " + certa);
    if (it.palavras.filter((p) => n.includes(norm(p))).length >= 2 && !q.o.some((x) => norm(x) === norm(it.ideia))) s.push(it);
  }
  s.forEach((it) => A("sugestao", 'sugestão de errada: "' + it.ideia + '" (' + it.por_que + ")"));
  return av;
}

function ficha(id) {
  const f = path.join(__dirname, "fichas", id + ".json");
  if (!fs.existsSync(f)) return null;
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  const e = checarFicha(j, id + ".json");
  if (e.length) { console.log("FICHA COM ERRO:\n- " + e.join("\n- ")); process.exit(1); }
  return j;
}

function principal() {
  const [arq, chave] = process.argv.slice(2), D = carregar();
  if (arq) {
    const b = chave ? acharBioma(D.biomas, chave) : null, f = b ? ficha(path.basename(b.arq, ".js")) : null;
    const itens = extrairObjetos(fs.readFileSync(path.resolve(arq), "utf8")).filter((x) => x.obj && "q" in x.obj);
    let n = 0;
    itens.forEach((x, i) => conferir(x.obj, f).forEach((a) => { n++; console.log("pergunta " + (i + 1) + " [" + a.tipo + "] " + a.msg); }));
    console.log(n ? n + " aviso(s) em " + itens.length + " pergunta(s)." : "OK: " + itens.length + " pergunta(s) sem avisos.");
    return;
  }
  const por = {}, linhas = [];
  let total = 0;
  D.biomas.forEach((b) => {
    const f = ficha(path.basename(b.arq, ".js"));
    b.dados.q.forEach((q, i) => conferir(q, f).forEach((a) => {
      (por[a.tipo] = por[a.tipo] || []).push(b.nome + " " + (i + 1)); total++;
      linhas.push("- **" + b.nome + " #" + (i + 1) + "** [" + a.tipo + "] " + a.msg + "\n  - " + q.q);
    }));
    total += 0;
  });
  fs.writeFileSync(path.join(ROOT, "docs/teoria-relatorio.md"), "# Relatório do motor de teoria\n\n" + (linhas.join("\n") || "Nenhum aviso.") + "\n");
  console.log(Object.keys(por).map((t) => t + ": " + por[t].length).join(" | ") || "Nenhum aviso.");
  console.log("Detalhes: docs/teoria-relatorio.md");
}

module.exports = { conferir, checarFicha };
if (require.main === module) principal();
