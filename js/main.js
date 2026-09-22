// ============================================================
// CONFIGURAÇÃO — edite aqui
// ============================================================
const CONFIG = {
  // Número com DDI + DDD, só dígitos. Ex.: "5541999999999".
  // Se ficar vazio, os botões usam o link do WhatsApp do site antigo (sem mensagem pré-preenchida).
  whatsappNumero: "5541998773856",
  whatsappLinkFallback: "https://wa.me/message/UKKN5VZKRID4P1",
  mensagemPadrao: "Oi! Vi a Grid no Instagram e quero saber sobre a vistoria pré-compra. O carro é um ",
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
configurarBotaoFixo();
configurarMarcasDeCanto();
configurarEntradaDosCards();
configurarReel();
