/* ===== TAROT TOOL — Production v3 — Complete Rewrite ===== */
Tools.tarot = (function() {
  const D = window.__DATA__;
  let drawnCards = [];
  let revealedCount = 0;
  let _styleInjected = false;

  /* ===== Style Injection ===== */
  const STYLES = `
    /* --- Dark theme for flow-tarot page --- */
    #flow-tarot {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 100vh !important;
      min-height: 100dvh !important;
      background: linear-gradient(170deg, #0a0618 0%, #110b2a 25%, #1a0e38 50%, #0f0822 75%, #060312 100%) !important;
      position: relative;
      overflow-x: hidden;
      padding: 20px 16px;
      box-sizing: border-box;
    }
    #flow-tarot .back-btn,
    #flow-tarot .flow-back-btn {
      color: #D4A574 !important;
      background: rgba(212,165,116,0.08) !important;
      border: 1px solid rgba(212,165,116,0.2) !important;
      border-radius: 8px !important;
    }
    #flow-tarot .back-btn:hover,
    #flow-tarot .flow-back-btn:hover {
      background: rgba(212,165,116,0.15) !important;
    }
    #flow-tarot h2,
    #flow-tarot .flow-title,
    #flow-tarot .tarot-page-title {
      background: linear-gradient(135deg, #D4A574 0%, #F0D9B5 40%, #D4A574 60%, #B8860B 100%) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      background-clip: text !important;
      color: transparent !important;
      font-family: 'Georgia', 'Palatino Linotype', 'Book Antiqua', serif !important;
      letter-spacing: 0.06em;
    }
    #flow-tarot .proceed-btn,
    #flow-tarot #tarot-proceed {
      background: linear-gradient(135deg, rgba(212,165,116,0.15) 0%, rgba(212,165,116,0.08) 100%) !important;
      border: 1.5px solid rgba(212,165,116,0.4) !important;
      color: #D4A574 !important;
      font-family: 'Georgia', 'Palatino Linotype', serif !important;
      letter-spacing: 0.05em;
      border-radius: 12px !important;
      padding: 12px 36px !important;
      transition: all 0.3s ease;
    }
    #flow-tarot .proceed-btn:hover,
    #flow-tarot #tarot-proceed:hover {
      background: linear-gradient(135deg, rgba(212,165,116,0.25) 0%, rgba(212,165,116,0.12) 100%) !important;
      box-shadow: 0 0 20px rgba(212,165,116,0.3), 0 0 40px rgba(155,123,184,0.15) !important;
    }

    /* --- Keyframes --- */
    @keyframes tarot-card-enter {
      0%   { opacity: 0; transform: translateY(50px) rotateY(30deg) scale(0.7); }
      50%  { opacity: 1; transform: translateY(-12px) rotateY(-8deg) scale(1.05); }
      70%  { transform: translateY(4px) rotateY(3deg) scale(0.98); }
      100% { opacity: 1; transform: translateY(0) rotateY(0deg) scale(1); }
    }
    @keyframes tarot-card-float {
      0%, 100% { transform: translateY(0) rotateY(0deg); }
      50%       { transform: translateY(-10px) rotateY(2deg); }
    }
    @keyframes tarot-sparkle {
      0%   { opacity: 1; transform: scale(0) rotate(0deg); }
      30%  { opacity: 1; transform: scale(1.2) rotate(120deg); }
      100% { opacity: 0; transform: scale(0.3) rotate(360deg); }
    }
    @keyframes tarot-flash {
      0%   { opacity: 0; transform: scale(0.5); }
      40%  { opacity: 0.9; transform: scale(1.5); }
      100% { opacity: 0; transform: scale(2.5); }
    }
    @keyframes tarot-shuffle-card {
      0%   { opacity: 0; transform: translate(var(--sx), var(--sy)) rotateX(var(--srx)) rotateY(var(--sr)) rotateZ(var(--srz)) scale(0.5); }
      15%  { opacity: 1; transform: translate(calc(var(--sx) * 0.6), calc(var(--sy) * 0.5)) rotateX(calc(var(--srx) * 0.4)) rotateY(calc(var(--sr) * 0.6)) rotateZ(calc(var(--srz) * 0.5)) scale(0.8); }
      40%  { transform: translate(var(--mx1), var(--my1)) rotateX(var(--mrx1)) rotateY(var(--mr1)) rotateZ(var(--mrz1)) scale(0.95); }
      65%  { transform: translate(var(--mx2), var(--my2)) rotateX(var(--mrx2)) rotateY(var(--mr2)) rotateZ(var(--mrz2)) scale(1.05); }
      85%  { opacity: 1; transform: translate(calc(var(--ex) * 0.3), calc(var(--ey) * 0.3)) rotateX(calc(var(--erx) * 0.3)) rotateY(calc(var(--er) * 0.3)) rotateZ(calc(var(--erz) * 0.3)) scale(0.9); }
      100% { opacity: 0; transform: translate(var(--ex), var(--ey)) rotateX(var(--erx)) rotateY(var(--er)) rotateZ(var(--erz)) scale(0.4); }
    }
    @keyframes tarot-btn-glow {
      0%, 100% { box-shadow: 0 0 8px rgba(212,165,116,0.3), 0 0 20px rgba(212,165,116,0.1); }
      50%      { box-shadow: 0 0 20px rgba(212,165,116,0.6), 0 0 45px rgba(155,123,184,0.4), 0 0 60px rgba(212,165,116,0.2); }
    }
    @keyframes tarot-card-flip-glow {
      0%   { box-shadow: 0 0 0px rgba(212,165,116,0); }
      40%  { box-shadow: 0 0 40px rgba(212,165,116,0.9), 0 0 80px rgba(155,123,184,0.6), 0 0 100px rgba(212,165,116,0.3); }
      100% { box-shadow: 0 0 12px rgba(212,165,116,0.3), 0 0 25px rgba(155,123,184,0.2); }
    }
    @keyframes tarot-instruction-fade {
      0%   { opacity: 0; transform: translateY(8px); }
      100% { opacity: 0.9; transform: translateY(0); }
    }
    @keyframes tarot-card-flip-inner {
      0%   { transform: rotateY(0deg); }
      50%  { transform: rotateY(90deg) scale(1.08); }
      100% { transform: rotateY(180deg) scale(1); }
    }
    @keyframes tarot-snap-in {
      0%   { opacity: 0; transform: translateY(30px) scale(1.15); }
      60%  { opacity: 1; transform: translateY(-5px) scale(0.97); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes tarot-card-shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    /* --- Card Container --- */
    .tarot-card-container {
      position: relative;
      width: 150px; height: 220px;
      perspective: 1000px;
    }
    .tarot-card-inner {
      position: relative;
      width: 100%; height: 100%;
      transform-style: preserve-3d;
    }
    .tarot-card-inner.flipping {
      animation: tarot-card-flip-inner 0.7s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
    }

    /* --- Card Back --- */
    .tarot-card-back {
      width: 150px; height: 220px;
      background: linear-gradient(145deg, #2D1B4E 0%, #1e0e3d 30%, #150a2e 60%, #2D1B4E 100%);
      border: 3px solid rgba(212,165,116,0.45);
      border-radius: 12px;
      position: relative;
      cursor: pointer;
      box-shadow:
        0 6px 30px rgba(0,0,0,0.5),
        0 0 40px rgba(155,123,184,0.15),
        inset 0 0 50px rgba(155,123,184,0.1);
      overflow: hidden;
      user-select: none;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      backface-visibility: hidden;
    }
    .tarot-card-back:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow:
        0 12px 40px rgba(0,0,0,0.6),
        0 0 30px rgba(155,123,184,0.3),
        0 0 50px rgba(212,165,116,0.15);
    }
    /* Outer border decoration */
    .tarot-card-back::before {
      content: '';
      position: absolute;
      inset: 6px;
      border: 2px solid rgba(212,165,116,0.35);
      border-radius: 8px;
      pointer-events: none;
    }
    /* Inner border + corner ornaments */
    .tarot-card-back::after {
      content: '';
      position: absolute;
      inset: 12px;
      border: 1px solid rgba(212,165,116,0.18);
      border-radius: 6px;
      background:
        radial-gradient(circle at 8px 8px, rgba(212,165,116,0.7) 3px, transparent 3px),
        radial-gradient(circle at calc(100% - 8px) 8px, rgba(212,165,116,0.7) 3px, transparent 3px),
        radial-gradient(circle at 8px calc(100% - 8px), rgba(212,165,116,0.7) 3px, transparent 3px),
        radial-gradient(circle at calc(100% - 8px) calc(100% - 8px), rgba(212,165,116,0.7) 3px, transparent 3px),
        radial-gradient(circle at 20px 20px, rgba(212,165,116,0.4) 2px, transparent 2px),
        radial-gradient(circle at calc(100% - 20px) 20px, rgba(212,165,116,0.4) 2px, transparent 2px),
        radial-gradient(circle at 20px calc(100% - 20px), rgba(212,165,116,0.4) 2px, transparent 2px),
        radial-gradient(circle at calc(100% - 20px) calc(100% - 20px), rgba(212,165,116,0.4) 2px, transparent 2px);
      pointer-events: none;
    }

    /* Mandala center on card back */
    .tarot-card-center-star {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 80px; height: 80px;
      pointer-events: none;
    }
    .tarot-card-center-star svg {
      width: 100%; height: 100%;
    }

    /* --- Card Front --- */
    .tarot-card-front {
      position: absolute;
      inset: 0;
      width: 150px; height: 220px;
      border-radius: 12px;
      backface-visibility: hidden;
      transform: rotateY(180deg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 0;
      box-sizing: border-box;
      overflow: hidden;
    }
    .tarot-card-front.revealed-anim {
      animation: tarot-card-flip-glow 1s ease-out forwards;
    }

    /* Card front background */
    .tarot-card-front-bg {
      position: absolute;
      inset: 0;
      background: linear-gradient(160deg, #1a0e38 0%, #231345 30%, #1D0F3A 70%, #150a2e 100%);
      z-index: 0;
    }
    .tarot-card-front-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 50% 30%, rgba(155,123,184,0.12) 0%, transparent 60%),
                  radial-gradient(ellipse at 50% 80%, rgba(212,165,116,0.06) 0%, transparent 50%);
    }

    /* Double gold border on front */
    .tarot-card-front-border-outer {
      position: absolute;
      inset: 5px;
      border: 2.5px solid rgba(212,165,116,0.5);
      border-radius: 9px;
      z-index: 1;
      pointer-events: none;
    }
    .tarot-card-front-border-inner {
      position: absolute;
      inset: 12px;
      border: 1px solid rgba(212,165,116,0.25);
      border-radius: 6px;
      z-index: 1;
      pointer-events: none;
    }

    /* Corner flourishes on front */
    .tarot-card-front-corner {
      position: absolute;
      width: 20px; height: 20px;
      z-index: 2;
      pointer-events: none;
    }
    .tarot-card-front-corner svg {
      width: 100%; height: 100%;
    }
    .tarot-card-front-corner.tl { top: 13px; left: 13px; }
    .tarot-card-front-corner.tr { top: 13px; right: 13px; transform: scaleX(-1); }
    .tarot-card-front-corner.bl { bottom: 13px; left: 13px; transform: scaleY(-1); }
    .tarot-card-front-corner.br { bottom: 13px; right: 13px; transform: scale(-1, -1); }

    /* Position label at top */
    .tarot-position-label {
      position: relative;
      z-index: 3;
      font-family: 'Georgia', 'Palatino Linotype', 'Book Antiqua', serif;
      font-size: 0.6rem;
      color: #D4A574;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-weight: 600;
      margin-top: 22px;
      text-align: center;
    }

    /* Symbol area */
    .tarot-symbol-area {
      position: relative;
      z-index: 3;
      width: 70px; height: 70px;
      display: flex; align-items: center; justify-content: center;
      margin-top: 12px;
      filter: drop-shadow(0 0 8px rgba(212,165,116,0.3));
    }
    .tarot-symbol-area svg {
      width: 100%; height: 100%;
    }

    /* Card name */
    .tarot-card-name {
      position: relative;
      z-index: 3;
      font-family: 'Georgia', 'Palatino Linotype', 'Book Antiqua', serif;
      font-size: 0.78rem;
      font-weight: 700;
      color: #F0D9B5;
      text-align: center;
      line-height: 1.3;
      letter-spacing: 0.03em;
      margin-top: 10px;
      padding: 0 12px;
    }

    /* Shimmer effect on front */
    .tarot-card-front-shimmer {
      position: absolute;
      inset: 0;
      z-index: 4;
      pointer-events: none;
      background: linear-gradient(110deg, transparent 30%, rgba(212,165,116,0.06) 45%, rgba(212,165,116,0.12) 50%, rgba(212,165,116,0.06) 55%, transparent 70%);
      background-size: 200% 100%;
      animation: tarot-card-shimmer 4s ease-in-out infinite;
    }

    /* --- Sparkle particles --- */
    .tarot-sparkle {
      position: fixed;
      pointer-events: none;
      z-index: 1000;
    }
    .tarot-sparkle svg {
      width: 100%; height: 100%;
    }

    /* --- Flash overlay --- */
    .tarot-flash-overlay {
      position: absolute;
      top: 50%; left: 50%;
      width: 80px; height: 80px;
      margin-left: -40px; margin-top: -40px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(212,165,116,0.9) 0%, rgba(212,165,116,0.4) 30%, transparent 70%);
      pointer-events: none;
      opacity: 0;
      z-index: 10;
    }

    /* --- Mist overlay --- */
    .tarot-mist-overlay {
      position: absolute;
      inset: -30px;
      pointer-events: none;
      background:
        radial-gradient(ellipse at 50% 0%, rgba(155,123,184,0.1) 0%, transparent 60%),
        radial-gradient(ellipse at 50% 100%, rgba(155,123,184,0.06) 0%, transparent 60%),
        radial-gradient(ellipse at 0% 50%, rgba(212,165,116,0.04) 0%, transparent 60%),
        radial-gradient(ellipse at 100% 50%, rgba(212,165,116,0.04) 0%, transparent 60%);
      z-index: 0;
    }

    /* --- Instruction text --- */
    .tarot-instruction {
      text-align: center;
      color: rgba(212,165,116,0.9);
      font-family: 'Georgia', 'Palatino Linotype', serif;
      font-size: 0.9rem;
      letter-spacing: 0.06em;
      font-weight: 400;
      margin-top: 20px;
      animation: tarot-instruction-fade 1.2s ease 0.6s both;
      z-index: 1;
      position: relative;
    }

    /* --- Button glow --- */
    .tarot-btn-glow-active {
      animation: tarot-btn-glow 2s ease-in-out infinite !important;
    }

    /* --- Spread container --- */
    #tarot-spread {
      display: flex;
      gap: 24px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px 10px;
      position: relative;
    }

    /* --- Mobile responsive --- */
    @media (max-width: 600px) {
      .tarot-card-back,
      .tarot-card-front,
      .tarot-card-front-bg {
        width: 120px; height: 175px;
      }
      .tarot-card-container {
        width: 120px; height: 175px;
      }
      .tarot-card-center-star {
        width: 60px; height: 60px;
      }
      .tarot-symbol-area {
        width: 55px; height: 55px;
        margin-top: 8px;
      }
      .tarot-position-label {
        font-size: 0.52rem;
        margin-top: 18px;
      }
      .tarot-card-name {
        font-size: 0.68rem;
        margin-top: 6px;
      }
      .tarot-card-front-border-outer { inset: 4px; }
      .tarot-card-front-border-inner { inset: 9px; }
      .tarot-card-front-corner { width: 16px; height: 16px; }
      #tarot-spread { gap: 16px; }
    }
  `;

  function injectStyles() {
    if (_styleInjected) return;
    const el = document.createElement('style');
    el.textContent = STYLES;
    document.head.appendChild(el);
    _styleInjected = true;
  }

  /* ===== Card Symbol SVGs (larger viewBox for 70px display) ===== */
  const CARD_SYMBOLS = {
    'The Fool': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 4L33 19L48 21.5L35.5 32L38.5 47L28 39.5L17.5 47L20.5 32L8 21.5L23 19L28 4Z" fill="#D4A574" opacity="0.9"/>
      <path d="M28 12L31 22L41 23.5L33 30L35 40L28 35.5L21 40L23 30L15 23.5L25 22L28 12Z" fill="#F0D9B5" opacity="0.4"/>
    </svg>`,
    'The Magician': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 28C12 18.611 19.611 11 28 11C36.389 11 44 18.611 44 28C44 37.389 36.389 44 28 44" stroke="#D4A574" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M20 32C20 32 24 36 28 35C34 33.5 30 25 27 25C24 25 28 33 27 33" stroke="#D4A574" stroke-width="2" fill="none" stroke-linecap="round"/>
      <line x1="28" y1="11" x2="28" y2="6" stroke="#D4A574" stroke-width="1.5"/>
      <line x1="11" y1="28" x2="6" y2="28" stroke="#D4A574" stroke-width="1.5"/>
      <circle cx="28" cy="28" r="3" fill="#D4A574" opacity="0.6"/>
    </svg>`,
    'The High Priestess': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="22" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <circle cx="28" cy="28" r="15" fill="#D4A574" opacity="0.12"/>
      <path d="M28 6A22 22 0 0 1 28 50" fill="#D4A574" opacity="0.85"/>
      <circle cx="28" cy="28" r="4" fill="#F0D9B5" opacity="0.5"/>
    </svg>`,
    'The Empress': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 44L16 20L28 14L40 20L40 44Z" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <path d="M21 44V24L28 19L35 24V44" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <circle cx="23" cy="32" r="2.5" fill="#D4A574"/>
      <circle cx="28" cy="27" r="2.5" fill="#D4A574"/>
      <circle cx="33" cy="32" r="2.5" fill="#D4A574"/>
      <path d="M24 38L28 35L32 38" fill="none" stroke="#D4A574" stroke-width="1" opacity="0.5"/>
    </svg>`,
    'The Emperor': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 6L44 22V44L28 38L12 44V22L28 6Z" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <rect x="20" y="24" width="16" height="14" rx="1" fill="none" stroke="#D4A574" stroke-width="1.4"/>
      <line x1="28" y1="14" x2="28" y2="24" stroke="#D4A574" stroke-width="1.8"/>
      <line x1="24" y1="28" x2="32" y2="28" stroke="#D4A574" stroke-width="1.2" opacity="0.5"/>
      <line x1="24" y1="32" x2="32" y2="32" stroke="#D4A574" stroke-width="1.2" opacity="0.5"/>
    </svg>`,
    'The Lovers': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="28" r="14" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <circle cx="36" cy="28" r="14" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <circle cx="20" cy="28" r="5" fill="#D4A574" opacity="0.3"/>
      <circle cx="36" cy="28" r="5" fill="#D4A574" opacity="0.3"/>
      <circle cx="28" cy="28" r="2" fill="#F0D9B5" opacity="0.7"/>
    </svg>`,
    'The Chariot': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 6L48 28L28 50L8 28Z" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <path d="M28 16L38 28L28 40L18 28Z" fill="none" stroke="#D4A574" stroke-width="1.4"/>
      <circle cx="28" cy="28" r="4" fill="#D4A574" opacity="0.8"/>
      <line x1="28" y1="6" x2="28" y2="16" stroke="#D4A574" stroke-width="1.2" opacity="0.4"/>
      <line x1="28" y1="40" x2="28" y2="50" stroke="#D4A574" stroke-width="1.2" opacity="0.4"/>
    </svg>`,
    'Strength': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="22" fill="none" stroke="#D4A574" stroke-width="1.4"/>
      <circle cx="28" cy="16" r="10" fill="none" stroke="#D4A574" stroke-width="1.4"/>
      <path d="M18 36C18 29.373 22.582 24 28 24C33.418 24 38 29.373 38 36" stroke="#D4A574" stroke-width="2" stroke-linecap="round"/>
      <path d="M28 6V16" stroke="#D4A574" stroke-width="1.5"/>
      <circle cx="28" cy="16" r="3" fill="#D4A574" opacity="0.5"/>
    </svg>`,
    'The Hermit': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 48V28L16 20L28 6L40 20L36 28V48" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <rect x="22" y="10" width="12" height="10" rx="2" fill="none" stroke="#D4A574" stroke-width="1.4"/>
      <circle cx="28" cy="15" r="3" fill="#D4A574" opacity="0.9"/>
      <line x1="16" y1="20" x2="22" y2="18" stroke="#D4A574" stroke-width="1.2" opacity="0.5"/>
      <path d="M22 36L28 32L34 36" fill="none" stroke="#D4A574" stroke-width="1" opacity="0.4"/>
    </svg>`,
    'Wheel of Fortune': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="22" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <circle cx="28" cy="28" r="13" fill="none" stroke="#D4A574" stroke-width="1.4"/>
      <line x1="28" y1="6" x2="28" y2="50" stroke="#D4A574" stroke-width="1.2"/>
      <line x1="6" y1="28" x2="50" y2="28" stroke="#D4A574" stroke-width="1.2"/>
      <line x1="12.4" y1="12.4" x2="43.6" y2="43.6" stroke="#D4A574" stroke-width="0.8" opacity="0.4"/>
      <line x1="43.6" y1="12.4" x2="12.4" y2="43.6" stroke="#D4A574" stroke-width="0.8" opacity="0.4"/>
      <circle cx="28" cy="28" r="4" fill="#D4A574" opacity="0.8"/>
    </svg>`,
    'Justice': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="28" y1="6" x2="28" y2="20" stroke="#D4A574" stroke-width="2"/>
      <line x1="14" y1="16" x2="42" y2="16" stroke="#D4A574" stroke-width="2"/>
      <path d="M10 28L28 38L46 28" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <circle cx="10" cy="28" r="4" fill="none" stroke="#D4A574" stroke-width="1.2"/>
      <circle cx="46" cy="28" r="4" fill="none" stroke="#D4A574" stroke-width="1.2"/>
      <line x1="28" y1="38" x2="28" y2="50" stroke="#D4A574" stroke-width="2"/>
      <line x1="10" y1="28" x2="46" y2="28" stroke="#D4A574" stroke-width="1" opacity="0.3"/>
    </svg>`,
    'The Star': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 2L33.5 18L50 21L36.5 32L40 48L28 40L16 48L19.5 32L6 21L22.5 18L28 2Z" fill="#D4A574" opacity="0.85"/>
      <path d="M28 10L31.5 21.5L43 23.5L34 31L36.5 42.5L28 37L19.5 42.5L22 31L13 23.5L24.5 21.5L28 10Z" fill="#F0D9B5" opacity="0.3"/>
    </svg>`,
    'The Moon': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="22" fill="none" stroke="#D4A574" stroke-width="1.4"/>
      <path d="M38 12A22 22 0 0 0 38 44A17 17 0 0 1 38 12Z" fill="#D4A574" opacity="0.85"/>
      <circle cx="35" cy="22" r="2.5" fill="#1a0e38"/>
      <circle cx="40" cy="34" r="1.8" fill="#1a0e38"/>
      <circle cx="28" cy="28" r="2" fill="#F0D9B5" opacity="0.4"/>
    </svg>`,
    'The Sun': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="12" fill="#D4A574" opacity="0.85"/>
      <circle cx="28" cy="28" r="17" fill="none" stroke="#D4A574" stroke-width="1" opacity="0.4"/>
      ${[...Array(12)].map((_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const x1 = 28 + 23 * Math.cos(angle);
        const y1 = 28 + 23 * Math.sin(angle);
        const x2 = 28 + 18 * Math.cos(angle);
        const y2 = 28 + 18 * Math.sin(angle);
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#D4A574" stroke-width="${i % 2 === 0 ? 1.5 : 1}" opacity="${i % 2 === 0 ? 0.7 : 0.4}"/>`;
      }).join('')}
      <circle cx="28" cy="28" r="4" fill="#F0D9B5" opacity="0.5"/>
    </svg>`,
    'Death': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 6C28 6 20 16 20 28C20 40 28 50 28 50C28 50 36 40 36 28C36 16 28 6 28 6Z" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <path d="M16 22C16 22 12 28 28 28C44 28 40 22 40 22" fill="none" stroke="#D4A574" stroke-width="1.4"/>
      <circle cx="24" cy="28" r="2.5" fill="#D4A574"/>
      <circle cx="32" cy="28" r="2.5" fill="#D4A574"/>
      <path d="M22 38C22 38 26 42 28 42C30 42 34 38 34 38" stroke="#D4A574" stroke-width="1.2"/>
    </svg>`,
    'Temperance': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10L25 42L38 10" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <path d="M14 20L28 8L42 20" fill="none" stroke="#D4A574" stroke-width="1.6"/>
      <ellipse cx="28" cy="30" rx="10" ry="5" fill="none" stroke="#D4A574" stroke-width="1.4"/>
      <ellipse cx="28" cy="30" rx="5" ry="2.5" fill="#D4A574" opacity="0.3"/>
      <line x1="28" y1="25" x2="28" y2="42" stroke="#D4A574" stroke-width="1.4"/>
    </svg>`,
    'The Tower': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="18" width="24" height="34" rx="1" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <rect x="16" y="8" width="24" height="12" rx="1" fill="none" stroke="#D4A574" stroke-width="1.4"/>
      <line x1="16" y1="26" x2="40" y2="26" stroke="#D4A574" stroke-width="0.8"/>
      <line x1="16" y1="36" x2="40" y2="36" stroke="#D4A574" stroke-width="0.8"/>
      <path d="M22 2L28 8L34 2" fill="none" stroke="#D4A574" stroke-width="1.5"/>
      <circle cx="28" cy="44" r="4" fill="#D4A574" opacity="0.5"/>
      <line x1="28" y1="14" x2="28" y2="22" stroke="#D4A574" stroke-width="1" opacity="0.4"/>
    </svg>`,
    'The World': `<svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="22" fill="none" stroke="#D4A574" stroke-width="1.8"/>
      <ellipse cx="28" cy="28" rx="10" ry="22" fill="none" stroke="#D4A574" stroke-width="0.8" opacity="0.5"/>
      <line x1="6" y1="28" x2="50" y2="28" stroke="#D4A574" stroke-width="0.8" opacity="0.5"/>
      <circle cx="28" cy="28" r="5" fill="#D4A574" opacity="0.6"/>
      <line x1="28" y1="24" x2="28" y2="32" stroke="#1a0e38" stroke-width="1.5"/>
      <line x1="24" y1="28" x2="32" y2="28" stroke="#1a0e38" stroke-width="1.5"/>
    </svg>`
  };

  function getCardSymbol(cardName) {
    return CARD_SYMBOLS[cardName] || CARD_SYMBOLS['The Fool'];
  }

  /* ===== Mandala SVG for card back ===== */
  function createMandalaSVG() {
    const rays = [...Array(8)].map((_, i) => {
      const angle = (i * 45) * Math.PI / 180;
      const x1 = 45 + 12 * Math.cos(angle);
      const y1 = 45 + 12 * Math.sin(angle);
      const x2 = 45 + 30 * Math.cos(angle);
      const y2 = 45 + 30 * Math.sin(angle);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#D4A574" stroke-width="0.8" opacity="0.5"/>`;
    }).join('');
    return `<svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer star -->
      <path d="M45 5L51 30L76 33L56 48L62 73L45 60L28 73L34 48L14 33L39 30L45 5Z" fill="none" stroke="#D4A574" stroke-width="1" opacity="0.6"/>
      <!-- Inner star -->
      <path d="M45 18L49 33L64 35L52 44L55 59L45 51L35 59L38 44L26 35L41 33L45 18Z" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.35"/>
      <!-- Rays -->
      ${rays}
      <!-- Circles -->
      <circle cx="45" cy="45" r="8" fill="none" stroke="#D4A574" stroke-width="0.8" opacity="0.5"/>
      <circle cx="45" cy="45" r="18" fill="none" stroke="#D4A574" stroke-width="0.5" opacity="0.3"/>
      <circle cx="45" cy="45" r="3" fill="#D4A574" opacity="0.6"/>
      <!-- Small dots at star points -->
      ${[...Array(5)].map((_, i) => {
        const a = (i * 72 - 90) * Math.PI / 180;
        return `<circle cx="${45 + 38 * Math.cos(a)}" cy="${45 + 38 * Math.sin(a)}" r="1.5" fill="#D4A574" opacity="0.4"/>`;
      }).join('')}
    </svg>`;
  }

  /* ===== Corner flourish SVG ===== */
  function createCornerSVG() {
    return `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2C2 8 8 14 14 14" stroke="#D4A574" stroke-width="1" opacity="0.6" stroke-linecap="round"/>
      <path d="M2 2C6 2 10 6 10 10" stroke="#D4A574" stroke-width="0.7" opacity="0.4" stroke-linecap="round"/>
      <circle cx="2" cy="2" r="1.5" fill="#D4A574" opacity="0.5"/>
      <circle cx="14" cy="14" r="1" fill="#D4A574" opacity="0.3"/>
    </svg>`;
  }

  /* ===== Create card back element ===== */
  function createCardBack() {
    const back = document.createElement('div');
    back.className = 'tarot-card-back';

    const starDiv = document.createElement('div');
    starDiv.className = 'tarot-card-center-star';
    starDiv.innerHTML = createMandalaSVG();
    back.appendChild(starDiv);

    return back;
  }

  /* ===== Create card front element ===== */
  function createCardFront(card, position) {
    const front = document.createElement('div');
    front.className = 'tarot-card-front';

    // Background layer
    const bg = document.createElement('div');
    bg.className = 'tarot-card-front-bg';
    front.appendChild(bg);

    // Outer gold border
    const borderOuter = document.createElement('div');
    borderOuter.className = 'tarot-card-front-border-outer';
    front.appendChild(borderOuter);

    // Inner gold border
    const borderInner = document.createElement('div');
    borderInner.className = 'tarot-card-front-border-inner';
    front.appendChild(borderInner);

    // Corner flourishes
    ['tl', 'tr', 'bl', 'br'].forEach(pos => {
      const corner = document.createElement('div');
      corner.className = `tarot-card-front-corner ${pos}`;
      corner.innerHTML = createCornerSVG();
      front.appendChild(corner);
    });

    // Position label
    const posLabel = document.createElement('div');
    posLabel.className = 'tarot-position-label';
    posLabel.textContent = position;
    front.appendChild(posLabel);

    // Symbol
    const symbol = document.createElement('div');
    symbol.className = 'tarot-symbol-area';
    symbol.innerHTML = getCardSymbol(card.name);
    front.appendChild(symbol);

    // Card name
    const nameEl = document.createElement('div');
    nameEl.className = 'tarot-card-name';
    nameEl.textContent = card.name;
    front.appendChild(nameEl);

    // Shimmer overlay
    const shimmer = document.createElement('div');
    shimmer.className = 'tarot-card-front-shimmer';
    front.appendChild(shimmer);

    return front;
  }

  /* ===== Spawn sparkle particles ===== */
  function spawnSparkle(x, y, count) {
    const colors = ['#D4A574', '#9B7BB8', '#E8B4B8', '#F0D9B5', '#fff'];
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'tarot-sparkle';
      const size = 5 + Math.random() * 16;
      const spread = 160;
      const cx = x + (Math.random() - 0.5) * spread;
      const cy = y + (Math.random() - 0.5) * spread;
      sparkle.style.cssText = `
        left: ${cx}px; top: ${cy}px;
        width: ${size}px; height: ${size}px;
        animation: tarot-sparkle ${0.4 + Math.random() * 0.8}s ease-out forwards;
        animation-delay: ${Math.random() * 0.2}s;
      `;
      sparkle.innerHTML = `<svg viewBox="0 0 24 24" fill="${colors[Math.floor(Math.random() * colors.length)]}" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"/>
      </svg>`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1200);
    }
  }

  /* ===== Shuffle Animation — BIG & WILD ===== */
  function doShuffleAnimation(callback) {
    const spread = document.getElementById('tarot-spread');
    if (!spread) { callback(); return; }

    const spreadRect = spread.getBoundingClientRect();
    const cx = spreadRect.left + spreadRect.width / 2;
    const cy = spreadRect.top + spreadRect.height / 2;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const cardCount = 11;
    const shuffleWrappers = [];

    for (let i = 0; i < cardCount; i++) {
      // Cards fly in from random screen edges
      const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
      let sx, sy;
      if (edge === 0) { sx = Math.random() * W; sy = -250; }
      else if (edge === 1) { sx = W + 250; sy = Math.random() * H; }
      else if (edge === 2) { sx = Math.random() * W; sy = H + 250; }
      else { sx = -250; sy = Math.random() * H; }

      // Relative to center of spread
      const relSx = sx - cx;
      const relSy = sy - cy;

      // Wild mid-points
      const mx1 = (Math.random() - 0.5) * 300;
      const my1 = (Math.random() - 0.5) * 250;
      const mr1 = (Math.random() - 0.5) * 60;
      const mrx1 = (Math.random() - 0.5) * 40;
      const mrz1 = (Math.random() - 0.5) * 50;
      const mx2 = (Math.random() - 0.5) * 250;
      const my2 = (Math.random() - 0.5) * 200;
      const mr2 = (Math.random() - 0.5) * 50;
      const mrx2 = (Math.random() - 0.5) * 30;
      const mrz2 = (Math.random() - 0.5) * 40;

      // Exit to another random edge
      const exitEdge = Math.floor(Math.random() * 4);
      let ex, ey;
      if (exitEdge === 0) { ex = (Math.random() - 0.5) * W; ey = -250; }
      else if (exitEdge === 1) { ex = W + 250; ey = (Math.random() - 0.5) * H; }
      else if (exitEdge === 2) { ex = (Math.random() - 0.5) * W; ey = H + 250; }
      else { ex = -250; ey = (Math.random() - 0.5) * H; }

      const relEx = ex - cx;
      const relEy = ey - cy;

      const startRot = (Math.random() - 0.5) * 120;
      const startRotX = (Math.random() - 0.5) * 60;
      const startRotZ = (Math.random() - 0.5) * 80;
      const exitRot = (Math.random() - 0.5) * 150;
      const exitRotX = (Math.random() - 0.5) * 80;
      const exitRotZ = (Math.random() - 0.5) * 100;

      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        position: fixed;
        left: ${cx - 75}px;
        top: ${cy - 110}px;
        width: 150px; height: 220px;
        pointer-events: none;
        z-index: 500;
        --sx: ${relSx}px; --sy: ${relSy}px;
        --sr: ${startRot}deg; --srx: ${startRotX}deg; --srz: ${startRotZ}deg;
        --mx1: ${mx1}px; --my1: ${my1}px; --mr1: ${mr1}deg; --mrx1: ${mrx1}deg; --mrz1: ${mrz1}deg;
        --mx2: ${mx2}px; --my2: ${my2}px; --mr2: ${mr2}deg; --mrx2: ${mrx2}deg; --mrz2: ${mrz2}deg;
        --ex: ${relEx}px; --ey: ${relEy}px;
        --er: ${exitRot}deg; --erx: ${exitRotX}deg; --erz: ${exitRotZ}deg;
        animation: tarot-shuffle-card 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        animation-delay: ${i * 0.06}s;
        transform: perspective(800px);
        transform-style: preserve-3d;
      `;
      wrapper.appendChild(createCardBack());
      document.body.appendChild(wrapper);
      shuffleWrappers.push(wrapper);

      // Sparkles during mid-flight
      setTimeout(() => {
        const rect = wrapper.getBoundingClientRect();
        spawnSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2, 5);
      }, 500 + i * 70);
    }

    // Extra sparkle bursts during shuffle
    setTimeout(() => spawnSparkle(cx, cy, 12), 600);
    setTimeout(() => spawnSparkle(cx - 80, cy + 30, 8), 900);
    setTimeout(() => spawnSparkle(cx + 80, cy - 20, 8), 1200);
    setTimeout(() => spawnSparkle(cx, cy, 10), 1600);

    // Clean up after animation
    setTimeout(() => {
      shuffleWrappers.forEach(w => w.remove());
      // Final mega sparkle burst
      spawnSparkle(cx, cy, 25);
      setTimeout(() => {
        spawnSparkle(cx, cy, 15);
        callback();
      }, 200);
    }, 2400);
  }

  /* ===== Reveal a single card ===== */
  function revealCard(containerEl, card, position, index) {
    if (containerEl.dataset.revealed === '1') return;
    containerEl.dataset.revealed = '1';

    const inner = containerEl.querySelector('.tarot-card-inner');

    // Start flip
    inner.classList.add('flipping');

    // Sparkles at midpoint
    setTimeout(() => {
      const rect = containerEl.getBoundingClientRect();
      spawnSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
    }, 300);

    // Flash effect
    setTimeout(() => {
      const front = containerEl.querySelector('.tarot-card-front');
      if (front) {
        const flash = document.createElement('div');
        flash.className = 'tarot-flash-overlay';
        front.appendChild(flash);
        requestAnimationFrame(() => {
          flash.style.animation = 'tarot-flash 0.6s ease-out forwards';
        });
        setTimeout(() => flash.remove(), 600);
      }
    }, 300);

    // After flip completes
    setTimeout(() => {
      inner.style.transform = 'rotateY(180deg)';
      inner.classList.remove('flipping');

      const front = containerEl.querySelector('.tarot-card-front');
      if (front) front.classList.add('revealed-anim');

      containerEl.style.pointerEvents = 'none';

      revealedCount++;
      if (revealedCount === 3) {
        const btn = document.getElementById('tarot-proceed');
        if (btn) {
          btn.disabled = false;
          btn.classList.add('tarot-btn-glow-active');
        }
      }
    }, 720);
  }

  /* ===== Rich Fallback Reading Generator ===== */
  function generateRichReading(cards) {
    const positions = ['Past', 'Present', 'Future'];
    const paragraphs = [];

    // Per-card readings
    const cardReadings = cards.map((card, i) => {
      const pos = positions[i];
      const upright = card.upright;
      const keywords = upright.split(',').map(s => s.trim());

      let reading = '';
      if (pos === 'Past') {
        reading = `In your past, <strong>${card.name}</strong> reveals a chapter shaped by ${keywords[0].toLowerCase()} and ${keywords.length > 1 ? keywords[1].toLowerCase() : 'inner growth'}. This energy has been a quiet architect of who you are today — ${keywords[0].toLowerCase()} taught you lessons that still echo through your choices. The echoes of this card suggest you carry its ${keywords.length > 2 ? keywords[2].toLowerCase() : 'wisdom'} as both a gift and a responsibility.`;
      } else if (pos === 'Present') {
        reading = `Right now, <strong>${card.name}</strong> stands as your current mirror, reflecting ${keywords[0].toLowerCase()} and ${keywords.length > 1 ? keywords[1].toLowerCase() : 'transformation'} at work in your life. This is the energy surrounding you at this very moment — it speaks of ${keywords.length > 2 ? keywords[2].toLowerCase() : 'a turning point'} and invites you to recognize the power you already hold. What you do with this ${keywords[0].toLowerCase()} energy will shape everything that follows.`;
      } else {
        reading = `Looking ahead, <strong>${card.name}</strong> illuminates a path of ${keywords[0].toLowerCase()} and ${keywords.length > 1 ? keywords[1].toLowerCase() : 'possibility'}. This card does not lock in a fate — rather, it shows the direction your current energy is moving toward. If you embrace the ${keywords.length > 2 ? keywords[2].toLowerCase() : 'potential'} this card offers, you'll find the road ahead opens in ways you may not yet imagine.`;
      }
      return reading;
    });

    // Synthesis paragraph
    const synthesisKeywords = cards.map(c => c.upright.split(',')[0].trim().toLowerCase());
    const synthesis = `Together, these three cards weave a story of <strong>${synthesisKeywords[0]}</strong> flowing into <strong>${synthesisKeywords[1]}</strong>, and moving toward <strong>${synthesisKeywords[2]}</strong>. The thread connecting them suggests a journey of transformation — your past has prepared you, your present empowers you, and your future awaits with open arms. This is not a random hand; it is a conversation between who you were, who you are, and who you are becoming.`;

    // Practical advice
    const adviceOptions = [
      `The cards encourage you to honor where you've been while staying open to where you're going. Take one concrete step today that aligns with <strong>${synthesisKeywords[1]}</strong> — even a small act of intention can shift the entire pattern. Trust the process, but also trust yourself to navigate it wisely.`,
      `Your reading suggests a moment of powerful alignment. The best move right now is to act from a place of <strong>${synthesisKeywords[1]}</strong> rather than fear. Write down one thing you can release from the past, one thing you can appreciate in the present, and one thing you can welcome in the future. This simple ritual honors all three cards.`,
      `The energy around you is shifting. To make the most of this reading, lean into <strong>${synthesisKeywords[1]}</strong> as your guiding principle this week. Say yes to opportunities that feel aligned, and no to what drains the connection between your past wisdom and future potential. You are the weaver of this story.`
    ];
    const advice = adviceOptions[Math.floor(Math.random() * adviceOptions.length)];

    return {
      cardReadings,
      synthesis,
      advice
    };
  }

  /* ===== INIT ===== */
  function init() {
    injectStyles();
    drawnCards = [];
    revealedCount = 0;

    const proceedBtn = document.getElementById('tarot-proceed');
    if (proceedBtn) {
      proceedBtn.disabled = true;
      proceedBtn.classList.remove('tarot-btn-glow-active');
    }

    // Apply dark theme to flow-tarot page
    const flowPage = document.getElementById('flow-tarot');
    if (flowPage) {
      flowPage.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        min-height: 100dvh;
        background: linear-gradient(170deg, #0a0618 0%, #110b2a 25%, #1a0e38 50%, #0f0822 75%, #060312 100%);
        position: relative;
        overflow-x: hidden;
        padding: 20px 16px;
        box-sizing: border-box;
        color: #F0D9B5;
      `;
    }

    const spread = document.getElementById('tarot-spread');
    if (!spread) return;

    // Clear and set up spread container
    spread.innerHTML = '';
    spread.style.cssText = `
      display: flex;
      gap: 24px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px 10px;
      position: relative;
    `;

    // Add mist overlay
    const mist = document.createElement('div');
    mist.className = 'tarot-mist-overlay';
    spread.appendChild(mist);

    // Shuffle and pick 3 cards
    const shuffled = [...D.tarotDeck].sort(() => Math.random() - 0.5);
    drawnCards = shuffled.slice(0, 3);
    const positions = ['Past', 'Present', 'Future'];

    // Run shuffle animation before showing cards
    doShuffleAnimation(() => {
      // Create card containers with snap-in animation
      drawnCards.forEach((card, i) => {
        const container = document.createElement('div');
        container.className = 'tarot-card-container';
        container.dataset.revealed = '0';
        container.style.cssText = `
          animation: tarot-snap-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          animation-delay: ${i * 0.18}s;
          position: relative;
          z-index: 1;
        `;

        const inner = document.createElement('div');
        inner.className = 'tarot-card-inner';
        inner.style.transformStyle = 'preserve-3d';
        inner.style.position = 'relative';
        inner.style.width = '100%';
        inner.style.height = '100%';

        const backEl = createCardBack();
        backEl.style.position = 'absolute';
        backEl.style.inset = '0';
        backEl.style.backfaceVisibility = 'hidden';

        const frontEl = createCardFront(card, positions[i]);
        frontEl.style.position = 'absolute';
        frontEl.style.inset = '0';

        inner.appendChild(backEl);
        inner.appendChild(frontEl);
        container.appendChild(inner);

        // Click to reveal
        container.addEventListener('click', () => {
          revealCard(container, card, positions[i], i);
        });

        spread.appendChild(container);

        // Add sparkle on card appearance
        setTimeout(() => {
          const rect = container.getBoundingClientRect();
          spawnSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
        }, 300 + i * 180);

        // Add subtle float after entrance
        setTimeout(() => {
          container.style.animation = '';
          container.style.animation = `tarot-card-float 3.5s ease-in-out infinite`;
          container.style.animationDelay = `${i * 0.6}s`;
        }, 700 + i * 180);
      });

      // Add instruction text
      const instruction = document.createElement('div');
      instruction.className = 'tarot-instruction';
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
      result = null;
    }
    App.hideLoading();

    const positions = ['Past', 'Present', 'Future'];

    // Generate rich reading
    const rich = generateRichReading(drawnCards);

    // If API returned meaningful reading text, use it; otherwise use rich fallback
    const hasGoodReading = result && result.reading && result.reading.length > 80;
    const readingText = hasGoodReading ? result.reading : rich.cardReadings.join('\n\n');
    const adviceText = (result && result.advice && result.advice.length > 20) ? result.advice : rich.advice;

    const header = `<span class="result-zodiac">✧</span>
      <div class="result-title">Your Tarot Reading</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px;">
        ${drawnCards.map((c, i) => `<span style="font-size:0.78rem;color:rgba(212,165,116,0.9);font-family:Georgia,serif;">${c.emoji} ${c.name} <span style="opacity:0.6;font-size:0.7rem;">(${positions[i]})</span></span>`).join('<span style="color:rgba(212,165,116,0.3);">✦</span>')}
      </div>`;

    const tags = drawnCards.map(c => `<span class="tag">${c.emoji} ${c.name}</span>`).join('');

    const content = `
      <div class="fortune-section">
        ${drawnCards.map((card, i) => `
          <div class="fortune-label">${card.emoji} ${card.name} <span style="opacity:0.6;font-size:0.72rem;font-family:Georgia,serif;">— ${positions[i]}</span></div>
          <div class="fortune-text" style="margin-bottom:6px;color:rgba(240,217,181,0.5);font-size:0.72rem;font-style:italic;">${card.upright}</div>
          <div class="fortune-text" style="margin-bottom:18px;">${rich.cardReadings[i]}</div>
        `).join('<div style="border-bottom:1px solid rgba(212,165,116,0.12);margin:4px 0 16px;"></div>')}
      </div>
      <div style="border-top:2px solid rgba(212,165,116,0.25);border-bottom:1px solid rgba(212,165,116,0.12);padding:16px 0;margin:8px 0;text-align:center;">
        <div style="font-size:0.7rem;color:#D4A574;letter-spacing:0.2em;text-transform:uppercase;font-family:Georgia,serif;margin-bottom:10px;">✦ Synthesis ✦</div>
        <div class="fortune-text">${rich.synthesis}</div>
      </div>
      ${hasGoodReading ? `
      <div class="fortune-section">
        <div class="fortune-label">✦ Deeper Insight</div>
        <div class="fortune-text" style="white-space:pre-line;">${result.reading}</div>
      </div>` : ''}
      <div class="fortune-section" style="margin-top:8px;">
        <div class="fortune-label">✦ Guidance</div>
        <div class="fortune-text">${adviceText}</div>
      </div>`;

    App.showResult(header, tags, content);
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'tarot') Tools.tarot.init();
});