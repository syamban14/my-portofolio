import { getLang, getPortfolioData, onLangChange, t } from '../data/i18n.js';
import { soundEngine } from './soundEngine.js';

const PRESETS = {
  id: [
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
  ],
  en: [
    {
      id: 'bcs',
      label: 'BCS Logistics Role',
      prompt: 'What are M. Syamsul roles and deliverables at PT. BCS Logistics?',
    },
    {
      id: 'ai',
      label: 'AI Agent Skills',
      prompt: 'What is Syamsul expertise in AI Agent Dev, Prompt Engineering, and AI API Integration?',
    },
    {
      id: 'projects',
      label: 'Shipped Solutions',
      prompt: 'Which production applications has he built for institutions and communities?',
    },
    {
      id: 'edu',
      label: 'Certs & Education',
      prompt: 'Tell me about his education history, awards, and recent Hacktiv8 certification.',
    },
    {
      id: 'contact',
      label: 'Collaboration',
      prompt: 'How can we contact or hire M. Syamsul for remote work or AI projects?',
    },
  ],
};

/**
 * Interactive Bilingual AI Syamsul Playground with Context Inspector & Slash Commands.
 */
export function initAiAgent({
  setTimeMode,
  setLanguage,
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
  let activePresetId = '';

  function renderPresets() {
    if (!presetsWrap) return;
    const list = PRESETS[getLang()] || PRESETS.id;
    presetsWrap.innerHTML = list
      .map(
        (preset) => `
      <button type="button" class="ai-preset-btn${preset.id === activePresetId ? ' is-active' : ''}" data-preset-id="${preset.id}">
        ${preset.label}
      </button>
    `
      )
      .join('');
  }

  function renderInspector(topic) {
    activeTopic = topic;
    const lang = getLang();
    const isEn = lang === 'en';
    const data = getPortfolioData(lang);

    if (topic === 'bcs' || topic === 'experience') {
      const bcs = data.experience[0];
      const lp3i = data.experience[1];
      inspectorBody.innerHTML = `
        <div class="inspector-card">
          <h3>${isEn ? 'Career Track Record' : 'Rekam Jejak Karir'}</h3>
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
          <h3>${isEn ? 'Five Shipped Applications' : 'Lima Aplikasi Terpublikasi'}</h3>
          <div class="inspector-rows">
            ${data.projects
              .map(
                (proj) => `
              <div class="inspector-row">
                <div>
                  <p class="inspector-primary">${proj.title}</p>
                  <p class="inspector-meta">${proj.stackText}</p>
                </div>
                <button type="button" class="inline-jump-btn" data-jump-project="${proj.id}">
                  ${isEn ? 'Open demo' : 'Buka demo'}
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
      const cert = data.certifications[0];
      const gpaLabel = isEn ? 'GPA' : 'IPK';
      inspectorBody.innerHTML = `
        <div class="inspector-card">
          <h3>${isEn ? 'Education, Certification & Awards' : 'Pendidikan, Sertifikasi, dan Prestasi'}</h3>
          <div class="inspector-block">
            <p class="inspector-primary">${cert.title}</p>
            <p class="inspector-meta">${cert.date}</p>
            <p class="inspector-note">${cert.desc}</p>
          </div>
          <div class="inspector-divider"></div>
          <div class="inspector-rows">
            ${data.education
              .map(
                (edu) => `
              <div class="inspector-block">
                <p class="inspector-primary">${edu.degree} - ${edu.institution}</p>
                <p class="inspector-meta">${edu.period} · ${gpaLabel} ${edu.gpa}</p>
              </div>
            `
              )
              .join('')}
          </div>
          <div class="inspector-divider"></div>
          <ul class="inspector-list">
            ${data.awards.map((aw) => `<li>${aw.title} - ${aw.detail}</li>`).join('')}
          </ul>
        </div>
      `;
      return;
    }

    if (topic === 'github') {
      const featured = data.githubCuratedRepos.filter((r) => r.featured).slice(0, 5);
      inspectorBody.innerHTML = `
        <div class="inspector-card">
          <h3>${isEn ? 'Open Repositories @syamban14' : 'Repositori Terbuka @syamban14'}</h3>
          <div class="inspector-rows">
            ${featured
              .map(
                (repo) => `
              <div class="inspector-row">
                <div>
                  <p class="inspector-primary">${repo.name}</p>
                  <p class="inspector-meta">${repo.language}</p>
                </div>
                <a href="https://github.com/syamban14/${repo.name}" target="_blank" rel="noopener" class="inline-jump-btn">${isEn ? 'Open repo' : 'Buka repo'}</a>
              </div>
            `
              )
              .join('')}
          </div>
          <button type="button" class="inline-jump-btn inspector-cta" data-jump-section="#github-repos">
            ${isEn ? 'Browse all GitHub repos' : 'Lihat seluruh repositori GitHub'}
          </button>
        </div>
      `;
      return;
    }

    if (topic === 'contact') {
      const c = data.contact;
      inspectorBody.innerHTML = `
        <div class="inspector-card">
          <h3>${isEn ? 'Direct Collaboration Channels' : 'Saluran Kolaborasi Langsung'}</h3>
          <div class="inspector-rows">
            <div class="inspector-block">
              <p class="inspector-meta">${isEn ? 'Location' : 'Lokasi'}</p>
              <p class="inspector-primary">${c.location}</p>
            </div>
            <div class="inspector-block">
              <p class="inspector-meta">${isEn ? 'Phone / WhatsApp' : 'Telepon / WhatsApp'}</p>
              <p class="inspector-primary">${c.phone}</p>
            </div>
            <div class="inspector-block">
              <p class="inspector-meta">Email</p>
              <p class="inspector-primary">${c.email}</p>
            </div>
            <div class="inspector-block">
              <p class="inspector-meta">${isEn ? 'GitHub, LinkedIn & Blog' : 'GitHub, LinkedIn, & Blog'}</p>
              <p class="inspector-primary">${c.githubHandle} · ${c.linkedinHandle} · ${c.blogHost}</p>
            </div>
          </div>
          <button type="button" class="btn-primary inspector-cta" data-jump-section="#contact">
            ${isEn ? 'Compose collaboration brief' : 'Susun brief kolaborasi'}
          </button>
        </div>
      `;
      return;
    }

    const topSkills = data.skills.slice(0, 6);
    inspectorBody.innerHTML = `
      <div class="inspector-card">
        <h3>${isEn ? 'Core Skills & AI Stack' : 'Keahlian Utama & AI Stack'}</h3>
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
          ${isEn ? 'Explore full skill constellation' : 'Eksplorasi grafik keahlian lengkap'}
        </button>
      </div>
    `;
  }

  function resolveAnswer(rawText) {
    const q = rawText.trim().toLowerCase();
    const isEn = getLang() === 'en';

    if (q === '/en' || q === '/english') {
      setLanguage?.('en');
      return {
        topic: activeTopic,
        text: 'Language switched to English. All portfolio modules, project demos, and ATS CV exports are now in English.',
      };
    }
    if (q === '/id' || q === '/indonesia') {
      setLanguage?.('id');
      return {
        topic: activeTopic,
        text: 'Bahasa diubah ke Bahasa Indonesia. Seluruh modul portofolio, simulasi proyek, dan ekspor CV ATS kini menggunakan Bahasa Indonesia.',
      };
    }
    if (q === '/pagi' || q === '/day') {
      setTimeMode?.('pagi');
      return {
        topic: activeTopic,
        text: isEn
          ? 'Studio lighting switched to Bright Day mode.'
          : 'Mode pencahayaan studio diubah ke Pagi cerah. Kontras terang dan sinar matahari jendela sekarang aktif.',
      };
    }
    if (q === '/senja' || q === '/dusk') {
      setTimeMode?.('senja');
      return {
        topic: activeTopic,
        text: isEn
          ? 'Studio lighting switched to Harbor Dusk mode.'
          : 'Mode pencahayaan studio diubah ke Senja pelabuhan dengan aksen hangat Cilegon.',
      };
    }
    if (q === '/malam' || q === '/night') {
      setTimeMode?.('malam');
      return {
        topic: activeTopic,
        text: isEn
          ? 'Studio lighting switched to Developer Night Focus mode.'
          : 'Mode pencahayaan studio diubah ke Malam fokus developer dengan pendar monitor cyan.',
      };
    }
    if (q === '/lampu' || q === '/lamp') {
      const isNowOn = toggleLamp?.();
      return {
        topic: activeTopic,
        text: isEn
          ? isNowOn
            ? 'Workspace desk lamp turned on.'
            : 'Workspace desk lamp turned off.'
          : isNowOn
            ? 'Lampu meja pada ruang kerja telah dinyalakan.'
            : 'Lampu meja pada ruang kerja telah dimatikan.',
      };
    }
    if (q === '/cetak' || q === '/cv') {
      window.setTimeout(() => onPrintCv?.(), 350);
      return {
        topic: 'edu',
        text: isEn
          ? 'Opening single-page ATS resume print preview.'
          : 'Membuka tampilan cetak ringkasan CV satu halaman M. Syamsul.',
      };
    }

    if (
      q.includes('bcs') ||
      q.includes('pengalaman') ||
      q.includes('experience') ||
      q.includes('work') ||
      q.includes('role') ||
      q.includes('kerja') ||
      q.includes('lp3i') ||
      q.includes('karir') ||
      q.includes('career')
    ) {
      return {
        topic: 'bcs',
        text: isEn
          ? 'M. Syamsul currently serves as IT Programmer at PT. BCS Logistics (August 2024 - August 2026), designing Android & iOS Online Attendance apps, building the doklinc healthcare app, and maintaining web & database systems. Previously, he spent 7+ years (2017 - 2024) as IT Support at LP3I Business College managing campus infrastructure and institutional software.'
          : 'Saat ini M. Syamsul bertugas sebagai IT Programmer di PT. BCS Logistics (Agustus 2024 - Agustus 2026) merancang Aplikasi Presensi Online Android & iOS, mengembangkan aplikasi kesehatan doklinc, serta mengelola aplikasi web dan database. Sebelumnya selama 7 tahun lebih (2017 - 2024) ia menjadi IT Support di LP3I Business College Cilegon menangani infrastruktur jaringan dan aplikasi internal kampus.',
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
        text: isEn
          ? 'On GitHub (@syamban14), he has 50+ public repositories spanning AI orchestrators (hermes-mix-ai), the Mixa application ecosystem (mixa-frontend Svelte & mixa-backend Python), live 3D web experiments hosted on GitHub Pages (step-100-3d & beach-3d), Odoo 17 ERP modules, and Laravel QHSE systems.'
          : 'Di GitHub @syamban14 tersedia 50+ repositori publik mencakup orkestrator agen AI (hermes-mix-ai), ekosistem aplikasi Mixa (mixa-frontend Svelte & mixa-backend Python), eksperimen Web 3D interaktif yang tayang langsung di GitHub Pages (step-100-3d dan beach-3d), modul ERP Odoo 17, serta aplikasi Laravel QHSE.',
      };
    }

    if (
      q.includes('proyek') ||
      q.includes('project') ||
      q.includes('doklinc') ||
      q.includes('presensi') ||
      q.includes('attendance') ||
      q.includes('surat') ||
      q.includes('ujian') ||
      q.includes('exam') ||
      q.includes('umkm') ||
      q.includes('aplikasi') ||
      q.includes('shipped')
    ) {
      return {
        topic: 'projects',
        text: isEn
          ? 'He has delivered five flagship systems: Android & iOS Online Attendance (BCS Logistics), the doklinc health service platform for Cilegon residents, plus three LP3I College campus apps (Online Examination, Online Admissions Test, and Letter Manager). You can test live simulations and UI mockups for all five below.'
          : 'Ada lima solusi nyata yang telah dibangun: Aplikasi Presensi Online Android & iOS (BCS Logistics), Aplikasi Kesehatan doklinc untuk masyarakat Cilegon, serta tiga sistem kampus LP3I College yaitu Aplikasi Ujian Online, Test Online Masuk, dan Aplikasi Surat. Anda dapat mencoba simulasi interaktif serta pratinjau UI kelima aplikasi tersebut pada bagian Proyek.',
      };
    }

    if (
      q.includes('pendidikan') ||
      q.includes('education') ||
      q.includes('kuliah') ||
      q.includes('sertifikasi') ||
      q.includes('cert') ||
      q.includes('hacktiv8') ||
      q.includes('juara') ||
      q.includes('award') ||
      q.includes('prestasi') ||
      q.includes('ipk') ||
      q.includes('gpa')
    ) {
      return {
        topic: 'edu',
        text: isEn
          ? 'Syamsul earned a B.S. in Information Systems from STMIK Bina Sarana Global (GPA 3.32) following a D3 in Informatics Management at Politeknik LP3I Bandung (GPA 2.92). In August 2025 he completed the Hacktiv8 AI Productivity & AI API Integration certification, and previously won 1st Place PTK PNFI Cilegon (2017) and 3rd Place Banten Province (2018).'
          : 'Syamsul menyelesaikan S1 Sistem Informasi di STMIK Bina Sarana Global (IPK 3.32) setelah D3 Manajemen Informatika di Politeknik LP3I Bandung (IPK 2.92). Pada Agustus 2025 ia meraih sertifikasi AI Productivity and AI API Integration for Developers dari Hacktiv8, serta pernah meraih Juara 1 PTK PNFI tingkat Kota Cilegon (2017) dan Juara 3 tingkat Provinsi Banten (2018).',
      };
    }

    if (
      q.includes('kontak') ||
      q.includes('contact') ||
      q.includes('hire') ||
      q.includes('hubungi') ||
      q.includes('whatsapp') ||
      q.includes('email') ||
      q.includes('freelance') ||
      q.includes('remote') ||
      q.includes('kolaborasi')
    ) {
      return {
        topic: 'contact',
        text: isEn
          ? 'Based in Cilegon, Banten, M. Syamsul is open to remote work, freelance engineering, and AI Agent collaborations. Reach out directly via WhatsApp (+62 821-1157-9944), email (Syamsuliki.48@gmail.com), GitHub (syamban14), or LinkedIn (m-syamsul).'
          : 'M. Syamsul berbasis di Cilegon, Banten dan terbuka untuk proyek freelance, kerja remote, maupun kolaborasi pengembangan agen AI dan aplikasi institusi. Anda bisa menghubungi langsung melalui WhatsApp (+62 821-1157-9944), email ke Syamsuliki.48@gmail.com, atau LinkedIn m-syamsul.',
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
        text: isEn
          ? 'M. Syamsul pairs specialized AI engineering (AI Agent Dev 92%, Prompt Engineering 90%, and AI API Integration 88%) with solid full-stack fundamentals: Python (90%), PHP (88%), JavaScript (85%), MySQL (85%), Web & Mobile Dev (90%), and IT Support & Networking.'
          : 'Kekuatan utama M. Syamsul memadukan pengembangan AI Agent Dev (92%), Prompt Engineering (90%), dan AI API Integration (88%) dengan fondasi rekayasa perangkat lunak full-stack: Python (90%), PHP (88%), JavaScript (85%), MySQL (85%), Web & Mobile Dev (90%), serta IT Support & Networking.',
      };
    }

    return {
      topic: 'ai',
      text: isEn
        ? 'M. Syamsul is an IT Programmer & AI Specialist with 8+ years of experience building software for SMEs and institutions. Ask about PT. BCS Logistics, his 5 shipped apps, GitHub repositories, or try commands like /day, /dusk, /night, /lamp, or /id.'
        : 'M. Syamsul adalah IT Programmer & AI Specialist dengan 8+ tahun pengalaman membangun solusi digital untuk UMKM dan institusi. Tanyakan detail pengalaman di BCS Logistics, 5 proyek aplikasi, repositori GitHub, atau ketik perintah seperti /pagi, /senja, /malam, /lampu, atau /en.',
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
    const isEn = getLang() === 'en';

    soundEngine.playClick();
    appendMessage('user', questionText.trim());
    if (statusEl) {
      statusEl.textContent = isEn
        ? 'Scanning M. Syamsul portfolio records...'
        : 'Memindai rekam jejak M. Syamsul...';
    }

    const { topic, text } = resolveAnswer(questionText);
    renderInspector(topic);

    const botParagraph = appendMessage('assistant', '');

    await new Promise((r) => window.setTimeout(r, 220));
    if (statusEl) {
      statusEl.textContent = isEn
        ? 'Synthesizing verified response...'
        : 'Menyusun jawaban berbasis data...';
    }

    const words = text.split(' ');
    for (let i = 0; i < words.length; i += 1) {
      botParagraph.textContent = words.slice(0, i + 1).join(' ');
      chatFeed.scrollTop = chatFeed.scrollHeight;
      if (i % 4 === 0) soundEngine.playTick();
      await new Promise((r) => window.setTimeout(r, 22));
    }

    if (statusEl) statusEl.textContent = t('aiStatusIdle');
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
      const list = PRESETS[getLang()] || PRESETS.id;
      const preset = list.find((item) => item.id === btn.dataset.presetId);
      if (!preset) return;
      activePresetId = preset.id;
      renderPresets();
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

  onLangChange(() => {
    renderPresets();
    renderInspector(activeTopic);
    if (!isStreaming && statusEl) {
      statusEl.textContent = t('aiStatusIdle');
    }
  });

  renderPresets();
  renderInspector('ai');
  appendMessage('assistant', t('aiGreeting'));

  return {
    askPreset(presetId) {
      const list = PRESETS[getLang()] || PRESETS.id;
      const preset = list.find((p) => p.id === presetId);
      if (preset) askQuestion(preset.prompt);
    },
  };
}
