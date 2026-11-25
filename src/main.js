import './styles/tokens.css';
import './styles/main.css';

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

function initStudioApp() {
  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('mainNav');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const timeSwitch = document.getElementById('timeModeSwitch');
  const soundToggleBtn = document.getElementById('soundToggleBtn');

  let currentMode = localStorage.getItem('studio-time-mode') || 'malam';
  if (!['pagi', 'senja', 'malam'].includes(currentMode)) {
    currentMode = 'malam';
  }

  let workspaceApi = null;
  let projectsApi = null;

  function applyTimeMode(mode, { silent = false } = {}) {
    currentMode = mode;
    document.documentElement.dataset.studioTime = mode;
    localStorage.setItem('studio-time-mode', mode);

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

  // Scroll header state & active nav indicator
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

  // Mobile nav toggle
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

  // Studio Time switcher
  timeSwitch?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-time-mode]');
    if (!btn) return;
    soundEngine.playClick();
    applyTimeMode(btn.dataset.timeMode);
  });

  // Sound toggle
  soundToggleBtn?.addEventListener('click', () => {
    const active = soundEngine.toggle();
    soundToggleBtn.setAttribute('aria-pressed', String(active));
    soundToggleBtn.textContent = active ? 'Suara: Nyala' : 'Suara: Mati';
    showToast(active ? 'Efek suara interaktif diaktifkan' : 'Efek suara dimatikan');
  });

  // Initialize interactive modules
  projectsApi = initProjectShowcase();
  initGithubShowcase();

  workspaceApi = initLivingWorkspace({
    getTimeMode: () => currentMode,
    onRequestSection: (target) => scrollToTarget(target),
    onActionToast: showToast,
  });

  initAiAgent({
    setTimeMode: (mode) => applyTimeMode(mode),
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
    setTimeMode: (mode) => applyTimeMode(mode),
    toggleLamp: () => workspaceApi?.toggleLamp(),
    onRequestSection: (target) => scrollToTarget(target),
    onPrintCv: () => window.print(),
  });
}

document.addEventListener('DOMContentLoaded', initStudioApp);
