import type { TopicContent } from '../../components/TopicContent'

const BUDGET_LINE_OC_SVG = `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="200"/>
  <line class="axis" x1="50" y1="200" x2="300" y2="200"/>
  <path class="budget-line" d="M 50 20 L 310 200"/>
  <text x="28" y="18">Q₂</text>
  <text x="305" y="212">Q₁</text>
  <text x="180" y="115" font-size="11">Slope = -P₁/P₂</text>
  <text x="180" y="130" font-size="11">= opportunity cost</text>
</svg>`

const PPF_OC_SVG = `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="220"/>
  <line class="axis" x1="50" y1="220" x2="340" y2="220"/>
  <path class="ppf" d="M 50 50 Q 120 120 200 180 T 340 210"/>
  <text x="28" y="18">Good B</text>
  <text x="338" y="232">Good A</text>
  <text x="195" y="145" font-size="11">Slope = opportunity cost</text>
  <text x="195" y="160" font-size="11">of Good A in terms of B</text>
</svg>`

export const opportunityCost: TopicContent = [
  { type: 'h2', en: 'Definition', ru: 'Определение' },
  { type: 'p', en: 'Opportunity cost is the value of the best alternative that you give up when you make a choice. It\'s what you could have done or received instead, but didn\'t because you chose something else.', ru: 'Альтернативная стоимость — ценность наилучшего альтернативного варианта, от которого отказываетесь при выборе.' },
  { type: 'formula', lines: ['Opportunity cost = Value of the best forgone alternative', 'Альтернативная стоимость = Ценность наилучшей упущенной альтернативы'] },
  { type: 'p', en: 'Key: Opportunity cost is NOT the money you spend (explicit cost). It\'s what you could have done with that money, time, or resources instead.', ru: 'Важно: Альтернативная стоимость — это НЕ потраченные деньги (явные издержки), а то, что можно было сделать вместо этого.' },
  { type: 'hr' },
  { type: 'h2', en: 'Examples', ru: 'Примеры' },
  { type: 'table', headers: ['Choice', 'Opportunity Cost'], rows: [
    ['Study at university 4 years', 'Salary and experience you could have earned'],
    ['Buy phone for 500€', 'Other goods/services you could have bought'],
    ['Spend 2 hours watching TV', 'What you could have done in those 2 hours'],
    ['Government spends on military', 'Schools, hospitals, roads that could be built'],
    ['Produce 1 more unit of Good A', 'Units of Good B you must give up (on PPF)'],
  ]},
  { type: 'hr' },
  { type: 'h2', en: 'Opportunity Cost in Microeconomics', ru: 'Альтернативная стоимость в микроэкономике' },
  { type: 'h3', en: '1. Budget Constraint', ru: 'Бюджетное ограничение' },
  { type: 'p', en: 'On the budget line, the slope represents the opportunity cost of one good in terms of the other. Slope = -P₁/P₂. Example: P₁=2€, P₂=4€ → slope = -1/2 → opportunity cost of 1 unit of Good 1 = 0.5 units of Good 2.', ru: 'Наклон бюджетной линии = альтернативная стоимость одного товара в единицах другого. Наклон = -P₁/P₂.' },
  { type: 'graph', ascii: 'Budget line slope = opportunity cost', svg: BUDGET_LINE_OC_SVG },
  { type: 'h3', en: '2. PPF', ru: 'КПВ' },
  { type: 'p', en: 'The slope of the PPF at any point shows the opportunity cost of producing one more unit of the good on X-axis in terms of the good on Y-axis. Concave PPF means increasing opportunity cost.', ru: 'Наклон КПВ показывает альтернативную стоимость производства товара по оси X в единицах товара по оси Y. Вогнутая форма — растущие альтернативные издержки.' },
  { type: 'graph', ascii: 'PPF slope = opportunity cost', svg: PPF_OC_SVG },
  { type: 'hr' },
  { type: 'h2', en: 'Opportunity Cost vs Explicit Cost', ru: 'Альтернативная стоимость vs Явные издержки' },
  { type: 'table', headers: ['Type', 'Definition', 'Example'], rows: [
    ['Explicit cost', 'Money actually paid out', 'Tuition fee 5000€'],
    ['Opportunity cost', 'Value of best alternative forgone', 'Salary you could have earned'],
  ]},
  { type: 'formula', lines: ['Total cost = Explicit cost + Opportunity cost (for economic decisions)'] },
  { type: 'hr' },
  { type: 'h2', en: 'Why Opportunity Cost Matters', ru: 'Почему важна альтернативная стоимость' },
  { type: 'ul', items: [
    { en: 'Rational decision-making: Compare benefits with opportunity cost', ru: 'Рациональные решения: сравнивайте выгоды с альтернативной стоимостью' },
    { en: 'Resource allocation: Helps allocate scarce resources efficiently', ru: 'Распределение ресурсов: помогает эффективно распределять ограниченные ресурсы' },
    { en: 'Trade-offs: Every choice involves a trade-off', ru: 'Компромиссы: каждый выбор включает компромисс' },
  ]},
]
