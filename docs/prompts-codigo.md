# Prompts para gerar código em outra IA

**Divisão do trabalho**
- **Outra IA:** escreve o **módulo novo completo**, ou seja, a lógica, as telas e o CSS da funcionalidade.
- **Claude Code:** faz só a **montagem**: ligar a tela em `render()` e `go()`, incluir o `<script>` no `index.html`, incluir o arquivo no `FILES` do `sw.js`, tratar o botão voltar e rodar o teste.

**Como usar**
1. Copie o **Bloco CONTEXTO** e, logo abaixo, **um** dos pedidos (P1, P2...).
2. Se o pedido mandar, cole junto o arquivo citado (pode copiar do GitHub).
3. Peça uma revisão com o **Prompt R**, de preferência numa conversa nova.
4. Traga para cá **só o bloco ENTREGA** e diga: "Monte a entrega do P<n>".

---

## Bloco CONTEXTO (copie sempre)

```
Você vai escrever um módulo para um app educativo (PWA) sobre os biomas brasileiros, para alunos do 7º ano. Os textos da tela são em português do Brasil.

Regras técnicas OBRIGATÓRIAS:
- JavaScript puro, ES5, no navegador. Sem bibliotecas, sem import/export, sem classes, sem arrow functions, sem template strings. Use var e function. Comece o arquivo com "use strict";.
- Os scripts são comuns e as funções são globais. Os botões chamam funções por onclick="minhaFuncao()".
- Cada tela é uma função vNome() que RETORNA uma string HTML. O app coloca essa string em #app. Ela começa com headerHTML("Título","Subtítulo") e o conteúdo fica dentro de <main>...</main>.
- Ao mudar de tela, chame go("nomeDaTela"). Para redesenhar a tela atual, chame render().
- Para mostrar qualquer texto vindo de dados, use esc(texto).
- Para pedir confirmação, use dialogo({titulo:"...",texto:"...",ok:"Sim",cancelar:"Não",onOk:function(){...}}). Nunca use alert() nem confirm(). Para um aviso rápido, use avisoRapido("texto").
- O progresso fica no objeto global S. Grave com save(). NÃO mude nem apague campos existentes. Campo novo: inicialize sem quebrar quem já joga, por exemplo: if(!S.medalhas)S.medalhas={};
- Para dar pontos, use addXP(n) e depois save(), porque addXP não grava sozinho.

O que já existe e pode ser usado (não reescreva):
- BIOMES: lista de biomas. Cada bioma tem {id,nome,emoji,c1,c2,pct,km,lema,cards:[{e,h,p}],q:[perguntas],sp:[{n,e,st,f}]}.
  Os ids são "amz","cer","caa","mat","pan" e "pam".
- bio(id) devolve um bioma. shuffle(lista) embaralha a própria lista.
- Perguntas: {t:"mc",q,o:[4 opções],a:índice} | {t:"tf",q,a:true/false} | {t:"order",q,items:[ordem certa]}. Todas têm a explicação em e.
  Cada pergunta tem um q.id fixo. QMAP[id] devolve a pergunta.
- S = {name,xp,trails:{idBioma:{...}},wrong:[ids],got:{},cards:[],mitos:{},final,finalTries}.
- CSS já existente: as classes card, btn, "btn sec", small, tiles e tile. As cores são var(--c1), var(--c2), var(--ok), var(--bad), var(--gold), var(--ink), var(--mut), var(--card) e var(--bg).

Limites:
- Cada arquivo com no máximo 200 linhas. Se precisar de mais, divida em 2 arquivos.
- Layout pensado primeiro para celular. Botões grandes (mínimo de 44 px de altura).

Formato da resposta (siga exatamente):
### ENTREGA
ARQUIVO: js/<caminho>.js
<código completo>
ARQUIVO: css/<nome>.css     (só se precisar de CSS novo, com classes prefixadas pelo nome do módulo)
<código completo>
GANCHOS:
- tela: view "<nome>" → <função vNome>
- entrada: <de onde o aluno chega, por exemplo: um botão em vHome chamando go("<nome>")>
- estado novo em S: <campos e para que servem>
- chama de fora: <funções do app que o módulo usa>
### FIM
Não explique nada fora da ENTREGA.
```

---

## Pedidos

**P1 – Ligar pares (novo tipo de pergunta)**
```
Crie js/quiz-pares.js. É uma atividade em que o aluno liga 4 itens da esquerda (espécies ou características) ao bioma certo, na direita. Ele toca um item, depois toca o bioma. O par certo fica verde e o errado pisca em vermelho.
- Sorteie 4 itens a partir de BIOMES[i].sp (a espécie com o seu bioma).
- Tela vPares(). Comece pela função startPares(). No fim, mostre os acertos e dê addXP(5) para cada par certo. Tenha um botão "Jogar de novo" e outro para voltar com go("home").
```

**P2 – Qual bioma sou eu?**
```
Crie js/qual-bioma.js. O app sorteia um bioma e mostra pistas uma de cada vez (até 4), começando pela mais difícil. A cada pista, o aluno escolhe entre os 6 biomas. Quem acerta com menos pistas ganha mais XP (4 pistas: 40/30/20/10).
- As pistas saem dos dados: lema, pct, uma espécie de sp e o título de um dos cards (h). Não invente fatos.
- Tela vQualBioma(), começando por startQualBioma(). Guarde o recorde em S.qualBioma={melhor:0}.
```

**P3 – Medalhas**
```
Crie js/medalhas.js com uma lista MEDALHAS=[{id,emoji,nome,desc,teste:function(S){return true/false}}] de umas 10 medalhas. Exemplos: concluir 1 trilha, concluir todas, acertar todos os mitos, chegar a 500 XP, zerar a revisão.
- A função checarMedalhas() compara com S.medalhas={id:dataISO}, grava as novas e mostra avisoRapido("🏅 Nova medalha: ...").
- A tela vMedalhas() mostra uma grade: as medalhas ganhas coloridas e as bloqueadas em cinza.
Para trazer junto: cole o arquivo js/estado.js para a IA entender o S.trails.
```

**P4 – Sequência de dias**
```
Crie js/sequencia.js. A função marcarDia() grava S.dias={ultimo:"AAAA-MM-DD",seq:n,max:n} usando a data local. Se jogou ontem, seq+1. Se jogou hoje, não faz nada. Se passou mais de um dia, volta para 1.
- A função seqHTML() retorna um pequeno selo "🔥 n dias seguidos" para mostrar na tela inicial.
```

**P5 – Mapa do progresso**
```
Crie js/mapa.js com a função mapaHTML(), que retorna um SVG SIMPLIFICADO do Brasil dividido em 6 regiões aproximadas (uma por bioma, com formas estilizadas, sem precisão geográfica). Cada região fica com a cor c1 do bioma se S.trails[id] existir e em cinza se não. Tocar numa região chama startTrail("id"). O SVG deve ter viewBox e caber em 100% da largura.
```

**P6 – Glossário**
```
Crie js/dados/glossario.js com var GLOSSARIO=[{t:"Termo",d:"Definição em até 25 palavras, para 12 anos."}], com uns 30 termos (bioma, endemismo, bacia hidrográfica, desmatamento, unidade de conservação, savana...). Crie também js/telas/glossario.js com vGlossario(): uma lista em ordem alfabética com um campo de busca que filtra enquanto o aluno digita (oninput). Ao filtrar, não redesenhe a página inteira: atualize só a lista.
```

**P7 – Relatório para o professor**
```
Crie js/telas/relatorio.js com vRelatorio(). É uma página para imprimir (com @media print escondendo a navegação) que mostra o nome, o XP e o nível, cada trilha (concluída ou não, com os acertos), os mitos acertados, o desafio final e as questões que ainda estão erradas (o texto de QMAP[id].q). Tenha um botão "Imprimir" que chama window.print().
Para trazer junto: cole o arquivo js/telas/resultado.js para a IA ver como os dados são lidos.
```

**P8 – Tela Estudar (📖)**
```
Crie js/telas/estudar.js. É uma tela de leitura do texto completo de um bioma.
Os textos ficam em window.TEXTOS[idBioma] = [{id:"local",t:"📍 Onde fica",p:["parágrafo","parágrafo"]}, ...] (cerca de 11 seções; ids possíveis: local, clima, solo, agua, plantas, animais, povos, economia, ameacas, conservacao, resumo). Pode faltar o texto de algum bioma: nesse caso mostre "Texto em preparação" e um botão para voltar.
- Estado da tela: var ES={b:"amz",sec:-1}. sec=-1 é o sumário; 0, 1, 2... é a seção aberta.
- estudar(id) abre o sumário do bioma. estudarSecao(id,idSecao) abre direto numa seção (vai ser usada depois para "📖 Reveja: <seção>" quando o aluno errar).
- vEstudar(): use setTheme(b.c1,b.c2) e headerHTML("📖 "+b.nome,"Estudar").
  - Sumário: uma lista de botões grandes, um por seção, com ✅ nas seções já lidas.
  - Seção aberta: título, parágrafos (cada um em <p>, com esc()), indicador "3 de 11", botões "◀ Anterior" e "Próxima ▶". Na última seção, troque "Próxima" por "🎯 Fazer a trilha", que chama startTrail(ES.b). Tenha sempre um botão "☰ Sumário".
  - Ao abrir uma seção, marque como lida em S.lidos={idBioma:{idSecao:true}} (inicialize com segurança) e chame save(). Ao trocar de seção, chame render() e window.scrollTo(0,0).
- estudarVoltar(): se uma seção estiver aberta, volta ao sumário e retorna true; se já estiver no sumário, retorna false. (O botão voltar do celular vai usar isso.)
- Fonte do texto com pelo menos 17 px e linhas confortáveis para leitura no celular.
```

**P10 – BNCC no relatório**
```
Crie js/bncc.js com a função bnccHTML(). Ela retorna um bloco HTML "Habilidades da BNCC trabalhadas" para o relatório do professor. Lê a lista BNCC de js/dados/bncc.js (um item por habilidade: {cod:"EF07CI07",txt:"texto oficial",biomas:["amz","cer"]}) e mostra, para cada bioma que o aluno já fez (S.trails[id] existe), o código e o texto das habilidades ligadas a ele, sem repetir código.
- Não invente códigos nem textos. Use só os itens da lista. Se o txt estiver vazio, mostre só o código.
- Crie também js/dados/bncc.js com var BNCC=[...]. Coloque os códigos EF07CI07 e EF07CI08 (já citados no app), com os biomas que achar mais adequados e txt:"" (vazio), para o dono conferir e preencher.
- Tudo que vem de dados passa por esc(). Se nenhuma trilha foi feita, mostre "Nenhuma trilha concluída ainda."
- Cada arquivo com no máximo 200 linhas.
```

**P11 – Compare biomas**
```
Crie js/telas/compara.js com vCompara(). É uma tela em que o aluno escolhe 2 biomas, um toque de cada vez, e vê lado a lado uma tabela com: emoji e nome, pct (% do território), km, lema e uma espécie (a primeira de sp: n e e).
- Estado: var CP={a:"",b:""}. comparaEscolha(id): se CP.a estiver vazio ou os dois já estiverem escolhidos, CP.a=id e CP.b=""; senão CP.b=id.
- Se só um bioma estiver escolhido, mostre "Escolha mais um bioma". Se escolher o mesmo nos dois, mostre "Escolha biomas diferentes".
- Botão "Limpar" (zera CP) e "⬅ Voltar" com go("home").
- Não grava nada em S e não dá XP. Não invente fatos: use só os dados de BIOMES.
- Tudo que vem de dados passa por esc(). Até 200 linhas.
- CSS só se precisar, em css/compara.css, com classes prefixadas por compara-.
```

---

## Prompt R – Revisão (use numa conversa nova)

```
Revise esta ENTREGA de acordo com as regras do Bloco CONTEXTO que está abaixo dela:
1. É ES5 puro, sem import/class/arrow/template string? Tudo o que vem de dados passa por esc()?
2. Algum campo existente de S foi mudado ou apagado? Os campos novos são inicializados com segurança?
3. Usa alert/confirm? Algum arquivo passa de 200 linhas?
4. Tem erro de lógica ou de sintaxe? Algum texto da tela está fora do pt-BR?
Liste os problemas em até 6 linhas e depois devolva a ENTREGA corrigida, no mesmo formato.

<COLE O BLOCO CONTEXTO>
<COLE A ENTREGA>
```

---

## Ordem sugerida
P4 → P3 → P6 → P1 → P2 → P5 → P7 → P8. Vem antes o que é simples e motiva os alunos.

Mais conteúdo de perguntas, mitos e espécies: veja `docs/prompts-conteudo.md`.
