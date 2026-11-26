"use strict";
/* Código da turma: o aluno gera um texto curto ("BIO1:...") com seu desempenho e envia ao professor.
   O professor cola vários códigos no Painel (telas/turma.js). Sem servidor; nada sai do aparelho sozinho. */
var TURMA_PREFIXO="BIO1:";
function turmaCodigo(){
  var d={n:S.name||"Aluno(a)",x:S.xp,f:S.final,c:S.cards.length,w:S.wrong.slice(),t:{}};
  BIOMES.forEach(function(b){var r=S.trails[b.id];if(r)d.t[b.id]=[r.best,r.total,r.tries||0]});
  return TURMA_PREFIXO+btoa(unescape(encodeURIComponent(JSON.stringify(d))));
}
/* Acha todos os códigos dentro de qualquer texto colado (ex.: conversa inteira do WhatsApp). */
function turmaLer(texto){
  var achados=String(texto||"").match(/BIO1:[A-Za-z0-9+\/=]+/g)||[],alunos={};
  achados.forEach(function(c){
    try{
      var d=JSON.parse(decodeURIComponent(escape(atob(c.slice(TURMA_PREFIXO.length)))));
      if(d&&typeof d.n==="string"&&d.t)alunos[d.n.trim().toLowerCase()]=d; // mesmo nome: vale o último
    }catch(e){}
  });
  return Object.keys(alunos).map(function(k){return alunos[k]}).sort(function(a,b){return a.n.localeCompare(b.n,"pt-BR")});
}
function copiarCodigo(){
  var t=turmaCodigo(),b=document.getElementById("codBtn");
  function ok(){if(b)b.textContent="✅ Código copiado!"}
  function fallback(){var ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand("copy")}catch(e){}document.body.removeChild(ta);ok()}
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,fallback);else fallback();
}
