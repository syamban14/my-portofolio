---
title: ADR-001 Obsidian sebagai Second Memory Lokal
created: 2026-11-25
status: accepted
tags:
  - my-portofolio
  - adr
  - obsidian
---

# ADR-001: Obsidian Second Memory di Folder Lokal `docs/`

> Kembali ke [[00-Home]] | Diskusi terkait: [[2026-11-25-kickoff-and-v1-release]]

## Status
**Accepted**

## Konteks
Keputusan arsitektur, rincian data portofolio yang diambil dari `http://103.93.160.96:8082/`, struktur modul interaktif, alur deploy GitHub Pages, serta rencana 5 poin improvement (`v2.0`) berisiko hilang atau terpotong jika hanya tersimpan di riwayat percakapan.

## Keputusan
1. Menyimpan seluruh dokumentasi, PRD, arsitektur, ADR, log diskusi, dan roadmap dalam format Markdown terhubung (`[[wikilinks]]` + YAML frontmatter) di folder lokal `my_portofolio/docs/`.
2. Menjadikan `my_portofolio/docs/` sebagai **Obsidian Vault mandiri** lengkap dengan `.obsidian/` yang mengikuti standar vault project lain (`tufa_cafe/docs/` dan `TrollTowerObby/docs/`).
3. Selalu memperbarui [[Roadmap]] dan ADR setiap kali perubahan besar atau fitur `v2.0` diterapkan dan di-push ke GitHub.

## Konsekuensi
- **Positif:** Konteks desain, riwayat keputusan teknis, dan checklist pengerjaan tersimpan permanen berdampingan dengan kode sumber `src/`.
- **Negatif:** Perubahan fitur atau data baru pada portofolio harus ikut dicatat di [[PRD]] atau [[Roadmap]] agar Second Memory tetap akurat.
