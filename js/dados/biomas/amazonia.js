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
  {t:"tf",q:"Verdadeiro ou falso: os manguezais do Pará formam um sétimo bioma brasileiro.",a:false,e:"Falso. O IBGE considera seis biomas continentais. Manguezais fazem parte do Sistema Costeiro-Marinho, associado à Amazônia."},
  {t:"mc",q:"Por que o chão da floresta amazônica recebe pouca luz?",o:["Porque as copas formam uma cobertura fechada","Porque os rios desviam a luz para o céu","Porque o solo absorve toda a luz","Porque há neblina durante o ano inteiro"],a:0,e:"As copas e folhas bloqueiam parte da luz antes que ela alcance o chão."},
  {t:"mc",q:"Qual característica é comum no clima da Amazônia?",o:["Frio intenso durante quase todo o ano","Pouca umidade e chuvas muito raras","Calor e alta umidade em grande parte do ano","Neve frequente nas áreas de floresta baixa"],a:2,e:"O clima amazônico é geralmente quente e úmido."},
  {t:"mc",q:"Por que muitos solos amazônicos têm poucos nutrientes disponíveis?",o:["Porque nunca recebem matéria orgânica","Porque chuvas intensas carregam parte dos nutrientes","Porque ficam cobertos por gelo durante meses","Porque todos são formados apenas por areia"],a:1,e:"Chuvas intensas podem retirar nutrientes das partes superficiais do solo."},
  {t:"mc",q:"Qual adaptação ajuda algumas árvores amazônicas a se sustentar?",o:["Folhas transformadas em espinhos","Troncos ocos cheios de água","Raízes usadas apenas para respirar","Raízes largas junto à base do tronco"],a:3,e:"Raízes largas na base ajudam a sustentar árvores altas."},
  {t:"mc",q:"Qual animal ajuda a espalhar sementes ao comer frutos?",o:["Anta","Jacaré-açu","Poraquê","Gavião-real"],a:0,e:"A anta come frutos e pode espalhar sementes pelas fezes."},
  {t:"mc",q:"O que pode acontecer quando uma área de floresta é queimada?",o:["O solo fica fértil para sempre","A variedade de seres vivos pode diminuir","Os rios deixam de receber chuva","As árvores crescem novamente no mesmo dia"],a:1,e:"O fogo destrói habitats e pode reduzir a biodiversidade."},
  {t:"mc",q:"Para que servem as unidades de conservação?",o:["Substituir florestas por cidades planejadas","Impedir pesquisas feitas por cientistas","Proteger ambientes e orientar o uso da natureza","Transformar todos os rios em reservatórios"],a:2,e:"Essas áreas ajudam a conservar espécies, paisagens e recursos naturais."},
  {t:"mc",q:"Qual prática de povos indígenas contribui para conhecer a biodiversidade?",o:["Observar espécies e ciclos da floresta","Retirar toda a vegetação das aldeias","Trocar plantas nativas por espécies exóticas","Evitar qualquer contato com rios e plantas"],a:0,e:"Conhecimentos tradicionais reúnem observações sobre espécies e ciclos da floresta."},
  {t:"mc",q:"Qual medida ajuda a reduzir a poluição dos rios amazônicos?",o:["Jogar resíduos dentro da mata","Retirar a vegetação das margens","Tratar o esgoto antes do descarte","Abrir garimpos perto dos rios"],a:2,e:"O tratamento reduz a entrada de poluentes nos rios."},
  {t:"tf",q:"Verdadeiro ou falso: a serapilheira é formada por folhas, galhos e outros restos orgânicos.",a:true,e:"Verdadeiro. Esse material cobre o solo e participa da reciclagem de nutrientes."},
  {t:"tf",q:"Verdadeiro ou falso: todas as árvores da Amazônia perdem suas folhas ao mesmo tempo.",a:false,e:"Falso. As espécies não seguem o mesmo ciclo de troca de folhas."},
  {t:"tf",q:"Verdadeiro ou falso: o desmatamento pode alterar o ciclo da água.",a:true,e:"Verdadeiro. A retirada da vegetação reduz a água liberada pelas plantas no ar."},
  {t:"order",q:"Coloque em ordem: etapas da germinação de uma semente.",items:["A semente absorve água","A casca começa a se romper","A raiz jovem cresce","O primeiro broto aparece"],e:"A água inicia mudanças que permitem o crescimento da raiz e do broto."},
  {t:"order",q:"Coloque em ordem: caminho da água pela planta e pelo ar.",items:["A raiz absorve água do solo","A água sobe pelo caule","As folhas liberam vapor","O vapor chega à atmosfera"],e:"A planta transporta água e libera parte dela no ar."},
  {t:"order",q:"Coloque em ordem: recuperação inicial de uma clareira natural.",items:["Uma árvore cai","A luz alcança o chão","Plantas jovens crescem","As copas voltam a ocupar o espaço"],e:"A entrada de luz favorece o crescimento das plantas jovens."}],
 sp:[
  {n:"Onça-pintada",e:"🐆",st:"Vulnerável",f:"Maior felino das Américas."},
  {n:"Boto-cor-de-rosa",e:"🐬",st:"Em Perigo",f:"Golfinho de água doce dos rios amazônicos."},
  {n:"Sauim-de-coleira",e:"🐒",st:"Em Perigo",f:"Pequeno primata que vive em Manaus e arredores."},
  {n:"Pirarucu",e:"🐟",st:"",f:"Um dos maiores peixes de água doce da Amazônia."},
  {n:"Vitória-régia",e:"🌺",st:"",f:"Suas folhas grandes flutuam na superfície de águas calmas."},
  {n:"Castanheira-da-amazônia",e:"🌳",st:"Vulnerável",f:"Seus frutos guardam as sementes conhecidas como castanhas-do-pará."},
  {n:"Gavião-real",e:"🦅",st:"Vulnerável",f:"Constrói grandes ninhos nas partes altas das árvores."},
  {n:"Peixe-boi-da-amazônia",e:"🐋",st:"Vulnerável",f:"É um mamífero aquático que vive nos rios e se alimenta de plantas."}]}
);
