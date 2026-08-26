/**
 * Strip duplicated inline <style> from Economics study HTML
 * and point them at shared study-card.css
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const ECO = path.join(ROOT, "..");
const STUDY_CSS = "study-card.css";

function stripStyleAndLink(html, cssHref) {
  const without = html.replace(/<style>[\s\S]*?<\/style>\s*/i, "");
  if (/rel=["']stylesheet["'][^>]*study-card\.css/.test(without)) return without;
  if (/<link[^>]+stylesheet[^>]*>/i.test(without)) {
    return without.replace(
      /(<link[^>]+stylesheet[^>]*>)/i,
      `$1\n<link rel="stylesheet" href="${cssHref}">`
    );
  }
  return without.replace(
    /<\/title>\s*/i,
    `</title>\n<link rel="stylesheet" href="${cssHref}">\n`
  );
}

function processFile(file, cssHref) {
  const raw = fs.readFileSync(file, "utf8");
  if (!/<style>/i.test(raw)) {
    console.log("skip (no style):", path.relative(ECO, file));
    return false;
  }
  const next = stripStyleAndLink(raw, cssHref);
  fs.writeFileSync(file, next);
  console.log("ok:", path.relative(ECO, file));
  return true;
}

let n = 0;

// Syllabus topic pages + index
const syllabusDir = path.join(ECO, "Syllabus");
for (const name of fs.readdirSync(syllabusDir)) {
  if (!name.endsWith(".html")) continue;
  if (processFile(path.join(syllabusDir, name), "../" + STUDY_CSS)) n++;
}

// Frank study pages that used the same card look
for (const name of [
  "Frank_Only_Topics.html",
  "Frank_Examples_Graphs.html",
]) {
  const f = path.join(ECO, name);
  if (fs.existsSync(f) && processFile(f, STUDY_CSS)) n++;
}

console.log(`\nUpdated ${n} files → ${STUDY_CSS}`);
