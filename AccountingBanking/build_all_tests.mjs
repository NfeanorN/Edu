#!/usr/bin/env node
/** Build 99_All_Tests.html — all AccountingBanking tests on one page. */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { applyBlocksPagination } from './lib/pagination.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));

const CYRILLIC = /[\u0400-\u04FF]/;

function cleanOption(o) {
  const { ru, ...rest } = o;
  return rest;
}

function cleanQuestion(q) {
  const { ru, explain_ru, ...rest } = q;
  if (explain_ru && !CYRILLIC.test(explain_ru)) rest.explain = explain_ru;
  if (rest.options) rest.options = rest.options.map(cleanOption);
  return rest;
}

function cleanOpenItem(item) {
  const { ru, title_ru, sample_ru, howto_ru, ...rest } = item;
  if (!rest.title_en && rest.en) {
    rest.title_en = rest.en.length > 60 ? rest.en.slice(0, 57) + '…' : rest.en;
  }
  return rest;
}

const TEST_FILES = [
  { file: '15_Part1_Exam_2026_16-06.html', title: '15 — Part 1 Exam 16/06/2026', desc: '8 MCQ · +1/−1 · photo exam' },
  { file: '16_Part2_Exam_2026_16-06_Variant_A.html', title: '16 — Part 2 Exam 16/06/2026 Variant A', desc: '13 MCQ + open · Free Float, PE' },
  { file: '01_Part1_Management_Accounting.html', title: '01 — Part 1 Management (05/06/2024)', desc: '8 MCQ · +1/−1' },
  { file: '06_Part1_IFRS_2025.html', title: '06 — Part 1 IFRS (25/06/2025)', desc: '4 MCQ · +1/−1' },
  { file: '11_Part1_Financial_Statements.html', title: '11 — Financial statements Q1–4', desc: '4 MCQ · +1/−1' },
  { file: '07_Part1_Management_Q5-8.html', title: '07 — Management Q5–8', desc: '4 MCQ · +1/−1' },
  { file: '02_Part2_Finance_Banking.html', title: '02 — Part 2 Finance & Banking', desc: '18 MCQ' },
  { file: '08_Part2_Exam_2026_Variant_B.html', title: '08 — Part 2 Exam 2026 Variant B', desc: '18 MCQ' },
  { file: '13_Part2_Exam_2026_16-06_Variant_B.html', title: '13 — Part 2 Exam 16/06/2026 Variant B', desc: '18 MCQ' },
  { file: '12_Part2_Exam_Variant_C.html', title: '12 — Part 2 Variant C Q7–14', desc: '8 MCQ' },
  { file: '03_Part2_Calculations.html', title: '03 — Part 2 Calculations', desc: '4 MCQ · 3 pts' },
  { file: '04_Sustainability.html', title: '04 — Sustainability & SROI', desc: '3 MCQ' },
  { file: '14_Master_Question_Bank.html', title: '14 — Master Question Bank', desc: '32 MCQ · missing topics' },
  { file: '10_Depreciation.html', title: '10 — Depreciation', desc: 'Exercise 3 (8 pts) + tables' },
  { file: '09_Statement_of_Financial_Position.html', title: '09 — Statement of Financial Position', desc: 'SoFP + solutions' },
];

function parseConst(html, name) {
  const json = extractJsConst(html, name);
  if (!json) return name === 'SCORING' ? { correct: 1, wrong: 0, max: null } : [];
  return JSON.parse(json);
}

function extractJsConst(html, name) {
  const marker = `const ${name} = `;
  const start = html.indexOf(marker);
  if (start < 0) return null;
  const valStart = start + marker.length;
  const open = html[valStart];
  if (open !== '[' && open !== '{') return null;
  const close = open === '[' ? ']' : '}';
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = valStart; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return html.slice(valStart, i + 1);
    }
  }
  return null;
}

function parseTitle(html) {
  const m = html.match(/<h1>([^<]*)<\/h1>/);
  return m ? m[1].replace(/&amp;/g, '&') : '';
}

function parseExtra(html) {
  const m = html.match(/<div id="questions"><\/div>([\s\S]*?)<div class="actions">/);
  if (!m) return '';
  return m[1].trim();
}

function slugFromFile(file) {
  return file.replace(/\.html$/, '').replace(/[^a-z0-9]+/gi, '_').toLowerCase();
}

function questionKey(q) {
  return q.en.trim().toLowerCase();
}

const blocks = TEST_FILES.map((meta, bi) => {
  const html = readFileSync(join(ROOT, meta.file), 'utf8');
  const slug = slugFromFile(meta.file);
  const scoring = parseConst(html, 'SCORING');
  const questions = parseConst(html, 'QUESTIONS').map((q, qi) => cleanQuestion({
    ...q,
    id: `${slug}_${q.id || 'q' + (qi + 1)}`,
    _block: slug,
    _scoring: scoring,
  }));
  const open = [];
  const sna = parseConst(html, 'SNA_ITEMS');
  const extra = parseExtra(html);
  return {
    slug,
    title: meta.title,
    desc: meta.desc,
    scoring,
    questions,
    open,
    sna,
    extra,
  };
});

const seenQuestions = new Set();
for (const block of blocks) {
  block.questions = block.questions.filter((q) => {
    const key = questionKey(q);
    if (seenQuestions.has(key)) return false;
    seenQuestions.add(key);
    return true;
  });
}

const allQuestions = blocks.flatMap(b => b.questions);
const totalMcq = allQuestions.length;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>All tests — Accounting &amp; Banking</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: "Segoe UI", system-ui, sans-serif;
      line-height: 1.65;
      margin: 0;
      padding: 2rem 1rem 3rem;
      color: #1a1a2e;
      background: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);
      min-height: 100vh;
    }
    .wrap { max-width: 860px; margin: 0 auto; }
    .back { margin-bottom: 1rem; }
    .back a { color: #16a085; text-decoration: none; }
    .back a:hover { text-decoration: underline; }
    h1 {
      color: #2c3e50;
      border-bottom: 4px solid #16a085;
      padding-bottom: 12px;
      font-size: 1.75rem;
    }
    .sub { color: #555; margin: 0.5rem 0 1rem; }
    .toc {
      background: #fff;
      border-radius: 10px;
      padding: 1rem 1.25rem;
      margin: 1rem 0 1.5rem;
      border: 1px solid #e0e6ed;
      font-size: 0.9rem;
    }
    .toc a { color: #16a085; text-decoration: none; }
    .toc a:hover { text-decoration: underline; }
    .toc li { margin: 0.35rem 0; }
    .block-header {
      margin: 2.5rem 0 1rem;
      padding: 1rem 1.25rem;
      background: #fff;
      border-radius: 10px;
      border-left: 5px solid #16a085;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
    }
    .block-header h2 { margin: 0; font-size: 1.2rem; color: #2c3e50; }
    .block-header p { margin: 0.35rem 0 0; color: #666; font-size: 0.88rem; }
    .rules {
      background: #fff;
      border-left: 4px solid #16a085;
      padding: 1rem 1.25rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
      font-size: 0.92rem;
    }
    .section-title {
      font-size: 1.1rem;
      color: #16a085;
      margin: 1.5rem 0 0.75rem;
      font-weight: 600;
    }
    .q {
      background: #fff;
      border-radius: 10px;
      padding: 1.1rem 1.25rem;
      margin: 1rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
      border: 1px solid #e8ecf1;
    }
    .q.unanswered { border-color: #e74c3c; }
    .q.correct { border-color: #27ae60; background: #f6fff9; }
    .q.wrong { border-color: #e74c3c; background: #fff8f8; }
    .q-num { font-weight: 700; color: #16a085; margin-bottom: 0.35rem; }
    .q-en { font-size: 1.02rem; margin-bottom: 0.35rem; }
    .opts { display: grid; gap: 0.45rem; }
    label.opt {
      display: flex;
      gap: 0.55rem;
      align-items: flex-start;
      padding: 0.45rem 0.55rem;
      border-radius: 6px;
      cursor: pointer;
    }
    label.opt:hover { background: #eef9f6; }
    .result-opt { cursor: default; }
    label.opt input { margin-top: 0.25rem; flex-shrink: 0; }
    .opt-en { font-size: 0.95rem; }
    .feedback {
      margin-top: 0.75rem;
      padding: 0.65rem 0.85rem;
      border-radius: 6px;
      font-size: 0.92rem;
    }
    .feedback.ok { background: #e8f8ef; color: #1e7e45; }
    .feedback.bad { background: #fdecea; color: #c0392b; }
    .open-block {
      background: #fff;
      border-radius: 10px;
      padding: 1.1rem 1.25rem;
      margin: 1rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
    }
    .open-block textarea {
      width: 100%;
      min-height: 100px;
      margin-top: 0.5rem;
      padding: 0.65rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.95rem;
      resize: vertical;
    }
    .howto {
      margin-top: 0.5rem;
      padding: 0.85rem 1rem;
      background: #eefaf7;
      border-radius: 8px;
      border-left: 3px solid #16a085;
      font-size: 0.9rem;
      white-space: pre-wrap;
    }
    .explain { margin-top: 0.5rem; font-size: 0.88rem; opacity: 0.95; }
    .answer-label { font-weight: 600; color: #16a085; margin-top: 0.75rem; font-size: 0.9rem; }
    .reveal-btn { margin-top: 0.6rem; font-size: 0.88rem; padding: 0.45rem 1rem; }
    details.solution { margin-top: 0.75rem; font-size: 0.9rem; }
    details.solution summary { cursor: pointer; color: #16a085; font-weight: 600; }
    .brief-answer {
      margin: 0.65rem 0 0.85rem;
      padding: 0.7rem 1rem;
      background: #e8f8ef;
      border-left: 4px solid #27ae60;
      border-radius: 0 8px 8px 0;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    .brief-label { font-weight: 600; color: #1e7e45; font-size: 0.82rem; margin-bottom: 0.2rem; }
    .brief-text { color: #1a1a2e; }
    table.sofp, table.matrix {
      border-collapse: collapse;
      width: 100%;
      font-size: 0.85rem;
      margin: 0.5rem 0;
    }
    table.sofp th, table.sofp td, table.matrix th, table.matrix td {
      border: 1px solid #ccc;
      padding: 4px 8px;
    }
    table.sofp th, table.matrix th { background: #16a085; color: #fff; text-align: center; }
    table.sofp td.num { text-align: right; white-space: nowrap; }
    table.sofp td.lbl { text-align: left; }
    table.sofp tr.subtotal td { font-weight: 600; background: #f4f8f7; }
    table.sofp tr.total td { font-weight: 700; background: #eefaf7; }
    .exam-row {
      display: grid;
      grid-template-columns: minmax(240px, 1fr) minmax(300px, 1.2fr);
      gap: 1.25rem;
      align-items: start;
      margin: 1rem 0 1.5rem;
    }
    .exam-photo {
      margin: 0;
      background: #fafafa;
      border: 1px solid #e0e6ed;
      border-radius: 10px;
      padding: 0.5rem;
    }
    .exam-photo img { width: 100%; height: auto; border-radius: 6px; display: block; }
    .exam-photo figcaption { font-size: 0.82rem; color: #666; text-align: center; margin-top: 0.5rem; }
    @media (max-width: 820px) { .exam-row { grid-template-columns: 1fr; } }
    .actions {
      position: sticky;
      bottom: 0;
      background: rgba(245,247,250,.97);
      backdrop-filter: blur(6px);
      padding: 1rem 0;
      margin-top: 1.5rem;
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: center;
      border-top: 1px solid #e0e6ed;
    }
    button {
      background: #16a085;
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 600;
    }
    button:hover { background: #138d75; }
    button.secondary {
      background: #fff;
      color: #16a085;
      border: 2px solid #16a085;
    }
    #results {
      display: none;
      background: #fff;
      border-radius: 12px;
      padding: 1.25rem 1.5rem;
      margin-top: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,.1);
      border: 2px solid #16a085;
    }
    #results.visible { display: block; }
    .score { font-size: 1.35rem; font-weight: 700; color: #2c3e50; }
    .score-detail { color: #555; margin-top: 0.35rem; }
    .warn { color: #e74c3c; font-weight: 600; margin-top: 0.5rem; }
    mark.correct-mark { background: #d5f5e3; padding: 0 4px; border-radius: 3px; }
    mark.wrong-mark { background: #fadbd8; padding: 0 4px; border-radius: 3px; }
  </style>
</head>
<body>
  <div class="wrap">
    <p class="back"><a href="index.html">← Test list</a> · <a href="00_How_To_Solve.html">How to solve tasks</a></p>
    <h1>All tests on one page</h1>
    <p class="sub">Accounting &amp; Banking for SMEs — ${totalMcq} MCQ questions.</p>
    <div class="rules">Answer all MCQ and click “Check all”.</div>
    <nav class="toc">
      <strong>Contents:</strong>
      <ol>
        ${blocks.map(b => `<li><a href="#block-${b.slug}">${b.title}</a> <span style="color:#888">(${b.desc})</span></li>`).join('\n        ')}
      </ol>
    </nav>
    <form id="test-form">
      <div id="questions"></div>
      <div class="actions">
        <button type="submit">Check all (${totalMcq} MCQ)</button>
        <button type="button" class="secondary" id="reset-btn">Reset</button>
      </div>
    </form>
    <div id="results">
      <div class="score" id="score-text"></div>
      <p class="score-detail" id="score-detail"></p>
      <p class="warn" id="warn-text" hidden></p>
    </div>
  </div>
  <script>
    const BLOCKS = ${JSON.stringify(blocks, null, 2)};
    const QUESTIONS = BLOCKS.flatMap(b => b.questions);

    const form = document.getElementById('test-form');
    const container = document.getElementById('questions');
    const resultsBox = document.getElementById('results');

    function renderOpenItems(items, slug) {
      if (!items.length) return;
      let openSection = '';
      items.forEach((item, idx) => {
        const sec = item.section || (item.howto_en ? 'Exercises' : 'Theory — short answers');
        if (sec !== openSection) {
          openSection = sec;
          const h = document.createElement('div');
          h.className = 'section-title';
          h.textContent = sec;
          container.appendChild(h);
        }
        const block = document.createElement('div');
        block.className = 'open-block';
        const brief = item.sample_en || '';
        block.innerHTML = \`
          <div class="q-num">\${item.title_en || item.en}</div>
          <div class="q-en">\${item.en}</div>
          \${brief ? \`<div class="brief-answer"><div class="brief-label">Answer</div><div class="brief-text">\${brief}</div></div>\` : ''}
          <textarea name="open_\${slug}_\${idx}" placeholder="Your answer (optional)..."></textarea>\`;
        if (item.howto_en) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'reveal-btn secondary';
          btn.textContent = 'Show full solution';
          const answerBlock = document.createElement('div');
          answerBlock.className = 'answer-block';
          answerBlock.hidden = true;
          answerBlock.innerHTML = '<div class="answer-label">Full solution</div><div class="howto"></div>';
          answerBlock.querySelector('.howto').textContent = item.howto_en;
          btn.addEventListener('click', () => { answerBlock.hidden = false; btn.hidden = true; });
          block.appendChild(btn);
          block.appendChild(answerBlock);
        }
        container.appendChild(block);
      });
    }

    function renderAll() {
      container.innerHTML = '';
      BLOCKS.forEach(block => {
        const header = document.createElement('div');
        header.className = 'block-header';
        header.id = 'block-' + block.slug;
        header.innerHTML = '<h2>' + block.title + '</h2><p>' + block.desc + '</p>';
        container.appendChild(header);

        if (block.extra) {
          const extra = document.createElement('div');
          extra.className = 'block-extra';
          extra.innerHTML = block.extra;
          container.appendChild(extra);
        }

        let currentSection = '';
        block.questions.forEach(q => {
          const sec = q.section ? block.title + ' · ' + q.section : null;
          if (sec && sec !== currentSection) {
            currentSection = sec;
            const h = document.createElement('div');
            h.className = 'section-title';
            h.textContent = q.section;
            container.appendChild(h);
          }
          const card = document.createElement('div');
          card.className = 'q';
          card.dataset.id = q.id;
          card.innerHTML = \`
            <div class="q-num">Question \${q.num}</div>
            <div class="q-en">\${q.en}</div>
            <div class="opts">
              \${q.options.map(o => \`
                <label class="opt">
                  <input type="radio" name="\${q.id}" value="\${o.id}" />
                  <span class="opt-en"><strong>\${o.id.toUpperCase()})</strong> \${o.en}</span>
                </label>\`).join('')}
            </div>
            \${q.explain ? \`<details class="solution"><summary>📗 Solution</summary><div class="howto">\${q.explain}</div></details>\` : ''}
            <div class="feedback" hidden></div>\`;
          container.appendChild(card);
        });

        renderOpenItems(block.open, block.slug);

        if (block.sna.length) {
          const h = document.createElement('div');
          h.className = 'section-title';
          h.textContent = 'SNA — calculations';
          container.appendChild(h);
          block.sna.forEach((item, idx) => {
            const el = document.createElement('div');
            el.className = 'open-block';
            el.innerHTML = \`
              <div class="q-en">\${item.en}</div>
              <input type="text" name="sna_\${block.slug}_\${idx}" style="width:100%;padding:0.65rem;border:1px solid #ddd;border-radius:8px;margin-top:0.5rem;" placeholder="Your answer..." />
              <div class="feedback" hidden></div>\`;
            el.dataset.expected = item.expected;
            el.dataset.accept = JSON.stringify(item.accept || []);
            container.appendChild(el);
          });
        }
      });
    }

    function normalize(val) {
      return String(val || '').trim().toLowerCase().replace(/\\\\s+/g, ' ');
    }

    function checkSnaAnswer(expected, accept, user) {
      const n = normalize(user);
      if (!n) return null;
      const variants = [expected, ...(accept || [])].map(normalize);
      return variants.some(v => n === v || n.includes(v) || v.includes(n));
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let unanswered = 0;
      let correct = 0;
      let wrong = 0;
      let score = 0;
      const warnEl = document.getElementById('warn-text');
      const toCheck = questionsToCheck();
      const checkingAll = toCheck.length === QUESTIONS.length;

      toCheck.forEach((q) => {
        const card = container.querySelector('[data-id="' + q.id + '"]');
        if (!card) return;
        const selected = form.querySelector('input[name="' + q.id + '"]:checked');
        card.classList.remove('unanswered', 'correct', 'wrong');
        const fb = card.querySelector('.feedback');
        fb.hidden = true;
        fb.textContent = '';
        card.querySelectorAll('label.opt').forEach((lbl) => {
          lbl.classList.remove('result-opt');
          lbl.style.background = '';
          lbl.querySelector('input').disabled = false;
        });
        if (!selected) {
          unanswered++;
          card.classList.add('unanswered');
        }
      });

      if (unanswered > 0) {
        resultsBox.classList.remove('visible');
        warnEl.hidden = false;
        warnEl.textContent = checkingAll
          ? 'Answer all MCQ questions (' + unanswered + ' unanswered).'
          : 'Answer all questions on this page (' + unanswered + ' unanswered).';
        const first = container.querySelector('.q.unanswered');
        if (first) {
          const p = Number(first.dataset.page);
          if (!isNaN(p)) goToPage(p);
          first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      warnEl.hidden = true;

      toCheck.forEach((q) => {
        const card = container.querySelector('[data-id="' + q.id + '"]');
        const selected = form.querySelector('input[name="' + q.id + '"]:checked');
        const fb = card.querySelector('.feedback');
        const sc = q._scoring || { correct: 1, wrong: 0 };
        fb.hidden = false;

        const ok = selected && selected.value === q.correct;
        if (ok) {
          correct++;
          score += sc.correct;
          card.classList.add('correct');
          fb.className = 'feedback ok';
          fb.innerHTML = '✓ Correct' + (q.explain ? '<div class="explain">' + q.explain + '</div>' : '');
        } else {
          wrong++;
          score += sc.wrong;
          card.classList.add('wrong');
          fb.className = 'feedback bad';
          fb.innerHTML = '✗ Incorrect. Your answer: <mark class="wrong-mark">' + selected.value.toUpperCase() +
            '</mark>. Correct: <mark class="correct-mark">' + q.correct.toUpperCase() + '</mark>' +
            (q.explain ? '<div class="explain">' + q.explain + '</div>' : '');
        }

        card.querySelectorAll('label.opt').forEach((lbl) => {
          const inp = lbl.querySelector('input');
          lbl.classList.add('result-opt');
          if (inp.value === q.correct) lbl.style.background = '#e8f8ef';
          if (inp.checked && inp.value !== q.correct) lbl.style.background = '#fdecea';
          inp.disabled = true;
        });
      });

      container.querySelectorAll('.open-block .feedback').forEach((fb) => {
        const block = fb.closest('.open-block');
        if (!block.dataset.expected) return;
        const inp = block.querySelector('input');
        const ok = checkSnaAnswer(block.dataset.expected, JSON.parse(block.dataset.accept || '[]'), inp.value);
        fb.hidden = false;
        if (ok === null) {
          fb.className = 'feedback bad';
          fb.innerHTML = '⚠️ Empty answer. Expected: <mark class="correct-mark">' + block.dataset.expected + '</mark>';
        } else if (ok) {
          fb.className = 'feedback ok';
          fb.innerHTML = '✓ Correct';
        } else {
          fb.className = 'feedback bad';
          fb.innerHTML = '✗ Incorrect. Expected: <mark class="correct-mark">' + block.dataset.expected + '</mark>';
        }
      });

      const total = checkingAll ? QUESTIONS.length : toCheck.length;
      document.getElementById('score-text').textContent = checkingAll
        ? 'Score: ' + correct + ' of ' + total + ' (' + Math.round(correct / total * 100) + '%)'
        : 'This page: ' + correct + ' of ' + total + ' (' + Math.round(correct / total * 100) + '%)';
      document.getElementById('score-detail').textContent =
        'Points: ' + score.toFixed(1) + ' · Correct: ' + correct + ' · Wrong: ' + wrong;

      if (checkingAll) showAllPages();
      resultsBox.classList.add('visible');
      resultsBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
      form.reset();
      resultsBox.classList.remove('visible');
      document.getElementById('warn-text').hidden = true;
      renderAll();
    });

    renderAll();
  </script>
</body>
</html>
`;

writeFileSync(join(ROOT, '99_All_Tests.html'), applyBlocksPagination(html), 'utf8');
console.log('Built 99_All_Tests.html —', totalMcq, 'MCQ across', blocks.length, 'blocks');
