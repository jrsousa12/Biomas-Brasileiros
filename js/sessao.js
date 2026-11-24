"use strict";
/* ============ CONTINUAR DE ONDE PAROU ============
   Guarda a lição ou o quiz em andamento numa chave própria (não mexe em biomas7_v1).
   Vale por 12 horas. render() chama sessSave(); endQuiz() chama sessClear(). */
var SESS_KEY="biomas7_sessao",SESS_MAX=432e5;
function sessSave(){
 var d=null;
 if(view==="lesson"&&TR)d={k:"lesson",bid:TR.b.id,step:TR.step};
 else if(view==="quiz"&&Q)d={k:"quiz",title:Q.title,ids:Q.list.map(function(q){return q.id}),i:Q.i,ok:Q.ok,fixed:Q.fixed,ans:Q.ans,color:Q.color,mode:Q.mode,bid:Q.bid};
 if(!d)return;
 d.at=Date.now();
 try{localStorage.setItem(SESS_KEY,JSON.stringify(d))}catch(e){}
}
function sessClear(){try{localStorage.removeItem(SESS_KEY)}catch(e){}}
/* devolve a sessão guardada ou null (vencida, estragada ou com questão que não existe mais) */
function sessGet(){
 var d;try{d=JSON.parse(localStorage.getItem(SESS_KEY)||"null")}catch(e){return null}
 if(!d||!(Date.now()-d.at<SESS_MAX))return null;
 if(d.k==="lesson"){var b=bio(d.bid);return b&&d.step>=0&&d.step<b.cards.length?d:null}
 if(d.k!=="quiz"||!Array.isArray(d.ids)||!d.ids.length||!(d.i>=0&&d.i<d.ids.length))return null;
 return d.ids.every(function(id){return QMAP[id]})?d:null;
}
function sessLabel(d){
 if(d.k==="lesson"){var b=bio(d.bid);return b.emoji+" "+b.nome+" — leitura "+(d.step+1)+" de "+b.cards.length}
 var n=d.i+(d.ans?2:1);if(n>d.ids.length)n=d.ids.length;
 return d.title+" — questão "+n+" de "+d.ids.length;
}
function sessResume(){
 var d=sessGet();
 if(!d){sessClear();go("home");return}
 if(d.k==="lesson"){TR={b:bio(d.bid),step:d.step};view="lesson";render();window.scrollTo(0,0);return}
 Q={title:d.title,list:d.ids.map(function(id){return QMAP[id]}),i:d.i,ok:d.ok||0,done:false,color:d.color||["#1b8a4b","#0d5c33"],mode:d.mode,bid:d.bid,fixed:d.fixed||0,sel:null};
 prepQ();view="quiz";
 if(d.ans)nextQ();else{render();window.scrollTo(0,0)}
}
function sessCardHTML(){
 var d=sessGet();if(!d)return"";
 return '<div class="card resume"><div class="small">⏸️ Você parou aqui:</div><b>'+esc(sessLabel(d))+'</b><button class="btn" onclick="sessResume()">▶ Continuar de onde parei</button></div>';
}
