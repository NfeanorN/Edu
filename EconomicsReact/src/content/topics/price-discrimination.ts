import type { TopicContent } from '../../components/TopicContent'

export const priceDiscrimination: TopicContent = [
  { type: 'h2', en: 'Price Discrimination', ru: 'Ценовая дискриминация' },
  { type: 'p', en: 'Charging different prices to different customers for the same good. Requires market power and no arbitrage.', ru: 'Разные цены разным покупателям за один товар.' },
  { type: 'h3', en: 'Degrees', ru: 'Степени' },
  { type: 'ul', items: [
    { en: 'First degree: each unit at buyer\'s max willingness to pay', ru: 'Первая: каждая единица по макс. готовности платить' },
    { en: 'Second degree: different prices for different quantities (volume discounts)', ru: 'Вторая: разные цены по объёму' },
    { en: 'Third degree: different groups (e.g. students, seniors)', ru: 'Третья: разные группы (студенты, пенсионеры)' },
  ]},
  { type: 'formula', lines: ['Mark-up inversely related to elasticity. More elastic demand → lower mark-up.'] },
]
