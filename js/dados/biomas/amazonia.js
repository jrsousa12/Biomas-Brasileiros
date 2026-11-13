"use strict";
var BIOMES=BIOMES||[];
BIOMES.push(
{id:"amz",nome:"Amazônia",emoji:"🌳",c1:"#1b8a4b",c2:"#0d5c33",pct:"49,5%",km:"4.210.931",lema:"A gigante verde",
 cards:[
  {e:"🌎",h:"O gigante do Brasil",p:"<ul><li>Ocupa <b>49,5%</b> do território brasileiro (cerca de 4,2 milhões de km²): é o <b>maior bioma</b> do país.</li><li>Clima <b>equatorial</b>: quente o ano todo e muito úmido.</li><li>O solo é pobre em nutrientes. A floresta se sustenta pela <b>reciclagem rápida</b> das folhas caídas.</li></ul>"},
  {e:"🌿",h:"Águas e plantas",p:"<ul><li><b>Terra firme</b>: nunca alaga.</li><li><b>Várzea</b>: alaga com rios de água barrenta.</li><li><b>Igapó</b>: alaga com rios de água escura.</li><li>Plantas típicas: castanheira, seringueira, açaizeiro, vitória-régia e samaúma.</li></ul>"},
  {e:"🔥",h:"Pará e ameaças",p:"<ul><li>PRODES 2026 (estimativa): <b>3.335 km²</b> desmatados, a menor taxa desde 1988 (queda de 41,8%).</li><li>O <b>Pará</b> respondeu por 33,9% desse total.</li><li>Outras ameaças: garimpo, queimadas e secas extremas.</li><li>Os <b>manguezais do litoral paraense</b> são um ecossistema costeiro ligado à Amazônia, e não um sétimo bioma.</li></ul>"}],
 q:[
  {t:"mc",q:"Qual bioma ocupa quase metade do território brasileiro?",o:["Amazônia","Cerrado","Mata Atlântica","Pampa"],a:0,e:"A Amazônia tem 49,5% do território (IBGE)."},
  {t:"tf",q:"Verdadeiro ou falso: a floresta amazônica madura produz muito mais oxigênio do que consome.",a:false,e:"Falso. A floresta consome, ao respirar, quase todo o oxigênio que produz. Sua importância está no carbono, na biodiversidade e nos “rios voadores”."},
  {t:"mc",q:"Como se chama a floresta que alaga periodicamente com rios de água escura?",o:["Terra firme","Igapó","Várzea","Campinarana"],a:1,e:"Igapó é alagado por rios de água escura. A várzea alaga com rios de água barrenta."},
  {t:"order",q:"Monte a cadeia alimentar, do produtor ao decompositor:",items:["Castanheira (frutos)","Cutia","Jaguatirica","Fungos e bactérias"],e:"A castanheira (produtor) alimenta a cutia, que é caçada pela jaguatirica. Fungos e bactérias decompõem tudo no fim. A cutia ainda “planta” castanheiras ao enterrar castanhas!"},
  {t:"mc",q:"O que são os “rios voadores”?",o:["Rios que correm sobre as montanhas","A umidade da floresta levada pelos ventos, que ajuda a formar chuva em outras regiões","Rios que secam no verão","Cachoeiras muito altas"],a:1,e:"A floresta transpira vapor de água, e os ventos levam essa umidade para outras regiões do Brasil."},
  {t:"mc",q:"Segundo o PRODES 2026, qual estado teve a maior área desmatada na Amazônia?",o:["Amazonas","Mato Grosso","Pará","Acre"],a:2,e:"O Pará teve 1.130 km² (33,9% do total). Mesmo assim, o Pará também ajudou a puxar a queda."},
  {t:"tf",q:"Verdadeiro ou falso: os manguezais do Pará formam um sétimo bioma brasileiro.",a:false,e:"Falso. O IBGE considera seis biomas continentais. Manguezais fazem parte do Sistema Costeiro-Marinho, associado à Amazônia."}],
 sp:[
  {n:"Onça-pintada",e:"🐆",st:"Vulnerável",f:"Maior felino das Américas."},
  {n:"Boto-cor-de-rosa",e:"🐬",st:"Em Perigo",f:"Golfinho de água doce dos rios amazônicos."},
  {n:"Sauim-de-coleira",e:"🐒",st:"Em Perigo",f:"Pequeno primata que vive em Manaus e arredores."},
  {n:"Pirarucu",e:"🐟",st:"",f:"Um dos maiores peixes de água doce da Amazônia."}]}
);
