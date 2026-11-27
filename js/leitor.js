"use strict";
/* Leitor: botão 🔊 Ouvir em cada texto (cartão da lição, seção do Estudar, pergunta com alternativas,
   comentário). Lê com a voz do aparelho e destaca a palavra lida (depende do aparelho avisar a palavra).
   leitorAplicar() é chamado no fim de render(). Usa temVoz/pararFala de acesso.js. */
var LEIT=null,LEIT_EMOJI=/[\u{1F000}-\u{1FAFF}☀-➿️]/gu;
function leitorBloco(el){
  var b=document.createElement("button");
  b.type="button";b.className="ouvir";b.textContent="🔊 Ouvir";b.setAttribute("aria-label","Ouvir este texto");
  b.onclick=function(){leitorToca(el,b)};
  el.classList.add("ouvir-bloco");el.insertBefore(b,el.firstChild);
}
function leitorAplicar(){
  if(LEIT){LEIT=null;if(temVoz)speechSynthesis.cancel()}
  if(!temVoz)return;
  var vistos=[];
  function add(el){if(el&&vistos.indexOf(el)<0){vistos.push(el);leitorBloco(el)}}
  document.querySelectorAll("#app .card.lesson,#app .estudar-secao,#app .fb").forEach(add);
  document.querySelectorAll("#app .card > .q").forEach(function(q){add(q.parentNode)});
}
function leitorParar(){
  if(!LEIT)return;
  var L=LEIT;LEIT=null;
  if(temVoz)speechSynthesis.cancel();
  L.grs.forEach(function(g){if(g.parentNode)g.parentNode.replaceChild(document.createTextNode(g.textContent),g)});
  L.el.normalize();L.el.classList.remove("lendo");L.btn.textContent="🔊 Ouvir";
}
function leitorMarca(ci){
  if(!LEIT)return;
  var k=-1;for(var i=0;i<LEIT.pals.length&&LEIT.pals[i].i<=ci;i++)k=i;
  if(k<0||k===LEIT.on)return;
  if(LEIT.on>=0)LEIT.pals[LEIT.on].sp.classList.remove("on");
  LEIT.pals[k].sp.classList.add("on");LEIT.on=k;
}
function leitorToca(el,btn){
  var eraEste=LEIT&&LEIT.el===el;
  pararFala();
  if(eraEste)return;
  var nos=[],pals=[],grs=[],txt="",ult=null,n;
  var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,{acceptNode:function(t){
    return t.nodeValue.trim()&&!t.parentNode.closest(".ouvir")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
  while((n=w.nextNode()))nos.push(n);
  nos.forEach(function(t){
    var bl=t.parentNode.closest("button,li,p,h2,h3,.q,div")||el;
    if(bl!==ult&&txt.trim())txt+=/[.!?:;…]\s*$/.test(txt)?" ":". ";
    ult=bl;
    var s=t.nodeValue,fr=document.createElement("span"),fim=0,m,re=/\S+/g,base=txt.length;
    while((m=re.exec(s))){
      if(m.index>fim)fr.appendChild(document.createTextNode(s.slice(fim,m.index)));
      var sp=document.createElement("span");sp.className="lw";sp.textContent=m[0];fr.appendChild(sp);
      pals.push({sp:sp,i:base+m.index});fim=m.index+m[0].length;
    }
    if(fim<s.length)fr.appendChild(document.createTextNode(s.slice(fim)));
    t.parentNode.replaceChild(fr,t);grs.push(fr);
    txt+=s.replace(LEIT_EMOJI,function(x){return " ".repeat(x.length)});
  });
  var u=new SpeechSynthesisUtterance(txt);u.lang="pt-BR";u.rate=.9;
  var voz=speechSynthesis.getVoices().filter(function(v){return /^pt(-|_)BR/i.test(v.lang)})[0];if(voz)u.voice=voz;
  u.onboundary=function(e){if(LEIT&&LEIT.u===u&&typeof e.charIndex==="number")leitorMarca(e.charIndex)};
  u.onend=u.onerror=function(){if(LEIT&&LEIT.u===u)leitorParar()};
  LEIT={el:el,btn:btn,u:u,grs:grs,pals:pals,on:-1};
  btn.textContent="⏹️ Parar";el.classList.add("lendo");
  speechSynthesis.speak(u);
}
/* qualquer parada de fala (trocar de tela, 🔊 do cabeçalho) também para o leitor */
var pararFalaBase=pararFala;
pararFala=function(){leitorParar();pararFalaBase()};
