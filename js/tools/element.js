/* ===== INNER ELEMENT TOOL ===== */
Tools.element = (function() {
  const images = [
    {
      label: 'Volcano',
      scene: 'volcano erupting at sunset',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="vSky" cx="50%" cy="20%"><stop offset="0%" stop-color="#FF4E2A"/><stop offset="40%" stop-color="#8B1A1A"/><stop offset="100%" stop-color="#1A0505"/></radialGradient>
          <linearGradient id="vLava" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFEA00"/><stop offset="30%" stop-color="#FF4500"/><stop offset="100%" stop-color="#4A0000"/></linearGradient>
          <radialGradient id="vGlow" cx="50%" cy="35%"><stop offset="0%" stop-color="#FF6600" stop-opacity="0.5"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#vSky)"/>
        <ellipse cx="100" cy="60" rx="90" ry="55" fill="url(#vGlow)"/>
        <path d="M20 145 L60 80 L85 55 L100 25 L115 55 L140 80 L180 145Z" fill="#2A1510"/>
        <path d="M60 80 L85 55 L100 25 L115 55 L140 80 L120 90 L100 70 L80 90Z" fill="url(#vLava)"/>
        <path d="M85 55 Q100 15 115 55 Q105 65 95 65Z" fill="#FFEA00" opacity="0.9"/>
        <ellipse cx="100" cy="18" rx="18" ry="10" fill="#FF6600" opacity="0.7"/>
        <ellipse cx="100" cy="12" rx="12" ry="6" fill="#FFAA00" opacity="0.8"/>
        <path d="M75 85 Q65 105 55 125" stroke="#FF4500" stroke-width="3" fill="none" opacity="0.8" stroke-linecap="round"/>
        <path d="M125 85 Q135 105 145 125" stroke="#FF4500" stroke-width="3" fill="none" opacity="0.8" stroke-linecap="round"/>
        <path d="M100 75 Q100 100 100 130" stroke="#FF6600" stroke-width="4" fill="none" opacity="0.6" stroke-linecap="round"/>
        <circle cx="30" cy="30" r="2" fill="#FFAA55" opacity="0.6"/>
        <circle cx="160" cy="25" r="2.5" fill="#FFAA55" opacity="0.5"/>
        <circle cx="170" cy="45" r="1.5" fill="#FFAA55" opacity="0.4"/>
      </svg>`
    },
    {
      label: 'Ocean',
      scene: 'deep ocean waves under moonlight',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="oSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0A1028"/><stop offset="50%" stop-color="#1A2A5A"/><stop offset="100%" stop-color="#0D1A3A"/></linearGradient>
          <linearGradient id="oWave1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0066AA"/><stop offset="100%" stop-color="#002244"/></linearGradient>
          <linearGradient id="oWave2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#004488"/><stop offset="100%" stop-color="#001122"/></linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#oSky)"/>
        <circle cx="160" cy="35" r="22" fill="#E8E8D8" opacity="0.9"/>
        <circle cx="155" cy="30" r="18" fill="#0A1028" opacity="0.3"/>
        <ellipse cx="160" cy="120" rx="50" ry="12" fill="#E8E8D8" opacity="0.08"/>
        <path d="M0 90 Q25 78 50 90 Q75 102 100 90 Q125 78 150 90 Q175 102 200 90 L200 160 L0 160Z" fill="url(#oWave1)"/>
        <path d="M0 105 Q30 92 60 105 Q90 118 120 105 Q150 92 180 105 Q190 110 200 105 L200 160 L0 160Z" fill="url(#oWave2)"/>
        <path d="M0 120 Q40 108 80 120 Q120 132 160 120 Q180 114 200 120 L200 160 L0 160Z" fill="#001838" opacity="0.9"/>
        <path d="M140 92 Q150 88 160 92" stroke="#E8E8D8" stroke-width="1.5" fill="none" opacity="0.4" stroke-linecap="round"/>
        <path d="M145 96 Q155 92 165 96" stroke="#E8E8D8" stroke-width="1" fill="none" opacity="0.3" stroke-linecap="round"/>
        <circle cx="30" cy="25" r="1.5" fill="white" opacity="0.6"/>
        <circle cx="50" cy="15" r="1" fill="white" opacity="0.5"/>
        <circle cx="80" cy="22" r="1.5" fill="white" opacity="0.4"/>
      </svg>`
    },
    {
      label: 'Mountain',
      scene: 'snow-capped mountain at dawn',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#4A6FA5"/><stop offset="50%" stop-color="#8BA4C8"/><stop offset="100%" stop-color="#C8D8E8"/></linearGradient>
          <linearGradient id="mPeak" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#E8E8E8"/><stop offset="100%" stop-color="#B8C8D8"/></linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#mSky)"/>
        <path d="M0 145 L40 65 L70 95 L100 35 L140 85 L170 55 L200 110 L200 160 L0 160Z" fill="#6A7D8E" opacity="0.6"/>
        <path d="M40 65 L70 95 L100 35 L140 85 L170 55 L200 110 L200 160 L0 160 L0 145Z" fill="none"/>
        <path d="M100 35 L125 72 L140 85 L100 85Z" fill="url(#mPeak)"/>
        <path d="M100 35 L110 50 L105 55 L115 65 L100 85Z" fill="white" opacity="0.9"/>
        <path d="M170 55 L185 80 L200 110 L170 110Z" fill="#8B9DB5" opacity="0.7"/>
        <path d="M170 55 L178 68 L174 72 L182 80 L170 110Z" fill="white" opacity="0.8"/>
        <path d="M0 130 Q50 122 100 128 Q150 134 200 126 L200 160 L0 160Z" fill="#3A5A3A" opacity="0.5"/>
        <path d="M0 140 Q60 134 120 138 Q160 142 200 136 L200 160 L0 160Z" fill="#2A4A2A" opacity="0.6"/>
        <circle cx="25" cy="40" r="2" fill="white" opacity="0.5"/>
        <circle cx="45" cy="28" r="1.5" fill="white" opacity="0.4"/>
        <circle cx="160" cy="22" r="2" fill="white" opacity="0.5"/>
      </svg>`
    },
    {
      label: 'Storm',
      scene: 'dramatic thunderstorm over plains',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0A0A18"/><stop offset="50%" stop-color="#1A1A30"/><stop offset="100%" stop-color="#2A2A45"/></linearGradient>
          <radialGradient id="sLightning" cx="50%" cy="50%"><stop offset="0%" stop-color="#FFF" stop-opacity="0.9"/><stop offset="100%" stop-color="#FFE400" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#sSky)"/>
        <ellipse cx="60" cy="45" rx="50" ry="30" fill="#2A2A40" opacity="0.9"/>
        <ellipse cx="130" cy="35" rx="60" ry="35" fill="#3A3A50" opacity="0.9"/>
        <ellipse cx="170" cy="55" rx="40" ry="25" fill="#2A2A40" opacity="0.8"/>
        <ellipse cx="30" cy="60" rx="35" ry="20" fill="#3A3A50" opacity="0.7"/>
        <path d="M95 75 L80 108 L92 105 L72 145" stroke="#FFF8A0" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M95 75 L80 108 L92 105 L72 145" stroke="#FFE400" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
        <ellipse cx="95" cy="105" rx="30" ry="30" fill="url(#sLightning)" opacity="0.15"/>
        <path d="M140 65 L132 85 L138 83 L128 108" stroke="#D0D0E0" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
        <path d="M0 125 Q50 118 100 122 Q150 126 200 120 L200 160 L0 160Z" fill="#1A1A25" opacity="0.8"/>
        <path d="M0 135 Q60 130 120 134 Q160 138 200 132 L200 160 L0 160Z" fill="#0A0A15" opacity="0.7"/>
        <circle cx="25" cy="85" r="1.5" fill="#A0A0B8" opacity="0.5"/>
        <circle cx="175" cy="90" r="1.5" fill="#A0A0B8" opacity="0.4"/>
      </svg>`
    },
    {
      label: 'Forest',
      scene: 'ancient misty forest with light rays',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1A2E1A"/><stop offset="100%" stop-color="#0D1A0D"/></linearGradient>
          <linearGradient id="fRay" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFE066" stop-opacity="0.2"/><stop offset="100%" stop-color="#FFE066" stop-opacity="0"/></linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#fSky)"/>
        <path d="M40 0 L50 140" stroke="url(#fRay)" stroke-width="25" opacity="0.4"/>
        <path d="M90 0 L100 140" stroke="url(#fRay)" stroke-width="30" opacity="0.3"/>
        <path d="M150 0 L140 140" stroke="url(#fRay)" stroke-width="20" opacity="0.35"/>
        <path d="M15 145 L15 75 L5 75 L22 45 L12 45 L28 15 L44 45 L34 45 L52 75 L42 75 L42 145Z" fill="#1E5C1E" opacity="0.85"/>
        <path d="M65 145 L65 78 L55 78 L72 50 L62 50 L78 22 L94 50 L84 50 L102 78 L92 78 L92 145Z" fill="#2E7A2E" opacity="0.9"/>
        <path d="M118 145 L118 82 L110 82 L124 58 L116 58 L130 32 L144 58 L136 58 L150 82 L142 82 L142 145Z" fill="#1A5A1A" opacity="0.85"/>
        <path d="M158 145 L158 88 L150 88 L162 66 L154 66 L166 42 L178 66 L170 66 L182 88 L174 88 L174 145Z" fill="#1E4E1E" opacity="0.8"/>
        <path d="M0 95 Q60 82 120 90 Q160 96 200 88 L200 160 L0 160Z" fill="#0D2A0D" opacity="0.5"/>
        <path d="M0 115 Q50 108 100 112 Q150 116 200 108 L200 160 L0 160Z" fill="#051805" opacity="0.6"/>
        <circle cx="85" cy="20" r="3" fill="#FFE066" opacity="0.5"/>
      </svg>`
    },
    {
      label: 'Campfire',
      scene: 'glowing campfire under starry sky',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="cGlow" cx="50%" cy="75%"><stop offset="0%" stop-color="#FF6600" stop-opacity="0.5"/><stop offset="40%" stop-color="#FF2200" stop-opacity="0.2"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient>
          <radialGradient id="cFire" cx="50%" cy="70%"><stop offset="0%" stop-color="#FFEA00"/><stop offset="30%" stop-color="#FF7700"/><stop offset="70%" stop-color="#FF2200"/><stop offset="100%" stop-color="#4A0000"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="#0A0815"/>
        <ellipse cx="100" cy="115" rx="70" ry="35" fill="url(#cGlow)"/>
        <line x1="60" y1="135" x2="95" y2="95" stroke="#5C3A1E" stroke-width="5" stroke-linecap="round"/>
        <line x1="140" y1="135" x2="105" y2="95" stroke="#4A2E14" stroke-width="5" stroke-linecap="round"/>
        <line x1="80" y1="138" x2="100" y2="92" stroke="#5C3A1E" stroke-width="4" stroke-linecap="round"/>
        <line x1="120" y1="138" x2="100" y2="92" stroke="#4A2E14" stroke-width="4" stroke-linecap="round"/>
        <path d="M75 100 Q100 60 125 100 Q115 120 100 120 Q85 120 75 100Z" fill="url(#cFire)" opacity="0.95"/>
        <path d="M82 98 Q100 72 118 98 Q112 112 100 112 Q88 112 82 98Z" fill="#FFAA00" opacity="0.9"/>
        <path d="M88 96 Q100 80 112 96 Q108 106 100 106 Q92 106 88 96Z" fill="#FFEA00" opacity="0.9"/>
        <ellipse cx="100" cy="88" rx="6" ry="10" fill="#FFFAAA" opacity="0.8"/>
        <circle cx="35" cy="28" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="55" cy="18" r="1" fill="white" opacity="0.6"/>
        <circle cx="85" cy="22" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="125" cy="15" r="1" fill="white" opacity="0.5"/>
        <circle cx="155" cy="25" r="1.5" fill="white" opacity="0.6"/>
        <circle cx="170" cy="38" r="1" fill="white" opacity="0.5"/>
        <circle cx="25" cy="50" r="1" fill="white" opacity="0.4"/>
      </svg>`
    },
    {
      label: 'Sunrise',
      scene: 'golden sunrise over misty valley',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FF6B6B"/><stop offset="30%" stop-color="#FF8E53"/><stop offset="60%" stop-color="#FFAA5C"/><stop offset="100%" stop-color="#FFD166"/></linearGradient>
          <radialGradient id="rSun" cx="50%" cy="100%"><stop offset="0%" stop-color="#FFEA00" stop-opacity="0.9"/><stop offset="40%" stop-color="#FF8C00" stop-opacity="0.5"/><stop offset="100%" stop-color="#FF8C00" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#rSky)"/>
        <ellipse cx="100" cy="95" rx="80" ry="50" fill="url(#rSun)" opacity="0.8"/>
        <path d="M0 105 Q40 95 80 102 Q120 109 160 100 Q180 96 200 100 L200 160 L0 160Z" fill="#5A8A3A" opacity="0.7"/>
        <path d="M0 115 Q50 108 100 112 Q150 116 200 110 L200 160 L0 160Z" fill="#3A6A20" opacity="0.6"/>
        <path d="M0 125 Q60 120 120 124 Q160 128 200 122 L200 160 L0 160Z" fill="#2A4A15" opacity="0.5"/>
        <line x1="25" y1="92" x2="10" y2="78" stroke="#FFE88A" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
        <line x1="175" y1="92" x2="192" y2="78" stroke="#FFE88A" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
        <line x1="50" y1="85" x2="42" y2="72" stroke="#FFE88A" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
        <line x1="150" y1="85" x2="160" y2="72" stroke="#FFE88A" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
        <circle cx="30" cy="35" r="2" fill="white" opacity="0.3"/>
        <circle cx="160" cy="28" r="1.5" fill="white" opacity="0.25"/>
      </svg>`
    },
    {
      label: 'Galaxy',
      scene: 'spiral galaxy with violet nebula',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gCore" cx="50%" cy="50%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="20%" stop-color="#E8D8F8"/><stop offset="50%" stop-color="#9B7BB8"/><stop offset="100%" stop-color="#1A0A30"/></radialGradient>
          <radialGradient id="gNebula" cx="50%" cy="50%"><stop offset="0%" stop-color="#C4A6E8" stop-opacity="0.3"/><stop offset="100%" stop-color="#1A0A30" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="#050510"/>
        <ellipse cx="100" cy="80" rx="90" ry="70" fill="url(#gNebula)"/>
        <ellipse cx="100" cy="80" rx="70" ry="45" fill="none" stroke="#B490CA" stroke-width="14" opacity="0.12" transform="rotate(-20,100,80)"/>
        <ellipse cx="100" cy="80" rx="50" ry="30" fill="none" stroke="#D4B8F0" stroke-width="8" opacity="0.15" transform="rotate(-20,100,80)"/>
        <ellipse cx="100" cy="80" rx="32" ry="20" fill="none" stroke="#E8D8F8" stroke-width="4" opacity="0.18" transform="rotate(-20,100,80)"/>
        <circle cx="100" cy="80" r="18" fill="url(#gCore)" opacity="0.7"/>
        <circle cx="100" cy="80" r="6" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="40" cy="35" r="2" fill="white" opacity="0.8"/>
        <circle cx="70" cy="22" r="1.5" fill="#C8A8FF" opacity="0.7"/>
        <circle cx="150" cy="30" r="2" fill="white" opacity="0.8"/>
        <circle cx="170" cy="50" r="1.5" fill="#C8A8FF" opacity="0.7"/>
        <circle cx="30" cy="70" r="1" fill="white" opacity="0.6"/>
        <circle cx="180" cy="85" r="1.5" fill="#C8A8FF" opacity="0.6"/>
        <circle cx="50" cy="120" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="160" cy="115" r="1" fill="white" opacity="0.6"/>
        <circle cx="100" cy="140" r="1.5" fill="#C8A8FF" opacity="0.5"/>
        <circle cx="130" cy="55" r="1" fill="white" opacity="0.5"/>
        <circle cx="60" cy="95" r="1" fill="#C8A8FF" opacity="0.4"/>
      </svg>`
    },
    {
      label: 'Snow',
      scene: 'peaceful snow-covered forest at twilight',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#2A3A5A"/><stop offset="50%" stop-color="#4A6080"/><stop offset="100%" stop-color="#6A8098"/></linearGradient>
          <radialGradient id="wMoon" cx="50%" cy="50%"><stop offset="0%" stop-color="#E8EEF4"/><stop offset="100%" stop-color="#B8C8D8"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#wSky)"/>
        <circle cx="160" cy="30" r="18" fill="url(#wMoon)" opacity="0.85"/>
        <circle cx="155" cy="25" r="14" fill="#4A6080" opacity="0.2"/>
        <path d="M25 140 L25 65 L15 65 L28 40 L18 40 L32 15 L46 40 L36 40 L50 65 L40 65 L40 140Z" fill="#E8EEF4" opacity="0.5"/>
        <path d="M70 140 L70 70 L60 70 L74 48 L64 48 L78 25 L92 48 L82 48 L96 70 L86 70 L86 140Z" fill="#D8E4F0" opacity="0.55"/>
        <path d="M120 140 L120 75 L110 75 L124 52 L114 52 L128 28 L142 52 L132 52 L146 75 L136 75 L136 140Z" fill="#E8EEF4" opacity="0.5"/>
        <path d="M165 140 L165 80 L155 80 L168 60 L158 60 L172 38 L185 60 L175 60 L188 80 L178 80 L178 140Z" fill="#D8E4F0" opacity="0.45"/>
        <path d="M0 115 Q50 108 100 112 Q150 116 200 110 L200 160 L0 160Z" fill="#F0F4F8" opacity="0.85"/>
        <path d="M0 125 Q60 120 120 124 Q160 128 200 122 L200 160 L0 160Z" fill="#E0E8F0" opacity="0.9"/>
        <path d="M0 138 Q50 134 100 136 Q150 138 200 134 L200 160 L0 160Z" fill="#D0DCE8" opacity="0.8"/>
        <circle cx="35" cy="35" r="2" fill="white" opacity="0.6"/>
        <circle cx="55" cy="25" r="1.5" fill="white" opacity="0.5"/>
        <circle cx="85" cy="30" r="2" fill="white" opacity="0.55"/>
        <circle cx="110" cy="20" r="1.5" fill="white" opacity="0.45"/>
        <circle cx="140" cy="35" r="2" fill="white" opacity="0.5"/>
        <circle cx="190" cy="28" r="1.5" fill="white" opacity="0.4"/>
      </svg>`
    },
    {
      label: 'Desert',
      scene: 'moonlit desert with rolling dunes',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0A0A20"/><stop offset="50%" stop-color="#1A0A30"/><stop offset="100%" stop-color="#2A1038"/></linearGradient>
          <linearGradient id="dSand" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#C4A055"/><stop offset="100%" stop-color="#7A5A20"/></linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#dSky)"/>
        <circle cx="165" cy="28" r="20" fill="#F0E8D8" opacity="0.9"/>
        <circle cx="158" cy="22" r="15" fill="#1A0A30" opacity="0.25"/>
        <path d="M0 85 Q40 72 80 80 Q120 88 160 78 Q180 73 200 78 L200 160 L0 160Z" fill="url(#dSand)"/>
        <path d="M0 100 Q50 90 100 96 Q150 102 200 94 L200 160 L0 160Z" fill="#A88840"/>
        <path d="M0 115 Q60 108 120 112 Q160 116 200 110 L200 160 L0 160Z" fill="#8A6E30"/>
        <path d="M0 130 Q50 126 100 128 Q150 130 200 126 L200 160 L0 160Z" fill="#6A5020"/>
        <path d="M55 78 L60 48 L56 48 L64 28 L72 48 L68 48 L76 78Z" fill="#2A3A1A" opacity="0.8"/>
        <path d="M60 52 Q52 48 50 54" fill="none" stroke="#2A3A1A" stroke-width="3" stroke-linecap="round"/>
        <path d="M64 48 Q72 44 72 50" fill="none" stroke="#2A3A1A" stroke-width="3" stroke-linecap="round"/>
        <circle cx="25" cy="22" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="50" cy="12" r="1" fill="white" opacity="0.6"/>
        <circle cx="85" cy="18" r="1.5" fill="white" opacity="0.6"/>
        <circle cx="120" cy="10" r="1" fill="white" opacity="0.5"/>
        <circle cx="195" cy="15" r="1" fill="white" opacity="0.4"/>
      </svg>`
    }
  ];
  let selected = [];

  function init() {
    selected = [];
    document.getElementById('element-proceed').disabled = true;

    const grid = document.getElementById('element-img-grid');
    grid.innerHTML = '';

    images.forEach((img, i) => {
      const card = document.createElement('div');
      card.className = 'element-img-card';
      card.dataset.index = i;
      card.innerHTML = `
        <div class="img-svg-wrap">${img.svg}</div>
        <span class="img-label">${img.label}</span>
      `;
      card.onclick = () => {
        if (card.classList.contains('selected')) {
          card.classList.remove('selected');
          selected = selected.filter(s => s !== i);
        } else if (selected.length < 3) {
          card.classList.add('selected');
          selected.push(i);
        }
        const allCards = grid.querySelectorAll('.element-img-card');
        allCards.forEach(c => {
          const badge = c.querySelector('.sel-badge');
          if (badge) badge.remove();
        });
        selected.forEach((idx, order) => {
          const c = allCards[idx];
          const b = document.createElement('span');
          b.className = 'sel-badge';
          b.textContent = order + 1;
          c.appendChild(b);
        });
        document.getElementById('element-proceed').disabled = selected.length !== 3;
      };
      grid.appendChild(card);
    });
  }

  async function startReading() {
    if (selected.length !== 3) return;
    const chosen = selected.map(i => images[i].scene);
    App.showLoading('Reading your elemental aura...');
    let result;
    try { result = await API.getElement(chosen); }
    catch (e) { App.hideLoading(); App.showError(e.message); return; }
    App.hideLoading();

    const elEmojis = { Fire:'🔥', Water:'💧', Earth:'🌍', Air:'💨' };
    const header = `<span class="result-zodiac">${result.emoji || elEmojis[result.element] || '⚡'}</span>
      <div class="result-title">Your Element: ${result.element}</div>`;
    const tags = (result.traits || []).map(t => `<span class="tag">${t}</span>`).join('');
    const content = `
      <div class="fortune-section">
        <div class="fortune-label">✦ Element Reading</div>
        <div class="fortune-text">${result.reading}</div>
      </div>`;
    App.showResult(header, tags, content, null, {
      zodiac: null,
      context: { from: 'element reading', element: result.element, detail: result.reading.substring(0, 100) }
    });
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'element') Tools.element.init();
});
