import type { TopicContent } from '../../components/TopicContent'

export const goodsMarketMultiplier: TopicContent = [
  { type: 'h2', en: 'Goods Market & Multiplier', ru: 'Рынок товаров и мультипликатор' },
  { type: 'p', en: 'In the short run, output is determined by demand. Consumption function: C = C₀ + cY (autonomous + marginal propensity to consume × income).', ru: 'В краткосрочном периоде выпуск определяется спросом. Функция потребления: C = C₀ + cY.' },
  { type: 'h3', en: 'Spending multiplier', ru: 'Мультипликатор расходов' },
  { type: 'formula', lines: ['Multiplier = 1 / (1 - c) or 1 / (1 - MPC). ΔY = multiplier × ΔG (or ΔI).', 'Paradox of thrift: if everyone saves more, aggregate demand falls, income may fall.'] },
]
