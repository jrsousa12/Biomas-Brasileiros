"use strict";
var BIOMES=BIOMES||[];
BIOMES.push(
{id:"pan",nome:"Pantanal",emoji:"🐊",c1:"#2f80c4",c2:"#1b5688",pct:"1,8%",km:"151.001",lema:"A maior planície alagável do mundo",
 cards:[
  {e:"💦",h:"A planície que alaga",p:"<ul><li>É o <b>menor bioma</b>: 1,8% do Brasil (MS e MT). Continua na Bolívia e no Paraguai.</li><li>É a <b>maior planície alagável do mundo</b>.</li><li>Vive o <b>pulso de inundação</b>: <b>cheia</b> (aprox. de novembro a março) e <b>seca</b> (abril a outubro).</li></ul>"},
  {e:"🦜",h:"Mosaico de vida",p:"<ul><li>Mistura elementos da Amazônia, do Cerrado, da Mata Atlântica e do Chaco: campos alagáveis, cordilheiras e capões.</li><li>Plantas: aguapé, carandá, cambará, acuri.</li><li>Animais: tuiuiú, jacaré-do-pantanal, capivara, onça-pintada, ariranha, cervo-do-pantanal.</li></ul>"},
  {e:"🔥",h:"Fogo e proteção",p:"<ul><li>Em 2024 a área queimada ficou <b>157% acima</b> da média histórica (MapBiomas).</li><li>62% do território já queimou pelo menos uma vez desde 1985.</li><li>Em 2025 o desmatamento caiu 48,4%, a maior queda proporcional entre os biomas.</li><li>É Patrimônio Natural da Humanidade e Reserva da Biosfera (UNESCO). Prevenir o fogo descontrolado é tarefa de todos.</li></ul>"}],
 q:[
  {t:"mc",q:"Qual é o menor bioma brasileiro?",o:["Pampa","Caatinga","Pantanal","Cerrado"],a:2,e:"O Pantanal tem 1,8% do território."},
  {t:"tf",q:"Verdadeiro ou falso: o Pantanal fica alagado o ano inteiro.",a:false,e:"Falso. Ele alterna cheia e seca. Na seca, a água recua para as lagoas."},
  {t:"mc",q:"O que é o “pulso de inundação” do Pantanal?",o:["Um terremoto","O ciclo de cheia e seca dos rios","A migração das aves","Um tipo de planta"],a:1,e:"O ciclo de cheia e seca do rio Paraguai e de seus afluentes molda toda a vida do bioma."},
  {t:"order",q:"Monte a cadeia alimentar, do produtor ao decompositor:",items:["Plantas aquáticas","Capivara","Onça-pintada","Fungos e bactérias"],e:"Plantas aquáticas alimentam a capivara, caçada pela onça-pintada. Os decompositores fecham o ciclo."},
  {t:"mc",q:"Qual é a ave símbolo do Pantanal?",o:["Tuiuiú","Arara-vermelha","Quero-quero","Tucano"],a:0,e:"O tuiuiú é a ave símbolo do Pantanal, de pescoço vermelho e grande porte."},
  {t:"mc",q:"Em quais estados brasileiros fica o Pantanal?",o:["AM e PA","MS e MT","RS e SC","BA e PI"],a:1,e:"Mato Grosso do Sul e Mato Grosso."},
  {t:"tf",q:"Verdadeiro ou falso: em 2024 a área queimada no Pantanal ficou bem acima da média histórica.",a:true,e:"Verdadeiro. Foi 157% acima da média histórica (MapBiomas)."},
  {t:"mc",q:"Qual destes animais do Pantanal está Em Perigo?",o:["Capivara","Tuiuiú","Ariranha","Jacaré-do-pantanal"],a:2,e:"A ariranha, a “onça-d’água”, passou a Em Perigo na lista nacional de 2026."}],
 sp:[
  {n:"Ariranha",e:"🦦",st:"Em Perigo",f:"Mamífero aquático e sociável que vive em grupos."},
  {n:"Cervo-do-pantanal",e:"🦌",st:"Vulnerável",f:"O maior cervo da América do Sul."},
  {n:"Tuiuiú",e:"🦢",st:"",f:"Ave símbolo do Pantanal."},
  {n:"Jacaré-do-pantanal",e:"🐊",st:"",f:"Muito comum nas lagoas e nos rios do Pantanal."}]}
);
