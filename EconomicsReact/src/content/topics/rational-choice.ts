import type { TopicContent } from '../../components/TopicContent'

export const rationalChoice: TopicContent = [
  { type: 'h2', en: 'What is Rational Choice?', ru: 'Что такое рациональный выбор?' },
  { type: 'p', en: 'Consumers maximize utility (satisfaction) given their budget constraint. They choose the best combination of goods they can afford.', ru: 'Потребители максимизируют полезность при бюджетном ограничении.' },
  { type: 'h3', en: 'Key Concepts', ru: 'Ключевые концепции' },
  { type: 'table', headers: ['Term', 'Meaning'], rows: [
    ['Utility', 'Satisfaction from consuming goods'],
    ['Indifference curve', 'All combinations that give same utility'],
    ['Marginal utility', 'Extra utility from one more unit'],
    ['Consumer equilibrium', 'Budget line touches highest indifference curve'],
  ]},
  { type: 'hr' },
  { type: 'h2', en: 'Indifference Curves', ru: 'Кривые безразличия' },
  { type: 'p', en: 'Each curve shows bundles that give the same level of satisfaction. Higher curves = more satisfaction. Properties: downward sloping, convex to origin, do not cross.', ru: 'Кривая — комбинации с одинаковой полезностью. Выше = больше удовлетворения.' },
  { type: 'hr' },
  { type: 'h2', en: 'Consumer Equilibrium', ru: 'Равновесие потребителя' },
  { type: 'p', en: 'Where the budget line is tangent to an indifference curve. MRS = P₁/P₂.', ru: 'Бюджетная линия касается кривой безразличия. MRS = P₁/P₂.' },
  { type: 'formula', lines: ['MRS = MU₁ / MU₂ = P₁ / P₂', 'Cost-Benefit: take action if marginal benefit ≥ marginal cost.'] },
]
