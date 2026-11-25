"use strict";
/* Tema por bioma: --c1 principal, --c2 escura, --c3 fundo suave, --tx cor dos títulos.
   Cores claras demais são escurecidas sozinhas, para a letra branca ficar legível (contraste 4,5). */
function mixCor(hex,alvo,pct){
  var h=(hex||"#1b8a4b").replace("#",""),a=alvo.replace("#","");
  if(h.length!==6)h="1b8a4b";
  function hx(n){var s=Math.round(n).toString(16);return s.length<2?"0"+s:s}
  function m(i){var v=parseInt(h.substr(i,2),16),w=parseInt(a.substr(i,2),16);return v*(1-pct)+w*pct}
  return "#"+hx(m(0))+hx(m(2))+hx(m(4));
}
function mixWhite(hex,pct){return mixCor(hex,"#ffffff",pct)}
function lumCor(hex){
  var h=hex.replace("#","");
  function c(i){var v=parseInt(h.substr(i,2),16)/255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}
  return .2126*c(0)+.7152*c(2)+.0722*c(4);
}
function corSegura(hex){
  var c=mixCor(hex,hex,0);
  for(var i=0;i<25&&1.05/(lumCor(c)+.05)<4.5;i++)c=mixCor(c,"#000000",.06);
  return c;
}
if(typeof BIOMES!=="undefined")BIOMES.forEach(function(b){b.c1=corSegura(b.c1);b.c2=corSegura(b.c2)});
var TEMA_ATUAL=["#1b8a4b","#0d5c33"];
function setTheme(c1,c2){
  var r=document.documentElement.style,esc=document.documentElement.dataset.theme==="dark";
  c1=corSegura(c1||"#1b8a4b");c2=corSegura(c2||"#0d5c33");TEMA_ATUAL=[c1,c2];
  r.setProperty("--c1",c1);r.setProperty("--c2",c2);
  r.setProperty("--c3",esc?mixCor(c1,"#141c2b",.86):mixWhite(c1,.88));
  r.setProperty("--tx",esc?mixWhite(c1,.55):c2);
}
