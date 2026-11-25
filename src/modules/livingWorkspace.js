import { portfolioData } from '../data/portfolioData.js';
import { soundEngine } from './soundEngine.js';

/**
 * Interactive 2.5D Living Workspace Diorama Stage.
 * Combines layered room background, procedural canvas lighting/particles,
 * pointer-reactive parallax character, clickable hotspots, and synced HUD.
 */
export function initLivingWorkspace({ getTimeMode, onRequestSection, onActionToast }) {
  const stage = document.getElementById('workspaceStage');
  const bgLayer = document.getElementById('workspaceBgLayer');
  const charLayer = document.getElementById('workspaceCharLayer');
  const canvas = document.getElementById('workspaceCanvas');
  const hotspotsWrap = document.getElementById('workspaceHotspots');
  const speechBubble = document.getElementById('charSpeechBubble');
  const speechText = document.getElementById('charSpeechText');
  const hudTitle = document.getElementById('hudHotspotTitle');
  const hudSummary = document.getElementById('hudHotspotSummary');
  const hudActionBtn = document.getElementById('hudHotspotAction');
  const lampSwitchBtn = document.getElementById('workspaceLampBtn');

  if (!stage || !canvas || !hotspotsWrap) return null;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lampOn = true;
  let activeHotspotId = 'ai-terminal';
  let targetPointer = { x: 0, y: 0 };
  let currentPointer = { x: 0, y: 0 };
  let pointerCanvas = { x: -999, y: -999 };
  let speechTimer = null;
  let stageWidth = 960;
  let stageHeight = 540;

  const particles = Array.from({ length: 34 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 1.2 + Math.random() * 2.2,
    vx: (Math.random() - 0.5) * 0.00025,
    vy: -0.00018 - Math.random() * 0.00028,
    phase: Math.random() * Math.PI * 2,
  }));

  const stars = Array.from({ length: 24 }, () => ({
    x: 0.37 + Math.random() * 0.25,
    y: 0.19 + Math.random() * 0.26,
    r: 0.9 + Math.random() * 1.4,
    phase: Math.random() * Math.PI * 2,
  }));

  function resizeCanvas() {
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    stageWidth = rect.width;
    stageHeight = rect.height;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function renderHotspots() {
    hotspotsWrap.innerHTML = portfolioData.workspaceHotspots
      .map(
        (hs, index) => `
      <button
        type="button"
        class="hotspot-pin${hs.id === activeHotspotId ? ' is-active' : ''}"
        style="left: ${hs.x}%; top: ${hs.y}%;"
        data-hotspot-id="${hs.id}"
        aria-label="${hs.title}"
        aria-pressed="${hs.id === activeHotspotId}"
      >
        <span class="hotspot-ring" aria-hidden="true"></span>
        <span class="hotspot-dot" aria-hidden="true">${index + 1}</span>
        <span class="hotspot-tooltip">${hs.title}</span>
      </button>
    `
      )
      .join('');
  }

  function showSpeech(message) {
    if (!speechBubble || !speechText) return;
    speechText.textContent = message;
    speechBubble.classList.add('is-visible');
    clearTimeout(speechTimer);
    speechTimer = window.setTimeout(() => {
      speechBubble.classList.remove('is-visible');
    }, 6500);
  }

  function updateHud(hotspotId) {
    const hotspot =
      portfolioData.workspaceHotspots.find((item) => item.id === hotspotId) ||
      portfolioData.workspaceHotspots[0];
    if (!hotspot) return;

    activeHotspotId = hotspot.id;
    hudTitle.textContent = hotspot.title;
    hudSummary.textContent = hotspot.summary;
    hudActionBtn.textContent = hotspot.ctaLabel;
    hudActionBtn.dataset.target = hotspot.targetSection;

    hotspotsWrap.querySelectorAll('.hotspot-pin').forEach((btn) => {
      const isMatch = btn.dataset.hotspotId === hotspot.id;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', String(isMatch));
    });
  }

  function toggleLamp(forceState) {
    lampOn = typeof forceState === 'boolean' ? forceState : !lampOn;
    stage.dataset.lamp = lampOn ? 'on' : 'off';
    if (lampSwitchBtn) {
      lampSwitchBtn.setAttribute('aria-pressed', String(lampOn));
      lampSwitchBtn.textContent = lampOn ? 'Lampu meja: Nyala' : 'Lampu meja: Mati';
    }
    soundEngine.playLampToggle(lampOn);
    showSpeech(
      lampOn
        ? 'Lampu meja dinyalakan. Fokus coding dan riset AI siap dijalankan.'
        : 'Lampu meja dimatikan. Mode layar redup untuk eksplorasi santai.'
    );
    return lampOn;
  }

  function selectHotspot(hotspotId, { announce = true } = {}) {
    const hotspot = portfolioData.workspaceHotspots.find((item) => item.id === hotspotId);
    if (!hotspot) return;

    updateHud(hotspot.id);
    if (hotspot.actionType === 'toggle-lamp') {
      toggleLamp();
      return;
    }

    soundEngine.playChime();
    if (announce) {
      showSpeech(hotspot.speech);
    }
  }

  hotspotsWrap.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-hotspot-id]');
    if (!btn) return;
    selectHotspot(btn.dataset.hotspotId);
  });

  if (hudActionBtn) {
    hudActionBtn.addEventListener('click', () => {
      soundEngine.playClick();
      const target = hudActionBtn.dataset.target || '#ai-studio';
      onRequestSection?.(target);
    });
  }

  if (lampSwitchBtn) {
    lampSwitchBtn.addEventListener('click', () => {
      toggleLamp();
      updateHud('lamp');
    });
  }

  if (charLayer) {
    const charQuotes = [
      'Halo! Klik titik bernomor di ruangan ini untuk menelusuri proyek, keahlian AI, atau nyalakan lampu meja.',
      'Di PT. BCS Logistics saya merancang aplikasi Presensi Online Android & iOS serta layanan kesehatan doklinc.',
      'Tertarik kolaborasi AI Agent atau sistem kampus? Coba tanya asisten AI saya di bagian bawah.',
    ];
    let quoteIdx = 0;
    charLayer.addEventListener('click', () => {
      soundEngine.playChime();
      showSpeech(charQuotes[quoteIdx % charQuotes.length]);
      quoteIdx += 1;
      charLayer.classList.add('is-greeting');
      window.setTimeout(() => charLayer.classList.remove('is-greeting'), 420);
    });
  }

  stage.addEventListener('pointermove', (event) => {
    const rect = stage.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    targetPointer = {
      x: Math.max(-0.5, Math.min(0.5, nx)),
      y: Math.max(-0.5, Math.min(0.5, ny)),
    };
    pointerCanvas = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  });

  stage.addEventListener('pointerleave', () => {
    targetPointer = { x: 0, y: 0 };
    pointerCanvas = { x: -999, y: -999 };
  });

  function drawAtmosphere(timeMs) {
    const t = timeMs * 0.001;
    const w = stageWidth;
    const h = stageHeight;
    const mode = getTimeMode();

    ctx.clearRect(0, 0, w, h);

    // 1. Dynamic sky inside window rectangle (aligns with 16:9 room illustration)
    const winX = w * 0.362;
    const winY = h * 0.194;
    const winW = w * 0.276;
    const winH = h * 0.326;

    if (mode === 'malam') {
      const skyGrad = ctx.createLinearGradient(0, winY, 0, winY + winH);
      skyGrad.addColorStop(0, 'rgba(6, 17, 32, 0.88)');
      skyGrad.addColorStop(1, 'rgba(14, 42, 64, 0.72)');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(winX, winY, winW, winH);

      stars.forEach((star) => {
        const alpha = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(t * 1.6 + star.phase));
        ctx.fillStyle = `rgba(220, 245, 255, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (mode === 'senja') {
      const duskGrad = ctx.createLinearGradient(0, winY, 0, winY + winH);
      duskGrad.addColorStop(0, 'rgba(42, 31, 66, 0.52)');
      duskGrad.addColorStop(0.58, 'rgba(232, 114, 58, 0.45)');
      duskGrad.addColorStop(1, 'rgba(255, 198, 108, 0.35)');
      ctx.fillStyle = duskGrad;
      ctx.fillRect(winX, winY, winW, winH);
    } else {
      const sunGrad = ctx.createLinearGradient(winX, winY, winX + winW * 0.9, winY + winH * 1.4);
      sunGrad.addColorStop(0, 'rgba(255, 250, 224, 0.24)');
      sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(winX, winY, winW, winH);
    }

    // 2. Overall ambient tint for evening/night immersion
    if (mode === 'malam') {
      ctx.fillStyle = 'rgba(6, 16, 26, 0.46)';
      ctx.fillRect(0, 0, w, h);
    } else if (mode === 'senja') {
      ctx.fillStyle = 'rgba(34, 18, 28, 0.22)';
      ctx.fillRect(0, 0, w, h);
    }

    // 3. Laptop screen cyan telemetry glow on the desk (full canvas fill prevents clip edge)
    const screenGlow = ctx.createRadialGradient(
      w * 0.68,
      h * 0.52,
      w * 0.01,
      w * 0.68,
      h * 0.52,
      w * 0.22
    );
    const screenAlpha = mode === 'malam' ? 0.34 : mode === 'senja' ? 0.22 : 0.1;
    screenGlow.addColorStop(0, `rgba(24, 210, 182, ${screenAlpha})`);
    screenGlow.addColorStop(1, 'rgba(24, 210, 182, 0)');
    ctx.fillStyle = screenGlow;
    ctx.fillRect(0, 0, w, h);

    // 4. Warm bedside lamp light cone when lamp is ON (full canvas fill prevents clip edge)
    if (lampOn) {
      const lampStrength = mode === 'malam' ? 0.48 : mode === 'senja' ? 0.34 : 0.15;
      const cone = ctx.createRadialGradient(
        w * 0.21,
        h * 0.47,
        w * 0.01,
        w * 0.21,
        h * 0.54,
        w * 0.34
      );
      cone.addColorStop(0, `rgba(255, 214, 134, ${lampStrength})`);
      cone.addColorStop(0.55, `rgba(255, 174, 72, ${(lampStrength * 0.36).toFixed(2)})`);
      cone.addColorStop(1, 'rgba(255, 174, 72, 0)');
      ctx.fillStyle = cone;
      ctx.fillRect(0, 0, w, h);
    }

    // 5. Interactive pointer spotlight
    if (pointerCanvas.x > 0 && pointerCanvas.y > 0) {
      const spot = ctx.createRadialGradient(
        pointerCanvas.x,
        pointerCanvas.y,
        4,
        pointerCanvas.x,
        pointerCanvas.y,
        w * 0.18
      );
      spot.addColorStop(
        0,
        mode === 'pagi' ? 'rgba(0, 122, 108, 0.10)' : 'rgba(24, 210, 182, 0.14)'
      );
      spot.addColorStop(1, 'rgba(24, 210, 182, 0)');
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, w, h);
    }

    // 6. Floating dust motes / ambient particles
    particles.forEach((p) => {
      if (!prefersReducedMotion) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.02) p.y = 1.02;
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;
      }
      const shimmer = 0.22 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.4 + p.phase));
      ctx.fillStyle =
        mode === 'pagi'
          ? `rgba(255, 255, 255, ${(shimmer * 0.9).toFixed(2)})`
          : `rgba(170, 240, 232, ${(shimmer * 0.75).toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function animate(timeMs) {
    if (!prefersReducedMotion) {
      currentPointer.x += (targetPointer.x - currentPointer.x) * 0.08;
      currentPointer.y += (targetPointer.y - currentPointer.y) * 0.08;

      if (bgLayer) {
        bgLayer.style.transform = `translate3d(${(-currentPointer.x * 10).toFixed(2)}px, ${(-currentPointer.y * 6).toFixed(2)}px, 0) scale(1.03)`;
      }
      if (charLayer) {
        const floatY = Math.sin(timeMs * 0.0018) * 3;
        charLayer.style.transform = `translate3d(${(currentPointer.x * 18).toFixed(2)}px, ${(currentPointer.y * 8 + floatY).toFixed(2)}px, 0)`;
      }
    }

    drawAtmosphere(timeMs);
    requestAnimationFrame(animate);
  }

  renderHotspots();
  updateHud(activeHotspotId);
  resizeCanvas();

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(stage);
  } else {
    window.addEventListener('resize', resizeCanvas);
  }

  requestAnimationFrame(animate);

  return {
    toggleLamp,
    selectHotspot,
    refreshMode() {
      const modeLabel =
        getTimeMode() === 'pagi'
          ? 'Pagi cerah di Cilegon'
          : getTimeMode() === 'senja'
            ? 'Senja pelabuhan'
            : 'Malam fokus developer';
      onActionToast?.(`Suasana studio diubah ke ${modeLabel}`);
    },
  };
}
