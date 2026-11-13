# Grid Car Check — instruções do projeto

Site da Grid Car Check (vistoria técnica pré-compra de carros usados, Curitiba e região metropolitana), em `gridcarcheck.com.br`.

**Leia `PRODUCT.md` e `DESIGN.md` antes de qualquer alteração de conteúdo ou visual.** Eles têm o contexto de produto (público, posicionamento, preço, regras do que pode/não pode ser escrito) e o design system ("A Prancheta da Oficina": grafite, laranja de sinalização, marcas de canto). Este arquivo não repete esse conteúdo — só orienta como trabalhar no repo.

## Stack e hospedagem

- HTML, CSS e JavaScript estático, **sem build e sem framework**.
- Hospedado na **Vercel**, conectado ao GitHub (`mathsouz/grid-car-check`, branch `main`).
- **Cada `git push` na `main` publica automaticamente.** Não precisa reconectar nada no painel da Vercel.
- Rodar localmente: `python3 -m http.server 3000` na raiz do projeto, depois abrir `http://localhost:3000/`.

## Mapa do site (URL → arquivo)

| URL | Arquivo | O que é |
|---|---|---|
| `/` | `index.html` | Home institucional de SEO. `index, follow`. |
| `/instagram/` | `instagram/index.html` | Landing de tráfego pago/Instagram. `noindex, follow` — de propósito, não compete com `/` na busca. CTAs de WhatsApp mantêm o texto "Vi a Grid no Instagram" via `data-mensagem` explícito. |
| `/servicos/` | `servicos/index.html` | Vistoria Pré-Compra + Car Hunter. |
| `/blog/` | `blog/index.html` | Hub do blog. |
| `/blog/vistoria-cautelar-vs-pre-compra/` | `blog/vistoria-cautelar-vs-pre-compra/index.html` | Post. |
| `/blog/como-saber-se-o-carro-foi-batido/` | `blog/como-saber-se-o-carro-foi-batido/index.html` | Post. |
| `/blog/documentos-carro-usado-curitiba/` | `blog/documentos-carro-usado-curitiba/index.html` | Post. |
| `/blog/quilometragem-adulterada/` | `blog/quilometragem-adulterada/index.html` | Post. |

**Não existe `/home/`** — foi unificado com `/` em nov/2026 (as duas páginas disputavam a mesma busca). `vercel.json` redireciona `/home` e `/home/` → `/` com 301. Não recriar a pasta `home/`.

Cada página é um `index.html` independente (sem template/include compartilhado) — header, footer, menu e os scripts de analytics estão **duplicados em cada arquivo**. Qualquer mudança no header/menu/rodapé precisa ser replicada manualmente nas 8 páginas.

## Convenções de código

- **Caminhos sempre absolutos a partir da raiz** (`/css/style.css`, `/js/main.js`, `/assets/...`), nunca relativos — todas as páginas exceto a raiz vivem em subpastas.
- **WhatsApp**: todo CTA usa `data-whatsapp` (dispara o link) e opcionalmente `data-mensagem="..."` (texto pré-preenchido). Sem `data-mensagem`, cai no padrão **global** `CONFIG.mensagemPadrao` em `js/main.js` — esse padrão é compartilhado por todas as páginas, então mudar ali afeta o site inteiro. Só `/instagram/` sobrescreve explicitamente com o texto de Instagram em cada link.
- **JSON-LD**: existe **uma única** entidade `ProfessionalService` completa, definida em `index.html` com `"@id": "https://gridcarcheck.com.br/#empresa"`. Todas as outras páginas (`servicos/`, `blog/*`) referenciam essa entidade só por `{"@id": "https://gridcarcheck.com.br/#empresa"}` — nunca duplicar o objeto completo de novo.
- **Sempre validar JSON-LD antes de commitar**: `python3 -c "import re,json; [json.loads(b) for b in re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', open('ARQUIVO').read(), re.S)]"` em cada arquivo tocado. Também checar `<html>/<head>/<body>` balanceados e exatamente um `<h1>` por página.
- **`sitemap.xml`**: atualizar `lastmod` de qualquer página cujo conteúdo mude. `/instagram/` nunca entra no sitemap (de propósito).
- **Nunca inventar** número, estatística, depoimento, preço ou caso de cliente. Se faltar um dado, perguntar ao usuário ou deixar `<!-- TODO Matheus: ... -->` visível no código.
- **Nunca citar concorrentes pelo nome** no conteúdo publicado (regra do produto, ver `PRODUCT.md`).

## Analytics (já instalado em todas as páginas — não remover nem duplicar)

- Google Analytics 4: `G-SVH3X3QNZ6`
- Meta Pixel: `866001702810701`
- Clique de WhatsApp já dispara `gtag('event', 'whatsapp_click', ...)` e `fbq('track', 'Contact')` via `js/main.js` — não precisa instrumentar de novo.

## Git

- Sempre perguntar antes de `git push` (o usuário confirma a cada rodada de mudanças).
- Mensagens de commit em português, descrevendo o "porquê", não só o "o quê".
- Nunca commitar com `--no-verify` nem force-push na `main`.

## Contas e recursos externos (não estão no repositório)

Nada disso vem junto se você clonar o repo num ambiente novo — são contas separadas que o usuário acessa direto:

- **Domínio**: `gridcarcheck.com.br`, registrado fora da Vercel.
- **Vercel**: projeto `grid-car-check`, conectado ao GitHub.
- **Google Search Console**: propriedade `gridcarcheck.com.br`.
- **Google Analytics 4** e **Meta Business Suite** (Pixel): contas do usuário, só os IDs estão no código.
- **Google Business Profile**: `https://share.google/vexyMtsoNz0kqmHyh` (sem endereço físico cadastrado — o especialista vai até o carro).
- **Instagram**: `@grid.carconsulting`. O link da bio deve apontar para `/instagram/`.

## Ferramentas locais (gitignored — não vêm num `git clone` novo)

`.agents/`, `.claude/`, `.impeccable/`, `skills-lock.json`, `screenshots/`, `graphify-out/` e `originais/` estão no `.gitignore` porque não fazem parte do site publicado:

- **`.agents/.claude/.impeccable/skills-lock.json`**: instalação do skill **Impeccable** (usado pra `$impeccable critique`, `$impeccable polish` etc. — a crítica de design "infantilizado vs premium" foi feita com ele). Se quiser esses comandos disponíveis num ambiente novo, é preciso instalar o Impeccable de novo lá (`skills-lock.json` mostra que veio de `pbakaus/impeccable` no GitHub).
- **`originais/`**: material de referência da landing antiga (fotos, textos originais) — vale copiar manualmente se for útil, não tem backup automático em lugar nenhum.
- **`screenshots/`** e **`graphify-out/`**: saída de QA e do grafo de conhecimento local, regeneráveis, sem necessidade de preservar.

## O que já foi decidido e não deve ser revertido sem perguntar

- `/instagram/` fica `noindex` de propósito (não é um esquecimento).
- A navbar (Home/Serviços/Blog) aparece em todas as páginas, inclusive em `/instagram/` — decisão explícita do usuário, mesmo contrariando o princípio original de "uma página, um CTA, sem menu".
- Vídeos dos Reels não têm `autoplay` (removido por peso no mobile); tocam via `IntersectionObserver` ao entrar na tela.
- Botões têm raio de 4px (não 8px) e seta no hover; ícones de conteúdo usam ponta quadrada, não arredondada — ajustes da crítica de identidade visual de out/2026, documentados em `DESIGN.md`.
