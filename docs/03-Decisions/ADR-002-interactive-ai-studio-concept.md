---
title: ADR-002 Konsep Interactive AI Studio & Living Workspace
created: 2026-11-25
status: accepted
tags:
  - my-portofolio
  - adr
  - ui-ux
---

# ADR-002: Pemilihan Konsep Interactive AI Studio & Living Workspace

> Kembali ke [[00-Home]] | PRD: [[PRD]]

## Status
**Accepted**

## Konteks
Pengguna meminta portofolio yang "unik dan hidup, bukan cuma tulisan, tetapi bisa lebih interaktif" berdasarkan data dari `http://103.93.160.96:8082/`. Terdapat tiga kandidat konsep:
1. **Interactive AI Studio & Living Workspace** *(Dipilih)*
2. Developer OS (Web Desktop Window Manager)
3. 3D Spatial World penuh (Three.js)

## Keputusan
Memilih konsep **Interactive AI Studio & Living Workspace** karena paling merepresentasikan identitas M. Syamsul sebagai **IT Programmer & AI Specialist**, tetap sangat cepat dimuat (`60fps`), nyaman di desktop maupun mobile (`390px`), dan memaksimalkan aset asli `room_anime_bg.png` + `character_anime_clean.png` (sementara aset `.glb` di server sumber mengembalikan `404`).

## Konsekuensi
- **Positif:** Pengunjung langsung berinteraksi sejak layar pertama lewat diorama ruang kerja 2.5D, mode waktu (`Pagi | Senja | Malam`), Tanya AI Syamsul, konstelasi keahlian berbasis fisika, dan simulasi 5 proyek nyata.
- **Negatif:** Tanpa `.glb` 3D aktif, animasi karakter perlu diperkaya lewat efek kanvas/CSS berlapis (masuk dalam agenda **Poin 3** di [[ADR-004-v2-five-improvements-plan]]).
