/* ===== TAROT TOOL — v6 Big Shuffle + Rich Art ===== */
Tools.tarot = (function() {
  const D = window.__DATA__;
  let drawnCards = [];
  let revealedCount = 0;

  /* ===== Rich SVG Art — full colour fills ===== */
  const CARD_ART = {
    'The Fool': {
      bg: ['#1a3a6e','#2a5aa0'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <!-- Sky gradient -->
        <defs><radialGradient id="fSky" cx="50%" cy="20%"><stop offset="0%" stop-color="#4a90d9"/><stop offset="100%" stop-color="#1a3a6e"/></radialGradient></defs>
        <rect width="100" height="140" fill="url(#fSky)"/>
        <!-- Sun -->
        <circle cx="75" cy="22" r="14" fill="#FFE066" opacity="0.9"/>
        <circle cx="75" cy="22" r="9" fill="#FFD700"/>
        <!-- Cliff -->
        <path d="M0 110 L35 75 L55 85 L100 60 L100 140 L0 140Z" fill="#5a7a3a"/>
        <path d="M0 120 L35 90 L55 100 L100 78 L100 140 L0 140Z" fill="#3d5a28"/>
        <!-- Figure (the fool) -->
        <circle cx="40" cy="58" r="8" fill="#FFDAB9"/>
        <rect x="34" y="66" width="12" height="18" rx="3" fill="#e74c3c"/>
        <line x1="40" y1="84" x2="36" y2="100" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
        <line x1="40" y1="84" x2="44" y2="100" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
        <!-- Staff -->
        <line x1="48" y1="68" x2="62" y2="52" stroke="#8B6914" stroke-width="3" stroke-linecap="round"/>
        <circle cx="63" cy="51" r="4" fill="#FFE066"/>
        <!-- Dog -->
        <ellipse cx="26" cy="96" rx="8" ry="5" fill="#D4A864"/>
        <circle cx="20" cy="92" r="4" fill="#D4A864"/>
        <!-- Stars -->
        <circle cx="15" cy="18" r="2" fill="#FFF" opacity="0.8"/>
        <circle cx="55" cy="12" r="1.5" fill="#FFF" opacity="0.7"/>
        <circle cx="88" cy="40" r="1.5" fill="#FFF" opacity="0.5"/>
      </svg>`
    },
    'The Magician': {
      bg: ['#6b1a1a','#a03030'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="magBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8B0000"/><stop offset="100%" stop-color="#2a0a0a"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#magBg)"/>
        <!-- Infinity symbol -->
        <path d="M30 25 C30 18 38 18 44 25 C50 32 58 32 64 25 C70 18 78 18 78 25 C78 32 70 32 64 25 C58 18 50 18 44 25 C38 32 30 32 30 25Z" fill="none" stroke="#FFD700" stroke-width="2.5"/>
        <!-- Figure -->
        <circle cx="50" cy="50" r="10" fill="#FFDAB9"/>
        <rect x="43" y="60" width="14" height="20" rx="3" fill="#e74c3c"/>
        <!-- Wand raised -->
        <line x1="58" y1="58" x2="68" y2="38" stroke="#8B6914" stroke-width="3" stroke-linecap="round"/>
        <circle cx="68" cy="36" r="5" fill="#FFD700"/>
        <path d="M65 33 L68 27 L71 33 Z" fill="#FFE066"/>
        <!-- Table with symbols -->
        <rect x="20" y="88" width="60" height="8" rx="4" fill="#5C3317"/>
        <circle cx="30" cy="88" r="5" fill="#FFD700"/>
        <rect x="42" y="83" width="8" height="10" rx="1" fill="#c0392b"/>
        <path d="M56 88 L60 83 L64 88 Z" fill="#3498db"/>
        <circle cx="72" cy="88" r="4" fill="#2ecc71"/>
        <!-- Stars -->
        <circle cx="15" cy="15" r="1.5" fill="#FFD700" opacity="0.8"/>
        <circle cx="85" cy="20" r="2" fill="#FFE066" opacity="0.6"/>
      </svg>`
    },
    'The High Priestess': {
      bg: ['#0a1a4e','#1a2d7a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="hpBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0a1040"/><stop offset="100%" stop-color="#1a1060"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#hpBg)"/>
        <!-- Moon behind -->
        <circle cx="50" cy="20" r="20" fill="#c8d8f0" opacity="0.3"/>
        <circle cx="50" cy="20" r="14" fill="#a0b8e0" opacity="0.5"/>
        <!-- Pillars -->
        <rect x="8" y="30" width="16" height="80" rx="3" fill="#2a2060"/>
        <rect x="76" y="30" width="16" height="80" rx="3" fill="#2a2060"/>
        <text x="16" y="72" text-anchor="middle" font-size="9" fill="#FFD700" opacity="0.8">B</text>
        <text x="84" y="72" text-anchor="middle" font-size="9" fill="#fff" opacity="0.8">J</text>
        <!-- Veil/curtain -->
        <path d="M24 30 Q50 42 76 30 L76 110 Q50 98 24 110 Z" fill="#6040a0" opacity="0.5"/>
        <!-- Priestess figure -->
        <circle cx="50" cy="55" r="9" fill="#FFDAB9"/>
        <path d="M35 64 Q50 58 65 64 L65 105 Q50 110 35 105 Z" fill="#1a2080"/>
        <!-- Crown -->
        <path d="M40 46 L50 38 L60 46" fill="none" stroke="#FFD700" stroke-width="2"/>
        <circle cx="50" cy="38" r="4" fill="#FFD700"/>
        <!-- Scroll -->
        <rect x="42" y="88" width="16" height="22" rx="3" fill="#FFDAB9"/>
        <text x="50" y="102" text-anchor="middle" font-size="6" fill="#8B4513">TORA</text>
        <!-- Stars -->
        <circle cx="15" cy="18" r="1.5" fill="#FFE066" opacity="0.9"/>
        <circle cx="85" cy="15" r="1" fill="#C0D8FF" opacity="0.8"/>
        <circle cx="92" cy="35" r="1.5" fill="#C0D8FF" opacity="0.6"/>
      </svg>`
    },
    'The Empress': {
      bg: ['#2a4a1a','#3d6b28'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="empBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#87CEEB"/><stop offset="60%" stop-color="#5a8a3a"/><stop offset="100%" stop-color="#2d5a18"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#empBg)"/>
        <!-- Throne/nature setting -->
        <path d="M0 90 Q50 82 100 90 L100 140 L0 140Z" fill="#4a7a28"/>
        <path d="M0 105 Q50 96 100 105 L100 140 L0 140Z" fill="#2d5a18"/>
        <!-- Flowers -->
        <circle cx="20" cy="92" r="5" fill="#FF69B4"/>
        <circle cx="80" cy="88" r="4" fill="#FFB6C1"/>
        <circle cx="12" cy="98" r="3" fill="#FF1493"/>
        <!-- Figure on throne -->
        <rect x="30" y="75" width="40" height="35" rx="5" fill="#8B6914"/>
        <circle cx="50" cy="55" r="11" fill="#FFDAB9"/>
        <path d="M30 66 Q50 58 70 66 L70 110 Q50 116 30 110 Z" fill="#DAA520"/>
        <!-- Crown with stars -->
        <path d="M38 44 L50 35 L62 44" fill="none" stroke="#FFD700" stroke-width="2.5"/>
        <circle cx="44" cy="42" r="3" fill="#FFD700"/>
        <circle cx="50" cy="37" r="4" fill="#FFD700"/>
        <circle cx="56" cy="42" r="3" fill="#FFD700"/>
        <!-- Scepter -->
        <line x1="64" y1="68" x2="78" y2="50" stroke="#8B6914" stroke-width="3" stroke-linecap="round"/>
        <circle cx="79" cy="48" r="6" fill="#FFD700"/>
        <!-- Heart shield -->
        <path d="M46 78 C46 73 50 72 50 76 C50 72 54 73 54 78 C54 84 50 88 50 88 C50 88 46 84 46 78Z" fill="#e74c3c"/>
      </svg>`
    },
    'The Emperor': {
      bg: ['#5a1a1a','#8b2020'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="empBg2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#8B2020"/><stop offset="100%" stop-color="#2a0808"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#empBg2)"/>
        <!-- Mountains bg -->
        <path d="M0 80 L20 50 L40 65 L60 35 L80 55 L100 40 L100 140 L0 140Z" fill="#5a3a2a" opacity="0.6"/>
        <!-- Throne -->
        <rect x="25" y="70" width="50" height="45" rx="3" fill="#5C3317"/>
        <rect x="22" y="65" width="56" height="12" rx="3" fill="#7a4a20"/>
        <rect x="20" y="60" width="10" height="55" rx="3" fill="#6B3A18"/>
        <rect x="70" y="60" width="10" height="55" rx="3" fill="#6B3A18"/>
        <!-- Ram heads on throne -->
        <circle cx="25" cy="62" r="6" fill="#c0a060"/>
        <circle cx="75" cy="62" r="6" fill="#c0a060"/>
        <!-- Figure -->
        <circle cx="50" cy="45" r="11" fill="#FFDAB9"/>
        <path d="M32 56 Q50 48 68 56 L68 98 Q50 104 32 98 Z" fill="#8B2020"/>
        <!-- Crown -->
        <path d="M38 34 L42 25 L46 34 L50 26 L54 34 L58 25 L62 34" fill="none" stroke="#FFD700" stroke-width="2.5"/>
        <!-- Scepter ankh -->
        <line x1="20" y1="58" x2="20" y2="100" stroke="#8B6914" stroke-width="3" stroke-linecap="round"/>
        <line x1="14" y1="68" x2="26" y2="68" stroke="#8B6914" stroke-width="2.5"/>
        <circle cx="20" cy="63" r="4" fill="#FFD700"/>
        <!-- Orb -->
        <circle cx="72" cy="76" r="8" fill="#FFD700" opacity="0.8"/>
        <path d="M68 76 Q72 70 76 76" fill="none" stroke="#8B6914" stroke-width="1.5"/>
        <line x1="72" y1="68" x2="72" y2="84" stroke="#8B6914" stroke-width="1.5"/>
      </svg>`
    },
    'The Lovers': {
      bg: ['#5a1a3a','#8b2255'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="lovBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFE0EE"/><stop offset="50%" stop-color="#87CEEB"/><stop offset="100%" stop-color="#5a8a3a"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#lovBg)"/>
        <!-- Ground -->
        <path d="M0 108 Q50 100 100 108 L100 140 L0 140Z" fill="#5a8a3a"/>
        <!-- Angel in clouds -->
        <ellipse cx="50" cy="22" rx="30" ry="16" fill="white" opacity="0.8"/>
        <circle cx="50" cy="18" r="9" fill="#FFDAB9"/>
        <path d="M38 22 Q30 16 25 24" fill="#FFD700" opacity="0.9"/>
        <path d="M62 22 Q70 16 75 24" fill="#FFD700" opacity="0.9"/>
        <!-- Sun behind angel -->
        <circle cx="50" cy="12" r="16" fill="#FFE066" opacity="0.5"/>
        <!-- Two figures -->
        <circle cx="32" cy="80" r="9" fill="#FFDAB9"/>
        <path d="M22 89 Q32 82 42 89 L42 115 Q32 120 22 115Z" fill="#e74c3c"/>
        <circle cx="68" cy="80" r="9" fill="#F5DEB3"/>
        <path d="M58 89 Q68 82 78 89 L78 115 Q68 120 58 115Z" fill="#FF69B4"/>
        <!-- Tree of Life (right) -->
        <line x1="80" y1="115" x2="80" y2="88" stroke="#8B4513" stroke-width="3"/>
        <circle cx="80" cy="85" r="6" fill="#FF4500"/>
        <circle cx="74" cy="92" r="4" fill="#FF6600"/>
        <circle cx="86" cy="92" r="4" fill="#FF6600"/>
        <!-- Mountain -->
        <path d="M10 108 L25 80 L40 108Z" fill="#8B8B8B"/>
        <path d="M20 84 L25 74 L30 84Z" fill="white"/>
      </svg>`
    },
    'The Chariot': {
      bg: ['#1a2a5a','#203070'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="charBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1a2060"/><stop offset="100%" stop-color="#080820"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#charBg)"/>
        <!-- City in distance -->
        <rect x="30" y="55" width="8" height="20" fill="#2a3060" opacity="0.7"/>
        <rect x="42" y="48" width="10" height="27" fill="#2a3060" opacity="0.7"/>
        <rect x="56" y="53" width="8" height="22" fill="#2a3060" opacity="0.7"/>
        <!-- Stars -->
        <circle cx="20" cy="18" r="2" fill="#FFE066"/>
        <circle cx="50" cy="12" r="2.5" fill="#FFE066"/>
        <circle cx="80" cy="20" r="1.5" fill="#FFE066"/>
        <circle cx="10" cy="30" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="90" cy="28" r="1.5" fill="white" opacity="0.7"/>
        <!-- Canopy -->
        <path d="M18 60 L50 52 L82 60 L82 78 L18 78 Z" fill="#1a3070"/>
        <path d="M18 60 L50 52 L82 60" fill="none" stroke="#FFD700" stroke-width="2"/>
        <!-- Stars on canopy -->
        <circle cx="30" cy="65" r="2" fill="#FFE066"/>
        <circle cx="50" cy="62" r="2.5" fill="#FFE066"/>
        <circle cx="70" cy="65" r="2" fill="#FFE066"/>
        <!-- Chariot body -->
        <rect x="20" y="78" width="60" height="38" rx="4" fill="#2a3090"/>
        <path d="M20 78 L50 68 L80 78" fill="none" stroke="#FFD700" stroke-width="2"/>
        <!-- Warrior -->
        <circle cx="50" cy="57" r="8" fill="#FFDAB9"/>
        <path d="M40 65 Q50 60 60 65 L60 80 Q50 84 40 80Z" fill="#c8c8c8"/>
        <!-- Sphinxes -->
        <ellipse cx="28" cy="120" rx="14" ry="8" fill="white"/>
        <circle cx="18" cy="116" r="6" fill="white"/>
        <ellipse cx="72" cy="120" rx="14" ry="8" fill="#2a2a2a"/>
        <circle cx="82" cy="116" r="6" fill="#2a2a2a"/>
      </svg>`
    },
    'Strength': {
      bg: ['#5a3a1a','#8b5a20'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="strBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFE566"/><stop offset="50%" stop-color="#87CEEB"/><stop offset="100%" stop-color="#5a8a3a"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#strBg)"/>
        <!-- Ground -->
        <path d="M0 110 Q50 102 100 110 L100 140 L0 140Z" fill="#4a7a28"/>
        <!-- Mountains -->
        <path d="M55 110 L72 80 L89 110Z" fill="#8B9DB5"/>
        <path d="M65 82 L72 70 L79 82Z" fill="white" opacity="0.9"/>
        <!-- Infinity above head -->
        <path d="M33 28 C33 22 39 22 44 28 C49 34 55 34 60 28 C65 22 71 22 71 28 C71 34 65 34 60 28 C55 22 49 22 44 28 C39 34 33 34 33 28Z" fill="#FFD700"/>
        <!-- Woman figure -->
        <circle cx="42" cy="50" r="9" fill="#FFDAB9"/>
        <path d="M30 59 Q42 52 54 59 L54 95 Q42 100 30 95Z" fill="#e8f4e8"/>
        <!-- Flower wreath on head -->
        <path d="M35 42 Q42 35 49 42" fill="none" stroke="#FF69B4" stroke-width="3"/>
        <circle cx="38" cy="40" r="3" fill="#FF69B4"/>
        <circle cx="42" cy="37" r="3" fill="#FFD700"/>
        <circle cx="46" cy="40" r="3" fill="#FF69B4"/>
        <!-- Lion -->
        <ellipse cx="68" cy="88" rx="22" ry="15" fill="#D4A547"/>
        <circle cx="56" cy="80" r="14" fill="#D4A547"/>
        <path d="M46 74 Q56 65 66 74" fill="#C4903A"/>
        <!-- Lion mane -->
        <circle cx="50" cy="70" r="5" fill="#B8862E"/>
        <circle cx="60" cy="66" r="5" fill="#B8862E"/>
        <circle cx="46" cy="78" r="4" fill="#B8862E"/>
        <!-- Woman touches lion gently -->
        <line x1="54" y1="72" x2="52" y2="78" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    'The Hermit': {
      bg: ['#2a2a4a','#3a3a60'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="hermBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1a1a30"/><stop offset="100%" stop-color="#0a0a18"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#hermBg)"/>
        <!-- Mountain peak -->
        <path d="M0 100 L30 55 L50 70 L70 30 L100 80 L100 140 L0 140Z" fill="#3a3a5a"/>
        <path d="M55 70 L70 32 L85 70Z" fill="#5a5a7a"/>
        <path d="M62 34 L70 20 L78 34Z" fill="white" opacity="0.9"/>
        <!-- Hermit figure -->
        <circle cx="40" cy="55" r="9" fill="#FFDAB9"/>
        <!-- Cloak -->
        <path d="M25 64 Q40 56 55 64 L58 110 Q40 116 22 110Z" fill="#5a5a7a"/>
        <!-- Hood -->
        <path d="M30 50 Q40 38 50 50 Q46 58 34 58Z" fill="#4a4a6a"/>
        <!-- Lantern (glowing) -->
        <circle cx="68" cy="58" r="12" fill="#FFE066" opacity="0.3"/>
        <circle cx="68" cy="58" r="8" fill="#FFE066" opacity="0.5"/>
        <rect x="63" y="50" width="10" height="16" rx="3" fill="#8B6914" opacity="0.8"/>
        <circle cx="68" cy="58" r="5" fill="#FFD700"/>
        <!-- Stars -->
        <circle cx="15" cy="18" r="2" fill="#C0C8FF" opacity="0.9"/>
        <circle cx="85" cy="14" r="1.5" fill="#C0C8FF" opacity="0.7"/>
        <circle cx="92" cy="28" r="1" fill="#C0C8FF" opacity="0.6"/>
        <circle cx="22" cy="32" r="1.5" fill="#C0C8FF" opacity="0.5"/>
      </svg>`
    },
    'Wheel of Fortune': {
      bg: ['#1a4a1a','#2a6a2a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="wofBg" cx="50%" cy="50%"><stop offset="0%" stop-color="#4a7a3a"/><stop offset="100%" stop-color="#0a1a0a"/></radialGradient></defs>
        <rect width="100" height="140" fill="url(#wofBg)"/>
        <!-- Corner creatures -->
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#1a1a3a" opacity="0.7"/>
        <text x="12" y="16" text-anchor="middle" font-size="14" fill="#FFE066">👼</text>
        <rect x="78" y="2" width="20" height="20" rx="3" fill="#1a1a3a" opacity="0.7"/>
        <text x="88" y="16" text-anchor="middle" font-size="12" fill="#FFD700">🦅</text>
        <rect x="2" y="118" width="20" height="20" rx="3" fill="#1a1a3a" opacity="0.7"/>
        <text x="12" y="132" text-anchor="middle" font-size="12" fill="#FFD700">🐂</text>
        <rect x="78" y="118" width="20" height="20" rx="3" fill="#1a1a3a" opacity="0.7"/>
        <text x="88" y="132" text-anchor="middle" font-size="12" fill="#FFD700">🦁</text>
        <!-- Outer wheel -->
        <circle cx="50" cy="68" r="38" fill="none" stroke="#FFD700" stroke-width="3"/>
        <!-- Inner wheel -->
        <circle cx="50" cy="68" r="26" fill="none" stroke="#D4A574" stroke-width="2"/>
        <!-- Spokes -->
        <line x1="50" y1="30" x2="50" y2="106" stroke="#D4A574" stroke-width="1.5" opacity="0.7"/>
        <line x1="12" y1="68" x2="88" y2="68" stroke="#D4A574" stroke-width="1.5" opacity="0.7"/>
        <line x1="23" y1="41" x2="77" y2="95" stroke="#D4A574" stroke-width="1.5" opacity="0.7"/>
        <line x1="77" y1="41" x2="23" y2="95" stroke="#D4A574" stroke-width="1.5" opacity="0.7"/>
        <!-- Hub -->
        <circle cx="50" cy="68" r="10" fill="#FFD700"/>
        <circle cx="50" cy="68" r="5" fill="#8B6914"/>
        <!-- Letters TARO -->
        <text x="50" y="38" text-anchor="middle" font-size="7" fill="#FFD700" font-weight="bold">T</text>
        <text x="84" y="71" text-anchor="middle" font-size="7" fill="#FFD700" font-weight="bold">A</text>
        <text x="50" y="104" text-anchor="middle" font-size="7" fill="#FFD700" font-weight="bold">R</text>
        <text x="16" y="71" text-anchor="middle" font-size="7" fill="#FFD700" font-weight="bold">O</text>
        <!-- Serpent descending -->
        <path d="M80 40 Q85 55 78 65 Q72 72 78 80" fill="none" stroke="#3aaa3a" stroke-width="3" stroke-linecap="round"/>
        <!-- Anubis ascending -->
        <circle cx="23" cy="80" r="5" fill="#D4A574"/>
      </svg>`
    },
    'Justice': {
      bg: ['#1a2a5a','#2a3a7a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="justBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#D4A574" stop-opacity="0.3"/><stop offset="100%" stop-color="#2a2a5a"/></linearGradient></defs>
        <rect width="100" height="140" fill="#1a1a3a"/>
        <!-- Pillars -->
        <rect x="8" y="18" width="14" height="100" rx="3" fill="#2a2060"/>
        <rect x="78" y="18" width="14" height="100" rx="3" fill="#2a2060"/>
        <!-- Purple curtain -->
        <path d="M22 18 Q50 30 78 18 L78 118 Q50 106 22 118 Z" fill="#5040a0" opacity="0.6"/>
        <!-- Figure on throne -->
        <rect x="32" y="75" width="36" height="35" rx="3" fill="#5C3317"/>
        <circle cx="50" cy="55" r="10" fill="#FFDAB9"/>
        <path d="M32 65 Q50 57 68 65 L68 110 Q50 116 32 110 Z" fill="#e74c3c"/>
        <!-- Crown -->
        <path d="M40 45 L50 36 L60 45" fill="none" stroke="#FFD700" stroke-width="2.5"/>
        <circle cx="44" cy="43" r="3" fill="#FFD700"/>
        <circle cx="50" cy="37" r="4" fill="#FFD700"/>
        <circle cx="56" cy="43" r="3" fill="#FFD700"/>
        <!-- Scales -->
        <line x1="50" y1="55" x2="50" y2="35" stroke="#FFD700" stroke-width="2"/>
        <line x1="28" y1="38" x2="72" y2="38" stroke="#FFD700" stroke-width="2"/>
        <path d="M22 38 Q28 46 34 38" fill="#FFD700" opacity="0.3" stroke="#FFD700" stroke-width="1.5"/>
        <path d="M66 38 Q72 46 78 38" fill="#FFD700" opacity="0.3" stroke="#FFD700" stroke-width="1.5"/>
        <!-- Sword -->
        <line x1="76" y1="55" x2="76" y2="110" stroke="#C0C0C0" stroke-width="3" stroke-linecap="round"/>
        <line x1="70" y1="68" x2="82" y2="68" stroke="#C0C0C0" stroke-width="2.5"/>
        <path d="M73 55 L76 50 L79 55Z" fill="#FFD700"/>
      </svg>`
    },
    'The Hanged Man': {
      bg: ['#1a3a3a','#0a2a2a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="hangBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0a1a10"/><stop offset="100%" stop-color="#1a3a20"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#hangBg)"/>
        <!-- Two trees (T shape) -->
        <rect x="22" y="10" width="10" height="80" rx="3" fill="#5C3317"/>
        <rect x="68" y="10" width="10" height="80" rx="3" fill="#5C3317"/>
        <rect x="22" y="10" width="56" height="10" rx="3" fill="#5C3317"/>
        <!-- Tree foliage -->
        <circle cx="27" cy="10" r="12" fill="#2d5a18"/>
        <circle cx="73" cy="10" r="12" fill="#2d5a18"/>
        <!-- Rope -->
        <line x1="50" y1="20" x2="50" y2="38" stroke="#D4A574" stroke-width="2.5"/>
        <!-- Figure hanging (upside down) -->
        <circle cx="50" cy="46" r="10" fill="#FFDAB9"/>
        <path d="M38 36 Q50 28 62 36 L62 58 Q50 64 38 58Z" fill="#3498db"/>
        <!-- Halo (enlightened) -->
        <circle cx="50" cy="46" r="14" fill="none" stroke="#FFD700" stroke-width="2" opacity="0.7"/>
        <circle cx="50" cy="46" r="18" fill="none" stroke="#FFE066" stroke-width="1" opacity="0.4"/>
        <!-- Legs crossed -->
        <line x1="44" y1="58" x2="40" y2="74" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
        <line x1="56" y1="58" x2="44" y2="74" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
        <!-- Arms behind back = peace sign implied -->
        <line x1="38" y1="46" x2="28" y2="52" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
        <line x1="62" y1="46" x2="72" y2="52" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    'Death': {
      bg: ['#0a0a18','#1a0a18'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="deathBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1a0a30"/><stop offset="100%" stop-color="#050010"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#deathBg)"/>
        <!-- Sun rising in background (new dawn) -->
        <circle cx="50" cy="80" r="22" fill="#FF6600" opacity="0.4"/>
        <circle cx="50" cy="80" r="14" fill="#FF8C00" opacity="0.5"/>
        <!-- River -->
        <path d="M0 120 Q50 112 100 120 L100 140 L0 140Z" fill="#1a3a6e"/>
        <!-- Boat -->
        <path d="M60 118 Q70 112 80 118 L80 124 Q70 128 60 124Z" fill="#2a2a4a"/>
        <!-- Knight on horse -->
        <ellipse cx="42" cy="100" rx="20" ry="12" fill="#2a2a2a"/>
        <circle cx="28" cy="92" r="8" fill="#2a2a2a"/>
        <!-- Skeleton figure -->
        <circle cx="42" cy="72" r="9" fill="#E8E8D8"/>
        <!-- Skull details -->
        <circle cx="39" cy="70" r="2" fill="#2a2a2a"/>
        <circle cx="45" cy="70" r="2" fill="#2a2a2a"/>
        <path d="M38 75 Q42 78 46 75" fill="none" stroke="#2a2a2a" stroke-width="1.5"/>
        <!-- Black armor -->
        <path d="M30 81 Q42 74 54 81 L54 100 Q42 106 30 100Z" fill="#1a1a1a"/>
        <!-- White rose banner -->
        <line x1="60" y1="68" x2="60" y2="90" stroke="#8B6914" stroke-width="2"/>
        <rect x="58" y="62" width="20" height="12" fill="#1a1a1a"/>
        <!-- White rose on banner -->
        <circle cx="68" cy="68" r="4" fill="white"/>
        <circle cx="68" cy="68" r="2" fill="#FFB6C1"/>
        <!-- Pope figure prostrating -->
        <circle cx="18" cy="105" r="5" fill="#FFDAB9"/>
        <path d="M10 110 Q18 106 26 110 L26 125 Q18 128 10 125Z" fill="#FFD700"/>
      </svg>`
    },
    'Temperance': {
      bg: ['#1a3a4a','#2a4a5a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="tempBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#87CEEB"/><stop offset="60%" stop-color="#4a7a5a"/><stop offset="100%" stop-color="#2a5a3a"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#tempBg)"/>
        <!-- Ground/pool -->
        <path d="M0 108 Q50 100 100 108 L100 140 L0 140Z" fill="#2a6a9a"/>
        <!-- Flowers on ground -->
        <circle cx="15" cy="110" r="4" fill="#FF69B4"/>
        <circle cx="85" cy="108" r="3" fill="#FFD700"/>
        <!-- Path to mountains -->
        <path d="M30 140 Q50 115 70 140" fill="#8B9DB5" opacity="0.5"/>
        <path d="M60 115 L72 90 L84 115Z" fill="#8B9DB5"/>
        <path d="M66 92 L72 78 L78 92Z" fill="white" opacity="0.9"/>
        <!-- Sun with crown above -->
        <circle cx="50" cy="22" r="16" fill="#FFE066" opacity="0.8"/>
        <circle cx="50" cy="22" r="10" fill="#FFD700"/>
        <!-- Crown on sun -->
        <path d="M40 12 L50 5 L60 12" fill="#FFD700" stroke="#D4A574" stroke-width="1"/>
        <!-- Angel figure -->
        <circle cx="50" cy="58" r="10" fill="#FFDAB9"/>
        <path d="M36 68 Q50 60 64 68 L64 100 Q50 106 36 100Z" fill="#FFFFFF" opacity="0.9"/>
        <!-- Wings -->
        <path d="M36 72 Q22 65 20 78 Q28 82 36 76" fill="#FFD700" opacity="0.8"/>
        <path d="M64 72 Q78 65 80 78 Q72 82 64 76" fill="#FFD700" opacity="0.8"/>
        <!-- Triangle on chest -->
        <path d="M46 74 L50 68 L54 74 Z" fill="#FFD700"/>
        <!-- Two cups pouring -->
        <rect x="28" y="82" width="12" height="14" rx="3" fill="#C0C0FF" opacity="0.8"/>
        <rect x="60" y="78" width="12" height="14" rx="3" fill="#FFD700" opacity="0.8"/>
        <path d="M40 86 Q50 80 60 82" fill="none" stroke="#87CEEB" stroke-width="2" opacity="0.8"/>
      </svg>`
    },
    'The Devil': {
      bg: ['#2a0a0a','#3a0a0a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="devBg" cx="50%" cy="40%"><stop offset="0%" stop-color="#4a0a0a"/><stop offset="100%" stop-color="#0a0000"/></radialGradient></defs>
        <rect width="100" height="140" fill="url(#devBg)"/>
        <!-- Pentagram (inverted) -->
        <polygon points="50,12 58,36 80,36 63,50 70,74 50,60 30,74 37,50 20,36 42,36" fill="none" stroke="#FF4500" stroke-width="1.5" opacity="0.6"/>
        <!-- Devil figure (large, dark) -->
        <circle cx="50" cy="48" r="14" fill="#2a2a3a"/>
        <!-- Horns -->
        <path d="M40 36 L34 22 L44 34" fill="#1a1a1a" stroke="#4a4a4a" stroke-width="1"/>
        <path d="M60 36 L66 22 L56 34" fill="#1a1a1a" stroke="#4a4a4a" stroke-width="1"/>
        <!-- Bat wings -->
        <path d="M30 58 Q15 45 10 60 Q18 68 30 64" fill="#2a1a3a"/>
        <path d="M70 58 Q85 45 90 60 Q82 68 70 64" fill="#2a1a3a"/>
        <!-- Devil body -->
        <path d="M28 62 Q50 54 72 62 L72 95 Q50 102 28 95Z" fill="#2a2a3a"/>
        <!-- Devil face -->
        <circle cx="44" cy="46" r="3" fill="#FF4500"/>
        <circle cx="56" cy="46" r="3" fill="#FF4500"/>
        <path d="M43 55 Q50 60 57 55" fill="none" stroke="#FF4500" stroke-width="2"/>
        <!-- Chains -->
        <circle cx="30" cy="110" r="10" fill="none" stroke="#D4A574" stroke-width="2"/>
        <line x1="30" y1="100" x2="35" y2="94" stroke="#D4A574" stroke-width="2"/>
        <circle cx="70" cy="110" r="10" fill="none" stroke="#D4A574" stroke-width="2"/>
        <line x1="70" y1="100" x2="65" y2="94" stroke="#D4A574" stroke-width="2"/>
        <!-- Torch -->
        <line x1="50" y1="90" x2="50" y2="108" stroke="#8B4513" stroke-width="3"/>
        <path d="M45 90 Q50 82 55 90 Q52 96 48 96Z" fill="#FF4500"/>
        <circle cx="50" cy="87" r="4" fill="#FFE066"/>
      </svg>`
    },
    'The Tower': {
      bg: ['#3a1a1a','#4a1a1a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="towBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1a0808"/><stop offset="100%" stop-color="#0a0a0a"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#towBg)"/>
        <!-- Dark clouds -->
        <ellipse cx="30" cy="30" rx="22" ry="14" fill="#2a2a2a"/>
        <ellipse cx="65" cy="22" rx="28" ry="16" fill="#3a3a3a"/>
        <ellipse cx="80" cy="38" rx="18" ry="12" fill="#2a2a2a"/>
        <!-- Lightning bolt (dramatic) -->
        <path d="M58 15 L48 38 L56 38 L44 65" stroke="#FFE066" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M58 15 L48 38 L56 38 L44 65" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.7"/>
        <!-- Tower (tall stone) -->
        <rect x="30" y="42" width="40" height="80" rx="2" fill="#5a5a6a"/>
        <path d="M28 42 L50 28 L72 42" fill="#4a4a5a"/>
        <!-- Crown on top flying off -->
        <rect x="42" y="24" width="16" height="8" rx="2" fill="#FFD700" transform="rotate(-15, 50, 28)"/>
        <!-- Windows with fire -->
        <rect x="38" y="55" width="10" height="14" rx="2" fill="#FF4500"/>
        <rect x="52" y="55" width="10" height="14" rx="2" fill="#FF6600"/>
        <rect x="38" y="78" width="10" height="14" rx="2" fill="#FF4500" opacity="0.8"/>
        <rect x="52" y="78" width="10" height="14" rx="2" fill="#FF6600" opacity="0.8"/>
        <!-- Falling figures -->
        <circle cx="20" cy="80" r="6" fill="#FFDAB9"/>
        <path d="M16 86 Q20 80 24 86 L24 96 Q20 100 16 96Z" fill="#3498db" transform="rotate(45, 20, 88)"/>
        <circle cx="80" cy="90" r="5" fill="#FFDAB9"/>
        <path d="M76 96 Q80 90 84 96 L84 104 Q80 108 76 104Z" fill="#e74c3c" transform="rotate(-30, 80, 98)"/>
        <!-- Ground -->
        <path d="M0 130 Q50 122 100 130 L100 140 L0 140Z" fill="#2a2a2a"/>
      </svg>`
    },
    'The Star': {
      bg: ['#0a1a3a','#0a1a5a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="starBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0a1030"/><stop offset="60%" stop-color="#3a6a9a"/><stop offset="100%" stop-color="#5a8a3a"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#starBg)"/>
        <!-- Pool of water -->
        <ellipse cx="38" cy="112" rx="24" ry="12" fill="#2a5a8a" opacity="0.8"/>
        <!-- Ground -->
        <path d="M0 114 Q50 106 100 114 L100 140 L0 140Z" fill="#4a7a28"/>
        <!-- Big star (8 pointed) -->
        <path d="M50 8 L53 18 L60 12 L56 22 L66 22 L58 28 L63 38 L53 32 L53 42 L50 32 L47 42 L47 32 L37 38 L42 28 L34 22 L44 22 L40 12 L47 18 Z" fill="#FFD700"/>
        <!-- 7 small stars -->
        <circle cx="18" cy="25" r="3" fill="#FFE066"/>
        <circle cx="82" cy="20" r="3" fill="#FFE066"/>
        <circle cx="14" cy="42" r="2" fill="#FFE066"/>
        <circle cx="88" cy="38" r="2" fill="#FFE066"/>
        <circle cx="24" cy="15" r="2" fill="#FFE066"/>
        <circle cx="75" cy="35" r="2" fill="#FFE066"/>
        <circle cx="90" cy="55" r="2" fill="#FFE066"/>
        <!-- Woman kneeling with jugs -->
        <circle cx="50" cy="78" r="9" fill="#FFDAB9"/>
        <path d="M36 87 Q50 79 64 87 L64 110 Q50 116 36 110Z" fill="#FFDAB9" opacity="0.8"/>
        <!-- Hair flowing -->
        <path d="M45 70 Q38 78 40 88" fill="none" stroke="#D4A574" stroke-width="3" stroke-linecap="round"/>
        <!-- Two jugs pouring water -->
        <rect x="22" y="90" width="10" height="14" rx="3" fill="#3a7a9a"/>
        <path d="M22 94 Q18 98 16 104" fill="none" stroke="#87CEEB" stroke-width="2"/>
        <rect x="68" y="88" width="10" height="14" rx="3" fill="#3a7a9a"/>
        <path d="M78 92 Q82 96 84 102" fill="none" stroke="#87CEEB" stroke-width="2"/>
        <!-- Bird on tree -->
        <line x1="76" y1="110" x2="76" y2="88" stroke="#5C3317" stroke-width="3"/>
        <circle cx="80" cy="84" r="4" fill="#2a2a2a"/>
      </svg>`
    },
    'The Moon': {
      bg: ['#0a1028','#0a1838'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="moonBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#080818"/><stop offset="100%" stop-color="#101828"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#moonBg)"/>
        <!-- Pool at bottom -->
        <ellipse cx="50" cy="128" rx="30" ry="10" fill="#1a3a6e" opacity="0.8"/>
        <!-- Path up the middle -->
        <path d="M42 140 Q46 118 44 100 Q42 88 46 80" fill="none" stroke="#8B9DB5" stroke-width="14" opacity="0.25"/>
        <!-- Moon (crescent) -->
        <circle cx="50" cy="30" r="22" fill="#c8d8f0" opacity="0.9"/>
        <circle cx="42" cy="26" r="16" fill="#0a1028"/>
        <!-- 16 yods (falling drops) -->
        <circle cx="22" cy="58" r="3" fill="#FFD700" opacity="0.7"/>
        <circle cx="36" cy="52" r="3" fill="#FFD700" opacity="0.7"/>
        <circle cx="50" cy="50" r="3" fill="#FFD700" opacity="0.7"/>
        <circle cx="64" cy="52" r="3" fill="#FFD700" opacity="0.7"/>
        <circle cx="78" cy="58" r="3" fill="#FFD700" opacity="0.7"/>
        <circle cx="28" cy="44" r="2" fill="#FFE066" opacity="0.5"/>
        <circle cx="72" cy="44" r="2" fill="#FFE066" opacity="0.5"/>
        <!-- Two towers -->
        <rect x="8" y="80" width="16" height="52" rx="2" fill="#2a2a4a"/>
        <path d="M8 80 L16 70 L24 80" fill="#3a3a5a"/>
        <rect x="76" y="80" width="16" height="52" rx="2" fill="#2a2a4a"/>
        <path d="M76 80 L84 70 L92 80" fill="#3a3a5a"/>
        <!-- Wolf and dog -->
        <ellipse cx="28" cy="116" rx="12" ry="8" fill="#8B8B8B"/>
        <circle cx="18" cy="110" r="7" fill="#8B8B8B"/>
        <ellipse cx="72" cy="116" rx="12" ry="8" fill="#D4A864"/>
        <circle cx="82" cy="110" r="7" fill="#D4A864"/>
        <!-- Crayfish in pool -->
        <ellipse cx="50" cy="128" rx="8" ry="4" fill="#ff6b35"/>
      </svg>`
    },
    'The Sun': {
      bg: ['#8B5a00','#D4A000'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="sunBg" cx="50%" cy="35%"><stop offset="0%" stop-color="#FFE566"/><stop offset="70%" stop-color="#FFB830"/><stop offset="100%" stop-color="#d48000"/></radialGradient></defs>
        <rect width="100" height="140" fill="url(#sunBg)"/>
        <!-- Wall -->
        <rect x="0" y="95" width="100" height="45" fill="#D4A864"/>
        <path d="M0 95 Q25 90 50 95 Q75 100 100 95" fill="#C4945A" opacity="0.5"/>
        <!-- Sun (large) -->
        <circle cx="50" cy="38" r="28" fill="#FFE066"/>
        <circle cx="50" cy="38" r="20" fill="#FFD700"/>
        <!-- Sun rays (alternating straight/wavy) -->
        <line x1="50" y1="5" x2="50" y2="1" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
        <line x1="50" y1="71" x2="50" y2="75" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
        <line x1="17" y1="38" x2="13" y2="38" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
        <line x1="83" y1="38" x2="87" y2="38" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
        <line x1="27" y1="16" x2="24" y2="13" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
        <line x1="73" y1="16" x2="76" y2="13" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
        <line x1="27" y1="60" x2="24" y2="63" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
        <line x1="73" y1="60" x2="76" y2="63" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
        <!-- Sun face -->
        <circle cx="44" cy="35" r="3" fill="#8B6914"/>
        <circle cx="56" cy="35" r="3" fill="#8B6914"/>
        <path d="M44 43 Q50 48 56 43" fill="none" stroke="#8B6914" stroke-width="2"/>
        <!-- Child on horse (joyful) -->
        <ellipse cx="50" cy="112" rx="16" ry="10" fill="#F4A460"/>
        <circle cx="38" cy="105" r="7" fill="#F4A460"/>
        <circle cx="50" cy="90" r="9" fill="#FFDAB9"/>
        <!-- Arms raised in joy -->
        <line x1="46" y1="98" x2="36" y2="90" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
        <line x1="54" y1="98" x2="64" y2="90" stroke="#FFDAB9" stroke-width="3" stroke-linecap="round"/>
        <!-- Sunflowers -->
        <circle cx="18" cy="92" r="5" fill="#FFD700"/>
        <circle cx="18" cy="92" r="3" fill="#8B6914"/>
        <circle cx="82" cy="92" r="5" fill="#FFD700"/>
        <circle cx="82" cy="92" r="3" fill="#8B6914"/>
        <!-- Red banner/flag -->
        <line x1="60" y1="88" x2="60" y2="72" stroke="#c0392b" stroke-width="2"/>
        <rect x="60" y="72" width="14" height="8" fill="#c0392b"/>
      </svg>`
    },
    'Judgement': {
      bg: ['#0a1a3a','#1a2a5a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="judgBg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1a2060"/><stop offset="100%" stop-color="#2a1040"/></linearGradient></defs>
        <rect width="100" height="140" fill="url(#judgBg)"/>
        <!-- Aurora/light beams -->
        <path d="M40 0 L30 50 L50 40Z" fill="#87CEEB" opacity="0.15"/>
        <path d="M50 0 L40 45 L60 40Z" fill="#FFE066" opacity="0.2"/>
        <path d="M60 0 L50 45 L70 40Z" fill="#87CEEB" opacity="0.15"/>
        <!-- Angel Gabriel in clouds -->
        <ellipse cx="50" cy="22" rx="36" ry="18" fill="white" opacity="0.75"/>
        <circle cx="50" cy="18" r="10" fill="#FFDAB9"/>
        <!-- Angel wings (golden) -->
        <path d="M36 22 Q24 14 20 26 Q30 32 38 26" fill="#FFD700" opacity="0.9"/>
        <path d="M64 22 Q76 14 80 26 Q70 32 62 26" fill="#FFD700" opacity="0.9"/>
        <!-- Trumpet -->
        <line x1="50" y1="26" x2="72" y2="35" stroke="#D4A574" stroke-width="3" stroke-linecap="round"/>
        <path d="M68 33 Q74 30 76 38 Q72 40 68 37Z" fill="#FFD700"/>
        <!-- Cross on banner -->
        <rect x="76" y="30" width="12" height="16" fill="white" opacity="0.9"/>
        <line x1="82" y1="30" x2="82" y2="46" stroke="#c0392b" stroke-width="2.5"/>
        <line x1="76" y1="38" x2="88" y2="38" stroke="#c0392b" stroke-width="2.5"/>
        <!-- Figures rising from coffins/water -->
        <circle cx="28" cy="105" r="7" fill="#FFDAB9"/>
        <path d="M20 112 Q28 106 36 112 L36 128 Q28 132 20 128Z" fill="#C8C8C8" opacity="0.8"/>
        <circle cx="50" cy="98" r="7" fill="#FFDAB9"/>
        <path d="M42 105 Q50 99 58 105 L58 122 Q50 126 42 122Z" fill="#C8C8C8" opacity="0.9"/>
        <circle cx="72" cy="105" r="7" fill="#FFDAB9"/>
        <path d="M64 112 Q72 106 80 112 L80 128 Q72 132 64 128Z" fill="#C8C8C8" opacity="0.8"/>
        <!-- Arms raised in joy -->
        <line x1="46" y1="105" x2="40" y2="96" stroke="#FFDAB9" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="54" y1="105" x2="60" y2="96" stroke="#FFDAB9" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Icy ocean -->
        <path d="M0 130 Q50 122 100 130 L100 140 L0 140Z" fill="#2a5a8a" opacity="0.7"/>
      </svg>`
    },
    'The World': {
      bg: ['#1a3a1a','#2a5a2a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="worldBg" cx="50%" cy="50%"><stop offset="0%" stop-color="#2a6a4a"/><stop offset="100%" stop-color="#0a1a0a"/></radialGradient></defs>
        <rect width="100" height="140" fill="url(#worldBg)"/>
        <!-- Laurel wreath (oval) -->
        <ellipse cx="50" cy="70" rx="30" ry="44" fill="none" stroke="#5a8a3a" stroke-width="6"/>
        <ellipse cx="50" cy="70" rx="28" ry="42" fill="none" stroke="#8aaa5a" stroke-width="3" stroke-dasharray="4,3"/>
        <!-- Ribbons at top and bottom -->
        <path d="M36 26 Q50 20 64 26" fill="none" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/>
        <path d="M36 114 Q50 120 64 114" fill="none" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/>
        <!-- Four corner figures in clouds -->
        <rect x="2" y="5" width="18" height="18" rx="4" fill="#1a3a3a" opacity="0.7"/>
        <text x="11" y="17" text-anchor="middle" font-size="11">👼</text>
        <rect x="80" y="5" width="18" height="18" rx="4" fill="#1a3a3a" opacity="0.7"/>
        <text x="89" y="17" text-anchor="middle" font-size="11">🦅</text>
        <rect x="2" y="117" width="18" height="18" rx="4" fill="#1a3a3a" opacity="0.7"/>
        <text x="11" y="129" text-anchor="middle" font-size="11">🐂</text>
        <rect x="80" y="117" width="18" height="18" rx="4" fill="#1a3a3a" opacity="0.7"/>
        <text x="89" y="129" text-anchor="middle" font-size="11">🦁</text>
        <!-- Dancing figure in center -->
        <circle cx="50" cy="58" r="9" fill="#FFDAB9"/>
        <path d="M38 67 Q50 60 62 67 L62 88 Q50 94 38 88Z" fill="#8B2D8B" opacity="0.8"/>
        <!-- Purple sash -->
        <path d="M40 70 Q50 65 60 72" fill="none" stroke="#D4A574" stroke-width="3"/>
        <!-- Arms raised holding wands -->
        <line x1="44" y1="68" x2="36" y2="58" stroke="#FFDAB9" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="56" y1="68" x2="66" y2="58" stroke="#FFDAB9" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="35" cy="57" r="3" fill="#FFD700"/>
        <circle cx="67" cy="57" r="3" fill="#FFD700"/>
        <!-- Legs in motion -->
        <line x1="46" y1="88" x2="40" y2="100" stroke="#FFDAB9" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="54" y1="88" x2="62" y2="100" stroke="#FFDAB9" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`
    }
  };

  function getCardArt(name) {
    return CARD_ART[name] || {
      bg: ['#2D1B4E','#1a0e3d'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
        <defs><radialGradient id="defBg" cx="50%" cy="50%"><stop offset="0%" stop-color="#4a2080"/><stop offset="100%" stop-color="#0a0510"/></radialGradient></defs>
        <rect width="100" height="140" fill="url(#defBg)"/>
        <polygon points="50,30 57,52 80,52 62,65 69,87 50,74 31,87 38,65 20,52 43,52" fill="#D4A574" opacity="0.7"/>
        <circle cx="50" cy="52" r="8" fill="#FFD700" opacity="0.5"/>
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
      width: 150px; height: 220px;
      position: relative; cursor: pointer;
      opacity: 0; transform: translateY(60px) scale(0.8);
      transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.4,0.64,1);
      flex-shrink: 0; border-radius: 16px;
    `;

    // Card Back
    const back = document.createElement('div');
    back.style.cssText = `
      position: absolute; inset: 0;
      background: linear-gradient(170deg, #2D1B4E 0%, #1a0e3d 40%, #231345 70%, #120a28 100%);
      border: 2px solid rgba(212,165,116,0.5); border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.6), inset 0 0 50px rgba(155,123,184,0.1);
      overflow: hidden; transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
    `;
    back.innerHTML = `
      <div style="position:absolute;inset:9px;border:1px solid rgba(212,165,116,0.28);border-radius:12px;pointer-events:none;"></div>
      <div style="position:absolute;inset:16px;border:1px dashed rgba(212,165,116,0.14);border-radius:8px;pointer-events:none;"></div>
      <svg viewBox="0 0 66 92" width="66" height="92" xmlns="http://www.w3.org/2000/svg" style="opacity:0.5;">
        <circle cx="33" cy="46" r="26" fill="none" stroke="#D4A574" stroke-width="1.5"/>
        <circle cx="33" cy="46" r="17" fill="none" stroke="#9B7BB8" stroke-width="1"/>
        <polygon points="33,24 37,38 52,38 40,47 44,61 33,52 22,61 26,47 14,38 29,38" fill="none" stroke="#D4A574" stroke-width="1.2"/>
        <circle cx="33" cy="46" r="4" fill="#D4A574" opacity="0.6"/>
        <line x1="33" y1="20" x2="33" y2="8" stroke="#F0D9B5" stroke-width="1"/>
        <line x1="33" y1="72" x2="33" y2="84" stroke="#F0D9B5" stroke-width="1"/>
        <line x1="7" y1="46" x2="-1" y2="46" stroke="#F0D9B5" stroke-width="1"/>
        <line x1="59" y1="46" x2="67" y2="46" stroke="#F0D9B5" stroke-width="1"/>
      </svg>
    `;
    wrap.appendChild(back);

    // Card Front — full colour SVG with mystic frame
    const front = document.createElement('div');
    front.style.cssText = `
      position: absolute; inset: 0;
      border: 2px solid rgba(212,165,116,0.55); border-radius: 16px;
      opacity: 0; pointer-events: none;
      transition: opacity 0.5s ease;
      overflow: hidden; background: #0a0510;
      box-shadow: inset 0 0 30px rgba(0,0,0,0.5);
    `;
    front.innerHTML = `
      <!-- Inner decorative border -->
      <div style="position:absolute;inset:6px;border:1px solid rgba(212,165,116,0.18);border-radius:12px;pointer-events:none;z-index:5;"></div>
      <div style="position:absolute;inset:10px;border:1px dashed rgba(212,165,116,0.1);border-radius:9px;pointer-events:none;z-index:5;"></div>
      <!-- Corner ornaments -->
      <svg style="position:absolute;top:8px;left:8px;width:14px;height:14px;z-index:5;opacity:0.5;" viewBox="0 0 14 14"><path d="M0 4 L0 0 L4 0" stroke="#D4A574" stroke-width="1" fill="none"/><circle cx="2" cy="2" r="1" fill="#D4A574"/></svg>
      <svg style="position:absolute;top:8px;right:8px;width:14px;height:14px;z-index:5;opacity:0.5;" viewBox="0 0 14 14"><path d="M10 0 L14 0 L14 4" stroke="#D4A574" stroke-width="1" fill="none"/><circle cx="12" cy="2" r="1" fill="#D4A574"/></svg>
      <svg style="position:absolute;bottom:8px;left:8px;width:14px;height:14px;z-index:5;opacity:0.5;" viewBox="0 0 14 14"><path d="M0 10 L0 14 L4 14" stroke="#D4A574" stroke-width="1" fill="none"/><circle cx="2" cy="12" r="1" fill="#D4A574"/></svg>
      <svg style="position:absolute;bottom:8px;right:8px;width:14px;height:14px;z-index:5;opacity:0.5;" viewBox="0 0 14 14"><path d="M10 14 L14 14 L14 10" stroke="#D4A574" stroke-width="1" fill="none"/><circle cx="12" cy="12" r="1" fill="#D4A574"/></svg>
      <!-- SVG fills card fully -->
      <div style="position:absolute;inset:0;z-index:1;">${art.svg.replace('viewBox="0 0 100 140"', 'viewBox="0 0 100 140" style="width:100%;height:100%;"')}</div>
      <!-- Vignette overlay for mystery -->
      <div style="position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(ellipse at center, transparent 50%, rgba(10,5,16,0.5) 100%);"></div>
      <!-- Bottom gradient for text readability -->
      <div style="position:absolute;bottom:0;left:0;right:0;height:60px;background:linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);z-index:3;border-radius:0 0 14px 14px;"></div>
      <!-- Position label at bottom (above card name) -->
      <div style="position:absolute;bottom:42px;left:0;right:0;text-align:center;font-size:0.48rem;color:rgba(212,165,116,0.85);letter-spacing:0.28em;text-transform:uppercase;z-index:4;font-family:Georgia,serif;">${position}</div>
      <!-- Divider line -->
      <div style="position:absolute;bottom:38px;left:35%;right:35%;height:1px;background:linear-gradient(to right, transparent, rgba(212,165,116,0.4), transparent);z-index:4;"></div>
      <!-- Card name bottom -->
      <div style="position:absolute;bottom:14px;left:0;right:0;text-align:center;z-index:4;">
        <div style="font-size:0.74rem;color:#F0D9B5;font-weight:700;font-family:Georgia,serif;letter-spacing:0.06em;text-shadow:0 1px 4px rgba(0,0,0,0.8);">${card.name}</div>
        <div style="font-size:0.44rem;color:rgba(212,165,116,0.7);margin-top:3px;letter-spacing:0.08em;">${(card.upright||'').split(',').slice(0,2).join(' · ')}</div>
      </div>
    `;
    wrap.appendChild(front);

    wrap.addEventListener('click', function() {
      if (wrap.dataset.revealed === '1') return;
      revealCard(wrap, back, front);
    });

    return wrap;
  }

  /* ===== Reveal ===== */
  function revealCard(wrap, back, front) {
    wrap.dataset.revealed = '1';
    revealedCount++;
    wrap.style.transform = 'translateY(-8px) scale(1.04)';

    back.style.transition = 'all 0.4s ease';
    back.style.opacity = '0';
    back.style.transform = 'rotateY(90deg)';

    setTimeout(() => {
      back.style.display = 'none';
      front.style.pointerEvents = 'auto';
      front.style.opacity = '1';
      wrap.style.boxShadow = '0 0 40px rgba(212,165,116,0.4), 0 0 80px rgba(155,123,184,0.2)';

      if (revealedCount === 3) {
        const btn = document.getElementById('tarot-proceed');
        if (btn) {
          btn.disabled = false;
          btn.style.animation = 'tarotGlow 2s ease-in-out infinite';
        }
      }
    }, 320);
  }

  /* ===== BIG Fan Shuffle Animation ===== */
  function fanShuffleAnimation(container, callback) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.45;

    const deck = [];
    const COUNT = 9;
    const W = 110, H = 165;

    // Create deck cards
    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        left: ${cx}px; top: ${cy}px;
        width: ${W}px; height: ${H}px;
        background: linear-gradient(170deg, #2D1B4E 0%, #1a0e3d 40%, #180c36 100%);
        border: 2px solid rgba(212,165,116,0.5);
        border-radius: 13px; z-index: 500;
        pointer-events: none;
        transform: translate(-50%,-50%) rotate(0deg);
        transform-origin: 50% 75%;
        transition: transform 0.65s cubic-bezier(0.34,1.2,0.64,1);
        box-shadow: 0 8px 30px rgba(0,0,0,0.7);
        display: flex; align-items: center; justify-content: center;
      `;
      el.innerHTML = `<svg viewBox="0 0 50 70" width="50" height="70" xmlns="http://www.w3.org/2000/svg" style="opacity:0.4;">
        <circle cx="25" cy="35" r="18" fill="none" stroke="#D4A574" stroke-width="1.2"/>
        <polygon points="25,18 28.5,28.5 40,28.5 31,35.5 34,46 25,39 16,46 19,35.5 10,28.5 21.5,28.5" fill="none" stroke="#D4A574" stroke-width="1"/>
      </svg>`;
      document.body.appendChild(el);
      deck.push(el);
    }

    // Phase 1: Big fan out (dramatic spread)
    setTimeout(() => {
      deck.forEach((el, i) => {
        const angle = -60 + (120 / (COUNT - 1)) * i;
        const spread = 20 + Math.abs(i - (COUNT-1)/2) * 8;
        el.style.transition = `transform 0.7s cubic-bezier(0.34,1.3,0.64,1)`;
        el.style.transform = `translate(-50%, calc(-50% - ${spread}px)) rotate(${angle}deg)`;
      });
    }, 50);

    // Phase 2: Riffle shuffle — split into two halves, interleave dramatically
    setTimeout(() => {
      deck.forEach((el, i) => {
        const goLeft = i < Math.ceil(COUNT / 2);
        const offset = goLeft ? -55 : 55;
        const tilt = goLeft ? -18 : 18;
        el.style.transition = 'transform 0.3s ease-in';
        el.style.transform = `translate(calc(-50% + ${offset}px), -50%) rotate(${tilt}deg)`;
      });
    }, 850);

    // Phase 3: Come together fast (riffle completion)
    setTimeout(() => {
      deck.forEach((el, i) => {
        const stagger = i * 45;
        setTimeout(() => {
          el.style.transition = 'transform 0.22s ease-out';
          el.style.transform = `translate(-50%, -50%) rotate(${(Math.random()-0.5)*12}deg)`;
        }, stagger);
      });
    }, 1200);

    // Phase 4: Second fan out (show off the deck)
    setTimeout(() => {
      deck.forEach((el, i) => {
        const angle = -50 + (100 / (COUNT - 1)) * i;
        el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.2,0.64,1)';
        el.style.transform = `translate(-50%, calc(-50% - 15px)) rotate(${angle}deg)`;
      });
    }, 1700);

    // Phase 5: Collapse to single deck
    setTimeout(() => {
      deck.forEach((el) => {
        el.style.transition = 'transform 0.4s ease-in-out';
        el.style.transform = `translate(-50%, -50%) rotate(0deg)`;
      });
    }, 2400);

    // Phase 6: Fly UPWARD off screen (dramatic)
    setTimeout(() => {
      deck.forEach((el, i) => {
        const xSpread = (Math.random() - 0.5) * 200;
        el.style.transition = `transform 0.55s ease-in, opacity 0.4s ease`;
        el.style.transform = `translate(calc(-50% + ${xSpread}px), calc(-50% - ${window.innerHeight * 0.8}px)) rotate(${(Math.random()-0.5)*60}deg) scale(0.5)`;
        el.style.opacity = '0';
      });
    }, 3000);

    // Phase 7: Cleanup and callback
    setTimeout(() => {
      deck.forEach(el => el.remove());
      callback();
    }, 3600);
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

    const spread = document.getElementById('tarot-spread');
    if (!spread) return;
    spread.innerHTML = '';
    spread.style.cssText = `
      display:flex; gap:22px; justify-content:center; align-items:center;
      flex-wrap:nowrap; padding:28px 16px; position:relative; min-height:260px;
    `;

    const shuffled = [...(D.tarotDeck || [])].sort(() => Math.random() - 0.5);
    drawnCards = shuffled.slice(0, 3);
    const positions = ['Past', 'Present', 'Future'];

    fanShuffleAnimation(spread, function() {
      drawnCards.forEach((card, i) => {
        const el = createCardEl(card, positions[i], i);
        spread.appendChild(el);
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        }, i * 200);
      });

      // Instruction below the cards (outside flex container)
      let instruction = document.getElementById('tarot-instruction');
      if (!instruction) {
        instruction = document.createElement('div');
        instruction.id = 'tarot-instruction';
        spread.parentNode.insertBefore(instruction, spread.nextSibling);
      }
      instruction.style.cssText = 'text-align:center;color:rgba(212,165,116,0.85);font-family:Georgia,serif;font-size:0.92rem;letter-spacing:0.08em;margin-top:20px;opacity:0;transform:translateY(10px);transition:opacity 0.6s ease,transform 0.6s ease;';
      instruction.textContent = 'Tap each card to reveal your destiny...';
      setTimeout(() => {
        instruction.style.opacity = '1';
        instruction.style.transform = 'translateY(0)';
      }, 800);
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
