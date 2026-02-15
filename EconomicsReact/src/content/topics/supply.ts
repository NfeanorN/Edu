import type { TopicContent } from '../../components/TopicContent'

export const supply: TopicContent = [
  { type: 'h2', en: 'What is Supply?', ru: 'Что такое предложение?' },
  { type: 'p', en: 'Supply is how much producers are willing and able to sell at different prices. It shows the relationship between price and quantity supplied.', ru: 'Предложение — сколько производители готовы продать при разных ценах.' },
  { type: 'hr' },
  { type: 'h2', en: 'The Supply Curve', ru: 'Кривая предложения' },
  { type: 'h3', en: 'Law of Supply', ru: 'Закон предложения' },
  { type: 'p', en: 'When price goes UP, quantity supplied goes UP. When price goes DOWN, quantity supplied goes DOWN. The supply curve is upward-sloping.', ru: 'Цена растёт — объём предложения растёт. Цена падает — объём предложения падает. Кривая предложения восходящая.' },
  { type: 'graph', ascii: `Price (P)
  |
 6|                    *  S
  |                  /
 4|                *
  |              /
 2|            *
  |          /
 0+----+----+----+----+ Quantity (Q)` },
  { type: 'hr' },
  { type: 'h2', en: 'Two Types of Changes', ru: 'Два типа изменений' },
  { type: 'h4', en: '1. Movement ALONG the curve', ru: 'Движение ВДОЛЬ кривой' },
  { type: 'p', en: 'Only the price of the product changes. Same curve, different point.', ru: 'Меняется только цена товара.' },
  { type: 'h4', en: '2. SHIFT of the curve', ru: 'Сдвиг кривой' },
  { type: 'p', en: 'Something other than price changes (costs, technology, number of sellers). Shift RIGHT = more supply. Shift LEFT = less supply.', ru: 'Меняются другие факторы. Вправо — больше предложения, влево — меньше.' },
  { type: 'hr' },
  { type: 'h2', en: 'Factors That Shift Supply', ru: 'Факторы, сдвигающие предложение' },
  { type: 'table', headers: ['Factor', 'Effect on supply'], rows: [
    ['Input prices fall', 'Shift RIGHT (more)'],
    ['Input prices rise', 'Shift LEFT (less)'],
    ['Better technology', 'Shift RIGHT'],
    ['More sellers', 'Shift RIGHT'],
    ['Fewer sellers', 'Shift LEFT'],
    ['Expect higher price later', 'May shift LEFT now'],
    ['Price of related good (substitute in production) rises', 'Supply of our good shifts LEFT'],
  ]},
  { type: 'hr' },
  { type: 'h2', en: 'Supply and Demand Together', ru: 'Спрос и предложение вместе' },
  { type: 'p', en: 'Market equilibrium: where demand and supply curves intersect. Quantity demanded = quantity supplied at the equilibrium price.', ru: 'Равновесие рынка — пересечение кривых спроса и предложения.' },
  { type: 'graph', ascii: `Price (P)
  |
  |      S
  |    /   \\
  |  /   E   \\   E = equilibrium
  | /   *   \\   D = demand, S = supply
  |/___/ \\___\\
  |  D
 0+----+----+----+ Quantity (Q)
           Q*` },
]
