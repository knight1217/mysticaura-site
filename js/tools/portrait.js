/* ===== PORTRAIT GIFT TOOL ===== */
Tools.portrait = (function() {
  const D = window.__DATA__;
  let selectedZodiac = null;

  function init() {
    selectedZodiac = null;
    document.getElementById('portrait-proceed').disabled = true;

    // Check if this is a surprise mode activation (from another tool's result)
    let surpriseZodiac = window._portraitSurpriseZodiac;

    // Fallback: zodiac consumed but context still has it (e.g. Try Again)
    if (!surpriseZodiac && window._portraitSurpriseContext && window._portraitSurpriseContext.z1) {
      surpriseZodiac = window._portraitSurpriseContext.z1;
    }

    if (surpriseZodiac) {
      delete window._portraitSurpriseZodiac;

      const D = window.__DATA__;
      let match = D.zodiacs.find(z => z.name === surpriseZodiac);

      // If no match, fallback to first zodiac — never show the picker in surprise mode
      if (!match) match = D.zodiacs[0];

      selectedZodiac = match;

      // Hide the entire zodiac picker (title, grid, button) — no flash, no re-select
      const picker = document.getElementById('portrait-zodiac-picker');
      if (picker) picker.style.display = 'none';

      startReading(true);
      return;
    }

    // Normal mode: show the zodiac picker grid
    const picker = document.getElementById('portrait-zodiac-picker');
    if (picker) {
      picker.style.display = '';
      picker.style.opacity = '1';
    }

    const grid = document.getElementById('portrait-zodiac-grid');
    grid.innerHTML = '';

    // Clean up any surprise note
    const existingNote = picker.querySelector('.surprise-note');
    if (existingNote) existingNote.remove();

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
    let result;
    try { result = await API.getPortrait(selectedZodiac, contextStr || null); }
    catch (e) { App.hideLoading(); App.showError(e.message); return; }
    App.hideLoading();

    // Portrait result uses natural page flow (no forced scroll)
    const flowPage = document.getElementById('flow-portrait');
    if (flowPage) {
      flowPage.style.overflowY = '';
      flowPage.style.overflowX = '';
      flowPage.style.height = '';
      flowPage.style.paddingBottom = '';
    }

    const platformHTML = buildPlatformCards(result.prompt, result.tier);

    // Check if this is a couple portrait (from compatibility with z2)
    const isCouple = isSurprise && window._portraitSurpriseContext && window._portraitSurpriseContext.z2;
    const ctx = isCouple ? window._portraitSurpriseContext : null;
    let coupleZ2 = null;
    if (ctx && ctx.z2) {
      coupleZ2 = D.zodiacs.find(z => z.name === ctx.z2);
    }

    // Header: match Compatibility page style — emojis side by side + "Name1 + Name2" text
    const header = isCouple && coupleZ2
      ? `<div style="display:flex;align-items:center;justify-content:center;gap:16px;">
           <span class="result-zodiac" style="font-size:3rem;">${selectedZodiac.emoji}</span>
           <span class="result-zodiac" style="font-size:3rem;">${coupleZ2.emoji}</span>
         </div>
         <div style="font-family:'Georgia',serif;font-size:1.1rem;color:var(--text-main);margin-top:6px;">${selectedZodiac.name} + ${coupleZ2.name}</div>
         <div class="result-title" style="margin-top:2px;">Your Mystic Portrait Gift</div>`
      : `<span class="result-zodiac" style="font-size:3rem;">${selectedZodiac.emoji}</span>
         <div style="font-family:'Georgia',serif;font-size:1.1rem;color:var(--text-main);margin-top:6px;">${selectedZodiac.name}</div>
         <div class="result-title" style="margin-top:2px;">Your Mystic Portrait Gift</div>`;

    // Tags: couple → "Name1 + Name2" as one tag; single → one name
    const tags = isCouple && coupleZ2
      ? `<span class="tag">${selectedZodiac.name} + ${coupleZ2.name}</span>
         <span class="tag">${selectedZodiac.element}</span>
         <span class="tag">${result.styleDesc}</span>
         <span class="tag">${result.vibe}</span>`
      : `<span class="tag">${selectedZodiac.name}</span>
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
