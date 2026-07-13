/** Shared pagination snippets for AccountingBanking tests (20 items per page). */

export const PAGE_SIZE = 20;

export const PAGINATION_CSS = `
    .page-hidden { display: none !important; }
    .paginator {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin: 1rem 0;
      padding: 0.85rem 1rem;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #e8ecf1;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .paginator-top { position: sticky; top: 0; z-index: 5; }
    .paginator-info { font-weight: 600; color: #2c3e50; font-size: 0.95rem; }
    .paginator-btns { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .paginator-btns button:disabled { opacity: 0.45; cursor: not-allowed; }
`;

export const PAGINATION_JS_STANDARD = `
    const PAGE_SIZE = 20;
    let currentPage = 0;
    let paginatorTop = null;
    let paginatorBottom = null;
    let paginationLocked = false;

    function mcqPageCount() {
      return QUESTIONS.length ? Math.ceil(QUESTIONS.length / PAGE_SIZE) : 0;
    }

    function openPageCount() {
      return OPEN_ITEMS.length ? Math.ceil(OPEN_ITEMS.length / PAGE_SIZE) : 0;
    }

    function openItemPage(idx) {
      return mcqPageCount() + Math.floor(idx / PAGE_SIZE);
    }

    function totalPageCount() {
      let n = mcqPageCount();
      if (OPEN_ITEMS.length) n += openPageCount();
      if (SNA_ITEMS.length) n += 1;
      return Math.max(1, n);
    }

    function needsPagination() {
      return totalPageCount() > 1;
    }

    function pageLabel(page) {
      const mcqPages = mcqPageCount();
      if (page < mcqPages) {
        const from = page * PAGE_SIZE + 1;
        const to = Math.min((page + 1) * PAGE_SIZE, QUESTIONS.length);
        return 'Questions ' + from + '–' + to + ' · page ' + (page + 1) + ' of ' + totalPageCount();
      }
      const openStart = page - mcqPages;
      if (OPEN_ITEMS.length && page < mcqPages + openPageCount()) {
        const from = openStart * PAGE_SIZE + 1;
        const to = Math.min((openStart + 1) * PAGE_SIZE, OPEN_ITEMS.length);
        return 'Open questions ' + from + '–' + to + ' · page ' + (page + 1) + ' of ' + totalPageCount();
      }
      return 'Calculations · page ' + (page + 1) + ' of ' + totalPageCount();
    }

    function createPaginator(className) {
      const el = document.createElement('div');
      el.className = className;
      el.innerHTML = '<span class="paginator-info"></span><div class="paginator-btns">' +
        '<button type="button" class="secondary" data-nav="prev">← Previous</button>' +
        '<button type="button" class="secondary" data-nav="next">Next →</button></div>';
      el.querySelector('[data-nav="prev"]').addEventListener('click', () => goToPage(currentPage - 1));
      el.querySelector('[data-nav="next"]').addEventListener('click', () => goToPage(currentPage + 1));
      return el;
    }

    function updatePaginator() {
      const show = needsPagination() && !paginationLocked;
      [paginatorTop, paginatorBottom].forEach((p) => {
        if (!p) return;
        p.style.display = show ? '' : 'none';
        if (!show) return;
        p.querySelector('.paginator-info').textContent = pageLabel(currentPage);
        p.querySelector('[data-nav="prev"]').disabled = currentPage <= 0;
        p.querySelector('[data-nav="next"]').disabled = currentPage >= totalPageCount() - 1;
      });
      updateCheckButton();
    }

    function applyPageVisibility() {
      container.querySelectorAll('[data-page]').forEach((el) => {
        const p = Number(el.dataset.page);
        el.classList.toggle('page-hidden', paginationLocked ? false : p !== currentPage);
      });
      updatePaginator();
    }

    function goToPage(page) {
      if (paginationLocked) return;
      currentPage = Math.max(0, Math.min(totalPageCount() - 1, page));
      applyPageVisibility();
      const target = paginatorTop || container;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function setupPagination() {
      paginationLocked = false;
      currentPage = 0;
      if (paginatorTop) {
        paginatorTop.remove();
        paginatorBottom.remove();
        paginatorTop = paginatorBottom = null;
      }
      if (!needsPagination()) {
        updateCheckButton();
        return;
      }
      paginatorTop = createPaginator('paginator paginator-top');
      paginatorBottom = createPaginator('paginator paginator-bottom');
      container.before(paginatorTop);
      const actions = form.querySelector('.actions');
      form.insertBefore(paginatorBottom, actions);
      goToPage(0);
      updateCheckButton();
    }

    function showAllPages() {
      paginationLocked = true;
      applyPageVisibility();
    }

    function pageForMcqIndex(idx) {
      return Math.floor(idx / PAGE_SIZE);
    }

    function isMcqPage(page) {
      return page < mcqPageCount();
    }

    function questionsForPage(page) {
      const items = [];
      QUESTIONS.forEach((q, idx) => {
        if (pageForMcqIndex(idx) === page) items.push(q);
      });
      return items;
    }

    function questionsToCheck() {
      if (needsPagination() && isMcqPage(currentPage)) {
        return questionsForPage(currentPage);
      }
      return QUESTIONS;
    }

    function updateCheckButton() {
      const btn = form.querySelector('.actions button[type="submit"]');
      if (!btn) return;
      if (!btn.dataset.defaultLabel) btn.dataset.defaultLabel = btn.textContent;
      if (needsPagination() && isMcqPage(currentPage)) {
        btn.textContent = 'Check this page (' + questionsForPage(currentPage).length + ')';
      } else {
        btn.textContent = btn.dataset.defaultLabel;
      }
    }
`;

export const PAGINATION_JS_BLOCKS = `
    const PAGE_SIZE = 20;
    let currentPage = 0;
    let paginatorTop = null;
    let paginatorBottom = null;
    let paginationLocked = false;

    function mcqPageCount() {
      return QUESTIONS.length ? Math.ceil(QUESTIONS.length / PAGE_SIZE) : 0;
    }

    function openPageCount() {
      const n = BLOCKS.reduce((s, b) => s + (b.open ? b.open.length : 0), 0);
      return n ? Math.ceil(n / PAGE_SIZE) : 0;
    }

    function totalPageCount() {
      let n = mcqPageCount();
      if (openPageCount()) n += openPageCount();
      const sna = BLOCKS.reduce((s, b) => s + (b.sna ? b.sna.length : 0), 0);
      if (sna) n += 1;
      return Math.max(1, n);
    }

    function needsPagination() {
      return totalPageCount() > 1;
    }

    function pageLabel(page) {
      const mcqPages = mcqPageCount();
      if (page < mcqPages) {
        const from = page * PAGE_SIZE + 1;
        const to = Math.min((page + 1) * PAGE_SIZE, QUESTIONS.length);
        return 'Questions ' + from + '–' + to + ' · page ' + (page + 1) + ' of ' + totalPageCount();
      }
      const openStart = page - mcqPages;
      const openTotal = BLOCKS.reduce((s, b) => s + (b.open ? b.open.length : 0), 0);
      if (openTotal && page < mcqPages + openPageCount()) {
        const from = openStart * PAGE_SIZE + 1;
        const to = Math.min((openStart + 1) * PAGE_SIZE, openTotal);
        return 'Open questions ' + from + '–' + to + ' · page ' + (page + 1) + ' of ' + totalPageCount();
      }
      return 'Calculations · page ' + (page + 1) + ' of ' + totalPageCount();
    }

    function createPaginator(className) {
      const el = document.createElement('div');
      el.className = className;
      el.innerHTML = '<span class="paginator-info"></span><div class="paginator-btns">' +
        '<button type="button" class="secondary" data-nav="prev">← Previous</button>' +
        '<button type="button" class="secondary" data-nav="next">Next →</button></div>';
      el.querySelector('[data-nav="prev"]').addEventListener('click', () => goToPage(currentPage - 1));
      el.querySelector('[data-nav="next"]').addEventListener('click', () => goToPage(currentPage + 1));
      return el;
    }

    function updatePaginator() {
      const show = needsPagination() && !paginationLocked;
      [paginatorTop, paginatorBottom].forEach((p) => {
        if (!p) return;
        p.style.display = show ? '' : 'none';
        if (!show) return;
        p.querySelector('.paginator-info').textContent = pageLabel(currentPage);
        p.querySelector('[data-nav="prev"]').disabled = currentPage <= 0;
        p.querySelector('[data-nav="next"]').disabled = currentPage >= totalPageCount() - 1;
      });
      updateCheckButton();
    }

    function applyPageVisibility() {
      container.querySelectorAll('[data-page]').forEach((el) => {
        const p = Number(el.dataset.page);
        el.classList.toggle('page-hidden', paginationLocked ? false : p !== currentPage);
      });
      updatePaginator();
    }

    function goToPage(page) {
      if (paginationLocked) return;
      currentPage = Math.max(0, Math.min(totalPageCount() - 1, page));
      applyPageVisibility();
      const target = paginatorTop || container;
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function setupPagination() {
      paginationLocked = false;
      currentPage = 0;
      if (paginatorTop) {
        paginatorTop.remove();
        paginatorBottom.remove();
        paginatorTop = paginatorBottom = null;
      }
      if (!needsPagination()) {
        updateCheckButton();
        return;
      }
      paginatorTop = createPaginator('paginator paginator-top');
      paginatorBottom = createPaginator('paginator paginator-bottom');
      container.before(paginatorTop);
      const actions = form.querySelector('.actions');
      form.insertBefore(paginatorBottom, actions);
      goToPage(0);
      updateCheckButton();
    }

    function showAllPages() {
      paginationLocked = true;
      applyPageVisibility();
    }

    function pageForMcqIndex(idx) {
      return Math.floor(idx / PAGE_SIZE);
    }

    function isMcqPage(page) {
      return page < mcqPageCount();
    }

    function questionsForPage(page) {
      const items = [];
      QUESTIONS.forEach((q, idx) => {
        if (pageForMcqIndex(idx) === page) items.push(q);
      });
      return items;
    }

    function questionsToCheck() {
      if (needsPagination() && isMcqPage(currentPage)) {
        return questionsForPage(currentPage);
      }
      return QUESTIONS;
    }

    function updateCheckButton() {
      const btn = form.querySelector('.actions button[type="submit"]');
      if (!btn) return;
      if (!btn.dataset.defaultLabel) btn.dataset.defaultLabel = btn.textContent;
      if (needsPagination() && isMcqPage(currentPage)) {
        btn.textContent = 'Check this page (' + questionsForPage(currentPage).length + ')';
      } else {
        btn.textContent = btn.dataset.defaultLabel;
      }
    }

    let openGlobalIdx = 0;
    function nextOpenPage() {
      const p = mcqPageCount() + Math.floor(openGlobalIdx / PAGE_SIZE);
      openGlobalIdx++;
      return p;
    }
    function resetOpenPageCounter() {
      openGlobalIdx = 0;
    }
`;

function normalizeEol(html) {
  const eol = html.includes('\r\n') ? '\r\n' : '\n';
  return { html: html.replace(/\r\n/g, '\n'), eol };
}

function restoreEol(html, eol) {
  return eol === '\r\n' ? html.replace(/\n/g, '\r\n') : html;
}

export function applyStandardPagination(html) {
  if (html.includes('const PAGE_SIZE = 20;')) return html;
  if (!html.includes('function renderQuestions()')) return html;

  const { html: norm, eol } = normalizeEol(html);

  let out = norm;
  if (!out.includes('.paginator-top')) {
    out = out.replace('</style>', `${PAGINATION_CSS}  </style>`);
  }
  out = out.replace(
    "const resultsBox = document.getElementById('results');\n",
    `const resultsBox = document.getElementById('results');\n${PAGINATION_JS_STANDARD}\n`,
  );
  if (out.includes('QUESTIONS.forEach((q) => {')) {
    out = out.replace('QUESTIONS.forEach((q) => {', 'QUESTIONS.forEach((q, idx) => {');
  }
  out = out.replace(
    `          h.className = 'section-title';
          h.textContent = q.section;
          container.appendChild(h);`,
    `          h.className = 'section-title';
          h.dataset.page = String(pageForMcqIndex(idx));
          h.textContent = q.section;
          container.appendChild(h);`,
  );
  out = out.replace(
    `        card.dataset.id = q.id;
        card.innerHTML`,
    `        card.dataset.id = q.id;
        card.dataset.page = String(pageForMcqIndex(idx));
        card.innerHTML`,
  );
  out = out.replace(
    `          h.className = 'section-title';
          h.textContent = sec;
          container.appendChild(h);
        }
        const block = document.createElement('div');
        block.className = 'open-block';`,
    `          h.className = 'section-title';
          h.dataset.page = String(openItemPage(idx));
          h.textContent = sec;
          container.appendChild(h);
        }
        const block = document.createElement('div');
        block.className = 'open-block';
        block.dataset.page = String(openItemPage(idx));`,
  );
  out = out.replace(
    `      h.className = 'section-title';
      h.textContent = 'SNA — calculations';
      container.appendChild(h);
      SNA_ITEMS.forEach((item, idx) => {
        const block = document.createElement('div');
        block.className = 'open-block';`,
    `      h.className = 'section-title';
      h.dataset.page = String(mcqPageCount() + openPageCount());
      h.textContent = 'SNA — calculations';
      container.appendChild(h);
      SNA_ITEMS.forEach((item, idx) => {
        const block = document.createElement('div');
        block.className = 'open-block';
        block.dataset.page = String(mcqPageCount() + openPageCount());`,
  );
  out = out.replace(
    `        const first = container.querySelector('.q.unanswered');
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });`,
    `        const first = container.querySelector('.q.unanswered');
        if (first) {
          const p = Number(first.dataset.page);
          if (!isNaN(p)) goToPage(p);
          first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }`,
  );
  if (!out.includes('if (checkingAll) showAllPages()')) {
    out = out.replace(
      `      resultsBox.classList.add('visible');
      resultsBox.scrollIntoView({ behavior: 'smooth', block: 'start' });`,
      `      if (checkingAll) showAllPages();
      resultsBox.classList.add('visible');
      resultsBox.scrollIntoView({ behavior: 'smooth', block: 'start' });`,
    );
  }
  out = out.replace(
    `    renderQuestions();
    renderOpen();
    renderSna();
    `,
    `    renderQuestions();
    renderOpen();
    renderSna();
    setupPagination();
    `,
  );
  out = out.replace(
    `      renderQuestions();
      renderOpen();
      renderSna();
      `,
    `      renderQuestions();
      renderOpen();
      renderSna();
      setupPagination();
      `,
  );

  return out.includes('const PAGE_SIZE = 20;') ? restoreEol(out, eol) : html;
}

export function applyBlocksPagination(html) {
  if (html.includes('const PAGE_SIZE = 20;')) return html;
  if (!html.includes('function renderAll()')) return html;

  const { html: norm, eol } = normalizeEol(html);
  let out = norm;

  if (!out.includes('.paginator-top')) {
    out = out.replace('</style>', `${PAGINATION_CSS}  </style>`);
  }
  out = out.replace(
    "const resultsBox = document.getElementById('results');\n",
    `const resultsBox = document.getElementById('results');\n${PAGINATION_JS_BLOCKS}\n`,
  );
  out = out.replace(
    `    function renderOpenItems(items, slug) {
      if (!items.length) return;
      let openSection = '';
      items.forEach((item, idx) => {`,
    `    function renderOpenItems(items, slug) {
      if (!items.length) return;
      let openSection = '';
      items.forEach((item, idx) => {
        const openPage = nextOpenPage();`,
  );
  out = out.replace(
    `          h.className = 'section-title';
          h.textContent = sec;
          container.appendChild(h);
        }
        const block = document.createElement('div');
        block.className = 'open-block';
        const brief = item.sample_en || '';`,
    `          h.className = 'section-title';
          h.dataset.page = String(openPage);
          h.textContent = sec;
          container.appendChild(h);
        }
        const block = document.createElement('div');
        block.className = 'open-block';
        block.dataset.page = String(openPage);
        const brief = item.sample_en || '';`,
  );
  out = out.replace(
    `    function renderAll() {
      container.innerHTML = '';
      BLOCKS.forEach(block => {`,
    `    function renderAll() {
      container.innerHTML = '';
      resetOpenPageCounter();
      let globalMcqIdx = 0;
      BLOCKS.forEach(block => {`,
  );
  out = out.replace(
    `        const header = document.createElement('div');
        header.className = 'block-header';
        header.id = 'block-' + block.slug;
        header.innerHTML = '<h2>' + block.title + '</h2><p>' + block.desc + '</p>';
        container.appendChild(header);`,
    `        const header = document.createElement('div');
        header.className = 'block-header';
        header.id = 'block-' + block.slug;
        header.innerHTML = '<h2>' + block.title + '</h2><p>' + block.desc + '</p>';
        header.dataset.page = String(pageForMcqIndex(globalMcqIdx));
        container.appendChild(header);`,
  );
  out = out.replace(
    `        if (block.extra) {
          const extra = document.createElement('div');
          extra.className = 'block-extra';
          extra.innerHTML = block.extra;`,
    `        if (block.extra) {
          const extra = document.createElement('div');
          extra.className = 'block-extra';
          extra.dataset.page = String(pageForMcqIndex(globalMcqIdx));
          extra.innerHTML = block.extra;`,
  );
  out = out.replace(
    `        let currentSection = '';
        block.questions.forEach(q => {`,
    `        let currentSection = '';
        block.questions.forEach(q => {
          const mcqPage = pageForMcqIndex(globalMcqIdx);`,
  );
  out = out.replace(
    `            h.className = 'section-title';
            h.textContent = q.section;
            container.appendChild(h);
          }
          const card = document.createElement('div');
          card.className = 'q';
          card.dataset.id = q.id;`,
    `            h.className = 'section-title';
            h.dataset.page = String(mcqPage);
            h.textContent = q.section;
            container.appendChild(h);
          }
          const card = document.createElement('div');
          card.className = 'q';
          card.dataset.id = q.id;
          card.dataset.page = String(mcqPage);`,
  );
  out = out.replace(
    `          container.appendChild(card);
        });

        renderOpenItems(block.open, block.slug);`,
    `          container.appendChild(card);
          globalMcqIdx++;
        });

        renderOpenItems(block.open, block.slug);`,
  );
  out = out.replace(
    `          h.className = 'section-title';
          h.textContent = 'SNA — calculations';
          container.appendChild(h);
          block.sna.forEach((item, idx) => {
            const el = document.createElement('div');
            el.className = 'open-block';`,
    `          h.className = 'section-title';
          h.dataset.page = String(mcqPageCount() + openPageCount());
          h.textContent = 'SNA — calculations';
          container.appendChild(h);
          block.sna.forEach((item, idx) => {
            const el = document.createElement('div');
            el.className = 'open-block';
            el.dataset.page = String(mcqPageCount() + openPageCount());`,
  );
  out = out.replace(
    `        }
      });
    }

    function normalize(val) {`,
    `        }
      });
      setupPagination();
    }

    function normalize(val) {`,
  );
  out = out.replace(
    `        const first = container.querySelector('.q.unanswered');
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });`,
    `        const first = container.querySelector('.q.unanswered');
        if (first) {
          const p = Number(first.dataset.page);
          if (!isNaN(p)) goToPage(p);
          first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }`,
  );
  if (!out.includes('if (checkingAll) showAllPages()')) {
    out = out.replace(
      `      resultsBox.classList.add('visible');
      resultsBox.scrollIntoView({ behavior: 'smooth', block: 'start' });`,
      `      if (checkingAll) showAllPages();
      resultsBox.classList.add('visible');
      resultsBox.scrollIntoView({ behavior: 'smooth', block: 'start' });`,
    );
  }

  return out.includes('const PAGE_SIZE = 20;') ? restoreEol(out, eol) : html;
}
