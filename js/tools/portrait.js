/* ===== PORTRAIT GIFT TOOL ===== */
Tools.portrait = (function() {
  const D = window.__DATA__;
  let selectedZodiac = null;

  function init() {
    selectedZodiac = null;
    document.getElementById('portrait-proceed').disabled = true;

    // Check if this is a surprise mode activation
    const surpriseZodiac = window._portraitSurpriseZodiac;
    if (surpriseZodiac) {
      delete window._portraitSurpriseZodiac;

      // Find the matching zodiac from data
      const D = window.__DATA__;
      const match = D.zodiacs.find(z => z.name === surpriseZodiac);
      if (match) {
        selectedZodiac = match;
        // Skip zodiac picker, start reading immediately with special text
        startReading(true);
        return;
      }
      // If no match found, fall through to normal zodiac picker
    }

    const grid = document.getElementById('portrait-zodiac-grid');
    grid.innerHTML = '';

    // Add "Powered by your reading" note if coming from surprise mode (zodiac not found)
    const picker = document.getElementById('portrait-zodiac-picker');
    // Remove any existing note
    const existingNote = picker.querySelector('.surprise-note');
    if (existingNote) existingNote.remove();
    if (surpriseZodiac) {
      const note = document.createElement('div');
      note.className = 'surprise-note';
      note.style.cssText = 'text-align:center;font-size:0.82rem;color:var(--warm-gold);font-style:italic;margin-bottom:12px;';
      note.textContent = 'Powered by your reading';
      picker.insertBefore(note, picker.firstChild);
    }

    D.zodiacs.forEach(z => {
      const card = document.createElement('div');
      card.className = 'zodiac-card';
      card.innerHTML = `<span class="zodiac-emoji">${z.emoji}</span><span class="zodiac-name">${z.name}</span><span class="zodiac-date">${z.dates}</span>`;
      card.onclick = () => {
        document.querySelectorAll('#portrait-zodiac-grid .zodiac-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedZodiac = z;
        document.getElementById('portrait-proceed').disabled = false;
      };
      grid.appendChild(card);
    });
  }

  async function startReading(isSurprise) {
    if (!selectedZodiac) return;
    
    // Build context string if coming from surprise
    let contextStr = '';
    if (isSurprise && window._portraitSurpriseContext) {
      const ctx = window._portraitSurpriseContext;
      contextStr = ctx.from ? `User just had a ${ctx.from} reading.` : '';
      if (ctx.mood) contextStr += ` Their mood was ${ctx.mood}.`;
      if (ctx.detail) contextStr += ` Reading detail: ${ctx.detail}`;
      if (ctx.match) contextStr += ` Compatibility: ${ctx.match}.`;
      if (ctx.score) contextStr += ` Score: ${ctx.score}%.`;
      if (ctx.name) contextStr += ` Name: ${ctx.name}.`;
      if (ctx.keywords) contextStr += ` Keywords: ${ctx.keywords}.`;
      if (ctx.element) contextStr += ` Element: ${ctx.element}.`;
      if (ctx.words) contextStr += ` Words: ${ctx.words}.`;
      if (ctx.platform) contextStr += ` Platform: ${ctx.platform}.`;
    }

    const loadingText = isSurprise ? 'The stars have a special gift for you...' : 'The stars are preparing your gift...';
    App.showLoading(loadingText);
    
    const result = await API.getPortrait(selectedZodiac, contextStr || null);
    App.hideLoading();

    // Force portrait flow page to be scrollable
    const flowPage = document.getElementById('flow-portrait');
    if (flowPage) {
      flowPage.style.overflowY = 'scroll'; // NOT auto — force scrollbar
      flowPage.style.overflowX = 'hidden';
      flowPage.style.height = '100vh';
      flowPage.style.WebkitOverflowScrolling = 'touch';
      flowPage.style.paddingBottom = '60px';
    }

    const platformHTML = buildPlatformCards(result.prompt, result.tier);

    const header = `<span class="result-zodiac">${selectedZodiac.emoji}</span>
      <div class="result-title">Your Mystic Portrait Gift</div>`;

    const tags = `<span class="tag">${selectedZodiac.name}</span>
      <span class="tag">${selectedZodiac.element}</span>
      <span class="tag">${result.styleDesc}</span>
      <span class="tag">${result.vibe}</span>`;

    const content = `
      <div class="fortune-section">
        <div class="fortune-label">✦ Your Portrait Prompt</div>
        <div class="prompt-box">
          <button class="copy-btn-top" onclick="navigator.clipboard.writeText(this.nextElementSibling.textContent.trim()).then(()=>{this.textContent='Copied!';setTimeout(()=>this.textContent='Copy',2000)})">Copy</button>
          <span>${result.prompt}</span>
        </div>
      </div>
      <div class="fortune-section">
        <div class="fortune-label">✦ Where to Generate</div>
        ${platformHTML}
      </div>
      <div style="margin-top:10px;padding:12px 16px;background:rgba(212,165,116,0.05);border-radius:12px;text-align:center;">
        <span style="font-size:0.75rem;color:var(--text-dim);">Copy the prompt → open any platform → paste → enjoy your art ✦</span>
      </div>`;

    const shareText = encodeURIComponent(`My MysticAura portrait gift: ${result.prompt}`);
    const shareUrl = encodeURIComponent('https://mysticaura.fun');
    const extraActions = `
      <button class="share-btn" onclick="window.open('https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}','_blank')">𝕏 Share</button>
      <button class="share-btn" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${shareUrl}','_blank')">📘 Share</button>
      <button class="share-btn" onclick="navigator.clipboard.writeText('${result.prompt.replace(/'/g,"\\'").replace(/\n/g,' ')}');alert('Prompt copied!')">📋 Copy Prompt</button>`;

    App.showResult(header, tags, content, extraActions);
  }

  function buildPlatformCards(prompt, tier) {
    const plat = D.platforms;
    const encodedPrompt = encodeURIComponent(prompt);

    // Icon map for each platform
    const icons = {
      'Gemini / Nano Banana': '✨',
      'ChatGPT / GPT Image 2': '🤖',
      'Leonardo.ai': '🎨',
      'Midjourney': '🌟',
      'Canva Pro': '🖌️'
    };

    let html = '';

    // === FREE ROW (3 cards, side by side) ===
    html += '<div class="platform-row free-row" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;">';
    plat.free.forEach(p => {
      const icon = icons[p.name] || '🖼️';
      html += `<a class="platform-card simple free" href="${p.url}" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 20px;background:rgba(212,165,116,0.06);border:1px solid rgba(212,165,116,0.2);border-radius:14px;text-decoration:none;min-width:110px;flex:1;max-width:180px;transition:all 0.3s;">
        <span class="platform-badge free" style="font-size:0.65rem;padding:2px 10px;border-radius:20px;background:rgba(76,175,80,0.15);color:#81C784;">FREE</span>
        <span class="platform-icon" style="font-size:1.4rem;">${icon}</span>
        <span class="platform-name" style="font-size:0.82rem;color:var(--text-main);text-align:center;font-weight:500;">${p.name}</span>
      </a>`;
    });
    html += '</div>';

    // === PAID ROW (2 cards, centered) ===
    html += '<div class="platform-row paid-row" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">';
    plat.paid.forEach(p => {
      const icon = icons[p.name] || '💎';
      html += `<a class="platform-card simple paid" href="${p.url}" target="_blank" rel="noopener" style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 20px;background:rgba(155,123,184,0.06);border:1px solid rgba(155,123,184,0.2);border-radius:14px;text-decoration:none;min-width:130px;flex:1;max-width:200px;transition:all 0.3s;">
        <span class="platform-badge paid" style="font-size:0.65rem;padding:2px 10px;border-radius:20px;background:rgba(212,165,116,0.12);color:var(--warm-gold);">PRO</span>
        <span class="platform-icon" style="font-size:1.4rem;">${icon}</span>
        <span class="platform-name" style="font-size:0.82rem;color:var(--text-main);text-align:center;font-weight:500;">${p.name}</span>
      </a>`;
    });
    html += '</div>';

    // Small hint text
    html += `<p style="text-align:center;margin-top:14px;font-size:0.72rem;color:var(--text-dim);">Click a platform — paste the prompt above — generate!</p>`;
    return html;
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'portrait') Tools.portrait.init();
});
