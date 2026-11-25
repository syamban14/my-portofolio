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
