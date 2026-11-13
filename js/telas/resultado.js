"use strict";
/* ============ RESULTADO / PROFESSOR ============ */
function resumo(){
 var l=level();
 var t="BIOMAS 7º ANO – "+(S.name||"Aluno(a)")+"\nNível "+(l+1)+" ("+LNAMES[l]+") • "+S.xp+" XP\n";
 BIOMES.forEach(function(b){var r=S.trails[b.id];t+=b.nome+": "+(r?r.best+"/"+r.total+" (tentativas: "+r.tries+")":"não feita")+"\n"});
 t+="Desafio final: "+S.final+"/10\nCartas: "+S.cards.length+"/24\nMitos respondidos: "+Object.keys(S.mitos).length+"/"+MITOS.length+"\nQuestões para revisar: "+S.wrong.length;
 return t;
}
function vResult(){
 var done=BIOMES.filter(function(b){return S.trails[b.id]}).length;
 var rows=BIOMES.map(function(b){var r=S.trails[b.id];return '<tr><td>'+b.emoji+' '+b.nome+'</td><td>'+(r?r.best+'/'+r.total+' '+medal(b):'—')+'</td></tr>'}).join("");
 return headerHTML("Meu resultado 📋",esc(S.name||""))+'<main><div class="card"><table class="t"><tr><th>Trilha</th><th>Melhor resultado</th></tr>'+rows+'<tr><td>🏆 Desafio final</td><td>'+S.final+'/10</td></tr><tr><td>🃏 Cartas</td><td>'+S.cards.length+'/24</td></tr><tr><td>🔁 Para revisar</td><td>'+S.wrong.length+'</td></tr></table></div>'+
 '<div class="card"><b>Para o professor</b><div class="small">Mostre esta tela ou copie o resumo abaixo e envie por mensagem. Os dados ficam salvos neste aparelho.</div><pre class="code" id="rs">'+esc(resumo())+'</pre><button class="btn" onclick="copyRes()">📋 Copiar resumo</button></div>'+
 (done===6?'<button class="btn" onclick="go(\'cert\')">🎓 Meu certificado de Guardião dos Biomas</button>':'<div class="small" style="text-align:center">Conclua as 6 trilhas ('+done+'/6) para liberar o certificado.</div>')+
 '<button class="btn sec" onclick="go(\'fontes\')">📚 Fontes do conteúdo</button>'+
 '<button class="btn sec" onclick="changeName()">✏️ Mudar nome</button>'+
 '<button class="btn sec" onclick="resetAsk()">🗑️ Apagar meu progresso</button></main>';
}
function copyRes(){
 var t=resumo();
 function fallback(){var ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand("copy")}catch(e){}document.body.removeChild(ta);toast()}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(toast,fallback)}else fallback();
}
function toast(){var b=document.querySelector("button[onclick='copyRes()']");if(b){b.textContent="✅ Copiado!"}}
function changeName(){view="name";render()}
function resetAsk(){
 var b=document.querySelector("button[onclick='resetAsk()']");
 if(b.dataset.s==="1"){S={name:S.name,xp:0,trails:{},wrong:[],got:{},cards:[],mitos:{},final:0,finalTries:0};save();go("home")}
 else{b.dataset.s="1";b.textContent="Toque de novo para confirmar";setTimeout(function(){if(b){b.dataset.s="";b.textContent="🗑️ Apagar meu progresso"}},4000)}
}

/* ============ FONTES ============ */
function vFontes(){
 return headerHTML("Fontes 📚","De onde vêm os dados")+'<main><div class="card"><ul>'+FONTES.map(function(f){return'<li style="margin-bottom:8px">'+f+'</li>'}).join("")+'</ul><p class="small">Conteúdo conferido em novembro de 2026. Dados de desmatamento e a lista de espécies ameaçadas mudam todo ano.</p></div><button class="btn sec" onclick="go(\'result\')">Voltar</button></main>';
}

/* ============ CERTIFICADO ============ */
function vCert(){
 var d=new Date();var ds=d.toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"});
 return headerHTML("Certificado 🎓","Você completou as 6 trilhas!")+'<main><div id="certArea"><div class="cert"><div style="font-size:44px">🌎🌳🌵</div><h2>Guardião dos Biomas</h2><div>Certificamos que</div><div class="nm">'+esc(S.name)+'</div><div>concluiu as trilhas da <b>Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa e Pantanal</b> e conquistou '+S.xp+' XP.</div><div class="small" style="margin-top:12px">Ciências • 7º ano • '+ds+'</div></div></div><button class="btn" onclick="window.print()">🖨️ Imprimir / salvar em PDF</button><button class="btn sec" onclick="go(\'result\')">Voltar</button></main>';
}
