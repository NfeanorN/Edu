import type { TopicContent } from '../../components/TopicContent'

export const productionFunction: TopicContent = [
  { type: 'h2', en: 'What is a Production Function?', ru: 'Что такое производственная функция?' },
  { type: 'p', en: 'A production function shows the maximum output (Q) that can be produced from given amounts of inputs (labour L, capital K) with a given technology. It describes the technical relationship between inputs and output.', ru: 'Производственная функция показывает максимальный выпуск (Q) при заданных объёмах факторов (труд L, капитал K) и данной технологии.' },
  { type: 'formula', lines: ['Q = F(L, K, …)', 'Q = output, L = labour, K = capital, F = technology'] },
  { type: 'p', en: 'Example: 2 workers + 1 machine → 10 units/day. 4 workers + 1 machine → 18 units/day. Here K is fixed (short run); only L changes.', ru: 'Пример: 2 работника + 1 станок → 10 ед. 4 работника + 1 станок → 18 ед. Капитал фиксирован.' },
  { type: 'hr' },
  { type: 'h2', en: 'Total Product (TP), Average Product (AP), Marginal Product (MP)', ru: 'Совокупный, средний и предельный продукт' },
  { type: 'table', headers: ['Term', 'Formula', 'Meaning'], rows: [
    ['Total Product (TP)', 'Q = F(L, K)', 'Total output'],
    ['Average Product (AP)', 'AP = Q / L', 'Output per unit of labour'],
    ['Marginal Product (MP)', 'MP = ΔQ / ΔL', 'Extra output from one more unit of labour'],
  ]},
  { type: 'p', en: 'MP = extra output from one more worker. AP = average output per worker. When MP > AP → AP rises; when MP < AP → AP falls. MP crosses AP at max AP.', ru: 'MP — прирост выпуска от ещё одного работника. AP — средний выпуск на работника. MP пересекает AP в максимуме AP.' },
  { type: 'hr' },
  { type: 'h2', en: 'Graphs: TP, AP, and MP', ru: 'Графики TP, AP и MP' },
  { type: 'graph', ascii: `Output (Q)          MP, AP
  |                    |
  |      TP            |    MP
  |     /              |   /\\
  |    /               |  /  \\
  |   /    inflection   | /    \\___
  |  /    /            |/          AP
  | /    /             |     /
  |/    /              |    /
  0+----+----+---- L   0+----+----+---- L
         ↑                    ↑
    MP maximum           MP = AP (max AP)` },
  { type: 'hr' },
  { type: 'h2', en: 'Law of Diminishing Returns', ru: 'Закон убывающей отдачи' },
  { type: 'p', en: 'If one input (e.g. labour) is increased while another (e.g. capital) is fixed, the marginal product of the variable input will eventually decrease.', ru: 'При увеличении одного фактора при неизменном другом предельный продукт переменного фактора в итоге убывает.' },
  { type: 'hr' },
  { type: 'h2', en: 'Three Stages of Production', ru: 'Три стадии производства' },
  { type: 'table', headers: ['Stage', 'Condition', 'Description'], rows: [
    ['Stage I', 'MP > AP, AP rising', 'Increasing returns'],
    ['Stage II', 'MP < AP, MP > 0', 'Diminishing returns — rational zone'],
    ['Stage III', 'MP < 0', 'Negative returns — irrational'],
  ]},
  { type: 'p', en: 'Firms operate in Stage II. In Stage III, adding labour reduces total output (MP < 0).', ru: 'Рациональная зона — Стадия II. В Стадии III MP < 0 — добавление труда снижает выпуск.' },
  { type: 'hr' },
  { type: 'h2', en: 'Link to Costs: MP and Marginal Cost (MC)', ru: 'Связь с издержками: MP и MC' },
  { type: 'p', en: 'When MP rises → MC falls. When MP falls (diminishing returns) → MC rises. MC is inversely related to MP. See Production & Cost (Short Run) for full cost curves.', ru: 'Рост MP → падение MC. Падение MP → рост MC. MC обратно связан с MP.' },
]
