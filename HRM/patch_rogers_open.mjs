import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const p = join(dirname(fileURLToPath(import.meta.url)), '03_Digital_Innovation_Exam_CFU6.html');
let h = readFileSync(p, 'utf8');
const items = JSON.parse(h.match(/const OPEN_ITEMS = (\[[\s\S]*?\]);/)[1]);
if (!items.some((i) => i.title_en?.includes('Rogers'))) {
  items.push({
    title_en: 'Practice — Rogers diffusion & pricing',
    title_ru: 'Практика — Rogers и ценообразование',
    en: "Using Rogers' theory of innovation diffusion, explain why launching a ChatGPT-like product only as a $20/month Pro plan would slow adoption compared to starting with a free tier.",
    ru: 'Используя теорию диффузии инноваций Rogers, объясните, почему запуск ChatGPT-подобного продукта сразу только как Pro за $20/мес замедлит adoption по сравнению с бесплатным тарифом.',
    sample_en: `According to Rogers, diffusion depends on relative advantage, trialability, complexity, observability, and social spread through adopter categories. A ChatGPT-like product launched straight as a $20 Pro plan blocks trialability and observability, hides relative advantage, keeps diffusion stuck among innovators, and prevents word-of-mouth from reaching the early majority. A free version lowers the barrier, lets users try the product and see its value, and kick-starts social communication — only then does a paid Pro tier make sense for users who are already convinced.

In short: free = "try it and tell others"; $20 upfront = "pay without knowing why" → diffusion does not take off.`,
    sample_ru: `По Rogers диффузия зависит от относительного преимущества, возможности попробовать (trialability), сложности, наблюдаемости результата и социального распространения через категории adopters.

Только Pro за $20 сразу: нельзя попробовать, не видно выгоды, diffusion застревает у innovators, word-of-mouth не доходит до early majority.

Бесплатная версия: низкий порог входа, пользователи пробуют и видят ценность, начинается социальная коммуникация — потом Pro логичен для тех, кто уже убеждён.

Коротко: free = «попробуй и расскажи другим»; $20 сразу = «плати, не зная зачем» → diffusion не взлетает.`,
  });
}
h = h.replace(/const OPEN_ITEMS = \[[\s\S]*?\];/, `const OPEN_ITEMS = ${JSON.stringify(items)};`);
writeFileSync(p, h);
console.log('OPEN_ITEMS:', items.length);
