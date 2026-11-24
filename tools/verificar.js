// Motor 6: verificação rápida do projeto (sem navegador). Também roda dentro de tests/smoke.js.
// Uso: node tools/verificar.js   → "OK" ou a lista de falhas.
"use strict";
const fs = require("fs"), path = require("path");
const { ROOT, ler, carregar, limite } = require("./lib");
const { validar, repeticao } = require("./validar");

function listar(dir) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? listar(dir + "/" + e.name) : [dir + "/" + e.name]);
}

function verificar() {
  const f = [];
  // 1. Tamanho dos arquivos
  for (const a of ["index.html", "sw.js", ...listar("css"), ...listar("js"), ...listar("tools"), ...listar("tests")]) {
    const l = limite(ler(a));
    if (l.passou) f.push("acima do limite: " + a + " (" + l.linhas + " linhas, " + l.kb.toFixed(1) + " KB)");
  }
  // 2. index.html × sw.js × disco × pages.yml
  const idx = ler("index.html"), sw = ler("sw.js"), yml = ler(".github/workflows/pages.yml");
  const files = [...(/const FILES = \[([\s\S]*?)\];/.exec(sw) || [, ""])[1].matchAll(/"\.\/([^"]*)"/g)].map((m) => m[1]).filter(Boolean);
  const refs = [...idx.matchAll(/(?:src|href)="([^"#:]+)"/g)].map((m) => m[1]);
  refs.forEach((r) => !files.includes(r) && f.push("no index.html mas falta no FILES do sw.js: " + r));
  files.forEach((r) => !fs.existsSync(path.join(ROOT, r)) && f.push("no sw.js mas não existe: " + r));
  listar("js").forEach((a) => {
    if (!files.includes(a)) f.push("arquivo fora do FILES do sw.js: " + a);
    if (!refs.includes(a)) f.push("arquivo sem <script> no index.html: " + a);
  });
  const pastas = ((/cp -r ([^\n]*?) _site\//.exec(yml) || [, ""])[1]).split(/\s+/);
  const soltos = ((/cp (?!-r)([^\n]*?) _site\//.exec(yml) || [, ""])[1]).split(/\s+/);
  files.forEach((r) => !(r.includes("/") ? pastas.includes(r.split("/")[0]) : soltos.includes(r)) && f.push("não é publicado pelo pages.yml: " + r));
  // 3. confirm()/alert() proibidos
  listar("js").forEach((a) => /(^|[^.\w])(confirm|alert)\s*\(/m.test(ler(a)) && f.push("usa confirm()/alert() (use dialogo): " + a));
  // 4. Dados: formato e repetição
  let D;
  try { D = carregar(); } catch (e) { return f.concat("erro ao carregar dados: " + e.message); }
  const conferir = (lista, tipo, onde) => lista.forEach((o, i) => {
    const rot = onde + " " + (tipo === "q" ? "pergunta" : tipo === "sp" ? "espécie" : "mito") + " " + (i + 1);
    validar(o, tipo).erros.forEach((m) => f.push(rot + ": " + m));
    const r = repeticao(o, lista.slice(0, i), tipo);
    if (r && r.igual) f.push(rot + ": repetida");
  });
  D.biomas.forEach((b) => { conferir(b.dados.q, "q", b.nome); conferir(b.dados.sp, "sp", b.nome); });
  conferir(D.mitos, "mito", "Mitos:");
  return f;
}

module.exports = verificar;
if (require.main === module) {
  const f = verificar();
  console.log(f.length ? "FALHOU:\n- " + f.join("\n- ") : "OK");
  process.exit(f.length ? 1 : 0);
}
