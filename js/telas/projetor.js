"use strict";
/* Modo projetor: perguntas grandes para a turma. Não grava nada em S. */
var PJ={fase:"escolha",bioma:"todos",fila:[],i:0,mostra:false,total:10};

function vProjetor(){
var h=headerHTML("Modo projetor","Perguntas para a turma");
if(PJ.fase==="escolha")return h+pjEscolha();
if(PJ.fase==="jogo")return h+pjJogo();
return h+pjFim();
}

function pjEscolha(){
var i,b,s='<main><div class="card"><p>Escolha um bioma ou use todas as perguntas.</p>';
s+='<button class="btn'+(PJ.bioma==="todos"?"":" sec")+'" style="margin:4px 0" onclick="pjSel(\'todos\')">🌎 Todos os biomas</button>';
for(i=0;i<BIOMES.length;i++){
b=BIOMES[i];
s+='<button class="btn'+(PJ.bioma===b.id?"":" sec")+'" style="margin:4px 0" onclick="pjSel(\''+b.id+'\')">'+esc(b.emoji)+' '+esc(b.nome)+'</button>';
}
s+='<p><button class="btn" onclick="pjComecar()">▶ Começar</button></p></div></main>';
return s;
}

function pjJogo(){
var item=PJ.fila[PJ.i],q=item.q,b=item.b,cor=b.c1||"var(--ink)",i,s,a;
s='<main><div class="card">';
s+='<p class="small">Pergunta '+(PJ.i+1)+' de '+PJ.fila.length+'</p>';
s+='<p><button class="btn sec" onclick="pjFullscreen()">⛶ Tela cheia</button></p>';
s+='<div style="font-size:2rem;text-align:center;font-weight:bold;color:'+esc(cor)+';">'+esc(q.q)+'</div>';

if(q.t==="tf"){
s+=pjOpcao("VERDADEIRO",q.a===true);
s+=pjOpcao("FALSO",q.a===false);
}else{
for(i=0;i<q.o.length;i++){
a=(i===q.a);
s+=pjOpcao(String.fromCharCode(65+i)+") "+esc(q.o[i]),a);
}
}

if(PJ.mostra){
s+='<div class="card" style="margin-top:12px;font-size:1.2rem;">'+esc(q.e||"")+'</div>';
}

s+='<p>';
s+='<button class="btn sec" onclick="pjAnterior()">⬅ Anterior</button> ';
if(!PJ.mostra){
s+='<button class="btn" onclick="pjMostrar()">👁 Mostrar resposta</button>';
}else{
s+='<button class="btn" onclick="pjProxima()">➡ Próxima</button>';
}
s+='</p></div></main>';
return s;
}

function pjFim(){
return '<main><div class="card"><h2>Fim da rodada!</h2><p><button class="btn" onclick="pjComecar()">🔁 Outra rodada</button></p><p><button class="btn sec" onclick="go(\'home\')">⬅ Voltar</button></p></div></main>';
}

function pjOpcao(txt,certa){
var st='padding:14px;margin:10px 0;min-height:44px;font-size:1.3rem;border-radius:12px;';
if(PJ.mostra){
if(certa){
st+='background:var(--ok);color:#fff;font-weight:bold;';
}else{
st+='opacity:.45;';
}
}
return '<div class="card" style="'+st+'">'+txt+'</div>';
}

function pjSel(id){
PJ.bioma=id;
render();
}

function pjComecar(){
var banco=[],lista=[],i,j,b,q;
if(PJ.bioma==="todos"){
lista=BIOMES.slice(0);
}else{
lista=[bio(PJ.bioma)];
}
for(i=0;i<lista.length;i++){
b=lista[i];
for(j=0;j<b.q.length;j++){
q=b.q[j];
if(q.t==="mc"||q.t==="tf"){
banco.push({q:q,b:b});
}
}
}
shuffle(banco);
PJ.fila=banco.slice(0,Math.min(PJ.total,banco.length));
PJ.i=0;
PJ.mostra=false;
PJ.fase="jogo";
go("projetor");
}

function pjMostrar(){
PJ.mostra=true;
render();
}

function pjProxima(){
if(PJ.i<PJ.fila.length-1){
PJ.i++;
PJ.mostra=false;
}else{
PJ.fase="fim";
}
render();
}

function pjAnterior(){
if(PJ.i>0){
PJ.i--;
PJ.mostra=false;
render();
}
}

function pjFullscreen(){
var d=document.documentElement;
try{
if(d&&d.requestFullscreen)d.requestFullscreen();
}catch(e){}
}

function projetorAbrir(){
PJ.fase="escolha";PJ.fila=[];PJ.i=0;PJ.mostra=false;
go("projetor");
}

function projetorParar(){
if(PJ.fase==="jogo"||PJ.fase==="fim"){
PJ.fase="escolha";
PJ.fila=[];
PJ.i=0;
PJ.mostra=false;
return true;
}
return false;
}
