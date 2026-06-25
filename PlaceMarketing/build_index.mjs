#!/usr/bin/env node
/** Regenerate index.html — OPEN_ITEMS always empty (MCQ only). */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));
let html = readFileSync(join(ROOT, 'index.html'), 'utf8');

html = html.replace(/const OPEN_ITEMS = \[[\s\S]*?\];/, 'const OPEN_ITEMS = [];');
writeFileSync(join(ROOT, 'index.html'), html, 'utf8');
console.log('Updated index.html — OPEN_ITEMS = []');
