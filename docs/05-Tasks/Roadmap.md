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

### Poin 2 — Upgrade "Tanya AI Syamsul"
- [ ] Perkuat logika penalaran lokal dwibahasa (ID/EN), memori percakapan, & perbandingan arsitektur proyek
- [ ] Tambahkan opsi koneksi LLM API/Serverless Proxy (endpoint + status aktif) dengan fallback lokal otomatis

### Poin 3 — Visual Karakter & Diorama Lebih Hidup
- [ ] Tambahkan animasi kedipan mata natural & reaksi ekspresi karakter di `livingWorkspace.js`
- [ ] Tambahkan *rim-light* dinamis pada karakter yang berubah sesuai sakelar lampu meja & mode `Pagi/Senja/Malam`
- [ ] Tambahkan denyut layar laptop interaktif saat AI berpikir / hotspot aktif

### Poin 4 — Dukungan Dwibahasa (`ID | EN`) & Export CV ATS-Friendly
- [ ] Buat sistem lokalisasi `src/data/i18n.js` + sakelar `ID | EN` di header
- [ ] Terjemahkan seluruh elemen UI, data biodata, proyek, & AI response ke Bahasa Inggris profesional
- [ ] Perbarui template CV ATS-Friendly (`print-cv-sheet`) + tombol ekspor PDF/cetak sesuai bahasa aktif

### Poin 5 — Open Graph Preview Card, SEO Schema.org, & Optimasi URL
- [ ] Buat aset kartu sosial `public/og-preview.png` (`1200x630`)
- [ ] Tambahkan meta tags `og:*`, `twitter:card`, `canonical`, dan JSON-LD `Person` di `index.html`
- [ ] Validasi final dengan `npm run build`, audit browser desktop + mobile, lalu commit & push otomatis ke GitHub Pages
