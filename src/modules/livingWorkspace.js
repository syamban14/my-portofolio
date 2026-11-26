import { getLang, getPortfolioData, onLangChange, t } from '../data/i18n.js';
import { soundEngine } from './soundEngine.js';

const CHAR_QUOTES = {
  id: [
    'Halo! Klik titik bernomor di ruangan ini untuk menelusuri proyek, keahlian AI, atau nyalakan lampu meja.',
    'Di PT. BCS Logistics saya merancang aplikasi Presensi Online Android & iOS serta layanan kesehatan doklinc.',
    'Tertarik kolaborasi AI Agent atau sistem kampus? Coba tanya asisten AI saya di bagian bawah.',
  ],
  en: [
    'Hi! Click the numbered hotspots around this room to explore projects, AI skills, or toggle the desk lamp.',
    'At PT. BCS Logistics I engineered the Android & iOS Online Attendance App and the doklinc healthcare app.',
    'Interested in AI Agent workflows or custom institutional apps? Try asking my AI assistant below.',
  ],
};

const INFRA_TOUR_ORDER = ['overview', 'screen', 'computers', 'rack', 'network'];

const INFRA_ROOM_DATA = {
  id: {
    ambientTag: 'Ruang Server AC · 21.4°C · NOC Aktif',
    stations: {
      overview: {
        tab: 'Ruangan Penuh',
        title: 'Tur Panorama Ruangan Server & Infrastruktur',
        sub: 'Klik zona bernomor 1–4, klik monitor PC di meja, atau tekan Berikutnya →.',
      },
      screen: {
        tab: '1. Layar NOC',
        title: '1 · Layar Utama Rancangan Infrastruktur (NOC Wall)',
        sub: 'Menampilkan alur paket data langsung dari klien hingga klaster basis data.',
      },
      computers: {
        tab: '2. 4 Komputer',
        title: '2 · Konsol Deretan Komputer Workstation',
        sub: 'Empat terminal aktif untuk ujian lab LP3I, presensi GPS, klinik doklinc, & Docker AI.',
      },
      rack: {
        tab: '3. Rak Server',
        title: '3 · Kabinet Rak Server Produksi (U01–U04)',
        sub: 'Pilih blade U01–U04 dan jalankan uji ping untuk mengecek latensi & uptime.',
      },
      network: {
        tab: '4. Switch',
        title: '4 · Kabinet Core Switch 24-Port & Segmentasi VLAN',
        sub: 'Memisahkan subnet 30+ PC Lab Ujian, Rak Server, dan Staf tanpa bottleneck.',
      },
    },
    flows: [
      { id: 'all', label: 'Semua Alur', litNodes: ['edge-0', 'edge-1', 'edge-2', 'gw-0', 'gw-1', 'gw-2', 'db-0', 'db-1', 'db-2'] },
      { id: 'bcs', label: 'Presensi & Klinik', litNodes: ['edge-0', 'edge-2', 'gw-0', 'gw-1', 'db-0', 'db-2'] },
      { id: 'lp3i', label: 'Lab Ujian LP3I', litNodes: ['edge-1', 'gw-1', 'db-1'] },
    ],
    computers: [
      {
        id: 'pc-lab',
        label: 'PC-01 · Lab LP3I',
        screenLine: '30+ PC Ujian · LAN',
        title: 'PC-01 · Konsol Pengawas Ujian Lokal LP3I',
        sub: 'Mengendalikan paket soal PHP, timer serentak, & validasi nilai 30+ komputer lab.',
        metrics: [
          { k: 'Koneksi Lab', v: '30+ PC Gigabit' },
          { k: 'Engine Ujian', v: 'PHP · MySQL LAN' },
          { k: 'Status', v: 'Sinkron Aktif' },
        ],
      },
      {
        id: 'pc-bcs',
        label: 'PC-02 · Presensi BCS',
        screenLine: 'GPS · REST :8080',
        title: 'PC-02 · Monitor Gateway Presensi Android & iOS',
        sub: 'Memantau check-in GPS geofencing, jadwal shift, dan log RESTful API PT. BCS Logistics.',
        metrics: [
          { k: 'Perangkat', v: 'Android & iOS' },
          { k: 'API Service', v: 'Go & PHP REST' },
          { k: 'Database', v: 'PostgreSQL + SQLite' },
        ],
      },
      {
        id: 'pc-doklinc',
        label: 'PC-03 · Klinik doklinc',
        screenLine: 'Antrean · Telemedis',
        title: 'PC-03 · Dashboard Manajemen Layanan Klinik doklinc',
        sub: 'Mengelola pendaftaran pasien, dokter jaga, & sinkronisasi jadwal klinik secara real-time.',
        metrics: [
          { k: 'Modul', v: 'Jadwal & Antrean' },
          { k: 'Kontainer', v: 'Docker Isolated' },
          { k: 'Integritas DB', v: 'ACID PostgreSQL' },
        ],
      },
      {
        id: 'pc-ai',
        label: 'PC-04 · Terminal AI',
        screenLine: 'Docker · Agent OS',
        title: 'PC-04 · Workstation Docker & AI Agent Orchestrator',
        sub: 'Menjalankan kontainer layanan, orkestrasi Python AI Agent, dan automasi skrip operasional.',
        metrics: [
          { k: 'Kontainer', v: 'Docker Compose' },
          { k: 'Bahasa', v: 'Python · Go · JS' },
          { k: 'Audit Log', v: 'Real-Time Stream' },
        ],
      },
    ],
    vlans: [
      'VLAN 10 · Lab Ujian (30+ PC)',
      'VLAN 20 · Klaster Server & DB',
      'VLAN 30 · Staf & Klinik Web',
      'WAN Fiber · REST Gateway',
    ],
    networkMetrics: [
      { k: 'Topologi Port', v: '24-Port Managed' },
      { k: 'Isolasi Subnet', v: 'VLAN 10 / 20 / 30' },
      { k: 'Uptime Jaringan', v: '2017–2024 Stabil' },
    ],
    blades: [
      {
        id: 'bcs-docker',
        unit: 'U01',
        host: 'BCS-APP-DOCKER',
        badge: 'Docker',
        sub: 'Container Gateway · Go & Python RESTful API',
        pingResult: '1.4 ms · 0% loss · Container Healthy',
        metrics: [
          { k: 'Status Node', v: 'ONLINE · 99.9%' },
          { k: 'Endpoint API', v: 'REST :8080 / TLS' },
          { k: 'Stack Aktif', v: 'Docker · Go · Python' },
        ],
      },
      {
        id: 'db-cluster',
        unit: 'U02',
        host: 'DB-PROD-CLUSTER',
        badge: 'Database',
        sub: 'PostgreSQL · MySQL · SQLite Cache Lokal',
        pingResult: '1.9 ms · ACID Commit Ready',
        metrics: [
          { k: 'Replikasi', v: 'WAL Sync Active' },
          { k: 'Mesin DB', v: 'PostgreSQL · MySQL' },
          { k: 'Cache Perangkat', v: 'SQLite Embedded' },
        ],
      },
      {
        id: 'lp3i-campus',
        unit: 'U03',
        host: 'LP3I-CAMPUS-SRV',
        badge: '2017-2024',
        sub: 'Server Sistem Kampus & Ujian Lab Terjadwal',
        pingResult: '0.8 ms · Gigabit LAN Ready',
        metrics: [
          { k: 'Kapasitas Lab', v: '30+ PC Sinkron' },
          { k: 'Aplikasi Inti', v: 'Ujian & Persuratan' },
          { k: 'Masa Operasi', v: '8+ Tahun Produksi' },
        ],
      },
      {
        id: 'net-switch',
        unit: 'U04',
        host: 'NET-CORE-SWITCH',
        badge: 'Network',
        sub: 'Topologi LAN, Segmentasi VLAN, & Hardware Ops',
        pingResult: '0.5 ms · Full-Duplex VLAN 10',
        metrics: [
          { k: 'Segmentasi', v: 'VLAN Lab & Server' },
          { k: 'Keandalan', v: 'Zero-Drop Routing' },
          { k: 'Lingkup Ops', v: 'IT Support & Infra' },
        ],
      },
    ],
    topology: [
      {
        key: 'edge',
        title: 'Klien Edge',
        nodes: ['App Mobile', '30+ PC LAN', 'Web Klinik'],
      },
      {
        key: 'gw',
        title: 'Gateway API',
        nodes: ['Docker', 'REST Go/PHP', 'Python AI'],
      },
      {
        key: 'db',
        title: 'Basis Data',
        nodes: ['Postgres DB', 'MySQL App', 'SQLite Cache'],
      },
    ],
  },
  en: {
    ambientTag: 'Chilled Server Room · 21.4°C · NOC Active',
    stations: {
      overview: {
        tab: 'Full Room',
        title: 'Server Room & Infrastructure Panorama Tour',
        sub: 'Click numbered zones 1–4 inside the room, pick any desktop computer, or press Next → to walk around.',
      },
      screen: {
        tab: '1. Infra Screen',
        title: '1 · NOC Wall Infrastructure Blueprint Screen',
        sub: 'Live packet paths flowing from client devices through Docker APIs to database clusters.',
      },
      computers: {
        tab: '2. 4 Computers',
        title: '2 · Workstation Console Row (4 Active PCs)',
        sub: 'Inspect the four computers monitoring LP3I Lab Exams, GPS Attendance, doklinc Clinic, & Docker AI.',
      },
      rack: {
        tab: '3. Server Rack',
        title: '3 · Production Server Rack Cabinet (U01–U04)',
        sub: 'Select U01–U04 server blades and run live ping diagnostics across each host.',
      },
      network: {
        tab: '4. Core Switch',
        title: '4 · 24-Port Managed Switch & VLAN Segmentation',
        sub: 'Isolates 30+ Exam Lab PCs, Server Rack, and Staff subnets for zero-drop throughput.',
      },
    },
    flows: [
      { id: 'all', label: 'All Flows', litNodes: ['edge-0', 'edge-1', 'edge-2', 'gw-0', 'gw-1', 'gw-2', 'db-0', 'db-1', 'db-2'] },
      { id: 'bcs', label: 'GPS & Clinic', litNodes: ['edge-0', 'edge-2', 'gw-0', 'gw-1', 'db-0', 'db-2'] },
      { id: 'lp3i', label: 'LP3I Exam Lab', litNodes: ['edge-1', 'gw-1', 'db-1'] },
    ],
    computers: [
      {
        id: 'pc-lab',
        label: 'PC-01 · LP3I Lab',
        screenLine: '30+ Exam PCs · LAN',
        title: 'PC-01 · Local Exam Supervisor Console (LP3I)',
        sub: 'Controls synchronized PHP exam sessions, countdown timers, & grading across 30+ lab PCs.',
        metrics: [
          { k: 'Lab Fleet', v: '30+ Gigabit PCs' },
          { k: 'Exam Engine', v: 'PHP · MySQL LAN' },
          { k: 'Status', v: 'Sync Ready' },
        ],
      },
      {
        id: 'pc-bcs',
        label: 'PC-02 · BCS GPS',
        screenLine: 'GPS · REST :8080',
        title: 'PC-02 · Android & iOS Attendance Gateway Monitor',
        sub: 'Tracks geofenced employee check-ins, shifts, and RESTful API traffic at PT. BCS Logistics.',
        metrics: [
          { k: 'Clients', v: 'Android & iOS' },
          { k: 'API Tier', v: 'Go & PHP REST' },
          { k: 'Storage', v: 'PostgreSQL + SQLite' },
        ],
      },
      {
        id: 'pc-doklinc',
        label: 'PC-03 · doklinc',
        screenLine: 'Queues · Clinic UI',
        title: 'PC-03 · doklinc Healthcare Portal Terminal',
        sub: 'Monitors patient intake, doctor schedules, and real-time clinical queue updates.',
        metrics: [
          { k: 'Module', v: 'Schedule & Queue' },
          { k: 'Container', v: 'Docker Isolated' },
          { k: 'Integrity', v: 'ACID PostgreSQL' },
        ],
      },
      {
        id: 'pc-ai',
        label: 'PC-04 · AI Shell',
        screenLine: 'Docker · Agent OS',
        title: 'PC-04 · Docker & AI Agent Operations Terminal',
        sub: 'Runs service containers, Python AI agent pipelines, and infrastructure automation scripts.',
        metrics: [
          { k: 'Containers', v: 'Docker Compose' },
          { k: 'Languages', v: 'Python · Go · JS' },
          { k: 'Telemetry', v: 'Live Container Logs' },
        ],
      },
    ],
    vlans: [
      'VLAN 10 · Exam Lab (30+ PCs)',
      'VLAN 20 · Server & DB Cluster',
      'VLAN 30 · Staff & Clinic Web',
      'WAN Fiber · REST Gateway',
    ],
    networkMetrics: [
      { k: 'Switch Matrix', v: '24-Port Managed' },
      { k: 'Subnet Plan', v: 'VLAN 10 / 20 / 30' },
      { k: 'Reliability', v: '2017–2024 Uptime' },
    ],
    blades: [
      {
        id: 'bcs-docker',
        unit: 'U01',
        host: 'BCS-APP-DOCKER',
        badge: 'Docker',
        sub: 'Container Gateway · Go & Python RESTful API',
        pingResult: '1.4 ms · 0% loss · Container Healthy',
        metrics: [
          { k: 'Node Status', v: 'ONLINE · 99.9%' },
          { k: 'API Gateway', v: 'REST :8080 / TLS' },
          { k: 'Runtime Stack', v: 'Docker · Go · Python' },
        ],
      },
      {
        id: 'db-cluster',
        unit: 'U02',
        host: 'DB-PROD-CLUSTER',
        badge: 'Database',
        sub: 'PostgreSQL · MySQL · Embedded SQLite Cache',
        pingResult: '1.9 ms · ACID Commit Ready',
        metrics: [
          { k: 'Replication', v: 'WAL Sync Active' },
          { k: 'Primary Engines', v: 'PostgreSQL · MySQL' },
          { k: 'Edge Cache', v: 'SQLite Embedded' },
        ],
      },
      {
        id: 'lp3i-campus',
        unit: 'U03',
        host: 'LP3I-CAMPUS-SRV',
        badge: '2017-2024',
        sub: 'Campus Exam Server & Internal Operations Host',
        pingResult: '0.8 ms · Gigabit LAN Ready',
        metrics: [
          { k: 'Lab Capacity', v: '30+ Sync Clients' },
          { k: 'Core Apps', v: 'Exam & Letter Suite' },
          { k: 'Track Record', v: '8+ Years Uptime' },
        ],
      },
      {
        id: 'net-switch',
        unit: 'U04',
        host: 'NET-CORE-SWITCH',
        badge: 'Network',
        sub: 'LAN Topology, VLAN Segmentation, & Hardware Ops',
        pingResult: '0.5 ms · Full-Duplex VLAN 10',
        metrics: [
          { k: 'Segmentation', v: 'Exam & Staff VLAN' },
          { k: 'Reliability', v: 'Zero-Drop Routing' },
          { k: 'Operations', v: 'IT Support & Infra' },
        ],
      },
    ],
    topology: [
      {
        key: 'edge',
        title: 'Client Edge',
        nodes: ['Mobile App', '30+ Lab PCs', 'Clinic Web'],
      },
      {
        key: 'gw',
        title: 'API Gateway',
        nodes: ['Docker', 'REST Go/PHP', 'Python AI'],
      },
      {
        key: 'db',
        title: 'Databases',
        nodes: ['Postgres DB', 'MySQL Apps', 'SQLite Cache'],
      },
    ],
  },
};

function buildServerArtworkSvg(kind, { activeBladeId = 'bcs-docker', activePcId = 'pc-lab', flowLit = [], large = false } = {}) {
  const uid = `${kind}-${large ? 'lg' : 'sm'}`;
  const isLit = (key) => (flowLit.length === 0 || flowLit.includes(key) ? '#18d2b6' : '#3a5968');
  const isGlowOpacity = (key) => (flowLit.length === 0 || flowLit.includes(key) ? '1' : '0.42');

  if (kind === 'rack') {
    const blades = [
      { id: 'bcs-docker', label: 'U01 · DOCKER', y: 48 },
      { id: 'db-cluster', label: 'U02 · POSTGRES', y: 84 },
      { id: 'lp3i-campus', label: 'U03 · LP3I SRV', y: 120 },
      { id: 'net-switch', label: 'U04 · CORE NET', y: 156 },
    ];
    return `
      <svg viewBox="0 0 200 205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Server Rack Hardware U01-U04">
        <defs>
          <linearGradient id="rack-${uid}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#193346"/>
            <stop offset="100%" stop-color="#09151e"/>
          </linearGradient>
        </defs>
        <rect x="6" y="4" width="188" height="197" rx="10" fill="url(#rack-${uid})" stroke="#2a556a" stroke-width="2"/>
        <rect x="14" y="12" width="172" height="24" rx="5" fill="#08131b" stroke="#18d2b6" stroke-opacity="0.45"/>
        <circle cx="28" cy="24" r="4" fill="#18d2b6"/>
        <text x="40" y="28" font-family="Space Grotesk, sans-serif" font-size="10" font-weight="700" fill="#dff3f8">RACK-A · 21.4°C</text>
        <text x="174" y="28" text-anchor="end" font-family="Space Grotesk, sans-serif" font-size="9" font-weight="700" fill="#18d2b6">4U</text>
        ${blades
          .map((b) => {
            const on = b.id === activeBladeId;
            return `
            <rect x="14" y="${b.y}" width="172" height="28" rx="5" fill="${on ? '#113847' : '#0b1b26'}" stroke="${on ? '#18d2b6' : '#2a4857'}" stroke-width="${on ? '1.8' : '1.1'}"/>
            <circle cx="26" cy="${b.y + 14}" r="3.5" fill="${on ? '#18d2b6' : '#329688'}"/>
            <text x="36" y="${b.y + 18}" font-family="Space Grotesk, sans-serif" font-size="9.5" font-weight="700" fill="${on ? '#ffffff' : '#b7d4e0'}">${b.label}</text>
            <rect x="130" y="${b.y + 9}" width="32" height="10" rx="2" fill="#07131c" stroke="#2d4c5c" stroke-width="0.8"/>
            <line x1="135" y1="${b.y + 14}" x2="157" y2="${b.y + 14}" stroke="${on ? '#f6ce72' : '#18d2b6'}" stroke-width="2" stroke-dasharray="3 2"/>
            <circle cx="174" cy="${b.y + 14}" r="3" fill="${on ? '#f6ce72' : '#3a5968'}"/>
          `;
          })
          .join('')}
        <line x1="20" y1="192" x2="180" y2="192" stroke="#18d2b6" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 4"/>
      </svg>
    `;
  }

  if (kind === 'network') {
    const portsTop = Array.from({ length: 12 }, (_, i) => {
      const lit = i % 4 !== 3;
      return `<rect x="${20 + i * 13.5}" y="54" width="10" height="9" rx="1.5" fill="${lit ? '#18d2b6' : '#172c38'}" stroke="#2a4857" stroke-width="0.8"/>`;
    }).join('');
    const portsBot = Array.from({ length: 12 }, (_, i) => {
      const lit = i % 3 !== 2;
      return `<rect x="${20 + i * 13.5}" y="68" width="10" height="9" rx="1.5" fill="${lit ? '#f6ce72' : '#172c38'}" stroke="#2a4857" stroke-width="0.8"/>`;
    }).join('');
    return `
      <svg viewBox="0 0 200 205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Core Managed Switch 24-Port VLAN">
        <defs>
          <linearGradient id="sw-${uid}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#173042"/>
            <stop offset="100%" stop-color="#08131c"/>
          </linearGradient>
        </defs>
        <rect x="6" y="4" width="188" height="197" rx="10" fill="url(#sw-${uid})" stroke="#2a556a" stroke-width="2"/>
        <rect x="14" y="12" width="172" height="24" rx="5" fill="#08131b" stroke="#18d2b6" stroke-opacity="0.45"/>
        <text x="24" y="28" font-family="Space Grotesk, sans-serif" font-size="10" font-weight="700" fill="#dff3f8">SWITCH · 24-PORT</text>
        <circle cx="174" cy="24" r="4" fill="#18d2b6"/>
        <rect x="14" y="44" width="172" height="42" rx="6" fill="#08151f" stroke="#2d4c5c"/>
        ${portsTop}
        ${portsBot}
        <path d="M36 86 C36 106 54 106 54 120" stroke="#18d2b6" stroke-width="2.2" fill="none"/>
        <path d="M98 86 C98 106 100 106 100 120" stroke="#f6ce72" stroke-width="2.2" fill="none"/>
        <path d="M162 86 C162 106 146 106 146 120" stroke="#5bb8ff" stroke-width="2.2" fill="none"/>
        <rect x="14" y="116" width="172" height="22" rx="4" fill="#0e2534" stroke="#18d2b6" stroke-opacity="0.5"/>
        <text x="100" y="131" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="9.5" font-weight="700" fill="#18d2b6">VLAN 10 · 30+ LAB PCs</text>
        <rect x="14" y="144" width="172" height="22" rx="4" fill="#0e2534" stroke="#f6ce72" stroke-opacity="0.45"/>
        <text x="100" y="159" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="9.5" font-weight="700" fill="#f6ce72">VLAN 20 · DB &amp; DOCKER</text>
        <rect x="14" y="172" width="172" height="22" rx="4" fill="#0e2534" stroke="#5bb8ff" stroke-opacity="0.45"/>
        <text x="100" y="187" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="9.5" font-weight="700" fill="#9fd6ff">VLAN 30 · CLINIC &amp; WAN</text>
      </svg>
    `;
  }

  if (kind === 'pc') {
    const visuals = {
      'pc-lab': {
        accent: '#18d2b6',
        title: 'PC-01 · LAB LP3I',
        graphic: `
          <rect x="26" y="34" width="24" height="18" rx="3" fill="#103647" stroke="#18d2b6"/>
          <rect x="56" y="34" width="24" height="18" rx="3" fill="#103647" stroke="#18d2b6"/>
          <rect x="86" y="34" width="24" height="18" rx="3" fill="#103647" stroke="#18d2b6"/>
          <rect x="26" y="58" width="24" height="18" rx="3" fill="#103647" stroke="#18d2b6"/>
          <rect x="56" y="58" width="24" height="18" rx="3" fill="#103647" stroke="#18d2b6"/>
          <rect x="86" y="58" width="24" height="18" rx="3" fill="#103647" stroke="#18d2b6"/>
          <circle cx="142" cy="56" r="18" fill="#0c2633" stroke="#f6ce72" stroke-width="2"/>
          <path d="M142 46 V56 L150 60" stroke="#f6ce72" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        `,
      },
      'pc-bcs': {
        accent: '#f6ce72',
        title: 'PC-02 · PRESENSI GPS',
        graphic: `
          <circle cx="62" cy="56" r="24" fill="none" stroke="#18d2b6" stroke-opacity="0.4" stroke-dasharray="4 3"/>
          <circle cx="62" cy="56" r="14" fill="none" stroke="#18d2b6" stroke-width="1.5"/>
          <circle cx="62" cy="56" r="5" fill="#f6ce72"/>
          <rect x="108" y="32" width="44" height="50" rx="6" fill="#0e2a39" stroke="#f6ce72" stroke-width="1.6"/>
          <circle cx="130" cy="48" r="7" fill="#18d2b6"/>
          <line x1="116" y1="64" x2="144" y2="64" stroke="#9ec4d6" stroke-width="2"/>
          <line x1="116" y1="72" x2="138" y2="72" stroke="#9ec4d6" stroke-width="2"/>
        `,
      },
      'pc-doklinc': {
        accent: '#5be4d1',
        title: 'PC-03 · DOKLINC CLINIC',
        graphic: `
          <rect x="26" y="34" width="38" height="44" rx="6" fill="#0f323d" stroke="#18d2b6" stroke-width="1.6"/>
          <path d="M45 45 V67 M34 56 H56" stroke="#18d2b6" stroke-width="4" stroke-linecap="round"/>
          <polyline points="74,62 90,62 98,42 108,74 118,52 126,62 154,62" fill="none" stroke="#f6ce72" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
        `,
      },
      'pc-ai': {
        accent: '#a29bfe',
        title: 'PC-04 · DOCKER & AI',
        graphic: `
          <polygon points="56,34 80,46 80,70 56,82 32,70 32,46" fill="#102c40" stroke="#18d2b6" stroke-width="1.8"/>
          <line x1="32" y1="46" x2="56" y2="58" stroke="#18d2b6" stroke-width="1.2"/>
          <line x1="80" y1="46" x2="56" y2="58" stroke="#18d2b6" stroke-width="1.2"/>
          <line x1="56" y1="58" x2="56" y2="82" stroke="#18d2b6" stroke-width="1.2"/>
          <line x1="102" y1="42" x2="146" y2="56" stroke="#f6ce72" stroke-width="1.8"/>
          <line x1="102" y1="70" x2="146" y2="56" stroke="#f6ce72" stroke-width="1.8"/>
          <circle cx="102" cy="42" r="7" fill="#18d2b6"/>
          <circle cx="102" cy="70" r="7" fill="#18d2b6"/>
          <circle cx="146" cy="56" r="9" fill="#f6ce72"/>
        `,
      },
    };
    const v = visuals[activePcId] || visuals['pc-lab'];
    return `
      <svg viewBox="0 0 180 124" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${v.title}">
        <rect x="8" y="6" width="164" height="92" rx="8" fill="#07131c" stroke="${v.accent}" stroke-width="2"/>
        <rect x="14" y="12" width="152" height="16" rx="3" fill="#0d2332"/>
        <text x="20" y="23" font-family="Space Grotesk, sans-serif" font-size="9" font-weight="700" fill="${v.accent}">${v.title}</text>
        <circle cx="156" cy="20" r="3" fill="#18d2b6"/>
        ${v.graphic}
        <rect x="78" y="98" width="24" height="14" fill="#2c4959"/>
        <rect x="56" y="112" width="68" height="6" rx="3" fill="#416478"/>
      </svg>
    `;
  }

  // Default: Wide NOC Infrastructure Architecture Blueprint Wall Screen
  return `
    <svg viewBox="0 0 320 175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NOC Infrastructure Architecture Blueprint">
      <defs>
        <linearGradient id="scr-${uid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0b2434"/>
          <stop offset="100%" stop-color="#06131d"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="312" height="167" rx="10" fill="url(#scr-${uid})" stroke="#2a5a6e" stroke-width="2"/>
      <rect x="14" y="13" width="292" height="18" rx="4" fill="#0f2f40"/>
      <circle cx="26" cy="22" r="3.5" fill="#18d2b6"/>
      <text x="36" y="25" font-family="Space Grotesk, sans-serif" font-size="9" font-weight="700" fill="#e2f3f8">SYAMSUL NOC · INFRASTRUCTURE TOPOLOGY</text>
      <text x="298" y="25" text-anchor="end" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="#18d2b6">LIVE</text>

      <!-- Animated Conduit Connectors -->
      <line x1="94" y1="56" x2="124" y2="56" stroke="#18d2b6" stroke-width="2" stroke-dasharray="4 3"/>
      <line x1="94" y1="92" x2="124" y2="92" stroke="#f6ce72" stroke-width="2" stroke-dasharray="4 3"/>
      <line x1="94" y1="128" x2="124" y2="128" stroke="#18d2b6" stroke-width="2" stroke-dasharray="4 3"/>
      <line x1="196" y1="56" x2="226" y2="56" stroke="#18d2b6" stroke-width="2" stroke-dasharray="4 3"/>
      <line x1="196" y1="92" x2="226" y2="92" stroke="#f6ce72" stroke-width="2" stroke-dasharray="4 3"/>
      <line x1="196" y1="128" x2="226" y2="128" stroke="#18d2b6" stroke-width="2" stroke-dasharray="4 3"/>

      <!-- Column 1: Edge Devices -->
      <g opacity="${isGlowOpacity('edge-0')}">
        <rect x="16" y="42" width="78" height="28" rx="5" fill="#0d2938" stroke="${isLit('edge-0')}" stroke-width="1.4"/>
        <rect x="23" y="48" width="9" height="15" rx="2" fill="none" stroke="${isLit('edge-0')}" stroke-width="1.4"/>
        <text x="38" y="59" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="#e6f5fa">Mobile GPS</text>
      </g>
      <g opacity="${isGlowOpacity('edge-1')}">
        <rect x="16" y="78" width="78" height="28" rx="5" fill="#0d2938" stroke="${isLit('edge-1')}" stroke-width="1.4"/>
        <rect x="22" y="85" width="12" height="9" rx="1.5" fill="none" stroke="${isLit('edge-1')}" stroke-width="1.4"/>
        <text x="39" y="95" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="#e6f5fa">30+ Lab PC</text>
      </g>
      <g opacity="${isGlowOpacity('edge-2')}">
        <rect x="16" y="114" width="78" height="28" rx="5" fill="#0d2938" stroke="${isLit('edge-2')}" stroke-width="1.4"/>
        <circle cx="28" cy="128" r="5" fill="none" stroke="${isLit('edge-2')}" stroke-width="1.4"/>
        <text x="38" y="131" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="#e6f5fa">Klinik Web</text>
      </g>

      <!-- Column 2: Docker & API Gateway -->
      <g opacity="${isGlowOpacity('gw-0')}">
        <rect x="124" y="42" width="72" height="28" rx="5" fill="#0f3242" stroke="${isLit('gw-0')}" stroke-width="1.6"/>
        <polygon points="135,48 142,52 142,59 135,63 128,59 128,52" fill="${isLit('gw-0')}" fill-opacity="0.3" stroke="${isLit('gw-0')}" stroke-width="1.2"/>
        <text x="148" y="59" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="#ffffff">Docker</text>
      </g>
      <g opacity="${isGlowOpacity('gw-1')}">
        <rect x="124" y="78" width="72" height="28" rx="5" fill="#0f3242" stroke="${isLit('gw-1')}" stroke-width="1.6"/>
        <text x="160" y="95" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="#f6ce72">REST Go/PHP</text>
      </g>
      <g opacity="${isGlowOpacity('gw-2')}">
        <rect x="124" y="114" width="72" height="28" rx="5" fill="#0f3242" stroke="${isLit('gw-2')}" stroke-width="1.6"/>
        <text x="160" y="131" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="#ffffff">Python AI</text>
      </g>

      <!-- Column 3: Databases -->
      <g opacity="${isGlowOpacity('db-0')}">
        <rect x="226" y="42" width="78" height="28" rx="5" fill="#0d2938" stroke="${isLit('db-0')}" stroke-width="1.4"/>
        <ellipse cx="238" cy="52" rx="6" ry="3" fill="${isLit('db-0')}" fill-opacity="0.4" stroke="${isLit('db-0')}" stroke-width="1.2"/>
        <path d="M232 52 V61 C232 63 244 63 244 61 V52" fill="none" stroke="${isLit('db-0')}" stroke-width="1.2"/>
        <text x="250" y="59" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="#e6f5fa">Postgres</text>
      </g>
      <g opacity="${isGlowOpacity('db-1')}">
        <rect x="226" y="78" width="78" height="28" rx="5" fill="#0d2938" stroke="${isLit('db-1')}" stroke-width="1.4"/>
        <ellipse cx="238" cy="88" rx="6" ry="3" fill="${isLit('db-1')}" fill-opacity="0.4" stroke="${isLit('db-1')}" stroke-width="1.2"/>
        <path d="M232 88 V97 C232 99 244 99 244 97 V88" fill="none" stroke="${isLit('db-1')}" stroke-width="1.2"/>
        <text x="250" y="95" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="#e6f5fa">MySQL</text>
      </g>
      <g opacity="${isGlowOpacity('db-2')}">
        <rect x="226" y="114" width="78" height="28" rx="5" fill="#0d2938" stroke="${isLit('db-2')}" stroke-width="1.4"/>
        <ellipse cx="238" cy="124" rx="6" ry="3" fill="${isLit('db-2')}" fill-opacity="0.4" stroke="${isLit('db-2')}" stroke-width="1.2"/>
        <path d="M232 124 V133 C232 135 244 135 244 133 V124" fill="none" stroke="${isLit('db-2')}" stroke-width="1.2"/>
        <text x="250" y="131" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="#e6f5fa">SQLite</text>
      </g>

      <text x="160" y="160" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="8" font-weight="600" fill="#8fb4c4">EDGE CLIENTS → DOCKER &amp; REST API → POSTGRESQL / MYSQL / SQLITE</text>
    </svg>
  `;
}

const AWARDS_HALL_ITEMS = {
  id: [
    {
      id: 'cert-hacktiv8',
      wall: 'left',
      depth: 'near',
      kind: 'certificate',
      palette: 'navy-gold',
      year: 'Agu 2025',
      shortLabel: 'Hacktiv8 · AI API',
      title: 'Sertifikasi AI Productivity & AI API Integration',
      issuer: 'Hacktiv8 Indonesia · Program Spesialis AI Developer',
      detail: 'Pelatihan intensif orkestrasi LLM, rekayasa prompt terstruktur, dan integrasi AI API untuk workflow produksi.',
      ribbonText: 'AI SPECIALIST',
      sealCode: 'H8',
    },
    {
      id: 'cert-global',
      wall: 'left',
      depth: 'mid',
      kind: 'certificate',
      palette: 'cream-gold',
      year: '2016',
      shortLabel: 'S1 · IPK 3.32',
      title: 'Ijazah & Piagam S1 Sistem Informasi',
      issuer: 'STMIK Bina Sarana Global · Tangerang, Banten',
      detail: 'Menyelesaikan studi sarjana Sistem Informasi (2014–2016) dengan IPK 3.32 serta fokus rekayasa perangkat lunak.',
      ribbonText: 'IPK 3.32',
      sealCode: 'S1',
    },
    {
      id: 'cert-lp3i',
      wall: 'left',
      depth: 'far',
      kind: 'certificate',
      palette: 'teal-gold',
      year: '2014',
      shortLabel: 'D3 · IPK 2.92',
      title: 'Piagam Vokasi D3 Manajemen Informatika',
      issuer: 'Politeknik LP3I Bandung · Bandung, Jawa Barat',
      detail: 'Fondasi pemrograman terstruktur, administrasi basis data, dan jaringan komputer terapan (2011–2014).',
      ribbonText: 'D3 TI',
      sealCode: 'D3',
    },
    {
      id: 'award-ptk-2017',
      wall: 'right',
      depth: 'near',
      kind: 'plaque',
      palette: 'walnut-gold',
      year: '2017',
      shortLabel: 'Juara 1 · Cilegon',
      title: 'Plakat Emas Juara 1 Lomba PTK PNFI',
      issuer: 'Instruktur Komputer Tingkat Kota Cilegon',
      detail: 'Meraih peringkat pertama kategori Pendidik & Tenaga Kependidikan Nonformal bidang Instruktur Komputer 2017.',
      ribbonText: 'JUARA 1',
      sealCode: '#1',
    },
    {
      id: 'award-ptk-2018',
      wall: 'right',
      depth: 'mid',
      kind: 'plaque',
      palette: 'bronze-gold',
      year: '2018',
      shortLabel: 'Juara 3 · Banten',
      title: 'Plakat Kehormatan Juara 3 PTK PNFI Banten',
      issuer: 'Instruktur Komputer Tingkat Provinsi Banten',
      detail: 'Mewakili Kota Cilegon dan meraih Juara 3 Instruktur Komputer PTK PNFI pada ajang tingkat Provinsi Banten.',
      ribbonText: 'JUARA 3',
      sealCode: '#3',
    },
    {
      id: 'award-futsal-2011',
      wall: 'right',
      depth: 'far',
      kind: 'plaque',
      palette: 'slate-gold',
      year: '2011',
      shortLabel: 'Prestasi · LP3I',
      title: 'Plakat Penghargaan Mahasiswa Berprestasi',
      issuer: 'LP3I Business College · Bidang Olahraga Futsal',
      detail: 'Penghargaan kontribusi dan sportivitas tim futsal pada kegiatan kemahasiswaan LP3I College tahun 2011.',
      ribbonText: 'PRESTASI',
      sealCode: '★',
    },
  ],
  en: [
    {
      id: 'cert-hacktiv8',
      wall: 'left',
      depth: 'near',
      kind: 'certificate',
      palette: 'navy-gold',
      year: 'Aug 2025',
      shortLabel: 'Hacktiv8 · AI API',
      title: 'AI Productivity & AI API Integration Certificate',
      issuer: 'Hacktiv8 Indonesia · Developer Track',
      detail: 'Completed specialized certification in LLM agent workflows, structured prompt engineering, and production AI APIs.',
      ribbonText: 'AI CERTIFIED',
      sealCode: 'H8',
    },
    {
      id: 'cert-global',
      wall: 'left',
      depth: 'mid',
      kind: 'certificate',
      palette: 'cream-gold',
      year: '2016',
      shortLabel: 'B.S. · GPA 3.32',
      title: 'Bachelor of Information Systems Diploma Plaque',
      issuer: 'STMIK Bina Sarana Global · Tangerang, Banten',
      detail: 'Graduated in Information Systems (2014–2016) with a 3.32 GPA focusing on enterprise software architecture.',
      ribbonText: 'GPA 3.32',
      sealCode: 'B.S.',
    },
    {
      id: 'cert-lp3i',
      wall: 'left',
      depth: 'far',
      kind: 'certificate',
      palette: 'teal-gold',
      year: '2014',
      shortLabel: 'D3 · GPA 2.92',
      title: 'Informatics Management Vocational Certificate',
      issuer: 'Politeknik LP3I Bandung · Bandung, West Java',
      detail: 'Hands-on foundation in structured programming, database design, and applied networking systems (2011–2014).',
      ribbonText: 'D3 TECH',
      sealCode: 'D3',
    },
    {
      id: 'award-ptk-2017',
      wall: 'right',
      depth: 'near',
      kind: 'plaque',
      palette: 'walnut-gold',
      year: '2017',
      shortLabel: '1st · Cilegon City',
      title: '1st Place Gold Plaque · PTK PNFI Competition',
      issuer: 'Computer Instructor Category · Cilegon City',
      detail: 'Awarded 1st Place for Computer Instructor excellence in Cilegon City Vocational Educator Competition (2017).',
      ribbonText: '1ST PLACE',
      sealCode: '#1',
    },
    {
      id: 'award-ptk-2018',
      wall: 'right',
      depth: 'mid',
      kind: 'plaque',
      palette: 'bronze-gold',
      year: '2018',
      shortLabel: '3rd · Banten Prov',
      title: '3rd Place Honor Plaque · PTK PNFI Banten',
      issuer: 'Computer Instructor · Banten Province Level',
      detail: 'Represented Cilegon City at the provincial level and earned 3rd Place among Banten Computer Instructors.',
      ribbonText: '3RD PLACE',
      sealCode: '#3',
    },
    {
      id: 'award-futsal-2011',
      wall: 'right',
      depth: 'far',
      kind: 'plaque',
      palette: 'slate-gold',
      year: '2011',
      shortLabel: 'Award · LP3I',
      title: 'Outstanding Student Achievement Plaque',
      issuer: 'LP3I Business College · Futsal Athletics',
      detail: 'Recognized for collegiate athletic achievement and team sportsmanship in Futsal at LP3I College (2011).',
      ribbonText: 'HONOR',
      sealCode: '★',
    },
  ],
};

function buildPlaqueArtworkSvg(item, { large = false } = {}) {
  const uid = `${item.id}-${large ? 'lg' : 'sm'}`;
  const isCert = item.kind === 'certificate';
  if (isCert) {
    const bgMap = {
      'navy-gold': { paper: '#0f2334', inner: '#153046', sealBg: '#153046', text: '#f6ecd2', sub: '#9ec4d6', accent: '#f3cb6a' },
      'cream-gold': { paper: '#fbf4df', inner: '#f3e5c0', sealBg: '#3b2810', text: '#2b2010', sub: '#6b5332', accent: '#b7811f' },
      'teal-gold': { paper: '#0f2d2c', inner: '#133b38', sealBg: '#133b38', text: '#eef7f4', sub: '#98d6cd', accent: '#f3cb6a' },
    };
    const p = bgMap[item.palette] || bgMap['navy-gold'];
    return `
      <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.title}">
        <defs>
          <linearGradient id="gold-${uid}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fbe6a2"/>
            <stop offset="50%" stop-color="#d49b35"/>
            <stop offset="100%" stop-color="#8c5f14"/>
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="216" height="146" rx="10" fill="url(#gold-${uid})"/>
        <rect x="8" y="8" width="204" height="134" rx="6" fill="${p.paper}"/>
        <rect x="13" y="13" width="194" height="124" rx="4" fill="none" stroke="${p.accent}" stroke-width="1.4" stroke-dasharray="4 2"/>
        <path d="M18 24 L26 24 L26 18 M194 18 L194 24 L202 24 M18 126 L26 126 L26 132 M194 132 L194 126 L202 126" stroke="${p.accent}" stroke-width="1.6" fill="none"/>
        <rect x="28" y="24" width="112" height="14" rx="3" fill="${p.inner}"/>
        <text x="84" y="34" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="8.5" font-weight="700" fill="${p.accent}">${item.ribbonText}</text>
        <text x="30" y="57" font-family="Space Grotesk, sans-serif" font-size="11" font-weight="700" fill="${p.text}">${item.shortLabel}</text>
        <line x1="30" y1="66" x2="132" y2="66" stroke="${p.sub}" stroke-width="1.8" opacity="0.72"/>
        <line x1="30" y1="74" x2="120" y2="74" stroke="${p.sub}" stroke-width="1.4" opacity="0.5"/>
        <line x1="30" y1="82" x2="108" y2="82" stroke="${p.sub}" stroke-width="1.4" opacity="0.38"/>
        <path d="M32 114 Q46 102 60 112 T90 110" stroke="${p.accent}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        <text x="30" y="126" font-family="Plus Jakarta Sans, sans-serif" font-size="8.5" font-weight="600" fill="${p.sub}">M. SYAMSUL · ${item.year}</text>
        <path d="M168 88 L158 124 L169 116 L174 126 Z" fill="#18d2b6" opacity="0.9"/>
        <path d="M178 88 L174 126 L181 116 L192 124 Z" fill="#c98a22" opacity="0.95"/>
        <circle cx="174" cy="70" r="24" fill="url(#gold-${uid})" stroke="${p.paper}" stroke-width="2"/>
        <circle cx="174" cy="70" r="18" fill="${p.sealBg}" stroke="#fbe6a2" stroke-width="1.2"/>
        <text x="174" y="75" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700" fill="#fbe6a2">${item.sealCode}</text>
      </svg>
    `;
  }

  const woodMap = {
    'walnut-gold': { board: '#2d1c12', inner: '#1f130c', metal: '#fbe6a2', plate: '#3e2618' },
    'bronze-gold': { board: '#27202b', inner: '#1a151d', metal: '#f4ce90', plate: '#372c3d' },
    'slate-gold': { board: '#162836', inner: '#0f1c26', metal: '#79efe0', plate: '#1e3648' },
  };
  const w = woodMap[item.palette] || woodMap['walnut-gold'];
  return `
    <svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.title}">
      <defs>
        <linearGradient id="shield-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fcebaf"/>
          <stop offset="52%" stop-color="#d49a33"/>
          <stop offset="100%" stop-color="#875811"/>
        </linearGradient>
      </defs>
      <path d="M36 8 H184 L196 22 V104 C196 126 110 144 110 144 C110 144 24 126 24 104 V22 Z" fill="url(#shield-${uid})"/>
      <path d="M41 14 H179 L188 25 V101 C188 119 110 135 110 135 C110 135 32 119 32 101 V25 Z" fill="${w.board}"/>
      <path d="M47 20 H173 L180 28 V98 C180 113 110 127 110 127 C110 127 40 113 40 98 V28 Z" fill="${w.inner}" stroke="url(#shield-${uid})" stroke-width="1.2"/>
      <circle cx="54" cy="30" r="2.2" fill="#fcebaf"/>
      <circle cx="166" cy="30" r="2.2" fill="#fcebaf"/>
      <path d="M74 68 C62 56 64 38 78 30 M146 68 C158 56 156 38 142 30" stroke="url(#shield-${uid})" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <circle cx="110" cy="54" r="22" fill="url(#shield-${uid})"/>
      <circle cx="110" cy="54" r="16" fill="${w.plate}" stroke="#fcebaf" stroke-width="1.2"/>
      <text x="110" y="60" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700" fill="${w.metal}">${item.sealCode}</text>
      <rect x="58" y="84" width="104" height="24" rx="4" fill="url(#shield-${uid})"/>
      <text x="110" y="96" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="9" font-weight="700" fill="#1a1206">${item.ribbonText} · ${item.year}</text>
      <text x="110" y="105" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-size="7.5" font-weight="700" fill="#2e1e08">${item.shortLabel}</text>
    </svg>
  `;
}

// Measured normalized pixel coordinates on character_anime_clean.png (576 x 1024)
const CHAR_RIG = {
  skinTone: '#ffeed9',
  lashColor: '#3a261c',
  mouthInterior: '#a4544c',
  leftEye: { cx: 0.449, cy: 0.1255, rx: 0.017, ry: 0.0068 },
  rightEye: { cx: 0.5205, cy: 0.124, rx: 0.0185, ry: 0.0068 },
  mouth: { cx: 0.489, cy: 0.1592, w: 0.026 },
};

/**
 * Interactive 2.5D Living Workspace Diorama Stage with full ID/EN support.
 */
export function initLivingWorkspace({ getTimeMode, onRequestSection, onActionToast }) {
  const stage = document.getElementById('workspaceStage');
  const bgLayer = document.getElementById('workspaceBgLayer');
  const charCanvas = document.getElementById('workspaceCharCanvas');
  const charSourceImg = document.getElementById('workspaceCharSource');
  const canvas = document.getElementById('workspaceCanvas');
  const hotspotsWrap = document.getElementById('workspaceHotspots');
  const speechBubble = document.getElementById('charSpeechBubble');
  const speechText = document.getElementById('charSpeechText');
  const hudTitle = document.getElementById('hudHotspotTitle');
  const hudSummary = document.getElementById('hudHotspotSummary');
  const hudActionBtn = document.getElementById('hudHotspotAction');
  const lampSwitchBtn = document.getElementById('workspaceLampBtn');
  const greetBtn = document.getElementById('workspaceGreetBtn');
  const laptopOs = document.getElementById('workspaceLaptopOs');
  const laptopOsTitle = document.getElementById('laptopOsTitle');
  const laptopDock = document.getElementById('laptopOsDock');
  const laptopBody = document.getElementById('laptopOsBody');
  const laptopExitBtn = document.getElementById('laptopOsExitBtn');

  if (!stage || !canvas || !hotspotsWrap) return null;

  const ctx = canvas.getContext('2d');
  const ctxChar = charCanvas ? charCanvas.getContext('2d') : null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lampOn = getTimeMode() !== 'pagi';
  let aiBusy = false;
  let laptopOpen = false;
  let stageOverlayMode = null;
  let laptopCloseTimer = null;
  let laptopProjectId = 'presensi-online';
  let laptopScreenTab = 'utama';
  let infraBladeId = 'bcs-docker';
  let infraStationId = 'overview';
  let infraComputerId = 'pc-lab';
  let infraFlowId = 'all';
  let infraPingStatus = '';
  let awardsViewMode = 'full';
  let activeAwardId = 'award-ptk-2017';
  let activeHotspotId = 'ai-terminal';
  let targetPointer = { x: 0, y: 0 };
  let currentPointer = { x: 0, y: 0 };
  let pointerCanvas = { x: -999, y: -999 };
  let speechTimer = null;
  let stageWidth = 960;
  let stageHeight = 540;
  let charWidth = 190;
  let charHeight = 338;
  let quoteIdx = 0;

  let charImgReady = Boolean(charSourceImg?.complete && charSourceImg.naturalWidth > 0);
  let nextBlinkAt = performance.now() + 2600;
  let blinkStart = -1;
  let pendingDoubleBlink = false;
  let smileUntil = 0;
  let talkingUntil = performance.now() + 2200;

  if (charSourceImg && !charImgReady) {
    charSourceImg.addEventListener('load', () => {
      charImgReady = true;
    });
  }

  const particles = Array.from({ length: 34 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 1.2 + Math.random() * 2.1,
    vx: (Math.random() - 0.5) * 0.00025,
    vy: -0.00018 - Math.random() * 0.00028,
    phase: Math.random() * Math.PI * 2,
  }));

  const stars = Array.from({ length: 28 }, (_, idx) => {
    const isLeft = idx % 2 === 0;
    return {
      x: isLeft ? 0.368 + Math.random() * 0.12 : 0.512 + Math.random() * 0.118,
      y: 0.215 + Math.random() * 0.25,
      r: 0.85 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
    };
  });

  const clouds = [
    { baseX: 0.38, y: 0.29, w: 0.085, h: 0.022, speed: 0.0035 },
    { baseX: 0.52, y: 0.25, w: 0.095, h: 0.024, speed: 0.0026 },
    { baseX: 0.45, y: 0.37, w: 0.075, h: 0.018, speed: 0.0042 },
  ];

  function resizeCanvases() {
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    stageWidth = rect.width;
    stageHeight = rect.height;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (charCanvas && ctxChar) {
      const charRect = charCanvas.getBoundingClientRect();
      if (charRect.width && charRect.height) {
        charWidth = charRect.width;
        charHeight = charRect.height;
        charCanvas.width = Math.round(charRect.width * dpr);
        charCanvas.height = Math.round(charRect.height * dpr);
        ctxChar.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }
  }

  function renderHotspots() {
    const hotspots = getPortfolioData().workspaceHotspots;
    hotspotsWrap.innerHTML = hotspots
      .map(
        (hs, index) => `
      <button
        type="button"
        class="hotspot-pin${hs.id === activeHotspotId ? ' is-active' : ''}"
        style="left: ${hs.x}%; top: ${hs.y}%;"
        data-hotspot-id="${hs.id}"
        aria-label="${hs.title}"
        aria-pressed="${hs.id === activeHotspotId}"
      >
        <span class="hotspot-ring" aria-hidden="true"></span>
        <span class="hotspot-dot" aria-hidden="true">${index + 1}</span>
        <span class="hotspot-tooltip">${hs.title}</span>
      </button>
    `
      )
      .join('');
  }

  function showSpeech(message) {
    if (!speechBubble || !speechText) return;
    speechText.textContent = message;
    speechBubble.classList.add('is-visible');
    talkingUntil = performance.now() + Math.min(3400, 900 + message.length * 22);
    clearTimeout(speechTimer);
    speechTimer = window.setTimeout(() => {
      speechBubble.classList.remove('is-visible');
    }, 6500);
  }

  function syncLampButtonText() {
    if (!lampSwitchBtn) return;
    lampSwitchBtn.setAttribute('aria-pressed', String(lampOn));
    lampSwitchBtn.textContent = lampOn ? t('lampOnBtn') : t('lampOffBtn');
  }

  function updateHud(hotspotId) {
    const hotspots = getPortfolioData().workspaceHotspots;
    const hotspot = hotspots.find((item) => item.id === hotspotId) || hotspots[0];
    if (!hotspot) return;

    activeHotspotId = hotspot.id;
    hudTitle.textContent = hotspot.title;
    hudSummary.textContent = hotspot.summary;
    hudActionBtn.textContent = hotspot.ctaLabel;
    hudActionBtn.dataset.target = hotspot.targetSection;

    hotspotsWrap.querySelectorAll('.hotspot-pin').forEach((btn) => {
      const isMatch = btn.dataset.hotspotId === hotspot.id;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });
  }

  function toggleLamp(forceState) {
    lampOn = typeof forceState === 'boolean' ? forceState : !lampOn;
    stage.dataset.lamp = lampOn ? 'on' : 'off';
    syncLampButtonText();
    soundEngine.playLampToggle(lampOn);
    showSpeech(lampOn ? t('lampOnSpeech') : t('lampOffSpeech'));
    return lampOn;
  }

  function triggerGreeting() {
    soundEngine.playChime();
    const quotes = CHAR_QUOTES[getLang()] || CHAR_QUOTES.id;
    showSpeech(quotes[quoteIdx % quotes.length]);
    quoteIdx += 1;
    smileUntil = performance.now() + 1800;
    if (charCanvas) {
      charCanvas.classList.add('is-greeting');
      window.setTimeout(() => charCanvas.classList.remove('is-greeting'), 500);
    }
  }

  function getLaptopIcon(device) {
    if (device === 'mobile') {
      return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>';
    }
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>';
  }

  function syncStageChrome(mode) {
    if (laptopOsTitle) {
      const titleKey =
        mode === 'infra' ? 'infraOsTitle' : mode === 'awards' ? 'awardsOsTitle' : 'laptopOsTitle';
      laptopOsTitle.dataset.i18n = titleKey;
      laptopOsTitle.textContent = t(titleKey);
    }
    if (laptopExitBtn) {
      const exitKey =
        mode === 'infra' ? 'infraExitBtn' : mode === 'awards' ? 'awardsExitBtn' : 'laptopExitBtn';
      laptopExitBtn.dataset.i18n = exitKey;
      laptopExitBtn.textContent = t(exitKey);
    }
  }

  function syncInfraSceneStates(stageEl, langData, activeBlade, activePc, activeFlow) {
    stageEl.dataset.tourStation = infraStationId;
    stageEl.querySelectorAll('[data-tour-goto]').forEach((el) => {
      if (el.classList.contains('server-zone-box')) {
        el.classList.toggle('is-focus', el.dataset.tourGoto === infraStationId);
      }
    });
    stageEl.querySelectorAll('[data-infra-pc]').forEach((el) => {
      el.classList.toggle('is-selected', el.dataset.infraPc === activePc.id);
    });
    const rackArt = stageEl.querySelector('#infraRackSvgWrap');
    if (rackArt) rackArt.innerHTML = buildServerArtworkSvg('rack', { activeBladeId: activeBlade.id });
    const screenArt = stageEl.querySelector('#infraScreenSvgWrap');
    if (screenArt) screenArt.innerHTML = buildServerArtworkSvg('screen', { flowLit: activeFlow.litNodes });
    const flowLabel = stageEl.querySelector('#infraScreenFlowTag');
    if (flowLabel) flowLabel.textContent = activeFlow.label;
    const pcTag = stageEl.querySelector('#infraDeskPcTag');
    if (pcTag) pcTag.textContent = activePc.label;
  }

  function renderInfraOs({ forceSceneRebuild = false } = {}) {
    if (!laptopDock || !laptopBody) return;
    const lang = getLang();
    const langData = INFRA_ROOM_DATA[lang] || INFRA_ROOM_DATA.id;
    const stationMeta = langData.stations[infraStationId] || langData.stations.overview;
    const activeBlade = langData.blades.find((b) => b.id === infraBladeId) || langData.blades[0];
    const activePc = langData.computers.find((c) => c.id === infraComputerId) || langData.computers[0];
    const activeFlow = langData.flows.find((f) => f.id === infraFlowId) || langData.flows[0];
    infraBladeId = activeBlade.id;
    infraComputerId = activePc.id;
    infraFlowId = activeFlow.id;

    laptopDock.innerHTML = `
      <div class="infra-dock-row">
        <div class="infra-dock-tabs">
          ${INFRA_TOUR_ORDER.map(
            (stId) => `
            <button
              type="button"
              class="laptop-app-tab${infraStationId === stId ? ' is-active' : ''}"
              role="tab"
              aria-selected="${infraStationId === stId}"
              data-tour-goto="${stId}"
            >
              <span>${langData.stations[stId].tab}</span>
            </button>
          `
          ).join('')}
        </div>
        <div class="infra-dock-nav">
          <button type="button" class="laptop-screen-tab" data-tour-step="prev" aria-label="${t('infraTourPrev')}" title="${t('infraTourPrev')}">←</button>
          <button type="button" class="laptop-screen-tab is-active" data-tour-step="next" aria-label="${t('infraTourNext')}" title="${t('infraTourNext')}">→</button>
        </div>
      </div>
    `;

    const labels =
      lang === 'en'
        ? {
            rack: 'Server Rack',
            screen: 'Infrastructure Wall Screen',
            network: 'VLAN Switch',
            computers: '4 Workstation Computers',
            overviewMetrics: [
              { k: 'NOC Screen', v: '3-Tier Topology Live' },
              { k: 'Workstations', v: '4 Active PC Monitors' },
              { k: 'Rack & Network', v: 'U01–U04 · 3 VLANs' },
            ],
            screenMetrics: [
              { k: 'Active Flow', v: activeFlow.label },
              { k: 'Gateway Tier', v: 'Docker · RESTful API' },
              { k: 'Persistence', v: 'PostgreSQL · MySQL · SQLite' },
            ],
          }
        : {
            rack: 'Rak Server',
            screen: 'Layar Rancangan Infrastruktur',
            network: 'Switch VLAN',
            computers: 'Deretan 4 Komputer Workstation',
            overviewMetrics: [
              { k: 'Layar NOC', v: '3-Tier Topology Live' },
              { k: 'Workstation', v: '4 PC Monitor Aktif' },
              { k: 'Rak & Jaringan', v: 'U01–U04 · 3 VLAN' },
            ],
            screenMetrics: [
              { k: 'Skenario Aktif', v: activeFlow.label },
              { k: 'Lapisan Gateway', v: 'Docker · RESTful API' },
              { k: 'Persistensi', v: 'PostgreSQL · MySQL · SQLite' },
            ],
          };

    let stationHeadline = stationMeta.title;
    let stationSub = stationMeta.sub;
    let inspectorControls = '';
    let inspectorMetrics = activeBlade.metrics;
    let closeupSvgKind = 'screen';

    if (infraStationId === 'overview') {
      inspectorControls = '';
      inspectorMetrics = labels.overviewMetrics;
      closeupSvgKind = 'screen';
    } else if (infraStationId === 'screen') {
      closeupSvgKind = 'screen';
      inspectorControls = `
        <div class="server-tour-chips">
          ${langData.flows
            .map(
              (fl) =>
                `<button type="button" class="laptop-screen-tab${fl.id === activeFlow.id ? ' is-active' : ''}" data-infra-flow="${fl.id}">${fl.label}</button>`
            )
            .join('')}
        </div>
      `;
      inspectorMetrics = labels.screenMetrics;
    } else if (infraStationId === 'computers') {
      closeupSvgKind = 'pc';
      stationHeadline = activePc.title;
      stationSub = activePc.sub;
      inspectorControls = `
        <div class="server-tour-chips">
          ${langData.computers
            .map(
              (pc) =>
                `<button type="button" class="laptop-screen-tab${pc.id === activePc.id ? ' is-active' : ''}" data-infra-pc="${pc.id}">${pc.label}</button>`
            )
            .join('')}
        </div>
      `;
      inspectorMetrics = activePc.metrics;
    } else if (infraStationId === 'rack') {
      closeupSvgKind = 'rack';
      stationHeadline = `${activeBlade.unit} · ${activeBlade.host}`;
      stationSub = activeBlade.sub;
      inspectorControls = `
        <div class="server-tour-chips">
          ${langData.blades
            .map(
              (b) =>
                `<button type="button" class="laptop-screen-tab${b.id === activeBlade.id ? ' is-active' : ''}" data-infra-blade="${b.id}">${b.unit} · ${b.badge}</button>`
            )
            .join('')}
        </div>
      `;
      inspectorMetrics = activeBlade.metrics;
    } else if (infraStationId === 'network') {
      closeupSvgKind = 'network';
      inspectorControls = `
        <div class="server-tour-chips">
          ${langData.vlans.map((v) => `<span class="laptop-impact-chip">${v}</span>`).join('')}
        </div>
      `;
      inspectorMetrics = langData.networkMetrics;
    }

    const closeupArtworkHtml = buildServerArtworkSvg(closeupSvgKind, {
      activeBladeId: activeBlade.id,
      activePcId: activePc.id,
      flowLit: activeFlow.litNodes,
      large: true,
    });

    const inspectorHtml = `
      <div class="server-closeup-panel">
        <div class="server-closeup-art">${closeupArtworkHtml}</div>
        <div class="server-closeup-meta">
          <div class="server-tour-subbar">
            <div>
              <p class="laptop-screen-title">${stationHeadline}</p>
              <p class="laptop-screen-sub">${stationSub}</p>
            </div>
            ${inspectorControls}
          </div>
          <div class="laptop-kpi-grid">
            ${inspectorMetrics
              .map(
                (m) => `
              <div class="laptop-kpi-card">
                <span class="laptop-kpi-label">${m.k}</span>
                <span class="laptop-kpi-val tabular-nums">${m.v}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>
    `;

    const footerHtml = `
      <div class="laptop-impact-row">
        ${
          infraPingStatus
            ? `<span class="infra-ping-status" id="infraPingReadout">${infraPingStatus}</span>`
            : `<span class="laptop-impact-chip">PostgreSQL · MySQL · SQLite</span><span class="laptop-impact-chip">Docker · RESTful API · Go</span>`
        }
      </div>
      <div class="laptop-footer-actions">
        <button type="button" class="laptop-exit-btn" id="infraPingBtn" data-infra-ping="true">
          ${t('infraPingBtn')}
        </button>
        <button type="button" class="btn-primary" id="infraJumpExpBtn" data-infra-jump="#experience">
          ${t('infraJumpExpBtn')}
        </button>
      </div>
    `;

    const existingStage = !forceSceneRebuild ? laptopBody.querySelector('.server-tour-stage') : null;
    if (existingStage) {
      syncInfraSceneStates(existingStage, langData, activeBlade, activePc, activeFlow);
      const inspectorEl = laptopBody.querySelector('.server-tour-inspector');
      const footerEl = laptopBody.querySelector('.laptop-os-footer');
      if (inspectorEl) inspectorEl.innerHTML = inspectorHtml;
      if (footerEl) footerEl.innerHTML = footerHtml;
      return;
    }

    laptopBody.innerHTML = `
      <div class="server-tour-stage" data-tour-station="${infraStationId}">
        <img class="server-room-bg" src="assets/server_room_bg.jpg" alt="" aria-hidden="true" />
        <div class="server-room-vignette" aria-hidden="true"></div>
        <div class="server-room-canvas">
          <div class="server-room-backwall">
            <button type="button" class="server-zone-box server-zone-rack${infraStationId === 'rack' ? ' is-focus' : ''}" data-tour-goto="rack">
              <div class="server-zone-head">
                <span class="server-zone-pin"><span class="server-pin-num">3</span> ${labels.rack}</span>
              </div>
              <div class="server-zone-svg-wrap" id="infraRackSvgWrap">${buildServerArtworkSvg('rack', { activeBladeId: activeBlade.id })}</div>
            </button>

            <button type="button" class="server-zone-box server-zone-screen${infraStationId === 'screen' ? ' is-focus' : ''}" data-tour-goto="screen">
              <div class="server-zone-head">
                <span class="server-zone-pin"><span class="server-pin-num">1</span> ${labels.screen}</span>
                <span class="server-zone-temp" id="infraScreenFlowTag">${activeFlow.label}</span>
              </div>
              <div class="server-zone-svg-wrap" id="infraScreenSvgWrap">${buildServerArtworkSvg('screen', { flowLit: activeFlow.litNodes })}</div>
            </button>

            <button type="button" class="server-zone-box server-zone-switch${infraStationId === 'network' ? ' is-focus' : ''}" data-tour-goto="network">
              <div class="server-zone-head">
                <span class="server-zone-pin"><span class="server-pin-num">4</span> ${labels.network}</span>
              </div>
              <div class="server-zone-svg-wrap">${buildServerArtworkSvg('network')}</div>
            </button>
          </div>

          <div class="server-desk-console">
            <div class="server-zone-head">
              <button type="button" class="server-zone-pin" data-tour-goto="computers"><span class="server-pin-num">2</span> ${labels.computers}</button>
              <span class="server-zone-temp" id="infraDeskPcTag">${activePc.label}</span>
            </div>
            <div class="server-pc-row">
              ${langData.computers
                .map(
                  (pc) => `
                <button type="button" class="server-pc-unit${pc.id === activePc.id ? ' is-selected' : ''}" data-infra-pc="${pc.id}" aria-label="${pc.label}">
                  <span class="server-pc-svg-wrap">${buildServerArtworkSvg('pc', { activePcId: pc.id })}</span>
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>
      <div class="server-tour-inspector">${inspectorHtml}</div>
      <div class="laptop-os-footer">${footerHtml}</div>
    `;
  }

  function renderAwardsOs({ forceSceneRebuild = false } = {}) {
    if (!laptopDock || !laptopBody) return;
    const lang = getLang();
    const items = AWARDS_HALL_ITEMS[lang] || AWARDS_HALL_ITEMS.id;
    const activeItem = items.find((item) => item.id === activeAwardId) || items[0];
    activeAwardId = activeItem.id;

    const leftWallItems = items.filter((i) => i.wall === 'left');
    const rightWallItems = items.filter((i) => i.wall === 'right');

    const wallTags =
      lang === 'en'
        ? { left: 'Left Wall · Certificates', right: 'Right Wall · Trophy Plaques' }
        : { left: 'Dinding Kiri · Piagam', right: 'Dinding Kanan · Plakat' };

    laptopDock.innerHTML = `
      <div class="infra-dock-row">
        <div class="infra-dock-tabs">
          <button type="button" class="laptop-app-tab${awardsViewMode === 'full' ? ' is-active' : ''}" role="tab" aria-selected="${awardsViewMode === 'full'}" data-hall-view="full">
            <span>${t('awardsHallFull')}</span>
          </button>
          <button type="button" class="laptop-app-tab${awardsViewMode === 'left' ? ' is-active' : ''}" role="tab" aria-selected="${awardsViewMode === 'left'}" data-hall-view="left">
            <span>${t('awardsLeftWall')}</span>
          </button>
          <button type="button" class="laptop-app-tab${awardsViewMode === 'right' ? ' is-active' : ''}" role="tab" aria-selected="${awardsViewMode === 'right'}" data-hall-view="right">
            <span>${t('awardsRightWall')}</span>
          </button>
        </div>
        <div class="infra-dock-nav">
          <button type="button" class="laptop-screen-tab" data-award-step="prev" aria-label="${t('awardsStepPrev')}" title="${t('awardsStepPrev')}">←</button>
          <button type="button" class="laptop-screen-tab is-active" data-award-step="next" aria-label="${t('awardsStepNext')}" title="${t('awardsStepNext')}">→</button>
        </div>
      </div>
    `;

    const renderWallCard = (item) => `
      <button
        type="button"
        class="hall-plaque-frame${item.id === activeItem.id ? ' is-selected' : ''}"
        data-depth="${item.depth}"
        data-award-id="${item.id}"
        aria-label="${item.title}"
      >
        <span class="hall-plaque-svg-wrap">${buildPlaqueArtworkSvg(item)}</span>
        <span class="hall-plaque-caption">${item.shortLabel}</span>
      </button>
    `;

    const closeupHtml = `
      <div class="awards-closeup-art">${buildPlaqueArtworkSvg(activeItem, { large: true })}</div>
      <div class="awards-closeup-meta">
        <div class="awards-closeup-badges">
          <span class="awards-gold-badge">${activeItem.ribbonText}</span>
          <span class="laptop-impact-chip">${activeItem.year}</span>
        </div>
        <p class="laptop-screen-title">${activeItem.title}</p>
        <p class="laptop-screen-sub">${activeItem.issuer}</p>
        <p class="awards-closeup-desc">${activeItem.detail}</p>
      </div>
    `;

    const footerHtml = `
      <div class="laptop-impact-row">
        <span class="laptop-impact-chip">${lang === 'en' ? '3 Certificates · 3 Plaques Mounted' : '3 Piagam · 3 Plakat Terpasang'}</span>
      </div>
      <div class="laptop-footer-actions">
        <button type="button" class="laptop-exit-btn" data-award-step="next">
          ${t('awardsStepNext')}
        </button>
        <button type="button" class="btn-primary" id="awardsJumpBtn" data-awards-jump="#experience">
          ${t('awardsJumpBtn')}
        </button>
      </div>
    `;

    const existingStage = !forceSceneRebuild ? laptopBody.querySelector('.awards-hall-stage') : null;
    if (existingStage) {
      existingStage.dataset.hallView = awardsViewMode;
      existingStage.querySelectorAll('[data-award-id]').forEach((el) => {
        el.classList.toggle('is-selected', el.dataset.awardId === activeItem.id);
      });
      const closeupEl = laptopBody.querySelector('.awards-closeup-panel');
      const footerEl = laptopBody.querySelector('.laptop-os-footer');
      if (closeupEl) closeupEl.innerHTML = closeupHtml;
      if (footerEl) footerEl.innerHTML = footerHtml;
      return;
    }

    laptopBody.innerHTML = `
      <div class="awards-hall-stage" data-hall-view="${awardsViewMode}">
        <div class="awards-hall-corridor">
          <img class="awards-hall-bg" src="assets/hallway_awards_bg.jpg" alt="" aria-hidden="true" />
          <div class="awards-hall-vignette" aria-hidden="true"></div>
          <span class="hall-wall-tag is-left">${wallTags.left}</span>
          <span class="hall-wall-tag is-right">${wallTags.right}</span>
          <div class="awards-hall-walls">
            <div class="awards-wall-left">${leftWallItems.map(renderWallCard).join('')}</div>
            <div class="awards-wall-center-spacer" aria-hidden="true"></div>
            <div class="awards-wall-right">${[...rightWallItems].reverse().map(renderWallCard).join('')}</div>
          </div>
        </div>
      </div>
      <div class="awards-closeup-panel">${closeupHtml}</div>
      <div class="laptop-os-footer">${footerHtml}</div>
    `;
  }

  function renderLaptopOs() {
    if (!laptopDock || !laptopBody) return;
    const projects = getPortfolioData().projects;
    const activeProj = projects.find((p) => p.id === laptopProjectId) || projects[0];
    laptopProjectId = activeProj.id;
    const mockup = activeProj.uiMockup;
    const isSecondary = laptopScreenTab === 'data';

    laptopDock.innerHTML = projects
      .map(
        (proj) => `
      <button
        type="button"
        class="laptop-app-tab${proj.id === laptopProjectId ? ' is-active' : ''}"
        role="tab"
        aria-selected="${proj.id === laptopProjectId}"
        data-laptop-project="${proj.id}"
      >
        ${getLaptopIcon(proj.uiMockup?.device)}
        <span>${proj.shortTitle}</span>
      </button>
    `
      )
      .join('');

    laptopBody.innerHTML = `
      <div class="laptop-screen-head">
        <div>
          <p class="laptop-screen-title">${activeProj.title}</p>
          <p class="laptop-screen-sub">${activeProj.org} · ${activeProj.period} · ${activeProj.stackText}</p>
        </div>
        <div class="laptop-screen-tabs" role="tablist">
          <button type="button" class="laptop-screen-tab${!isSecondary ? ' is-active' : ''}" role="tab" aria-selected="${!isSecondary}" data-laptop-screen="utama">
            ${t('laptopScreenMain')}
          </button>
          <button type="button" class="laptop-screen-tab${isSecondary ? ' is-active' : ''}" role="tab" aria-selected="${isSecondary}" data-laptop-screen="data">
            ${t('laptopScreenData')}
          </button>
        </div>
      </div>
      ${
        !isSecondary && mockup
          ? `
        <div class="laptop-kpi-grid">
          ${mockup.primaryStats
            .map(
              (st) => `
            <div class="laptop-kpi-card">
              <span class="laptop-kpi-label">${st.k}</span>
              <span class="laptop-kpi-val tabular-nums">${st.v}</span>
            </div>
          `
            )
            .join('')}
        </div>
      `
          : `
        <ul class="laptop-data-list">
          ${(mockup?.secondaryRows || [])
            .map(
              (row) =>
                `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#18d2b6" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg><span>${row}</span></li>`
            )
            .join('')}
        </ul>
      `
      }
      <div class="laptop-os-footer">
        <div class="laptop-impact-row">
          ${(activeProj.impactMetrics || [])
            .map((m) => `<span class="laptop-impact-chip">${m.value}</span>`)
            .join('')}
        </div>
        <div class="laptop-footer-actions">
          <button type="button" class="btn-primary" id="laptopJumpProjectBtn" data-laptop-jump="true">
            ${t('laptopOpenSimBtn')}
          </button>
        </div>
      </div>
    `;
  }

  function openLaptopView(projectId) {
    window.clearTimeout(laptopCloseTimer);
    if (projectId) {
      laptopProjectId = projectId;
    }
    stageOverlayMode = 'laptop';
    stage.dataset.zoomMode = 'laptop';
    laptopOpen = true;
    syncStageChrome('laptop');
    updateHud('laptop-projects');
    if (bgLayer) bgLayer.style.transform = '';
    if (charCanvas) charCanvas.style.transform = '';
    if (laptopOs) {
      laptopOs.hidden = false;
      renderLaptopOs();
      void stage.offsetWidth;
    }
    stage.classList.add('is-laptop-open');
    soundEngine.playChime();
    onActionToast?.(t('laptopOpenedToast'));
  }

  function openInfraView() {
    window.clearTimeout(laptopCloseTimer);
    stageOverlayMode = 'infra';
    stage.dataset.zoomMode = 'infra';
    infraStationId = 'overview';
    infraPingStatus = '';
    laptopOpen = true;
    syncStageChrome('infra');
    updateHud('infra-lp3i');
    if (bgLayer) bgLayer.style.transform = '';
    if (charCanvas) charCanvas.style.transform = '';
    if (laptopOs) {
      laptopOs.hidden = false;
      renderInfraOs({ forceSceneRebuild: true });
      void stage.offsetWidth;
    }
    stage.classList.add('is-laptop-open');
    soundEngine.playChime();
    onActionToast?.(t('infraOpenedToast'));
  }

  function openAwardsView() {
    window.clearTimeout(laptopCloseTimer);
    stageOverlayMode = 'awards';
    stage.dataset.zoomMode = 'awards';
    awardsViewMode = 'full';
    activeAwardId = 'award-ptk-2017';
    laptopOpen = true;
    syncStageChrome('awards');
    updateHud('shelf-awards');
    if (bgLayer) bgLayer.style.transform = '';
    if (charCanvas) charCanvas.style.transform = '';
    if (laptopOs) {
      laptopOs.hidden = false;
      renderAwardsOs({ forceSceneRebuild: true });
      void stage.offsetWidth;
    }
    stage.classList.add('is-laptop-open');
    soundEngine.playChime();
    onActionToast?.(t('awardsOpenedToast'));
  }

  function closeLaptopView() {
    if (!laptopOpen) return;
    const prevMode = stageOverlayMode;
    laptopOpen = false;
    stageOverlayMode = null;
    stage.classList.remove('is-laptop-open');
    window.clearTimeout(laptopCloseTimer);
    if (laptopOs) {
      laptopCloseTimer = window.setTimeout(
        () => {
          if (!laptopOpen) {
            laptopOs.hidden = true;
            stage.dataset.zoomMode = '';
            syncStageChrome('laptop');
          }
        },
        prefersReducedMotion ? 0 : 320
      );
    }
    soundEngine.playClick();
    const closeToastKey =
      prevMode === 'infra' ? 'infraClosedToast' : prevMode === 'awards' ? 'awardsClosedToast' : 'laptopClosedToast';
    onActionToast?.(t(closeToastKey));
  }

  function selectHotspot(hotspotId, { announce = true } = {}) {
    const hotspots = getPortfolioData().workspaceHotspots;
    const hotspot = hotspots.find((item) => item.id === hotspotId);
    if (!hotspot) return;

    updateHud(hotspot.id);
    if (hotspot.actionType === 'toggle-lamp') {
      toggleLamp();
      return;
    }

    if (hotspot.id === 'laptop-projects' || hotspot.actionType === 'laptop-zoom') {
      openLaptopView();
      return;
    }

    if (hotspot.id === 'infra-lp3i' || hotspot.actionType === 'infra-zoom') {
      openInfraView();
      return;
    }

    if (hotspot.id === 'shelf-awards' || hotspot.actionType === 'awards-zoom') {
      openAwardsView();
      return;
    }

    soundEngine.playChime();
    if (announce) {
      showSpeech(hotspot.speech);
    }
  }

  hotspotsWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-hotspot-id]');
    if (!btn) return;
    selectHotspot(btn.dataset.hotspotId);
  });

  laptopExitBtn?.addEventListener('click', closeLaptopView);

  laptopDock?.addEventListener('click', (event) => {
    const hallViewBtn = event.target.closest('[data-hall-view]');
    if (hallViewBtn) {
      soundEngine.playClick();
      awardsViewMode = hallViewBtn.dataset.hallView;
      renderAwardsOs();
      return;
    }
    const awardStepBtn = event.target.closest('[data-award-step]');
    if (awardStepBtn) {
      soundEngine.playClick();
      const items = AWARDS_HALL_ITEMS[getLang()] || AWARDS_HALL_ITEMS.id;
      const idx = items.findIndex((i) => i.id === activeAwardId);
      const delta = awardStepBtn.dataset.awardStep === 'prev' ? -1 : 1;
      const nextItem = items[(idx + delta + items.length) % items.length];
      activeAwardId = nextItem.id;
      awardsViewMode = nextItem.wall;
      renderAwardsOs();
      return;
    }
    const gotoBtn = event.target.closest('[data-tour-goto]');
    if (gotoBtn) {
      soundEngine.playClick();
      infraStationId = gotoBtn.dataset.tourGoto;
      renderInfraOs();
      return;
    }
    const stepBtn = event.target.closest('[data-tour-step]');
    if (stepBtn) {
      soundEngine.playClick();
      const idx = INFRA_TOUR_ORDER.indexOf(infraStationId);
      const delta = stepBtn.dataset.tourStep === 'prev' ? -1 : 1;
      const nextIdx = (idx + delta + INFRA_TOUR_ORDER.length) % INFRA_TOUR_ORDER.length;
      infraStationId = INFRA_TOUR_ORDER[nextIdx];
      renderInfraOs();
      return;
    }
    const tab = event.target.closest('[data-laptop-project]');
    if (!tab) return;
    soundEngine.playClick();
    laptopProjectId = tab.dataset.laptopProject;
    laptopScreenTab = 'utama';
    renderLaptopOs();
  });

  laptopBody?.addEventListener('click', (event) => {
    const plaqueBtn = event.target.closest('[data-award-id]');
    if (plaqueBtn) {
      soundEngine.playClick();
      activeAwardId = plaqueBtn.dataset.awardId;
      const items = AWARDS_HALL_ITEMS[getLang()] || AWARDS_HALL_ITEMS.id;
      const chosen = items.find((i) => i.id === activeAwardId);
      if (chosen) awardsViewMode = chosen.wall;
      renderAwardsOs();
      return;
    }
    const bodyAwardStep = event.target.closest('[data-award-step]');
    if (bodyAwardStep) {
      soundEngine.playClick();
      const items = AWARDS_HALL_ITEMS[getLang()] || AWARDS_HALL_ITEMS.id;
      const idx = items.findIndex((i) => i.id === activeAwardId);
      const nextItem = items[(idx + 1) % items.length];
      activeAwardId = nextItem.id;
      awardsViewMode = nextItem.wall;
      renderAwardsOs();
      return;
    }
    const awardsJumpBtn = event.target.closest('[data-awards-jump]');
    if (awardsJumpBtn) {
      soundEngine.playClick();
      const targetSection = awardsJumpBtn.dataset.awardsJump || '#experience';
      closeLaptopView();
      onRequestSection?.(targetSection);
      return;
    }
    const pcBtn = event.target.closest('[data-infra-pc]');
    if (pcBtn) {
      soundEngine.playClick();
      infraComputerId = pcBtn.dataset.infraPc;
      infraStationId = 'computers';
      renderInfraOs();
      return;
    }
    const flowBtn = event.target.closest('[data-infra-flow]');
    if (flowBtn) {
      soundEngine.playClick();
      infraFlowId = flowBtn.dataset.infraFlow;
      infraStationId = 'screen';
      renderInfraOs();
      return;
    }
    const gotoZone = event.target.closest('[data-tour-goto]');
    if (gotoZone) {
      soundEngine.playClick();
      infraStationId = gotoZone.dataset.tourGoto;
      renderInfraOs();
      return;
    }
    const bladeCard = event.target.closest('[data-infra-blade]');
    if (bladeCard) {
      soundEngine.playClick();
      infraBladeId = bladeCard.dataset.infraBlade;
      infraStationId = 'rack';
      infraPingStatus = '';
      renderInfraOs();
      return;
    }
    if (event.target.closest('[data-infra-ping]')) {
      const langData = INFRA_ROOM_DATA[getLang()] || INFRA_ROOM_DATA.id;
      const activeBlade = langData.blades.find((b) => b.id === infraBladeId) || langData.blades[0];
      soundEngine.playChime();
      infraPingStatus = `PING ${activeBlade.host}: ${activeBlade.pingResult}`;
      renderInfraOs();
      return;
    }
    const infraJumpBtn = event.target.closest('[data-infra-jump]');
    if (infraJumpBtn) {
      soundEngine.playClick();
      const targetSection = infraJumpBtn.dataset.infraJump || '#experience';
      closeLaptopView();
      onRequestSection?.(targetSection);
      return;
    }
    const screenTab = event.target.closest('[data-laptop-screen]');
    if (screenTab) {
      soundEngine.playClick();
      laptopScreenTab = screenTab.dataset.laptopScreen;
      renderLaptopOs();
      return;
    }
    if (event.target.closest('[data-laptop-jump]')) {
      soundEngine.playClick();
      const targetProj = laptopProjectId;
      closeLaptopView();
      onRequestSection?.('#projects', targetProj);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && laptopOpen) {
      closeLaptopView();
    }
  });

  if (hudActionBtn) {
    hudActionBtn.addEventListener('click', () => {
      soundEngine.playClick();
      if (activeHotspotId === 'laptop-projects' && !laptopOpen) {
        openLaptopView();
        return;
      }
      if (activeHotspotId === 'infra-lp3i' && !laptopOpen) {
        openInfraView();
        return;
      }
      if (activeHotspotId === 'shelf-awards' && !laptopOpen) {
        openAwardsView();
        return;
      }
      const target = hudActionBtn.dataset.target || '#ai-studio';
      onRequestSection?.(target);
    });
  }

  if (lampSwitchBtn) {
    lampSwitchBtn.addEventListener('click', () => {
      toggleLamp();
      updateHud('lamp');
    });
  }

  if (greetBtn) {
    greetBtn.addEventListener('click', triggerGreeting);
  }

  if (charCanvas) {
    charCanvas.addEventListener('click', triggerGreeting);
    charCanvas.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        triggerGreeting();
      }
    });
  }

  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    targetPointer = {
      x: Math.max(-0.5, Math.min(0.5, nx)),
      y: Math.max(-0.5, Math.min(0.5, ny)),
    };
    pointerCanvas = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  });

  stage.addEventListener('pointerleave', () => {
    targetPointer = { x: 0, y: 0 };
    pointerCanvas = { x: -999, y: -999 };
  });

  function getBlinkAmount(timeMs) {
    if (prefersReducedMotion) return 0;

    if (blinkStart < 0 && timeMs >= nextBlinkAt) {
      blinkStart = timeMs;
    }

    if (blinkStart < 0) return 0;

    const elapsed = timeMs - blinkStart;
    const duration = 150;
    if (elapsed >= duration) {
      blinkStart = -1;
      if (!pendingDoubleBlink && Math.random() < 0.25) {
        pendingDoubleBlink = true;
        nextBlinkAt = timeMs + 130;
      } else {
        pendingDoubleBlink = false;
        nextBlinkAt = timeMs + 2800 + Math.random() * 2400;
      }
      return 0;
    }

    const phase = elapsed / duration;
    return phase <= 0.5 ? phase * 2 : (1 - phase) * 2;
  }

  function drawCharacter(timeMs) {
    if (!ctxChar || !charImgReady || !charWidth || !charHeight) return;

    const cw = charWidth;
    const ch = charHeight;
    const mode = getTimeMode();

    ctxChar.clearRect(0, 0, cw, ch);
    ctxChar.globalCompositeOperation = 'source-over';
    ctxChar.drawImage(charSourceImg, 0, 0, cw, ch);

    const isSmiling = smileUntil > timeMs;
    const blinkAmt = isSmiling ? 0 : getBlinkAmount(timeMs);

    if (isSmiling) {
      [CHAR_RIG.leftEye, CHAR_RIG.rightEye].forEach((eye) => {
        const cx = eye.cx * cw;
        const cy = eye.cy * ch;
        const rx = eye.rx * cw;
        const ry = eye.ry * ch;

        ctxChar.fillStyle = CHAR_RIG.skinTone;
        ctxChar.fillRect(cx - rx, cy - ry, rx * 2, ry * 2.15);

        ctxChar.strokeStyle = CHAR_RIG.lashColor;
        ctxChar.lineWidth = Math.max(1.4, cw * 0.007);
        ctxChar.lineCap = 'round';
        ctxChar.beginPath();
        ctxChar.arc(cx, cy + ry * 0.45, rx * 0.8, Math.PI * 1.15, Math.PI * 1.85);
        ctxChar.stroke();
      });
    } else if (blinkAmt > 0.05) {
      [CHAR_RIG.leftEye, CHAR_RIG.rightEye].forEach((eye) => {
        const cx = eye.cx * cw;
        const cy = eye.cy * ch;
        const rx = eye.rx * cw;
        const ry = eye.ry * ch;
        const coverH = ry * 2.1 * blinkAmt;

        ctxChar.fillStyle = CHAR_RIG.skinTone;
        ctxChar.fillRect(cx - rx, cy - ry, rx * 2, coverH);

        if (blinkAmt > 0.55) {
          ctxChar.strokeStyle = CHAR_RIG.lashColor;
          ctxChar.lineWidth = Math.max(1.3, cw * 0.0065);
          ctxChar.lineCap = 'round';
          ctxChar.beginPath();
          ctxChar.moveTo(cx - rx * 0.8, cy + ry * 0.15);
          ctxChar.quadraticCurveTo(cx, cy + ry * 0.55, cx + rx * 0.8, cy + ry * 0.15);
          ctxChar.stroke();
        }
      });
    }

    const isTalking = !prefersReducedMotion && (aiBusy || talkingUntil > timeMs);
    if (isTalking) {
      const mx = CHAR_RIG.mouth.cx * cw;
      const my = CHAR_RIG.mouth.cy * ch;
      const mw = CHAR_RIG.mouth.w * cw;
      const openRatio = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(timeMs * 0.026));
      const mh = Math.max(1.2, mw * 0.48 * openRatio);

      ctxChar.fillStyle = CHAR_RIG.skinTone;
      ctxChar.fillRect(mx - mw * 0.65, my - 2, mw * 1.3, mh + 4);

      ctxChar.fillStyle = CHAR_RIG.mouthInterior;
      ctxChar.beginPath();
      ctxChar.ellipse(mx, my + mh * 0.25, mw * 0.48, mh, 0, 0, Math.PI * 2);
      ctxChar.fill();

      ctxChar.strokeStyle = CHAR_RIG.lashColor;
      ctxChar.lineWidth = Math.max(1, cw * 0.0045);
      ctxChar.beginPath();
      ctxChar.moveTo(mx - mw * 0.48, my);
      ctxChar.quadraticCurveTo(mx, my + 0.8, mx + mw * 0.48, my);
      ctxChar.stroke();
    }

    ctxChar.globalCompositeOperation = 'source-atop';

    if (mode === 'malam') {
      ctxChar.fillStyle = 'rgba(7, 20, 34, 0.26)';
      ctxChar.fillRect(0, 0, cw, ch);

      if (lampOn) {
        const leftRim = ctxChar.createLinearGradient(0, ch * 0.1, cw * 0.55, ch * 0.35);
        leftRim.addColorStop(0, 'rgba(255, 198, 108, 0.36)');
        leftRim.addColorStop(1, 'rgba(255, 198, 108, 0)');
        ctxChar.fillStyle = leftRim;
        ctxChar.fillRect(0, 0, cw, ch);
      }

      const rightRim = ctxChar.createLinearGradient(cw, ch * 0.25, cw * 0.45, ch * 0.45);
      rightRim.addColorStop(0, `rgba(24, 210, 182, ${aiBusy ? 0.34 : 0.22})`);
      rightRim.addColorStop(1, 'rgba(24, 210, 182, 0)');
      ctxChar.fillStyle = rightRim;
      ctxChar.fillRect(0, 0, cw, ch);
    } else if (mode === 'senja') {
      ctxChar.fillStyle = 'rgba(46, 20, 32, 0.13)';
      ctxChar.fillRect(0, 0, cw, ch);

      const duskRim = ctxChar.createLinearGradient(0, 0, cw * 0.65, ch * 0.4);
      duskRim.addColorStop(0, `rgba(255, 152, 86, ${lampOn ? 0.28 : 0.16})`);
      duskRim.addColorStop(1, 'rgba(255, 152, 86, 0)');
      ctxChar.fillStyle = duskRim;
      ctxChar.fillRect(0, 0, cw, ch);
    } else {
      const dayRim = ctxChar.createLinearGradient(0, 0, cw * 0.5, ch * 0.3);
      dayRim.addColorStop(0, 'rgba(255, 252, 232, 0.08)');
      dayRim.addColorStop(1, 'rgba(255, 252, 232, 0)');
      ctxChar.fillStyle = dayRim;
      ctxChar.fillRect(0, 0, cw, ch);
    }

    ctxChar.globalCompositeOperation = 'source-over';
  }

  function drawWindowPanes(t, w, h, mode) {
    const panes = [
      { x: w * 0.364, y: h * 0.214, w: w * 0.13, h: h * 0.324 },
      { x: w * 0.506, y: h * 0.214, w: w * 0.128, h: h * 0.324 },
    ];

    ctx.save();
    ctx.beginPath();
    panes.forEach((p) => ctx.rect(p.x, p.y, p.w, p.h));
    ctx.clip();

    const winY = h * 0.214;
    const winH = h * 0.324;

    if (mode === 'malam') {
      const skyGrad = ctx.createLinearGradient(0, winY, 0, winY + winH);
      skyGrad.addColorStop(0, 'rgba(6, 17, 32, 0.90)');
      skyGrad.addColorStop(1, 'rgba(14, 42, 64, 0.72)');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(w * 0.36, winY, w * 0.28, winH);

      const moonX = w * 0.592;
      const moonY = h * 0.268;
      const moonR = Math.max(7, w * 0.012);
      ctx.fillStyle = 'rgba(235, 248, 255, 0.88)';
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(9, 25, 44, 0.95)';
      ctx.beginPath();
      ctx.arc(moonX + moonR * 0.42, moonY - moonR * 0.2, moonR * 0.86, 0, Math.PI * 2);
      ctx.fill();

      stars.forEach((star) => {
        const alpha = 0.38 + 0.56 * (0.5 + 0.5 * Math.sin(t * 1.6 + star.phase));
        ctx.fillStyle = `rgba(220, 245, 255, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        const cycle = t % 9;
        if (cycle < 1.1) {
          const prog = cycle / 1.1;
          const sx = w * (0.39 + prog * 0.17);
          const sy = h * (0.24 + prog * 0.11);
          const tailGrad = ctx.createLinearGradient(sx, sy, sx - w * 0.045, sy - h * 0.03);
          tailGrad.addColorStop(0, 'rgba(210, 255, 248, 0.85)');
          tailGrad.addColorStop(1, 'rgba(210, 255, 248, 0)');
          ctx.strokeStyle = tailGrad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx - w * 0.045, sy - h * 0.03);
          ctx.stroke();
        }
      }
    } else if (mode === 'senja') {
      const duskGrad = ctx.createLinearGradient(0, winY, 0, winY + winH);
      duskGrad.addColorStop(0, 'rgba(42, 31, 66, 0.55)');
      duskGrad.addColorStop(0.58, 'rgba(232, 114, 58, 0.45)');
      duskGrad.addColorStop(1, 'rgba(255, 198, 108, 0.34)');
      ctx.fillStyle = duskGrad;
      ctx.fillRect(w * 0.36, winY, w * 0.28, winH);

      clouds.forEach((cloud) => {
        const shift = prefersReducedMotion ? 0 : (t * cloud.speed) % 0.28;
        const cx = w * (0.34 + ((cloud.baseX - 0.34 + shift) % 0.28));
        ctx.fillStyle = 'rgba(255, 212, 168, 0.32)';
        ctx.beginPath();
        ctx.ellipse(cx, h * cloud.y, w * cloud.w * 0.5, h * cloud.h, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      const sunGrad = ctx.createLinearGradient(w * 0.36, winY, w * 0.64, winY + winH);
      sunGrad.addColorStop(0, 'rgba(255, 252, 230, 0.22)');
      sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(w * 0.36, winY, w * 0.28, winH);

      clouds.forEach((cloud) => {
        const shift = prefersReducedMotion ? 0 : (t * cloud.speed) % 0.28;
        const cx = w * (0.34 + ((cloud.baseX - 0.34 + shift) % 0.28));
        ctx.fillStyle = 'rgba(255, 255, 255, 0.36)';
        ctx.beginPath();
        ctx.ellipse(cx, h * cloud.y, w * cloud.w * 0.5, h * cloud.h, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    ctx.restore();
  }

  function drawLaptopScreen(t, w, h, mode) {
    const sx = w * 0.674;
    const sy = h * 0.522;
    const sw = w * 0.042;
    const sh = h * 0.049;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(w * 0.677, h * 0.521);
    ctx.lineTo(w * 0.717, h * 0.521);
    ctx.lineTo(w * 0.713, h * 0.571);
    ctx.lineTo(w * 0.674, h * 0.571);
    ctx.closePath();
    ctx.clip();

    ctx.fillStyle = mode === 'pagi' ? '#0e2432' : '#05111a';
    ctx.fillRect(sx, sy, sw + 4, sh + 4);

    if (aiBusy || activeHotspotId === 'ai-terminal') {
      const bars = 7;
      const barW = sw / (bars * 1.5);
      for (let i = 0; i < bars; i += 1) {
        const wave = prefersReducedMotion
          ? 0.55
          : 0.3 + 0.65 * (0.5 + 0.5 * Math.sin(t * (aiBusy ? 11 : 4) + i * 0.8));
        const bh = sh * 0.62 * wave;
        const bx = sx + sw * 0.14 + i * (barW * 1.35);
        const by = sy + sh * 0.82 - bh;
        ctx.fillStyle = aiBusy ? '#18d2b6' : '#68b5ff';
        ctx.fillRect(bx, by, barW, bh);
      }
    } else {
      const lineCount = 5;
      for (let i = 0; i < lineCount; i += 1) {
        const pulse = prefersReducedMotion ? 0.7 : 0.45 + 0.45 * Math.sin(t * 2.5 + i);
        const lw = sw * (0.38 + ((i * 19) % 40) / 100);
        ctx.fillStyle =
          i % 2 === 0 ? `rgba(24, 210, 182, ${pulse})` : `rgba(147, 176, 190, ${pulse})`;
        ctx.fillRect(sx + sw * 0.14, sy + sh * (0.2 + i * 0.14), lw, 1.8);
      }
    }

    ctx.restore();
  }

  function drawAtmosphere(timeMs) {
    const t = timeMs * 0.001;
    const w = stageWidth;
    const h = stageHeight;
    const mode = getTimeMode();

    ctx.clearRect(0, 0, w, h);
    drawWindowPanes(t, w, h, mode);

    if (mode === 'malam') {
      ctx.fillStyle = 'rgba(6, 16, 26, 0.46)';
      ctx.fillRect(0, 0, w, h);
    } else if (mode === 'senja') {
      ctx.fillStyle = 'rgba(34, 18, 28, 0.20)';
      ctx.fillRect(0, 0, w, h);
    } else {
      const beam = ctx.createLinearGradient(w * 0.38, h * 0.25, w * 0.68, h * 0.96);
      beam.addColorStop(0, 'rgba(255, 245, 200, 0.14)');
      beam.addColorStop(1, 'rgba(255, 245, 200, 0)');
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(w * 0.37, h * 0.54);
      ctx.lineTo(w * 0.63, h * 0.54);
      ctx.lineTo(w * 0.78, h);
      ctx.lineTo(w * 0.46, h);
      ctx.closePath();
      ctx.fill();
    }

    drawLaptopScreen(t, w, h, mode);

    const screenGlow = ctx.createRadialGradient(
      w * 0.69,
      h * 0.54,
      w * 0.01,
      w * 0.69,
      h * 0.54,
      w * 0.22
    );
    const screenAlpha =
      (mode === 'malam' ? 0.34 : mode === 'senja' ? 0.22 : 0.1) + (aiBusy ? 0.12 : 0);
    screenGlow.addColorStop(0, `rgba(24, 210, 182, ${screenAlpha.toFixed(2)})`);
    screenGlow.addColorStop(1, 'rgba(24, 210, 182, 0)');
    ctx.fillStyle = screenGlow;
    ctx.fillRect(0, 0, w, h);

    if (lampOn) {
      const lampStrength = mode === 'malam' ? 0.48 : mode === 'senja' ? 0.34 : 0.15;
      const cone = ctx.createRadialGradient(
        w * 0.21,
        h * 0.47,
        w * 0.01,
        w * 0.21,
        h * 0.54,
        w * 0.34
      );
      cone.addColorStop(0, `rgba(255, 214, 134, ${lampStrength})`);
      cone.addColorStop(0.55, `rgba(255, 174, 72, ${(lampStrength * 0.36).toFixed(2)})`);
      cone.addColorStop(1, 'rgba(255, 174, 72, 0)');
      ctx.fillStyle = cone;
      ctx.fillRect(0, 0, w, h);
    }

    const shadowX = w * 0.495 + currentPointer.x * 16 + (lampOn ? 6 : 0);
    const shadowY = h * 0.968;
    const shadowGrad = ctx.createRadialGradient(shadowX, shadowY, 4, shadowX, shadowY, w * 0.085);
    shadowGrad.addColorStop(
      0,
      mode === 'pagi' ? 'rgba(11, 25, 34, 0.26)' : 'rgba(2, 8, 14, 0.46)'
    );
    shadowGrad.addColorStop(1, 'rgba(2, 8, 14, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(shadowX, shadowY, w * 0.085, h * 0.025, 0, 0, Math.PI * 2);
    ctx.fill();

    if (pointerCanvas.x > 0 && pointerCanvas.y > 0) {
      const spot = ctx.createRadialGradient(
        pointerCanvas.x,
        pointerCanvas.y,
        4,
        pointerCanvas.x,
        pointerCanvas.y,
        w * 0.18
      );
      spot.addColorStop(
        0,
        mode === 'pagi' ? 'rgba(0, 122, 108, 0.10)' : 'rgba(24, 210, 182, 0.14)'
      );
      spot.addColorStop(1, 'rgba(24, 210, 182, 0)');
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, w, h);
    }

    particles.forEach((p) => {
      if (!prefersReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.02) p.y = 1.02;
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;
      }
      const shimmer = 0.22 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.4 + p.phase));
      ctx.fillStyle =
        mode === 'pagi'
          ? `rgba(255, 255, 255, ${(shimmer * 0.9).toFixed(2)})`
          : `rgba(170, 240, 232, ${(shimmer * 0.75).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function animate(timeMs) {
    if (!prefersReducedMotion) {
      currentPointer.x += (targetPointer.x - currentPointer.x) * 0.08;
      currentPointer.y += (targetPointer.y - currentPointer.y) * 0.08;

      if (bgLayer) {
        bgLayer.style.transform = laptopOpen
          ? ''
          : `translate3d(${(-currentPointer.x * 10).toFixed(2)}px, ${(-currentPointer.y * 6).toFixed(2)}px, 0) scale(1.03)`;
      }
      if (charCanvas) {
        const breathScale = 1 + Math.sin(timeMs * 0.0022) * 0.006;
        charCanvas.style.transform = laptopOpen
          ? ''
          : `translate3d(${(currentPointer.x * 18).toFixed(2)}px, ${(currentPointer.y * 7).toFixed(2)}px, 0) scaleY(${breathScale.toFixed(4)})`;
      }
    }

    drawAtmosphere(timeMs);
    drawCharacter(timeMs);
    requestAnimationFrame(animate);
  }

  onLangChange(() => {
    renderHotspots();
    updateHud(activeHotspotId);
    syncLampButtonText();
    if (laptopOpen) {
      syncStageChrome(stageOverlayMode || 'laptop');
      if (stageOverlayMode === 'infra') {
        renderInfraOs({ forceSceneRebuild: true });
      } else if (stageOverlayMode === 'awards') {
        renderAwardsOs({ forceSceneRebuild: true });
      } else {
        renderLaptopOs();
      }
    }
    if (speechBubble?.classList.contains('is-visible')) {
      showSpeech(t('welcomeSpeech'));
    }
  });

  stage.dataset.lamp = lampOn ? 'on' : 'off';
  renderHotspots();
  updateHud(activeHotspotId);
  syncLampButtonText();
  resizeCanvases();

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(resizeCanvases);
    ro.observe(stage);
  } else {
    window.addEventListener('resize', resizeCanvases);
  }

  requestAnimationFrame(animate);

  return {
    toggleLamp,
    triggerGreeting,
    selectHotspot,
    openLaptopView,
    closeLaptopView,
    setAiBusy(busy) {
      aiBusy = Boolean(busy);
    },
    refreshMode() {
      const mode = getTimeMode();
      const toastKey =
        mode === 'pagi' ? 'modePagiToast' : mode === 'senja' ? 'modeSenjaToast' : 'modeMalamToast';
      onActionToast?.(t(toastKey));
    },
  };
}
