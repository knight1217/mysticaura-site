/* ===== PERSONA TOOL ===== */
Tools.persona = (function() {
  function init() {
    document.getElementById('persona-input').value = '';
    const trigger = document.querySelector('#persona-platform .custom-select-trigger');
    if (trigger) { trigger.dataset.value = 'instagram'; trigger.textContent = 'Instagram Bio'; }
  }

  async function startReading() {
    const words = document.getElementById('persona-input').value.trim();
    const trigger = document.querySelector('#persona-platform .custom-select-trigger');
    const platform = trigger ? trigger.dataset.value : 'instagram';
    if (!words) { alert('Please describe yourself in 3 words'); return; }

    App.showLoading('Crafting your persona...');
    let result;
    try { result = await API.getPersona(words, platform); }
    catch (e) { App.hideLoading(); App.showError(e.message); return; }
    App.hideLoading();

    const platformNames = { instagram:'Instagram', twitter:'X/Twitter', tiktok:'TikTok', dating:'Dating Profile' };
    const header = `<span class="result-zodiac">✨</span>
      <div class="result-title">Your ${platformNames[platform] || ''} Persona</div>`;

    const tags = (result.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

    const content = `
      <div class="fortune-section">
        <div class="fortune-label">✦ Persona Reading</div>
        <div class="fortune-text">${result.reading}</div>
      </div>
      <div class="prompt-card">
        <div class="fortune-label">✦ Your Bio</div>
        <div class="prompt-box">
          <button class="copy-btn-top" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent).then(()=>{this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',2000)})">Copy</button>
          <span style="white-space:pre-wrap;">${result.bio}</span>
        </div>
      </div>`;

    const extraActions = `<button class="action-btn" onclick="navigator.clipboard.writeText('${result.bio.replace(/'/g,"\\'").replace(/\n/g,'\\n')}');alert('Bio copied!')">📋 Copy Bio</button>`;

    App.showResult(header, tags, content, extraActions, { 
      zodiac: null,
      context: { from: 'persona reading', words: words, platform: platform }
    });
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'persona') Tools.persona.init();
});
