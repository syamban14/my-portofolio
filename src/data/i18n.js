import { portfolioData } from './portfolioData.js';

const LANG_STORAGE_KEY = 'studio-lang';

let currentLang = (() => {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'en' ? 'en' : 'id';
  } catch {
    return 'id';
  }
})();

const listeners = new Set();

export const uiStrings = {
  id: {
    pageTitle: 'M. Syamsul | IT Programmer & AI Specialist',
    navStudio: 'Studio',
    navAi: 'Tanya AI',
    navSkills: 'Keahlian',
    navProjects: 'Proyek',
    navExperience: 'Jejak',
    navContact: 'Kontak',
    timePagi: 'Pagi',
    timeSenja: 'Senja',
    timeMalam: 'Malam',
    soundOn: 'Suara: Nyala',
    soundOff: 'Suara: Mati',
    soundEnabledToast: 'Efek suara interaktif diaktifkan',
    soundDisabledToast: 'Efek suara dimatikan',
    quickMenu: 'Menu cepat',
    mobileMenu: 'Menu',
    heroTitle: 'M. Syamsul merancang agen AI dan aplikasi institusi',
    heroSubtitle:
      'IT Programmer & AI Specialist di Cilegon · 8+ tahun pengalaman web, mobile, dan AI.',
    heroCta: 'Mulai eksplorasi interaktif',
    statExpTitle: 'Pengalaman IT & AI',
    statAppsVal: '5 Aplikasi',
    statAppsTitle: 'Web, Android & iOS',
    statTechVal: '15 Teknologi',
    statTechTitle: 'AI, Go & Database',
    statAwardVal: '3 Prestasi',
    statAwardTitle: 'Instruktur & Kampus',
    welcomeSpeech:
      'Klik titik bernomor di ruangan untuk menelusuri proyek, AI, atau ubah waktu studio.',
    lampOnBtn: 'Lampu meja: Nyala',
    lampOffBtn: 'Lampu meja: Mati',
    lampOnSpeech: 'Lampu meja dinyalakan. Fokus coding dan riset AI siap dijalankan.',
    lampOffSpeech: 'Lampu meja dimatikan. Mode layar redup untuk eksplorasi santai.',
    greetBtn: 'Sapa Syamsul',
    modePagiToast: 'Suasana studio diubah ke Pagi cerah di Cilegon',
    modeSenjaToast: 'Suasana studio diubah ke Senja pelabuhan',
    modeMalamToast: 'Suasana studio diubah ke Malam fokus developer',
    aiTitle: 'Tanya AI Syamsul',
    aiDesc: 'Tanya pengalaman kerja, arsitektur sistem, atau jalankan perintah /pagi dan /en.',
    aiStatusIdle: 'Siap menjawab (/pagi, /senja, /malam, /lampu, /en)',
    aiPlaceholder: 'Tanya proyek doklinc, BCS Logistics, atau ketik /pagi...',
    aiSendBtn: 'Kirim',
    aiGreeting:
      'Halo! Pilih topik cepat di atas atau ketik pertanyaan maupun perintah (/pagi, /senja, /malam, /lampu, /en).',
    skillsTitle: 'Konstelasi keahlian interaktif',
    skillsDesc: 'Klik potret pusat, hub kategori, atau simpul skill untuk melihat konteks nyata.',
    skillsTabAll: 'Semua',
    skillsCategoryPrefix: 'Kategori',
    skillsRelatedProjects: 'Proyek terkait',
    projectsTitle: 'Simulasi proyek dan arsitektur',
    projectsDesc: 'Lihat tampilan antarmuka, coba simulasi alur, dan bedah arsitektur 5 aplikasi utama.',
    modeSim: 'Simulasi Aplikasi',
    modeUi: 'Pratinjau UI',
    modeArch: 'Arsitektur Sistem',
    githubHeading: 'Repositori terbuka & eksperimen GitHub (@syamban14)',
    githubViewProfile: 'Lihat profil GitHub',
    githubFilterFeatured: 'Unggulan',
    githubFilterAi: 'AI & Python',
    githubFilter3d: '3D & Interaktif',
    githubFilterFullstack: 'Full-Stack & ERP',
    githubFilterAll: 'Semua',
    githubSearchPlaceholder: 'Cari repo (hermes, mixa, 3d, qhse)...',
    githubCodeBtn: 'Kode sumber',
    githubDemoBtn: 'Demo langsung',
    githubEmpty: 'Tidak ada repositori yang cocok dengan filter atau pencarian tersebut.',
    expTitle: 'Jejak karir dan latar belakang',
    timelineAll: 'Semua',
    timelineCareer: 'Karir',
    timelineEdu: 'Pendidikan & Sertifikasi',
    timelineAwards: 'Prestasi',
    timelineAllYears: 'Semua tahun (2011 - 2026)',
    timelineFocusYear: 'Tahun fokus',
    timelineShowAll: 'Tampilkan semua',
    timelineEmpty:
      'Tidak ada catatan kategori ini pada tahun tersebut. Geser tahun lain atau pilih tampilkan semua.',
    contactTitle: 'Mari berkolaborasi',
    contactDesc: 'Terbuka untuk remote engineering, freelance, agen AI, dan aplikasi institusi.',
    contactScopeLabel: 'Fokus kebutuhan Anda',
    scopeAi: 'Agen AI & Otomasi',
    scopeWeb: 'Aplikasi Web & Mobile',
    scopeRemote: 'Remote / Kontrak',
    scopeGeneral: 'Diskusi Umum',
    contactNameLabel: 'Nama lengkap',
    contactNamePlaceholder: 'Nama Anda',
    contactOrgLabel: 'Instansi / UMKM',
    contactOrgPlaceholder: 'Nama perusahaan atau usaha',
    contactBriefLabel: 'Ceritakan kebutuhan singkat',
    contactBriefPlaceholder: 'Jelaskan tantangan atau target aplikasi yang ingin dibangun...',
    contactPreviewLabel: 'Pratinjau pesan otomatis',
    channelWa: 'WhatsApp',
    channelEmail: 'Email',
    channelCopy: 'Salin Pesan',
    contactDirectTitle: 'Kanal kontak langsung',
    contactPhoneLabel: 'Telepon & WhatsApp',
    contactLocationLabel: 'Lokasi',
    contactLinksLabel: 'Tautan profesional',
    copyBtn: 'Salin',
    downloadCvBtn: 'Unduh CV ATS (PDF)',
    printCvBtn: 'Cetak halaman CV',
    footerLeft: 'M. Syamsul · IT Programmer & AI Specialist · Cilegon, Banten',
    footerRight: 'Dipersembahkan dengan data portofolio terverifikasi dan interaksi lokal tanpa pelacak.',
    cmdTitle: 'Menu perintah cepat',
    cmdClose: 'Tutup',
    cmdPlaceholder: 'Ketik tujuan bagian, pagi, malam, lampu, english, atau cetak...',
    cmdEmpty: 'Tidak ada perintah yang cocok.',
  },
  en: {
    pageTitle: 'M. Syamsul | IT Programmer & AI Specialist',
    navStudio: 'Studio',
    navAi: 'Ask AI',
    navSkills: 'Skills',
    navProjects: 'Projects',
    navExperience: 'Journey',
    navContact: 'Contact',
    timePagi: 'Day',
    timeSenja: 'Dusk',
    timeMalam: 'Night',
    soundOn: 'Sound: On',
    soundOff: 'Sound: Off',
    soundEnabledToast: 'Interactive sound effects enabled',
    soundDisabledToast: 'Sound effects muted',
    quickMenu: 'Quick menu',
    mobileMenu: 'Menu',
    heroTitle: 'M. Syamsul engineers AI agents and institutional apps',
    heroSubtitle:
      'IT Programmer & AI Specialist in Cilegon · 8+ years shipping web, mobile, and AI systems.',
    heroCta: 'Start interactive tour',
    statExpTitle: 'IT & AI Experience',
    statAppsVal: '5 Shipped Apps',
    statAppsTitle: 'Web, Android & iOS',
    statTechVal: '15 Technologies',
    statTechTitle: 'AI, Go & Databases',
    statAwardVal: '3 Honors',
    statAwardTitle: 'Instructor & Campus',
    welcomeSpeech:
      'Click any numbered point in the room to explore projects, AI stack, or change studio lighting.',
    lampOnBtn: 'Desk lamp: On',
    lampOffBtn: 'Desk lamp: Off',
    lampOnSpeech: 'Desk lamp turned on. Focused coding and AI agent research mode ready.',
    lampOffSpeech: 'Desk lamp turned off. Low-light ambient exploration mode.',
    greetBtn: 'Greet Syamsul',
    modePagiToast: 'Studio lighting switched to Bright Cilegon Day',
    modeSenjaToast: 'Studio lighting switched to Harbor Dusk',
    modeMalamToast: 'Studio lighting switched to Developer Night Focus',
    aiTitle: 'Ask AI Syamsul',
    aiDesc: 'Explore experience, system architecture, or run studio commands like /day and /id.',
    aiStatusIdle: 'Ready for questions (/day, /dusk, /night, /lamp, /id)',
    aiPlaceholder: 'Ask about BCS Logistics, doklinc, or type /day...',
    aiSendBtn: 'Send',
    aiGreeting:
      'Hi! Pick a prompt above or ask questions and studio commands (/day, /dusk, /night, /lamp, /id).',
    skillsTitle: 'Interactive skill constellation',
    skillsDesc: 'Click the center portrait, category hubs, or skill nodes to inspect usage context.',
    skillsTabAll: 'All',
    skillsCategoryPrefix: 'Category',
    skillsRelatedProjects: 'Related projects',
    projectsTitle: 'Project previews and architecture',
    projectsDesc: 'Inspect visual UI screens, test live workflows, and view architecture across 5 apps.',
    modeSim: 'App Simulation',
    modeUi: 'UI Preview',
    modeArch: 'System Architecture',
    githubHeading: 'Open repositories & GitHub experiments (@syamban14)',
    githubViewProfile: 'View GitHub profile',
    githubFilterFeatured: 'Featured',
    githubFilterAi: 'AI & Python',
    githubFilter3d: '3D & Interactive',
    githubFilterFullstack: 'Full-Stack & ERP',
    githubFilterAll: 'All',
    githubSearchPlaceholder: 'Search repos (hermes, mixa, 3d, qhse)...',
    githubCodeBtn: 'Source code',
    githubDemoBtn: 'Live demo',
    githubEmpty: 'No repositories matched that filter or search query.',
    expTitle: 'Career journey and background',
    timelineAll: 'All',
    timelineCareer: 'Career',
    timelineEdu: 'Education & Certs',
    timelineAwards: 'Awards',
    timelineAllYears: 'All years (2011 - 2026)',
    timelineFocusYear: 'Focused year',
    timelineShowAll: 'Show all',
    timelineEmpty:
      'No records for this category in the selected year. Scrub to another year or select show all.',
    contactTitle: 'Let us collaborate',
    contactDesc: 'Open for remote engineering, freelance, AI agents, and custom software.',
    contactScopeLabel: 'Your project focus',
    scopeAi: 'AI Agents & Automation',
    scopeWeb: 'Web & Mobile Apps',
    scopeRemote: 'Remote / Contract',
    scopeGeneral: 'General Inquiry',
    contactNameLabel: 'Full name',
    contactNamePlaceholder: 'Your name',
    contactOrgLabel: 'Company / Organization',
    contactOrgPlaceholder: 'Company or business name',
    contactBriefLabel: 'Short project brief',
    contactBriefPlaceholder: 'Describe your workflow challenges or application goals...',
    contactPreviewLabel: 'Live formatted message preview',
    channelWa: 'WhatsApp',
    channelEmail: 'Email',
    channelCopy: 'Copy Brief',
    contactDirectTitle: 'Direct contact channels',
    contactPhoneLabel: 'Phone & WhatsApp',
    contactLocationLabel: 'Location',
    contactLinksLabel: 'Professional links',
    copyBtn: 'Copy',
    downloadCvBtn: 'Download ATS CV (PDF)',
    printCvBtn: 'Print CV page',
    footerLeft: 'M. Syamsul · IT Programmer & AI Specialist · Cilegon, Banten',
    footerRight: 'Built with verified portfolio data and zero-tracker local interactions.',
    cmdTitle: 'Quick command menu',
    cmdClose: 'Close',
    cmdPlaceholder: 'Type section name, day, night, lamp, indonesian, or print...',
    cmdEmpty: 'No matching commands found.',
  },
};

export const portfolioDataEn = {
  ...portfolioData,
  tagline: 'Building digital solutions that empower SMEs and institutions.',
  heroHeadline: uiStrings.en.heroTitle,
  heroSubtitle: uiStrings.en.heroSubtitle,
  summary:
    'IT Programmer & AI Specialist with 8+ years shipping AI Agents, mobile apps, and institutional systems.',
  experience: [
    {
      id: 'exp-bcs',
      company: 'PT. BCS Logistics',
      role: 'IT Programmer',
      period: 'August 2024 - August 2026',
      startYear: 2024,
      endYear: 2026,
      location: 'Cilegon, Banten',
      highlights: ['Android & iOS Attendance', 'doklinc Health App', 'Web & Database'],
      details: [
        'Architected cross-platform Android & iOS Online Attendance App',
        'Developed the doklinc digital healthcare application',
        'Web maintenance, feature engineering, & DB ops',
      ],
    },
    {
      id: 'exp-lp3i',
      company: 'LP3I Business College',
      role: 'IT Support',
      period: 'January 2017 - August 2024',
      startYear: 2017,
      endYear: 2024,
      location: 'Cilegon, Banten',
      highlights: ['Online Exam & Screening', 'Letter Manager', 'Campus Network & Servers'],
      details: [
        'Annual institutional IT plans & daily ops support',
        'Campus LAN, hardware, & software infrastructure',
        'Engineered internal web applications',
      ],
    },
  ],
  skills: [
    {
      ...portfolioData.skills[0],
      usage: 'Autonomous agents & tool-calling workflows for SMEs and institutions.',
    },
    {
      ...portfolioData.skills[1],
      usage: 'Structured prompts, guardrails, & LLM output verification in production.',
    },
    {
      ...portfolioData.skills[2],
      usage: 'Integrating generative AI APIs into backend pipelines & web interfaces.',
    },
    {
      ...portfolioData.skills[3],
      usage: 'Automation scripts, AI agent orchestration, & data backend services.',
    },
    {
      ...portfolioData.skills[4],
      usage: 'High-throughput backend services, concurrency, & RESTful API microservices.',
    },
    {
      ...portfolioData.skills[5],
      usage: 'Responsive web interfaces, real-time UX, & cross-platform client integrations.',
    },
    {
      ...portfolioData.skills[6],
      usage: 'Powering campus info systems, online exams, admissions, & letter workflows.',
    },
    {
      ...portfolioData.skills[7],
      usage: 'Production relational databases, transactional integrity, & query tuning.',
    },
    {
      ...portfolioData.skills[8],
      usage: 'Relational schemas for attendance, online exams, & clinical logs.',
    },
    {
      ...portfolioData.skills[9],
      usage: 'Serverless embedded storage for mobile cache, prototypes, & local AI state.',
    },
    {
      ...portfolioData.skills[10],
      usage: 'Standardized RESTful JSON APIs & token authentication across apps.',
    },
    {
      ...portfolioData.skills[11],
      usage: 'Containerized services, isolated environments, & repeatable deployments.',
    },
    {
      ...portfolioData.skills[12],
      usage: 'End-to-end engineering for Web, Android, & iOS production apps.',
    },
    {
      ...portfolioData.skills[13],
      usage: 'Annual IT ops, hardware/software maintenance, & daily team support.',
    },
    {
      ...portfolioData.skills[14],
      usage: 'Campus LAN engineering & stable concurrent examination networks.',
    },
  ],
  certifications: [
    {
      ...portfolioData.certifications[0],
      date: 'August 2025',
    },
  ],
  projects: [
    {
      ...portfolioData.projects[0],
      title: 'Online Attendance App (BCS Logistics)',
      shortTitle: 'Online Attendance',
      summary: 'Cross-platform Android, iOS & web employee check-in with GPS geofencing.',
      roleContribution:
        'Architected Android & iOS mobile clients, web monitoring dashboard, and relational attendance database.',
      impactMetrics: [
        { value: '3 Platforms', label: 'Android, iOS, & Web' },
        { value: 'Real-Time', label: 'GPS Geofence Check' },
        { value: 'Multi-Shift', label: 'BCS Logistics Ops' },
      ],
      uiMockup: {
        device: 'mobile',
        headerTitle: 'BCS Logistics Attendance',
        primaryTitle: 'Cilegon HQ Location Check-In',
        primaryStats: [
          { k: 'GPS Radius', v: '18 m (Valid)' },
          { k: 'Shift Window', v: '08:00 - 17:00 WIB' },
          { k: 'Sync Status', v: 'Logged to Server' },
        ],
        secondaryTitle: 'Daily Division Attendance Feed',
        secondaryRows: [
          'Warehouse Ops · Checked in 07:56 WIB',
          'Field Dispatch · Active Shift',
          'Logistics Admin · Location Verified',
        ],
      },
      architecture: [
        {
          layer: 'Mobile Client',
          tech: 'Android & iOS App',
          note: 'Captures work coordinates, validates shift schedule, and submits check-in/out logs.',
        },
        {
          layer: 'Application Service',
          tech: 'REST API & Web Panel',
          note: 'Verifies radius geofence, syncs staff statuses, and exports daily division summaries.',
        },
        {
          layer: 'Database Layer',
          tech: 'Relational MySQL',
          note: 'Stores attendance timestamps, shift definitions, and structured audit reports.',
        },
      ],
    },
    {
      ...portfolioData.projects[1],
      title: 'doklinc Healthcare App (Cilegon Community)',
      shortTitle: 'doklinc Health',
      org: 'Cilegon Community · PT. BCS Logistics',
      summary: 'Digital clinic booking and live medical queue app for Cilegon residents.',
      roleContribution:
        'Developed patient service workflows, backend API integrations, debugging, and database maintenance.',
      impactMetrics: [
        { value: 'Cilegon City', label: 'Public Service Reach' },
        { value: 'Centralized', label: 'Clinic Queue & Schedule' },
        { value: 'Mobile + API', label: 'Integrated Architecture' },
      ],
      uiMockup: {
        device: 'mobile',
        headerTitle: 'doklinc Health Portal',
        primaryTitle: 'Clinic Registration & Live Queue',
        primaryStats: [
          { k: 'Active Ticket', v: 'Queue A-014' },
          { k: 'Est. Wait Time', v: '10 Minutes' },
          { k: 'API Link', v: 'Clinic Connected' },
        ],
        secondaryTitle: 'Patient Visit & Referral Log',
        secondaryRows: [
          'General Consultation · Scheduled 09:30 WIB',
          'Routine Checkup · Verified',
          'Patient Alert · Auto-Dispatched',
        ],
      },
      architecture: [
        {
          layer: 'User Interface',
          tech: 'Mobile & Web Portal',
          note: 'Clinic department selection and live queue number tracking.',
        },
        {
          layer: 'Integration Layer',
          tech: 'Backend API',
          note: 'Service scheduling, visit status management, and patient notifications.',
        },
        {
          layer: 'Database Layer',
          tech: 'MySQL',
          note: 'Maintains clinic directory, daily queues, and patient registration logs.',
        },
      ],
    },
    {
      ...portfolioData.projects[2],
      title: 'Online Examination System (LP3I College)',
      shortTitle: 'Online Exam',
      summary: 'Computer & web-based exam portal evaluating student competencies at LP3I.',
      roleContribution:
        'Built interactive test modules, automated grading engine, and maintained LAN readiness during exams.',
      impactMetrics: [
        { value: '7+ Years', label: 'Campus Production Use' },
        { value: 'Automated', label: 'Instant Score Grading' },
        { value: 'Concurrent', label: 'LAN & Web Exam Support' },
      ],
      uiMockup: {
        device: 'desktop',
        headerTitle: 'LP3I College Exam Portal',
        primaryTitle: 'Computer Lab Exam Sheet & Timer',
        primaryStats: [
          { k: 'Session Link', v: 'Campus LAN Active' },
          { k: 'Answered', v: '28 / 30 Items' },
          { k: 'Auto-Save', v: 'Synced to MySQL' },
        ],
        secondaryTitle: 'Class Scores & Attendance Summary',
        secondaryRows: [
          'Informatics Mgmt · 32 Examinees Completed',
          'Room Token Lock · Verified per Session',
          'Lecturer Export · CSV Ready',
        ],
      },
      architecture: [
        {
          layer: 'Examinee Browser',
          tech: 'Web Client & JS',
          note: 'Question navigation, real-time answer persistence, and submission handling.',
        },
        {
          layer: 'Evaluation Engine',
          tech: 'PHP Application Server',
          note: 'Session validation, automated grading, and per-class score aggregation.',
        },
        {
          layer: 'Database & Network',
          tech: 'MySQL & Campus LAN',
          note: 'Structured question bank and balanced local network traffic under concurrent load.',
        },
      ],
    },
    {
      ...portfolioData.projects[3],
      title: 'Online Admissions Test (LP3I College)',
      shortTitle: 'Admissions Test',
      summary: 'Online student admissions screening with automated study program matching.',
      roleContribution:
        'Engineered scoring algorithms, study program recommendation mapping, and admissions operations support.',
      impactMetrics: [
        { value: '3 Modules', label: 'Logic, IT, English' },
        { value: 'Instant', label: 'Program Recommendation' },
        { value: 'Paperless', label: 'Applicant Screening' },
      ],
      uiMockup: {
        device: 'desktop',
        headerTitle: 'LP3I Online Admissions',
        primaryTitle: 'Applicant Readiness Assessment',
        primaryStats: [
          { k: 'Test Weighting', v: '3 Core Modules' },
          { k: 'Recommendation', v: 'Auto-Computed' },
          { k: 'Verification', v: 'Admissions Panel' },
        ],
        secondaryTitle: 'Admission Fit & Score Mapping',
        secondaryRows: [
          'D3 Informatics Management · Top Recommendation',
          'Real-Time Scoring · Zero Manual Grading',
          'Applicant Archive · Centralized Records',
        ],
      },
      architecture: [
        {
          layer: 'Applicant Portal',
          tech: 'Web Screening UI',
          note: 'Interactive aptitude, computer fundamentals, and English proficiency tests.',
        },
        {
          layer: 'Scoring Logic',
          tech: 'PHP Scoring Engine',
          note: 'Weighted sub-score computation and study program fit classification.',
        },
        {
          layer: 'Admissions DB',
          tech: 'MySQL',
          note: 'Candidate score histories and admissions committee verification status.',
        },
      ],
    },
    {
      ...portfolioData.projects[4],
      title: 'Institutional Letter Manager (LP3I College)',
      shortTitle: 'Letter Manager',
      summary: 'Executive disposition workflow & automated document numbering system.',
      roleContribution:
        'Designed approval workflow logic, sequential document numbering, and searchable correspondence archive.',
      impactMetrics: [
        { value: '4 Stages', label: 'Approval & Disposition' },
        { value: 'Automated', label: 'Official Ref Numbering' },
        { value: 'Indexed', label: 'Institutional Archive' },
      ],
      uiMockup: {
        device: 'desktop',
        headerTitle: 'LP3I Correspondence System',
        primaryTitle: 'Official Numbering & Disposition Tracker',
        primaryStats: [
          { k: 'Ref Format', v: '042/LP3I-CLG/XI' },
          { k: 'Workflow Steps', v: '4 Sequential Gates' },
          { k: 'Archive Search', v: 'Indexed by Date & Ref' },
        ],
        secondaryTitle: 'Administrative Approval Log',
        secondaryRows: [
          'Competency Assignment Draft · Dept Review',
          'Executive Disposition · Digitally Approved',
          'Official Attachment · Ready to Print & File',
        ],
      },
      architecture: [
        {
          layer: 'Admin Dashboard',
          tech: 'Web Dashboard',
          note: 'Draft authoring, attachment upload, and executive approval tracking.',
        },
        {
          layer: 'Workflow Logic',
          tech: 'PHP Workflow Engine',
          note: 'Sequential verification gates and automatic reference code generation.',
        },
        {
          layer: 'Digital Archive',
          tech: 'MySQL',
          note: 'Stores official letter indexes, issue dates, and disposition audit trail.',
        },
      ],
    },
  ],
  awards: [
    {
      ...portfolioData.awards[0],
      title: '1st Place PTK PNFI Competition (2017)',
      detail: 'Computer Instructor - Cilegon City Level',
      category: 'Award',
    },
    {
      ...portfolioData.awards[1],
      title: '3rd Place PTK PNFI Competition (2018)',
      detail: 'Computer Instructor - Banten Province Level',
      category: 'Award',
    },
    {
      ...portfolioData.awards[2],
      title: 'Outstanding Student Award (2011)',
      detail: 'Futsal Athletics - LP3I College',
      category: 'Award',
    },
  ],
  education: [
    {
      ...portfolioData.education[0],
      degree: 'B.S. in Information Systems',
    },
    {
      ...portfolioData.education[1],
      degree: 'Diploma (D3) in Informatics Management',
    },
  ],
  workspaceHotspots: [
    {
      ...portfolioData.workspaceHotspots[0],
      title: 'Interactive Desk Lamp',
      speech: 'Customize the studio lighting. Click the lamp to toggle warm focus illumination.',
      summary:
        'Toggle room lighting directly to test developer night focus, harbor dusk, or bright daylight.',
      ctaLabel: 'Switch time mode above',
    },
    {
      ...portfolioData.workspaceHotspots[1],
      title: 'AI Agent Terminal',
      speech: 'This is where I research and orchestrate AI agents and API integrations for real workflows.',
      summary:
        'Core focus: AI Agent Dev, Prompt Engineering, Python, Go, and AI API Integration.',
      ctaLabel: 'Ask AI Syamsul',
    },
    {
      ...portfolioData.workspaceHotspots[2],
      title: 'BCS & doklinc Project Monitor',
      speech: 'Five institutional and public applications are shipped, from Online Attendance to doklinc.',
      summary:
        'Architected Android & iOS Online Attendance at PT. BCS Logistics and the doklinc health service app.',
      ctaLabel: 'Run 5 project demos',
    },
    {
      ...portfolioData.workspaceHotspots[3],
      title: 'LP3I Server & Infrastructure',
      speech: 'From 2017 to 2024 at LP3I College, I managed campus networks, hardware, and internal web systems.',
      summary:
        'Eight+ years blending IT Support, Networking, Docker, and institutional systems with PHP, PostgreSQL, & MySQL.',
      ctaLabel: 'Explore career journey',
    },
    {
      ...portfolioData.workspaceHotspots[4],
      title: 'Certifications & Trophy Shelf',
      speech: 'Continuous learning from 1st Place Computer Instructor to the 2025 Hacktiv8 AI API certification.',
      summary:
        'Hacktiv8 AI Productivity & AI API Integration (Aug 2025), 1st Place PTK PNFI Cilegon, and 3rd Place Banten.',
      ctaLabel: 'View full timeline',
    },
  ],
  githubCuratedRepos: [
    {
      ...portfolioData.githubCuratedRepos[0],
      description: 'High-efficiency Hermes Agent orchestrator & token saver with tiered routing.',
    },
    {
      ...portfolioData.githubCuratedRepos[1],
      description: 'Reactive Svelte & Vite web client for the Mixa intelligent platform.',
    },
    {
      ...portfolioData.githubCuratedRepos[2],
      description: 'Python backend powering data pipelines, model links, & API orchestration.',
    },
    {
      ...portfolioData.githubCuratedRepos[3],
      description: 'Interactive 3D spatial web experiment running directly in the browser.',
    },
    {
      ...portfolioData.githubCuratedRepos[4],
      description: 'Explorable 3D coastal scene hosted live on GitHub Pages.',
    },
    {
      ...portfolioData.githubCuratedRepos[5],
      description: 'Conversational AI chatbot built around the Google Gemini API.',
    },
    {
      ...portfolioData.githubCuratedRepos[6],
      description: 'Fast inference experiments built with the Gemini Flash API.',
    },
    {
      ...portfolioData.githubCuratedRepos[7],
      description: 'Laravel web app for Quality, Health, Safety, & Environment ops.',
    },
    {
      ...portfolioData.githubCuratedRepos[8],
      description: 'Fitness and employee wellness tracking built on CodeIgniter 4.',
    },
    {
      ...portfolioData.githubCuratedRepos[9],
      description: 'Custom Python Odoo 17 ERP modules automating enterprise workflows.',
    },
    {
      ...portfolioData.githubCuratedRepos[10],
      description: 'Modern Next.js & TypeScript storefront for children apparel.',
    },
    {
      ...portfolioData.githubCuratedRepos[11],
      description: 'Community directory for Quran study programs and local tutors.',
    },
  ],
};

export function getLang() {
  return currentLang;
}

export function setLang(nextLang) {
  const normalized = nextLang === 'en' ? 'en' : 'id';
  if (normalized === currentLang) return currentLang;
  currentLang = normalized;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, currentLang);
  } catch {
    // Ignore storage restriction
  }
  document.documentElement.lang = currentLang;
  listeners.forEach((cb) => cb(currentLang));
  return currentLang;
}

export function onLangChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function t(key, lang = currentLang) {
  return uiStrings[lang]?.[key] ?? uiStrings.id[key] ?? key;
}

export function getPortfolioData(lang = currentLang) {
  return lang === 'en' ? portfolioDataEn : portfolioData;
}
