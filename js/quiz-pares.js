"use strict";

var PARES = null;

function montarPares() {
  var biomas = BIOMES.slice();
  var itens = [];
  var destinos = [];
  var i;
  var b;
  var especies;
  var sp;

  shuffle(biomas);
  biomas = biomas.slice(0, 4);

  for (i = 0; i < biomas.length; i++) {
    b = biomas[i];
    especies = b.sp.slice();
    shuffle(especies);
    sp = especies[0];

    itens.push({
      chave: "p" + i,
      bioma: b.id,
      nome: sp.n,
      emoji: sp.e,
      resolvido: false
    });

    destinos.push({
      id: b.id,
      nome: b.nome,
      emoji: b.emoji,
      resolvido: false
    });
  }

  shuffle(itens);
  shuffle(destinos);

  PARES = {
    itens: itens,
    destinos: destinos,
    selecionado: "",
    acertos: 0,
    erros: 0,
    finalizado: false
  };
}

function startPares() {
  montarPares();
  go("pares");
}

function itemPar(id) {
  var i;

  if (!PARES) {
    return null;
  }

  for (i = 0; i < PARES.itens.length; i++) {
    if (PARES.itens[i].chave === id) {
      return PARES.itens[i];
    }
  }

  return null;
}

function destinoPar(id) {
  var i;

  if (!PARES) {
    return null;
  }

  for (i = 0; i < PARES.destinos.length; i++) {
    if (PARES.destinos[i].id === id) {
      return PARES.destinos[i];
    }
  }

  return null;
}

function selecionarItemPar(id) {
  var item = itemPar(id);

  if (!item || item.resolvido || PARES.finalizado) {
    return;
  }

  PARES.selecionado = id;
  atualizarPares();
}

function piscarErroPares(itemId, biomaId) {
  var itemEl = document.getElementById("pares-item-" + itemId);
  var bioEl = document.getElementById("pares-bio-" + biomaId);

  if (itemEl) {
    itemEl.style.background = "var(--bad)";
    itemEl.style.color = "#fff";
  }

  if (bioEl) {
    bioEl.style.background = "var(--bad)";
    bioEl.style.color = "#fff";
  }

  window.setTimeout(function () {
    PARES.selecionado = "";
    atualizarPares();
  }, 450);
}

function escolherBiomaPar(id) {
  var item;
  var destino;

  if (!PARES || !PARES.selecionado || PARES.finalizado) {
    avisoRapido("Escolha primeiro uma espécie.");
    return;
  }

  item = itemPar(PARES.selecionado);
  destino = destinoPar(id);

  if (!item || !destino || item.resolvido || destino.resolvido) {
    return;
  }

  if (item.bioma === id) {
    item.resolvido = true;
    destino.resolvido = true;
    PARES.selecionado = "";
    PARES.acertos++;
    atualizarPares();

    if (PARES.acertos === PARES.itens.length) {
      finalizarPares();
    }
  } else {
    PARES.erros++;
    piscarErroPares(item.chave, id);
  }
}

function finalizarPares() {
  var pontos;

  if (PARES.finalizado) {
    return;
  }

  PARES.finalizado = true;
  pontos = PARES.acertos * 5;
  addXP(pontos);
  save();
  atualizarPares();
  avisoRapido("Você ganhou " + pontos + " XP!");
}

function itensParesHTML() {
  var html = "";
  var item;
  var selecionado;
  var estilo;
  var i;

  for (i = 0; i < PARES.itens.length; i++) {
    item = PARES.itens[i];
    selecionado = PARES.selecionado === item.chave;
    estilo = "";

    if (item.resolvido) {
      estilo = "background:var(--ok);color:var(--lfg);";
    } else if (selecionado) {
      estilo = "outline:3px solid var(--gold);";
    }

    html += '<button id="pares-item-' + esc(item.chave) + '" ';
    html += 'class="btn sec" style="min-height:54px;' + estilo + '" ';
    html += 'onclick="selecionarItemPar(\'' + esc(item.chave) + '\')"';
    html += item.resolvido ? " disabled" : "";
    html += ">" + esc(item.emoji) + " " + esc(item.nome) + "</button>";
  }

  return html;
}

function destinosParesHTML() {
  var html = "";
  var destino;
  var estilo;
  var i;

  for (i = 0; i < PARES.destinos.length; i++) {
    destino = PARES.destinos[i];
    estilo = destino.resolvido ?
      "background:var(--ok);color:var(--lfg);" : "";

    html += '<button id="pares-bio-' + esc(destino.id) + '" ';
    html += 'class="btn" style="min-height:54px;' + estilo + '" ';
    html += 'onclick="escolherBiomaPar(\'' + esc(destino.id) + '\')"';
    html += destino.resolvido ? " disabled" : "";
    html += ">" + esc(destino.emoji) + " " + esc(destino.nome) + "</button>";
  }

  return html;
}

function resultadoParesHTML() {
  if (!PARES.finalizado) {
    return '<p class="small">Acertos: ' + esc(PARES.acertos) +
      " de " + esc(PARES.itens.length) + "</p>";
  }

  return '<div class="card">' +
    "<strong>Atividade concluída!</strong>" +
    '<p class="small">Acertos: ' + esc(PARES.acertos) +
    " de " + esc(PARES.itens.length) + ".</p>" +
    '<p class="small">Tentativas erradas: ' + esc(PARES.erros) + ".</p>" +
    '<p class="small">Você ganhou ' +
    esc(PARES.acertos * 5) + " XP.</p>" +
    '<button class="btn" style="min-height:44px" ' +
    'onclick="startPares()">Jogar de novo</button>' +
    "</div>";
}

function atualizarPares() {
  var itens = document.getElementById("pares-itens");
  var destinos = document.getElementById("pares-destinos");
  var resultado = document.getElementById("pares-resultado");

  if (itens) {
    itens.innerHTML = itensParesHTML();
  }
  if (destinos) {
    destinos.innerHTML = destinosParesHTML();
  }
  if (resultado) {
    resultado.innerHTML = resultadoParesHTML();
  }
}

function vPares() {
  var html;

  if (!PARES) {
    montarPares();
  }

  html = headerHTML(
    "Ligue os pares",
    "Escolha uma espécie e depois toque no bioma certo."
  );

  html += "<main>";
  html += '<div class="card">';
  html += "<strong>1. Escolha uma espécie</strong>";
  html += '<div id="pares-itens" class="tiles">';
  html += itensParesHTML();
  html += "</div></div>";
  html += '<div class="card">';
  html += "<strong>2. Escolha o bioma</strong>";
  html += '<div id="pares-destinos" class="tiles">';
  html += destinosParesHTML();
  html += "</div></div>";
  html += '<div id="pares-resultado">';
  html += resultadoParesHTML();
  html += "</div>";
  html += '<button class="btn sec" style="min-height:44px" ';
  html += 'onclick="go(\'home\')">Voltar</button>';
  html += "</main>";

  return html;
}
