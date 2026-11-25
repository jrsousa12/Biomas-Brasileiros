/* Teste de visual: procura falhas em modo claro e escuro, em 3 larguras de celular.
   Uso: node tests/visual.js <arquivo.html ou URL> [pasta-para-prints]
   Confere: rolagem para o lado, texto cortado/vazando, contraste fraco (regra WCAG AA),
   botões pequenos para o dedo (< 44 px). Imprime OK ou a lista de falhas. */
const { chromium } = require("playwright");
const path = require("path");
const LARGURAS = [320, 390, 560];

/* Roda dentro da página: devolve a lista de falhas encontradas. */
function inspecionar() {
  const falhas = [];
  const nome = el => (el.tagName.toLowerCase() + (el.className && typeof el.className == "string" ? "." + el.className.trim().split(/\s+/).join(".") : "")) +
    ' "' + (el.textContent || "").trim().slice(0, 30) + '"';
  const rgb = s => { const m = s.match(/[\d.]+/g) || [0, 0, 0, 0]; return { r: +m[0], g: +m[1], b: +m[2], a: m[3] == null ? 1 : +m[3] }; };
  const lum = c => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(c.r) + .7152 * f(c.g) + .0722 * f(c.b); };
  const mistura = (cima, baixo) => ({ r: cima.r * cima.a + baixo.r * (1 - cima.a), g: cima.g * cima.a + baixo.g * (1 - cima.a), b: cima.b * cima.a + baixo.b * (1 - cima.a), a: 1 });
  /* Fundos reais atrás do elemento: junta as camadas de cor dos ancestrais; num degradê, devolve cada cor dele. */
  function fundos(el) {
    const camadas = [];
    let grad = null;
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e), c = rgb(cs.backgroundColor);
      const g = /gradient/.test(cs.backgroundImage) && !/repeating|radial|transparent|rgba\(0, 0, 0, 0\)/.test(cs.backgroundImage) ? cs.backgroundImage.match(/rgba?\([^)]*\)/g) : null;
      if (g) { grad = g.map(rgb); break; }
      if (c.a > 0) { camadas.push(c); if (c.a >= 1) break; }
    }
    const bases = grad ? grad.map(c => mistura(c, { r: 255, g: 255, b: 255, a: 1 })) : [{ r: 255, g: 255, b: 255, a: 1 }];
    return bases.map(b => { let cor = b; for (let i = camadas.length - 1; i >= 0; i--) cor = mistura(camadas[i], cor); return cor; });
  }
  const W = innerWidth;
  if (document.documentElement.scrollWidth > W + 1) falhas.push("Página rola para o lado (" + document.documentElement.scrollWidth + " px > " + W + " px)");
  for (const el of document.querySelectorAll("body *")) {
    const st = getComputedStyle(el);
    if (st.display == "none" || st.visibility == "hidden") continue;
    const r = el.getBoundingClientRect();
    if (!r.width) continue;
    const temTexto = [...el.childNodes].some(n => n.nodeType == 3 && /[A-Za-zÀ-ú0-9]/.test(n.textContent));
    if (temTexto) {
      if (el.scrollWidth > el.clientWidth + 1 && st.overflowX != "visible") falhas.push("Texto cortado: " + nome(el));
      if (r.right > W + 1 || r.left < -1) falhas.push("Sai da tela: " + nome(el));
      const ct = Math.min(...fundos(el).map(bg => { const L1 = lum(mistura(rgb(st.color), bg)), L2 = lum(bg); return (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05); }));
      const px = parseFloat(st.fontSize), negrito = +st.fontWeight >= 700;
      const grande = px >= 24 || (negrito && px >= 18.66);
      const minimo = grande ? 3 : 4.5;
      if (ct < minimo) falhas.push("Contraste fraco " + ct.toFixed(2) + " (mín. " + minimo + "): " + nome(el));
    }
    if (/^(BUTTON|A)$/.test(el.tagName) && (r.height < 44 || r.width < 44)) falhas.push("Botão pequeno p/ o dedo (" + Math.round(r.width) + "x" + Math.round(r.height) + "): " + nome(el));
  }
  return falhas;
}

module.exports = { inspecionar, LARGURAS };
if (require.main === module) (async () => {
  const alvo = process.argv[2], prints = process.argv[3];
  if (!alvo) { console.log("Uso: node tests/visual.js <arquivo.html ou URL> [pasta-prints]"); process.exit(2); }
  const url = /^https?:/.test(alvo) ? alvo : "file://" + path.resolve(alvo);
  const navegador = await chromium.launch();
  let total = 0;
  for (const tema of ["light", "dark"]) {
    for (const w of LARGURAS) {
      const pg = await navegador.newPage({ viewport: { width: w, height: 800 }, colorScheme: tema });
      await pg.addInitScript(t => { try { localStorage.setItem("biomas7_modo", t); } catch (e) {} }, tema);
      await pg.emulateMedia({ reducedMotion: "reduce" });
      await pg.goto(url);
      const falhas = [...new Set(await pg.evaluate(inspecionar))];
      if (prints) await pg.screenshot({ path: path.join(prints, tema + "-" + w + ".png"), fullPage: true });
      for (const f of falhas) console.log("[" + (tema == "dark" ? "escuro" : "claro") + " " + w + "px] " + f);
      total += falhas.length;
      await pg.close();
    }
  }
  await navegador.close();
  console.log(total ? total + " falha(s)" : "OK");
  process.exit(total ? 1 : 0);
})();
