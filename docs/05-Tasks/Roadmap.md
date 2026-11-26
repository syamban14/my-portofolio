---
title: Roadmap Pengembangan Portofolio M. Syamsul
created: 2026-11-25
status: active
tags:
  - my-portofolio
  - roadmap
  - tasks
---

# Roadmap Pengembangan Portofolio

> Kembali ke [[00-Home]] | PRD: [[PRD]] | ADR v2.0: [[ADR-004-v2-five-improvements-plan]]

## Phase 1: Rilis Awal `v1.0` (Selesai)
- [x] Ekstraksi data & aset lokal dari `http://103.93.160.96:8082/` ke `public/`
- [x] Implementasi Living Workspace Diorama 2.5D + 3 mode waktu (`Pagi | Senja | Malam`) + sakelar lampu meja
- [x] Implementasi Tanya AI Syamsul + Context Inspector + slash commands
- [x] Implementasi Konstelasi Keahlian berbasis fisika kanvas
- [x] Implementasi Simulasi 5 Proyek + Diagram Arsitektur 3-Layer
- [x] Implementasi Scrubber Jejak Karir 2011 - 2026, Composer Kolaborasi, Menu Cepat `Cmd+K`, & Web Audio API
- [x] Audit visual `chrome-devtools-mcp` (desktop `1440x900` & mobile `390x844`)
- [x] Publikasi ke `https://github.com/syamban14/my-portofolio` dan tayang di `https://syamban14.github.io/my-portofolio/`

---

## Phase 2: Obsidian Second Memory (Selesai Dicatat)
- [x] Inisialisasi Vault lokal `my_portofolio/docs/` beserta `.obsidian/`
- [x] Penulisan [[00-Home]], [[PRD]], [[Overview]], [[ADR-001-obsidian-second-memory]] s.d. [[ADR-004-v2-five-improvements-plan]], [[2026-11-25-kickoff-and-v1-release]], dan [[Roadmap]]

---

## Phase 3: Eksekusi 5 Poin Improvement `v2.0` (Berikutnya)

### Poin 1 — Bukti Teknis Nyata & Integrasi Live GitHub (Selesai)
- [x] Tambah `impactMetrics` dan mockup UI visual di `portfolioData.js` & `projectShowcase.js` untuk 5 proyek utama (`Pratinjau UI`)
- [x] Buat modul `src/modules/githubShowcase.js` untuk fetch repositori publik `@syamban14` (dengan cache `sessionStorage` + fallback kurasi repo unggulan `hermes-mix-ai`, `mixa-frontend`, `mixa-backend`, `step-100-3d`, `beach-3d`, `qhse-app`, `bcs-fit`)
- [x] Tambahkan filter kategori (`Unggulan`, `AI & Python`, `3D & Interaktif`, `Full-Stack & ERP`, `Semua`) serta pencarian pada daftar repositori terbuka

### Poin 2 — Upgrade "Tanya AI Syamsul" (Ditunda Sementara)
- *Status:* Ditunda atas permintaan pengguna karena perlu menyiapkan provider & model LLM terlebih dahulu.
- [ ] Perkuat logika penalaran lokal dwibahasa (ID/EN), memori percakapan, & perbandingan arsitektur proyek
- [ ] Tambahkan opsi koneksi LLM API/Serverless Proxy (endpoint + status aktif) dengan fallback lokal otomatis

### Poin 3 — Visual Karakter & Diorama Lebih Hidup (Selesai)
- [x] Ganti layer karakter statis dengan rig kanvas 2x DPR (`#workspaceCharCanvas`) beranimasi kedipan mata natural, ekspresi mata tersenyum (`Sapa Syamsul`), dan gerak mulut lip-sync saat dialog/AI aktif
- [x] Tambahkan *rim-light* dinamis (`source-atop`) pada karakter yang bereaksi terhadap sakelar lampu meja dan mode `Pagi | Senja | Malam`
- [x] Tingkatkan diorama ruangan: langit jendela dua panel terpisah (bintang, bulan sabit, bintang jatuh, awan senja/pagi, sorot matahari pagi), bayangan kaki karakter di lantai, serta layar laptop meja interaktif (bar kode & equalizer AI)

### Poin 4 — Dukungan Dwibahasa (`ID | EN`) & Export CV ATS-Friendly (Selesai)
- [x] Buat sistem lokalisasi `src/data/i18n.js` + sakelar `ID | EN` di header (persist `localStorage`)
- [x] Terjemahkan seluruh elemen UI, data biodata, 5 simulasi proyek, konstelasi keahlian, repositori GitHub, composer kontak, & respons AI ke Bahasa Inggris profesional
- [x] Buat skrip `scripts/generate-ats-cv.mjs` untuk menghasilkan PDF ATS 1-halaman bersih (`public/cv/M-Syamsul-CV-ATS-ID.pdf` & `M-Syamsul-CV-ATS-EN.pdf`), tombol unduh otomatis sesuai bahasa aktif, serta lembar cetak `@media print` dwibahasa

### Poin 5 — Open Graph Preview Card, SEO Schema.org, & Optimasi URL (Selesai)
- [x] Buat aset kartu sosial `public/og-preview.png` (`1200x630`)
- [x] Tambahkan meta tags `og:*`, `twitter:card`, `canonical`, `public/robots.txt`, `public/sitemap.xml`, dan JSON-LD `Person` / `ProfilePage` di `index.html`, serta `README.md`
- [x] Validasi final dengan `npm run build`, verifikasi `HTTP 200` seluruh aset SEO/OG di GitHub Pages (`https://syamban14.github.io/my-portofolio/`)

### Penyempurnaan Header & Jam Studio Otomatis (Selesai)
- [x] Hapus tombol `Menu cepat` (`#commandTriggerBtn`) dari header; pindahkan toggle `ID | EN` (`#langSwitch`) ke sisi paling kanan `.header-controls`
- [x] Atur mode waktu studio (`Pagi | Senja | Malam`) otomatis mengikuti jam lokal secara default + sinkronisasi berkala 60 detik, tetap dapat dipilih manual lewat tombol/perintah AI
- [x] Catatan: Poin 2 (Live LLM API Proxy) tetap ditunda sesuai keputusan pengguna

### Ekspansi Keahlian & Fokus Bukti Proyek Tanpa Persentase (Selesai)
- [x] Tambah 5 keahlian ke dataset (`public/data.json`, `portfolioData.js`, `i18n.js`): `PostgreSQL`, `SQLite`, `Go`, `Docker`, dan `REST / RESTful API`
- [x] Hapus seluruh angka `%` & bar skor di `#skills`, `#ai-studio`, `#hudHotspotSummary`, cetak CV, dan regenerasi kedua file PDF ATS (`M-Syamsul-CV-ATS-ID.pdf` & `EN.pdf`)
- [x] Rancang ulang graf konstelasi keahlian menjadi hierarki 3-tingkat berpusat pada potret medali karakter M. Syamsul (`M. Syamsul -> 4 Hub Kategori -> 15 Simpul`) tanpa latar ruangan & tanpa garis kusut antar-simpul

### Redesain Visual-First Atmospheric Glass & Bento Studio (Selesai)
- [x] Terapkan tema *Atmospheric Glass & Bento Studio* (dot-grid, ambient aura Pagi/Senja/Malam, kartu glassmorphism, ikon SVG, & animasi scroll-reveal)
- [x] Terapkan penyajian *Visual-First* (~60% lebih ringkas): 4 metrik Bento di Hero, 4 ubin kategori di Konstelasi, `Pratinjau UI` default di Proyek, kartu milestone berikon + chip tag, dan grid kontak 2×2
