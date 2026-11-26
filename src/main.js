import './styles/tokens.css';
import './styles/main.css';

import { getLang, getPortfolioData, onLangChange, setLang, t } from './data/i18n.js';
import { soundEngine } from './modules/soundEngine.js';
import { initLivingWorkspace } from './modules/livingWorkspace.js';
import { initAiAgent } from './modules/aiAgent.js';
import { initSkillGraph } from './modules/skillGraph.js';
import { initProjectShowcase } from './modules/projectShowcase.js';
import { initGithubShowcase } from './modules/githubShowcase.js';
import { initTimelineScrubber } from './modules/timelineScrubber.js';
import { initCollaborationComposer } from './modules/collaborationComposer.js';
import { initCommandPalette } from './modules/commandPalette.js';

function showToast(message) {
  const region = document.getElementById('toastRegion');
  if (!region) return;
  const item = document.createElement('div');
  item.className = 'toast-item';
  item.textContent = message;
  region.appendChild(item);
  window.setTimeout(() => item.remove(), 3400);
}

function renderPrintCvSheet(lang) {
  const sheet = document.getElementById('printCvSheet');
  if (!sheet) return;
  const isEn = lang === 'en';
  const data = getPortfolioData(lang);
  const gpaLabel = isEn ? 'GPA' : 'IPK';

  sheet.innerHTML = `
    <h1>${data.name} - ${data.title}</h1>
    <p>${data.contact.location} · ${data.contact.phone} · ${data.contact.email} · ${data.contact.githubHandle} · ${data.contact.linkedinHandle}</p>
    <p>${data.summary}</p>
    <h2>${isEn ? 'Work Experience' : 'Pengalaman Kerja'}</h2>
    ${data.experience
      .map(
        (exp) =>
          `<p><strong>${exp.company}</strong> - ${exp.role} (${exp.period}): ${exp.details.join(', ')}.</p>`
      )
      .join('')}
    <h2>${isEn ? 'Skills & Certification' : 'Keahlian & Sertifikasi'}</h2>
    <p>${data.skills.map((s) => s.name).join(', ')}.</p>
    <p>${isEn ? 'Certification' : 'Sertifikasi'}: ${data.certifications[0].title} (${data.certifications[0].date}).</p>
    <h2>${isEn ? 'Education & Awards' : 'Pendidikan & Prestasi'}</h2>
    <p>${data.education
      .map((edu) => `${edu.degree}, ${edu.institution} (${gpaLabel} ${edu.gpa}, ${edu.period})`)
      .join(' · ')}.</p>
    <p>${data.awards.map((aw) => `${aw.title} - ${aw.detail}`).join(' · ')}.</p>
  `;
}

function initStudioApp() {
  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('mainNav');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const langSwitch = document.getElementById('langSwitch');
  const timeSwitch = document.getElementById('timeModeSwitch');
  const soundToggleBtn = document.getElementById('soundToggleBtn');

  function getClockTimeMode(date = new Date()) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (hour >= 5 && hour < 16) return 'pagi';
    if (hour >= 16 && (hour < 18 || (hour === 18 && minute < 30))) return 'senja';
    return 'malam';
  }

  localStorage.removeItem('studio-time-mode');
  let isManualTime = false;
  let currentMode = getClockTimeMode();

  let workspaceApi = null;
  let projectsApi = null;

  function applyTranslations(lang = getLang()) {
    document.documentElement.lang = lang;
    document.title = t('pageTitle', lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (key) el.textContent = t(key, lang);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (key) el.setAttribute('placeholder', t(key, lang));
    });

    if (soundToggleBtn) {
      soundToggleBtn.textContent = soundEngine.enabled ? t('soundOn', lang) : t('soundOff', lang);
    }

    if (langSwitch) {
      langSwitch.querySelectorAll('[data-lang]').forEach((btn) => {
        const match = btn.dataset.lang === lang;
        btn.classList.toggle('is-active', match);
        btn.setAttribute('aria-checked', String(match));
      });
    }

    renderPrintCvSheet(lang);
  }

  function applyTimeMode(mode, { silent = false, manual = false } = {}) {
    if (!['pagi', 'senja', 'malam'].includes(mode)) return;
    if (manual) {
      isManualTime = true;
    }
    currentMode = mode;
    document.documentElement.dataset.studioTime = mode;

    if (timeSwitch) {
      timeSwitch.querySelectorAll('[data-time-mode]').forEach((btn) => {
        const match = btn.dataset.timeMode === mode;
        btn.classList.toggle('is-active', match);
        btn.setAttribute('aria-checked', String(match));
      });
    }

    if (!silent) {
      workspaceApi?.refreshMode();
    }
  }

  function setManualTimeMode(mode) {
    applyTimeMode(mode, { manual: true });
  }

  function applyLanguage(nextLang, { silent = false } = {}) {
    const resolved = setLang(nextLang);
    applyTranslations(resolved);
    if (!silent) {
      showToast(resolved === 'en' ? 'Switched portfolio language to English' : 'Bahasa portofolio diubah ke Bahasa Indonesia');
    }
  }

  function scrollToTarget(selector, projectId) {
    if (projectId) {
      projectsApi?.selectProject(projectId);
    }
    const target = document.querySelector(selector);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  applyTimeMode(currentMode, { silent: true });
  applyTranslations(getLang());

  const sectionNodes = Array.from(document.querySelectorAll('main > section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));

  function handleScroll() {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 32);
    }

    let currentId = 'home';
    const threshold = window.scrollY + 130;
    sectionNodes.forEach((section) => {
      if (section.offsetTop <= threshold) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        event.preventDefault();
        scrollToTarget(href);
      }
      nav?.classList.remove('is-open');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  langSwitch?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-lang]');
    if (!btn) return;
    soundEngine.playClick();
    applyLanguage(btn.dataset.lang);
  });

  onLangChange((newLang) => {
    applyTranslations(newLang);
  });

  timeSwitch?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-time-mode]');
    if (!btn) return;
    soundEngine.playClick();
    setManualTimeMode(btn.dataset.timeMode);
  });

  window.setInterval(() => {
    if (isManualTime) return;
    const nextClockMode = getClockTimeMode();
    if (nextClockMode !== currentMode) {
      applyTimeMode(nextClockMode);
    }
  }, 60000);

  soundToggleBtn?.addEventListener('click', () => {
    const active = soundEngine.toggle();
    soundToggleBtn.setAttribute('aria-pressed', String(active));
    soundToggleBtn.textContent = active ? t('soundOn') : t('soundOff');
    showToast(active ? t('soundEnabledToast') : t('soundDisabledToast'));
  });

  projectsApi = initProjectShowcase();
  initGithubShowcase();

  workspaceApi = initLivingWorkspace({
    getTimeMode: () => currentMode,
    onRequestSection: (target) => scrollToTarget(target),
    onActionToast: showToast,
  });

  initAiAgent({
    setTimeMode: (mode) => setManualTimeMode(mode),
    setLanguage: (lang) => applyLanguage(lang),
    toggleLamp: () => workspaceApi?.toggleLamp(),
    onRequestSection: (target, projectId) => scrollToTarget(target, projectId),
    onPrintCv: () => window.print(),
    onStreamingChange: (busy) => workspaceApi?.setAiBusy(busy),
  });

  initSkillGraph({
    onSelectProject: (projectId) => scrollToTarget('#projects', projectId),
  });

  initTimelineScrubber();

  initCollaborationComposer({
    onToast: showToast,
  });

  initCommandPalette({
    setTimeMode: (mode) => setManualTimeMode(mode),
    setLanguage: (lang) => applyLanguage(lang),
    toggleLamp: () => workspaceApi?.toggleLamp(),
    onRequestSection: (target) => scrollToTarget(target),
    onPrintCv: () => window.print(),
  });
}

document.addEventListener('DOMContentLoaded', initStudioApp);
