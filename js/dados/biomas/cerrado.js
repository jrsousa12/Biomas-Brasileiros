"use strict";
var BIOMES=BIOMES||[];
BIOMES.push(
{id:"cer",nome:"Cerrado",emoji:"🌾",c1:"#d98a1f",c2:"#a85a00",pct:"23,3%",km:"1.984.554",lema:"A savana mais rica do mundo",
 cards:[
  {e:"🗺️",h:"Savana brasileira",p:"<ul><li>Ocupa <b>23,3%</b> do Brasil: é o <b>2º maior bioma</b>.</li><li>É o <b>único bioma presente nas cinco regiões</b> do país.</li><li>Duas estações bem definidas: <b>chuvosa</b> (aprox. de outubro a abril) e <b>seca</b> (de maio a setembro).</li><li>Solos profundos, ácidos e pobres em nutrientes.</li></ul>"},
  {e:"🌳",h:"Floresta de cabeça para baixo",p:"<ul><li>As plantas têm <b>raízes muito profundas</b> para alcançar a água na seca. Por isso o apelido.</li><li>Plantas típicas: pequizeiro, buriti, ipê-amarelo, baru e lobeira.</li><li>São <b>12.829 espécies de plantas nativas</b> catalogadas (MMA): a savana mais rica do mundo.</li></ul>"},
  {e:"💧",h:"Berço das águas",p:"<ul><li>O Cerrado contribui para <b>8 das 12</b> grandes regiões hidrográficas do Brasil (Embrapa).</li><li>Em 2025, concentrou <b>54,9%</b> de todo o desmatamento do país (MapBiomas), principalmente no <b>Matopiba</b> (MA, TO, PI e BA).</li><li>PRODES 2026: 5.516,69 km², queda de 23,8%.</li></ul>"}],
 q:[
  {t:"mc",q:"Por que o Cerrado é chamado de “floresta de cabeça para baixo”?",o:["Porque as árvores crescem de lado","Porque as plantas têm raízes muito profundas","Porque chove de baixo para cima","Porque o solo é encharcado"],a:1,e:"As raízes profundas buscam água no solo durante a longa estação seca."},
  {t:"mc",q:"Por que o Cerrado é conhecido como “berço das águas”?",o:["Porque tem muitos lagos grandes em sua área central","Porque fica perto do mar e recebe muita água salgada","Porque nasce ali água de 8 das 12 regiões hidrográficas do país","Porque chove forte o ano todo em toda a sua área"],a:2,e:"Nascentes do Cerrado abastecem grandes bacias, como a do São Francisco, a do Tocantins-Araguaia e a do Paraná."},
  {t:"tf",q:"Verdadeiro ou falso: o Cerrado existe apenas na região Centro-Oeste.",a:false,e:"Falso. O Cerrado é o único bioma presente nas cinco regiões brasileiras."},
  {t:"order",q:"Monte a cadeia alimentar, do produtor ao decompositor:",items:["Capim","Cupim","Tamanduá-bandeira","Fungos e bactérias"],e:"O capim é o produtor, o cupim o consumidor primário e o tamanduá-bandeira o consumidor secundário."},
  {t:"mc",q:"Como é o clima do Cerrado?",o:["Chuvoso o ano inteiro","Semiárido, com quase nenhuma chuva","Duas estações: uma chuvosa e outra seca","Frio, com neve no inverno"],a:2,e:"Clima tropical com estação chuvosa e estação seca bem marcadas."},
  {t:"tf",q:"Verdadeiro ou falso: o Cerrado é um bioma pobre e sem importância.",a:false,e:"Falso. É a savana mais rica do mundo, com 12.829 plantas nativas, e abastece várias bacias hidrográficas."},
  {t:"mc",q:"Como se chama a região do Cerrado que mais perdeu vegetação nativa em 2025?",o:["Matopiba (MA, TO, PI, BA)","Pampa gaúcho","Litoral paulista","Pantanal sul"],a:0,e:"O Matopiba concentrou 70% do desmatamento registrado no Cerrado em 2025 (MapBiomas)."},
  {t:"mc",q:"O que é uma vereda no Cerrado?",o:["Uma área seca sem árvores","Uma área úmida com buritis","Uma floresta coberta por neve","Uma plantação de capim exótico"],a:1,e:"A vereda é um ambiente úmido onde o buriti é comum."},
  {t:"mc",q:"Qual animal do Cerrado é comum em campos e áreas abertas?",o:["Boto-cor-de-rosa","Veado-campeiro","Peixe-boi-da-amazônia","Pinguim-de-magalhães"],a:1,e:"O veado-campeiro ocorre em ambientes abertos, como campos e savanas."},
  {t:"mc",q:"Como os frutos do Cerrado ajudam muitos animais?",o:["Fornecem alimento","Secam as nascentes","Endurecem o solo","Eliminam os abrigos"],a:0,e:"Muitos animais comem frutos e podem espalhar suas sementes."},
  {t:"mc",q:"Qual ação ajuda a conservar o solo do Cerrado?",o:["Retirar toda a vegetação","Manter plantas cobrindo o solo","Queimar a área todo mês","Jogar resíduos nas encostas"],a:1,e:"A cobertura vegetal ajuda a proteger o solo contra a erosão."},
  {t:"mc",q:"Por que os corredores ecológicos são importantes?",o:["Ligam áreas naturais separadas","Transformam rios em estradas","Impedem a passagem de animais","Substituem todas as áreas protegidas"],a:0,e:"Eles permitem o deslocamento de animais e a dispersão de sementes entre áreas naturais."},
  {t:"mc",q:"Qual ameaça pode contaminar a água e o solo no Cerrado?",o:["Queda natural de folhas","Dispersão de sementes","Descarte incorreto de resíduos","Formação de nuvens"],a:2,e:"Resíduos descartados de modo incorreto podem contaminar a água e o solo."},
  {t:"mc",q:"Qual fruto nativo aparece em pratos tradicionais do Cerrado?",o:["Tâmara","Pequi","Cereja","Pera"],a:1,e:"O pequi é um fruto nativo usado na culinária regional."},
  {t:"mc",q:"Qual ação ajuda na recuperação de uma área degradada?",o:["Introduzir plantas invasoras","Retirar todas as raízes","Cobrir o solo com plástico","Plantar espécies nativas"],a:3,e:"Espécies nativas ajudam a recuperar a vegetação e os habitats."},
  {t:"mc",q:"Qual característica protege algumas árvores do Cerrado contra o calor do fogo?",o:["Casca grossa","Flores sempre fechadas","Frutos cheios de água","Folhas sem nervuras"],a:0,e:"A casca grossa ajuda a proteger partes vivas do caule contra o calor."},
  {t:"tf",q:"Verdadeiro ou falso: o Cerrado possui campos, savanas e formações florestais.",a:true,e:"Verdadeiro. O bioma apresenta diferentes tipos de vegetação."},
  {t:"tf",q:"Verdadeiro ou falso: incêndios frequentes não prejudicam a vegetação do Cerrado.",a:false,e:"Falso. Incêndios frequentes podem impedir a recuperação completa da vegetação."},
  {t:"tf",q:"Verdadeiro ou falso: povos e comunidades tradicionais utilizam plantas nativas do Cerrado.",a:true,e:"Verdadeiro. Essas plantas fazem parte da alimentação, do artesanato e de outros costumes."},
  {t:"order",q:"Coloque em ordem: germinação de uma semente do Cerrado.",items:["A semente absorve água","A casca começa a se romper","A raiz jovem cresce","O broto aparece"],e:"A absorção de água inicia o desenvolvimento da nova planta."},
  {t:"order",q:"Coloque em ordem: formação de erosão após a retirada da vegetação.",items:["A vegetação é retirada","O solo fica desprotegido","A chuva arrasta partículas","Sulcos aparecem no terreno"],e:"Sem cobertura vegetal, a chuva pode carregar partes do solo."},
  {t:"order",q:"Coloque em ordem: restauração de uma área degradada.",items:["A área é avaliada","Espécies nativas são escolhidas","As mudas são plantadas","O crescimento é acompanhado"],e:"A restauração precisa de avaliação, plantio e acompanhamento."}],
 sp:[
  {n:"Lobo-guará",e:"🦊",st:"Vulnerável",f:"Come muitos frutos, como a lobeira (“fruta-do-lobo”)."},
  {n:"Tamanduá-bandeira",e:"🐜",st:"Vulnerável",f:"Se alimenta de formigas e cupins."},
  {n:"Tatu-canastra",e:"🐾",st:"Vulnerável",f:"O maior dos tatus; cava grandes tocas."},
  {n:"Arara-azul",e:"🦜",st:"Vulnerável",f:"Voltou à lista nacional de ameaçadas em 2026."},
  {n:"Pequi",e:"🌳",st:"",f:"Seu fruto aromático é usado em pratos tradicionais do Cerrado."},
  {n:"Buriti",e:"🌴",st:"",f:"Essa palmeira é comum em veredas e outros ambientes úmidos."},
  {n:"Veado-campeiro",e:"🦌",st:"Vulnerável",f:"É encontrado em campos e outras áreas abertas do Cerrado."},
  {n:"Seriema",e:"🐦",st:"",f:"Passa bastante tempo no chão e possui um canto forte."}]}
);
