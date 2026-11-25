"use strict";
/* P4 – Sequência de dias: S.dias={ultimo:"AAAA-MM-DD",seq,max}. marcarDia() no fim do quiz; seqHTML() na tela inicial. */

function dataLocalChave(data) {
  var ano = data.getFullYear();
  var mes = String(data.getMonth() + 1);
  var dia = String(data.getDate());

  if (mes.length < 2) {
    mes = "0" + mes;
  }
  if (dia.length < 2) {
    dia = "0" + dia;
  }

  return ano + "-" + mes + "-" + dia;
}

function diaEmUTC(chave) {
  var partes = String(chave).split("-");

  if (partes.length !== 3) {
    return NaN;
  }

  return Date.UTC(
    parseInt(partes[0], 10),
    parseInt(partes[1], 10) - 1,
    parseInt(partes[2], 10)
  );
}

function marcarDia() {
  var hoje = dataLocalChave(new Date());
  var seq = 1;
  var max = 1;
  var diferenca;

  if (S.dias && S.dias.ultimo === hoje) {
    return;
  }

  if (S.dias) {
    seq = parseInt(S.dias.seq, 10) || 0;
    max = parseInt(S.dias.max, 10) || 0;
    diferenca = (diaEmUTC(hoje) - diaEmUTC(S.dias.ultimo)) / 86400000;

    if (diferenca === 1) {
      seq += 1;
    } else {
      seq = 1;
    }
  }

  if (seq > max) {
    max = seq;
  }

  S.dias = {
    ultimo: hoje,
    seq: seq,
    max: max
  };

  save();
}

function seqHTML() {
  var seq, atraso;

  if (!S.dias) {
    return "";
  }

  seq = parseInt(S.dias.seq, 10) || 0;
  atraso = (diaEmUTC(dataLocalChave(new Date())) - diaEmUTC(S.dias.ultimo)) / 86400000;

  /* Sequência quebrada (mais de um dia sem jogar) ou inválida: não mostra o selo. */
  if (seq < 1 || !(atraso <= 1)) {
    return "";
  }

  return '<span class="small">🔥 ' + esc(String(seq)) +
    (seq === 1 ? " dia seguido" : " dias seguidos") + "</span>";
}
