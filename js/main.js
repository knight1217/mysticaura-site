/* ===== CORE APP ===== */
window.App = (function() {
  const D = window.__DATA__;

  /* ===== Floating Magic Symbols ===== */
  function initMagicSymbols() {
    const layer = document.getElementById('magicSymbolLayer');
    const symbols = ['✦','✧','⋆','☆','♔','☽','☀','☿','♄','⟡','◈','✶'];
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div');
      el.className = 'magic-sym';
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.animationDelay = (Math.random() * 18) + 's';
      el.style.animationDuration = (14 + Math.random() * 10) + 's';
      el.style.fontSize = (0.8 + Math.random() * 0.6) + 'rem';
      if (Math.random() < 0.4) el.style.color = 'var(--purple-mist)';
      layer.appendChild(el);
    }
  }

  /* ===== Canvas: Stars + Constellations + Particles ===== */
  const starCanvas = document.getElementById('starCanvas');
  const starCtx = starCanvas.getContext('2d');
  const constCanvas = document.getElementById('constellationCanvas');
  const constCtx = constCanvas.getContext('2d');
  const particleCanvas = document.getElementById('particleCanvas');
  const particleCtx = particleCanvas.getContext('2d');

  let stars = [], constellationLines = [], floatingParticles = [];

  function resizeCanvases() {
    [starCanvas, constCanvas, particleCanvas].forEach(c => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    });
  }
  resizeCanvases();
  window.addEventListener('resize', resizeCanvases);

  function initStars() {
    stars = [];
    const count = Math.floor((window.innerWidth * window.innerHeight) / 2200);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        r: Math.random() * 2 + 0.5,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        opacity: Math.random() * 0.35 + 0.1,
        hue: Math.random() < 0.5 ? 'gold' : 'purple'
      });
    }
  }

  function initConstellations() {
    constellationLines = [];
    const numClusters = Math.floor((window.innerWidth * window.innerHeight) / 220000) + 2;
    for (let c = 0; c < numClusters; c++) {
      const cx = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
      const cy = Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.05;
      const nodeCount = Math.floor(Math.random() * 5) + 3;
      const nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: cx + (Math.random() - 0.5) * 200, y: cy + (Math.random() - 0.5) * 150,
          r: Math.random() * 2 + 1.5, opacity: Math.random() * 0.2 + 0.1
        });
      }
      const pairs = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx*dx + dy*dy) < 180) pairs.push({ a: nodes[i], b: nodes[j] });
        }
      }
      if (pairs.length > 0) constellationLines.push({ nodes, pairs });
    }
  }

  function initParticles() {
    floatingParticles = [];
    for (let i = 0; i < 35; i++) {
      floatingParticles.push({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        r: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.3, vy: -(Math.random() * 0.4 + 0.1),
        opacity: Math.random() * 0.4 + 0.15, life: Math.random(),
        hue: Math.random() < 0.5 ? 'gold' : 'purple'
      });
    }
  }

  function drawStars(time) {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (const s of stars) {
      s.twinkle += s.twinkleSpeed;
      const alpha = s.opacity + Math.sin(s.twinkle) * 0.2;
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starCtx.fillStyle = s.hue === 'gold'
        ? `rgba(212,165,116,${Math.max(0.03, alpha)})` : `rgba(155,123,184,${Math.max(0.03, alpha)})`;
      starCtx.fill();
      if (s.r > 1.5 && alpha > 0.3) {
        starCtx.beginPath();
        starCtx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        starCtx.fillStyle = s.hue === 'gold'
          ? `rgba(212,165,116,${alpha * 0.1})` : `rgba(155,123,184,${alpha * 0.1})`;
        starCtx.fill();
      }
    }
  }

  function drawConstellations(time) {
    constCtx.clearRect(0, 0, constCanvas.width, constCanvas.height);
    const pulse = Math.sin(time * 0.0005) * 0.3 + 0.7;
    for (const cluster of constellationLines) {
      for (const pair of cluster.pairs) {
        constCtx.beginPath();
        constCtx.moveTo(pair.a.x, pair.a.y);
        constCtx.lineTo(pair.b.x, pair.b.y);
        constCtx.strokeStyle = `rgba(212,165,116,${0.1 * pulse})`;
        constCtx.lineWidth = 0.5;
        constCtx.stroke();
      }
      for (const node of cluster.nodes) {
        constCtx.beginPath();
        constCtx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        constCtx.fillStyle = `rgba(212,165,116,${node.opacity * pulse})`;
        constCtx.fill();
        constCtx.beginPath();
        constCtx.arc(node.x, node.y, node.r * 5, 0, Math.PI * 2);
        constCtx.fillStyle = `rgba(212,165,116,${node.opacity * 0.06 * pulse})`;
        constCtx.fill();
      }
    }
  }

  function drawParticles(time) {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    for (const p of floatingParticles) {
      p.x += p.vx; p.y += p.vy; p.life += 0.001;
      const alpha = Math.sin(p.life * Math.PI) * p.opacity;
      if (p.y < -20 || p.life > 1) {
        p.x = Math.random() * window.innerWidth;
        p.y = window.innerHeight + 20; p.life = 0;
      }
      particleCtx.beginPath();
      particleCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      particleCtx.fillStyle = p.hue === 'gold'
        ? `rgba(212,165,116,${Math.max(0, alpha)})` : `rgba(155,123,184,${Math.max(0, alpha)})`;
      particleCtx.fill();
      particleCtx.beginPath();
      particleCtx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      particleCtx.fillStyle = p.hue === 'gold'
        ? `rgba(212,165,116,${Math.max(0, alpha * 0.12)})` : `rgba(155,123,184,${Math.max(0, alpha * 0.1)})`;
      particleCtx.fill();
    }
  }

  function animate(time) {
    drawStars(time);
    drawConstellations(time);
    drawParticles(time);
    requestAnimationFrame(animate);
  }

  /* ===== Splash ===== */
  function activateSplash(e) {
    const splash = document.getElementById('splash');
    const crystal = splash.querySelector('.crystal-container');
    const rect = crystal.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 40; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark-particle';
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 200;
      spark.style.cssText = `
        left: ${cx}px; top: ${cy}px;
        width: ${Math.random() * 8 + 3}px; height: ${Math.random() * 8 + 3}px;
        background: ${Math.random() < 0.5 ? '#D4A574' : '#E8B4B8'};
        border-radius: 50%;
        --dx: ${Math.cos(angle) * dist}px; --dy: ${Math.sin(angle) * dist}px;
        animation-duration: ${Math.random() * 1 + 0.8}s;
      `;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 1500);
    }

    crystal.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    crystal.style.transform = 'scale(2.5)';
    crystal.style.opacity = '0';

    setTimeout(() => {
      splash.classList.add('hidden');
      document.getElementById('main-content').classList.add('visible');
    }, 500);
  }

  /* ===== Tool Navigation ===== */
  let currentTool = null;

  function openTool(name) {
    const flow = document.getElementById('flow-' + name);
    if (!flow) return;
    currentTool = name;
    document.querySelectorAll('.flow-page').forEach(p => p.classList.remove('active'));
    document.getElementById('resultPage').classList.remove('active');
    flow.classList.add('active');

    // Dispatch event for tools to initialize
    window.dispatchEvent(new CustomEvent('tool-opened', { detail: name }));
  }

  function closeTool() {
    document.querySelectorAll('.flow-page').forEach(p => p.classList.remove('active'));
    currentTool = null;
  }

  /* ===== Loading ===== */
  function showLoading(text) {
    if (text) document.getElementById('loadingText').textContent = text;
    document.getElementById('loadingOverlay').classList.add('active');
  }

  function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('active');
  }

  function showPortraitSurprise(zodiacSign, context) {
    // Store the pre-selected zodiac for portrait tool
    const ctx = context || {};
    let zSign = ctx.z1 || zodiacSign;
    if (!zSign && ctx.birthday && window.birthdayToZodiac) {
      zSign = window.birthdayToZodiac(ctx.birthday);
    }
    ctx._zodiac = zSign;
    window._portraitSurpriseZodiac = zSign;
    window._portraitSurpriseContext = ctx;
    openTool('portrait');
  }

  /* ===== Chain System — cross-tool context sharing ===== */
  window._chainContext = null;      // Original tool context, never overwritten
  window._chainOrigin = null;       // 'horoscope'|'tarot'|'destiny'|'element'|'compatibility'
  window._chainZodiac = null;       // Zodiac sign for portrait surprise
  window._personaChainContext = null; // Set when entering persona via chain
  window._claimedPersona = false;   // Track if user already claimed persona for current result
  window._claimedSurprise = false;  // Track if user already claimed surprise for current result

  function showPersonaChain() {
    window._claimedPersona = true;
    document.getElementById('personaChainContainer').innerHTML = '';
    document.getElementById('personaChainContainer').style.display = 'none';
    window._personaChainContext = window._chainContext;
    window._personaChainOrigin = window._chainOrigin;
    openTool('persona');
  }

  function showPortraitChain() {
    window._claimedSurprise = true;
    document.getElementById('surpriseContainer').innerHTML = '';
    document.getElementById('surpriseContainer').style.display = 'none';
    showPortraitSurprise(window._chainZodiac, window._chainContext);
  }

  /* ===== Text Sanitizer — strip problematic Unicode from AI output ===== */
  function sanitizeText(str) {
    if (!str || typeof str !== 'string') return str;
    // Strip only truly problematic characters: control chars (except \n\t\r), 
    // zero-width chars, variation selectors, and characters outside all planes (U+E0000+)
    return str
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '') // control chars
      .replace(/[\u200B-\u200F\u2028-\u202F\uFEFF\uFFF0-\uFFFF]/g, '')       // zero-width / BOM / specials
      .replace(/[\u{E0000}-\u{EFFFF}]/gu, '');                                // Unicode tags area
  }

  /* ===== Retry on Error ===== */
  window._retryFn = null;

  /* ===== Result Page ===== */
  function showResult(header, tags, content, extraActions, showSurprise, chainOpts, isError) {
    document.getElementById('resultHeader').innerHTML = sanitizeText(header);
    document.getElementById('tagCloud').innerHTML = sanitizeText(tags);
    document.getElementById('fortuneCard').innerHTML = sanitizeText(content);

    // Build action buttons — "Try Again" only on error
    let buttonsHTML = '';
    if (extraActions) buttonsHTML += extraActions;
    buttonsHTML += `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">`;
    if (isError) {
      buttonsHTML += `<button class="action-btn" onclick="App.retryCurrentTool()">Try Again ✧</button>`;
    }
    buttonsHTML += `<button class="action-btn primary" onclick="App.closeResult()">Back to Menu</button></div>`;
    document.getElementById('resultActions').innerHTML = buttonsHTML;

    // === Chain System: cross-tool context + dual cards ===
    if (chainOpts) {
      window._chainContext = chainOpts.chainContext || {};
      window._chainOrigin = chainOpts.chainFrom;
      window._chainZodiac = chainOpts.chainZodiac || null;
    } else {
      window._chainContext = null;
      window._chainOrigin = null;
      window._chainZodiac = null;
    }

    const personaCC = document.getElementById('personaChainContainer');
    const surpriseCC = document.getElementById('surpriseContainer');

    if (chainOpts) {
      // Dual-claim: both cards always visible, each independently claimable once
      if (!window._claimedPersona) {
        personaCC.innerHTML = `<div class="surprise-card persona-card" onclick="App.showPersonaChain()" style="cursor:pointer;">
          <span class="surprise-icon">✨</span>
          <div class="surprise-text">
            <div class="surprise-title">Create Your Persona Tags & Bio</div>
            <div class="surprise-desc">Turn your cosmic reading into ready-to-share social vibes</div>
          </div>
          <span class="surprise-arrow">→</span>
        </div>`;
        personaCC.style.display = 'block';
      } else {
        personaCC.innerHTML = '';
        personaCC.style.display = 'none';
      }

      if (!window._claimedSurprise) {
        surpriseCC.innerHTML = `<div class="surprise-card" onclick="App.showPortraitChain()" style="cursor:pointer;">
          <span class="surprise-icon">🔮</span>
          <div class="surprise-text">
            <div class="surprise-title">Something magical is waiting...</div>
            <div class="surprise-desc">The stars whisper of a hidden gift — are you ready to unwrap it?</div>
          </div>
          <span class="surprise-arrow">→</span>
        </div>`;
        surpriseCC.style.display = 'block';
      } else {
        surpriseCC.innerHTML = '';
        surpriseCC.style.display = 'none';
      }
    } else if (showSurprise) {
      // Backward compat: old-style surprise (portrait only)
      window.__surpriseCtx = showSurprise.context || {};
      window.__surpriseZodiac = showSurprise.zodiac || null;
      surpriseCC.innerHTML = `<div class="surprise-card" onclick="App.showPortraitSurprise(window.__surpriseZodiac, window.__surpriseCtx)" style="cursor:pointer;">
        <span class="surprise-icon">🔮</span>
        <div class="surprise-text">
          <div class="surprise-title">Something magical is waiting...</div>
          <div class="surprise-desc">The stars whisper of a hidden gift — are you ready to unwrap it?</div>
        </div>
        <span class="surprise-arrow">→</span>
      </div>`;
      surpriseCC.style.display = 'block';
      personaCC.style.display = 'none';
    } else {
      surpriseCC.innerHTML = ''; surpriseCC.style.display = 'none';
      personaCC.innerHTML = ''; personaCC.style.display = 'none';
    }

    document.querySelectorAll('.flow-page').forEach(p => p.classList.remove('active'));
    document.getElementById('resultPage').classList.add('active');
  }

  function closeResult() {
    document.getElementById('resultPage').classList.remove('active');
    document.getElementById('main-content').classList.add('visible');
    currentTool = null;
    // Clean up surprise context
    delete window._portraitSurpriseZodiac;
    delete window._portraitSurpriseContext;
    delete window._personaChainContext;
    delete window._personaChainOrigin;
    // Keep _chainContext alive during chain navigation, clear on close
    window._chainContext = null;
    window._chainOrigin = null;
    window._chainZodiac = null;
    window._retryFn = null;
    // Reset dual-claim flags
    window._claimedPersona = false;
    window._claimedSurprise = false;
  }

  function retryCurrentTool() {
    document.getElementById('resultPage').classList.remove('active');
    if (window._retryFn) {
      const fn = window._retryFn;
      window._retryFn = null;
      fn();
    } else if (currentTool) {
      openTool(currentTool);
    }
  }

  /* ===== Error Display ===== */
  function showError(message, retryFn) {
    console.error('Tool error:', message);
    if (retryFn) window._retryFn = retryFn;
    const header = '<span class="result-zodiac">🔮</span><div class="result-title">Oops, the cosmos is busy</div>';
    const errDetail = message ? `<br><span style="font-size:0.8rem;color:#999;">(${message})</span>` : '';
    const content = `<div class="fortune-section"><div class="fortune-text" style="color:#E91E63;">Something went wrong. Please try again in a moment.${errDetail}</div></div>`;
    showResult(header, '', content, null, null, null, true);
  }

  return {
    initStars, initConstellations, initParticles, initMagicSymbols, animate,
    activateSplash,
    openTool, closeTool,
    showLoading, hideLoading,
    showResult, showError, closeResult, retryCurrentTool,
    showPortraitSurprise,
    showPersonaChain, showPortraitChain,
    get currentTool() { return currentTool; }
  };
})();

/* ===== Birthday → Zodiac Converter ===== */
window.birthdayToZodiac = function(birthdayString) {
  if (!birthdayString || typeof birthdayString !== 'string') return null;
  const parts = birthdayString.split('/');
  if (parts.length !== 3) return null;
  const m = parseInt(parts[0], 10);
  const d = parseInt(parts[1], 10);
  if (isNaN(m) || isNaN(d) || m < 1 || m > 12 || d < 1 || d > 31) return null;

  // Zodiac sign boundaries (month, day) — end of each sign's range
  const signs = [
    { name: 'Capricorn', m: 1, d: 19 },
    { name: 'Aquarius',  m: 2, d: 18 },
    { name: 'Pisces',    m: 3, d: 20 },
    { name: 'Aries',     m: 4, d: 19 },
    { name: 'Taurus',    m: 5, d: 20 },
    { name: 'Gemini',    m: 6, d: 21 },
    { name: 'Cancer',    m: 7, d: 22 },
    { name: 'Leo',       m: 8, d: 22 },
    { name: 'Virgo',     m: 9, d: 22 },
    { name: 'Libra',     m: 10, d: 23 },
    { name: 'Scorpio',   m: 11, d: 21 },
    { name: 'Sagittarius', m: 12, d: 21 }
  ];

  for (const sign of signs) {
    if (m < sign.m || (m === sign.m && d <= sign.d)) return sign.name;
  }
  return 'Capricorn'; // Dec 22-31
};

/* ===== DATE PICKER — Year/Month/Day Drum Rollers ===== */
window.DatePicker = (function() {
  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  let selYear, selMonth, selDay;

  // Generate year list: 1924 to current year
  const currentYear = new Date().getFullYear();
  const YEARS = [];
  for (let y = currentYear; y >= 1924; y--) YEARS.push(y);

  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function buildDrum(scrollEl, items, selectedVal, valFn) {
    scrollEl.innerHTML = '';
    // Top padding spacer
    const topPad = document.createElement('div');
    topPad.style.cssText = 'height:88px;flex-shrink:0;';
    scrollEl.appendChild(topPad);

    items.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'picker-item';
      el.textContent = typeof item === 'object' ? item.label : item;
      el.dataset.val = typeof item === 'object' ? item.val : item;
      scrollEl.appendChild(el);
    });

    // Bottom padding spacer
    const botPad = document.createElement('div');
    botPad.style.cssText = 'height:88px;flex-shrink:0;';
    scrollEl.appendChild(botPad);

    // Scroll to selected value
    requestAnimationFrame(() => {
      const allItems = scrollEl.querySelectorAll('.picker-item');
      allItems.forEach((el, idx) => {
        if (String(el.dataset.val) === String(selectedVal)) {
          scrollEl.scrollTop = idx * 44;
        }
      });
    });
  }

  function updateActiveItems(scrollEl) {
    const scrollTop = scrollEl.scrollTop;
    const centerIdx = Math.round(scrollTop / 44);
    const items = scrollEl.querySelectorAll('.picker-item');
    items.forEach((el, i) => {
      el.classList.toggle('active', i === centerIdx);
    });
    return items[centerIdx] ? items[centerIdx].dataset.val : null;
  }

  function getScrollValue(scrollEl) {
    const scrollTop = scrollEl.scrollTop;
    const centerIdx = Math.round(scrollTop / 44);
    const items = scrollEl.querySelectorAll('.picker-item');
    return items[centerIdx] ? items[centerIdx].dataset.val : null;
  }

  function rebuildDayDrum() {
    const mo = parseInt(getScrollValue(document.getElementById('drumMonth')), 10);
    const yr = parseInt(getScrollValue(document.getElementById('drumYear')), 10);
    const days = daysInMonth(mo, yr);
    const dayItems = [];
    for (let d = 1; d <= days; d++) dayItems.push({ label: d, val: d });
    const clampedDay = Math.min(selDay || 1, days);
    buildDrum(document.getElementById('drumDay'), dayItems, clampedDay);
    selDay = clampedDay;
    bindScrollListeners();
  }

  function bindScrollListeners() {
    const drumMonth = document.getElementById('drumMonth');
    const drumDay = document.getElementById('drumDay');
    const drumYear = document.getElementById('drumYear');

    // Clean up old listeners using stored references
    [drumMonth, drumDay, drumYear].forEach(el => {
      if (!el) return;
      if (el._wb_scrollHandler) {
        el.removeEventListener('scroll', el._wb_scrollHandler);
        el._wb_scrollHandler = null;
      }
      if (el._wb_mousedownHandler) {
        el.removeEventListener('mousedown', el._wb_mousedownHandler);
        el._wb_mousedownHandler = null;
      }
    });

    // Mouse drag scroll support
    function addDragScroll(el) {
      if (!el) return;
      let isDragging = false;
      let startY = 0;
      let startScrollTop = 0;

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const dy = startY - e.clientY;
        el.scrollTop = startScrollTop + dy;
      };

      const onMouseUp = () => {
        if (!isDragging) return;
        isDragging = false;
        el.style.cursor = '';
        el.style.userSelect = '';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        const idx = Math.round(el.scrollTop / 44);
        el.scrollTo({ top: idx * 44, behavior: 'smooth' });
      };

      const onMouseDown = (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        startY = e.clientY;
        startScrollTop = el.scrollTop;
        el.style.cursor = 'grabbing';
        el.style.userSelect = 'none';
        e.preventDefault();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      el._wb_mousedownHandler = onMouseDown;
      el.addEventListener('mousedown', onMouseDown);
    }

    addDragScroll(drumMonth);
    addDragScroll(drumDay);
    addDragScroll(drumYear);

    function onScroll(el, onChange) {
      let timer;
      const handler = function() {
        updateActiveItems(el);
        clearTimeout(timer);
        timer = setTimeout(() => {
          const idx = Math.round(el.scrollTop / 44);
          el.scrollTo({ top: idx * 44, behavior: 'smooth' });
          onChange && onChange();
        }, 120);
      };
      el._wb_scrollHandler = handler;
      el.addEventListener('scroll', handler);
    }

    onScroll(drumMonth, () => {
      selMonth = parseInt(getScrollValue(drumMonth), 10);
      rebuildDayDrum();
    });
    onScroll(drumYear, () => {
      selYear = parseInt(getScrollValue(drumYear), 10);
      rebuildDayDrum();
    });
    onScroll(drumDay, () => {
      selDay = parseInt(getScrollValue(drumDay), 10);
    });
  }

  function open() {
    const overlay = document.getElementById('calendarOverlay');
    if (!overlay) return;

    // Init with today's date
    const now = new Date();
    selYear = now.getFullYear();
    selMonth = now.getMonth();    // 0-indexed
    selDay = now.getDate();

    // Month items: 0-11 with label
    const monthItems = MONTHS.map((m, i) => ({ label: m, val: i }));
    const days = daysInMonth(selMonth, selYear);
    const dayItems = [];
    for (let d = 1; d <= days; d++) dayItems.push({ label: d, val: d });
    const yearItems = YEARS;

    buildDrum(document.getElementById('drumMonth'), monthItems, selMonth);
    buildDrum(document.getElementById('drumDay'), dayItems, selDay);
    buildDrum(document.getElementById('drumYear'), yearItems, selYear);

    overlay.classList.add('active');

    setTimeout(() => {
      updateActiveItems(document.getElementById('drumMonth'));
      updateActiveItems(document.getElementById('drumDay'));
      updateActiveItems(document.getElementById('drumYear'));
      bindScrollListeners();
    }, 60);
  }

  function confirm() {
    const drumMonth = document.getElementById('drumMonth');
    const drumDay = document.getElementById('drumDay');
    const drumYear = document.getElementById('drumYear');

    const mo = parseInt(getScrollValue(drumMonth), 10);
    const d = parseInt(getScrollValue(drumDay), 10);
    const yr = parseInt(getScrollValue(drumYear), 10);

    if (isNaN(mo) || isNaN(d) || isNaN(yr)) return;

    const input = document.getElementById('destiny-birthday');
    if (input) {
      const mStr = String(mo + 1).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      input.value = `${mStr}/${dStr}/${yr}`;
    }
    cancel();
  }

  function cancel() {
    const overlay = document.getElementById('calendarOverlay');
    if (overlay) overlay.classList.remove('active');
  }

  // Auto-bind input click
  document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('destiny-birthday');
    if (input) input.addEventListener('click', open);

    // Custom select dropdowns
    document.querySelectorAll('.custom-select').forEach(select => {
      const trigger = select.querySelector('.custom-select-trigger');
      const options = select.querySelectorAll('.custom-select-option');
      if (!trigger) return;

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = select.classList.contains('open');
        document.querySelectorAll('.custom-select.open').forEach(s => {
          s.classList.remove('open');
          const t = s.querySelector('.custom-select-trigger');
          if (t) t.classList.remove('active');
        });
        if (!isOpen) {
          select.classList.add('open');
          trigger.classList.add('active');
        }
      });

      options.forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          trigger.dataset.value = opt.dataset.value;
          trigger.textContent = opt.textContent;
          options.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          select.classList.remove('open');
          trigger.classList.remove('active');
        });
      });
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.custom-select.open').forEach(s => {
        s.classList.remove('open');
        const t = s.querySelector('.custom-select-trigger');
        if (t) t.classList.remove('active');
      });
    });
  });

  return { open, confirm, cancel };
})();

/* ===== INIT ===== */
App.initStars();
App.initConstellations();
App.initParticles();
App.initMagicSymbols();
requestAnimationFrame(App.animate);
