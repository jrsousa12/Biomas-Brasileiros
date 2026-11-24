// Motor 5: integra um arquivo novo no index.html, no sw.js (FILES) e, se preciso, no pages.yml.
// Uso: node tools/integrar.js <arquivo> [--antes <arquivo-existente>] [--teste]
//   .js entra como <script> antes de js/main.js (ou do --antes); .css como <link> após o último stylesheet.
//   Outros tipos (imagens, json) só entram no sw.js. Repetir o comando não duplica nada.
"use strict";
const fs = require("fs"), path = require("path");
const { ROOT, ler, limite } = require("./lib");

const args = process.argv.slice(2), teste = args.includes("--teste");
const iA = args.indexOf("--antes"), antes = iA >= 0 ? args[iA + 1] : "js/main.js";
const arq = args.find((a, i) => !a.startsWith("--") && (iA < 0 || i !== iA + 1));
if (!arq) { console.log("Uso: node tools/integrar.js <arquivo> [--antes js/main.js] [--teste]"); process.exit(1); }
const rel = path.relative(ROOT, path.resolve(arq)).split(path.sep).join("/");
if (!fs.existsSync(path.join(ROOT, rel))) { console.log("Arquivo não existe: " + rel); process.exit(1); }

const feito = [], nada = [];
let idx = ler("index.html"), sw = ler("sw.js"), yml = ler(".github/workflows/pages.yml");
const ext = path.extname(rel);

// index.html
if (ext === ".js" || ext === ".css") {
  const tag = ext === ".js" ? '<script src="' + rel + '"></script>' : '<link rel="stylesheet" href="' + rel + '">';
  if (idx.includes('"' + rel + '"')) nada.push("index.html já tinha");
  else if (ext === ".js") {
    const ref = '<script src="' + antes + '"></script>';
    if (!idx.includes(ref)) { console.log("Não achei no index.html: " + ref); process.exit(1); }
    idx = idx.replace(ref, tag + "\n" + ref);
    feito.push("index.html: <script> antes de " + antes);
  } else {
    const links = [...idx.matchAll(/<link rel="stylesheet"[^>]*>/g)], ult = links[links.length - 1];
    if (!ult) { console.log("Não achei <link rel=\"stylesheet\"> no index.html"); process.exit(1); }
    const p = ult.index + ult[0].length;
    idx = idx.slice(0, p) + "\n" + tag + idx.slice(p);
    feito.push("index.html: <link> de CSS");
  }
}

// sw.js (FILES)
const item = '"./' + rel + '"';
if (sw.includes(item)) nada.push("sw.js já tinha");
else {
  const refSw = '  "./' + antes + '",';
  if (ext === ".js" && sw.includes(refSw)) sw = sw.replace(refSw, "  " + item + ",\n" + refSw);
  else sw = sw.replace(/(const FILES = \[[\s\S]*?)(\n\];)/, (m, a, b) => a + ",\n  " + item + b);
  feito.push("sw.js: FILES");
}

// pages.yml: só publica index.html, manifest, sw.js e as pastas icons, css, js.
const topo = rel.split("/")[0], copia = /cp -r ([^\n]*?) _site\//.exec(yml), raiz = /cp (?!-r)([^\n]*?) _site\//.exec(yml);
const pastas = copia ? copia[1].split(/\s+/) : [], soltos = raiz ? raiz[1].split(/\s+/) : [];
if (rel.includes("/")) {
  if (!pastas.includes(topo)) { yml = yml.replace(copia[0], "cp -r " + pastas.concat(topo).join(" ") + " _site/"); feito.push("pages.yml: pasta " + topo); }
} else if (!soltos.includes(rel)) { yml = yml.replace(raiz[0], "cp " + soltos.concat(rel).join(" ") + " _site/"); feito.push("pages.yml: " + rel); }

if (!teste) {
  fs.writeFileSync(path.join(ROOT, "index.html"), idx);
  fs.writeFileSync(path.join(ROOT, "sw.js"), sw);
  fs.writeFileSync(path.join(ROOT, ".github/workflows/pages.yml"), yml);
}
console.log((teste ? "Simulação — faria: " : "Feito: ") + (feito.join("; ") || "nada novo") + (nada.length ? " (" + nada.join("; ") + ")" : ""));
const lim = limite(fs.readFileSync(path.join(ROOT, rel), "utf8"));
if (lim.passou) console.log("ATENÇÃO: " + rel + " passa do limite (" + lim.linhas + " linhas, " + lim.kb.toFixed(1) + " KB). Proponha divisão.");
if (ext === ".js") console.log("Lembre: tela nova com passos → tratar em voltarUmPasso() (js/voltar.js).");
