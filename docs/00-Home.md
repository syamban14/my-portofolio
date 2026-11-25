---
title: My Portofolio - Second Memory Home
created: 2026-11-25
status: active
tags:
  - my-portofolio
  - moc
  - home
---

# M. Syamsul Portofolio — Second Memory (Lokal)

Dashboard utama dokumentasi, spesifikasi produk, keputusan arsitektur (ADR), log pengerjaan, serta rencana pengembangan portofolio interaktif **M. Syamsul (IT Programmer & AI Specialist)**. Seluruh catatan disimpan lokal di folder `docs/` agar sinkron dengan kode sumber di `/Users/syamban/Documents/my_portofolio` dan dapat dibuka langsung sebagai **Obsidian Vault**.

## Ringkasan Status Proyek

- **Versi Live Saat Ini:** `v1.0` — Tayang di `https://syamban14.github.io/my-portofolio/`
- **Repositori GitHub:** `https://github.com/syamban14/my-portofolio` (branch `main`, deploy otomatis via GitHub Actions)
- **Sumber Data Awal:** `http://103.93.160.96:8082/` (`data.json`, `character_anime_clean.png`, `room_anime_bg.png`)
- **Fase Berikutnya:** `v2.0` — Implementasi 5 poin improvement (siap dijalankan setelah tinjauan catatan ini)

## Peta Dokumen (Map of Content)

### 1. Produk & Konten
- [[PRD]] — Spesifikasi lengkap profil M. Syamsul, fitur interaktif `v1.0`, serta detail 5 poin improvement `v2.0`.

### 2. Arsitektur & Desain Teknis
- [[Overview]] — Struktur folder kode Vite + ES Modules, sistem token desain (`Pagi | Senja | Malam`), modul interaktif, CI/CD GitHub Actions, dan blueprint perubahan `v2.0`.

### 3. Catatan Keputusan (ADR)
- [[ADR-001-obsidian-second-memory]] — Penggunaan folder lokal `my_portofolio/docs/` sebagai Obsidian Vault Second Memory.
- [[ADR-002-interactive-ai-studio-concept]] — Pemilihan konsep **Interactive AI Studio & Living Workspace** dibanding Developer OS atau 3D Spatial World penuh.
- [[ADR-003-vite-vanilla-canvas-stack]] — Pemilihan tech stack **Vite + Vanilla Modern JS/Canvas + CSS**, bundel aset lokal anti mixed-content, dan deploy `syamban14/my-portofolio` via GitHub Pages.
- [[ADR-004-v2-five-improvements-plan]] — Keputusan arsitektur untuk 5 poin improvement `v2.0` (Live GitHub + Impact Metrics, Upgrade AI Playground, Hidupnya Karakter/Diorama, Dwibahasa ID/EN + CV ATS, serta Open Graph & SEO Schema).

### 4. Log Diskusi
- [[2026-11-25-kickoff-and-v1-release]] — Kronologi penuh dari pengambilan data `103.93.160.96:8082`, audit visual lokal, peluncuran `v1.0` ke GitHub Pages, hingga perumusan 5 poin improvement `v2.0`.

### 5. Tugas & Progres
- [[Roadmap]] — Checklist progres Phase 1 (`v1.0` selesai) dan backlog eksekusi terstruktur Phase 2 (`v2.0` — 5 poin improvement).

---

## Cara Membuka di Obsidian (Lokal)

1. Buka aplikasi **Obsidian** di macOS Anda.
2. Pilih **Open folder as vault** (atau *Manage vaults* -> *Open*).
3. Arahkan ke folder:
   `/Users/syamban/Documents/my_portofolio/docs`
4. Obsidian akan langsung membuka `00-Home.md` dan mengaktifkan seluruh `[[wikilinks]]`, graf relasi, dan tags.
