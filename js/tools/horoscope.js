/* ===== HOROSCOPE TOOL ===== */
window.Tools = window.Tools || {};
Tools.horoscope = (function() {
  const D = window.__DATA__;
  let selectedZodiac = null, selectedMood = null;

  function init() {
    selectedZodiac = null;
    selectedMood = null;

    // Build zodiac grid
    const grid = document.getElementById('horoscope-zodiac-grid');
    grid.innerHTML = '';
    D.zodiacs.forEach(z => {
      const card = document.createElement('div');
      card.className = 'zodiac-card';
      card.innerHTML = `<span class="zodiac-emoji">${z.emoji}</span><span class="zodiac-name">${z.name}</span><span class="zodiac-date">${z.dates}</span>`;
      card.onclick = () => selectZodiac(z, card);
      grid.appendChild(card);
    });

    // Build mood grid
    const mgrid = document.getElementById('horoscope-mood-grid');
    mgrid.innerHTML = '';
    D.moods.forEach(m => {
      const card = document.createElement('div');
      card.className = 'mood-card';
      card.setAttribute('data-mood', m.key);
      card.innerHTML = `<span class="mood-emoji">${m.emoji}</span><div class="mood-name">${m.name}</div><div class="mood-desc">${m.desc}</div>`;
      card.onclick = () => selectMood(m, card);
      mgrid.appendChild(card);
    });

    document.getElementById('horoscope-step2').style.display = 'none';
    document.getElementById('horoscope-step-label').textContent = 'Step 1 — Pick your zodiac sign';
    document.getElementById('horoscope-proceed').disabled = true;
    
    // Hide the mood spacer initially
    const spacer = document.getElementById('horoscope-mood-spacer');
    if (spacer) spacer.style.display = 'none';
  }

  function selectZodiac(z, el) {
    document.querySelectorAll('#horoscope-zodiac-grid .zodiac-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedZodiac = z;
    document.getElementById('horoscope-step2').style.display = 'block';
    document.getElementById('horoscope-mood-spacer').style.display = 'block';
    document.getElementById('horoscope-step-label').textContent = 'Step 2 — How are you feeling?';
    updateBtn();
  }

  function selectMood(m, el) {
    document.querySelectorAll('#horoscope-mood-grid .mood-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedMood = m;
    updateBtn();
  }

  function updateBtn() {
    document.getElementById('horoscope-proceed').disabled = !(selectedZodiac && selectedMood);
  }

  async function startReading() {
    if (!selectedZodiac || !selectedMood) return;
    App.showLoading('The stars are whispering...');
    let result;
    try { result = await API.getHoroscope(selectedZodiac, selectedMood); }
    catch (e) { App.hideLoading(); App.showError(e.message); return; }
    App.hideLoading();

    const header = `<span class="result-zodiac">${selectedZodiac.emoji}</span>
      <div class="result-title">${selectedZodiac.name} · ${selectedMood.emoji} ${selectedMood.name} Fortune</div>`;

    const tags = (result.keywords || []).map(k => `<span class="tag">${k}</span>`).join('');

    const content = `
      <div class="fortune-section">
        <div class="fortune-label">✦ Today's Reading</div>
        <div class="fortune-text">${result.reading}</div>
      </div>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-icon">🎨</div><div class="detail-label">Lucky Color</div><div class="detail-value">${result.color}</div></div>
        <div class="detail-item"><div class="detail-icon">🔢</div><div class="detail-label">Lucky Number</div><div class="detail-value">${result.lucky}</div></div>
        <div class="detail-item"><div class="detail-icon">🌙</div><div class="detail-label">Moon Phase</div><div class="detail-value">${result.moon}</div></div>
        <div class="detail-item"><div class="detail-icon">⚡</div><div class="detail-label">Element</div><div class="detail-value">${result.element}</div></div>
      </div>
      <div class="fortune-section">
        <div class="fortune-label">✦ Cosmic Advice</div>
        <div class="fortune-text">${result.advice}</div>
      </div>`;

    App.showResult(header, tags, content, null, { 
      zodiac: selectedZodiac.name,
      context: { from: 'daily horoscope', mood: selectedMood.name, detail: result.reading.substring(0, 120) }
    });
  }

  return { init, startReading };
})();

// Auto-init on tool open
window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'horoscope') Tools.horoscope.init();
});
