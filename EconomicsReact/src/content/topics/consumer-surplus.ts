import type { TopicContent } from '../../components/TopicContent'

const CS_PS_SVG = `<svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="240"/>
  <line class="axis" x1="50" y1="240" x2="360" y2="240"/>
  <line class="eq-line" x1="50" y1="130" x2="200" y2="130"/>
  <line class="eq-line" x1="200" y1="130" x2="200" y2="240"/>
  <path class="cs-area" d="M 50 55 L 200 130 L 200 240 L 50 240 Z"/>
  <path class="demand" d="M 50 55 Q 120 90 200 130 L 360 200"/>
  <path class="ps-area" d="M 50 240 L 50 215 L 200 130 L 200 240 Z"/>
  <path class="supply" d="M 50 215 L 200 130 L 360 45"/>
  <line class="axis" x1="50" y1="20" x2="50" y2="240"/>
  <line class="axis" x1="50" y1="240" x2="360" y2="240"/>
  <text x="28" y="135" text-anchor="middle">P*</text>
  <text x="205" y="255" text-anchor="middle">Q*</text>
  <text x="30" y="18" text-anchor="middle">P</text>
  <text x="358" y="255" text-anchor="middle">Q</text>
  <text x="115" y="95" class="label-cs">CS</text>
  <text x="115" y="185" class="label-ps">PS</text>
  <text x="280" y="115">D</text>
  <text x="280" y="175">S</text>
  <circle cx="200" cy="130" r="4" fill="#e74c3c" stroke="#c0392b" stroke-width="1.5"/>
</svg>`

export const consumerSurplus: TopicContent = [
  { type: 'h2', en: 'Definition', ru: 'Определение' },
  { type: 'p', en: 'Consumer surplus (CS) is the difference between what consumers are willing to pay for a good and what they actually pay (market price). It measures the net benefit to consumers from the market.', ru: 'Излишек потребителя (CS) — разница между готовностью платить и фактически уплаченной ценой. Выигрыш потребителей от обмена.' },
  { type: 'formula', lines: ['CS = Willingness to pay − Price paid', 'On graph: area below demand curve and above the price line (up to Q*)'] },
  { type: 'hr' },
  { type: 'h2', en: 'Graph', ru: 'График' },
  { type: 'p', en: 'Demand curve = willingness to pay. At price P*, quantity Q* is sold. Consumer surplus = area between demand curve, price line P*, and vertical axis (triangle under D, above P*).', ru: 'Кривая спроса — готовность платить. При цене P* продаётся Q*. Излишек потребителя — площадь под D и выше P*.' },
  { type: 'graph', ascii: 'CS (green), PS (blue). See SVG.', svg: CS_PS_SVG },
  { type: 'p', en: 'For linear demand: CS = (1/2) × (max price − P*) × Q*. In general: area under D from 0 to Q* minus expenditure P*×Q*.', ru: 'При линейном спросе CS = площадь треугольника. В общем — интеграл под D минус P*×Q*.' },
  { type: 'hr' },
  { type: 'h2', en: 'What Changes CS?', ru: 'Что меняет CS?' },
  { type: 'table', headers: ['Change', 'Effect on CS'], rows: [
    ['Price falls', 'CS increases'],
    ['Price rises', 'CS decreases'],
    ['Demand shifts right', 'CS typically increases'],
    ['Demand shifts left', 'CS typically decreases'],
  ]},
  { type: 'hr' },
  { type: 'h2', en: 'Producer Surplus and Total Surplus', ru: 'Излишек производителя и общее благосостояние' },
  { type: 'p', en: 'Producer surplus (PS) = area above supply curve and below price line. Total surplus TS = CS + PS. Competitive equilibrium maximizes TS (allocative efficiency).', ru: 'Излишек производителя — площадь выше S и ниже P*. Общее благосостояние TS = CS + PS. Равновесие максимизирует TS.' },
  { type: 'graph', ascii: 'CS + PS. See SVG.', svg: CS_PS_SVG },
]
