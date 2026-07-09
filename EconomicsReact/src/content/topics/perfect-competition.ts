import type { TopicContent } from '../../components/TopicContent'

export const perfectCompetition: TopicContent = [
  { type: 'p', en: 'Source: Frank Ch. 10 (Competitive Supply). Exam #15.', ru: 'Источник: Frank Ch. 10. Exam #15.' },
  { type: 'h2', en: 'Conditions', ru: 'Условия' },
  { type: 'p', en: 'Many firms, homogeneous product, free entry/exit, perfect information. Price taker.', ru: 'Много фирм, однородный продукт, свободный вход, price taker.' },
  { type: 'hr' },
  { type: 'h2', en: 'Firm demand and P = MC', ru: 'Спрос фирмы и P = MC' },
  { type: 'formula', lines: ['MR = MC → P = MR = AR → P = MC', 'Frank Fig. 10.2: P = $20 → q* = 260'] },
  { type: 'hr' },
  { type: 'h2', en: 'Shutdown rule (SR)', ru: 'Правило shutdown (SR)' },
  { type: 'formula', lines: ['Operate if P ≥ min AVC', 'Shut down if P < min AVC', 'SR supply = MC above min AVC'] },
  { type: 'p', en: 'Frank bakery: FC=$1000, min AVC=$2, min ATC=$4. P=$3 → operate; P=$1.50 → shut down.', ru: 'Пекарня Frank: P=$3 → работать; P=$1,50 → закрыться.' },
  { type: 'hr' },
  { type: 'h2', en: 'Long-run equilibrium', ru: 'Долгосрочное равновесие' },
  { type: 'formula', lines: ['P = MR = MC = min LAC', 'Economic profit π = 0'] },
  { type: 'hr' },
  { type: 'h2', en: 'vs Monopoly', ru: 'vs Монополия' },
  { type: 'table', headers: ['', 'Competition', 'Monopoly'], rows: [
    ['Demand', 'Horizontal', 'Downward'],
    ['Rule', 'P = MC', 'MR = MC, P > MC'],
    ['LR profit', '0', '> 0 possible'],
    ['DWL', 'No', 'Yes'],
  ]},
]
