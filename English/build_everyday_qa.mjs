/**
 * Build 22_Everyday_QA.html — big Everyday English study page
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(
  readFileSync(join(ROOT, 'data/everyday_qa_en.json'), 'utf8')
);

const BAD =
  /mortgage|labor for|possessive|quissants|Anything else\.|What is your question\.|Which one do you prefer|But what kind of sauce|you have a little longer|I know, but we have got/i;

function ok(p) {
  if (BAD.test(p.a) || BAD.test(p.q)) return false;
  if (p.a.length > 110 || p.q.length > 100) return false;
  if ((p.a.match(/\./g) || []).length > 2) return false;
  if (/^(Yes\. What|What is your question)/i.test(p.a)) return false;
  return true;
}

const en = [];
const seen = new Set();
for (const p of raw) {
  if (!ok(p)) continue;
  const k = p.q.toLowerCase();
  if (seen.has(k)) continue;
  seen.add(k);
  // fix a few
  let a = p.a
    .replace(/Yes\. What do you need\./, 'Yes. What do you need?')
    .replace(/Yes, you've been to a few concerts\./, "Yes, I've been to a few concerts.")
    .replace(/Do you want to lift to the office\?/, p.q);
  if (/lift to the office/i.test(p.q)) {
    en.push({
      tag: 'work',
      q: 'Do you want a lift to the office?',
      a: 'That would be great.',
      ru: 'Подбросить до офиса? — Было бы супер. (lift = подвезти)',
    });
    continue;
  }
  en.push({ tag: p.tag, q: p.q, a, ru: '' });
  if (en.length >= 180) break;
}

// Russian for as many as practical — key phrases + auto-ish short gloss
const RU = {
  'Is there anything I can do to help?': 'Могу чем-то помочь? — Всё будет ок, спасибо.',
  'What is she doing?': 'Что она делает? — Она спит.',
  'What did you do yesterday?': 'Что делал вчера? — Навестил бабушку.',
  'What will you do tomorrow?': 'Что будешь делать завтра? — Пойду в парк с семьёй.',
  'What would you like to eat?': 'Что бы ты хотел поесть? — Куриный салат.',
  'How many languages do you speak?': 'Сколько языков знаешь? — Три: французский, английский, испанский.',
  'What are you cooking?': 'Что готовишь? — Чипсы с кетчупом (звучит странно — в видео так).',
  'Do you need any help?': 'Нужна помощь? — Да, ищу книгу почитать.',
  'What kind of books are you interested in?': 'Какие книги тебе интересны? — Фэнтези, Гарри Поттер.',
  'How many times a week do you exercise?': 'Сколько раз в неделю спорт? — Четыре дня.',
  'How much do you weigh?': 'Сколько весишь? — Около 185 фунтов.',
  'Do you often go to a concert?': 'Часто ходишь на концерты? — Нечасто.',
  'When did you buy the car?': 'Когда купил машину? — В этом апреле.',
  'How long have you been working?': 'Как давно работаешь? — Уже 20-й год.',
  'What are you planning to do today?': 'Что планируешь сегодня? — Пока не уверен.',
  'How long have you been unemployed?': 'Как давно без работы? — Уже 2 месяца.',
  'Were you busy yesterday?': 'Вчера был занят? — Очень: и на работе, и дома.',
  'Can you give me a discount?': 'Можете скидку? — Дешевле не могу.',
  'How long have you studied English?': 'Как долго учишь английский? — Около 2 лет.',
  'What kind of sauce is this?': 'Что за соус? — Томатный.',
  'Are you here on business or for pleasure?': 'По работе или отдыхать? — Отдыхать.',
  'Do you have any wine?': 'Есть вино? — Конечно.',
  'Should I go to her soccer game?': 'Идти на её матч? — Как хочешь.',
  'Could you sign here?': 'Подпишете здесь? — Да. Ручка есть?',
  'Do you like your new shoes?': 'Нравятся новые туфли? — Не очень / не в восторге.',
  'What is your favorite dessert?': 'Любимый десерт? — Шоколадный торт.',
  'Do you like to go for walks?': 'Любишь гулять? — Да, вечером.',
  'What type of movies do you like?': 'Какие фильмы любишь? — Ромкомы.',
  'Do you like to exercise?': 'Любишь спорт? — Да, бег.',
  'Have you ever traveled abroad?': 'Бывал за границей? — Да, в Италии.',
  'How long have you been learning English?': 'Как давно учишь English? — С восьми лет.',
  'Do you have any allergies?': 'Есть аллергии? — Нет.',
  'Where do you want to go?': 'Куда хочешь? — На пляж.',
  'Would you like to have dinner with me?': 'Поужинать со мной? — Конечно, было бы здорово.',
  'Could we have lunch together one day?': 'Можем как-нибудь пообедать? — С удовольствием.',
  'What are you planning for after work?': 'Что после работы? — Шопинг с друзьями.',
  'What do you think of the movie?': 'Как фильм? — Захватывающий и весёлый.',
  'Do you enjoy reading?': 'Любишь читать? — Да, романы.',
  'How long will you be staying?': 'Как долго останетесь? — До конца месяца.',
  'What kind of room would you like?': 'Какой номер? — Одноместный, пожалуйста.',
  'Do you have a reservation?': 'Есть бронь? — Нет.',
  'How are you doing?': 'Как дела? — Норм. Работа ок.',
  "How's the weather out there?": 'Какая погода? — Солнечно, местами облака.',
  'Does that make sense?': 'Понятно? — Да. Спасибо.',
  "What's your favorite season of the year?": 'Любимый сезон? — Весна.',
  'Can you do magic tricks?': 'Умеешь фокусы? — Нет.',
  'Do you enjoy playing video games?': 'Любишь игры? — Да.',
  'Can you do a backflip?': 'Умеешь сальто назад? — Нет.',
  'What do you usually shop for?': 'Что обычно покупаешь? — В основном одежду.',
  'What do you think about my new clothes?': 'Как тебе мой новый лук? — Не очень смотрится.',
  'Do you prefer tea or coffee?': 'Чай или кофе? — Чай.',
  'How are you feeling today?': 'Как себя чувствуешь? — Немного устал.',
  "What's your favorite book?": 'Любимая книга? — Гарри Поттер.',
  'Can you help me?': 'Можешь помочь? — Да. Что нужно?',
  'Where did you learn English?': 'Где учил английский? — В школе.',
  'What time do you wake up?': 'Во сколько встаёшь? — В 7 утра.',
  'Do you have any plans for the weekend?': 'Планы на выходные? — Да, к семье.',
  'Do you like to cook?': 'Любишь готовить? — Очень.',
  "What's your favorite TV show?": 'Любимый сериал? — Friends.',
  'Did you go see the doctor yet?': 'Уже ходил к врачу? — Ещё нет. Может, завтра.',
  'How are you feeling?': 'Как самочувствие? — Всё ещё простуда.',
  'What do you do for work?': 'Кем работаешь? — Я студент.',
  "Do you know if there's a restroom around here?": 'Где туалет? — Здесь, в магазине.',
  'Is today okay?': 'Сегодня ок? — Извини, сегодня не могу.',
  'Where are you going?': 'Куда идёшь? — В магазин, надо купить кое-что.',
  'How do you learn English?': 'Как учишь English? — Глубоко и внимательно.',
  'How do you study English?': 'Как занимаешься? — Медленно и стабильно.',
  'How do you go to school?': 'Как добираешься в школу? — Сестра везёт на машине.',
  'Do you like cycling?': 'Любишь велосипед? — Да, по тропам.',
  "What's your favorite flower?": 'Любимый цветок? — Подсолнух.',
  'Is it your hat?': 'Это твоя шляпа? — Да, только купил.',
  'Where is your office?': 'Где офис? — Прямо напротив парка.',
  'Can you play drums?': 'Умеешь на барабанах? — Предпочитаю другие инструменты.',
  "What's your favorite cheese?": 'Любимый сыр? — Чеддер.',
  'Is it windy?': 'Ветрено? — Ветер довольно сильный.',
  'Do you like skiing?': 'Любишь лыжи? — Обожаю.',
  "What's your favorite candy?": 'Любимые конфеты? — Мятные.',
  'What language does your family speak?': 'На каком языке дома? — На английском.',
  "What's your motto in life?": 'Девиз? — Never give up on your dreams.',
  'Can you speak English?': 'Говоришь по-английски? — Да, хорошо.',
  'What do you want to do after you graduate?': 'После учёбы? — Хочу быть программистом.',
  'What time do you go to school?': 'Во сколько в школу? — Выхожу в 7.',
  "What's your favorite drink?": 'Любимый напиток? — Апельсиновый сок.',
  'How long have you been wearing these shoes?': 'Как долго носишь эти туфли? — Почти 2 года.',
  'Have you ever ridden a horse?': 'Катался на лошади? — Да.',
  'One way or round?': 'В одну сторону или туда-обратно? — В одну.',
  'When do you get off work?': 'Когда конец работы? — В 6.',
  'When would you like to meet?': 'Когда встретимся? — В 10 утра.',
  'What time does it begin?': 'Во сколько начинается? — В 6.',
  'What will the weather be like tomorrow?': 'Какая погода завтра? — Снег и очень холодно.',
  'What are you allergic to?': 'На что аллергия? — На арахис.',
  'Do you prefer traveling by train or plane?': 'Поезд или самолёт? — Самолёт.',
  'How long does it take?': 'Сколько займёт? — Час.',
  'Do you play any musical instruments?': 'Играешь на чём-то? — Да, на гитаре.',
  'Would you like to go see a movie later?': 'В кино позже? — Хотел бы, но надо доделать работу.',
  'Can we go together?': 'Можем вместе? — Да.',
  'Why did you choose this?': 'Почему это выбрал? — Потому что нравится.',
  'Have you ever tried surfing?': 'Пробовал сёрфинг? — Нет.',
  'Why are you late?': 'Почему опоздал? — Проблемы с машиной.',
  'When are you leaving?': 'Когда уезжаешь? — Завтра.',
  'Do you use social media?': 'Сидишь в соцсетях? — Да, регулярно.',
  "What's your favorite time of day?": 'Любимое время суток? — Вечер.',
  'Do you have a favorite restaurant?': 'Любимый ресторан? — Да, итальянский.',
  'Have you ever been to a concert?': 'Был на концерте? — Да, несколько раз.',
  "What's your favorite kind of pizza?": 'Какая пицца? — Пепперони.',
  'How was your day?': 'Как день? — Хороший. Спасибо, что спросил.',
  'How often do you exercise?': 'Как часто спорт? — Три раза в неделю.',
  'How do you get to school?': 'Как до школы? — Обычно на автобусе.',
  'Is there a bank near here?': 'Тут рядом банк? — Не знаю, извини.',
  'How was your weekend?': 'Как выходные? — Спокойно / расслабленно.',
  'May I have your passport, please?': 'Паспорт, пожалуйста. — Конечно, вот.',
  'Where do you study?': 'Где учишься? — В Cambridge.',
  'What is your major?': 'Какая специальность? — Computer science.',
  'Do you have a best friend?': 'Есть лучший друг? — Да, Alex.',
  "What's the last movie you saw?": 'Какой последний фильм? — The Incredibles 2.',
  'Did you buy anything?': 'Что-нибудь купил? — Да, немного.',
  'What kind of music do you like to listen to?': 'Какую музыку слушаешь? — Разную: поп, рок, классика.',
  'Where do your parents live?': 'Где живут родители? — Отец в Washington, DC.',
  'Do you take credit cards?': 'Карты принимаете? — Visa и Mastercard.',
  'What are you doing this weekend?': 'Что на выходных? — Ничего особенного, работа.',
  'Where can I park?': 'Где припарковаться? — Где угодно.',
  'Is the store open?': 'Магазин открыт? — Сейчас закрыт.',
  'Do you have homework?': 'Есть домашка? — Да.',
  'Do you play chess?': 'Играешь в шахматы? — Не моё.',
  'Do you like jogging?': 'Любишь бег? — Да, для формы.',
  "What's your favorite subject?": 'Любимый предмет? — История.',
  'Where is the library?': 'Где библиотека? — Около школы.',
  'Where do you buy groceries?': 'Где продукты? — На фермерском рынке.',
  'Do you like traveling?': 'Любишь путешествовать? — Очень.',
  'Where would you like to go?': 'Куда бы хотел? — На пляж.',
  'Where were you last week?': 'Где был на прошлой неделе? — В Токио.',
  'How may I help you?': 'Чем могу помочь? — Хочу заказать цветы.',
  'What color?': 'Какой цвет? — Красный был бы норм.',
  'What are you doing there?': 'Что там делаешь? — Смотрю книги по English.',
  'Do you want to get something to eat later?': 'Потом поесть? — Нет, ещё сыт после ужина.',
  'What do you want to do?': 'Что хочешь делать? — Точно не знаю.',
  'Do you play sports?': 'Спортом занимаешься? — Нет, раньше плавал каждый день.',
  'Why are you angry?': 'Что злишься? — Не злюсь, просто расстроен.',
  "What's your favorite day of the week?": 'Любимый день недели? — Суббота, можно отдохнуть.',
  'Do you smoke?': 'Куришь? — Нет, это плохая привычка.',
  'Do you have any vacancies?': 'Есть свободные места/вакансии? — Нет, извините.',
  'When will he be back?': 'Когда он вернётся? — Через 20 минут.',
  'Are you busy?': 'Занят? — Да, дел много.',
  'Have you ever taken a road trip?': 'Ездил в road trip? — Да, несколько раз.',
  'Do you like attending festivals?': 'Любишь фестивали? — Да, атмосфера кайф.',
};

for (const item of en) {
  if (RU[item.q]) item.ru = RU[item.q];
  else item.ru = ''; // still show EN; user can hide empty
}

const chunks = [
  { en: "I'd like…", ru: 'Я бы хотел… (вежливо вместо I want)' },
  { en: 'That would be nice.', ru: 'Было бы здорово. (мягкое да)' },
  { en: 'With pleasure.', ru: 'С удовольствием.' },
  { en: "I'm not sure yet.", ru: 'Пока не уверен.' },
  { en: 'Not bad.', ru: 'Нормально / неплохо.' },
  { en: 'Does that make sense?', ru: 'Понятно? Логично?' },
  { en: 'get off work', ru: 'заканчивать работу' },
  { en: 'pay a visit', ru: 'навестить' },
  { en: 'on business / for pleasure', ru: 'по работе / для отдыха' },
  { en: "I can't go any cheaper than that.", ru: 'Дешевле не могу.' },
  { en: 'a lift', ru: 'подвезти на машине' },
  { en: 'How long have you been…?', ru: 'Как давно ты…? (процесс до сейчас)' },
  { en: 'Have you ever…?', ru: 'Ты когда-нибудь…?' },
  { en: 'What kind of…?', ru: 'Какой/какие…?' },
  { en: 'Would you like to…?', ru: 'Не хочешь…? (приглашение)' },
  { en: "Sorry, I can't.", ru: 'Извини, не могу.' },
  { en: 'Nothing special.', ru: 'Ничего особенного.' },
  { en: 'Fair enough.', ru: 'Справедливо / ладно, ок.' },
  { en: 'Works for me.', ru: 'Мне подходит.' },
  { en: "You're a lifesaver.", ru: 'Ты меня спас(ла).' },
  { en: 'Rough day?', ru: 'Тяжёлый день?' },
  { en: "I'm exhausted.", ru: 'Я вымотан.' },
  { en: 'Grab some…', ru: 'Захвати / купи по пути…' },
  { en: 'bail', ru: 'слинять / не пойти' },
  { en: 'soft yes', ru: 'мягкое «да» (не 100%)' },
  { en: 'switch off', ru: 'отключиться / отдохнуть' },
  { en: 'No overthinking.', ru: 'Без лишних раздумий.' },
  { en: 'Here you are.', ru: 'Вот, пожалуйста.' },
  { en: 'Thanks for asking.', ru: 'Спасибо, что спросил.' },
  { en: "I might…", ru: 'Может быть, я…' },
  { en: 'Not yet.', ru: 'Ещё нет.' },
  { en: 'Of course.', ru: 'Конечно.' },
  { en: 'I aspire to…', ru: 'Я стремлюсь…' },
  { en: 'Never give up on your dreams.', ru: 'Не сдавайся мечтам.' },
  { en: 'one way / round trip', ru: 'в одну сторону / туда-обратно' },
  { en: "I'm still full.", ru: 'Я ещё сыт.' },
  { en: "I'm just upset.", ru: 'Я просто расстроен (не злюсь).' },
  { en: 'car trouble', ru: 'проблемы с машиной' },
  { en: 'right across from…', ru: 'прямо напротив…' },
  { en: 'How may I help you?', ru: 'Чем могу помочь? (сервис)' },
];

const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="favicon.png" type="image/png" />
  <title>Everyday Q&amp;A — Think in English</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: "Segoe UI", system-ui, sans-serif; line-height: 1.65; margin: 0; padding: 1.5rem 1rem 3rem; color: #1a1a2e; background: #f8fafc; }
    .wrap { max-width: 880px; margin: 0 auto; }
    .back a { color: #3498db; text-decoration: none; }
    h1 { color: #2c3e50; border-bottom: 4px solid #e67e22; padding-bottom: 10px; font-size: 1.65rem; margin: 0.4rem 0; }
    .lead { color: #555; font-size: 0.95rem; }
    .lead a { color: #e67e22; }
    .howto { background: #fff7ed; border-left: 4px solid #e67e22; border-radius: 8px; padding: 0.9rem 1.1rem; margin: 1rem 0; font-size: 0.93rem; }
    .howto ol { margin: 0.35rem 0 0; padding-left: 1.2rem; }
    .tabs { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 1rem; position: sticky; top: 0; z-index: 5; background: #f8fafc; padding: 0.55rem 0; }
    .tab { border: 1px solid #cfd8e3; background: #fff; color: #2c3e50; padding: 8px 14px; border-radius: 999px; cursor: pointer; font-size: 0.86rem; font-family: inherit; }
    .tab.active { background: #e67e22; border-color: #e67e22; color: #fff; font-weight: 600; }
    .panel { display: none; } .panel.active { display: block; }
    .toolbar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 0.9rem; }
    .btn { background: #fff; color: #e67e22; border: 1px solid #e67e22; padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.86rem; font-family: inherit; font-weight: 600; }
    .btn.solid { background: #e67e22; color: #fff; }
    .btn:hover { background: #fff7ed; } .btn.solid:hover { background: #d35400; }
    input[type=search], select { padding: 7px 10px; border: 1px solid #cfd8e3; border-radius: 8px; font: inherit; font-size: 0.9rem; }
    input[type=search] { min-width: 180px; flex: 1; }
    .count { color: #7f8c8d; font-size: 0.86rem; margin-left: auto; }
    .pattern, .qa, .chunk, .dlg { background: #fff; border: 1px solid #e6ebf2; border-radius: 10px; padding: 0.95rem 1.1rem; margin: 0.65rem 0; }
    .pattern h3 { margin: 0 0 0.35rem; font-size: 1.02rem; }
    .pattern .ex { color: #555; font-size: 0.92rem; margin: 0.3rem 0; }
    code { background: #f1f5f9; padding: 1px 6px; border-radius: 4px; font-size: 0.9em; }
    .qa .tag { display: inline-block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #e67e22; background: #fff7ed; padding: 2px 8px; border-radius: 999px; margin-bottom: 0.4rem; }
    .qa .q { font-weight: 700; color: #1a3a5c; }
    .qa .a { margin-top: 0.4rem; padding-left: 0.7rem; border-left: 3px solid #e67e22; }
    .qa .ru { margin-top: 0.5rem; color: #7f8c8d; font-size: 0.88rem; }
    body.hide-ru .ru { display: none; }
    .chunk .en { font-weight: 700; color: #1a3a5c; }
    .chunk .ru { color: #7f8c8d; font-size: 0.9rem; margin-top: 0.2rem; }
    .dlg h3 { margin: 0 0 0.25rem; font-size: 1.05rem; }
    .dlg .where { color: #7f8c8d; font-size: 0.85rem; margin-bottom: 0.7rem; }
    .line { margin: 0.45rem 0; }
    .who { font-weight: 700; color: #e67e22; margin-right: 6px; }
    .line.b .who { color: #8e44ad; }
    .kkline { display: block; margin-left: 1.5rem; color: #7f8c8d; font-size: 0.86rem; }
    .drill { background: #fff; border-radius: 12px; padding: 1.3rem 1.4rem; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
    .prompt-q { font-size: 1.22rem; font-weight: 700; color: #1a3a5c; margin: 0.5rem 0 1rem; }
    .hint { color: #7f8c8d; font-size: 0.9rem; }
    .reveal-box { display: none; background: #eef8f0; border-left: 4px solid #27ae60; border-radius: 8px; padding: 0.9rem 1rem; margin-top: 0.8rem; }
    .reveal-box.show { display: block; }
    .reveal-box .label { font-size: 0.72rem; font-weight: 700; color: #1e8449; text-transform: uppercase; margin-bottom: 0.3rem; }
    .filters { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 0.8rem; }
    .chip { border: 1px solid #dde3ea; background: #fff; padding: 5px 10px; border-radius: 999px; font-size: 0.8rem; cursor: pointer; font-family: inherit; }
    .chip.on { background: #2c3e50; color: #fff; border-color: #2c3e50; }
    .stat { background: #fff; border-radius: 10px; padding: 0.8rem 1rem; margin-bottom: 1rem; border: 1px solid #e6ebf2; font-size: 0.92rem; color: #555; }
    .stat b { color: #2c3e50; }
  </style>
</head>
<body>
<div class="wrap">
  <p class="back"><a href="index.html">← English</a></p>
  <h1>Everyday Q&amp;A — Think in English</h1>
  <p class="lead">
    Повседневный английский: вопросы, ответы, куски речи и диалоги.
    По видео
    <a href="https://youtu.be/fz_mi6Pj8bI" target="_blank" rel="noopener">Thinking in English — Everyday Life</a>.
  </p>

  <div class="howto">
    <strong>Как учить</strong>
    <ol>
      <li>Вопрос → ответь <em>вслух</em> сам.</li>
      <li>Открой sample answer и сравни.</li>
      <li>Скажи ответ своими словами про свою жизнь.</li>
      <li>В «Чанки» учи короткие куски — ими люди реально говорят.</li>
    </ol>
  </div>

  <div class="stat" id="statLine"></div>

  <div class="tabs" id="tabs">
    <button class="tab active" data-panel="bank">Банк Q&amp;A</button>
    <button class="tab" data-panel="drill">Практика</button>
    <button class="tab" data-panel="chunks">Чанки</button>
    <button class="tab" data-panel="patterns">Паттерны</button>
    <button class="tab" data-panel="dialog">Диалог пары</button>
  </div>

  <div class="panel active" id="bank">
    <div class="toolbar">
      <input type="search" id="search" placeholder="Поиск: work, dinner, how long…" />
      <button class="btn" id="toggleRu" type="button">Скрыть перевод</button>
      <span class="count" id="bankCount"></span>
    </div>
    <div class="filters" id="filters"></div>
    <div id="bankList"></div>
  </div>

  <div class="panel" id="drill">
    <div class="drill">
      <div class="toolbar">
        <button class="btn solid" id="nextQ" type="button">Следующий</button>
        <button class="btn" id="showAns" type="button">Показать ответ</button>
        <select id="drillTag"><option value="all">все темы</option></select>
        <span class="count" id="drillCount"></span>
      </div>
      <p class="hint">Сначала ответь сам, потом открой.</p>
      <div class="prompt-q" id="drillQ">—</div>
      <div class="reveal-box" id="reveal">
        <div class="label">Sample answer</div>
        <div id="drillA"></div>
        <div class="ru" id="drillRu" style="margin-top:0.45rem"></div>
      </div>
    </div>
  </div>

  <div class="panel" id="chunks">
    <p class="lead">Короткие куски — учи целиком, не по словам.</p>
    <div id="chunkList"></div>
  </div>

  <div class="panel" id="patterns">
    <div class="pattern">
      <h3>1. What would you like…? → I'd like…</h3>
      <div class="ex"><code>What would you like to eat?</code> → <code>I'd like chicken salad.</code></div>
      <div class="ex ru">Вежливее, чем I want.</div>
    </div>
    <div class="pattern">
      <h3>2. How long have you been…? → For / Since / About…</h3>
      <div class="ex"><code>How long have you been learning English?</code> → <code>Since I was eight. / About 2 years.</code></div>
      <div class="ex ru">Процесс начался в прошлом и всё ещё идёт.</div>
    </div>
    <div class="pattern">
      <h3>3. Have you ever…? → Yes, I have… / No, I haven't…</h3>
      <div class="ex"><code>Have you ever traveled abroad?</code> → <code>Yes, I have been to Italy.</code></div>
    </div>
    <div class="pattern">
      <h3>4. Would you like to…? → That would be nice. / Sorry, I can't.</h3>
      <div class="ex"><code>Would you like to have dinner with me?</code> → <code>That would be nice.</code></div>
    </div>
    <div class="pattern">
      <h3>5. What kind / type of…?</h3>
      <div class="ex"><code>What kind of books are you interested in?</code> → <code>I like fantasy books.</code></div>
    </div>
    <div class="pattern">
      <h3>6. Do you prefer A or B?</h3>
      <div class="ex"><code>Do you prefer tea or coffee?</code> → <code>I prefer tea.</code></div>
    </div>
    <div class="pattern">
      <h3>7. How often / How many times a week…?</h3>
      <div class="ex"><code>How often do you exercise?</code> → <code>Three times a week.</code></div>
    </div>
    <div class="pattern">
      <h3>8. Отказ и смягчение</h3>
      <div class="ex"><code>I'd love to, but I have to finish my work tonight.</code></div>
      <div class="ex ru">Хотел бы, но… — вежливый отказ.</div>
    </div>
  </div>

  <div class="panel" id="dialog">
    <div class="dlg">
      <h3>Evening at home</h3>
      <div class="where">Пара · обычный вечер</div>
      <div class="line"><span class="who">A:</span> Hey, I'm home. God, I'm exhausted.<span class="kkline ru">Привет, я дома. Я вымотан.</span></div>
      <div class="line b"><span class="who">S:</span> Rough day?<span class="kkline ru">Тяжёлый день?</span></div>
      <div class="line"><span class="who">A:</span> Yeah. Meetings back to back. What about you?<span class="kkline ru">Ага. Митинги один за другим. А ты?</span></div>
      <div class="line b"><span class="who">S:</span> Not bad. Want some tea?<span class="kkline ru">Норм. Хочешь чай?</span></div>
      <div class="line"><span class="who">A:</span> Please. You're a lifesaver.<span class="kkline ru">Давай. Ты меня спасаешь.</span></div>
    </div>
    <div class="dlg">
      <h3>Dinner plans</h3>
      <div class="where">Еда · лень vs готовка</div>
      <div class="line"><span class="who">A:</span> What do you want for dinner?<span class="kkline ru">Что на ужин?</span></div>
      <div class="line b"><span class="who">S:</span> Something easy. Pasta? Or we could get takeout.<span class="kkline ru">Что попроще. Паста? Или заказ.</span></div>
      <div class="line"><span class="who">A:</span> We've been ordering too much lately.<span class="kkline ru">Мы слишком часто заказываем.</span></div>
      <div class="line b"><span class="who">S:</span> Fair enough. You chop, I stir?<span class="kkline ru">Справедливо. Ты режешь, я мешаю?</span></div>
      <div class="line"><span class="who">A:</span> Deal.<span class="kkline ru">Договорились.</span></div>
    </div>
    <div class="dlg">
      <h3>Weekend plans</h3>
      <div class="where">Друзья · soft yes</div>
      <div class="line b"><span class="who">S:</span> Did you see Mike's message about Saturday?<span class="kkline ru">Видел сообщение Майка про субботу?</span></div>
      <div class="line"><span class="who">A:</span> Yeah. Do we actually want to go?<span class="kkline ru">Ага. Мы реально хотим?</span></div>
      <div class="line b"><span class="who">S:</span> Kind of. But I also just want to stay in.<span class="kkline ru">Типа да. Но ещё хочется никуда не идти.</span></div>
      <div class="line"><span class="who">A:</span> Soft yes — if we're tired, we bail.<span class="kkline ru">Мягкое да — если устанем, слиняем.</span></div>
      <div class="line b"><span class="who">S:</span> Perfect.<span class="kkline ru">Идеально.</span></div>
    </div>
  </div>
</div>

<script>
const ITEMS = ${JSON.stringify(en)};
const CHUNKS = ${JSON.stringify(chunks)};

document.getElementById('statLine').innerHTML =
  '<b>' + ITEMS.length + '</b> вопросов-ответов · <b>' + CHUNKS.length +
  '</b> чанков · паттерны · диалоги · практика. Перевод есть у части карточек — остальное тренируй сам.';

const tags = ['all', ...new Set(ITEMS.map(i => i.tag))].sort((a,b) => a === 'all' ? -1 : a.localeCompare(b));
let activeTag = 'all';
const filters = document.getElementById('filters');
tags.forEach(t => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'chip' + (t === 'all' ? ' on' : '');
  b.textContent = t;
  b.dataset.tag = t;
  b.onclick = () => {
    activeTag = t;
    filters.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c.dataset.tag === t));
    renderBank();
  };
  filters.appendChild(b);
});

const drillTag = document.getElementById('drillTag');
tags.filter(t => t !== 'all').forEach(t => {
  const o = document.createElement('option');
  o.value = t; o.textContent = t;
  drillTag.appendChild(o);
});

function filtered() {
  const q = (document.getElementById('search').value || '').trim().toLowerCase();
  return ITEMS.filter(i => {
    if (activeTag !== 'all' && i.tag !== activeTag) return false;
    if (!q) return true;
    return (i.q + ' ' + i.a + ' ' + i.ru).toLowerCase().includes(q);
  });
}

function renderBank() {
  const list = filtered();
  document.getElementById('bankCount').textContent = list.length + ' / ' + ITEMS.length;
  const box = document.getElementById('bankList');
  box.innerHTML = '';
  list.forEach(item => {
    const el = document.createElement('div');
    el.className = 'qa';
    el.innerHTML =
      '<div class="tag">' + item.tag + '</div>' +
      '<div class="q">' + item.q + '</div>' +
      '<div class="a">' + item.a + '</div>' +
      (item.ru ? '<div class="ru">' + item.ru + '</div>' : '<div class="ru">— переведи сам / скажи своими словами</div>');
    box.appendChild(el);
  });
}

document.getElementById('search').addEventListener('input', renderBank);
document.getElementById('toggleRu').onclick = () => {
  document.body.classList.toggle('hide-ru');
  document.getElementById('toggleRu').textContent =
    document.body.classList.contains('hide-ru') ? 'Показать перевод' : 'Скрыть перевод';
};

const chunkList = document.getElementById('chunkList');
CHUNKS.forEach(c => {
  const el = document.createElement('div');
  el.className = 'chunk';
  el.innerHTML = '<div class="en">' + c.en + '</div><div class="ru">' + c.ru + '</div>';
  chunkList.appendChild(el);
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.panel).classList.add('active');
  };
});

let order = [];
let idx = -1;
function pool() {
  const t = drillTag.value;
  return t === 'all' ? ITEMS.slice() : ITEMS.filter(i => i.tag === t);
}
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function showQuestion() {
  if (!order.length || idx >= order.length - 1) {
    order = shuffle(pool());
    idx = 0;
  } else idx++;
  const item = order[idx];
  document.getElementById('drillQ').textContent = item.q;
  document.getElementById('drillA').textContent = item.a;
  document.getElementById('drillRu').textContent = item.ru || '';
  document.getElementById('reveal').classList.remove('show');
  document.getElementById('drillCount').textContent = (idx + 1) + ' / ' + order.length;
}
document.getElementById('nextQ').onclick = showQuestion;
document.getElementById('showAns').onclick = () => document.getElementById('reveal').classList.add('show');
drillTag.onchange = () => { order = []; idx = -1; showQuestion(); };

renderBank();
showQuestion();
</script>
</body>
</html>
`;

writeFileSync(join(ROOT, '22_Everyday_QA.html'), html);
console.log('Wrote 22_Everyday_QA.html —', en.length, 'Q&A,', chunks.length, 'chunks, ru mapped', Object.keys(RU).length);
