'use strict';

// CONFIGURAÇÃO: caminhos relativos funcionam também em subpastas do GitHub Pages.
const CONFIG = {
  whatsapp: '5527999960198',
  instagram: '', // Ex.: 'https://www.instagram.com/seu_perfil/' — informe apenas o perfil oficial.
  instagramLabel: '@seu_perfil',
  heroVideo: '', // Ex.: 'assets/videos/hero.mp4' (sem áudio; imagem usada como alternativa).
  showreel: '', // Ex.: 'assets/videos/showreel.mp4'. Vazio: solicitar vídeos via WhatsApp.
  message: 'Olá, vim pelo site da JM Visuals e gostaria de solicitar um orçamento.'
};

// PLACEHOLDERS: referências visuais, não trabalhos ou clientes da JM Visuals.
// Para um vídeo real: type: 'video', src: 'assets/videos/projeto.mp4', poster: 'assets/images/capa.jpg'.
// Ao inserir trabalhos reais, altere também o aviso acima da galeria em index.html.
const PROJECTS = [
  { title: 'Cenários para um sim', category: 'Casamentos', src: 'assets/images/wedding.jpg', alt: 'Espaço de cerimônia decorado para um casamento', illustrative: true },
  { title: 'A energia de cada encontro', category: 'Eventos', src: 'assets/images/event.jpg', alt: 'Público reunido em um evento musical', illustrative: true },
  { title: 'Arquitetura em perspectiva', category: 'Imóveis', src: 'assets/images/city.jpg', alt: 'Linhas e fachadas de edifícios contemporâneos', illustrative: true },
  { title: 'Histórias que conectam', category: 'Institucional', src: 'assets/images/city.jpg', alt: 'Detalhes arquitetônicos de edifícios empresariais', illustrative: true },
  { title: 'O cenário de uma história', category: 'Casamentos', src: 'assets/images/landscape.jpg', alt: 'Montanhas e lago em uma paisagem natural', illustrative: true },
  { title: 'Lugares que inspiram', category: 'Institucional', src: 'assets/images/coast.jpg', alt: 'Enseada com mar azul e vegetação', illustrative: true }
];
const $ = (selector) => document.querySelector(selector);
// Ícone vetorial de reprodução para vídeos, sem depender de fontes ou emojis.
function createPlayIcon() {
  const ns = 'http://www.w3.org/2000/svg';
  const icon = document.createElementNS(ns, 'svg');
  for (const [name, value] of Object.entries({ class: 'direction-icon', viewBox: '0 0 24 24', width: '20', height: '20', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false' })) icon.setAttribute(name, value);
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', 'M8 5v14l11-7Z');
  icon.append(path);
  return icon;
}
const whatsappURL = (message = CONFIG.message) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappURL(); });
document.querySelectorAll('[data-service]').forEach(link => {
  link.href = whatsappURL(`Olá, JM Visuals! Gostaria de solicitar um orçamento para ${link.dataset.service}.`);
});
document.querySelectorAll('[data-instagram]').forEach(link => {
  link.href = CONFIG.instagram || whatsappURL('Olá, JM Visuals! Poderiam me enviar o perfil oficial de vocês no Instagram?');
  if (CONFIG.instagram) link.setAttribute('aria-label', 'Instagram da JM Visuals');
});
if (CONFIG.instagram) $('[data-instagram-label]').textContent = CONFIG.instagramLabel;
$('#year').textContent = new Date().getFullYear();

// Menu móvel: clique, Escape e troca para desktop restauram o estado fechado.
const menu = $('#navigation');
const toggle = $('.menu-toggle');
function closeMenu() {
  menu.classList.remove('open'); $('#header').classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  menu.classList.toggle('open', open); $('#header').classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => { if (!$('#header').contains(event.target)) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
});
matchMedia('(min-width: 1000px)').addEventListener('change', closeMenu);
const navLinks = [...menu.querySelectorAll('a[href^="#"]')];
function updateScroll() {
  $('#header').classList.toggle('scrolled', scrollY > 35);
  $('#back-top').classList.toggle('visible', scrollY > 600);
  const current = navLinks.reduce((active, link) => $(link.hash).getBoundingClientRect().top <= 160 ? link : active, navLinks[0]);
  navLinks.forEach(link => {
    link.classList.toggle('active', link === current);
    if (link === current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
}
let scrollPending = false;
addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(() => { updateScroll(); scrollPending = false; }); }
}, { passive: true });
updateScroll();

// O conteúdo permanece visível quando IntersectionObserver não está disponível.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => { element.classList.add('ready'); observer.observe(element); });
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (CONFIG.heroVideo && !reducedMotion.matches) {
  const video = document.createElement('video');
  video.className = 'hero-video'; video.muted = true; video.loop = true; video.playsInline = true;
  video.autoplay = true; video.preload = 'metadata'; video.setAttribute('aria-hidden', 'true');
  video.src = CONFIG.heroVideo;
  video.addEventListener('error', () => video.remove());
  $('.hero').prepend(video);
  video.play().catch(() => video.remove());
  reducedMotion.addEventListener('change', event => { if (event.matches) { video.pause(); video.remove(); } });
  document.addEventListener('visibilitychange', () => {
    if (!video.isConnected) return;
    if (document.hidden) video.pause(); else video.play().catch(() => {});
  });
}

// Modal nativo: contém o foco, fecha com Escape e devolve o foco ao botão de origem.
const modal = $('#media-modal');
let modalTrigger;
function openMedia(project, trigger) {
  modalTrigger = trigger;
  const media = document.createElement(project.type === 'video' ? 'video' : 'img');
  media.src = project.src;
  if (project.type === 'video') { media.controls = true; media.playsInline = true; media.preload = 'metadata'; if (project.poster) media.poster = project.poster; }
  else media.alt = project.alt || project.title;
  media.addEventListener('error', () => { $('#modal-description').textContent = 'Não foi possível carregar este arquivo. Entre em contato para conhecer nossos registros.'; });
  $('#modal-content').replaceChildren(media);
  $('#modal-title').textContent = project.title;
  $('#modal-description').textContent = project.illustrative ? 'Imagem ilustrativa de referência. Não representa um trabalho realizado pela JM Visuals.' : project.description || project.category || '';
  modal.showModal(); document.body.classList.add('modal-open');
}
$('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  const bounds = modal.getBoundingClientRect();
  if (event.target === modal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) modal.close();
});
modal.addEventListener('close', () => {
  const video = modal.querySelector('video');
  if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
  $('#modal-content').replaceChildren(); document.body.classList.remove('modal-open');
  modalTrigger?.focus();
});
function renderProjects(category = 'Todos') {
  const projects = PROJECTS.filter(project => category === 'Todos' || project.category === category);
  $('#portfolio-grid').replaceChildren(...projects.map(project => {
    const button = document.createElement('button'); button.className = 'project-card'; button.type = 'button';
    button.setAttribute('aria-label', `Abrir ${project.title}${project.illustrative ? ' — imagem ilustrativa' : ''}`);
    const frame = document.createElement('div'); frame.className = 'project-image';
    const img = document.createElement('img'); img.src = project.poster || project.src; img.alt = project.alt || project.title; img.loading = 'lazy'; img.width = 1000; img.height = 667;
    const badge = document.createElement('span'); badge.className = 'project-type'; badge.textContent = project.illustrative ? 'REFERÊNCIA VISUAL' : project.type === 'video' ? 'VÍDEO' : 'FOTOGRAFIA';
    frame.append(img, badge);
    if (project.type === 'video') {
      const play = document.createElement('span'); play.className = 'project-arrow'; play.append(createPlayIcon()); play.setAttribute('aria-hidden', 'true');
      frame.append(play);
    }
    const caption = document.createElement('div'); caption.className = 'project-caption';
    const title = document.createElement('h3'); title.textContent = project.title;
    const label = document.createElement('p'); label.textContent = project.category.toUpperCase(); caption.append(title, label);
    button.append(frame, caption); button.addEventListener('click', () => openMedia(project, button)); return button;
  }));
  $('#filter-status').textContent = `${projects.length} itens exibidos. Categoria: ${category}.`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(filter => { filter.classList.toggle('selected', filter === button); filter.setAttribute('aria-pressed', String(filter === button)); });
  renderProjects(button.dataset.filter);
}));
renderProjects();
if (CONFIG.showreel) {
  const link = $('#showreel-link'); link.replaceChildren('Assistir ao vídeo de apresentação ', createPlayIcon()); link.href = CONFIG.showreel;
  $('#showreel-note').hidden = true;
  link.addEventListener('click', event => { event.preventDefault(); openMedia({ title: 'Veja o mundo pela nossa perspectiva.', type: 'video', src: CONFIG.showreel, poster: 'assets/images/coast.jpg' }, link); });
}

// Formulário sem servidor: nada é transmitido até o usuário enviar no WhatsApp.
const form = $('#contact-form');
const now = new Date();
$('#date').min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
form.addEventListener('input', event => event.target.setCustomValidity?.(''));
form.addEventListener('submit', event => {
  event.preventDefault();
  for (const [id, min] of [['name', 2], ['city', 2], ['message', 10]]) {
    const field = $(`#${id}`); field.value = field.value.trim();
    field.setCustomValidity(field.value.length < min ? `Preencha este campo com pelo menos ${min} caracteres.` : '');
  }
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const date = data.get('date') ? data.get('date').split('-').reverse().join('/') : 'data a combinar';
  const message = `Olá, JM Visuals! Meu nome é ${data.get('name')}. Tenho interesse em ${data.get('service')}, para o dia ${date}, em ${data.get('city')}. Detalhes: ${data.get('message')}.`;
  const url = whatsappURL(message);
  const fallback = document.createElement('a'); fallback.href = url; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer'; fallback.textContent = 'Abrir a mensagem no WhatsApp';
  $('#form-status').replaceChildren('Mensagem preparada. Se a nova aba não abriu: ', fallback);
  window.open(url, '_blank', 'noopener,noreferrer');
});
