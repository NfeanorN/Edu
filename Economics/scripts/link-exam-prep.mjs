import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const eco = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function swapStyle(file, linksHtml) {
  const p = path.join(eco, file);
  let html = fs.readFileSync(p, "utf8");
  if (!/<style>/i.test(html)) {
    console.log("skip:", file);
    return;
  }
  html = html.replace(/<style>[\s\S]*?<\/style>\s*/i, linksHtml);
  fs.writeFileSync(p, html);
  console.log("ok:", file);
}

swapStyle(
  "Exam_Prep_Guide.html",
  `<link rel="stylesheet" href="study-card.css">
    <link rel="stylesheet" href="exam-prep.css">
`
);

// Syllabus index: use hub layout (list on gradient)
const idx = path.join(eco, "Syllabus", "index.html");
let idxHtml = fs.readFileSync(idx, "utf8");
if (!/<body[^>]*class=/.test(idxHtml)) {
  idxHtml = idxHtml.replace("<body>", '<body class="hub">');
  fs.writeFileSync(idx, idxHtml);
  console.log("ok: Syllabus/index.html hub class");
}

// Generator: hub class on index
const gen = path.join(eco, "gen_syllabus_pages.py");
let py = fs.readFileSync(gen, "utf8");
if (!py.includes('<body class="hub">')) {
  py = py.replace(
    '    <link rel="stylesheet" href="{STUDY_CSS}">\n</head>\n<body>\n<div class="wrap">\n    <p class="back"><a href="../index.html">',
    '    <link rel="stylesheet" href="{STUDY_CSS}">\n</head>\n<body class="hub">\n<div class="wrap">\n    <p class="back"><a href="../index.html">'
  );
  fs.writeFileSync(gen, py);
  console.log("ok: gen_syllabus_pages.py hub body");
}
