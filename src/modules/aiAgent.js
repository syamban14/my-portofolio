import { portfolioData } from '../data/portfolioData.js';
import { soundEngine } from './soundEngine.js';

const PRESETS = [
  {
    id: 'bcs',
    label: 'Peran di BCS Logistics',
    prompt: 'Apa saja peran dan kontribusi M. Syamsul di PT. BCS Logistics?',
  },
  {
    id: 'ai',
    label: 'Keahlian Agen AI',
    prompt: 'Bagaimana keahlian AI Agent, Prompt Engineering, dan integrasi AI API Syamsul?',
  },
  {
    id: 'projects',
    label: 'Solusi UMKM & Institusi',
    prompt: 'Aplikasi apa saja yang sudah dibangun untuk institusi dan masyarakat?',
  },
  {
    id: 'edu',
    label: 'Sertifikasi & Pendidikan',
    prompt: 'Bagaimana riwayat pendidikan, penghargaan, dan sertifikasi terbaru Syamsul?',
  },
  {
    id: 'contact',
    label: 'Cara Kolaborasi',
    prompt: 'Bagaimana cara menghubungi atau mengajak M. Syamsul berkolaborasi?',
  },
];

/**
 * Interactive AI Syamsul Playground with semantic intent matching, slash commands,
 * animated streaming response, and a synchronized structured Context Inspector.
 */
export function initAiAgent({
  setTimeMode,
  toggleLamp,
  onRequestSection,
  onPrintCv,
  onStreamingChange,
}) {
  const presetsWrap = document.getElementById('aiPresets');
  const chatFeed = document.getElementById('aiChatFeed');
  const statusEl = document.getElementById('aiStatusText');
  const form = document.getElementById('aiChatForm');
  const input = document.getElementById('aiChatInput');
  const inspectorBody = document.getElementById('aiInspectorBody');

  if (!chatFeed || !form || !input || !inspectorBody) return null;

  let isStreaming = false;
  let activeTopic = 'ai';

  function renderPresets() {
    if (!presetsWrap) return;
    presetsWrap.innerHTML = PRESETS.map(
      (preset) => `
      <button type="button" class="ai-preset-btn" data-preset-id="${preset.id}">
        ${preset.label}
      </button>
    `
    ).join('');
  }

  function renderInspector(topic) {
    activeTopic = topic;

    if (topic === 'bcs' || topic === 'experience') {
      const bcs = portfolioData.experience[0];
      const lp3i = portfolioData.experience[1];
      inspectorBody.innerHTML = `
        <div class="inspector-card">
          <h3>Rekam Jejak Karir</h3>
          <div class="inspector-block">
            <p class="inspector-primary">${bcs.role} - ${bcs.company}</p>
            <p class="inspector-meta">${bcs.period} · ${bcs.location}</p>
            <ul class="inspector-list">
              ${bcs.details.map((d) => `<li>${d}</li>`).join('')}
            </ul>
          </div>
          <div class="inspector-divider"></div>
          <div class="inspector-block">
            <p class="inspector-primary">${lp3i.role} - ${lp3i.company}</p>
            <p class="inspector-meta">${lp3i.period} · ${lp3i.location}</p>
            <ul class="inspector-list">
              ${lp3i.details.map((d) => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
      return;
    }

    if (topic === 'projects') {
      inspectorBody.innerHTML = `
        <div class="inspector-card">
          <h3>Lima Aplikasi Terpublikasi</h3>
          <div class="inspector-rows">
            ${portfolioData.projects
              .map(
                (proj) => `
              <div class="inspector-row">
                <div>
                  <p class="inspector-primary">${proj.title}</p>
                  <p class="inspector-meta">${proj.stackText}</p>
                </div>
                <button type="button" class="inline-jump-btn" data-jump-project="${proj.id}">
                  Buka demo
                </button>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `;
      return;
    }

    if (topic === 'edu') {
      const cert = portfolioData.certifications[0];
      inspectorBody.innerHTML = `
        <div class="inspector-card">
          <h3>Pendidikan, Sertifikasi, dan Prestasi</h3>
          <div class="inspector-block">
            <p class="inspector-primary">${cert.title}</p>
            <p class="inspector-meta">${cert.date}</p>
            <p class="inspector-note">${cert.desc}</p>
          </div>
          <div class="inspector-divider"></div>
          <div class="inspector-rows">
            ${portfolioData.education
              .map(
                (edu) => `
              <div class="inspector-block">
                <p class="inspector-primary">${edu.degree} - ${edu.institution}</p>
                <p class="inspector-meta">${edu.period} · IPK ${edu.gpa}</p>
              </div>
            `
              )
              .join('')}
          </div>
          <div class="inspector-divider"></div>
          <ul class="inspector-list">
            ${portfolioData.awards.map((aw) => `<li>${aw.title} - ${aw.detail}</li>`).join('')}
          </ul>
        </div>
      `;
      return;
    }

    if (topic === 'github') {
      const featured = portfolioData.githubCuratedRepos.filter((r) => r.featured).slice(0, 5);
      inspectorBody.innerHTML = `
        <div class="inspector-card">
          <h3>Repositori Terbuka @syamban14</h3>
          <div class="inspector-rows">
            ${featured
              .map(
                (repo) => `
              <div class="inspector-row">
                <div>
                  <p class="inspector-primary">${repo.name}</p>
                  <p class="inspector-meta">${repo.language}</p>
                </div>
                <a href="https://github.com/syamban14/${repo.name}" target="_blank" rel="noopener" class="inline-jump-btn">Buka repo</a>
              </div>
            `
              )
              .join('')}
          </div>
          <button type="button" class="inline-jump-btn inspector-cta" data-jump-section="#github-repos">
            Lihat seluruh repositori GitHub
          </button>
        </div>
      `;
      return;
    }

    if (topic === 'contact') {
      const c = portfolioData.contact;
      inspectorBody.innerHTML = `
        <div class="inspector-card">
          <h3>Saluran Kolaborasi Langsung</h3>
          <div class="inspector-rows">
            <div class="inspector-block">
              <p class="inspector-meta">Lokasi</p>
              <p class="inspector-primary">${c.location}</p>
            </div>
            <div class="inspector-block">
              <p class="inspector-meta">Telepon / WhatsApp</p>
              <p class="inspector-primary">${c.phone}</p>
            </div>
            <div class="inspector-block">
              <p class="inspector-meta">Email</p>
              <p class="inspector-primary">${c.email}</p>
            </div>
            <div class="inspector-block">
              <p class="inspector-meta">GitHub, LinkedIn, & Blog</p>
              <p class="inspector-primary">${c.githubHandle} · ${c.linkedinHandle} · ${c.blogHost}</p>
            </div>
          </div>
          <button type="button" class="btn-primary inspector-cta" data-jump-section="#contact">
            Susun brief kolaborasi
          </button>
        </div>
      `;
      return;
    }

    // Default: 'ai' / skills
    const topSkills = portfolioData.skills.slice(0, 6);
    inspectorBody.innerHTML = `
      <div class="inspector-card">
        <h3>Keahlian Utama & AI Stack</h3>
        <div class="inspector-bars">
          ${topSkills
            .map(
              (skill) => `
            <div class="inspector-bar-item">
              <div class="inspector-bar-head">
                <span>${skill.name}</span>
                <span class="tabular-nums">${skill.level}%</span>
              </div>
              <div class="inspector-bar-track">
                <div class="inspector-bar-fill" style="width: ${skill.level}%"></div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
        <button type="button" class="inline-jump-btn" data-jump-section="#skills">
          Eksplorasi grafik keahlian lengkap
        </button>
      </div>
    `;
  }

  function resolveAnswer(rawText) {
    const q = rawText.trim().toLowerCase();

    if (q === '/pagi') {
      setTimeMode?.('pagi');
      return {
        topic: activeTopic,
        text: 'Mode pencahayaan studio diubah ke Pagi cerah. Kontras terang dan sinar matahari jendela sekarang aktif.',
      };
    }
    if (q === '/senja') {
      setTimeMode?.('senja');
      return {
        topic: activeTopic,
        text: 'Mode pencahayaan studio diubah ke Senja pelabuhan dengan aksen hangat Cilegon.',
      };
    }
    if (q === '/malam') {
      setTimeMode?.('malam');
      return {
        topic: activeTopic,
        text: 'Mode pencahayaan studio diubah ke Malam fokus developer dengan pendar monitor cyan.',
      };
    }
    if (q === '/lampu') {
      const isNowOn = toggleLamp?.();
      return {
        topic: activeTopic,
        text: isNowOn
          ? 'Lampu meja pada ruang kerja telah dinyalakan.'
          : 'Lampu meja pada ruang kerja telah dimatikan.',
      };
    }
    if (q === '/cetak' || q === '/cv') {
      window.setTimeout(() => onPrintCv?.(), 350);
      return {
        topic: 'edu',
        text: 'Membuka tampilan cetak ringkasan CV satu halaman M. Syamsul.',
      };
    }

    if (
      q.includes('bcs') ||
      q.includes('pengalaman') ||
      q.includes('kerja') ||
      q.includes('lp3i') ||
      q.includes('karir')
    ) {
      return {
        topic: 'bcs',
        text: 'Saat ini M. Syamsul bertugas sebagai IT Programmer di PT. BCS Logistics (Agustus 2024 - Agustus 2026) merancang Aplikasi Presensi Online Android & iOS, mengembangkan aplikasi kesehatan doklinc, serta mengelola aplikasi web dan database. Sebelumnya selama 7 tahun lebih (2017 - 2024) ia menjadi IT Support di LP3I Business College Cilegon menangani infrastruktur jaringan dan aplikasi internal kampus.',
      };
    }

    if (
      q.includes('proyek') ||
      q.includes('project') ||
      q.includes('doklinc') ||
      q.includes('presensi') ||
      q.includes('surat') ||
      q.includes('ujian') ||
      q.includes('umkm') ||
      q.includes('aplikasi')
    ) {
      return {
        topic: 'projects',
        text: 'Ada lima solusi nyata yang telah dibangun: Aplikasi Presensi Online Android & iOS (BCS Logistics), Aplikasi Kesehatan doklinc untuk masyarakat Cilegon, serta tiga sistem kampus LP3I College yaitu Aplikasi Ujian Online, Test Online Masuk, dan Aplikasi Surat. Anda dapat mencoba simulasi interaktif kelima aplikasi tersebut pada bagian Proyek & Simulasi.',
      };
    }

    if (
      q.includes('pendidikan') ||
      q.includes('kuliah') ||
      q.includes('sertifikasi') ||
      q.includes('hacktiv8') ||
      q.includes('juara') ||
      q.includes('prestasi') ||
      q.includes('ipk')
    ) {
      return {
        topic: 'edu',
        text: 'Syamsul menyelesaikan S1 Sistem Informasi di STMIK Bina Sarana Global (IPK 3.32) setelah D3 Manajemen Informatika di Politeknik LP3I Bandung (IPK 2.92). Pada Agustus 2025 ia meraih sertifikasi AI Productivity and AI API Integration for Developers dari Hacktiv8, serta pernah meraih Juara 1 PTK PNFI tingkat Kota Cilegon (2017) dan Juara 3 tingkat Provinsi Banten (2018).',
      };
    }

    if (
      q.includes('github') ||
      q.includes('open source') ||
      q.includes('repo') ||
      q.includes('hermes') ||
      q.includes('mixa') ||
      q.includes('3d') ||
      q.includes('qhse') ||
      q.includes('odoo')
    ) {
      return {
        topic: 'github',
        text: 'Di GitHub @syamban14 tersedia 50+ repositori publik mencakup orkestrator agen AI (hermes-mix-ai), ekosistem aplikasi Mixa (mixa-frontend Svelte & mixa-backend Python), eksperimen Web 3D interaktif yang tayang langsung di GitHub Pages (step-100-3d dan beach-3d), modul ERP Odoo 17, serta aplikasi Laravel QHSE.',
      };
    }

    if (
      q.includes('kontak') ||
      q.includes('hubungi') ||
      q.includes('whatsapp') ||
      q.includes('email') ||
      q.includes('freelance') ||
      q.includes('remote') ||
      q.includes('kolaborasi')
    ) {
      return {
        topic: 'contact',
        text: 'M. Syamsul berbasis di Cilegon, Banten dan terbuka untuk proyek freelance, kerja remote, maupun kolaborasi pengembangan agen AI dan aplikasi institusi. Anda bisa menghubungi langsung melalui WhatsApp (+62 821-1157-9944), email ke Syamsuliki.48@gmail.com, atau LinkedIn m-syamsul.',
      };
    }

    if (
      q.includes('ai') ||
      q.includes('agent') ||
      q.includes('prompt') ||
      q.includes('python') ||
      q.includes('skill') ||
      q.includes('keahlian') ||
      q.includes('php') ||
      q.includes('mysql')
    ) {
      return {
        topic: 'ai',
        text: 'Kekuatan utama M. Syamsul memadukan pengembangan AI Agent Dev (92%), Prompt Engineering (90%), dan AI API Integration (88%) dengan fondasi rekayasa perangkat lunak full-stack: Python (90%), PHP (88%), JavaScript (85%), MySQL (85%), Web & Mobile Dev (90%), serta IT Support & Networking.',
      };
    }

    return {
      topic: 'ai',
      text: 'M. Syamsul adalah IT Programmer & AI Specialist dengan 8+ tahun pengalaman membangun solusi digital untuk UMKM dan institusi. Tanyakan detail pengalaman di BCS Logistics, 5 proyek aplikasi, konstelasi keahlian AI, atau ketik perintah seperti /pagi, /senja, /malam, atau /lampu.',
    };
  }

  function appendMessage(role, initialText = '') {
    const msg = document.createElement('div');
    msg.className = `ai-msg ai-msg-${role}`;
    const p = document.createElement('p');
    p.textContent = initialText;
    msg.appendChild(p);
    chatFeed.appendChild(msg);
    chatFeed.scrollTop = chatFeed.scrollHeight;
    return p;
  }

  async function askQuestion(questionText) {
    if (!questionText.trim() || isStreaming) return;
    isStreaming = true;
    onStreamingChange?.(true);

    soundEngine.playClick();
    appendMessage('user', questionText.trim());
    if (statusEl) statusEl.textContent = 'Memindai rekam jejak M. Syamsul...';

    const { topic, text } = resolveAnswer(questionText);
    renderInspector(topic);

    const botParagraph = appendMessage('assistant', '');

    await new Promise((r) => window.setTimeout(r, 220));
    if (statusEl) statusEl.textContent = 'Menyusun jawaban berbasis data...';

    const words = text.split(' ');
    for (let i = 0; i < words.length; i += 1) {
      botParagraph.textContent = words.slice(0, i + 1).join(' ');
      chatFeed.scrollTop = chatFeed.scrollHeight;
      if (i % 4 === 0) soundEngine.playTick();
      await new Promise((r) => window.setTimeout(r, 22));
    }

    if (statusEl) statusEl.textContent = 'Siap menjawab pertanyaan atau perintah (/pagi, /senja, /malam, /lampu)';
    isStreaming = false;
    onStreamingChange?.(false);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    input.value = '';
    askQuestion(value);
  });

  if (presetsWrap) {
    presetsWrap.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-preset-id]');
      if (!btn) return;
      const preset = PRESETS.find((item) => item.id === btn.dataset.presetId);
      if (!preset) return;
      presetsWrap
        .querySelectorAll('.ai-preset-btn')
        .forEach((node) => node.classList.toggle('is-active', node === btn));
      askQuestion(preset.prompt);
    });
  }

  inspectorBody.addEventListener('click', (event) => {
    const sectionBtn = event.target.closest('[data-jump-section]');
    if (sectionBtn) {
      soundEngine.playClick();
      onRequestSection?.(sectionBtn.dataset.jumpSection);
      return;
    }
    const projBtn = event.target.closest('[data-jump-project]');
    if (projBtn) {
      soundEngine.playClick();
      onRequestSection?.('#projects', projBtn.dataset.jumpProject);
    }
  });

  renderPresets();
  renderInspector('ai');
  appendMessage(
    'assistant',
    'Halo! Saya asisten portofolio interaktif M. Syamsul. Pilih topik di atas atau ketik pertanyaan maupun perintah seperti /pagi, /senja, /malam, atau /lampu.'
  );

  return {
    askPreset(presetId) {
      const preset = PRESETS.find((p) => p.id === presetId);
      if (preset) askQuestion(preset.prompt);
    },
  };
}
