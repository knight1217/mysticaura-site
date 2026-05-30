/* ===== SHARED DATA ===== */
window.__DATA__ = {
  zodiacs: [
    { name:'Aries', emoji:'♈', dates:'Mar 21 - Apr 19', sign:'aries', element:'Fire' },
    { name:'Taurus', emoji:'♉', dates:'Apr 20 - May 20', sign:'taurus', element:'Earth' },
    { name:'Gemini', emoji:'♊', dates:'May 21 - Jun 20', sign:'gemini', element:'Air' },
    { name:'Cancer', emoji:'♋', dates:'Jun 21 - Jul 22', sign:'cancer', element:'Water' },
    { name:'Leo', emoji:'♌', dates:'Jul 23 - Aug 22', sign:'leo', element:'Fire' },
    { name:'Virgo', emoji:'♍', dates:'Aug 23 - Sep 22', sign:'virgo', element:'Earth' },
    { name:'Libra', emoji:'♎', dates:'Sep 23 - Oct 22', sign:'libra', element:'Air' },
    { name:'Scorpio', emoji:'♏', dates:'Oct 23 - Nov 21', sign:'scorpio', element:'Water' },
    { name:'Sagittarius', emoji:'♐', dates:'Nov 22 - Dec 21', sign:'sagittarius', element:'Fire' },
    { name:'Capricorn', emoji:'♑', dates:'Dec 22 - Jan 19', sign:'capricorn', element:'Earth' },
    { name:'Aquarius', emoji:'♒', dates:'Jan 20 - Feb 18', sign:'aquarius', element:'Air' },
    { name:'Pisces', emoji:'♓', dates:'Feb 19 - Mar 20', sign:'pisces', element:'Water' }
  ],

  moods: [
    { emoji:'😊', name:'Happy', desc:'feeling great today', key:'happy' },
    { emoji:'😔', name:'Blue', desc:'a bit down', key:'blue' },
    { emoji:'😰', name:'Anxious', desc:'worried about something', key:'anxious' },
    { emoji:'😌', name:'Peaceful', desc:'calm and content', key:'peaceful' },
    { emoji:'🤩', name:'Excited', desc:'full of energy', key:'excited' },
    { emoji:'🤔', name:'Confused', desc:'seeking clarity', key:'confused' }
  ],

  elements: [
    { emoji:'🔥', name:'Fire', desc:'Passionate & Bold', key:'fire' },
    { emoji:'💧', name:'Water', desc:'Emotional & Deep', key:'water' },
    { emoji:'🌍', name:'Earth', desc:'Grounded & Steady', key:'earth' },
    { emoji:'💨', name:'Air', desc:'Curious & Free', key:'air' }
  ],

  tarotDeck: [
    { name:'The Fool', emoji:'🃏', upright:'New beginnings, spontaneity, free spirit', reversed:'Recklessness, risk-taking, thoughtlessness' },
    { name:'The Magician', emoji:'🪄', upright:'Power, skill, concentration, action', reversed:'Manipulation, poor planning, untapped talents' },
    { name:'The High Priestess', emoji:'🌙', upright:'Intuition, mystery, higher power', reversed:'Secrets, withdrawal, silence' },
    { name:'The Empress', emoji:'👑', upright:'Fertility, nature, abundance', reversed:'Dependence, emptiness, creative block' },
    { name:'The Emperor', emoji:'🏰', upright:'Authority, structure, control', reversed:'Domination, rigidity, lack of discipline' },
    { name:'The Lovers', emoji:'💕', upright:'Love, harmony, choices', reversed:'Imbalance, misalignment, conflict' },
    { name:'The Chariot', emoji:'⚔️', upright:'Determination, willpower, victory', reversed:'Lack of direction, aggression, defeat' },
    { name:'Strength', emoji:'🦁', upright:'Courage, patience, inner power', reversed:'Self-doubt, weakness, insecurity' },
    { name:'The Hermit', emoji:'🏮', upright:'Soul-searching, introspection, wisdom', reversed:'Isolation, loneliness, withdrawal' },
    { name:'Wheel of Fortune', emoji:'🎡', upright:'Change, cycles, destiny', reversed:'Bad luck, resistance, stagnation' },
    { name:'Justice', emoji:'⚖️', upright:'Fairness, truth, law', reversed:'Injustice, dishonesty, lack of accountability' },
    { name:'The Star', emoji:'⭐', upright:'Hope, inspiration, renewal', reversed:'Despair, disconnection, lack of faith' },
    { name:'The Moon', emoji:'🌑', upright:'Illusion, fear, subconscious', reversed:'Clarity, release of fear, truth revealed' },
    { name:'The Sun', emoji:'☀️', upright:'Joy, success, vitality', reversed:'Temporary setbacks, sadness, lack of clarity' },
    { name:'Death', emoji:'🦋', upright:'Transformation, endings, new beginnings', reversed:'Resistance to change, stagnation, fear' },
    { name:'Temperance', emoji:'🕊️', upright:'Balance, moderation, patience', reversed:'Excess, imbalance, lack of harmony' },
    { name:'The Tower', emoji:'⚡', upright:'Sudden change, upheaval, revelation', reversed:'Avoidance of disaster, fear of change' },
    { name:'The World', emoji:'🌍', upright:'Completion, fulfillment, achievement', reversed:'Incompletion, lack of closure, delays' }
  ],

  vibeWords: [
    'mystical','ethereal','cosmic','ancient','luminous','celestial',
    'radiant','shadow','golden','crystal','sacred','wild',
    'gentle','fierce','dreamy','bold','serene','enigmatic',
    'primal','divine','magnetic','elusive','timeless','untamed'
  ],

  platforms: {
    free: [
      {
        name: 'Gemini / Nano Banana',
        model: 'Gemini 3.1 Flash',
        limit: '~20 images/day free',
        url: 'https://gemini.google.com',
        desc: 'Google AI — just paste the prompt'
      },
      {
        name: 'ChatGPT / GPT Image 2',
        model: 'GPT Image 2 (OpenAI)',
        limit: '2-3 images/day free',
        url: 'https://chat.openai.com',
        desc: 'Top-tier quality, free tier available'
      },
      {
        name: 'Leonardo.ai',
        model: 'Flux / SDXL',
        limit: '150 tokens/day free',
        url: 'https://leonardo.ai',
        desc: 'Most generous free tier, many models'
      }
    ],
    paid: [
      {
        name: 'Midjourney',
        model: 'Midjourney V7',
        limit: 'from $10/month',
        url: 'https://www.midjourney.com',
        desc: 'The artistic quality ceiling — worth every penny'
      },
      {
        name: 'Canva Pro',
        model: 'Canva AI',
        limit: 'from $12.99/month',
        url: 'https://www.canva.com',
        desc: 'Design + AI image generation all-in-one',
        affiliate: true
      }
    ]
  },

  fortunePool: {
    happy: {
      readings: [
        "The sun shines especially bright on you today, {sign}. Your joy is magnetic — it draws good things closer with every smile. A wonderful surprise is working its way toward you right now. Wear {color} to amplify this radiant energy. The number {lucky} is your lucky charm today.",
        "Laughter dances around you like fireflies, {sign}. Jupiter's generous light amplifies everything positive in your orbit. A long-awaited good news may arrive under the {moon} moon. Your natural warmth opens doors that logic alone cannot. {color} matches your glowing spirit perfectly.",
        "You're in a golden groove, {sign}, and the universe is dancing with you. This is the kind of day where everything just clicks — the right people appear, the right ideas spark. Trust this feeling. Let the {moon} moon carry your happiness even higher. {color} celebrates your joy."
      ],
      keywords: ['Bliss','Sunshine','Good Fortune','Abundance'],
      tone: 'celebratory'
    },
    blue: {
      readings: [
        "Dear {sign}, even the strongest stars sometimes dim. What you're feeling is not weakness — it's your heart telling you to rest. Be extra kind to yourself today. The {moon} moon wraps you in a soft blanket of understanding. {color} holds a quiet, healing warmth meant just for you. You are not alone.",
        "The heaviness you feel, {sign}, is like rain before the rainbow — necessary, cleansing, and never permanent. Give yourself permission to slow down. A gentle message or gesture will find you today, probably around the number {lucky}. Let {color} be your comfort. Tomorrow will feel different.",
        "I see you, {sign}. Your sadness is real, and it matters. But look closely — there's a tiny light flickering in the distance. It grows stronger with every deep breath you take. The stars remind you: you've weathered storms before, and you shine all the brighter for it. {color} is your gentle guardian today."
      ],
      keywords: ['Comfort','Healing','Hope','Tender Light'],
      tone: 'soothing'
    },
    anxious: {
      readings: [
        "Take a slow breath, {sign}. The worries swirling in your mind are clouds, not mountains. They will pass. The {moon} moon brings clarity if you give yourself space to receive it. Try this today: set your phone aside for {lucky} minutes and just be still. {color} is your anchor. A small practical step forward will ease your heart more than you expect.",
        "Your mind is racing, {sign}, and that's understandable — you care deeply. But the stars suggest a different approach today: instead of trying to solve everything, solve just one thing. The rest will fall into place. {color} helps ground your thoughts. You're more capable than you feel right now.",
        "Anxiety is just excitement without direction, {sign}. The energy swirling in you is powerful — it just needs a focus. Under the {moon} moon, write down exactly what's bothering you. Naming things robs them of their power. Then ask: what's one thing I can do right now? Even a tiny step counts. {color} steadies your spirit."
      ],
      keywords: ['Clarity','Grounding','Steady','Courage'],
      tone: 'reassuring'
    },
    peaceful: {
      readings: [
        "There's a deep quiet within you today, {sign}, and that's where the real wisdom lives. The {moon} moon invites you to trust your own stillness — it's not emptiness, it's presence. Answers don't always arrive in thunder; sometimes they whisper. {color} deepens your sense of inner harmony. Simply being is enough.",
        "You've found the calm at the center of the storm, {sign}. That is no small thing. The stars see your contentment and reflect it back like a mirror on still water. A quiet insight will visit you today if you leave room for it. The number {lucky} represents a truth you already understand. {color} is your meditation.",
        "The world is loud, but you are quiet — and that quiet is powerful, {sign}. In your peacefulness, others find their own. Under the {moon} moon, you are a still point in a turning universe. Cherish this balance; it radiates further than you know. {color} harmonizes with your serene spirit today."
      ],
      keywords: ['Serenity','Wisdom','Harmony','Inner Stillness'],
      tone: 'contemplative'
    },
    excited: {
      readings: [
        "Hold on tight, {sign} — the stars have something spectacular planned for you! A major breakthrough is charging toward your life like a comet. The {moon} moon signals a turning point you'll look back on as the moment everything changed. The number {lucky} is your launch code. Wear {color} and step boldly into your destiny — the universe is literally cheering for you!",
        "Can you feel the electricity in the air, {sign}? That's your future calling, and it sounds incredible. An opportunity is about to knock so loudly you'll wonder how you ever doubted. The {moon} moon opens a rare cosmic window. Say YES before you feel ready — that's where magic lives. {color} will be your victory banner.",
        "Something epic is unfolding, {sign}, and you're at the very center of it. The stars align in a pattern they haven't shown in years — and it's all pointing to your next chapter. A bold decision you make under the {moon} moon will ripple outward in ways you can't yet imagine. {color} signals the beginning of your adventure. Fortune favors the bold!"
      ],
      keywords: ['Adventure','Breakthrough','Destiny','Cosmic Leap'],
      tone: 'prophetic'
    },
    confused: {
      readings: [
        "Not knowing is a sacred space, {sign} — it's the birthplace of all discovery. The stars see you standing at a crossroads, and there's no wrong path here, only different stories. Under the {moon} moon, try asking a different question than the one you've been repeating. {color} helps you see patterns you've missed. The clarity you seek is closer than you think.",
        "Confusion isn't a flaw, {sign} — it's your intuition telling you there's more to explore. The fog will lift, but first, let yourself wander. A chance encounter or unexpected book might hold the key, especially around the number {lucky}. Don't rush to decide. {color} illuminates the subtle signs the universe is sending your way today.",
        "Your uncertainty right now is actually a compass, {sign} — it's pointing you toward something that matters enough to be complicated. The {moon} moon encourages curiosity over certainty. Try this: explore one thing that genuinely intrigues you today, with zero pressure to reach a conclusion. That's where the breakthrough hides. {color} is your guide through the mist."
      ],
      keywords: ['Discovery','Exploration','Perspective','Hidden Paths'],
      tone: 'exploratory'
    }
  },

  colors: ['rose gold','honey amber','lavender mist','aurora green','coral pink','pearl white','twilight blue','moonlit silver','warm apricot','deep amethyst','soft sage','blush pink','champagne gold','sky lavender'],
  moons: ['waxing crescent','full','waning gibbous','new','first quarter','waxing gibbous','last quarter','super','blue'],
  luckies: [7, 11, 3, 22, 8, 14, 5, 19, 2, 33, 9, 16, 21, 6],
  elementNames: ['Fire','Water','Earth','Air','Ether','Light','Shadow'],
  advices: [
    'Follow the synchronicity you noticed this morning. It was not a coincidence.',
    'Say yes to the invitation you\'ve been hesitating about. The stars support new connections.',
    'Take 10 minutes to sit in stillness. The answer you seek is already within you.',
    'Wear something {color} today — it will shift your energetic field in surprising ways.',
    'Reach out to the person who crossed your mind earlier. They need to hear from you.',
    'Write down your dream from last night before it fades. There\'s a message in it.',
    'The discomfort you\'re feeling is growth stretching its wings. Let it happen.',
    'Something you lost will find its way back to you this week — in a new form.',
    'Light a candle tonight and speak your wish aloud. The flame carries your intention.',
    'Breathe deeply three times before making your next decision. Clarity lives in the pause.',
    'Step outside and look at the sky — the stars have been waiting for your attention.',
    'The stranger you meet today carries a message meant only for you. Stay open.'
  ]
};
