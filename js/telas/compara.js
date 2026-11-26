"use strict";

/* P11 – Compare biomas: view "compara" (vCompara). Não grava nada em S e não dá XP. */
var CP={a:"",b:""};

function comparaEscolha(id){
 if(!CP.a || (CP.a && CP.b)){
  CP.a=id;
  CP.b="";
 }else{
  CP.b=id;
 }
 render();
}

function comparaLimpar(){
 CP.a="";
 CP.b="";
 render();
}

function comparaLinha(nome,va,vb){
 return "<tr><th>"+nome+"</th><td>"+va+"</td><td>"+vb+"</td></tr>";
}

function vCompara(){
 var h="";
 var i,b,a1,a2,sp1,sp2;

 h+=headerHTML("Comparar biomas","Veja diferenças e semelhanças");
 h+="<main>";

 h+='<div class="tiles">';

 for(i=0;i<BIOMES.length;i++){
  b=BIOMES[i];

  h+='<div class="tile" onclick="comparaEscolha(\''+esc(b.id)+'\')" style="background:linear-gradient(135deg,'+esc(b.c1)+","+esc(b.c2)+')">';
  h+='<div class="em">'+esc(b.emoji)+'</div>';
  h+="<h3>"+esc(b.nome)+"</h3>";

  if(CP.a===b.id){
   h+='<div class="st">1º escolhido</div>';
  }else if(CP.b===b.id){
   h+='<div class="st">2º escolhido</div>';
  }else{
   h+='<div class="st">Selecionar</div>';
  }

  h+="</div>";
 }

 h+="</div>";

 h+='<button class="btn sec" onclick="comparaLimpar()">Limpar</button>';
 h+='<button class="btn sec" onclick="go(\'home\')">⬅ Voltar</button>';

 if(CP.a && !CP.b){
  h+='<div class="card"><p>Escolha mais um bioma.</p></div>';
 }else if(CP.a && CP.b){
  if(CP.a===CP.b){
   h+='<div class="card"><p>Escolha biomas diferentes.</p></div>';
  }else{
   a1=bio(CP.a);
   a2=bio(CP.b);

   sp1=(a1.sp&&a1.sp.length)?a1.sp[0]:null;
   sp2=(a2.sp&&a2.sp.length)?a2.sp[0]:null;

   h+='<div class="card">';
   h+='<table class="t">';

   h+=comparaLinha(
    "Bioma",
    esc(a1.emoji)+" "+esc(a1.nome),
    esc(a2.emoji)+" "+esc(a2.nome)
   );

   h+=comparaLinha(
    "% do território",
    esc(String(a1.pct)),
    esc(String(a2.pct))
   );

   h+=comparaLinha(
    "Área (km²)",
    esc(String(a1.km)),
    esc(String(a2.km))
   );

   h+=comparaLinha(
    "Lema",
    esc(a1.lema||""),
    esc(a2.lema||"")
   );

   h+=comparaLinha(
    "Espécie",
    sp1?esc(sp1.e)+" "+esc(sp1.n):"-",
    sp2?esc(sp2.e)+" "+esc(sp2.n):"-"
   );

   h+="</table>";
   h+="</div>";
  }
 }

 h+="</main>";
 return h;
}
