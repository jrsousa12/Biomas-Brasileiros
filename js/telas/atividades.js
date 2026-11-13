"use strict";
/* ============ REVISÃO ============ */
function startReview(){
 var list=S.wrong.map(function(id){return QMAP[id]}).filter(Boolean);
 if(!list.length){
  document.getElementById("app").innerHTML=headerHTML("Revisão","Tudo certo!")+'<main><div class="card big-result"><div class="m">🎉</div><h2>Nada para revisar</h2><p>Você não tem questões erradas pendentes.</p><button class="btn" onclick="go(\'home\')">Voltar às trilhas</button></div></main>';
  view="end";renderNav();document.querySelector("nav.tabs").style.display="flex";return;
 }
 startQuiz({title:"🔁 Revisão de erros",list:list,mode:"review"});
}

/* ============ CARTAS ============ */
function vCards(){
 var tot=0,got=0,h="";
 BIOMES.forEach(function(b){
  h+='<h2 style="color:'+b.c2+'">'+b.emoji+' '+b.nome+'</h2><div class="grid2">';
  b.sp.forEach(function(s){
   tot++;var has=S.cards.indexOf(s.n)>=0;
   if(has){got++;h+='<div class="sp" style="background:linear-gradient(145deg,'+b.c1+','+b.c2+')"><div class="e">'+s.e+'</div><h4>'+s.n+'</h4>'+(s.st?'<div class="tag">'+s.st+'</div>':'')+'<p>'+s.f+'</p></div>'}
   else h+='<div class="sp lock"><div class="e">'+s.e+'</div><h4>?</h4><p>Conclua a trilha para desbloquear</p></div>';
  });
  h+='</div>';
 });
 return headerHTML("Minhas cartas 🃏",got+" de "+tot+" cartas")+'<main>'+h+'<p class="small" style="margin-top:14px">Status de ameaça: Lista Nacional de Fauna Ameaçada (MMA, Portaria 1.704/2026). Essas categorias podem mudar com novas avaliações.</p></main>';
}

/* ============ MITOS ============ */
function vMitos(){
 var h=MITOS.map(function(m,i){
  var r=S.mitos[i];
  var body;
  if(r===undefined){
   body='<div class="row"><button onclick="mitoAns('+i+',false)">🚫 Mito</button><button onclick="mitoAns('+i+',true)">✅ Verdade</button></div>';
  }else{
   body='<div class="pop" style="margin-top:8px"><span class="tagv" style="background:'+(m.v?"#1e9e5a":"#d64545")+'">'+(m.v?"VERDADE":"MITO")+'</span>'+(r===m.v?" 🎯 Você acertou!":" Dessa vez não.")+'<div class="small" style="color:var(--ink);margin-top:4px">'+m.e+'</div></div>';
  }
  return '<div class="mito"><b>“'+m.s+'”</b>'+body+'</div>';
 }).join("");
 return headerHTML("Mito ou verdade? 🧐","Descubra o que é fato e o que é boato")+'<main>'+h+'</main>';
}
function mitoAns(i,v){
 if(S.mitos[i]!==undefined)return;S.mitos[i]=v;if(v===MITOS[i].v)addXP(5);save();
 var y=window.scrollY;render();window.scrollTo(0,y)
}

/* ============ DESAFIO FINAL ============ */
function vFinal(){
 return headerHTML("Desafio final 🏆","10 questões sorteadas sobre todos os biomas")+'<main><div class="card"><p>Compare os biomas e descubra qual é qual pelas pistas.</p><p class="small">Melhor resultado: <b>'+S.final+'/10</b> • Tentativas: '+S.finalTries+'</p><button class="btn" onclick="startFinal()">Começar o desafio</button></div></main>';
}
function startFinal(){
 var pool=FINALPOOL.map(function(q){return{t:q.t,q:q.q,o:q.o.slice(),a:q.a,e:q.e,id:q.id,b:q.b}});
 startQuiz({title:"🏆 Desafio final",list:shuffle(pool).slice(0,10),mode:"final"});
}
