import type { TopicContent } from '../../components/TopicContent'

const PERFECT_PD_SVG = `<svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg">
  <line x1="50" y1="20" x2="50" y2="230" stroke="#333" stroke-width="1.5"/>
  <line x1="50" y1="230" x2="400" y2="230" stroke="#333" stroke-width="1.5"/>
  <path d="M 55 35 L 315 215" stroke="#e74c3c" stroke-width="2.5" fill="none"/>
  <text x="250" y="100" fill="#e74c3c" font-size="12" font-weight="600">D = MR</text>
  <path d="M 55 215 L 350 215" stroke="#2980b9" stroke-width="2" fill="none"/>
  <text x="300" y="208" fill="#2980b9" font-size="11">MC=2</text>
  <circle cx="315" cy="215" r="6" fill="#27ae60"/>
  <text x="285" y="248" font-size="11">Q**=8</text>
</svg>`

export const priceDiscrimination: TopicContent = [
  { type: 'p', en: 'Frank Ch. 11 example: P = 10 − Q, MC = 2. Single price: Q*=4, P*=6, π=16. Perfect discr.: MR=D → Q**=8, π=32.', ru: 'Frank Ch. 11: P=10−Q, MC=2. Одна цена: Q*=4, π=16. Perfect: MR=D → Q**=8, π=32.' },
  { type: 'formula', lines: [
    'Perfect (1st degree): MR = D → optimum where P = MC on last unit',
    '3rd degree: higher P on inelastic segment, lower P on elastic',
    '(P − MC) / P = 1 / |ε|',
  ]},
  { type: 'graph', ascii: 'Perfect price discrimination: D = MR, Q where D = MC', svg: PERFECT_PD_SVG },
  { type: 'ul', items: [
    { en: '1st: each unit at individual WTP — no DWL, all CS to seller', ru: '1-я: каждая ед. по WTP — нет DWL' },
    { en: '2nd: quantity discounts / versioning (self-selection)', ru: '2-я: опт, тарифы по объёму' },
    { en: '3rd: separate segments (students vs business)', ru: '3-я: разные группы рынка' },
  ]},
]
