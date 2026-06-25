#!/usr/bin/env node
/** Patch 03_Digital_Innovation_Exam_CFU6.html from gen_tests.py data (no Python). */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const ROOT = dirname(fileURLToPath(import.meta.url));

const py = spawnSync('py', ['-3', 'gen_tests.py'], { cwd: ROOT, encoding: 'utf8' });
if (py.status === 0) {
  console.log('Built via gen_tests.py');
  process.exit(0);
}

// Fallback: run only DI page write by importing write logic from py output
// Patch existing HTML in place
const htmlPath = join(ROOT, '03_Digital_Innovation_Exam_CFU6.html');
let html = readFileSync(htmlPath, 'utf8');

const OPEN_ITEMS = [{
  title_ru: 'Открытый вопрос 15 (5 баллов)',
  ru: 'i) Опишите концепцию network externalities. ii) Объясните, как эта концепция связана с цифровыми платформами и бизнес-моделями Value Network.',
  en: 'Describe the concept of network externalities, and explain how this concept connects to digital platforms and Value Network business models.',
  sample_ru: 'Network externalities (сетевые внешние эффекты) — чем больше людей пользуется продуктом или платформой, тем ценнее он становится для каждого пользователя. Пример: мессенджер, соцсеть, маркетплейс.\n\nСвязь с цифровыми платформами: платформы растут быстрее, когда уже есть большая база пользователей (эффект «победитель получает всё»). Это близко к Value Network — модель, где ценность создаётся связями между пользователями, а не только продажей одного товара.',
}];

const q9_14 = [
  { num: 9, id: 'q9', en: 'According to the original Technology Acceptance Model (TAM), "Perceived Ease of Use" is defined as:', ru: 'По оригинальной модели TAM, «Perceived Ease of Use» — это:', correct: 'b', section: 'Digital Innovation — MCQ', options: [
    { id: 'a', en: 'The degree to which a person believes that using a particular system would enhance his or her job performance', ru: 'Степень, в которой человек считает, что система улучшит его работу' },
    { id: 'b', en: 'The degree to which a person believes that using a particular system would be free of effort', ru: 'Степень, в которой человек считает, что системой легко пользоваться (без лишних усилий)' },
    { id: 'c', en: 'The degree to which a person believes that using a particular system would be fun', ru: 'Степень, в которой использование системы кажется приятным' },
    { id: 'd', en: 'The degree to which a person believes that using a particular system would be easy to learn', ru: 'Степень, в которой систему легко выучить' },
    { id: 'e', en: 'None of the other answers is correct', ru: 'Ни один из других ответов не верен' },
  ]},
  { num: 10, id: 'q10', en: 'In the Lean Startup approach, an MVP:', ru: 'В Lean Startup подходе MVP:', correct: 'f', section: 'Digital Innovation — MCQ', options: [
    { id: 'a', en: 'Is just a prototype — the sketch of the product the company is going to offer', ru: 'Это только прототип / эскиз будущего продукта' },
    { id: 'b', en: 'Is used to ask competitors what they think of your product idea', ru: 'Нужен, чтобы спросить конкурентов их мнение об идее' },
    { id: 'c', en: 'Is used to build an idea by exposing a fully functional product to the customers', ru: 'Полностью готовый продукт для клиентов' },
    { id: 'd', en: 'Allows for testing an idea by exposing a fully functional version to the customers', ru: 'Позволяет тестировать идею, показывая полностью готовую версию клиентам' },
    { id: 'e', en: 'Allows for testing an idea by exposing a fully functional version only after a huge initial investment', ru: 'Полная версия только после больших затрат времени и денег' },
    { id: 'f', en: 'None of the other answers is correct', ru: 'Ни один из других ответов не верен' },
  ]},
  { num: 11, id: 'q11', en: 'In the strategic alignment framework, the first divergent phase aims to:', ru: 'В strategic alignment framework первая divergent-фаза направлена на то, чтобы:', correct: 'c', section: 'Digital Innovation — MCQ', options: [
    { id: 'a', en: 'Allow actors to identify their competitive advantage', ru: 'Помочь акторам найти конкурентное преимущество' },
    { id: 'b', en: 'Allow actors to converge towards a common solution', ru: 'Свести акторов к одному общему решению' },
    { id: 'c', en: 'Allow a set of actors to share their perspectives to create a set of shared ideas', ru: 'Дать акторам обменяться взглядами и создать общие идеи' },
    { id: 'd', en: 'Allow a set of actors to share their shared ideas', ru: 'Дать акторам поделиться уже общими идеями' },
    { id: 'e', en: 'Allow actors to share ideas by creating coalitions to manipulate the solution so consensus is not genuine', ru: 'Создать коалиции для манипуляции решением' },
    { id: 'f', en: 'None of the other answers is correct', ru: 'Ни один из других ответов не верен' },
  ]},
  { num: 12, id: 'q12', en: 'Encryption is the process of:', ru: 'Шифрование (encryption) — это процесс:', correct: 'c', section: 'Digital Innovation — MCQ', options: [
    { id: 'a', en: 'Sending a message through a very trusted communication channel or messenger', ru: 'Отправка сообщения через доверенный канал или курьера' },
    { id: 'b', en: 'Using a VPN in order to avoid data leaks', ru: 'Использование VPN, чтобы избежать утечки данных' },
    { id: 'c', en: "Scrambling the contents of a text/file so that it can't be read without the proper decryption key", ru: 'Перемешивание текста/файла так, что без ключа расшифровки его нельзя прочитать' },
    { id: 'd', en: 'Hiding the message through an ancient technique; nowadays encryption is not used in digital systems', ru: 'Скрытие сообщения древним способом; сейчас шифрование не используется' },
    { id: 'e', en: 'None of the other answers is correct', ru: 'Ни один из других ответов не верен' },
  ]},
  { num: 13, id: 'q13', en: 'Which is NOT an advantage of using cloud computing services?', ru: 'Что НЕ является преимуществом облачных вычислений?', correct: 'd', section: 'Digital Innovation — MCQ', options: [
    { id: 'a', en: 'Instant scalability', ru: 'Мгновенная масштабируемость' },
    { id: 'b', en: 'Pay per use', ru: 'Оплата по использованию' },
    { id: 'c', en: 'Lower initial investment in hardware', ru: 'Меньше начальных инвестиций в железо' },
    { id: 'd', en: 'Low dependence on the service provider', ru: 'Низкая зависимость от провайдера' },
    { id: 'e', en: 'None of the other answers is correct', ru: 'Ни один из других ответов не верен' },
  ]},
  { num: 14, id: 'q14', en: 'Onlife describes:', ru: 'Onlife описывает:', correct: 'c', section: 'Digital Innovation — MCQ', options: [
    { id: 'a', en: 'A condition where social media interactions mainly threaten privacy', ru: 'Ситуацию, где соцсети в основном угрожают приватности' },
    { id: 'b', en: 'A future in which human life exists only in digital environments', ru: 'Будущее, где жизнь существует только в цифровой среде' },
    { id: 'c', en: 'A condition where real and digital worlds become difficult to separate', ru: 'Ситуацию, где реальный и цифровой мир трудно разделить' },
    { id: 'd', en: 'A business model for selling digital objects through online platforms', ru: 'Бизнес-модель продажи цифровых объектов через онлайн-платформы' },
    { id: 'e', en: 'None of the previous answers is correct', ru: 'Ни один из других ответов не верен' },
  ]},
];

const m = html.match(/const QUESTIONS = (\[[\s\S]*?\]);\s*\n\s*const OPEN_ITEMS/);
if (!m) throw new Error('QUESTIONS block not found');
const questions = JSON.parse(m[1]);
const head = questions.slice(0, 8);
const tail = questions.slice(14);
const sna19 = tail.find((q) => q.id === 'sna19');
if (sna19) sna19.correct = 'a';
const rebuilt = [...head, ...q9_14, ...tail];

html = html.replace(
  /const QUESTIONS = \[[\s\S]*?\];\s*\n\s*const OPEN_ITEMS = \[\];/,
  `const QUESTIONS = ${JSON.stringify(rebuilt)};\n    const OPEN_ITEMS = ${JSON.stringify(OPEN_ITEMS)};`,
);

html = html.replace(
  '<p class="sub">Digital Innovation Exam CFU 6 — 14 MCQ + SNA / 14 MCQ + SNA</p>',
  '<p class="sub">Digital Innovation Exam CFU 6 — 14 MCQ + open + SNA / 14 MCQ + открытый + SNA</p>',
);
html = html.replace(
  '<div class="rules">Экзамен DI: +1 / −0,2 за MCQ (1–20). SNA-расчёты проверяются по эталону.</div>',
  '<div class="rules">Экзамен DI: +1 / −0,2 за MCQ (1–20). Открытый вопрос 15 — эталон после проверки. SNA-расчёты проверяются по эталону.</div>',
);

if (!html.includes('.exam-photo')) {
  html = html.replace(
    'mark.wrong-mark { background: #fadbd8; padding: 0 4px; border-radius: 3px; }',
    `mark.wrong-mark { background: #fadbd8; padding: 0 4px; border-radius: 3px; }
    .exam-photo { max-width: 100%; margin: 1rem 0 1.5rem; }
    .exam-photo img { width: 100%; height: auto; border-radius: 8px; border: 1px solid #e8ecf1; display: block; }
    .exam-photo figcaption { font-size: 0.85rem; color: #666; margin-top: 0.5rem; text-align: center; }`,
  );
}

if (!html.includes('exam-di-cfu6-open.png')) {
  html = html.replace(
    '<div class="section-title">SNA — матрица смежности',
    `<div class="section-title">Фото с экзамена (Key A — вопросы 9–15)</div>
    <figure class="exam-photo">
      <img src="images/exam-di-cfu6-open.png" alt="DI CFU 6 exam — questions 9–15" />
      <figcaption>Бланк экзамена DI CFU 6 (вариант Key A)</figcaption>
    </figure>
    <div class="section-title">SNA — матрица смежности`,
  );
}

writeFileSync(htmlPath, html, 'utf8');
console.log('Patched', htmlPath);
