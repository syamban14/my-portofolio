import fs from 'node:fs';
import path from 'node:path';

/**
 * Generates clean, selectable-text, single-page A4 ATS-Friendly PDF resumes
 * in both Indonesian (ID) and English (EN) using built-in Type1 Helvetica fonts.
 */

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 48;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

function escapePdfText(text) {
  return String(text)
    .replace(/[^\x20-\x7E]/g, (ch) => {
      if (ch === '\u00b7') return '-';
      if (ch === '\u2013' || ch === '\u2014') return '-';
      return ' ';
    })
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapText(text, maxChars) {
  const words = text.trim().split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function buildPdfBuffer(ops) {
  const contentStream = ops.join('\n');
  const objects = [];

  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  objects.push(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj`
  );
  objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');
  objects.push(
    `6 0 obj\n<< /Length ${Buffer.byteLength(contentStream, 'utf8')} >>\nstream\n${contentStream}\nendstream\nendobj`
  );

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += `${obj}\n`;
  }

  const xrefStart = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  return Buffer.from(pdf, 'utf8');
}

function renderCvPdf(spec) {
  const ops = [];
  let y = PAGE_H - 46;

  function drawText(text, x, fontSize, font = 'F1', color = '0.09 0.12 0.15') {
    ops.push(`BT /${font} ${fontSize} Tf ${color} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escapePdfText(text)}) Tj ET`);
  }

  function drawDivider() {
    ops.push(`0.78 0.82 0.85 RG 0.7 w ${MARGIN_X} ${(y + 4).toFixed(2)} m ${(PAGE_W - MARGIN_X).toFixed(2)} ${(y + 4).toFixed(2)} l S`);
    y -= 10;
  }

  function addSection(title) {
    y -= 6;
    drawText(title, MARGIN_X, 11, 'F2', '0.02 0.36 0.34');
    y -= 8;
    drawDivider();
  }

  function addParagraph(text, fontSize = 9.5, maxChars = 98, indent = 0, font = 'F1') {
    const lines = wrapText(text, maxChars);
    for (const line of lines) {
      drawText(line, MARGIN_X + indent, fontSize, font);
      y -= fontSize + 3.4;
    }
  }

  // Header
  drawText(spec.name, MARGIN_X, 18, 'F2', '0.05 0.08 0.12');
  y -= 16;
  drawText(spec.role, MARGIN_X, 11, 'F2', '0.02 0.36 0.34');
  y -= 14;
  drawText(spec.contactLine1, MARGIN_X, 9, 'F1', '0.25 0.30 0.35');
  y -= 12;
  drawText(spec.contactLine2, MARGIN_X, 9, 'F1', '0.25 0.30 0.35');
  y -= 12;

  // Summary
  addSection(spec.headers.summary);
  addParagraph(spec.summary, 9.5, 98);

  // Core Skills
  addSection(spec.headers.skills);
  for (const row of spec.skills) {
    addParagraph(row, 9.3, 98);
  }

  // Experience
  addSection(spec.headers.experience);
  for (const exp of spec.experience) {
    drawText(exp.heading, MARGIN_X, 10, 'F2');
    y -= 12;
    drawText(exp.meta, MARGIN_X, 8.8, 'F1', '0.32 0.38 0.43');
    y -= 12;
    for (const bullet of exp.bullets) {
      addParagraph(`- ${bullet}`, 9.2, 95, 8);
    }
    y -= 4;
  }

  // Key Projects & Open Source
  addSection(spec.headers.projects);
  for (const proj of spec.projects) {
    addParagraph(`- ${proj}`, 9.2, 95, 6);
  }

  // Education, Certifications, Awards
  addSection(spec.headers.education);
  for (const edu of spec.education) {
    addParagraph(`- ${edu}`, 9.2, 95, 6);
  }

  addSection(spec.headers.certs);
  for (const cert of spec.certs) {
    addParagraph(`- ${cert}`, 9.2, 95, 6);
  }

  return buildPdfBuffer(ops);
}

const cvId = {
  name: 'M. SYAMSUL',
  role: 'IT Programmer & AI Specialist',
  contactLine1: 'Cilegon, Banten, Indonesia | +62 821-1157-9944 | Syamsuliki.48@gmail.com',
  contactLine2: 'GitHub: github.com/syamban14 | LinkedIn: linkedin.com/in/m-syamsul | Portfolio: syamban14.github.io/my-portofolio',
  headers: {
    summary: 'RINGKASAN PROFESIONAL',
    skills: 'KOMPETENSI & TEKNOLOGI UTAMA',
    experience: 'PENGALAMAN KERJA',
    projects: 'PROYEK TERPUBLIKASI & OPEN SOURCE',
    education: 'PENDIDIKAN',
    certs: 'SERTIFIKASI & PENGHARGAAN',
  },
  summary:
    'IT Programmer dan AI Specialist berpengalaman 8+ tahun dengan latar belakang S1 Sistem Informasi dan D3 Manajemen Informatika. Fokus utama pada pengembangan teknologi AI Agent, Prompt Engineering, integrasi AI API, pengembangan aplikasi web & mobile lintas platform, serta manajemen infrastruktur IT institusi.',
  skills: [
    'AI & Otomasi: AI Agent Dev (92%), Prompt Engineering (90%), AI API Integration (88%), Hermes Agent Orchestration',
    'Bahasa & Basis Data: Python (90%), PHP (88%), JavaScript (85%), MySQL (85%), Laravel / CodeIgniter / Svelte / Next.js',
    'Platform & Infrastruktur: Web & Mobile Dev Android/iOS (90%), IT Support (92%), Networking & LAN Kampus (80%)',
  ],
  experience: [
    {
      heading: 'IT Programmer - PT. BCS Logistics',
      meta: 'Agustus 2024 - Agustus 2026 | Cilegon, Banten',
      bullets: [
        'Merancang dan membangun Aplikasi Presensi Online Android & iOS beserta panel pemantauan web dan geofence GPS.',
        'Mengembangkan aplikasi kesehatan doklinc untuk kemudahan layanan kesehatan dan antrean masyarakat Cilegon.',
        'Melakukan pemeliharaan, debugging, penambahan fitur, dan manajemen basis data aplikasi web perusahaan.',
      ],
    },
    {
      heading: 'IT Support - LP3I Business College',
      meta: 'Januari 2017 - Agustus 2024 | Cilegon, Banten',
      bullets: [
        'Merancang program kerja tahunan IT serta mengelola infrastruktur jaringan, perangkat keras, dan perangkat lunak.',
        'Membangun aplikasi internal institusi: Aplikasi Ujian Online, Test Online Masuk, dan Aplikasi Surat.',
        'Memberikan dukungan teknis operasional harian untuk seluruh civitas akademik dan ruang ujian komputer.',
      ],
    },
  ],
  projects: [
    'Aplikasi Presensi Online (BCS Logistics) - Android, iOS, & Web dengan validasi radius lokasi.',
    'Aplikasi Kesehatan doklinc (Cilegon) - Platform antrean dan layanan kesehatan digital terintegrasi API.',
    'Sistem Kampus LP3I (Ujian Online, Test Masuk Online, Aplikasi Surat) - PHP & MySQL beroperasi 7+ tahun.',
    'Open Source GitHub (@syamban14): hermes-mix-ai (Python AI Orchestrator), mixa-frontend/backend, step-100-3d, qhse-app.',
  ],
  education: [
    'S1 Sistem Informasi - STMIK Bina Sarana Global, Tangerang (IPK 3.32 | Sep 2014 - Nov 2016)',
    'D3 Manajemen Informatika - Politeknik LP3I Bandung, Bandung (IPK 2.92 | Sep 2011 - Sep 2014)',
  ],
  certs: [
    'Sertifikasi: AI Productivity and AI API Integration for Developers - Hacktiv8 (Agustus 2025)',
    'Prestasi: Juara 1 PTK PNFI Kota Cilegon (2017) | Juara 3 PTK PNFI Provinsi Banten (2018) | Mahasiswa Berprestasi Futsal (2011)',
  ],
};

const cvEn = {
  name: 'M. SYAMSUL',
  role: 'IT Programmer & AI Specialist',
  contactLine1: 'Cilegon, Banten, Indonesia | +62 821-1157-9944 | Syamsuliki.48@gmail.com',
  contactLine2: 'GitHub: github.com/syamban14 | LinkedIn: linkedin.com/in/m-syamsul | Portfolio: syamban14.github.io/my-portofolio',
  headers: {
    summary: 'PROFESSIONAL SUMMARY',
    skills: 'CORE SKILLS & TECHNICAL STACK',
    experience: 'WORK EXPERIENCE',
    projects: 'SHIPPED SYSTEMS & OPEN SOURCE',
    education: 'EDUCATION',
    certs: 'CERTIFICATIONS & AWARDS',
  },
  summary:
    'IT Programmer and AI Specialist with 8+ years of professional experience and degrees in Information Systems and Informatics Management. Focused on engineering AI Agent workflows, Prompt Engineering, AI API integrations, cross-platform web & mobile applications, and reliable institutional IT infrastructure.',
  skills: [
    'AI & Automation: AI Agent Dev (92%), Prompt Engineering (90%), AI API Integration (88%), Hermes Agent Orchestration',
    'Languages & Databases: Python (90%), PHP (88%), JavaScript (85%), MySQL (85%), Laravel / CodeIgniter / Svelte / Next.js',
    'Platforms & Infra: Web & Mobile Dev Android/iOS (90%), IT Support (92%), Campus Networking & Operations (80%)',
  ],
  experience: [
    {
      heading: 'IT Programmer - PT. BCS Logistics',
      meta: 'August 2024 - August 2026 | Cilegon, Banten',
      bullets: [
        'Architected and shipped the cross-platform Android & iOS Online Attendance App with web dashboard & GPS geofencing.',
        'Developed the doklinc digital healthcare application connecting Cilegon residents to medical queues via API.',
        'Handled full-lifecycle web application maintenance, debugging, new feature rollouts, and database management.',
      ],
    },
    {
      heading: 'IT Support - LP3I Business College',
      meta: 'January 2017 - August 2024 | Cilegon, Banten',
      bullets: [
        'Planned annual institutional IT roadmaps and managed campus networks, hardware, and software infrastructure.',
        'Built internal institutional web systems: Online Examination System, Online Admissions Test, and Letter Manager.',
        'Provided daily technical operations support ensuring reliable synchronous testing across computer labs.',
      ],
    },
  ],
  projects: [
    'Online Attendance App (PT. BCS Logistics) - Android, iOS & Web geofenced shift attendance system.',
    'doklinc Healthcare Platform (Cilegon) - Centralized digital patient registration and clinic queue portal.',
    'LP3I Campus Suite (Online Exam, Admissions Screening, Letter Manager) - PHP & MySQL running 7+ years.',
    'Open Source GitHub (@syamban14): hermes-mix-ai (Python AI Orchestrator), mixa-frontend/backend, step-100-3d, qhse-app.',
  ],
  education: [
    'B.S. in Information Systems - STMIK Bina Sarana Global, Tangerang (GPA 3.32 | Sep 2014 - Nov 2016)',
    'Diploma (D3) in Informatics Management - Politeknik LP3I Bandung (GPA 2.92 | Sep 2011 - Sep 2014)',
  ],
  certs: [
    'Certification: AI Productivity and AI API Integration for Developers - Hacktiv8 (August 2025)',
    'Awards: 1st Place PTK PNFI Cilegon (2017) | 3rd Place PTK PNFI Banten Province (2018) | Outstanding Student Futsal (2011)',
  ],
};

const outDir = path.resolve(process.cwd(), 'public/cv');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'M-Syamsul-CV-ATS-ID.pdf'), renderCvPdf(cvId));
fs.writeFileSync(path.join(outDir, 'M-Syamsul-CV-ATS-EN.pdf'), renderCvPdf(cvEn));
console.log('Generated ATS-friendly CVs in', outDir);
