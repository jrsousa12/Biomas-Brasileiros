// Base dos motores: carregar dados, achar listas no texto, gravar itens no mesmo estilo.
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");

const ROOT = path.join(__dirname, "..");
const DIR_BIOMAS = path.join(ROOT, "js/dados/biomas");
const ARQ_MITOS = path.join(ROOT, "js/dados/mitos-fontes.js");
const ler = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");

// Ordem das chaves ao gravar (igual aos prompts de conteúdo).
const ORDEM = { mc: ["t", "q", "o", "a", "e"], tf: ["t", "q", "a", "e"], order: ["t", "q", "items", "e"],
  sp: ["n", "e", "st", "f"], mito: ["s", "v", "e"] };

// Carrega cada arquivo de bioma e o mito/fontes. Retorna {biomas:[{id,nome,arq,dados}], mitos, fontes}.
function carregar() {
  const ordem = [...ler("index.html").matchAll(/src="js\/dados\/biomas\/([^"]+)"/g)].map((m) => m[1]);
  const biomas = ordem.map((f) => {
    const ctx = {};
    vm.runInNewContext(fs.readFileSync(path.join(DIR_BIOMAS, f), "utf8"), ctx);
    const b = ctx.BIOMES[0];
    return { id: b.id, nome: b.nome, arq: path.join(DIR_BIOMAS, f), dados: b };
  });
  const ctx = {};
  vm.runInNewContext(fs.readFileSync(ARQ_MITOS, "utf8"), ctx);
  return { biomas, mitos: ctx.MITOS, fontes: ctx.FONTES };
}

// Normaliza texto para comparar: minúsculas, sem acento, só letras/números.
const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9]+/g, " ").trim();

// Acha bioma por id, nome ou nome do arquivo ("pam", "Pampa", "pampa", "mata atlantica").
function acharBioma(biomas, chave) {
  const k = norm(chave).replace(/ /g, "");
  return biomas.find((b) => [b.id, b.nome, path.basename(b.arq, ".js")].some((x) => norm(x).replace(/ /g, "") === k));
}

// A partir de um índice, avança até fechar o par de [ ] ou { }, ignorando o que está dentro de strings.
function fechar(txt, i) {
  const abre = txt[i], fecha = abre === "[" ? "]" : "}";
  let nivel = 0, str = null;
  for (; i < txt.length; i++) {
    const c = txt[i];
    if (str) { if (c === "\\") i++; else if (c === str) str = null; continue; }
    if (c === '"' || c === "'" || c === "`") str = c;
    else if (c === abre) nivel++;
    else if (c === fecha && --nivel === 0) return i;
  }
  return -1;
}

// Extrai objetos {...} de um texto qualquer (ignora títulos, cercas ``` e comentários soltos).
function extrairObjetos(txt) {
  const out = [];
  for (let i = 0; i < txt.length; i++) {
    if (txt[i] !== "{") continue;
    const f = fechar(txt, i);
    if (f < 0) { out.push({ erro: "chave { sem fechar perto de: " + txt.slice(i, i + 40) }); break; }
    const fonte = txt.slice(i, f + 1);
    try { out.push({ obj: vm.runInNewContext("(" + fonte + ")", {}, { timeout: 200 }), fonte }); }
    catch (e) { out.push({ erro: "não consegui ler: " + fonte.slice(0, 60) + "…" }); }
    i = f;
  }
  return out;
}

// Grava um item no estilo compacto do projeto: {t:"mc",q:"...",o:["..."],a:2,e:"..."}
function serializar(obj, tipo) {
  const chaves = (ORDEM[tipo] || []).filter((k) => k in obj).concat(Object.keys(obj).filter((k) => !(ORDEM[tipo] || []).includes(k)));
  const val = (v) => Array.isArray(v) ? "[" + v.map((x) => JSON.stringify(x)).join(",") + "]" : JSON.stringify(v);
  return "{" + chaves.map((k) => k + ":" + val(obj[k])).join(",") + "}";
}

// Insere itens no FIM da lista que começa em `re` (ex.: /\bq:\[/), mantendo o recuo dos itens.
function inserirNoFim(txt, re, linhas) {
  const m = re.exec(txt);
  if (!m) throw new Error("lista não encontrada: " + re);
  const ini = m.index + m[0].lastIndexOf("["), fim = fechar(txt, ini);
  const rec = (/\n( *)\S/.exec(txt.slice(ini, fim)) || [, " "])[1];
  let k = fim - 1;
  while (/\s/.test(txt[k])) k--;
  const vazio = k === ini;
  return txt.slice(0, k + 1) + (vazio ? "" : ",") + "\n" + rec + linhas.join(",\n" + rec) + txt.slice(k + 1);
}

// Tamanho do arquivo frente ao limite do CLAUDE.md (300 linhas / 10 KB).
function limite(txt) {
  const linhas = txt.split("\n").length, kb = Buffer.byteLength(txt) / 1024;
  return { linhas, kb, passou: linhas > 300 || kb > 10 };
}

module.exports = { ROOT, ARQ_MITOS, ler, carregar, norm, acharBioma, fechar, extrairObjetos, serializar, inserirNoFim, limite };
