---
name: Grid Car Check
description: Prancheta de oficina em grafite com grade fina, marcas de canto e laranja de sinalização.
colors:
  laranja-sinalizacao: "#FF6B1A"
  laranja-da-logo: "#F93F06"
  grafite-de-garagem: "#101317"
  painel-grafite: "#171B21"
  linha-de-projeto: "#2A3038"
  branco-quente: "#F2EEE7"
  cinza-claro: "#A7AFB8"
  cinza-legenda: "#7E8791"
  aviso-placeholder: "#FFD166"
typography:
  display:
    fontFamily: "Oswald, Arial, sans-serif"
    fontSize: "clamp(48px, 7vw, 80px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "normal"
  headline:
    fontFamily: "Oswald, Arial, sans-serif"
    fontSize: "clamp(36px, 5vw, 56px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "normal"
  title:
    fontFamily: "Oswald, Arial, sans-serif"
    fontSize: "clamp(24px, 3.5vw, 32px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "normal"
  body:
    fontFamily: "IBM Plex Sans, Arial, sans-serif"
    fontSize: "clamp(18px, 2vw, 20px)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, Courier New, monospace"
    fontSize: "clamp(13px, 1.5vw, 14px)"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "3px"
rounded:
  md: "8px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "28px"
  lg: "40px"
  section: "80px"
  section-wide: "112px"
components:
  button-primary:
    backgroundColor: "{colors.laranja-da-logo}"
    textColor: "{colors.grafite-de-garagem}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
    height: "52px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.branco-quente}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
    height: "52px"
  button-dark:
    backgroundColor: "{colors.grafite-de-garagem}"
    textColor: "{colors.branco-quente}"
    rounded: "{rounded.md}"
    padding: "12px 32px"
    height: "60px"
  card:
    backgroundColor: "{colors.painel-grafite}"
    textColor: "{colors.cinza-claro}"
    rounded: "{rounded.md}"
    padding: "28px"
  card-hot:
    backgroundColor: "{colors.painel-grafite}"
    textColor: "{colors.cinza-claro}"
    rounded: "{rounded.md}"
    padding: "44px"
---

# Design System: Grid Car Check

## Overview

**Creative North Star: "A Prancheta da Oficina"**

O sistema é um papel de projeto sobre grafite de garagem: grade fina de 64px, marcas de canto como o enquadramento de um scanner e etiquetas em fonte monoespaçada. Nada é decorativo. O laranja é cor de sinalização e só aparece onde o olho precisa ir: etiquetas, números-chave, botões e a moldura do cartão mais importante. O dado é o protagonista, então a interface fica calada em volta dele.

A hierarquia é fixa em toda seção: etiqueta mono laranja, título grande em Oswald, texto em cinza claro. O ritmo é o de um site de rolagem contínua, com seções de alturas e densidades diferentes, blocos curtos e respiro entre eles, nunca quadros 16:9 nem contador de página. O compromisso visual vem do deck da Grid e é vinculante (ver PRODUCT.md).

**Key Characteristics:**
- Grade de 1px a cada 64px em todas as seções escuras; marcas de canto só no hero e no cartão em destaque.
- Plano por padrão: profundidade vem de painel sobre fundo e de borda de 1px, não de sombra.
- Dois laranjas com papéis distintos: o da logo em botões e faixas, o de sinalização em texto pequeno e detalhes.
- Uma seção final invertida em laranja sólido, com tudo em grafite.
- Etiquetas mono em caixa alta com 2 a 3px de espaçamento, sem exagero.

## Colors

Grafite quente e frio ao mesmo tempo: fundo quase preto azulado, texto em branco quente, laranja como único acento.

### Primary
- **Laranja da Logo** (#F93F06): botões, faixas e a seção final invertida. É o laranja da marca, mais avermelhado. Contraste do texto grafite sobre ele: cerca de 5,1:1.
- **Laranja de Sinalização** (#FF6B1A): etiquetas mono, números-chave, palavra de destaque no título, ícones, setas entre cartões, marcas de canto, borda do cartão em destaque e linha de tabela em destaque (a 12% de opacidade como fundo). Mais legível em texto pequeno sobre escuro.

### Neutral
- **Grafite de Garagem** (#101317): fundo de página e texto sobre laranja.
- **Painel Grafite** (#171B21): cartões e painéis.
- **Linha de Projeto** (#2A3038): bordas de 1px e divisores.
- **Branco Quente** (#F2EEE7): texto principal e a grade sobre o escuro (a 4,5% de opacidade).
- **Cinza Claro** (#A7AFB8): texto secundário e subtítulos.
- **Cinza Legenda** (#7E8791): rodapé, legendas e cabeçalhos de tabela.
- **Aviso de Placeholder** (#FFD166): só para marcar lacunas de conteúdo que o dono do produto precisa preencher; nunca faz parte da identidade e deve sumir antes de publicar.

### Named Rules
**The Sinalização Rule.** O laranja marca onde o olho precisa ir. Se tudo é laranja, nada sinaliza: etiquetas, números-chave, botões e o cartão mais importante, e só isso.

**The Two Oranges Rule.** #F93F06 pinta superfícies (botões, faixas); #FF6B1A colore texto pequeno e traços. Os dois não trocam de papel. O ajuste fino vive nas variáveis `--brand` e `--accent`.

## Typography

**Display Font:** Oswald (com Arial)
**Body Font:** IBM Plex Sans (com Arial)
**Label/Mono Font:** JetBrains Mono (com Courier New)

**Character:** Oswald condensada dá peso de placa de oficina aos títulos e botões; IBM Plex Sans mantém o texto corrido sóbrio e legível; a mono faz as etiquetas parecerem legenda de desenho técnico.

### Hierarchy
- **Display** (700, 80px desktop / 48px celular, 1.05): título de impacto do hero, uma vez por página. Reduzido de 96px depois que um H1 de frase completa (45 caracteres) quebrava em 4 linhas no desktop.
- **Headline** (700, 56px / 36px, 1.05): título de seção, limitado a 20ch.
- **Title** (600, 32px / 24px, 1.15): subtítulos de cartão, botões (20 a 22px) e valores na tabela de preço.
- **Body** (400, 20px / 18px, 1.6): texto corrido, nunca acima de 20px, com linha de até cerca de 44rem.
- **Label** (700, 14px / 13px, 3px de espaçamento, caixa alta): etiqueta de seção em laranja; versão pequena com 2px em cartões e no rodapé (peso 500, cinza).

### Named Rules
**The Etiqueta Primeiro Rule.** Toda seção abre com etiqueta mono laranja, depois título Oswald, depois texto cinza claro. Sem exceção de ordem.

## Layout

Contêiner de até 1120px com 20px de respiro lateral; a largura de leitura de texto é limitada por elemento (800px nas seções estreitas), sem encolher o contêiner, para que todas as seções alinhem à esquerda no mesmo ponto. Seções separadas por borda superior de 1px, com padding vertical de 80px no celular e 112px no desktop; o hero tem 72px e 120px.

Mobile primeiro. O ponto de quebra é 900px: a escala tipográfica sobe (h1 48 para 80px, h2 36 para 56px, texto 18 para 20px), grades de cartões passam de uma para três colunas, os quatro passos ficam em linha com setas retas laranjas entre cartões (no celular as setas apontam para baixo) e o botão fixo de WhatsApp some. Alvos de toque têm no mínimo 44px, e botões principais 52 a 60px.

Ritmo: 8, 16, 28 e 40px entre elementos, 16px entre cartões, 40px entre título e conteúdo.

## Elevation & Depth

Plano por padrão. A profundidade é tonal: painel grafite (#171B21) sobre fundo (#101317), separado por borda de 1px (#2A3038). O cartão em destaque ganha borda de 2px laranja e marcas de canto, sem sombra. A única sombra do sistema é a do botão fixo de WhatsApp no celular.

### Shadow Vocabulary
- **Botão fixo** (`box-shadow: 0 8px 24px rgba(0,0,0,0.55)`): apenas o botão fixo de WhatsApp, para separá-lo do conteúdo que rola por baixo.

### Named Rules
**The Flat-By-Default Rule.** Superfícies são planas em repouso. Se precisa destacar, use borda laranja de 2px e marcas de canto, não sombra.

## Shapes

Linguagem de esquadro: raio de 8px em botões, cartões e tabela, borda de 1px nos cartões comuns e de 2px laranja no destaque. Marcas de canto são dois cantos opostos (superior esquerdo e inferior direito) com traço de 2px laranja, 24 a 40px de lado, afastados da borda (menos afastamento no celular). Ícones são Lucide, traço de 2px, em laranja. Setas entre cartões são retas, com ponta em ângulo, sem curva.

## Components

### Buttons
- **Shape:** cantos de 8px, altura de 52px (60px na versão grande, 44px na pequena do cabeçalho), padding 12×32px.
- **Primary:** fundo Laranja da Logo, texto Grafite de Garagem, Oswald 600 de 20 a 22px. Um levante de 2px no hover.
- **Ghost:** transparente, texto branco quente, borda de 2px na cor de linha; a borda vira laranja no hover. Usado no Car Hunter, o serviço secundário.
- **Dark:** fundo grafite e texto branco quente, só sobre a seção final laranja.
- **Botão fixo (celular):** largura total com 16px de margem, Laranja da Logo, ícone message-circle, aparece quando o hero sai da tela.

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** Painel Grafite; texto em cinza claro, título em branco quente.
- **Border:** 1px linha de projeto; destaque com 2px laranja e marcas de canto.
- **Internal Padding:** 28px (24px nos passos do desktop); 44px no cartão de preço em destaque.

### Tabela de preço
Cabeçalho em mono cinza legenda; valores em Oswald 700 alinhados à direita e sem quebra de linha. A linha em destaque tem fundo laranja a 12% e borda inferior de 2px laranja. Vive dentro do cartão em destaque.

### FAQ
Lista de `details` com divisor de 1px; pergunta em Oswald 600, indicador "+"/"−" laranja em mono. Foco visível com contorno branco de 3px.

### Navigation
Barra fixa no topo com fundo grafite a 92% de opacidade e desfoque, borda inferior de 1px, logo à esquerda e um único botão de WhatsApp à direita. Sem menu de navegação: a página tem um só destino.

### Placeholder (temporário)
Caixa tracejada em amarelo (#FFD166) com texto mono. Sinaliza conteúdo que o dono do produto ainda precisa fornecer (foto do laudo, Reel, formas de pagamento, preço do Car Hunter); deve ser removida antes de publicar.

## Do's and Don'ts

### Do:
- **Do** manter a hierarquia etiqueta mono laranja, título Oswald, texto cinza claro em toda seção.
- **Do** usar #F93F06 em botões e faixas e #FF6B1A em texto pequeno e traços, ajustando só as variáveis `--brand` e `--accent`.
- **Do** aplicar a grade de 64px em todas as seções escuras e as marcas de canto apenas no hero e no cartão em destaque.
- **Do** manter o texto corrido em até 20px e alvos de toque de pelo menos 44px.
- **Do** garantir contraste mínimo de 4,5:1 e respeitar `prefers-reduced-motion`.

### Don't:
- **Don't** usar sombras para dar destaque; o destaque é borda laranja de 2px.
- **Don't** usar quadros 16:9 fixos, contador de página ou uma-ideia-por-tela: a página é rolagem contínua.
- **Don't** espalhar o laranja em texto corrido, fundos grandes fora da seção final ou ícones decorativos.
- **Don't** usar curvas em setas ou line-art de carro; setas são retas.
- **Don't** publicar com placeholders amarelos visíveis.
