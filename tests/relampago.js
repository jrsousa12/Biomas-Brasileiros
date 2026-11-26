// Teste do desafio relâmpago (P12). Uso: node tests/relampago.js → imprime OK ou as falhas.
const fs = require("fs"), vm = require("vm"), path = require("path");
const cod = fs.readFileSync(path.join(__dirname, "../js/telas/relampago.js"), "utf8");
const qs = [{ t: "mc", q: "a", o: ["x", "y", "z", "w"], a: 1 }, { t: "tf", q: "b", a: true }, { t: "order", q: "c", items: [] }];
let tm = []; // temporizadores falsos
const ctx = { S: { xp: 0, wrong: ["w1"] }, BIOMES: [{ q: qs }], view: "relampago", shuffle: l => l, esc: s => s,
  headerHTML: () => "", render() {}, save() {}, go() {}, addXP(n) { ctx.S.xp += n; },
  setInterval: f => { tm.push(f); return tm.length; }, clearInterval() {}, setTimeout: f => f() };
vm.createContext(ctx); vm.runInContext(cod, ctx);
const falhas = [], ok = (c, m) => { if (!c) falhas.push(m); }, run = s => vm.runInContext(s, ctx);

run("relampagoIniciar()");
ok(run("RL.fila.length") === 2, "banco só com mc e tf");
run("relampagoResponder(1)"); run("relampagoResponder(false)"); // acerta, erra
ok(run("RL.acertos") === 1 && run("RL.erros") === 1, "contagem de acertos/erros");
for (let i = 0; i < 60; i++) tm[0]();
ok(run("RL.fase") === "fim", "termina em 60 s");
ok(ctx.S.xp === 1 && ctx.S.relampago.best === 1 && run("RL.novo") === true, "XP e recorde");
ok(ctx.S.wrong.join() === "w1" && !ctx.S.got && !ctx.S.rev, "não mexe em wrong/got/rev");
run("relampagoIniciar()"); ok(run("relampagoParar()") === true && run("RL.fase") === "inicio", "parar durante o jogo");
ok(run("relampagoParar()") === false, "parar fora do jogo");
console.log(falhas.length ? "FALHAS:\n" + falhas.join("\n") : "OK");
