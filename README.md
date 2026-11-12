# Biomas-Brasileiros
Iniciar o desenvolvimento sobre biomas brasileiros.

## App instalável (PWA)

O `index.html` pode ser instalado no celular ou computador e funciona offline.
Para isso ele precisa ser aberto por **https** (por exemplo, GitHub Pages) — abrindo o arquivo direto do computador (`file://`) o app funciona, mas não oferece instalação.

- **Android / Chrome / Edge:** toque em "📲 Instalar app" ou no menu ⋮ → "Instalar app".
- **iPhone / iPad (Safari):** Compartilhar → "Adicionar à Tela de Início".

## Publicação automática

A cada push na branch `main`, o workflow `.github/workflows/pages.yml` publica o app no GitHub Pages
e troca a versão do cache em `sw.js` pelo código do commit — os aparelhos baixam a atualização sozinhos,
sem precisar mexer em nada.

Configuração única: em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**.
O endereço fica `https://<usuário>.github.io/Biomas-Brasileiros/`.
