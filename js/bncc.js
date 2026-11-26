"use strict";

function bnccHTML(){
 var feitos={};
 var vistos={};
 var lista=[];
 var h="";
 var i,j,b,item;

 if(typeof BNCC==="undefined" || !BNCC){
  return '<div class="card"><h3>Habilidades da BNCC trabalhadas</h3><p>Nenhuma trilha concluída ainda.</p></div>';
 }

 if(S && S.trails){
  for(b in S.trails){
   if(S.trails.hasOwnProperty(b)){
    feitos[b]=1;
   }
  }
 }

 for(b in feitos){
  if(feitos.hasOwnProperty(b)){
   for(i=0;i<BNCC.length;i++){
    item=BNCC[i];

    if(!item || !item.biomas)continue;

    for(j=0;j<item.biomas.length;j++){
     if(item.biomas[j]===b){
      if(!vistos[item.cod]){
       vistos[item.cod]=1;
       lista.push(item);
      }
      break;
     }
    }
   }
  }
 }

 h+='<div class="card">';
 h+='<h3>Habilidades da BNCC trabalhadas</h3>';

 if(!lista.length){
  h+='<p>Nenhuma trilha concluída ainda.</p>';
  h+='</div>';
  return h;
 }

 h+='<ul>';

 for(i=0;i<lista.length;i++){
  item=lista[i];

  h+='<li>';
  h+='<b>'+esc(item.cod)+'</b>';

  if(item.txt){
   h+=' - '+esc(item.txt);
  }

  h+='</li>';
 }

 h+='</ul>';
 h+='</div>';

 return h;
}
