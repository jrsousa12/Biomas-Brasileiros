"use strict";
/* ============ CAIXA DE CONFIRMAÇÃO ============
   dialogo({ic,titulo,texto,ok,cancelar,onOk}). Tocar fora ou em "cancelar" fecha sem fazer nada. */
function dialogo(o){
 dlgFechar();
 var d=document.createElement("div");d.id="dlg";d.className="dlg";
 d.innerHTML='<div class="dlg-box pop" role="dialog" aria-modal="true"><div class="dlg-ic">'+(o.ic||"❓")+'</div><h3>'+o.titulo+'</h3><p>'+(o.texto||"")+'</p><button class="btn" id="dlgOk">'+(o.ok||"OK")+'</button><button class="btn sec" id="dlgNo">'+(o.cancelar||"Cancelar")+'</button></div>';
 d.addEventListener("click",function(e){if(e.target===d)dlgFechar()});
 document.body.appendChild(d);
 document.getElementById("dlgNo").onclick=dlgFechar;
 document.getElementById("dlgOk").onclick=function(){dlgFechar();if(o.onOk)o.onOk()};
 document.getElementById("dlgNo").focus();
}
function dlgAberto(){return !!document.getElementById("dlg")}
function dlgFechar(){var d=document.getElementById("dlg");if(d)d.remove()}
function avisoRapido(txt){
 var t=document.createElement("div");t.className="toast";t.textContent=txt;document.body.appendChild(t);
 setTimeout(function(){t.remove()},3000);
}
