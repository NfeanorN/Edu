#!/usr/bin/env node
/** Patch tests: check current page only when paginated. */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

const PAGE_CHECK_HELPERS = `
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

function patch(html) {
  if (html.includes('function questionsToCheck()')) return null;
  if (!html.includes('const PAGE_SIZE = 20;')) return null;

  const eol = html.includes('\r\n') ? '\r\n' : '\n';
  html = html.replace(/\r\n/g, '\n');

  html = html.replace(
    `    function pageForMcqIndex(idx) {
      return Math.floor(idx / PAGE_SIZE);
    }

    let openGlobalIdx = 0;`,
    `    function pageForMcqIndex(idx) {
      return Math.floor(idx / PAGE_SIZE);
    }
${PAGE_CHECK_HELPERS}
    let openGlobalIdx = 0;`,
  );

  html = html.replace(
    `    function pageForMcqIndex(idx) {
      return Math.floor(idx / PAGE_SIZE);
    }


    function renderQuestions()`,
    `    function pageForMcqIndex(idx) {
      return Math.floor(idx / PAGE_SIZE);
    }
${PAGE_CHECK_HELPERS}
    function renderQuestions()`,
  );

  html = html.replace(
    `        p.querySelector('[data-nav="next"]').disabled = currentPage >= totalPageCount() - 1;
      });
    }

    function applyPageVisibility()`,
    `        p.querySelector('[data-nav="next"]').disabled = currentPage >= totalPageCount() - 1;
      });
      updateCheckButton();
    }

    function applyPageVisibility()`,
  );

  html = html.replace(
    `      if (!needsPagination()) return;
      paginatorTop = createPaginator('paginator paginator-top');
      paginatorBottom = createPaginator('paginator paginator-bottom');
      container.before(paginatorTop);
      const actions = form.querySelector('.actions');
      form.insertBefore(paginatorBottom, actions);
      goToPage(0);
    }`,
    `      if (!needsPagination()) {
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
    }`,
  );

  // Standard submit (template literals)
  html = html.replace(
    `      const warnEl = document.getElementById('warn-text');

      QUESTIONS.forEach((q, idx) => {`,
    `      const warnEl = document.getElementById('warn-text');
      const toCheck = questionsToCheck();
      const checkingAll = toCheck.length === QUESTIONS.length;

      toCheck.forEach((q, idx) => {`,
  );

  html = html.replace(
    `      const warnEl = document.getElementById('warn-text');

      QUESTIONS.forEach((q) => {`,
    `      const warnEl = document.getElementById('warn-text');
      const toCheck = questionsToCheck();
      const checkingAll = toCheck.length === QUESTIONS.length;

      toCheck.forEach((q) => {`,
  );

  html = html.replace(
    `        warnEl.textContent = \`Answer all MCQ questions (\${unanswered} unanswered).\`;`,
    `        warnEl.textContent = checkingAll
          ? \`Answer all MCQ questions (\${unanswered} unanswered).\`
          : \`Answer all questions on this page (\${unanswered} unanswered).\`;`,
  );

  html = html.replace(
    `      warnEl.hidden = true;

      QUESTIONS.forEach((q, idx) => {`,
    `      warnEl.hidden = true;

      toCheck.forEach((q, idx) => {`,
  );

  html = html.replace(
    `      warnEl.hidden = true;

      QUESTIONS.forEach((q) => {`,
    `      warnEl.hidden = true;

      toCheck.forEach((q) => {`,
  );

  html = html.replace(
    `      const total = QUESTIONS.length;
      let score = correct * SCORING.correct + wrong * SCORING.wrong;`,
    `      const total = checkingAll ? QUESTIONS.length : toCheck.length;
      let score = correct * SCORING.correct + wrong * SCORING.wrong;`,
  );

  html = html.replace(
    `      document.getElementById('score-text').textContent =
        \`Score: \${correct} of \${total} (\${Math.round(correct/total*100)}%)\`;`,
    `      document.getElementById('score-text').textContent = checkingAll
        ? \`Score: \${correct} of \${total} (\${Math.round(correct/total*100)}%)\`
        : \`This page: \${correct} of \${total} (\${Math.round(correct/total*100)}%)\`;`,
  );

  // Blocks submit (string concat)
  html = html.replace(
    `      const warnEl = document.getElementById('warn-text');

      QUESTIONS.forEach((q) => {
        const card = container.querySelector('[data-id="' + q.id + '"]');`,
    `      const warnEl = document.getElementById('warn-text');
      const toCheck = questionsToCheck();
      const checkingAll = toCheck.length === QUESTIONS.length;

      toCheck.forEach((q) => {
        const card = container.querySelector('[data-id="' + q.id + '"]');`,
  );

  html = html.replace(
    `        warnEl.textContent = 'Answer all MCQ questions (' + unanswered + ' unanswered).';`,
    `        warnEl.textContent = checkingAll
          ? 'Answer all MCQ questions (' + unanswered + ' unanswered).'
          : 'Answer all questions on this page (' + unanswered + ' unanswered).';`,
  );

  html = html.replace(
    `      warnEl.hidden = true;

      QUESTIONS.forEach((q) => {
        const card = container.querySelector('[data-id="' + q.id + '"]');
        const selected = form.querySelector('input[name="' + q.id + '"]:checked');
        const fb = card.querySelector('.feedback');
        const sc = q._scoring`,
    `      warnEl.hidden = true;

      toCheck.forEach((q) => {
        const card = container.querySelector('[data-id="' + q.id + '"]');
        const selected = form.querySelector('input[name="' + q.id + '"]:checked');
        const fb = card.querySelector('.feedback');
        const sc = q._scoring`,
  );

  html = html.replace(
    `      const total = QUESTIONS.length;
      document.getElementById('score-text').textContent =
        'Score: ' + correct + ' of ' + total + ' (' + Math.round(correct / total * 100) + '%)';`,
    `      const total = checkingAll ? QUESTIONS.length : toCheck.length;
      document.getElementById('score-text').textContent = checkingAll
        ? 'Score: ' + correct + ' of ' + total + ' (' + Math.round(correct / total * 100) + '%)'
        : 'This page: ' + correct + ' of ' + total + ' (' + Math.round(correct / total * 100) + '%)';`,
  );

  html = html.replace(
    `      showAllPages();
      resultsBox.classList.add('visible');`,
    `      if (checkingAll) showAllPages();
      resultsBox.classList.add('visible');`,
  );

  if (!html.includes('function questionsToCheck()')) return null;
  if (eol === '\r\n') html = html.replace(/\n/g, '\r\n');
  return html;
}

const skip = new Set(['index.html', '00_How_To_Solve.html', '13_Divisions_and_DCF.html']);
let n = 0;
for (const name of readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
  if (skip.has(name)) continue;
  const path = join(ROOT, name);
  const next = patch(readFileSync(path, 'utf8'));
  if (!next) { console.log('skip', name); continue; }
  writeFileSync(path, next, 'utf8');
  n++;
  console.log('patched', name);
}
console.log('done:', n);
