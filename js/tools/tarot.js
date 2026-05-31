/* ===== TAROT TOOL — v5 Fan Shuffle + SVG Art ===== */
Tools.tarot = (function() {
  const D = window.__DATA__;
  let drawnCards = [];
  let revealedCount = 0;

  /* ===== SVG Art for each Major Arcana card ===== */
  const CARD_ART = {
    'The Fool': {
      color: '#7B5EA7',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="28" r="14" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <circle cx="40" cy="28" r="7" fill="#F0D9B5" opacity="0.4"/>
        <line x1="40" y1="42" x2="40" y2="70" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="40" y1="52" x2="28" y2="64" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="40" y1="52" x2="52" y2="64" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="40" y1="70" x2="32" y2="82" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="40" y1="70" x2="48" y2="82" stroke="#F0D9B5" stroke-width="1.5"/>
        <circle cx="62" cy="22" r="4" fill="#D4A574" opacity="0.7"/>
        <path d="M58 22 Q62 18 66 22" fill="none" stroke="#D4A574" stroke-width="1"/>
      </svg>`
    },
    'The Magician': {
      color: '#8B3E2A',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 10 L40 30" stroke="#F0D9B5" stroke-width="2" stroke-linecap="round"/>
        <path d="M25 25 L55 25" stroke="#F0D9B5" stroke-width="1.5"/>
        <circle cx="40" cy="10" r="5" fill="#D4A574" opacity="0.8"/>
        <rect x="28" y="60" width="24" height="16" rx="3" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <circle cx="34" cy="74" r="3" fill="#D4A574" opacity="0.6"/>
        <circle cx="40" cy="74" r="3" fill="#9B7BB8" opacity="0.6"/>
        <circle cx="46" cy="74" r="3" fill="#7FA87F" opacity="0.6"/>
        <path d="M35 35 Q40 42 45 35" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <text x="40" y="55" text-anchor="middle" font-size="18" fill="#F0D9B5" opacity="0.5">∞</text>
      </svg>`
    },
    'The High Priestess': {
      color: '#1B3A6B',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 15 L40 85" stroke="#9B7BB8" stroke-width="1" stroke-dasharray="4,3"/>
        <circle cx="40" cy="28" r="12" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M28 28 A12 12 0 0 1 52 28" fill="#F0D9B5" opacity="0.15"/>
        <path d="M20 50 L40 32 L60 50" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <rect x="30" y="65" width="20" height="22" rx="2" fill="none" stroke="#F0D9B5" stroke-width="1"/>
        <text x="40" y="80" text-anchor="middle" font-size="8" fill="#F0D9B5" opacity="0.6" font-style="italic">TORA</text>
        <circle cx="24" cy="20" r="4" fill="none" stroke="#F0D9B5" stroke-width="1"/>
        <circle cx="56" cy="20" r="4" fill="none" stroke="#9B7BB8" stroke-width="1"/>
      </svg>`
    },
    'The Empress': {
      color: '#3D6B2A',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 45 Q40 20 55 45 Q60 62 40 75 Q20 62 25 45Z" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="40" cy="30" r="10" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M32 30 L48 30 M40 22 L40 38" stroke="#D4A574" stroke-width="1"/>
        <path d="M28 82 Q40 78 52 82" fill="none" stroke="#7FA87F" stroke-width="2"/>
        <circle cx="22" cy="55" r="5" fill="#7FA87F" opacity="0.5"/>
        <circle cx="58" cy="55" r="5" fill="#7FA87F" opacity="0.5"/>
        <path d="M30 65 Q40 60 50 65" fill="none" stroke="#F0D9B5" stroke-width="1"/>
      </svg>`
    },
    'The Emperor': {
      color: '#6B1B1B',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="50" width="36" height="38" rx="2" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M22 58 L58 58" stroke="#D4A574" stroke-width="1"/>
        <path d="M28 20 L40 10 L52 20 L52 50 L28 50Z" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <rect x="36" y="10" width="8" height="6" rx="1" fill="#D4A574" opacity="0.7"/>
        <path d="M34 35 L46 35 M40 28 L40 42" stroke="#D4A574" stroke-width="2" stroke-linecap="round"/>
        <circle cx="34" cy="72" r="5" fill="none" stroke="#F0D9B5" stroke-width="1"/>
        <circle cx="46" cy="72" r="5" fill="none" stroke="#F0D9B5" stroke-width="1"/>
      </svg>`
    },
    'The Lovers': {
      color: '#6B2A4E',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 22 C40 22 28 14 26 26 C24 38 40 46 40 46 C40 46 56 38 54 26 C52 14 40 22 40 22Z" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="28" cy="62" r="12" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <circle cx="52" cy="62" r="12" fill="none" stroke="#9B7BB8" stroke-width="1.5"/>
        <path d="M28 50 L40 46 L52 50" stroke="#D4A574" stroke-width="1"/>
        <circle cx="40" cy="10" r="5" fill="#D4A574" opacity="0.7"/>
        <path d="M35 10 Q40 6 45 10" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
      </svg>`
    },
    'The Chariot': {
      color: '#1B4A6B',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="40" width="50" height="32" rx="4" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M15 40 L25 25 L55 25 L65 40" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="26" cy="78" r="8" fill="none" stroke="#9B7BB8" stroke-width="1.5"/>
        <circle cx="54" cy="78" r="8" fill="none" stroke="#9B7BB8" stroke-width="1.5"/>
        <circle cx="40" cy="52" r="8" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M36 52 L44 52 M40 48 L40 56" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M22 25 L22 15 M58 25 L58 15" stroke="#F0D9B5" stroke-width="1" stroke-dasharray="3,2"/>
      </svg>`
    },
    'Strength': {
      color: '#6B4E1B',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 55 Q20 30 40 28 Q60 30 60 55 Q60 75 40 82 Q20 75 20 55Z" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M28 45 Q40 38 52 45" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M30 60 Q40 55 50 60" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <text x="40" y="52" text-anchor="middle" font-size="14" fill="#D4A574" opacity="0.7">∞</text>
        <circle cx="40" cy="15" r="6" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M34 15 Q40 10 46 15" fill="none" stroke="#D4A574" stroke-width="1.5"/>
      </svg>`
    },
    'The Hermit': {
      color: '#3A3A5E',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 10 L40 85" stroke="#F0D9B5" stroke-width="2" stroke-linecap="round"/>
        <path d="M40 10 L28 22 M40 10 L52 18" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M30 40 Q20 52 25 65 Q30 78 40 82 Q50 78 55 65 Q60 52 50 40 Z" fill="none" stroke="#9B7BB8" stroke-width="1.5"/>
        <circle cx="58" cy="30" r="8" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M54 30 L62 30 M58 26 L58 34" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="58" cy="30" r="3" fill="#D4A574" opacity="0.5"/>
      </svg>`
    },
    'Wheel of Fortune': {
      color: '#4A6B1B',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="45" r="28" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="40" cy="45" r="18" fill="none" stroke="#F0D9B5" stroke-width="1"/>
        <circle cx="40" cy="45" r="6" fill="#D4A574" opacity="0.5"/>
        <line x1="40" y1="17" x2="40" y2="73" stroke="#F0D9B5" stroke-width="1" opacity="0.5"/>
        <line x1="12" y1="45" x2="68" y2="45" stroke="#F0D9B5" stroke-width="1" opacity="0.5"/>
        <line x1="20" y1="25" x2="60" y2="65" stroke="#F0D9B5" stroke-width="1" opacity="0.5"/>
        <line x1="60" y1="25" x2="20" y2="65" stroke="#F0D9B5" stroke-width="1" opacity="0.5"/>
        <text x="40" y="8" text-anchor="middle" font-size="7" fill="#D4A574" opacity="0.8">WHEEL</text>
        <text x="40" y="97" text-anchor="middle" font-size="7" fill="#D4A574" opacity="0.8">FORTUNE</text>
      </svg>`
    },
    'Justice': {
      color: '#2A4A6B',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="12" x2="40" y2="88" stroke="#F0D9B5" stroke-width="2"/>
        <line x1="18" y1="32" x2="62" y2="32" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="18" cy="32" r="4" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <circle cx="62" cy="32" r="4" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M14 32 Q18 44 22 32" fill="#F0D9B5" opacity="0.2" stroke="#F0D9B5" stroke-width="1"/>
        <path d="M58 32 Q62 44 66 32" fill="#F0D9B5" opacity="0.2" stroke="#F0D9B5" stroke-width="1"/>
        <path d="M34 12 L40 8 L46 12" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M30 88 L50 88" stroke="#F0D9B5" stroke-width="2"/>
        <text x="40" y="65" text-anchor="middle" font-size="22" fill="#D4A574" opacity="0.5">⚖</text>
      </svg>`
    },
    'The Hanged Man': {
      color: '#1B3A3A',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="20" y1="15" x2="60" y2="15" stroke="#F0D9B5" stroke-width="2"/>
        <line x1="40" y1="15" x2="40" y2="35" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="40" cy="42" r="10" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="40" y1="52" x2="40" y2="72" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="40" y1="60" x2="28" y2="52" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="40" y1="72" x2="30" y2="82" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="40" y1="72" x2="50" y2="82" stroke="#F0D9B5" stroke-width="1.5"/>
        <circle cx="40" cy="42" r="4" fill="#D4A574" opacity="0.4"/>
        <line x1="20" y1="15" x2="20" y2="8" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="60" y1="15" x2="60" y2="8" stroke="#F0D9B5" stroke-width="1.5"/>
      </svg>`
    },
    'Death': {
      color: '#1A1A2E',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 8 Q58 8 58 28 Q58 48 40 52 Q22 48 22 28 Q22 8 40 8Z" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <rect x="28" y="15" width="8" height="8" rx="1" fill="#F0D9B5" opacity="0.3"/>
        <rect x="44" y="15" width="8" height="8" rx="1" fill="#F0D9B5" opacity="0.3"/>
        <path d="M32 32 Q40 36 48 32" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="40" y1="52" x2="40" y2="72" stroke="#9B7BB8" stroke-width="2"/>
        <path d="M20 72 Q40 65 60 72" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M15 85 Q40 78 65 85" fill="none" stroke="#9B7BB8" stroke-width="1"/>
        <circle cx="40" cy="60" r="5" fill="none" stroke="#D4A574" stroke-width="1"/>
      </svg>`
    },
    'Temperance': {
      color: '#1B4A3A',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 75 L25 45 Q25 35 35 32 L35 32 Q28 38 30 48 L50 30 Q62 26 62 38 L62 38 Q60 30 52 34 L52 64 Q52 78 40 82 Q28 78 25 75Z" fill="none" stroke="#7FA87F" stroke-width="1"/>
        <ellipse cx="28" cy="58" rx="8" ry="14" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <ellipse cx="52" cy="42" rx="8" ry="14" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M28 45 L52 52" stroke="#D4A574" stroke-width="1.5" stroke-dasharray="3,2"/>
        <circle cx="40" cy="15" r="7" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M36 12 L40 8 L44 12" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <text x="40" y="17" text-anchor="middle" font-size="7" fill="#D4A574">☀</text>
      </svg>`
    },
    'The Devil': {
      color: '#2E0A0A',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 28 L40 10 L58 28" fill="none" stroke="#9B7BB8" stroke-width="2"/>
        <path d="M16 20 L22 28 M64 20 L58 28" stroke="#9B7BB8" stroke-width="1.5"/>
        <circle cx="40" cy="40" r="14" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M35 37 Q40 34 45 37" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M34 44 Q40 49 46 44" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="35" cy="39" r="2" fill="#D4A574" opacity="0.7"/>
        <circle cx="45" cy="39" r="2" fill="#D4A574" opacity="0.7"/>
        <path d="M28 60 L28 78 M52 60 L52 78" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M24 60 L36 60 M44 60 L56 60" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M40 54 L40 60" stroke="#D4A574" stroke-width="2"/>
        <text x="40" y="90" text-anchor="middle" font-size="10" fill="#9B7BB8" opacity="0.7">XV</text>
      </svg>`
    },
    'The Tower': {
      color: '#4A1B1B',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="28" y="35" width="24" height="50" rx="2" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M26 35 L40 18 L54 35" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <rect x="36" y="18" width="8" height="5" rx="1" fill="#D4A574" opacity="0.7"/>
        <rect x="34" y="50" width="6" height="8" rx="1" fill="none" stroke="#F0D9B5" stroke-width="1"/>
        <rect x="40" y="50" width="6" height="8" rx="1" fill="none" stroke="#F0D9B5" stroke-width="1"/>
        <path d="M15 22 Q25 18 20 12" stroke="#D4A574" stroke-width="2" stroke-linecap="round"/>
        <path d="M65 18 Q58 14 62 8" stroke="#D4A574" stroke-width="2" stroke-linecap="round"/>
        <circle cx="16" cy="22" r="2" fill="#D4A574" opacity="0.8"/>
        <circle cx="64" cy="18" r="2" fill="#D4A574" opacity="0.8"/>
        <path d="M20 35 L15 50 M60 35 L65 48" stroke="#F0D9B5" stroke-width="1" opacity="0.5"/>
      </svg>`
    },
    'The Star': {
      color: '#0A1A4A',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <polygon points="40,8 44,22 58,22 47,31 51,45 40,36 29,45 33,31 22,22 36,22" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="40" cy="26" r="5" fill="#D4A574" opacity="0.5"/>
        <ellipse cx="28" cy="72" rx="10" ry="16" fill="none" stroke="#F0D9B5" stroke-width="1.5" transform="rotate(-20,28,72)"/>
        <ellipse cx="52" cy="72" rx="10" ry="16" fill="none" stroke="#9B7BB8" stroke-width="1.5" transform="rotate(20,52,72)"/>
        <path d="M28 56 L52 56" stroke="#D4A574" stroke-width="1" stroke-dasharray="3,2"/>
        <circle cx="14" cy="20" r="3" fill="#F0D9B5" opacity="0.5"/>
        <circle cx="66" cy="16" r="2" fill="#F0D9B5" opacity="0.4"/>
        <circle cx="60" cy="52" r="2" fill="#F0D9B5" opacity="0.4"/>
      </svg>`
    },
    'The Moon': {
      color: '#0A1A3A',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 14 Q38 14 32 24 Q26 34 30 46 Q34 58 46 62 Q30 60 20 48 Q10 36 16 22 Q22 8 38 8 Q46 8 50 14Z" fill="#9B7BB8" opacity="0.3" stroke="#F0D9B5" stroke-width="1.5"/>
        <circle cx="22" cy="75" r="6" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="58" cy="75" r="6" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M22 69 L22 55 M58 69 L58 55" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M16 88 Q22 84 28 88 Q34 92 40 88 Q46 84 52 88 Q58 92 64 88" fill="none" stroke="#9B7BB8" stroke-width="1.5"/>
        <circle cx="62" cy="20" r="4" fill="#F0D9B5" opacity="0.4"/>
        <circle cx="68" cy="30" r="2" fill="#F0D9B5" opacity="0.3"/>
      </svg>`
    },
    'The Sun': {
      color: '#4A3200',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="38" r="18" fill="none" stroke="#D4A574" stroke-width="2"/>
        <circle cx="40" cy="38" r="10" fill="#D4A574" opacity="0.3"/>
        <line x1="40" y1="12" x2="40" y2="8" stroke="#D4A574" stroke-width="2" stroke-linecap="round"/>
        <line x1="40" y1="64" x2="40" y2="68" stroke="#D4A574" stroke-width="2" stroke-linecap="round"/>
        <line x1="14" y1="38" x2="10" y2="38" stroke="#D4A574" stroke-width="2" stroke-linecap="round"/>
        <line x1="66" y1="38" x2="70" y2="38" stroke="#D4A574" stroke-width="2" stroke-linecap="round"/>
        <line x1="22" y1="20" x2="18" y2="16" stroke="#D4A574" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="58" y1="20" x2="62" y2="16" stroke="#D4A574" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="22" y1="56" x2="18" y2="60" stroke="#D4A574" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="58" y1="56" x2="62" y2="60" stroke="#D4A574" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="30" cy="75" r="9" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <circle cx="50" cy="75" r="9" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M30 70 L30 80 M25 75 L35 75" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M50 70 L50 80 M45 75 L55 75" stroke="#D4A574" stroke-width="1.5"/>
      </svg>`
    },
    'Judgement': {
      color: '#1B2A4A',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 10 Q40 5 52 10 L55 32 Q40 28 25 32Z" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <line x1="40" y1="10" x2="40" y2="32" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="40" cy="8" r="4" fill="#D4A574" opacity="0.7"/>
        <path d="M28 32 L28 52 M52 32 L52 52" stroke="#F0D9B5" stroke-width="1.5"/>
        <path d="M22 52 L58 52" stroke="#D4A574" stroke-width="1.5"/>
        <path d="M24 60 Q28 58 32 60 Q36 62 40 60 Q44 58 48 60 Q52 62 56 60" fill="none" stroke="#F0D9B5" stroke-width="1.5"/>
        <circle cx="30" cy="72" r="8" fill="none" stroke="#9B7BB8" stroke-width="1.5"/>
        <circle cx="50" cy="72" r="8" fill="none" stroke="#9B7BB8" stroke-width="1.5"/>
        <path d="M30 64 L28 55 M50 64 L52 55" stroke="#F0D9B5" stroke-width="1"/>
      </svg>`
    },
    'The World': {
      color: '#1A3A1A',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="50" rx="22" ry="32" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <ellipse cx="40" cy="50" rx="10" ry="32" fill="none" stroke="#F0D9B5" stroke-width="1" opacity="0.5"/>
        <line x1="18" y1="50" x2="62" y2="50" stroke="#F0D9B5" stroke-width="1" opacity="0.5"/>
        <circle cx="40" cy="50" r="8" fill="none" stroke="#7FA87F" stroke-width="1.5"/>
        <path d="M30 18 Q40 14 50 18" fill="none" stroke="#D4A574" stroke-width="2"/>
        <path d="M30 82 Q40 86 50 82" fill="none" stroke="#D4A574" stroke-width="2"/>
        <circle cx="18" cy="22" r="5" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="62" cy="22" r="5" fill="none" stroke="#9B7BB8" stroke-width="1.5"/>
        <circle cx="18" cy="78" r="5" fill="none" stroke="#9B7BB8" stroke-width="1.5"/>
        <circle cx="62" cy="78" r="5" fill="none" stroke="#D4A574" stroke-width="1.5"/>
      </svg>`
    }
  };

  /* ===== Fallback for unknown cards ===== */
  function getCardArt(name) {
    return CARD_ART[name] || {
      color: '#2D1B4E',
      svg: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="45" r="22" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <text x="40" y="52" text-anchor="middle" font-size="28" fill="#F0D9B5" opacity="0.6">✦</text>
      </svg>`
    };
  }

  /* ===== Create a card element ===== */
  function createCardEl(card, position, index) {
    const art = getCardArt(card.name);
    const wrap = document.createElement('div');
    wrap.dataset.revealed = '0';
    wrap.dataset.index = index;
    wrap.style.cssText = `
      width: 140px; height: 210px;
      position: relative; cursor: pointer;
      opacity: 0; transform: translateY(50px) scale(0.85);
      transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.4,0.64,1);
      flex-shrink: 0;
    `;

    // Card Back — ornate pattern
    const back = document.createElement('div');
    back.style.cssText = `
      position: absolute; inset: 0;
      background: linear-gradient(160deg, #2D1B4E 0%, #1a0e3d 40%, #231345 70%, #180c36 100%);
      border: 2px solid rgba(212,165,116,0.5); border-radius: 14px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 0 40px rgba(155,123,184,0.1);
      overflow: hidden; transition: all 0.45s ease;
    `;
    back.innerHTML = `
      <div style="position:absolute;inset:8px;border:1px solid rgba(212,165,116,0.25);border-radius:10px;pointer-events:none;"></div>
      <div style="position:absolute;inset:14px;border:1px dashed rgba(212,165,116,0.12);border-radius:7px;pointer-events:none;"></div>
      <svg viewBox="0 0 60 80" width="60" height="80" xmlns="http://www.w3.org/2000/svg" style="opacity:0.45;">
        <circle cx="30" cy="40" r="20" fill="none" stroke="#D4A574" stroke-width="1"/>
        <circle cx="30" cy="40" r="12" fill="none" stroke="#9B7BB8" stroke-width="0.8"/>
        <polygon points="30,22 34,34 47,34 37,42 41,54 30,46 19,54 23,42 13,34 26,34" fill="none" stroke="#D4A574" stroke-width="0.8"/>
        <circle cx="30" cy="40" r="3" fill="#D4A574" opacity="0.6"/>
        <line x1="30" y1="20" x2="30" y2="8" stroke="#F0D9B5" stroke-width="0.8"/>
        <line x1="30" y1="60" x2="30" y2="72" stroke="#F0D9B5" stroke-width="0.8"/>
        <line x1="10" y1="40" x2="2" y2="40" stroke="#F0D9B5" stroke-width="0.8"/>
        <line x1="50" y1="40" x2="58" y2="40" stroke="#F0D9B5" stroke-width="0.8"/>
      </svg>
    `;
    wrap.appendChild(back);

    // Card Front
    const front = document.createElement('div');
    front.style.cssText = `
      position: absolute; inset: 0;
      background: linear-gradient(170deg, ${art.color}ee 0%, ${art.color}cc 50%, #120a28 100%);
      border: 2px solid rgba(212,165,116,0.55); border-radius: 14px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: flex-start;
      padding: 10px 8px 8px;
      opacity: 0; pointer-events: none;
      transition: opacity 0.5s ease;
      box-shadow: inset 0 0 30px rgba(0,0,0,0.3);
      overflow: hidden;
    `;
    front.innerHTML = `
      <div style="position:absolute;inset:6px;border:1px solid rgba(212,165,116,0.2);border-radius:10px;pointer-events:none;"></div>
      <div style="font-size:0.55rem;color:#D4A574;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:6px;z-index:1;">${position}</div>
      <div style="width:72px;height:88px;flex-shrink:0;z-index:1;">${art.svg}</div>
      <div style="font-size:0.72rem;color:#F0D9B5;font-weight:600;text-align:center;line-height:1.3;margin-top:6px;z-index:1;font-family:Georgia,serif;">${card.name}</div>
      <div style="font-size:0.5rem;color:rgba(212,165,116,0.6);text-align:center;margin-top:3px;line-height:1.2;z-index:1;">${(card.upright||'').split(',').slice(0,2).join(' · ')}</div>
    `;
    wrap.appendChild(front);

    // Click to reveal
    wrap.addEventListener('click', function() {
      if (wrap.dataset.revealed === '1') return;
      revealCard(wrap, back, front);
    });

    return wrap;
  }

  /* ===== Reveal animation ===== */
  function revealCard(wrap, back, front) {
    wrap.dataset.revealed = '1';
    revealedCount++;

    // Flash effect then swap
    back.style.transition = 'all 0.35s ease';
    back.style.transform = 'scaleX(0)';
    back.style.opacity = '0';

    setTimeout(() => {
      back.style.display = 'none';
      front.style.pointerEvents = 'auto';
      front.style.opacity = '1';
      wrap.style.boxShadow = '0 0 30px rgba(212,165,116,0.35), 0 0 60px rgba(155,123,184,0.18)';

      if (revealedCount === 3) {
        const btn = document.getElementById('tarot-proceed');
        if (btn) {
          btn.disabled = false;
          btn.style.animation = 'tarotGlow 2s ease-in-out infinite';
        }
      }
    }, 280);
  }

  /* ===== Fan Shuffle Animation ===== */
  function fanShuffleAnimation(container, callback) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    // Create a deck of 7 cards that fan out then collapse
    const deck = [];
    const COUNT = 7;
    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        left: ${cx}px; top: ${cy}px;
        width: 90px; height: 135px;
        background: linear-gradient(160deg, #2D1B4E, #1a0e3d);
        border: 1.5px solid rgba(212,165,116,0.45);
        border-radius: 10px; z-index: 500;
        pointer-events: none;
        transform: translate(-50%,-50%) rotate(0deg);
        transition: transform 0.55s cubic-bezier(0.34,1.2,0.64,1), opacity 0.4s ease;
        box-shadow: 0 6px 20px rgba(0,0,0,0.6);
        display: flex; align-items: center; justify-content: center;
      `;
      el.innerHTML = `<svg viewBox="0 0 40 54" width="40" height="54" xmlns="http://www.w3.org/2000/svg" style="opacity:0.4;"><circle cx="20" cy="27" r="14" fill="none" stroke="#D4A574" stroke-width="1"/><polygon points="20,14 23,22 32,22 25,28 28,36 20,30 12,36 15,28 8,22 17,22" fill="none" stroke="#D4A574" stroke-width="0.8"/></svg>`;
      document.body.appendChild(el);
      deck.push(el);
    }

    // Phase 1: Fan out
    requestAnimationFrame(() => {
      deck.forEach((el, i) => {
        const angle = -40 + (80 / (COUNT - 1)) * i;
        const lift = -20 - Math.abs(i - (COUNT-1)/2) * 4;
        el.style.transform = `translate(-50%, calc(-50% + ${lift}px)) rotate(${angle}deg)`;
      });
    });

    // Phase 2: Shuffle (riffle effect)
    setTimeout(() => {
      deck.forEach((el, i) => {
        const delay = i * 60;
        setTimeout(() => {
          el.style.transition = 'transform 0.25s ease';
          el.style.transform = `translate(calc(-50% + ${(i % 2 === 0 ? -30 : 30)}px), -50%) rotate(${(i % 2 === 0 ? -8 : 8)}deg)`;
        }, delay);
      });
    }, 600);

    // Phase 3: Collapse back to center
    setTimeout(() => {
      deck.forEach((el, i) => {
        el.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease';
        el.style.transform = `translate(-50%, -50%) rotate(${(Math.random()-0.5)*6}deg)`;
      });
    }, 1100);

    // Phase 4: Fly away upward and fade
    setTimeout(() => {
      deck.forEach((el, i) => {
        el.style.transition = 'transform 0.5s ease, opacity 0.4s ease';
        el.style.transform = `translate(-50%, calc(-50% - ${120 + i*15}px)) rotate(${(Math.random()-0.5)*30}deg) scale(0.7)`;
        el.style.opacity = '0';
      });
    }, 1600);

    // Phase 5: Cleanup and callback
    setTimeout(() => {
      deck.forEach(el => el.remove());
      callback();
    }, 2100);
  }

  /* ===== Rich Reading Generator ===== */
  function generateRichReading(cards) {
    const positions = ['Past', 'Present', 'Future'];
    const cardReadings = cards.map((card, i) => {
      const pos = positions[i];
      const keywords = (card.upright || '').split(',').map(s => s.trim());
      let reading = '';
      if (pos === 'Past') {
        reading = `In your past, <strong>${card.name}</strong> reveals a chapter shaped by ${keywords[0] ? keywords[0].toLowerCase() : 'transformation'}${keywords[1] ? ' and ' + keywords[1].toLowerCase() : ''}. This energy has been a quiet architect of who you are today.`;
      } else if (pos === 'Present') {
        reading = `Right now, <strong>${card.name}</strong> stands as your current mirror — reflecting ${keywords[0] ? keywords[0].toLowerCase() : 'change'}${keywords[1] ? ' and ' + keywords[1].toLowerCase() : ''} at work in your life.`;
      } else {
        reading = `Looking ahead, <strong>${card.name}</strong> illuminates a path of ${keywords[0] ? keywords[0].toLowerCase() : 'growth'}${keywords[1] ? ' and ' + keywords[1].toLowerCase() : ''}. This energy is moving toward you.`;
      }
      return reading;
    });

    const kw = cards.map(c => ((c.upright || '').split(',')[0] || 'change').trim().toLowerCase());
    const synthesis = `Together, these three cards weave a story: <strong>${kw[0]}</strong> flowing into <strong>${kw[1]}</strong>, moving toward <strong>${kw[2]}</strong>. The universe is guiding a meaningful transformation.`;
    const adviceOptions = [
      `The cards encourage you to honor where you've been while staying open to where you're going.`,
      `Your reading suggests a moment of powerful alignment. Trust the energy of <strong>${kw[1]}</strong>.`,
      `The energy around you is shifting. Let <strong>${kw[1]}</strong> be your guiding principle.`
    ];
    return { cardReadings, synthesis, advice: adviceOptions[Math.floor(Math.random() * adviceOptions.length)] };
  }

  /* ===== INIT ===== */
  function init() {
    drawnCards = [];
    revealedCount = 0;

    const proceedBtn = document.getElementById('tarot-proceed');
    if (proceedBtn) { proceedBtn.disabled = true; proceedBtn.style.animation = ''; }

    const flowPage = document.getElementById('flow-tarot');
    if (flowPage) {
      flowPage.style.background = 'linear-gradient(170deg, #0a0618 0%, #110b2a 25%, #1a0e38 50%, #0f0822 75%, #060312 100%)';
      flowPage.style.color = '#F0D9B5';
    }

    const spread = document.getElementById('tarot-spread');
    if (!spread) return;
    spread.innerHTML = '';
    spread.style.cssText = `
      display:flex; gap:18px; justify-content:center; align-items:center;
      flex-wrap:wrap; padding:20px 10px; position:relative; min-height:240px;
    `;

    // Pick 3 cards
    const shuffled = [...(D.tarotDeck || [])].sort(() => Math.random() - 0.5);
    drawnCards = shuffled.slice(0, 3);
    const positions = ['Past', 'Present', 'Future'];

    // Fan shuffle animation then deal cards
    fanShuffleAnimation(spread, function() {
      drawnCards.forEach((card, i) => {
        const el = createCardEl(card, positions[i], i);
        spread.appendChild(el);
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        }, i * 180);
      });

      const instruction = document.createElement('div');
      instruction.style.cssText = 'width:100%;text-align:center;color:rgba(212,165,116,0.8);font-family:Georgia,serif;font-size:0.88rem;letter-spacing:0.06em;margin-top:14px;';
      instruction.textContent = 'Tap each card to reveal your destiny...';
      spread.appendChild(instruction);
    });
  }

  /* ===== START READING ===== */
  async function startReading() {
    App.showLoading('The cards are speaking...');
    let result;
    try { result = await API.getTarot(drawnCards); }
    catch (e) { App.hideLoading(); App.showError(e.message); return; }
    App.hideLoading();

    const rich = generateRichReading(drawnCards);
    const positions = ['Past', 'Present', 'Future'];

    const header = `<span class="result-zodiac" style="font-size:3rem;">✧</span>
      <div class="result-title">Your Tarot Reading</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px;">
        ${drawnCards.map((c, i) => `<span style="font-size:0.78rem;color:rgba(212,165,116,0.9);font-family:Georgia,serif;">${c.name} <span style="opacity:0.6;font-size:0.7rem;">(${positions[i]})</span></span>`).join('<span style="color:rgba(212,165,116,0.3);">✦</span>')}
      </div>`;

    const tags = drawnCards.map(c => `<span class="tag">${c.name}</span>`).join('');

    const content = `
      <div class="fortune-section">
        ${drawnCards.map((card, i) => `
          <div class="fortune-label" style="color:#D4A574;">${card.name} <span style="opacity:0.6;font-size:0.72rem;font-family:Georgia,serif;">— ${positions[i]}</span></div>
          <div class="fortune-text" style="margin-bottom:6px;color:rgba(240,217,181,0.45);font-size:0.72rem;font-style:italic;">${card.upright||''}</div>
          <div class="fortune-text" style="margin-bottom:18px;">${rich.cardReadings[i]}</div>
        `).join('<div style="border-bottom:1px solid rgba(212,165,116,0.12);margin:4px 0 16px;"></div>')}
      </div>
      <div style="border-top:2px solid rgba(212,165,116,0.25);padding:16px 0;margin:8px 0;text-align:center;">
        <div style="font-size:0.7rem;color:#D4A574;letter-spacing:0.2em;text-transform:uppercase;font-family:Georgia,serif;margin-bottom:10px;">✦ Synthesis ✦</div>
        <div class="fortune-text">${rich.synthesis}</div>
      </div>
      <div class="fortune-section" style="margin-top:8px;">
        <div class="fortune-label" style="color:#D4A574;">✦ Guidance</div>
        <div class="fortune-text">${result && result.advice ? result.advice : rich.advice}</div>
      </div>`;

    App.showResult(header, tags, content);
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'tarot') Tools.tarot.init();
});
