#!/usr/bin/env node
/** Rebuild Place Marketing pages from variant JSON files (English only). */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

const VARIANT_FILES = [
  { id: '01', file: 'variant01.json' },
  { id: '03', file: 'variant03.json' },
  { id: '04', file: 'variant04.json' },
  { id: '05', file: 'variant05.json' },
  { id: '06', file: 'variant06.json' },
];

function stripQuestion(q) {
  const out = {
    num: q.num,
    id: q.id,
    en: q.en,
    options: q.options.map((o) => ({ id: o.id, en: o.en })),
    correct: q.correct,
    section: q.section,
  };
  if (q.explain) out.explain = q.explain;
  return out;
}

function tagVariant(variantId, items) {
  const label = variantId.padStart(2, '0');
  return items.map((q, i) =>
    stripQuestion({
      ...q,
      num: `Variant ${label} · Q${i + 1}`,
      id: `v${variantId}_mcq${i + 1}`,
      section: `Variant ${label} — Part I (MCQ)`,
    }),
  );
}

function loadVariants() {
  const tagged = {};
  for (const { id, file } of VARIANT_FILES) {
    const items = JSON.parse(readFileSync(join(ROOT, file), 'utf8'));
    tagged[id] = tagVariant(id, items);
  }
  return tagged;
}

function patchHtml(file, { title, subtitle, rules, back, questions, scoring }) {
  let h = readFileSync(join(ROOT, file), 'utf8');

  h = h.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  h = h.replace(/<h1>[^<]*<\/h1>/, `<h1>${title}</h1>`);
  h = h.replace(/<p class="sub">[^<]*<\/p>/, `<p class="sub">${subtitle}</p>`);
  h = h.replace(/<div class="rules">[\s\S]*?<\/div>/, rules);
  h = h.replace(/<p class="back">[\s\S]*?<\/p>/, `<p class="back">${back}</p>`);

  h = h.replace(/const SCORING = [\s\S]*?;/, `const SCORING = ${JSON.stringify(scoring)};`);
  h = h.replace(/const QUESTIONS = \[[\s\S]*?\];/, `const QUESTIONS = ${JSON.stringify(questions)};`);
  h = h.replace(/const OPEN_ITEMS = \[[\s\S]*?\];/, 'const OPEN_ITEMS = [];');

  h = h.replace(/\.q-ru\s*\{[^}]*\}/g, '');
  h = h.replace(/\.opt-ru\s*\{[^}]*\}/g, '');
  h = h.replace(/\.answer-ru\s*\{[^}]*\}/g, '');

  h = h.replace(/Check answers \/ Проверить/g, 'Check answers');
  h = h.replace(/Reset \/ Сбросить/g, 'Reset');
  h = h.replace(/fb\.innerHTML = '✓ Correct \/ Верно'/g, "fb.innerHTML = '✓ Correct'");
  h = h.replace(
    /\+ \(q\.explain_ru \? '<div class="explain">' \+ q\.explain_ru \+ '<\/div>' : ''\)/g,
    "+ (q.explain ? '<div class=\"explain\">' + q.explain + '</div>' : '')",
  );
  h = h.replace(/q\.explain_ru/g, 'q.explain');
  h = h.replace(/warnEl\.textContent = `Ответьте на все вопросы[^`]*`;/g,
    "warnEl.textContent = 'Answer all multiple-choice questions (' + unanswered + ' unanswered).';");
  h = h.replace(/`Результат: \$\{correct\} из \$\{total\}/g, '`Score: ${correct} of ${total}');
  h = h.replace(/Верно: \$\{correct\} · Неверно: \$\{wrong\} · Без ответа: \$\{unanswered\}/g,
    'Correct: ${correct} · Wrong: ${wrong} · Unanswered: ${unanswered}');
  h = h.replace(/✗ Неверно\. Ваш ответ:/g, '✗ Wrong. Your answer:');
  h = h.replace(/Правильный:/g, 'Correct:');
  h = h.replace(/⚠️ Ответ не выбран\./g, '⚠️ No answer selected.');
  h = h.replace(/Баллы: \$\{score\.toFixed\(1\)\} · /g, 'Points: ${score.toFixed(1)} · ');

  writeFileSync(join(ROOT, file), h, 'utf8');
}

const variants = loadVariants();
const overrideIds = new Set(VARIANT_FILES.map((v) => v.id));

const indexHtml = readFileSync(join(ROOT, 'index.html'), 'utf8');
const m = indexHtml.match(/const QUESTIONS = (\[[\s\S]*?\]);/);
if (!m) throw new Error('QUESTIONS not found');
const all = JSON.parse(m[1]);

const rest = all
  .filter((q) => {
    const match = q.id?.match(/^v(\d+)_/);
    return !match || !overrideIds.has(match[1]);
  })
  .map(stripQuestion);

const combined = [
  ...variants['01'],
  ...rest.filter((q) => q.section?.startsWith('Variant 02')),
  ...variants['03'],
  ...variants['04'],
  ...variants['05'],
  ...variants['06'],
  ...rest.filter((q) => {
    const n = q.section?.match(/Variant (\d+)/)?.[1];
    return n && n !== '01' && n !== '02' && n !== '03' && n !== '04' && n !== '05' && n !== '06';
  }),
];

// Sort by variant number then question number
combined.sort((a, b) => {
  const va = parseInt(a.section?.match(/Variant (\d+)/)?.[1] || '0', 10);
  const vb = parseInt(b.section?.match(/Variant (\d+)/)?.[1] || '0', 10);
  if (va !== vb) return va - vb;
  const qa = parseInt(a.num?.match(/Q(\d+)/)?.[1] || '0', 10);
  const qb = parseInt(b.num?.match(/Q(\d+)/)?.[1] || '0', 10);
  return qa - qb;
});

const nVariants = new Set(combined.map((q) => q.section?.match(/Variant (\d+)/)?.[1]).filter(Boolean)).size;

patchHtml('index.html', {
  title: 'Place Marketing — All Exams',
  subtitle: `${nVariants} variants · ${combined.length} MCQ · Univ. Cassino`,
  rules:
    '<div class="rules"><strong>Exam variants</strong> — MCQ only, one variant per page (19 questions each). Use <em>Previous / Next</em> to switch variants; click <em>Check this page</em> to score the current variant.</div>',
  back:
    '<a href="../index.html">← Edu materials</a> · <a href="OpenQuestions/index.html">Open questions</a> · <a href="10_Place_Marketing_Exam.html">Exam (19 MCQ)</a>',
  questions: combined,
  scoring: { correct: 1, wrong: 0, max: null },
});

const exam10 = all.filter((q) => q.id?.startsWith('v10_')).map(stripQuestion);
if (exam10.length) {
  const examQs = exam10.map((q, i) => ({
    ...q,
    num: i + 1,
    id: `q${i + 1}`,
    section: 'Part I — Multiple Choice (1 mark each)',
  }));
  patchHtml('10_Place_Marketing_Exam.html', {
    title: 'Place Marketing — Exam',
    subtitle: '19 MCQ · Univ. Cassino',
    rules:
      '<div class="rules"><strong>Place Marketing Exam</strong> — Part I: 19 MCQ (1 mark each). Click <em>Check answers</em> to score.</div>',
    back:
      '<a href="index.html">← All variants</a> · <a href="../index.html">Edu materials</a>',
    questions: examQs,
    scoring: { correct: 1, wrong: 0, max: 19 },
  });
}

console.log(`index.html — ${combined.length} MCQ`);
console.log(`  Variant 01: ${variants['01'].length} questions`);
console.log(`  Variant 03: ${variants['03'].length} questions`);
console.log(`  Variant 04: ${variants['04'].length} questions`);
console.log(`  Variant 05: ${variants['05'].length} questions`);
console.log(`  Variant 06: ${variants['06'].length} questions`);
