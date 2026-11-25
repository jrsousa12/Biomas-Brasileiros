"use strict";
/* Modo claro/escuro: na 1ª vez segue o celular; depois lembra a escolha (chave própria, não mexe no progresso). */
var MODO_CHAVE="biomas7_modo";
function aplicaModo(m){
  document.documentElement.dataset.theme=m;
  var mt=document.querySelector('meta[name="theme-color"]');if(mt)mt.content=m==="dark"?"#141c2b":"#0f5132";
  setTheme(TEMA_ATUAL[0],TEMA_ATUAL[1]);
}
function modoAtual(){return document.documentElement.dataset.theme==="dark"?"dark":"light"}
function trocaModo(){
  var m=modoAtual()==="dark"?"light":"dark";aplicaModo(m);
  try{localStorage.setItem(MODO_CHAVE,m)}catch(e){}
  var b=document.getElementById("modoBtn");if(b){b.textContent=m==="dark"?"☀️":"🌙";b.setAttribute("aria-label",m==="dark"?"Modo claro":"Modo escuro")}
}
function modoBtnHTML(){
  var d=modoAtual()==="dark";
  return '<button class="modo" id="modoBtn" onclick="trocaModo()" aria-label="'+(d?"Modo claro":"Modo escuro")+'">'+(d?"☀️":"🌙")+'</button>';
}
(function(){
  var m=null;try{m=localStorage.getItem(MODO_CHAVE)}catch(e){}
  if(!m)m=window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
  aplicaModo(m);
})();
