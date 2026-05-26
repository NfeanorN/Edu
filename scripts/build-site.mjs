import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const siteDir = path.join(root, "site");
const repoName = process.env.REPO_NAME || "Edu";

const STATIC_DIRS = [
  "English",
  "Economics",
  "HR",
  "HRM",
  "Avatar",
  "CV",
  "EPC_Champions_League_Final",
  "EPC_Study_Room_Booking",
];

const REACT_APPS = [
  { name: "EconomicsReact", dist: "EconomicsReact/dist" },
  { name: "AvatarSubtitlesReact", dist: "AvatarSubtitlesReact/dist" },
];

function rmDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function addSpaFallback(appDir) {
  const indexPath = path.join(appDir, "index.html");
  if (!fs.existsSync(indexPath)) return;
  copyFile(indexPath, path.join(appDir, "404.html"));
}

function writeRoot404() {
  const base = `/${repoName}`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <script>
    (function () {
      var base = ${JSON.stringify(base)};
      var path = location.pathname;
      var apps = ["EconomicsReact", "AvatarSubtitlesReact"];
      for (var i = 0; i < apps.length; i++) {
        var prefix = base + "/" + apps[i] + "/";
        if (path.indexOf(prefix) === 0 || path === base + "/" + apps[i]) {
          location.replace(prefix + "index.html" + location.search + location.hash);
          return;
        }
      }
      location.replace(base + "/");
    })();
  </script>
</head>
<body></body>
</html>`;
  fs.writeFileSync(path.join(siteDir, "404.html"), html);
}

rmDir(siteDir);
fs.mkdirSync(siteDir, { recursive: true });

copyFile(path.join(root, "index.html"), path.join(siteDir, "index.html"));

for (const dir of STATIC_DIRS) {
  const src = path.join(root, dir);
  if (!fs.existsSync(src)) {
    console.warn("Skip missing dir:", dir);
    continue;
  }
  copyDir(src, path.join(siteDir, dir));
  console.log("Copied:", dir);
}

for (const app of REACT_APPS) {
  const src = path.join(root, app.dist);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing build output: ${app.dist}. Run npm run build first.`);
  }
  const dest = path.join(siteDir, app.name);
  copyDir(src, dest);
  addSpaFallback(dest);
  console.log("Copied:", app.name);
}

writeRoot404();
console.log("Site ready:", siteDir);
console.log("GitHub Pages URL: https://<user>.github.io/" + repoName + "/");
