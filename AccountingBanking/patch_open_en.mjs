#!/usr/bin/env node
/** Add sample_en + brief answer box above textarea for open questions. */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

const EXERCISE3_DCF = {
  title_ru: 'Exercise 3 (8 pts) — DCF Cassino SpA',
  ru: 'Cassino SpA — DCF, WACC 5%, g 1%',
  en: 'Evaluate Cassino SpA using DCF. WACC 5%, g 1%. Cash flows 2024–2028. Complete discount coefficients, DCFs, and W.',
  sample_en: 'W ≈ 143,858 (sum of discounted cash flows). See page 13 for full table.',
  howto_ru:
    'Коэффициент = 1 / (1,05)^n\nDCF = Cash flow × коэффициент\n\n2024: 0,9524 → 23 810\n2025: 0,9070 → 27 211\n2026: 0,8638 → 30 234\n2027: 0,8227 → 31 263\n2028: 0,7835 → 31 341\n\nW = 143 858',
  sample_ru: 'Полная таблица — стр. 13.',
};

const EXERCISE3_DEP = {
  title_ru: 'Exercise 3 (8 pts) — Depreciation',
  ru: 'Exercise 3 — амортизация: $160 000, 6 лет, остаточная $28 000',
  en: 'Exercise 3 (8 points). Cost $160,000, life 6 years, residual $28,000. (a) Annual charge straight-line and reducing balance 15%. (b) 6-year schedule for each method.',
  sample_en:
    '(a) Straight-line: $22,000 per year. Reducing balance: 15% of carrying value each year. (b) Year 6 NBV = $28,000 (SL) or $60,344 (RB) — see page 10.',
  howto_ru:
    '(a) Straight-line: (160 000 − 28 000) / 6 = 22 000 $/год.\nReducing balance: dep = carrying × 15%.\n\n(b) Таблицы на стр. 10.',
  sample_ru: 'Полные таблицы — на стр. 10.',
};

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
  'Exercise 3 (8 pts) — DCF Cassino SpA':
    'W ≈ 143,858 (sum of discounted cash flows). See page 13 for full table.',
  'Exercise 2 — таблица (2025 tablet)':
    'Division A: Net Income 32,214. Division B: Net Income 126.',
  'Exercise 3 — production May':
    'Production in May = 87,000 units.',
  'Exercise 3 (8 pts) — Depreciation':
    '(a) Straight-line: $22,000 per year. Reducing balance: 15% of carrying value each year. (b) Year 6 NBV = $28,000 (SL) or $60,344 (RB) — see page 10.',
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
  let items = JSON.parse(m[1]);
  if (!items.some((i) => i.title_ru === EXERCISE3_DCF.title_ru)) {
    const idx = items.findIndex((i) => i.title_ru === 'Exercise 3 — production May');
    items.splice(idx >= 0 ? idx : items.length, 0, EXERCISE3_DCF);
  }
  if (!items.some((i) => i.title_ru === EXERCISE3_DEP.title_ru)) {
    const idx = items.findIndex((i) => i.title_ru === 'Depreciation — straight-line');
    items.splice(idx >= 0 ? idx : items.length, 0, EXERCISE3_DEP);
  }
  items = enrichOpenItems(items);
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
