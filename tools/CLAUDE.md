# tools/ — motores de montagem (Node, sem dependências; não vão para o site)

- `node tools/importar.js <arq.txt> [bioma] [--teste]`: lê itens `{…}` (perguntas, espécies, mitos) de qualquer texto, valida formato, barra repetidos, avisa parecidos e grava no FIM das listas. Com erro, nada é gravado. Bioma: id, nome ou arquivo (`pam`, `Pampa`, `mata-atlantica`). Se o arquivo do bioma passaria de 10 KB, grava em `<bioma>-extra.js` (criado na hora; rodar `integrar.js <extra> --antes js/dados/mitos-fontes.js`). Se o `-extra` também passaria de 10 KB, grava em `<bioma>-extra2.js` (mesmo jeito).
- `node tools/contexto.js <bioma|mitos>`: lista curta do que já existe, para colar nos prompts A/B/C.
- `node tools/contar.js`: painel de quantidades por bioma e sugestões do que falta.
- `node tools/integrar.js <arquivo> [--antes js/x.js] [--teste]`: inclui arquivo novo no `index.html`, `FILES` do `sw.js` e `pages.yml` (se preciso). Não duplica.
- `node tools/verificar.js`: limites de tamanho, index × sw × disco × pages.yml, `confirm/alert`, dados. Já roda dentro de `tests/smoke.js`.
- Base: `lib.js` (carregar/inserir/serializar) e `validar.js` (regras dos prompts + repetição). Regra nova de conteúdo → `validar.js`.
- `node tools/teoria.js [arq.txt] [bioma]`: sem arquivo, pente-fino do banco (resumo + `docs/teoria-relatorio.md`); com arquivo, confere só as perguntas novas. Só avisa, nunca altera. Avisos: certa longa, absolutas, eco, "todas as anteriores", negativa sem MAIÚSCULAS, repetidas + até 2 sugestões de errada das fichas em `tools/fichas/`. Teste: `node tests/teoria.js`.
