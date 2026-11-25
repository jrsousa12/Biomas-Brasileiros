# CLAUDE.md — Trilhas dos Biomas Brasileiros

Prioridade: economizar contexto e tokens. Regras obrigatórias.

## Projeto
- HTML + CSS + JS puro, sem dependências. PWA instalável e offline. Público: 7º ano, textos em pt-BR.
- `index.html` (esqueleto + ordem dos `<script>`), `css/app.css`, `js/` (estado, navegação, quiz, `sessao.js` continuar de onde parou, `dialogo.js` confirmações, `voltar.js` botão voltar do celular, `main.js`, `pwa.js`), `js/telas/`, `js/dados/` (`biomas/<bioma>.js`, mitos, fontes), `sw.js`, `manifest.webmanifest`, `icons/`.
- Rodar: `python3 -m http.server 8000`. Testar: `node tests/smoke.js` (imprime `OK` ou as falhas). Sem build/lint.
- Motores (`tools/`, fora do site; uso em `tools/CLAUDE.md`): `importar` conteúdo, `contexto` p/ prompts, `contar` painel, `integrar` arquivo novo, `verificar` (roda no smoke).
- Deploy: automático no GitHub Pages a cada push na `main` (`.github/workflows/pages.yml`).

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

## Roteiro (código e conteúdo feitos em outras IAs; aqui só montagem)
1. Conteúdo: ampliar perguntas, mitos e espécies (`docs/prompts-conteudo.md`); colar a saída revisada num `.txt` e rodar `node tools/importar.js` (acrescenta no FIM; não abrir os arquivos de dados).
   - Um bioma por vez: prompt A (perguntas) + C (espécies); B (mitos) cobre os 6 de uma vez. Tudo passa pelo D (revisão) antes de vir para cá, indicando o arquivo de destino.
2. Sorteio de 8 perguntas por partida (feito aqui). ✅ feito (`trilha.js`)
3. Código (`docs/prompts-codigo.md`), nesta ordem: P4 sequência ✅ (`sequencia.js`) → P3 medalhas ✅ → P6 glossário ✅ (`glossario.js`) → P1 ligar pares ✅ (`quiz-pares.js`) → P2 qual bioma ✅ (`qual-bioma.js`) → P5 mapa → P7 relatório.
- "Monte a entrega do P<n>" → `node tools/integrar.js` p/ cada arquivo novo, ligar render/go e `voltar.js`, rodar teste e marcar aqui como feito.

## Sessão
- Ao mudar de etapa (ex.: "próxima etapa"), sempre entregar ao usuário o script completo da etapa: Bloco CONTEXTO + pedido P<n> de `docs/prompts-codigo.md`, num bloco de código pronto para colar em outra IA.
- Responder ao usuário sempre em português (pt-BR).
- Avisar em uma frase quando: arquivo passa do limite; conversa longa e repetitiva; releitura desnecessária.
- Mesma tarefa, conversa longa → sugerir `/compact <o que manter>`.
- Tarefa concluída ou assunto novo → lembrar o usuário de usar `/clear` (só ele executa).
- A decisão final é sempre do usuário.

## Este arquivo
- Manter curto (< 60 linhas). Regras de uma pasta específica vão num `CLAUDE.md` dentro dela.
- Atualizar quando mudar estrutura, comandos ou deploy.
