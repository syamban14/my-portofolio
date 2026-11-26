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
      'Programmer IT dan spesialis AI di Cilegon dengan delapan tahun pengalaman membangun solusi web, mobile, dan infrastruktur.',
    heroCta: 'Mulai eksplorasi interaktif',
    welcomeSpeech:
      'Selamat datang di ruang kerja saya. Klik titik bernomor di ruangan ini untuk menelusuri karya atau ubah suasana waktu di atas.',
    lampOnBtn: 'Lampu meja: Nyala',
    lampOffBtn: 'Lampu meja: Mati',
    lampOnSpeech: 'Lampu meja dinyalakan. Fokus coding dan riset AI siap dijalankan.',
    lampOffSpeech: 'Lampu meja dimatikan. Mode layar redup untuk eksplorasi santai.',
    greetBtn: 'Sapa Syamsul',
    modePagiToast: 'Suasana studio diubah ke Pagi cerah di Cilegon',
    modeSenjaToast: 'Suasana studio diubah ke Senja pelabuhan',
    modeMalamToast: 'Suasana studio diubah ke Malam fokus developer',
    aiTitle: 'Tanya AI Syamsul',
    aiDesc:
      'Uji kemampuan asisten portofolio untuk menelusuri pengalaman, arsitektur proyek, sertifikasi Hacktiv8, atau jalankan perintah studio.',
    aiStatusIdle: 'Siap menjawab pertanyaan atau perintah (/pagi, /senja, /malam, /lampu, /en)',
    aiPlaceholder: 'Tanya pengalaman BCS Logistics, proyek doklinc, atau ketik /pagi...',
    aiSendBtn: 'Kirim',
    aiGreeting:
      'Halo! Saya asisten portofolio interaktif M. Syamsul. Pilih topik di atas atau ketik pertanyaan maupun perintah seperti /pagi, /senja, /malam, /lampu, atau /en.',
    skillsTitle: 'Konstelasi keahlian interaktif',
    skillsDesc:
      'Seret atau klik simpul teknologi pada kanvas untuk melihat penerapan nyata dan proyek terkait.',
    skillsTabAll: 'Semua',
    skillsCategoryPrefix: 'Kategori',
    skillsRelatedProjects: 'Proyek terkait',
    projectsTitle: 'Simulasi proyek dan arsitektur',
    projectsDesc:
      'Coba langsung alur kerja kelima aplikasi yang telah dibangun untuk industri logistik, layanan kesehatan masyarakat, dan perguruan tinggi.',
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
      'Tidak ada catatan kategori ini tepat pada tahun tersebut. Geser tahun lain atau pilih tampilkan semua.',
    contactTitle: 'Mari berkolaborasi',
    contactDesc:
      'Terbuka untuk peluang kerja remote, proyek freelance, riset agen AI, maupun pengembangan aplikasi kustom institusi.',
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
    contactDirectTitle: 'Informasi kontak langsung',
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
      'IT Programmer and AI Specialist in Cilegon with eight years of experience shipping web, mobile, and infrastructure solutions.',
    heroCta: 'Start interactive tour',
    welcomeSpeech:
      'Welcome to my workspace. Click the numbered points around the room to explore my work or switch time lighting above.',
    lampOnBtn: 'Desk lamp: On',
    lampOffBtn: 'Desk lamp: Off',
    lampOnSpeech: 'Desk lamp turned on. Focused coding and AI agent research mode ready.',
    lampOffSpeech: 'Desk lamp turned off. Low-light ambient exploration mode.',
    greetBtn: 'Greet Syamsul',
    modePagiToast: 'Studio lighting switched to Bright Cilegon Day',
    modeSenjaToast: 'Studio lighting switched to Harbor Dusk',
    modeMalamToast: 'Studio lighting switched to Developer Night Focus',
    aiTitle: 'Ask AI Syamsul',
    aiDesc:
      'Query the portfolio assistant to inspect work history, system architecture, Hacktiv8 certification, or run live studio commands.',
    aiStatusIdle: 'Ready for questions or commands (/day, /dusk, /night, /lamp, /id)',
    aiPlaceholder: 'Ask about BCS Logistics, doklinc health app, or type /day...',
    aiSendBtn: 'Send',
    aiGreeting:
      'Hi! I am M. Syamsul interactive portfolio assistant. Pick a quick prompt above or type questions and commands such as /day, /dusk, /night, /lamp, or /id.',
    skillsTitle: 'Interactive skill constellation',
    skillsDesc:
      'Drag or click technology nodes across the physics canvas to inspect real-world applications and related projects.',
    skillsTabAll: 'All',
    skillsCategoryPrefix: 'Category',
    skillsRelatedProjects: 'Related projects',
    projectsTitle: 'Project simulations and architecture',
    projectsDesc:
      'Test live workflows from five production applications built for logistics operations, municipal healthcare, and higher education.',
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
    contactDesc:
      'Available for remote engineering roles, freelance projects, AI agent workflows, and custom institutional software.',
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
    'Experienced IT Programmer and IT Specialist grounded in Information Systems and Informatics Management. Deeply focused on researching and building AI Agent workflows alongside full-stack web & mobile development, IT infrastructure management, and custom institutional software.',
  experience: [
    {
      id: 'exp-bcs',
      company: 'PT. BCS Logistics',
      role: 'IT Programmer',
      period: 'August 2024 - August 2026',
      startYear: 2024,
      endYear: 2026,
      location: 'Cilegon, Banten',
      details: [
        'Designed & built cross-platform Android & iOS Online Attendance App',
        'Developed the doklinc digital healthcare application',
        'Maintained & expanded web applications',
        'Debugging, feature engineering, and database management',
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
      details: [
        'Planned annual institutional IT work programs',
        'Managed campus network, hardware, and software infrastructure',
        'Delivered daily technical operations support',
        'Engineered internal institutional web applications',
      ],
    },
  ],
  skills: [
    {
      ...portfolioData.skills[0],
      usage:
        'Architecting autonomous agent workflows, tool calling pipelines, and task assistants for SME & enterprise productivity.',
    },
    {
      ...portfolioData.skills[1],
      usage:
        'Designing structured prompts, output guardrails, and LLM evaluation flows for reliable production outputs.',
    },
    {
      ...portfolioData.skills[2],
      usage:
        'Integrating generative AI model APIs seamlessly into backend services and interactive web interfaces.',
    },
    {
      ...portfolioData.skills[3],
      usage:
        'Automation scripts, AI agent orchestration prototypes, data pipelines, and backend API services.',
    },
    {
      ...portfolioData.skills[4],
      usage:
        'Building high-performance backend services, lightweight concurrency, and low-latency RESTful API microservices.',
    },
    {
      ...portfolioData.skills[5],
      usage:
        'Responsive web interfaces, real-time browser interactivity, and cross-platform client integrations.',
    },
    {
      ...portfolioData.skills[6],
      usage:
        'Powering campus information systems, online examination engines, admissions portals, and official correspondence.',
    },
    {
      ...portfolioData.skills[7],
      usage:
        'Enterprise relational database architecture, transactional consistency, and index optimization for production systems.',
    },
    {
      ...portfolioData.skills[8],
      usage:
        'Relational schema design, query optimization, and data integrity for attendance, exams, and healthcare logs.',
    },
    {
      ...portfolioData.skills[9],
      usage:
        'Embedded serverless storage for mobile client caching, rapid prototyping, and local AI agent state persistence.',
    },
    {
      ...portfolioData.skills[10],
      usage:
        'Designing standardized RESTful endpoints, token authentication, and JSON contracts across mobile, web, and AI services.',
    },
    {
      ...portfolioData.skills[11],
      usage:
        'Containerizing application services, isolating dev and production environments, and standardizing backend deployments.',
    },
    {
      ...portfolioData.skills[12],
      usage:
        'End-to-end engineering of web, Android, and iOS applications including deployment and iterative maintenance.',
    },
    {
      ...portfolioData.skills[13],
      usage:
        'Annual IT planning, hardware & software lifecycle management, and daily technical operations support.',
    },
    {
      ...portfolioData.skills[14],
      usage:
        'Designing and stabilizing campus LAN infrastructure for synchronous computer-based examinations.',
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
      summary:
        'Cross-platform employee attendance management application built for daily logistics operations at PT. BCS Logistics.',
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
      summary:
        'Digital healthcare platform streamlining clinic queues and medical service access for residents of Cilegon.',
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
      summary:
        'Computer-based web examination platform built to evaluate student competencies across LP3I Business College.',
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
      summary:
        'Online student admissions screening portal assessing academic readiness and study program alignment.',
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
      summary:
        'Internal document workflow platform handling incoming/outgoing correspondence, executive disposition, and official numbering.',
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
      description:
        'High-efficiency orchestrator and token-saver engine for Hermes Agent with tiered routing, git worktree isolation, and zero-token gate.',
    },
    {
      ...portfolioData.githubCuratedRepos[1],
      description:
        'Reactive Svelte & Vite web frontend built for the Mixa intelligent application ecosystem.',
    },
    {
      ...portfolioData.githubCuratedRepos[2],
      description:
        'Python backend service powering data processing, model integration, and API orchestration for Mixa.',
    },
    {
      ...portfolioData.githubCuratedRepos[3],
      description:
        'Interactive 3D spatial web experiment with live browser movement controls on GitHub Pages.',
    },
    {
      ...portfolioData.githubCuratedRepos[4],
      description:
        'Interactive 3D coastal visualization explorable directly in the browser via GitHub Pages.',
    },
    {
      ...portfolioData.githubCuratedRepos[5],
      description:
        'Conversational chatbot implementation built around the Google Gemini API.',
    },
    {
      ...portfolioData.githubCuratedRepos[6],
      description:
        'Fast inference and integration experiments using the Gemini Flash API.',
    },
    {
      ...portfolioData.githubCuratedRepos[7],
      description:
        'Laravel-based Quality, Health, Safety, and Environment (QHSE) management web application.',
    },
    {
      ...portfolioData.githubCuratedRepos[8],
      description:
        'Fitness and health tracking web system built on PHP CodeIgniter 4.',
    },
    {
      ...portfolioData.githubCuratedRepos[9],
      description:
        'Custom Python Odoo 17 ERP modules automating enterprise operational workflows.',
    },
    {
      ...portfolioData.githubCuratedRepos[10],
      description:
        'Modern Next.js & TypeScript storefront catalog for children apparel.',
    },
    {
      ...portfolioData.githubCuratedRepos[11],
      description:
        'Community platform for Quran study programs and local tutor discovery.',
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
