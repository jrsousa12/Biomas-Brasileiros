// Teste rápido do app: telas, erros, instalação (PWA) e modo offline.
// Uso: node tests/smoke.js   (requer Playwright com Chromium)
// Saída: "OK" ou a lista de falhas (código de saída 1).
const http = require("http"), fs = require("fs"), path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..");
const TYPES = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css",
  ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml" };

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(0, r));
  const url = "http://localhost:" + server.address().port + "/";
  const fails = [], check = (ok, msg) => { if (!ok) fails.push(msg); };
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  page.setDefaultTimeout(10000);
  setTimeout(() => { console.log("FALHOU:\n- tempo esgotado (60 s)"); process.exit(1); }, 60000).unref();
  page.on("pageerror", (e) => fails.push("erro JS: " + e.message));
  page.on("console", (m) => m.type() === "error" && fails.push("console: " + m.text()));
  page.on("response", (r) => r.status() >= 400 && fails.push("HTTP " + r.status() + ": " + r.url()));

  try {
    await page.goto(url);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    check(await page.locator("#nm").count() === 1, "tela de nome não apareceu");
    await page.fill("#nm", "Teste");
    await page.evaluate(() => saveName());

    const n = await page.evaluate(() => BIOMES.length);
    check(n === 6, "esperava 6 biomas, veio " + n);

    const telas = ["home", "cards", "mitos", "final", "result", "fontes"];
    for (const v of telas) {
      await page.evaluate((v) => go(v), v);
      check((await page.locator("#app").innerText()).length > 100, "tela vazia: " + v);
    }
    const ids = await page.evaluate(() => BIOMES.map((b) => b.id));
    for (const id of ids) {
      await page.evaluate((id) => { go("home"); startTrail(id); }, id);
      check((await page.locator("#app").innerText()).length > 50, "lição vazia: " + id);
    }
    await page.evaluate(() => startFinal());
    check(/Questão 1/.test(await page.locator("#app").innerText()), "desafio final não iniciou");

    const salvo = await page.evaluate(() => JSON.parse(localStorage.getItem("biomas7_v1")));
    check(salvo && salvo.name === "Teste", "progresso não foi salvo em biomas7_v1");

    const swOk = await page.evaluate(() => Promise.race([
      navigator.serviceWorker.ready.then(() => true),
      new Promise((r) => setTimeout(() => r(false), 10000)),
    ]));
    if (!swOk) throw new Error("service worker não instalou (arquivo do sw.js faltando?)");
    const cdp = await ctx.newCDPSession(page);
    const inst = (await cdp.send("Page.getInstallabilityErrors")).installabilityErrors;
    check(inst.length === 0, "não instalável: " + JSON.stringify(inst));

    await page.reload();
    await ctx.setOffline(true);
    await page.reload();
    check(/Olá, Teste/.test(await page.locator("#app").innerText()), "não abriu offline");
    await page.evaluate(() => go("cards"));
    check((await page.locator("#app").innerText()).length > 100, "cartas offline vazias");
  } catch (e) {
    fails.push("falha inesperada: " + e.message);
  }

  await browser.close();
  server.close();
  console.log(fails.length ? "FALHOU:\n- " + fails.join("\n- ") : "OK");
  process.exit(fails.length ? 1 : 0);
})();
