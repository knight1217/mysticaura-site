/* ===== INNER ELEMENT TOOL ===== */
Tools.element = (function() {
  const images = [
    {
      label: 'Volcano',
      scene: 'volcano erupting at sunset',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="vSky" cx="50%" cy="15%"><stop offset="0%" stop-color="#1a0530"/><stop offset="35%" stop-color="#2d1050"/><stop offset="65%" stop-color="#5a1a1a"/><stop offset="100%" stop-color="#1a0508"/></radialGradient>
          <radialGradient id="vErupt" cx="50%" cy="40%"><stop offset="0%" stop-color="#FF6618" stop-opacity="0.6"/><stop offset="50%" stop-color="#CC2200" stop-opacity="0.3"/><stop offset="100%" stop-color="#1a0508" stop-opacity="0"/></radialGradient>
          <linearGradient id="vLavaR" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFD700"/><stop offset="30%" stop-color="#FF4500"/><stop offset="100%" stop-color="#4A0000"/></linearGradient>
          <linearGradient id="vSmoke" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="#FF6618" stop-opacity="0.15"/><stop offset="100%" stop-color="transparent"/></linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#vSky)"/>
        <ellipse cx="100" cy="55" rx="95" ry="60" fill="url(#vErupt)"/>
        <circle cx="100" cy="30" r="25" fill="url(#vSmoke)" opacity="0.6"/>
        <circle cx="80" cy="22" r="18" fill="url(#vSmoke)" opacity="0.4"/>
        <circle cx="120" cy="18" r="22" fill="url(#vSmoke)" opacity="0.35"/>
        <path d="M15 150 L55 80 L82 52 L100 22 L118 52 L145 80 L185 150Z" fill="#1a0c08"/>
        <path d="M55 80 L82 52 L100 22 L118 52 L145 80 L125 90 L100 72 L75 90Z" fill="url(#vLavaR)" opacity="0.95"/>
        <path d="M82 52 Q100 12 118 52 Q108 62 92 62Z" fill="#FFE066" opacity="0.9"/>
        <ellipse cx="100" cy="18" rx="16" ry="10" fill="#FF8844" opacity="0.7"/>
        <ellipse cx="100" cy="12" rx="9" ry="5" fill="#FFCC66" opacity="0.8"/>
        <path d="M70 88 Q58 108 48 130" stroke="#FF5500" stroke-width="3.5" fill="none" opacity="0.85" stroke-linecap="round"/>
        <path d="M130 88 Q142 108 152 130" stroke="#FF5500" stroke-width="3" fill="none" opacity="0.8" stroke-linecap="round"/>
        <path d="M100 78 Q100 105 100 135" stroke="#FF7722" stroke-width="4.5" fill="none" opacity="0.65" stroke-linecap="round"/>
        <circle cx="22" cy="20" r="1.5" fill="#FFCC99" opacity="0.7"/>
        <circle cx="155" cy="14" r="2" fill="#FFCC99" opacity="0.6"/>
        <circle cx="175" cy="35" r="1" fill="#FFCC99" opacity="0.5"/>
        <circle cx="10" cy="48" r="1" fill="#FFCC99" opacity="0.4"/>
      </svg>`
    },
    {
      label: 'Ocean',
      scene: 'deep ocean waves under moonlight',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="oSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#06081a"/><stop offset="40%" stop-color="#0d1540"/><stop offset="100%" stop-color="#0a1230"/></linearGradient>
          <radialGradient id="oMoon" cx="50%" cy="50%"><stop offset="0%" stop-color="#F0F4FF"/><stop offset="60%" stop-color="#d0d8f0"/><stop offset="100%" stop-color="#8090c0"/></radialGradient>
          <linearGradient id="oWave1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#003366"/><stop offset="40%" stop-color="#001a40"/><stop offset="100%" stop-color="#000d20"/></linearGradient>
          <linearGradient id="oWave2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#002255"/><stop offset="100%" stop-color="#000a18"/></linearGradient>
          <radialGradient id="oGlow" cx="50%" cy="50%"><stop offset="0%" stop-color="#44aacc" stop-opacity="0.15"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#oSky)"/>
        <circle cx="155" cy="40" r="26" fill="url(#oMoon)" opacity="0.85"/>
        <circle cx="148" cy="34" r="18" fill="#0d1540" opacity="0.25"/>
        <ellipse cx="155" cy="100" rx="60" ry="18" fill="url(#oGlow)"/>
        <ellipse cx="155" cy="95" rx="30" ry="8" fill="#44aacc" opacity="0.08"/>
        <path d="M0 78 Q30 65 60 78 Q90 91 120 78 Q150 65 180 78 Q195 84 200 80 L200 160 L0 160Z" fill="url(#oWave1)"/>
        <path d="M0 92 Q40 78 80 92 Q120 106 160 92 Q180 84 200 90 L200 160 L0 160Z" fill="url(#oWave2)"/>
        <path d="M0 108 Q45 96 90 106 Q135 116 180 106 Q195 102 200 104 L200 160 L0 160Z" fill="#001030" opacity="0.9"/>
        <path d="M0 122 Q50 114 100 120 Q150 126 200 118 L200 160 L0 160Z" fill="#00081a" opacity="0.85"/>
        <path d="M130 74 Q150 68 170 78" stroke="#8899cc" stroke-width="1.5" fill="none" opacity="0.45" stroke-linecap="round"/>
        <path d="M135 80 Q155 74 175 84" stroke="#aabbdd" stroke-width="1" fill="none" opacity="0.35" stroke-linecap="round"/>
        <circle cx="25" cy="18" r="1.5" fill="white" opacity="0.6"/>
        <circle cx="48" cy="12" r="1" fill="white" opacity="0.5"/>
        <circle cx="72" cy="20" r="1.5" fill="white" opacity="0.45"/>
        <circle cx="95" cy="10" r="1" fill="white" opacity="0.4"/>
        <circle cx="185" cy="15" r="1.5" fill="white" opacity="0.35"/>
      </svg>`
    },
    {
      label: 'Mountain',
      scene: 'snow-capped mountain at dawn',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#30406a"/><stop offset="35%" stop-color="#6a80a8"/><stop offset="70%" stop-color="#c8b8d0"/><stop offset="100%" stop-color="#f0dcc8"/></linearGradient>
          <linearGradient id="mPeak" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fff8f0"/><stop offset="60%" stop-color="#e0d8e8"/><stop offset="100%" stop-color="#9888a8"/></linearGradient>
          <linearGradient id="mFog" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#f0dcc8" stop-opacity="0.3"/><stop offset="100%" stop-color="#f0dcc8" stop-opacity="0"/></linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#mSky)"/>
        <rect y="80" width="200" height="80" fill="url(#mFog)"/>
        <path d="M0 160 L32 68 L65 98 L100 28 L128 72 L168 50 L200 128 L200 160Z" fill="#554570" opacity="0.5"/>
        <path d="M32 68 L65 98 L100 28 L128 72 L168 50 L200 128 L200 160 L0 160Z" fill="none"/>
        <path d="M100 28 L122 70 L135 84 L100 90Z" fill="url(#mPeak)"/>
        <path d="M100 28 L108 48 L104 54 L112 64 L100 90Z" fill="white" opacity="0.92"/>
        <path d="M168 50 L182 78 L200 112 L168 112Z" fill="#7080a0" opacity="0.6"/>
        <path d="M168 50 L174 64 L170 70 L178 82 L168 112Z" fill="white" opacity="0.78"/>
        <path d="M0 125 Q50 116 100 122 Q150 128 200 120 L200 160 L0 160Z" fill="#2a3a2a" opacity="0.45"/>
        <path d="M0 138 Q60 132 120 136 Q160 140 200 134 L200 160 L0 160Z" fill="#1a2a1a" opacity="0.5"/>
        <path d="M22 55 L18 48 L20 48 L16 38 L22 48 L20 48 L26 55Z" fill="#112222" opacity="0.7"/>
        <circle cx="28" cy="32" r="1.5" fill="white" opacity="0.5"/>
        <circle cx="42" cy="24" r="1" fill="white" opacity="0.4"/>
        <circle cx="158" cy="20" r="1.5" fill="white" opacity="0.45"/>
      </svg>`
    },
    {
      label: 'Storm',
      scene: 'dramatic thunderstorm over plains',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#06060f"/><stop offset="40%" stop-color="#0f0f22"/><stop offset="80%" stop-color="#1a1a35"/><stop offset="100%" stop-color="#252540"/></linearGradient>
          <radialGradient id="sBolt" cx="50%" cy="40%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/><stop offset="40%" stop-color="#ffeecc" stop-opacity="0.15"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <radialGradient id="sFork" cx="50%" cy="50%"><stop offset="0%" stop-color="#fff8dd" stop-opacity="0.4"/><stop offset="100%" stop-color="#ffcc00" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#sSky)"/>
        <ellipse cx="45" cy="32" rx="55" ry="32" fill="#1a1a30" opacity="0.85"/>
        <ellipse cx="140" cy="28" rx="65" ry="38" fill="#222240" opacity="0.88"/>
        <ellipse cx="175" cy="50" rx="45" ry="28" fill="#1a1a30" opacity="0.8"/>
        <ellipse cx="20" cy="55" rx="38" ry="22" fill="#222240" opacity="0.72"/>
        <ellipse cx="90" cy="90" rx="55" ry="40" fill="url(#sBolt)"/>
        <path d="M90 55 L72 98 L84 95 L60 150" stroke="#ffffff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M90 55 L72 98 L84 95 L60 150" stroke="#ffeecc" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
        <ellipse cx="75" cy="100" rx="25" ry="28" fill="url(#sFork)" opacity="0.6"/>
        <path d="M145 55 L138 80 L144 78 L132 110" stroke="#bbbbdd" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.4"/>
        <line x1="5" y1="98" x2="195" y2="98" stroke="#334464" stroke-width="0.8" opacity="0.15"/>
        <line x1="8" y1="108" x2="192" y2="108" stroke="#334464" stroke-width="0.6" opacity="0.12"/>
        <line x1="12" y1="118" x2="188" y2="118" stroke="#334464" stroke-width="0.5" opacity="0.1"/>
        <path d="M0 125 Q50 116 100 121 Q150 126 200 118 L200 160 L0 160Z" fill="#0f0f1a" opacity="0.8"/>
        <path d="M0 138 Q60 132 120 136 Q160 140 200 134 L200 160 L0 160Z" fill="#06060f" opacity="0.75"/>
        <line x1="48" y1="70" x2="42" y2="85" stroke="#ddeeff" stroke-width="0.8" opacity="0.2" stroke-dasharray="2,6"/>
        <line x1="68" y1="75" x2="62" y2="90" stroke="#ddeeff" stroke-width="0.8" opacity="0.2" stroke-dasharray="2,6"/>
        <line x1="128" y1="68" x2="122" y2="82" stroke="#ddeeff" stroke-width="0.8" opacity="0.18" stroke-dasharray="2,6"/>
        <line x1="158" y1="62" x2="152" y2="78" stroke="#ddeeff" stroke-width="0.8" opacity="0.18" stroke-dasharray="2,6"/>
        <circle cx="28" cy="22" r="1" fill="#aa88cc" opacity="0.4"/>
        <circle cx="168" cy="18" r="1.2" fill="#aa88cc" opacity="0.35"/>
      </svg>`
    },
    {
      label: 'Forest',
      scene: 'ancient misty forest with light rays',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0d1a0d"/><stop offset="50%" stop-color="#152a15"/><stop offset="100%" stop-color="#081008"/></linearGradient>
          <linearGradient id="fRay" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffe8a0" stop-opacity="0.22"/><stop offset="60%" stop-color="#ddaa44" stop-opacity="0.06"/><stop offset="100%" stop-color="transparent"/></linearGradient>
          <radialGradient id="fGlow" cx="50%" cy="30%"><stop offset="0%" stop-color="#ffdd88" stop-opacity="0.12"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <radialGradient id="fSpore" cx="50%" cy="50%"><stop offset="0%" stop-color="#aaffaa" stop-opacity="0.7"/><stop offset="100%" stop-color="#aaffaa" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#fSky)"/>
        <ellipse cx="100" cy="50" rx="80" ry="60" fill="url(#fGlow)"/>
        <path d="M35 0 L45 150" stroke="url(#fRay)" stroke-width="22" opacity="0.35"/>
        <path d="M80 0 L90 150" stroke="url(#fRay)" stroke-width="28" opacity="0.28"/>
        <path d="M140 0 L130 150" stroke="url(#fRay)" stroke-width="20" opacity="0.3"/>
        <path d="M10 150 L10 68 L0 68 L18 38 L8 38 L26 10 L42 38 L32 38 L50 68 L40 68 L40 150Z" fill="#164016" opacity="0.8"/>
        <path d="M60 150 L60 72 L50 72 L68 44 L58 44 L76 18 L92 44 L82 44 L100 72 L90 72 L90 150Z" fill="#1e5e1e" opacity="0.86"/>
        <path d="M115 150 L115 76 L107 76 L122 52 L114 52 L130 30 L144 52 L136 52 L150 76 L142 76 L142 150Z" fill="#185018" opacity="0.82"/>
        <path d="M155 150 L155 82 L148 82 L160 62 L152 62 L166 42 L178 62 L170 62 L182 82 L174 82 L174 150Z" fill="#1a4a1a" opacity="0.78"/>
        <path d="M0 92 Q55 78 110 86 Q155 94 200 84 L200 160 L0 160Z" fill="#0a200a" opacity="0.5"/>
        <path d="M0 112 Q50 104 100 108 Q150 112 200 104 L200 160 L0 160Z" fill="#051505" opacity="0.6"/>
        <circle cx="78" cy="16" r="3.5" fill="url(#fSpore)"/>
        <circle cx="42" cy="60" r="2" fill="url(#fSpore)"/>
        <circle cx="132" cy="48" r="2.5" fill="url(#fSpore)"/>
        <circle cx="108" cy="72" r="1.8" fill="url(#fSpore)"/>
        <circle cx="62" cy="38" r="1.5" fill="url(#fSpore)"/>
        <circle cx="158" cy="56" r="2" fill="url(#fSpore)"/>
      </svg>`
    },
    {
      label: 'Campfire',
      scene: 'glowing campfire under starry sky',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="cGlow" cx="50%" cy="78%"><stop offset="0%" stop-color="#ff8844" stop-opacity="0.5"/><stop offset="35%" stop-color="#dd3311" stop-opacity="0.2"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <radialGradient id="cCore" cx="50%" cy="80%"><stop offset="0%" stop-color="#fff8dd"/><stop offset="15%" stop-color="#ffdd44"/><stop offset="45%" stop-color="#ff5500"/><stop offset="100%" stop-color="#330000"/></radialGradient>
          <radialGradient id="cEmber" cx="50%" cy="50%"><stop offset="0%" stop-color="#ffcc66" stop-opacity="0.8"/><stop offset="100%" stop-color="#ff4400" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="#060512"/>
        <ellipse cx="100" cy="120" rx="80" ry="40" fill="url(#cGlow)"/>
        <line x1="55" y1="140" x2="95" y2="95" stroke="#4a2e10" stroke-width="6" stroke-linecap="round"/>
        <line x1="145" y1="140" x2="105" y2="95" stroke="#3a2208" stroke-width="6" stroke-linecap="round"/>
        <line x1="75" y1="142" x2="100" y2="92" stroke="#4a2e10" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="125" y1="142" x2="100" y2="92" stroke="#3a2208" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M70 100 Q100 52 130 100 Q118 122 100 122 Q82 122 70 100Z" fill="url(#cCore)" opacity="0.95"/>
        <path d="M78 98 Q100 66 122 98 Q114 114 100 114 Q86 114 78 98Z" fill="#ffaa22" opacity="0.9"/>
        <path d="M86 96 Q100 74 114 96 Q110 108 100 108 Q90 108 86 96Z" fill="#ffe844" opacity="0.9"/>
        <ellipse cx="100" cy="86" rx="7" ry="12" fill="#ffffff" opacity="0.85"/>
        <circle cx="88" cy="72" r="2.5" fill="url(#cEmber)"/>
        <circle cx="108" cy="62" r="2" fill="url(#cEmber)"/>
        <circle cx="96" cy="66" r="1.8" fill="url(#cEmber)"/>
        <circle cx="78" cy="82" r="1.5" fill="url(#cEmber)"/>
        <circle cx="120" cy="80" r="1.8" fill="url(#cEmber)"/>
        <circle cx="25" cy="22" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="52" cy="12" r="1" fill="white" opacity="0.6"/>
        <circle cx="82" cy="16" r="1.5" fill="white" opacity="0.7"/>
        <circle cx="125" cy="10" r="1" fill="white" opacity="0.5"/>
        <circle cx="155" cy="20" r="1.5" fill="white" opacity="0.6"/>
        <circle cx="172" cy="35" r="1" fill="white" opacity="0.5"/>
        <circle cx="18" cy="48" r="1" fill="white" opacity="0.4"/>
        <circle cx="180" cy="55" r="1.2" fill="white" opacity="0.35"/>
      </svg>`
    },
    {
      label: 'Sunrise',
      scene: 'golden sunrise over misty valley',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#222255"/><stop offset="20%" stop-color="#663366"/><stop offset="45%" stop-color="#cc6666"/><stop offset="70%" stop-color="#ff9944"/><stop offset="100%" stop-color="#ffeebb"/></linearGradient>
          <radialGradient id="rSun" cx="50%" cy="100%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="20%" stop-color="#ffe044" stop-opacity="0.7"/><stop offset="55%" stop-color="#ff8800" stop-opacity="0.3"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <linearGradient id="rMist" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffddaa" stop-opacity="0.2"/><stop offset="100%" stop-color="transparent"/></linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#rSky)"/>
        <ellipse cx="100" cy="95" rx="90" ry="55" fill="url(#rSun)"/>
        <rect y="82" width="200" height="78" fill="url(#rMist)"/>
        <path d="M0 100 Q40 90 80 97 Q120 104 160 95 Q180 90 200 96 L200 160 L0 160Z" fill="#445522" opacity="0.65"/>
        <path d="M0 112 Q50 104 100 108 Q150 112 200 106 L200 160 L0 160Z" fill="#334418" opacity="0.55"/>
        <path d="M0 124 Q60 118 120 122 Q160 126 200 120 L200 160 L0 160Z" fill="#22330a" opacity="0.5"/>
        <line x1="22" y1="88" x2="8" y2="72" stroke="#ffeebb" stroke-width="2.5" opacity="0.5" stroke-linecap="round"/>
        <line x1="178" y1="88" x2="192" y2="72" stroke="#ffeebb" stroke-width="2.5" opacity="0.5" stroke-linecap="round"/>
        <line x1="48" y1="82" x2="40" y2="68" stroke="#ffeebb" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
        <line x1="152" y1="82" x2="162" y2="68" stroke="#ffeebb" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
        <path d="M62 62 Q64 58 68 60 Q70 64 66 66 Q62 64 62 62Z" fill="#111122" opacity="0.6"/>
        <path d="M80 56 Q82 52 86 54 Q88 58 84 60 Q80 58 80 56Z" fill="#111122" opacity="0.5"/>
        <path d="M140 58 Q142 54 146 56 Q148 60 144 62 Q140 60 140 58Z" fill="#111122" opacity="0.55"/>
        <circle cx="32" cy="28" r="2" fill="white" opacity="0.25"/>
        <circle cx="158" cy="22" r="1.5" fill="white" opacity="0.2"/>
        <circle cx="88" cy="18" r="1" fill="white" opacity="0.15"/>
      </svg>`
    },
    {
      label: 'Galaxy',
      scene: 'spiral galaxy with violet nebula',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gCore" cx="48%" cy="52%"><stop offset="0%" stop-color="#ffffff"/><stop offset="10%" stop-color="#f0e8ff"/><stop offset="30%" stop-color="#c8a0e0"/><stop offset="60%" stop-color="#664488"/><stop offset="100%" stop-color="#0a0020"/></radialGradient>
          <radialGradient id="gNebula" cx="50%" cy="50%"><stop offset="0%" stop-color="#cc88ee" stop-opacity="0.2"/><stop offset="40%" stop-color="#8844aa" stop-opacity="0.1"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <radialGradient id="gStar" cx="50%" cy="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="#04020c"/>
        <ellipse cx="100" cy="80" rx="98" ry="78" fill="url(#gNebula)"/>
        <ellipse cx="96" cy="83" rx="72" ry="48" fill="none" stroke="#b890d0" stroke-width="16" opacity="0.1" transform="rotate(-22,96,83)"/>
        <ellipse cx="96" cy="83" rx="52" ry="32" fill="none" stroke="#d8b8f8" stroke-width="8" opacity="0.13" transform="rotate(-22,96,83)"/>
        <ellipse cx="96" cy="83" rx="34" ry="20" fill="none" stroke="#e8d0ff" stroke-width="4" opacity="0.16" transform="rotate(-22,96,83)"/>
        <circle cx="96" cy="83" r="20" fill="url(#gCore)" opacity="0.75"/>
        <circle cx="96" cy="83" r="7" fill="#ffffff" opacity="0.9"/>
        <circle cx="45" cy="32" r="2.5" fill="white" opacity="0.85"/>
        <circle cx="72" cy="18" r="2" fill="#d8b0ff" opacity="0.75"/>
        <circle cx="155" cy="28" r="2.5" fill="white" opacity="0.82"/>
        <circle cx="175" cy="55" r="2" fill="#d8b0ff" opacity="0.7"/>
        <circle cx="28" cy="75" r="1.5" fill="white" opacity="0.65"/>
        <circle cx="185" cy="88" r="2" fill="#d8b0ff" opacity="0.62"/>
        <circle cx="55" cy="125" r="2" fill="white" opacity="0.72"/>
        <circle cx="165" cy="118" r="1.5" fill="white" opacity="0.65"/>
        <circle cx="105" cy="145" r="2" fill="#d8b0ff" opacity="0.55"/>
        <circle cx="135" cy="55" r="1.2" fill="white" opacity="0.5"/>
        <circle cx="62" cy="98" r="1.5" fill="#d8b0ff" opacity="0.45"/>
        <circle cx="8" cy="30" r="1" fill="white" opacity="0.35"/>
        <circle cx="195" cy="15" r="1" fill="white" opacity="0.3"/>
        <circle cx="15" cy="148" r="1.2" fill="white" opacity="0.28"/>
      </svg>`
    },
    {
      label: 'Snow',
      scene: 'peaceful snow-covered forest at twilight',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1a2848"/><stop offset="35%" stop-color="#2a3a5a"/><stop offset="70%" stop-color="#587088"/><stop offset="100%" stop-color="#8898b0"/></linearGradient>
          <radialGradient id="wMoon" cx="50%" cy="50%"><stop offset="0%" stop-color="#f8fcff"/><stop offset="60%" stop-color="#d0dce8"/><stop offset="100%" stop-color="#a0b4cc"/></radialGradient>
          <radialGradient id="wAurora" cx="45%" cy="30%"><stop offset="0%" stop-color="#88ffcc" stop-opacity="0.12"/><stop offset="40%" stop-color="#44aacc" stop-opacity="0.06"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#wSky)"/>
        <ellipse cx="100" cy="55" rx="90" ry="55" fill="url(#wAurora)"/>
        <circle cx="155" cy="32" r="20" fill="url(#wMoon)" opacity="0.88"/>
        <circle cx="150" cy="26" r="15" fill="#2a3a5a" opacity="0.22"/>
        <path d="M20 150 L20 62 L10 62 L24 38 L14 38 L30 12 L44 38 L34 38 L48 62 L38 62 L38 150Z" fill="#eef2f8" opacity="0.48"/>
        <path d="M70 150 L70 68 L60 68 L74 45 L64 45 L80 22 L94 45 L84 45 L98 68 L88 68 L88 150Z" fill="#dde6f2" opacity="0.52"/>
        <path d="M125 150 L125 72 L115 72 L130 50 L120 50 L135 28 L148 50 L138 50 L152 72 L142 72 L142 150Z" fill="#eef2f8" opacity="0.48"/>
        <path d="M168 150 L168 78 L158 78 L172 58 L162 58 L176 38 L188 58 L178 58 L192 78 L182 78 L182 150Z" fill="#dde6f2" opacity="0.42"/>
        <path d="M0 110 Q50 102 100 106 Q150 110 200 104 L200 160 L0 160Z" fill="#f5f8fc" opacity="0.82"/>
        <path d="M0 122 Q60 116 120 120 Q160 124 200 118 L200 160 L0 160Z" fill="#e8eef5" opacity="0.88"/>
        <path d="M0 136 Q50 132 100 134 Q150 136 200 132 L200 160 L0 160Z" fill="#dde4ee" opacity="0.78"/>
        <circle cx="38" cy="30" r="2.5" fill="white" opacity="0.55"/>
        <circle cx="55" cy="22" r="2" fill="white" opacity="0.48"/>
        <circle cx="88" cy="25" r="2.5" fill="white" opacity="0.5"/>
        <circle cx="115" cy="16" r="2" fill="white" opacity="0.42"/>
        <circle cx="145" cy="30" r="2.5" fill="white" opacity="0.48"/>
        <circle cx="188" cy="24" r="2" fill="white" opacity="0.38"/>
        <circle cx="12" cy="45" r="1.5" fill="white" opacity="0.35"/>
      </svg>`
    },
    {
      label: 'Desert',
      scene: 'moonlit desert with rolling dunes',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#04081a"/><stop offset="30%" stop-color="#0a0a28"/><stop offset="60%" stop-color="#150a30"/><stop offset="100%" stop-color="#220a30"/></linearGradient>
          <linearGradient id="dSand" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#d8b060"/><stop offset="50%" stop-color="#b88840"/><stop offset="100%" stop-color="#6a4018"/></linearGradient>
          <radialGradient id="dMoonGlow" cx="50%" cy="50%"><stop offset="0%" stop-color="#ffe8cc" stop-opacity="0.25"/><stop offset="50%" stop-color="#ddaa55" stop-opacity="0.08"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#dSky)"/>
        <ellipse cx="160" cy="35" rx="40" ry="35" fill="url(#dMoonGlow)"/>
        <circle cx="160" cy="30" r="22" fill="#f0e4cc" opacity="0.88"/>
        <circle cx="153" cy="23" r="16" fill="#150a30" opacity="0.22"/>
        <path d="M0 78 Q45 64 90 73 Q135 82 180 70 Q190 66 200 72 L200 160 L0 160Z" fill="url(#dSand)"/>
        <path d="M0 94 Q55 84 110 90 Q155 96 200 88 L200 160 L0 160Z" fill="#c89840"/>
        <path d="M0 110 Q60 102 120 107 Q160 112 200 106 L200 160 L0 160Z" fill="#aa7830"/>
        <path d="M0 126 Q50 122 100 125 Q150 128 200 122 L200 160 L0 160Z" fill="#885820"/>
        <path d="M55 72 L62 42 L58 42 L66 22 L74 42 L70 42 L78 72Z" fill="#1a2a0a" opacity="0.8"/>
        <path d="M62 48 Q55 44 52 50" fill="none" stroke="#1a2a0a" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M66 42 Q72 38 74 46" fill="none" stroke="#1a2a0a" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="22" cy="18" r="2" fill="white" opacity="0.7"/>
        <circle cx="52" cy="10" r="1.5" fill="white" opacity="0.6"/>
        <circle cx="88" cy="15" r="2" fill="white" opacity="0.65"/>
        <circle cx="125" cy="8" r="1.5" fill="white" opacity="0.5"/>
        <circle cx="192" cy="12" r="1.5" fill="white" opacity="0.45"/>
        <circle cx="38" cy="52" r="1" fill="white" opacity="0.35"/>
        <circle cx="180" cy="55" r="1.2" fill="white" opacity="0.3"/>
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
