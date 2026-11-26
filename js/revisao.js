"use strict";
/* ============ REVISÃO ESPAÇADA (P9) ============
   S.wrong continua sendo a lista de erros (painel, relatório e medalhas usam).
   S.rev[id] = {n: acertos, d: dia em que volta, u: último dia que contou}.
   Errou → volta em 1 dia. 1º acerto → volta em 3 dias. 2º acerto → sai da lista.
   Só 1 acerto por dia conta. Erros antigos (sem S.rev) ficam "para hoje". */
var REV_DIAS = [1, 3];

function revDia() {
  var t = new Date();
  return Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 864e5);
}

function revInfo(id) {
  if (!S.rev) S.rev = {};
  if (!S.rev[id]) S.rev[id] = { n: 0, d: 0, u: -1 };
  return S.rev[id];
}

function revErrou(id) {
  if (S.wrong.indexOf(id) < 0) S.wrong.push(id);
  var r = revInfo(id), h = revDia();
  r.n = 0; r.d = h + REV_DIAS[0]; r.u = h;
}

/* devolve true se a questão saiu da lista */
function revAcertou(id) {
  var ix = S.wrong.indexOf(id);
  if (ix < 0) return false;
  var r = revInfo(id), h = revDia();
  if (r.u === h) return false;
  r.n++; r.u = h;
  if (r.n >= REV_DIAS.length) {
    S.wrong.splice(ix, 1);
    delete S.rev[id];
    return true;
  }
  r.d = h + REV_DIAS[r.n];
  return false;
}

function revPendentes() {
  var h = revDia();
  return S.wrong.filter(function (id) { return QMAP[id] && revInfo(id).d <= h; });
}

/* dias até a próxima questão voltar (0 = já tem para hoje, -1 = nenhuma) */
function revProxima() {
  var h = revDia(), min = -1;
  S.wrong.forEach(function (id) {
    if (!QMAP[id]) return;
    var f = Math.max(0, revInfo(id).d - h);
    if (min < 0 || f < min) min = f;
  });
  return min;
}

function revResumo() {
  var p = revPendentes().length, x = revProxima();
  if (p) return p + " para hoje";
  if (x > 0) return "próxima em " + x + (x === 1 ? " dia" : " dias");
  return "nenhum erro";
}
