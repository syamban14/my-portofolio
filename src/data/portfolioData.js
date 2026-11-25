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
      level: 92,
      category: 'AI',
      usage:
        'Merancang alur kerja agen otonom, tool calling, dan asisten tugas untuk otomasi produktivitas UMKM serta institusi.',
      relatedProjects: ['presensi-online', 'doklinc'],
    },
    {
      id: 'prompt-engineering',
      name: 'Prompt Engineering',
      level: 90,
      category: 'AI',
      usage:
        'Menyusun instruksi terstruktur, guardrails, dan evaluasi output LLM agar akurat dan konsisten pada kasus bisnis.',
      relatedProjects: ['doklinc', 'ujian-online'],
    },
    {
      id: 'ai-api-integration',
      name: 'AI API Integration',
      level: 88,
      category: 'AI',
      usage:
        'Mengintegrasikan API model bahasa dan kecerdasan buatan ke layanan backend serta aplikasi web modern.',
      relatedProjects: ['doklinc', 'presensi-online'],
    },
    {
      id: 'python',
      name: 'Python',
      level: 90,
      category: 'Language',
      usage:
        'Pengembangan skrip otomasi, riset eksperimen agen AI, pemrosesan data, serta layanan API backend.',
      relatedProjects: ['presensi-online', 'doklinc'],
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      level: 85,
      category: 'Language',
      usage:
        'Membangun antarmuka web responsif, interaksi real-time, dan integrasi klien-server lintas platform.',
      relatedProjects: ['presensi-online', 'ujian-online', 'test-masuk'],
    },
    {
      id: 'php',
      name: 'PHP',
      level: 88,
      category: 'Language',
      usage:
        'Fondasi sistem informasi kampus, portal ujian daring, seleksi mahasiswa baru, dan persuratan institusi.',
      relatedProjects: ['aplikasi-surat', 'ujian-online', 'test-masuk'],
    },
    {
      id: 'mysql',
      name: 'MySQL',
      level: 85,
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
      id: 'web-mobile-dev',
      name: 'Web & Mobile Dev',
      level: 90,
      category: 'Tech',
      usage:
        'Pengembangan end-to-end aplikasi web, Android, dan iOS termasuk deployment serta pemeliharaan berkala.',
      relatedProjects: ['presensi-online', 'doklinc'],
    },
    {
      id: 'it-support',
      name: 'IT Support',
      level: 92,
      category: 'Tech',
      usage:
        'Penyusunan program kerja tahunan IT, pemeliharaan perangkat keras dan lunak, serta dukungan operasional harian.',
      relatedProjects: ['aplikasi-surat', 'ujian-online'],
    },
    {
      id: 'networking',
      name: 'Networking',
      level: 80,
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
        'Fokus utama saat ini: AI Agent Dev (92%), Prompt Engineering (90%), Python (90%), dan AI API Integration (88%).',
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
        'Delapan tahun lebih memadukan peran IT Support (92%), Networking (80%), dan pengembangan web internal berbasis PHP & MySQL.',
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
};
