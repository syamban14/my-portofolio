import { getLang, getPortfolioData, onLangChange, t } from '../data/i18n.js';
import { soundEngine } from './soundEngine.js';

const CACHE_KEY = 'gh_syamban14_showcase_v1';
const CACHE_TTL_MS = 15 * 60 * 1000;

const MONTH_NAMES = {
  id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

function formatRepoDate(isoString, lang = getLang()) {
  if (!isoString) return '2026';
  const dt = new Date(isoString);
  if (Number.isNaN(dt.getTime())) return '2026';
  const months = MONTH_NAMES[lang] || MONTH_NAMES.id;
  return `${months[dt.getMonth()]} ${dt.getFullYear()}`;
}

function inferCategory(repoName, language, curated) {
  if (curated?.category) return curated.category;
  const lowerName = repoName.toLowerCase();
  const lowerLang = (language || '').toLowerCase();
  if (lowerName.includes('3d') || lowerName.includes('tebak') || lowerName.includes('game')) {
    return 'web3d';
  }
  if (
    lowerName.includes('ai') ||
    lowerName.includes('gemini') ||
    lowerName.includes('hermes') ||
    lowerLang === 'python'
  ) {
    return 'ai';
  }
  return 'fullstack';
}

function mergeWithCurated(rawRepos, lang = getLang()) {
  const curatedList = getPortfolioData(lang).githubCuratedRepos;
  const curatedMap = new Map(curatedList.map((item) => [item.name.toLowerCase(), item]));

  const merged = [];
  const seen = new Set();

  rawRepos.forEach((raw) => {
    if (raw.fork || raw.private) return;
    const key = raw.name.toLowerCase();
    if (key === 'my-portofolio') return;
    seen.add(key);
    const curated = curatedMap.get(key);
    merged.push({
      name: raw.name,
      language: raw.language || curated?.language || 'Code',
      category: inferCategory(raw.name, raw.language, curated),
      featured: Boolean(curated?.featured),
      description:
        curated?.description ||
        raw.description ||
        (lang === 'en'
          ? `Project repository ${raw.name} by M. Syamsul on GitHub.`
          : `Repositori proyek ${raw.name} oleh M. Syamsul di GitHub.`),
      htmlUrl: raw.html_url || `https://github.com/syamban14/${raw.name}`,
      demoUrl: raw.homepage || curated?.demoUrl || '',
      updatedAt: raw.updated_at || curated?.updatedAt || '',
      updatedLabel: formatRepoDate(raw.updated_at || curated?.updatedAt, lang),
    });
  });

  curatedList.forEach((curated) => {
    const key = curated.name.toLowerCase();
    if (seen.has(key)) return;
    merged.push({
      name: curated.name,
      language: curated.language,
      category: curated.category,
      featured: Boolean(curated.featured),
      description: curated.description,
      htmlUrl: `https://github.com/syamban14/${curated.name}`,
      demoUrl: curated.demoUrl || '',
      updatedAt: curated.updatedAt || '',
      updatedLabel: formatRepoDate(curated.updatedAt, lang),
    });
  });

  return merged.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return String(b.updatedAt).localeCompare(String(a.updatedAt));
  });
}

async function fetchRawRepos() {
  try {
    const cachedRaw = sessionStorage.getItem(CACHE_KEY);
    if (cachedRaw) {
      const parsed = JSON.parse(cachedRaw);
      if (Date.now() - parsed.savedAt < CACHE_TTL_MS && Array.isArray(parsed.rawRepos)) {
        return {
          mode: 'cache',
          publicRepoCount: parsed.publicRepoCount,
          rawRepos: parsed.rawRepos,
        };
      }
    }
  } catch {
    // Ignore storage access restriction
  }

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch('https://api.github.com/users/syamban14'),
      fetch('https://api.github.com/users/syamban14/repos?sort=updated&per_page=30'),
    ]);
    if (!reposRes.ok) throw new Error(`GitHub status ${reposRes.status}`);

    const rawRepos = await reposRes.json();
    const profileJson = profileRes.ok ? await profileRes.json() : null;
    const publicRepoCount = profileJson?.public_repos || rawRepos.length;

    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ savedAt: Date.now(), publicRepoCount, rawRepos })
      );
    } catch {
      // Ignore quota restriction
    }

    return { mode: 'live', publicRepoCount, rawRepos };
  } catch {
    return { mode: 'offline', publicRepoCount: 51, rawRepos: [] };
  }
}

/**
 * Interactive Live GitHub Repository Showcase for @syamban14 with full ID/EN support.
 */
export function initGithubShowcase() {
  const filterWrap = document.getElementById('githubFilterTabs');
  const searchInput = document.getElementById('githubSearchInput');
  const statusEl = document.getElementById('githubStatusMeta');
  const gridEl = document.getElementById('githubRepoGrid');

  if (!filterWrap || !gridEl || !statusEl) return null;

  let rawState = { mode: 'loading', publicRepoCount: 51, rawRepos: [] };
  let activeFilter = 'featured';
  let query = '';

  function formatStatusLabel() {
    const lang = getLang();
    if (rawState.mode === 'loading') {
      return lang === 'en'
        ? 'Syncing public repositories for @syamban14...'
        : 'Menyelaraskan repositori publik @syamban14...';
    }
    if (rawState.mode === 'cache') {
      return lang === 'en'
        ? `Cached GitHub sync (@syamban14 · ${rawState.publicRepoCount} public repos)`
        : `Data cache sinkron GitHub (${rawState.publicRepoCount} repositori publik @syamban14)`;
    }
    if (rawState.mode === 'live') {
      return lang === 'en'
        ? `Synced live from GitHub API (${rawState.publicRepoCount} public repos @syamban14)`
        : `Tersinkron langsung dari GitHub API (${rawState.publicRepoCount} repositori publik @syamban14)`;
    }
    return lang === 'en'
      ? 'Showing curated @syamban14 repositories (offline mode)'
      : 'Menampilkan kurasi repositori utama @syamban14 (mode offline)';
  }

  function renderRepos() {
    const lang = getLang();
    statusEl.textContent = formatStatusLabel();
    const allRepos = mergeWithCurated(rawState.rawRepos, lang);

    const q = query.trim().toLowerCase();
    const filtered = allRepos.filter((repo) => {
      if (activeFilter === 'featured' && !repo.featured) return false;
      if (activeFilter !== 'all' && activeFilter !== 'featured' && repo.category !== activeFilter) {
        return false;
      }
      if (q) {
        const hay = `${repo.name} ${repo.language} ${repo.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (!filtered.length) {
      gridEl.innerHTML = `<p class="github-empty">${t('githubEmpty')}</p>`;
      return;
    }

const LANGUAGE_DOT_COLORS = {
  Python: '#18d2b6',
  TypeScript: '#68b5ff',
  JavaScript: '#ffb454',
  Svelte: '#ff8a4c',
  PHP: '#a78bfa',
  'Laravel / Blade': '#f47a93',
  HTML: '#f47a93',
};

    gridEl.innerHTML = filtered
      .map((repo) => {
        const dotColor = LANGUAGE_DOT_COLORS[repo.language] || '#18d2b6';
        return `
      <article class="github-repo-item">
        <div class="github-repo-top">
          <div class="github-repo-title-row">
            <span class="github-repo-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </span>
            <h3>${repo.name}</h3>
          </div>
          <span class="github-repo-meta tabular-nums">
            <span class="github-lang-dot" style="background-color: ${dotColor}"></span>
            ${repo.language} · ${repo.updatedLabel}
          </span>
        </div>
        <p class="github-repo-desc">${repo.description}</p>
        <div class="github-repo-links">
          <a href="${repo.htmlUrl}" target="_blank" rel="noopener" class="inline-jump-btn">${t('githubCodeBtn')}</a>
          ${
            repo.demoUrl
              ? `<a href="${repo.demoUrl}" target="_blank" rel="noopener" class="inline-jump-btn inline-jump-accent">${t('githubDemoBtn')}</a>`
              : ''
          }
        </div>
      </article>
    `;
      })
      .join('');
  }

  filterWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-gh-filter]');
    if (!btn) return;
    soundEngine.playClick();
    activeFilter = btn.dataset.ghFilter;
    filterWrap.querySelectorAll('[data-gh-filter]').forEach((tab) => {
      const match = tab === btn;
      tab.classList.toggle('is-active', match);
      tab.setAttribute('aria-selected', String(match));
    });
    renderRepos();
  });

  searchInput?.addEventListener('input', () => {
    query = searchInput.value;
    renderRepos();
  });

  onLangChange(renderRepos);
  renderRepos();

  fetchRawRepos().then((result) => {
    rawState = result;
    renderRepos();
  });

  return {
    filterBy(cat) {
      const targetBtn = filterWrap.querySelector(`[data-gh-filter="${cat}"]`);
      if (targetBtn) targetBtn.click();
    },
  };
}
