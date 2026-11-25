import { portfolioData } from '../data/portfolioData.js';
import { soundEngine } from './soundEngine.js';

/**
 * Interactive Collaboration Brief Composer & Direct Contact Handler.
 * Generates live formatted WhatsApp / Email briefs with zero fake form submission.
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
  const printBtn = document.getElementById('printCvBtn');

  if (!scopeWrap || !channelWrap || !previewEl || !sendBtn) return null;

  let activeScope = 'Agen AI & Otomasi';
  let activeChannel = 'whatsapp';

  function buildMessage() {
    const sender = nameInput?.value.trim() || '[Nama Anda]';
    const org = orgInput?.value.trim() ? ` dari ${orgInput.value.trim()}` : '';
    const detail =
      briefInput?.value.trim() ||
      'Saya ingin berdiskusi mengenai kebutuhan pengembangan sistem atau solusi AI.';

    return `Halo Pak M. Syamsul, saya ${sender}${org}. Terkait kebutuhan ${activeScope}: ${detail}`;
  }

  function updatePreview() {
    previewEl.textContent = buildMessage();
    const labelMap = {
      whatsapp: 'Buka WhatsApp dengan pesan ini',
      email: 'Buka aplikasi Email dengan pesan ini',
      copy: 'Salin pesan brief ke clipboard',
    };
    sendBtn.textContent = labelMap[activeChannel];
  }

  scopeWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-scope]');
    if (!btn) return;
    soundEngine.playClick();
    activeScope = btn.dataset.scope;
    scopeWrap.querySelectorAll('[data-scope]').forEach((tab) => {
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
    const message = buildMessage();
    if (activeChannel === 'whatsapp') {
      const url = `https://wa.me/${portfolioData.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');
      onToast?.('Membuka WhatsApp dengan draf brief Anda.');
      return;
    }
    if (activeChannel === 'email') {
      const subject = `Kolaborasi ${activeScope} - ${nameInput?.value.trim() || 'Pengunjung Portofolio'}`;
      const mailto = `mailto:${portfolioData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailto;
      onToast?.('Membuka klien email default Anda.');
      return;
    }
    try {
      await navigator.clipboard.writeText(message);
      onToast?.('Pesan brief berhasil disalin ke clipboard.');
    } catch {
      onToast?.('Silakan salin pesan dari kotak pratinjau.');
    }
  });

  if (copyList) {
    copyList.addEventListener('click', async (event) => {
      const btn = event.target.closest('[data-copy-value]');
      if (!btn) return;
      soundEngine.playClick();
      const val = btn.dataset.copyValue;
      try {
        await navigator.clipboard.writeText(val);
        onToast?.(`Disalin: ${val}`);
      } catch {
        onToast?.(`Kontak: ${val}`);
      }
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      soundEngine.playClick();
      window.print();
    });
  }

  updatePreview();
  return { updatePreview };
}
