"use strict";
/* ============ RELATÓRIO PARA O PROFESSOR (imprimível) ============ */
function relAcertos(b){
 var n=0;
 b.q.forEach(function(q){if(S.got[q.id])n++});
 return n;
}
function relMitosCertos(){
 var n=0;
 MITOS.forEach(function(m,i){if(S.mitos[i]!==undefined&&S.mitos[i]===m.v)n++});
 return n;
}
function relTrilhasHTML(){
 return BIOMES.map(function(b){
  var r=S.trails[b.id];
  var st=r?'<span class="relatorio-status relatorio-ok">Concluída</span>':'<span class="relatorio-status relatorio-pendente">Não feita</span>';
  var det=r?"Melhor resultado: "+r.best+" de "+r.total+" · tentativas: "+r.tries:"Ainda sem tentativas.";
  return '<article class="card"><div class="relatorio-linha"><strong>'+esc(b.emoji)+" "+esc(b.nome)+"</strong>"+st+
   '</div><p class="small">'+det+" · Perguntas já acertadas: "+relAcertos(b)+" de "+b.q.length+".</p></article>";
 }).join("");
}
function relErradasHTML(){
 var itens=S.wrong.filter(function(id){return QMAP[id]});
 if(!itens.length)return '<div class="card relatorio-ok-texto"><strong>Nenhuma questão pendente.</strong><p class="small">A lista de revisão está zerada.</p></div>';
 return '<ol class="relatorio-lista">'+itens.map(function(id){return"<li>"+esc(QMAP[id].q)+"</li>"}).join("")+"</ol>";
}
function relFinalHTML(){
 var f=Number(S.final)||0,t=Number(S.finalTries)||0;
 return '<div class="card"><strong>Desafio final</strong><p>'+(t||f?"Melhor resultado: "+f+" de 10":"Não realizado")+
  '</p><p class="small">Tentativas: '+t+".</p></div>";
}
function vRelatorio(){
 var l=level();
 return headerHTML("Relatório de aprendizagem","Resumo do progresso nos biomas brasileiros")+
 '<main class="relatorio-pagina"><section class="card relatorio-resumo"><h2>'+esc(S.name||"Aluno(a)")+'</h2>'+
 '<div class="relatorio-linha"><span><strong>XP:</strong> '+S.xp+'</span><span><strong>Nível '+(l+1)+':</strong> '+esc(LNAMES[l])+"</span></div></section>"+
 "<section><h2>Trilhas</h2>"+relTrilhasHTML()+"</section>"+
 '<section><h2>Mitos e verdades</h2><div class="card"><strong>'+relMitosCertos()+" de "+MITOS.length+" acertados</strong></div></section>"+
 "<section><h2>Desafio final</h2>"+relFinalHTML()+"</section>"+
 "<section><h2>Questões para revisar</h2>"+relErradasHTML()+"</section>"+
 '<div class="relatorio-acoes relatorio-nao-imprimir"><button class="btn" onclick="window.print()">🖨️ Imprimir</button>'+
 '<button class="btn sec" onclick="go(\'result\')">Voltar</button></div></main>';
}
