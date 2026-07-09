import type { TopicContent } from '../../components/TopicContent'

export const gdpMacro: TopicContent = [
  { type: 'h2', en: 'GDP & Macro Variables', ru: 'ВВП и макропеременные' },
  { type: 'p', en: 'GDP = value of all final goods and services produced in a period. Nominal GDP uses current prices; Real GDP uses constant (base-year) prices.', ru: 'ВВП — стоимость всех конечных товаров и услуг. Номинальный и реальный ВВП.' },
  { type: 'h3', en: 'Measurement', ru: 'Измерение' },
  { type: 'ul', items: [
    { en: 'Expenditure approach: C + I + G + (X - M)', ru: 'По расходам: C + I + G + (X - M)' },
    { en: 'CPI: Consumer Price Index (inflation)', ru: 'ИПЦ — индекс потребительских цен' },
    { en: 'Unemployment rate: unemployed / labor force', ru: 'Уровень безработицы' },
  ]},
  { type: 'formula', lines: ['Real GDP = Nominal GDP / Price index. GDP deflator = (Nominal / Real) × 100.'] },
]
