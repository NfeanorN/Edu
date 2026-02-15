import type { TopicContent } from '../../components/TopicContent'

export const externalities: TopicContent = [
  { type: 'h2', en: 'Externalities', ru: 'Внешние эффекты' },
  { type: 'p', en: 'Cost or benefit that affects third parties not involved in the transaction. Negative: pollution. Positive: vaccination.', ru: 'Издержки или выгоды для третьих лиц.' },
  { type: 'h3', en: 'Negative externality', ru: 'Отрицательный внешний эффект' },
  { type: 'p', en: 'Social cost > private cost. Market overproduces. Solution: tax (Pigouvian tax) to align private and social cost.', ru: 'Общественные издержки > частные. Решение: налог.' },
  { type: 'h3', en: 'Positive externality', ru: 'Положительный внешний эффект' },
  { type: 'p', en: 'Social benefit > private benefit. Market underproduces. Solution: subsidy.', ru: 'Общественная выгода > частная. Решение: субсидия.' },
]
