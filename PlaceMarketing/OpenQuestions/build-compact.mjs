#!/usr/bin/env node
/** Build compact.html — easy-English answers, print numbering. */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

const VARIANT_FILES = readdirSync(ROOT)
  .filter((f) => /^\d{2}_Variant\.html$/.test(f))
  .sort();

/** Compact-page answers — easy English (as on screenshot) */
const HUMAN_ANSWERS = {
  '01-1': `<p>Territory is the objective side — you can put it on a map: borders, who governs it, population. Place is different: it's how people actually experience that space and what it means to them.</p>
<p>The course uses house vs home. A house is just the building — size, address, owner. Home is the feeling, memories, attachment. Same idea: territory = house, place = home.</p>
<p>Place only really appears when people interact with the territory and mix hard resources (roads, buildings) with soft ones (culture, skills, identity). Without that, you've just got territory on paper.</p>`,
  '01-2': `<p>Genius loci is basically the spirit of a place — its history, culture, local know-how. Not something you design in a branding agency. It's why some Italian districts stayed special even when factories moved abroad.</p>
<p>Vocation is more strategic: what the place is good at and where it wants to go. Actors can strengthen it or slowly shift it — like from farming to tourism.</p>
<p>For place branding this matters a lot. If your brand starts from real genius loci and a real vocation, it feels true. If you just invent a catchy slogan, people arrive and don't recognise the place. Identity has to match what's actually there.</p>`,
  '01-3': `<p>Old view (goods-dominant): treat the place like a product — promote land, facilities, sell it to tourists or investors. Value is in the "thing" you offer.</p>
<p>S-D Logic flips this. Value doesn't get delivered by the municipality — it appears when people actually use and experience the place. Residents, tourists, firms all co-create it with their own knowledge and behaviour.</p>
<p>Value-in-use = value shows up in real experience, not in a brochure. Value-in-context = the same square means different things to a local, a tourist, or a company. So place marketing isn't "we sell, you buy" — it's creating conditions for everyone to build the place together.</p>`,
  '03-1': `<p>Five principles: stand out (distinctiveness), be real (authenticity), be remembered (memorability), build it together (co-creation), show it in the physical space (place making).</p>
<p>A place brand is a promise. Substance = real stuff behind it — jobs, safety, clean streets, services. Symbolic actions = logo, ads, events. If you only have symbols without substance, it's propaganda. If you have substance but no communication, nobody notices. You need both, and they have to match.</p>`,
  '03-2': `<p>A strategic narrative is the shared story of a place — where it came from, what it does now, where it's heading. Lots of actors tell different stories (residents, shops, university, tourists) and that's fine. What matters is they share the same values and direction.</p>
<p>They converge through common strategy, workshops, positioning — everyone working toward the same bigger goal like quality of life or keeping the place alive.</p>
<p>Primary communication is what the place actually does and looks like — clean centre, friendly services, real projects. Secondary is ads and campaigns. A nice ad means nothing if the place itself doesn't deliver. The story only works when actions back it up.</p>`,
  '03-3': `<p>TCM means shops, property owners and the city work together to fix the town centre — cleaning, events, safety, marketing — because malls and online shopping are killing foot traffic.</p>
<p>CCN (natural shopping centre) treats the historic centre like one big open-air mall: many small independent shops on streets, managed as a single experience.</p>
<p>Partnerships grow in stages: awkward start → conflicts and free-riders (shops enjoying benefits without paying) → mature network with clear rules and shared budget. Main problems: small shops don't trust each other or the city, little money, fear of losing independence, hard to coordinate everyone.</p>`,
  '04-1': `<p>A BID is a zone where businesses vote to pay an extra fee for shared services — cleaning, security, marketing, events. It funds centre improvements without relying only on the city budget.</p>
<p>After the vote, the fee is mandatory. That solves free-riders — shops that enjoy better streets and more visitors but refuse to contribute. In voluntary schemes this kills cooperation.</p>
<p>It also shifts governance: businesses manage pooled money together with rules, not just waiting for top-down decisions from the municipality. The city still sets the legal frame, but actors on the ground have more say.</p>`,
  '04-2': `<p>A4A means actors help each other for the survival of the whole place, not just their own short-term profit. Mutual support, tolerance, shared goals.</p>
<p>Traditional marketing is transactional: someone sells, someone buys. In old place marketing the government "sells" the territory. A4A breaks that — value is co-created, many actors interact, nobody is just a passive target.</p>
<p>This helps the place survive because everyone depends on the system staying healthy. If actors only chase individual gain and free-ride, the ecosystem falls apart. With A4A they adapt together.</p>`,
  '04-3': `<p>The matrix crosses technology/knowledge on one side with relationships/engagement on the other. Five positions from a to e.</p>
<p>a — high engagement with the project. b — medium both: classic demand-driven marketing ("come visit us"). c — high tech AND strong relationships: real co-creation, smart tools used with people. d — lots of participation but weak tech, slow to adapt. e — low on both, place is weak and exposed.</p>
<p>Quadrant c is the goal. But tech alone doesn't get you there — if you build apps and sensors but nobody is engaged, the city just broadcasts messages nobody answers. Expensive smart city with no real participation is just fancy propaganda.</p>`,
  '05-1': `<p>Onlife means online and offline are mixed in everyday life — campus + Zoom, phone + city. For a university, online isn't an extra anymore, it's part of the normal offer.</p>
<p>After COVID, many unis looked the same on screen. So a place-based university should use online to make people want the real campus — local projects, firms, culture, language, life in the city. Online should create the desire to come and experience the place.</p>
<p>The uni acts as a catalyst: brings knowledge, talent, projects into the territory and links different stakeholders. Mixing online and onplace makes the uni and the city stronger together.</p>`,
  '05-2': `<p>Residents are the primary stakeholders — they live there every day, carry the identity, win or lose from every decision. Ignore them and you get angry conflicts over big projects built without dialogue.</p>
<p>Citizen-sourcing means using what people actually know — workshops, living labs, open data, participatory branding. The city doesn't just announce plans; it asks and co-designs.</p>
<p>Old public management is top-down and slow. This is more horizontal — ideas come from many sides. Government still leads and regulates, but acts more like a coordinator who brings people in instead of deciding everything alone.</p>`,
  '05-3': `<p>Classic 4Ps were made for products. For a place they work differently.</p>
<p>Product = the place value proposition — the whole package of benefits (culture, jobs, lifestyle, services) that many actors build together. Price = everything the user gives up: money (rent, taxes) but also time, stress, bureaucracy, distance from family. If sacrifices are too high, people leave.</p>
<p>Place = where and how you access those benefits (transport, services, accessibility). Promotion = branding, events, PR — but also real actions, not just ads. Without substance behind promotion it becomes empty marketing.</p>`,
  '06-1': `<p>Caroli gives three strategies for territorial resources. Optimization — do better with what you already have. Partial modification — keep the main vocation but adapt parts of it. Radical change — when the old model is dead (industrial collapse, etc.) and you need a new direction like tourism instead of farming.</p>
<p>Radical change usually needs outside investment and new actors. But you can't just import everything and forget local identity — people, skills, culture. If the new vocation feels fake, nobody follows. Balance outside resources with what's already rooted in the place.</p>`,
  '06-2': `<p>Events by scale: Mega (Olympics, World Cup) — global TV, huge cost, short image boost. Special (F1, big sport) — national/international attention. Hallmark (famous city festival) — regional, already linked to the place. Community (local fair) — small but strong for local bonds.</p>
<p>What matters is the experience and real effects — tourism, business, culture — not just the label "mega".</p>
<p>Events can attract investment and development, but they have to fit the place. Don't copy a random format that has nothing to do with local identity. Involve local firms and residents, plan long-term benefits — not just one crowded weekend. Otherwise you get noise without real improvement.</p>`,
  '06-3': `<p>Smart City isn't just installing sensors. It's a living system where people, firms and government interact through services — tech helps that happen, it's not the goal itself.</p>
<p>Big Data helps understand how people move and use spaces — useful for planning, but doesn't replace talking to citizens or building a place image by itself.</p>
<p>Open Data lets everyone access information — supports transparency and participation. Nudges are soft pushes (recycle more, use bikes) instead of fines. Together: understand the city with data, share it openly, gently guide behaviour — so technology supports co-creation, not one-way "smart" advertising.</p>`,
};

function extractBlocks(html, variantId) {
  const parts = html.split('<div class="open-block">').slice(1);
  return parts.map((chunk, i) => {
    const num = chunk.match(/<div class="q-num">([\s\S]*?)<\/div>/)?.[1]?.trim() ?? '';
    const q = chunk.match(/<div class="q-en">([\s\S]*?)<\/div>/)?.[1]?.trim() ?? '';
    const qNum = num.match(/Question\s*(\d+)/i)?.[1] ?? String(i + 1);
    const key = `${variantId}-${i + 1}`;
    const a = HUMAN_ANSWERS[key] ?? chunk.match(/<div class="answer-en">([\s\S]*?)<\/div>/)?.[1]?.trim() ?? '';
    return { variantId, qNum, num, q, a };
  }).filter((b) => b.q && b.a);
}

const all = [];
for (const file of VARIANT_FILES) {
  const variantId = file.slice(0, 2);
  const html = readFileSync(join(ROOT, file), 'utf8');
  all.push(...extractBlocks(html, variantId));
}

const variantIds = [...new Set(all.map((b) => b.variantId))].sort();
const variantCol = new Map(variantIds.map((v, i) => [v, i]));

function firstWords(text, n = 3) {
  const plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = plain.match(/[^\s]+/g) ?? [];
  const slice = words.slice(0, n).join(' ');
  return words.length > n ? `${slice}…` : slice;
}

/** Print: 5 cols, row = question (Q1/Q2/Q3), col = variant */
function printOrder(b) {
  const col = variantCol.get(b.variantId) ?? 0;
  const q = Number(b.qNum) - 1;
  return q * variantIds.length + col + 1;
}

const printOrderRules = all
  .map((b) => {
    const ord = printOrder(b);
    return `    .card[data-id="${b.variantId}-${b.qNum}"] { order: ${ord}; }`;
  })
  .join('\n');

function tabTopMm(b) {
  const col = variantCol.get(b.variantId) ?? 0;
  const q = Number(b.qNum) - 1;
  return 2 + q * 9 + col * 1.2;
}

const blocksHtml = all
  .map((b) => {
    const label = `V${b.variantId} Q${b.qNum}`;
    const hint = firstWords(b.q);
    const pNum = printOrder(b);
    const tabTop = tabTopMm(b);
    return `    <article class="card" data-id="${b.variantId}-${b.qNum}" data-v="${b.variantId}" data-q="${b.qNum}">
      <span class="print-num" style="--tab-top:${tabTop}mm">${pNum}</span>
      <div class="card-head">${label} · ${hint}</div>
      <div class="a">${b.a}</div>
    </article>`;
  })
  .join('\n');

const out = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Open Q compact</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0.4rem;
      font-family: "Segoe UI", system-ui, sans-serif;
      font-size: 8px;
      line-height: 1.35;
      color: #1a1a2e;
      background: #f0f2f5;
    }
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      align-items: center;
      padding: 0.3rem 0.5rem;
      margin-bottom: 0.4rem;
      background: #fff;
      border: 1px solid #d0d7e2;
      border-radius: 4px;
      font-size: 10px;
    }
    .toolbar a { color: #2980b9; text-decoration: none; }
    .toolbar button {
      font-size: 9px;
      padding: 0.15rem 0.4rem;
      border: 1px solid #b8c4d4;
      border-radius: 3px;
      background: #fff;
      cursor: pointer;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 0.35rem;
    }
    .card {
      background: #fff;
      border: 1px solid #d8dee8;
      border-radius: 4px;
      padding: 0.35rem 0.4rem;
      break-inside: avoid;
      page-break-inside: avoid;
      position: relative;
    }
    .print-num { display: none; }
    .card-head {
      font-size: 7px;
      font-weight: 700;
      color: #2980b9;
      margin-bottom: 0.15rem;
    }
    .a {
      font-size: 8px;
      line-height: 1.35;
      color: #222;
    }
    .a p { margin: 0 0 0.25rem; }
    .a p:last-child { margin-bottom: 0; }
    .a strong { font-weight: 700; }
    @media print {
      body { background: #fff; padding: 0; }
      .toolbar { display: none; }
      .grid {
        display: grid;
        grid-template-columns: repeat(${variantIds.length}, 1fr);
        gap: 0.25rem;
        overflow: visible;
      }
${printOrderRules}
      .card {
        padding: 0.25rem 0.25rem 0.2rem;
        overflow: visible;
      }
      .print-num {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: var(--tab-top, 4mm);
        right: -3.5mm;
        min-width: 3.5mm;
        height: 5mm;
        padding: 0 0.3mm;
        font-size: 9px;
        font-weight: 800;
        color: #111;
        line-height: 1;
        background: #fff;
        border: 0.35pt solid #333;
        border-left: none;
        border-radius: 0 1mm 1mm 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .a { font-size: 7px; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <a href="index.html">← Open questions</a>
    <span>·</span>
    <span>${all.length} questions · ${VARIANT_FILES.length} variants</span>
    <button type="button" onclick="window.print()">Print</button>
  </div>
  <div class="grid">
${blocksHtml}
  </div>
</body>
</html>`;

writeFileSync(join(ROOT, 'compact.html'), out, 'utf8');
console.log(`compact.html — ${all.length} blocks, print ${variantIds.length} cols`);
