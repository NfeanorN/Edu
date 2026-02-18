import type { TopicContent } from '../../components/TopicContent'

const PPF_SVG = `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="220"/>
  <line class="axis" x1="50" y1="220" x2="340" y2="220"/>
  <path class="ppf" d="M 50 50 Q 120 120 200 180 T 340 210"/>
  <circle cx="80" cy="90" r="4" fill="#e74c3c"/>
  <circle cx="140" cy="145" r="4" fill="#27ae60"/>
  <circle cx="220" cy="185" r="4" fill="#27ae60"/>
  <circle cx="300" cy="205" r="4" fill="#95a5a6" opacity="0.8"/>
  <text x="75" y="82">A</text>
  <text x="135" y="137">B</text>
  <text x="215" y="177">C</text>
  <text x="308" y="198">D</text>
  <text x="28" y="18">B</text>
  <text x="338" y="232">A</text>
</svg>`

export const ppf: TopicContent = [
  { type: 'h2', en: 'What is PPF?', ru: 'Что такое КПВ?' },
  { type: 'p', en: 'English: The PPF shows the maximum combinations of two goods an economy can produce with its limited resources and technology. It illustrates scarcity and trade-offs.', ru: 'КПВ показывает максимальные комбинации двух товаров, которые экономика может произвести при ограниченных ресурсах и технологиях.' },
  { type: 'h3', en: 'Key Ideas', ru: 'Ключевые идеи' },
  { type: 'ul', items: [
    { en: 'Scarcity — resources are limited', ru: 'Ограниченность — ресурсы ограничены' },
    { en: 'Trade-off — producing more of one good means less of the other', ru: 'Компромисс — больше одного = меньше другого' },
    { en: 'Opportunity cost — what you give up to get something else', ru: 'Альтернативная стоимость — то, от чего отказываешься' },
  ]},
  { type: 'hr' },
  { type: 'h2', en: 'The PPF Graph', ru: 'График КПВ' },
  { type: 'ul', items: [
    { en: 'X-axis: Quantity of Good A (e.g., guns)', ru: 'Ось X: Количество товара А' },
    { en: 'Y-axis: Quantity of Good B (e.g., butter)', ru: 'Ось Y: Количество товара В' },
  ]},
  { type: 'graph', ascii: 'PPF curve', svg: PPF_SVG },
  { type: 'table', headers: ['Point / Точка', 'Meaning / Значение'], rows: [
    ['On the curve (B, C)', 'Efficient — using all resources'],
    ['Inside (A)', 'Inefficient — unemployment or waste'],
    ['Outside (D)', 'Unattainable with current resources'],
  ]},
  { type: 'hr' },
  { type: 'h2', en: 'Shape of the PPF', ru: 'Форма КПВ' },
  { type: 'p', en: 'Concave (bowed outward) — increasing opportunity cost. As you produce more of one good, you give up increasingly more of the other.', ru: 'Вогнутая — растущие альтернативные издержки.' },
  { type: 'graph', ascii: `   Y (Good B)
    |
    |\\
    |  \\
    |    \\
    |      \\  Concave: slope gets steeper
    0+-------------+ X (Good A)` },
  { type: 'hr' },
  { type: 'h2', en: 'What Shifts the PPF?', ru: 'Что сдвигает КПВ?' },
  { type: 'table', headers: ['Factor / Фактор', 'Effect / Эффект'], rows: [
    ['More resources', 'PPF shifts OUT'],
    ['Better technology', 'PPF shifts OUT'],
    ['Population growth', 'PPF shifts OUT'],
    ['War, disaster', 'PPF shifts IN'],
  ]},
  { type: 'formula', lines: ['Summary: PPF = boundary of what\'s possible. Slope = opportunity cost of Good A in terms of Good B.', 'Итог: КПВ = граница возможного. Наклон = альтернативная стоимость товара А в терминах товара В.'] },
]
