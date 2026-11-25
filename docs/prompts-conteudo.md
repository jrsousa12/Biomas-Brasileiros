# Prompts para gerar conteúdo em outro app

Para usar:
1. Copie o **Bloco BASE** e, logo abaixo dele, **um** dos prompts (A, B ou C).
2. Troque `<BIOMA>` pelo nome do bioma e cole o conteúdo atual do arquivo dele, `js/dados/biomas/<bioma>.js` (pode copiar do GitHub). Assim a IA não repete o que já existe.
3. Passe a resposta pelo **Prompt D** (revisão), de preferência numa conversa nova.
4. Traga para o Claude Code só o bloco final, com a frase: "Acrescente no FIM do `q:` (ou `sp:`, ou `MITOS`) de `<arquivo>`".

> Importante: as perguntas novas entram sempre **no fim** da lista. Inserir no meio bagunça o progresso dos alunos.

---

## Bloco BASE (copie sempre)

```
Você é professor(a) de Ciências do 7º ano no Brasil e escreve conteúdo para um app educativo sobre os biomas brasileiros.

Regras:
- Português do Brasil, frases curtas e linguagem para alunos de 12 anos.
- Use só fatos verificáveis e cite a fonte entre parênteses quando houver número (IBGE, MMA, MapBiomas, INPE/PRODES, Embrapa, ICMBio).
- Não invente números. Se não tiver certeza, não use o dado.
- Nada de pegadinha ou de duas respostas possíveis.
- Responda SOMENTE com o código pedido, sem comentários e sem markdown.
- Use aspas duplas retas ("). Dentro do texto, use aspas curvas (“ ”).
- Cada objeto em uma linha, terminando com vírgula.
```

---

## Prompt A — Perguntas de quiz

```
Bioma: <BIOMA>
Conteúdo que já existe (não repita assuntos nem perguntas):
<COLE AQUI A SAÍDA DE: node tools/contexto.js <bioma>>

Crie 15 perguntas NOVAS: 9 do tipo "mc", 3 "tf" e 3 "order". Uma pergunta por assunto, sem repetir assunto entre elas. Formatos exatos:

{t:"mc",q:"Pergunta?",o:["opção 0","opção 1","opção 2","opção 3"],a:2,e:"Explicação curta do porquê."},
{t:"tf",q:"Verdadeiro ou falso: afirmação.",a:true,e:"Verdadeiro. Explicação."},
{t:"order",q:"Coloque em ordem: ...",items:["1º","2º","3º","4º"],e:"Explicação."},

Detalhes:
- mc: exatamente 4 opções. "a" é o índice da correta (0 a 3); varie a posição. Opções erradas plausíveis e de tamanho parecido com a certa.
- tf: "a" é true ou false. Misture verdadeiras e falsas, sem padrão.
- order: 4 itens já na ORDEM CORRETA (o app embaralha). Bom para cadeias alimentares, etapas e sequências no tempo.
- "e" com no máximo 2 frases; comece o tf com "Verdadeiro." ou "Falso.".
- Temas variados: clima, solo, flora, fauna, água, povos e cultura, ameaças, conservação.
```

---

## Prompt B — Mito ou verdade

```
Conteúdo que já existe (não repita):
<COLE AQUI A SAÍDA DE: node tools/contexto.js mitos>

Crie 6 afirmações NOVAS sobre os biomas brasileiros: 1 por bioma (Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal, Pampa). Faça mitos comuns entre os alunos e algumas verdades surpreendentes. Formato exato:

{s:"Afirmação curta.",v:false,e:"Mito. Explicação de até 3 frases."},

- "v" é true (verdade) ou false (mito). Ao menos 2 verdades.
- "e" começa com "Mito." ou "Verdade.".
```

---

## Prompt C — Cartas de espécies

```
Bioma: <BIOMA>
Espécies que já existem (não repita):
<COLE AQUI A SAÍDA DE: node tools/contexto.js <bioma>>

Crie 4 cartas NOVAS de espécies típicas do bioma (misture animais e plantas). Formato exato:

{n:"Nome popular",e:"🦜",st:"Vulnerável",f:"Curiosidade em 1 frase."},

- "e": 1 emoji parecido com a espécie.
- "st": situação na Lista Vermelha do ICMBio/MMA ("Vulnerável", "Em perigo", "Criticamente em perigo") ou "" se não estiver ameaçada. Se não souber, deixe "".
- "f": até 15 palavras.
```

---

## Prompt D — Revisão (use numa conversa nova)

```
Revise o conteúdo abaixo, feito para um app de Ciências do 7º ano:
1. Há algum erro de conteúdo ou dado duvidoso? Corrija ou remova.
2. Em "mc", o índice "a" aponta para a opção certa? Só uma opção está certa?
3. Em "order", os itens estão na ordem correta?
4. A linguagem está adequada para 12 anos? O português está correto?
5. O código está válido: aspas duplas retas, vírgulas, colchetes e chaves fechados?

Primeiro liste os problemas em até 5 linhas. Depois mostre o código corrigido completo, sem markdown.

<COLE AQUI A RESPOSTA>
```

---

## Prompt E — Texto para estudar (seção 📖 Estudar)

Use com o Bloco BASE, um bioma por vez. Depois passe pelo Prompt D e traga com a frase: "Crie `js/dados/textos/<bioma>.js` com isto".

```
Bioma: <BIOMA>
Perguntas que já existem no app (o texto precisa explicar TODOS estes assuntos):
<COLE AQUI A SAÍDA DE: node tools/contexto.js <bioma>>

Escreva um texto de estudo sobre este bioma, dividido em 11 seções, nesta ordem e com estes ids exatos:
local (📍 Onde fica), clima (☀️ Clima), solo (🪨 Solo e relevo), agua (💧 Água), plantas (🌳 Plantas), animais (🐾 Animais), povos (👥 Povos e cultura), economia (💰 Economia), ameacas (⚠️ Ameaças), conservacao (🛡️ Conservação), resumo (📝 Resumo).

Formato exato (exceção à regra "um objeto por linha": aqui é um parágrafo por linha):

"use strict";
(window.TEXTOS=window.TEXTOS||{}).<ID>=[
 {id:"local",t:"📍 Onde fica",p:[
  "Primeiro parágrafo.",
  "Segundo parágrafo."
 ]},
 {id:"clima",t:"☀️ Clima",p:[
  "..."
 ]}
];

Detalhes:
- <ID> é: ama (Amazônia), cer (Cerrado), caa (Caatinga), mat (Mata Atlântica), pan (Pantanal) ou pam (Pampa).
- Cada seção com 2 ou 3 parágrafos; cada parágrafo com até 3 frases curtas. Resumo: 4 a 6 frases, uma por parágrafo, começando com "•".
- Texto puro: sem HTML, sem markdown, sem negrito.
- Linguagem de 12 anos. Ao usar uma palavra difícil, explique logo em seguida.
- O arquivo inteiro deve ter no máximo 9.000 caracteres.
- No fim, FORA do código, escreva uma linha: COBERTURA: quais assuntos das perguntas ficaram em cada seção (ex.: "clima: chuva, estações; agua: igarapés, vazante").
```
