import type { TopicContent } from '../../components/TopicContent'

export const unemploymentInflation: TopicContent = [
  { type: 'h2', en: 'Unemployment & Inflation', ru: 'Безработица и инфляция' },
  { type: 'h3', en: 'Types of unemployment', ru: 'Типы безработицы' },
  { type: 'ul', items: [
    { en: 'Frictional: between jobs', ru: 'Фрикционная: между работами' },
    { en: 'Structural: skills mismatch', ru: 'Структурная: несоответствие квалификации' },
    { en: 'Cyclical: due to recession', ru: 'Циклическая: из-за спада' },
  ]},
  { type: 'h3', en: 'Measuring inflation', ru: 'Измерение инфляции' },
  { type: 'p', en: 'CPI (Consumer Price Index): cost of a basket of goods. GDP deflator: nominal GDP / real GDP. Inflation rate = % change in price index.', ru: 'ИПЦ — стоимость потребительской корзины. Дефлятор ВВП.' },
]
