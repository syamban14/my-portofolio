---
title: Arsitektur Teknis & Desain Portofolio
created: 2026-11-25
status: active
tags:
  - my-portofolio
  - architecture
  - vite
  - canvas
---

# Arsitektur Teknis & Desain — Interactive AI Studio

> Kembali ke [[00-Home]] | PRD: [[PRD]] | ADR Stack: [[ADR-003-vite-vanilla-canvas-stack]]

## 1. Struktur Repositori (`/Users/syamban/Documents/my_portofolio`)

```text
my_portofolio/
├── .github/workflows/deploy.yml   # Build Vite & deploy ke GitHub Pages
├── docs/                          # Obsidian Second Memory Vault (lokal)
├── public/
│   ├── assets/
│   │   ├── character_anime_clean.png
│   │   └── room_anime_bg.png
│   ├── data.json                  # Salinan lokal data sumber 103.93.160.96:8082
│   └── favicon.svg                # Monogram MS
├── src/
│   ├── data/portfolioData.js      # Dataset terstruktur (pengalaman, skill, proyek, hotspot)
│   ├── modules/
│   │   ├── livingWorkspace.js     # Diorama 2.5D, window sky/stars, lamp cone, hotspots
│   │   ├── aiAgent.js             # Chat AI + slash commands + Context Inspector
│   │   ├── skillGraph.js          # Konstelasi fisika kanvas + filter + inspector
│   │   ├── projectShowcase.js     # Simulasi 5 proyek + arsitektur 3-layer
│   │   ├── timelineScrubber.js    # Filter & slider tahun 2011 - 2026
│   │   ├── collaborationComposer.js # Composer WhatsApp/Email/Copy + Print CV
│   │   ├── commandPalette.js      # Modal navigasi cepat Cmd+K / Ctrl+K
│   │   └── soundEngine.js         # Synthesizer Web Audio API tanpa dependensi
│   ├── styles/
│   │   ├── tokens.css             # Token tema Pagi / Senja / Malam + tipografi
│   │   └── main.css               # Layout responsif & print stylesheet
│   └── main.js                    # Orkestrator aplikasi & sinkronisasi antar modul
├── index.html
├── package.json
└── vite.config.js                 # base: './' agar aset relatif aman di subpath Pages
```

## 2. Sistem Desain & Disiplin UI (`tokens.css` & `main.css`)

- **3 Suasana Studio (`data-studio-time`):**
  - `malam` *(Default)*: Deep Marine Obsidian (`#071118` / `#0d1c26`, aksen `#18d2b6`, cahaya lampu `#ffb454`).
  - `senja`: Harbor Dusk Cilegon (`#101824` / `#182436`, aksen `#ff8a4c`).
  - `pagi`: Crisp Gallery Daylight (`#f3f7f9` / `#ffffff`, teks `#0b1922`, aksen `#007a6c`).
- **Tipografi Ketat:** Maksimal 2 font (`Space Grotesk` + `Plus Jakarta Sans`), `font-variant-numeric: tabular-nums` untuk angka/persentase/tahun, dan hanya 3 step ukuran di bawah hero `<h1>` (`--text-heading`, `--text-body: 1rem`, `--text-sm: 0.875rem`).
- **Higiene UI:** Nol pre-heading eyebrow, nol dekorasi tag/chip non-interaktif, transisi eksplisit (`180ms cubic-bezier(0.22, 1, 0.36, 1)`), dan `@media (prefers-reduced-motion: reduce)`.

## 3. Rancangan Perubahan Arsitektur untuk `v2.0` (5 Poin Improvement)

1. **`src/data/i18n.js` & perluasan `portfolioData.js`** *(Poin 1 & 4)*:
   - Kamus dwibahasa `id` & `en` mencakup UI chrome, hero, pengalaman, proyek, keahlian, penghargaan, dan template brief kolaborasi.
   - Penambahan `impactMetrics` dan data *fallback* repositori GitHub `@syamban14` (`hermes-mix-ai`, `mixa-frontend`, `step-100-3d`, `beach-3d`, `qhse-app`, `bcs-fit`).
2. **`src/modules/githubShowcase.js`** *(Poin 1)*:
   - Mengambil repositori publik terbaru via GitHub REST API dengan caching `sessionStorage` (`TTL 15 menit`) dan filter bahasa/pencarian, merender kartu repo nyata di dalam bagian proyek/karya terbuka.
3. **`src/modules/livingWorkspace.js`** *(Poin 3)*:
   - Penambahan *canvas layer* di atas/sekitar karakter untuk kedipan mata berkala, proyeksi cahaya lampu meja (`rim-light` hangat di sisi kiri karakter), status terminal laptop menyala di koordinat meja, dan reaksi visual saat AI aktif/berbicara.
4. **`src/modules/aiAgent.js`** *(Poin 2 & 4)*:
   - Dukungan dwibahasa penuh, *conversation context memory*, komparasi teknis, dan dukungan opsional koneksi ke LLM endpoint (Cloudflare Worker / Gemini API URL) dengan fallback deterministik lokal.
5. **`index.html` + `public/og-preview.png` + `print-cv-sheet`** *(Poin 4 & 5)*:
   - Penambahan meta Open Graph, Twitter Card, JSON-LD `Person`, tombol unduh/cetak **CV ATS-Friendly** terlokalisasi (`ID`/`EN`), serta kartu preview visual yang valid saat dibagikan.
