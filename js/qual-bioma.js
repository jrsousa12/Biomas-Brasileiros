"use strict";

var QUAL_BIOMA = null;

function pistasDoBioma(b) {
  var especies = b.sp ? b.sp.slice() : [];
  var cards = b.cards ? b.cards.slice() : [];
  var especie = especies.length ? especies[
    Math.floor(Math.random() * especies.length)
  ] : null;
  var card = cards.length ? cards[
    Math.floor(Math.random() * cards.length)
  ] : null;
  var pistas = [];

  pistas.push("Este bioma ocupa " + String(b.pct) +
    "% do território brasileiro.");

  if (card) {
    pistas.push("Um dos temas deste bioma é: “" + card.h + "”.");
  } else {
    pistas.push("Seu lema é: “" + b.lema + "”.");
  }

  if (card) {
    pistas.push("Seu lema é: “" + b.lema + "”.");
  } else if (especie) {
    pistas.push("Uma espécie encontrada nele é " + especie.n + ".");
  }

  if (especie) {
    pistas.push("Uma espécie encontrada nele é " + especie.n + ".");
  } else {
    pistas.push("O nome deste bioma começa com a letra “" +
      b.nome.charAt(0) + "”.");
  }

  return pistas.slice(0, 4);
}

function sortearBiomaQual() {
  var indice = Math.floor(Math.random() * BIOMES.length);
  return BIOMES[indice];
}

function iniciarEstadoQualBioma() {
  if (!S.qualBioma) {
    S.qualBioma = {melhor: 0};
  }

  if (typeof S.qualBioma.melhor !== "number") {
    S.qualBioma.melhor = 0;
  }
}

function startQualBioma() {
  var b;

  iniciarEstadoQualBioma();
  b = sortearBiomaQual();

  QUAL_BIOMA = {
    id: b.id,
    pistas: pistasDoBioma(b),
    visiveis: 1,
    erros: 0,
    fim: false,
    acertou: false,
    pontos: 0,
    mensagem: ""
  };

  go("qualBioma");
}

function pontosQualBioma() {
  var tabela = [40, 30, 20, 10];
  var indice = QUAL_BIOMA.visiveis - 1;

  return tabela[indice] || 10;
}

function escolherQualBioma(id) {
  var resposta;
  var pontos;

  if (!QUAL_BIOMA || QUAL_BIOMA.fim) {
    return;
  }

  resposta = bio(QUAL_BIOMA.id);

  if (id === QUAL_BIOMA.id) {
    pontos = pontosQualBioma();
    QUAL_BIOMA.fim = true;
    QUAL_BIOMA.acertou = true;
    QUAL_BIOMA.pontos = pontos;
    QUAL_BIOMA.mensagem = "Você descobriu: " + resposta.nome + ".";

    iniciarEstadoQualBioma();

    if (pontos > S.qualBioma.melhor) {
      S.qualBioma.melhor = pontos;
    }

    addXP(pontos);
    save();

    if (typeof checarMedalhas === "function") {
      checarMedalhas();
    }

    avisoRapido("Você ganhou " + pontos + " XP!");
    render();
    return;
  }

  QUAL_BIOMA.erros++;

  if (QUAL_BIOMA.visiveis < QUAL_BIOMA.pistas.length) {
    QUAL_BIOMA.visiveis++;
    QUAL_BIOMA.mensagem = "Ainda não. Veja uma nova pista.";
    avisoRapido("Ainda não. Nova pista liberada!");
  } else {
    QUAL_BIOMA.fim = true;
    QUAL_BIOMA.acertou = false;
    QUAL_BIOMA.mensagem = "A resposta era " + resposta.nome + ".";
  }

  render();
}

function pistasQualBiomaHTML() {
  var html = "";
  var i;

  for (i = 0; i < QUAL_BIOMA.visiveis; i++) {
    html += '<div class="card">';
    html += '<strong>Pista ' + esc(String(i + 1)) + "</strong>";
    html += "<p>" + esc(QUAL_BIOMA.pistas[i]) + "</p>";
    html += "</div>";
  }

  return html;
}

function opcoesQualBiomaHTML() {
  var lista = BIOMES.slice();
  var html = "";
  var b;
  var i;

  shuffle(lista);

  for (i = 0; i < lista.length; i++) {
    b = lista[i];
    html += '<button class="btn sec" style="min-height:52px" ';
    html += 'onclick="escolherQualBioma(\'' + esc(b.id) + '\')">';
    html += esc(b.emoji) + " " + esc(b.nome);
    html += "</button>";
  }

  return html;
}

function resultadoQualBiomaHTML() {
  var b = bio(QUAL_BIOMA.id);
  var html = '<div class="card">';

  if (QUAL_BIOMA.acertou) {
    html += '<div style="font-size:2.5rem">' + esc(b.emoji) + "</div>";
    html += "<strong>Resposta certa!</strong>";
    html += "<p>" + esc(QUAL_BIOMA.mensagem) + "</p>";
    html += '<p class="small">Você ganhou ' +
      esc(String(QUAL_BIOMA.pontos)) + " XP.</p>";
  } else {
    html += "<strong>Fim das pistas</strong>";
    html += "<p>" + esc(QUAL_BIOMA.mensagem) + "</p>";
    html += '<p class="small">Tente novamente para melhorar.</p>';
  }

  html += '<button class="btn" style="min-height:44px" ';
  html += 'onclick="startQualBioma()">Jogar de novo</button>';
  html += "</div>";

  return html;
}

function vQualBioma() {
  var html;

  iniciarEstadoQualBioma();

  if (!QUAL_BIOMA) {
    QUAL_BIOMA = {
      id: sortearBiomaQual().id,
      pistas: [],
      visiveis: 1,
      erros: 0,
      fim: false,
      acertou: false,
      pontos: 0,
      mensagem: ""
    };
    QUAL_BIOMA.pistas = pistasDoBioma(bio(QUAL_BIOMA.id));
  }

  html = headerHTML(
    "Qual bioma sou eu?",
    "Descubra com o menor número de pistas."
  );

  html += "<main>";
  html += '<div class="card">';
  html += "<strong>Recorde: " +
    esc(String(S.qualBioma.melhor)) + " XP</strong>";
  html += '<p class="small">Quanto menos pistas, mais pontos.</p>';
  html += "</div>";

  html += pistasQualBiomaHTML();

  if (QUAL_BIOMA.mensagem && !QUAL_BIOMA.fim) {
    html += '<p class="small">' +
      esc(QUAL_BIOMA.mensagem) + "</p>";
  }

  if (QUAL_BIOMA.fim) {
    html += resultadoQualBiomaHTML();
  } else {
    html += '<div class="card">';
    html += "<strong>Escolha o bioma</strong>";
    html += '<div class="tiles">';
    html += opcoesQualBiomaHTML();
    html += "</div></div>";
  }

  html += '<button class="btn sec" style="min-height:44px" ';
  html += 'onclick="go(\'home\')">Voltar</button>';
  html += "</main>";

  return html;
}
