import { getLang, getPortfolioData, onLangChange } from '../data/i18n.js';
import { soundEngine } from './soundEngine.js';

const SCOPE_LABELS = {
  ai: { id: 'Agen AI & Otomasi', en: 'AI Agents & Automation' },
  web: { id: 'Aplikasi Web & Mobile', en: 'Web & Mobile Apps' },
  remote: { id: 'Remote / Kontrak', en: 'Remote / Contract' },
  general: { id: 'Diskusi Umum', en: 'General Inquiry' },
};

/**
 * Interactive Collaboration Brief Composer, Localized ATS CV Downloader, & Contact Directory.
 */
export function initCollaborationComposer({ onToast }) {
  const scopeWrap = document.getElementById('contactScopeTabs');
  const channelWrap = document.getElementById('contactChannelTabs');
  const nameInput = document.getElementById('contactName');
  const orgInput = document.getElementById('contactOrg');
  const briefInput = document.getElementById('contactBrief');
  const previewEl = document.getElementById('contactPreviewText');
  const sendBtn = document.getElementById('contactSendBtn');
  const copyList = document.getElementById('contactInfoList');
  const downloadCvLink = document.getElementById('downloadCvLink');
  const printBtn = document.getElementById('printCvBtn');

  if (!scopeWrap || !channelWrap || !previewEl || !sendBtn) return null;

  let activeScopeKey = 'ai';
  let activeChannel = 'whatsapp';

  function buildMessage() {
    const lang = getLang();
    const scopeText = (SCOPE_LABELS[activeScopeKey] || SCOPE_LABELS.ai)[lang];

    if (lang === 'en') {
      const sender = nameInput?.value.trim() || '[Your Name]';
      const org = orgInput?.value.trim() ? ` from ${orgInput.value.trim()}` : '';
      const detail =
        briefInput?.value.trim() ||
        'I would like to discuss software engineering or AI automation collaboration.';
      return `Hi M. Syamsul, I am ${sender}${org}. Regarding ${scopeText}: ${detail}`;
    }

    const sender = nameInput?.value.trim() || '[Nama Anda]';
    const org = orgInput?.value.trim() ? ` dari ${orgInput.value.trim()}` : '';
    const detail =
      briefInput?.value.trim() ||
      'Saya ingin berdiskusi mengenai kebutuhan pengembangan sistem atau solusi AI.';
    return `Halo Pak M. Syamsul, saya ${sender}${org}. Terkait kebutuhan ${scopeText}: ${detail}`;
  }

  function syncCvLink() {
    if (!downloadCvLink) return;
    const isEn = getLang() === 'en';
    const file = isEn ? 'M-Syamsul-CV-ATS-EN.pdf' : 'M-Syamsul-CV-ATS-ID.pdf';
    downloadCvLink.href = `./cv/${file}`;
    downloadCvLink.setAttribute('download', file);
  }

  function updatePreview() {
    const lang = getLang();
    previewEl.textContent = buildMessage();
    const labelMap =
      lang === 'en'
        ? {
            whatsapp: 'Open WhatsApp with this message',
            email: 'Open Email app with this message',
            copy: 'Copy brief to clipboard',
          }
        : {
            whatsapp: 'Buka WhatsApp dengan pesan ini',
            email: 'Buka aplikasi Email dengan pesan ini',
            copy: 'Salin pesan brief ke clipboard',
          };
    sendBtn.textContent = labelMap[activeChannel];
    syncCvLink();
  }

  scopeWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-scope-key]');
    if (!btn) return;
    soundEngine.playClick();
    activeScopeKey = btn.dataset.scopeKey;
    scopeWrap.querySelectorAll('[data-scope-key]').forEach((tab) => {
      const match = tab === btn;
      tab.classList.toggle('is-active', match);
      tab.setAttribute('aria-selected', String(match));
    });
    updatePreview();
  });

  channelWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-channel]');
    if (!btn) return;
    soundEngine.playClick();
    activeChannel = btn.dataset.channel;
    channelWrap.querySelectorAll('[data-channel]').forEach((tab) => {
      const match = tab === btn;
      tab.classList.toggle('is-active', match);
      tab.setAttribute('aria-selected', String(match));
    });
    updatePreview();
  });

  [nameInput, orgInput, briefInput].forEach((el) => {
    el?.addEventListener('input', updatePreview);
  });

  sendBtn.addEventListener('click', async () => {
    soundEngine.playChime();
    const lang = getLang();
    const contact = getPortfolioData(lang).contact;
    const message = buildMessage();
    const scopeText = (SCOPE_LABELS[activeScopeKey] || SCOPE_LABELS.ai)[lang];

    if (activeChannel === 'whatsapp') {
      const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');
      onToast?.(
        lang === 'en'
          ? 'Opening WhatsApp with your draft brief.'
          : 'Membuka WhatsApp dengan draf brief Anda.'
      );
      return;
    }
    if (activeChannel === 'email') {
      const subject =
        lang === 'en'
          ? `${scopeText} Inquiry - ${nameInput?.value.trim() || 'Portfolio Visitor'}`
          : `Kolaborasi ${scopeText} - ${nameInput?.value.trim() || 'Pengunjung Portofolio'}`;
      const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailto;
      onToast?.(
        lang === 'en' ? 'Opening your default email client.' : 'Membuka klien email default Anda.'
      );
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      onToast?.(
        lang === 'en'
          ? 'Brief copied to clipboard.'
          : 'Pesan brief berhasil disalin ke clipboard.'
      );
    } catch {
      onToast?.(
        lang === 'en'
          ? 'Please copy the message from the preview box.'
          : 'Silakan salin pesan dari kotak pratinjau.'
      );
    }
  });

  if (copyList) {
    copyList.addEventListener('click', async (event) => {
      const btn = event.target.closest('[data-copy-value]');
      if (!btn) return;
      soundEngine.playClick();
      const val = btn.dataset.copyValue;
      const prefix = getLang() === 'en' ? 'Copied' : 'Disalin';
      try {
        await navigator.clipboard.writeText(val);
        onToast?.(`${prefix}: ${val}`);
      } catch {
        onToast?.(val);
      }
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      soundEngine.playClick();
      window.print();
    });
  }

  onLangChange(updatePreview);
  updatePreview();
  return { updatePreview };
}
