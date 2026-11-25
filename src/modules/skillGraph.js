import { portfolioData } from '../data/portfolioData.js';
import { soundEngine } from './soundEngine.js';

const CATEGORY_COLORS = {
  AI: '#18d2b6',
  Language: '#68b5ff',
  Database: '#ffb454',
  Tech: '#f47a93',
};

/**
 * Interactive Force-Directed / Spring-Physics Skill Constellation on HTML5 Canvas.
 * Supports category filtering, pointer dragging, hover highlight, and synchronized Inspector.
 */
export function initSkillGraph({ onSelectProject }) {
  const wrap = document.getElementById('skillCanvasWrap');
  const canvas = document.getElementById('skillCanvas');
  const tabsWrap = document.getElementById('skillCategoryTabs');
  const listWrap = document.getElementById('skillAccessibleList');
  const inspectorName = document.getElementById('skillInspectorName');
  const inspectorCat = document.getElementById('skillInspectorCat');
  const inspectorScore = document.getElementById('skillInspectorScore');
  const inspectorBar = document.getElementById('skillInspectorBar');
  const inspectorUsage = document.getElementById('skillInspectorUsage');
  const inspectorProjects = document.getElementById('skillInspectorProjects');

  if (!wrap || !canvas || !tabsWrap || !listWrap) return null;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 640;
  let height = 420;
  let activeCategory = 'all';
  let selectedId = portfolioData.skills[0].id;
  let hoveredId = null;
  let draggingNode = null;

  const nodes = portfolioData.skills.map((skill, idx) => {
    const angle = (idx / portfolioData.skills.length) * Math.PI * 2;
    return {
      ...skill,
      x: 320 + Math.cos(angle) * 150,
      y: 210 + Math.sin(angle) * 130,
      vx: 0,
      vy: 0,
      radius: 15 + (skill.level - 78) * 0.45,
    };
  });

  function getHubTarget(category) {
    if (category === 'AI') return { x: width * 0.26, y: height * 0.28 };
    if (category === 'Language') return { x: width * 0.74, y: height * 0.28 };
    if (category === 'Database') return { x: width * 0.26, y: height * 0.72 };
    return { x: width * 0.72, y: height * 0.72 };
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

    // Keep nodes safely inside bounds after resize
    nodes.forEach((node) => {
      node.x = Math.max(46, Math.min(width - 46, node.x));
      node.y = Math.max(46, Math.min(height - 46, node.y));
    });
  }

  function renderInspector(skillId) {
    const skill = portfolioData.skills.find((s) => s.id === skillId) || portfolioData.skills[0];
    selectedId = skill.id;

    inspectorName.textContent = skill.name;
    inspectorCat.textContent = `Kategori: ${skill.category}`;
    inspectorScore.textContent = `${skill.level}%`;
    inspectorBar.style.width = `${skill.level}%`;
    inspectorUsage.textContent = skill.usage;

    inspectorProjects.innerHTML = skill.relatedProjects
      .map((pid) => {
        const proj = portfolioData.projects.find((p) => p.id === pid);
        if (!proj) return '';
        return `<button type="button" class="inline-jump-btn" data-project-id="${proj.id}">${proj.shortTitle}</button>`;
      })
      .join('');

    listWrap.querySelectorAll('.skill-list-btn').forEach((btn) => {
      const isActive = btn.dataset.skillId === selectedId;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  function renderAccessibleList() {
    const visibleSkills =
      activeCategory === 'all'
        ? portfolioData.skills
        : portfolioData.skills.filter((s) => s.category === activeCategory);

    listWrap.innerHTML = visibleSkills
      .map(
        (s) => `
      <button
        type="button"
        class="skill-list-btn${s.id === selectedId ? ' is-active' : ''}"
        data-skill-id="${s.id}"
        aria-pressed="${s.id === selectedId}"
      >
        <span>${s.name}</span>
        <span class="tabular-nums">${s.level}%</span>
      </button>
    `
      )
      .join('');
  }

  function getFilteredNodes() {
    return activeCategory === 'all' ? nodes : nodes.filter((n) => n.category === activeCategory);
  }

  function stepPhysics(timeMs) {
    const activeNodes = getFilteredNodes();

    if (!prefersReducedMotion) {
      activeNodes.forEach((node, idx) => {
        if (node === draggingNode) return;
        const target =
          activeCategory === 'all'
            ? getHubTarget(node.category)
            : { x: width * 0.5, y: height * 0.5 };

        const floatX = Math.cos(timeMs * 0.0008 + idx) * 14;
        const floatY = Math.sin(timeMs * 0.0009 + idx * 1.4) * 14;

        node.vx += (target.x + floatX - node.x) * 0.012;
        node.vy += (target.y + floatY - node.y) * 0.012;

        // Repulsion between visible nodes (extra room for node text labels)
        for (let j = 0; j < activeNodes.length; j += 1) {
          if (idx === j) continue;
          const other = activeNodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy) || 1;
          const minDist = node.radius + other.radius + 78;
          if (dist < minDist) {
            const force = ((minDist - dist) / minDist) * 1.85;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        node.vx *= 0.84;
        node.vy *= 0.84;
        node.x = Math.max(node.radius + 26, Math.min(width - node.radius - 26, node.x + node.vx));
        node.y = Math.max(node.radius + 24, Math.min(height - node.radius - 24, node.y + node.vy));
      });
    } else {
      activeNodes.forEach((node, idx) => {
        const cols = Math.min(4, activeNodes.length);
        const row = Math.floor(idx / cols);
        const col = idx % cols;
        node.x = ((col + 1) / (cols + 1)) * width;
        node.y = 85 + row * 120;
      });
    }
  }

  function drawCanvas(timeMs) {
    stepPhysics(timeMs);
    const activeNodes = getFilteredNodes();
    const isLight = document.documentElement.dataset.studioTime === 'pagi';
    const lineColor = isLight ? 'rgba(11, 25, 34, 0.14)' : 'rgba(147, 176, 190, 0.2)';
    const labelColor = isLight ? '#0b1922' : '#eef6f9';
    const subColor = isLight ? '#466170' : '#93b0be';

    ctx.clearRect(0, 0, width, height);

    // Draw edges between nodes in same category or linked to selected node
    for (let i = 0; i < activeNodes.length; i += 1) {
      for (let j = i + 1; j < activeNodes.length; j += 1) {
        const a = activeNodes[i];
        const b = activeNodes[j];
        const isSelectedLink = a.id === selectedId || b.id === selectedId;
        if (a.category === b.category || isSelectedLink) {
          ctx.strokeStyle = isSelectedLink
            ? CATEGORY_COLORS[a.category] || '#18d2b6'
            : lineColor;
          ctx.globalAlpha = isSelectedLink ? 0.45 : 0.65;
          ctx.lineWidth = isSelectedLink ? 1.6 : 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    // Draw nodes
    activeNodes.forEach((node) => {
      const color = CATEGORY_COLORS[node.category] || '#18d2b6';
      const isSelected = node.id === selectedId;
      const isHovered = node.id === hoveredId;

      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 9, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = isSelected ? 0.22 : 0.14;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = isSelected ? color : isLight ? '#ffffff' : '#132836';
      ctx.fill();
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.strokeStyle = color;
      ctx.stroke();

      // Percentage inside node
      ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isSelected ? '#04221d' : labelColor;
      ctx.fillText(`${node.level}%`, node.x, node.y);

      // Skill name below node
      ctx.font = '600 13px "Space Grotesk", sans-serif';
      ctx.fillStyle = isSelected || isHovered ? labelColor : subColor;
      ctx.fillText(node.name, node.x, node.y + node.radius + 14);
    });

    requestAnimationFrame(drawCanvas);
  }

  function findNodeAt(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const activeNodes = getFilteredNodes();
    for (let i = activeNodes.length - 1; i >= 0; i -= 1) {
      const n = activeNodes[i];
      if (Math.hypot(px - n.x, py - n.y) <= n.radius + 10) {
        return { node: n, px, py };
      }
    }
    return null;
  }

  canvas.addEventListener('pointerdown', (event) => {
    const hit = findNodeAt(event.clientX, event.clientY);
    if (!hit) return;
    draggingNode = hit.node;
    canvas.setPointerCapture(event.pointerId);
    soundEngine.playClick();
    renderInspector(hit.node.id);
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

    const hit = findNodeAt(event.clientX, event.clientY);
    hoveredId = hit ? hit.node.id : null;
    canvas.style.cursor = hit ? 'grab' : 'default';
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
    const btn = event.target.closest('[data-skill-id]');
    if (!btn) return;
    soundEngine.playClick();
    renderInspector(btn.dataset.skillId);
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
  requestAnimationFrame(drawCanvas);

  return {
    focusCategory(cat) {
      const btn = tabsWrap.querySelector(`[data-category="${cat}"]`);
      if (btn) btn.click();
    },
  };
}
