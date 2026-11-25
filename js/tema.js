"use strict";
/* Tema por bioma: --c1 principal, --c2 escura, --c3 fundo claro (c1 + 88% de branco). */
function mixWhite(hex,pct){
  var h=(hex||"#eef2ec").replace("#","");
  if(h.length!==6)return "#eef2ec";
  function hx(n){var s=Math.round(n).toString(16);return s.length<2?"0"+s:s}
  function m(i){var v=parseInt(h.substr(i,2),16);return v*(1-pct)+255*pct}
  return "#"+hx(m(0))+hx(m(2))+hx(m(4));
}
function setTheme(c1,c2){
  var r=document.documentElement.style;
  c1=c1||"#1b8a4b";c2=c2||"#0d5c33";
  r.setProperty("--c1",c1);r.setProperty("--c2",c2);r.setProperty("--c3",mixWhite(c1,0.88));
}
