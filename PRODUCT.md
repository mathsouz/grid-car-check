# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Compradores de carro usado, de 25 a 55 anos, em Curitiba e região metropolitana, que compram seminovos principalmente de particular ou de loja pequena/multimarcas (OLX, classificados). Chegam do Instagram (@grid.carconsulting), quase sempre pelo celular, com um carro específico em vista, desconfiados e com poucos dias para decidir. O trabalho deles: saber o que o carro realmente tem antes de assinar e ter base para negociar ou desistir. Incluem compradoras; sem paternalismo.

## Product Purpose

A Grid Car Check faz vistoria técnica pré-compra de carros usados. A landing page existe para levar o comprador a conversar no WhatsApp: um único CTA. Sucesso é o clique de WhatsApp com o modelo e o ano do carro. O visitante deve entender o que a Grid faz e para quem em 5 segundos, e por que vale pagar antes de assinar em 30 segundos.

## Positioning

O especialista fica do lado do comprador, sem comissão nem ligação com vendedor ou loja. A vistoria segue o roteiro do método do Matheus, registrado em app próprio que gera o laudo completo no final. Durante a vistoria o comprador recebe vídeos curtos no WhatsApp explicando o que está sendo encontrado. A Grid informa; comprar, negociar ou desistir é sempre decisão do cliente.

## Operating Context

- Quem faz: Matheus, especialista e único responsável pelas vistorias.
- A Grid vai até o carro e combina o horário direto com o vendedor ou a loja.
- Duração: de 2,5 a 3,5 horas, conforme o carro.
- Seis frentes inspecionadas: estrutura, pintura (espessímetro, que revela retoque e repintura), mecânica, scanner OBD (falhas registradas na central do carro), acessórios e documentação.
- Laudo: registro fotográfico, observações por categoria e opinião do especialista; serve de evidência concreta para pedir desconto.
- Serviço secundário, Car Hunter: busca no mercado carros que atendam aos critérios do cliente e entrega já vistoriados. Nunca compete com o CTA principal.

## Capabilities and Constraints

- Preço varia pelo valor do carro: até R$ 100 mil, R$ 500; de R$ 100 a 300 mil, R$ 700; de R$ 300 a 500 mil, R$ 900; de R$ 500 mil a R$ 1 milhão, R$ 1.200. Nos destaques usar "a partir de R$ 500"; nunca "R$ 500 fixo".
- Fora do escopo da página: dados de mercado macro, fluxograma, arquitetura da solução, análise de concorrentes, linguagem de pitch ou startup. Não citar concorrentes. Não acusar vendedores ou lojas: a Grid só mostra o que o carro realmente tem.
- Copy em português do Brasil, informal e direta, frases curtas; o dado é o protagonista.
- Rastreamento: preservar UTMs, disparar evento no clique de WhatsApp, Meta Pixel com ID ainda a definir.
- SEO local: título e descrição com "vistoria pré-compra Curitiba".
- WhatsApp: +55 41 99877-3856 (número direto, em `js/main.js`; o link antigo `https://wa.me/message/UKKN5VZKRID4P1` fica só como reserva).
- Logo (`assets/images/grid-logo.png`), vídeo do reel do caso de R$ 6 mil e vídeo do reel do Freelander já foram fornecidos e estão publicados na página.
- Meta Pixel instalado (ID 866001702810701) no `<head>` do index.html; o clique de WhatsApp já dispara `fbq('track', 'Contact')` via `js/main.js`.
- Google Analytics 4 instalado (ID G-SVH3X3QNZ6) no `<head>` do index.html, antes de qualquer outro script; o clique de WhatsApp já dispara `gtag('event', 'whatsapp_click', ...)` via `js/main.js`.
- Indefinido: formas de pagamento, preço do Car Hunter, domínio final (o HTML ainda usa o placeholder `DOMINIO-FINAL-AQUI` no canonical, og:url, og:image, twitter:image e no JSON-LD). Foto do laudo do Freelander não entra mais: o vídeo do reel já cobre esse caso.

## Stack

Static HTML, CSS e JavaScript sem build, hospedado na Vercel via GitHub (definido no README do projeto).

## Brand Commitments

Nome oficial: Grid Car Check (confirmado pelo usuário; o Instagram continua @grid.carconsulting). O logo em `assets/images/grid-logo.png` já foi substituído pelo texto "CAR CHECK". O usuário indicou como vinculante o sistema visual do deck da Grid (desenho técnico, grafite e laranja), com o laranja da logo (#F93F06) em botões e faixas; o detalhamento visual pertence ao new-work e ao DESIGN.md.

## Evidence on Hand

- "+300 vistorias já realizadas", "8 anos de experiência" e "zero clientes insatisfeitos em 2024" — números confirmados pelo usuário e já publicados na página (seções "Na prática" e "Quem faz"). Os depoimentos nominais da landing antiga (Carlos S., Ana P., Roberto L.) ficaram de fora: o usuário pediu para inventar o texto das citações, o que foi recusado por ser depoimento fabricado atribuído a clientes reais; entram só com o texto original, se aparecer.
- Reel da cliente que economizou R$ 6 mil por pedir vistoria antes de assinar. Frase aprovada: "Ela economizou R$ 6 mil só porque pediu uma vistoria antes de assinar. Você já pediu a sua?" Vídeo já publicado em `assets/video/reel-cliente.mp4`.
- Caso Land Rover Freelander 2 (2010): pintura original confirmada pelo espessímetro, 35 códigos de erro ativos no scanner e vazamento de óleo. Vídeo do reel já publicado em `assets/video/reel-freelander.mp4`; a foto do laudo em si ainda não foi fornecida.
- Foto do Matheus em `assets/images/matheus.jpg` (vinda da landing antiga).
- O usuário confirmou que os depoimentos e números da landing antiga (Carlos S., Ana P., Roberto L.; "300+ análises", "8 anos", "zero clientes insatisfeitos em 2024") podem ser tratados como evidência real, sem indicar quais valem para uso. Antes de publicar qualquer um, perguntar qual exatamente entra.
- Uso opcional só com fonte confirmada: carro com histórico de sinistro pode perder de 20% a 30% do valor de mercado. Fonte ainda não confirmada; não usar.
- Ausências que não podem ser fabricadas: fotos de clientes, fotos do laudo, outros depoimentos, prazos além dos listados.

## Product Principles

1. Uma página, um CTA: tudo leva à conversa no WhatsApp.
2. O dado é o protagonista: mostrar o que o carro tem, sem tom de herói nem acusação.
3. Neutralidade explícita: a Grid informa e a decisão é do cliente.
4. Nunca inventar prova, número, foto ou prazo; lacunas viram placeholder visível e aviso ao dono do produto.
5. Mobile primeiro: a decisão acontece no celular, vinda do Instagram.

## Accessibility & Inclusion

Contraste mínimo de 4,5:1, alvos de toque grandes e respeito a prefers-reduced-motion.
