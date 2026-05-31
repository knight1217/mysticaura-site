/* ===== PERSONA TOOL ===== */
Tools.persona = (function() {
  function init() {
    // Chain mode: auto-generate persona from previous tool context
    if (window._personaChainContext) {
      initWithChain();
      return;
    }
    document.getElementById('persona-input').value = '';
    const trigger = document.querySelector('#persona-platform .custom-select-trigger');
    if (trigger) { trigger.dataset.value = 'instagram'; trigger.textContent = 'Instagram Bio'; }
  }

  /* === Chain Entry: auto-generate persona from cross-tool context === */
  async function initWithChain() {
    const ctx = window._personaChainContext || {};
    const origin = window._personaChainOrigin || '';
    // Construct keywords from whatever context is available
    let words = '';
    if (ctx.words) {
      words = ctx.words;               // from persona reading itself
    } else if (ctx.tarotCards) {
      words = ctx.tarotCards.slice(0, 3).join(' '); // tarot card names
    } else if (ctx.keywords) {
      words = ctx.keywords.split(',').slice(0, 3).join(' '); // destiny keywords
    } else if (ctx.element) {
      words = ctx.element;             // element name
    } else if (ctx.z1 && ctx.z2) {
      words = ctx.z1 + ' ' + ctx.z2;   // compatibility zodiac pair
    } else if (ctx.mood) {
      words = (ctx.z1 || 'cosmic') + ' ' + ctx.mood; // horoscope: zodiac + mood
    } else if (ctx.z1) {
      words = ctx.z1 + ' energy';      // single zodiac
    } else {
      words = 'mystical cosmic divine';
    }

    const platform = 'instagram';
    App.showLoading('Blending your cosmic reading into a persona...');
    let result;
    try { result = await API.getPersona(words, platform); }
    catch (e) { App.hideLoading(); App.showError(e.message); return; }
    App.hideLoading();

    const platformNames = { instagram:'Instagram', twitter:'X/Twitter', tiktok:'TikTok', dating:'Dating Profile' };
    const header = `<span class="result-zodiac">✨</span>
      <div class="result-title">Your Cosmic Persona</div>`;

    const tags = (result.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

    const content = `
      <div class="fortune-section">
        <div class="fortune-label">✦ Persona Reading (from your ${origin} journey)</div>
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

    // Show result with chainOpts — pass original context through so cards still work
    App.showResult(header, tags, content, extraActions, null, {
      chainFrom: 'persona',
      chainContext: window._chainContext,  // pass through original context!
      chainZodiac: window._chainZodiac
    });
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

    App.showResult(header, tags, content, extraActions, null, {
      chainFrom: 'persona',
      chainContext: window._chainContext || { from: 'persona reading', words: words, platform: platform },
      chainZodiac: window._chainZodiac || null
    });
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'persona') Tools.persona.init();
});
