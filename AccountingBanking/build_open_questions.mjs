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
    sample_en: 'The financial system connects savers with borrowers and keeps the economy running. Banks collect deposits and channel them into loans, which creates credit. They also spread risk (for example by diversifying across many loans), match the size and maturity of funding to what borrowers need, and run payment systems so money can move safely. Finally, markets help price information — so capital flows to where it can be used best.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'Theories of financial intermediaries',
    en: 'Explain the theories of the existence of financial intermediaries',
    sample_en: 'Financial intermediaries exist because direct lending between individuals and firms is often too costly and risky. Banks pool many small deposits, cut transaction costs, and diversify risk across a large loan book. Information asymmetry is central: savers cannot easily judge borrower quality (adverse selection), and behaviour may worsen after the loan (moral hazard) — banks specialise in screening and monitoring. They also transform maturities (short-term deposits funding longer loans) and apply expert knowledge that small investors lack.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'Bank balance sheet & ratios',
    en: 'Talk about the balance sheets of banks and the most important indices',
    sample_en: 'A bank balance sheet shows what the bank owns and owes at a point in time. Assets mainly include loans to customers, securities, and cash/reserves. Liabilities are dominated by customer deposits, plus borrowings and other debt. Equity is the shareholders’ buffer — paid-in capital and retained earnings. Analysts watch ROE and ROA for profitability, NIM for the margin on lending, CAR for capital adequacy, LCR for liquidity, and the NPL ratio for credit quality. IFRS 9 also shapes how loans are measured and when expected credit losses are recognised.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'European Banking Union',
    en: 'Highlight the main features of the European Banking Union',
    sample_en: 'The European Banking Union has three pillars. The first is the Single Supervisory Mechanism (SSM): the ECB and national supervisors jointly oversee major banks under one rulebook. The second is the Single Resolution Mechanism (SRM), with bail-in so failing banks can be resolved without always using taxpayer money. The third is deposit guarantee schemes (DGS), protecting retail deposits up to €100,000. Together, these aim for safer banks, consistent supervision, and a more integrated banking market in the euro area.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'Interest rate risk',
    en: 'Talk about interest rate risk',
    sample_en: 'Interest rate risk hits a bank when assets and liabilities do not reprice at the same time. If short-term rates rise and more liabilities reprice upward than assets, net interest income falls — that is refinancing risk. If the bank holds shorter assets and must reinvest at lower rates, that is reinvestment risk. Bond and loan values also move when rates change. Banks manage this with repricing gap models, duration analysis, and hedging instruments such as interest-rate swaps.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'DCF model',
    en: 'Explain the DCF model',
    sample_en: 'DCF values a company by forecasting future cash flows and bringing them back to today’s money using a discount rate. The asset-side approach uses free cash flows to the firm discounted at WACC; the equity-side approach uses cash flows to shareholders discounted at the cost of equity. You normally add a terminal value for the period after the explicit forecast. DCF is popular because it is based on cash and widely accepted, but results depend heavily on assumptions about growth, the discount rate, and the terminal value.',
  },
  {
    section: 'Theory — short answers',
    title_en: 'Debt vs Equity',
    en: 'Explain the difference between Debt and Equity',
    sample_en: 'Debt is a contractual claim: the firm must pay fixed interest (often tax-deductible) and repay principal on a schedule. In distress, debt holders are paid before shareholders and usually have no control over management. Equity is a residual claim — owners get what is left after all obligations. Dividends are optional and not tax-deductible; shareholders take the highest risk but typically have voting rights and no fixed maturity. Firms choose the mix based on cost of capital, risk appetite, and how much control they want to keep.',
  },
  // Exam 16/06/2026 Variant A
  {
    section: 'Exam 16/06/2026 — Variant A',
    title_en: 'First pillar of EBU',
    en: 'Describe the first pillar of the European Banking Union',
    sample_en: 'The first pillar is banking supervision through the Single Supervisory Mechanism (SSM). Since 2014, the ECB directly supervises the largest (“significant”) banks in participating EU countries, while national authorities supervise smaller banks under the same framework. The idea is to apply rules consistently, catch problems early, and reduce the risk that a weak bank in one country threatens the whole system. Supervision covers capital, liquidity, governance, and risk management.',
  },
  {
    section: 'Exam 16/06/2026 — Variant A',
    title_en: 'Private equity',
    en: 'Describe private equity',
    sample_en: 'Private equity means investing in companies that are not listed on a stock exchange, using capital raised from institutional investors such as pension funds. These are usually closed-end funds with a life of about 10 years — investors cannot withdraw whenever they want. The manager buys a stake, works on improving the business (strategy, governance, sometimes leverage), and exits by selling the company or taking it public through an IPO. Returns come from both operational improvement and the sale price at exit.',
  },
  {
    section: 'Exam 16/06/2026 — Variant A',
    title_en: 'Second pillar of EBU',
    en: 'Describe the second pillar of the European Banking Union',
    sample_en: 'The second pillar is the Single Resolution Mechanism (SRM). When a bank is failing or likely to fail, the Single Resolution Board plans an orderly wind-down instead of a disorderly collapse or an automatic taxpayer bailout. The key tool is bail-in: shareholders and certain creditors absorb losses before public funds are used. Resolution funds help stabilise the process. The goal is to protect financial stability while making those who took the risk pay first.',
  },
  {
    section: 'Exam 16/06/2026 — Variant A',
    title_en: 'Third pillar of EBU',
    en: 'Describe the third pillar of the European Banking Union',
    sample_en: 'The third pillar is deposit protection through Deposit Guarantee Schemes (DGS). If a bank fails, retail depositors should still get their money back quickly, up to the legal limit — in the EU typically €100,000 per person per bank. This reduces panic withdrawals and protects small savers. National guarantee funds are financed by contributions from banks. The EU is also working toward a more integrated European Deposit Insurance Scheme (EDIS), but the third pillar is mainly about confidence: people know deposits are safe even when a bank goes into resolution.',
  },
  {
    section: 'Exam 16/06/2026 — Variant A',
    title_en: 'IPO',
    en: 'Describe IPO (Initial Public Offering)',
    sample_en: 'An IPO (Initial Public Offering) is when a company sells its shares to the public for the first time and lists on a stock exchange. The firm raises new equity capital and becomes subject to disclosure rules and market scrutiny. Investment banks usually act as underwriters — they help set the price, place shares with investors, and often guarantee a minimum take-up. After listing, the shares that outsiders can freely buy and sell make up the free float.',
  },
  // Exercises
  {
    section: 'Exercises',
    title_en: 'SoFP — smaller figures (5 pts)',
    en: 'Build Statement of Financial Position for Uniclam Group Corp. (smaller figures)',
    sample_en: 'Classify each item under non-current assets, current assets, equity, non-current liabilities, or current liabilities, then subtotal each block. Non-current assets (goodwill, intangibles, PPE) sum to 124,950; current assets (inventory, receivables, cash) to 79,900 — total assets 204,850. On the other side: equity 66,300, non-current liabilities 87,550, current liabilities 51,000 — total 204,850. Assets must equal equity plus liabilities.',
    link: '09_Statement_of_Financial_Position.html',
    link_label: 'Full solution on page 09',
  },
  {
    section: 'Exercises',
    title_en: 'SoFP — exam version (6 pts)',
    en: 'Statement of Financial Position — exam version (larger figures)',
    sample_en: 'Same logic as the smaller version, but with exam figures. Non-current assets total 374,850, current assets 239,700 — total assets 614,550. Equity 198,900, non-current liabilities 262,650, current liabilities 153,000 — total equity and liabilities 614,550. The balance must tie: Total Assets = Total Equity & Liabilities.',
    link: '09_Statement_of_Financial_Position.html',
    link_label: 'Full solution on page 09',
  },
  {
    section: 'Exercises',
    title_en: 'Division table — 2024 exam',
    en: 'Divisions A/B: revenue 108k/72k; indirect per direct labour; selling per revenue; electricity & financial per raw materials.',
    sample_en: 'First allocate shared costs using the rules given, then subtract total costs from revenue and apply 30% tax. Division A ends with net income 33,880; Division B with 14,840. The trick is not to forget any cost line and to apply each overhead to the correct base (direct labour, revenue, or raw materials).',
    howto_en: 'Step 1 — allocation rules:\n  Indirect labour → by direct labour (A:B = 12:24)\n  Selling → by revenue (A:B = 108:72)\n  Electricity & Financial → by raw materials (A:B = 12:6)\n\nStep 2 — Division A:\n  Add direct costs + allocated overheads → total costs\n  Pre-tax profit = 108,000 − total costs = 48,400\n  Tax 30% = 14,520 → Net income = 33,880\n\nStep 3 — Division B:\n  Same method → Pre-tax 21,200 → Tax 6,360 → Net 14,840',
    link: '13_Divisions_and_DCF.html',
    link_label: 'Worked example on page 13',
  },
  {
    section: 'Exercises',
    title_en: 'Division table — 2025 tablet',
    en: 'Divisions: revenue 144k/120k; indirect/selling/advertising/electricity/financial by allocation rules.',
    sample_en: 'Allocate indirect labour by direct labour, selling and advertising by revenue, electricity and financial by raw materials. Division A is profitable (net income 32,214); Division B barely breaks even (net income 126) because its costs almost match revenue. Always check that shared costs add up to the totals given before splitting.',
    howto_en: 'Division A (revenue 144,000):\n  Indirect 2,800 · Selling 13,091 · Advertising 13,636\n  Electricity 10,453 · Financial 14,000\n  Total costs 97,980 → Pre-tax 46,020 → Tax 13,806 → Net 32,214\n\nDivision B (revenue 120,000):\n  Total costs 119,820 → Pre-tax 180 → Tax 54 → Net 126',
    link: '13_Divisions_and_DCF.html',
    link_label: 'Full table on page 13',
  },
  {
    section: 'Exercises',
    title_en: 'DCF — Cassino SpA (8 pts)',
    en: 'Evaluate Cassino SpA using DCF. WACC 5%, g 1%. Cash flows 2024–2028. Complete discount coefficients, DCFs, and W.',
    sample_en: 'For each year, discount factor = 1 / (1.05)^n, then multiply by the cash flow. Sum all discounted cash flows to get enterprise value W ≈ 143,858. Each year’s contribution is roughly 24–31k after discounting; the 2028 figure is often the terminal cash flow given on the exam sheet.',
    howto_en: 'Discount factor = 1 / (1.05)^n\n\n2024 (n=1): 0.9524 × 25,000 = 23,810\n2025 (n=2): 0.9070 × 30,000 = 27,211\n2026 (n=3): 0.8638 × 35,000 = 30,234\n2027 (n=4): 0.8227 × 38,000 = 31,263\n2028 (n=5): 0.7835 × 40,000 = 31,341\n\nW = 23,810 + 27,211 + 30,234 + 31,263 + 31,341 = 143,858',
    link: '13_Divisions_and_DCF.html',
    link_label: 'Full DCF table on page 13',
  },
  {
    section: 'Exercises',
    title_en: 'Production budget — May',
    en: 'Omega: budgeted production for May? Sales May 90k, June 80k, 30% ending inventory.',
    sample_en: 'Production is not the same as sales — you must cover ending inventory and use up beginning inventory. Ending inventory for May = 30% of June sales = 24,000 units. Beginning inventory = 30% of May sales = 27,000 units. So production = 90,000 + 24,000 − 27,000 = 87,000 units.',
    howto_en: 'Formula: Production = Sales + Ending inventory − Beginning inventory\n\nEnding (May) = 30% × June sales = 0.30 × 80,000 = 24,000\nBeginning (May) = 30% × May sales = 0.30 × 90,000 = 27,000\n\nProduction = 90,000 + 24,000 − 27,000 = 87,000 units',
  },
  {
    section: 'Exercises',
    title_en: 'Depreciation — Exercise 3 (8 pts)',
    en: 'Cost $160,000, life 6 years, residual $28,000. (a) Annual charge straight-line and reducing balance 15%. (b) 6-year schedule for each method.',
    sample_en: '(a) Straight-line: spread depreciable amount evenly — (160,000 − 28,000) / 6 = $22,000 per year; after 6 years NBV equals residual $28,000. Reducing balance: each year charge 15% of the carrying value, so depreciation falls over time; year 6 NBV is about $60,344 (not equal to residual unless adjusted). (b) Build a table with cost, annual dep, accumulated dep, and NBV for each year under both methods.',
    link: '10_Depreciation.html',
    link_label: 'Full schedules on page 10',
  },
  {
    section: 'Exercises',
    title_en: 'Depreciation — straight-line schedule',
    en: 'Asset $160,000, life 6 years, residual $28,000 — build 6-year schedule (straight-line).',
    sample_en: 'Straight-line means the same depreciation every year: (160,000 − 28,000) / 6 = $22,000. Each year accumulated depreciation increases by 22,000 and NBV = cost − accumulated dep. After year 6, NBV should equal the residual value of $28,000.',
    howto_en: 'Annual dep = (160,000 − 28,000) / 6 = 22,000\n\nEach year:\n  Depreciation = 22,000\n  Accumulated dep += 22,000\n  NBV = 160,000 − Accumulated dep\n\nYear 6: NBV = 28,000 (= residual)',
    link: '10_Depreciation.html',
    link_label: 'Full table on page 10',
  },
  {
    section: 'Exercises',
    title_en: 'Depreciation — reducing balance 15%',
    en: 'Reducing balance 15% — 6-year schedule.',
    sample_en: 'Under reducing balance, depreciation = 15% × opening carrying value each year, so the charge gets smaller as the asset ages. Year 1: 160,000 × 15% = 24,000 → NBV 136,000. Continue for 6 years; year 6 NBV ≈ 60,344. Unlike straight-line, NBV does not automatically reach the $28,000 residual unless you adjust the final year.',
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
