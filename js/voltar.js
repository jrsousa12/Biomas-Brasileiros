"use strict";
/* ============ BOTÃO VOLTAR DO CELULAR ============
   Mantém uma "marca" no histórico do navegador. O voltar do aparelho gasta a marca:
   o app faz o mesmo que o ◀ da tela e põe a marca de volta. Na tela inicial, pergunta se quer sair. */
(function(){
 if(!window.history||!history.pushState)return;
 var saindo=false;
 function marcar(){history.pushState({biomas:1},"")}
 function voltarUmPasso(){
  if(dlgAberto())return dlgFechar();
  if(view==="lesson"&&TR){if(TR.step>0)lessonPrev();else go("home");return}
  if(view==="quiz"&&Q)return askQuit();
  if(view==="home"||view==="name")return perguntarSair();
  if(view==="relatorio"||view==="turma")return go("result");
  if(view==="relampago"){if(!relampagoParar())go("home");return}
  if(view==="estudar"){if(!estudarVoltar())estudarSair();return}
  go("home");
 }
 function perguntarSair(){
  dialogo({ic:"👋",titulo:"Deseja sair do app?",texto:"Seu progresso já está salvo neste aparelho. Você pode voltar quando quiser.",ok:"Sair",cancelar:"Ficar",onOk:sair});
 }
 function sair(){
  saindo=true;history.go(-2); /* pula a marca e a base */
  /* app instalado ou aba nova: não há página anterior, então o voltar não fecha */
  setTimeout(function(){
   if(document.visibilityState!=="visible")return;
   saindo=false;avisoRapido("Para sair, feche o aplicativo ou a aba.");
  },500);
 }
 window.addEventListener("popstate",function(){
  if(saindo)return;
  marcar();voltarUmPasso();
 });
 history.replaceState({biomasBase:1},"");marcar();
})();
