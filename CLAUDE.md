# CLAUDE.md — Trilhas dos Biomas Brasileiros

Prioridade: economizar contexto e tokens. Regras obrigatórias.

## Projeto
- HTML + CSS + JS puro, sem dependências. PWA instalável e offline. Público: 7º ano, textos em pt-BR.
- `index.html` (esqueleto + ordem dos `<script>`), `css/app.css`, `js/` (estado, navegação, quiz, `main.js`, `pwa.js`), `js/telas/`, `js/dados/` (`biomas/<bioma>.js`, mitos, fontes), `sw.js`, `manifest.webmanifest`, `icons/`.
- Rodar: `python3 -m http.server 8000`. Testar: `node tests/smoke.js` (imprime `OK` ou as falhas). Sem build/lint.
- Deploy: automático no GitHub Pages a cada push na `main` (`.github/workflows/pages.yml`).

## Convenções
- Scripts comuns (não ES modules), funções globais chamadas por `onclick`; a ordem dos `<script>` importa.
- Arquivo novo → incluir em `FILES` do `sw.js` (e no `pages.yml` se fora de `css/`, `js/`, `icons/`).
- Não editar `CACHE` no `sw.js`: o deploy troca sozinho.
- Progresso no `localStorage` (`biomas7_v1`): mudar a estrutura apaga o progresso dos alunos.

## Tamanho de arquivo
- Máx. 300 linhas ou ~10 KB por arquivo; ideal < 200 linhas.
- Arquivo acima do limite → parar, propor divisão e perguntar antes de continuar editando.
- Funcionalidade nova já nasce em módulos pequenos, uma responsabilidade cada.

## Leitura e edição
- Ler só os arquivos/trechos necessários (o usuário pode anexar com `@arquivo`); não reler o que já foi lido.
- Edições pontuais; não reescrever arquivos inteiros.
- Tarefa complexa → plano curto validado pelo usuário antes de mexer.
- Saída de comandos: silenciosa/filtrada (`-q`, `| grep`); após mudanças, rodar `node tests/smoke.js`.

## Sessão
- Avisar em uma frase quando: arquivo passa do limite; conversa longa e repetitiva; releitura desnecessária.
- Mesma tarefa, conversa longa → sugerir `/compact <o que manter>`.
- Tarefa concluída ou assunto novo → lembrar o usuário de usar `/clear` (só ele executa).
- A decisão final é sempre do usuário.

## Este arquivo
- Manter curto (< 60 linhas). Regras de uma pasta específica vão num `CLAUDE.md` dentro dela.
- Atualizar quando mudar estrutura, comandos ou deploy.
