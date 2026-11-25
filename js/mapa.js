"use strict";
/* Mapa estilizado do Brasil: cada região é um bioma (cor se a trilha foi iniciada). */
function mapaCor(id){
  return (S.trails && S.trails[id]) ? bio(id).c1 : "#a8adb3";
}
function mapaTecla(evento,id){
  var t=evento.key||evento.keyCode;
  if(t==="Enter"||t===" "||t===13||t===32){evento.preventDefault();startTrail(id)}
}
function mapaRegiaoHTML(id,pontos,x,y){
  var b=bio(id),ativa=S.trails&&S.trails[id];
  var status=b.nome+". "+(ativa?"Trilha iniciada":"Trilha não iniciada");
  return '<g role="button" tabindex="0" aria-label="'+esc(status)+'" onclick="startTrail(\''+esc(id)+'\')" onkeydown="mapaTecla(event,\''+esc(id)+'\')" style="cursor:pointer">'+
   '<polygon points="'+esc(pontos)+'" fill="'+esc(mapaCor(id))+'" stroke="var(--card)" stroke-width="4" stroke-linejoin="round"><title>'+esc(status)+'</title></polygon>'+
   '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-size="22" pointer-events="none">'+esc(b.emoji)+'</text>'+
   '<text x="'+x+'" y="'+(y+20)+'" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)" pointer-events="none">'+esc(b.nome)+'</text></g>';
}
function mapaHTML(){
  return '<svg viewBox="0 0 360 430" width="100%" role="img" aria-labelledby="mapa-titulo mapa-desc" style="display:block;max-width:440px;margin:0 auto">'+
   '<title id="mapa-titulo">Mapa simplificado dos biomas</title><desc id="mapa-desc">Representação estilizada do Brasil dividida em seis biomas.</desc>'+
   mapaRegiaoHTML("amz","65,25 170,18 232,56 221,145 168,180 82,157 38,93",132,90)+
   mapaRegiaoHTML("caa","232,56 315,87 331,145 285,183 221,145",275,118)+
   mapaRegiaoHTML("cer","168,180 221,145 285,183 268,261 190,279 140,229",216,215)+
   mapaRegiaoHTML("pan","82,157 168,180 140,229 154,294 87,286 51,223",104,225)+
   mapaRegiaoHTML("mat","285,183 322,196 304,276 257,335 220,314 268,261",280,265)+
   mapaRegiaoHTML("pam","154,294 220,314 257,335 224,407 177,384 142,333",200,348)+
   '</svg>';
}
