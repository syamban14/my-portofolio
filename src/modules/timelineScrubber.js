import { getLang, getPortfolioData, onLangChange, t } from '../data/i18n.js';
import { soundEngine } from './soundEngine.js';

/**
 * Interactive 2011 - 2026 Career, Education, Certification & Award Scrubber.
 * Updates dynamically whenever the active language switches between ID and EN.
 */
export function initTimelineScrubber() {
  const filterWrap = document.getElementById('timelineFilterTabs');
  const rangeInput = document.getElementById('timelineYearRange');
  const yearLabel = document.getElementById('timelineSelectedYear');
  const resetBtn = document.getElementById('timelineShowAllBtn');
  const streamEl = document.getElementById('timelineStream');
  const summaryEl = document.getElementById('aboutSummaryText');

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
        details: exp.details,
      })),
      ...data.certifications.map((cert) => ({
        id: cert.id,
        kind: 'pendidikan',
        kindLabel: kindLabels.sertifikasi,
        title: cert.title,
        subtitle: cert.date,
        startYear: cert.year,
        endYear: cert.year,
        details: [cert.desc],
      })),
      ...data.awards.map((aw) => ({
        id: aw.id,
        kind: 'prestasi',
        kindLabel: kindLabels.prestasi,
        title: aw.title,
        subtitle: aw.detail,
        startYear: aw.year,
        endYear: aw.year,
        details: [],
      })),
      ...data.education.map((edu) => ({
        id: edu.id,
        kind: 'pendidikan',
        kindLabel: kindLabels.pendidikan,
        title: `${edu.degree} - ${edu.institution}`,
        subtitle: `${edu.period} · ${edu.location} · ${gpaLabel} ${edu.gpa}`,
        startYear: edu.startYear,
        endYear: edu.endYear,
        details: [],
      })),
    ].sort((a, b) => b.endYear - a.endYear || b.startYear - a.startYear);
  }

  function render() {
    const lang = getLang();
    const data = getPortfolioData(lang);

    if (summaryEl) {
      summaryEl.textContent = data.summary;
    }

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
          <span class="milestone-kind">${item.kindLabel}</span>
          <span class="milestone-years tabular-nums">${
            item.startYear === item.endYear ? item.startYear : `${item.startYear} - ${item.endYear}`
          }</span>
        </div>
        <h3 class="milestone-title">${item.title}</h3>
        <p class="milestone-sub">${item.subtitle}</p>
        ${
          item.details.length
            ? `<ul class="milestone-details">${item.details.map((d) => `<li>${d}</li>`).join('')}</ul>`
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
