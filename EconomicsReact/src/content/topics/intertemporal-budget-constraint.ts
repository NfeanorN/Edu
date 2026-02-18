import type { TopicContent } from '../../components/TopicContent'

const INTERTEMPORAL_BUDGET_SVG = `<svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="260"/>
  <line class="axis" x1="50" y1="260" x2="360" y2="260"/>
  <path class="budget-line" d="M 50 60 L 350 240"/>
  <line class="endowment" x1="200" y1="60" x2="200" y2="150" stroke="#27ae60" stroke-width="2" stroke-dasharray="5,4"/>
  <line class="endowment" x1="200" y1="150" x2="50" y2="150" stroke="#27ae60" stroke-width="2" stroke-dasharray="5,4"/>
  <circle cx="200" cy="150" r="5" fill="#27ae60" stroke="#1e8449"/>
  <text x="28" y="18">C₂</text>
  <text x="358" y="272">C₁</text>
  <text x="210" y="145" fill="#27ae60" font-weight="600">E</text>
  <text x="210" y="75">Y₂</text>
  <text x="28" y="155">Y₁</text>
  <text x="300" y="200" font-size="11">Slope = -(1+r)</text>
</svg>`

export const intertemporalBudgetConstraint: TopicContent = [
  { type: 'h2', en: 'What is Intertemporal Budget Constraint?', ru: 'Что такое межвременное бюджетное ограничение?' },
  { type: 'p', en: 'Extends budget constraint to choices across time periods (period 1 vs period 2). Shows how to allocate consumption between periods, taking into account interest rates and the ability to save or borrow.', ru: 'Расширяет бюджетное ограничение на выбор между временными периодами. Показывает распределение потребления между периодами с учётом процентной ставки и возможности сберегать или занимать.' },
  { type: 'hr' },
  { type: 'h2', en: 'Two-Period Model', ru: 'Модель двух периодов' },
  { type: 'p', en: 'Period 1 (today): income Y₁, consumption C₁. Period 2 (tomorrow): income Y₂, consumption C₂. Interest rate r. If C₁ < Y₁ → save S = Y₁ - C₁. If C₁ > Y₁ → borrow B = C₁ - Y₁.', ru: 'Период 1: доход Y₁, потребление C₁. Период 2: Y₂, C₂. Ставка r. Если C₁ < Y₁ → сберегаете. Если C₁ > Y₁ → занимаете.' },
  { type: 'hr' },
  { type: 'h2', en: 'The Intertemporal Budget Constraint', ru: 'Межвременное бюджетное ограничение' },
  { type: 'formula', lines: ['C₁ + C₂/(1 + r) = Y₁ + Y₂/(1 + r)', 'Present value of consumption = Present value of income', 'Приведённая стоимость потребления = Приведённая стоимость дохода'] },
  { type: 'p', en: 'Alternative form: C₂ = Y₂ + (Y₁ - C₁)(1 + r). Period 2 consumption = period 2 income + (period 1 savings) × (1 + interest rate).', ru: 'Альтернативная форма: C₂ = Y₂ + (Y₁ - C₁)(1 + r). Потребление периода 2 = доход периода 2 + (сбережения периода 1) × (1 + ставка).' },
  { type: 'hr' },
  { type: 'h2', en: 'The Intertemporal Budget Line', ru: 'Межвременная бюджетная линия' },
  { type: 'p', en: 'Graph with C₁ on X-axis, C₂ on Y-axis. Slope = -(1 + r). Opportunity cost of period 1 consumption: consuming 1 more unit in period 1 means giving up (1 + r) units in period 2.', ru: 'График: C₁ по оси X, C₂ по оси Y. Наклон = -(1 + r). Альтернативная стоимость потребления периода 1: ещё одна единица в периоде 1 = отказ от (1 + r) единиц в периоде 2.' },
  { type: 'graph', ascii: 'Intertemporal budget line', svg: INTERTEMPORAL_BUDGET_SVG },
  { type: 'p', en: 'Intercepts: Horizontal (max C₁) = Y₁ + Y₂/(1 + r). Vertical (max C₂) = Y₂ + Y₁(1 + r).', ru: 'Пересечения: горизонтальное = Y₁ + Y₂/(1 + r), вертикальное = Y₂ + Y₁(1 + r).' },
  { type: 'h3', en: 'Endowment Point', ru: 'Точка наделённости' },
  { type: 'p', en: 'E = (Y₁, Y₂) — consumption if you neither save nor borrow. Above E: save in period 1. Below E: borrow in period 1.', ru: 'E = (Y₁, Y₂) — потребление без сбережений и займов. Выше E: сберегаете в периоде 1. Ниже E: занимаете в периоде 1.' },
  { type: 'hr' },
  { type: 'h2', en: 'Example', ru: 'Пример' },
  { type: 'p', en: 'Y₁ = 100€, Y₂ = 50€, r = 0.1. Budget constraint: C₁ + C₂/1.1 = 145.45€. If save 20: C₁ = 80, C₂ = 72. If borrow 20: C₁ = 120, C₂ = 28.', ru: 'Y₁ = 100€, Y₂ = 50€, r = 0.1. Ограничение: C₁ + C₂/1.1 = 145.45€. Сберечь 20: C₁ = 80, C₂ = 72. Занять 20: C₁ = 120, C₂ = 28.' },
  { type: 'hr' },
  { type: 'h2', en: 'What Changes the Budget Line?', ru: 'Что меняет бюджетную линию?' },
  { type: 'table', headers: ['Change', 'Effect'], rows: [
    ['Interest rate r increases', 'Line rotates around E, steeper slope'],
    ['Interest rate r decreases', 'Line rotates around E, flatter slope'],
    ['Y₁ or Y₂ increases', 'Line shifts outward'],
  ]},
  { type: 'hr' },
  { type: 'h2', en: 'Link to Consumption Function', ru: 'Связь с функцией потребления' },
  { type: 'p', en: 'In macroeconomics, intertemporal budget constraint underlies the consumption function C = C(Y, Y^e, wealth, r), where consumption depends on current income, expected future income, wealth, and interest rate.', ru: 'В макроэкономике межвременное бюджетное ограничение лежит в основе функции потребления C = C(Y, Y^e, богатство, r).' },
]
