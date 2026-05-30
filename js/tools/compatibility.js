/* ===== COMPATIBILITY TOOL ===== */
Tools.compatibility = (function() {
  const D = window.__DATA__;
  let z1 = null, z2 = null, step = 1;

  function init() {
    z1 = null; z2 = null; step = 1;
    document.getElementById('compat-step-label').textContent = 'Pick your sign';
    document.getElementById('compat-step2').style.display = 'none';
    document.getElementById('compat-separator').style.display = 'none';
    document.getElementById('compat-proceed').disabled = true;

    // Build grid 1
    const g1 = document.getElementById('compat-zodiac-1');
    g1.innerHTML = '';
    D.zodiacs.forEach(z => {
      const card = document.createElement('div');
      card.className = 'zodiac-card';
      card.innerHTML = `<span class="zodiac-emoji">${z.emoji}</span><span class="zodiac-name">${z.name}</span><span class="zodiac-date">${z.dates}</span>`;
      card.onclick = () => {
        document.querySelectorAll('#compat-zodiac-1 .zodiac-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        z1 = z;
        document.getElementById('compat-step2').style.display = 'block';
        document.getElementById('compat-separator').style.display = 'flex';
        document.getElementById('compat-step-label').textContent = 'Pick their sign';
        updateBtn();
      };
      g1.appendChild(card);
    });

    // Build grid 2
    const g2 = document.getElementById('compat-zodiac-2');
    g2.innerHTML = '';
    D.zodiacs.forEach(z => {
      const card = document.createElement('div');
      card.className = 'zodiac-card';
      card.innerHTML = `<span class="zodiac-emoji">${z.emoji}</span><span class="zodiac-name">${z.name}</span><span class="zodiac-date">${z.dates}</span>`;
      card.onclick = () => {
        document.querySelectorAll('#compat-zodiac-2 .zodiac-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        z2 = z;
        updateBtn();
      };
      g2.appendChild(card);
    });
  }

  function updateBtn() {
    document.getElementById('compat-proceed').disabled = !(z1 && z2);
  }

  async function startReading() {
    if (!z1 || !z2) return;
    App.showLoading('Calculating cosmic alignment...');
    const result = await API.getCompatibility(z1, z2);
    App.hideLoading();

    const scoreColor = result.score > 75 ? '#8BC34A' : result.score > 55 ? '#FF9800' : '#E91E63';
    const header = `<span class="result-zodiac" style="font-size:3rem;">${z1.emoji} ${z2.emoji}</span>
      <div class="result-title">${z1.name} + ${z2.name}</div>`;

    const tags = `<span class="tag" style="font-size:1.3rem;font-weight:bold;color:${scoreColor};">${result.score}% Match</span>
      <span class="tag-divider">·</span>
      <span class="tag">${result.rating}</span>`;

    const content = `
      <div class="fortune-section">
        <div class="fortune-label">✦ Cosmic Connection</div>
        <div class="fortune-text">${result.reading}</div>
      </div>
      <div class="fortune-section">
        <div class="fortune-label">✦ Relationship Advice</div>
        <div class="fortune-text">${result.advice}</div>
      </div>
      ${result.complement ? `<div class="fortune-section">
        <div class="fortune-label">✦ How You Complement Each Other</div>
        <div class="fortune-text">${result.complement}</div>
      </div>` : ''}
      ${result.scenarios ? `<div class="fortune-section">
        <div class="fortune-label">✦ Perfect Date Ideas</div>
        <div class="detail-grid">
          ${result.scenarios.split('\n').filter(s => s.trim()).map(s => `<div class="detail-item"><div class="detail-icon">✦</div><div class="detail-value" style="font-size:0.9rem;">${s.trim()}</div></div>`).join('')}
        </div>
      </div>` : ''}`;

    App.showResult(header, tags, content, null, { 
      zodiac: z1.name + ' + ' + z2.name,
      context: { 
        from: 'compatibility reading', 
        match: z1.name + ' & ' + z2.name, 
        score: result.score, 
        detail: result.rating,
        isCouple: true,
        z1: z1.name,
        z2: z2.name
      }
    });
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'compatibility') Tools.compatibility.init();
});
