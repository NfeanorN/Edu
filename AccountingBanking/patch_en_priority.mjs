#!/usr/bin/env node
/** Patch all test HTML: English first, Russian secondary. */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

function patch(html) {
  let h = html.replace(/\r\n/g, '\n');

  h = h.replace(
    /\.q-ru \{ font-size: 1\.02rem; margin-bottom: 0\.35rem; \}\n    \.q-en \{ font-size: 0\.88rem; color: #666; margin-bottom: 0\.75rem; font-style: italic; \}/,
    `.q-en { font-size: 1.02rem; margin-bottom: 0.35rem; }
    .q-ru { font-size: 0.88rem; color: #666; margin-bottom: 0.75rem; font-style: italic; }`,
  );

  h = h.replace(
    /\.opt-ru \{ font-size: 0\.95rem; \}\n    \.opt-en \{ font-size: 0\.82rem; color: #777; \}/,
    `.opt-en { font-size: 0.95rem; }
    .opt-ru { font-size: 0.82rem; color: #777; font-style: italic; }`,
  );

  h = h.replace(
    /<div class="q-num">Вопрос \$\{q\.num\}<\/div>\n          <div class="q-ru">\$\{q\.ru\}<\/div>\n          <div class="q-en">\$\{q\.en\}<\/div>/g,
    `<div class="q-num">Question \${q.num}</div>
          <div class="q-en">\${q.en}</div>
          <div class="q-ru">\${q.ru}</div>`,
  );

  h = h.replace(
    /<div class="opt-ru"><strong>\$\{o\.id\.toUpperCase\(\)\}\)<\/strong> \$\{o\.ru\}<\/div>\n                  <div class="opt-en">\$\{o\.en\}<\/div>/g,
    `<div class="opt-en"><strong>\${o.id.toUpperCase()})</strong> \${o.en}</div>
                  <div class="opt-ru">\${o.ru}</div>`,
  );

  h = h.replace(
    /<div class="q-ru">\$\{item\.ru\}<\/div>\n          <div class="q-en">\$\{item\.en\}<\/div>/g,
    `<div class="q-en">\${item.en}</div>
          <div class="q-ru">\${item.ru}</div>`,
  );

  h = h.replace(/placeholder="Ваш ответ\.\.\."/g, 'placeholder="Your answer..."');

  return h.replace(/\n/g, '\r\n');
}

const files = readdirSync(ROOT).filter(f => /^\d{2}_.*\.html$/.test(f) || f === '99_All_Tests.html');
for (const f of files) {
  const path = join(ROOT, f);
  const orig = readFileSync(path, 'utf8');
  const next = patch(orig);
  if (next !== orig) {
    writeFileSync(path, next, 'utf8');
    console.log('Patched:', f);
  }
}
