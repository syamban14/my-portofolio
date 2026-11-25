---
title: ADR-003 Stack Vite Vanilla Modern JS & Deploy GitHub Pages
created: 2026-11-25
status: accepted
tags:
  - my-portofolio
  - adr
  - vite
  - github-pages
---

# ADR-003: Stack Vite + Vanilla ES Modules + GitHub Pages (`syamban14/my-portofolio`)

> Kembali ke [[00-Home]] | Arsitektur: [[Overview]]

## Status
**Accepted**

## Konteks
Portofolio akan di-host gratis di **GitHub Pages (HTTPS)** sementara sumber data awal berada di IP HTTP (`http://103.93.160.96:8082/`). Selain itu, repositori lama `syamban14/syamban14.github.io` sudah ada sehingga perlu diputuskan target repository serta bundler-nya.

## Keputusan
1. Menggunakan **Vite + Vanilla Modern JS (ES Modules) + HTML5 Canvas + CSS Custom Properties** tanpa framework berat, agar animasi kanvas `60fps` ringan dan mudah dirawat.
2. Menyalin `data.json`, `character_anime_clean.png`, dan `room_anime_bg.png` secara lokal ke `public/` agar **zero mixed-content block** saat tayang di HTTPS.
3. Mengatur `base: './'` di `vite.config.js` agar aset termuat sempurna di subpath `https://syamban14.github.io/my-portofolio/`.
4. Membuat repositori baru publik `syamban14/my-portofolio` dengan deployment otomatis GitHub Actions (`.github/workflows/deploy.yml`).

## Konsekuensi
- **Positif:** Build cepat (`~104ms`), bundle kecil (`~57 KB` JS ter-minify), bebas ketergantungan server IP asal, dan deploy otomatis setiap push ke `main`.
- **Negatif:** Alamat utama berada di subpath `/my-portofolio/` (opsi sinkronisasi ke root `syamban14.github.io` atau custom domain dicatat sebagai bagian dari `v2.0`).
