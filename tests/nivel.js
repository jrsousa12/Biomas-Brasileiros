// Teste dos níveis (P14). Uso: node tests/nivel.js → imprime OK ou as falhas.
const fs = require("fs"), vm = require("vm"), path = require("path");
const ler = f => fs.readFileSync(path.join(__dirname, "..", f), "utf8");
const ctx = { console, window: {}, localStorage: { getItem() { return null; }, setItem() {} } };
vm.createContext(ctx);
const idx = ler("index.html");
[...idx.matchAll(/src="(js\/dados\/biomas\/[^"]+)"/g)].forEach(m => vm.runInContext(ler(m[1]), ctx));
["js/estado.js", "js/dados/niveis.js", "js/nivel.js"].forEach(f => vm.runInContext(ler(f), ctx));
vm.runInContext("save=function(){};render=function(){};", ctx);
const falhas = [], ok = (c, m) => { if (!c) falhas.push(m); }, run = s => vm.runInContext(s, ctx);

// marcação: uma letra válida por pergunta, em todos os biomas
run("BIOMES").forEach(b => {
  const v = (run("NIVEL_Q")[b.id] || "").split(",");
  ok(v.length === b.q.length, b.id + ": " + v.length + " marcas para " + b.q.length + " perguntas");
  ok(v.every(x => /^[fmd]$/.test(x)), b.id + ": marca inválida");
  ["f", "m", "d"].forEach(n => ok(v.filter(x => x === n).length >= 8, b.id + ": menos de 8 perguntas nível " + n));
});
ok(run("nivelAtual()") === "t", "sem escolha = Todos");
run("BIOMES").forEach(b => {
  ["f", "m", "d"].forEach(n => {
    run("nivelDefinir('" + n + "')");
    const l = run("nivelFiltrar(shuffle(bio('" + b.id + "').q.slice()),8)");
    ok(l.length === 8 && l.every(q => run("nivelDe")(q) === n), b.id + ": partida " + n + " não veio com 8 do nível");
  });
});
run("nivelDefinir('t')");
ok(run("nivelFiltrar(bio('amz').q.slice(),8).length") === 8, "Todos deve dar 8");
console.log(falhas.length ? "FALHAS:\n- " + falhas.join("\n- ") : "OK");
