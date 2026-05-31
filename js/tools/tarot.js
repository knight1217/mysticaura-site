/* ===== TAROT TOOL — v6 Big Shuffle + Rich Art ===== */
Tools.tarot = (function() {
  const D = window.__DATA__;
  let drawnCards = [];
  let revealedCount = 0;

  /* ===== Rich SVG Art — Rider-Waite-Smith Inspired ===== */
  const CARD_ART = {
    /* ===== 0 · THE FOOL ===== */
    'The Fool': {
      bg: ['#2a5588','#5a90c8'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c0_sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#4a88cc"/><stop offset="40%" stop-color="#8ab8e8"/><stop offset="100%" stop-color="#c8ddf0"/></linearGradient><linearGradient id="c0_mtn" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#8899aa"/><stop offset="100%" stop-color="#556677"/></linearGradient><radialGradient id="c0_sun" cx="50%" cy="50%"><stop offset="0%" stop-color="#fff8c0"/><stop offset="60%" stop-color="#ffd700"/><stop offset="100%" stop-color="#ffa500"/></radialGradient></defs>
<rect width="100" height="140" fill="url(#c0_sky)"/>
<circle cx="78" cy="24" r="16" fill="url(#c0_sun)" opacity="0.9"/>
<path d="M0 68 L20 50 L40 60 L60 40 L80 52 L100 38 L100 140 L0 140Z" fill="url(#c0_mtn)" opacity="0.5"/>
<path d="M0 105 L30 68 L55 78 L100 55 L100 140 L0 140Z" fill="#5a9a3a" opacity="0.7"/>
<path d="M0 115 L30 82 L55 92 L100 72 L100 140 L0 140Z" fill="#4a7a28"/>
<path d="M30 68 L45 55 L60 68 Q45 62 30 68Z" fill="#e8e0d0" opacity="0.7"/>
<path d="M42 56 Q50 50 58 56 L55 80 Q50 84 45 80 Z" fill="#e04848"/>
<circle cx="50" cy="52" r="6" fill="#f5d5b8"/>
<path d="M46 56 Q50 50 54 56" fill="#d04040" stroke="#a03030" stroke-width="0.5"/>
<line x1="55" y1="62" x2="65" y2="42" stroke="#7a5a2a" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="66" cy="40" r="3" fill="#ffd700"/>
<path d="M50 58 L52 64 M48 58 L46 64" stroke="#f5d5b8" stroke-width="2" stroke-linecap="round"/>
<ellipse cx="30" cy="96" rx="10" ry="6" fill="#c8a868"/>
<circle cx="22" cy="92" r="5" fill="#c8a868"/>
<circle cx="20" cy="90" r="1" fill="#3a2a0a"/>
<circle cx="25" cy="88" r="1.2" fill="#3a2a0a"/>
<path d="M22 92 L20 94 M24 91 L26 93" stroke="#3a2a0a" stroke-width="0.8"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="7" fill="#D4A574" font-family="Georgia,serif">0</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">THE FOOL</text>
</svg>`
    },
    /* ===== I · THE MAGICIAN ===== */
    'The Magician': {
      bg: ['#6b1414','#a82828'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="c1_bg" cx="50%" cy="40%"><stop offset="0%" stop-color="#8a1818"/><stop offset="100%" stop-color="#1a0404"/></radialGradient><linearGradient id="c1_table" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#7a4a20"/><stop offset="100%" stop-color="#4a2a10"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c1_bg)"/>
<path d="M28 25 C28 17 36 17 42 25 C48 33 56 33 62 25 C68 17 76 17 76 25 C76 33 68 33 62 25 C56 17 48 17 42 25 C36 33 28 33 28 25Z" fill="none" stroke="#ffd700" stroke-width="2.2"/>
<path d="M10 100 Q20 90 15 82 Q22 88 25 80 Q28 90 35 85 Q30 95 25 100Z" fill="#c02040" opacity="0.5"/>
<path d="M80 104 Q88 95 90 85 Q82 90 78 82 Q76 94 70 90 Q75 98 80 104Z" fill="#c02040" opacity="0.5"/>
<circle cx="50" cy="50" r="7" fill="#f5d5b8"/>
<rect x="44" y="57" width="12" height="16" rx="3" fill="#c02020"/>
<path d="M44 57 Q50 52 56 57" fill="#d83030"/>
<line x1="56" y1="56" x2="66" y2="36" stroke="#8B6914" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="66" cy="34" r="4" fill="#ffd700"/>
<path d="M63 32 L66 25 L69 32Z" fill="#ffe066"/>
<rect x="18" y="82" width="64" height="8" rx="3" fill="url(#c1_table)"/>
<path d="M22 82 L18 78 L26 78Z" fill="#e8c060"/>
<rect x="36" y="78" width="8" height="8" rx="1" fill="#d04040"/>
<circle cx="50" cy="82" r="4" fill="#4a90d9"/>
<rect x="60" y="78" width="8" height="10" rx="1" fill="#d0c0a0"/>
<path d="M68 78 L72 76 L70 82Z" fill="#40a040"/>
<circle cx="15" cy="16" r="1.5" fill="#ffe066" opacity="0.8"/>
<circle cx="82" cy="22" r="1.5" fill="#ffe066" opacity="0.7"/>
<circle cx="88" cy="40" r="1" fill="#ffe066" opacity="0.5"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="7" fill="#D4A574" font-family="Georgia,serif">I</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="5.5" fill="#D4A574" font-family="Georgia,serif">THE MAGICIAN</text>
</svg>`
    },
    /* ===== II · THE HIGH PRIESTESS ===== */
    'The High Priestess': {
      bg: ['#0a1040','#1a1870'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c2_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0a0c30"/><stop offset="50%" stop-color="#141850"/><stop offset="100%" stop-color="#0a0c20"/></linearGradient><radialGradient id="c2_moon" cx="50%" cy="50%"><stop offset="0%" stop-color="#e8e8ff"/><stop offset="100%" stop-color="#6068b0"/></radialGradient></defs>
<rect width="100" height="140" fill="url(#c2_bg)"/>
<circle cx="50" cy="22" r="22" fill="url(#c2_moon)" opacity="0.35"/>
<circle cx="50" cy="22" r="14" fill="#8890c8" opacity="0.3"/>
<rect x="8" y="26" width="14" height="76" rx="2" fill="#1a1850"/>
<text x="15" y="68" text-anchor="middle" font-size="8" fill="#d0d0e0" opacity="0.7">B</text>
<rect x="78" y="26" width="14" height="76" rx="2" fill="#1a1850"/>
<text x="85" y="68" text-anchor="middle" font-size="8" fill="#e8c060" opacity="0.7">J</text>
<path d="M22 28 Q50 40 78 28 L78 105 Q50 95 22 105Z" fill="#3030a0" opacity="0.4"/>
<circle cx="50" cy="50" r="7.5" fill="#f5d5b8"/>
<path d="M36 58 Q50 50 64 58 L64 98 Q50 104 36 98Z" fill="#202088"/>
<path d="M40 43 L50 36 L60 43" fill="none" stroke="#ffd700" stroke-width="2"/>
<circle cx="50" cy="36" r="3.5" fill="#ffd700"/>
<circle cx="42" cy="45" r="2" fill="#ffe066"/>
<circle cx="58" cy="45" r="2" fill="#ffe066"/>
<rect x="42" y="76" width="16" height="20" rx="3" fill="#f5d5b8" opacity="0.7"/>
<text x="50" y="89" text-anchor="middle" font-size="5" fill="#4a2060" font-family="Georgia,serif">TORA</text>
<circle cx="14" cy="16" r="1.5" fill="#c0d0ff" opacity="0.8"/>
<circle cx="86" cy="18" r="1" fill="#c0d0ff" opacity="0.6"/>
<circle cx="90" cy="34" r="1.5" fill="#c0d0ff" opacity="0.5"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6.5" fill="#D4A574" font-family="Georgia,serif">II</text>
<rect x="8" y="122" width="84" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="5" fill="#D4A574" font-family="Georgia,serif">THE HIGH PRIESTESS</text>
</svg>`
    },
    /* ===== III · THE EMPRESS ===== */
    'The Empress': {
      bg: ['#2a5a2a','#5a9a4a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c3_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#87CEEB"/><stop offset="50%" stop-color="#7aba60"/><stop offset="100%" stop-color="#3a6a22"/></linearGradient><linearGradient id="c3_throne" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#c8a050"/><stop offset="100%" stop-color="#8B6914"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c3_bg)"/>
<path d="M0 88 Q25 78 50 82 Q75 86 100 78 L100 140 L0 140Z" fill="#4a8a2a"/>
<path d="M0 102 Q30 92 50 96 Q70 100 100 92 L100 140 L0 140Z" fill="#2a5a18"/>
<path d="M10 90 L15 84 L20 90 M85 86 L90 80 L95 86" fill="none" stroke="#40a040" stroke-width="1.5"/>
<rect x="28" y="68" width="44" height="34" rx="4" fill="url(#c3_throne)"/>
<circle cx="50" cy="52" r="8" fill="#f5d5b8"/>
<path d="M34 63 Q50 56 66 63 L66 105 Q50 110 34 105Z" fill="#e8c040"/>
<path d="M40 44 L44 36 L50 42 L56 36 L60 44" fill="none" stroke="#ffd700" stroke-width="2"/>
<circle cx="44" cy="40" r="2" fill="#ffd700"/>
<circle cx="50" cy="38" r="2.5" fill="#ffd700"/>
<circle cx="56" cy="40" r="2" fill="#ffd700"/>
<line x1="66" y1="62" x2="80" y2="44" stroke="#8B6914" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="81" cy="42" r="4" fill="#ffd700"/>
<path d="M45 72 C45 66 50 64 50 68 C50 64 55 66 55 72 C55 80 50 84 50 84 C50 84 45 80 45 72Z" fill="#40a048"/>
<circle cx="16" cy="84" r="4" fill="#ff80b0"/>
<circle cx="84" cy="80" r="3.5" fill="#ffd700"/>
<circle cx="10" cy="90" r="3" fill="#ff6088"/>
<circle cx="88" cy="88" r="3" fill="#ffffff" opacity="0.8"/>
<path d="M0 60 L20 40 L40 50 L70 35 L100 48 L100 88 Q50 78 0 88Z" fill="#5a8a4a" opacity="0.3"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6.5" fill="#D4A574" font-family="Georgia,serif">III</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">THE EMPRESS</text>
</svg>`
    },
    /* ===== IV · THE EMPEROR ===== */
    'The Emperor': {
      bg: ['#6b1818','#a02020'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c4_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#901818"/><stop offset="100%" stop-color="#200404"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c4_bg)"/>
<path d="M0 75 L25 45 L40 60 L60 38 L80 55 L100 42 L100 140 L0 140Z" fill="#4a2a18" opacity="0.5"/>
<path d="M55 38 L60 28 L65 38Z" fill="#e8e8e8" opacity="0.3"/>
<rect x="24" y="65" width="52" height="42" rx="3" fill="#5a3a18"/>
<rect x="22" y="60" width="56" height="10" rx="3" fill="#8B6914"/>
<rect x="20" y="58" width="8" height="50" rx="2" fill="#6a4a20"/>
<rect x="72" y="58" width="8" height="50" rx="2" fill="#6a4a20"/>
<ellipse cx="24" cy="60" rx="5" ry="4" fill="#c8a060"/>
<ellipse cx="76" cy="60" rx="5" ry="4" fill="#c8a060"/>
<path d="M21 58 Q24 54 28 58 M72 58 Q76 54 80 58" fill="none" stroke="#8a6a30" stroke-width="1.5"/>
<circle cx="50" cy="44" r="8" fill="#f5d5b8"/>
<path d="M36 52 Q50 46 64 52 L64 94 Q50 100 36 94Z" fill="#8a1818"/>
<path d="M36 52 Q50 60 64 52" fill="#b02020"/>
<path d="M38 78 L44 55 L50 78 L56 55 L62 78" fill="none" stroke="#ffd700" stroke-width="2"/>
<circle cx="44" cy="57" r="2" fill="#ffd700"/>
<circle cx="50" cy="56" r="2.5" fill="#ffd700"/>
<circle cx="56" cy="57" r="2" fill="#ffd700"/>
<line x1="18" y1="58" x2="18" y2="96" stroke="#8B6914" stroke-width="2.5" stroke-linecap="round"/>
<path d="M12 62 L24 62 M12 68 L22 68" stroke="#8B6914" stroke-width="1.8"/>
<circle cx="18" cy="55" r="3.5" fill="#ffd700"/>
<circle cx="74" cy="72" r="7" fill="#ffd700" opacity="0.85"/>
<path d="M70 72 Q74 66 78 72" fill="none" stroke="#a08020" stroke-width="1.2"/>
<line x1="74" y1="65" x2="74" y2="79" stroke="#a08020" stroke-width="1.2"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="7" fill="#D4A574" font-family="Georgia,serif">IV</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">THE EMPEROR</text>
</svg>`
    },
    /* ===== V · THE HIEROPHANT ===== */
    'The Hierophant': {
      bg: ['#1a1a48','#2a2870'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c5_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#181848"/><stop offset="100%" stop-color="#0a0a28"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c5_bg)"/>
<rect x="12" y="24" width="12" height="78" rx="2" fill="#202058"/>
<rect x="76" y="24" width="12" height="78" rx="2" fill="#202058"/>
<line x1="18" y1="24" x2="24" y2="24" stroke="#ffd700" stroke-width="1.5"/>
<line x1="76" y1="24" x2="82" y2="24" stroke="#ffd700" stroke-width="1.5"/>
<rect x="30" y="72" width="40" height="34" rx="3" fill="#5a3a18"/>
<path d="M30 72 Q50 64 70 72" fill="#7a4a28"/>
<circle cx="50" cy="52" r="8" fill="#f5d5b8"/>
<path d="M36 60 Q50 54 64 60 L64 98 Q50 104 36 98Z" fill="#e04848"/>
<path d="M42 40 L46 33 L50 39 L54 33 L58 40" fill="none" stroke="#ffd700" stroke-width="2"/>
<path d="M38 44 L50 36 L62 44Z" fill="#ffd700" opacity="0.5" stroke="#ffd700" stroke-width="1.5"/>
<circle cx="50" cy="34" r="2.5" fill="#ffd700"/>
<line x1="44" y1="62" x2="44" y2="106" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/>
<line x1="38" y1="80" x2="50" y2="80" stroke="#ffd700" stroke-width="1.5"/>
<line x1="44" y1="70" x2="50" y2="70" stroke="#ffd700" stroke-width="1.5"/>
<circle cx="44" cy="60" r="3" fill="#ffd700"/>
<circle cx="22" cy="88" r="5" fill="#f5d5b8"/>
<rect x="16" y="93" width="12" height="14" rx="2" fill="#5050a0"/>
<circle cx="78" cy="88" r="5" fill="#f5d5b8"/>
<rect x="72" y="93" width="12" height="14" rx="2" fill="#5050a0"/>
<path d="M18 98 L20 88 L24 98 M78 98 L80 88 L84 98" fill="none" stroke="#8888c0" stroke-width="1"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="7" fill="#D4A574" font-family="Georgia,serif">V</text>
<rect x="8" y="122" width="84" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="5" fill="#D4A574" font-family="Georgia,serif">THE HIEROPHANT</text>
</svg>`
    },
    /* ===== VI · THE LOVERS ===== */
    'The Lovers': {
      bg: ['#5a2850','#8a4080'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c6_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffe8f0"/><stop offset="45%" stop-color="#90c8f0"/><stop offset="100%" stop-color="#5a9a3a"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c6_bg)"/>
<circle cx="50" cy="14" r="12" fill="#ffe066" opacity="0.6"/>
<ellipse cx="50" cy="24" rx="24" ry="11" fill="#ffffff" opacity="0.75"/>
<circle cx="50" cy="20" r="7" fill="#f5d5b8"/>
<path d="M40 26 Q34 22 28 28" fill="none" stroke="#ffd700" stroke-width="2.5"/>
<path d="M60 26 Q66 22 72 28" fill="none" stroke="#ffd700" stroke-width="2.5"/>
<path d="M0 98 Q50 90 100 98 L100 140 L0 140Z" fill="#4a8a2a"/>
<path d="M0 108 Q50 100 100 108 L100 140 L0 140Z" fill="#2a5a18"/>
<path d="M15 98 L25 70 L35 98Z" fill="#7a7a8a"/>
<path d="M22 72 L25 64 L28 72Z" fill="#e8e8e8" opacity="0.7"/>
<circle cx="32" cy="74" r="6" fill="#f5d5b8"/>
<path d="M24 80 Q32 74 40 80 L40 102 Q32 106 24 102Z" fill="#5050d0"/>
<circle cx="68" cy="74" r="6" fill="#f5d5b8"/>
<path d="M60 80 Q68 74 76 80 L76 102 Q68 106 60 102Z" fill="#e080a0"/>
<line x1="82" y1="102" x2="82" y2="78" stroke="#5a3a18" stroke-width="2.5"/>
<circle cx="82" cy="75" r="5" fill="#ff5020"/>
<circle cx="76" cy="82" r="3.5" fill="#ff8040"/>
<circle cx="88" cy="82" r="3.5" fill="#ff8040"/>
<path d="M80 78 Q82 88 78 94" fill="none" stroke="#40c040" stroke-width="1.5"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="7" fill="#D4A574" font-family="Georgia,serif">VI</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">THE LOVERS</text>
</svg>`
    },
    /* ===== VII · THE CHARIOT ===== */
    'The Chariot': {
      bg: ['#1a2058','#283080'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c7_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#181848"/><stop offset="100%" stop-color="#080818"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c7_bg)"/>
<rect x="28" y="48" width="8" height="22" fill="#282858" opacity="0.6"/>
<rect x="44" y="42" width="10" height="28" fill="#282858" opacity="0.6"/>
<rect x="60" y="50" width="8" height="20" fill="#282858" opacity="0.6"/>
<path d="M22 58 L50 48 L78 58" fill="none" stroke="#ffd700" stroke-width="2.5"/>
<rect x="22" y="58" width="56" height="12" fill="#2828a0" opacity="0.6"/>
<circle cx="30" cy="64" r="2" fill="#ffe066"/>
<circle cx="50" cy="61" r="2.5" fill="#ffe066"/>
<circle cx="70" cy="64" r="2" fill="#ffe066"/>
<rect x="18" y="70" width="64" height="38" rx="3" fill="#202070"/>
<rect x="18" y="70" width="64" height="8" rx="2" fill="#3030a0"/>
<path d="M18 70 L50 60 L82 70" fill="none" stroke="#ffd700" stroke-width="1.8"/>
<circle cx="50" cy="52" r="8" fill="#f5d5b8"/>
<path d="M40 60 Q50 55 60 60 L60 76 Q50 80 40 76Z" fill="#c8c8d8"/>
<path d="M40 55 L50 46 L60 55" fill="none" stroke="#ffd700" stroke-width="2"/>
<circle cx="50" cy="46" r="3.5" fill="#ffd700"/>
<ellipse cx="30" cy="114" rx="14" ry="8" fill="#e0e0e0"/>
<circle cx="20" cy="110" r="5" fill="#e0e0e0"/>
<ellipse cx="70" cy="114" rx="14" ry="8" fill="#3a3a3a"/>
<circle cx="80" cy="110" r="5" fill="#3a3a3a"/>
<circle cx="18" cy="16" r="2" fill="#ffe066"/>
<circle cx="50" cy="12" r="2.5" fill="#ffe066"/>
<circle cx="82" cy="18" r="1.5" fill="#ffe066"/>
<circle cx="10" cy="30" r="1.5" fill="#c0c8e0" opacity="0.6"/>
<circle cx="90" cy="28" r="1.5" fill="#c0c8e0" opacity="0.6"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6.5" fill="#D4A574" font-family="Georgia,serif">VII</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="5.5" fill="#D4A574" font-family="Georgia,serif">THE CHARIOT</text>
</svg>`
    },
    /* ===== VIII · STRENGTH ===== */
    'Strength': {
      bg: ['#6a5a1a','#a08830'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c8_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffe566"/><stop offset="45%" stop-color="#88c8f0"/><stop offset="100%" stop-color="#4a8a2a"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c8_bg)"/>
<path d="M0 100 Q50 92 100 100 L100 140 L0 140Z" fill="#4a8a2a"/>
<path d="M50 105 L60 74 L70 105Z" fill="#788a9a"/>
<path d="M57 78 L60 66 L63 78Z" fill="#e8e8e8" opacity="0.8"/>
<path d="M32 26 C32 20 38 20 44 26 C50 32 56 32 62 26 C68 20 74 20 74 26 C74 32 68 32 62 26 C56 20 50 20 44 26 C38 32 32 32 32 26Z" fill="#ffd700"/>
<circle cx="42" cy="48" r="8" fill="#f5d5b8"/>
<path d="M30 56 Q42 50 54 56 L54 90 Q42 96 30 90Z" fill="#e8f0e8"/>
<path d="M34 42 Q42 36 50 42" fill="none" stroke="#ff80a0" stroke-width="3"/>
<circle cx="38" cy="40" r="2.5" fill="#ff80a0"/>
<circle cx="42" cy="37" r="3" fill="#ffd700"/>
<circle cx="46" cy="40" r="2.5" fill="#ff80a0"/>
<ellipse cx="64" cy="82" rx="20" ry="13" fill="#c89040"/>
<circle cx="52" cy="74" r="11" fill="#c89040"/>
<path d="M44 68 Q52 60 60 68Z" fill="#a87030"/>
<circle cx="48" cy="66" r="4" fill="#b88038"/>
<circle cx="58" cy="64" r="4" fill="#b88038"/>
<circle cx="44" cy="72" r="3.5" fill="#b88038"/>
<circle cx="55" cy="70" r="3" fill="#b88038"/>
<line x1="54" y1="66" x2="50" y2="72" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">VIII</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="5.5" fill="#D4A574" font-family="Georgia,serif">STRENGTH</text>
</svg>`
    },
    /* ===== IX · THE HERMIT ===== */
    'The Hermit': {
      bg: ['#1a1a30','#2a2a48'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c9_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#181828"/><stop offset="100%" stop-color="#080810"/></linearGradient><radialGradient id="c9_lantern" cx="50%" cy="50%"><stop offset="0%" stop-color="#ffe066"/><stop offset="40%" stop-color="#ffc820"/><stop offset="100%" stop-color="#ff9000" stop-opacity="0"/></radialGradient></defs>
<rect width="100" height="140" fill="url(#c9_bg)"/>
<path d="M0 95 L35 45 L50 60 L70 28 L100 70 L100 140 L0 140Z" fill="#2a2a40"/>
<path d="M55 60 L70 30 L85 60Z" fill="#4a4a68"/>
<path d="M63 35 L70 20 L77 35Z" fill="#e0e0f0" opacity="0.8"/>
<circle cx="68" cy="52" r="18" fill="url(#c9_lantern)" opacity="0.5"/>
<circle cx="68" cy="52" r="8" fill="#ffe066"/>
<rect x="64" y="44" width="8" height="16" rx="2" fill="#7a5a20" opacity="0.7"/>
<path d="M64 46 L68 42 L72 46" fill="none" stroke="#ffd700" stroke-width="1"/>
<circle cx="38" cy="54" r="7" fill="#f5d5b8"/>
<path d="M24 63 Q38 55 52 63 L55 105 Q38 112 21 105Z" fill="#5a5a78"/>
<path d="M28 50 Q38 40 48 50 Q44 56 32 56Z" fill="#4a4a68"/>
<line x1="40" y1="68" x2="60" y2="48" stroke="#7a5a20" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="16" cy="16" r="2" fill="#c0c8e0" opacity="0.8"/>
<circle cx="84" cy="12" r="1.5" fill="#c0c8e0" opacity="0.6"/>
<circle cx="90" cy="26" r="1" fill="#c0c8e0" opacity="0.5"/>
<circle cx="20" cy="30" r="1.5" fill="#c0c8e0" opacity="0.5"/>
<circle cx="46" cy="14" r="1" fill="#c0c8e0" opacity="0.4"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="7" fill="#D4A574" font-family="Georgia,serif">IX</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">THE HERMIT</text>
</svg>`
    },
    /* ===== X · WHEEL OF FORTUNE ===== */
    'Wheel of Fortune': {
      bg: ['#1a4a2a','#2a6a3a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="c10_bg" cx="50%" cy="50%"><stop offset="0%" stop-color="#3a8a4a"/><stop offset="100%" stop-color="#0a1a0a"/></radialGradient></defs>
<rect width="100" height="140" fill="url(#c10_bg)"/>
<rect x="4" y="4" width="18" height="18" rx="3" fill="#141830" opacity="0.7"/>
<path d="M9 14 L11 8 L13 16 L15 6 L17 14" fill="none" stroke="#ffe066" stroke-width="1.2"/>
<rect x="78" y="4" width="18" height="18" rx="3" fill="#141830" opacity="0.7"/>
<path d="M84 18 L82 14 L86 14Z" fill="none" stroke="#ffd700" stroke-width="1.2"/>
<path d="M84 14 Q86 10 88 14" fill="none" stroke="#ffd700" stroke-width="1"/>
<rect x="4" y="118" width="18" height="18" rx="3" fill="#141830" opacity="0.7"/>
<circle cx="13" cy="126" r="5" fill="none" stroke="#ffd700" stroke-width="1.2"/>
<path d="M8 128 Q10 122 13 128" fill="none" stroke="#ffd700" stroke-width="1"/>
<rect x="78" y="118" width="18" height="18" rx="3" fill="#141830" opacity="0.7"/>
<circle cx="87" cy="124" r="5" fill="none" stroke="#ffd700" stroke-width="1.2"/>
<path d="M84 122 Q87 118 90 122" fill="none" stroke="#ffd700" stroke-width="1"/>
<circle cx="50" cy="66" r="34" fill="none" stroke="#ffd700" stroke-width="2.5"/>
<circle cx="50" cy="66" r="24" fill="none" stroke="#d0a060" stroke-width="1.5"/>
<line x1="50" y1="32" x2="50" y2="100" stroke="#d0a060" stroke-width="1.2" opacity="0.6"/>
<line x1="16" y1="66" x2="84" y2="66" stroke="#d0a060" stroke-width="1.2" opacity="0.6"/>
<line x1="26" y1="42" x2="74" y2="90" stroke="#d0a060" stroke-width="1.2" opacity="0.6"/>
<line x1="74" y1="42" x2="26" y2="90" stroke="#d0a060" stroke-width="1.2" opacity="0.6"/>
<circle cx="50" cy="66" r="9" fill="#ffd700"/>
<circle cx="50" cy="66" r="4.5" fill="#8B6914"/>
<text x="50" y="38" text-anchor="middle" font-size="6" fill="#ffd700" font-family="Georgia,serif" font-weight="bold">T</text>
<text x="80" y="69" text-anchor="middle" font-size="6" fill="#ffd700" font-family="Georgia,serif" font-weight="bold">A</text>
<text x="50" y="98" text-anchor="middle" font-size="6" fill="#ffd700" font-family="Georgia,serif" font-weight="bold">R</text>
<text x="20" y="69" text-anchor="middle" font-size="6" fill="#ffd700" font-family="Georgia,serif" font-weight="bold">O</text>
<path d="M78 40 Q84 54 76 64 Q70 72 76 80" fill="none" stroke="#40c040" stroke-width="2.5" stroke-linecap="round"/>
<path d="M24 78 L22 72 L26 72Z" fill="#d0a060"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="7" fill="#D4A574" font-family="Georgia,serif">X</text>
<rect x="6" y="122" width="88" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="5" fill="#D4A574" font-family="Georgia,serif">WHEEL of FORTUNE</text>
</svg>`
    },
    /* ===== XI · JUSTICE ===== */
    'Justice': {
      bg: ['#1a2048','#2a3070'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c11_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#201840"/><stop offset="100%" stop-color="#0a0820"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c11_bg)"/>
<rect x="10" y="18" width="12" height="92" rx="2" fill="#201860"/>
<rect x="78" y="18" width="12" height="92" rx="2" fill="#201860"/>
<path d="M22 18 Q50 28 78 18 L78 110 Q50 100 22 110Z" fill="#403890" opacity="0.5"/>
<rect x="30" y="72" width="40" height="36" rx="3" fill="#5a3a18"/>
<circle cx="50" cy="52" r="8" fill="#f5d5b8"/>
<path d="M36 60 Q50 54 64 60 L64 102 Q50 108 36 102Z" fill="#c83030"/>
<path d="M42 42 L50 34 L58 42" fill="none" stroke="#ffd700" stroke-width="2.5"/>
<circle cx="46" cy="42" r="2.5" fill="#ffd700"/>
<circle cx="50" cy="36" r="3" fill="#ffd700"/>
<circle cx="54" cy="42" r="2.5" fill="#ffd700"/>
<line x1="50" y1="52" x2="50" y2="36" stroke="#ffd700" stroke-width="1.8"/>
<line x1="28" y1="39" x2="72" y2="39" stroke="#ffd700" stroke-width="2"/>
<path d="M22 39 Q28 46 34 39Z" fill="#ffd700" opacity="0.3" stroke="#ffd700" stroke-width="1.2"/>
<path d="M66 39 Q72 46 78 39Z" fill="#ffd700" opacity="0.3" stroke="#ffd700" stroke-width="1.2"/>
<line x1="74" y1="56" x2="74" y2="106" stroke="#c8c8d8" stroke-width="2.5" stroke-linecap="round"/>
<line x1="68" y1="68" x2="80" y2="68" stroke="#c8c8d8" stroke-width="2"/>
<path d="M71 56 L74 50 L77 56Z" fill="#ffd700"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="7" fill="#D4A574" font-family="Georgia,serif">XI</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">JUSTICE</text>
</svg>`
    },
    /* ===== XII · THE HANGED MAN ===== */
    'The Hanged Man': {
      bg: ['#0a2018','#1a3828'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c12_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0a1810"/><stop offset="100%" stop-color="#183020"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c12_bg)"/>
<rect x="20" y="8" width="8" height="76" rx="2" fill="#5a3a18"/>
<rect x="72" y="8" width="8" height="76" rx="2" fill="#5a3a18"/>
<rect x="20" y="8" width="60" height="8" rx="2" fill="#5a3a18"/>
<circle cx="24" cy="8" r="10" fill="#2a6820"/>
<circle cx="76" cy="8" r="10" fill="#2a6820"/>
<line x1="50" y1="16" x2="50" y2="30" stroke="#c8a860" stroke-width="2"/>
<circle cx="50" cy="38" r="7" fill="#f5d5b8"/>
<circle cx="50" cy="38" r="13" fill="none" stroke="#ffd700" stroke-width="1.8" opacity="0.6"/>
<circle cx="50" cy="38" r="16" fill="none" stroke="#ffe066" stroke-width="0.8" opacity="0.3"/>
<path d="M40 28 Q50 22 60 28 L60 46 Q50 50 40 46Z" fill="#4088d0"/>
<line x1="44" y1="46" x2="40" y2="58" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<line x1="56" y1="46" x2="46" y2="58" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<line x1="40" y1="36" x2="30" y2="40" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<line x1="60" y1="36" x2="70" y2="40" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">XII</text>
<rect x="6" y="122" width="88" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="5" fill="#D4A574" font-family="Georgia,serif">THE HANGED MAN</text>
</svg>`
    },
    /* ===== XIII · DEATH ===== */
    'Death': {
      bg: ['#100818','#200828'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c13_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#180820"/><stop offset="100%" stop-color="#040008"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c13_bg)"/>
<circle cx="50" cy="72" r="20" fill="#ff7010" opacity="0.25"/>
<circle cx="50" cy="72" r="12" fill="#ffa040" opacity="0.3"/>
<path d="M0 115 Q50 108 100 115 L100 140 L0 140Z" fill="#182840"/>
<ellipse cx="38" cy="96" rx="18" ry="10" fill="#2a2a2a"/>
<circle cx="24" cy="88" r="6" fill="#2a2a2a"/>
<circle cx="40" cy="68" r="8" fill="#e0d8c8"/>
<circle cx="37" cy="66" r="1.8" fill="#1a1a1a"/>
<circle cx="43" cy="66" r="1.8" fill="#1a1a1a"/>
<path d="M36 72 Q40 74 44 72" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
<path d="M28 76 Q40 68 52 76 L52 96 Q40 102 28 96Z" fill="#181820"/>
<line x1="56" y1="64" x2="56" y2="88" stroke="#7a5a20" stroke-width="1.8"/>
<rect x="54" y="58" width="18" height="10" fill="#181820"/>
<circle cx="63" cy="63" r="3.5" fill="#f0f0f0"/>
<circle cx="63" cy="63" r="1.8" fill="#ffb0c0"/>
<circle cx="16" cy="102" r="5" fill="#f5d5b8"/>
<path d="M8 108 Q16 102 24 108 L24 124 Q16 128 8 124Z" fill="#ffe060"/>
<circle cx="50" cy="104" r="4" fill="#f5d5b8"/>
<rect x="44" y="108" width="12" height="14" rx="2" fill="#e0e0e0"/>
<circle cx="78" cy="100" r="4" fill="#f5d5b8"/>
<rect x="72" y="104" width="12" height="14" rx="2" fill="#c8c8d8"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">XIII</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6.5" fill="#D4A574" font-family="Georgia,serif">DEATH</text>
</svg>`
    },
    /* ===== XIV · TEMPERANCE ===== */
    'Temperance': {
      bg: ['#1a3850','#2a5870'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c14_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#88c8f0"/><stop offset="55%" stop-color="#5a9a5a"/><stop offset="100%" stop-color="#2a5a3a"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c14_bg)"/>
<path d="M0 105 Q50 97 100 105 L100 140 L0 140Z" fill="#285878"/>
<circle cx="15" cy="108" r="3" fill="#ff80a0"/>
<circle cx="85" cy="106" r="3" fill="#ffd700"/>
<path d="M28 140 Q50 115 72 140" fill="none" stroke="#8899aa" stroke-width="12" opacity="0.3"/>
<path d="M58 115 L70 88 L82 115Z" fill="#708090"/>
<path d="M64 91 L70 76 L76 91Z" fill="#e8e8e8" opacity="0.8"/>
<circle cx="50" cy="20" r="14" fill="#ffe066" opacity="0.7"/>
<circle cx="50" cy="20" r="8" fill="#ffd700"/>
<path d="M40 10 L50 4 L60 10Z" fill="#ffd700"/>
<circle cx="50" cy="54" r="7.5" fill="#f5d5b8"/>
<path d="M36 62 Q50 56 64 62 L64 94 Q50 100 36 94Z" fill="#f0f0ff" opacity="0.85"/>
<path d="M36 66 Q20 58 18 72 Q26 76 36 70" fill="#ffd700" opacity="0.7"/>
<path d="M64 66 Q80 58 82 72 Q74 76 64 70" fill="#ffd700" opacity="0.7"/>
<path d="M45 70 L50 64 L55 70Z" fill="#ffd700"/>
<rect x="26" y="76" width="12" height="14" rx="2" fill="#8898f0" opacity="0.7"/>
<rect x="62" y="72" width="12" height="14" rx="2" fill="#ffe066" opacity="0.7"/>
<path d="M38 82 Q50 76 62 78" fill="none" stroke="#88c8f0" stroke-width="2" opacity="0.7"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">XIV</text>
<rect x="8" y="122" width="84" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="5.5" fill="#D4A574" font-family="Georgia,serif">TEMPERANCE</text>
</svg>`
    },
    /* ===== XV · THE DEVIL ===== */
    'The Devil': {
      bg: ['#200808','#300808'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="c15_bg" cx="50%" cy="40%"><stop offset="0%" stop-color="#3a0808"/><stop offset="100%" stop-color="#080000"/></radialGradient></defs>
<rect width="100" height="140" fill="url(#c15_bg)"/>
<polygon points="50,10 57,30 76,30 61,40 67,60 50,50 33,60 39,40 24,30 43,30" fill="none" stroke="#ff4020" stroke-width="1.2" opacity="0.5"/>
<circle cx="50" cy="44" r="12" fill="#2a2a38"/>
<path d="M41 34 L36 22 L45 33" fill="#1a1a28"/>
<path d="M59 34 L64 22 L55 33" fill="#1a1a28"/>
<path d="M30 56 Q16 44 12 58 Q20 66 30 62" fill="#281838"/>
<path d="M70 56 Q84 44 88 58 Q80 66 70 62" fill="#281838"/>
<path d="M28 60 Q50 52 72 60 L72 92 Q50 100 28 92Z" fill="#2a2a38"/>
<circle cx="44" cy="43" r="2.5" fill="#ff4020"/>
<circle cx="56" cy="43" r="2.5" fill="#ff4020"/>
<path d="M44 53 Q50 58 56 53" fill="none" stroke="#ff4020" stroke-width="1.8"/>
<line x1="50" y1="88" x2="50" y2="104" stroke="#7a4a18" stroke-width="2.5"/>
<path d="M46 88 Q50 80 54 88 Q52 94 48 94Z" fill="#ff4020"/>
<circle cx="50" cy="84" r="4" fill="#ffe040"/>
<circle cx="30" cy="108" r="10" fill="none" stroke="#c8a060" stroke-width="2"/>
<line x1="30" y1="98" x2="36" y2="92" stroke="#c8a060" stroke-width="1.8"/>
<circle cx="70" cy="108" r="10" fill="none" stroke="#c8a060" stroke-width="2"/>
<line x1="70" y1="98" x2="64" y2="92" stroke="#c8a060" stroke-width="1.8"/>
<circle cx="30" cy="114" r="4" fill="#f5d5b8"/>
<path d="M24 118 Q30 114 36 118 L36 126 Q30 130 24 126Z" fill="#e0a0a0"/>
<circle cx="70" cy="114" r="4" fill="#f5d5b8"/>
<path d="M64 118 Q70 114 76 118 L76 126 Q70 130 64 126Z" fill="#e0a0a0"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="7" fill="#D4A574" font-family="Georgia,serif">XV</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="5.5" fill="#D4A574" font-family="Georgia,serif">THE DEVIL</text>
</svg>`
    },
    /* ===== XVI · THE TOWER ===== */
    'The Tower': {
      bg: ['#1a0a0a','#2a0a0a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c16_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#140606"/><stop offset="100%" stop-color="#080808"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c16_bg)"/>
<ellipse cx="28" cy="24" rx="20" ry="12" fill="#2a2a2a" opacity="0.8"/>
<ellipse cx="62" cy="18" rx="24" ry="14" fill="#3a3a3a" opacity="0.7"/>
<ellipse cx="78" cy="34" rx="16" ry="10" fill="#2a2a2a" opacity="0.6"/>
<path d="M56 12 L48 36 L55 36 L46 62" stroke="#ffe066" stroke-width="3.5" fill="none" stroke-linecap="round"/>
<path d="M56 12 L48 36 L55 36 L46 62" stroke="#ffffff" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.6"/>
<rect x="30" y="38" width="40" height="78" rx="2" fill="#4a4a58"/>
<path d="M28 38 L50 24 L72 38Z" fill="#3a3a48"/>
<rect x="44" y="20" width="12" height="7" rx="2" fill="#ffd700" transform="rotate(-15,50,23.5)"/>
<rect x="38" y="52" width="10" height="14" rx="2" fill="#ff4020"/>
<rect x="52" y="52" width="10" height="14" rx="2" fill="#ff6020"/>
<rect x="38" y="74" width="10" height="14" rx="2" fill="#ff4020" opacity="0.8"/>
<rect x="52" y="74" width="10" height="14" rx="2" fill="#ff6020" opacity="0.8"/>
<circle cx="22" cy="72" r="5" fill="#f5d5b8"/>
<path d="M18 77 Q22 72 26 77 L26 86 Q22 90 18 86Z" fill="#4060d0" transform="rotate(35,22,82)"/>
<circle cx="78" cy="82" r="4.5" fill="#f5d5b8"/>
<path d="M74 87 Q78 82 82 87 L82 94 Q78 98 74 94Z" fill="#d04040" transform="rotate(-25,78,91)"/>
<path d="M0 126 Q50 118 100 126 L100 140 L0 140Z" fill="#202020"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">XVI</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">THE TOWER</text>
</svg>`
    },
    /* ===== XVII · THE STAR ===== */
    'The Star': {
      bg: ['#0a1030','#0a1850'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c17_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0a0c28"/><stop offset="55%" stop-color="#285878"/><stop offset="100%" stop-color="#4a8a2a"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c17_bg)"/>
<ellipse cx="40" cy="108" rx="18" ry="9" fill="#1a4878" opacity="0.7"/>
<path d="M0 110 Q50 104 100 110 L100 140 L0 140Z" fill="#3a6a22"/>
<path d="M50 6 L54 18 L62 10 L57 22 L68 22 L59 28 L63 40 L54 32 L54 44 L50 32 L46 44 L46 32 L37 40 L41 28 L32 22 L43 22 L38 10 L46 18Z" fill="#ffd700"/>
<circle cx="18" cy="22" r="2.5" fill="#ffe066"/>
<circle cx="82" cy="18" r="2.5" fill="#ffe066"/>
<circle cx="12" cy="38" r="2" fill="#ffe066"/>
<circle cx="88" cy="36" r="2" fill="#ffe066"/>
<circle cx="24" cy="14" r="1.5" fill="#ffe066"/>
<circle cx="76" cy="32" r="1.5" fill="#ffe066"/>
<circle cx="90" cy="52" r="1.5" fill="#ffe066"/>
<circle cx="50" cy="72" r="7.5" fill="#f5d5b8"/>
<path d="M38 80 Q50 74 62 80 L62 104 Q50 110 38 104Z" fill="#f5d5b8" opacity="0.75"/>
<path d="M44 66 Q38 74 40 84" fill="none" stroke="#c8a060" stroke-width="2.5" stroke-linecap="round"/>
<rect x="22" y="82" width="10" height="14" rx="2" fill="#2878a0"/>
<path d="M22 88 Q18 92 16 98" fill="none" stroke="#80c8f0" stroke-width="1.8"/>
<rect x="68" y="80" width="10" height="14" rx="2" fill="#2878a0"/>
<path d="M78 84 Q82 88 84 94" fill="none" stroke="#80c8f0" stroke-width="1.8"/>
<line x1="76" y1="104" x2="76" y2="84" stroke="#5a3818" stroke-width="2.5"/>
<circle cx="79" cy="80" r="3" fill="#282828"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">XVII</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">THE STAR</text>
</svg>`
    },
    /* ===== XVIII · THE MOON ===== */
    'The Moon': {
      bg: ['#080818','#0a1228'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c18_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#060818"/><stop offset="100%" stop-color="#0e1428"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c18_bg)"/>
<ellipse cx="50" cy="124" rx="28" ry="8" fill="#182858" opacity="0.6"/>
<path d="M44 140 Q48 118 46 100 Q44 88 48 80" fill="none" stroke="#7080a0" stroke-width="10" opacity="0.2"/>
<circle cx="50" cy="28" r="18" fill="#c8d8f0" opacity="0.8"/>
<circle cx="42" cy="24" r="13" fill="#060818"/>
<circle cx="22" cy="52" r="2.5" fill="#ffd700" opacity="0.6"/>
<circle cx="36" cy="46" r="2.5" fill="#ffd700" opacity="0.6"/>
<circle cx="50" cy="44" r="2.5" fill="#ffd700" opacity="0.6"/>
<circle cx="64" cy="46" r="2.5" fill="#ffd700" opacity="0.6"/>
<circle cx="78" cy="52" r="2.5" fill="#ffd700" opacity="0.6"/>
<circle cx="28" cy="40" r="1.8" fill="#ffe066" opacity="0.4"/>
<circle cx="72" cy="40" r="1.8" fill="#ffe066" opacity="0.4"/>
<rect x="8" y="76" width="14" height="42" rx="2" fill="#202048"/>
<path d="M8 76 L15 66 L22 76" fill="#303058"/>
<rect x="78" y="76" width="14" height="42" rx="2" fill="#202048"/>
<path d="M78 76 L85 66 L92 76" fill="#303058"/>
<ellipse cx="28" cy="112" rx="11" ry="7" fill="#808898"/>
<circle cx="19" cy="106" r="5" fill="#808898"/>
<circle cx="18" cy="104" r="1" fill="#303030"/>
<circle cx="21" cy="103" r="1" fill="#303030"/>
<ellipse cx="72" cy="112" rx="11" ry="7" fill="#c8a868"/>
<circle cx="81" cy="106" r="5" fill="#c8a868"/>
<circle cx="80" cy="104" r="1" fill="#5a3a10"/>
<circle cx="83" cy="103" r="1" fill="#5a3a10"/>
<ellipse cx="50" cy="126" rx="7" ry="3.5" fill="#ff6830"/>
<path d="M46 126 L48 122 M54 126 L52 122" stroke="#ff6830" stroke-width="1" stroke-linecap="round"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">XVIII</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">THE MOON</text>
</svg>`
    },
    /* ===== XIX · THE SUN ===== */
    'The Sun': {
      bg: ['#886000','#d4a010'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="c19_bg" cx="50%" cy="32%"><stop offset="0%" stop-color="#ffe566"/><stop offset="60%" stop-color="#ffb830"/><stop offset="100%" stop-color="#d48000"/></radialGradient></defs>
<rect width="100" height="140" fill="url(#c19_bg)"/>
<rect x="0" y="92" width="100" height="48" fill="#c8a060"/>
<path d="M0 92 Q25 86 50 92 Q75 98 100 92" fill="#b08848" opacity="0.5"/>
<circle cx="50" cy="34" r="24" fill="#ffe066"/>
<circle cx="50" cy="34" r="16" fill="#ffd700"/>
<line x1="50" y1="4" x2="50" y2="1" stroke="#ffe066" stroke-width="3"/>
<line x1="50" y1="64" x2="50" y2="67" stroke="#ffe066" stroke-width="3"/>
<line x1="20" y1="34" x2="17" y2="34" stroke="#ffe066" stroke-width="3"/>
<line x1="80" y1="34" x2="83" y2="34" stroke="#ffe066" stroke-width="3"/>
<line x1="28" y1="14" x2="26" y2="12" stroke="#ffe066" stroke-width="2"/>
<line x1="72" y1="14" x2="74" y2="12" stroke="#ffe066" stroke-width="2"/>
<line x1="28" y1="54" x2="26" y2="56" stroke="#ffe066" stroke-width="2"/>
<line x1="72" y1="54" x2="74" y2="56" stroke="#ffe066" stroke-width="2"/>
<circle cx="44" cy="31" r="2" fill="#8B6914"/>
<circle cx="56" cy="31" r="2" fill="#8B6914"/>
<path d="M44 40 Q50 44 56 40" fill="none" stroke="#8B6914" stroke-width="1.5"/>
<ellipse cx="50" cy="106" rx="14" ry="9" fill="#e0a050"/>
<circle cx="38" cy="98" r="5" fill="#e0a050"/>
<circle cx="50" cy="86" r="7" fill="#f5d5b8"/>
<line x1="46" y1="92" x2="38" y2="84" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<line x1="54" y1="92" x2="62" y2="84" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<line x1="60" y1="84" x2="60" y2="70" stroke="#c03030" stroke-width="1.5"/>
<rect x="59" y="68" width="12" height="6" fill="#c03030"/>
<circle cx="18" cy="88" r="5" fill="#ffd700"/>
<circle cx="18" cy="88" r="3" fill="#5a4010"/>
<circle cx="82" cy="88" r="5" fill="#ffd700"/>
<circle cx="82" cy="88" r="3" fill="#5a4010"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6.5" fill="#D4A574" font-family="Georgia,serif">XIX</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">THE SUN</text>
</svg>`
    },
    /* ===== XX · JUDGEMENT ===== */
    'Judgement': {
      bg: ['#0a1440','#1a2460'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="c20_bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#181850"/><stop offset="100%" stop-color="#200838"/></linearGradient></defs>
<rect width="100" height="140" fill="url(#c20_bg)"/>
<path d="M38 0 L28 46 L48 38Z" fill="#80c8f0" opacity="0.12"/>
<path d="M50 0 L40 42 L58 38Z" fill="#ffe066" opacity="0.15"/>
<path d="M62 0 L52 42 L72 38Z" fill="#80c8f0" opacity="0.12"/>
<ellipse cx="50" cy="22" rx="30" ry="14" fill="#e8e8f0" opacity="0.7"/>
<circle cx="50" cy="18" r="8" fill="#f5d5b8"/>
<path d="M38 24 Q28 18 24 28 Q34 34 40 28" fill="#ffd700" opacity="0.8"/>
<path d="M62 24 Q72 18 76 28 Q66 34 60 28" fill="#ffd700" opacity="0.8"/>
<line x1="50" y1="24" x2="70" y2="32" stroke="#c8a060" stroke-width="2.5" stroke-linecap="round"/>
<path d="M66 28 Q72 26 74 32 Q70 34 67 30Z" fill="#ffd700"/>
<rect x="74" y="26" width="10" height="14" fill="#f0f0f0" opacity="0.8"/>
<line x1="79" y1="26" x2="79" y2="40" stroke="#c03030" stroke-width="2"/>
<line x1="74" y1="33" x2="84" y2="33" stroke="#c03030" stroke-width="2"/>
<circle cx="28" cy="96" r="6" fill="#f5d5b8"/>
<path d="M20 102 Q28 96 36 102 L36 118 Q28 124 20 118Z" fill="#b0b8c8" opacity="0.7"/>
<line x1="24" y1="100" x2="20" y2="94" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<line x1="32" y1="100" x2="36" y2="94" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="50" cy="90" r="6" fill="#f5d5b8"/>
<path d="M42 96 Q50 90 58 96 L58 114 Q50 120 42 114Z" fill="#d0d0e0" opacity="0.8"/>
<line x1="46" y1="94" x2="40" y2="86" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<line x1="54" y1="94" x2="60" y2="86" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="72" cy="96" r="6" fill="#f5d5b8"/>
<path d="M64 102 Q72 96 80 102 L80 118 Q72 124 64 118Z" fill="#b0b8c8" opacity="0.7"/>
<line x1="68" y1="100" x2="64" y2="94" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<line x1="76" y1="100" x2="80" y2="94" stroke="#f5d5b8" stroke-width="2.5" stroke-linecap="round"/>
<path d="M0 124 Q50 116 100 124 L100 140 L0 140Z" fill="#1a4080" opacity="0.5"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="7" fill="#D4A574" font-family="Georgia,serif">XX</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="5.5" fill="#D4A574" font-family="Georgia,serif">JUDGEMENT</text>
</svg>`
    },
    /* ===== XXI · THE WORLD ===== */
    'The World': {
      bg: ['#1a3a1a','#2a5a2a'],
      svg: `<svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="c21_bg" cx="50%" cy="50%"><stop offset="0%" stop-color="#2a6840"/><stop offset="100%" stop-color="#081808"/></radialGradient></defs>
<rect width="100" height="140" fill="url(#c21_bg)"/>
<ellipse cx="50" cy="68" rx="26" ry="40" fill="none" stroke="#5a9a38" stroke-width="5"/>
<ellipse cx="50" cy="68" rx="24" ry="38" fill="none" stroke="#80b858" stroke-width="2.2" stroke-dasharray="4,3"/>
<path d="M36 28 Q50 22 64 28" fill="none" stroke="#c03030" stroke-width="2.5" stroke-linecap="round"/>
<path d="M36 108 Q50 114 64 108" fill="none" stroke="#c03030" stroke-width="2.5" stroke-linecap="round"/>
<rect x="4" y="6" width="16" height="16" rx="3" fill="#142030" opacity="0.6"/>
<path d="M8 16 L10 10 L12 18 L14 8 L16 16" fill="none" stroke="#ffe066" stroke-width="1"/>
<rect x="80" y="6" width="16" height="16" rx="3" fill="#142030" opacity="0.6"/>
<path d="M86 18 L84 14 L88 14Z" fill="none" stroke="#ffd700" stroke-width="1"/>
<path d="M86 14 Q88 10 90 14" fill="none" stroke="#ffd700" stroke-width="0.8"/>
<rect x="4" y="118" width="16" height="16" rx="3" fill="#142030" opacity="0.6"/>
<circle cx="12" cy="126" r="4.5" fill="none" stroke="#ffd700" stroke-width="1"/>
<path d="M8 128 Q10 122 12 128" fill="none" stroke="#ffd700" stroke-width="0.8"/>
<rect x="80" y="118" width="16" height="16" rx="3" fill="#142030" opacity="0.6"/>
<circle cx="88" cy="124" r="4.5" fill="none" stroke="#ffd700" stroke-width="1"/>
<path d="M85 122 Q88 118 91 122" fill="none" stroke="#ffd700" stroke-width="0.8"/>
<circle cx="50" cy="54" r="8" fill="#f5d5b8"/>
<path d="M38 62 Q50 56 62 62 L62 82 Q50 88 38 82Z" fill="#8838a0" opacity="0.7"/>
<path d="M40 66 Q50 62 60 68" fill="none" stroke="#c8a060" stroke-width="2.5"/>
<line x1="44" y1="64" x2="36" y2="56" stroke="#f5d5b8" stroke-width="2" stroke-linecap="round"/>
<line x1="56" y1="64" x2="66" y2="56" stroke="#f5d5b8" stroke-width="2" stroke-linecap="round"/>
<circle cx="35" cy="55" r="2.5" fill="#ffd700"/>
<circle cx="67" cy="55" r="2.5" fill="#ffd700"/>
<line x1="46" y1="82" x2="40" y2="94" stroke="#f5d5b8" stroke-width="2" stroke-linecap="round"/>
<line x1="54" y1="82" x2="62" y2="94" stroke="#f5d5b8" stroke-width="2" stroke-linecap="round"/>
<rect x="2" y="2" width="96" height="136" rx="4" fill="none" stroke="#8B6914" stroke-width="1.2" opacity="0.55"/>
<rect x="6" y="6" width="88" height="128" rx="3" fill="none" stroke="#D4A574" stroke-width="0.7" opacity="0.4"/>
<path d="M6 11 L6 6 L11 6" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 6 L94 6 L94 11" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M6 129 L6 134 L11 134" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<path d="M89 134 L94 134 L94 129" fill="none" stroke="#8B6914" stroke-width="0.9"/>
<ellipse cx="50" cy="16" rx="10" ry="6" fill="#120a05" stroke="#D4A574" stroke-width="0.7" opacity="0.85"/>
<text x="50" y="19" text-anchor="middle" font-size="6.5" fill="#D4A574" font-family="Georgia,serif">XXI</text>
<rect x="12" y="122" width="76" height="14" rx="3" fill="#120a05" stroke="#8B6914" stroke-width="0.6" opacity="0.88"/>
<text x="50" y="132" text-anchor="middle" font-size="6" fill="#D4A574" font-family="Georgia,serif">THE WORLD</text>
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
    wrap.dataset.isReversed = card.isReversed ? '1' : '0';
    wrap.style.cssText = `
      width: 170px; height: 250px;
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
    // For reversed cards: counter-rotate text so it stays readable when card is flipped
    const revTextStyle = card.isReversed ? 'transform:rotate(180deg);' : '';
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
      <div style="position:absolute;bottom:42px;left:0;right:0;text-align:center;font-size:0.48rem;color:rgba(212,165,116,0.85);letter-spacing:0.28em;text-transform:uppercase;z-index:4;font-family:Georgia,serif;${revTextStyle}">${position}</div>
      <!-- Divider line -->
      <div style="position:absolute;bottom:38px;left:35%;right:35%;height:1px;background:linear-gradient(to right, transparent, rgba(212,165,116,0.4), transparent);z-index:4;"></div>
      <!-- Card name bottom -->
      <div style="position:absolute;bottom:14px;left:0;right:0;text-align:center;z-index:4;${revTextStyle}">
        <div style="font-size:0.74rem;color:#F0D9B5;font-weight:700;font-family:Georgia,serif;letter-spacing:0.06em;text-shadow:0 1px 4px rgba(0,0,0,0.8);">${card.name}${card.isReversed ? ' (Reversed)' : ''}</div>
        <div style="font-size:0.44rem;color:rgba(212,165,116,0.7);margin-top:3px;letter-spacing:0.08em;">${(card.isReversed ? (card.reversed||card.upright) : (card.upright||'')).split(',').slice(0,2).join(' · ')}</div>
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
    const isReversed = wrap.dataset.isReversed === '1';
    // Reversed cards rotate 180° → SVG art and frame appear upside-down (authentic tarot)
    // Text inside has counter-rotation in its inline style → stays readable
    wrap.style.transform = isReversed ? 'translateY(-8px) scale(1.04) rotate(180deg)' : 'translateY(-8px) scale(1.04)';

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

  /* ===== GRAND Shuffle Animation — Explode → Orbit → Stack → Draw ===== */
  function fanShuffleAnimation(container, callback) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.43;
    const COUNT = 11;
    const W = 90, H = 130;

    const deck = [];

    // Create cards
    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        left: ${cx}px; top: ${cy}px;
        width: ${W}px; height: ${H}px;
        background: linear-gradient(170deg, #2D1B4E 0%, #1a0e3d 40%, #180c36 100%);
        border: 2px solid rgba(212,165,116,0.45);
        border-radius: 13px; z-index: 500;
        pointer-events: none;
        transform: translate(-50%,-50%) scale(1) rotate(0deg);
        transition: transform 0.5s cubic-bezier(0.34,1.3,0.64,1), opacity 0.5s ease;
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

    // Phase 1: EXPLODE outward — starburst in all directions
    setTimeout(() => {
      deck.forEach((el, i) => {
        const angle = (2 * Math.PI / COUNT) * i;
        const dist = 160 + (i % 3) * 40;
        const offsetX = Math.cos(angle) * dist;
        const offsetY = Math.sin(angle) * dist - 40;
        const rot = (Math.random() - 0.5) * 140;
        el.style.transition = 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)';
        el.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${rot}deg) scale(0.8)`;
      });
    }, 50);

    // Phase 2: ORBIT — cards circle around center
    setTimeout(() => {
      const orbitR = 200;
      deck.forEach((el, i) => {
        const angle = (2 * Math.PI / COUNT) * i + (performance.now() * 0.0002);
        const ox = Math.cos(angle) * orbitR;
        const oy = Math.sin(angle) * orbitR * 0.55;
        const rot = (Math.random() - 0.5) * 80;
        el.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
        el.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) rotate(${rot}deg) scale(0.85)`;
      });
    }, 500);

    // Phase 3: Second orbit — spin further, different angles
    setTimeout(() => {
      const orbitR2 = 180;
      deck.forEach((el, i) => {
        const angle = (2 * Math.PI / COUNT) * i + Math.PI / 3;
        const ox = Math.cos(angle) * orbitR2;
        const oy = Math.sin(angle) * orbitR2 * 0.5;
        el.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1)';
        el.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) rotate(${(Math.random()-0.5)*60}deg) scale(0.9)`;
      });
    }, 1000);

    // Phase 4: COLLAPSE — cards rush back to center, stack diagonally
    setTimeout(() => {
      deck.forEach((el, i) => {
        const stagger = i * 3;
        const ox = (i - (COUNT-1)/2) * 0.8;
        const oy = (i - (COUNT-1)/2) * 0.4;
        el.style.transition = 'transform 0.3s ease-in';
        el.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) rotate(0deg) scale(1)`;
      });
    }, 1500);

    // Phase 5: Tighten stack + breathe
    setTimeout(() => {
      deck.forEach((el, i) => {
        const ox = (i - (COUNT-1)/2) * 0.3;
        const oy = (i - (COUNT-1)/2) * 0.15;
        el.style.transition = 'transform 0.25s ease-out';
        el.style.transform = `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) rotate(0deg) scale(1)`;
      });
    }, 1850);

    // Phase 6: Fade and reveal — cards dissolve, 3 cards appear on page
    setTimeout(() => {
      deck.forEach((el, i) => {
        el.style.transition = 'transform 0.4s ease-in, opacity 0.35s ease';
        el.style.transform = `translate(-50%, -50%) rotate(0deg) scale(1.08)`;
        el.style.opacity = '0';
      });
    }, 2150);

    // Cleanup + callback
    setTimeout(() => {
      deck.forEach(el => el.remove());
      callback();
    }, 2600);
  }

  /* ===== Rich Reading Generator — Poetic + Mystical ===== */
  function generateRichReading(cards) {
    const positions = ['Past', 'Present', 'Future'];
    // Poetic position descriptors
    const posNames = {
      'Past': 'The Echo Behind You',
      'Present': 'The Mirror Before You',
      'Future': 'The Horizon Ahead'
    };
    
    // Extended poetic keyword library for each card
    const poeticTraits = {
      'The Fool': ['boundless wonder','innocent courage','the leap of faith'],
      'The Magician': ['focused will','raw creation','divine channeling'],
      'The High Priestess': ['veiled wisdom','silent knowing','the inner oracle'],
      'The Empress': ['abundant nurture','sacred bloom','the garden of soul'],
      'The Emperor': ['steadfast order','carved foundation','the mountain king'],
      'The Hierophant': ['sacred tradition','blessed teaching','the path of spirit'],
      'The Lovers': ['sacred union','mirror souls','the choice of heart'],
      'The Chariot': ['triumphant surge','harnessed will','the conquering flame'],
      'Strength': ['gentle courage','inner flame','the quiet lion'],
      'The Hermit': ['lantern light','solitary depth','the star-lit path'],
      'Wheel of Fortune': ['cosmic rhythm','turning tides','destiny\'s spin'],
      'Justice': ['balanced blade','clear truth','the scales of dawn'],
      'The Hanged Man': ['sacred pause','inverted vision','the suspended bloom'],
      'Death': ['phoenix rising','deep transformation','the eternal cycle'],
      'Temperance': ['sacred blending','patient alchemy','the golden mean'],
      'The Devil': ['shadow embrace','raw hunger','the honest prison'],
      'The Tower': ['thunder revelation','sudden clarity','the lightning path'],
      'The Star': ['soul-light','blessed renewal','the eternal spark'],
      'The Moon': ['lunar whisper','dream-lit path','the veiled tides'],
      'The Sun': ['radiant joy','golden awakening','the heart\'s noon'],
      'Judgement': ['sacred calling','soul reckoning','the great rising'],
      'The World': ['cosmic completion','spiral home','the infinite dance']
    };

    // Beautiful prose per position
    const cardReadings = cards.map((card, i) => {
      const pos = positions[i];
      const traits = poeticTraits[card.name] || (card.upright || '').split(',').map(s => s.trim().toLowerCase());
      const orientation = card.isReversed ? ' (Reversed)' : '';
      const meaningText = card.isReversed ? (card.reversed || card.upright) : (card.upright || '');
      const t0 = traits[0] || 'mystery';
      const t1 = traits[1] || traits[0] || 'transformation';
      const t2 = traits[2] || traits[0] || 'light';

      let reading = '';
      if (pos === 'Past') {
        reading = `<em>${posNames[pos]}</em> — The cards whisper of a chapter already written, where the essence of <strong>${card.name}</strong> danced through your life. It carried the gift of <em>${t0}</em> and the quiet lesson of <em>${t1}</em>. Like morning mist dissolving into sunlight, this energy has shaped the riverbed through which your present now flows.`;
      } else if (pos === 'Present') {
        reading = `<em>${posNames[pos]}</em> — <strong>${card.name}</strong> stands at the very center of your now, a luminous reflection of <em>${t0}</em>. It holds up a mirror polished by the stars themselves, asking you to see the <em>${t1}</em> already blooming within. This is not a distant promise — it is the air you are breathing right now.`;
      } else {
        reading = `<em>${posNames[pos]}</em> — Ahead, where the veil thins between what is and what shall be, <strong>${card.name}</strong> rises like a distant star guiding sailors home. It carries the fragrance of <em>${t0}</em> and the gentle pull of <em>${t1}</em>. The universe is weaving this into your story even as you read these words.`;
      }
      return reading;
    });

    // Synthesis — weave all three together poetically
    const n0 = cards[0].name, n1 = cards[1].name, n2 = cards[2].name;
    const synthesis = `In the great tapestry, three luminous threads intertwine: <strong>${n0}</strong> was the seed planted in fertile darkness — <strong>${n1}</strong> is the blossom opening to morning light — and <strong>${n2}</strong> is the fruit ripening on a branch you cannot yet reach. Together they sing a single chord, a harmony composed by the cosmos just for you.`;

    const adviceOptions = [
      `Let the wisdom of <strong>${n1}</strong> be your compass this season. Its energy is not merely a symbol — it is a living current pulsing through your days. Listen to what it whispers in the quiet moments between thoughts.`,
      `The cards do not command; they illuminate. The path revealed through <strong>${n0}</strong>, <strong>${n1}</strong>, and <strong>${n2}</strong> is one of profound alignment. Trust the unfolding — you are exactly where the universe intends you to be.`,
      `There is a sacred rhythm to all things. <strong>${n1}</strong> beats at the heart of your reading, a reminder that you are both the dreamer and the dream. Carry this knowing like a lantern into the days ahead.`
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
    // Random reversed: ~50% chance each card is reversed (UPRIGHT vs REVERSED)
    drawnCards.forEach(card => {
      card.isReversed = Math.random() > 0.5;
    });
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
    catch (e) { App.hideLoading(); App.showError(e.message, () => startReading()); return; }
    App.hideLoading();

    const rich = generateRichReading(drawnCards);
    const positions = ['Past', 'Present', 'Future'];

    const header = `<span class="result-zodiac" style="font-size:3rem;">✧</span>
      <div class="result-title">Your Tarot Reading</div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px;">
        ${drawnCards.map((c, i) => `<span style="font-size:0.78rem;color:rgba(212,165,116,0.9);font-family:Georgia,serif;">${c.name}${c.isReversed ? ' (R)' : ''} <span style="opacity:0.6;font-size:0.7rem;">(${positions[i]})</span></span>`).join('<span style="color:rgba(212,165,116,0.3);">✦</span>')}
      </div>`;

    const tags = drawnCards.map(c => `<span class="tag">${c.name}</span>`).join('');

    const content = `
      <div class="fortune-section">
        ${drawnCards.map((card, i) => `
          <div class="fortune-label" style="color:#D4A574;">${card.name}${card.isReversed ? ' (Reversed)' : ''} <span style="opacity:0.6;font-size:0.72rem;font-family:Georgia,serif;">— ${positions[i]}</span></div>
          <div class="fortune-text" style="margin-bottom:6px;color:rgba(240,217,181,0.45);font-size:0.72rem;font-style:italic;">${card.isReversed ? (card.reversed || card.upright) : (card.upright || '')}</div>
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

    App.showResult(header, tags, content, null, null, {
      chainFrom: 'tarot',
      chainZodiac: null,
      chainContext: { from: 'tarot reading', tarotCards: drawnCards.map(c => c.name) }
    });
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'tarot') Tools.tarot.init();
});