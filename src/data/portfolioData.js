/**
 * Complete factual portfolio dataset sourced from http://103.93.160.96:8082/data.json
 * enriched with interactive metadata for the Living Workspace, AI Studio,
 * Skill Constellation, Interactive Project Prototypes, and Journey Scrubber.
 */
export const portfolioData = {
  name: 'M. SYAMSUL',
  shortName: 'M. Syamsul',
  title: 'IT Programmer & AI Specialist',
  tagline: 'Membangun solusi digital yang memberdayakan UMKM dan institusi.',
  heroHeadline: 'M. Syamsul merancang agen AI dan aplikasi institusi',
  heroSubtitle:
    'Programmer IT dan spesialis AI di Cilegon dengan delapan tahun pengalaman membangun solusi web, mobile, dan infrastruktur.',
  contact: {
    phone: '+62 821-1157-9944',
    whatsappNumber: '6282111579944',
    email: 'Syamsuliki.48@gmail.com',
    linkedin: 'https://linkedin.com/in/m-syamsul',
    linkedinHandle: 'linkedin.com/in/m-syamsul',
    github: 'https://github.com/syamban14',
    githubHandle: 'github.com/syamban14',
    githubUsername: 'syamban14',
    blog: 'https://Syamsul14.blogspot.com',
    blogHost: 'Syamsul14.blogspot.com',
    location: 'Cilegon, Banten, Indonesia',
  },
  summary:
    'Seorang IT Programmer dan IT Specialist berpengalaman dengan latar belakang pendidikan kuat di Sistem Informasi dan Manajemen Informatika. Memiliki ketertarikan besar dan keahlian mendalam dalam mempelajari, meriset, serta aktif mengembangkan teknologi AI Agent. Rekam jejak solid dalam pemeliharaan & pengembangan aplikasi web, manajemen infrastruktur IT, serta pembuatan perangkat lunak kustom untuk institusi.',
  stats: [
    { label: 'Pengalaman', value: '8+ Tahun' },
    { label: 'Proyek', value: '10+' },
    { label: 'Penghargaan', value: '3' },
    { label: 'Aplikasi Dibangun', value: '5+' },
  ],
  experience: [
    {
      id: 'exp-bcs',
      company: 'PT. BCS Logistics',
      role: 'IT Programmer',
      period: 'Agustus 2024 - Agustus 2026',
      startYear: 2024,
      endYear: 2026,
      location: 'Cilegon, Banten',
      details: [
        'Rancang & bangun Aplikasi Presensi Online Android & iOS',
        'Kembangkan aplikasi kesehatan doklinc',
        'Maintenance & pengembangan aplikasi web',
        'Debugging, penambahan fitur, manajemen database',
      ],
    },
    {
      id: 'exp-lp3i',
      company: 'LP3I Business College',
      role: 'IT Support',
      period: 'Januari 2017 - Agustus 2024',
      startYear: 2017,
      endYear: 2024,
      location: 'Cilegon, Banten',
      details: [
        'Rancang program kerja tahunan IT',
        'Manajemen infrastruktur jaringan, hardware, software',
        'Dukungan teknis harian',
        'Pengembangan aplikasi internal institusi',
      ],
    },
  ],
  skills: [
    {
      id: 'ai-agent-dev',
      name: 'AI Agent Dev',
      code: 'AI',
      category: 'AI',
      usage:
        'Merancang alur kerja agen otonom, tool calling, dan asisten tugas untuk otomasi produktivitas UMKM serta institusi.',
      relatedProjects: ['presensi-online', 'doklinc'],
    },
    {
      id: 'prompt-engineering',
      name: 'Prompt Engineering',
      code: 'PE',
      category: 'AI',
      usage:
        'Menyusun instruksi terstruktur, guardrails, dan evaluasi output LLM agar akurat dan konsisten pada kasus bisnis.',
      relatedProjects: ['doklinc', 'ujian-online'],
    },
    {
      id: 'ai-api-integration',
      name: 'AI API Integration',
      code: 'API',
      category: 'AI',
      usage:
        'Mengintegrasikan API model bahasa dan kecerdasan buatan ke layanan backend serta aplikasi web modern.',
      relatedProjects: ['doklinc', 'presensi-online'],
    },
    {
      id: 'python',
      name: 'Python',
      code: 'PY',
      category: 'Language',
      usage:
        'Pengembangan skrip otomasi, riset eksperimen agen AI, pemrosesan data, serta layanan API backend.',
      relatedProjects: ['presensi-online', 'doklinc'],
    },
    {
      id: 'go',
      name: 'Go',
      code: 'GO',
      category: 'Language',
      usage:
        'Membangun layanan backend berkinerja tinggi, konkurensi ringan, dan mikroservis RESTful API yang efisien.',
      relatedProjects: ['presensi-online', 'doklinc'],
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      code: 'JS',
      category: 'Language',
      usage:
        'Membangun antarmuka web responsif, interaksi real-time, dan integrasi klien-server lintas platform.',
      relatedProjects: ['presensi-online', 'ujian-online', 'test-masuk'],
    },
    {
      id: 'php',
      name: 'PHP',
      code: 'PHP',
      category: 'Language',
      usage:
        'Fondasi sistem informasi kampus, portal ujian daring, seleksi mahasiswa baru, dan persuratan institusi.',
      relatedProjects: ['aplikasi-surat', 'ujian-online', 'test-masuk'],
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      code: 'PG',
      category: 'Database',
      usage:
        'Manajemen basis data relasional tingkat enterprise, konsistensi transaksi, dan optimasi indeks untuk sistem produksi.',
      relatedProjects: ['presensi-online', 'doklinc'],
    },
    {
      id: 'mysql',
      name: 'MySQL',
      code: 'SQL',
      category: 'Database',
      usage:
        'Perancangan skema relasional, optimasi kueri, pemeliharaan integritas data presensi, ujian, dan rekam layanan.',
      relatedProjects: [
        'presensi-online',
        'doklinc',
        'aplikasi-surat',
        'ujian-online',
        'test-masuk',
      ],
    },
    {
      id: 'sqlite',
      name: 'SQLite',
      code: 'LITE',
      category: 'Database',
      usage:
        'Penyimpanan lokal ringan tanpa server untuk cache aplikasi mobile, pembuatan prototipe cepat, dan persistensi agen AI lokal.',
      relatedProjects: ['presensi-online', 'doklinc'],
    },
    {
      id: 'rest-api',
      name: 'REST / RESTful API',
      code: 'REST',
      category: 'Tech',
      usage:
        'Perancangan arsitektur endpoint standar, autentikasi token, dan integrasi data JSON antara aplikasi mobile, web, serta layanan AI.',
      relatedProjects: ['presensi-online', 'doklinc', 'ujian-online'],
    },
    {
      id: 'docker',
      name: 'Docker',
      code: 'DKR',
      category: 'Tech',
      usage:
        'Kontainerisasi layanan aplikasi, isolasi lingkungan pengembangan dan produksi, serta standarisasi deployment backend.',
      relatedProjects: ['presensi-online', 'doklinc'],
    },
    {
      id: 'web-mobile-dev',
      name: 'Web & Mobile Dev',
      code: 'APP',
      category: 'Tech',
      usage:
        'Pengembangan end-to-end aplikasi web, Android, dan iOS termasuk deployment serta pemeliharaan berkala.',
      relatedProjects: ['presensi-online', 'doklinc'],
    },
    {
      id: 'it-support',
      name: 'IT Support',
      code: 'OPS',
      category: 'Tech',
      usage:
        'Penyusunan program kerja tahunan IT, pemeliharaan perangkat keras dan lunak, serta dukungan operasional harian.',
      relatedProjects: ['aplikasi-surat', 'ujian-online'],
    },
    {
      id: 'networking',
      name: 'Networking',
      code: 'NET',
      category: 'Tech',
      usage:
        'Perencanaan dan pemeliharaan infrastruktur jaringan lokal kampus agar operasional akademik dan ujian berjalan stabil.',
      relatedProjects: ['ujian-online', 'test-masuk'],
    },
  ],
  certifications: [
    {
      id: 'cert-hacktiv8',
      title: 'AI Productivity and AI API Integration for Developers - Hacktiv8',
      shortTitle: 'AI Productivity & API Integration (Hacktiv8)',
      date: 'Agustus 2025',
      year: 2025,
      desc: 'Intensive 1-week training focusing on AI API integration & productivity.',
    },
  ],
  projects: [
    {
      id: 'presensi-online',
      title: 'Aplikasi Presensi Online (BCS Logistics)',
      shortTitle: 'Presensi Online',
      org: 'PT. BCS Logistics',
      period: '2024 - 2026',
      stackText: 'Web · Android · iOS',
      summary:
        'Aplikasi manajemen kehadiran karyawan lintas platform untuk kebutuhan operasional logistik di PT. BCS Logistics.',
      roleContribution:
        'Merancang arsitektur aplikasi Android, iOS, serta panel pemantauan web dan manajemen database presensi.',
      impactMetrics: [
        { value: '3 Platform', label: 'Android, iOS, & Web' },
        { value: 'Real-Time', label: 'Validasi Geofence GPS' },
        { value: 'Multi-Shift', label: 'Operasional Logistik BCS' },
      ],
      uiMockup: {
        device: 'mobile',
        headerTitle: 'Presensi BCS Logistics',
        primaryTitle: 'Check-In Lokasi Kantor Pusat Cilegon',
        primaryStats: [
          { k: 'Radius GPS', v: '18 m (Valid)' },
          { k: 'Jadwal Shift', v: '08:00 - 17:00 WIB' },
          { k: 'Sinkronisasi', v: 'Tercatat ke Server' },
        ],
        secondaryTitle: 'Rekap Kehadiran Harian Divisi',
        secondaryRows: [
          'Operasional Gudang · Hadir 07:56 WIB',
          'Tim Pengiriman · Shift Lapangan Aktif',
          'Admin Logistik · Terverifikasi Lokasi',
        ],
      },
      architecture: [
        {
          layer: 'Klien Mobile',
          tech: 'Android & iOS App',
          note: 'Pengambilan koordinat lokasi kerja, validasi jam shift, dan pengiriman check-in atau check-out.',
        },
        {
          layer: 'Layanan Aplikasi',
          tech: 'REST API & Panel Web',
          note: 'Verifikasi radius kehadiran, sinkronisasi status karyawan, dan rekap harian divisi.',
        },
        {
          layer: 'Basis Data',
          tech: 'MySQL Relasional',
          note: 'Penyimpanan log waktu presensi, jadwal shift, dan pelaporan kehadiran terstruktur.',
        },
      ],
    },
    {
      id: 'doklinc',
      title: 'Aplikasi Kesehatan doklinc (Masyarakat Cilegon)',
      shortTitle: 'Kesehatan doklinc',
      org: 'Masyarakat Cilegon · PT. BCS Logistics',
      period: '2024 - 2026',
      stackText: 'Web · Mobile · API',
      summary:
        'Platform kesehatan digital untuk memudahkan akses layanan medis dan antrean informasi kesehatan bagi masyarakat Cilegon.',
      roleContribution:
        'Mengembangkan fitur layanan aplikasi kesehatan, integrasi API, debugging, dan pemeliharaan basis data.',
      impactMetrics: [
        { value: 'Kota Cilegon', label: 'Cakupan Layanan Warga' },
        { value: 'Terpusat', label: 'Antrean & Jadwal Poli' },
        { value: 'Mobile + API', label: 'Arsitektur Terintegrasi' },
      ],
      uiMockup: {
        device: 'mobile',
        headerTitle: 'Layanan Kesehatan doklinc',
        primaryTitle: 'Pendaftaran Poli & Antrean Langsung',
        primaryStats: [
          { k: 'Nomor Aktif', v: 'Antrean A-014' },
          { k: 'Estimasi Tunggu', v: '10 Menit' },
          { k: 'Status API', v: 'Terhubung Klinik' },
        ],
        secondaryTitle: 'Riwayat Kunjungan & Rujukan Pasien',
        secondaryRows: [
          'Konsultasi Umum · Terjadwal 09:30 WIB',
          'Cek Kesehatan Rutin · Selesai Verifikasi',
          'Notifikasi Pasien · Terkirim Otomatis',
        ],
      },
      architecture: [
        {
          layer: 'Antarmuka Pengguna',
          tech: 'Mobile & Web Portal',
          note: 'Pemilihan poli layanan kesehatan masyarakat dan pemantauan nomor antrean secara langsung.',
        },
        {
          layer: 'Lapisan Integrasi',
          tech: 'Backend API',
          note: 'Penjadwalan layanan, pengelolaan status kunjungan, dan alur notifikasi pasien.',
        },
        {
          layer: 'Basis Data',
          tech: 'MySQL',
          note: 'Pengelolaan direktori layanan kesehatan, antrean harian, dan catatan pendaftaran.',
        },
      ],
    },
    {
      id: 'ujian-online',
      title: 'Aplikasi Ujian Online (LP3I College)',
      shortTitle: 'Ujian Online',
      org: 'LP3I Business College',
      period: '2017 - 2024',
      stackText: 'Web · PHP · MySQL',
      summary:
        'Platform pelaksanaan ujian berbasis komputer dan web untuk mengevaluasi kompetensi mahasiswa di lingkungan LP3I College.',
      roleContribution:
        'Membangun modul soal interaktif, pencatatan skor otomatis, dan menjaga kesiapan jaringan ruang ujian.',
      impactMetrics: [
        { value: '7+ Tahun', label: 'Masa Pakai di LP3I' },
        { value: 'Otomatis', label: 'Kalkulasi Nilai Ujian' },
        { value: 'Serentak', label: 'Dukungan Ujian LAN & Web' },
      ],
      uiMockup: {
        device: 'desktop',
        headerTitle: 'Portal Ujian Online LP3I College',
        primaryTitle: 'Lembar Soal & Timer Sesi Lab Komputer',
        primaryStats: [
          { k: 'Status Sesi', v: 'Tersambung LAN' },
          { k: 'Soal Terjawab', v: '28 / 30 Butir' },
          { k: 'Auto-Save', v: 'Aktif ke MySQL' },
        ],
        secondaryTitle: 'Rekap Nilai & Kehadiran Kelas',
        secondaryRows: [
          'Manajemen Informatika · 32 Peserta Selesai',
          'Validasi Token Ruang · Terkunci Per Sesi',
          'Ekspor Nilai Dosen · Siap Unduh CSV',
        ],
      },
      architecture: [
        {
          layer: 'Browser Peserta',
          tech: 'Web Client & JS',
          note: 'Navigasi soal interaktif, pencatatan jawaban real-time, dan pengumpulan hasil.',
        },
        {
          layer: 'Mesin Evaluasi',
          tech: 'PHP Application Server',
          note: 'Validasi sesi peserta, penghitungan nilai otomatis, dan rekap hasil per kelas.',
        },
        {
          layer: 'Basis Data & Jaringan',
          tech: 'MySQL & Campus LAN',
          note: 'Bank soal terstruktur dan distribusi beban jaringan lokal saat ujian serentak.',
        },
      ],
    },
    {
      id: 'test-masuk',
      title: 'Aplikasi Test Online Masuk (LP3I College)',
      shortTitle: 'Test Online Masuk',
      org: 'LP3I Business College',
      period: '2017 - 2024',
      stackText: 'Web · PHP · MySQL',
      summary:
        'Sistem seleksi penerimaan calon mahasiswa baru secara daring untuk mengukur kesiapan akademik dan minat program studi.',
      roleContribution:
        'Mengembangkan sistem penilaian seleksi, pemetaan rekomendasi kelulusan, dan dukungan operasional penerimaan.',
      impactMetrics: [
        { value: '3 Modul', label: 'Logika, Komputer, Inggris' },
        { value: 'Instan', label: 'Rekomendasi Program Studi' },
        { value: 'Paperless', label: 'Seleksi Mahasiswa Baru' },
      ],
      uiMockup: {
        device: 'desktop',
        headerTitle: 'Seleksi Test Online Masuk LP3I',
        primaryTitle: 'Evaluasi Potensi Calon Mahasiswa Baru',
        primaryStats: [
          { k: 'Bobot Penilaian', v: '3 Komponen Tes' },
          { k: 'Rekomendasi', v: 'Otomatis Sesuai Skor' },
          { k: 'Verifikasi', v: 'Panel Panitia PMB' },
        ],
        secondaryTitle: 'Pemetaan Kelulusan & Minat Jurusan',
        secondaryRows: [
          'D3 Manajemen Informatika · Rekomendasi Utama',
          'Sistem Skor Real-Time · Nol Koreksi Manual',
          'Arsip Nilai Pendaftar · Tersimpan Terpusat',
        ],
      },
      architecture: [
        {
          layer: 'Portal Pendaftar',
          tech: 'Web Seleksi Masuk',
          note: 'Pengisian tes potensi logika, pengetahuan komputer dasar, dan bahasa Inggris.',
        },
        {
          layer: 'Logika Penilaian',
          tech: 'PHP Scoring Engine',
          note: 'Pembobotan skor tiap komponen tes dan rekomendasi kesiapan program studi.',
        },
        {
          layer: 'Basis Data Seleksi',
          tech: 'MySQL',
          note: 'Rekam skor calon mahasiswa dan status verifikasi tim penerimaan.',
        },
      ],
    },
    {
      id: 'aplikasi-surat',
      title: 'Aplikasi Surat (LP3I College)',
      shortTitle: 'Aplikasi Surat',
      org: 'LP3I Business College',
      period: '2017 - 2024',
      stackText: 'Web · PHP · MySQL',
      summary:
        'Sistem manajemen surat masuk, surat keluar, disposisi, dan penomoran dokumen resmi untuk tata usaha institusi.',
      roleContribution:
        'Merancang alur persetujuan dokumen, penomoran otomatis, dan arsip pencarian surat internal.',
      impactMetrics: [
        { value: '4 Tahap', label: 'Alur Verifikasi & Disposisi' },
        { value: 'Otomatis', label: 'Penomoran Surat Resmi' },
        { value: 'Terindeks', label: 'Arsip Digital Institusi' },
      ],
      uiMockup: {
        device: 'desktop',
        headerTitle: 'Sistem Persuratan LP3I College',
        primaryTitle: 'Penomoran Surat Resmi & Pelacakan Disposisi',
        primaryStats: [
          { k: 'Format Nomor', v: '042/LP3I-CLG/XI' },
          { k: 'Tahap Disposisi', v: '4 Langkah Berurut' },
          { k: 'Pencarian Arsip', v: 'Indeks Nomor & Tanggal' },
        ],
        secondaryTitle: 'Log Persetujuan Tata Usaha',
        secondaryRows: [
          'Draft Surat Tugas · Diperiksa Kabag',
          'Disposisi Pimpinan · Disetujui Digital',
          'Lampiran Resmi · Siap Cetak & Arsip',
        ],
      },
      architecture: [
        {
          layer: 'Antarmuka Tata Usaha',
          tech: 'Web Dashboard',
          note: 'Input draf surat, unggah lampiran, dan pelacakan status disposisi pimpinan.',
        },
        {
          layer: 'Alur Persetujuan',
          tech: 'PHP Workflow Logic',
          note: 'Validasi tahapan verifikasi serta penerbitan nomor surat resmi secara berurutan.',
        },
        {
          layer: 'Arsip Digital',
          tech: 'MySQL',
          note: 'Penyimpanan indeks nomor surat, tanggal terbit, dan riwayat disposisi institusi.',
        },
      ],
    },
  ],
  awards: [
    {
      id: 'award-ptk-2017',
      year: 2017,
      title: 'Juara 1 Lomba PTK PNFI (2017)',
      detail: 'Instruktur Komputer tingkat Kota Cilegon',
      category: 'Prestasi',
    },
    {
      id: 'award-ptk-2018',
      year: 2018,
      title: 'Juara 3 Lomba PTK PNFI (2018)',
      detail: 'Instruktur Komputer tingkat Provinsi Banten',
      category: 'Prestasi',
    },
    {
      id: 'award-futsal-2011',
      year: 2011,
      title: 'Mahasiswa Berprestasi (2011)',
      detail: 'Olahraga Futsal LP3I College',
      category: 'Prestasi',
    },
  ],
  education: [
    {
      id: 'edu-global',
      institution: 'STMIK Bina Sarana Global',
      location: 'Tangerang, Banten',
      degree: 'S1 Sistem Informasi',
      gpa: '3.32',
      period: 'Sep 2014 - Nov 2016',
      startYear: 2014,
      endYear: 2016,
    },
    {
      id: 'edu-lp3i',
      institution: 'Politeknik LP3I Bandung',
      location: 'Bandung, Jawa Barat',
      degree: 'D3 Manajemen Informatika',
      gpa: '2.92',
      period: 'Sep 2011 - Sep 2014',
      startYear: 2011,
      endYear: 2014,
    },
  ],
  workspaceHotspots: [
    {
      id: 'lamp',
      title: 'Lampu Kerja Interaktif',
      actionType: 'toggle-lamp',
      x: 21,
      y: 47,
      speech: 'Suasana kerja bisa disesuaikan. Klik lampu untuk menyalakan atau mematikan cahaya meja.',
      summary:
        'Kontrol pencahayaan ruang kerja secara langsung untuk menguji mode fokus malam, senja Cilegon, atau siang cerah.',
      ctaLabel: 'Ganti mode waktu di atas',
      targetSection: '#ai-studio',
    },
    {
      id: 'ai-terminal',
      title: 'Terminal Agen AI',
      actionType: 'inspect',
      x: 59,
      y: 38,
      speech: 'Di sinilah saya meriset dan merangkai agen AI serta integrasi API untuk kebutuhan nyata.',
      summary:
        'Fokus utama saat ini: AI Agent Dev, Prompt Engineering, Python, Go, dan AI API Integration.',
      ctaLabel: 'Tanya AI Syamsul',
      targetSection: '#ai-studio',
    },
    {
      id: 'laptop-projects',
      title: 'Monitor Proyek BCS & doklinc',
      actionType: 'inspect',
      x: 68,
      y: 51,
      speech: 'Lima aplikasi institusi dan publik sudah berjalan, mulai dari Presensi Online hingga doklinc.',
      summary:
        'Menangani rancang bangun Aplikasi Presensi Online Android & iOS di PT. BCS Logistics serta layanan kesehatan doklinc.',
      ctaLabel: 'Simulasi 5 proyek',
      targetSection: '#projects',
    },
    {
      id: 'infra-lp3i',
      title: 'Server & Infrastruktur LP3I',
      actionType: 'inspect',
      x: 75,
      y: 66,
      speech: 'Selama 2017 hingga 2024 di LP3I College, saya mengelola jaringan, hardware, dan sistem kampus.',
      summary:
        'Delapan tahun lebih memadukan peran IT Support, Networking, Docker, serta pengembangan sistem berbasis PHP, PostgreSQL, & MySQL.',
      ctaLabel: 'Telusuri jejak karir',
      targetSection: '#experience',
    },
    {
      id: 'shelf-awards',
      title: 'Rak Sertifikasi & Trofi',
      actionType: 'inspect',
      x: 89,
      y: 35,
      speech: 'Belajar tidak pernah berhenti, dari Juara 1 Instruktur Komputer hingga pelatihan Hacktiv8 2025.',
      summary:
        'Sertifikasi AI Productivity & AI API Integration (Hacktiv8, Agustus 2025), Juara 1 PTK PNFI Cilegon, dan Juara 3 Provinsi Banten.',
      ctaLabel: 'Lihat riwayat lengkap',
      targetSection: '#experience',
    },
  ],
  githubCuratedRepos: [
    {
      name: 'hermes-mix-ai',
      language: 'Python',
      category: 'ai',
      featured: true,
      updatedAt: '2026-08-28T18:52:10Z',
      description:
        'Orkestrator efisiensi tinggi dan penghemat token untuk Hermes Agent dengan tiered routing, isolasi git worktree, dan zero-token gate.',
    },
    {
      name: 'mixa-frontend',
      language: 'Svelte',
      category: 'fullstack',
      featured: true,
      updatedAt: '2026-11-11T09:08:29Z',
      description:
        'Antarmuka web reaktif berbasis Svelte dan Vite untuk ekosistem aplikasi cerdas Mixa.',
    },
    {
      name: 'mixa-backend',
      language: 'Python',
      category: 'ai',
      featured: false,
      updatedAt: '2026-07-20T02:14:18Z',
      description:
        'Layanan backend Python pendukung pemrosesan data, integrasi model, dan orkestrasi API platform Mixa.',
    },
    {
      name: 'step-100-3d',
      language: 'JavaScript',
      category: 'web3d',
      featured: true,
      demoUrl: 'https://syamban14.github.io/step-100-3d/',
      updatedAt: '2026-11-20T02:59:43Z',
      description:
        'Eksperimen interaktif ruang tiga dimensi berbasis web dengan kontrol pergerakan langsung di browser.',
    },
    {
      name: 'beach-3d',
      language: 'Python',
      category: 'web3d',
      featured: true,
      demoUrl: 'https://syamban14.github.io/beach-3d/',
      updatedAt: '2026-11-16T03:41:29Z',
      description:
        'Visualisasi pemandangan pantai 3D interaktif yang dapat dijelajahi langsung melalui GitHub Pages.',
    },
    {
      name: 'gemini-chatbot-api',
      language: 'JavaScript',
      category: 'ai',
      featured: false,
      updatedAt: '2025-08-19T03:22:12Z',
      description:
        'Implementasi chatbot percakapan menggunakan integrasi Google Gemini API.',
    },
    {
      name: 'gemini-flash-api',
      language: 'JavaScript',
      category: 'ai',
      featured: false,
      updatedAt: '2025-08-15T07:30:31Z',
      description:
        'Eksperimen pemanggilan cepat dan integrasi layanan model Gemini Flash API.',
    },
    {
      name: 'qhse-app',
      language: 'Laravel / Blade',
      category: 'fullstack',
      featured: true,
      updatedAt: '2025-12-08T04:31:01Z',
      description:
        'Aplikasi manajemen Quality, Health, Safety, and Environment (QHSE) berbasis Laravel.',
    },
    {
      name: 'bcs-fit',
      language: 'PHP',
      category: 'fullstack',
      featured: true,
      updatedAt: '2024-10-18T09:23:44Z',
      description:
        'Sistem pemantauan aktivitas kebugaran dan kesehatan berbasis framework PHP CodeIgniter 4.',
    },
    {
      name: 'odoo17-module-development',
      language: 'Python',
      category: 'fullstack',
      featured: false,
      updatedAt: '2025-06-09T09:42:59Z',
      description:
        'Pengembangan modul kustom ERP Odoo 17 berbasis Python untuk otomasi proses bisnis.',
    },
    {
      name: 'irsyam_kidz_wear',
      language: 'TypeScript',
      category: 'fullstack',
      featured: false,
      updatedAt: '2026-03-22T14:59:38Z',
      description:
        'Katalog dan etalase web modern busana anak berbasis Next.js dan TypeScript.',
    },
    {
      name: 'ngaji_geh',
      language: 'HTML',
      category: 'fullstack',
      featured: false,
      updatedAt: '2024-09-27T08:15:04Z',
      description:
        'Aplikasi program mengaji dan direktori pencarian guru mengaji untuk masyarakat.',
    },
  ],
};
