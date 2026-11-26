import { getLang, getPortfolioData, onLangChange, t } from '../data/i18n.js';
import { soundEngine } from './soundEngine.js';

const KIND_ICONS = {
  karir:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  prestasi:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  pendidikan:
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
};

/**
 * Interactive 2011 - 2026 Career, Education, Certification & Award Scrubber.
 * Renders concise visual milestone cards with SVG icons and tag chips.
 */
export function initTimelineScrubber() {
  const filterWrap = document.getElementById('timelineFilterTabs');
  const rangeInput = document.getElementById('timelineYearRange');
  const yearLabel = document.getElementById('timelineSelectedYear');
  const resetBtn = document.getElementById('timelineShowAllBtn');
  const streamEl = document.getElementById('timelineStream');

  if (!filterWrap || !rangeInput || !streamEl) return null;

  let activeFilter = 'all';
  let yearFilterEnabled = false;
  let selectedYear = 2025;

  function buildMilestones(lang) {
    const data = getPortfolioData(lang);
    const kindLabels =
      lang === 'en'
        ? { karir: 'Career', sertifikasi: 'Certification', prestasi: 'Award', pendidikan: 'Education' }
        : { karir: 'Karir', sertifikasi: 'Sertifikasi', prestasi: 'Prestasi', pendidikan: 'Pendidikan' };
    const gpaLabel = lang === 'en' ? 'GPA' : 'IPK';

    return [
      ...data.experience.map((exp) => ({
        id: exp.id,
        kind: 'karir',
        kindLabel: kindLabels.karir,
        title: `${exp.role} - ${exp.company}`,
        subtitle: `${exp.period} · ${exp.location}`,
        startYear: exp.startYear,
        endYear: exp.endYear,
        tags: exp.highlights || exp.details.slice(0, 3),
      })),
      ...data.certifications.map((cert) => ({
        id: cert.id,
        kind: 'pendidikan',
        kindLabel: kindLabels.sertifikasi,
        title: cert.title,
        subtitle: cert.date,
        startYear: cert.year,
        endYear: cert.year,
        tags: ['AI API', 'Hacktiv8'],
      })),
      ...data.awards.map((aw) => ({
        id: aw.id,
        kind: 'prestasi',
        kindLabel: kindLabels.prestasi,
        title: aw.title,
        subtitle: aw.detail,
        startYear: aw.year,
        endYear: aw.year,
        tags: [],
      })),
      ...data.education.map((edu) => ({
        id: edu.id,
        kind: 'pendidikan',
        kindLabel: kindLabels.pendidikan,
        title: `${edu.degree} - ${edu.institution}`,
        subtitle: `${edu.period} · ${edu.location} · ${gpaLabel} ${edu.gpa}`,
        startYear: edu.startYear,
        endYear: edu.endYear,
        tags: [],
      })),
    ].sort((a, b) => b.endYear - a.endYear || b.startYear - a.startYear);
  }

  function render() {
    const lang = getLang();

    if (yearLabel) {
      yearLabel.textContent = yearFilterEnabled
        ? `${t('timelineFocusYear')}: ${selectedYear}`
        : t('timelineAllYears');
    }
    if (resetBtn) {
      resetBtn.classList.toggle('is-active', !yearFilterEnabled);
    }

    const milestones = buildMilestones(lang);
    const filtered = milestones.filter((item) => {
      if (activeFilter !== 'all' && item.kind !== activeFilter) return false;
      if (yearFilterEnabled) {
        return selectedYear >= item.startYear && selectedYear <= item.endYear;
      }
      return true;
    });

    if (!filtered.length) {
      streamEl.innerHTML = `
        <div class="timeline-empty">
          <p>${t('timelineEmpty')}</p>
        </div>
      `;
      return;
    }

    streamEl.innerHTML = filtered
      .map(
        (item) => `
      <article class="milestone-item">
        <div class="milestone-top">
          <div class="milestone-head-row">
            <span class="milestone-icon-box" aria-hidden="true">${KIND_ICONS[item.kind] || KIND_ICONS.karir}</span>
            <span>${item.kindLabel}</span>
          </div>
          <span class="milestone-years tabular-nums">${
            item.startYear === item.endYear ? item.startYear : `${item.startYear} - ${item.endYear}`
          }</span>
        </div>
        <h3 class="milestone-title">${item.title}</h3>
        <p class="milestone-sub">${item.subtitle}</p>
        ${
          item.tags.length
            ? `<div class="milestone-tags">${item.tags.map((tag) => `<span class="milestone-tag">${tag}</span>`).join('')}</div>`
            : ''
        }
      </article>
    `
      )
      .join('');
  }

  filterWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-timeline-filter]');
    if (!btn) return;
    soundEngine.playClick();
    activeFilter = btn.dataset.timelineFilter;
    filterWrap.querySelectorAll('[data-timeline-filter]').forEach((tab) => {
      const match = tab === btn;
      tab.classList.toggle('is-active', match);
      tab.setAttribute('aria-selected', String(match));
    });
    render();
  });

  rangeInput.addEventListener('input', () => {
    yearFilterEnabled = true;
    selectedYear = Number(rangeInput.value);
    render();
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      soundEngine.playClick();
      yearFilterEnabled = false;
      render();
    });
  }

  onLangChange(render);
  render();

  return {
    focusYear(year) {
      yearFilterEnabled = true;
      selectedYear = year;
      rangeInput.value = String(year);
      render();
    },
  };
}
