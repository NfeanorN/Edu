#!/usr/bin/env node
/** Convert Economics explanation HTML files to notebook format. */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ECON = join(__dirname, '..');
const CSS_LINK = '<link rel="stylesheet" href="notebook-style.css">';
const SKIP = new Set(['Frank_Study_Guide.html', 'Frank_Study_Guide_EN.html', 'Exam_Prep_Guide.html', 'index.html']);

const ACCENT = {
  'nb-macro': ['GDP', 'Consumption', 'Goods_Market', 'IS_LM', 'Fiscal', 'Okun', 'Unemployment', 'Open_Economy', 'Exam_Macro'],
  'nb-micro': ['PPF', 'Opportunity', 'Budget', 'Rational', 'Intertemporal', 'Marginal_Utility'],
  'nb-firm': ['Production', 'Cost_Long', 'Perfect_Competition'],
  'nb-market': ['Demand', 'Supply', 'Elasticities', 'Monopoly', 'Market_Power', 'Price_Discrimination', 'Game_Theory', 'Externalities', 'Consumer_Surplus', 'Supply_Demand'],
};

const SKIP_CLASSES = new Set(['back', 'book-ref', 'source', 'nb-def', 'nb-en', 'en', 'lang-switch']);

function accentClass(name) {
  for (const [cls, keys] of Object.entries(ACCENT)) {
    if (keys.some(k => name.includes(k))) return cls;
  }
  return 'nb-macro';
}

function isAsciiGraph(pre) {
  const graphChars = [...pre].filter(c => '|/\\─│┌└┐┘├┤┬┴┼+*'.includes(c)).length;
  return graphChars >= 3 && pre.length > 80;
}

function svgForPre(pre) {
  const low = pre.toLowerCase();
  if (low.includes('market /') && low.includes('single firm')) {
    return `<svg class="svg-graph" viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg" aria-label="Market vs firm">
            <text x="90" y="22" font-size="13" font-weight="600">Market</text>
            <text x="350" y="22" font-size="13" font-weight="600">Single firm</text>
            <line x1="30" y1="240" x2="250" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="30" y1="40" x2="30" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="280" y1="240" x2="500" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="280" y1="40" x2="280" y2="240" stroke="#333" stroke-width="1.5"/>
            <path d="M 40 200 L 230 80" stroke="#3498db" stroke-width="2" fill="none"/>
            <path d="M 40 80 L 230 200" stroke="#e67e22" stroke-width="2" fill="none"/>
            <circle cx="135" cy="140" r="5" fill="#e74c3c"/>
            <line x1="290" y1="120" x2="490" y2="120" stroke="#2980b9" stroke-width="2.5"/>
            <text x="200" y="75" font-size="11">D</text>
            <text x="200" y="210" font-size="11">S</text>
            <text x="400" y="115" font-size="11">D = MR = P*</text>
        </svg>`;
  }
  if (low.includes('budget line') || low.includes('бюджетн') || (low.includes('food') && low.includes('shelter'))) {
    return `<svg class="svg-graph" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" aria-label="Budget line">
            <line x1="50" y1="20" x2="50" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="240" x2="370" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="50" x2="340" y2="240" stroke="#27ae60" stroke-width="2.5"/>
            <circle cx="50" cy="50" r="5" fill="#e74c3c"/>
            <circle cx="340" cy="240" r="5" fill="#e74c3c"/>
            <circle cx="200" cy="145" r="4" fill="#3498db"/>
            <circle cx="120" cy="190" r="4" fill="#8e44ad"/>
            <text x="18" y="55" font-size="12">Good 2</text>
            <text x="300" y="255" font-size="12">Good 1</text>
        </svg>`;
  }
  if (low.includes('oranges') && (low.includes('apples') || low.includes('q₁') || low.includes('q1'))) {
    return `<svg class="svg-graph" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" aria-label="Budget line">
            <line x1="50" y1="20" x2="50" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="240" x2="370" y2="240" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="60" x2="320" y2="240" stroke="#27ae60" stroke-width="2.5"/>
            <text x="18" y="40" font-size="12">Q₂</text>
            <text x="320" y="255" font-size="12">Q₁</text>
        </svg>`;
  }
  if (low.includes('phillips') || (pre.includes('π') && low.includes('inflation'))) {
    return `<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Phillips curve">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 70 50 Q 200 130 350 210" stroke="#2980b9" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">π</text>
            <text x="340" y="248" font-size="12">u</text>
        </svg>`;
  }
  if (low.includes('output') && (low.includes('gap') || low.includes('y*') || low.includes('potential'))) {
    return `<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Output gap">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="200" y1="230" x2="200" y2="50" stroke="#888" stroke-dasharray="4,4" stroke-width="1.5"/>
            <path d="M 80 180 Q 200 100 320 70" stroke="#3498db" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">Y</text>
            <text x="340" y="248" font-size="12">time</text>
        </svg>`;
  }
  if (low.includes('exchange rate') || pre.includes('ε') || low.includes('real exchange')) {
    return `<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Exchange rate">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 70 210 Q 200 100 350 50" stroke="#16a085" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">ε</text>
            <text x="340" y="248" font-size="12">Y</text>
        </svg>`;
  }
  if (low.includes('is') && low.includes('lm') && low.includes('interest')) {
    return `<svg class="svg-graph" viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" aria-label="IS-LM">
            <line x1="50" y1="20" x2="50" y2="220" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="220" x2="340" y2="220" stroke="#333" stroke-width="1.5"/>
            <path d="M 50 200 L 200 120 L 340 40 I" stroke="#3498db" stroke-width="2.5" fill="none"/>
            <path d="M 50 40 L 200 120 L 340 200" stroke="#e74c3c" stroke-width="2.5" fill="none"/>
            <circle cx="200" cy="120" r="5" fill="#e74c3c"/>
            <text x="28" y="18" font-size="12">i</text>
            <text x="330" y="235" font-size="12">Y</text>
        </svg>`.replace('340 240 I', '340 40');
  }
  if (/^C\s*\n/.test(pre) || (low.includes('consumption') && low.includes('income'))) {
    return `<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Consumption function">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 50 200 L 350 50" stroke="#3498db" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">C</text>
            <text x="340" y="248" font-size="12">Y</text>
        </svg>`;
  }
  if (low.includes('supply') && (low.includes('shift') || low.includes('s₀') || low.includes('s0'))) {
    return `<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Supply shift">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 70 200 L 350 80" stroke="#3498db" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M 70 170 L 350 50" stroke="#e67e22" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">P</text>
            <text x="340" y="248" font-size="12">Q</text>
        </svg>`;
  }
  if (low.includes('recession') && (low.includes('ad') || pre.includes('G↑'))) {
    return `<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="AD shift">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 70 200 L 350 80" stroke="#3498db" stroke-width="2" fill="none" opacity="0.5"/>
            <path d="M 120 200 L 350 110" stroke="#27ae60" stroke-width="2.5" fill="none"/>
            <text x="22" y="30" font-size="12">Y</text>
            <text x="340" y="248" font-size="12">AD</text>
        </svg>`;
  }
  if (low.includes('p, cost') || (low.includes('mc') && low.includes('atc') && low.includes('profit-max'))) {
    return `<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="P=MC">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 60 200 L 200 80 L 340 60" stroke="#e67e22" stroke-width="2" fill="none"/>
            <path d="M 60 180 Q 200 120 340 100" stroke="#8e44ad" stroke-width="2" fill="none"/>
            <line x1="60" y1="130" x2="370" y2="130" stroke="#2980b9" stroke-width="2"/>
            <circle cx="200" cy="130" r="5" fill="#e74c3c"/>
            <text x="22" y="30" font-size="12">P</text>
            <text x="340" y="248" font-size="12">q</text>
        </svg>`;
  }
  if (isAsciiGraph(pre)) {
    return `<svg class="svg-graph" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-label="Graph">
            <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
            <line x1="50" y1="230" x2="370" y2="230" stroke="#333" stroke-width="1.5"/>
            <path d="M 70 200 Q 200 100 350 60" stroke="#3498db" stroke-width="2.5" fill="none"/>
        </svg>`;
  }
  return null;
}

function process(path, name) {
  const original = readFileSync(path, 'utf-8');
  if (original.includes(CSS_LINK) && original.includes('class="nb-page') && original.includes('<div class="nb-sheet">')) {
    return false;
  }

  let text = original;
  const extra = accentClass(name);

  text = text.replace(/\s*<style>[\s\S]*?<\/style>\s*/g, '\n');
  if (!text.includes(CSS_LINK)) {
    if (text.includes('<meta charset="UTF-8">')) {
      text = text.replace('<meta charset="UTF-8">', `<meta charset="UTF-8">\n    ${CSS_LINK}`);
    } else if (text.includes('<head>')) {
      text = text.replace('<head>', `<head>\n    ${CSS_LINK}`);
    }
  }

  const bodyMatch = text.match(/<body([^>]*)>/);
  if (bodyMatch) {
    const attrs = bodyMatch[1];
    if (!attrs.includes('nb-page')) {
      text = text.replace(/<body[^>]*>/, `<body class="nb-page ${extra}">`);
    } else if (!attrs.includes(extra)) {
      text = text.replace(/class="nb-page([^"]*)"/, `class="nb-page ${extra}$1"`);
    }
  }

  if (!text.includes('<div class="nb-sheet">')) {
    text = text.replace(/(<body class="nb-page [^"]+">)\s*/, '$1\n<div class="nb-sheet">\n');
    text = text.replace('</body>', '</div>\n</body>');
  }

  text = text.replace(/\bclass="en"/g, 'class="nb-en"');
  text = text.replace(/\bclass='en'/g, "class='nb-en'");

  const h1 = text.match(/<h1[^>]*>[\s\S]*?<\/h1>/);
  if (h1) {
    const start = h1.index + h1[0].length;
    const rest = text.slice(start);
    const pRe = /<p(?=\s|>)([^>]*)>([\s\S]*?)<\/p>/g;
    let m;
    while ((m = pRe.exec(rest)) !== null) {
      const attrs = m[1];
      if (attrs.includes('class=')) {
        const cm = attrs.match(/class="([^"]*)"/);
        if (cm && SKIP_CLASSES.has(cm[1].split(/\s+/)[0])) continue;
        if (cm && cm[1].includes('nb-def')) break;
        continue;
      }
      const full = m[0];
      const repl = full.startsWith('<p>') ? full.replace('<p>', '<p class="nb-def">') : full.replace(/<p(\s[^>]*)?>/, '<p class="nb-def">');
      text = text.slice(0, start + m.index) + repl + text.slice(start + m.index + full.length);
      break;
    }
  }

  text = text.replace(/<pre>([\s\S]*?)<\/pre>/g, (full, pre) => {
    if (!isAsciiGraph(pre)) return full;
    const svg = svgForPre(pre);
    return svg || full;
  });

  if (!text.includes('nb-conclusion') && !text.includes('ru-foot')) {
    const title = text.match(/<title>([\s\S]*?)<\/title>/);
    const label = title ? title[1].trim() : name;
    text = text.replace('</div>\n</body>', `\n<div class="nb-conclusion"><p>Summary: ${label}</p></div>\n</div>\n</body>`);
  }

  if (text !== original) {
    writeFileSync(path, text, 'utf-8');
    return true;
  }
  return false;
}

const updated = [];
for (const name of readdirSync(ECON).filter(f => f.endsWith('.html')).sort()) {
  if (SKIP.has(name)) continue;
  if (name.includes('Explanation') || name.startsWith('Exam_Macro')) {
    if (process(join(ECON, name), name)) updated.push(name);
  }
}

console.log(`Updated ${updated.length} files:`);
for (const n of updated) console.log(`  ${n}`);
