/* ===== INNER ELEMENT TOOL ===== */
Tools.element = (function() {
  const images = [
    {
      label: 'Volcano',
      scene: 'volcano erupting at sunset',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="vSky" cx="50%" cy="0%"><stop offset="0%" stop-color="#0a0018"/><stop offset="30%" stop-color="#1a0028"/><stop offset="60%" stop-color="#2a0818"/><stop offset="100%" stop-color="#1a0508"/></radialGradient>
          <radialGradient id="vErupt" cx="50%" cy="35%"><stop offset="0%" stop-color="#FF6618" stop-opacity="0.8"/><stop offset="25%" stop-color="#CC2200" stop-opacity="0.5"/><stop offset="55%" stop-color="#440000" stop-opacity="0.2"/><stop offset="100%" stop-color="#1a0508" stop-opacity="0"/></radialGradient>
          <linearGradient id="vLavaR" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFF8CC"/><stop offset="15%" stop-color="#FFD700"/><stop offset="40%" stop-color="#FF4500"/><stop offset="70%" stop-color="#880000"/><stop offset="100%" stop-color="#2A0000"/></linearGradient>
          <linearGradient id="vRock" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#2a1a15"/><stop offset="50%" stop-color="#1a0e08"/><stop offset="100%" stop-color="#0a0504"/></linearGradient>
          <radialGradient id="vGlow" cx="50%" cy="30%"><stop offset="0%" stop-color="#FF8844" stop-opacity="0.6"/><stop offset="50%" stop-color="#FF2200" stop-opacity="0.2"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#vSky)"/>
        <!-- Distant stars -->
        <circle cx="25" cy="12" r="1" fill="#FFCC99" opacity="0.5"/><circle cx="55" cy="8" r="0.8" fill="#FFCC99" opacity="0.4"/>
        <circle cx="145" cy="10" r="1.2" fill="#FFCC99" opacity="0.45"/><circle cx="175" cy="6" r="0.9" fill="#FFCC99" opacity="0.35"/>
        <circle cx="85" cy="5" r="0.7" fill="#FFCC99" opacity="0.3"/><circle cx="120" cy="15" r="1" fill="#FFCC99" opacity="0.4"/>
        <!-- Eruption glow -->
        <ellipse cx="100" cy="45" rx="110" ry="70" fill="url(#vErupt)"/>
        <ellipse cx="100" cy="25" rx="50" ry="35" fill="url(#vGlow)"/>
        <!-- Volcano silhouette -->
        <path d="M0 160 L35 95 L52 72 L68 55 L82 42 L92 32 L100 20 L108 32 L118 42 L132 55 L148 72 L165 95 L200 160Z" fill="url(#vRock)"/>
        <!-- Secondary peaks -->
        <path d="M0 160 L15 115 L28 105 L0 160Z" fill="#0f0805" opacity="0.7"/>
        <path d="M200 160 L185 115 L172 105 L200 160Z" fill="#0f0805" opacity="0.7"/>
        <!-- Lava flow -->
        <path d="M68 55 L82 42 L92 32 L100 20 L108 32 L118 42 L132 55 L118 62 L100 52 L82 62Z" fill="url(#vLavaR)" opacity="0.95"/>
        <!-- Lava veins -->
        <path d="M82 62 Q85 78 82 95 Q80 110 78 125" stroke="#FF5500" stroke-width="2.5" fill="none" opacity="0.75" stroke-linecap="round"/>
        <path d="M118 62 Q115 78 118 95 Q120 110 122 125" stroke="#FF5500" stroke-width="2" fill="none" opacity="0.7" stroke-linecap="round"/>
        <path d="M100 52 Q102 75 100 100 Q98 118 100 135" stroke="#FF7722" stroke-width="3.5" fill="none" opacity="0.6" stroke-linecap="round"/>
        <path d="M92 58 Q88 72 90 88" stroke="#FFAA33" stroke-width="1.5" fill="none" opacity="0.5" stroke-linecap="round"/>
        <path d="M108 58 Q112 72 110 88" stroke="#FFAA33" stroke-width="1.5" fill="none" opacity="0.45" stroke-linecap="round"/>
        <!-- Eruption core -->
        <ellipse cx="100" cy="15" rx="14" ry="8" fill="#FFAA44" opacity="0.85"/>
        <ellipse cx="100" cy="10" rx="8" ry="4" fill="#FFE066" opacity="0.9"/>
        <!-- Ash clouds -->
        <ellipse cx="75" cy="8" rx="22" ry="12" fill="#1a0808" opacity="0.7"/>
        <ellipse cx="125" cy="5" rx="28" ry="14" fill="#1a0808" opacity="0.75"/>
        <ellipse cx="100" cy="2" rx="18" ry="8" fill="#0a0202" opacity="0.8"/>
        <!-- Flying sparks -->
        <circle cx="60" cy="18" r="1.5" fill="#FFD700" opacity="0.9"><animate attributeName="cy" values="18;8;18" dur="2s" repeatCount="indefinite"/></circle>
        <circle cx="140" cy="22" r="1.2" fill="#FF8844" opacity="0.8"><animate attributeName="cy" values="22;10;22" dur="2.5s" repeatCount="indefinite"/></circle>
        <circle cx="85" cy="12" r="1" fill="#FFE066" opacity="0.7"><animate attributeName="cy" values="12;5;12" dur="1.8s" repeatCount="indefinite"/></circle>
        <circle cx="115" cy="15" r="1.3" fill="#FF5500" opacity="0.75"><animate attributeName="cy" values="15;6;15" dur="2.2s" repeatCount="indefinite"/></circle>
        <!-- Foreground silhouette -->
        <path d="M0 160 L200 160 L200 145 Q150 138 100 142 Q50 138 0 145Z" fill="#050203" opacity="0.9"/>
        <!-- Tiny human silhouette for scale -->
        <path d="M152 142 L152 136 Q152 134 154 134 Q156 134 156 136 L156 142 M154 134 L154 131 Q154 130 155 130 Q156 130 156 131 L156 134" stroke="#1a0a05" stroke-width="1.2" fill="none" opacity="0.5"/>
      </svg>`
    },
    {
      label: 'Ocean',
      scene: 'deep ocean waves under moonlight',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="oSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#02040a"/><stop offset="40%" stop-color="#060d25"/><stop offset="80%" stop-color="#081230"/><stop offset="100%" stop-color="#0a1438"/></linearGradient>
          <radialGradient id="oMoon" cx="50%" cy="50%"><stop offset="0%" stop-color="#F8FAFF"/><stop offset="40%" stop-color="#d8e0f0"/><stop offset="80%" stop-color="#8898b8"/><stop offset="100%" stop-color="#505870"/></radialGradient>
          <linearGradient id="oWave1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#001838"/><stop offset="50%" stop-color="#001020"/><stop offset="100%" stop-color="#000510"/></linearGradient>
          <linearGradient id="oWave2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#001c44"/><stop offset="100%" stop-color="#000818"/></linearGradient>
          <radialGradient id="oMoonPath" cx="50%" cy="50%"><stop offset="0%" stop-color="#44aacc" stop-opacity="0.2"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#oSky)"/>
        <!-- Stars -->
        <circle cx="22" cy="12" r="1" fill="white" opacity="0.5"/><circle cx="48" cy="6" r="0.8" fill="white" opacity="0.4"/>
        <circle cx="72" cy="15" r="0.9" fill="white" opacity="0.45"/><circle cx="92" cy="8" r="0.7" fill="white" opacity="0.35"/>
        <circle cx="132" cy="10" r="1.1" fill="white" opacity="0.5"/><circle cx="155" cy="5" r="0.8" fill="white" opacity="0.4"/>
        <circle cx="178" cy="14" r="0.9" fill="white" opacity="0.4"/>
        <!-- Moon -->
        <circle cx="155" cy="32" r="22" fill="url(#oMoon)" opacity="0.9"/>
        <circle cx="150" cy="27" r="16" fill="#060d25" opacity="0.3"/>
        <!-- Moonlight path on water -->
        <ellipse cx="155" cy="95" rx="50" ry="22" fill="url(#oMoonPath)" opacity="0.6"/>
        <ellipse cx="155" cy="88" rx="30" ry="10" fill="#8899cc" opacity="0.08"/>
        <!-- Wave layers -->
        <path d="M0 68 Q25 58 50 68 Q75 78 100 68 Q125 58 150 68 Q175 78 200 68 L200 160 L0 160Z" fill="url(#oWave2)" opacity="0.95"/>
        <path d="M0 82 Q35 70 70 82 Q105 94 140 82 Q170 72 200 82 L200 160 L0 160Z" fill="url(#oWave1)" opacity="0.9"/>
        <path d="M0 98 Q40 88 80 98 Q120 108 160 98 Q180 92 200 98 L200 160 L0 160Z" fill="#000c20" opacity="0.85"/>
        <path d="M0 114 Q45 106 90 112 Q135 118 180 110 Q190 108 200 112 L200 160 L0 160Z" fill="#000614" opacity="0.8"/>
        <path d="M0 130 Q50 124 100 128 Q150 132 200 126 L200 160 L0 160Z" fill="#00030a" opacity="0.9"/>
        <!-- Moonlight reflections -->
        <path d="M140 74 Q155 70 170 76" stroke="#aabbdd" stroke-width="1.5" fill="none" opacity="0.35" stroke-linecap="round"/>
        <path d="M145 82 Q155 78 165 84" stroke="#aabbdd" stroke-width="1" fill="none" opacity="0.3" stroke-linecap="round"/>
        <path d="M148 90 Q155 87 162 92" stroke="#aabbdd" stroke-width="0.8" fill="none" opacity="0.25" stroke-linecap="round"/>
        <!-- Lighthouse silhouette far right -->
        <rect x="182" y="52" width="3" height="18" fill="#0a0a12" opacity="0.6"/>
        <rect x="180" y="50" width="7" height="4" rx="1" fill="#0a0a12" opacity="0.5"/>
        <circle cx="183.5" cy="52" r="1.5" fill="#FFE066" opacity="0.4"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/></circle>
        <!-- Cloud wisps -->
        <ellipse cx="40" cy="25" rx="25" ry="10" fill="#0a0f20" opacity="0.5"/>
        <ellipse cx="110" cy="18" rx="30" ry="12" fill="#080c18" opacity="0.55"/>
      </svg>`
    },
    {
      label: 'Mountain',
      scene: 'snow-capped mountain at dawn',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1a2840"/><stop offset="25%" stop-color="#3a5078"/><stop offset="50%" stop-color="#6a80a0"/><stop offset="75%" stop-color="#a89080"/><stop offset="100%" stop-color="#d4a060"/></linearGradient>
          <linearGradient id="mPeak" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFF8F0"/><stop offset="40%" stop-color="#E8D8E0"/><stop offset="80%" stop-color="#A08090"/><stop offset="100%" stop-color="#605060"/></linearGradient>
          <linearGradient id="mSlope" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#4a5a70"/><stop offset="100%" stop-color="#2a3040"/></linearGradient>
          <linearGradient id="mSunrise" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF8844" stop-opacity="0.4"/><stop offset="50%" stop-color="#FFAA55" stop-opacity="0.2"/><stop offset="100%" stop-color="transparent"/></linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#mSky)"/>
        <!-- Sunrise glow behind peaks -->
        <ellipse cx="160" cy="55" rx="70" ry="50" fill="url(#mSunrise)"/>
        <!-- Distant mountain range -->
        <path d="M0 160 L25 100 L45 85 L60 95 L80 70 L95 80 L115 55 L135 70 L155 50 L170 65 L185 55 L200 75 L200 160Z" fill="#2a3040" opacity="0.45"/>
        <!-- Main peaks -->
        <path d="M0 160 L30 85 L55 105 L85 50 L105 75 L130 40 L155 70 L175 55 L200 80 L200 160Z" fill="url(#mSlope)"/>
        <!-- Snow caps on main peaks -->
        <path d="M85 50 L92 65 L100 72 L105 75 L100 62 L92 55Z" fill="url(#mPeak)" opacity="0.92"/>
        <path d="M130 40 L138 55 L145 62 L155 70 L148 58 L140 48Z" fill="url(#mPeak)" opacity="0.88"/>
        <path d="M175 55 L180 65 L185 70 L200 80 L190 68 L182 60Z" fill="url(#mPeak)" opacity="0.82"/>
        <!-- Snow highlight lines -->
        <path d="M85 50 L92 55" stroke="white" stroke-width="1" opacity="0.7" stroke-linecap="round"/>
        <path d="M130 40 L140 48" stroke="white" stroke-width="1" opacity="0.6" stroke-linecap="round"/>
        <path d="M175 55 L182 60" stroke="white" stroke-width="0.8" opacity="0.5" stroke-linecap="round"/>
        <!-- Mist/fog layer -->
        <path d="M0 100 Q50 95 100 102 Q150 108 200 100 L200 120 Q150 128 100 122 Q50 115 0 120Z" fill="#d4a060" opacity="0.15"/>
        <!-- Foreground valley -->
        <path d="M0 160 L40 125 L80 135 L120 120 L160 130 L200 115 L200 160Z" fill="#1a2018" opacity="0.7"/>
        <path d="M0 160 L60 140 L110 148 L160 138 L200 145 L200 160Z" fill="#0f140c" opacity="0.8"/>
        <!-- Pine tree silhouettes -->
        <path d="M15 142 L12 130 L15 130 L10 118 L14 118 L12 108 L18 118 L15 118 L20 130 L17 130 L20 142Z" fill="#0a0e08" opacity="0.6"/>
        <path d="M165 138 L162 128 L165 128 L160 118 L164 118 L162 110 L168 118 L165 118 L170 128 L167 128 L170 138Z" fill="#0a0e08" opacity="0.55"/>
        <path d="M185 140 L183 132 L185 132 L182 124 L184 124 L183 118 L187 124 L185 124 L188 132 L186 132 L188 140Z" fill="#0a0e08" opacity="0.5"/>
        <!-- Morning rays -->
        <path d="M160 55 L120 160" stroke="#FFAA55" stroke-width="30" opacity="0.06" stroke-linecap="round"/>
        <path d="M160 55 L80 160" stroke="#FF8844" stroke-width="20" opacity="0.05" stroke-linecap="round"/>
        <!-- Birds -->
        <path d="M45 35 Q48 32 51 35" stroke="#1a1a2a" stroke-width="0.8" fill="none" opacity="0.5"/>
        <path d="M55 30 Q58 27 61 30" stroke="#1a1a2a" stroke-width="0.7" fill="none" opacity="0.45"/>
        <path d="M38 40 Q40 38 42 40" stroke="#1a1a2a" stroke-width="0.6" fill="none" opacity="0.4"/>
      </svg>`
    },
    {
      label: 'Storm',
      scene: 'dramatic thunderstorm over plains',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#020208"/><stop offset="35%" stop-color="#080818"/><stop offset="70%" stop-color="#101028"/><stop offset="100%" stop-color="#181838"/></linearGradient>
          <radialGradient id="sBoltGlow" cx="50%" cy="40%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/><stop offset="30%" stop-color="#ffeeaa" stop-opacity="0.25"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <radialGradient id="sForkGlow" cx="50%" cy="50%"><stop offset="0%" stop-color="#fff8dd" stop-opacity="0.6"/><stop offset="100%" stop-color="#ffcc00" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#sSky)"/>
        <!-- Layered storm clouds -->
        <ellipse cx="35" cy="22" rx="50" ry="28" fill="#0a0a18" opacity="0.9"/>
        <ellipse cx="130" cy="16" rx="65" ry="35" fill="#0e0e20" opacity="0.92"/>
        <ellipse cx="175" cy="32" rx="45" ry="26" fill="#080818" opacity="0.88"/>
        <ellipse cx="15" cy="38" rx="38" ry="22" fill="#0c0c1c" opacity="0.85"/>
        <ellipse cx="85" cy="30" rx="40" ry="20" fill="#0a0a1a" opacity="0.8"/>
        <!-- Cloud highlights (lit from within by lightning) -->
        <ellipse cx="80" cy="65" rx="60" ry="42" fill="url(#sBoltGlow)" opacity="0.7"/>
        <!-- Main lightning bolt -->
        <path d="M95 35 L82 72 L90 68 L68 118 L75 114 L58 155" stroke="#FFF8DD" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M95 35 L82 72 L90 68 L68 118 L75 114 L58 155" stroke="#FFE066" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
        <ellipse cx="78" cy="95" rx="28" ry="32" fill="url(#sForkGlow)" opacity="0.55"/>
        <!-- Secondary lightning -->
        <path d="M155 28 L148 52 L153 50 L142 78" stroke="#CCBBDD" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.35"/>
        <path d="M42 32 L36 55 L40 53 L30 78" stroke="#BBCCDD" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.3"/>
        <!-- Distant lightning flash (background) -->
        <ellipse cx="165" cy="55" rx="30" ry="40" fill="#FFE066" opacity="0.04"/>
        <!-- Rain streaks -->
        <line x1="12" y1="85" x2="8" y2="105" stroke="#334464" stroke-width="0.7" opacity="0.2"/>
        <line x1="28" y1="80" x2="24" y2="102" stroke="#334464" stroke-width="0.6" opacity="0.18"/>
        <line x1="48" y1="88" x2="44" y2="108" stroke="#334464" stroke-width="0.8" opacity="0.22"/>
        <line x1="108" y1="82" x2="104" y2="106" stroke="#334464" stroke-width="0.7" opacity="0.2"/>
        <line x1="128" y1="86" x2="124" y2="110" stroke="#334464" stroke-width="0.6" opacity="0.18"/>
        <line x1="148" y1="80" x2="144" y2="104" stroke="#334464" stroke-width="0.7" opacity="0.2"/>
        <line x1="168" y1="85" x2="164" y2="108" stroke="#334464" stroke-width="0.6" opacity="0.16"/>
        <line x1="188" y1="82" x2="184" y2="105" stroke="#334464" stroke-width="0.7" opacity="0.18"/>
        <!-- Ground plains -->
        <path d="M0 110 Q50 102 100 108 Q150 114 200 106 L200 160 L0 160Z" fill="#0a0a14" opacity="0.85"/>
        <path d="M0 125 Q60 118 120 124 Q160 128 200 120 L200 160 L0 160Z" fill="#05050a" opacity="0.9"/>
        <!-- Small house silhouette -->
        <path d="M155 118 L160 112 L165 118 L165 125 L155 125Z" fill="#080810" opacity="0.6"/>
        <rect x="158" y="120" width="4" height="5" fill="#0a0a14" opacity="0.5"/>
        <!-- Grass silhouettes -->
        <path d="M20 130 L19 122 L21 130 M25 131 L24 123 L26 131 M30 130 L29 124 L31 130" stroke="#0a0e14" stroke-width="0.8" fill="none" opacity="0.5"/>
        <path d="M140 128 L139 120 L141 128 M145 129 L144 121 L146 129" stroke="#0a0e14" stroke-width="0.8" fill="none" opacity="0.45"/>
      </svg>`
    },
    {
      label: 'Forest',
      scene: 'ancient misty forest with light rays',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#060d06"/><stop offset="50%" stop-color="#0e1e0e"/><stop offset="100%" stop-color="#081008"/></linearGradient>
          <linearGradient id="fRay" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffe8a0" stop-opacity="0.28"/><stop offset="50%" stop-color="#ddaa44" stop-opacity="0.1"/><stop offset="100%" stop-color="transparent"/></linearGradient>
          <radialGradient id="fGlow" cx="50%" cy="20%"><stop offset="0%" stop-color="#ffdd88" stop-opacity="0.18"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <radialGradient id="fSpore" cx="50%" cy="50%"><stop offset="0%" stop-color="#ccffaa" stop-opacity="0.6"/><stop offset="100%" stop-color="#88ff66" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#fSky)"/>
        <!-- Background glow -->
        <ellipse cx="100" cy="45" rx="85" ry="55" fill="url(#fGlow)"/>
        <!-- Light rays from canopy gaps -->
        <path d="M25 0 L38 160" stroke="url(#fRay)" stroke-width="18" opacity="0.3"/>
        <path d="M65 0 L75 160" stroke="url(#fRay)" stroke-width="24" opacity="0.25"/>
        <path d="M110 0 L105 160" stroke="url(#fRay)" stroke-width="16" opacity="0.28"/>
        <path d="M150 0 L142 160" stroke="url(#fRay)" stroke-width="20" opacity="0.22"/>
        <path d="M185 0 L178 160" stroke="url(#fRay)" stroke-width="14" opacity="0.2"/>
        <!-- Background trees (darker, smaller) -->
        <path d="M5 160 L5 75 L0 75 L8 55 L3 55 L12 35 L20 55 L15 55 L22 75 L18 75 L18 160Z" fill="#0a180a" opacity="0.55"/>
        <path d="M48 160 L48 80 L42 80 L50 62 L44 62 L55 42 L65 62 L59 62 L66 80 L60 80 L60 160Z" fill="#0e200e" opacity="0.6"/>
        <path d="M95 160 L95 70 L88 70 L96 48 L90 48 L102 25 L112 48 L106 48 L114 70 L108 70 L108 160Z" fill="#0c1c0c" opacity="0.65"/>
        <path d="M145 160 L145 78 L138 78 L146 58 L140 58 L150 38 L160 58 L154 58 L162 78 L156 78 L156 160Z" fill="#0a1a0a" opacity="0.58"/>
        <path d="M185 160 L185 85 L178 85 L186 68 L180 68 L190 50 L198 68 L192 68 L200 85 L192 85 L192 160Z" fill="#0e1e0e" opacity="0.52"/>
        <!-- Midground trees -->
        <path d="M22 160 L22 55 L15 55 L25 30 L32 45 L28 45 L36 55 L30 55 L30 160Z" fill="#122812" opacity="0.75"/>
        <path d="M72 160 L72 48 L65 48 L75 22 L82 38 L78 38 L86 48 L80 48 L80 160Z" fill="#162e16" opacity="0.82"/>
        <path d="M125 160 L125 52 L118 52 L128 28 L135 42 L131 42 L139 52 L133 52 L133 160Z" fill="#142a14" opacity="0.78"/>
        <path d="M168 160 L168 60 L162 60 L170 38 L176 50 L172 50 L180 60 L174 60 L174 160Z" fill="#122612" opacity="0.72"/>
        <!-- Foreground trees (largest, closest) -->
        <path d="M0 160 L0 42 L-5 42 L8 12 L18 32 L12 32 L22 42 L15 42 L15 160Z" fill="#1a381a" opacity="0.9"/>
        <path d="M185 160 L185 48 L180 48 L190 18 L198 35 L194 35 L202 48 L195 48 L195 160Z" fill="#183618" opacity="0.88"/>
        <!-- Tree trunk details -->
        <rect x="5" y="95" width="4" height="65" fill="#1e3a1e" opacity="0.6"/>
        <rect x="190" y="95" width="3" height="65" fill="#1c361c" opacity="0.55"/>
        <!-- Forest floor -->
        <path d="M0 140 Q55 128 110 138 Q155 146 200 134 L200 160 L0 160Z" fill="#0a160a" opacity="0.7"/>
        <path d="M0 150 Q50 142 100 148 Q150 154 200 146 L200 160 L0 160Z" fill="#060e06" opacity="0.8"/>
        <!-- Floating spores/pollen in light -->
        <circle cx="35" cy="65" r="3" fill="url(#fSpore)" opacity="0.7"><animate attributeName="cy" values="65;55;65" dur="4s" repeatCount="indefinite"/></circle>
        <circle cx="72" cy="45" r="2.2" fill="url(#fSpore)" opacity="0.6"><animate attributeName="cy" values="45;38;45" dur="3.5s" repeatCount="indefinite"/></circle>
        <circle cx="108" cy="72" r="2.5" fill="url(#fSpore)" opacity="0.65"><animate attributeName="cy" values="72;62;72" dur="4.5s" repeatCount="indefinite"/></circle>
        <circle cx="148" cy="55" r="2" fill="url(#fSpore)" opacity="0.55"><animate attributeName="cy" values="55;48;55" dur="3.8s" repeatCount="indefinite"/></circle>
        <circle cx="55" cy="88" r="1.8" fill="url(#fSpore)" opacity="0.5"><animate attributeName="cy" values="88;80;88" dur="5s" repeatCount="indefinite"/></circle>
        <circle cx="168" cy="78" r="2.2" fill="url(#fSpore)" opacity="0.6"><animate attributeName="cy" values="78;70;78" dur="4.2s" repeatCount="indefinite"/></circle>
        <!-- Small plants on forest floor -->
        <path d="M45 145 Q43 138 42 142 M47 145 Q49 136 50 140" stroke="#0e1e0e" stroke-width="1" fill="none" opacity="0.5"/>
        <path d="M130 148 Q128 140 127 144 M132 148 Q134 138 135 142" stroke="#0e1e0e" stroke-width="1" fill="none" opacity="0.45"/>
      </svg>`
    },
    {
      label: 'Campfire',
      scene: 'glowing campfire under starry sky',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="cGlow" cx="50%" cy="80%"><stop offset="0%" stop-color="#ff8844" stop-opacity="0.55"/><stop offset="30%" stop-color="#dd3311" stop-opacity="0.2"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <radialGradient id="cCore" cx="50%" cy="82%"><stop offset="0%" stop-color="#fff8dd"/><stop offset="12%" stop-color="#ffdd44"/><stop offset="35%" stop-color="#ff5500"/><stop offset="65%" stop-color="#880000"/><stop offset="100%" stop-color="#1a0000"/></radialGradient>
          <radialGradient id="cEmber" cx="50%" cy="50%"><stop offset="0%" stop-color="#ffcc66" stop-opacity="0.85"/><stop offset="100%" stop-color="#ff4400" stop-opacity="0"/></radialGradient>
          <radialGradient id="cSkyGlow" cx="50%" cy="30%"><stop offset="0%" stop-color="#1a0a30" stop-opacity="0.5"/><stop offset="100%" stop-color="#040208"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="#030208"/>
        <!-- Sky with faint nebula -->
        <ellipse cx="100" cy="40" rx="95" ry="55" fill="url(#cSkyGlow)"/>
        <!-- Milky way band -->
        <ellipse cx="60" cy="25" rx="80" ry="12" fill="#1a1030" opacity="0.3" transform="rotate(-15,60,25)"/>
        <ellipse cx="140" cy="35" rx="70" ry="10" fill="#1a1030" opacity="0.25" transform="rotate(-12,140,35)"/>
        <!-- Stars -->
        <circle cx="25" cy="12" r="1.2" fill="white" opacity="0.75"/><circle cx="48" cy="6" r="0.9" fill="white" opacity="0.6"/>
        <circle cx="72" cy="15" r="1" fill="white" opacity="0.65"/><circle cx="92" cy="8" r="0.8" fill="white" opacity="0.5"/>
        <circle cx="125" cy="10" r="1.3" fill="white" opacity="0.7"/><circle cx="148" cy="5" r="0.9" fill="white" opacity="0.6"/>
        <circle cx="168" cy="14" r="1.1" fill="white" opacity="0.65"/><circle cx="185" cy="8" r="0.8" fill="white" opacity="0.5"/>
        <circle cx="38" cy="22" r="0.7" fill="white" opacity="0.45"/><circle cx="82" cy="18" r="0.9" fill="white" opacity="0.55"/>
        <circle cx="108" cy="20" r="0.7" fill="white" opacity="0.4"/><circle cx="158" cy="22" r="0.8" fill="white" opacity="0.5"/>
        <!-- Bright stars twinkling -->
        <circle cx="55" cy="10" r="1.5" fill="#FFE066" opacity="0.9"><animate attributeName="opacity" values="0.9;0.4;0.9" dur="2.5s" repeatCount="indefinite"/></circle>
        <circle cx="135" cy="8" r="1.3" fill="#FFE066" opacity="0.85"><animate attributeName="opacity" values="0.85;0.35;0.85" dur="3s" repeatCount="indefinite"/></circle>
        <circle cx="178" cy="18" r="1.1" fill="#FFE066" opacity="0.75"><animate attributeName="opacity" values="0.75;0.3;0.75" dur="2.8s" repeatCount="indefinite"/></circle>
        <!-- Ground glow from fire -->
        <ellipse cx="100" cy="125" rx="85" ry="40" fill="url(#cGlow)"/>
        <!-- Logs -->
        <line x1="52" y1="142" x2="95" y2="92" stroke="#3a2210" stroke-width="7" stroke-linecap="round"/>
        <line x1="148" y1="142" x2="105" y2="92" stroke="#2a1808" stroke-width="7" stroke-linecap="round"/>
        <line x1="70" y1="145" x2="100" y2="88" stroke="#3a2210" stroke-width="5" stroke-linecap="round"/>
        <line x1="130" y1="145" x2="100" y2="88" stroke="#2a1808" stroke-width="5" stroke-linecap="round"/>
        <line x1="85" y1="146" x2="98" y2="95" stroke="#3a2210" stroke-width="4" stroke-linecap="round"/>
        <line x1="115" y1="146" x2="102" y2="95" stroke="#2a1808" stroke-width="4" stroke-linecap="round"/>
        <!-- Fire layers -->
        <path d="M65 100 Q100 48 135 100 Q120 120 100 120 Q80 120 65 100Z" fill="url(#cCore)" opacity="0.95"/>
        <path d="M74 98 Q100 64 126 98 Q116 112 100 112 Q84 112 74 98Z" fill="#ffaa22" opacity="0.9"/>
        <path d="M82 96 Q100 74 118 96 Q112 106 100 106 Q88 106 82 96Z" fill="#ffe844" opacity="0.9"/>
        <!-- Fire core white hot -->
        <ellipse cx="100" cy="86" rx="7" ry="14" fill="#ffffff" opacity="0.85"/>
        <ellipse cx="100" cy="82" rx="4" ry="8" fill="#fff8dd" opacity="0.95"/>
        <!-- Floating embers/sparks -->
        <circle cx="82" cy="68" r="2.8" fill="url(#cEmber)" opacity="0.9"><animate attributeName="cy" values="68;45;68" dur="2.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.2s" repeatCount="indefinite"/></circle>
        <circle cx="118" cy="58" r="2.2" fill="url(#cEmber)" opacity="0.85"><animate attributeName="cy" values="58;38;58" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.85;0.15;0.85" dur="2.8s" repeatCount="indefinite"/></circle>
        <circle cx="95" cy="62" r="2" fill="url(#cEmber)" opacity="0.8"><animate attributeName="cy" values="62;42;62" dur="2.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.5s" repeatCount="indefinite"/></circle>
        <circle cx="108" cy="72" r="1.8" fill="url(#cEmber)" opacity="0.75"><animate attributeName="cy" values="72;55;72" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.75;0.15;0.75" dur="2s" repeatCount="indefinite"/></circle>
        <circle cx="88" cy="78" r="1.5" fill="url(#cEmber)" opacity="0.7"><animate attributeName="cy" values="78;62;78" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.4s" repeatCount="indefinite"/></circle>
        <!-- Ground -->
        <path d="M0 160 L200 160 L200 142 Q150 135 100 140 Q50 135 0 142Z" fill="#0a0805" opacity="0.9"/>
        <!-- Small stones around fire -->
        <ellipse cx="58" cy="140" rx="5" ry="3" fill="#1a1510" opacity="0.7"/>
        <ellipse cx="142" cy="138" rx="6" ry="3.5" fill="#15120c" opacity="0.65"/>
        <ellipse cx="48" cy="145" rx="4" ry="2.5" fill="#1a1510" opacity="0.6"/>
        <ellipse cx="152" cy="143" rx="4" ry="2.5" fill="#15120c" opacity="0.55"/>
      </svg>`
    },
    {
      label: 'Sunrise',
      scene: 'golden sunrise over misty valley',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="rSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0a0a28"/><stop offset="15%" stop-color="#2a1848"/><stop offset="35%" stop-color="#5a2868"/><stop offset="55%" stop-color="#a84050"/><stop offset="75%" stop-color="#e86828"/><stop offset="100%" stop-color="#ffaa44"/></linearGradient>
          <radialGradient id="rSun" cx="50%" cy="100%"><stop offset="0%" stop-color="#ffffff" stop-opacity="1"/><stop offset="15%" stop-color="#ffe044" stop-opacity="0.85"/><stop offset="40%" stop-color="#ff8800" stop-opacity="0.45"/><stop offset="70%" stop-color="#ff4400" stop-opacity="0.15"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <linearGradient id="rMist" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffddaa" stop-opacity="0.25"/><stop offset="100%" stop-color="transparent"/></linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#rSky)"/>
        <!-- Sun rising (half visible) -->
        <ellipse cx="100" cy="92" rx="95" ry="65" fill="url(#rSun)"/>
        <ellipse cx="100" cy="82" rx="60" ry="30" fill="#FFDD88" opacity="0.35"/>
        <ellipse cx="100" cy="75" rx="35" ry="15" fill="#FFEECC" opacity="0.45"/>
        <!-- Mist layers -->
        <path d="M0 95 Q40 88 80 94 Q120 100 160 92 Q180 88 200 93 L200 115 Q150 122 100 116 Q50 110 0 115Z" fill="url(#rMist)" opacity="0.5"/>
        <path d="M0 108 Q50 100 100 106 Q150 112 200 104 L200 125 Q150 132 100 126 Q50 120 0 125Z" fill="url(#rMist)" opacity="0.35"/>
        <!-- Valley layers -->
        <path d="M0 100 Q35 92 70 97 Q105 102 140 95 Q170 90 200 96 L200 160 L0 160Z" fill="#2a3a1a" opacity="0.6"/>
        <path d="M0 110 Q40 104 80 108 Q120 112 160 106 Q180 103 200 108 L200 160 L0 160Z" fill="#1e2e12" opacity="0.55"/>
        <path d="M0 120 Q45 114 90 118 Q135 122 180 116 Q190 114 200 118 L200 160 L0 160Z" fill="#162208" opacity="0.5"/>
        <path d="M0 132 Q50 126 100 130 Q150 134 200 128 L200 160 L0 160Z" fill="#0f1805" opacity="0.65"/>
        <!-- Sun rays -->
        <path d="M15 88 L2 68" stroke="#ffeebb" stroke-width="2.5" opacity="0.5" stroke-linecap="round"/>
        <path d="M185 88 L198 68" stroke="#ffeebb" stroke-width="2.5" opacity="0.5" stroke-linecap="round"/>
        <path d="M42 82 L32 62" stroke="#ffeebb" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
        <path d="M158 82 L168 62" stroke="#ffeebb" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
        <path d="M65 78 L58 58" stroke="#ffeebb" stroke-width="1.5" opacity="0.35" stroke-linecap="round"/>
        <path d="M135 78 L142 58" stroke="#ffeebb" stroke-width="1.5" opacity="0.35" stroke-linecap="round"/>
        <!-- Birds in dawn sky -->
        <path d="M48 42 Q52 38 56 42" stroke="#1a1020" stroke-width="0.9" fill="none" opacity="0.5"/>
        <path d="M58 35 Q62 31 66 35" stroke="#1a1020" stroke-width="0.8" fill="none" opacity="0.45"/>
        <path d="M42 48 Q45 45 48 48" stroke="#1a1020" stroke-width="0.7" fill="none" opacity="0.4"/>
        <path d="M142 38 Q146 34 150 38" stroke="#1a1020" stroke-width="0.85" fill="none" opacity="0.48"/>
        <path d="M152 32 Q155 29 158 32" stroke="#1a1020" stroke-width="0.75" fill="none" opacity="0.42"/>
        <!-- Morning dew drops on grass (silhouettes) -->
        <path d="M25 140 L25 132 M28 141 L28 134 M32 140 L32 133" stroke="#0f1805" stroke-width="0.8" fill="none" opacity="0.4"/>
        <path d="M165 138 L165 130 M168 139 L168 132 M172 138 L172 131" stroke="#0f1805" stroke-width="0.8" fill="none" opacity="0.38"/>
      </svg>`
    },
    {
      label: 'Galaxy',
      scene: 'spiral galaxy with violet nebula',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gCore" cx="48%" cy="52%"><stop offset="0%" stop-color="#ffffff"/><stop offset="8%" stop-color="#f0e8ff"/><stop offset="25%" stop-color="#c8a0e0"/><stop offset="55%" stop-color="#664488"/><stop offset="100%" stop-color="#0a0018"/></radialGradient>
          <radialGradient id="gNebula" cx="50%" cy="50%"><stop offset="0%" stop-color="#cc88ee" stop-opacity="0.25"/><stop offset="35%" stop-color="#8844aa" stop-opacity="0.12"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <radialGradient id="gNebula2" cx="30%" cy="40%"><stop offset="0%" stop-color="#aa66cc" stop-opacity="0.15"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <radialGradient id="gStar" cx="50%" cy="50%"><stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="#020108"/>
        <!-- Deep space background nebula -->
        <ellipse cx="100" cy="80" rx="100" ry="80" fill="url(#gNebula)"/>
        <ellipse cx="60" cy="55" rx="70" ry="50" fill="url(#gNebula2)"/>
        <ellipse cx="140" cy="95" rx="55" ry="40" fill="#442266" opacity="0.08"/>
        <!-- Galaxy spiral arms -->
        <ellipse cx="96" cy="83" rx="78" ry="50" fill="none" stroke="#b890d0" stroke-width="18" opacity="0.12" transform="rotate(-22,96,83)"/>
        <ellipse cx="96" cy="83" rx="58" ry="36" fill="none" stroke="#d8b8f8" stroke-width="10" opacity="0.15" transform="rotate(-22,96,83)"/>
        <ellipse cx="96" cy="83" rx="40" ry="24" fill="none" stroke="#e8d0ff" stroke-width="5" opacity="0.18" transform="rotate(-22,96,83)"/>
        <ellipse cx="96" cy="83" rx="26" ry="14" fill="none" stroke="#f0e0ff" stroke-width="2.5" opacity="0.22" transform="rotate(-22,96,83)"/>
        <!-- Second spiral arm offset -->
        <ellipse cx="104" cy="77" rx="65" ry="42" fill="none" stroke="#a880c0" stroke-width="14" opacity="0.08" transform="rotate(-22,104,77)"/>
        <ellipse cx="104" cy="77" rx="48" ry="30" fill="none" stroke="#c8a8e0" stroke-width="7" opacity="0.1" transform="rotate(-22,104,77)"/>
        <!-- Galaxy core -->
        <circle cx="96" cy="83" r="22" fill="url(#gCore)" opacity="0.8"/>
        <circle cx="96" cy="83" r="9" fill="#ffffff" opacity="0.95"/>
        <circle cx="96" cy="83" r="4" fill="#fff8ff" opacity="1"/>
        <!-- Bright stars -->
        <circle cx="42" cy="28" r="2.8" fill="white" opacity="0.9"/>
        <circle cx="42" cy="28" r="5" fill="url(#gStar)" opacity="0.5"/>
        <circle cx="72" cy="14" r="2.2" fill="#e8d0ff" opacity="0.8"/>
        <circle cx="72" cy="14" r="4" fill="url(#gStar)" opacity="0.4"/>
        <circle cx="158" cy="24" r="2.8" fill="white" opacity="0.88"/>
        <circle cx="158" cy="24" r="5" fill="url(#gStar)" opacity="0.45"/>
        <circle cx="178" cy="52" r="2.2" fill="#e8d0ff" opacity="0.75"/>
        <circle cx="178" cy="52" r="4" fill="url(#gStar)" opacity="0.38"/>
        <circle cx="25" cy="72" r="1.8" fill="white" opacity="0.68"/>
        <circle cx="25" cy="72" r="3" fill="url(#gStar)" opacity="0.35"/>
        <circle cx="188" cy="86" r="2.2" fill="#e8d0ff" opacity="0.65"/>
        <circle cx="188" cy="86" r="4" fill="url(#gStar)" opacity="0.32"/>
        <circle cx="52" cy="122" r="2.2" fill="white" opacity="0.75"/>
        <circle cx="52" cy="122" r="4" fill="url(#gStar)" opacity="0.4"/>
        <circle cx="168" cy="116" r="1.8" fill="white" opacity="0.68"/>
        <circle cx="168" cy="116" r="3" fill="url(#gStar)" opacity="0.35"/>
        <circle cx="105" cy="144" r="2.2" fill="#e8d0ff" opacity="0.58"/>
        <circle cx="105" cy="144" r="4" fill="url(#gStar)" opacity="0.28"/>
        <!-- Medium stars -->
        <circle cx="18" cy="42" r="1.2" fill="white" opacity="0.55"/><circle cx="38" cy="52" r="1" fill="#d8b0ff" opacity="0.48"/>
        <circle cx="62" cy="38" r="1.1" fill="white" opacity="0.52"/><circle cx="88" cy="32" r="0.9" fill="#d8b0ff" opacity="0.42"/>
        <circle cx="118" cy="28" r="1.2" fill="white" opacity="0.58"/><circle cx="138" cy="42" r="1" fill="#d8b0ff" opacity="0.45"/>
        <circle cx="148" cy="58" r="1.1" fill="white" opacity="0.5"/><circle cx="128" cy="72" r="0.9" fill="#d8b0ff" opacity="0.4"/>
        <circle cx="82" cy="108" r="1" fill="white" opacity="0.48"/><circle cx="58" cy="98" r="1.1" fill="#d8b0ff" opacity="0.42"/>
        <circle cx="142" cy="98" r="1" fill="white" opacity="0.45"/><circle cx="118" cy="112" r="0.9" fill="#d8b0ff" opacity="0.38"/>
        <circle cx="78" cy="138" r="1.1" fill="white" opacity="0.42"/><circle cx="182" cy="128" r="1" fill="#d8b0ff" opacity="0.35"/>
        <!-- Tiny distant stars -->
        <circle cx="8" cy="28" r="0.7" fill="white" opacity="0.4"/><circle cx="32" cy="18" r="0.6" fill="white" opacity="0.35"/>
        <circle cx="98" cy="8" r="0.8" fill="white" opacity="0.45"/><circle cx="172" cy="12" r="0.7" fill="white" opacity="0.38"/>
        <circle cx="192" cy="38" r="0.6" fill="white" opacity="0.32"/><circle cx="12" cy="95" r="0.7" fill="white" opacity="0.35"/>
        <circle cx="32" cy="132" r="0.6" fill="white" opacity="0.3"/><circle cx="92" cy="152" r="0.7" fill="white" opacity="0.35"/>
        <circle cx="132" cy="148" r="0.6" fill="white" opacity="0.3"/><circle cx="192" cy="108" r="0.7" fill="white" opacity="0.32"/>
      </svg>`
    },
    {
      label: 'Snow',
      scene: 'peaceful snow-covered forest at twilight',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0a1020"/><stop offset="30%" stop-color="#122038"/><stop offset="60%" stop-color="#1e3050"/><stop offset="100%" stop-color="#2a4060"/></linearGradient>
          <radialGradient id="wMoon" cx="50%" cy="50%"><stop offset="0%" stop-color="#f0f4f8"/><stop offset="50%" stop-color="#c8d4e4"/><stop offset="100%" stop-color="#8898b0"/></radialGradient>
          <radialGradient id="wAurora" cx="40%" cy="25%"><stop offset="0%" stop-color="#88ffcc" stop-opacity="0.15"/><stop offset="30%" stop-color="#44aacc" stop-opacity="0.08"/><stop offset="100%" stop-color="transparent"/></radialGradient>
          <linearGradient id="wSnow" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#e8eef5"/><stop offset="50%" stop-color="#dde4ee"/><stop offset="100%" stop-color="#c8d0d8"/></linearGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#wSky)"/>
        <!-- Aurora borealis -->
        <ellipse cx="80" cy="40" rx="90" ry="55" fill="url(#wAurora)"/>
        <path d="M30 25 Q60 35 90 20 Q120 30 150 18" stroke="#66ffaa" stroke-width="8" fill="none" opacity="0.08" stroke-linecap="round"/>
        <path d="M40 35 Q70 42 100 28 Q130 38 160 28" stroke="#44ddcc" stroke-width="6" fill="none" opacity="0.06" stroke-linecap="round"/>
        <!-- Moon -->
        <circle cx="155" cy="28" r="18" fill="url(#wMoon)" opacity="0.9"/>
        <circle cx="150" cy="22" r="13" fill="#122038" opacity="0.25"/>
        <!-- Moon glow -->
        <ellipse cx="155" cy="85" rx="45" ry="18" fill="#88aacc" opacity="0.06"/>
        <!-- Distant mountains -->
        <path d="M0 160 L30 105 L50 115 L75 85 L95 100 L115 75 L135 95 L160 80 L180 95 L200 85 L200 160Z" fill="#1a2840" opacity="0.4"/>
        <!-- Snow-covered trees -->
        <path d="M15 160 L15 58 L8 58 L18 35 L12 35 L24 12 L34 35 L28 35 L38 58 L32 58 L32 160Z" fill="url(#wSnow)" opacity="0.55"/>
        <path d="M65 160 L65 65 L58 65 L68 42 L62 42 L75 18 L85 42 L79 42 L89 65 L82 65 L82 160Z" fill="url(#wSnow)" opacity="0.6"/>
        <path d="M118 160 L118 60 L110 60 L120 38 L114 38 L128 15 L138 38 L132 38 L142 60 L135 60 L135 160Z" fill="url(#wSnow)" opacity="0.58"/>
        <path d="M162 160 L162 68 L155 68 L165 45 L158 45 L172 22 L182 45 L176 45 L186 68 L179 68 L179 160Z" fill="url(#wSnow)" opacity="0.52"/>
        <!-- Tree trunks (dark) -->
        <rect x="21" y="95" width="4" height="65" fill="#0e1828" opacity="0.5"/>
        <rect x="71" y="100" width="4" height="60" fill="#0e1828" opacity="0.48"/>
        <rect x="124" y="95" width="4" height="65" fill="#0e1828" opacity="0.5"/>
        <rect x="168" y="100" width="4" height="60" fill="#0e1828" opacity="0.45"/>
        <!-- Snow on branches highlights -->
        <path d="M15 58 L18 55" stroke="white" stroke-width="1" opacity="0.5" stroke-linecap="round"/>
        <path d="M32 58 L35 55" stroke="white" stroke-width="1" opacity="0.45" stroke-linecap="round"/>
        <path d="M65 65 L68 62" stroke="white" stroke-width="1" opacity="0.48" stroke-linecap="round"/>
        <path d="M82 65 L85 62" stroke="white" stroke-width="1" opacity="0.42" stroke-linecap="round"/>
        <path d="M118 60 L121 57" stroke="white" stroke-width="1" opacity="0.45" stroke-linecap="round"/>
        <path d="M135 60 L138 57" stroke="white" stroke-width="1" opacity="0.4" stroke-linecap="round"/>
        <!-- Snow ground layers -->
        <path d="M0 110 Q50 102 100 108 Q150 114 200 106 L200 160 L0 160Z" fill="#d8e0ea" opacity="0.85"/>
        <path d="M0 122 Q60 114 120 120 Q160 124 200 118 L200 160 L0 160Z" fill="#c8d2dc" opacity="0.88"/>
        <path d="M0 136 Q50 130 100 134 Q150 138 200 132 L200 160 L0 160Z" fill="#b8c4d0" opacity="0.78"/>
        <!-- Snowdrifts -->
        <path d="M0 148 Q30 142 60 146 Q90 150 120 144 Q150 140 200 145 L200 160 L0 160Z" fill="#a8b8c4" opacity="0.65"/>
        <!-- Falling snowflakes -->
        <circle cx="25" cy="35" r="2.2" fill="white" opacity="0.6"><animate attributeName="cy" values="35;150;35" dur="4s" repeatCount="indefinite"/></circle>
        <circle cx="55" cy="22" r="1.8" fill="white" opacity="0.55"><animate attributeName="cy" values="22;150;22" dur="3.5s" repeatCount="indefinite"/></circle>
        <circle cx="88" cy="40" r="2" fill="white" opacity="0.5"><animate attributeName="cy" values="40;150;40" dur="4.5s" repeatCount="indefinite"/></circle>
        <circle cx="115" cy="18" r="1.8" fill="white" opacity="0.58"><animate attributeName="cy" values="18;150;18" dur="3.8s" repeatCount="indefinite"/></circle>
        <circle cx="145" cy="32" r="2.2" fill="white" opacity="0.52"><animate attributeName="cy" values="32;150;32" dur="4.2s" repeatCount="indefinite"/></circle>
        <circle cx="178" cy="25" r="1.8" fill="white" opacity="0.48"><animate attributeName="cy" values="25;150;25" dur="3.6s" repeatCount="indefinite"/></circle>
        <circle cx="42" cy="55" r="1.5" fill="white" opacity="0.45"><animate attributeName="cy" values="55;150;55" dur="5s" repeatCount="indefinite"/></circle>
        <circle cx="132" cy="48" r="1.5" fill="white" opacity="0.42"><animate attributeName="cy" values="48;150;48" dur="4.8s" repeatCount="indefinite"/></circle>
        <circle cx="168" cy="58" r="1.5" fill="white" opacity="0.4"><animate attributeName="cy" values="58;150;58" dur="4.3s" repeatCount="indefinite"/></circle>
        <circle cx="75" cy="68" r="1.2" fill="white" opacity="0.38"><animate attributeName="cy" values="68;150;68" dur="5.2s" repeatCount="indefinite"/></circle>
      </svg>`
    },
    {
      label: 'Desert',
      scene: 'moonlit desert with rolling dunes',
      svg: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dSky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#02040a"/><stop offset="25%" stop-color="#060618"/><stop offset="55%" stop-color="#0a0828"/><stop offset="85%" stop-color="#120830"/><stop offset="100%" stop-color="#180828"/></linearGradient>
          <linearGradient id="dSand1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#b89040"/><stop offset="50%" stop-color="#906828"/><stop offset="100%" stop-color="#503010"/></linearGradient>
          <linearGradient id="dSand2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#a07830"/><stop offset="100%" stop-color="#684018"/></linearGradient>
          <linearGradient id="dSand3" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#c8a048"/><stop offset="100%" stop-color="#805820"/></linearGradient>
          <radialGradient id="dMoonGlow" cx="50%" cy="50%"><stop offset="0%" stop-color="#ffe8cc" stop-opacity="0.3"/><stop offset="50%" stop-color="#ddaa55" stop-opacity="0.1"/><stop offset="100%" stop-color="transparent"/></radialGradient>
        </defs>
        <rect width="200" height="160" rx="16" fill="url(#dSky)"/>
        <!-- Stars -->
        <circle cx="22" cy="10" r="1" fill="white" opacity="0.6"/><circle cx="48" cy="6" r="0.8" fill="white" opacity="0.5"/>
        <circle cx="72" cy="12" r="1" fill="white" opacity="0.55"/><circle cx="92" cy="8" r="0.8" fill="white" opacity="0.45"/>
        <circle cx="118" cy="5" r="1.1" fill="white" opacity="0.6"/><circle cx="142" cy="10" r="0.9" fill="white" opacity="0.5"/>
        <circle cx="165" cy="6" r="1" fill="white" opacity="0.55"/><circle cx="185" cy="12" r="0.8" fill="white" opacity="0.45"/>
        <circle cx="35" cy="18" r="0.7" fill="white" opacity="0.4"/><circle cx="82" cy="16" r="0.9" fill="white" opacity="0.5"/>
        <circle cx="108" cy="20" r="0.7" fill="white" opacity="0.4"/><circle cx="155" cy="18" r="0.8" fill="white" opacity="0.48"/>
        <!-- Moon -->
        <ellipse cx="160" cy="28" rx="38" ry="32" fill="url(#dMoonGlow)"/>
        <circle cx="160" cy="24" r="20" fill="#e8dcc8" opacity="0.9"/>
        <circle cx="153" cy="17" r="14" fill="#120830" opacity="0.2"/>
        <!-- Moon craters -->
        <circle cx="155" cy="20" r="3" fill="#c8b8a0" opacity="0.3"/>
        <circle cx="165" cy="28" r="2" fill="#c8b8a0" opacity="0.25"/>
        <circle cx="150" cy="28" r="1.5" fill="#c8b8a0" opacity="0.3"/>
        <!-- Dune layers -->
        <path d="M0 75 Q40 60 80 70 Q120 80 160 68 Q185 60 200 68 L200 160 L0 160Z" fill="url(#dSand1)"/>
        <path d="M0 90 Q50 78 100 86 Q150 94 200 82 L200 160 L0 160Z" fill="url(#dSand2)"/>
        <path d="M0 105 Q55 95 110 102 Q160 108 200 98 L200 160 L0 160Z" fill="url(#dSand3)"/>
        <path d="M0 120 Q60 112 120 118 Q165 122 200 114 L200 160 L0 160Z" fill="#704818"/>
        <path d="M0 135 Q50 130 100 134 Q150 138 200 132 L200 160 L0 160Z" fill="#503010"/>
        <!-- Dune shadow edges -->
        <path d="M80 70 Q100 75 120 80" stroke="#402808" stroke-width="2" fill="none" opacity="0.4"/>
        <path d="M100 86 Q125 90 150 94" stroke="#402808" stroke-width="1.5" fill="none" opacity="0.35"/>
        <path d="M110 102 Q140 105 160 108" stroke="#402808" stroke-width="1" fill="none" opacity="0.3"/>
        <!-- Cactus silhouette -->
        <path d="M62 72 L65 48 L62 48 L68 32 L72 40 L70 40 L74 48 L71 48 L71 72Z" fill="#0a0a14" opacity="0.75"/>
        <path d="M65 55 L58 50 L58 42 L62 45 L62 52" stroke="#0a0a14" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.75"/>
        <path d="M68 50 L75 45 L75 38 L72 40 L72 48" stroke="#0a0a14" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.75"/>
        <!-- Small cactus -->
        <path d="M142 68 L144 55 L142 55 L146 44 L148 50 L147 50 L150 55 L148 55 L148 68Z" fill="#080810" opacity="0.6"/>
        <!-- Scattered rocks -->
        <ellipse cx="38" cy="88" rx="4" ry="2.5" fill="#402808" opacity="0.5"/>
        <ellipse cx="165" cy="92" rx="5" ry="3" fill="#402808" opacity="0.45"/>
        <ellipse cx="125" cy="108" rx="3" ry="2" fill="#402808" opacity="0.4"/>
        <!-- Wind streaks on sand -->
        <path d="M25 95 Q35 92 45 95" stroke="#805820" stroke-width="0.8" fill="none" opacity="0.25"/>
        <path d="M85 100 Q95 97 105 100" stroke="#805820" stroke-width="0.7" fill="none" opacity="0.2"/>
        <path d="M145 90 Q155 87 165 90" stroke="#805820" stroke-width="0.8" fill="none" opacity="0.22"/>
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
    App.showResult(header, tags, content, null, null, {
      chainFrom: 'element',
      chainZodiac: null,
      chainContext: { from: 'element reading', element: result.element, detail: result.reading.substring(0, 100) }
    });
  }

  return { init, startReading };
})();

window.addEventListener('tool-opened', function(e) {
  if (e.detail === 'element') Tools.element.init();
});
