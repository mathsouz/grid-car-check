# Atualização do site — novas regras de marca (2026-11-17)

Instrução para o Claude Code: leia `MARCA.md`, `DESIGN.md` e `CLAUDE.md` antes. Aplique abaixo. **Pergunte antes de `git push`.** Validar JSON-LD e `<h1>` único em cada página tocada, atualizar `lastmod` no `sitemap.xml` das páginas que mudarem de conteúdo (a troca de handle altera o JSON-LD `sameAs` de `/`, mas confirme).

## 1. Corrigir o Instagram: `grid.carconsulting` → `grid.carcheck`
Em 10 arquivos HTML (rodapé e JSON-LD `sameAs`; 22 linhas): `index.html`, `instagram/index.html`, `servicos/index.html`, `car-hunter/index.html`, `blog/index.html` e os 5 posts de `blog/*/index.html`. Usar `grep -rn "grid.carconsulting" --include=*.html .` para achar tudo. CLAUDE.md e PRODUCT.md já foram corrigidos.

## 2. Terceira cor: azul de medição `#8DB8FF`
- Em `css/style.css`, criar `--measure: #8DB8FF;` em `:root`.
- Aplicar **só** em:
  - ícones SVG da lista "Incluso" (`.incl svg { stroke: var(--measure); }`);
  - números e rótulos dos achados da vistoria (`.facts strong.dado { color: var(--measure); }` ou equivalente, ex.: "35 códigos de erro", "Pintura original");
  - etiquetas de verificação (espessímetro, scanner) onde fizer sentido;
  - links dentro de texto corrido dos posts de blog.
- **Não aplicar** em botões, CTA, títulos, palavra de destaque do H1, marcas de canto, fundos ou borda do cartão em destaque.
- **Não aplicar** na legenda/etiquetas de status do Laudo 3D (`--st-reparo` #5B9DFF já é azul e significa "reparo").
- Referência visual do teste: `/private/tmp/claude-501/-Users-math-landing-page/2e3212c7-0a0a-4c60-b17a-a6558bd035d0/scratchpad/cores/daltonismo.png` (linha "A"). Se o caminho não existir mais, a regra acima basta. Manter o laranja do botão como está (#F93F06, laranja da logo); no teste usei um laranja mais claro só para comparar paletas.

## 3. Acessibilidade para daltonismo
- Conferir que nenhum estado depende só de cor (status do laudo com ícone ou texto; botões já têm texto e seta).
- Conferir contraste ≥ 4,5:1 do texto novo.

## 4. Depois de aplicar
Rodar a validação do CLAUDE.md, conferir `/`, `/instagram/`, `/servicos/` e `/car-hunter/` no navegador e no mobile, e pedir confirmação antes do push.

## Pendências fora do site (só o dono pode fazer)
- Bio do Instagram: link para `/instagram/` e handle já correto.
- Solicitar indexação no Search Console de `/`, dos dois posts otimizados e das novas páginas.
- Decidir se `PRODUCT.md`, `DESIGN.md`, `CLAUDE.md`, `MARCA.md` e este arquivo devem continuar acessíveis publicamente em `gridcarcheck.com.br/*.md` (hoje respondem 200; você disse "ainda não" para esconder).
