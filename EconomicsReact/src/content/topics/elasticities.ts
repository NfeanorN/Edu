import type { TopicContent } from '../../components/TopicContent'

export const elasticities: TopicContent = [
  { type: 'h2', en: 'What is Elasticity?', ru: 'Что такое эластичность?' },
  { type: 'p', en: 'Elasticity measures how responsive quantity demanded is to changes in price, income, or other factors. % change in Q / % change in P (or I, or P_other).', ru: 'Эластичность — реакция спроса на изменение цены, дохода и др.' },
  { type: 'h3', en: 'Price elasticity of demand', ru: 'Ценовая эластичность спроса' },
  { type: 'formula', lines: ['Ed = (% change in Qd) / (% change in P). Elastic if |Ed| > 1, inelastic if |Ed| < 1.'] },
  { type: 'h3', en: 'Income elasticity', ru: 'Доходная эластичность' },
  { type: 'p', en: 'Normal good: positive. Inferior good: negative.', ru: 'Нормальный товар: положительная. Низший: отрицательная.' },
  { type: 'h3', en: 'Cross-price elasticity', ru: 'Перекрёстная эластичность' },
  { type: 'p', en: 'Substitutes: positive. Complements: negative.', ru: 'Заменители: положительная. Дополняющие: отрицательная.' },
]
