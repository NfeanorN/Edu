#!/usr/bin/env node
/** Patch AccountingBanking HTML tests (when Python unavailable). Run: node patch_html.mjs */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

const CSS_ADD = `    .answer-label { font-weight: 600; color: #16a085; margin-top: 0.75rem; font-size: 0.9rem; }
    .reveal-btn { margin-top: 0.6rem; font-size: 0.88rem; padding: 0.45rem 1rem; }
    details.solution { margin-top: 0.75rem; font-size: 0.9rem; }
    details.solution summary { cursor: pointer; color: #16a085; font-weight: 600; }`;

const OLD_RENDER_OPEN = `    function renderOpen() {
      if (!OPEN_ITEMS.length) return;
      const h = document.createElement('div');
      h.className = 'section-title';
      h.textContent = 'Открытые вопросы';
      container.appendChild(h);
      OPEN_ITEMS.forEach((item, idx) => {
        const block = document.createElement('div');
        block.className = 'open-block';
        block.innerHTML = \`
          <div class="q-num">\${item.title_ru}</div>
          <div class="q-ru">\${item.ru}</div>
          <div class="q-en">\${item.en}</div>
          <textarea name="open_\${idx}" placeholder="Ваш ответ..."></textarea>
          <div class="howto" hidden></div><div class="sample" hidden></div>\`;
        block.querySelector('.sample').textContent = item.sample_ru || '';
        const howtoEl = block.querySelector('.howto');
        if (item.howto_ru) howtoEl.textContent = item.howto_ru;
        else howtoEl.remove();
        container.appendChild(block);
      });
    }`;

const NEW_RENDER_OPEN = `    function renderOpen() {
      if (!OPEN_ITEMS.length) return;
      let openSection = '';
      OPEN_ITEMS.forEach((item, idx) => {
        const sec = item.section || (item.howto_ru ? 'Практические задачи' : 'Теория — краткие ответы');
        if (sec !== openSection) {
          openSection = sec;
          const h = document.createElement('div');
          h.className = 'section-title';
          h.textContent = sec;
          container.appendChild(h);
        }
        const block = document.createElement('div');
        block.className = 'open-block';
        block.innerHTML = \`
          <div class="q-num">\${item.title_ru}</div>
          <div class="q-ru">\${item.ru}</div>
          <div class="q-en">\${item.en}</div>
          <textarea name="open_\${idx}" placeholder="Ваш ответ..."></textarea>\`;
        if (item.howto_ru) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'reveal-btn secondary';
          btn.textContent = 'Показать решение';
          const answerBlock = document.createElement('div');
          answerBlock.className = 'answer-block';
          answerBlock.hidden = true;
          answerBlock.innerHTML = '<div class="answer-label">Решение (пошагово)</div><div class="howto"></div>';
          answerBlock.querySelector('.howto').textContent = item.howto_ru;
          if (item.sample_ru) {
            const lbl = document.createElement('div');
            lbl.className = 'answer-label';
            lbl.textContent = 'Итог';
            const sample = document.createElement('div');
            sample.className = 'howto';
            sample.textContent = item.sample_ru;
            answerBlock.appendChild(lbl);
            answerBlock.appendChild(sample);
          }
          btn.addEventListener('click', () => {
            answerBlock.hidden = false;
            btn.hidden = true;
          });
          block.appendChild(btn);
          block.appendChild(answerBlock);
        } else {
          const answerBlock = document.createElement('div');
          answerBlock.className = 'answer-block';
          answerBlock.innerHTML = '<div class="answer-label">Краткий ответ</div><div class="howto brief"></div>';
          answerBlock.querySelector('.howto').textContent = item.sample_ru || '';
          block.appendChild(answerBlock);
        }
        container.appendChild(block);
      });
    }`;

const OLD_RENDER_Q_END = `          </div>
          <div class="feedback" hidden></div>\`;`;

const NEW_RENDER_Q_END = `          </div>
          \${q.explain_ru ? \`<details class="solution"><summary>📗 Решение</summary><div class="howto">\${q.explain_ru}</div></details>\` : ''}
          <div class="feedback" hidden></div>\`;`;

// Also handle variant without howto div in open (older files)
const OLD_RENDER_OPEN2 = `    function renderOpen() {
      if (!OPEN_ITEMS.length) return;
      const h = document.createElement('div');
      h.className = 'section-title';
      h.textContent = 'Открытые вопросы';
      container.appendChild(h);
      OPEN_ITEMS.forEach((item, idx) => {
        const block = document.createElement('div');
        block.className = 'open-block';
        block.innerHTML = \`
          <div class="q-num">\${item.title_ru}</div>
          <div class="q-ru">\${item.ru}</div>
          <div class="q-en">\${item.en}</div>
          <textarea name="open_\${idx}" placeholder="Ваш ответ..."></textarea>
          <div class="sample" hidden></div>\`;
        block.querySelector('.sample').textContent = item.sample_ru;
        container.appendChild(block);
      });
    }`;

function patchFile(path) {
  let html = readFileSync(path, 'utf8');
  const orig = html;
  html = html.replace(/\r\n/g, '\n');

  html = html.replace(/##eefaf7/g, '#eefaf7');

  if (!html.includes('.answer-label')) {
    html = html.replace(
      '.explain { margin-top: 0.5rem; font-size: 0.88rem; opacity: 0.95; }',
      '.explain { margin-top: 0.5rem; font-size: 0.88rem; opacity: 0.95; }\n' + CSS_ADD
    );
  }

  if (!html.includes('details class="solution"')) {
    html = html.replace(
      /          <\/div>\n          <div class="feedback" hidden><\/div>`;/,
      `          </div>
          \${q.explain_ru ? \`<details class="solution"><summary>📗 Решение</summary><div class="howto">\${q.explain_ru}</div></details>\` : ''}
          <div class="feedback" hidden></div>\`;`
    );
  }

  if (!html.includes("btn.className = 'reveal-btn secondary'")) {
    html = html.replace(
      /    function renderOpen\(\) \{[\s\S]*?    \}\n\n    function renderSna\(\)/,
      NEW_RENDER_OPEN + '\n\n    function renderSna()'
    );
  }

  if (html !== orig.replace(/\r\n/g, '\n')) {
    writeFileSync(path, html.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Patched:', path);
  }
}

const testFiles = readdirSync(ROOT).filter(f => /^\d{2}_.*\.html$/.test(f));
for (const f of testFiles) patchFile(join(ROOT, f));

// Update index description for 05
const indexPath = join(ROOT, 'index.html');
let index = readFileSync(indexPath, 'utf8');
if (index.includes('Посредники, баланс банка')) {
  index = index.replace(
    'Посредники, баланс банка, DCF, EBU',
    'Теория — краткие ответы; задачи — пошаговые решения'
  );
  writeFileSync(indexPath, index, 'utf8');
  console.log('Patched: index.html');
}

console.log('Done. For full regen with new JSON data, run: python gen_tests.py');
