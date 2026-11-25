"use strict";
/* ============ ESTUDAR (📖): texto completo do bioma ============ */
/* de: tela de onde o aluno veio ("lesson" = trilha), para o Voltar */
var ES = {b:"amz",sec:-1,de:"home"};

function textosBiomaEstudar(id) {
  if (!window.TEXTOS || !window.TEXTOS[id]) {
    return [];
  }
  return window.TEXTOS[id];
}

function iniciarLidosEstudar(id) {
  if (!S.lidos) {
    S.lidos = {};
  }
  if (!S.lidos[id]) {
    S.lidos[id] = {};
  }
}

function marcarSecaoLida(id, idSecao) {
  iniciarLidosEstudar(id);

  if (!S.lidos[id][idSecao]) {
    S.lidos[id][idSecao] = true;
    save();
  }
}

function indiceSecaoEstudar(id, idSecao) {
  var textos = textosBiomaEstudar(id);
  var i;

  for (i = 0; i < textos.length; i++) {
    if (textos[i].id === idSecao) {
      return i;
    }
  }

  return -1;
}

function lembrarOrigemEstudar() {
  if (view !== "estudar") {
    ES.de = view;
  }
}

function estudar(id) {
  lembrarOrigemEstudar();
  ES.b = bio(id) ? id : "amz";
  ES.sec = -1;
  go("estudar");
}

function estudarSecao(id, idSecao) {
  var indice;

  lembrarOrigemEstudar();
  ES.b = bio(id) ? id : "amz";
  indice = indiceSecaoEstudar(ES.b, idSecao);
  ES.sec = indice;

  if (indice >= 0) {
    marcarSecaoLida(ES.b, idSecao);
  }

  go("estudar");
}

/* volta para a trilha (se veio dela) ou para o início */
function estudarSair() {
  if (ES.de === "lesson" && TR) {
    view = "lesson";
    render();
    window.scrollTo(0, 0);
    return;
  }
  go("home");
}

function trocarSecaoEstudar(indice) {
  var textos = textosBiomaEstudar(ES.b);

  if (indice < 0 || indice >= textos.length) {
    return;
  }

  ES.sec = indice;
  marcarSecaoLida(ES.b, textos[indice].id);
  render();
  window.scrollTo(0, 0);
}

function abrirSumarioEstudar() {
  ES.sec = -1;
  render();
  window.scrollTo(0, 0);
}

function estudarVoltar() {
  if (ES.sec >= 0) {
    abrirSumarioEstudar();
    return true;
  }

  return false;
}

function secaoFoiLida(id, idSecao) {
  return !!(S.lidos && S.lidos[id] && S.lidos[id][idSecao]);
}

function sumarioEstudarHTML(textos) {
  var html = '<div class="estudar-lista">';
  var secao;
  var lida;
  var i;

  for (i = 0; i < textos.length; i++) {
    secao = textos[i];
    lida = secaoFoiLida(ES.b, secao.id);

    html += '<button class="btn sec estudar-sumario-btn" ';
    html += 'onclick="trocarSecaoEstudar(' + i + ')">';
    html += '<span>' + esc(secao.t) + "</span>";
    html += '<span aria-label="' + (lida ? "Seção lida" : "Não lida") + '">';
    html += lida ? "✅" : "›";
    html += "</span></button>";
  }

  html += "</div>";
  html += '<button class="btn sec estudar-voltar-home" ';
  html += 'onclick="estudarSair()">Voltar</button>';

  return html;
}

function paragrafosEstudarHTML(secao) {
  var html = "";
  var i;

  for (i = 0; i < secao.p.length; i++) {
    html += "<p>" + esc(secao.p[i]) + "</p>";
  }

  return html;
}

function navegacaoEstudarHTML(textos) {
  var ultima = ES.sec === textos.length - 1;
  var html = '<div class="estudar-navegacao">';

  if (ES.sec > 0) {
    html += '<button class="btn sec" ';
    html += 'onclick="trocarSecaoEstudar(' + (ES.sec - 1) + ')">';
    html += "◀ Anterior</button>";
  } else {
    html += '<button class="btn sec" disabled>◀ Anterior</button>';
  }

  if (ultima) {
    html += '<button class="btn" ';
    html += 'onclick="startTrail(\'' + esc(ES.b) + '\')">';
    html += "🎯 Fazer a trilha</button>";
  } else {
    html += '<button class="btn" ';
    html += 'onclick="trocarSecaoEstudar(' + (ES.sec + 1) + ')">';
    html += "Próxima ▶</button>";
  }

  html += "</div>";
  html += '<button class="btn sec estudar-sumario-link" ';
  html += 'onclick="abrirSumarioEstudar()">☰ Sumário</button>';

  return html;
}

function secaoEstudarHTML(textos) {
  var secao = textos[ES.sec];
  var html = "";

  if (!secao) {
    ES.sec = -1;
    return sumarioEstudarHTML(textos);
  }

  marcarSecaoLida(ES.b, secao.id);

  html += '<article class="card estudar-secao">';
  html += '<p class="small estudar-indicador">';
  html += esc(String(ES.sec + 1)) + " de " + esc(String(textos.length));
  html += "</p>";
  html += "<h2>" + esc(secao.t) + "</h2>";
  html += '<div class="estudar-texto">';
  html += paragrafosEstudarHTML(secao);
  html += "</div></article>";
  html += navegacaoEstudarHTML(textos);

  return html;
}

function textoEmPreparacaoHTML() {
  var html = '<div class="card estudar-preparacao">';
  html += "<h2>Texto em preparação</h2>";
  html += "<p>O material de estudo deste bioma estará disponível em breve.</p>";
  html += '<button class="btn sec" onclick="estudarSair()">Voltar</button>';
  html += "</div>";

  return html;
}

function vEstudar() {
  var b = bio(ES.b);
  var textos;
  var html;

  if (!b) {
    ES.b = "amz";
    b = bio(ES.b);
  }

  setTheme(b.c1, b.c2);
  textos = textosBiomaEstudar(ES.b);
  html = headerHTML("📖 " + b.nome, "Estudar");
  html += '<main class="estudar-pagina">';

  if (!textos.length) {
    html += textoEmPreparacaoHTML();
  } else if (ES.sec < 0) {
    html += '<div class="card estudar-intro">';
    html += "<h2>Sumário</h2>";
    html += "<p>Escolha uma seção para começar ou continuar a leitura.</p>";
    html += "</div>";
    html += sumarioEstudarHTML(textos);
  } else {
    html += secaoEstudarHTML(textos);
  }

  html += "</main>";
  return html;
}
