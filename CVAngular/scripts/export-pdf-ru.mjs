import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(ROOT, '..', 'legacy', 'cv-print-ru.html');
const outPath = join(ROOT, '..', '..', 'CV', 'Nurzhan_Zhorabayev_CV_RU.pdf');

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
  margin: { top: '1.2cm', right: '1.5cm', bottom: '1.2cm', left: '1.5cm' },
});
await browser.close();
console.log('Saved:', outPath);
