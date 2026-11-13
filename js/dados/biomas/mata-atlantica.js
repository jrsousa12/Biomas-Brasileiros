"use strict";
var BIOMES=BIOMES||[];
BIOMES.push(
{id:"mat",nome:"Mata Atlântica",emoji:"🌴",c1:"#2a9d8f",c2:"#176b61",pct:"13,0%",km:"1.107.285",lema:"Do litoral ao interior",
 cards:[
  {e:"🌊",h:"Onde fica",p:"<ul><li>Ocupa <b>13%</b> do território (IBGE), com uma faixa do litoral do RN ao RS e áreas no interior.</li><li>É onde vivem cerca de <b>72% dos brasileiros</b>.</li><li>O nome do país vem do <b>pau-brasil</b>, árvore da Mata Atlântica.</li></ul>"},
  {e:"🌲",h:"Muitas florestas em uma",p:"<ul><li>Tem florestas densas e úmidas, a <b>mata de araucárias</b> do Sul, campos de altitude e ecossistemas associados, como manguezais e restingas.</li><li>Plantas típicas: palmito-juçara, jequitibá, ipê, bromélias e orquídeas.</li><li>É um <b>hotspot</b>: muita biodiversidade e muitas espécies que só existem aqui, sob forte ameaça.</li></ul>"},
  {e:"📉",h:"O que restou",p:"<ul><li>Restam cerca de <b>24%</b> da cobertura original; só ~12,4% são florestas maduras bem preservadas.</li><li>Em 2024–2025 o desmatamento de florestas maduras (cerca de <b>8,7 mil ha</b>) foi o <b>menor em 40 anos</b>.</li><li>É o <b>único bioma com lei própria</b>: a Lei da Mata Atlântica (Lei 11.428/2006).</li></ul>"}],
 q:[
  {t:"mc",q:"Qual é o único bioma brasileiro com lei própria?",o:["Caatinga","Mata Atlântica","Pampa","Amazônia"],a:1,e:"A Lei da Mata Atlântica é a Lei 11.428/2006."},
  {t:"mc",q:"Aproximadamente quanto da Mata Atlântica original ainda resta?",o:["Cerca de 24%","Cerca de 80%","Cerca de 50%","Cerca de 95%"],a:0,e:"Restam cerca de 24% da cobertura original (SOS Mata Atlântica)."},
  {t:"tf",q:"Verdadeiro ou falso: o pau-brasil, que deu nome ao país, é uma árvore da Mata Atlântica.",a:true,e:"Verdadeiro. O nome “Brasil” vem dessa árvore, muito explorada desde 1500."},
  {t:"mc",q:"Qual árvore forma a famosa “mata de araucárias” do Sul?",o:["Castanheira","Buriti","Araucária","Carnaúba"],a:2,e:"A araucária (pinheiro-do-paraná) forma a Floresta Ombrófila Mista."},
  {t:"order",q:"Monte a cadeia alimentar, do produtor ao decompositor:",items:["Palmito-juçara (frutos)","Cutia","Jaguatirica","Fungos e bactérias"],e:"Os frutos do palmito-juçara alimentam a cutia, que serve de alimento à jaguatirica. No fim, fungos e bactérias decompõem."},
  {t:"mc",q:"O que significa dizer que a Mata Atlântica é um “hotspot de biodiversidade”?",o:["Que é muito quente","Que tem muitas espécies, muitas só daqui, e está muito ameaçada","Que tem muitos vulcões","Que é o bioma mais seco"],a:1,e:"Hotspot é uma área de alta riqueza e muitas espécies endêmicas, sob forte ameaça."},
  {t:"tf",q:"Verdadeiro ou falso: em 2024–2025 o desmatamento de florestas maduras da Mata Atlântica foi o menor em 40 anos.",a:true,e:"Verdadeiro. Foi cerca de 8,7 mil ha, a primeira vez abaixo de 10 mil ha (Atlas SOS Mata Atlântica/INPE)."},
  {t:"mc",q:"Quantos por cento dos brasileiros vivem na área da Mata Atlântica?",o:["Cerca de 10%","Cerca de 30%","Cerca de 50%","Cerca de 72%"],a:3,e:"Cerca de 72% da população brasileira vive na Mata Atlântica, o que aumenta a pressão sobre ela."}],
 sp:[
  {n:"Mico-leão-dourado",e:"🐒",st:"Em Perigo",f:"Símbolo da conservação; vive em florestas do Rio de Janeiro."},
  {n:"Muriqui-do-sul",e:"🐒",st:"Em Perigo",f:"Maior primata das Américas fora da Amazônia... e muito dócil."},
  {n:"Muriqui-do-norte",e:"🐒",st:"Criticamente em Perigo",f:"Primata raríssimo da Mata Atlântica."},
  {n:"Tucano-de-bico-verde",e:"🐦",st:"",f:"Ave de bico colorido que ajuda a espalhar sementes."}]}
);
