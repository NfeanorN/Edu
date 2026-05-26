/**
 * Generate CV.pdf from index.html
 * Run: npm install puppeteer && node make-pdf.js
 * Or: npx puppeteer make-pdf.js (if you have npx)
 */
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const pdfPath = path.join(__dirname, 'CV_Nurzhan_Zhorabayev.pdf');

async function main() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch (e) {
    console.error('Install puppeteer first: npm install puppeteer');
    process.exit(1);
  }
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('file://' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  });
  await browser.close();
  console.log('PDF saved:', pdfPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
