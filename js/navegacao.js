"use strict";
/* ============ NAVEGAÇÃO ============ */
var view="home",TR=null,Q=null,tab="home";
function go(v){view=v;if(["home","cards","mitos","final","result"].indexOf(v)>=0)tab=v;render();window.scrollTo(0,0)}
function renderNav(){
 var items=[["home","🗺️","Trilhas"],["cards","🃏","Cartas"],["mitos","🧐","Mitos"],["final","🏆","Desafio"],["result","📋","Resultado"]];
 document.getElementById("nav").innerHTML=items.map(function(i){return '<button class="'+(tab===i[0]?"on":"")+'" onclick="go(\''+i[0]+'\')"><span>'+i[1]+'</span>'+i[2]+'</button>'}).join("");
 document.querySelector("nav.tabs").style.display=(view==="name"||view==="quiz"||view==="lesson")?"none":"flex";
}
function headerHTML(title,sub){
 var l=level(),lo=LEVELS[l],hi=LEVELS[l+1]||LEVELS[l]+1,pc=l>=LEVELS.length-1?100:Math.min(100,Math.round((S.xp-lo)/(hi-lo)*100));
 return '<header class="top"><h1>'+title+'</h1><div class="sub">'+(sub||"")+'</div><div class="xpbar"><i style="width:'+pc+'%"></i></div><div class="xpline"><span>Nível '+(l+1)+': '+LNAMES[l]+'</span><span>'+S.xp+' XP</span></div></header>';
}
function render(){
 setTheme("#1b8a4b","#0d5c33");
 var h="";
 if(view==="name")h=vName();
 else if(view==="home")h=vHome();
 else if(view==="lesson")h=vLesson();
 else if(view==="quiz")h=vQuiz();
 else if(view==="cards")h=vCards();
 else if(view==="mitos")h=vMitos();
 else if(view==="final")h=vFinal();
 else if(view==="result")h=vResult();
 else if(view==="fontes")h=vFontes();
 else if(view==="cert")h=vCert();
 document.getElementById("app").innerHTML=h;
 renderNav();
}
