import { getLang, onLangChange, t } from '../data/i18n.js';
import { soundEngine } from './soundEngine.js';

/**
 * Keyboard-accessible Command Palette (Cmd+K / Ctrl+K) localized for ID and EN.
 */
export function initCommandPalette({
  setTimeMode,
  setLanguage,
  toggleLamp,
  onRequestSection,
  onPrintCv,
}) {
  const modal = document.getElementById('commandModal');
  const openBtn = document.getElementById('commandTriggerBtn');
  const closeBtn = document.getElementById('commandCloseBtn');
  const filterInput = document.getElementById('commandSearchInput');
  const listEl = document.getElementById('commandActionList');

  if (!modal || !listEl || !filterInput) return null;

  function getActions() {
    const lang = getLang();
    if (lang === 'en') {
      return [
        { id: 'nav-home', label: 'Back to Living Workspace', hint: 'Top', run: () => onRequestSection?.('#home') },
        { id: 'nav-ai', label: 'Open Ask AI Syamsul', hint: '#ai-studio', run: () => onRequestSection?.('#ai-studio') },
        { id: 'nav-skills', label: 'Explore Skill Constellation', hint: '#skills', run: () => onRequestSection?.('#skills') },
        { id: 'nav-projects', label: 'Run 5 Project Simulations', hint: '#projects', run: () => onRequestSection?.('#projects') },
        { id: 'nav-github', label: 'Browse GitHub Repos @syamban14', hint: '#github-repos', run: () => onRequestSection?.('#github-repos') },
        { id: 'nav-exp', label: 'Explore Career Journey 2011 - 2026', hint: '#experience', run: () => onRequestSection?.('#experience') },
        { id: 'nav-contact', label: 'Compose Collaboration Brief', hint: '#contact', run: () => onRequestSection?.('#contact') },
        { id: 'lang-id', label: 'Switch Language: Bahasa Indonesia', hint: 'ID', run: () => setLanguage?.('id') },
        { id: 'mode-pagi', label: 'Studio Lighting: Bright Day', hint: 'Day Mode', run: () => setTimeMode?.('pagi') },
        { id: 'mode-senja', label: 'Studio Lighting: Harbor Dusk', hint: 'Dusk Mode', run: () => setTimeMode?.('senja') },
        { id: 'mode-malam', label: 'Studio Lighting: Night Focus', hint: 'Night Mode', run: () => setTimeMode?.('malam') },
        { id: 'toggle-lamp', label: 'Toggle Desk Lamp On / Off', hint: '2.5D Room', run: () => toggleLamp?.() },
        { id: 'print-cv', label: 'Print One-Page ATS CV Summary', hint: 'PDF / Print', run: () => onPrintCv?.() },
      ];
    }

    return [
      { id: 'nav-home', label: 'Kembali ke Living Workspace', hint: 'Bagian atas', run: () => onRequestSection?.('#home') },
      { id: 'nav-ai', label: 'Buka Tanya AI Syamsul', hint: '#ai-studio', run: () => onRequestSection?.('#ai-studio') },
      { id: 'nav-skills', label: 'Jelajahi Konstelasi Keahlian', hint: '#skills', run: () => onRequestSection?.('#skills') },
      { id: 'nav-projects', label: 'Jalankan Simulasi 5 Proyek', hint: '#projects', run: () => onRequestSection?.('#projects') },
      { id: 'nav-github', label: 'Jelajahi Repositori GitHub @syamban14', hint: '#github-repos', run: () => onRequestSection?.('#github-repos') },
      { id: 'nav-exp', label: 'Telusuri Jejak Karir 2011 - 2026', hint: '#experience', run: () => onRequestSection?.('#experience') },
      { id: 'nav-contact', label: 'Susun Brief Kolaborasi & Kontak', hint: '#contact', run: () => onRequestSection?.('#contact') },
      { id: 'lang-en', label: 'Ubah Bahasa: English (EN)', hint: 'EN', run: () => setLanguage?.('en') },
      { id: 'mode-pagi', label: 'Ubah Suasana Studio: Pagi Cerah', hint: 'Mode Terang', run: () => setTimeMode?.('pagi') },
      { id: 'mode-senja', label: 'Ubah Suasana Studio: Senja Cilegon', hint: 'Mode Senja', run: () => setTimeMode?.('senja') },
      { id: 'mode-malam', label: 'Ubah Suasana Studio: Malam Fokus', hint: 'Mode Malam', run: () => setTimeMode?.('malam') },
      { id: 'toggle-lamp', label: 'Nyalakan / Matikan Lampu Meja', hint: 'Ruang 2.5D', run: () => toggleLamp?.() },
      { id: 'print-cv', label: 'Cetak Ringkasan CV ATS Satu Halaman', hint: 'PDF / Print', run: () => onPrintCv?.() },
    ];
  }

  function renderActions(query = '') {
    const q = query.trim().toLowerCase();
    const actions = getActions();
    const visible = q
      ? actions.filter((a) => a.label.toLowerCase().includes(q) || a.hint.toLowerCase().includes(q))
      : actions;

    if (!visible.length) {
      listEl.innerHTML = `<p class="command-empty">${t('cmdEmpty')}</p>`;
      return;
    }

    listEl.innerHTML = visible
      .map(
        (a) => `
      <button type="button" class="command-item" data-cmd-id="${a.id}">
        <span>${a.label}</span>
        <span class="command-hint">${a.hint}</span>
      </button>
    `
      )
      .join('');
  }

  function open() {
    modal.hidden = false;
    filterInput.value = '';
    renderActions('');
    window.requestAnimationFrame(() => filterInput.focus());
  }

  function close() {
    modal.hidden = true;
  }

  openBtn?.addEventListener('click', () => {
    soundEngine.playClick();
    open();
  });

  closeBtn?.addEventListener('click', () => {
    soundEngine.playClick();
    close();
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });

  filterInput.addEventListener('input', () => {
    renderActions(filterInput.value);
  });

  listEl.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-cmd-id]');
    if (!btn) return;
    const action = getActions().find((a) => a.id === btn.dataset.cmdId);
    if (!action) return;
    soundEngine.playClick();
    close();
    action.run();
  });

  window.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (modal.hidden) open();
      else close();
    } else if (event.key === 'Escape' && !modal.hidden) {
      close();
    }
  });

  onLangChange(() => {
    if (!modal.hidden) renderActions(filterInput.value);
  });

  return { open, close };
}
