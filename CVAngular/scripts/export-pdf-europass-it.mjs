import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(ROOT, '..', 'legacy', 'cv-europass-it.html');
const outPath = join(ROOT, '..', '..', 'CV', 'Nurzhan_Zhorabayev_CV_Europass_IT.pdf');

const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH ||
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
});
const page = await browser.newPage();
await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });
await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '11mm', right: '12mm', bottom: '11mm', left: '12mm' },
});
await browser.close();
console.log('Saved:', outPath);
