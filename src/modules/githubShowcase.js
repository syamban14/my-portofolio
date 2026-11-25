import { portfolioData } from '../data/portfolioData.js';
import { soundEngine } from './soundEngine.js';

const CACHE_KEY = 'gh_syamban14_showcase_v1';
const CACHE_TTL_MS = 15 * 60 * 1000;

const MONTH_NAMES_ID = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

function formatRepoDate(isoString) {
  if (!isoString) return '2026';
  const dt = new Date(isoString);
  if (Number.isNaN(dt.getTime())) return '2026';
  return `${MONTH_NAMES_ID[dt.getMonth()]} ${dt.getFullYear()}`;
}

function inferCategory(repoName, language, curated) {
  if (curated?.category) return curated.category;
  const lowerName = repoName.toLowerCase();
  const lowerLang = (language || '').toLowerCase();
  if (
    lowerName.includes('3d') ||
    lowerName.includes('tebak') ||
    lowerName.includes('game')
  ) {
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

function mergeWithCurated(liveRepos) {
  const curatedMap = new Map(
    portfolioData.githubCuratedRepos.map((item) => [item.name.toLowerCase(), item])
  );

  const merged = [];
  const seen = new Set();

  liveRepos.forEach((raw) => {
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
        `Repositori proyek ${raw.name} oleh M. Syamsul di GitHub.`,
      htmlUrl: raw.html_url || `https://github.com/syamban14/${raw.name}`,
      demoUrl: raw.homepage || curated?.demoUrl || '',
      updatedAt: raw.updated_at || curated?.updatedAt || '',
      updatedLabel: formatRepoDate(raw.updated_at || curated?.updatedAt),
    });
  });

  // Ensure curated featured items remain available if truncated by pagination
  portfolioData.githubCuratedRepos.forEach((curated) => {
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
      updatedLabel: formatRepoDate(curated.updatedAt),
    });
  });

  return merged.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return String(b.updatedAt).localeCompare(String(a.updatedAt));
  });
}

async function fetchLiveRepos() {
  try {
    const cachedRaw = sessionStorage.getItem(CACHE_KEY);
    if (cachedRaw) {
      const parsed = JSON.parse(cachedRaw);
      if (Date.now() - parsed.savedAt < CACHE_TTL_MS && Array.isArray(parsed.repos)) {
        return {
          repos: parsed.repos,
          publicRepoCount: parsed.publicRepoCount,
          sourceLabel: 'Data cache sinkron GitHub (@syamban14)',
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

    const reposJson = await reposRes.json();
    const profileJson = profileRes.ok ? await profileRes.json() : null;
    const publicRepoCount = profileJson?.public_repos || reposJson.length;
    const merged = mergeWithCurated(reposJson);

    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          savedAt: Date.now(),
          publicRepoCount,
          repos: merged,
        })
      );
    } catch {
      // Ignore storage quota issues
    }

    return {
      repos: merged,
      publicRepoCount,
      sourceLabel: `Tersinkron langsung dari GitHub API (${publicRepoCount} repositori publik @syamban14)`,
    };
  } catch {
    const fallback = mergeWithCurated([]);
    return {
      repos: fallback,
      publicRepoCount: 51,
      sourceLabel: 'Menampilkan kurasi repositori utama @syamban14 (mode offline)',
    };
  }
}

/**
 * Interactive Live GitHub Repository Showcase for @syamban14.
 * Supports category tabs, live text search, and direct links to source & live 3D demos.
 */
export function initGithubShowcase() {
  const filterWrap = document.getElementById('githubFilterTabs');
  const searchInput = document.getElementById('githubSearchInput');
  const statusEl = document.getElementById('githubStatusMeta');
  const gridEl = document.getElementById('githubRepoGrid');

  if (!filterWrap || !gridEl || !statusEl) return null;

  let allRepos = mergeWithCurated([]);
  let activeFilter = 'featured';
  let query = '';

  function renderRepos() {
    const q = query.trim().toLowerCase();
    const filtered = allRepos.filter((repo) => {
      if (activeFilter === 'featured' && !repo.featured) return false;
      if (
        activeFilter !== 'all' &&
        activeFilter !== 'featured' &&
        repo.category !== activeFilter
      ) {
        return false;
      }
      if (q) {
        const hay = `${repo.name} ${repo.language} ${repo.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (!filtered.length) {
      gridEl.innerHTML =
        '<p class="github-empty">Tidak ada repositori yang cocok dengan filter atau pencarian tersebut.</p>';
      return;
    }

    gridEl.innerHTML = filtered
      .map(
        (repo) => `
      <article class="github-repo-item">
        <div class="github-repo-top">
          <h3>${repo.name}</h3>
          <span class="github-repo-meta tabular-nums">${repo.language} · ${repo.updatedLabel}</span>
        </div>
        <p class="github-repo-desc">${repo.description}</p>
        <div class="github-repo-links">
          <a href="${repo.htmlUrl}" target="_blank" rel="noopener" class="inline-jump-btn">Kode sumber</a>
          ${
            repo.demoUrl
              ? `<a href="${repo.demoUrl}" target="_blank" rel="noopener" class="inline-jump-btn inline-jump-accent">Demo langsung</a>`
              : ''
          }
        </div>
      </article>
    `
      )
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

  // Render curated items immediately so UI is ready before network settles
  statusEl.textContent = 'Menyelaraskan repositori publik @syamban14...';
  renderRepos();

  fetchLiveRepos().then((result) => {
    allRepos = result.repos;
    statusEl.textContent = result.sourceLabel;
    renderRepos();
  });

  return {
    filterBy(cat) {
      const targetBtn = filterWrap.querySelector(`[data-gh-filter="${cat}"]`);
      if (targetBtn) targetBtn.click();
    },
  };
}
