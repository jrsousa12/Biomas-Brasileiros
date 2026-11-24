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
  {t:"mc",q:"Quantos por cento dos brasileiros vivem na área da Mata Atlântica?",o:["Cerca de 10%","Cerca de 30%","Cerca de 50%","Cerca de 72%"],a:3,e:"Cerca de 72% da população brasileira vive na Mata Atlântica, o que aumenta a pressão sobre ela."},
  {t:"mc",q:"O que são plantas epífitas?",o:["Plantas que vivem somente debaixo da terra","Plantas que crescem apoiadas em outras plantas","Plantas que capturam peixes nos rios","Plantas que não produzem sementes"],a:1,e:"Epífitas usam outras plantas como suporte, mas não retiram alimento delas."},
  {t:"mc",q:"Qual ambiente associado à Mata Atlântica ocorre em solos arenosos próximos ao litoral?",o:["Restinga","Vereda","Pantanal","Pampa"],a:0,e:"A restinga se desenvolve em terrenos arenosos da faixa litorânea."},
  {t:"mc",q:"Como a mata ciliar ajuda os rios?",o:["Aumenta o descarte de lixo","Protege as margens contra a erosão","Impede toda entrada de luz","Transforma água doce em salgada"],a:1,e:"As raízes ajudam a segurar o solo e proteger as margens."},
  {t:"mc",q:"Qual animal pode espalhar sementes ao comer frutos da floresta?",o:["Onça-parda","Jaguatirica","Anta","Gavião"],a:2,e:"A anta come frutos e pode deixar sementes em outros locais."},
  {t:"mc",q:"Qual ameaça separa populações de animais em pequenos trechos de floresta?",o:["Fragmentação da mata","Formação de nuvens","Queda natural de folhas","Polinização das flores"],a:0,e:"A fragmentação divide a floresta e dificulta o deslocamento dos animais."},
  {t:"mc",q:"Como os corredores ecológicos ajudam a fauna?",o:["Ligam fragmentos de vegetação","Substituem todas as florestas","Impedem a passagem de animais","Eliminam plantas nativas"],a:0,e:"Eles conectam áreas naturais e facilitam o deslocamento dos animais."},
  {t:"mc",q:"Por que a palmeira-juçara deve ser protegida?",o:["Porque é uma planta aquática invasora","Porque a extração do palmito pode matá-la","Porque cresce apenas em áreas urbanas","Porque impede outras árvores de crescer"],a:1,e:"A extração do palmito corta a parte de crescimento e mata a palmeira."},
  {t:"mc",q:"Qual ação ajuda a recuperar uma área degradada da Mata Atlântica?",o:["Plantar espécies nativas","Introduzir espécies invasoras","Retirar toda a vegetação","Cobrir o solo com concreto"],a:0,e:"Plantas nativas ajudam a reconstruir a vegetação e os habitats."},
  {t:"mc",q:"Qual comunidade tradicional mantém práticas ligadas ao mar e à floresta?",o:["Caiçara","Pantaneira","Sertaneja","Ribeirinha amazônica"],a:0,e:"Comunidades caiçaras vivem no litoral e mantêm práticas ligadas ao mar e à floresta."},
  {t:"tf",q:"Verdadeiro ou falso: bromélias podem guardar água entre suas folhas.",a:true,e:"Verdadeiro. A forma das folhas permite o acúmulo de água da chuva."},
  {t:"tf",q:"Verdadeiro ou falso: os manguezais possuem apenas água doce.",a:false,e:"Falso. Nos manguezais, a água dos rios encontra a água salgada do mar."},
  {t:"tf",q:"Verdadeiro ou falso: fragmentos florestais podem proteger nascentes e animais silvestres.",a:true,e:"Verdadeiro. Mesmo pequenos remanescentes podem conservar habitats e recursos hídricos."},
  {t:"order",q:"Coloque em ordem: dispersão de uma semente por um animal.",items:["O animal encontra um fruto","O animal come o fruto","O animal se desloca pela floresta","A semente é deixada em outro local"],e:"Os animais podem transportar sementes para longe da planta de origem."},
  {t:"order",q:"Coloque em ordem: formação de erosão em uma encosta desmatada.",items:["A vegetação é retirada","O solo fica desprotegido","A chuva arrasta partículas","Sulcos aparecem na encosta"],e:"Sem a proteção das plantas, a chuva pode carregar partes do solo."},
  {t:"order",q:"Coloque em ordem: restauração de um fragmento florestal.",items:["A área degradada é avaliada","Espécies nativas são escolhidas","As mudas são plantadas","O crescimento é acompanhado"],e:"A restauração exige avaliação, plantio e acompanhamento."}],
 sp:[
  {n:"Mico-leão-dourado",e:"🐒",st:"Em Perigo",f:"Símbolo da conservação; vive em florestas do Rio de Janeiro."},
  {n:"Muriqui-do-sul",e:"🐒",st:"Em Perigo",f:"Maior primata das Américas fora da Amazônia... e muito dócil."},
  {n:"Muriqui-do-norte",e:"🐒",st:"Criticamente em Perigo",f:"Primata raríssimo da Mata Atlântica."},
  {n:"Tucano-de-bico-verde",e:"🐦",st:"",f:"Ave de bico colorido que ajuda a espalhar sementes."},
  {n:"Palmito-juçara",e:"🌴",st:"Vulnerável",f:"Seus frutos servem de alimento para muitos animais da floresta."},
  {n:"Papagaio-chauá",e:"🦜",st:"Em perigo",f:"Vive em florestas e se alimenta de frutos, sementes e brotos."},
  {n:"Mutum-do-sudeste",e:"🐦",st:"Em perigo",f:"Procura frutos, folhas e pequenos animais no chão da floresta."},
  {n:"Queixada",e:"🐗",st:"Vulnerável",f:"Vive em grupos e pode ajudar na dispersão de sementes."}]}
);
