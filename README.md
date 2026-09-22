# Landing Page

Landing page estática em HTML, CSS e JavaScript, hospedada na Vercel via GitHub.

## Estrutura

```
landing-page/
├── index.html
├── css/style.css
├── js/main.js
└── assets/images/
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
