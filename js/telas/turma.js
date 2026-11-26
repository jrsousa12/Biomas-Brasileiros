"use strict";
/* ============ PAINEL DO PROFESSOR ============
   O professor cola os códigos dos alunos; a tabela mostra a turma. Texto colado fica em chave própria
   (biomas7_turma), separada do progresso do aluno. */
var TURMA_CHAVE="biomas7_turma";
function turmaTexto(){try{return localStorage.getItem(TURMA_CHAVE)||""}catch(e){return""}}
function vTurma(){
  var al=turmaLer(turmaTexto());
  return headerHTML("Painel do professor 👩‍🏫","Turma: "+al.length+" aluno(s)")+'<main>'+
  '<div class="card"><div class="small">Peça aos alunos: <b>Resultado → Para o professor → Copiar código</b> e enviar por mensagem. '+
  'Cole aqui os códigos (pode colar a conversa inteira; o app acha os códigos sozinho).</div>'+
  '<textarea id="turmaTxt" class="turma-txt" rows="4" placeholder="BIO1:...">'+esc(turmaTexto())+'</textarea>'+
  '<button class="btn" onclick="turmaAtualizar()">📊 Montar tabela</button></div>'+
  (al.length?turmaTabela(al)+turmaErros(al)+'<button class="btn sec" onclick="turmaLimpar()">🗑️ Limpar turma</button>':'')+
  '<button class="btn sec" onclick="go(\'result\')">⬅️ Voltar</button></main>';
}
function turmaTabela(al){
  var cab='<tr><th>Aluno</th>'+BIOMES.map(function(b){return '<th title="'+esc(b.nome)+'">'+b.emoji+'</th>'}).join("")+'<th>🏆</th><th>🔁</th></tr>';
  function cel(r){return r?'<td class="'+(r[0]/r[1]>=.75?"bom":r[0]/r[1]<.5?"fraco":"")+'">'+r[0]+'/'+r[1]+'</td>':'<td>—</td>'}
  var lin=al.map(function(a){return '<tr><td class="nome">'+esc(a.n)+'</td>'+BIOMES.map(function(b){return cel(a.t[b.id])}).join("")+'<td>'+(a.f||0)+'</td><td>'+((a.w||[]).length)+'</td></tr>'}).join("");
  var med='<tr class="media"><td>Média</td>'+BIOMES.map(function(b){
    var f=al.filter(function(a){return a.t[b.id]});
    return f.length?'<td>'+Math.round(100*f.reduce(function(s,a){return s+a.t[b.id][0]/a.t[b.id][1]},0)/f.length)+'%</td>':'<td>—</td>';
  }).join("")+'<td></td><td></td></tr>';
  return '<div class="card"><div class="turma-rola"><table class="turma">'+cab+lin+med+'</table></div>'+
  '<div class="small">Verde: 75% ou mais • Vermelho: menos de 50% • 🔁 questões que o aluno ainda precisa rever.</div></div>';
}
function turmaErros(al){
  var cont={};al.forEach(function(a){(a.w||[]).forEach(function(id){if(QMAP[id])cont[id]=(cont[id]||0)+1})});
  var top=Object.keys(cont).sort(function(a,b){return cont[b]-cont[a]}).slice(0,8);
  if(!top.length)return "";
  return '<div class="card"><h3>❗ Perguntas que a turma mais errou</h3><ol class="turma-erros">'+top.map(function(id){
    var q=QMAP[id],b=BIOMES.filter(function(x){return x.id===q.b})[0];
    return '<li><b>'+cont[id]+' aluno(s)</b> • '+(b?b.emoji+' ':'')+esc(q.q||"")+'</li>';
  }).join("")+'</ol></div>';
}
function turmaAtualizar(){
  var t=document.getElementById("turmaTxt").value;
  try{localStorage.setItem(TURMA_CHAVE,t)}catch(e){}
  render();
}
function turmaLimpar(){
  dialogo({ic:"🗑️",titulo:"Limpar a turma?",texto:"Os códigos colados neste aparelho serão apagados. O progresso dos alunos não muda.",ok:"Limpar",cancelar:"Cancelar",
    onOk:function(){try{localStorage.removeItem(TURMA_CHAVE)}catch(e){}render()}});
}
