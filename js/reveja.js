"use strict";
/* ============ "📖 Reveja": liga uma questão errada à seção do texto de estudo ============ */
/* devolve {b,sec,t} da seção da pergunta, ou null se não houver (bioma sem texto, pergunta sem seção) */
function secaoDaQuestao(q) {
  var lista, id, i, textos, sec;
  if (!q || !q.b || typeof SECAO_Q === "undefined" || !SECAO_Q[q.b]) return null;
  lista = SECAO_Q[q.b].split(",");
  id = lista[parseInt(String(q.id).slice(q.b.length), 10)];
  if (!id || !window.TEXTOS || !window.TEXTOS[q.b]) return null;
  textos = window.TEXTOS[q.b];
  for (i = 0; i < textos.length; i++) {
    if (textos[i].id === id) {
      sec = textos[i];
      return {b: q.b, sec: id, t: sec.t};
    }
  }
  return null;
}

/* botão mostrado abaixo do comentário, só quando o aluno errou */
function revejaHTML(q) {
  var s = secaoDaQuestao(q);
  if (!s) return "";
  return '<button class="btn sec" onclick="estudarSecao(\'' + s.b + '\',\'' + s.sec + '\')">📖 Reveja: ' + esc(s.t) + "</button>";
}
