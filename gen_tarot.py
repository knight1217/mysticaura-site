import requests, os, time, sys

API_KEY = 'sk-nZVtwFzGCkW6ShxyE9YaUICIz1NQHpEGfWMaNFzP2vSQiIf1'
BASE = 'https://apihub.agnes-ai.com/v1'
OUT = r'C:\Users\MI\WorkBuddy\2026-05-26-19-17-29\mysticaura-site\img\tarot'
os.makedirs(OUT, exist_ok=True)

# All 22 Major Arcana, strict gender annotation, no border, ink/watercolor style
cards = [
    ('00_fool', 'tarot card The Fool, delicate ink line art with soft watercolor washes, a young adult male with short brown hair wearing simple tunic and leggings, leather satchel on stick over his shoulder, small white terrier dog at his heels, stepping off cliff edge looking up with joyful expression, golden sunrise, no border, vertical, no text'),
    ('01_magician', 'tarot card The Magician, delicate ink line art with soft watercolor washes, a young adult male with dark hair in white robe with red sash, standing behind table with ritual tools, one hand holding wand pointing up one pointing down, infinity symbol halo above head, roses and lilies, no border, vertical, no text'),
    ('02_high_priestess', 'tarot card The High Priestess, delicate ink line art with soft watercolor washes, a serene adult woman with long dark hair in blue robes, seated between black and white pillars, crescent moon at feet, holding scroll, pomegranate veil behind, mystical, no border, vertical, no text'),
    ('03_empress', 'tarot card The Empress, delicate ink line art with soft watercolor washes, a mature adult woman with blonde hair in floral gown, seated on stone throne in wheat field, crown of twelve stars, heart shield with Venus symbol, flowing water, motherly, no border, vertical, no text'),
    ('04_emperor', 'tarot card The Emperor, delicate ink line art with soft watercolor washes, a mature adult man with gray beard in red robes and armor, seated on stone throne with ram head armrests, mountains behind, holding gold scepter and orb, authoritative, no border, vertical, no text'),
    ('05_hierophant', 'tarot card The Hierophant, delicate ink line art with soft watercolor washes, an older male religious figure with triple crown in papal robes, seated between pillars, crossed keys below, two followers kneeling, raised blessing hand, spiritual, no border, vertical, no text'),
    ('06_lovers', 'tarot card The Lovers, delicate ink line art with soft watercolor washes, a young adult man and young adult woman standing in garden, angel with red wings above blessing them, Tree of Knowledge with snake, Tree of Life with flames, distant mountain, beautiful romance, no border, vertical, no text'),
    ('07_chariot', 'tarot card The Chariot, delicate ink line art with soft watercolor washes, a young adult male warrior in armor with a shield standing in a chariot, pulled by two sphinxes one black one white, castle walls behind, laurel crown on his head, determined expression, no border, vertical, no text'),
    ('08_strength', 'tarot card Strength, delicate ink line art with soft watercolor washes, a young adult woman in white dress gently closing a lion mouth with her bare hands, flower garland in her hair, calm patient expression, golden sky, lion looking peaceful not aggressive, no border, vertical, no text'),
    ('09_hermit', 'tarot card The Hermit, delicate ink line art with soft watercolor washes, an old adult man with long white beard in grey hooded robe, standing on snowy mountain peak, holding a glowing lantern with a six-pointed star inside, looking down thoughtfully, isolated, no border, vertical, no text'),
    ('10_wheel_fortune', 'tarot card Wheel of Fortune, delicate ink line art with soft watercolor washes, a giant turning wheel with four figures around it, a sphinx on top of wheel with a sword, blue sky with clouds, the wheel has Hebrew letters, cycles of fate, no border, vertical, no text'),
    ('11_justice', 'tarot card Justice, delicate ink line art with soft watercolor washes, an adult woman in red robes seated on a throne between two pillars, holding balanced golden scales in left hand, upright sword in right hand, calm neutral expression, fair and impartial, no border, vertical, no text'),
    ('12_hanged_man', 'tarot card The Hanged Man, delicate ink line art with soft watercolor washes, an adult man hanging upside down from a T-shaped wooden cross by one foot, the other leg bent like a number four, serene peaceful expression, golden halo around his head, perspective of seeing the world differently, no border, vertical, no text'),
    ('13_death', 'tarot card Death, delicate ink line art with soft watercolor washes, a skeleton knight in black armor riding a white horse through a field, holding a black banner with a white rose, sunrise on horizon, people of all ages kneeling, transformation not horror, no border, vertical, no text'),
    ('14_temperance', 'tarot card Temperance, delicate ink line art with soft watercolor washes, a female angel with large white wings wearing a white robe, pouring liquid from a gold cup to a silver cup, one foot in a pond one foot on land, crown of flowers, path to mountains, balance and harmony, no border, vertical, no text'),
    ('15_devil', 'tarot card The Devil, delicate ink line art with soft watercolor washes, a horned male demon with bat-like wings squatting on a black pedestal, two small human figures chained loosely below him, inverted pentagram, dark cavern, bondage and materialism theme not horror, no border, vertical, no text'),
    ('16_tower', 'tarot card The Tower, delicate ink line art with soft watercolor washes, a tall stone tower struck by lightning at its crown, flames bursting from windows, two human figures falling from the tower, dark stormy sky with lightning bolts, destruction and revelation, no border, vertical, no text'),
    ('17_star', 'tarot card The Star, delicate ink line art with soft watercolor washes, a young adult woman kneeling by a pond pouring water from two jugs, seven small stars and one large golden star in night sky above, peaceful water reflection, nude innocent not sexual, hope and renewal, no border, vertical, no text'),
    ('18_moon', 'tarot card The Moon, delicate ink line art with soft watercolor washes, a full moon glowing over dark still water with a crayfish crawling out, two distant stone towers, a wolf and a dog howling at the moon, purple night sky, dreamlike mysterious atmosphere, no border, vertical, no text'),
    ('19_sun', 'tarot card The Sun, delicate ink line art with soft watercolor washes, a radiant golden sun shining above a walled garden, a young boy with short hair riding a white horse, sunflowers in bloom, bright joyful atmosphere, no border, vertical, no text'),
    ('20_judgement', 'tarot card Judgement, delicate ink line art with soft watercolor washes, a male angel with large wings blowing a long golden trumpet, figures of men women and children rising from open coffins below with arms raised toward heaven, blue sky with white clouds, resurrection and calling, no border, vertical, no text'),
    ('21_world', 'tarot card The World, delicate ink line art with soft watercolor washes, an adult woman dancing inside a large green laurel wreath, wrapped in flowing purple sash, a man angel eagle and bull in each corner representing the four elements, cosmic starry background, completion and wholeness, no border, vertical, no text'),
]

batch_size = 11
batch_num = int(sys.argv[1]) if len(sys.argv) > 1 else 1
start = (batch_num - 1) * batch_size
end = min(start + batch_size, len(cards))
batch = cards[start:end]

print(f'Batch {batch_num}: cards {start+1}-{end}/{len(cards)}')
for key, prompt in batch:
    path = f'{OUT}/{key}.png'
    if os.path.exists(path):
        print(f'  SKIP {key} (exists)')
        continue
    print(f'  {key}...', end='', flush=True)
    ok = False
    for attempt in range(3):
        try:
            resp = requests.post(f'{BASE}/images/generations',
                headers={'Authorization': f'Bearer {API_KEY}', 'Content-Type': 'application/json'},
                json={'model': 'agnes-image-2.1-flash', 'prompt': prompt, 'size': '512x768'}, timeout=180)
            data = resp.json()
            if 'data' in data:
                url = data['data'][0]['url']
                r = requests.get(url, timeout=60)
                with open(path, 'wb') as f: f.write(r.content)
                print(' OK')
                ok = True
                break
            print(f' E{attempt}', end='', flush=True)
        except:
            print(f' X{attempt}', end='', flush=True)
        time.sleep(3)
    if not ok:
        print(' FAILED')
print(f'Batch {batch_num} done')
