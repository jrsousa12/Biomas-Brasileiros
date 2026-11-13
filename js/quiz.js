"use strict";
/* ============ QUIZ GENÉRICO ============ */
function startQuiz(cfg){
 Q={title:cfg.title,list:cfg.list,i:0,ok:0,done:false,color:cfg.color||["#1b8a4b","#0d5c33"],mode:cfg.mode,bid:cfg.bid,fixed:0,sel:null};
 prepQ();view="quiz";render();window.scrollTo(0,0)
}
function prepQ(){
 var q=Q.list[Q.i];Q.ans=false;Q.sel=null;Q.pick=[];Q.chk=null;
 if(q.t==="mc"){Q.opts=shuffle(q.o.map(function(t,i){return{t:t,ok:i===q.a}}))}
 if(q.t==="order"){var s=shuffle(q.items.slice());if(s.join()===q.items.join()){s.push(s.shift())}Q.ord=s}
}
function vQuiz(){
 var q=Q.list[Q.i],c=Q.color;setTheme(c[0],c[1]);
 var pc=Math.round(Q.i/Q.list.length*100);
 var h='<header class="top" style="background:linear-gradient(135deg,'+c[0]+','+c[1]+')"><h1>'+Q.title+'</h1><div class="sub">Questão '+(Q.i+1)+' de '+Q.list.length+'</div></header><main><div class="prog"><i style="width:'+pc+'%"></i></div><div class="card"><div class="q">'+q.q+'</div>';
 if(q.t==="mc"){
  h+=Q.opts.map(function(o,i){
   var cls="";if(Q.ans){if(o.ok)cls="right";else if(Q.sel===i)cls="wrong"}
   return '<button class="opt '+cls+'" '+(Q.ans?"disabled":"")+' onclick="pickMC('+i+')">'+o.t+'</button>';
  }).join("");
 }else if(q.t==="tf"){
  [true,false].forEach(function(v,i){
   var cls="";if(Q.ans){if(v===q.a)cls="right";else if(Q.sel===i)cls="wrong"}
   h+='<button class="opt '+cls+'" '+(Q.ans?"disabled":"")+' onclick="pickTF('+i+')">'+(v?"✅ Verdadeiro":"❌ Falso")+'</button>';
  });
 }else if(q.t==="order"){
  h+='<div class="small" style="margin-bottom:6px">Toque nos itens na ordem certa (do produtor ao decompositor).</div><div class="slots">';
  for(var k=0;k<q.items.length;k++){
   var txt=Q.pick[k]!==undefined?Q.ord[Q.pick[k]]:"";
   var cls="";if(Q.ans&&Q.pick[k]!==undefined){cls=Q.ord[Q.pick[k]]===q.items[k]?"ok":"bad"}
   h+='<div class="slot '+cls+'"><b>'+(k+1)+'</b><span>'+txt+'</span></div>';
  }
  h+='</div><div class="chips">'+Q.ord.map(function(t,i){return '<button class="chip" '+((Q.pick.indexOf(i)>=0||Q.ans)?"disabled":"")+' onclick="pickOrd('+i+')">'+t+'</button>'}).join("")+'</div>';
  if(!Q.ans)h+='<button class="btn sec" onclick="clearOrd()">Limpar</button>';
 }
 h+='</div>';
 if(Q.ans){
  h+='<div class="fb '+(Q.chk?"ok":"bad")+' pop"><b>'+(Q.chk?"✅ Muito bem! ":"❌ Quase lá! ")+'</b>'+q.e+(q.t==="order"&&!Q.chk?'<br><br><b>Ordem certa:</b> '+q.items.join(" → "):"")+'</div>';
  h+='<button class="btn" onclick="nextQ()">'+(Q.i===Q.list.length-1?"Ver resultado":"Próxima ▶")+'</button>';
 }
 h+='<button class="btn sec" onclick="quitQuiz()">Sair</button></main>';
 return h;
}
function finishAns(correct){
 var q=Q.list[Q.i];Q.ans=true;Q.chk=correct;
 if(correct){
  Q.ok++;
  if(!S.got[q.id]){S.got[q.id]=1;addXP(Q.mode==="review"?5:10)}
  var ix=S.wrong.indexOf(q.id);if(ix>=0){S.wrong.splice(ix,1);Q.fixed++}
 }else{if(S.wrong.indexOf(q.id)<0)S.wrong.push(q.id)}
 save();render();
}
function pickMC(i){if(Q.ans)return;Q.sel=i;finishAns(Q.opts[i].ok)}
function pickTF(i){if(Q.ans)return;Q.sel=i;var q=Q.list[Q.i];finishAns((i===0)===q.a)}
function pickOrd(i){
 if(Q.ans||Q.pick.indexOf(i)>=0)return;Q.pick.push(i);
 var q=Q.list[Q.i];
 if(Q.pick.length===q.items.length){
  var okk=Q.pick.every(function(p,k){return Q.ord[p]===q.items[k]});finishAns(okk)
 }else render();
}
function clearOrd(){Q.pick=[];render()}
function nextQ(){
 if(Q.i<Q.list.length-1){Q.i++;prepQ();render();window.scrollTo(0,0)}
 else endQuiz();
}
function quitQuiz(){view="home";tab="home";Q=null;render()}

function endQuiz(){
 var n=Q.list.length,ok=Q.ok,p=ok/n;
 var m=p>=0.9?"🥇":p>=0.7?"🥈":p>=0.5?"🥉":"💪";
 var msg=p>=0.9?"Incrível! Você domina este assunto!":p>=0.7?"Muito bom! Falta pouco para o ouro.":p>=0.5?"Bom começo! Revise os erros e tente de novo.":"Sem problema: aprender é isso. Releia os cartões e tente outra vez.";
 var extra="",btns="";
 if(Q.mode==="trail"){
  var b=bio(Q.bid),prev=S.trails[b.id];
  S.trails[b.id]={best:Math.max(prev?prev.best:0,ok),total:n,tries:(prev?prev.tries:0)+1,last:ok};
  var novas=0;b.sp.forEach(function(s){if(S.cards.indexOf(s.n)<0){S.cards.push(s.n);novas++}});
  addXP(prev?0:20);
  extra=novas?'<p>🃏 Você ganhou <b>'+novas+' cartas</b> de animais do bioma '+b.nome+'!</p>':'<p class="small">Suas cartas deste bioma já estão na coleção.</p>';
  if(!prev)extra+='<p class="small">+20 XP pela trilha concluída.</p>';
  btns='<button class="btn" onclick="go(\'cards\')">Ver minhas cartas</button><button class="btn sec" onclick="startTrail(\''+b.id+'\')">Refazer a trilha</button><button class="btn sec" onclick="go(\'home\')">Voltar às trilhas</button>';
 }else if(Q.mode==="final"){
  S.finalTries++;if(ok>S.final)S.final=ok;addXP(ok>=7&&!S.finalBonus?30:0);if(ok>=7)S.finalBonus=1;
  btns='<button class="btn" onclick="startFinal()">Jogar de novo</button><button class="btn sec" onclick="go(\'home\')">Voltar às trilhas</button>';
 }else{
  extra='<p>Você acertou de primeira '+Q.fixed+' questão(ões) que antes tinha errado.</p>';
  btns='<button class="btn sec" onclick="go(\'home\')">Voltar às trilhas</button>';
 }
 save();
 var h=headerHTML(Q.title,"Resultado")+'<main><div class="card big-result pop"><div class="m">'+m+'</div><h2>'+ok+' de '+n+' acertos</h2><p>'+msg+'</p>'+extra+'</div>'+btns;
 if(S.wrong.length&&Q.mode!=="review")h+='<button class="btn sec" onclick="startReview()">🔁 Revisar meus erros ('+S.wrong.length+')</button>';
 h+='</main>';
 view="end";document.getElementById("app").innerHTML=h;renderNav();window.scrollTo(0,0);
 document.querySelector("nav.tabs").style.display="flex";
}
