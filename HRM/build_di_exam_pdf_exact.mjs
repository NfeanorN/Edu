import { readFileSync, writeFileSync, copyFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { EXAM_PDF_EXACT, ANSWER_KEY } from "./di_exam_pdf_exact.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, "07_DI_Exam_PDF_Exact.html");

const assets = join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "c-Users-Feanor-OneDrive-Edu",
  "assets"
);
const img1src = join(assets, "c__Users_Feanor_AppData_Roaming_Cursor_User_workspaceStorage_a47402e43a81a7c5cc6fac2b99c9eced_images_image-6ab9dd78-561b-471c-839f-790fe63db66a.png");
const img2src = join(assets, "c__Users_Feanor_AppData_Roaming_Cursor_User_workspaceStorage_a47402e43a81a7c5cc6fac2b99c9eced_images_image-69f15e98-50fe-462e-ba3a-32f018281281.png");
const img1 = join(dir, "images", "exam-di-pdf-q1-6.png");
const img2 = join(dir, "images", "exam-di-pdf-q7-14.png");

for (const [src, dest] of [[img1src, img1], [img2src, img2]]) {
  if (existsSync(src)) copyFileSync(src, dest);
}

const questionsJson = JSON.stringify(
  EXAM_PDF_EXACT.map((q) => ({
    ...q,
    section: "Digital Innovation — MCQ",
  }))
);

const template = readFileSync(join(dir, "03_Digital_Innovation_Exam_CFU6.html"), "utf8");

let html = template
  .replace(/<title>[^<]*<\/title>/, "<title>Digital Innovation — Exam PDF Exact</title>")
  .replace(
    /<p class="back">[\s\S]*?<\/p>/,
    `<p class="back"><a href="index.html">← HRM tests</a> · <a href="03_Digital_Innovation_Exam_CFU6.html">CFU 6 Key A</a> · <a href="05_DI_Practice_Mega.html">Practice</a></p>`
  )
  .replace(
    /<div class="universal-open"[\s\S]*?<\/div>\s*/,
    ""
  )
  .replace(
    /<h1>[\s\S]*?<\/h1>\s*<p class="sub">[\s\S]*?<\/p>/,
    `<h1>Digital Innovation — Exam (PDF exact)</h1>
    <p class="sub">14 MCQ — exact wording from Exam HR _DI · Answer key: ${ANSWER_KEY}</p>`
  )
  .replace(
    /<div class="rules">[\s\S]*?<\/div>/,
    `<div class="rules">Scoring: +1 / −0.2 per question (max 14). Same test as on your exam photos — questions 1–6 and 7–14.</div>`
  )
  .replace(
    /<div class="study-box"[\s\S]*?<\/div>\s*/,
    ""
  )
  .replace(
    /<div class="section-title">Exam photo[\s\S]*?<\/figure>\s*/,
    `<div class="section-title">Exam photos (your blank)</div>
    <figure class="exam-photo">
      <img src="images/exam-di-pdf-q1-6.png" alt="DI exam questions 1–6" />
      <figcaption>Questions 1–6</figcaption>
    </figure>
    <figure class="exam-photo">
      <img src="images/exam-di-pdf-q7-14.png" alt="DI exam questions 7–14" />
      <figcaption>Questions 7–14</figcaption>
    </figure>
    `
  )
  .replace(/const QUESTIONS = \[[\s\S]*?\];/, `const QUESTIONS = ${questionsJson};`)
  .replace(/const OPEN_ITEMS = \[[\s\S]*?\];/, "const OPEN_ITEMS = [];")
  .replace(/const MVP_DEFINITION = \{[\s\S]*?\};\s*document\.getElementById\('mvp-def-en'\)[\s\S]*?function mvpTipHtml\(\) \{[\s\S]*?\}\s*/, "")
  .replace(
    /if \(q\.id === 'q10'\) \{[\s\S]*?\}\s*/,
    ""
  )
  .replace(
    /fb\.innerHTML = '✓ Верно' \+ \(q\.id === 'q10' \? mvpTipHtml\(\) : ''\);/,
    "fb.textContent = '✓ Correct';"
  )
  .replace(
    /fb\.innerHTML = '✗ Неверно\. Ваш ответ: <mark class="wrong-mark">' \+ selected\.value\.toUpperCase\(\) \+\s*'\<\/mark>\. Правильный: <mark class="correct-mark">' \+ q\.correct\.toUpperCase\(\) \+ '<\/mark>' \+\s*\(q\.id === 'q10' \? mvpTipHtml\(\) : ''\);/,
    "fb.innerHTML = '✗ Wrong. Yours: <mark class=\"wrong-mark\">' + selected.value.toUpperCase() + '</mark>. Correct: <mark class=\"correct-mark\">' + q.correct.toUpperCase() + '</mark>';"
  )
  .replace(/warnEl\.textContent = `Ответьте на все вопросы/g, "warnEl.textContent = `Answer all questions")
  .replace(/fb\.innerHTML = '⚠️ Ответ не выбран/g, "fb.innerHTML = '⚠️ No answer")
  .replace(
    /document\.getElementById\('score-text'\)\.textContent =\s*`Результат:/,
    "document.getElementById('score-text').textContent =\n        `Result:"
  )
  .replace(/Баллы:/g, "Points:")
  .replace(/Верно:/g, "Correct:")
  .replace(/Неверно:/g, "Wrong:")
  .replace(/Без ответа:/g, "Unanswered:");

writeFileSync(out, html, "utf8");
console.log("Wrote", out);
console.log("Answer key:", ANSWER_KEY);
