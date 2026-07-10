#!/usr/bin/env node
/** Add 20-question pagination to all AccountingBanking test HTML files. */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { applyStandardPagination, applyBlocksPagination } from './lib/pagination.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const skip = new Set(['index.html', '00_How_To_Solve.html', '13_Divisions_and_DCF.html']);
let patched = 0;

for (const name of readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  if (skip.has(name)) continue;
  const path = join(ROOT, name);
  const html = readFileSync(path, 'utf8');
  const next = html.includes('function renderAll()')
    ? applyBlocksPagination(html)
    : applyStandardPagination(html);
  if (next === html) {
    console.log('skip', name);
    continue;
  }
  writeFileSync(path, next, 'utf8');
  patched++;
  console.log('patched', name);
}

console.log('done:', patched, 'files');
