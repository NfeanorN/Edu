import type { TopicContent } from '../../components/TopicContent'

const BUDGET_LINE_SVG = `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="200"/>
  <line class="axis" x1="50" y1="200" x2="300" y2="200"/>
  <path class="budget-line" d="M 50 20 L 310 200"/>
  <text x="28" y="18">Q₂</text>
  <text x="305" y="212">Q₁</text>
  <text x="170" y="115" font-size="11">Budget line</text>
</svg>`

export const budgetConstraint: TopicContent = [
  { type: 'h2', en: 'What is Budget Constraint?', ru: 'Что такое бюджетное ограничение?' },
  { type: 'p', en: 'Budget Constraint shows all the different combinations of goods you can buy with your money. Income = (Price₁ × Q₁) + (Price₂ × Q₂).', ru: 'Бюджетное ограничение показывает все комбинации товаров, которые вы можете купить. Доход = P₁×Q₁ + P₂×Q₂.' },
  { type: 'h3', en: 'The Budget Line', ru: 'Бюджетная линия' },
  { type: 'ul', items: [
    { en: 'Points ON the line: you spend ALL your money', ru: 'Точки НА линии — тратите все деньги' },
    { en: 'Points BELOW: you save money', ru: 'Точки ПОД линией — сбережения' },
    { en: 'Points ABOVE: unaffordable', ru: 'Точки НАД линией — недоступно' },
  ]},
  { type: 'h3', en: 'Slope', ru: 'Наклон' },
  { type: 'formula', lines: ['Slope = -(Price of Good 1) / (Price of Good 2). Shows opportunity cost.'] },
  { type: 'hr' },
  { type: 'h2', en: 'Example from the textbook: Shelter and Food', ru: 'Пример из учебника: жильё и еда' },
  { type: 'p', en: 'Income M = $100/wk, spent on shelter and food. Price of shelter Ps = $5/sq yd; price of food Pf = $10/lb. A bundle is a specific combination: e.g. Bundle A = (5 shelter, 7 food), Bundle B = (3 shelter, 8 food).', ru: 'Доход M = $100/нед., тратится на жильё и еду. Цена жилья Ps = $5/кв.м, еды Pf = $10/фунт. Набор — комбинация товаров: A = (5 жилья, 7 еды), B = (3, 8).' },
  { type: 'h3', en: 'Maximum quantities', ru: 'Максимальные количества' },
  { type: 'ul', items: [
    { en: 'All income on shelter: M/Ps = 100/5 = 20 sq yd/wk — point K (20, 0)', ru: 'Весь доход на жильё: 20 кв.м/нед. — точка K' },
    { en: 'All income on food: M/Pf = 100/10 = 10 lb/wk — point L (0, 10)', ru: 'Весь доход на еду: 10 фунтов/нед. — точка L' },
  ]},
  { type: 'p', en: 'The budget line B joins K and L. Any bundle on the line (e.g. E = (12, 4)) exhausts income. Point D = (5, 4) is below the line — income not fully spent.', ru: 'Бюджетная линия B соединяет K и L. Точка E = (12, 4) на линии; D = (5, 4) под линией.' },
  { type: 'graph', ascii: 'Budget line', svg: BUDGET_LINE_SVG },
  { type: 'formula', lines: ['Budget constraint = set of all bundles that exactly exhaust income at given prices. Also called the budget line.', 'Slope = -Ps/Pf = -5/10 = -1/2. |Slope| = opportunity cost of one more unit of shelter (units of food given up).'] },
  { type: 'hr' },
  { type: 'h2', en: 'How the Budget Line Changes', ru: 'Как меняется бюджетная линия' },
  { type: 'table', headers: ['Change', 'Effect'], rows: [
    ['Income increases', 'Shifts OUTWARD (parallel)'],
    ['Income decreases', 'Shifts INWARD (parallel)'],
    ['Price of Good 1 increases', 'Rotates INWARD around Good 2 intercept'],
    ['Price of Good 1 decreases', 'Rotates OUTWARD around Good 2 intercept'],
  ]},
]
