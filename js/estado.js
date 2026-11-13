"use strict";
/* ============ ESTADO ============ */
var S=load();
function load(){try{var j=JSON.parse(localStorage.getItem("biomas7_v1")||"null");if(j&&j.trails)return j}catch(e){}return{name:"",xp:0,trails:{},wrong:[],got:{},cards:[],mitos:{},final:0,finalTries:0}}
function save(){try{localStorage.setItem("biomas7_v1",JSON.stringify(S))}catch(e){}}
var QMAP={};
BIOMES.forEach(function(b){b.q.forEach(function(q,i){q.id=b.id+i;q.b=b.id;QMAP[q.id]=q})});

/* pool do desafio final */
var BN=BIOMES.map(function(b){return b.nome});
function opts4(ans){var o=BN.filter(function(x){return x!==ans});shuffle(o);return [ans].concat(o.slice(0,3))}
var FINALPOOL=[];
(function(){
 function mk(q,ans,e){FINALPOOL.push({t:"mc",q:q,o:opts4(ans),a:0,e:e})}
 mk("Qual é o maior bioma do Brasil?","Amazônia","Amazônia: 49,5% do território.");
 mk("Qual é o menor bioma do Brasil?","Pantanal","Pantanal: 1,8% do território.");
 mk("Qual é o único bioma exclusivamente brasileiro?","Caatinga","Todos os limites da Caatinga estão dentro do Brasil.");
 mk("Qual é o único bioma com lei própria?","Mata Atlântica","Lei 11.428/2006.");
 mk("Qual bioma, no Brasil, existe somente no Rio Grande do Sul?","Pampa","Ele continua no Uruguai e na Argentina.");
 mk("Qual é o único bioma presente nas cinco regiões do país?","Cerrado","Segundo o IBGE (2019).");
 mk("Qual bioma teve a maior queda proporcional de desmatamento em 2025 (−48,4%)?","Pantanal","Dado do MapBiomas RAD2025.");
 mk("Qual bioma concentrou 54,9% de todo o desmatamento do Brasil em 2025?","Cerrado","Principalmente no Matopiba (MapBiomas).");
 mk("Pistas: mandacaru, tatu-bola, chuva escassa e irregular. Que bioma é este?","Caatinga","Semiárido, com plantas adaptadas à seca.");
 mk("Pistas: tuiuiú, cheia e seca, maior planície alagável do mundo. Que bioma é este?","Pantanal","O pulso de inundação molda a vida ali.");
 mk("Pistas: coxilhas, quero-quero, geadas no inverno. Que bioma é este?","Pampa","Campos do Rio Grande do Sul.");
 mk("Pistas: pequi, lobo-guará, “berço das águas”. Que bioma é este?","Cerrado","Savana brasileira de raízes profundas.");
 mk("Pistas: palmito-juçara, mico-leão-dourado, 72% dos brasileiros vivem nele. Que bioma é este?","Mata Atlântica","Hotspot de biodiversidade, restam cerca de 24%.");
 mk("Pistas: igapó, açaí, boto-cor-de-rosa, rios voadores. Que bioma é este?","Amazônia","A maior floresta tropical do Brasil.");
 FINALPOOL.forEach(function(q,i){q.id="f"+i;q.b="fin";QMAP[q.id]=q});
})();

function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function bio(id){for(var i=0;i<BIOMES.length;i++)if(BIOMES[i].id===id)return BIOMES[i]}
var LEVELS=[0,80,200,350,500];
var LNAMES=["Curioso(a)","Explorador(a)","Rastreador(a)","Guardião(ã) de Bioma","Mestre dos Biomas"];
function level(){var l=0;for(var i=0;i<LEVELS.length;i++)if(S.xp>=LEVELS[i])l=i;return l}
function setTheme(c1,c2){document.documentElement.style.setProperty("--c1",c1);document.documentElement.style.setProperty("--c2",c2)}
function addXP(n){S.xp+=n}
