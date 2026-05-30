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
    window._portraitSurpriseZodiac = zodiacSign;
    // Store context for portrait.js to read
    window._portraitSurpriseContext = context || {};
    // Open the portrait flow directly
    openTool('portrait');
  }

  /* ===== Result Page ===== */
  function showResult(header, tags, content, extraActions, showSurprise) {
    document.getElementById('resultHeader').innerHTML = header;
    document.getElementById('tagCloud').innerHTML = tags;
    document.getElementById('fortuneCard').innerHTML = content;

    // Build action buttons (small, centered)
    let buttonsHTML = '';
    if (extraActions) buttonsHTML += extraActions;
    buttonsHTML += `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">`;
    if (currentTool) {
      buttonsHTML += `<button class="action-btn" onclick="App.retryCurrentTool()">Try Again ✧</button>`;
    }
    buttonsHTML += `<button class="action-btn primary" onclick="App.closeResult()">Back to Menu</button></div>`;
    document.getElementById('resultActions').innerHTML = buttonsHTML;

    // Surprise card goes into its own container (outside resultActions)
    const surpriseContainer = document.getElementById('surpriseContainer');
    if (showSurprise) {
      // Store context on window for the onclick handler
      window.__surpriseCtx = showSurprise.context || {};
      window.__surpriseZodiac = showSurprise.zodiac || null;

      const surpriseHTML = `<div class="surprise-card" onclick="App.showPortraitSurprise(window.__surpriseZodiac, window.__surpriseCtx)" style="cursor:pointer;">
        <span class="surprise-icon">🔮</span>
        <div class="surprise-text">
          <div class="surprise-title">Something magical is waiting...</div>
          <div class="surprise-desc">The stars whisper of a hidden gift — are you ready to unwrap it?</div>
        </div>
        <span class="surprise-arrow">→</span>
      </div>`;
      surpriseContainer.innerHTML = surpriseHTML;
      surpriseContainer.style.display = 'block';
    } else {
      surpriseContainer.innerHTML = '';
      surpriseContainer.style.display = 'none';
    }

    document.querySelectorAll('.flow-page').forEach(p => p.classList.remove('active'));
    document.getElementById('resultPage').classList.add('active');
  }

  function closeResult() {
    document.getElementById('resultPage').classList.remove('active');
    document.getElementById('main-content').classList.add('visible');
    currentTool = null;
  }

  function retryCurrentTool() {
    document.getElementById('resultPage').classList.remove('active');
    if (currentTool) {
      openTool(currentTool);
    }
  }

  /* ===== Error Display ===== */
  function showError(message) {
    const header = '<span class="result-zodiac">❌</span><div class="result-title">Something went wrong</div>';
    const content = `<div class="fortune-section"><div class="fortune-text" style="color:#E91E63;">${message}</div></div>`;
    showResult(header, '', content, null, null);
  }

  return {
    initStars, initConstellations, initParticles, initMagicSymbols, animate,
    activateSplash,
    openTool, closeTool,
    showLoading, hideLoading,
    showResult, showError, closeResult, retryCurrentTool,
    showPortraitSurprise,
    get currentTool() { return currentTool; }
  };
})();

/* ===== INIT ===== */
App.initStars();
App.initConstellations();
App.initParticles();
App.initMagicSymbols();
requestAnimationFrame(App.animate);
