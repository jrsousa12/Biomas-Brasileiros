"use strict";
// Nível de cada pergunta (f=fácil, m=médio, d=desafio), por posição no banco: NIVEL_Q[bioma][posição].
// Posição sem marca (lista curta) = médio. Pergunta nova → acrescentar no FIM da lista do bioma.
var NIVEL_Q={
 amz:"f,d,d,m,m,d,d,m,f,d,m,m,f,m,m,f,m,f,m,m,d,d,m,d,m,m,f,m,m,m,d,f,f,f,m,d,m,d,m,f,f,m,f,m,m,f,f,m,m,m,m,m,d,f,f,f,f,m,m,f,f,f,m,m,d",
 cer:"m,d,m,m,f,f,d,m,m,f,m,m,m,f,f,m,m,f,f,m,d,m,d,d,m,d,m,m,m,d,m,m,d,m,d,m,m,f,m,f,f,m,m,m,m,f,f,m,m,f,m,m,f,m,f,m,f,m,m,f,f,f,f,m,m",
 mat:"m,d,f,f,m,d,d,d,m,m,m,f,m,m,m,f,m,f,m,f,m,d,m,m,d,d,m,d,d,f,f,d,m,m,m,m,f,m,f,f,f,f,f,f,m,m,m,f,f,f,m,m,m,f,f,m,m,m,m,m,m,d,f,f,m,f,m,m",
 caa:"m,m,d,m,f,f,m,m,m,m,m,m,m,m,d,d,m,m,f,m,m,d,m,d,m,d,m,d,m,f,m,m,m,m,f,m,d,m,f,f,f,m,f,f,f,f,m,f,f,f,m,m,m,f,m,f,f,m,f,f,f,f,f,m,m,m",
 pam:"f,m,m,m,m,m,d,m,f,d,d,d,m,d,f,m,m,f,f,m,d,m,m,m,d,m,f,d,m,m,m,m,m,m,d,m,m,f,f,m,f,f,f,f,f,m,f,f,f,m,m,m,f,f,m,f,f,f,m,m,f,f,f,m,m,m",
 pan:"f,f,m,m,m,m,d,d,m,m,m,d,d,m,m,d,d,m,m,m,m,m,d,d,d,m,m,m,m,d,f,m,f,m,m,d,m,m,f,f,f,f,m,f,m,f,f,f,f,m,m,m,m,f,f,f,m,m,f,m,m,f,f,f,d,f,m"
};
