"use strict";
/* ============ NOME ============ */
function vName(){
 return headerHTML("Trilhas dos Biomas","Ciências • 7º ano")+'<main><div class="card"><h2>Bem-vindo(a), explorador(a)! 🌎</h2><p>Percorra as 6 trilhas, junte cartas de animais e conquiste o título de <b>Guardião dos Biomas</b>.</p><label class="small">Digite seu nome:</label><input class="txt" id="nm" maxlength="40" placeholder="Seu nome" autocomplete="off"><button class="btn" onclick="saveName()">Começar</button></div></main>';
}
function saveName(){var v=document.getElementById("nm").value.trim();if(!v){document.getElementById("nm").focus();return}S.name=v;save();go("home")}

/* ============ HOME ============ */
function estrelas(b){var t=S.trails[b.id],p=t?t.best/t.total:-1,n=p>=0.9?3:p>=0.7?2:p>=0?1:0;return '<div class="stars" aria-label="'+n+' de 3 estrelas">'+"⭐".repeat(n)+'<b>'+"⭐".repeat(3-n)+'</b></div>'}
function guiaHTML(done){var m=done===0?"Escolha um bioma e vamos explorar juntos!":done===6?"Uau! Você fez as 6 trilhas! Que tal o Desafio final? 🏆":"Muito bem! Faltam "+(6-done)+" trilha"+(6-done>1?"s":"")+". Bora!";return '<div class="guia"><div class="av" aria-hidden="true">🦜</div><div class="balao">'+m+'</div></div>'}
function medal(b){var t=S.trails[b.id];if(!t)return"";var p=t.best/t.total;return p>=0.9?"🥇":p>=0.7?"🥈":"🥉"}
function atalho(ic,t,sub,fn){return '<button class="atalho" onclick="'+fn+'"><span class="ic">'+ic+'</span><span>'+t+(sub?'<br><small>'+sub+'</small>':'')+'</span></button>'}
function atalhosHTML(){return atalho("🔁","Revisar meus erros",revResumo(),"startReview()")+atalho("🏅","Minhas medalhas","","go('medalhas')")+atalho("📖","Glossário","","go('glossario')")+atalho("🔗","Ligar pares","","startPares()")+atalho("🧭","Qual bioma sou eu?","","startQualBioma()")+atalho("⚖️","Comparar biomas","","go('compara')")+atalho("⚡","Desafio relâmpago",relampagoRecorde(),"relampagoAbrir()")}
function legendaHTML(){return '<ul class="legenda">'+BIOMES.map(function(b){return '<li onclick="startTrail(\''+b.id+'\')"><i style="background:'+b.c1+'"></i>'+b.nome+' <span>'+b.pct+'</span></li>'}).join("")+'</ul>'}
function vHome(){
 var bar=BIOMES.map(function(b){return '<b title="'+b.nome+'" style="width:'+b.pct.replace(",",".").replace("%","")+'%;background:'+b.c1+'" onclick="startTrail(\''+b.id+'\')"></b>'}).join("");
 var done=BIOMES.filter(function(b){return S.trails[b.id]}).length;
 var tiles=BIOMES.map(function(b){
  var t=S.trails[b.id];
  return '<div class="tile" style="background:linear-gradient(145deg,'+b.c1+','+b.c2+')" onclick="startTrail(\''+b.id+'\')">'+(t?'<span class="medal">'+medal(b)+'</span>':'')+'<div><div class="em">'+b.emoji+'</div><h3>'+b.nome+'</h3><div class="pc">'+b.pct+' do Brasil</div>'+estrelas(b)+'</div><div class="st">'+(t?"Refazer • "+t.best+"/"+t.total:"Começar")+'</div></div>';
 }).join("");
 return headerHTML("Olá, "+esc(S.name||"explorador(a)")+"! 👋","Escolha um bioma e comece sua trilha")+
 '<main>'+guiaHTML(done)+seqHTML()+sessCardHTML()+'<div class="card"><div class="small"><b>O Brasil dividido em biomas</b> (toque numa faixa)</div><div class="landbar">'+bar+'</div>'+legendaHTML()+'<div class="small">Faixas proporcionais à área de cada bioma (IBGE, 2019).</div></div>'+'<div class="card"><div class="small"><b>🗺️ Mapa do seu progresso</b> (cinza = trilha ainda não feita)</div>'+mapaHTML()+'</div>'+
 '<h2>Suas trilhas <span class="small">('+done+'/6 concluídas)</span></h2><div class="tiles">'+tiles+'</div>'+
 '<h2>Mais para explorar</h2><div class="atalhos">'+atalhosHTML()+'</div></main>';
}
