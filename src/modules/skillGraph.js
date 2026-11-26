import { getLang, getPortfolioData, onLangChange, t } from '../data/i18n.js';
import { soundEngine } from './soundEngine.js';

const CATEGORY_ORDER = ['AI', 'Language', 'Database', 'Tech'];

const CATEGORY_META = {
  AI: {
    code: 'AI',
    label: 'AI',
    color: '#18d2b6',
    desktopHub: { x: 0.34, y: 0.33 },
    mobileHub: { x: 0.30, y: 0.32 },
  },
  Language: {
    code: 'LANG',
    label: 'Language',
    color: '#68b5ff',
    desktopHub: { x: 0.66, y: 0.33 },
    mobileHub: { x: 0.70, y: 0.32 },
  },
  Database: {
    code: 'DB',
    label: 'Database',
    color: '#ffb454',
    desktopHub: { x: 0.34, y: 0.64 },
    mobileHub: { x: 0.34, y: 0.64 },
  },
  Tech: {
    code: 'TECH',
    label: 'Tech',
    color: '#f47a93',
    desktopHub: { x: 0.66, y: 0.64 },
    mobileHub: { x: 0.70, y: 0.63 },
  },
};

const MOBILE_LABELS = {
  'ai-agent-dev': 'AI Agent',
  'prompt-engineering': 'Prompt Eng.',
  'ai-api-integration': 'AI API',
  'rest-api': 'RESTful API',
  'web-mobile-dev': 'Web & Mobile',
};

const DESKTOP_SLOTS = {
  'ai-agent-dev': { x: 0.12, y: 0.11 },
  'prompt-engineering': { x: 0.36, y: 0.09 },
  'ai-api-integration': { x: 0.13, y: 0.32 },
  python: { x: 0.63, y: 0.09 },
  go: { x: 0.87, y: 0.09 },
  javascript: { x: 0.88, y: 0.25 },
  php: { x: 0.88, y: 0.41 },
  postgresql: { x: 0.12, y: 0.61 },
  mysql: { x: 0.13, y: 0.83 },
  sqlite: { x: 0.35, y: 0.87 },
  'rest-api': { x: 0.87, y: 0.55 },
  docker: { x: 0.89, y: 0.71 },
  networking: { x: 0.87, y: 0.87 },
  'web-mobile-dev': { x: 0.67, y: 0.88 },
  'it-support': { x: 0.49, y: 0.87 },
};

const MOBILE_SLOTS = {
  'ai-agent-dev': { x: 0.14, y: 0.08 },
  'prompt-engineering': { x: 0.41, y: 0.08 },
  'ai-api-integration': { x: 0.13, y: 0.23 },
  python: { x: 0.65, y: 0.08 },
  go: { x: 0.88, y: 0.08 },
  javascript: { x: 0.88, y: 0.22 },
  php: { x: 0.88, y: 0.36 },
  postgresql: { x: 0.14, y: 0.52 },
  mysql: { x: 0.14, y: 0.72 },
  sqlite: { x: 0.24, y: 0.87 },
  'rest-api': { x: 0.86, y: 0.49 },
  docker: { x: 0.88, y: 0.62 },
  networking: { x: 0.87, y: 0.75 },
  'web-mobile-dev': { x: 0.77, y: 0.87 },
  'it-support': { x: 0.50, y: 0.87 },
};

/**
 * 3-Tier Hierarchical Skill Constellation on HTML5 Canvas:
 * M. Syamsul Portrait Center (Tier 0) -> 4 Category Hubs (Tier 1) -> 15 Skills (Tier 2).
 */
export function initSkillGraph({ onSelectProject }) {
  const wrap = document.getElementById('skillCanvasWrap');
  const canvas = document.getElementById('skillCanvas');
  const tabsWrap = document.getElementById('skillCategoryTabs');
  const listWrap = document.getElementById('skillAccessibleList');
  const inspectorName = document.getElementById('skillInspectorName');
  const inspectorBadge = document.getElementById('skillInspectorBadge');
  const inspectorCat = document.getElementById('skillInspectorCat');
  const inspectorScore = document.getElementById('skillInspectorScore');
  const inspectorUsage = document.getElementById('skillInspectorUsage');
  const inspectorProjects = document.getElementById('skillInspectorProjects');

  if (!wrap || !canvas || !tabsWrap || !listWrap) return null;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const domCharImg = document.getElementById('workspaceCharSource');
  const fallbackCharImg = new Image();
  fallbackCharImg.src = domCharImg?.getAttribute('src') || './assets/character_anime_clean.png';

  function getReadyCharImg() {
    if (domCharImg && domCharImg.complete && domCharImg.naturalWidth > 0) return domCharImg;
    if (fallbackCharImg.complete && fallbackCharImg.naturalWidth > 0) return fallbackCharImg;
    return null;
  }

  let width = 640;
  let height = 520;
  let activeCategory = 'all';
  let selectedId = getPortfolioData().skills[0].id;
  let hoveredTarget = null;
  let draggingNode = null;
  let highlightAllUntil = 0;

  const nodes = getPortfolioData().skills.map((skill) => ({
    ...skill,
    x: 320,
    y: 260,
    vx: 0,
    vy: 0,
    radius: 18,
  }));

  function getFilteredNodes() {
    return activeCategory === 'all' ? nodes : nodes.filter((n) => n.category === activeCategory);
  }

  function getVisibleCategories() {
    return activeCategory === 'all' ? CATEGORY_ORDER : [activeCategory];
  }

  function getRadii() {
    const isMobile = width < 560;
    return {
      isMobile,
      center: isMobile ? 25 : 36,
      hub: isMobile ? 16 : 20,
      node: isMobile ? 16 : 18,
    };
  }

  function getCenterPos() {
    if (activeCategory === 'all') {
      return { x: width * 0.5, y: height * 0.48 };
    }
    if (width < 560) {
      return { x: width * 0.5, y: height * 0.17 };
    }
    return { x: width * 0.22, y: height * 0.48 };
  }

  function getHubPos(catKey) {
    const meta = CATEGORY_META[catKey];
    if (!meta) return { x: width * 0.5, y: height * 0.48 };
    if (activeCategory !== 'all') {
      if (width < 560) {
        return { x: width * 0.5, y: height * 0.42 };
      }
      return { x: width * 0.48, y: height * 0.48 };
    }
    const anchor = width < 560 ? meta.mobileHub : meta.desktopHub;
    return { x: width * anchor.x, y: height * anchor.y };
  }

  function getNodeTarget(node, idx, activeNodes) {
    if (activeCategory !== 'all') {
      const count = activeNodes.length || 1;
      const tPos = count === 1 ? 0.5 : idx / (count - 1);
      if (width < 560) {
        const isTopRow = idx % 2 === 0;
        return {
          x: width * (0.18 + tPos * 0.64),
          y: height * (isTopRow ? 0.64 : 0.84),
        };
      }
      return {
        x: width * (0.74 + Math.sin(tPos * Math.PI) * 0.06),
        y: height * (0.18 + tPos * 0.62),
      };
    }

    const slot = (width < 560 ? MOBILE_SLOTS[node.id] : DESKTOP_SLOTS[node.id]) || { x: 0.5, y: 0.5 };
    return { x: width * slot.x, y: height * slot.y };
  }

  function resize() {
    const rect = wrap.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { node: nodeRadius } = getRadii();
    const activeNodes = getFilteredNodes();
    nodes.forEach((node) => {
      node.radius = nodeRadius;
      const idx = activeNodes.indexOf(node);
      if (idx !== -1 && node !== draggingNode) {
        const target = getNodeTarget(node, idx, activeNodes);
        node.x = target.x;
        node.y = target.y;
        node.vx = 0;
        node.vy = 0;
      } else {
        node.x = Math.max(46, Math.min(width - 46, node.x));
        node.y = Math.max(46, Math.min(height - 46, node.y));
      }
    });
  }

  function renderInspector(skillId) {
    const data = getPortfolioData();
    const skill = data.skills.find((s) => s.id === skillId) || data.skills[0];
    selectedId = skill.id;
    const catColor = CATEGORY_META[skill.category]?.color || '#18d2b6';

    if (inspectorBadge) {
      inspectorBadge.textContent = skill.code || skill.category.slice(0, 3).toUpperCase();
      inspectorBadge.style.borderColor = catColor;
      inspectorBadge.style.color = catColor;
    }

    inspectorName.textContent = skill.name;
    inspectorCat.textContent = `${t('skillsCategoryPrefix')}: ${skill.category}`;
    const count = skill.relatedProjects.length;
    inspectorScore.textContent =
      getLang() === 'en' ? `${count} ${count === 1 ? 'project' : 'projects'}` : `${count} proyek`;
    inspectorUsage.textContent = skill.usage;

    inspectorProjects.innerHTML = skill.relatedProjects
      .map((pid) => {
        const proj = data.projects.find((p) => p.id === pid);
        if (!proj) return '';
        return `<button type="button" class="inline-jump-btn" data-project-id="${proj.id}">${proj.shortTitle}</button>`;
      })
      .join('');

    listWrap.querySelectorAll('.skill-cat-card').forEach((btn) => {
      const isActive = btn.dataset.catPick === skill.category;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  function renderAccessibleList() {
    const skills = getPortfolioData().skills;
    const activeSkill = skills.find((s) => s.id === selectedId) || skills[0];
    const unitLabel = getLang() === 'en' ? 'skills' : 'keahlian';

    listWrap.innerHTML = CATEGORY_ORDER.map((catKey) => {
      const meta = CATEGORY_META[catKey];
      const count = skills.filter((s) => s.category === catKey).length;
      const isActive = activeSkill?.category === catKey;
      return `
        <button
          type="button"
          class="skill-cat-card${isActive ? ' is-active' : ''}"
          data-cat-pick="${catKey}"
          aria-pressed="${isActive}"
        >
          <span class="skill-cat-card-top">
            <span class="skill-cat-dot" style="background-color: ${meta.color}"></span>
            <span class="skill-cat-name">${meta.label}</span>
          </span>
          <span class="inspector-meta tabular-nums">${count} ${unitLabel}</span>
        </button>
      `;
    }).join('');
  }

  function stepPhysics(timeMs) {
    const activeNodes = getFilteredNodes();
    const { node: nodeRadius } = getRadii();

    activeNodes.forEach((node, idx) => {
      node.radius = nodeRadius;
      if (node === draggingNode) return;
      const target = getNodeTarget(node, idx, activeNodes);

      if (prefersReducedMotion) {
        node.x = target.x;
        node.y = target.y;
        return;
      }

      const floatX = Math.cos(timeMs * 0.0008 + idx) * 2.5;
      const floatY = Math.sin(timeMs * 0.0009 + idx * 1.4) * 2.5;

      node.vx += (target.x + floatX - node.x) * 0.09;
      node.vy += (target.y + floatY - node.y) * 0.09;

      for (let j = 0; j < activeNodes.length; j += 1) {
        if (idx === j) continue;
        const other = activeNodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.hypot(dx, dy) || 1;
        const minDist = node.radius + other.radius + 14;
        if (dist < minDist) {
          const force = ((minDist - dist) / minDist) * 1.2;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }
      }

      node.vx *= 0.78;
      node.vy *= 0.78;
      node.x = Math.max(node.radius + 24, Math.min(width - node.radius - 24, node.x + node.vx));
      node.y = Math.max(node.radius + 12, Math.min(height - node.radius - 24, node.y + node.vy));
    });
  }

  function drawPulseDot(x1, y1, x2, y2, progress, color, r = 3) {
    const px = x1 + (x2 - x1) * progress;
    const py = y1 + (y2 - y1) * progress;
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawCanvas(timeMs) {
    stepPhysics(timeMs);
    const activeNodes = getFilteredNodes();
    const visibleCategories = getVisibleCategories();
    const selectedNode = activeNodes.find((n) => n.id === selectedId) || activeNodes[0];
    const selectedCategory = selectedNode?.category;
    const pulseAll = highlightAllUntil > timeMs;

    const { isMobile, center: centerRadius, hub: hubRadius } = getRadii();
    const center = getCenterPos();

    const isLight = document.documentElement.dataset.studioTime === 'pagi';
    const inactiveLine = isLight ? 'rgba(11, 25, 34, 0.14)' : 'rgba(147, 176, 190, 0.22)';
    const labelColor = isLight ? '#0b1922' : '#eef6f9';
    const subColor = isLight ? '#466170' : '#93b0be';
    const cardFill = isLight ? '#ffffff' : '#132836';
    const pillBg = isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(12, 26, 36, 0.88)';
    const pulsePhase = prefersReducedMotion ? 0.5 : (timeMs * 0.00055) % 1;

    ctx.clearRect(0, 0, width, height);

    // Tier 0 -> Tier 1: Trunk lines from M. Syamsul portrait center to Category Hubs
    visibleCategories.forEach((catKey, catIdx) => {
      const meta = CATEGORY_META[catKey];
      const hub = getHubPos(catKey);
      const isLit = pulseAll || catKey === selectedCategory || hoveredTarget?.category === catKey;

      ctx.strokeStyle = isLit ? meta.color : inactiveLine;
      ctx.globalAlpha = isLit ? 0.85 : 0.72;
      ctx.lineWidth = isLit ? 2.4 : 1.3;
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(hub.x, hub.y);
      ctx.stroke();

      if (isLit && !prefersReducedMotion) {
        ctx.globalAlpha = 0.95;
        drawPulseDot(center.x, center.y, hub.x, hub.y, (pulsePhase + catIdx * 0.17) % 1, meta.color, 3.2);
      }
    });
    ctx.globalAlpha = 1;

    // Tier 1 -> Tier 2: Branch lines from each Category Hub to its Skill Leaves
    activeNodes.forEach((node) => {
      const meta = CATEGORY_META[node.category];
      const hub = getHubPos(node.category);
      const isNodeLit =
        pulseAll || node.id === selectedId || (hoveredTarget?.type === 'skill' && hoveredTarget.node.id === node.id);

      ctx.strokeStyle = isNodeLit ? meta.color : inactiveLine;
      ctx.globalAlpha = isNodeLit ? 0.9 : 0.65;
      ctx.lineWidth = isNodeLit ? 2.1 : 1.1;
      ctx.beginPath();
      ctx.moveTo(hub.x, hub.y);
      ctx.lineTo(node.x, node.y);
      ctx.stroke();

      if (node.id === selectedId && !prefersReducedMotion) {
        ctx.globalAlpha = 0.95;
        drawPulseDot(hub.x, hub.y, node.x, node.y, pulsePhase, meta.color, 3);
      }
    });
    ctx.globalAlpha = 1;

    // Tier 1 Nodes: 4 Category Hubs
    visibleCategories.forEach((catKey) => {
      const meta = CATEGORY_META[catKey];
      const hub = getHubPos(catKey);
      const isHubLit =
        pulseAll ||
        catKey === selectedCategory ||
        (hoveredTarget?.type === 'hub' && hoveredTarget.category === catKey);

      if (isHubLit) {
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, hubRadius + 7, 0, Math.PI * 2);
        ctx.fillStyle = meta.color;
        ctx.globalAlpha = 0.16;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      ctx.arc(hub.x, hub.y, hubRadius, 0, Math.PI * 2);
      ctx.fillStyle = cardFill;
      ctx.fill();
      ctx.lineWidth = isHubLit ? 2.4 : 1.8;
      ctx.strokeStyle = meta.color;
      ctx.stroke();

      // Inner category ring accent
      ctx.beginPath();
      ctx.arc(hub.x, hub.y, hubRadius - 4, 0, Math.PI * 2);
      ctx.strokeStyle = meta.color;
      ctx.globalAlpha = 0.28;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.font = `700 ${isMobile ? 13 : 13}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isHubLit ? meta.color : labelColor;
      ctx.fillText(meta.code, hub.x, hub.y);

      ctx.font = '600 13px "Space Grotesk", sans-serif';
      const labelW = ctx.measureText(meta.label).width + 12;
      const ly = hub.y + hubRadius + 13;
      ctx.fillStyle = pillBg;
      ctx.beginPath();
      ctx.roundRect(hub.x - labelW / 2, ly - 9, labelW, 18, 9);
      ctx.fill();
      ctx.fillStyle = isHubLit ? labelColor : subColor;
      ctx.fillText(meta.label, hub.x, ly);
    });

    // Tier 2 Nodes: 15 Skill Leaves
    activeNodes.forEach((node) => {
      const meta = CATEGORY_META[node.category];
      const color = meta?.color || '#18d2b6';
      const isSelected = node.id === selectedId;
      const isHovered = hoveredTarget?.type === 'skill' && hoveredTarget.node.id === node.id;

      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = isSelected ? 0.22 : 0.14;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? color : cardFill;
      ctx.fill();
      ctx.lineWidth = isSelected ? 2.4 : 1.5;
      ctx.strokeStyle = color;
      ctx.stroke();

      ctx.font = '600 13px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isSelected ? '#04221d' : labelColor;
      ctx.fillText(node.code || node.category.slice(0, 3).toUpperCase(), node.x, node.y);

      const displayLabel = isMobile ? MOBILE_LABELS[node.id] || node.name : node.name;
      ctx.font = '600 13px "Space Grotesk", sans-serif';
      ctx.fillStyle = isSelected || isHovered ? labelColor : subColor;
      ctx.fillText(displayLabel, node.x, node.y + node.radius + 14);
    });

    // Tier 0 Node: M. Syamsul Center Character Medallion
    const isCenterLit = pulseAll || hoveredTarget?.type === 'center';
    ctx.beginPath();
    ctx.arc(center.x, center.y, centerRadius + (isCenterLit ? 12 : 8), 0, Math.PI * 2);
    ctx.fillStyle = '#18d2b6';
    ctx.globalAlpha = isCenterLit ? 0.24 : 0.14;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.save();
    ctx.beginPath();
    ctx.arc(center.x, center.y, centerRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const grad = ctx.createRadialGradient(
      center.x,
      center.y - centerRadius * 0.3,
      4,
      center.x,
      center.y,
      centerRadius
    );
    grad.addColorStop(0, isLight ? '#ffffff' : '#1b3546');
    grad.addColorStop(1, isLight ? '#e4f1ef' : '#0d202c');
    ctx.fillStyle = grad;
    ctx.fillRect(center.x - centerRadius, center.y - centerRadius, centerRadius * 2, centerRadius * 2);

    const readyImg = getReadyCharImg();
    if (readyImg) {
      const iw = readyImg.naturalWidth;
      const ih = readyImg.naturalHeight;
      const sw = iw * 0.62;
      const sh = iw * 0.62;
      const sx = iw * 0.19;
      const sy = ih * 0.015;
      ctx.drawImage(
        readyImg,
        sx,
        sy,
        sw,
        sh,
        center.x - centerRadius,
        center.y - centerRadius,
        centerRadius * 2,
        centerRadius * 2
      );
    } else {
      ctx.font = '700 16px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = labelColor;
      ctx.fillText('MS', center.x, center.y);
    }
    ctx.restore();

    ctx.beginPath();
    ctx.arc(center.x, center.y, centerRadius, 0, Math.PI * 2);
    ctx.lineWidth = 2.6;
    ctx.strokeStyle = '#18d2b6';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center.x, center.y, centerRadius - 2.5, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.22)';
    ctx.stroke();

    ctx.font = '700 13px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const centerLabel = 'M. Syamsul';
    const badgeW = ctx.measureText(centerLabel).width + 16;
    const badgeY = center.y + centerRadius + 13;
    ctx.fillStyle = pillBg;
    ctx.beginPath();
    ctx.roundRect(center.x - badgeW / 2, badgeY - 10, badgeW, 20, 10);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(24, 210, 182, 0.45)';
    ctx.stroke();
    ctx.fillStyle = labelColor;
    ctx.fillText(centerLabel, center.x, badgeY);

    requestAnimationFrame(drawCanvas);
  }

  function findTargetAt(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const activeNodes = getFilteredNodes();

    for (let i = activeNodes.length - 1; i >= 0; i -= 1) {
      const n = activeNodes[i];
      if (Math.hypot(px - n.x, py - n.y) <= n.radius + 10) {
        return { type: 'skill', node: n, px, py };
      }
    }

    const { center: centerRadius, hub: hubRadius } = getRadii();
    const center = getCenterPos();
    if (Math.hypot(px - center.x, py - center.y) <= centerRadius + 8) {
      return { type: 'center', px, py };
    }

    const visibleCategories = getVisibleCategories();
    for (let i = visibleCategories.length - 1; i >= 0; i -= 1) {
      const catKey = visibleCategories[i];
      const hub = getHubPos(catKey);
      if (Math.hypot(px - hub.x, py - hub.y) <= hubRadius + 10) {
        return { type: 'hub', category: catKey, px, py };
      }
    }

    return null;
  }

  canvas.addEventListener('pointerdown', (event) => {
    const hit = findTargetAt(event.clientX, event.clientY);
    if (!hit) return;
    soundEngine.playClick();

    if (hit.type === 'skill') {
      draggingNode = hit.node;
      canvas.setPointerCapture(event.pointerId);
      renderInspector(hit.node.id);
      return;
    }

    if (hit.type === 'hub') {
      const firstInCat = getPortfolioData().skills.find((s) => s.category === hit.category);
      if (firstInCat) renderInspector(firstInCat.id);
      return;
    }

    if (hit.type === 'center') {
      highlightAllUntil = performance.now() + 1800;
      const skills = getPortfolioData().skills;
      const currentSkill = skills.find((s) => s.id === selectedId);
      const curCatIdx = CATEGORY_ORDER.indexOf(currentSkill?.category || 'AI');
      const nextCat = CATEGORY_ORDER[(curCatIdx + 1) % CATEGORY_ORDER.length];
      const targetList = activeCategory === 'all' ? skills : getFilteredNodes();
      const nextSkill =
        targetList.find((s) => s.category === nextCat) ||
        targetList[(targetList.findIndex((s) => s.id === selectedId) + 1) % targetList.length];
      if (nextSkill) renderInspector(nextSkill.id);
    }
  });

  canvas.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;

    if (draggingNode) {
      draggingNode.x = Math.max(draggingNode.radius + 16, Math.min(width - draggingNode.radius - 16, px));
      draggingNode.y = Math.max(draggingNode.radius + 16, Math.min(height - draggingNode.radius - 16, py));
      draggingNode.vx = 0;
      draggingNode.vy = 0;
      return;
    }

    const hit = findTargetAt(event.clientX, event.clientY);
    hoveredTarget = hit;
    if (!hit) {
      canvas.style.cursor = 'default';
    } else if (hit.type === 'skill') {
      canvas.style.cursor = 'grab';
    } else {
      canvas.style.cursor = 'pointer';
    }
  });

  canvas.addEventListener('pointerup', (event) => {
    if (draggingNode) {
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
        // Ignore if pointer capture already ended
      }
      draggingNode = null;
    }
  });

  tabsWrap.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-category]');
    if (!tab) return;
    soundEngine.playClick();
    activeCategory = tab.dataset.category;
    tabsWrap.querySelectorAll('[data-category]').forEach((btn) => {
      const match = btn === tab;
      btn.classList.toggle('is-active', match);
      btn.setAttribute('aria-selected', String(match));
    });

    const filtered = getFilteredNodes();
    if (filtered.length && !filtered.some((n) => n.id === selectedId)) {
      renderInspector(filtered[0].id);
    }
    renderAccessibleList();
  });

  listWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-cat-pick]');
    if (!btn) return;
    soundEngine.playClick();
    const catKey = btn.dataset.catPick;
    if (activeCategory !== 'all' && activeCategory !== catKey) {
      tabsWrap.querySelector(`[data-category="${catKey}"]`)?.click();
      return;
    }
    const leadSkill = getPortfolioData().skills.find((s) => s.category === catKey);
    if (leadSkill) {
      highlightAllUntil = performance.now() + 900;
      renderInspector(leadSkill.id);
    }
  });

  inspectorProjects.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-project-id]');
    if (!btn) return;
    soundEngine.playClick();
    onSelectProject?.(btn.dataset.projectId);
  });

  resize();
  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
  } else {
    window.addEventListener('resize', resize);
  }

  renderAccessibleList();
  renderInspector(selectedId);
  onLangChange(() => {
    renderAccessibleList();
    renderInspector(selectedId);
  });
  requestAnimationFrame(drawCanvas);

  return {
    focusCategory(cat) {
      const btn = tabsWrap.querySelector(`[data-category="${cat}"]`);
      if (btn) btn.click();
    },
  };
}
