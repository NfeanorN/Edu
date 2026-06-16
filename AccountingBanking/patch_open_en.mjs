#!/usr/bin/env node
/** Add sample_en + brief answer box above textarea for open questions. */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

const SAMPLE_EN = {
  'Функции финансовой системы':
    'Collects savings, gives loans, shares risk, matches loan size and time, runs payments, prices information.',
  'Теории существования финансовых посредников':
    'Banks cut costs, spread risk, fix information problems (bad borrowers, moral hazard), change loan length, use expert knowledge.',
  'Баланс банка и индексы':
    'Assets: loans, securities, reserves. Liabilities: deposits, borrowings. Equity: capital. Ratios: ROE, ROA, NIM, CAR, LCR, NPL.',
  'European Banking Union':
    'Three pillars: (1) Single Supervisory Mechanism (SSM), (2) Single Resolution with bail-in (SRM), (3) Deposit guarantees (DGS).',
  'Interest rate risk':
    'When rates change, net interest income and asset values change. Manage with repricing gap, duration, hedging.',
  'DCF model':
    'Forecast free cash flows, discount them (WACC or cost of equity), add terminal value → company value.',
  'SoFP — вариант 1 (5 pts)':
    'Total Assets = 204,850. Equity 66,300 + Non-current liabilities 87,550 + Current liabilities 51,000.',
  'SoFP — вариант 2 (6 pts)':
    'Total Assets = Total Equity & Liabilities = 614,550. See the filled table above.',
  'Exercise 2 — таблица (2024)':
    'Division A: Net Income 33,880. Division B: Net Income 14,840.',
  'Exercise 2 — таблица (2025 tablet)':
    'Division A: Net Income 32,214. Division B: Net Income 126.',
  'Exercise 3 — production May':
    'Production in May = 87,000 units.',
  'Depreciation — straight-line':
    'Annual depreciation = 22,000. After 6 years NBV = 28,000 (residual value).',
  'Depreciation — reducing balance 15%':
    'Each year: dep = 15% of book value. Year 6 NBV = 60,344.',
};

const CSS_BRIEF = `    .brief-answer {
      margin: 0.65rem 0 0.85rem;
      padding: 0.7rem 1rem;
      background: #e8f8ef;
      border-left: 4px solid #27ae60;
      border-radius: 0 8px 8px 0;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    .brief-label { font-weight: 600; color: #1e7e45; font-size: 0.82rem; margin-bottom: 0.2rem; }
    .brief-text { color: #1a1a2e; }`;

const NEW_RENDER_OPEN = `    function renderOpen() {
      if (!OPEN_ITEMS.length) return;
      let openSection = '';
      OPEN_ITEMS.forEach((item, idx) => {
        const sec = item.section || (item.howto_ru ? 'Exercises' : 'Theory — short answers');
        if (sec !== openSection) {
          openSection = sec;
          const h = document.createElement('div');
          h.className = 'section-title';
          h.textContent = sec;
          container.appendChild(h);
        }
        const block = document.createElement('div');
        block.className = 'open-block';
        const brief = item.sample_en || item.sample_ru || '';
        block.innerHTML = \`
          <div class="q-num">\${item.title_ru}</div>
          <div class="q-en">\${item.en}</div>
          <div class="q-ru">\${item.ru}</div>
          \${brief ? \`<div class="brief-answer"><div class="brief-label">Answer</div><div class="brief-text">\${brief}</div></div>\` : ''}
          <textarea name="open_\${idx}" placeholder="Your answer (optional)..."></textarea>\`;
        if (item.howto_ru) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'reveal-btn secondary';
          btn.textContent = 'Show full solution';
          const answerBlock = document.createElement('div');
          answerBlock.className = 'answer-block';
          answerBlock.hidden = true;
          answerBlock.innerHTML = '<div class="answer-label">Full solution</div><div class="howto"></div>';
          answerBlock.querySelector('.howto').textContent = item.howto_ru;
          btn.addEventListener('click', () => {
            answerBlock.hidden = false;
            btn.hidden = true;
          });
          block.appendChild(btn);
          block.appendChild(answerBlock);
        }
        container.appendChild(block);
      });
    }`;

function enrichOpenItems(items) {
  return items.map((item) => {
    const sample_en = item.sample_en || SAMPLE_EN[item.title_ru] || '';
    return sample_en ? { ...item, sample_en } : item;
  });
}

function patchOpenItemsJson(html) {
  const m = html.match(/const OPEN_ITEMS = (\[[\s\S]*?\]);/);
  if (!m || m[1] === '[]') return html;
  const items = enrichOpenItems(JSON.parse(m[1]));
  return html.replace(/const OPEN_ITEMS = \[[\s\S]*?\];/, `const OPEN_ITEMS = ${JSON.stringify(items)};`);
}

function patchRenderOpen(html) {
  return html.replace(
    /    function renderOpen\(\) \{[\s\S]*?    \}\n\n    function renderSna\(\)/,
    NEW_RENDER_OPEN + '\n\n    function renderSna()'
  );
}

function patchFile(path) {
  let html = readFileSync(path, 'utf8');
  const orig = html;
  html = html.replace(/\r\n/g, '\n');

  if (!html.includes('.brief-answer')) {
    html = html.replace(
      '.answer-label { font-weight: 600;',
      CSS_BRIEF + '\n    .answer-label { font-weight: 600;'
    );
  }

  html = patchOpenItemsJson(html);
  if (html.includes('function renderOpen()')) {
    html = patchRenderOpen(html);
  }

  if (html !== orig.replace(/\r\n/g, '\n')) {
    writeFileSync(path, html.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Patched:', path);
  }
}

for (const f of readdirSync(ROOT).filter((x) => /^\d{2}_.*\.html$/.test(x))) {
  patchFile(join(ROOT, f));
}

// 05 page copy
const p05 = join(ROOT, '05_Open_Questions.html');
let h05 = readFileSync(p05, 'utf8');
h05 = h05.replace(
  'Теория — краткие ответы сразу; задачи — кнопка «Показать решение»',
  'Short English answers above each box; exercises — «Show full solution» for steps'
);
h05 = h05.replace(
  'Теория: краткий ответ под вопросом. Задачи: нажмите «Показать решение» для пошагового разбора.',
  'Green box = short answer in easy English (not inside the textarea). Exercises: click «Show full solution» for detailed steps.'
);
writeFileSync(p05, h05, 'utf8');
console.log('Updated: 05_Open_Questions.html copy');

console.log('Done. Run: node build_all_tests.mjs');
