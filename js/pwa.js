/* ============ APP INSTALÁVEL (PWA) ============ */
(function(){
 /* pede ao navegador para não apagar o progresso quando faltar espaço */
 if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(function(){});
 if("serviceWorker" in navigator && location.protocol!=="file:"){
  window.addEventListener("load",function(){navigator.serviceWorker.register("sw.js").catch(function(){})});
 }
 var btn=document.getElementById("installBtn"),deferred=null;
 window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();deferred=e;btn.hidden=false});
 btn.addEventListener("click",function(){
  if(!deferred)return;
  deferred.prompt();
  deferred.userChoice.finally(function(){deferred=null;btn.hidden=true});
 });
 window.addEventListener("appinstalled",function(){btn.hidden=true});
})();
