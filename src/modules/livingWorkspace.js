import { getLang, getPortfolioData, onLangChange, t } from '../data/i18n.js';
import { soundEngine } from './soundEngine.js';

const CHAR_QUOTES = {
  id: [
    'Halo! Klik titik bernomor di ruangan ini untuk menelusuri proyek, keahlian AI, atau nyalakan lampu meja.',
    'Di PT. BCS Logistics saya merancang aplikasi Presensi Online Android & iOS serta layanan kesehatan doklinc.',
    'Tertarik kolaborasi AI Agent atau sistem kampus? Coba tanya asisten AI saya di bagian bawah.',
  ],
  en: [
    'Hi! Click the numbered hotspots around this room to explore projects, AI skills, or toggle the desk lamp.',
    'At PT. BCS Logistics I engineered the Android & iOS Online Attendance App and the doklinc healthcare app.',
    'Interested in AI Agent workflows or custom institutional apps? Try asking my AI assistant below.',
  ],
};

// Measured normalized pixel coordinates on character_anime_clean.png (576 x 1024)
const CHAR_RIG = {
  skinTone: '#ffeed9',
  lashColor: '#3a261c',
  mouthInterior: '#a4544c',
  leftEye: { cx: 0.449, cy: 0.1255, rx: 0.017, ry: 0.0068 },
  rightEye: { cx: 0.5205, cy: 0.124, rx: 0.0185, ry: 0.0068 },
  mouth: { cx: 0.489, cy: 0.1592, w: 0.026 },
};

/**
 * Interactive 2.5D Living Workspace Diorama Stage with full ID/EN support.
 */
export function initLivingWorkspace({ getTimeMode, onRequestSection, onActionToast }) {
  const stage = document.getElementById('workspaceStage');
  const bgLayer = document.getElementById('workspaceBgLayer');
  const charCanvas = document.getElementById('workspaceCharCanvas');
  const charSourceImg = document.getElementById('workspaceCharSource');
  const canvas = document.getElementById('workspaceCanvas');
  const hotspotsWrap = document.getElementById('workspaceHotspots');
  const speechBubble = document.getElementById('charSpeechBubble');
  const speechText = document.getElementById('charSpeechText');
  const hudTitle = document.getElementById('hudHotspotTitle');
  const hudSummary = document.getElementById('hudHotspotSummary');
  const hudActionBtn = document.getElementById('hudHotspotAction');
  const lampSwitchBtn = document.getElementById('workspaceLampBtn');
  const greetBtn = document.getElementById('workspaceGreetBtn');

  if (!stage || !canvas || !hotspotsWrap) return null;

  const ctx = canvas.getContext('2d');
  const ctxChar = charCanvas ? charCanvas.getContext('2d') : null;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let lampOn = getTimeMode() !== 'pagi';
  let aiBusy = false;
  let activeHotspotId = 'ai-terminal';
  let targetPointer = { x: 0, y: 0 };
  let currentPointer = { x: 0, y: 0 };
  let pointerCanvas = { x: -999, y: -999 };
  let speechTimer = null;
  let stageWidth = 960;
  let stageHeight = 540;
  let charWidth = 190;
  let charHeight = 338;
  let quoteIdx = 0;

  let charImgReady = Boolean(charSourceImg?.complete && charSourceImg.naturalWidth > 0);
  let nextBlinkAt = performance.now() + 2600;
  let blinkStart = -1;
  let pendingDoubleBlink = false;
  let smileUntil = 0;
  let talkingUntil = performance.now() + 2200;

  if (charSourceImg && !charImgReady) {
    charSourceImg.addEventListener('load', () => {
      charImgReady = true;
    });
  }

  const particles = Array.from({ length: 34 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 1.2 + Math.random() * 2.1,
    vx: (Math.random() - 0.5) * 0.00025,
    vy: -0.00018 - Math.random() * 0.00028,
    phase: Math.random() * Math.PI * 2,
  }));

  const stars = Array.from({ length: 28 }, (_, idx) => {
    const isLeft = idx % 2 === 0;
    return {
      x: isLeft ? 0.368 + Math.random() * 0.12 : 0.512 + Math.random() * 0.118,
      y: 0.215 + Math.random() * 0.25,
      r: 0.85 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
    };
  });

  const clouds = [
    { baseX: 0.38, y: 0.29, w: 0.085, h: 0.022, speed: 0.0035 },
    { baseX: 0.52, y: 0.25, w: 0.095, h: 0.024, speed: 0.0026 },
    { baseX: 0.45, y: 0.37, w: 0.075, h: 0.018, speed: 0.0042 },
  ];

  function resizeCanvases() {
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    stageWidth = rect.width;
    stageHeight = rect.height;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (charCanvas && ctxChar) {
      const charRect = charCanvas.getBoundingClientRect();
      if (charRect.width && charRect.height) {
        charWidth = charRect.width;
        charHeight = charRect.height;
        charCanvas.width = Math.round(charRect.width * dpr);
        charCanvas.height = Math.round(charRect.height * dpr);
        ctxChar.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }
  }

  function renderHotspots() {
    const hotspots = getPortfolioData().workspaceHotspots;
    hotspotsWrap.innerHTML = hotspots
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
    talkingUntil = performance.now() + Math.min(3400, 900 + message.length * 22);
    clearTimeout(speechTimer);
    speechTimer = window.setTimeout(() => {
      speechBubble.classList.remove('is-visible');
    }, 6500);
  }

  function syncLampButtonText() {
    if (!lampSwitchBtn) return;
    lampSwitchBtn.setAttribute('aria-pressed', String(lampOn));
    lampSwitchBtn.textContent = lampOn ? t('lampOnBtn') : t('lampOffBtn');
  }

  function updateHud(hotspotId) {
    const hotspots = getPortfolioData().workspaceHotspots;
    const hotspot = hotspots.find((item) => item.id === hotspotId) || hotspots[0];
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
    syncLampButtonText();
    soundEngine.playLampToggle(lampOn);
    showSpeech(lampOn ? t('lampOnSpeech') : t('lampOffSpeech'));
    return lampOn;
  }

  function triggerGreeting() {
    soundEngine.playChime();
    const quotes = CHAR_QUOTES[getLang()] || CHAR_QUOTES.id;
    showSpeech(quotes[quoteIdx % quotes.length]);
    quoteIdx += 1;
    smileUntil = performance.now() + 1800;
    if (charCanvas) {
      charCanvas.classList.add('is-greeting');
      window.setTimeout(() => charCanvas.classList.remove('is-greeting'), 500);
    }
  }

  function selectHotspot(hotspotId, { announce = true } = {}) {
    const hotspots = getPortfolioData().workspaceHotspots;
    const hotspot = hotspots.find((item) => item.id === hotspotId);
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

  if (greetBtn) {
    greetBtn.addEventListener('click', triggerGreeting);
  }

  if (charCanvas) {
    charCanvas.addEventListener('click', triggerGreeting);
    charCanvas.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        triggerGreeting();
      }
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

  function getBlinkAmount(timeMs) {
    if (prefersReducedMotion) return 0;

    if (blinkStart < 0 && timeMs >= nextBlinkAt) {
      blinkStart = timeMs;
    }

    if (blinkStart < 0) return 0;

    const elapsed = timeMs - blinkStart;
    const duration = 150;
    if (elapsed >= duration) {
      blinkStart = -1;
      if (!pendingDoubleBlink && Math.random() < 0.25) {
        pendingDoubleBlink = true;
        nextBlinkAt = timeMs + 130;
      } else {
        pendingDoubleBlink = false;
        nextBlinkAt = timeMs + 2800 + Math.random() * 2400;
      }
      return 0;
    }

    const phase = elapsed / duration;
    return phase <= 0.5 ? phase * 2 : (1 - phase) * 2;
  }

  function drawCharacter(timeMs) {
    if (!ctxChar || !charImgReady || !charWidth || !charHeight) return;

    const cw = charWidth;
    const ch = charHeight;
    const mode = getTimeMode();

    ctxChar.clearRect(0, 0, cw, ch);
    ctxChar.globalCompositeOperation = 'source-over';
    ctxChar.drawImage(charSourceImg, 0, 0, cw, ch);

    const isSmiling = smileUntil > timeMs;
    const blinkAmt = isSmiling ? 0 : getBlinkAmount(timeMs);

    if (isSmiling) {
      [CHAR_RIG.leftEye, CHAR_RIG.rightEye].forEach((eye) => {
        const cx = eye.cx * cw;
        const cy = eye.cy * ch;
        const rx = eye.rx * cw;
        const ry = eye.ry * ch;

        ctxChar.fillStyle = CHAR_RIG.skinTone;
        ctxChar.fillRect(cx - rx, cy - ry, rx * 2, ry * 2.15);

        ctxChar.strokeStyle = CHAR_RIG.lashColor;
        ctxChar.lineWidth = Math.max(1.4, cw * 0.007);
        ctxChar.lineCap = 'round';
        ctxChar.beginPath();
        ctxChar.arc(cx, cy + ry * 0.45, rx * 0.8, Math.PI * 1.15, Math.PI * 1.85);
        ctxChar.stroke();
      });
    } else if (blinkAmt > 0.05) {
      [CHAR_RIG.leftEye, CHAR_RIG.rightEye].forEach((eye) => {
        const cx = eye.cx * cw;
        const cy = eye.cy * ch;
        const rx = eye.rx * cw;
        const ry = eye.ry * ch;
        const coverH = ry * 2.1 * blinkAmt;

        ctxChar.fillStyle = CHAR_RIG.skinTone;
        ctxChar.fillRect(cx - rx, cy - ry, rx * 2, coverH);

        if (blinkAmt > 0.55) {
          ctxChar.strokeStyle = CHAR_RIG.lashColor;
          ctxChar.lineWidth = Math.max(1.3, cw * 0.0065);
          ctxChar.lineCap = 'round';
          ctxChar.beginPath();
          ctxChar.moveTo(cx - rx * 0.8, cy + ry * 0.15);
          ctxChar.quadraticCurveTo(cx, cy + ry * 0.55, cx + rx * 0.8, cy + ry * 0.15);
          ctxChar.stroke();
        }
      });
    }

    const isTalking = !prefersReducedMotion && (aiBusy || talkingUntil > timeMs);
    if (isTalking) {
      const mx = CHAR_RIG.mouth.cx * cw;
      const my = CHAR_RIG.mouth.cy * ch;
      const mw = CHAR_RIG.mouth.w * cw;
      const openRatio = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(timeMs * 0.026));
      const mh = Math.max(1.2, mw * 0.48 * openRatio);

      ctxChar.fillStyle = CHAR_RIG.skinTone;
      ctxChar.fillRect(mx - mw * 0.65, my - 2, mw * 1.3, mh + 4);

      ctxChar.fillStyle = CHAR_RIG.mouthInterior;
      ctxChar.beginPath();
      ctxChar.ellipse(mx, my + mh * 0.25, mw * 0.48, mh, 0, 0, Math.PI * 2);
      ctxChar.fill();

      ctxChar.strokeStyle = CHAR_RIG.lashColor;
      ctxChar.lineWidth = Math.max(1, cw * 0.0045);
      ctxChar.beginPath();
      ctxChar.moveTo(mx - mw * 0.48, my);
      ctxChar.quadraticCurveTo(mx, my + 0.8, mx + mw * 0.48, my);
      ctxChar.stroke();
    }

    ctxChar.globalCompositeOperation = 'source-atop';

    if (mode === 'malam') {
      ctxChar.fillStyle = 'rgba(7, 20, 34, 0.26)';
      ctxChar.fillRect(0, 0, cw, ch);

      if (lampOn) {
        const leftRim = ctxChar.createLinearGradient(0, ch * 0.1, cw * 0.55, ch * 0.35);
        leftRim.addColorStop(0, 'rgba(255, 198, 108, 0.36)');
        leftRim.addColorStop(1, 'rgba(255, 198, 108, 0)');
        ctxChar.fillStyle = leftRim;
        ctxChar.fillRect(0, 0, cw, ch);
      }

      const rightRim = ctxChar.createLinearGradient(cw, ch * 0.25, cw * 0.45, ch * 0.45);
      rightRim.addColorStop(0, `rgba(24, 210, 182, ${aiBusy ? 0.34 : 0.22})`);
      rightRim.addColorStop(1, 'rgba(24, 210, 182, 0)');
      ctxChar.fillStyle = rightRim;
      ctxChar.fillRect(0, 0, cw, ch);
    } else if (mode === 'senja') {
      ctxChar.fillStyle = 'rgba(46, 20, 32, 0.13)';
      ctxChar.fillRect(0, 0, cw, ch);

      const duskRim = ctxChar.createLinearGradient(0, 0, cw * 0.65, ch * 0.4);
      duskRim.addColorStop(0, `rgba(255, 152, 86, ${lampOn ? 0.28 : 0.16})`);
      duskRim.addColorStop(1, 'rgba(255, 152, 86, 0)');
      ctxChar.fillStyle = duskRim;
      ctxChar.fillRect(0, 0, cw, ch);
    } else {
      const dayRim = ctxChar.createLinearGradient(0, 0, cw * 0.5, ch * 0.3);
      dayRim.addColorStop(0, 'rgba(255, 252, 232, 0.08)');
      dayRim.addColorStop(1, 'rgba(255, 252, 232, 0)');
      ctxChar.fillStyle = dayRim;
      ctxChar.fillRect(0, 0, cw, ch);
    }

    ctxChar.globalCompositeOperation = 'source-over';
  }

  function drawWindowPanes(t, w, h, mode) {
    const panes = [
      { x: w * 0.364, y: h * 0.214, w: w * 0.13, h: h * 0.324 },
      { x: w * 0.506, y: h * 0.214, w: w * 0.128, h: h * 0.324 },
    ];

    ctx.save();
    ctx.beginPath();
    panes.forEach((p) => ctx.rect(p.x, p.y, p.w, p.h));
    ctx.clip();

    const winY = h * 0.214;
    const winH = h * 0.324;

    if (mode === 'malam') {
      const skyGrad = ctx.createLinearGradient(0, winY, 0, winY + winH);
      skyGrad.addColorStop(0, 'rgba(6, 17, 32, 0.90)');
      skyGrad.addColorStop(1, 'rgba(14, 42, 64, 0.72)');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(w * 0.36, winY, w * 0.28, winH);

      const moonX = w * 0.592;
      const moonY = h * 0.268;
      const moonR = Math.max(7, w * 0.012);
      ctx.fillStyle = 'rgba(235, 248, 255, 0.88)';
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(9, 25, 44, 0.95)';
      ctx.beginPath();
      ctx.arc(moonX + moonR * 0.42, moonY - moonR * 0.2, moonR * 0.86, 0, Math.PI * 2);
      ctx.fill();

      stars.forEach((star) => {
        const alpha = 0.38 + 0.56 * (0.5 + 0.5 * Math.sin(t * 1.6 + star.phase));
        ctx.fillStyle = `rgba(220, 245, 255, ${alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!prefersReducedMotion) {
        const cycle = t % 9;
        if (cycle < 1.1) {
          const prog = cycle / 1.1;
          const sx = w * (0.39 + prog * 0.17);
          const sy = h * (0.24 + prog * 0.11);
          const tailGrad = ctx.createLinearGradient(sx, sy, sx - w * 0.045, sy - h * 0.03);
          tailGrad.addColorStop(0, 'rgba(210, 255, 248, 0.85)');
          tailGrad.addColorStop(1, 'rgba(210, 255, 248, 0)');
          ctx.strokeStyle = tailGrad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx - w * 0.045, sy - h * 0.03);
          ctx.stroke();
        }
      }
    } else if (mode === 'senja') {
      const duskGrad = ctx.createLinearGradient(0, winY, 0, winY + winH);
      duskGrad.addColorStop(0, 'rgba(42, 31, 66, 0.55)');
      duskGrad.addColorStop(0.58, 'rgba(232, 114, 58, 0.45)');
      duskGrad.addColorStop(1, 'rgba(255, 198, 108, 0.34)');
      ctx.fillStyle = duskGrad;
      ctx.fillRect(w * 0.36, winY, w * 0.28, winH);

      clouds.forEach((cloud) => {
        const shift = prefersReducedMotion ? 0 : (t * cloud.speed) % 0.28;
        const cx = w * (0.34 + ((cloud.baseX - 0.34 + shift) % 0.28));
        ctx.fillStyle = 'rgba(255, 212, 168, 0.32)';
        ctx.beginPath();
        ctx.ellipse(cx, h * cloud.y, w * cloud.w * 0.5, h * cloud.h, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      const sunGrad = ctx.createLinearGradient(w * 0.36, winY, w * 0.64, winY + winH);
      sunGrad.addColorStop(0, 'rgba(255, 252, 230, 0.22)');
      sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(w * 0.36, winY, w * 0.28, winH);

      clouds.forEach((cloud) => {
        const shift = prefersReducedMotion ? 0 : (t * cloud.speed) % 0.28;
        const cx = w * (0.34 + ((cloud.baseX - 0.34 + shift) % 0.28));
        ctx.fillStyle = 'rgba(255, 255, 255, 0.36)';
        ctx.beginPath();
        ctx.ellipse(cx, h * cloud.y, w * cloud.w * 0.5, h * cloud.h, 0, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    ctx.restore();
  }

  function drawLaptopScreen(t, w, h, mode) {
    const sx = w * 0.674;
    const sy = h * 0.522;
    const sw = w * 0.042;
    const sh = h * 0.049;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(w * 0.677, h * 0.521);
    ctx.lineTo(w * 0.717, h * 0.521);
    ctx.lineTo(w * 0.713, h * 0.571);
    ctx.lineTo(w * 0.674, h * 0.571);
    ctx.closePath();
    ctx.clip();

    ctx.fillStyle = mode === 'pagi' ? '#0e2432' : '#05111a';
    ctx.fillRect(sx, sy, sw + 4, sh + 4);

    if (aiBusy || activeHotspotId === 'ai-terminal') {
      const bars = 7;
      const barW = sw / (bars * 1.5);
      for (let i = 0; i < bars; i += 1) {
        const wave = prefersReducedMotion
          ? 0.55
          : 0.3 + 0.65 * (0.5 + 0.5 * Math.sin(t * (aiBusy ? 11 : 4) + i * 0.8));
        const bh = sh * 0.62 * wave;
        const bx = sx + sw * 0.14 + i * (barW * 1.35);
        const by = sy + sh * 0.82 - bh;
        ctx.fillStyle = aiBusy ? '#18d2b6' : '#68b5ff';
        ctx.fillRect(bx, by, barW, bh);
      }
    } else {
      const lineCount = 5;
      for (let i = 0; i < lineCount; i += 1) {
        const pulse = prefersReducedMotion ? 0.7 : 0.45 + 0.45 * Math.sin(t * 2.5 + i);
        const lw = sw * (0.38 + ((i * 19) % 40) / 100);
        ctx.fillStyle =
          i % 2 === 0 ? `rgba(24, 210, 182, ${pulse})` : `rgba(147, 176, 190, ${pulse})`;
        ctx.fillRect(sx + sw * 0.14, sy + sh * (0.2 + i * 0.14), lw, 1.8);
      }
    }

    ctx.restore();
  }

  function drawAtmosphere(timeMs) {
    const t = timeMs * 0.001;
    const w = stageWidth;
    const h = stageHeight;
    const mode = getTimeMode();

    ctx.clearRect(0, 0, w, h);
    drawWindowPanes(t, w, h, mode);

    if (mode === 'malam') {
      ctx.fillStyle = 'rgba(6, 16, 26, 0.46)';
      ctx.fillRect(0, 0, w, h);
    } else if (mode === 'senja') {
      ctx.fillStyle = 'rgba(34, 18, 28, 0.20)';
      ctx.fillRect(0, 0, w, h);
    } else {
      const beam = ctx.createLinearGradient(w * 0.38, h * 0.25, w * 0.68, h * 0.96);
      beam.addColorStop(0, 'rgba(255, 245, 200, 0.14)');
      beam.addColorStop(1, 'rgba(255, 245, 200, 0)');
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(w * 0.37, h * 0.54);
      ctx.lineTo(w * 0.63, h * 0.54);
      ctx.lineTo(w * 0.78, h);
      ctx.lineTo(w * 0.46, h);
      ctx.closePath();
      ctx.fill();
    }

    drawLaptopScreen(t, w, h, mode);

    const screenGlow = ctx.createRadialGradient(
      w * 0.69,
      h * 0.54,
      w * 0.01,
      w * 0.69,
      h * 0.54,
      w * 0.22
    );
    const screenAlpha =
      (mode === 'malam' ? 0.34 : mode === 'senja' ? 0.22 : 0.1) + (aiBusy ? 0.12 : 0);
    screenGlow.addColorStop(0, `rgba(24, 210, 182, ${screenAlpha.toFixed(2)})`);
    screenGlow.addColorStop(1, 'rgba(24, 210, 182, 0)');
    ctx.fillStyle = screenGlow;
    ctx.fillRect(0, 0, w, h);

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

    const shadowX = w * 0.495 + currentPointer.x * 16 + (lampOn ? 6 : 0);
    const shadowY = h * 0.968;
    const shadowGrad = ctx.createRadialGradient(shadowX, shadowY, 4, shadowX, shadowY, w * 0.085);
    shadowGrad.addColorStop(
      0,
      mode === 'pagi' ? 'rgba(11, 25, 34, 0.26)' : 'rgba(2, 8, 14, 0.46)'
    );
    shadowGrad.addColorStop(1, 'rgba(2, 8, 14, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(shadowX, shadowY, w * 0.085, h * 0.025, 0, 0, Math.PI * 2);
    ctx.fill();

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
      if (charCanvas) {
        const breathScale = 1 + Math.sin(timeMs * 0.0022) * 0.006;
        charCanvas.style.transform = `translate3d(${(currentPointer.x * 18).toFixed(2)}px, ${(currentPointer.y * 7).toFixed(2)}px, 0) scaleY(${breathScale.toFixed(4)})`;
      }
    }

    drawAtmosphere(timeMs);
    drawCharacter(timeMs);
    requestAnimationFrame(animate);
  }

  onLangChange(() => {
    renderHotspots();
    updateHud(activeHotspotId);
    syncLampButtonText();
    if (speechBubble?.classList.contains('is-visible')) {
      showSpeech(t('welcomeSpeech'));
    }
  });

  stage.dataset.lamp = lampOn ? 'on' : 'off';
  renderHotspots();
  updateHud(activeHotspotId);
  syncLampButtonText();
  resizeCanvases();

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(resizeCanvases);
    ro.observe(stage);
  } else {
    window.addEventListener('resize', resizeCanvases);
  }

  requestAnimationFrame(animate);

  return {
    toggleLamp,
    triggerGreeting,
    selectHotspot,
    setAiBusy(busy) {
      aiBusy = Boolean(busy);
    },
    refreshMode() {
      const mode = getTimeMode();
      const toastKey =
        mode === 'pagi' ? 'modePagiToast' : mode === 'senja' ? 'modeSenjaToast' : 'modeMalamToast';
      onActionToast?.(t(toastKey));
    },
  };
}
