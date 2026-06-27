import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { BANK, SECTIONS } from "./di_practice_bank.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, "05_DI_Practice_Mega.html");

const questionsJson = JSON.stringify(
  BANK.map((q, i) => ({
    num: i + 1,
    id: "p" + (i + 1),
    section: q.section,
    en: q.en,
    options: q.options.map((o) => ({ id: o.id, en: o.en })),
    correct: q.correct,
    tip: q.tip || "",
  }))
);

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Digital Innovation — Practice Mega (${BANK.length} MCQ)</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: "Segoe UI", system-ui, sans-serif;
      line-height: 1.65;
      margin: 0;
      padding: 2rem 1rem 3rem;
      color: #1a1a2e;
      background: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);
      min-height: 100vh;
    }
    .wrap { max-width: 900px; margin: 0 auto; }
    .back { margin-bottom: 1rem; }
    .back a { color: #7b4397; text-decoration: none; }
    .back a:hover { text-decoration: underline; }
    h1 {
      color: #2c3e50;
      border-bottom: 4px solid #7b4397;
      padding-bottom: 12px;
      font-size: 1.75rem;
    }
    .sub { color: #555; margin: 0.5rem 0 1rem; }
    .rules {
      background: #fff;
      border-left: 4px solid #7b4397;
      padding: 1rem 1.25rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
      font-size: 0.95rem;
    }
    .modes {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin: 1rem 0;
    }
    .mode-btn {
      background: #fff;
      border: 2px solid #e0e6ed;
      color: #2c3e50;
      padding: 0.5rem 0.9rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .mode-btn.active { border-color: #7b4397; background: #f8f5fc; color: #7b4397; }
    .filter-row {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
      align-items: center;
    }
    .filter-row select {
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      border: 1px solid #ddd;
      font-size: 0.95rem;
      min-width: 200px;
    }
    .section-title {
      font-size: 1.1rem;
      color: #7b4397;
      margin: 1.75rem 0 0.75rem;
      font-weight: 600;
    }
    .q {
      background: #fff;
      border-radius: 10px;
      padding: 1.1rem 1.25rem;
      margin: 1rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
      border: 1px solid #e8ecf1;
    }
    .q.unanswered { border-color: #e74c3c; }
    .q.correct { border-color: #27ae60; background: #f6fff9; }
    .q.wrong { border-color: #e74c3c; background: #fff8f8; }
    .q-num { font-weight: 700; color: #7b4397; margin-bottom: 0.35rem; font-size: 0.9rem; }
    .q-tag { font-size: 0.75rem; color: #888; font-weight: 500; }
    .q-en { font-size: 1.02rem; margin-bottom: 0.75rem; }
    .opts { display: grid; gap: 0.45rem; }
    label.opt {
      display: flex;
      gap: 0.55rem;
      align-items: flex-start;
      padding: 0.45rem 0.55rem;
      border-radius: 6px;
      cursor: pointer;
    }
    label.opt:hover { background: #f3f0f7; }
    .result-opt { cursor: default; }
    label.opt input { margin-top: 0.25rem; flex-shrink: 0; }
    .opt-en { font-size: 0.95rem; }
    .feedback {
      margin-top: 0.75rem;
      padding: 0.65rem 0.85rem;
      border-radius: 6px;
      font-size: 0.92rem;
    }
    .feedback.ok { background: #e8f8ef; color: #1e7e45; }
    .feedback.bad { background: #fdecea; color: #c0392b; }
    .tip { margin-top: 0.4rem; font-size: 0.88rem; color: #555; font-style: italic; }
    .actions {
      position: sticky;
      bottom: 0;
      background: rgba(245,247,250,.95);
      backdrop-filter: blur(6px);
      padding: 1rem 0;
      margin-top: 1.5rem;
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: center;
    }
    button {
      background: #7b4397;
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 600;
    }
    button:hover { background: #6a3784; }
    button.secondary {
      background: #fff;
      color: #7b4397;
      border: 2px solid #7b4397;
    }
    #results {
      display: none;
      background: #fff;
      border-radius: 12px;
      padding: 1.25rem 1.5rem;
      margin-top: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,.1);
      border: 2px solid #7b4397;
    }
    #results.visible { display: block; }
    .score { font-size: 1.35rem; font-weight: 700; color: #2c3e50; }
    .score-detail { color: #555; margin-top: 0.35rem; }
    .warn { color: #e74c3c; font-weight: 600; margin-top: 0.5rem; }
    mark.correct-mark { background: #d5f5e3; padding: 0 4px; border-radius: 3px; }
    mark.wrong-mark { background: #fadbd8; padding: 0 4px; border-radius: 3px; }
    #q-count { font-weight: 600; color: #7b4397; }
    .hidden { display: none !important; }
  </style>
</head>
<body>
  <div class="wrap">
    <p class="back">
      <a href="index.html">← HRM tests</a> ·
      <a href="03_Digital_Innovation_Exam_CFU6.html">Exam CFU 6</a> ·
      <a href="04_DI_Authors_Study.html">Authors</a>
    </p>
    <h1>Digital Innovation — Practice Mega</h1>
    <p class="sub">${BANK.length} MCQ · exam topics + authors · shuffle & exam mode</p>
    <div class="rules">
      <strong>How to study:</strong> Start with <em>Exam mode (14 random)</em> — same length as the real test.
      Scoring like exam: +1 / −0.2. Wrong answers show a memory tip.
      Topics: AI, TAM/Rogers, value models, blockchain, platforms, BPM, Onlife, design/startup, tech basics.
    </div>

    <div class="modes">
      <button type="button" class="mode-btn active" data-mode="all">All ${BANK.length}</button>
      <button type="button" class="mode-btn" data-mode="exam14">Exam mode (14 random)</button>
      <button type="button" class="mode-btn" data-mode="exam20">Sprint (20 random)</button>
      <button type="button" class="mode-btn" data-mode="weak">Only wrong (after check)</button>
    </div>

    <div class="filter-row">
      <label>Topic filter:
        <select id="topic-filter">
          <option value="">All topics</option>
          ${SECTIONS.map((s) => `<option value="${s.replace(/"/g, "&quot;")}">${s}</option>`).join("")}
        </select>
      </label>
      <span id="q-count">Showing: ${BANK.length} questions</span>
    </div>

    <form id="test-form">
      <div id="questions"></div>
      <div class="actions">
        <button type="submit">Check answers</button>
        <button type="button" class="secondary" id="shuffle-btn">Shuffle & new set</button>
        <button type="button" class="secondary" id="reset-btn">Reset</button>
      </div>
    </form>
    <div id="results">
      <div class="score" id="score-text"></div>
      <p class="score-detail" id="score-detail"></p>
      <p class="warn" id="warn-text" hidden></p>
    </div>
  </div>
  <script>
    const SCORING = { correct: 1, wrong: -0.2, max: null };
    const ALL_QUESTIONS = ${questionsJson};
    let activeQuestions = [...ALL_QUESTIONS];
    let currentMode = "all";
    let wrongIds = new Set();
    let checked = false;

    const form = document.getElementById("test-form");
    const container = document.getElementById("questions");
    const resultsBox = document.getElementById("results");

    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function pickQuestions() {
      const topic = document.getElementById("topic-filter").value;
      let pool = topic ? ALL_QUESTIONS.filter((q) => q.section === topic) : [...ALL_QUESTIONS];

      if (currentMode === "exam14") {
        pool = shuffle(pool).slice(0, Math.min(14, pool.length));
      } else if (currentMode === "exam20") {
        pool = shuffle(pool).slice(0, Math.min(20, pool.length));
      } else if (currentMode === "weak") {
        if (!checked || wrongIds.size === 0) {
          pool = shuffle([...ALL_QUESTIONS]).slice(0, 14);
        } else {
          pool = ALL_QUESTIONS.filter((q) => wrongIds.has(q.id));
        }
      }

      activeQuestions = pool.map((q, i) => ({ ...q, displayNum: i + 1 }));
      document.getElementById("q-count").textContent =
        "Showing: " + activeQuestions.length + " questions" +
        (topic ? " · " + topic : "") +
        (currentMode === "exam14" ? " · exam mode" : currentMode === "exam20" ? " · sprint" : "");
      renderQuestions();
      resultsBox.classList.remove("visible");
      document.getElementById("warn-text").hidden = true;
      checked = false;
    }

    function renderQuestions() {
      container.innerHTML = "";
      let currentSection = "";
      activeQuestions.forEach((q) => {
        if (q.section && q.section !== currentSection) {
          currentSection = q.section;
          const h = document.createElement("div");
          h.className = "section-title";
          h.textContent = currentSection;
          container.appendChild(h);
        }
        const card = document.createElement("div");
        card.className = "q";
        card.dataset.id = q.id;
        card.innerHTML = \`
          <div class="q-num">Question \${q.displayNum} <span class="q-tag">· \${q.section}</span></div>
          <div class="q-en">\${q.en}</div>
          <div class="opts">
            \${q.options.map((o) => \`
              <label class="opt">
                <input type="radio" name="\${q.id}" value="\${o.id}" />
                <span class="opt-en"><strong>\${o.id.toUpperCase()})</strong> \${o.en}</span>
              </label>\`).join("")}
          </div>
          <div class="feedback" hidden></div>\`;
        container.appendChild(card);
      });
    }

    document.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentMode = btn.dataset.mode;
        pickQuestions();
      });
    });

    document.getElementById("topic-filter").addEventListener("change", pickQuestions);
    document.getElementById("shuffle-btn").addEventListener("click", pickQuestions);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let unanswered = 0;
      let correct = 0;
      let wrong = 0;
      wrongIds = new Set();
      const warnEl = document.getElementById("warn-text");

      activeQuestions.forEach((q) => {
        const card = container.querySelector('[data-id="' + q.id + '"]');
        const selected = form.querySelector('input[name="' + q.id + '"]:checked');
        card.classList.remove("unanswered", "correct", "wrong");
        const fb = card.querySelector(".feedback");
        fb.hidden = true;
        fb.innerHTML = "";
        card.querySelectorAll("label.opt").forEach((lbl) => {
          lbl.classList.remove("result-opt");
          lbl.style.background = "";
          lbl.querySelector("input").disabled = false;
        });
        if (!selected) {
          unanswered++;
          card.classList.add("unanswered");
        }
      });

      if (unanswered > 0) {
        resultsBox.classList.remove("visible");
        warnEl.hidden = false;
        warnEl.textContent = "Answer all questions (" + unanswered + " unanswered).";
        const first = container.querySelector(".q.unanswered");
        if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      warnEl.hidden = true;
      checked = true;

      activeQuestions.forEach((q) => {
        const card = container.querySelector('[data-id="' + q.id + '"]');
        const selected = form.querySelector('input[name="' + q.id + '"]:checked');
        const fb = card.querySelector(".feedback");
        fb.hidden = false;
        const ok = selected.value === q.correct;
        if (ok) {
          correct++;
          card.classList.add("correct");
          fb.className = "feedback ok";
          fb.innerHTML = "✓ Correct" + (q.tip ? '<div class="tip">' + q.tip + "</div>" : "");
        } else {
          wrong++;
          wrongIds.add(q.id);
          card.classList.add("wrong");
          fb.className = "feedback bad";
          fb.innerHTML =
            '✗ Wrong. Yours: <mark class="wrong-mark">' + selected.value.toUpperCase() +
            '</mark>. Correct: <mark class="correct-mark">' + q.correct.toUpperCase() + '</mark>' +
            (q.tip ? '<div class="tip">' + q.tip + '</div>' : '');
        }
        card.querySelectorAll("label.opt").forEach((lbl) => {
          const inp = lbl.querySelector("input");
          lbl.classList.add("result-opt");
          if (inp.value === q.correct) lbl.style.background = "#e8f8ef";
          if (inp.checked && inp.value !== q.correct) lbl.style.background = "#fdecea";
          inp.disabled = true;
        });
      });

      const total = activeQuestions.length;
      let score = correct * SCORING.correct + wrong * SCORING.wrong;
      const examStyle = currentMode === "exam14" || total === 14;
      if (examStyle) score = Math.max(0, Math.min(14, score));

      document.getElementById("score-text").textContent =
        "Result: " + correct + " / " + total + " (" + Math.round((correct / total) * 100) + "%)";
      document.getElementById("score-detail").textContent =
        "Points: " + score.toFixed(1) + " · Correct: " + correct + " · Wrong: " + wrong +
        (examStyle ? " · Exam scale (max 14)" : "");

      resultsBox.classList.add("visible");
      resultsBox.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.getElementById("reset-btn").addEventListener("click", () => {
      form.reset();
      resultsBox.classList.remove("visible");
      document.getElementById("warn-text").hidden = true;
      wrongIds = new Set();
      checked = false;
      pickQuestions();
    });

    pickQuestions();
  </script>
</body>
</html>`;

writeFileSync(out, html, "utf8");
console.log("Wrote", out, "—", BANK.length, "questions");
