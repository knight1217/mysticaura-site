/* ===== API Layer ===== */
window.API = (function() {
  const D = window.__DATA__;

  // API Proxy — Cloudflare Worker (Key never exposed to browser)
  const PROXY_URL = 'https://mystic-proxy.butzyjj.workers.dev/api/gemini';

  /* ===== Random helpers ===== */
  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  /* ===== Gemini API Call ===== */
  async function callGemini(prompt, systemInstruction) {
    const contents = [{
      role: 'user',
      parts: [{ text: prompt }]
    }];

    const body = { contents };
    if (systemInstruction) {
      body.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const resp = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!resp.ok) {
      throw new Error('Please try again');
    }

    const data = await resp.json();
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Please try again');
    }
    return data.candidates[0].content.parts[0].text;
  }

  function safeParse(text) {
    const cleaned = text.replace(/```json\n?/g, '').replace(/```/g, '');
    return JSON.parse(cleaned);
  }

  /* ===== Horoscope ===== */
  async function getHoroscope(sign, mood) {
    const result = await callGemini(
      `Generate a personalized daily horoscope for ${sign.name} (${sign.emoji}, ${sign.element} element) who is feeling "${mood.name}" (${mood.desc}) today.\n\nReturn ONLY valid JSON:\n{\n  "reading": "detailed fortune reading, 3-5 sentences, warm and personal tone",\n  "advice": "practical cosmic advice, 1 sentence",\n  "keywords": ["word1", "word2", "word3", "word4"],\n  "color": "a lucky color name",\n  "moon": "moon phase",\n  "lucky": number,\n  "element": "Fire/Water/Earth/Air/Ether/Light/Shadow"\n}`,
      'You are a poetic, warm astrologer. Write beautifully, warmly, specifically to the zodiac sign. Use mystical but accessible language. Never generic. English only.'
    );
    return safeParse(result);
  }

  /* ===== Compatibility ===== */
  async function getCompatibility(z1, z2) {
    const result = await callGemini(
      `Analyze zodiac compatibility between ${z1.name} (${z1.emoji}, ${z1.element}) and ${z2.name} (${z2.emoji}, ${z2.element}).\n\nReturn ONLY valid JSON:\n{\n  "score": number between 30-98,\n  "rating": "short phrase describing the match",\n  "reading": "detailed compatibility reading, 2-3 sentences, warm tone",\n  "advice": "relationship advice, 1 sentence",\n  "complement": "how these signs balance each other — what ${z1.name} gives ${z2.name} and what ${z2.name} gives ${z1.name}, 2-3 sentences",\n  "scenarios": "3 recommended date or activity scenarios, one per line, separated by newlines"\n}`,
      'You are a warm, insightful relationship astrologer. Be specific about each zodiac combination. Avoid generic fluff. English only.'
    );
    return safeParse(result);
  }

  /* ===== Destiny ===== */
  async function getDestiny(name, birthday) {
    const result = await callGemini(
      `Generate 3 mystical "destiny keywords" for someone named "${name}" born on ${birthday}.\n\nReturn ONLY valid JSON:\n{\n  "keywords": ["word1", "word2", "word3"],\n  "reading": "poetic interpretation, 2-3 sentences",\n  "element": "Fire/Water/Earth/Air"\n}`,
      'You are a mystical name and birthday interpreter. Keywords should be evocative, poetic English words (like luminous, shadow, eternal, wild, sacred, etc.). Be creative and non-generic. English only.'
    );
    return safeParse(result);
  }

  /* ===== Element ===== */
  async function getElement(selected) {
    const result = await callGemini(
      `Based on image choices: ${selected.join(', ')}, determine the user's inner element (Fire/Water/Earth/Air).\n\nReturn ONLY valid JSON:\n{\n  "element": "Fire/Water/Earth/Air",\n  "emoji": "corresponding emoji",\n  "reading": "detailed element reading, 2-3 sentences, warm and mystical tone",\n  "traits": ["trait1", "trait2", "trait3"]\n}`,
      'You are an elemental mystic. Interpret image choices as revealing a person\'s dominant inner element. Be poetic and insightful. English only.'
    );
    return safeParse(result);
  }

  /* ===== Persona ===== */
  async function getPersona(words, platform) {
    const platformNames = { instagram:'Instagram', twitter:'X/Twitter', tiktok:'TikTok', dating:'dating profile' };
    const result = await callGemini(
      `Create a social media persona for someone described as "${words}". Platform: ${platformNames[platform] || 'social media'}.\n\nReturn ONLY valid JSON:\n{\n  "tags": ["#tag1", "#tag2", "#tag3"],\n  "bio": "the full bio text optimized for this platform",\n  "reading": "short persona reading, 1-2 sentences"\n}`,
      'You are a social media persona expert. Create on-brand bios that feel authentic, not cringe. Use the right tone for each platform. English only.'
    );
    return safeParse(result);
  }

  /* ===== Portrait ===== */
  async function getPortrait(zodiac, context) {
    const ctxObj = window._portraitSurpriseContext || {};
    let contextDescription = '';
    if (ctxObj.from && ctxObj.from.includes('compatibility')) {
      contextDescription = `This is for a COUPLE portrait (two people). Match: ${ctxObj.match || 'lovers'}. The prompt should feature TWO figures together, romantic cosmic couple energy.`;
    } else if (ctxObj.from && ctxObj.from.includes('destiny')) {
      contextDescription = `Keywords: ${ctxObj.keywords || 'mystery'}. Build the prompt around these destiny keywords as visual metaphors.`;
    } else if (ctxObj.from && ctxObj.from.includes('horoscope')) {
      contextDescription = `Their current mood: ${ctxObj.mood || 'neutral'}. Reflect this emotional state in the portrait's mood and lighting.`;
    } else if (ctxObj.from && ctxObj.from.includes('element')) {
      contextDescription = `Their element: ${ctxObj.element || zodiac.element}. Make the portrait an elemental embodiment.`;
    }

    const result = await callGemini(
      `Create ONE stunning, creative AI image generation prompt for a mystical portrait based on zodiac sign ${zodiac.name} (${zodiac.emoji}, ${zodiac.element}).${contextDescription ? '\n\n' + contextDescription : ''}

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
    return safeParse(result);
  }

  /* ===== Tarot ===== */
  async function getTarot(cards) {
    const cardList = cards.map(c => `${c.name} (${c.emoji})`).join(', ');
    const result = await callGemini(
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
