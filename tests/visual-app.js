/* Teste de visual do app inteiro: abre cada tela em modo claro e escuro, em 3 larguras de celular,
   e procura as falhas de tests/visual.js (contraste, texto cortado, rolagem lateral, botão pequeno).
   Uso: node tests/visual-app.js [pasta-para-prints]   (prints só na largura 390) */
const { chromium } = require("playwright");
const path = require("path");
const { inspecionar, LARGURAS } = require("./visual.js");
const prints = process.argv[2];
const url = "file://" + path.resolve(__dirname, "../index.html");
const B = "BIOMES[0]";
const TELAS = [
  ["nome", ""],
  ["inicio", 'S.name="Ana";go("home")'],
  ["licao", 'startTrail("amz")'],
  ["quiz", `startQuiz({title:"🌳 Teste",list:${B}.q.slice(0,8),color:[${B}.c1,${B}.c2],mode:"trail",bid:${B}.id})`],
  ["quiz-erro", 'var i=Q.opts?Q.opts.findIndex(function(o){return !o.ok}):-1;if(i>=0)pickMC(i);else pickTF(0)'],
  ["estudar", 'startTrail("caa");go("estudar")'],
  ["cartas", 'go("cards")'], ["mitos", 'go("mitos")'], ["desafio", 'go("final")'],
  ["resultado", 'go("result")'], ["fontes", 'go("fontes")'], ["certificado", 'go("cert")'],
  ["medalhas", 'go("medalhas")'], ["glossario", 'go("glossario")'], ["relatorio", 'go("relatorio")'],
  ["pares", "startPares()"], ["qual-bioma", "startQualBioma()"]
];
(async () => {
  const nav = await chromium.launch();
  let total = 0;
  for (const tema of ["light", "dark"]) for (const w of LARGURAS) {
    const pg = await nav.newPage({ viewport: { width: w, height: 800 } });
    const erros = [];
    pg.on("pageerror", e => erros.push(e.message));
    await pg.addInitScript(t => { try { localStorage.setItem("biomas7_modo", t); } catch (e) {} }, tema);
    await pg.emulateMedia({ reducedMotion: "reduce" });
    await pg.goto(url);
    for (const [nome, js] of TELAS) {
      try { if (js) await pg.evaluate(js); } catch (e) { erros.push(nome + ": " + e.message.split("\n")[0]); continue; }
      const falhas = [...new Set(await pg.evaluate(inspecionar))];
      if (prints && w == 390) await pg.screenshot({ path: path.join(prints, tema + "-" + nome + ".png"), fullPage: true });
      for (const f of falhas) console.log("[" + (tema == "dark" ? "escuro" : "claro") + " " + w + "px " + nome + "] " + f);
      total += falhas.length;
    }
    for (const e of [...new Set(erros)]) { console.log("[erro de JS " + tema + " " + w + "px] " + e); total++; }
    await pg.close();
  }
  await nav.close();
  console.log(total ? total + " falha(s)" : "OK");
  process.exit(total ? 1 : 0);
})();
