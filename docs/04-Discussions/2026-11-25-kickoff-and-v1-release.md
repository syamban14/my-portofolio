---
title: Log Diskusi 2026-11-25 - Kickoff, Rilis v1.0, & Rencana v2.0
created: 2026-11-25
status: active
tags:
  - my-portofolio
  - discussion
  - release
---

# 2026-11-25 — Kickoff, Rilis `v1.0`, dan Perumusan Improvement `v2.0`

> Kembali ke [[00-Home]] | Roadmap: [[Roadmap]]

## 1. Ekstraksi Data Awal (`http://103.93.160.96:8082/`)
- Mengambil `index.html`, `script.js`, `character-3d.js`, `colorize.js`, dan `data.json` dari server sumber.
- Temuan penting: file model 3D `.glb` (`character_tripo.glb`, dll.) di server sumber mengembalikan `404 Not Found`, sedangkan `assets/character_anime_clean.png` dan `assets/room_anime_bg.png` tersedia (`200 OK`).
- Aset lokal disalin ke `public/` agar portofolio GitHub Pages (HTTPS) bebas error mixed-content maupun ketergantungan IP lama.

## 2. Keputusan Desain & Arsitektur `v1.0`
Melalui sesi tanya-jawab dengan pengguna, disepakati:
1. Konsep: **Interactive AI Studio & Living Workspace** ([[ADR-002-interactive-ai-studio-concept]]).
2. Stack: **Vite + Vanilla Modern JS/Canvas + CSS** ([[ADR-003-vite-vanilla-canvas-stack]]).
3. Target Deploy: Repositori baru **`syamban14/my-portofolio`** via GitHub Pages.

## 3. Verifikasi Lokal & Peluncuran `v1.0`
- Dilakukan audit browser menggunakan `chrome-devtools-mcp` pada `1440x900` dan `390x844`:
  - Penyesuaian koordinat hotspot lampu & terminal AI agar tidak menutupi karakter.
  - Perbaikan batas gradien radial lampu meja agar tidak terpotong tepi persegi panjang.
  - Penambahan jarak tolak-menolak simpul pada konstelasi keahlian agar label tidak bertumpukan.
  - Pemindahan posisi balon dialog di desktop (`top: 18px`) dan di mobile (di bawah diorama) agar semua hotspot tetap mudah diklik.
- Setelah persetujuan pengguna, repositori `https://github.com/syamban14/my-portofolio` dibuat dan GitHub Actions workflow (`Deploy Portfolio to GitHub Pages`) berhasil menayangkan situs di `https://syamban14.github.io/my-portofolio/` (`HTTP 200 OK`).

## 4. Perumusan Improvement `v2.0` & Penyimpanan Second Memory
- Pengguna meminta evaluasi improvement, lalu disepakati 5 poin peningkatan ([[ADR-004-v2-five-improvements-plan]] & [[PRD]]).
- Sebelum mengeksekusi ke-5 poin tersebut, pengguna meminta pencatatan lengkap ke dalam **Obsidian Second Memory** di `my_portofolio/docs/` ([[ADR-001-obsidian-second-memory]]).

## 5. Eksekusi Poin 1 `v2.0` (2026-11-25)
- Menambahkan `impactMetrics` serta tab **Pratinjau UI** (device mockup seluler & portal web) untuk seluruh 5 proyek utama di `projectShowcase.js`.
- Membangun `src/modules/githubShowcase.js` yang menarik repositori publik live `@syamban14` via GitHub REST API (dengan cache `sessionStorage`, pencarian, filter kategori, dan tautan demo langsung ke `step-100-3d` & `beach-3d`).
- Menautkan repositori GitHub di `aiAgent.js`, `commandPalette.js`, `#contact`, dan ringkasan CV cetak.

## 6. Penundaan Poin 2 & Eksekusi Poin 3 `v2.0` (2026-11-25)
- Pengguna meminta **Poin 2 (Live LLM API)** dilewati sementara hingga provider LLM siap, dan langsung mengerjakan **Poin 3**.
- Mengganti layer karakter statis dengan rig kanvas 2x DPR (`#workspaceCharCanvas`) pada koordinat terkalibrasi (`character_anime_clean.png` 576x1024): kedipan mata natural berkala, ekspresi tersenyum saat disapa (`#workspaceGreetBtn`), lip-sync mulut saat berdialog/AI streaming, serta *rim-light* `source-atop` yang beradaptasi terhadap lampu meja dan waktu (`Pagi | Senja | Malam`).
- Menyempurnakan diorama ruangan (`#workspaceCanvas`): langit jendela dua panel (bintang, bulan sabit, bintang jatuh, awan senja/pagi, sorot matahari), bayangan lantai dinamis di bawah sepatu karakter, serta layar laptop interaktif dengan bar kode dan equalizer AI.

## 7. Eksekusi Poin 4 `v2.0` — Dwibahasa `ID | EN` & Unduhan CV ATS PDF (2026-11-25)
- Membangun modul `src/data/i18n.js` yang menerjemahkan secara reaktif seluruh UI, biodata, 5 simulasi proyek + mockup UI, repositori GitHub, scrubber timeline, composer brief, menu perintah `Cmd+K`, dan AI Playground via tombol **`ID | EN`** di header (maupun perintah `/en` & `/id`).
- Membuat skrip generator zero-dependency `scripts/generate-ats-cv.mjs` menghasilkan dua file PDF 1.4 standar ATS 1-halaman (`M-Syamsul-CV-ATS-ID.pdf` & `M-Syamsul-CV-ATS-EN.pdf`) yang tersinkron dengan tautan unduhan dan tampilan cetak `@media print`.

## 8. Eksekusi Poin 5 `v2.0` — Open Graph, SEO Schema.org, Sitemap & README (2026-11-25)
- Membuat gambar preview sosial `public/og-preview.png` (`1200x630`) dari tampilan diorama `Malam`.
- Menambahkan meta `canonical`, Open Graph, Twitter Card (`summary_large_image`), serta structured data JSON-LD `@graph` (`ProfilePage` & `Person`) ke `index.html`.
- Menambahkan `public/robots.txt`, `public/sitemap.xml`, dan `README.md` pada repositori `syamban14/my-portofolio`.

## 9. Penyempurnaan Header & Jam Studio Otomatis (2026-11-26)
- Memindahkan toggle bahasa (`ID | EN` / `#langSwitch`) ke posisi paling kanan pada `.header-controls` (desktop maupun mobile).
- Menghapus tombol `Menu cepat` (`#commandTriggerBtn`) dari header untuk menjaga bar navigasi tetap ringkas; pintasan keyboard `Cmd/Ctrl + K` tetap tersedia sebagai akses sekunder.
- Mengubah mode waktu studio (`Pagi | Senja | Malam`) agar secara default mengikuti jam lokal pengunjung (`05:00-15:59` Pagi, `16:00-18:29` Senja, `18:30-04:59` Malam) dengan sinkronisasi berkala setiap 60 detik, namun tetap dapat diganti secara manual lewat tombol atau perintah slash AI (`/pagi`, `/senja`, `/malam`, `/day`, `/dusk`, `/night`).
- Status Poin 2 (Live LLM API Proxy) tetap ditunda sesuai arahan pengguna.

## 10. Ekspansi 15 Keahlian & Penghapusan Angka Persentase (2026-11-26)
- Menambahkan 5 keahlian baru: **PostgreSQL**, **SQLite** (Database), **Go** (Language), **Docker**, dan **REST / RESTful API** (Tech), sehingga total menjadi 15 keahlian aktif dwibahasa (`ID | EN`).
- Menghapus seluruh angka persentase (`%`) dan progress bar skor diri pada konstelasi keahlian, inspector AI, ringkasan hotspot, lembar cetak CV, serta file ATS CV PDF (`M-Syamsul-CV-ATS-ID.pdf` & `M-Syamsul-CV-ATS-EN.pdf`).
- Mengganti visualisasi dengan kode monogram teknologi pada simpul graf serta fokus pada jumlah proyek terkait dan konteks penggunaan nyata di produksi.

## 11. Konstelasi Keahlian 3-Tingkat Berpusat pada Karakter M. Syamsul (2026-11-26)
- Mengubah arsitektur graf `#skillCanvas` menjadi hierarki 3 tingkat: **Potret Medali Karakter (`character_anime_clean.png` crop setengah badan, tanpa latar ruangan)** di pusat → **4 Hub Kategori (`AI`, `Language`, `Database`, `Tech`)** → **15 Simpul Keahlian** di lapisan luar.
- Menghapus garis *peer-to-peer* antarsimpul yang padat sehingga setiap simpul keahlian terhubung rapi hanya melalui hub kategorinya.
- Klik pada medali karakter pusat memicu denyut koneksi lengkap dan berputar antar kategori; klik hub kategori memilih keahlian unggulan di kategori tersebut.

## 12. Redesain Visual-First Atmospheric Glass & Bento Studio (2026-11-26)
- Menambahkan lapisan visual dot-grid halus, pendar cahaya ambient adaptif sesuai waktu (`Pagi`, `Senja`, `Malam`) di `tokens.css`, panel glassmorphism (`backdrop-filter: blur(14px)`), bayangan bertingkat, ikon SVG per domain, serta scroll-reveal `IntersectionObserver`.
- Memangkas kepadatan teks ~60% menjadi *Visual-First*: menambahkan Bento strip 4 metrik bergambar di Hero, mengubah daftar 15 tombol skill menjadi 4 ubin ringkas per kategori, menjadikan `Pratinjau UI` (*device mockup*) mode bawaan proyek, mengubah daftar riwayat menjadi kartu berikon + chip tag, dan menyederhanakan panel kontak menjadi grid 2×2 interaktif.

## 13. Zoom-In Kamera ke Layar Laptop OS pada Hotspot #3 (2026-11-26)
- Mengubah interaksi titik Hotspot #3 (`laptop-projects` / Monitor Proyek BCS & doklinc) agar melakukan animasi zoom-in kamera (`scale(2.85)`) menuju area meja laptop dan membuka antarmuka **`SyamsulOS · Monitor Proyek`** (`#workspaceLaptopOs`) langsung di panggung utama.
- Pengunjung dapat mengganti kelima aplikasi di dock laptop (`Presensi Online`, `Kesehatan doklinc`, `Ujian Online`, `Test Online Masuk`, `Aplikasi Surat`), berpindah antara `Layar Utama` dan `Data & Log`, lompat ke simulasi penuh (`#projects`), atau keluar kembali ke ruangan lewat tombol `Keluar dari Laptop` maupun tombol keyboard `ESC`.

## 14. Zoom-In Kamera ke Rancangan Infrastruktur & Ruangan Server pada Hotspot #4 (2026-11-26)
- Mengubah interaksi titik Hotspot #4 (`infra-lp3i` / Server & Infrastruktur LP3I pada `75% 66%`) agar mengarahkan zoom-in kamera (`data-zoom-mode="infra"`, `transform-origin: 75% 66%`, `scale(2.85)`) menuju area rak server & jaringan.
- Menambahkan antarmuka **Ruangan Server & Rancangan Infrastruktur** langsung pada panggung utama dengan dua mode tab (`Rak & Ruangan Server` dan `Rancangan Topologi`), 4 unit blade interaktif (`U01 · BCS-APP-DOCKER`, `U02 · DB-PROD-CLUSTER`, `U03 · LP3I-CAMPUS-SRV`, `U04 · NET-CORE-SWITCH`), simulasi **`Uji Ping Server`** langsung, pintasan menuju `#experience`, serta tombol `Keluar dari Ruangan Server` / `ESC`.
