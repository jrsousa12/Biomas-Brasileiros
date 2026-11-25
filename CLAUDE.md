# CLAUDE.md — Trilhas dos Biomas Brasileiros

Prioridade: economizar contexto e tokens. Regras obrigatórias.

## Projeto
- HTML + CSS + JS puro, sem dependências. PWA instalável e offline. Público: 7º ano, textos em pt-BR.
- `index.html` (esqueleto + ordem dos `<script>`), `css/app.css`, `js/` (estado, navegação, quiz, `sessao.js` continuar de onde parou, `dialogo.js` confirmações, `voltar.js` botão voltar do celular, `main.js`, `pwa.js`), `js/telas/`, `js/dados/` (`biomas/<bioma>.js`, mitos, fontes), `sw.js`, `manifest.webmanifest`, `icons/`.
- Rodar: `python3 -m http.server 8000`. Testar: `node tests/smoke.js` (imprime `OK` ou as falhas). Sem build/lint.
- Motores (`tools/`, fora do site; uso em `tools/CLAUDE.md`): `importar` conteúdo, `contexto` p/ prompts, `contar` painel, `integrar` arquivo novo, `verificar` (roda no smoke), `teoria` (confere perguntas).
- Deploy: automático no GitHub Pages a cada push na `main` (`.github/workflows/pages.yml`).
- Protocolo-token: `/protocolo-token` (`.claude/skills/`); barra de contexto em `.claude/settings.json` + `.claude/hooks/`.

## Convenções
- Scripts comuns (não ES modules), funções globais chamadas por `onclick`; a ordem dos `<script>` importa.
- Arquivo novo → incluir em `FILES` do `sw.js` (e no `pages.yml` se fora de `css/`, `js/`, `icons/`).
- Não editar `CACHE` no `sw.js`: o deploy troca sozinho.
- Progresso no `localStorage` (`biomas7_v1`): mudar a estrutura apaga o progresso dos alunos.
- Lição/quiz em andamento em `biomas7_sessao` (12 h): `render()` grava, `endQuiz()` apaga. Tela nova com passos → tratar em `voltarUmPasso()` (`voltar.js`).
- Confirmações com `dialogo({...})`, nunca `confirm()`/`alert()`.

## Tamanho de arquivo
- Máx. 300 linhas ou ~10 KB por arquivo; ideal < 200 linhas.
- Arquivo acima do limite → parar, propor divisão e perguntar antes de continuar editando.
- Funcionalidade nova já nasce em módulos pequenos, uma responsabilidade cada.

## Leitura e edição
- Ler só os arquivos/trechos necessários (o usuário pode anexar com `@arquivo`); não reler o que já foi lido.
- Edições pontuais; não reescrever arquivos inteiros.
- Tarefa complexa → plano curto validado pelo usuário antes de mexer.
- Saída de comandos: silenciosa/filtrada (`-q`, `| grep`); após mudanças, rodar `node tests/smoke.js`.
- Tarefa repetida à mão pela 2ª vez → propor um motor em `tools/`; teste criado numa tarefa fica guardado em `tests/`.

## Roteiro (código e conteúdo feitos em outras IAs; aqui só montagem)
1. Conteúdo: ampliar perguntas, mitos e espécies (`docs/prompts-conteudo.md`); colar a saída revisada num `.txt` e rodar `node tools/importar.js` (acrescenta no FIM; não abrir os arquivos de dados).
   - Um bioma por vez: prompt A (perguntas) + C (espécies); B (mitos) cobre os 6 de uma vez. Tudo passa pelo D (revisão) antes de vir para cá, indicando o arquivo de destino.
2. Sorteio de 8 perguntas por partida (feito aqui). ✅ feito (`trilha.js`)
3. Código (`docs/prompts-codigo.md`), nesta ordem: P4 sequência ✅ (`sequencia.js`) → P3 medalhas ✅ → P6 glossário ✅ (`glossario.js`) → P1 ligar pares ✅ (`quiz-pares.js`) → P2 qual bioma ✅ (`qual-bioma.js`) → P5 mapa ✅ (`mapa.js`, na Home) → P7 relatório ✅ (`telas/relatorio.js`, botão em Resultado).
4. Protocolo token ✅ feito (25/11/2026): regras resumidas aqui, barra de contexto; nenhum arquivo acima do limite nem dado em linha enorme (sem motor de item único/trava).
5. Plano A — seção 📖 Estudar. ✅ passo 1: os 6 textos criados (25/11/2026). ✅ passo 2: P8 (`telas/estudar.js`; entrada "📖 Quero ler mais" na lição, Voltar retorna à lição; lidas em `S.lidos`). ✅ fase 2: erro na questão mostra "📖 Reveja: <seção>" (`reveja.js` + `dados/secoes.js`, mapa pergunta→seção feito à mão; pergunta nova → acrescentar no FIM da lista do bioma; cadeias alimentares ficam sem seção). ⏳ só então ampliar questões. Formato `TEXTOS.<id>=[{id,t,p:[]}]`, 11 seções de ids fixos.
   - Texto completo por bioma, 8–10 seções (local, clima, solo, água, plantas, animais, povos, economia, ameaças, conservação, resumo), linguagem de 12 anos, cobrindo os assuntos das questões.
   - Dados em `js/dados/textos/<bioma>.js` (≤10 KB cada). Trilha mantém os 3 cartões + botão "Quero ler mais".
   - Ordem: prompt E (conteúdo, em `docs/prompts-conteudo.md`) + D → P8 tela Estudar (`docs/prompts-codigo.md`) → montagem aqui → fase 2: erro na questão aponta "📖 Reveja: <seção>" → só então ampliar questões.
   - ✅ "Cartas X/72" corrigido em `telas/resultado.js` (total calculado).
6. Motor de teoria ✅ (`tools/teoria.js` + `tools/fichas/<bioma>.json`, teste `tests/teoria.js`). Fichas são RASCUNHO: o dono confere/amplia (6 a 10 ideias erradas por bioma). Rodar `node tools/teoria.js <arq.txt> <bioma>` antes do importar. Banco atual: 13 avisos reais (6 certa longa, 7 absolutas) em `docs/teoria-relatorio.md`, ainda não corrigidos.
7. Visual "colorido e divertido" ✅ (25/11/2026; o "cor por bioma" ficou engessado): amostra `docs/amostra-divertida.html`; cartões-figurinha, papagaio guia, estrelas, passos "você está aqui", caixas Resumo/Atenção no Estudar. Modo escuro `js/modo.js` (botão 🌙, chave `biomas7_modo`). `tema.js` escurece cor de bioma fraca sozinho. Teste `node tests/visual-app.js` (todas as telas, claro/escuro, 3 larguras) após mexer em visual.
8. Visual 2 ⏳ (decidido 25/11/2026; 1 rodada por conversa, amostra aprovada antes, teste+prints+commit no fim): R1 Sonnet: atalhos da Home em grade 2 colunas, aba ativa com pílula, legenda na faixa de biomas → R2 Sonnet: Cartas em seções por bioma ("?" colorido), Resultado com resumo do professor recolhido e barrinhas → R3 Sonnet: quiz com A/B/C/D e festa no acerto, escuro (mapa cinza, estrelas vazias) → R4 Opus: mapa com contorno do Brasil.
- "Monte a entrega do P<n>" → `node tools/integrar.js` p/ cada arquivo novo, ligar render/go e `voltar.js`, rodar teste e marcar aqui como feito.

## Sessão
- Ao mudar de etapa (ex.: "próxima etapa"), sempre entregar ao usuário o script completo da etapa: Bloco CONTEXTO + pedido P<n> de `docs/prompts-codigo.md`, num bloco de código pronto para colar em outra IA.
- Responder sempre em pt-BR simples (também commits): o dono é professor e não programa.
- Avisar em uma frase quando: arquivo passa do limite; conversa longa e repetitiva; releitura desnecessária.
- Mesma tarefa, conversa longa → sugerir `/compact <o que manter>`.
- Tarefa concluída ou assunto novo → lembrar o usuário de usar `/clear` (só ele executa).
- A decisão final é sempre do usuário; decisões tomadas ficam anotadas aqui, para não perguntar de novo.
- Dicas ao dono (quando couber): uma tarefa por conversa; `@arquivo`; Sonnet/Haiku p/ tarefa simples, Opus p/ planos; barra perto de 50% → `/compact`.

## Este arquivo
- Manter curto (< 60 linhas). Regras de uma pasta específica vão num `CLAUDE.md` dentro dela.
- Atualizar quando mudar estrutura, comandos ou deploy.
