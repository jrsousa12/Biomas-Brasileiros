"use strict";
/* P6 – Glossário: view "glossario" (vGlossario). Dados em js/dados/glossario.js. */

var GLOSSARIO_BUSCA = "";

function textoBuscaGlossario(texto) {
  return String(texto).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function glossarioOrdenado() {
  return GLOSSARIO.slice().sort(function (a, b) {
    return a.t.localeCompare(b.t, "pt-BR");
  });
}

function listaGlossarioHTML(busca) {
  var lista = glossarioOrdenado();
  var termo = textoBuscaGlossario(busca);
  var html = "";
  var i, item;

  for (i = 0; i < lista.length; i++) {
    item = lista[i];
    if (!termo || textoBuscaGlossario(item.t + " " + item.d).indexOf(termo) !== -1) {
      html += '<article class="card"><strong>' + esc(item.t) + "</strong>";
      html += '<p class="small">' + esc(item.d) + "</p></article>";
    }
  }

  if (!html) {
    html = '<div class="card"><strong>Nenhum termo encontrado.</strong>';
    html += '<p class="small">Tente buscar outra palavra.</p></div>';
  }

  return html;
}

function filtrarGlossario(valor) {
  var lista = document.getElementById("glossario-lista");

  GLOSSARIO_BUSCA = valor || "";
  if (lista) lista.innerHTML = listaGlossarioHTML(GLOSSARIO_BUSCA);
}

function limparBuscaGlossario() {
  var campo = document.getElementById("glossario-busca");

  if (campo) {
    campo.value = "";
    campo.focus();
  }
  filtrarGlossario("");
}

function vGlossario() {
  var html = headerHTML("Glossário", "Consulte palavras importantes sobre os biomas.");

  html += "<main>";
  html += '<div class="card">';
  html += '<label for="glossario-busca"><strong>Buscar termo</strong></label>';
  html += '<input id="glossario-busca" class="txt" type="search" ';
  html += 'placeholder="Digite uma palavra" autocomplete="off" ';
  html += 'value="' + esc(GLOSSARIO_BUSCA) + '" oninput="filtrarGlossario(this.value)">';
  html += '<button class="btn sec" style="min-height:44px" onclick="limparBuscaGlossario()">Limpar busca</button>';
  html += "</div>";
  html += '<section id="glossario-lista">' + listaGlossarioHTML(GLOSSARIO_BUSCA) + "</section>";
  html += '<button class="btn sec" style="min-height:44px" onclick="go(\'home\')">Voltar</button>';
  html += "</main>";

  return html;
}
