import type { TopicContent } from '../../components/TopicContent'

export const costLongRun: TopicContent = [
  { type: 'h2', en: 'Long Run', ru: 'Долгосрочный период' },
  { type: 'p', en: 'All inputs are variable. LRAC = Long Run Average Cost curve (envelope of short-run ATC curves).', ru: 'Все ресурсы переменные. LRAC — огибающая краткосрочных ATC.' },
  { type: 'h3', en: 'Returns to scale', ru: 'Отдача от масштаба' },
  { type: 'table', headers: ['Type', 'Effect'], rows: [
    ['Increasing returns', 'LRAC falls as Q increases'],
    ['Constant returns', 'LRAC flat'],
    ['Decreasing returns', 'LRAC rises as Q increases'],
  ]},
  { type: 'formula', lines: ['Economies of scale: lower average cost at higher output. Diseconomies: higher average cost at very high output.'] },
]
