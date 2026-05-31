/* ===== DESTINY TOOL ===== */
Tools.destiny = (function() {
  function init() {
    document.getElementById('destiny-name').value = '';
    document.getElementById('destiny-birthday').value = '';
  }

  async function startReading() {
    const name = document.getElementById('destiny-name').value.trim();
    const birthday = document.getElementById('destiny-birthday').value;
    if (!name) { alert('Please enter your name'); return; }
    if (!birthday) { alert('Please enter your birthday'); return; }

    App.showLoading('Unveiling your destiny...');
    let result;
    try { result = await API.getDestiny(name, birthday); }
    catch (e) { App.hideLoading(); App.showError(e.message, () => startReading()); return; }
    App.hideLoading();

    const header = `<span class="result-zodiac">🔑</span>
      <div class="result-title">Your Destiny Revealed</div>`;

    const tags = (result.keywords || []).map(k => `<span class="tag">${k}</span>`).join('');

    const content = `
      <div class="fortune-section">
        <div class="fortune-label">✦ ${name}'s Destiny</div>
        <div class="fortune-text">${result.reading}</div>
      </div>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-icon">⚡</div><div class="detail-label">Ruling Element</div><div class="detail-value">${result.element || 'Unknown'}</div></div>
        <div class="detail-item"><div class="detail-icon">🎂</div><div class="detail-label">Birthday</div><div class="detail-value">${birthday}</div></div>
      </div>`;

    // Auto-compute zodiac from birthday
    const zodiacFromBday = window.birthdayToZodiac ? window.birthdayToZodiac(birthday) : null;
    App.showResult(header, tags, content, null, null, {
      chainFrom: 'destiny',
      chainZodiac: zodiacFromBday,
      chainContext: { 
        from: 'destiny reading', 
        name: name,
        birthday: birthday,
        keywords: (result.keywords || ['mystery','light','shadow']).join(', '),
        detail: result.reading ? result.reading.substring(0, 100) : ''
      }
    });
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'destiny') Tools.destiny.init();
});
