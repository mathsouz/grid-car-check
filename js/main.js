// ============================================================
// CONFIGURAÇÃO — edite aqui
// ============================================================
const CONFIG = {
  // Número com DDI + DDD, só dígitos. Ex.: "5541999999999".
  // Se ficar vazio, os botões usam o link do WhatsApp do site antigo (sem mensagem pré-preenchida).
  whatsappNumero: "5541998773856",
  whatsappLinkFallback: "https://wa.me/message/UKKN5VZKRID4P1",
  // Padrão neutro: serve Home/Serviços/Blog. A página /instagram/ sobrescreve com data-mensagem em cada link.
  mensagemPadrao: "Oi! Vi o site da Grid e quero saber sobre a vistoria pré-compra. O carro é um ",
};

// ============================================================
// WhatsApp: monta o link, guarda UTMs e dispara o evento do Pixel
// ============================================================
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"];

function guardarUtms() {
  try {
    const params = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((k) => {
      if (params.get(k)) sessionStorage.setItem(k, params.get(k));
    });
  } catch (e) { /* sessionStorage pode estar bloqueado */ }
}

function lerUtms() {
  const utms = {};
  try {
    UTM_KEYS.forEach((k) => {
      const v = sessionStorage.getItem(k);
      if (v) utms[k] = v;
    });
  } catch (e) { /* ignora */ }
  return utms;
}

function montarLinkWhatsapp(mensagem) {
  if (!CONFIG.whatsappNumero) return CONFIG.whatsappLinkFallback;
  return `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}

function configurarBotoesWhatsapp() {
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    const mensagem = el.dataset.mensagem || CONFIG.mensagemPadrao;
    el.href = montarLinkWhatsapp(mensagem);
    el.target = "_blank";
    el.rel = "noopener";
    el.addEventListener("click", () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "whatsapp_click", lerUtms());
      }
      if (typeof window.fbq === "function") {
        window.fbq("track", "Contact", lerUtms());
      }
    });
  });
}

// ============================================================
// Interface
// ============================================================
function configurarAno() {
  document.getElementById("ano").textContent = new Date().getFullYear();
}

// Números sobem de 0 até o valor real ao entrar na tela, uma vez só.
// Sem JS, com IntersectionObserver indisponível ou com movimento reduzido, já aparecem no valor final.
function configurarContadores() {
  const elementos = document.querySelectorAll(".count-up");
  if (!elementos.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elementos.forEach((el) => { el.textContent = el.dataset.target; });
    return;
  }
  elementos.forEach((el) => { el.textContent = "0"; });
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const alvo = parseInt(e.target.dataset.target, 10);
      const duracao = 1200;
      const inicio = performance.now();
      const passo = (agora) => {
        const progresso = Math.min((agora - inicio) / duracao, 1);
        const suavizado = 1 - Math.pow(1 - progresso, 3);
        e.target.textContent = Math.round(alvo * suavizado);
        if (progresso < 1) requestAnimationFrame(passo);
        else e.target.classList.add("bump");
      };
      requestAnimationFrame(passo);
    });
  }, { threshold: 0.6 });
  elementos.forEach((el) => obs.observe(el));
}

// Calculadora de preço: escolher a faixa do carro anima o valor da vistoria e destaca a linha da tabela.
// Sem JS fica só a tabela, que já mostra todas as faixas.
function configurarCalculadora() {
  const calc = document.querySelector("[data-calc]");
  if (!calc) return;
  calc.hidden = false;
  const botoes = calc.querySelectorAll(".chip");
  const saida = calc.querySelector(".calc__val");
  const barra = calc.querySelector(".calc__bar");
  const linhas = document.querySelectorAll(".price tbody tr");
  const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const moeda = (n) => "R$\u00a0" + n.toLocaleString("pt-BR");
  let mostrado = parseInt(saida.dataset.valor, 10);
  let raf = 0;
  function animarPara(alvo) {
    cancelAnimationFrame(raf);
    if (reduz) { mostrado = alvo; saida.textContent = moeda(alvo); return; }
    const de = mostrado;
    const inicio = performance.now();
    saida.classList.remove("bump"); void saida.offsetWidth; saida.classList.add("bump");
    barra.classList.remove("draw"); void barra.offsetWidth; barra.classList.add("draw");
    const passo = (agora) => {
      const p = Math.min((agora - inicio) / 550, 1);
      mostrado = Math.round(de + (alvo - de) * (1 - Math.pow(1 - p, 3)));
      saida.textContent = moeda(mostrado);
      if (p < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
  }
  botoes.forEach((botao, i) => {
    botao.addEventListener("click", () => {
      botoes.forEach((b) => b.setAttribute("aria-pressed", String(b === botao)));
      linhas.forEach((tr, j) => tr.classList.toggle("hot", j === i));
      animarPara(parseInt(botao.dataset.valor, 10));
    });
  });
}

// Laudo 3D "toque e veja": abas entre as telas reais e legenda de cores clicável.
function configurarLaudoDemo() {
  const demo = document.querySelector("[data-laudo-demo]");
  if (!demo) return;
  const abas = Array.from(demo.querySelectorAll('[role="tab"]'));
  const paineis = abas.map((a) => document.getElementById(a.getAttribute("aria-controls")));
  function ativar(i, foco) {
    abas.forEach((aba, j) => {
      const ligada = j === i;
      aba.setAttribute("aria-selected", String(ligada));
      aba.tabIndex = ligada ? 0 : -1;
      paineis[j].hidden = !ligada;
      paineis[j].classList.toggle("in", ligada);
    });
    if (foco) abas[i].focus();
  }
  abas.forEach((aba, i) => {
    aba.addEventListener("click", () => ativar(i, false));
    aba.addEventListener("keydown", (ev) => {
      if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft") return;
      ev.preventDefault();
      ativar((i + (ev.key === "ArrowRight" ? 1 : abas.length - 1)) % abas.length, true);
    });
  });
  // Pré-carrega as outras telas quando a seção se aproxima, para a troca de aba não piscar em branco
  if ("IntersectionObserver" in window) {
    const pre = new IntersectionObserver((entradas) => {
      if (!entradas[0].isIntersecting) return;
      pre.disconnect();
      paineis.forEach((img) => { if (img.getAttribute("loading")) img.loading = "eager"; });
    }, { rootMargin: "600px 0px" });
    pre.observe(demo);
  }
  const def = demo.querySelector(".ld__def");
  const padrao = def.textContent;
  const cores = demo.querySelectorAll(".sw");
  cores.forEach((cor) => {
    cor.addEventListener("click", () => {
      const estavaLigada = cor.getAttribute("aria-pressed") === "true";
      cores.forEach((c) => c.setAttribute("aria-pressed", "false"));
      if (estavaLigada) { def.textContent = padrao; return; }
      cor.setAttribute("aria-pressed", "true");
      const nome = document.createElement("strong");
      nome.textContent = cor.dataset.nome;
      def.textContent = "";
      def.append(nome, " — " + cor.dataset.def);
    });
  });
}

// Laudo "ao vivo" no hero: os apontamentos entram um a um quando o cartão aparece na tela.
// Sem JS, com movimento reduzido ou sem IntersectionObserver, já aparece completo.
function configurarLaudoAoVivo() {
  const cartao = document.querySelector("[data-live]");
  if (!cartao) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  cartao.classList.add("live--armed");
  const obs = new IntersectionObserver((entradas) => {
    if (!entradas[0].isIntersecting) return;
    obs.disconnect();
    cartao.classList.add("live--run");
  }, { threshold: 0.5 });
  obs.observe(cartao);
}

// Menu mobile: o botão abre/fecha a navegação; qualquer link clicado fecha de novo
function configurarMenu() {
  const botao = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav-principal");
  if (!botao || !nav) return;
  botao.addEventListener("click", () => {
    const aberto = nav.classList.toggle("is-open");
    botao.setAttribute("aria-expanded", String(aberto));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      botao.setAttribute("aria-expanded", "false");
    });
  });
}

// Botão fixo no mobile: aparece depois que o hero sai da tela e some na faixa final
function configurarBotaoFixo() {
  const botao = document.querySelector(".sticky-cta");
  const hero = document.getElementById("topo");
  const final = document.querySelector(".statement");
  if (!botao || !hero || !("IntersectionObserver" in window)) return;
  let heroVisivel = true;
  let finalVisivel = false;
  const atualizar = () => botao.classList.toggle("is-visible", !heroVisivel && !finalVisivel);
  new IntersectionObserver(([e]) => { heroVisivel = e.isIntersecting; atualizar(); }).observe(hero);
  if (final) new IntersectionObserver(([e]) => { finalVisivel = e.isIntersecting; atualizar(); }).observe(final);
}

// Cartão em destaque: as marcas de canto travam quando ele entra na tela
function configurarMarcasDeCanto() {
  const cartoes = document.querySelectorAll(".frame--card");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("lock");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  cartoes.forEach((el) => { el.classList.add("armed"); obs.observe(el); });
}

// Cards e passos entram em cascata; as setas do fluxo se desenham em sequência.
// Tudo é armado por aqui: sem JS (ou com movimento reduzido) o conteúdo já aparece parado.
function configurarEntradaDosCards() {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const itens = e.target.querySelectorAll(".rv");
      const setas = e.target.querySelectorAll(".arrow.armed");
      itens.forEach((el) => el.classList.add("in"));
      setas.forEach((el) => el.classList.add("lock"));
      // Depois da entrada, devolve o elemento ao estilo normal para o hover responder sem atraso
      setTimeout(() => itens.forEach((el) => el.classList.remove("rv", "in")), 1400);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".grid3, .steps, .proof, .ledger").forEach((grupo) => {
    grupo.querySelectorAll(".card, .ledger__row").forEach((el, i) => {
      el.style.setProperty("--i", Math.min(i, 5));
      el.classList.add("rv");
    });
    grupo.querySelectorAll(".arrow").forEach((el, i) => {
      el.style.setProperty("--i", i);
      el.classList.add("armed");
    });
    obs.observe(grupo);
  });
}

// Reels da página: cada um toca sozinho (mudo, em loop) só enquanto está na tela; o clique abre o Instagram.
// Sem JS, com movimento reduzido ou economia de dados, fica só a imagem de capa de cada um.
function configurarReel() {
  const links = document.querySelectorAll("[data-reel]");
  if (!links.length) return;
  links.forEach((link) => {
    const video = link.querySelector("video");
    if (!video) return;
    link.addEventListener("click", () => {
      if (typeof window.gtag === "function") window.gtag("event", "reel_click", lerUtms());
      if (typeof window.fbq === "function") window.fbq("trackCustom", "ReelClick", lerUtms());
    });
  });
  const economia = navigator.connection && navigator.connection.saveData;
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (economia || reduzMovimento) {
    links.forEach((link) => {
      const video = link.querySelector("video");
      if (video) video.pause();
    });
    return;
  }
  if (!("IntersectionObserver" in window)) return;
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      e.target.muted = true;
      if (e.isIntersecting) {
        const promessa = e.target.play();
        if (promessa && typeof promessa.catch === "function") promessa.catch(() => {});
      } else {
        e.target.pause();
      }
    });
  }, { threshold: 0.4 });
  links.forEach((link) => {
    const video = link.querySelector("video");
    if (video) obs.observe(video);
  });
}

guardarUtms();
configurarBotoesWhatsapp();
configurarAno();
configurarMenu();
configurarBotaoFixo();
configurarMarcasDeCanto();
configurarEntradaDosCards();
configurarReel();
configurarContadores();
configurarCalculadora();
configurarLaudoDemo();
configurarLaudoAoVivo();
