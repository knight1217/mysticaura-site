/* ===== INNER ELEMENT TOOL ===== */
Tools.element = (function() {
  const images = [
    { emoji:'🌋', label:'Volcano', scene:'volcano erupting at sunset' },
    { emoji:'🌊', label:'Ocean', scene:'deep ocean waves' },
    { emoji:'🏔️', label:'Mountain', scene:'snow-capped mountain peak' },
    { emoji:'🌪️', label:'Storm', scene:'dramatic thunderstorm' },
    { emoji:'🌲', label:'Forest', scene:'ancient misty forest' },
    { emoji:'🔥', label:'Campfire', scene:'glowing campfire at night' },
    { emoji:'🌅', label:'Sunrise', scene:'golden sunrise over field' },
    { emoji:'🌌', label:'Galaxy', scene:'starry galaxy and nebula' },
    { emoji:'❄️', label:'Snow', scene:'snow-covered quiet landscape' },
    { emoji:'🏜️', label:'Desert', scene:'vast desert under full moon' }
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
      card.innerHTML = `<span class="img-emoji">${img.emoji}</span><span class="img-label">${img.label}</span>`;
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
