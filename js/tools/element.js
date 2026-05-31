/* ===== INNER ELEMENT TOOL ===== */
Tools.element = (function() {
  const images = [
    {
      label: 'Volcano',
      scene: 'volcano erupting at sunset',
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="skyV" cx="50%" cy="30%">
            <stop offset="0%" stop-color="#FF6B35" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#2D1B4E" stop-opacity="0.9"/>
          </radialGradient>
          <radialGradient id="lavaV" cx="50%" cy="50%">
            <stop offset="0%" stop-color="#FF4500"/>
            <stop offset="100%" stop-color="#8B0000"/>
          </radialGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="url(#skyV)"/>
        <path d="M10 100 L40 55 L60 20 L80 55 L110 100Z" fill="#4A3020" opacity="0.9"/>
        <path d="M45 55 L60 22 L75 55Z" fill="url(#lavaV)" opacity="0.85"/>
        <path d="M52 28 Q60 10 68 28 Q64 35 56 35Z" fill="#FF6B35" opacity="0.9"/>
        <circle cx="60" cy="18" r="6" fill="#FF4500" opacity="0.7"/>
        <ellipse cx="60" cy="16" rx="10" ry="6" fill="#FF6B35" opacity="0.5"/>
        <path d="M10 100 Q60 90 110 100 L110 120 L10 120Z" fill="#2A1A08"/>
      </svg>`
    },
    {
      label: 'Ocean',
      scene: 'deep ocean waves',
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="seaO" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0077BE"/>
            <stop offset="100%" stop-color="#003366"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="#87CEEB" opacity="0.6"/>
        <rect y="50" width="120" height="70" rx="0" fill="url(#seaO)"/>
        <path d="M0 60 Q15 50 30 60 Q45 70 60 60 Q75 50 90 60 Q105 70 120 60 L120 120 L0 120Z" fill="#0066AA" opacity="0.8"/>
        <path d="M0 70 Q20 58 40 70 Q60 82 80 70 Q100 58 120 70 L120 120 L0 120Z" fill="#004488" opacity="0.9"/>
        <circle cx="60" cy="25" r="14" fill="#FFD700" opacity="0.85"/>
        <path d="M30 38 Q45 32 60 38 Q75 44 90 38" fill="none" stroke="#FFE88A" stroke-width="2" opacity="0.6"/>
        <circle cx="20" cy="20" r="4" fill="#FFF" opacity="0.7"/>
        <circle cx="35" cy="15" r="3" fill="#FFF" opacity="0.5"/>
        <circle cx="90" cy="18" r="5" fill="#FFF" opacity="0.6"/>
      </svg>`
    },
    {
      label: 'Mountain',
      scene: 'snow-capped mountain peak',
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyM" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#87CEEB"/>
            <stop offset="100%" stop-color="#E0F0FF"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="url(#skyM)"/>
        <path d="M5 100 L35 45 L55 65 L80 20 L105 80 L120 100Z" fill="#8B9DB5"/>
        <path d="M55 65 L80 20 L105 80Z" fill="#6A7D8E"/>
        <path d="M72 20 L80 8 L88 20 L85 28 Q80 32 75 28Z" fill="white" opacity="0.95"/>
        <path d="M52 68 L55 58 L58 68Z" fill="white" opacity="0.7"/>
        <path d="M5 100 Q60 92 120 100 L120 120 L5 120Z" fill="#4A6741"/>
        <circle cx="20" cy="28" r="5" fill="white" opacity="0.6"/>
        <circle cx="32" cy="22" r="4" fill="white" opacity="0.5"/>
      </svg>`
    },
    {
      label: 'Storm',
      scene: 'dramatic thunderstorm',
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="stormS" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1A1A2E"/>
            <stop offset="100%" stop-color="#3A3A5E"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="url(#stormS)"/>
        <ellipse cx="35" cy="42" rx="28" ry="18" fill="#4A4A6E" opacity="0.9"/>
        <ellipse cx="70" cy="35" rx="32" ry="22" fill="#5A5A7E" opacity="0.9"/>
        <ellipse cx="90" cy="52" rx="22" ry="16" fill="#4A4A6E" opacity="0.8"/>
        <path d="M55 60 L45 78 L55 76 L44 95" stroke="#FFE400" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M80 55 L72 70 L80 68 L70 85" stroke="#FFF8A0" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7"/>
        <path d="M0 98 Q30 90 60 95 Q90 100 120 93 L120 120 L0 120Z" fill="#1A1A35"/>
        <circle cx="15" cy="75" r="2" fill="#9BA0C0" opacity="0.5"/>
        <circle cx="100" cy="80" r="2" fill="#9BA0C0" opacity="0.5"/>
      </svg>`
    },
    {
      label: 'Forest',
      scene: 'ancient misty forest',
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="forestF" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1A2E1A"/>
            <stop offset="100%" stop-color="#2E4E2E"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="url(#forestF)"/>
        <path d="M10 100 L10 70 L0 70 L18 45 L8 45 L25 20 L42 45 L32 45 L50 70 L40 70 L40 100Z" fill="#1E5C1E" opacity="0.9"/>
        <path d="M50 100 L50 72 L42 72 L58 50 L50 50 L65 28 L80 50 L72 50 L88 72 L80 72 L80 100Z" fill="#2E7A2E" opacity="0.9"/>
        <path d="M80 100 L80 78 L73 78 L86 60 L78 60 L90 40 L102 60 L94 60 L107 78 L100 78 L100 100Z" fill="#1A5A1A" opacity="0.85"/>
        <path d="M0 80 Q60 70 120 80" fill="none" stroke="#7DB87D" stroke-width="12" opacity="0.15"/>
        <circle cx="60" cy="8" r="5" fill="#FFFAF0" opacity="0.6"/>
        <path d="M0 95 Q60 88 120 95" fill="none" stroke="#3A6A3A" stroke-width="14" opacity="0.4"/>
      </svg>`
    },
    {
      label: 'Campfire',
      scene: 'glowing campfire at night',
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glowC" cx="50%" cy="70%">
            <stop offset="0%" stop-color="#FF6600" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#1A0A00" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="#0D0A1A"/>
        <ellipse cx="60" cy="85" rx="40" ry="20" fill="url(#glowC)"/>
        <line x1="40" y1="100" x2="60" y2="75" stroke="#5C3A1E" stroke-width="4" stroke-linecap="round"/>
        <line x1="80" y1="100" x2="60" y2="75" stroke="#4A2E14" stroke-width="4" stroke-linecap="round"/>
        <line x1="55" y1="102" x2="65" y2="72" stroke="#5C3A1E" stroke-width="3" stroke-linecap="round"/>
        <path d="M50 78 Q60 55 70 78 Q65 88 55 88Z" fill="#FF4500" opacity="0.9"/>
        <path d="M53 76 Q60 60 67 76 Q64 84 56 84Z" fill="#FF7700" opacity="0.9"/>
        <path d="M56 74 Q60 65 64 74 Q62 80 58 80Z" fill="#FFD700" opacity="0.9"/>
        <circle cx="60" cy="68" r="4" fill="#FFFAAA" opacity="0.8"/>
        <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="40" cy="12" r="1" fill="white" opacity="0.6"/>
        <circle cx="85" cy="15" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="100" cy="25" r="1" fill="white" opacity="0.5"/>
        <circle cx="15" cy="40" r="1" fill="white" opacity="0.6"/>
      </svg>`
    },
    {
      label: 'Sunrise',
      scene: 'golden sunrise over field',
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sunriseR" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFB347"/>
            <stop offset="40%" stop-color="#FF7B54"/>
            <stop offset="100%" stop-color="#FF4E50"/>
          </linearGradient>
          <radialGradient id="sunR" cx="50%" cy="100%">
            <stop offset="0%" stop-color="#FFEE58"/>
            <stop offset="50%" stop-color="#FFD700"/>
            <stop offset="100%" stop-color="#FF8C00" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="url(#sunriseR)"/>
        <ellipse cx="60" cy="72" rx="50" ry="26" fill="url(#sunR)" opacity="0.9"/>
        <path d="M0 80 Q30 72 60 78 Q90 84 120 76 L120 120 L0 120Z" fill="#5A8A3A" opacity="0.9"/>
        <path d="M0 90 Q40 82 80 88 Q100 92 120 86 L120 120 L0 120Z" fill="#3A6A20" opacity="0.8"/>
        <line x1="20" y1="72" x2="10" y2="62" stroke="#FFE88A" stroke-width="1.5" opacity="0.6"/>
        <line x1="100" y1="72" x2="112" y2="62" stroke="#FFE88A" stroke-width="1.5" opacity="0.6"/>
        <circle cx="20" cy="28" r="3" fill="#FFF" opacity="0.4"/>
        <circle cx="95" cy="22" r="2" fill="#FFF" opacity="0.4"/>
      </svg>`
    },
    {
      label: 'Galaxy',
      scene: 'starry galaxy and nebula',
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="galaxyG" cx="50%" cy="50%">
            <stop offset="0%" stop-color="#9B7BB8"/>
            <stop offset="40%" stop-color="#4A2080"/>
            <stop offset="100%" stop-color="#050A1A"/>
          </radialGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="#050A1A"/>
        <ellipse cx="60" cy="60" rx="55" ry="55" fill="url(#galaxyG)" opacity="0.6"/>
        <ellipse cx="60" cy="60" rx="40" ry="22" fill="none" stroke="#C4A6E8" stroke-width="12" opacity="0.15" transform="rotate(-25,60,60)"/>
        <ellipse cx="60" cy="60" rx="26" ry="14" fill="none" stroke="#D4B8F0" stroke-width="6" opacity="0.2" transform="rotate(-25,60,60)"/>
        <circle cx="60" cy="60" r="8" fill="#FFFAFF" opacity="0.5"/>
        <circle cx="60" cy="60" r="3" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.8"/>
        <circle cx="40" cy="10" r="1" fill="white" opacity="0.7"/>
        <circle cx="85" cy="15" r="2" fill="#C8A8FF" opacity="0.8"/>
        <circle cx="100" cy="30" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="15" cy="50" r="1" fill="white" opacity="0.6"/>
        <circle cx="110" cy="65" r="1.5" fill="#C8A8FF" opacity="0.7"/>
        <circle cx="25" cy="90" r="1" fill="white" opacity="0.6"/>
        <circle cx="95" cy="95" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="50" cy="105" r="1" fill="#C8A8FF" opacity="0.6"/>
      </svg>`
    },
    {
      label: 'Snow',
      scene: 'snow-covered quiet landscape',
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="snowSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#B8D8F0"/>
            <stop offset="100%" stop-color="#E8F4FF"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="url(#snowSky)"/>
        <path d="M0 85 Q30 75 60 82 Q90 89 120 80 L120 120 L0 120Z" fill="white" opacity="0.95"/>
        <path d="M0 92 Q40 86 80 90 Q100 92 120 88 L120 120 L0 120Z" fill="#EEF8FF"/>
        <path d="M20 85 L20 60 L14 60 L20 48 L26 60 L20 60" stroke="white" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.6"/>
        <path d="M90 82 L90 62 L86 62 L90 52 L94 62 L90 62" stroke="white" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.5"/>
        <path d="M50 35 L50 22 M44 28.5 L56 28.5 M46 24 L54 33 M54 24 L46 33" stroke="#A8C8E8" stroke-width="2" stroke-linecap="round"/>
        <path d="M85 22 L85 13 M81 17.5 L89 17.5 M82 14.5 L88 20.5 M88 14.5 L82 20.5" stroke="#B8D8F0" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
        <circle cx="20" cy="22" r="3" fill="white" opacity="0.6"/>
        <circle cx="35" cy="15" r="2" fill="white" opacity="0.5"/>
        <circle cx="100" cy="18" r="2.5" fill="white" opacity="0.5"/>
      </svg>`
    },
    {
      label: 'Desert',
      scene: 'vast desert under full moon',
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="desertSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0A0A2E"/>
            <stop offset="100%" stop-color="#1A0A38"/>
          </linearGradient>
          <linearGradient id="sandD" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#D4A547"/>
            <stop offset="100%" stop-color="#8B6A20"/>
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="12" fill="url(#desertSky)"/>
        <circle cx="88" cy="25" r="16" fill="#FFFAEE" opacity="0.9"/>
        <circle cx="82" cy="20" r="12" fill="url(#desertSky)" opacity="0.45"/>
        <path d="M0 75 Q20 68 40 72 Q60 76 80 70 Q100 64 120 70 L120 120 L0 120Z" fill="url(#sandD)"/>
        <path d="M0 85 Q30 78 60 82 Q90 86 120 80 L120 120 L0 120Z" fill="#C4943A"/>
        <path d="M30 72 L35 45 L32 45 L38 30 L44 45 L41 45 L46 72Z" fill="#3A5A2A" opacity="0.9"/>
        <path d="M35 50 Q28 46 26 52" fill="none" stroke="#3A5A2A" stroke-width="3" stroke-linecap="round"/>
        <path d="M38 45 Q46 42 46 48" fill="none" stroke="#3A5A2A" stroke-width="3" stroke-linecap="round"/>
        <circle cx="15" cy="18" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="28" cy="10" r="1" fill="white" opacity="0.6"/>
        <circle cx="55" cy="14" r="1.5" fill="white" opacity="0.6"/>
        <circle cx="110" cy="10" r="1" fill="white" opacity="0.5"/>
      </svg>`
    }
  ];
  let selected = [];

  function init() {
    selected = [];
    document.getElementById('element-proceed').disabled = true;

    const grid = document.getElementById('element-img-grid');
    grid.innerHTML = '';

    images.forEach((img, i) => {
      const card = document.createElement('div');
      card.className = 'element-img-card';
      card.dataset.index = i;
      card.innerHTML = `
        <div class="img-svg-wrap">${img.svg}</div>
        <span class="img-label">${img.label}</span>
      `;
      card.onclick = () => {
        if (card.classList.contains('selected')) {
          card.classList.remove('selected');
          selected = selected.filter(s => s !== i);
        } else if (selected.length < 3) {
          card.classList.add('selected');
          selected.push(i);
        }
        // Update selection order badges
        const allCards = grid.querySelectorAll('.element-img-card');
        allCards.forEach(c => {
          const badge = c.querySelector('.sel-badge');
          if (badge) badge.remove();
        });
        selected.forEach((idx, order) => {
          const c = allCards[idx];
          const b = document.createElement('span');
          b.className = 'sel-badge';
          b.textContent = order + 1;
          c.appendChild(b);
        });
        document.getElementById('element-proceed').disabled = selected.length !== 3;
      };
      grid.appendChild(card);
    });
  }

  async function startReading() {
    if (selected.length !== 3) return;
    const chosen = selected.map(i => images[i].scene);
    App.showLoading('Reading your elemental aura...');
    let result;
    try { result = await API.getElement(chosen); }
    catch (e) { App.hideLoading(); App.showError(e.message); return; }
    App.hideLoading();

    const elEmojis = { Fire:'🔥', Water:'💧', Earth:'🌍', Air:'💨' };
    const header = `<span class="result-zodiac">${result.emoji || elEmojis[result.element] || '⚡'}</span>
      <div class="result-title">Your Element: ${result.element}</div>`;
    const tags = (result.traits || []).map(t => `<span class="tag">${t}</span>`).join('');
    const content = `
      <div class="fortune-section">
        <div class="fortune-label">✦ Element Reading</div>
        <div class="fortune-text">${result.reading}</div>
      </div>`;
    App.showResult(header, tags, content, null, {
      zodiac: null,
      context: { from: 'element reading', element: result.element, detail: result.reading.substring(0, 100) }
    });
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'element') Tools.element.init();
});
