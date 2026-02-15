import type { TopicContent } from '../../components/TopicContent'

export const demand: TopicContent = [
  { type: 'h2', en: 'What is Demand?', ru: 'Что такое спрос?' },
  { type: 'p', en: 'Demand is how much of a product or service people want to buy at different prices. It shows the relationship between price and the quantity people are willing to purchase.', ru: 'Спрос — то, сколько товара или услуги люди хотят купить при разных ценах.' },
  { type: 'hr' },
  { type: 'h2', en: 'The Demand Curve', ru: 'Кривая спроса' },
  { type: 'h3', en: 'Basic Concept', ru: 'Основная концепция' },
  { type: 'ul', items: [
    { en: 'X-axis: Quantity (how many units people want to buy)', ru: 'Ось X: Количество' },
    { en: 'Y-axis: Price (how much it costs)', ru: 'Ось Y: Цена' },
  ]},
  { type: 'h3', en: 'Key Rule — Law of Demand', ru: 'Закон спроса' },
  { type: 'p', en: 'When price goes UP, quantity demanded goes DOWN. When price goes DOWN, quantity demanded goes UP. This creates a downward-sloping curve.', ru: 'Когда цена растёт, количество спроса падает. Когда цена падает, количество спроса растёт.' },
  { type: 'hr' },
  { type: 'h2', en: 'Two Types of Changes', ru: 'Два типа изменений' },
  { type: 'h4', en: '1. Movement ALONG the curve', ru: 'Движение ВДОЛЬ кривой' },
  { type: 'p', en: 'Only the PRICE of the product changes. We move from one point to another on the SAME curve.', ru: 'Меняется только цена продукта.' },
  { type: 'h4', en: '2. SHIFT of the curve', ru: 'Сдвиг кривой' },
  { type: 'p', en: 'Something OTHER than price changes. The ENTIRE curve moves. At EVERY price level, people want a different quantity.', ru: 'Меняется что-то кроме цены. Вся кривая перемещается.' },
  { type: 'hr' },
  { type: 'h2', en: '8 Factors That Shift Demand', ru: '8 факторов сдвига спроса' },
  { type: 'table', headers: ['Factor', 'Shift'], rows: [
    ['Price of complement falls', 'RIGHT'],
    ['Price of substitute falls', 'LEFT'],
    ['Income rises (normal good)', 'RIGHT'],
    ['Income rises (inferior good)', 'LEFT'],
    ['Population grows', 'RIGHT'],
    ['Price increase expected', 'RIGHT'],
    ['Income decline expected', 'LEFT'],
    ['Tastes shift in favor', 'RIGHT'],
  ]},
  { type: 'formula', lines: ['Right shift = more demand at all prices. Left shift = less demand at all prices.'] },
]
