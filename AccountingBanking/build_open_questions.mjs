#!/usr/bin/env node
/** Build 05_Open_Questions.html — all open / essay questions on one page. */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

const OPEN_ITEMS = [
  // Theory
  {
    section: 'Theory — short answers',
    title_en: 'Functions of the financial system',
    en: 'Explain the functions of the financial system',
    sample_en: 'The financial system links people who save money with people and companies that need money. Banks take deposits and give loans, so credit is created in the economy. They also share risk — for example, one bank has many loans, so one bad loan does not destroy everything. Banks match the amount and the time of money: short deposits can fund longer loans. They run payment systems so transfers are safe. Markets also help set prices for financial products, so money goes where it is most useful.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'Theories of financial intermediaries',
    en: 'Explain the theories of the existence of financial intermediaries',
    sample_en: 'Banks and other intermediaries exist because lending directly between individuals and firms is often hard and risky. A bank collects many small deposits and lends to many borrowers, so costs are lower and risk is spread. Savers do not know well if a borrower is good or bad — that is adverse selection. After getting a loan, a borrower may take more risk — that is moral hazard. Banks are better at checking borrowers and watching them over time. They also change the length of money: people save short-term, but firms often need long-term loans.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'Bank balance sheet & ratios',
    en: 'Talk about the balance sheets of banks and the most important indices',
    sample_en: 'A bank balance sheet shows what the bank owns and what it owes on a given date. On the asset side you mainly see loans to customers, securities, and cash. On the liability side the biggest item is usually customer deposits, plus money the bank borrowed. Equity is the owners’ money — capital plus past profits kept in the bank. Important ratios: ROE and ROA show profit, NIM shows the margin on lending, CAR shows if capital is enough, LCR shows liquidity, and NPL shows bad loans. IFRS 9 rules also affect how loans and expected losses are recorded.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'European Banking Union',
    en: 'Highlight the main features of the European Banking Union',
    sample_en: 'The European Banking Union has three main parts. First, common supervision (SSM): the ECB and national supervisors watch big banks with the same rules. Second, common resolution (SRM): if a bank fails, it is closed in an orderly way and bail-in is used so taxpayers do not pay everything. Third, deposit guarantees (DGS): small depositors are protected up to €100,000 per person per bank. The goal is safer banks, the same rules in different countries, and more trust in the banking system in the euro area.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'Interest rate risk',
    en: 'Talk about interest rate risk',
    sample_en: 'Interest rate risk means a bank can lose when interest rates change because assets and liabilities do not adjust at the same speed. If short-term rates go up and deposits reprice faster than loans, the bank earns less — that is refinancing risk. If the bank must reinvest money at lower rates, that is reinvestment risk. The value of bonds and loans also changes when rates move. Banks manage this with gap analysis, duration, and hedging tools like interest-rate swaps.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'DCF model',
    en: 'Explain the DCF model',
    sample_en: 'DCF estimates the value of a company from its future cash flows brought back to today using a discount rate. You can value the whole firm (cash flows discounted with WACC) or only equity (cash flows to shareholders discounted with cost of equity). After the forecast period you usually add a terminal value. DCF is popular because it uses real cash and is a standard method in finance. But the result depends a lot on your guesses about growth, the discount rate, and the terminal value.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'Debt vs Equity',
    en: 'Explain the difference between Debt and Equity',
    sample_en: 'Debt is borrowed money: the firm must pay fixed interest (often with a tax benefit) and repay the principal on a schedule. If the firm has problems, lenders are paid before owners and usually do not run the company. Equity is ownership: investors get what is left after all debts are paid. Dividends are not fixed and are not tax-deductible. Shareholders take more risk but usually have voting rights and no fixed repayment date. The firm chooses debt or equity based on cost, risk, and how much control it wants to keep.',
  },
  // Exam 16/06/2026 Variant A
  {
    section: 'Exam 16/06/2026 — Variant A',
    title_en: 'First pillar of EBU',
    en: 'Describe the first pillar of the European Banking Union',
    sample_en: 'The first pillar is bank supervision through the Single Supervisory Mechanism (SSM). Since 2014, the ECB directly supervises the largest banks in EU countries that take part, while national supervisors watch smaller banks using the same framework. The aim is to use the same rules everywhere, find problems early, and stop one weak bank from hurting the whole system. Supervisors check capital, liquidity, how the bank is run, and how risks are managed.',
  },
  {
    section: 'Exam 16/06/2026 — Variant A',
    title_en: 'Private equity',
    en: 'Describe private equity',
    sample_en: 'Private equity means investing in companies that are not on the stock market, using money from big investors like pension funds. These funds are usually closed-end for about 10 years — you cannot take your money out anytime. The manager buys part of a company, tries to improve it (better strategy, management, sometimes more debt), and later sells it or lists it on the stock exchange in an IPO. Profit comes from making the company better and from a higher sale price at the end.',
  },
  {
    section: 'Exam 16/06/2026 — Variant A',
    title_en: 'Second pillar of EBU',
    en: 'Describe the second pillar of the European Banking Union',
    sample_en: 'The second pillar is the Single Resolution Mechanism (SRM). When a bank is failing or will probably fail, the Single Resolution Board organises an orderly closure instead of a sudden crash or a full bailout with public money. The main tool is bail-in: shareholders and some creditors lose money first before the state pays. Resolution funds help pay for the process. The idea is to keep the financial system stable but make the people who took the risk pay first.',
  },
  {
    section: 'Exam 16/06/2026 — Variant A',
    title_en: 'Third pillar of EBU',
    en: 'Describe the third pillar of the European Banking Union',
    sample_en: 'The third pillar is deposit protection through Deposit Guarantee Schemes (DGS). If a bank fails, ordinary depositors should still get their money back quickly, up to the legal limit — in the EU usually €100,000 per person per bank. This stops panic and bank runs and protects small savers. National funds are paid for by contributions from banks. The EU also wants a more common European Deposit Insurance Scheme (EDIS) in the future. Main point: people trust that their deposits are safe even when a bank is in trouble.',
  },
  {
    section: 'Exam 16/06/2026 — Variant A',
    title_en: 'IPO',
    en: 'Describe IPO (Initial Public Offering)',
    sample_en: 'An IPO (Initial Public Offering) is when a company sells its shares to the public for the first time and starts trading on a stock exchange. The company raises new money from investors and must publish more information to the market. Investment banks often help as underwriters: they help set the price, find buyers, and sometimes guarantee that enough shares will be sold. After the IPO, the shares that the public can freely buy and sell are called the free float.',
  },
  // Exercises
  {
    section: 'Exercises',
    title_en: 'SoFP — smaller figures (5 pts)',
    en: 'Build Statement of Financial Position for Uniclam Group Corp. (smaller figures)',
    sample_en: 'Put each item in the right place: non-current assets, current assets, equity, non-current liabilities, or current liabilities, then add up each group. Non-current assets (goodwill, intangibles, PPE) = 124,950; current assets (inventory, receivables, cash) = 79,900 — total assets 204,850. On the other side: equity 66,300, non-current liabilities 87,550, current liabilities 51,000 — total 204,850. The two sides must be equal: Assets = Equity + Liabilities.',
    link: '09_Statement_of_Financial_Position.html',
    link_label: 'Full solution on page 09',
  },
  {
    section: 'Exercises',
    title_en: 'SoFP — exam version (6 pts)',
    en: 'Statement of Financial Position — exam version (larger figures)',
    sample_en: 'Same steps as the smaller version, but with bigger numbers from the exam. Non-current assets = 374,850, current assets = 239,700 — total assets 614,550. Equity = 198,900, non-current liabilities = 262,650, current liabilities = 153,000 — total 614,550. Check that Total Assets equals Total Equity and Liabilities.',
    link: '09_Statement_of_Financial_Position.html',
    link_label: 'Full solution on page 09',
  },
  {
    section: 'Exercises',
    title_en: 'Division table — 2024 exam',
    en: 'Divisions A/B: revenue 108k/72k; indirect per direct labour; selling per revenue; electricity & financial per raw materials.',
    sample_en: 'First split shared costs using the rules on the exam, then subtract all costs from revenue and take 30% tax. Division A gets net income 33,880; Division B gets 14,840. Do not forget any cost line, and use the right base for each overhead: direct labour, revenue, or raw materials.',
    howto_en: 'Step 1 — allocation rules:\n  Indirect labour → by direct labour (A:B = 12:24)\n  Selling → by revenue (A:B = 108:72)\n  Electricity & Financial → by raw materials (A:B = 12:6)\n\nStep 2 — Division A:\n  Add direct costs + allocated overheads → total costs\n  Pre-tax profit = 108,000 − total costs = 48,400\n  Tax 30% = 14,520 → Net income = 33,880\n\nStep 3 — Division B:\n  Same method → Pre-tax 21,200 → Tax 6,360 → Net 14,840',
    link: '13_Divisions_and_DCF.html',
    link_label: 'Worked example on page 13',
  },
  {
    section: 'Exercises',
    title_en: 'Division table — 2025 tablet',
    en: 'Divisions: revenue 144k/120k; indirect/selling/advertising/electricity/financial by allocation rules.',
    sample_en: 'Split indirect labour by direct labour, selling and advertising by revenue, electricity and financial costs by raw materials. Division A earns well (net income 32,214). Division B almost has no profit (net income 126) because costs are almost equal to revenue. Before you start, check that your shared cost pools match the totals given.',
    howto_en: 'Division A (revenue 144,000):\n  Indirect 2,800 · Selling 13,091 · Advertising 13,636\n  Electricity 10,453 · Financial 14,000\n  Total costs 97,980 → Pre-tax 46,020 → Tax 13,806 → Net 32,214\n\nDivision B (revenue 120,000):\n  Total costs 119,820 → Pre-tax 180 → Tax 54 → Net 126',
    link: '13_Divisions_and_DCF.html',
    link_label: 'Full table on page 13',
  },
  {
    section: 'Exercises',
    title_en: 'DCF — Cassino SpA (8 pts)',
    en: 'Evaluate Cassino SpA using DCF. WACC 5%, g 1%. Cash flows 2024–2028. Complete discount coefficients, DCFs, and W.',
    sample_en: 'For each year: discount factor = 1 / (1.05)^n, then multiply by the cash flow for that year. Add all discounted cash flows to get company value W ≈ 143,858. Each year gives about 24–31k after discounting. The 2028 number on the exam is usually the last cash flow in the table (sometimes treated as terminal value).',
    howto_en: 'Discount factor = 1 / (1.05)^n\n\n2024 (n=1): 0.9524 × 25,000 = 23,810\n2025 (n=2): 0.9070 × 30,000 = 27,211\n2026 (n=3): 0.8638 × 35,000 = 30,234\n2027 (n=4): 0.8227 × 38,000 = 31,263\n2028 (n=5): 0.7835 × 40,000 = 31,341\n\nW = 23,810 + 27,211 + 30,234 + 31,263 + 31,341 = 143,858',
    link: '13_Divisions_and_DCF.html',
    link_label: 'Full DCF table on page 13',
  },
  {
    section: 'Exercises',
    title_en: 'Production budget — May',
    en: 'Omega: budgeted production for May? Sales May 90k, June 80k, 30% ending inventory.',
    sample_en: 'Production is not the same as sales. You need enough units for May sales plus ending stock, minus what you already have at the start. Ending inventory for May = 30% of June sales = 24,000 units. Beginning inventory = 30% of May sales = 27,000 units. So production = 90,000 + 24,000 − 27,000 = 87,000 units.',
    howto_en: 'Formula: Production = Sales + Ending inventory − Beginning inventory\n\nEnding (May) = 30% × June sales = 0.30 × 80,000 = 24,000\nBeginning (May) = 30% × May sales = 0.30 × 90,000 = 27,000\n\nProduction = 90,000 + 24,000 − 27,000 = 87,000 units',
  },
  {
    section: 'Exercises',
    title_en: 'Depreciation — Exercise 3 (8 pts)',
    en: 'Cost $160,000, life 6 years, residual $28,000. (a) Annual charge straight-line and reducing balance 15%. (b) 6-year schedule for each method.',
    sample_en: '(a) Straight-line: divide depreciable amount evenly — (160,000 − 28,000) / 6 = $22,000 every year; after year 6 NBV = $28,000 (residual). Reducing balance: each year take 15% of carrying value, so the charge goes down each year; year 6 NBV is about $60,344. (b) Make a table for each method with cost, yearly depreciation, total depreciation so far, and NBV.',
    link: '10_Depreciation.html',
    link_label: 'Full schedules on page 10',
  },
  {
    section: 'Exercises',
    title_en: 'Depreciation — straight-line schedule',
    en: 'Asset $160,000, life 6 years, residual $28,000 — build 6-year schedule (straight-line).',
    sample_en: 'Straight-line means the same amount every year: (160,000 − 28,000) / 6 = $22,000. Each year add 22,000 to accumulated depreciation. NBV = cost minus accumulated depreciation. After year 6, NBV should be $28,000 — the residual value.',
    howto_en: 'Annual dep = (160,000 − 28,000) / 6 = 22,000\n\nEach year:\n  Depreciation = 22,000\n  Accumulated dep += 22,000\n  NBV = 160,000 − Accumulated dep\n\nYear 6: NBV = 28,000 (= residual)',
    link: '10_Depreciation.html',
    link_label: 'Full table on page 10',
  },
  {
    section: 'Exercises',
    title_en: 'Depreciation — reducing balance 15%',
    en: 'Reducing balance 15% — 6-year schedule.',
    sample_en: 'With reducing balance, depreciation = 15% × opening carrying value each year, so the amount gets smaller over time. Year 1: 160,000 × 15% = 24,000 → NBV 136,000. Keep going for 6 years; year 6 NBV ≈ 60,344. Unlike straight-line, NBV does not automatically reach $28,000 residual unless you change the last year.',
    howto_en: 'Each year: Dep = Carrying value × 15%, then NBV = Carrying − Dep\n\nYear 1: 24,000 dep → NBV 136,000\nYear 2: 20,400 dep → NBV 115,600\nYear 3: 17,340 → NBV 98,260\nYear 4: 14,739 → NBV 83,521\nYear 5: 12,528 → NBV 70,993\nYear 6: 10,649 → NBV 60,344',
    link: '10_Depreciation.html',
    link_label: 'Full table on page 10',
  },
];

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

const RENDER_OPEN = `
    function renderOpen() {
      if (!OPEN_ITEMS.length) return;
      let openSection = '';
      OPEN_ITEMS.forEach((item, idx) => {
        const sec = item.section || 'Open questions';
        if (sec !== openSection) {
          openSection = sec;
          const h = document.createElement('div');
          h.className = 'section-title';
          h.dataset.page = String(openItemPage(idx));
          h.textContent = sec;
          container.appendChild(h);
        }
        const block = document.createElement('div');
        block.className = 'open-block';
        block.dataset.page = String(openItemPage(idx));
        const howto = item.howto_en
          ? \`<details class="solution howto-block"><summary>Step-by-step</summary><div class="howto">\${item.howto_en}</div></details>\`
          : '';
        const link = item.link
          ? \`<p class="open-link"><a href="\${item.link}">\${item.link_label || 'See full solution'}</a></p>\`
          : '';
        block.innerHTML = \`
          <div class="q-num">\${idx + 1}) \${item.title_en || item.en}</div>
          <div class="q-en">\${item.en}</div>
          <textarea name="open_\${idx}" rows="5" placeholder="Your answer..."></textarea>
          <details class="solution sample-block">
            <summary>Sample answer</summary>
            <div class="brief-answer"><div class="brief-text">\${item.sample_en || ''}</div></div>
          </details>
          \${howto}
          \${link}\`;
        container.appendChild(block);
      });
    }`;

const SUBMIT_PATCH = `
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const page = currentPage;
      container.querySelectorAll('.open-block').forEach((block) => {
        if (Number(block.dataset.page) !== page) return;
        block.querySelectorAll('details.solution').forEach((d) => { d.open = true; });
      });
      resultsBox.classList.add('visible');
      document.getElementById('score-text').textContent =
        'Sample answers shown for page ' + (page + 1) + ' of ' + totalPageCount();
      document.getElementById('score-detail').textContent =
        'Write your answer first, then click to reveal samples. Use links for full worked solutions.';
      document.getElementById('warn-text').hidden = true;
      resultsBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });`;

let html = readFileSync(join(ROOT, '01_Part1_Management_Accounting.html'), 'utf8');

html = html.replace(/<title>.*?<\/title>/, '<title>Open questions — Accounting & Banking</title>');
html = html.replace(/<h1>.*?<\/h1>/, '<h1>Open questions — all in one page</h1>');
html = html.replace(
  /<p class="sub">[\s\S]*?<\/p>\s*<div class="rules">[\s\S]*?<\/div>/,
  `<p class="sub">${OPEN_ITEMS.length} open questions · theory, exam 16/06/2026, exercises</p>
    <div class="rules">Write your answer in the box, then click “Show sample answers on this page”. Detailed tables: <a href="09_Statement_of_Financial_Position.html">09 SoFP</a>, <a href="10_Depreciation.html">10 Depreciation</a>, <a href="13_Divisions_and_DCF.html">13 Divisions &amp; DCF</a>.</div>`,
);
html = html.replace(
  '<button type="submit">Check answers</button>',
  `<button type="submit">Show sample answers on this page (${Math.min(20, OPEN_ITEMS.length)})</button>`,
);
html = html.replace(/\.brief-text \{ color: #1a1a2e; \}/, `.brief-text { color: #1a1a2e; line-height: 1.65; white-space: pre-wrap; }
    .open-link { margin: 0.5rem 0 0; font-size: 0.9rem; }
    .open-link a { color: #16a085; }
    .open-block textarea { width: 100%; margin: 0.65rem 0; padding: 0.65rem; border: 1px solid #ddd; border-radius: 8px; font-family: inherit; font-size: 0.95rem; resize: vertical; }`);

html = replaceJsConst(html, 'SCORING', { correct: 0, wrong: 0, max: null });
html = replaceJsConst(html, 'QUESTIONS', []);
html = replaceJsConst(html, 'OPEN_ITEMS', OPEN_ITEMS);
html = replaceJsConst(html, 'SNA_ITEMS', []);

html = html.replace(/function renderOpen\(\) \{[\s\S]*?\n    \}\n\n    function renderSna/, RENDER_OPEN + '\n\n    function renderSna');

const submitStart = html.indexOf("form.addEventListener('submit', (e) => {");
const submitEnd = html.indexOf("document.getElementById('reset-btn')", submitStart);
if (submitStart >= 0 && submitEnd > submitStart) {
  html = html.slice(0, submitStart) + SUBMIT_PATCH.trim() + '\n\n    ' + html.slice(submitEnd);
}

html = html.replace(
  /function updateCheckButton\(\) \{[\s\S]*?\n    \}/,
  `function updateCheckButton() {
      const btn = form.querySelector('.actions button[type="submit"]');
      if (!btn) return;
      if (!btn.dataset.defaultLabel) btn.dataset.defaultLabel = btn.textContent;
      if (!QUESTIONS.length && OPEN_ITEMS.length) {
        const from = currentPage * PAGE_SIZE + 1;
        const to = Math.min((currentPage + 1) * PAGE_SIZE, OPEN_ITEMS.length);
        btn.textContent = 'Show sample answers (' + from + '–' + to + ')';
      } else if (needsPagination() && isMcqPage(currentPage)) {
        btn.textContent = 'Check this page (' + questionsForPage(currentPage).length + ')';
      } else {
        btn.textContent = btn.dataset.defaultLabel;
      }
    }`,
);

writeFileSync(join(ROOT, '05_Open_Questions.html'), html, 'utf8');
console.log('Wrote 05_Open_Questions.html —', OPEN_ITEMS.length, 'open questions');
