# Landing Page

Landing page estática em HTML, CSS e JavaScript, hospedada na Vercel via GitHub.

## Estrutura

```
landing-page/
├── index.html                              # Home institucional (/)
├── instagram/index.html                    # Landing de tráfego pago/Instagram (noindex)
├── servicos/index.html
├── blog/
│   ├── index.html                          # Hub
│   ├── vistoria-cautelar-vs-pre-compra/
│   ├── como-saber-se-o-carro-foi-batido/
│   ├── documentos-carro-usado-curitiba/
│   ├── quilometragem-adulterada/
│   └── laudo-3d-vistoria-carro-usado/
├── css/style.css
├── js/main.js
├── assets/images/ e assets/video/
├── sitemap.xml, robots.txt, vercel.json
├── PRODUCT.md, DESIGN.md                    # contexto de produto e design system
└── CLAUDE.md                                # instruções do projeto pra IA
```

## Rodar localmente

Abra o `index.html` no navegador, ou use um servidor local:

```
python3 -m http.server 3000
```

## Deploy

1. Suba o projeto para um repositório no GitHub.
2. Na Vercel, clique em **Add New → Project** e importe o repositório.
3. Framework Preset: **Other** (sem build command, sem output directory).
4. Cada `git push` na branch `main` publica automaticamente.
