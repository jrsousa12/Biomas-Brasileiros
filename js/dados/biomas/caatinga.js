"use strict";
var BIOMES=BIOMES||[];
BIOMES.push(
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
  {t:"mc",q:"Qual tecnologia ajuda as famílias a conviver com a seca no semiárido?",o:["Cisternas para guardar água da chuva","Cortar a mata nativa","Queimar o mato","Plantar apenas eucalipto"],a:0,e:"As cisternas guardam água da chuva para a época da seca."},
  {t:"mc",q:"O que acontece com muitos rios da Caatinga durante a seca?",o:["Congelam completamente","Ficam com água salgada","Param de correr por um período","Transformam-se em lagos profundos"],a:2,e:"Muitos rios são intermitentes e deixam de correr durante parte da seca."},
  {t:"mc",q:"O que significa dizer que uma planta é caducifólia?",o:["Mantém todas as folhas durante a seca","Perde as folhas em certa época","Vive somente dentro da água","Produz flores durante o ano inteiro"],a:1,e:"Plantas caducifólias perdem as folhas em determinada época, como durante a seca."},
  {t:"mc",q:"Por que o caule verde de alguns cactos é importante?",o:["Realiza fotossíntese","Produz água da chuva","Atrai peixes dos rios","Forma sementes no solo"],a:0,e:"Como as folhas viraram espinhos, o caule verde realiza fotossíntese."},
  {t:"mc",q:"Por que muitos animais da Caatinga ficam mais ativos à noite?",o:["Para evitar parte do calor do dia","Para encontrar neve nas serras","Para beber água do mar","Para manter o corpo sempre molhado"],a:0,e:"A noite costuma ser mais fresca, o que ajuda os animais a enfrentar o calor."},
  {t:"mc",q:"O que é um lajedo na paisagem da Caatinga?",o:["Uma área de rocha exposta","Uma floresta sempre alagada","Uma duna coberta por gelo","Um rio com água salgada"],a:0,e:"Lajedos são superfícies rochosas expostas presentes no semiárido."},
  {t:"mc",q:"Qual material é retirado das folhas da carnaúba?",o:["Cera","Borracha","Algodão","Cortiça"],a:0,e:"As folhas da carnaúba fornecem uma cera usada em diferentes produtos."},
  {t:"mc",q:"Por que vários solos da Caatinga têm muitas pedras aparentes?",o:["São rasos em muitas áreas","Ficam congelados no inverno","Recebem areia do oceano","São cobertos por conchas"],a:0,e:"Em muitas áreas, os solos rasos deixam rochas e pedras visíveis."},
  {t:"mc",q:"O que é estivação em alguns animais do semiárido?",o:["Um período de pouca atividade durante calor ou seca","Uma viagem anual para regiões com neve","Uma troca completa da pele toda semana","Uma alimentação feita apenas de flores"],a:0,e:"Na estivação, o animal reduz suas atividades para enfrentar o calor ou a falta de água."},
  {t:"mc",q:"Que mudança chama atenção na Caatinga logo após boas chuvas?",o:["O surgimento rápido de folhas e flores","O congelamento das pedras","A formação de água salgada","O desaparecimento das plantas"],a:0,e:"Com água disponível, muitas plantas produzem folhas e flores rapidamente."},
  {t:"tf",q:"Verdadeiro ou falso: rios intermitentes podem parar de correr durante a seca.",a:true,e:"Verdadeiro. O fluxo de muitos rios depende das chuvas."},
  {t:"tf",q:"Verdadeiro ou falso: a vegetação da Caatinga permanece igual durante todo o ano.",a:false,e:"Falso. A paisagem muda bastante entre as épocas seca e chuvosa."},
  {t:"tf",q:"Verdadeiro ou falso: os lajedos podem servir de abrigo para animais entre suas fendas.",a:true,e:"Verdadeiro. Fendas nas rochas oferecem locais de abrigo."},
  {t:"order",q:"Coloque em ordem: mudança da Caatinga com a chegada das chuvas.",items:["A chuva molha o solo","As plantas absorvem água","Folhas e flores aparecem","A paisagem ganha novas cores"],e:"A água disponível provoca mudanças rápidas na vegetação."},
  {t:"order",q:"Coloque em ordem: resposta de uma planta caducifólia à seca.",items:["As chuvas diminuem","A água no solo fica escassa","A planta perde as folhas","A perda de água é reduzida"],e:"A queda das folhas ajuda a planta a enfrentar o período seco."},
  {t:"order",q:"Coloque em ordem: atividade de um animal noturno da Caatinga.",items:["O sol se põe","A temperatura diminui","O animal deixa o abrigo","O animal procura alimento"],e:"A atividade noturna permite evitar parte do calor do dia."}],
 sp:[
  {n:"Tatu-bola",e:"🦔",st:"Em Perigo",f:"Se enrola em forma de bola para se proteger."},
  {n:"Guigó-da-caatinga",e:"🐒",st:"Em Perigo",f:"Primata pequeno que vive na Caatinga."},
  {n:"Arara-azul-de-lear",e:"🦜",st:"Vulnerável",f:"Sua situação melhorou nos últimos anos."},
  {n:"Soldadinho-do-araripe",e:"🐦",st:"Em Perigo",f:"Pequena ave de cabeça vermelha da Chapada do Araripe."},
  {n:"Ararinha-azul",e:"🦜",st:"Extinta na natureza",f:"Sumiu da natureza e voltou a ser solta no sertão baiano em 2022."},
  {n:"Jacucaca",e:"🐦",st:"Vulnerável",f:"Ave terrestre endêmica que procura frutos e sementes no chão."},
  {n:"Zabelê",e:"🐦",st:"Vulnerável",f:"Ave terrestre das matas secas, conhecida por seu canto."},
  {n:"Arapaçu-do-nordeste",e:"🐦",st:"Vulnerável",f:"Procura insetos enquanto sobe pelos troncos das árvores."}]}
);
