"use strict";
/* Acessibilidade: A+ (3 tamanhos de letra, chave biomas7_letra) e 🔊 (voz do aparelho lê a tela).
   Não mexe no progresso. Os botões ficam no cabeçalho, ao lado do 🌙 (ferramentasHTML). */
var LETRA_CHAVE="biomas7_letra",LETRAS=["","1","2"];
function letraAtual(){try{var v=localStorage.getItem(LETRA_CHAVE)||"";return LETRAS.indexOf(v)>=0?v:""}catch(e){return""}}
function aplicaLetra(v){if(v)document.documentElement.dataset.letra=v;else delete document.documentElement.dataset.letra}
function trocaLetra(){
  var v=LETRAS[(LETRAS.indexOf(letraAtual())+1)%LETRAS.length];
  try{localStorage.setItem(LETRA_CHAVE,v)}catch(e){}
  aplicaLetra(v);
}
var temVoz=!!(window.speechSynthesis&&window.SpeechSynthesisUtterance);
function falando(){return temVoz&&speechSynthesis.speaking}
function pararFala(){if(temVoz)speechSynthesis.cancel();var b=document.getElementById("falaBtn");if(b)b.textContent="🔊"}
/* Lê o conteúdo principal (sem botões de navegação). Tocar de novo para. */
function falarTela(){
  if(!temVoz)return;
  if(falando())return pararFala();
  var m=document.querySelector("#app main");if(!m)return;
  var copia=m.cloneNode(true);
  copia.querySelectorAll(".btn.sec,details:not([open]),pre,textarea,svg").forEach(function(e){e.remove()});
  var txt=(copia.innerText||copia.textContent||"").replace(/[\u{1F000}-\u{1FAFF}☀-➿️]/gu,"").replace(/\s+\n/g,"\n").trim();
  if(!txt)return;
  var u=new SpeechSynthesisUtterance(txt);u.lang="pt-BR";u.rate=.95;
  var voz=speechSynthesis.getVoices().filter(function(v){return /^pt(-|_)BR/i.test(v.lang)})[0];if(voz)u.voice=voz;
  u.onend=u.onerror=function(){var b=document.getElementById("falaBtn");if(b)b.textContent="🔊"};
  speechSynthesis.speak(u);
  var b=document.getElementById("falaBtn");if(b)b.textContent="⏹️";
}
function ferramentasHTML(){
  return '<div class="ferr">'+(temVoz?'<button class="modo" id="falaBtn" onclick="falarTela()" aria-label="Ouvir a tela">🔊</button>':'')+
  '<button class="modo letra" onclick="trocaLetra()" aria-label="Tamanho da letra">A+</button>'+modoBtnHTML()+'</div>';
}
aplicaLetra(letraAtual());
