"use strict";
/* ============ NOME ============ */
function vName(){
 return headerHTML("Trilhas dos Biomas","Ciências • 7º ano")+'<main><div class="card"><h2>Bem-vindo(a), explorador(a)! 🌎</h2><p>Percorra as 6 trilhas, junte cartas de animais e conquiste o título de <b>Guardião dos Biomas</b>.</p><label class="small">Digite seu nome:</label><input class="txt" id="nm" maxlength="40" placeholder="Seu nome" autocomplete="off"><button class="btn" onclick="saveName()">Começar</button></div></main>';
}
function saveName(){var v=document.getElementById("nm").value.trim();if(!v){document.getElementById("nm").focus();return}S.name=v;save();go("home")}

/* ============ HOME ============ */
function medal(b){var t=S.trails[b.id];if(!t)return"";var p=t.best/t.total;return p>=0.9?"🥇":p>=0.7?"🥈":"🥉"}
function vHome(){
 var bar=BIOMES.map(function(b){return '<b title="'+b.nome+'" style="width:'+b.pct.replace(",",".").replace("%","")+'%;background:'+b.c1+'" onclick="startTrail(\''+b.id+'\')"></b>'}).join("");
 var done=BIOMES.filter(function(b){return S.trails[b.id]}).length;
 var tiles=BIOMES.map(function(b){
  var t=S.trails[b.id];
  return '<div class="tile" style="background:linear-gradient(145deg,'+b.c1+','+b.c2+')" onclick="startTrail(\''+b.id+'\')">'+(t?'<span class="medal">'+medal(b)+'</span>':'')+'<div><div class="em">'+b.emoji+'</div><h3>'+b.nome+'</h3><div class="pc">'+b.pct+' do Brasil</div></div><div class="st">'+(t?"Refazer • "+t.best+"/"+t.total:"Começar")+'</div></div>';
 }).join("");
 return headerHTML("Olá, "+esc(S.name||"explorador(a)")+"! 👋","Escolha um bioma e comece sua trilha")+
 '<main><div class="card"><div class="small"><b>O Brasil dividido em biomas</b> (toque numa faixa)</div><div class="landbar">'+bar+'</div><div class="small">Faixas proporcionais à área de cada bioma (IBGE, 2019).</div></div>'+
 '<h2>Suas trilhas <span class="small">('+done+'/6 concluídas)</span></h2><div class="tiles">'+tiles+'</div>'+
 '<button class="btn sec" onclick="startReview()">🔁 Revisar meus erros ('+S.wrong.length+')</button></main>';
}
