/* ===== TAROT TOOL — v4 Simplified & Reliable ===== */
Tools.tarot = (function() {
  const D = window.__DATA__;
  let drawnCards = [];
  let revealedCount = 0;

  /* ===== Card SVG Symbols ===== */
  const SYMBOLS = {
    'The Fool': '☆', 'The Magician': '✦', 'The High Priestess': '☽',
    'The Empress': '♀', 'The Emperor': '♂', 'The Lovers': '♡',
    'The Chariot': '▲', 'Strength': '♌', 'The Hermit': '✧',
    'Wheel of Fortune': '◎', 'Justice': '⚖', 'The Hanged Man': '▽',
    'Death': '✝', 'Temperance': '≈', 'The Devil': '⛧',
    'The Tower': '⚡', 'The Star': '✶', 'The Moon': '☾',
    'The Sun': '☀', 'Judgement': '♪', 'The World': '○'
  };

  /* ===== Create a card element (back showing) ===== */
  function createCardEl(card, position, index) {
    const wrap = document.createElement('div');
    wrap.className = 'tarot-card-wrap';
    wrap.dataset.revealed = '0';
    wrap.dataset.index = index;
    wrap.style.cssText = `
      width: 130px; height: 195px;
      position: relative;
      cursor: pointer;
      opacity: 0;
      transform: translateY(40px) scale(0.9);
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    // Card back
    const back = document.createElement('div');
    back.className = 'tarot-card-back-v4';
    back.innerHTML = `<div style="font-size:2.4rem;opacity:0.6;">✦</div>`;
    wrap.appendChild(back);

    // Card front (hidden initially)
    const front = document.createElement('div');
    front.className = 'tarot-card-front-v4';
    const symbol = SYMBOLS[card.name] || '✦';
    front.innerHTML = `
      <div style="font-size:0.6rem;color:#D4A574;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:10px;">${position}</div>
      <div style="font-size:2.8rem;margin-bottom:8px;">${symbol}</div>
      <div style="font-size:0.82rem;color:#F0D9B5;font-weight:600;text-align:center;line-height:1.3;padding:0 8px;">${card.name}</div>
    `;
    front.style.cssText = `
      position: absolute; inset: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      opacity: 0;
      transform: scale(0.85);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    `;
    wrap.appendChild(front);

    // Click to reveal
    wrap.addEventListener('click', function() {
      if (wrap.dataset.revealed === '1') return;
      revealCard(wrap, back, front);
    });

    return wrap;
  }

  /* ===== Reveal animation ===== */
  function revealCard(wrap, back, front) {
    wrap.dataset.revealed = '1';
    revealedCount++;

    // Animate back out
    back.style.transition = 'all 0.4s ease';
    back.style.opacity = '0';
    back.style.transform = 'scale(0.9) rotateY(90deg)';

    // Animate front in
    setTimeout(() => {
      back.style.display = 'none';
      front.style.opacity = '1';
      front.style.transform = 'scale(1)';
      wrap.style.boxShadow = '0 0 30px rgba(212,165,116,0.3), 0 0 60px rgba(155,123,184,0.15)';

      // Enable proceed when all 3 revealed
      if (revealedCount === 3) {
        const btn = document.getElementById('tarot-proceed');
        if (btn) {
          btn.disabled = false;
          btn.style.animation = 'tarotGlow 2s ease-in-out infinite';
        }
      }
    }, 300);
  }

  /* ===== Simple shuffle + deal animation ===== */
  function animateDeal(cards, spread, callback) {
    const spreadRect = spread.getBoundingClientRect();
    const cx = spreadRect.left + spreadRect.width / 2;
    const cy = spreadRect.top + spreadRect.height / 2;
    const W = window.innerWidth;
    const H = window.innerHeight;

    // Create flying cards for shuffle effect
    const flyers = [];
    for (let i = 0; i < 8; i++) {
      const el = document.createElement('div');
      const angle = Math.random() * Math.PI * 2;
      const startDist = Math.max(W, H) * 0.6;
      const sx = cx + Math.cos(angle) * startDist;
      const sy = cy + Math.sin(angle) * startDist;

      el.style.cssText = `
        position: fixed; left: ${sx}px; top: ${sy}px;
        width: 100px; height: 150px;
        background: linear-gradient(145deg, #2D1B4E, #1a0e3d);
        border: 2px solid rgba(212,165,116,0.4);
        border-radius: 10px;
        z-index: 200;
        pointer-events: none;
        transform: translate(-50%, -50%) rotate(${(Math.random()-0.5)*60}deg);
        transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
      `;
      document.body.appendChild(el);
      flyers.push(el);

      // Fly to center
      requestAnimationFrame(() => {
        el.style.left = cx + 'px';
        el.style.top = cy + 'px';
        el.style.transform = 'translate(-50%, -50%) rotate(' + (Math.random()-0.5)*20 + 'deg) scale(0.8)';
      });
    }

    // Fly away then show real cards
    setTimeout(() => {
      flyers.forEach(el => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(W, H) * 0.8;
        el.style.left = (cx + Math.cos(angle) * dist) + 'px';
        el.style.top = (cy + Math.sin(angle) * dist) + 'px';
        el.style.opacity = '0';
        el.style.transform = 'translate(-50%, -50%) rotate(' + (Math.random()-0.5)*90 + 'deg) scale(0.5)';
      });
      setTimeout(() => {
        flyers.forEach(el => el.remove());
        callback();
      }, 600);
    }, 700);
  }

  /* ===== Rich Reading Generator ===== */
  function generateRichReading(cards) {
    const positions = ['Past', 'Present', 'Future'];
    const cardReadings = cards.map((card, i) => {
      const pos = positions[i];
      const keywords = card.upright.split(',').map(s => s.trim());
      let reading = '';
      if (pos === 'Past') {
        reading = `In your past, <strong>${card.name}</strong> reveals a chapter shaped by ${keywords[0].toLowerCase()}${keywords[1] ? ' and ' + keywords[1].toLowerCase() : ''}. This energy has been a quiet architect of who you are today.`;
      } else if (pos === 'Present') {
        reading = `Right now, <strong>${card.name}</strong> stands as your current mirror, reflecting ${keywords[0].toLowerCase()}${keywords[1] ? ' and ' + keywords[1].toLowerCase() : ''} at work in your life.`;
      } else {
        reading = `Looking ahead, <strong>${card.name}</strong> illuminates a path of ${keywords[0].toLowerCase()}${keywords[1] ? ' and ' + keywords[1].toLowerCase() : ''}. This card shows the direction your energy is moving toward.`;
      }
      return reading;
    });

    const kw = cards.map(c => c.upright.split(',')[0].trim().toLowerCase());
    const synthesis = `Together, these three cards weave a story of <strong>${kw[0]}</strong> flowing into <strong>${kw[1]}</strong>, and moving toward <strong>${kw[2]}</strong>. The thread connecting them suggests a journey of transformation.`;

    const adviceOptions = [
      `The cards encourage you to honor where you've been while staying open to where you're going. Take one concrete step today that aligns with <strong>${kw[1]}</strong>.`,
      `Your reading suggests a moment of powerful alignment. Act from a place of <strong>${kw[1]}</strong> rather than fear.`,
      `The energy around you is shifting. Lean into <strong>${kw[1]}</strong> as your guiding principle this week.`
    ];

    return { cardReadings, synthesis, advice: adviceOptions[Math.floor(Math.random() * adviceOptions.length)] };
  }

  /* ===== INIT ===== */
  function init() {
    drawnCards = [];
    revealedCount = 0;

    const proceedBtn = document.getElementById('tarot-proceed');
    if (proceedBtn) {
      proceedBtn.disabled = true;
      proceedBtn.style.animation = '';
    }

    // Dark theme setup
    const flowPage = document.getElementById('flow-tarot');
    if (flowPage) {
      flowPage.style.cssText = '';
      flowPage.style.flexDirection = 'column';
      flowPage.style.alignItems = 'center';
      flowPage.style.justifyContent = 'center';
      flowPage.style.background = 'linear-gradient(170deg, #0a0618 0%, #110b2a 25%, #1a0e38 50%, #0f0822 75%, #060312 100%)';
      flowPage.style.color = '#F0D9B5';
    }

    const spread = document.getElementById('tarot-spread');
    if (!spread) return;
    spread.innerHTML = '';
    spread.style.cssText = 'display:flex;gap:20px;justify-content:center;align-items:center;flex-wrap:wrap;padding:20px 10px;position:relative;min-height:220px;';

    // Pick 3 cards
    const shuffled = [...D.tarotDeck].sort(() => Math.random() - 0.5);
    drawnCards = shuffled.slice(0, 3);
    const positions = ['Past', 'Present', 'Future'];

    // Run shuffle animation then show cards
    animateDeal(drawnCards, spread, function() {
      drawnCards.forEach((card, i) => {
        const el = createCardEl(card, positions[i], i);
        spread.appendChild(el);

        // Staggered entrance
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        }, i * 150);
      });

      // Instruction text
      const instruction = document.createElement('div');
      instruction.style.cssText = 'width:100%;text-align:center;color:rgba(212,165,116,0.85);font-family:Georgia,serif;font-size:0.92rem;letter-spacing:0.06em;margin-top:16px;animation:fadeInUp 1s ease 0.5s both;';
      instruction.textContent = 'Tap each card to reveal your destiny...';
      spread.appendChild(instruction);
    });
  }

  /* ===== START READING ===== */
  async function startReading() {
    App.showLoading('The cards are speaking...');
    let result;
    try {
      result = await API.getTarot(drawnCards);
    } catch (e) {
      App.hideLoading();
      App.showError(e.message);
      return;
    }
    App.hideLoading();

    const rich = generateRichReading(drawnCards);
    const positions = ['Past', 'Present', 'Future'];

    const header = `<span class="result-zodiac" style="font-size:3rem;">✧</span>
      <div class="result-title">Your Tarot Reading</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px;">
        ${drawnCards.map((c, i) => `<span style="font-size:0.78rem;color:rgba(212,165,116,0.9);font-family:Georgia,serif;">${SYMBOLS[c.name] || '✦'} ${c.name} <span style="opacity:0.6;font-size:0.7rem;">(${positions[i]})</span></span>`).join('<span style="color:rgba(212,165,116,0.3);"> ✦ </span>')}
      </div>`;

    const tags = drawnCards.map(c => `<span class="tag">${SYMBOLS[c.name] || '✦'} ${c.name}</span>`).join('');

    const content = `
      <div class="fortune-section">
        ${drawnCards.map((card, i) => `
          <div class="fortune-label" style="color:#D4A574;">${SYMBOLS[card.name] || '✦'} ${card.name} <span style="opacity:0.6;font-size:0.72rem;font-family:Georgia,serif;">— ${positions[i]}</span></div>
          <div class="fortune-text" style="margin-bottom:6px;color:rgba(240,217,181,0.45);font-size:0.72rem;font-style:italic;">${card.upright}</div>
          <div class="fortune-text" style="margin-bottom:18px;">${rich.cardReadings[i]}</div>
        `).join('<div style="border-bottom:1px solid rgba(212,165,116,0.12);margin:4px 0 16px;"></div>')}
      </div>
      <div style="border-top:2px solid rgba(212,165,116,0.25);border-bottom:1px solid rgba(212,165,116,0.12);padding:16px 0;margin:8px 0;text-align:center;">
        <div style="font-size:0.7rem;color:#D4A574;letter-spacing:0.2em;text-transform:uppercase;font-family:Georgia,serif;margin-bottom:10px;">✦ Synthesis ✦</div>
        <div class="fortune-text">${rich.synthesis}</div>
      </div>
      <div class="fortune-section" style="margin-top:8px;">
        <div class="fortune-label" style="color:#D4A574;">✦ Guidance</div>
        <div class="fortune-text">${result && result.advice ? result.advice : rich.advice}</div>
      </div>`;

    App.showResult(header, tags, content);
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'tarot') Tools.tarot.init();
});
