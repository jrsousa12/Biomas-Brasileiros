"use strict";
/* ============ TRILHA: LIÇÃO ============ */
function startTrail(id){
 var b=bio(id);TR={b:b,step:0};view="lesson";render();window.scrollTo(0,0)
}
function vLesson(){
 var b=TR.b,c=b.cards[TR.step];setTheme(b.c1,b.c2);
 var dots=b.cards.map(function(_,i){return'<i class="'+(i===TR.step?"on":"")+'"></i>'}).join("");
 var last=TR.step===b.cards.length-1;
 return '<header class="top" style="background:linear-gradient(135deg,'+b.c1+','+b.c2+')"><h1>'+b.emoji+' '+b.nome+'</h1><div class="sub">'+b.lema+' • '+b.pct+' do Brasil • '+b.km+' km²</div></header>'+
 '<main><div class="dots">'+dots+'</div><div class="card lesson pop"><div class="big">'+c.e+'</div><h3>'+c.h+'</h3>'+c.p+'</div>'+
 '<button class="btn" onclick="lessonNext()">'+(last?"Ir para as questões ▶":"Próximo ▶")+'</button>'+
 '<button class="btn sec" onclick="'+(TR.step>0?"lessonPrev()":"go('home')")+'">'+(TR.step>0?"◀ Voltar":"Sair da trilha")+'</button></main>';
}
function lessonNext(){
 var b=TR.b;
 if(TR.step<b.cards.length-1){TR.step++;render();window.scrollTo(0,0)}
 else{startQuiz({title:b.emoji+" "+b.nome,list:b.q.slice(),color:[b.c1,b.c2],mode:"trail",bid:b.id})}
}
function lessonPrev(){TR.step--;render();window.scrollTo(0,0)}
