// Teste da revisão espaçada (P9). Uso: node tests/revisao.js → imprime OK ou as falhas.
const fs = require("fs"), vm = require("vm"), path = require("path");
const cod = fs.readFileSync(path.join(__dirname, "../js/revisao.js"), "utf8");
let dia = 0; // dias somados à data base
const RealDate = Date, base = new RealDate(2026, 10, 26, 12);
class FakeDate extends RealDate { constructor(...a) { super(...(a.length ? a : [base.getTime() + dia * 864e5])); } }
const ctx = { S: { wrong: ["x1"] }, QMAP: { x1: {}, x2: {} }, Date: FakeDate, Math };
vm.createContext(ctx); vm.runInContext(cod, ctx);
const falhas = [], ok = (c, m) => { if (!c) falhas.push(m); };
const run = s => vm.runInContext(s, ctx);

ok(run("revResumo()") === "1 para hoje", "erro antigo deveria ficar para hoje");
run("revErrou('x2')");
ok(run("revPendentes().join()") === "x1", "erro de hoje só volta amanhã");
ok(run("revResumo()") === "1 para hoje", "resumo com 1 pendente");
ok(run("revAcertou('x1')") === false && run("S.rev.x1.n") === 1, "1º acerto não tira da lista");
ok(run("revAcertou('x1')") === false && run("S.rev.x1.n") === 1, "2º acerto no mesmo dia não conta");
ok(run("revResumo()") === "próxima em 1 dia", "próxima amanhã (x2)");
dia = 1;
ok(run("revPendentes().join()") === "x2", "x2 volta no dia seguinte");
ok(run("revAcertou('x2')") === false, "x2 1º acerto");
dia = 3;
ok(run("revPendentes().join()") === "x1", "x1 volta 3 dias depois do 1º acerto");
ok(run("revAcertou('x1')") === true && run("S.wrong.join()") === "x2", "2º acerto tira da lista");
run("revErrou('x2')");
ok(run("S.rev.x2.n") === 0 && run("revPendentes().length") === 0, "errar de novo zera e volta amanhã");
run("S.wrong=[];S.rev={}");
ok(run("revResumo()") === "nenhum erro", "sem erros");

console.log(falhas.length ? "FALHAS:\n- " + falhas.join("\n- ") : "OK");
