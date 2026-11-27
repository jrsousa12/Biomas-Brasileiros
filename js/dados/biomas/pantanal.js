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
  {t:"mc",q:"O que é o “pulso de inundação” do Pantanal?",o:["Um alagamento fixo, que dura o ano todo","O ciclo de cheia e seca dos rios","A migração das aves que chegam em grande número","Um tipo de planta aquática típica da região"],a:1,e:"O ciclo anual de cheia e seca dos rios do bioma."},
  {t:"order",q:"Monte a cadeia alimentar, do produtor ao decompositor:",items:["Plantas aquáticas","Capivara","Onça-pintada","Fungos e bactérias"],e:"Plantas aquáticas alimentam a capivara, caçada pela onça-pintada. Os decompositores fecham o ciclo."},
  {t:"mc",q:"Qual é a ave símbolo do Pantanal?",o:["Tuiuiú","Arara-vermelha","Quero-quero","Tucano"],a:0,e:"O tuiuiú é a ave símbolo do Pantanal, de pescoço vermelho e grande porte."},
  {t:"mc",q:"Em quais estados brasileiros fica o Pantanal?",o:["AM e PA","MS e MT","RS e SC","BA e PI"],a:1,e:"Mato Grosso do Sul e Mato Grosso."},
  {t:"tf",q:"Verdadeiro ou falso: em 2024 a área queimada no Pantanal ficou bem acima da média histórica.",a:true,e:"Verdadeiro. Foi 157% acima da média histórica (MapBiomas)."},
  {t:"mc",q:"Qual destes animais do Pantanal está Em Perigo?",o:["Capivara","Tuiuiú","Ariranha","Jacaré-do-pantanal"],a:2,e:"A ariranha, a “onça-d’água”, passou a Em Perigo na lista nacional de 2026."},
  {t:"mc",q:"O que são ninhais no Pantanal?",o:["Locais onde muitas aves aquáticas se reproduzem","Canais usados apenas por embarcações","Campos secos sem presença de animais","Montanhas rochosas cobertas por neve"],a:0,e:"Ninhais são viveiros naturais usados por aves aquáticas para reprodução."},
  {t:"mc",q:"O que é uma comitiva pantaneira?",o:["Grupo que conduz o gado por longos trajetos","Conjunto de aves reunidas para reprodução","Equipe que constrói barragens nos rios","Grupo que coleta plantas aquáticas"],a:0,e:"Comitivas conduzem o gado entre propriedades e áreas de pastagem."},
  {t:"mc",q:"Para que serve o berrante nas comitivas pantaneiras?",o:["Medir a profundidade das lagoas","Transmitir sinais durante a condução do gado","Capturar peixes nos canais naturais","Retirar água de áreas inundadas"],a:1,e:"O berrante ajuda na comunicação durante a condução do gado."},
  {t:"mc",q:"O que caracteriza um carandazal no Pantanal?",o:["Concentração de cactos em rochas","Presença apenas de plantas aquáticas","Predomínio de palmeiras carandá","Plantação de árvores de clima frio"],a:2,e:"Carandazais são formações vegetais com presença marcante do carandá."},
  {t:"mc",q:"O que caracteriza um cambarazal no Pantanal?",o:["Área com grande presença de cambarás","Lagoa formada por água salgada do mar","Campo sem árvores e seco o ano inteiro","Plantação artificial de pinheiros"],a:0,e:"Cambarazais são formações onde o cambará aparece em grande quantidade."},
  {t:"mc",q:"O que é a piracema?",o:["Deslocamento reprodutivo dos peixes pelos rios","Reunião de aves em grandes árvores","Condução do gado por longas distâncias","Queda das folhas durante a seca"],a:0,e:"Na piracema, muitos peixes se deslocam pelos rios para se reproduzir."},
  {t:"mc",q:"Por que existe o período de defeso?",o:["Para restringir a pesca durante a reprodução","Para aumentar a velocidade das embarcações","Para permitir a captura de qualquer peixe","Para transformar lagoas em pastagens"],a:0,e:"O defeso protege os recursos pesqueiros durante o período reprodutivo."},
  {t:"mc",q:"O que é a decoada no Pantanal?",o:["Alteração natural da qualidade da água na enchente","Viagem de comitivas entre propriedades","Formação de grandes grupos de aves","Crescimento de palmeiras em áreas altas"],a:0,e:"Na decoada, a decomposição de matéria orgânica altera a água e reduz o oxigênio."},
  {t:"mc",q:"O que são salinas na paisagem pantaneira?",o:["Lagoas com água naturalmente alcalina","Montanhas cobertas por cristais de sal","Rios ligados diretamente ao oceano","Campos usados para produzir sal marinho"],a:0,e:"Salinas são lagoas pantaneiras com características químicas próprias."},
  {t:"tf",q:"Verdadeiro ou falso: chalanas são embarcações usadas nos rios pantaneiros.",a:true,e:"Verdadeiro. Elas transportam pessoas e cargas pelos rios da região."},
  {t:"tf",q:"Verdadeiro ou falso: cordilheiras pantaneiras são grandes cadeias de montanhas.",a:false,e:"Falso. No Pantanal, cordilheiras são faixas de terreno um pouco mais elevado."},
  {t:"tf",q:"Verdadeiro ou falso: a captura descontrolada de iscas vivas pode prejudicar ambientes naturais.",a:true,e:"Verdadeiro. A retirada excessiva pode afetar as populações e seus ambientes."},
  {t:"order",q:"Coloque em ordem: monitoramento de uma colônia de aves aquáticas.",items:["Os pesquisadores localizam a colônia","As aves são observadas à distância","As informações são registradas","Os resultados orientam a proteção"],e:"O monitoramento ajuda a conhecer e proteger as colônias de aves."},
  {t:"order",q:"Coloque em ordem: transporte tradicional do gado por uma comitiva.",items:["O trajeto é escolhido","O gado é reunido","A viagem começa","O rebanho chega ao destino"],e:"O transporte do gado exige planejamento e trabalho coletivo."},
  {t:"order",q:"Coloque em ordem: ocorrência natural da decoada.",items:["A água cobre a vegetação","A matéria orgânica começa a decompor","O oxigênio da água diminui","Os peixes podem deixar a área"],e:"A decomposição consome oxigênio e pode afetar os peixes."}],
 sp:[
  {n:"Ariranha",e:"🦦",st:"Em Perigo",f:"Mamífero aquático e sociável que vive em grupos."},
  {n:"Cervo-do-pantanal",e:"🦌",st:"Vulnerável",f:"O maior cervo da América do Sul."},
  {n:"Tuiuiú",e:"🦢",st:"",f:"Ave símbolo do Pantanal."},
  {n:"Jacaré-do-pantanal",e:"🐊",st:"",f:"Muito comum nas lagoas e nos rios do Pantanal."},
  {n:"Pacu",e:"🐟",st:"",f:"Possui dentes fortes e também se alimenta de frutos que caem na água."},
  {n:"Dourado",e:"🐟",st:"",f:"Peixe de escamas conhecido por nadar contra a corrente durante a piracema."},
  {n:"Piúva",e:"🌳",st:"",f:"Sua floração arroxeada se destaca na paisagem durante o período seco."},
  {n:"Cambará",e:"🌼",st:"",f:"Pode formar extensas áreas de vegetação chamadas cambarazais."}]}
);
