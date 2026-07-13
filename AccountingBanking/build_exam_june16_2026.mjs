#!/usr/bin/env node
/** Build Part 1 & Part 2 Variant A exams (16/06/2026) from exam photos. */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const opt = (id, en) => ({ id, en });
const q = (num, en, options, correct, explain = null) => {
  const d = { num, id: `q${num}`, en, options, correct, section: null };
  if (explain) d.explain = explain;
  return d;
};

const PART1_2026 = [
  q(1, 'The management of an organization performs three general broad functions:', [
    opt('a', 'Planning, directing and motivating, controlling'),
    opt('b', 'Planning, budgeting and controlling'),
    opt('c', 'Planning, accounting and controlling'),
    opt('d', 'Directing and motivating, accounting and controlling'),
  ], 'a'),
  q(2, 'Planning involves:', [
    opt('a', 'Developing objectives and preparing various budgets to achieve these objectives'),
    opt('b', 'The steps taken by management that attempt to ensure the objectives are attained'),
    opt('c', "Analysis of an organization's accounts and fiscal trends to provide data to advise those in business to make accurate decisions"),
    opt('d', 'Guiding, coaching, instructing, motivating, leading the people in an organisation to achieve organisational objectives'),
  ], 'a'),
  q(3, 'For all companies to be efficient and effective it must have 3 levels of managers namely:', [
    opt('a', 'Strategic Managers, Accounting Managers and Operational Managers'),
    opt('b', 'Strategic Managers, Tactical Managers and Financial Managers'),
    opt('c', 'Strategic Managers, Tactical Managers and Operational Managers'),
    opt('d', 'Financial Managers, Accounting Managers and Operational Managers'),
  ], 'c'),
  q(4, 'The Direct costs are:', [
    opt('a', 'Costs that vary directly and proportionately with changes in the activity level'),
    opt('b', 'Costs that remain the same in total regardless of changes in the activity level'),
    opt('c', 'Costs that can be easily and conveniently traced to a product or department'),
    opt('d', 'Costs that must be allocated in order to be assigned to a product or department'),
  ], 'c'),
  q(5, 'The formula for break even analysis is as follows:', [
    opt('a', 'Variable costs / (Sales price per unit – Variable cost per unit)'),
    opt('b', '(Variable cost + Fixed costs) / Sales price'),
    opt('c', 'Fixed costs / (Sales price per unit – Variable cost per unit)'),
    opt('d', 'Assets / (Revenue – Fixed costs)'),
  ], 'c'),
  q(6, 'A Budget is:', [
    opt('a', 'A detailed quantitative plan for acquiring/using financial and other resources over a specified forthcoming time period'),
    opt('b', 'A system that includes subsystems for planning, measuring and recording results and evaluating performance'),
    opt('c', 'The force that moves different people in different ways for different reasons'),
    opt('d', 'Concerned with the initiation of organized action and stimulating people to work'),
  ], 'a'),
  q(7, 'Efficiency is:', [
    opt('a', 'The comparison of what is actually produced or performed with what can be achieved with the same consumption of resources'),
    opt('b', 'The degree to which objectives are achieved and the extent to which targeted problems are solved'),
    opt('c', 'Refers to how an organization has achieved full self-awareness due'),
    opt('d', 'The criterion that allows to judge the economic and financial viability of an investment'),
  ], 'a'),
  q(8, 'Discounted Cash Flow (DCF) analysis is?', [
    opt('a', 'A relative valuation method in which you compare the current value of a business to other similar businesses by looking at trading multiples liabilities'),
    opt('b', 'A form of relative valuation where you compare the company in question to other businesses that have recently been sold or acquired in the same industry'),
    opt('c', 'A Market approach method'),
    opt('d', 'An Intrinsic value approach'),
  ], 'd'),
];

const PART2_VARIANT_A = [
  q(1, 'Free Float is a term related to', [
    opt('a', 'Private equity'),
    opt('b', 'Venture capital'),
    opt('c', 'IPO'),
    opt('d', 'M&A'),
  ], 'c', 'Free float = shares available for public trading after IPO.'),
  q(2, 'The duration is an instrument useful for the evaluation of', [
    opt('a', 'Bond'),
    opt('b', 'Shares'),
    opt('c', 'Derivatives'),
    opt('d', 'None of the above'),
  ], 'a'),
  q(3, 'Basel I focus on', [
    opt('a', 'Interest risk'),
    opt('b', 'Credit risk'),
    opt('c', 'Currency risk'),
    opt('d', 'None of the above'),
  ], 'b'),
  q(4, 'In the transfer of financial resources between subjects in surplus and in deficit, when the bank takes risks, we are talking about', [
    opt('a', 'Indirect circuit'),
    opt('b', 'Direct circuit'),
    opt('c', 'M&A'),
    opt('d', 'IPO'),
  ], 'a'),
  q(5, 'The total of the loans provided to costumers are', [
    opt('a', "In the liabilities of the banks' balance sheet"),
    opt('b', "In the liabilities of the banks' income statement"),
    opt('c', "In the asset of the banks' income statement"),
    opt('d', "In the asset of the banks' balance sheet"),
  ], 'd'),
  q(6, 'The first pillar of the European Banking Union is about', [
    opt('a', 'Sustainability'),
    opt('b', 'Deposit guarantee schemes'),
    opt('c', 'Resolution mechanisms'),
    opt('d', 'Supervision'),
  ], 'd'),
  q(7, 'Which of the following is a service offered by investment banks?', [
    opt('a', 'Asset management'),
    opt('b', 'Corporate finance'),
    opt('c', 'Risk management'),
    opt('d', 'All the previous answers'),
  ], 'd'),
  q(8, 'The Deposit Guarantee Schemes Directive is related to:', [
    opt('a', 'Fourth pillar of EBU'),
    opt('b', 'Third pillar of EBU'),
    opt('c', 'First pillar of EBU'),
    opt('d', 'Second pillar of EBU'),
  ], 'b'),
  q(9, 'Which of the following is a theory that supports the existence of financial intermediaries?', [
    opt('a', 'Classical theory'),
    opt('b', 'Informational asymmetries'),
    opt('c', 'Capital asset pricing theory'),
    opt('d', 'Arbitrage pricing theory'),
  ], 'b'),
  q(10, 'Private equity operators usually use', [
    opt('a', 'Closed-end fund'),
    opt('b', 'Bank debt'),
    opt('c', 'Open-end fund'),
    opt('d', 'None of the above'),
  ], 'a'),
  q(11, 'Bail-in is a measure related to', [
    opt('a', 'The second pillar of EBU'),
    opt('b', 'The first pillar of EBU'),
    opt('c', 'CAPM'),
    opt('d', 'APT'),
  ], 'a'),
  q(12, 'Stage 1 of IFRS 9 is called', [
    opt('a', 'Non-performing'),
    opt('b', 'Performing'),
    opt('c', 'Under performing'),
    opt('d', 'None of the above'),
  ], 'b'),
  q(13, 'Usually credit risk is more important in', [
    opt('a', 'Commercial banks'),
    opt('b', 'Investment banks'),
    opt('c', 'Diversified banks'),
    opt('d', 'None of the above'),
  ], 'a'),
];

const PART2_OPEN_EXTRA = `
    <div class="section-title">Second part of exam — open questions (max 6 points each)</div>
    <div class="open-block">
      <div class="q-num">1) Describe the first pillar of the European Banking Union</div>
      <div class="brief-answer"><div class="brief-label">Answer</div><div class="brief-text">The <strong>first pillar</strong> is the <strong>Single Supervisory Mechanism (SSM)</strong>: the ECB and national supervisors jointly oversee significant banks in participating countries. It harmonises supervision, ensures consistent application of rules, and supports financial stability.</div></div>
    </div>
    <div class="open-block">
      <div class="q-num">2) Describe the private equity</div>
      <div class="brief-answer"><div class="brief-label">Answer</div><div class="brief-text"><strong>Private equity</strong> invests in companies (often unlisted) using capital from institutional investors. Funds are typically <strong>closed-end</strong>; managers improve value via governance and strategy, then exit through sale or IPO.</div></div>
    </div>
`;

function replaceJsConst(html, name, value) {
  const marker = `const ${name} = `;
  const start = html.indexOf(marker);
  if (start < 0) return html;
  const valStart = start + marker.length;
  const open = html[valStart];
  const close = open === '[' ? ']' : '}';
  let depth = 0;
  let inStr = false;
  let esc = false;
  let end = valStart;
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
      if (depth === 0) { end = i + 1; break; }
    }
  }
  const semi = html[end] === ';' ? 1 : 0;
  return html.slice(0, valStart) + JSON.stringify(value) + html.slice(end + semi);
}

function buildFromTemplate(templateFile, outFile, opts) {
  let html = readFileSync(join(ROOT, templateFile), 'utf8');
  html = html.replace(/<title>.*?<\/title>/, `<title>${opts.title}</title>`);
  html = html.replace(/<h1>.*?<\/h1>/, `<h1>${opts.h1}</h1>`);
  html = html.replace(
    /<p class="sub">[\s\S]*?<\/p>(\s*<p class="sub">[\s\S]*?<\/p>)?\s*<div class="rules">[\s\S]*?<\/div>/,
    `<p class="sub">${opts.sub}</p>\n    <div class="rules">${opts.rules}</div>`,
  );
  if (opts.extra) {
    html = html.replace(
      '<div id="questions"></div>\n      \n      <div class="actions">',
      `<div id="questions"></div>\n      ${opts.extra}\n      <div class="actions">`,
    );
  }
  html = replaceJsConst(html, 'SCORING', opts.scoring);
  html = replaceJsConst(html, 'QUESTIONS', opts.questions);
  writeFileSync(join(ROOT, outFile), html, 'utf8');
  console.log('Wrote', outFile, '—', opts.questions.length, 'MCQ');
}

buildFromTemplate('01_Part1_Management_Accounting.html', '15_Part1_Exam_2026_16-06.html', {
  title: 'Part 1 — Exam 16/06/2026',
  h1: 'Part 1 — Exam 16/06/2026',
  sub: 'Accounting and banking for SMEs · 16th June 2026',
  rules: '+1 correct, −1 wrong, 0 if skipped (no penalty for blanks).',
  scoring: { correct: 1, wrong: -1, max: null },
  questions: PART1_2026,
});

buildFromTemplate('13_Part2_Exam_2026_16-06_Variant_B.html', '16_Part2_Exam_2026_16-06_Variant_A.html', {
  title: 'Part 2 — Exam 16/06/2026 (Variant A)',
  h1: 'Part 2 — Exam 16/06/2026 (Variant A)',
  sub: '13 MCQ + open questions · Free Float, PE, informational asymmetries',
  rules: 'First part: 1 point per correct answer. Second part: open questions (max 6 pts each) — brief answers below.',
  scoring: { correct: 1, wrong: 0, max: null },
  questions: PART2_VARIANT_A,
  extra: PART2_OPEN_EXTRA,
});
