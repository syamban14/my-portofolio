---
title: PRD Portofolio Interaktif M. Syamsul
created: 2026-11-25
status: active
tags:
  - my-portofolio
  - prd
  - v1
  - v2
---

# PRD — Portofolio Interaktif M. Syamsul (Interactive AI Studio & Living Workspace)

> Kembali ke [[00-Home]] | Arsitektur: [[Overview]] | Roadmap: [[Roadmap]]

## 1. Profil Pemilik & Sumber Data Fakta

Seluruh fakta biodata diekstrak dari `http://103.93.160.96:8082/data.json` dan disalin lokal ke `public/data.json` + `src/data/portfolioData.js`:

- **Nama:** M. Syamsul (`M. SYAMSUL`)
- **Peran:** IT Programmer & AI Specialist
- **Tagline:** *"Membangun solusi digital yang memberdayakan UMKM dan institusi."*
- **Lokasi:** Cilegon, Banten, Indonesia
- **Kontak:** `+62 821-1157-9944` · `Syamsuliki.48@gmail.com` · `linkedin.com/in/m-syamsul` · `Syamsul14.blogspot.com`
- **Pengalaman Kerja:**
  1. **PT. BCS Logistics** — IT Programmer (`Agustus 2024 - Agustus 2026`, Cilegon): Aplikasi Presensi Online Android & iOS, aplikasi kesehatan `doklinc`, maintenance & pengembangan web, debugging & database.
  2. **LP3I Business College** — IT Support (`Januari 2017 - Agustus 2024`, Cilegon): Program kerja tahunan IT, infrastruktur jaringan/hardware/software, dukungan teknis harian, aplikasi internal institusi.
- **Keahlian (10 Kompetensi):**
  - **AI:** AI Agent Dev (`92%`), Prompt Engineering (`90%`), AI API Integration (`88%`)
  - **Language:** Python (`90%`), PHP (`88%`), JavaScript (`85%`)
  - **Database:** MySQL (`85%`)
  - **Tech:** IT Support (`92%`), Web & Mobile Dev (`90%`), Networking (`80%`)
- **5 Proyek Utama:** Presensi Online (BCS Logistics), Aplikasi Kesehatan `doklinc` (Masyarakat Cilegon), Aplikasi Ujian Online (LP3I College), Aplikasi Test Online Masuk (LP3I College), Aplikasi Surat (LP3I College).
- **Sertifikasi:** *AI Productivity and AI API Integration for Developers - Hacktiv8* (`Agustus 2025`).
- **Pendidikan:** S1 Sistem Informasi STMIK Bina Sarana Global (`IPK 3.32`, `2014 - 2016`), D3 Manajemen Informatika Politeknik LP3I Bandung (`IPK 2.92`, `2011 - 2014`).
- **Penghargaan:** Juara 1 Lomba PTK PNFI Kota Cilegon (`2017`), Juara 3 Lomba PTK PNFI Provinsi Banten (`2018`), Mahasiswa Berprestasi Futsal LP3I College (`2011`).

---

## 2. Cakupan Fitur `v1.0` (Sudah Live di GitHub Pages)

1. **Living Workspace Diorama 2.5D (`#home`)**: Ruang kerja parallax interaktif dengan latar [room_anime_bg.png] + karakter [character_anime_clean.png], canvas atmosfer dinamis (`Pagi | Senja | Malam`), sakelar lampu meja, dan 5 hotspot bernomor.
2. **Tanya AI Syamsul (`#ai-studio`)**: Asisten interaktif dengan 5 preset prompt, respons streaming, perintah studio (`/pagi`, `/senja`, `/malam`, `/lampu`, `/cetak`), dan *Context Inspector* dinamis.
3. **Konstelasi Keahlian Interaktif (`#skills`)**: Graf fisika pegas `<canvas>` dengan simpul yang dapat diseret dan filter kategori (`Semua`, `AI`, `Language`, `Database`, `Tech`) yang tertaut langsung ke proyek terkait.
4. **Simulasi 5 Proyek & Arsitektur (`#projects`)**: Prototipe interaktif untuk kelima aplikasi ditambah tampilan arsitektur 3 lapisan (*Client -> App -> Database*).
5. **Scrubber Jejak Karir 2011 - 2026 (`#experience`)**: Filter kategori + slider rentang tahun.
6. **Composer Kolaborasi & Menu Cepat (`#contact` & `Cmd+K`)**: Pembentuk brief otomatis ke WhatsApp/Email/Clipboard, tombol salin kontak, cetak CV 1 halaman, serta suara taktil Web Audio API (default mati).

---

## 3. Spesifikasi 5 Poin Improvement `v2.0` (Target Eksekusi Berikutnya)

### Poin 1 — Bukti Teknis Nyata & Integrasi GitHub Live (`@syamban14`)
- Mengintegrasikan portofolio dengan GitHub REST API (`https://api.github.com/users/syamban14/repos`) untuk menarik daftar repositori publik terbaru secara langsung (dengan fallback data statis terkurasi agar tetap tangguh saat limit API atau offline).
- Menonjolkan proyek kode terbuka penting dari akun `@syamban14`, antara lain `hermes-mix-ai`, `mixa-frontend`, `mixa-backend`, `step-100-3d`, `beach-3d`, `qhse-app`, dan `bcs-fit`.
- Menambahkan **Impact Metrics & Mockup Visual UI** pada masing-masing dari 5 proyek utama (ringkasan skala penggunaan/manfaat operasional + pratinjau antarmuka SVG/interaktif).

### Poin 2 — Upgrade "Tanya AI Syamsul" ke Hybrid Deep Knowledge + Live LLM
- Memperkuat mesin tanya-jawab lokal agar mendukung **penalaran multi-topik, perbandingan stack, bahasa Indonesia & Inggris, dan memori konteks percakapan**.
- Menyediakan jalur integrasi **Live Gemini / Serverless Proxy** (opsional melalui endpoint yang dapat dikonfigurasi + tombol pengaturan/uji endpoint di AI Studio) dengan fallback otomatis ke mesin pengetahuan terstruktur jika proxy belum diatur.

### Poin 3 — Visual Karakter & Diorama Lebih Hidup
- Menghidupkan [character_anime_clean.png] melalui **kompositing kanvas/CSS berlapis**:
  - Efek kedipan mata natural (*blink cycle*) secara berkala di posisi mata karakter tanpa merusak ilustrasi asli.
  - Pencahayaan *rim-light* dan bayangan tubuh karakter yang beradaptasi real-time terhadap mode `Pagi / Senja / Malam` serta status **Lampu Meja Nyala/Mati**.
  - Layar laptop interaktif di meja yang menampilkan denyut kode/status terminal saat diklik atau saat AI sedang berpikir, serta reaksi ekspresi karakter ketika menyapa atau menerima pertanyaan.

### Poin 4 — Dukungan Dwibahasa (`ID | EN`) & Unduhan CV ATS-Friendly
- Menambahkan sakelar bahasa **`ID | EN`** di header yang menerjemahkan seluruh navigasi, teks UI, data pengalaman, deskripsi proyek, serta respons AI Syamsul ke Bahasa Inggris profesional untuk kebutuhan *Remote Work* global.
- Memperbaiki dan memperkaya mode cetak **CV ATS-Friendly** serta menyediakan generator/unduhan dokumen ringkasan CV bersih (1 halaman terstruktur sesuai standar ATS) dalam bahasa sesuai pilihan (`ID` atau `EN`).

### Poin 5 — Open Graph Preview Card, SEO Schema.org, & Optimasi URL
- Membuat aset gambar preview sosial (`public/og-preview.png` atau SVG/PNG `1200x630`) yang representatif dan menyematkan tag meta lengkap (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`) agar tautan tampil kaya saat dibagikan ke WhatsApp, LinkedIn, atau Discord.
- Menyematkan `application/ld+json` (`Person` & `ProfilePage` Schema.org) di `index.html`.
- Menambahkan opsi/catatan sinkronisasi URL utama (`syamban14.github.io` jika kelak dipromosikan ke root domain).
