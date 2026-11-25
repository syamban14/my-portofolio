---
title: ADR-004 Rencana Arsitektur 5 Poin Improvement v2.0
created: 2026-11-25
status: proposed
tags:
  - my-portofolio
  - adr
  - v2
  - roadmap
---

# ADR-004: Keputusan Arsitektur untuk 5 Poin Improvement (`v2.0`)

> Kembali ke [[00-Home]] | PRD: [[PRD]] | Roadmap: [[Roadmap]]

## Status
**Proposed (Siap Dieksekusi)**

## Konteks
Setelah peluncuran `v1.0` di `https://syamban14.github.io/my-portofolio/`, teridentifikasi 5 area peningkatan agar portofolio mencapai standar *top-tier AI & Software Engineer* sekaligus menarik peluang *Remote Work* dan klien lokal/global.

## Keputusan Rancangan (5 Poin)

1. **Integrasi GitHub Live & Impact Metrics (`githubShowcase.js` + `portfolioData.js`)**
   - Fetch repositori publik `@syamban14` dari `https://api.github.com/users/syamban14/repos?sort=updated&per_page=12` dengan cache `sessionStorage` + fallback kurasi lokal (termasuk `hermes-mix-ai`, `mixa-frontend`, `mixa-backend`, `step-100-3d`, `beach-3d`, `qhse-app`, `bcs-fit`).
   - Menambahkan **Impact Metrics** dan preview mockup UI interaktif pada 5 proyek utama di `projectShowcase.js`.

2. **Hybrid AI Playground + Optional Real LLM Proxy (`aiAgent.js`)**
   - Memperluas *knowledge graph* lokal agar mendukung konteks multi-giliran, komparasi teknis, dan dukungan dwibahasa (`ID | EN`).
   - Menambahkan panel konfigurasi *optional custom LLM endpoint* (kompatibel Gemini Flash / Cloudflare Worker proxy) dengan status koneksi jelas dan fallback instan ke mesin lokal bila belum dihubungkan.

3. **Animasi Karakter & Diorama Lebih Hidup (`livingWorkspace.js`)**
   - Menambahkan efek kedipan mata karakter pada kanvas overlay terkalibrasi, pencahayaan *rim-light* dinamis pada tubuh karakter sesuai sakelar lampu meja & waktu (`Pagi/Senja/Malam`), animasi layar laptop meja yang berdenyut ketika AI bekerja, serta variasi ekspresi sapaan.

4. **Dukungan Dwibahasa (`ID | EN`) & Export CV ATS-Friendly (`i18n.js` + `print-cv-sheet`)**
   - Sakelar `ID | EN` di header (tersimpan di `localStorage`) yang memperbarui seluruh label UI, hero, riwayat kerja, keahlian, proyek, AI Agent, dan template brief kolaborasi secara instan.
   - Mode cetak / unduhan **CV ATS-Friendly 1 Halaman** yang rapi dan mengikuti bahasa aktif (`ID` atau `EN`).

5. **Open Graph Social Card, SEO Schema.org, & Optimasi URL (`index.html` + `public/og-preview.png`)**
   - Membuat gambar preview `og-preview.png` (`1200x630`), melengkapi meta `og:*` & `twitter:*`, menyematkan JSON-LD `Person`, dan menyiapkan opsi mirror/deploy ke root `syamban14.github.io` apabila diinginkan.

## Konsekuensi
- **Positif:** Seluruh karya terbaru di GitHub otomatis terekspos, rekruter internasional terbantu lewat mode `EN` + CV ATS, tautan tampil profesional di LinkedIn/WhatsApp, dan ruang kerja terasa jauh lebih hidup.
- **Perhatian:** Setiap penambahan modul di `v2.0` wajib menjaga disiplin tipografi (2 font, 3 body sizes), `base: './'`, nol horizontal overflow di `390px`, dan diverifikasi visual via browser sebelum push ke GitHub Pages.
