import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { SETS, ALL_PHOTO_STYLE } from "./di_exam_photo_bank.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, "06_DI_Exam_Photo_Style.html");

const setsJson = JSON.stringify(
  SETS.map((s) => ({
    id: s.id,
    label: s.label,
    questions: s.questions.map((q, i) => ({
      num: i + 1,
      id: s.id + "_q" + (i + 1),
      en: q.en,
      ru: q.ru,
      options: q.options,
      correct: q.correct,
      tip: q.tip || "",
    })),
  }))
);

const trapJson = JSON.stringify(
  ALL_PHOTO_STYLE.map((q, i) => ({
    num: i + 1,
    id: "trap_" + (i + 1),
    en: q.en,
    ru: q.ru,
    options: q.options,
    correct: q.correct,
    tip: q.tip || "",
  }))
);

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Digital Innovation — Exam Photo Style</title>
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
    .wrap { max-width: 860px; margin: 0 auto; }
    .back { margin-bottom: 1rem; }
    .back a { color: #7b4397; text-decoration: none; }
    .back a:hover { text-decoration: underline; }
    h1 { color: #2c3e50; border-bottom: 4px solid #7b4397; padding-bottom: 12px; font-size: 1.75rem; }
    .sub { color: #555; margin: 0.5rem 0 1rem; }
    .rules {
      background: #fff; border-left: 4px solid #7b4397; padding: 1rem 1.25rem;
      border-radius: 8px; margin-bottom: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,.08); font-size: 0.95rem;
    }
    .set-row { margin: 1rem 0; display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }
    .set-row select { padding: 0.55rem 0.75rem; border-radius: 8px; border: 1px solid #ddd; font-size: 0.95rem; min-width: 280px; }
    .exam-photo { max-width: 100%; margin: 1rem 0 1.5rem; }
    .exam-photo img { width: 100%; height: auto; border-radius: 8px; border: 1px solid #e8ecf1; display: block; }
    .exam-photo figcaption { font-size: 0.85rem; color: #666; margin-top: 0.5rem; text-align: center; }
    .q {
      background: #fff; border-radius: 10px; padding: 1.1rem 1.25rem; margin: 1rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,.08); border: 1px solid #e8ecf1;
    }
    .q.unanswered { border-color: #e74c3c; }
    .q.correct { border-color: #27ae60; background: #f6fff9; }
    .q.wrong { border-color: #e74c3c; background: #fff8f8; }
    .q-num { font-weight: 700; color: #7b4397; margin-bottom: 0.35rem; }
    .q-en { font-size: 1.02rem; margin-bottom: 0.35rem; }
    .q-ru { font-size: 0.88rem; color: #666; margin-bottom: 0.75rem; font-style: italic; }
    .opts { display: grid; gap: 0.45rem; }
    label.opt {
      display: flex; gap: 0.55rem; align-items: flex-start; padding: 0.45rem 0.55rem;
      border-radius: 6px; cursor: pointer;
    }
    label.opt:hover { background: #f3f0f7; }
    .result-opt { cursor: default; }
    label.opt input { margin-top: 0.25rem; flex-shrink: 0; }
    .opt-en { font-size: 0.95rem; }
    .opt-ru { font-size: 0.82rem; color: #777; }
    .feedback { margin-top: 0.75rem; padding: 0.65rem 0.85rem; border-radius: 6px; font-size: 0.92rem; }
    .feedback.ok { background: #e8f8ef; color: #1e7e45; }
    .feedback.bad { background: #fdecea; color: #c0392b; }
    .tip { margin-top: 0.4rem; font-size: 0.88rem; color: #555; }
    .actions {
      position: sticky; bottom: 0; background: rgba(245,247,250,.95); backdrop-filter: blur(6px);
      padding: 1rem 0; margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;
    }
    button {
      background: #7b4397; color: #fff; border: none; padding: 0.75rem 1.5rem;
      border-radius: 8px; font-size: 1rem; cursor: pointer; font-weight: 600;
    }
    button:hover { background: #6a3784; }
    button.secondary { background: #fff; color: #7b4397; border: 2px solid #7b4397; }
    #results {
      display: none; background: #fff; border-radius: 12px; padding: 1.25rem 1.5rem;
      margin-top: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,.1); border: 2px solid #7b4397;
    }
    #results.visible { display: block; }
    .score { font-size: 1.35rem; font-weight: 700; color: #2c3e50; }
    .score-detail { color: #555; margin-top: 0.35rem; }
    .warn { color: #e74c3c; font-weight: 600; margin-top: 0.5rem; }
    mark.correct-mark { background: #d5f5e3; padding: 0 4px; border-radius: 3px; }
    mark.wrong-mark { background: #fadbd8; padding: 0 4px; border-radius: 3px; }
  </style>
</head>
<body>
  <div class="wrap">
    <p class="back">
      <a href="index.html">← HRM tests</a> ·
      <a href="03_Digital_Innovation_Exam_CFU6.html">Exam CFU 6</a> ·
      <a href="05_DI_Practice_Mega.html">Practice mega</a>
    </p>
    <h1>Digital Innovation — Exam Photo Style</h1>
    <p class="sub">5 exam sets · exact photo wording · PDF variant · +1 / −0.2</p>
    <div class="rules">
      <strong>Как на бланке:</strong> длинные формулировки, варианты a–f, «None of the previous answers».
      Начни с <em>Set 6 — MVP definition</em> или <em>Set 2</em> (Q9–14 с фото).
    </div>
    <div class="study-box" style="background:#fff;border-radius:10px;padding:1rem 1.2rem;margin:1rem 0;border:1px solid #e8ecf1">
      <h2 style="font-size:1rem;color:#7b4397;margin:0 0 0.5rem">Lean Startup — MVP (Eric Ries)</h2>
      <p style="margin:0.35rem 0;font-size:0.92rem"><strong>EN:</strong> A version of a new product that allows a team to collect the <em>maximum amount of validated learning</em> about customers with the <em>least effort</em>.</p>
      <p style="margin:0.35rem 0;font-size:0.88rem;color:#666"><strong>RU:</strong> Версия нового продукта для максимума validated learning о клиентах с минимальными усилиями. Не эскиз · не опрос конкурентов · не полный продукт.</p>
      <p style="margin:0.5rem 0 0;font-size:0.85rem;color:#555">Фото Q10 → <strong>C</strong>. Страница 03 Q10 → <strong>F</strong> (другие варианты ответов).</p>
    </div>

    <figure class="exam-photo">
      <img src="images/exam-di-cfu6-open.png" alt="DI CFU 6 exam photo" />
      <figcaption>Бланк экзамена DI CFU 6 — Key A (вопросы 9–15)</figcaption>
    </figure>

    <div class="set-row">
      <label>Test set:
        <select id="set-picker"></select>
      </label>
      <button type="button" class="secondary" id="shuffle-set">Shuffle options</button>
      <button type="button" class="secondary" id="random-trap">Random 14 traps</button>
    </div>

    <form id="test-form">
      <div id="questions"></div>
      <div class="actions">
        <button type="submit">Check answers</button>
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
    const SCORING = { correct: 1, wrong: -0.2, max: 14 };
    const SETS = ${setsJson};
    const TRAP_POOL = ${trapJson};

    let activeQuestions = SETS[0].questions;
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

    function fillSetPicker() {
      const sel = document.getElementById("set-picker");
      sel.innerHTML = SETS.map((s) => '<option value="' + s.id + '">' + s.label + " (" + s.questions.length + ")</option>").join("");
      sel.addEventListener("change", () => {
        const set = SETS.find((s) => s.id === sel.value);
        activeQuestions = set.questions.map((q, i) => ({ ...q, displayNum: i + 1 }));
        renderQuestions();
        resultsBox.classList.remove("visible");
      });
    }

    function renderQuestions() {
      container.innerHTML = "";
      activeQuestions.forEach((q) => {
        const card = document.createElement("div");
        card.className = "q";
        card.dataset.id = q.id;
        const opts = q.options.map((o) =>
          '<label class="opt"><input type="radio" name="' + q.id + '" value="' + o.id + '" />' +
          '<span><div class="opt-en"><strong>' + o.id.toUpperCase() + ')</strong> ' + o.en + '</div>' +
          '<div class="opt-ru">' + o.ru + '</div></span></label>'
        ).join("");
        card.innerHTML =
          '<div class="q-num">Question ' + q.displayNum + '</div>' +
          '<div class="q-en">' + q.en + '</div>' +
          '<div class="q-ru">' + q.ru + '</div>' +
          '<div class="opts">' + opts + '</div>' +
          '<div class="feedback" hidden></div>';
        container.appendChild(card);
      });
    }

    document.getElementById("shuffle-set").addEventListener("click", () => {
      activeQuestions = activeQuestions.map((q) => ({ ...q, options: shuffle(q.options) }));
      renderQuestions();
    });

    document.getElementById("random-trap").addEventListener("click", () => {
      activeQuestions = shuffle(TRAP_POOL).slice(0, 14).map((q, i) => ({
        ...q, displayNum: i + 1, id: "rnd_" + i,
      }));
      renderQuestions();
      resultsBox.classList.remove("visible");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let unanswered = 0, correct = 0, wrong = 0;
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
        if (!selected) { unanswered++; card.classList.add("unanswered"); }
      });

      if (unanswered > 0) {
        resultsBox.classList.remove("visible");
        warnEl.hidden = false;
        warnEl.textContent = "Answer all questions (" + unanswered + " unanswered).";
        return;
      }
      warnEl.hidden = true;

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
          card.classList.add("wrong");
          fb.className = "feedback bad";
          fb.innerHTML =
            '✗ Wrong. Yours: <mark class="wrong-mark">' + selected.value.toUpperCase() +
            '</mark>. Correct: <mark class="correct-mark">' + q.correct.toUpperCase() + "</mark>" +
            (q.tip ? '<div class="tip">' + q.tip + "</div>" : "");
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
      if (total === 14) score = Math.max(0, Math.min(14, score));

      document.getElementById("score-text").textContent =
        "Result: " + correct + " / " + total + " (" + Math.round((correct / total) * 100) + "%)";
      document.getElementById("score-detail").textContent =
        "Points: " + score.toFixed(1) + " · Correct: " + correct + " · Wrong: " + wrong;
      resultsBox.classList.add("visible");
    });

    document.getElementById("reset-btn").addEventListener("click", () => {
      form.reset();
      resultsBox.classList.remove("visible");
      document.getElementById("warn-text").hidden = true;
      const sel = document.getElementById("set-picker");
      const set = SETS.find((s) => s.id === sel.value) || SETS[0];
      activeQuestions = set.questions.map((q, i) => ({ ...q, displayNum: i + 1 }));
      renderQuestions();
    });

    fillSetPicker();
    activeQuestions = SETS[0].questions.map((q, i) => ({ ...q, displayNum: i + 1 }));
    renderQuestions();
  </script>
</body>
</html>`;

writeFileSync(out, html, "utf8");
console.log("Wrote", out);
console.log("Sets:", SETS.map((s) => s.label + " (" + s.questions.length + ")").join(", "));
