// Motor 1+2: importa conteúdo revisado (perguntas, espécies, mitos) no FIM das listas.
// Uso: node tools/importar.js <arquivo.txt> [bioma] [--teste]
//   bioma: id, nome ou arquivo (pam, Pampa, mata-atlantica). Obrigatório se houver perguntas/espécies.
//   --teste: só mostra o que faria, sem gravar. Com qualquer ERRO, nada é gravado.
"use strict";
const fs = require("fs"), path = require("path");
const { modeloExtra, ROOT, ARQ_MITOS, carregar, acharBioma, extrairObjetos, serializar, inserirNoFim, limite } = require("./lib");
const { tipoDe, validar, repeticao } = require("./validar");

const args = process.argv.slice(2), teste = args.includes("--teste");
const [arq, chaveBioma] = args.filter((a) => a !== "--teste");
if (!arq) { console.log("Uso: node tools/importar.js <arquivo.txt> [bioma] [--teste]"); process.exit(1); }

const D = carregar();
const lidos = extrairObjetos(fs.readFileSync(path.resolve(arq), "utf8"));
const erros = [], avisos = [], novos = { q: [], sp: [], mito: [] };
const curto = (s) => { s = String(s || ""); return s.length > 50 ? s.slice(0, 50) + "…" : s; };

const bioma = chaveBioma ? acharBioma(D.biomas, chaveBioma) : null;
if (chaveBioma && !bioma) erros.push('bioma não encontrado: "' + chaveBioma + '" (use: ' + D.biomas.map((b) => b.id).join(", ") + ")");

lidos.forEach((l, i) => {
  const n = "item " + (i + 1);
  if (l.erro) return erros.push(n + ": " + l.erro);
  const tipo = tipoDe(l.obj), o = l.obj;
  const r = validar(o, tipo), rot = n + (tipo ? " (" + (tipo === "q" ? o.t : tipo) + ') "' + curto(o.q || o.n || o.s) + '"' : "");
  r.erros.forEach((m) => erros.push(rot + ": " + m));
  r.avisos.forEach((m) => avisos.push(rot + ": " + m));
  if (!tipo) return;
  if (tipo !== "mito" && !chaveBioma) return erros.push(rot + ": informe o bioma (ex.: node tools/importar.js entrada.txt pampa)");
  const base = tipo === "mito" ? D.mitos : bioma ? bioma.dados[tipo] : [];
  const rep = repeticao(o, base.concat(novos[tipo]), tipo);
  if (rep && rep.igual) erros.push(rot + ": já existe igual");
  else if (rep) avisos.push(rot + ": parecido (" + Math.round(rep.pct * 100) + '%) com "' + curto(rep.parecido) + '"');
  novos[tipo].push(o);
});

const total = novos.q.length + novos.sp.length + novos.mito.length;
if (!total && !erros.length) erros.push("nenhum item {…} encontrado no arquivo");

const resumo = [];
if (bioma && (novos.q.length || novos.sp.length)) resumo.push(bioma.nome + ": +" + novos.q.length + " perguntas, +" + novos.sp.length + " espécies");
if (novos.mito.length) resumo.push("Mitos: +" + novos.mito.length);
console.log((erros.length ? "Lido — " : "") + (resumo.join(" | ") || "Nada a importar."));
if (avisos.length) console.log("Avisos (revise, mas não impedem):\n- " + avisos.join("\n- "));
if (erros.length) { console.log("ERROS (nada foi gravado):\n- " + erros.join("\n- ")); process.exit(1); }

function gravar(arqDestino, listas) {
  let t = fs.readFileSync(arqDestino, "utf8");
  for (const [re, itens, tipo] of listas)
    if (itens.length) t = inserirNoFim(t, re, itens.map((o) => serializar(o, tipo === "q" ? o.t : tipo)));
  const lim = limite(t), rel = path.relative(ROOT, arqDestino);
  if (lim.passou) console.log("ATENÇÃO: " + rel + " passa do limite (" + lim.linhas + " linhas, " + lim.kb.toFixed(1) + " KB). Proponha divisão.");
  if (!teste) fs.writeFileSync(arqDestino, t);
}
if (bioma && (novos.q.length || novos.sp.length)) {
  // Destino: principal → "-extra" → "-extra2": vai para o primeiro que ainda couber no limite de tamanho (o arquivo novo nasce na hora).
  const RQ = /\bq\.push\.apply\(b\.q,\[/, RS = /\bsp\.push\.apply\(b\.sp,\[/;
  const extra2 = bioma.extra.replace(/-extra\.js$/, "-extra2.js");
  const passa = (f, re1, re2) => { let s = fs.readFileSync(f, "utf8");
    [[re1, novos.q, "q"], [re2, novos.sp, "sp"]].forEach(([re, it, tp]) => { if (it.length) s = inserirNoFim(s, re, it.map((o) => serializar(o, tp === "q" ? o.t : tp))); });
    return limite(s).passou; };
  const dest = fs.existsSync(extra2) ? extra2
    : fs.existsSync(bioma.extra) ? (passa(bioma.extra, RQ, RS) ? extra2 : bioma.extra)
    : passa(bioma.arq, /\bq:\[/, /\bsp:\[/) ? bioma.extra : bioma.arq;
  if (dest === bioma.arq) gravar(dest, [[/\bq:\[/, novos.q, "q"], [/\bsp:\[/, novos.sp, "sp"]]);
  else {
    if (!fs.existsSync(dest)) {
      if (!teste) fs.writeFileSync(dest, modeloExtra(bioma.id));
      const rel = path.relative(ROOT, dest);
      console.log("Novo arquivo " + rel + " — rode: node tools/integrar.js " + rel + " --antes js/dados/mitos-fontes.js");
    }
    if (fs.existsSync(dest)) gravar(dest, [[RQ, novos.q, "q"], [RS, novos.sp, "sp"]]);
    else console.log("(simulação) iria para o arquivo " + path.basename(dest) + " de " + bioma.nome);
  }
}
if (novos.mito.length) gravar(ARQ_MITOS, [[/var MITOS=\[/, novos.mito, "mito"]]);

if (teste) console.log("Simulação: nada gravado (tire --teste para gravar).");
else {
  const d = carregar(), b = bioma && acharBioma(d.biomas, bioma.id);
  console.log("Gravado." + (b ? " " + b.nome + " agora: " + b.dados.q.length + " perguntas, " + b.dados.sp.length + " espécies." : "") +
    (novos.mito.length ? " Mitos: " + d.mitos.length + "." : ""));
}
