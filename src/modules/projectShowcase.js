import { getLang, getPortfolioData, onLangChange } from '../data/i18n.js';
import { soundEngine } from './soundEngine.js';

const QUIZ_QUESTIONS = {
  id: [
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
  ],
  en: [
    {
      q: 'Which layer best handles online examination logic at LP3I College?',
      options: ['PHP & MySQL Server', 'Inline CSS Only', 'LPT1 Printer'],
      correct: 0,
    },
    {
      q: 'What core mechanism triggers external actions in modern AI Agent workflows?',
      options: ['Tool Calling & API Integration', 'Static HTML Table', 'Manual Fax'],
      correct: 0,
    },
    {
      q: 'Which structured storage stores attendance and medical clinic queues?',
      options: ['Relational MySQL Database', 'Plain Notepad File', 'Browser Cookie'],
      correct: 0,
    },
  ],
};

const SHIFT_LABELS = {
  id: ['Shift Pagi (08:00 WIB)', 'Shift Siang (14:00 WIB)', 'Shift Operasional Lapangan'],
  en: ['Morning Shift (08:00 WIB)', 'Afternoon Shift (14:00 WIB)', 'Field Operations Shift'],
};

const DOKLINC_POLIES = {
  id: ['Konsultasi Umum', 'Cek Kesehatan Rutin', 'Layanan Ibu & Anak'],
  en: ['General Consultation', 'Routine Checkup', 'Maternal & Child Care'],
};

const LETTER_STEPS = {
  id: ['Draft Surat', 'Verifikasi Kabag', 'Disposisi Pimpinan', 'Nomor Resmi Terbit'],
  en: ['Letter Draft', 'Dept Review', 'Executive Sign-off', 'Official Ref Issued'],
};

/**
 * Interactive 5-Project Workbench combining live prototypes, UI mockups,
 * impact metrics, and 3-layer architecture diagrams with full ID/EN support.
 */
export function initProjectShowcase() {
  const listWrap = document.getElementById('projectSelectorList');
  const titleEl = document.getElementById('projectStageTitle');
  const metaEl = document.getElementById('projectStageMeta');
  const impactStripEl = document.getElementById('projectImpactStrip');
  const summaryEl = document.getElementById('projectStageSummary');
  const roleEl = document.getElementById('projectStageRole');
  const modeWrap = document.getElementById('projectModeTabs');
  const stageBody = document.getElementById('projectStageBody');

  if (!listWrap || !stageBody || !modeWrap) return null;

  let activeProjectId = getPortfolioData().projects[0].id;
  let activeMode = 'antarmuka';
  let activeArchIndex = 0;
  let activeMockScreen = 'utama';

  const simState = {
    presensiShiftIdx: 0,
    presensiCustomLogs: [],
    doklincPolyIdx: 0,
    doklincCustomTickets: [],
    quizIndex: 0,
    quizScore: 0,
    quizFinished: false,
    quizFeedback: '',
    testScores: { logika: 82, komputer: 88, inggris: 78 },
    letterStage: 1,
    letterTitleId: 'Surat Tugas Uji Kompetensi Mahasiswa',
    letterTitleEn: 'Student Competency Assessment Assignment',
    letterCustomTitle: '',
  };

  function getAppIcon(device) {
    if (device === 'mobile') {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>';
    }
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>';
  }

  function renderProjectList() {
    const projects = getPortfolioData().projects;
    listWrap.innerHTML = projects
      .map(
        (proj) => `
      <button
        type="button"
        class="project-select-btn${proj.id === activeProjectId ? ' is-active' : ''}"
        data-project-id="${proj.id}"
        aria-pressed="${proj.id === activeProjectId}"
      >
        <span class="project-app-icon" aria-hidden="true">${getAppIcon(proj.uiMockup?.device)}</span>
        <span class="project-select-text">
          <span class="project-select-title">${proj.shortTitle}</span>
          <span class="project-select-meta">${proj.org} · ${proj.stackText}</span>
        </span>
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

  function renderUiMockup(project) {
    const mockup = project.uiMockup;
    if (!mockup) return;
    const isEn = getLang() === 'en';
    const isSecondary = activeMockScreen === 'data';
    const deviceLabel =
      mockup.device === 'mobile'
        ? isEn
          ? 'Mobile application concept'
          : 'Konsep aplikasi seluler'
        : isEn
          ? 'Web portal concept'
          : 'Konsep portal web';

    stageBody.innerHTML = `
      <div class="mockup-stage">
        <div class="mockup-toolbar">
          <div class="segmented-control" role="tablist" aria-label="${isEn ? 'Select UI mockup screen' : 'Pilih layar pratinjau antarmuka'}">
            <button type="button" class="seg-btn${!isSecondary ? ' is-active' : ''}" role="tab" aria-selected="${!isSecondary}" data-mock-screen="utama">${isEn ? 'Main Screen' : 'Layar Utama'}</button>
            <button type="button" class="seg-btn${isSecondary ? ' is-active' : ''}" role="tab" aria-selected="${isSecondary}" data-mock-screen="data">${isEn ? 'Data Panel' : 'Panel Data'}</button>
          </div>
          <span class="sim-caption">${deviceLabel}</span>
        </div>

        <div class="ui-mockup-frame ui-mockup-${mockup.device}">
          <div class="mockup-chrome">
            <div class="mockup-chrome-left">
              <span class="mockup-dots" aria-hidden="true">
                <i class="mockup-dot"></i><i class="mockup-dot"></i><i class="mockup-dot"></i>
              </span>
              <span class="mockup-chrome-title">${mockup.headerTitle}</span>
            </div>
            <span class="mockup-chrome-meta">${project.stackText}</span>
          </div>
          <div class="mockup-screen-body">
            ${
              !isSecondary
                ? `
              <p class="mockup-screen-heading">${mockup.primaryTitle}</p>
              <div class="mockup-kv-grid">
                ${mockup.primaryStats
                  .map(
                    (st) => `
                  <div class="mockup-kv-item">
                    <span class="mockup-kv-label">${st.k}</span>
                    <span class="mockup-kv-val tabular-nums">${st.v}</span>
                  </div>
                `
                  )
                  .join('')}
              </div>
            `
                : `
              <p class="mockup-screen-heading">${mockup.secondaryTitle}</p>
              <ul class="mockup-list-rows">
                ${mockup.secondaryRows
                  .map(
                    (row) =>
                      `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span>${row}</span></li>`
                  )
                  .join('')}
              </ul>
            `
            }
          </div>
        </div>
      </div>
    `;
  }

  function renderSimulation(project) {
    const lang = getLang();
    const isEn = lang === 'en';

    if (project.id === 'presensi-online') {
      const shifts = SHIFT_LABELS[lang];
      const defaultLog = isEn
        ? '07:56 WIB - PT. BCS Logistics HQ, Cilegon (Verified)'
        : '07:56 WIB - Kantor Pusat PT. BCS Logistics, Cilegon (Terverifikasi)';
      const logs = [...simState.presensiCustomLogs, defaultLog].slice(0, 4);

      stageBody.innerHTML = `
        <div class="sim-panel">
          <div class="sim-controls-row">
            <label for="simShiftSelect" class="sim-label">${isEn ? 'Active shift schedule' : 'Jadwal shift aktif'}</label>
            <select id="simShiftSelect" class="sim-input">
              ${shifts
                .map(
                  (label, idx) =>
                    `<option value="${idx}"${simState.presensiShiftIdx === idx ? ' selected' : ''}>${label}</option>`
                )
                .join('')}
            </select>
            <button type="button" class="btn-primary sim-btn" id="simCheckinBtn">${isEn ? 'Record check-in now' : 'Catat presensi sekarang'}</button>
          </div>
          <p class="sim-caption">${isEn ? 'Simulated Cilegon HQ geofence verification (Android & iOS).' : 'Simulasi verifikasi radius lokasi kerja Cilegon (Android & iOS).'}</p>
          <ul class="sim-log-list">
            ${logs.map((item) => `<li class="tabular-nums">${item}</li>`).join('')}
          </ul>
        </div>
      `;
      return;
    }

    if (project.id === 'doklinc') {
      const polies = DOKLINC_POLIES[lang];
      const defaultTicket = isEn
        ? `A-014 · ${polies[0]} · Est. 10 minutes`
        : `A-014 · ${polies[0]} · Estimasi 10 menit`;
      const tickets = [...simState.doklincCustomTickets, defaultTicket].slice(0, 4);

      stageBody.innerHTML = `
        <div class="sim-panel">
          <div class="sim-segmented" role="group" aria-label="${isEn ? 'Select doklinc clinic service' : 'Pilih layanan doklinc'}">
            ${polies
              .map(
                (p, idx) => `
              <button type="button" class="seg-btn${simState.doklincPolyIdx === idx ? ' is-active' : ''}" data-doklinc-idx="${idx}">
                ${p}
              </button>
            `
              )
              .join('')}
          </div>
          <div class="sim-controls-row">
            <button type="button" class="btn-primary sim-btn" id="simDoklincTicketBtn">${isEn ? 'Issue patient queue ticket' : 'Ambil nomor antrean pasien'}</button>
          </div>
          <ul class="sim-log-list">
            ${tickets.map((tItem) => `<li class="tabular-nums">${tItem}</li>`).join('')}
          </ul>
        </div>
      `;
      return;
    }

    if (project.id === 'ujian-online') {
      const questions = QUIZ_QUESTIONS[lang];
      if (simState.quizFinished) {
        stageBody.innerHTML = `
          <div class="sim-panel">
            <p class="sim-result-score tabular-nums">${isEn ? 'Exam Simulation Score' : 'Skor Simulasi Ujian'}: ${simState.quizScore} / ${questions.length}</p>
            <p class="sim-caption">${isEn ? 'Results sync directly to lecturer dashboard and MySQL database.' : 'Hasil langsung direkap ke panel dosen dan basis data MySQL.'}</p>
            <button type="button" class="btn-primary sim-btn" id="simQuizResetBtn">${isEn ? 'Restart exam simulation' : 'Ulangi simulasi ujian'}</button>
          </div>
        `;
        return;
      }

      const item = questions[simState.quizIndex];
      stageBody.innerHTML = `
        <div class="sim-panel">
          <p class="sim-caption tabular-nums">${isEn ? 'Question' : 'Pertanyaan'} ${simState.quizIndex + 1} / ${questions.length}</p>
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
      const status = isEn
        ? avg >= 75
          ? 'Passed Main Track'
          : avg >= 60
            ? 'Passed Matriculation Track'
            : 'Retake Required'
        : avg >= 75
          ? 'Lulus Seleksi Utama'
          : avg >= 60
            ? 'Lulus Jalur Matrikulasi'
            : 'Perlu Ujian Ulang';

      const prodi =
        simState.testScores.komputer >= simState.testScores.logika
          ? isEn
            ? 'D3 Informatics Management'
            : 'D3 Manajemen Informatika'
          : isEn
            ? 'B.S. Information Systems'
            : 'S1 Sistem Informasi';

      stageBody.innerHTML = `
        <div class="sim-panel">
          <div class="sim-sliders">
            <label class="sim-slider-row">
              <span>${isEn ? 'Logic Aptitude' : 'Potensi Logika'} (<strong class="tabular-nums">${simState.testScores.logika}</strong>)</span>
              <input type="range" min="40" max="100" value="${simState.testScores.logika}" data-test-field="logika" />
            </label>
            <label class="sim-slider-row">
              <span>${isEn ? 'Computer Basics' : 'Komputer Dasar'} (<strong class="tabular-nums">${simState.testScores.komputer}</strong>)</span>
              <input type="range" min="40" max="100" value="${simState.testScores.komputer}" data-test-field="komputer" />
            </label>
            <label class="sim-slider-row">
              <span>${isEn ? 'English Proficiency' : 'Bahasa Inggris'} (<strong class="tabular-nums">${simState.testScores.inggris}</strong>)</span>
              <input type="range" min="40" max="100" value="${simState.testScores.inggris}" data-test-field="inggris" />
            </label>
          </div>
          <div class="sim-score-box">
            <p class="tabular-nums">${isEn ? 'Average' : 'Rata-rata'}: ${avg} · Status: ${status}</p>
            <p class="sim-caption">${isEn ? 'Recommended study program' : 'Rekomendasi program studi'}: ${prodi}</p>
          </div>
        </div>
      `;
      return;
    }

    const steps = LETTER_STEPS[lang];
    const refNumber = '042/LP3I-CLG/XI/2026';
    const currentSubject =
      simState.letterCustomTitle || (isEn ? simState.letterTitleEn : simState.letterTitleId);

    stageBody.innerHTML = `
      <div class="sim-panel">
        <label class="sim-label" for="simLetterInput">${isEn ? 'Institutional document subject' : 'Perihal dokumen institusi'}</label>
        <input id="simLetterInput" class="sim-input" type="text" value="${currentSubject}" />
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
              ? isEn
                ? `Official reference issued: ${refNumber} (${currentSubject})`
                : `Nomor surat diterbitkan: ${refNumber} (${currentSubject})`
              : isEn
                ? `Active stage: ${steps[simState.letterStage]} - click next stage to simulate approval.`
                : `Tahap aktif: ${steps[simState.letterStage]} - klik tahap berikutnya untuk simulasi disposisi.`
          }
        </p>
      </div>
    `;
  }

  function renderStage() {
    const projects = getPortfolioData().projects;
    const project = projects.find((p) => p.id === activeProjectId) || projects[0];

    titleEl.textContent = project.title;
    metaEl.textContent = `${project.org} · ${project.period} · ${project.stackText}`;
    if (impactStripEl && project.impactMetrics) {
      impactStripEl.innerHTML = project.impactMetrics
        .map(
          (m) => `
        <div class="impact-cell">
          <span class="impact-value tabular-nums">${m.value}</span>
          <span class="impact-label">${m.label}</span>
        </div>
      `
        )
        .join('');
    }
    summaryEl.textContent = project.summary;
    if (roleEl) {
      roleEl.textContent = project.roleContribution;
    }

    if (activeMode === 'arsitektur') {
      renderArchitecture(project);
    } else if (activeMode === 'antarmuka') {
      renderUiMockup(project);
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
    const lang = getLang();
    const isEn = lang === 'en';

    const mockBtn = event.target.closest('[data-mock-screen]');
    if (mockBtn) {
      soundEngine.playClick();
      activeMockScreen = mockBtn.dataset.mockScreen;
      renderStage();
      return;
    }

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
      if (select) simState.presensiShiftIdx = Number(select.value) || 0;
      const shiftName = SHIFT_LABELS[lang][simState.presensiShiftIdx];
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      simState.presensiCustomLogs.unshift(
        isEn
          ? `${hh}:${mm} WIB - ${shiftName} · Cilegon Location Valid`
          : `${hh}:${mm} WIB - ${shiftName} · Lokasi Cilegon Valid`
      );
      simState.presensiCustomLogs = simState.presensiCustomLogs.slice(0, 3);
      renderStage();
      return;
    }

    const polyBtn = event.target.closest('[data-doklinc-idx]');
    if (polyBtn) {
      soundEngine.playClick();
      simState.doklincPolyIdx = Number(polyBtn.dataset.doklincIdx) || 0;
      renderStage();
      return;
    }

    if (event.target.id === 'simDoklincTicketBtn') {
      soundEngine.playChime();
      const polyName = DOKLINC_POLIES[lang][simState.doklincPolyIdx];
      const code = `A-0${15 + simState.doklincCustomTickets.length}`;
      simState.doklincCustomTickets.unshift(
        isEn ? `${code} · ${polyName} · Registered on doklinc` : `${code} · ${polyName} · Terdaftar di doklinc`
      );
      simState.doklincCustomTickets = simState.doklincCustomTickets.slice(0, 3);
      renderStage();
      return;
    }

    const quizBtn = event.target.closest('[data-quiz-opt]');
    if (quizBtn) {
      const questions = QUIZ_QUESTIONS[lang];
      const chosen = Number(quizBtn.dataset.quizOpt);
      const item = questions[simState.quizIndex];
      if (chosen === item.correct) {
        soundEngine.playChime();
        simState.quizScore += 1;
        simState.quizFeedback = isEn ? 'Correct answer!' : 'Jawaban tepat!';
      } else {
        soundEngine.playClick();
        simState.quizFeedback = isEn
          ? `Not quite. Expected answer: ${item.options[item.correct]}.`
          : `Kurang tepat. Jawaban sesuai: ${item.options[item.correct]}.`;
      }
      if (simState.quizIndex + 1 >= questions.length) {
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
      simState.letterCustomTitle = event.target.value;
    }
  });

  onLangChange(() => {
    simState.quizFeedback = '';
    renderProjectList();
    renderStage();
  });

  renderProjectList();
  renderStage();

  return {
    selectProject(projectId) {
      if (!getPortfolioData().projects.some((p) => p.id === projectId)) return;
      activeProjectId = projectId;
      activeArchIndex = 0;
      renderProjectList();
      renderStage();
    },
  };
}
