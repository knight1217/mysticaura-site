/* ===== API Layer — DeepSeek via Cloudflare Worker Proxy ===== */
window.API = (function() {
  const D = window.__DATA__;

  // API Proxy — Cloudflare Worker (Key never exposed to browser)
  const PROXY_URL = 'https://mysticaura-api-proxy.butzyjj.workers.dev/api/chat';

  /* ===== Random helpers ===== */
  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  /* ===== DeepSeek API Call (OpenAI-compatible format) ===== */
  async function callAI(prompt, systemInstruction) {
    const messages = [];
    if (systemInstruction) {
      messages.push({ role: 'system', content: systemInstruction });
    }
    messages.push({ role: 'user', content: prompt });

    const body = {
      model: 'deepseek-chat',
      messages: messages,
      temperature: 0.9,
      max_tokens: 800
    };

    const resp = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      throw new Error('Please try again');
    }

    const data = await resp.json();
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Please try again');
    }
    return data.choices[0].message.content;
  }

  function safeParse(text) {
    const cleaned = text.replace(/```json\n?/g, '').replace(/```/g, '');
    return JSON.parse(cleaned);
  }

  /* ===== Horoscope ===== */
  async function getHoroscope(sign, mood) {
    const result = await callAI(
      `Generate a personalized daily horoscope for ${sign.name} (${sign.emoji}, ${sign.element} element) who is feeling "${mood.name}" (${mood.desc}) today.\n\nReturn ONLY valid JSON:\n{\n  "reading": "detailed fortune reading, 3-5 sentences, warm and personal tone",\n  "advice": "practical cosmic advice, 1 sentence",\n  "keywords": ["word1", "word2", "word3", "word4"],\n  "color": "a lucky color name",\n  "moon": "moon phase",\n  "lucky": number,\n  "element": "Fire/Water/Earth/Air/Ether/Light/Shadow"\n}`,
      'You are a poetic, warm astrologer. Write beautifully, warmly, specifically to the zodiac sign. Use mystical but accessible language. Never generic. English only.'
    );
    return safeParse(result);
  }

  /* ===== Compatibility ===== */
  async function getCompatibility(z1, z2) {
    const result = await callAI(
      `Analyze zodiac compatibility between ${z1.name} (${z1.emoji}, ${z1.element}) and ${z2.name} (${z2.emoji}, ${z2.element}).\n\nReturn ONLY valid JSON:\n{\n  "score": number between 30-98,\n  "rating": "short phrase describing the match",\n  "reading": "detailed compatibility reading, 2-3 sentences, warm tone",\n  "advice": "relationship advice, 1 sentence",\n  "complement": "how these signs balance each other — what ${z1.name} gives ${z2.name} and what ${z2.name} gives ${z1.name}, 2-3 sentences",\n  "scenarios": "3 recommended date or activity scenarios, one per line, separated by newlines"\n}`,
      'You are a warm, insightful relationship astrologer. Be specific about each zodiac combination. Avoid generic fluff. English only.'
    );
    return safeParse(result);
  }

  /* ===== Destiny ===== */
  async function getDestiny(name, birthday) {
    const result = await callAI(
      `Generate 3 mystical "destiny keywords" for someone named "${name}" born on ${birthday}.\n\nReturn ONLY valid JSON:\n{\n  "keywords": ["word1", "word2", "word3"],\n  "reading": "poetic interpretation, 2-3 sentences",\n  "element": "Fire/Water/Earth/Air"\n}`,
      'You are a mystical name and birthday interpreter. Keywords should be evocative, poetic English words (like luminous, shadow, eternal, wild, sacred, etc.). Be creative and non-generic. English only.'
    );
    return safeParse(result);
  }

  /* ===== Element ===== */
  async function getElement(selected) {
    const result = await callAI(
      `Based on image choices: ${selected.join(', ')}, determine the user's inner element (Fire/Water/Earth/Air).\n\nReturn ONLY valid JSON:\n{\n  "element": "Fire/Water/Earth/Air",\n  "emoji": "corresponding emoji",\n  "reading": "detailed element reading, 2-3 sentences, warm and mystical tone",\n  "traits": ["trait1", "trait2", "trait3"]\n}`,
      'You are an elemental mystic. Interpret image choices as revealing a person\'s dominant inner element. Be poetic and insightful. English only.'
    );
    return safeParse(result);
  }

  /* ===== Persona ===== */
  async function getPersona(words, platform) {
    const platformNames = { instagram:'Instagram', twitter:'X/Twitter', tiktok:'TikTok', dating:'dating profile' };
    const result = await callAI(
      `Create a social media persona for someone described as "${words}". Platform: ${platformNames[platform] || 'social media'}.\n\nReturn ONLY valid JSON:\n{\n  "tags": ["#tag1", "#tag2", "#tag3"],\n  "bio": "the full bio text optimized for this platform",\n  "reading": "short persona reading, 1-2 sentences"\n}`,
      'You are a social media persona expert. Create on-brand bios that feel authentic, not cringe. Use the right tone for each platform. English only.'
    );
    return safeParse(result);
  }

  /* ===== Mystic Scene (replaces Portrait — no people, pure cosmic atmosphere) ===== */
  async function getPortrait(zodiac, context) {
    const ctxObj = window._portraitSurpriseContext || {};
    let contextDescription = '';
    if (ctxObj.from && ctxObj.from.includes('compatibility')) {
      contextDescription = `This is for a COUPLE / compatibility scene. The zodiac match is: ${ctxObj.match || 'two signs'}. Do NOT draw people. Instead, create a mystical landscape where the natural elements of BOTH signs merge — for example mountains meeting wheat fields, ocean waves embracing cliffs, firelight dancing with forest shadows. Two distinct natural forces coexisting in one breathtaking frame.`;
    } else if (ctxObj.from && ctxObj.from.includes('destiny')) {
      contextDescription = `Destiny keywords: ${ctxObj.keywords || 'mystery'}. Weave these keywords into the scene as visual metaphors — NOT as people. For example, "freedom" could be a lone eagle soaring over a starlit canyon; "eternal" could be ancient stone circles under the Milky Way.`;
    } else if (ctxObj.from && ctxObj.from.includes('horoscope')) {
      contextDescription = `Mood: ${ctxObj.mood || 'neutral'}. Let this emotional tone color the entire landscape — warm golden light for joy, deep indigo shadows for anxiety, soft dawn pastels for hope.`;
    } else if (ctxObj.from && ctxObj.from.includes('element')) {
      contextDescription = `Element: ${ctxObj.element || zodiac.element}. Build the scene entirely around this element — fire = volcanic glow + ember-lit sky, water = moonlit ocean + bioluminescence, earth = ancient forest + moss-covered stones, air = cloudscapes + aurora ribbons.`;
    }

    const result = await callAI(
      `Create ONE stunning AI image prompt for a MYSTICAL COSMIC LANDSCAPE based on zodiac sign ${zodiac.name} (${zodiac.emoji}, ${zodiac.element}).${contextDescription ? '\n\n' + contextDescription : ''}

CRITICAL RULES:
- NO people, NO figures, NO faces, NO silhouettes of humans — pure nature and cosmos only
- Write a narrative prompt that paints a visual scene, 4-6 sentences
- Include: lighting (golden hour/starlight/moonlight/etc), color palette, atmospheric mood, natural elements, cosmic details (constellation dots/lines, nebula hints, stardust)
- The zodiac constellation (${zodiac.name}) should subtly glow in the night sky above the landscape
- COMPOSITION: keep the frame open and balanced. No dense dark elements (heavy trees, thick shadows) blocking either side of the image. Light should reach all corners.
- LANDSCAPE: natural organic curves — winding rivers, meandering paths, irregular shorelines. Nothing that looks artificially straight or perfectly symmetrical.
- MAGIC: scatter visible floating stardust motes, bioluminescent particles, or tiny drifting lights throughout the air — subtle but clearly present, making the scene feel enchanted rather than plain nature photography.
- ASPECT RATIO: 9:16 portrait / vertical orientation — optimized for phone wallpapers and social media (Instagram Story, TikTok). The scene should compose naturally in a tall vertical frame, with key cosmic elements (constellation, stardust) in the upper third and the landscape unfolding below.
- End with: "9:16 vertical portrait, cinematic composition, ethereal atmosphere, dreamlike, 4K, hyperdetailed"
- Make it feel MYSTICAL and MAGICAL — like a tarot card landscape meets astrophotography

Return ONLY valid JSON:
{
  "prompt": "the full creative prompt",
  "styleDesc": "3-5 word style summary",
  "vibe": "one vibe word"
}`,
      'You are a cosmic landscape artist. Your prompts paint breathtaking mystical nature scenes — starfields, ancient forests, crystal mountains, glowing seas. Never draw people. Every scene feels like a living tarot card, rich with celestial symbolism and natural wonder. English only.'
    );
    return safeParse(result);
  }

  /* ===== Tarot ===== */
  async function getTarot(cards) {
    const cardList = cards.map(c => `${c.name} (${c.emoji})`).join(', ');
    const result = await callAI(
      `Give a tarot reading for these 3 cards (Past, Present, Future): ${cardList}.\n\nReturn ONLY valid JSON:\n{\n  "reading": "detailed reading, one paragraph per card (Past/Present/Future), warm and insightful tone",\n  "advice": "overall guidance, 1-2 sentences"\n}`,
      'You are a wise, compassionate tarot reader. Interpret cards meaningfully, connecting them into a coherent narrative. Be specific, not generic. English only.'
    );
    return safeParse(result);
  }

  /* ===== Pollinations image URL ===== */
  function getPollinationsUrl(prompt) {
    const encoded = encodeURIComponent(prompt);
    return `https://image.pollinations.ai/prompt/${encoded}?width=768&height=768&model=flux&nologo=true&seed=${randInt(1,9999)}&enhance=true`;
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
