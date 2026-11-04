import { collections, readSaved, writeSaved, buildInquiry } from './lib/store.js';

const dialog = document.querySelector('#site-dialog');
const content = document.querySelector('#dialog-content');
const menu = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
let saved = readSaved();
let lastFocus;
let currentView = '';
let toastTimer;

function icon(name) { return `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`; }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

function notify(message) {
  const toast = document.querySelector('.toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

function updateBag() {
  document.querySelector('.bag-count').textContent = saved.length;
  document.querySelector('.bag-button').setAttribute('aria-label', `Open shortlist, ${saved.length} saved collections`);
}

function closeMenu() {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}

function openDialog(view, markup) {
  closeMenu();
  currentView = view;
  if (!dialog.open) lastFocus = document.activeElement;
  content.innerHTML = markup;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
  const focusTarget = content.querySelector('[autofocus]') || document.querySelector('.dialog-close');
  requestAnimationFrame(() => focusTarget.focus());
}

function openCollection(id) {
  const item = collections.find(item => item.id === id);
  if (!item) return;
  const selected = saved.includes(id);
  openDialog(`collection:${id}`, `<p class="section-eyebrow">OUR COLLECTIONS</p>
    <h2 id="dialog-title">${item.name}</h2>
    <img class="detail-image" src="${item.image}" alt="${item.alt}">
    <p>${item.description}</p>
    <p class="subtle">Collection imagery is illustrative. Current pieces, gold purity, weight, availability, and prices must be confirmed with AMZ Jewelry.</p>
    <div class="dialog-actions"><button type="button" class="button button-gold" data-save="${id}">${icon(selected ? 'check' : 'bag')}<span>${selected ? 'Saved to your shortlist' : 'Save to shortlist'}</span></button>
    <button type="button" class="button button-outline" data-inquire="${id}">Prepare an inquiry${icon('arrow')}</button></div>`);
}

function renderResults(query = '') {
  const results = collections.filter(item => `${item.name} ${item.keywords}`.toLowerCase().includes(query.trim().toLowerCase()));
  const list = content.querySelector('.search-results');
  list.innerHTML = results.length ? results.map(item => `<button class="search-result" type="button" data-collection="${item.id}"><img src="${item.image}" alt=""><span>${item.name}</span>${icon('arrow')}</button>`).join('') : '<p class="empty-state">No collections found. Try rings, necklaces, earrings, or bracelets.</p>';
  content.querySelector('#search-count').textContent = `${results.length} ${results.length === 1 ? 'collection' : 'collections'} found`;
}

function openSearch() {
  openDialog('search', `<p class="section-eyebrow">FIND SOMETHING BEAUTIFUL</p><h2 id="dialog-title">Explore our collections</h2>
    <label class="field" for="collection-search">Search jewelry<input id="collection-search" type="search" placeholder="Try rings or necklaces" autocomplete="off" autofocus></label>
    <p id="search-count" class="subtle" role="status"></p><div class="search-results"></div>`);
  renderResults();
  content.querySelector('input').addEventListener('input', e => renderResults(e.target.value));
}

function openBag(isAccount = false) {
  const items = collections.filter(item => saved.includes(item.id));
  openDialog(isAccount ? 'account' : 'bag', `<p class="section-eyebrow">AMZ JEWELRY</p><h2 id="dialog-title">${isAccount ? 'Your saved collection' : 'Your shortlist'}</h2>
    <p class="subtle">Saved on this browser for your next inquiry. This is a shortlist, not a reservation or shopping cart. Account sign-in and checkout are not connected.</p>
    <div class="saved-list">${items.length ? items.map(item => `<div class="saved-row"><img src="${item.image}" alt=""><span>${item.name}</span><button type="button" class="icon-button" data-remove="${item.id}" aria-label="Remove ${item.name} from shortlist">${icon('close')}</button></div>`).join('') : '<p class="empty-state">Your shortlist is empty. Explore the collections and save the styles you like.</p>'}</div>
    <div class="dialog-actions">${items.length ? '<button type="button" class="button button-gold" data-open="contact">Prepare an inquiry'+icon('arrow')+'</button>' : ''}<button type="button" class="button ${items.length ? 'button-outline' : 'button-gold'}" data-browse>Browse collections${icon('arrow')}</button></div>`);
}

function openInquiry(kind, selectedId = '') {
  const selling = kind === 'sell';
  const selection = selectedId ? collections.find(item => item.id === selectedId)?.name : collections.filter(item => saved.includes(item.id)).map(item => item.name).join(', ');
  openDialog(kind, `<p class="section-eyebrow">${selling ? 'SELL YOUR GOLD' : 'CONTACT AMZ JEWELRY'}</p><h2 id="dialog-title">${selling ? 'Tell us about your gold' : 'Prepare your inquiry'}</h2>
    <p>${selling ? 'Start with a few details about your jewelry. A final valuation requires an in-person inspection and confirmation of gold purity and weight.' : 'Tell AMZ what you are looking for, or ask about a piece you like.'}</p>
    <p class="subtle form-note">This prepares a draft on your device. It does not send a message. AMZ’s official contact channel has not been connected yet.</p>
    <form id="inquiry-form">
      <label class="field" for="inquiry-name">Your name (optional)<input id="inquiry-name" name="name" autocomplete="name" maxlength="100"></label>
      ${selling ? '<label class="field" for="jewelry-type">Jewelry type<select name="type" id="jewelry-type" required><option value="">Select a jewelry type</option><option>Ring</option><option>Necklace</option><option>Earrings</option><option>Bracelet</option><option>Other gold jewelry</option></select></label><label class="field" for="gold-details">Purity and weight, if known<input name="gold" id="gold-details" placeholder="For example: 18K, approximately 5 grams" maxlength="160"></label>' : ''}
      <label class="field" for="inquiry-message">${selling ? 'Tell us about the piece' : 'Your message'}<textarea id="inquiry-message" name="message" required maxlength="2000" placeholder="${selling ? 'Describe the piece and its condition.' : 'What would you like to know?'}">${!selling && selection ? escapeHtml(`I would like to inquire about: ${selection}. Please share current availability, gold purity, weight, and pricing.`) : ''}</textarea></label>
      <button type="submit" class="button button-gold">Prepare draft${icon('arrow')}</button>
    </form>
    <section class="form-result" hidden aria-label="Your inquiry draft"><p role="status">Your draft is ready. It has not been sent.</p><label class="field" for="draft-text">Review your draft<textarea id="draft-text" readonly></textarea></label><div class="dialog-actions"><button type="button" class="button button-gold" data-download>Download draft</button><button type="button" class="button button-outline" data-copy>Copy draft</button></div></section>`);
  content.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const text = buildInquiry(kind, data);
    const result = content.querySelector('.form-result');
    result.hidden = false;
    result.querySelector('textarea').value = text;
    result.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'nearest'});
  });
}

function openAbout() {
  openDialog('about', `<p class="section-eyebrow">WHY AMZ JEWELRY</p><h2 id="dialog-title">More Than Jewelry</h2>
    <p>A trusted place to buy and sell gold jewelry, offering authentic pieces, fair value, and a seamless, secure experience for every customer.</p>
    <p>Explore rings, necklaces, earrings, and bracelets, or prepare an inquiry about selling your gold.</p>
    <p class="subtle">Ask about the specific piece’s purity, weight, condition, and price before making a purchase. Gold-selling valuations require an inspection.</p>
    <div class="dialog-actions"><button type="button" class="button button-gold" data-browse>Explore collections${icon('arrow')}</button><button type="button" class="button button-outline" data-open="sell">Sell your gold${icon('exchange')}</button></div>`);
}

function openView(view) {
  ({search:openSearch, bag:()=>openBag(), account:()=>openBag(true), sell:()=>openInquiry('sell'), contact:()=>openInquiry('contact'), about:openAbout})[view]?.();
}

document.addEventListener('click', async event => {
  const target = event.target.closest('button,a');
  if (!target) return;
  if (target.dataset.open) openView(target.dataset.open);
  if (target.dataset.collection) openCollection(target.dataset.collection);
  if (target.dataset.inquire) openInquiry('contact', target.dataset.inquire);
  if (target.dataset.save) {
    const id = target.dataset.save;
    if (!saved.includes(id)) saved.push(id);
    const persisted = writeSaved(saved);
    updateBag();
    target.innerHTML = `${icon('check')}<span>Saved to your shortlist</span>`;
    notify(persisted ? 'Collection saved to your shortlist.' : 'Saved for this visit. Browser storage is unavailable.');
  }
  if (target.dataset.remove) {
    saved = saved.filter(id => id !== target.dataset.remove);
    writeSaved(saved);
    updateBag();
    openBag(currentView === 'account');
  }
  if (target.hasAttribute('data-browse')) {
    dialog.close();
    document.querySelector('#collections').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }
  if (target.hasAttribute('data-download')) {
    const url = URL.createObjectURL(new Blob([content.querySelector('#draft-text').value], {type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AMZ-Jewelry-Inquiry.txt';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  if (target.hasAttribute('data-copy')) {
    const draft = content.querySelector('#draft-text');
    try { await navigator.clipboard.writeText(draft.value); notify('Draft copied. It has not been sent.'); }
    catch { draft.focus(); draft.select(); notify('Select and copy the highlighted draft.'); }
  }
  if (target.closest('.main-nav') || target.closest('.brand')) closeMenu();
});

menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 769px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastFocus?.focus(); });

const slides = [
  {src:'assets/hero.webp', alt:'Gold bangles, floral earrings, and a gold chain on burgundy satin'},
  {src:'assets/ring.webp', alt:'An ornate floral gold ring on burgundy satin'},
  {src:'assets/necklace.webp', alt:'A sunburst pendant on a gold chain'},
];
let currentSlide = 0;
function setSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  const image = document.querySelector('.hero-image');
  image.src = slides[currentSlide].src;
  image.alt = slides[currentSlide].alt;
  document.querySelector('.hero').classList.toggle('alternate-slide', currentSlide !== 0);
  document.querySelectorAll('[data-slide]').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
    dot.setAttribute('aria-pressed', String(i === currentSlide));
  });
}
document.querySelectorAll('[data-slide]').forEach(dot => dot.addEventListener('click', () => setSlide(Number(dot.dataset.slide))));
document.querySelector('.hero-pagination').addEventListener('keydown', event => {
  if (!['ArrowLeft','ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  setSlide(currentSlide + (event.key === 'ArrowRight' ? 1 : -1));
  document.querySelector(`[data-slide="${currentSlide}"]`).focus();
});
updateBag();
