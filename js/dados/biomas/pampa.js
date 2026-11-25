"use strict";
var BIOMES=BIOMES||[];
BIOMES.push(
{id:"pam",nome:"Pampa",emoji:"🌱",c1:"#8a7410",c2:"#4f4207",pct:"2,3%",km:"193.996",lema:"Os campos do Sul",
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
  {t:"mc",q:"Qual é a principal ameaça ao Pampa hoje?",o:["Inundações causadas pela subida do nível do mar","Conversão dos campos em lavoura e plantios de árvores","Falta de sol durante todo o ano nos campos","Excesso de florestas nativas em áreas de campo"],a:1,e:"Soja e silvicultura (eucalipto e pinus) substituem o campo nativo."},
  {t:"tf",q:"Verdadeiro ou falso: o Pampa teve a maior perda proporcional de vegetação nativa entre os biomas em 40 anos.",a:true,e:"Verdadeiro. Perdeu 30% da vegetação nativa e hoje restam 44,5% (MapBiomas)."},
  {t:"mc",q:"O que são capões de mata no Pampa?",o:["Pequenos grupos de árvores entre os campos","Grandes plantações de árvores exóticas","Faixas de areia sem vegetação","Lagos profundos entre montanhas"],a:0,e:"Capões são pequenos trechos de mata cercados por campos."},
  {t:"mc",q:"Qual fruto é comum nos butiazais do Pampa?",o:["Cupuaçu","Butiá","Açaí","Cacau"],a:1,e:"O butiá é um fruto típico usado na alimentação regional."},
  {t:"mc",q:"O que é o campo de espinilho no Pampa?",o:["Uma formação com árvores espinhosas e vegetação campestre","Uma floresta fechada de araucárias muito altas","Uma plantação formada por pinheiros exóticos","Uma área costeira coberta por manguezais"],a:0,e:"O campo de espinilho reúne vegetação campestre e árvores espinhosas."},
  {t:"mc",q:"O que são areais no sudoeste do Pampa?",o:["Áreas com areia exposta e vegetação pouco densa","Praias formadas diariamente pelas marés","Campos cobertos por neve durante o inverno","Lagos rasos cercados por plantas aquáticas"],a:0,e:"Areais são áreas interiores com solo arenoso exposto e vegetação pouco densa."},
  {t:"mc",q:"Por que o pastejo precisa ser ajustado ao campo nativo?",o:["Para equilibrar o consumo e o crescimento das plantas","Para transformar todas as gramíneas em árvores","Para impedir todo crescimento da vegetação","Para substituir espécies nativas por exóticas"],a:0,e:"O manejo ajusta a quantidade de animais à capacidade de crescimento do campo."},
  {t:"mc",q:"Por que algumas aves migratórias usam os campos do Pampa?",o:["Encontram locais de alimentação e descanso","Constroem recifes para procurar peixes","Procuram cavernas cobertas por gelo","Vivem apenas entre árvores muito altas"],a:0,e:"Os campos nativos oferecem áreas de alimentação e parada durante as migrações."},
  {t:"mc",q:"O que diferencia uma pastagem exótica de um campo nativo?",o:["É plantada com espécies trazidas de outras regiões","Tem plantas que nasceram naturalmente no local","É formada apenas por rochas e areia exposta","Surge de uma área sem qualquer ação humana"],a:0,e:"Pastagens exóticas usam plantas introduzidas e podem substituir a vegetação nativa."},
  {t:"mc",q:"Qual produto regional pode ser preparado com butiá?",o:["Geleia","Látex","Carvão mineral","Sal marinho"],a:0,e:"O butiá pode ser usado no preparo de geleias e outros alimentos."},
  {t:"mc",q:"Que prática tradicional está ligada ao manejo do gado no Pampa?",o:["Navegação em igarapés","Extração de látex","Lida campeira","Pesca em recifes"],a:2,e:"A lida campeira reúne conhecimentos e práticas relacionados ao manejo do gado."},
  {t:"tf",q:"Verdadeiro ou falso: geadas podem ocorrer no Pampa durante períodos frios.",a:true,e:"Verdadeiro. O clima do Sul permite a ocorrência de geadas."},
  {t:"tf",q:"Verdadeiro ou falso: a vegetação campestre do Pampa é formada somente por árvores altas.",a:false,e:"Falso. Predominam plantas herbáceas e arbustivas, como gramíneas."},
  {t:"tf",q:"Verdadeiro ou falso: flores silvestres também fazem parte dos campos do Pampa.",a:true,e:"Verdadeiro. Os campos possuem diferentes plantas, incluindo espécies com flores."},
  {t:"order",q:"Coloque em ordem: produção artesanal de lã.",items:["A ovelha é tosquiada","A lã é selecionada","A lã é lavada","As fibras são transformadas em fio"],e:"A lã passa por seleção e limpeza antes de ser transformada em fio."},
  {t:"order",q:"Coloque em ordem: preparo tradicional do charque.",items:["A carne é cortada","O sal é colocado","A carne perde parte da água","O produto fica pronto para conservação"],e:"O sal e a perda de água ajudam a conservar a carne."},
  {t:"order",q:"Coloque em ordem: cuidado de uma ave campestre com seus filhotes.",items:["A ave prepara o ninho","Os ovos são colocados","Os filhotes nascem","Os adultos levam alimento"],e:"Muitas aves campestres fazem ninhos próximos ao solo e cuidam dos filhotes."}],
 sp:[
  {n:"Veado-campeiro",e:"🦌",st:"Vulnerável",f:"Cervídeo típico dos campos abertos."},
  {n:"Quero-quero",e:"🐦",st:"",f:"Ave símbolo do Rio Grande do Sul; vigia o território com gritos."},
  {n:"Tuco-tuco",e:"🐹",st:"",f:"Pequeno roedor que vive em tocas; há espécies que só existem no Pampa."},
  {n:"Ema",e:"🦤",st:"",f:"Ave grande que não voa e corre muito rápido."},
  {n:"Zorrilho",e:"🦨",st:"",f:"Quando ameaçado, libera um líquido de odor forte para se defender."},
  {n:"Sapinho-de-barriga-vermelha",e:"🐸",st:"",f:"Pequeno anfíbio encontrado em ambientes campestres e áreas úmidas."},
  {n:"Nhandavaí",e:"🌿",st:"",f:"Arbusto espinhoso encontrado na formação do Espinilho."},
  {n:"Cacto-do-campo",e:"🌵",st:"",f:"Cresce em afloramentos rochosos e suporta períodos com pouca água."}]}
);
