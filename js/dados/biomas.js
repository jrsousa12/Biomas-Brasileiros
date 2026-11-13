"use strict";
/* ============ DADOS ============ */
var BIOMES=[
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
  {n:"Pirarucu",e:"🐟",st:"",f:"Um dos maiores peixes de água doce da Amazônia."}]},

{id:"cer",nome:"Cerrado",emoji:"🌾",c1:"#d98a1f",c2:"#a85a00",pct:"23,3%",km:"1.984.554",lema:"A savana mais rica do mundo",
 cards:[
  {e:"🗺️",h:"Savana brasileira",p:"<ul><li>Ocupa <b>23,3%</b> do Brasil: é o <b>2º maior bioma</b>.</li><li>É o <b>único bioma presente nas cinco regiões</b> do país.</li><li>Duas estações bem definidas: <b>chuvosa</b> (aprox. de outubro a abril) e <b>seca</b> (de maio a setembro).</li><li>Solos profundos, ácidos e pobres em nutrientes.</li></ul>"},
  {e:"🌳",h:"Floresta de cabeça para baixo",p:"<ul><li>As plantas têm <b>raízes muito profundas</b> para alcançar a água na seca. Por isso o apelido.</li><li>Plantas típicas: pequizeiro, buriti, ipê-amarelo, baru e lobeira.</li><li>São <b>12.829 espécies de plantas nativas</b> catalogadas (MMA): a savana mais rica do mundo.</li></ul>"},
  {e:"💧",h:"Berço das águas",p:"<ul><li>O Cerrado contribui para <b>8 das 12</b> grandes regiões hidrográficas do Brasil (Embrapa).</li><li>Em 2025, concentrou <b>54,9%</b> de todo o desmatamento do país (MapBiomas), principalmente no <b>Matopiba</b> (MA, TO, PI e BA).</li><li>PRODES 2026: 5.516,69 km², queda de 23,8%.</li></ul>"}],
 q:[
  {t:"mc",q:"Por que o Cerrado é chamado de “floresta de cabeça para baixo”?",o:["Porque as árvores crescem de lado","Porque as plantas têm raízes muito profundas","Porque chove de baixo para cima","Porque o solo é encharcado"],a:1,e:"As raízes profundas buscam água no solo durante a longa estação seca."},
  {t:"mc",q:"Por que o Cerrado é conhecido como “berço das águas”?",o:["Porque tem muitos lagos","Porque fica perto do mar","Porque contribui para 8 das 12 regiões hidrográficas do país","Porque chove o ano todo"],a:2,e:"Nascentes do Cerrado abastecem grandes bacias, como a do São Francisco, a do Tocantins-Araguaia e a do Paraná."},
  {t:"tf",q:"Verdadeiro ou falso: o Cerrado existe apenas na região Centro-Oeste.",a:false,e:"Falso. O Cerrado é o único bioma presente nas cinco regiões brasileiras."},
  {t:"order",q:"Monte a cadeia alimentar, do produtor ao decompositor:",items:["Capim","Cupim","Tamanduá-bandeira","Fungos e bactérias"],e:"O capim é o produtor, o cupim o consumidor primário e o tamanduá-bandeira o consumidor secundário."},
  {t:"mc",q:"Como é o clima do Cerrado?",o:["Chuvoso o ano inteiro","Semiárido, com quase nenhuma chuva","Duas estações: uma chuvosa e outra seca","Frio, com neve no inverno"],a:2,e:"Clima tropical com estação chuvosa e estação seca bem marcadas."},
  {t:"tf",q:"Verdadeiro ou falso: o Cerrado é um bioma pobre e sem importância.",a:false,e:"Falso. É a savana mais rica do mundo, com 12.829 plantas nativas, e abastece várias bacias hidrográficas."},
  {t:"mc",q:"Como se chama a região do Cerrado que mais perdeu vegetação nativa em 2025?",o:["Matopiba (MA, TO, PI, BA)","Pampa gaúcho","Litoral paulista","Pantanal sul"],a:0,e:"O Matopiba concentrou 70% do desmatamento registrado no Cerrado em 2025 (MapBiomas)."}],
 sp:[
  {n:"Lobo-guará",e:"🦊",st:"Vulnerável",f:"Come muitos frutos, como a lobeira (“fruta-do-lobo”)."},
  {n:"Tamanduá-bandeira",e:"🐜",st:"Vulnerável",f:"Se alimenta de formigas e cupins."},
  {n:"Tatu-canastra",e:"🐾",st:"Vulnerável",f:"O maior dos tatus; cava grandes tocas."},
  {n:"Arara-azul",e:"🦜",st:"Vulnerável",f:"Voltou à lista nacional de ameaçadas em 2026."}]},

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
  {n:"Tucano-de-bico-verde",e:"🐦",st:"",f:"Ave de bico colorido que ajuda a espalhar sementes."}]},

{id:"caa",nome:"Caatinga",emoji:"🌵",c1:"#c8553d",c2:"#8d2f1c",pct:"10,1%",km:"862.652",lema:"Só existe no Brasil",
 cards:[
  {e:"☀️",h:"Mata branca",p:"<ul><li>“Caatinga” vem do tupi e quer dizer <b>“mata branca”</b>: na seca as árvores perdem as folhas e a mata fica clara.</li><li>Ocupa <b>10,1%</b> do Brasil: o Nordeste inteiro (menos parte do litoral e do Maranhão) e o norte de MG.</li><li>É o <b>único bioma exclusivamente brasileiro</b>.</li><li>Clima semiárido, chuva escassa e irregular, rios que secam em parte do ano.</li></ul>"},
  {e:"🌵",h:"Plantas espertas",p:"<ul><li><b>Mandacaru</b> e xique-xique: cactos típicos.</li><li><b>Umbuzeiro</b>: guarda água em estruturas das raízes (xilopódios).</li><li>Juazeiro, aroeira, catingueira e carnaúba também são típicas.</li><li>A Caatinga <b>não é pobre</b> em espécies: tem centenas de aves, peixes e répteis, muitos endêmicos.</li></ul>"},
  {e:"🐾",h:"Fauna e ameaças",p:"<ul><li>Animais: tatu-bola, guigó-da-caatinga, arara-azul-de-lear, soldadinho-do-araripe, preá, asa-branca.</li><li>Ameaças: lenha e carvão, pastoreio excessivo, tráfico de aves, <b>desertificação</b> e desmatamento ligado a usinas de energia.</li><li>Soluções: cisternas, <b>convivência com o semiárido</b> e plantio de espécies nativas.</li></ul>"}],
 q:[
  {t:"mc",q:"O que significa “Caatinga” em tupi?",o:["Mata branca","Terra seca","Chão de pedra","Rio escondido"],a:0,e:"Na seca, as árvores perdem as folhas e a mata fica esbranquiçada."},
  {t:"tf",q:"Verdadeiro ou falso: a Caatinga é o único bioma exclusivamente brasileiro.",a:true,e:"Verdadeiro. Todos os seus limites estão dentro do Brasil."},
  {t:"mc",q:"Que estrutura permite ao umbuzeiro guardar água?",o:["Folhas largas","Xilopódios nas raízes","Espinhos longos","Flores grandes"],a:1,e:"Os xilopódios são estruturas de reserva nas raízes."},
  {t:"order",q:"Monte a cadeia alimentar, do produtor ao decompositor:",items:["Capim e folhas","Preá","Jiboia","Fungos e bactérias"],e:"O preá come capim e folhas, a jiboia caça o preá e os decompositores fecham o ciclo."},
  {t:"mc",q:"Qual destas plantas é típica da Caatinga?",o:["Vitória-régia","Araucária","Pequizeiro","Mandacaru"],a:3,e:"O mandacaru é um cacto típico do semiárido."},
  {t:"tf",q:"Verdadeiro ou falso: a Caatinga é pobre em espécies.",a:false,e:"Falso. Tem centenas de espécies de aves, peixes, répteis e anfíbios, muitas só dali."},
  {t:"mc",q:"Qual animal da Caatinga se enrola como uma bola e está Em Perigo?",o:["Jacaré","Tatu-bola","Boto","Tuiuiú"],a:1,e:"O tatu-bola enrola o corpo para se proteger."},
  {t:"mc",q:"Qual tecnologia ajuda as famílias a conviver com a seca no semiárido?",o:["Cisternas para guardar água da chuva","Cortar a mata nativa","Queimar o mato","Plantar apenas eucalipto"],a:0,e:"As cisternas guardam água da chuva para a época da seca."}],
 sp:[
  {n:"Tatu-bola",e:"🦔",st:"Em Perigo",f:"Se enrola em forma de bola para se proteger."},
  {n:"Guigó-da-caatinga",e:"🐒",st:"Em Perigo",f:"Primata pequeno que vive na Caatinga."},
  {n:"Arara-azul-de-lear",e:"🦜",st:"Vulnerável",f:"Sua situação melhorou nos últimos anos."},
  {n:"Soldadinho-do-araripe",e:"🐦",st:"Em Perigo",f:"Pequena ave de cabeça vermelha da Chapada do Araripe."}]},

{id:"pam",nome:"Pampa",emoji:"🌱",c1:"#6aa84f",c2:"#3d7a2c",pct:"2,3%",km:"193.996",lema:"Os campos do Sul",
 cards:[
  {e:"🏞️",h:"Campos do Sul",p:"<ul><li>Ocupa <b>2,3%</b> do Brasil e fica <b>só no Rio Grande do Sul</b>. Continua no Uruguai e na Argentina.</li><li>Relevo de planícies e <b>coxilhas</b> (colinas suaves).</li><li>Clima subtropical com <b>quatro estações marcadas</b>, inverno frio e geadas.</li></ul>"},
  {e:"🌾",h:"Riqueza no campo",p:"<ul><li>Cerca de <b>3 mil espécies de plantas</b>, 450 delas gramíneas (Embrapa).</li><li>Fauna: quero-quero (ave símbolo do RS), ema, joão-de-barro, tuco-tuco e veado-campeiro.</li><li>O campo nativo é um ecossistema, e <b>não</b> “só pasto”.</li></ul>"},
  {e:"🚜",h:"Pressão sobre os campos",p:"<ul><li>A vegetação nativa caiu para <b>44,5%</b> do bioma: perda de <b>30%</b> em 40 anos, a maior perda proporcional entre os biomas (MapBiomas).</li><li>Principais causas: conversão em <b>lavoura (soja)</b> e silvicultura (eucalipto e pinus).</li><li>Também há <b>arenização</b> no sudoeste gaúcho.</li><li>Dia do Pampa: 17 de dezembro.</li></ul>"}],
 q:[
  {t:"mc",q:"Em qual estado brasileiro fica o bioma Pampa?",o:["Santa Catarina","Mato Grosso do Sul","Paraná","Rio Grande do Sul"],a:3,e:"No Brasil, o Pampa existe somente no Rio Grande do Sul."},
  {t:"tf",q:"Verdadeiro ou falso: o Pampa é “só pasto”, sem grande biodiversidade.",a:false,e:"Falso. São cerca de 3 mil espécies de plantas e animais que só existem ali."},
  {t:"mc",q:"Como se chamam as colinas suaves típicas do relevo do Pampa?",o:["Veredas","Coxilhas","Igapós","Cordilheiras"],a:1,e:"Coxilhas são colinas suaves e arredondadas, típicas dos campos do Sul."},
  {t:"order",q:"Monte a cadeia alimentar, do produtor ao decompositor:",items:["Gramíneas","Gafanhoto","Quero-quero","Fungos e bactérias"],e:"As gramíneas são o alimento do gafanhoto, que serve de alimento ao quero-quero. Os decompositores fecham o ciclo."},
  {t:"mc",q:"Qual ave, símbolo do Rio Grande do Sul, vive nos campos?",o:["Tuiuiú","Quero-quero","Arara-azul","Tucano"],a:1,e:"O quero-quero é muito conhecido nos campos gaúchos."},
  {t:"mc",q:"Qual é a principal ameaça ao Pampa hoje?",o:["Inundações do mar","Conversão dos campos em lavoura e plantios de árvores","Falta de sol","Excesso de florestas"],a:1,e:"Soja e silvicultura (eucalipto e pinus) substituem o campo nativo."},
  {t:"tf",q:"Verdadeiro ou falso: o Pampa teve a maior perda proporcional de vegetação nativa entre os biomas em 40 anos.",a:true,e:"Verdadeiro. Perdeu 30% da vegetação nativa e hoje restam 44,5% (MapBiomas)."}],
 sp:[
  {n:"Veado-campeiro",e:"🦌",st:"Vulnerável",f:"Cervídeo típico dos campos abertos."},
  {n:"Quero-quero",e:"🐦",st:"",f:"Ave símbolo do Rio Grande do Sul; vigia o território com gritos."},
  {n:"Tuco-tuco",e:"🐹",st:"",f:"Pequeno roedor que vive em tocas; há espécies que só existem no Pampa."},
  {n:"Ema",e:"🦤",st:"",f:"Ave grande que não voa e corre muito rápido."}]},

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
];
