"use strict";
/* Desafio relâmpago: 60 s, perguntas mc/tf de todos os biomas. Não mexe em S.wrong, S.got nem S.rev. */
var RL={fase:"inicio",tempo:60,i:0,acertos:0,erros:0,fila:[],tid:null,trava:false,sel:-1,novo:false,xp:0};

function relampagoInit(){
 if(!S.relampago)S.relampago={best:0,jogos:0};
}
function relampagoAbrir(){
 relampagoParar();
 RL.fase="inicio";
 go("relampago");
}
function relampagoParar(){
 var jogando=(RL.fase==="jogo");
 if(RL.tid){clearInterval(RL.tid);RL.tid=null}
 if(jogando){RL.fase="inicio";RL.tempo=60;RL.trava=false}
 return jogando;
}
function relampagoBanco(){
 var r=[],i,j,b,q;
 for(i=0;i<BIOMES.length;i++){
  b=BIOMES[i];
  for(j=0;j<b.q.length;j++){
   q=b.q[j];
   if(q.t==="mc"||q.t==="tf")r.push(q);
  }
 }
 shuffle(r);
 return r;
}
function relampagoIniciar(){
 relampagoInit();
 if(RL.tid)clearInterval(RL.tid);
 RL.fase="jogo";RL.tempo=60;RL.i=0;RL.acertos=0;RL.erros=0;RL.trava=false;RL.sel=-1;
 RL.fila=relampagoBanco();
 RL.tid=setInterval(function(){
  if(view!=="relampago"){relampagoParar();return}
  RL.tempo--;
  if(RL.tempo<=0){relampagoFim();return}
  render();
 },1000);
 render();
}
function relampagoFim(){
 if(RL.tid){clearInterval(RL.tid);RL.tid=null}
 relampagoInit();
 RL.fase="fim";
 RL.novo=(RL.acertos>S.relampago.best);
 S.relampago.jogos=(S.relampago.jogos||0)+1;
 if(RL.novo)S.relampago.best=RL.acertos;
 RL.xp=Math.min(15,RL.acertos);
 if(RL.xp>0)addXP(RL.xp);
 save();
 render();
}
function relampagoAtual(){
 if(!RL.fila.length)return null;
 if(RL.i>=RL.fila.length)RL.i=0;
 return RL.fila[RL.i];
}
function relampagoResponder(v){
 var q,certo;
 if(RL.trava||RL.fase!=="jogo")return;
 q=relampagoAtual();
 if(!q)return;
 RL.trava=true;
 certo=(q.t==="mc")?(v===q.a):(!!v===!!q.a);
 RL.sel=v;
 if(certo)RL.acertos++;else RL.erros++;
 render();
 setTimeout(function(){
  RL.i++;RL.sel=-1;RL.trava=false;
  if(RL.fase==="jogo"&&view==="relampago")render();
 },600);
}
function relampagoOpt(rot,val,q){
 var c="opt";
 if(RL.trava){
  if(q.a===val)c+=" right";
  else if(RL.sel===val)c+=" wrong";
 }
 return '<button class="'+c+'" onclick="relampagoResponder('+val+')"'+(RL.trava?" disabled":"")+">"+esc(rot)+"</button>";
}
function vRelampago(){
 var h="",q,i;
 relampagoInit();
 h+=headerHTML("⚡ Desafio Relâmpago","60 segundos de perguntas");
 h+="<main>";
 if(RL.fase==="inicio"){
  h+='<div class="card">';
  h+="<p>⚡ Você tem 60 segundos.</p><p>📚 Perguntas de todos os biomas.</p><p>🎯 Vale 1 XP por acerto (até 15).</p>";
  h+="<p><b>🏆 Recorde:</b> "+esc(String(S.relampago.best))+"</p>";
  h+='<button class="btn" onclick="relampagoIniciar()">⚡ Começar</button>';
  h+='<button class="btn sec" onclick="go(\'home\')">⬅ Voltar</button></div>';
 }
 if(RL.fase==="jogo"){
  q=relampagoAtual();
  h+='<div class="card">';
  h+='<div style="font-size:42px;font-weight:800;text-align:center">'+esc(String(RL.tempo))+"s</div>";
  h+='<div class="small">✅ '+esc(String(RL.acertos))+" &nbsp; ❌ "+esc(String(RL.erros))+"</div>";
  h+='<div class="q">'+esc(q.q)+"</div>";
  if(q.t==="mc"){
   for(i=0;i<q.o.length;i++)h+=relampagoOpt(q.o[i],i,q);
  }else{
   h+=relampagoOpt("Verdadeiro",true,q)+relampagoOpt("Falso",false,q);
  }
  h+="</div>";
 }
 if(RL.fase==="fim"){
  h+='<div class="card">';
  h+="<h2>⚡ Tempo encerrado!</h2>";
  h+="<p>✅ Acertos: <b>"+esc(String(RL.acertos))+"</b> &nbsp; ❌ Erros: <b>"+esc(String(RL.erros))+"</b></p>";
  h+="<p>🏆 Recorde: <b>"+esc(String(S.relampago.best))+"</b></p>";
  if(RL.novo)h+="<p><b>🏆 Novo recorde!</b></p>";
  h+="<p>XP ganho: <b>"+esc(String(RL.xp))+"</b></p>";
  h+='<button class="btn" onclick="relampagoIniciar()">🔁 Jogar de novo</button>';
  h+='<button class="btn sec" onclick="go(\'home\')">⬅ Voltar</button></div>';
 }
 h+="</main>";
 return h;
}
function relampagoRecorde(){
 return (S.relampago&&S.relampago.best)?"Recorde: "+S.relampago.best:"60 segundos";
}
