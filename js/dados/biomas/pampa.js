"use strict";
var BIOMES=BIOMES||[];
BIOMES.push(
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
  {n:"Ema",e:"🦤",st:"",f:"Ave grande que não voa e corre muito rápido."}]}
);
