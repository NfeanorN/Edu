#!/usr/bin/env node
/** Regenerate index.html OPEN_ITEMS from gen_tests.py (no Python needed). */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const py = readFileSync(join(ROOT, 'gen_tests.py'), 'utf8');
let html = readFileSync(join(ROOT, 'index.html'), 'utf8');

function parseQuoted(s, start) {
  const q = s[start];
  if (q !== '"' && q !== "'") return null;
  let i = start + 1;
  let out = '';
  while (i < s.length) {
    if (s[i] === '\\') {
      out += s[i + 1];
      i += 2;
      continue;
    }
    if (s[i] === q) return { value: out, end: i + 1 };
    out += s[i++];
  }
  return null;
}

function skipWs(s, i) {
  while (i < s.length && /[\s,]/.test(s[i])) i++;
  return i;
}

function parseOqCalls(source) {
  const items = [];
  let pos = 0;
  while (true) {
    const idx = source.indexOf('oq(', pos);
    if (idx === -1) break;
    let i = idx + 3;
    i = skipWs(source, i);
    const partM = source.slice(i).match(/^(PART_[IV]+)/);
    if (!partM) {
      pos = idx + 3;
      continue;
    }
    const part = partM[1];
    i += part.length;
    i = skipWs(source, i);
    const label = parseQuoted(source, i);
    if (!label) {
      pos = idx + 3;
      continue;
    }
    i = skipWs(source, label.end);
    const en = parseQuoted(source, i);
    if (!en) {
      pos = idx + 3;
      continue;
    }
    i = skipWs(source, en.end);
    const ru = parseQuoted(source, i);
    if (!ru) {
      pos = idx + 3;
      continue;
    }
    i = skipWs(source, ru.end);
    const sample_en = parseQuoted(source, i);
    if (!sample_en) {
      pos = idx + 3;
      continue;
    }
    i = skipWs(source, sample_en.end);
    const sample_ru = parseQuoted(source, i);
    if (!sample_ru) {
      pos = idx + 3;
      continue;
    }
    const shortLabel = label.value;
    items.push({
      part,
      label: shortLabel,
      title_ru:
        part === 'III'
          ? `Part III — Brief Answers (5 marks) — ${shortLabel}`
          : `Part II — Brief Answers (3 marks) — ${shortLabel}`,
      en: en.value,
      ru: ru.value,
      sample_en: sample_en.value,
      sample_ru: sample_ru.value,
    });
    pos = sample_ru.end;
  }
  return items;
}

const blocks = parseOqCalls(py);
if (blocks.length !== 49) {
  console.error('Expected 49 open items, got', blocks.length);
  process.exit(1);
}

const variantOrder = ['01', '02', '03', '04', '05', '07', '08'];
const tagged = blocks.map((item, i) => {
  const vi = Math.floor(i / 7);
  const variant_id = variantOrder[vi];
  return {
    ...item,
    label: `Variant ${variant_id} · ${item.part} ${item.label}`,
  };
});

html = html.replace(
  /const OPEN_ITEMS = \[[\s\S]*?\];/,
  `const OPEN_ITEMS = ${JSON.stringify(tagged)};`,
);
writeFileSync(join(ROOT, 'index.html'), html, 'utf8');
console.log(`Updated index.html — ${tagged.length} open items`);
