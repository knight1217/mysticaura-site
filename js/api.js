/* ===== API Layer ===== */
window.API = (function() {
  const D = window.__DATA__;

  // Gemini API Key — FOR LOCAL TESTING ONLY
  // ⛔ Production: move to Cloudflare Worker. GitHub Pages = public, Key WILL leak if left here.
  const geminiKey = ''; // ⛔ 占位符 — Key通过Cloudflare Worker代理

  /* ===== Random helpers ===== */
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  /* ===== Gemini API Call ===== */
  async function callGemini(prompt, systemInstruction) {
    if (!geminiKey) return null;

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + geminiKey;

    const contents = [{
      role: 'user',
      parts: [{ text: prompt }]
    }];

    const body = { contents };
    if (systemInstruction) {
      body.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await resp.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
      return null;
    } catch (e) {
      console.error('Gemini error:', e);
      return null;
    }
  }

  /* ===== Mock data generators (fallback when no API key) ===== */
  function mockHoroscope(sign, mood) {
    const pool = D.fortunePool[mood.key];
    const tpl = rand(pool.readings);
    const color = rand(D.colors);
    const moon = rand(D.moons);
    const lucky = rand(D.luckies);
    const element = rand(D.elementNames);
    const advice = rand(D.advices).replace('{color}', color);
    return {
      reading: tpl.replace(/\{sign\}/g, sign.name).replace(/\{color\}/g, color).replace(/\{moon\}/g, moon).replace(/\{lucky\}/g, lucky),
      advice: advice,
      keywords: pool.keywords,
      color: color,
      moon: moon,
      lucky: lucky,
      element: element
    };
  }

  function mockCompatibility(z1, z2) {
    const score = randInt(45, 98);
    const ratings = ['Challenging but magnetic','Deep emotional bond','Natural harmony','Opposites attract','Steady and grounded','Fiery and passionate'];
    const rating = rand(ratings);
    return {
      score: score,
      rating: rating,
      reading: `${z1.name} + ${z2.name}: ${rating}. Your combined energy creates a ${score}% cosmic match. The ${z1.element} of ${z1.name} meets the ${z2.element} of ${z2.name} — ${score > 75 ? 'a truly powerful combination' : score > 55 ? 'an interesting dynamic with growth potential' : 'a connection that teaches both signs important lessons'}.`,
      advice: score > 75 ? 'Trust the natural flow between you. This bond has rare potential.' : 'Communication bridges the gap. Be patient with each other\'s differences.',
      complement: `${z1.name}'s ${z1.element} energy brings passion and drive, while ${z2.name}'s ${z2.element} nature offers depth and stability. Together, you create a balance where one fills what the other lacks — ${z1.name} pushes forward while ${z2.name} anchors the vision.`,
      scenarios: `Stargazing picnic under the open sky\nVisit an art museum and share your interpretations\nCook a new recipe together from scratch`
    };
  }

  function mockDestiny(name, birthday) {
    const words = rand(D.vibeWords);
    const words2 = rand(D.vibeWords.filter(w => w !== words));
    const words3 = rand(D.vibeWords.filter(w => w !== words && w !== words2));
    return {
      keywords: [
        words.charAt(0).toUpperCase() + words.slice(1),
        words2.charAt(0).toUpperCase() + words2.slice(1),
        words3.charAt(0).toUpperCase() + words3.slice(1)
      ],
      reading: `The stars have spoken, ${name}. Your destiny keywords — **${words}**, **${words2}**, and **${words3}** — reveal a soul tapestry woven from ancient threads. These themes have followed you across lifetimes. Embrace them.`,
      element: rand(D.elementNames)
    };
  }

  function mockElement(selected) {
    const el = rand(D.elements);
    const scenes = selected.join(', ');
    const readings = {
      Fire: [
        `There's a wildfire in your soul — fierce, untamed, and impossible to ignore. When you walk into a room, the temperature changes. You don't just exist, you burn. The images you chose — ${scenes} — all speak of passion pushing through. Someone told you to calm down once. You didn't listen. Good.`,
        `Your fire isn't just heat — it's a beacon. The scenes you picked (${scenes}) pulse with the same raw energy that lives in your chest. You've always been the one who ignites others, who sparks movement where there was staleness. Don't let anyone hand you a extinguisher. The world needs your flames.`,
        `Look at ${scenes} — do you see what I see? A pattern of courage, of leaping before looking, of trusting the fall. Your Fire element doesn't ask permission. It dances, it roars, it creates. You came here to burn brightly, not to hide your light under careful choices.`,
        `The images you chose (${scenes}) are not random. They are mirrors. Fire people don't do "maybe" — you do YES or NO, NOW or NEVER. That intensity can scare people who live in grayscale. But you? You're technicolor. Own it. The right people will warm themselves by your fire, not run from it.`
      ],
      Water: [
        `The images you chose — ${scenes} — they're drowning in feeling, aren't they? You feel everything. A song on the radio can undo you. A stranger's sadness can become yours by lunchtime. Your Water element is a gift and a burden. You intuit what others hide. But here's the secret: you're not here to carry everyone's ocean. Learn to swim in your own depth.`,
        `There's a tide in you that doesn't answer to clocks. ${scenes} — these are water scenes, and they called to you because you ARE them. Deep, unpredicable, life-giving. Someone once said you were "too sensitive." That was their smallness talking, not your truth. Your sensitivity is a superpower. It's how you love. It's how you see.`,
        `Water doesn't rush. It carves canyons over centuries, not weekends. The scenes you picked (${scenes}) have that same patient power. You've been told to "hurry up" your whole life. But your Water element knows: the deepest things take time. Trust your rhythm. The right people will learn to swim at your speed.`,
        `You carry oceans in small gestures. ${scenes} — do you notice how they all hold something? A wave holds energy, a lake holds reflections, rain holds the promise of growth. Your Water element makes you a keeper of things — feelings, secrets, memories. You don't just listen; you absorb. Be careful which waters you step into. Not all of them are clean.`
      ],
      Earth: [
        `The earth doesn't apologize for being solid. Neither should you. ${scenes} — these are ground-level scenes, the kind that say "I'm here, I'm real, I'm not going anywhere." Your Earth element is your superpower. When everyone else is spiraling into maybe, you're the one planting flags. You make things happen. Not by magic, but by showing up. Again and again.`,
        `Look closely at ${scenes}. See that stability? That's you. While others are building castles in the clouds, you're pouring the foundation. Your Earth element means you can hold space for people in ways they don't even realize they need. You're the safe landing. The reliable "yes." In a chaotic world, you are the ground someone stands on.`,
        `There's a quiet strength in ${scenes} — the kind that doesn't need to announce itself. Your Earth element runs like that. You've been the steady one so long you've forgotten it's a gift. Not everyone can be the rock. Not everyone can hold the line when things get uncertain. But you? You were built for exactly that.`,
        `Mountains don't move just because the wind blows. Neither do you. The images you chose (${scenes}) have that same rooted quality. Your Earth element means you feel things deeply but you process them by doing, by making, by building. You're not "boring" — you're the oak in a forest of weeds. And oaks? They outlast everything.`
      ],
      Air: [
        `Your mind is a weather system — always moving, always shifting, always fascinating. ${scenes} — these are air scenes, uncontainable and free. You've never been good at "stay still." Your brain has seven tabs open and three of them are playing different songs. That's not a bug, it's Air element magic. You connect dots other people don't even see.`,
        `The images you chose (${scenes}) all have space in them. That's your Air element talking — you need room to think, to breathe, to be. Someone once called you "flaky" because you changed your mind. They didn't understand: you're not flaky, you're evolving. Air doesn't stay in one shape. Neither do you. And thank god for that.`,
        `There's a restlessness in you that isn't a problem to solve. ${scenes} — do you see the movement? The lift? Your Air element means you're designed to circulate, to refresh, to bring new ideas into stale rooms. You're the breeze that wakes people up. The world has enough statues. Be the wind.`,
        `Air people are the translators of the zodiac. ${scenes} — these scenes need interpretation, and that's what you do. You take the confusing and make it clear. You take the heavy and make it light. Your mind is a gift, even when it won't shut up at 3am. Especially then. Those 3am thoughts? They're yours for a reason.`
      ]
    };
    const pool = readings[el.name] || readings.Fire;
    const reading = rand(pool).replace(/\{scenes\}/g, scenes);
    return {
      element: el.name,
      emoji: el.emoji,
      reading: reading,
      traits: el.traits || ['Intuitive','Bold','Reflective','Creative'].sort(() => Math.random() - 0.5).slice(0, 3)
    };
  }

  function mockPersona(words, platform) {
    const tags = ['#MysticSoul','#DreamWeaver','#StarChild','#CosmicVibes','#AuraQueen','#MoonDust'];
    const picked = tags.sort(() => Math.random() - 0.5).slice(0, 3);
    const bios = {
      instagram: `✨ ${words} soul navigating the cosmos\n🌙 living between dreams and starlight\n💫 your daily dose of mystic energy`,
      twitter: `${words} energy only. The universe has my back and I have the receipts. ✧`,
      tiktok: `just a ${words} soul making magic ✨💫\nfinding beauty in the chaos 🌙`,
      dating: `A ${words} spirit looking for someone who gets it. Good music, deep talks, stargazing. Not here for small talk.`
    };
    return {
      tags: picked,
      bio: bios[platform] || bios.instagram,
      reading: `Your persona radiates "${words}" energy. The stars see someone who ${words.includes('dreamy') ? 'moves through life with soft intention' : 'commands their own orbit'}. This bio is crafted to match ${platform === 'instagram' ? 'Instagram\'s' : platform === 'twitter' ? 'X\'s' : platform === 'tiktok' ? 'TikTok\'s' : 'dating'} vibe.`
    };
  }

  function mockPortrait(zodiac, context) {
    const ctx = window._portraitSurpriseContext || {};

    // Determine what kind of portrait to generate based on context
    let styleApproach, moodWords, storyElement, vibe;

    if (ctx.from && ctx.from.includes('compatibility')) {
      // COUPLE PORTRAIT — two people
      const names = ctx.match ? ctx.match.split(' & ') : ['you', 'them'];
      const styles = [
        `A romantic dual portrait of two intertwined figures, their silhouettes merging into constellations, ${names[0]} radiating ${zodiac.element.toLowerCase()} energy in warm amber tones while ${names[1]} shimmers with complementary light — soft celestial glow, tender intimacy, trending on ArtStation, digital oil painting, cinematic lighting, two souls one frame`,
        `Two faces pressed close as if sharing a secret only stars can hear — cosmic lovers beneath a swirling galaxy, ${names[0]} and ${names[1]} reflected in each other's eyes, watercolor and gold leaf, delicate brushstrokes, dreamlike intimacy, editorial romantic photography style`,
        `A split composition — left side ${names[0]} bathed in warm rose gold, right side ${names[1]} in deep violet twilight, the boundary between them dissolving into stardust, soulmate energy, ethereal double exposure, professional art, hyperdetailed`,
      ];
      storyElement = rand(styles);
      moodWords = 'romantic, intimate, cosmic connection';
      vibe = 'passionate';
    } else if (ctx.from && ctx.from.includes('destiny')) {
      // DESTINY-BASED — keywords as visual metaphors
      const kws = ctx.keywords ? ctx.keywords.split(', ') : ['mystery', 'light', 'shadow'];
      const styles = [
        `A portrait where the subject's hair transforms into swirling galaxies — ${kws.join(' whispers through')} echoes in the cosmic wind, their eyes holding ancient ${kws[0]}, fantasy editorial, prismatic lighting, ultra detailed, artstation featured`,
        `Visual metaphor portrait: a ${zodiac.name} figure standing at the edge of dawn, the keyword "${kws[0]}" manifesting as light breaking through storm clouds, "${kws[1]}" blooming as impossible flowers at their feet — surreal beauty, cinematic composition, award-winning photography style`,
        `The essence of ${kws.join(' + ')} captured in a single haunting portrait — ${zodiac.name}'s energy rendered as a luminous figure floating between worlds, their silhouette dissolving into ${kws[0]} motes of light, dreamlike, ethereal digital masterpiece`,
      ];
      storyElement = rand(styles);
      moodWords = 'mystical, profound, destiny-revealing';
      vibe = 'transcendent';
    } else if (ctx.from && ctx.from.includes('element')) {
      // ELEMENT-BASED
      const el = ctx.element || zodiac.element;
      const styles = {
        'Fire': [
          `A portrait consumed in beautiful flames that don't burn — ${zodiac.name} emerging from wildfire like a phoenix, sparks dancing in their hair, molten gold dripping from their fingertips, dynamic action pose, cinematic lighting, epic fantasy art, trending on ArtStation`,
          `Internal fire made visible — ${zodiac.name}'s silhouette glows from within like a forge, embers tracing constellations across their skin, the passion of creation burning bright, dark background, dramatic rim lighting, masterpiece quality`,
        ],
        'Water': [
          `A submerged portrait — ${zodiac.name} floating weightlessly beneath crystal water, their hair flowing like silk in unseen currents, bioluminescent particles dancing around them, the surface light rippling across their features, ethereal underwater photography, hyperrealistic`,
          `Ocean soul revealed — ${zodiac.name}'s reflection shimmers on the surface of dark water, moonlight creating a silver halo, their depth and mystery captured in the thousand reflections, fine art photography, award-winning composition`,
        ],
        'Earth': [
          `A botanical goddess portrait — ${zodiac.name} crowned with wildflowers and moss, bark-textured skin catching golden hour light, roots grounding them to ancient soil while butterflies circle — forest deity energy, macro detail, National Geographic aesthetic`,
          `${zodiac.name} as living earth — minerals glittering in their skin like embedded stars, hands pressing into rich soil that blooms where they touch, grounded power radiating calm strength, golden hour, editorial photography, stunning detail`,
        ],
        'Air': [
          `A weightless portrait — ${zodiac.name} suspended in a sky of impossible colors, wind visibly swirling around them like a personal galaxy, their thoughts manifesting as translucent butterflies — ethereal freedom, dreamy atmosphere, conceptual art, floating composition`,
          `${zodiac.name} dissolving into autumn wind — leaves and light swirling around their form, the boundary between person and sky becoming unclear, a portrait of pure thought and movement, soft focus edges, artistic blur, breathtaking`,
        ]
      };
      const pool = styles[el] || styles.Fire;
      storyElement = rand(pool);
      moodWords = `elemental ${el.toLowerCase()} energy`;
      vibe = el.toLowerCase();
    } else if (ctx.from && ctx.from.includes('horoscope')) {
      // HOROSCOPE/MOOD-BASED
      const moodToStyle = {
        'Happy': [`${zodiac.name} laughing in golden sunlight, genuine joy radiating from every pixel — their happiness so contagious it seems to warm the entire scene, sun flare, candid portrait, feel-good energy, professional photography, natural light masterpiece`],
        'Blue': [`A quietly powerful portrait — ${zodiac.name} silhouetted against rain-streaked glass, melancholy made beautiful, their eyes saying everything words cannot, soft blue tones, cinematic mood piece, Wong Kar-wai color palette, evocative and deeply moving`],
        'Anxious': [`Controlled chaos portrait — ${zodiac.name} centered in sharp focus while the world blurs and swirls around them in motion, finding their calm within the storm, dramatic contrast, street photography aesthetic, raw and real`],
        'Peaceful': [`Serene meditation portrait — ${zodiac.name} bathed in the gentle light of a rising sun, eyes closed, the world holding its breath around them, soft focus, warm minimalism, spiritual photography, inner peace visualized`],
        'Excited': [`Explosion of energy — ${zodiac.name} in a burst of color and motion, joy literally radiating as prismatic light from their form, confetti of stardust, dynamic portrait, maximalist, pure celebration captured in a frame`],
        'Confused': [`Dream within a dream — ${zodiac.name} standing in a hallway of infinite mirrors, each reflection showing a different version, searching for which one is real, surreal conceptual art, mind-bending composition, philosophical aesthetic`]
      };
      const pool = moodToStyle[ctx.mood] || moodToStyle['Peaceful'];
      storyElement = rand(pool);
      moodWords = `reflecting ${ctx.mood ? ctx.mood.toLowerCase() : 'current'} mood`;
      vibe = ctx.mood ? ctx.mood.toLowerCase() : 'mystical';
    } else {
      // FALLBACK — but still creative
      const styles = [
        `A ${zodiac.name} portrait reimagined as celestial royalty — their features painted in constellations, a crown of starlight, divine energy made visible, ornate art nouveau framing, Klimt-inspired gold leaf, Museum of Modern Art quality`,
        `What if ${zodiac.name}'s soul were visible? A portrait of pure essence — their ${zodiac.element} nature rendered as luminous energy radiating from their form, breaking into prismatic light, spiritual photography meets digital art, breathtaking`,
      ];
      storyElement = rand(styles);
      moodWords = `${zodiac.element.toLowerCase()} energy, cosmic`;
      vibe = 'celestial';
    }

    return {
      prompt: `${storyElement} — ${moodWords}, beautiful lighting, high quality, professional, 4K, stunning`,
      styleDesc: vibe + ' portrait',
      vibe: vibe
    };
  }

  function mockTarot(cards) {
    const reading = cards.map((c, i) => {
      const type = ['Past','Present','Future'][i];
      return `${type}: **${c.name}** ${c.emoji} — ${c.upright}`;
    }).join('\n\n');
    return {
      reading: reading,
      advice: 'The cards speak clearly: change is on the horizon. Trust your intuition — it has never led you astray.'
    };
  }

  /* ===== Pollinations fallback ===== */
  function getPollinationsUrl(prompt) {
    const encoded = encodeURIComponent(prompt);
    return `https://image.pollinations.ai/prompt/${encoded}?width=768&height=768&model=flux&nologo=true&seed=${randInt(1,9999)}&enhance=true`;
  }

  /* ===== High-level: Horoscope ===== */
  async function getHoroscope(sign, mood) {
    const geminiResult = await callGemini(
      `Generate a personalized daily horoscope for ${sign.name} (${sign.emoji}, ${sign.element} element) who is feeling "${mood.name}" (${mood.desc}) today.\n\nReturn ONLY valid JSON:\n{\n  "reading": "detailed fortune reading, 3-5 sentences, warm and personal tone",\n  "advice": "practical cosmic advice, 1 sentence",\n  "keywords": ["word1", "word2", "word3", "word4"],\n  "color": "a lucky color name",\n  "moon": "moon phase",\n  "lucky": number,\n  "element": "Fire/Water/Earth/Air/Ether/Light/Shadow"\n}`,
      'You are a poetic, warm astrologer. Write beautifully, warmly, specifically to the zodiac sign. Use mystical but accessible language. Never generic. English only.'
    );

    if (geminiResult) {
      try {
        const parsed = JSON.parse(geminiResult.replace(/```json\n?/g,'').replace(/```/g,''));
        return parsed;
      } catch (e) {
        return mockHoroscope(sign, mood);
      }
    }
    return mockHoroscope(sign, mood);
  }

  /* ===== High-level: Compatibility ===== */
  async function getCompatibility(z1, z2) {
    const geminiResult = await callGemini(
      `Analyze zodiac compatibility between ${z1.name} (${z1.emoji}, ${z1.element}) and ${z2.name} (${z2.emoji}, ${z2.element}).\n\nReturn ONLY valid JSON:\n{\n  "score": number between 30-98,\n  "rating": "short phrase describing the match",\n  "reading": "detailed compatibility reading, 2-3 sentences, warm tone",\n  "advice": "relationship advice, 1 sentence",\n  "complement": "how these signs balance each other — what ${z1.name} gives ${z2.name} and what ${z2.name} gives ${z1.name}, 2-3 sentences",\n  "scenarios": "3 recommended date or activity scenarios, one per line, separated by newlines"\n}`,
      'You are a warm, insightful relationship astrologer. Be specific about each zodiac combination. Avoid generic fluff. English only.'
    );

    if (geminiResult) {
      try { return JSON.parse(geminiResult.replace(/```json\n?/g,'').replace(/```/g,'')); }
      catch (e) { return mockCompatibility(z1, z2); }
    }
    return mockCompatibility(z1, z2);
  }

  /* ===== High-level: Destiny ===== */
  async function getDestiny(name, birthday) {
    const geminiResult = await callGemini(
      `Generate 3 mystical "destiny keywords" for someone named "${name}" born on ${birthday}.\n\nReturn ONLY valid JSON:\n{\n  "keywords": ["word1", "word2", "word3"],\n  "reading": "poetic interpretation, 2-3 sentences",\n  "element": "Fire/Water/Earth/Air"\n}`,
      'You are a mystical name and birthday interpreter. Keywords should be evocative, poetic English words (like luminous, shadow, eternal, wild, sacred, etc.). Be creative and non-generic. English only.'
    );

    if (geminiResult) {
      try { return JSON.parse(geminiResult.replace(/```json\n?/g,'').replace(/```/g,'')); }
      catch (e) { return mockDestiny(name, birthday); }
    }
    return mockDestiny(name, birthday);
  }

  /* ===== High-level: Element ===== */
  async function getElement(selected) {
    const geminiResult = await callGemini(
      `Based on image choices: ${selected.join(', ')}, determine the user's inner element (Fire/Water/Earth/Air).\n\nReturn ONLY valid JSON:\n{\n  "element": "Fire/Water/Earth/Air",\n  "emoji": "corresponding emoji",\n  "reading": "detailed element reading, 2-3 sentences, warm and mystical tone",\n  "traits": ["trait1", "trait2", "trait3"]\n}`,
      'You are an elemental mystic. Interpret image choices as revealing a person\'s dominant inner element. Be poetic and insightful. English only.'
    );

    if (geminiResult) {
      try { return JSON.parse(geminiResult.replace(/```json\n?/g,'').replace(/```/g,'')); }
      catch (e) { return mockElement(selected); }
    }
    return mockElement(selected);
  }

  /* ===== High-level: Persona ===== */
  async function getPersona(words, platform) {
    const platformNames = { instagram:'Instagram', twitter:'X/Twitter', tiktok:'TikTok', dating:'dating profile' };
    const geminiResult = await callGemini(
      `Create a social media persona for someone described as "${words}". Platform: ${platformNames[platform] || 'social media'}.\n\nReturn ONLY valid JSON:\n{\n  "tags": ["#tag1", "#tag2", "#tag3"],\n  "bio": "the full bio text optimized for this platform",\n  "reading": "short persona reading, 1-2 sentences"\n}`,
      'You are a social media persona expert. Create on-brand bios that feel authentic, not cringe. Use the right tone for each platform. English only.'
    );

    if (geminiResult) {
      try { return JSON.parse(geminiResult.replace(/```json\n?/g,'').replace(/```/g,'')); }
      catch (e) { return mockPersona(words, platform); }
    }
    return mockPersona(words, platform);
  }

  /* ===== High-level: Portrait ===== */
  async function getPortrait(zodiac, context) {
    // Portrait is ALWAYS premium (the "surprise gift" must feel real)
    // Does NOT count against daily quota — it's the reward for completing another tool
    // Only falls back to mock if Gemini API key is missing or network fails

    const ctxObj = window._portraitSurpriseContext || {};
    let contextDescription = '';
    if (ctxObj.from && ctxObj.from.includes('compatibility')) {
      contextDescription = `This is for a COUPLE portrait (two people). Match: ${ctxObj.match || 'lovers'}. Score: ${ctxObj.score || '?'}%. The prompt should feature TWO figures together, romantic cosmic couple energy.`;
    } else if (ctxObj.from && ctxObj.from.includes('destiny')) {
      contextDescription = `Keywords: ${ctxObj.keywords || 'mystery'}. Build the prompt around these destiny keywords as visual metaphors.`;
    } else if (ctxObj.from && ctxObj.from.includes('horoscope')) {
      contextDescription = `Their current mood: ${ctxObj.mood || 'neutral'}. Reading detail: ${ctxObj.detail || ''}. Reflect this emotional state in the portrait's mood and lighting.`;
    } else if (ctxObj.from && ctxObj.from.includes('element')) {
      contextDescription = `Their element: ${ctxObj.element || zodiac.element}. Make the portrait an elemental embodiment.`;
    }

    const geminiResult = await callGemini(
      `Create ONE stunning, creative AI image generation prompt for a mystical portrait based on zodiac sign ${zodiac.name} (${zodiac.emoji}, ${zodiac.element}).${context ? '\\n\\n' + contextDescription : ''}

CRITICAL RULES:
- Write a narrative prompt that tells a visual STORY, not a list of keywords
- 3-5 sentences, poetic and specific
- Include lighting, color, mood, composition details
- For couple/romantic context: describe TWO figures, their interaction, the energy between them
- For destiny context: weave keywords into visual metaphors
- For mood context: the emotional tone should dominate the visual mood
- End with quality boosters: "cinematic lighting, hyperdetailed, 4K, professional"

Return ONLY valid JSON:
{
  "prompt": "the full creative prompt",
  "styleDesc": "3-5 word style summary",
  "vibe": "one vibe word"
}`,
      'You are an award-winning portrait photographer turned AI prompt engineer. Your prompts are poetic narratives, not keyword lists. Each one tells a visual story. Never generic. English only.'
    );

    if (geminiResult) {
      try {
        const parsed = JSON.parse(geminiResult.replace(/```json\n?/g,'').replace(/```/g,''));
        return { ...parsed, tier: 'premium' };
      } catch (e) {
        return { ...mockPortrait(zodiac, context), tier: 'free' };
      }
    }
    return { ...mockPortrait(zodiac, context), tier: 'free' };
  }

  /* ===== High-level: Tarot ===== */
  async function getTarot(cards) {
    const cardList = cards.map(c => `${c.name} (${c.emoji})`).join(', ');
    const geminiResult = await callGemini(
      `Give a tarot reading for these 3 cards (Past, Present, Future): ${cardList}.\n\nReturn ONLY valid JSON:\n{\n  "reading": "detailed reading, one paragraph per card (Past/Present/Future), warm and insightful tone",\n  "advice": "overall guidance, 1-2 sentences"\n}`,
      'You are a wise, compassionate tarot reader. Interpret cards meaningfully, connecting them into a coherent narrative. Be specific, not generic. English only.'
    );

    if (geminiResult) {
      try { return JSON.parse(geminiResult.replace(/```json\n?/g,'').replace(/```/g,'')); }
      catch (e) { return mockTarot(cards); }
    }
    return mockTarot(cards);
  }

  // Public API
  return {
    getPollinationsUrl,
    getHoroscope,
    getCompatibility,
    getDestiny,
    getElement,
    getPersona,
    getPortrait,
    getTarot
  };
})();
