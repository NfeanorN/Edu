import type { TopicContent } from '../../components/TopicContent'

const IS_CURVE_SVG = `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="200"/>
  <line class="axis" x1="50" y1="200" x2="300" y2="200"/>
  <path class="is-curve" d="M 50 50 L 300 180"/>
  <text x="28" y="18">i</text>
  <text x="305" y="212">Y</text>
  <text x="260" y="165">IS</text>
</svg>`

const LM_CURVE_SVG = `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="200"/>
  <line class="axis" x1="50" y1="200" x2="300" y2="200"/>
  <path class="lm-curve" d="M 50 180 L 300 50"/>
  <text x="28" y="18">i</text>
  <text x="305" y="212">Y</text>
  <text x="260" y="75">LM</text>
</svg>`

const IS_LM_EQUIL_SVG = `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="220"/>
  <line class="axis" x1="50" y1="220" x2="340" y2="220"/>
  <path class="lm-curve" d="M 50 200 L 200 120 L 340 40"/>
  <path class="is-curve" d="M 50 40 L 200 120 L 340 200"/>
  <circle cx="200" cy="120" r="5" fill="#e74c3c" stroke="#c0392b"/>
  <text x="28" y="18">i</text>
  <text x="338" y="232">Y</text>
  <text x="215" y="110" fill="#e74c3c" font-weight="600">E</text>
  <text x="280" y="75">LM</text>
  <text x="280" y="165">IS</text>
  <text x="200" y="232">Y*</text>
  <text x="28" y="124">i*</text>
</svg>`

export const isLm: TopicContent = [
  { type: 'h2', en: 'IS-LM Model', ru: 'Модель IS-LM' },
  { type: 'p', en: 'IS curve: goods market equilibrium (Y = C + I + G). LM curve: money market equilibrium (M/P = L(Y,i)). Together they determine equilibrium Y and i.', ru: 'IS — равновесие на рынке товаров. LM — равновесие на денежном рынке. Вместе определяют равновесные Y и i.' },
  { type: 'h3', en: 'IS Curve', ru: 'Кривая IS' },
  { type: 'p', en: 'IS = combinations of (Y, i) where goods market is in equilibrium. Slope negative: higher i → less investment → lower Y.', ru: 'IS — комбинации (Y, i) при равновесии рынка товаров. Нисходящая: рост i → падение I → падение Y.' },
  { type: 'graph', ascii: 'IS curve downward', svg: IS_CURVE_SVG },
  { type: 'p', en: 'Shifts: G↑ or T↓ → IS shifts right. G↓ or T↑ → IS shifts left.', ru: 'Сдвиги: G↑ или T↓ → IS вправо. G↓ или T↑ → IS влево.' },
  { type: 'h3', en: 'LM Curve', ru: 'Кривая LM' },
  { type: 'p', en: 'LM = combinations of (Y, i) where money market is in equilibrium. Slope positive: higher Y → more money demand → higher i (for given M).', ru: 'LM — комбинации (Y, i) при равновесии денежного рынка. Восходящая: рост Y → рост спроса на деньги → рост i.' },
  { type: 'graph', ascii: 'LM curve upward', svg: LM_CURVE_SVG },
  { type: 'p', en: 'Shifts: M↑ → LM shifts right. M↓ → LM shifts left.', ru: 'Сдвиги: M↑ → LM вправо. M↓ → LM влево.' },
  { type: 'h3', en: 'Equilibrium', ru: 'Равновесие' },
  { type: 'p', en: 'Intersection of IS and LM = simultaneous equilibrium in both markets. Gives equilibrium Y* and i*.', ru: 'Пересечение IS и LM — одновременное равновесие обоих рынков. Даёт равновесные Y* и i*.' },
  { type: 'graph', ascii: 'IS-LM equilibrium', svg: IS_LM_EQUIL_SVG },
  { type: 'h3', en: 'Policy Effects', ru: 'Эффекты политики' },
  { type: 'table', headers: ['Policy', 'Effect'], rows: [
    ['Fiscal expansion (G↑)', 'IS right → Y↑, i↑'],
    ['Monetary expansion (M↑)', 'LM right → Y↑, i↓'],
  ]},
]
