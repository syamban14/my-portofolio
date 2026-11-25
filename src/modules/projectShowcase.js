import { portfolioData } from '../data/portfolioData.js';
import { soundEngine } from './soundEngine.js';

const QUIZ_QUESTIONS = [
  {
    q: 'Lapisan mana yang tepat untuk menghitung logika ujian daring di LP3I College?',
    options: ['PHP & MySQL Server', 'Hanya CSS Inline', 'Printer LPT1'],
    correct: 0,
  },
  {
    q: 'Komponen inti untuk memicu aksi eksternal pada arsitektur Agen AI modern?',
    options: ['Tool Calling & API Integration', 'Static HTML Table', 'Manual Fax'],
    correct: 0,
  },
  {
    q: 'Metode penyimpanan terstruktur untuk data presensi dan antrean medis?',
    options: ['Database Relasional MySQL', 'Plain Notepad File', 'Cookie Browser'],
    correct: 0,
  },
];

/**
 * Interactive 5-Project Workbench combining live runnable mini-prototypes
 * with an inspectable 3-layer system architecture view.
 */
export function initProjectShowcase() {
  const listWrap = document.getElementById('projectSelectorList');
  const titleEl = document.getElementById('projectStageTitle');
  const metaEl = document.getElementById('projectStageMeta');
  const summaryEl = document.getElementById('projectStageSummary');
  const roleEl = document.getElementById('projectStageRole');
  const modeWrap = document.getElementById('projectModeTabs');
  const stageBody = document.getElementById('projectStageBody');

  if (!listWrap || !stageBody || !modeWrap) return null;

  let activeProjectId = portfolioData.projects[0].id;
  let activeMode = 'simulasi';
  let activeArchIndex = 0;

  // Per-project interactive simulation states
  const simState = {
    presensiShift: 'Shift Pagi (08:00 WIB)',
    presensiLogs: [
      '07:56 WIB - Kantor Pusat PT. BCS Logistics, Cilegon (Terverifikasi)',
    ],
    doklincPoly: 'Konsultasi Umum',
    doklincTickets: ['A-014 · Konsultasi Umum · Estimasi 10 menit'],
    quizIndex: 0,
    quizScore: 0,
    quizFinished: false,
    quizFeedback: '',
    testScores: { logika: 82, komputer: 88, inggris: 78 },
    letterStage: 1,
    letterTitle: 'Surat Tugas Uji Kompetensi Mahasiswa',
  };

  function renderProjectList() {
    listWrap.innerHTML = portfolioData.projects
      .map(
        (proj) => `
      <button
        type="button"
        class="project-select-btn${proj.id === activeProjectId ? ' is-active' : ''}"
        data-project-id="${proj.id}"
        aria-pressed="${proj.id === activeProjectId}"
      >
        <span class="project-select-title">${proj.shortTitle}</span>
        <span class="project-select-meta">${proj.org} · ${proj.stackText}</span>
      </button>
    `
      )
      .join('');
  }

  function renderArchitecture(project) {
    const selectedNode = project.architecture[activeArchIndex] || project.architecture[0];
    stageBody.innerHTML = `
      <div class="arch-stage">
        <div class="arch-nodes" role="list">
          ${project.architecture
            .map(
              (node, idx) => `
            <button
              type="button"
              class="arch-node-btn${idx === activeArchIndex ? ' is-active' : ''}"
              data-arch-idx="${idx}"
            >
              <span class="arch-layer">${node.layer}</span>
              <span class="arch-tech">${node.tech}</span>
            </button>
          `
            )
            .join('<span class="arch-arrow" aria-hidden="true">-></span>')}
        </div>
        <div class="arch-detail">
          <p class="arch-detail-title">${selectedNode.layer} - ${selectedNode.tech}</p>
          <p class="arch-detail-note">${selectedNode.note}</p>
        </div>
      </div>
    `;
  }

  function renderSimulation(project) {
    if (project.id === 'presensi-online') {
      stageBody.innerHTML = `
        <div class="sim-panel">
          <div class="sim-controls-row">
            <label for="simShiftSelect" class="sim-label">Jadwal shift aktif</label>
            <select id="simShiftSelect" class="sim-input">
              <option${simState.presensiShift === 'Shift Pagi (08:00 WIB)' ? ' selected' : ''}>Shift Pagi (08:00 WIB)</option>
              <option${simState.presensiShift === 'Shift Siang (14:00 WIB)' ? ' selected' : ''}>Shift Siang (14:00 WIB)</option>
              <option${simState.presensiShift === 'Shift Operasional Lapangan' ? ' selected' : ''}>Shift Operasional Lapangan</option>
            </select>
            <button type="button" class="btn-primary sim-btn" id="simCheckinBtn">Catat presensi sekarang</button>
          </div>
          <p class="sim-caption">Simulasi verifikasi radius lokasi kerja Cilegon (Android & iOS).</p>
          <ul class="sim-log-list">
            ${simState.presensiLogs.map((item) => `<li class="tabular-nums">${item}</li>`).join('')}
          </ul>
        </div>
      `;
      return;
    }

    if (project.id === 'doklinc') {
      const polies = ['Konsultasi Umum', 'Cek Kesehatan Rutin', 'Layanan Ibu & Anak'];
      stageBody.innerHTML = `
        <div class="sim-panel">
          <div class="sim-segmented" role="group" aria-label="Pilih layanan doklinc">
            ${polies
              .map(
                (p) => `
              <button type="button" class="seg-btn${simState.doklincPoly === p ? ' is-active' : ''}" data-doklinc-poly="${p}">
                ${p}
              </button>
            `
              )
              .join('')}
          </div>
          <div class="sim-controls-row">
            <button type="button" class="btn-primary sim-btn" id="simDoklincTicketBtn">Ambil nomor antrean pasien</button>
          </div>
          <ul class="sim-log-list">
            ${simState.doklincTickets.map((t) => `<li class="tabular-nums">${t}</li>`).join('')}
          </ul>
        </div>
      `;
      return;
    }

    if (project.id === 'ujian-online') {
      if (simState.quizFinished) {
        stageBody.innerHTML = `
          <div class="sim-panel">
            <p class="sim-result-score tabular-nums">Skor Simulasi Ujian: ${simState.quizScore} dari ${QUIZ_QUESTIONS.length}</p>
            <p class="sim-caption">Hasil langsung direkap ke panel dosen dan basis data MySQL.</p>
            <button type="button" class="btn-primary sim-btn" id="simQuizResetBtn">Ulangi simulasi ujian</button>
          </div>
        `;
        return;
      }

      const item = QUIZ_QUESTIONS[simState.quizIndex];
      stageBody.innerHTML = `
        <div class="sim-panel">
          <p class="sim-caption tabular-nums">Pertanyaan ${simState.quizIndex + 1} dari ${QUIZ_QUESTIONS.length}</p>
          <p class="sim-question">${item.q}</p>
          <div class="sim-quiz-options">
            ${item.options
              .map(
                (opt, idx) => `
              <button type="button" class="sim-option-btn" data-quiz-opt="${idx}">${opt}</button>
            `
              )
              .join('')}
          </div>
          ${simState.quizFeedback ? `<p class="sim-caption">${simState.quizFeedback}</p>` : ''}
        </div>
      `;
      return;
    }

    if (project.id === 'test-masuk') {
      const avg = Math.round(
        (simState.testScores.logika + simState.testScores.komputer + simState.testScores.inggris) / 3
      );
      const status = avg >= 75 ? 'Lulus Seleksi Utama' : avg >= 60 ? 'Lulus Jalur Matrikulasi' : 'Perlu Ujian Ulang';
      const prodi =
        simState.testScores.komputer >= simState.testScores.logika
          ? 'D3 Manajemen Informatika'
          : 'S1 Sistem Informasi';

      stageBody.innerHTML = `
        <div class="sim-panel">
          <div class="sim-sliders">
            <label class="sim-slider-row">
              <span>Potensi Logika (<strong class="tabular-nums">${simState.testScores.logika}</strong>)</span>
              <input type="range" min="40" max="100" value="${simState.testScores.logika}" data-test-field="logika" />
            </label>
            <label class="sim-slider-row">
              <span>Komputer Dasar (<strong class="tabular-nums">${simState.testScores.komputer}</strong>)</span>
              <input type="range" min="40" max="100" value="${simState.testScores.komputer}" data-test-field="komputer" />
            </label>
            <label class="sim-slider-row">
              <span>Bahasa Inggris (<strong class="tabular-nums">${simState.testScores.inggris}</strong>)</span>
              <input type="range" min="40" max="100" value="${simState.testScores.inggris}" data-test-field="inggris" />
            </label>
          </div>
          <div class="sim-score-box">
            <p class="tabular-nums">Rata-rata: ${avg} · Status: ${status}</p>
            <p class="sim-caption">Rekomendasi program studi: ${prodi}</p>
          </div>
        </div>
      `;
      return;
    }

    // aplikasi-surat
    const steps = ['Draft Surat', 'Verifikasi Kabag', 'Disposisi Pimpinan', 'Nomor Resmi Terbit'];
    const refNumber = `042/LP3I-CLG/XI/2026`;
    stageBody.innerHTML = `
      <div class="sim-panel">
        <label class="sim-label" for="simLetterInput">Perihal dokumen institusi</label>
        <input id="simLetterInput" class="sim-input" type="text" value="${simState.letterTitle}" />
        <div class="sim-stepper" role="list">
          ${steps
            .map(
              (label, idx) => `
            <button type="button" class="step-chip${idx <= simState.letterStage ? ' is-done' : ''}" data-letter-step="${idx}">
              ${label}
            </button>
          `
            )
            .join('')}
        </div>
        <p class="sim-caption tabular-nums">
          ${
            simState.letterStage === 3
              ? `Nomor surat diterbitkan: ${refNumber} (${simState.letterTitle})`
              : `Tahap aktif: ${steps[simState.letterStage]} - klik tahap berikutnya untuk simulasi disposisi.`
          }
        </p>
      </div>
    `;
  }

  function renderStage() {
    const project =
      portfolioData.projects.find((p) => p.id === activeProjectId) || portfolioData.projects[0];

    titleEl.textContent = project.title;
    metaEl.textContent = `${project.org} · ${project.period} · ${project.stackText}`;
    summaryEl.textContent = project.summary;
    roleEl.textContent = project.roleContribution;

    if (activeMode === 'arsitektur') {
      renderArchitecture(project);
    } else {
      renderSimulation(project);
    }
  }

  listWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-project-id]');
    if (!btn) return;
    soundEngine.playClick();
    activeProjectId = btn.dataset.projectId;
    activeArchIndex = 0;
    renderProjectList();
    renderStage();
  });

  modeWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-project-mode]');
    if (!btn) return;
    soundEngine.playClick();
    activeMode = btn.dataset.projectMode;
    modeWrap.querySelectorAll('[data-project-mode]').forEach((tab) => {
      const match = tab === btn;
      tab.classList.toggle('is-active', match);
      tab.setAttribute('aria-selected', String(match));
    });
    renderStage();
  });

  stageBody.addEventListener('click', (event) => {
    const archBtn = event.target.closest('[data-arch-idx]');
    if (archBtn) {
      soundEngine.playClick();
      activeArchIndex = Number(archBtn.dataset.archIdx);
      renderStage();
      return;
    }

    if (event.target.id === 'simCheckinBtn') {
      soundEngine.playChime();
      const select = document.getElementById('simShiftSelect');
      if (select) simState.presensiShift = select.value;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      simState.presensiLogs.unshift(
        `${hh}:${mm} WIB - ${simState.presensiShift} · Lokasi Cilegon Valid`
      );
      simState.presensiLogs = simState.presensiLogs.slice(0, 4);
      renderStage();
      return;
    }

    const polyBtn = event.target.closest('[data-doklinc-poly]');
    if (polyBtn) {
      soundEngine.playClick();
      simState.doklincPoly = polyBtn.dataset.doklincPoly;
      renderStage();
      return;
    }

    if (event.target.id === 'simDoklincTicketBtn') {
      soundEngine.playChime();
      const code = `A-0${15 + simState.doklincTickets.length}`;
      simState.doklincTickets.unshift(`${code} · ${simState.doklincPoly} · Terdaftar di doklinc`);
      simState.doklincTickets = simState.doklincTickets.slice(0, 4);
      renderStage();
      return;
    }

    const quizBtn = event.target.closest('[data-quiz-opt]');
    if (quizBtn) {
      const chosen = Number(quizBtn.dataset.quizOpt);
      const item = QUIZ_QUESTIONS[simState.quizIndex];
      if (chosen === item.correct) {
        soundEngine.playChime();
        simState.quizScore += 1;
        simState.quizFeedback = 'Jawaban tepat!';
      } else {
        soundEngine.playClick();
        simState.quizFeedback = `Kurang tepat. Jawaban sesuai: ${item.options[item.correct]}.`;
      }
      if (simState.quizIndex + 1 >= QUIZ_QUESTIONS.length) {
        simState.quizFinished = true;
      } else {
        simState.quizIndex += 1;
      }
      renderStage();
      return;
    }

    if (event.target.id === 'simQuizResetBtn') {
      soundEngine.playClick();
      simState.quizIndex = 0;
      simState.quizScore = 0;
      simState.quizFinished = false;
      simState.quizFeedback = '';
      renderStage();
      return;
    }

    const stepBtn = event.target.closest('[data-letter-step]');
    if (stepBtn) {
      soundEngine.playChime();
      simState.letterStage = Number(stepBtn.dataset.letterStep);
      renderStage();
    }
  });

  stageBody.addEventListener('input', (event) => {
    const field = event.target.dataset.testField;
    if (field) {
      simState.testScores[field] = Number(event.target.value);
      renderStage();
      return;
    }
    if (event.target.id === 'simLetterInput') {
      simState.letterTitle = event.target.value || 'Surat Resmi Institusi';
    }
  });

  renderProjectList();
  renderStage();

  return {
    selectProject(projectId) {
      if (!portfolioData.projects.some((p) => p.id === projectId)) return;
      activeProjectId = projectId;
      activeArchIndex = 0;
      renderProjectList();
      renderStage();
    },
  };
}
