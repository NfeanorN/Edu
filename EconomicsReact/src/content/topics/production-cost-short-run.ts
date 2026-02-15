import type { TopicContent } from '../../components/TopicContent'

export const productionCostShortRun: TopicContent = [
  { type: 'h2', en: 'Short Run vs Long Run', ru: 'Краткосрочный vs долгосрочный период' },
  { type: 'p', en: 'Short run: at least one input is FIXED (e.g. factory size). Only variable inputs (labor, materials) can change.', ru: 'Краткосрочный: хотя бы один ресурс фиксирован.' },
  { type: 'hr' },
  { type: 'h2', en: 'Cost Types', ru: 'Типы издержек' },
  { type: 'table', headers: ['Cost', 'Formula', 'Meaning'], rows: [
    ['Total Cost (TC)', 'TC = FC + VC', 'All costs'],
    ['Fixed Cost (FC)', '—', 'Same regardless of output'],
    ['Variable Cost (VC)', '—', 'Change with output'],
    ['Average Total Cost (ATC)', 'TC / Q', 'Cost per unit'],
    ['Average Variable Cost (AVC)', 'VC / Q', 'Variable cost per unit'],
    ['Average Fixed Cost (AFC)', 'FC / Q', 'Fixed cost per unit'],
    ['Marginal Cost (MC)', 'ΔTC / ΔQ', 'Extra cost of one more unit'],
  ]},
  { type: 'hr' },
  { type: 'h2', en: 'Marginal Cost (MC) and Average Costs', ru: 'Предельные и средние издержки' },
  { type: 'h3', en: 'Marginal Cost (MC)', ru: 'Предельные издержки' },
  { type: 'p', en: 'MC = extra cost of producing one more unit. MC = ΔTC / ΔQ. Example: TC = $100 at Q=10 and $115 at Q=11 → MC = $15 per unit.', ru: 'MC — дополнительные издержки на ещё одну единицу. MC = ΔTC / ΔQ.' },
  { type: 'h3', en: 'Average Total Cost (ATC)', ru: 'Средние общие издержки' },
  { type: 'p', en: 'ATC = TC / Q. ATC = AFC + AVC. When MC < ATC → ATC falls; when MC > ATC → ATC rises. MC crosses ATC at min ATC (and AVC at min AVC).', ru: 'ATC = TC / Q. MC пересекает ATC и AVC в их минимумах.' },
  { type: 'hr' },
  { type: 'h2', en: 'Marginal Cost: Graphs', ru: 'Предельные издержки: графики' },
  { type: 'h3', en: 'Graph 1: MC curve (U-shaped)', ru: 'Кривая MC (U-образная)' },
  { type: 'p', en: 'MC is U-shaped: often falls at low output, then rises (diminishing returns).', ru: 'MC имеет U-образную форму: сначала может снижаться, затем растёт.' },
  { type: 'graph', ascii: `Cost ($)
  |
  |           MC
  |          /
  |         /
  |        /  min
  |       /  *
  |      /  /
  |     /  /
  |____/  /
  |     /
  0+----+----+----+----+ Q` },
  { type: 'h3', en: 'Graph 2: MC = slope of TC', ru: 'MC = наклон TC' },
  { type: 'p', en: 'MC equals the slope of the Total Cost curve at each output. Steep TC → high MC; flat TC → low MC.', ru: 'MC — наклон кривой TC в каждой точке.' },
  { type: 'graph', ascii: `TC
  |
  |                    /
  |                   /  slope = MC
  |                  /
  |                 /
  |_______________/
  0+----+----+----+----+ Q` },
  { type: 'h3', en: 'Graph 3: MC, ATC, AVC — minimum points', ru: 'MC, ATC, AVC — точки минимума' },
  { type: 'p', en: 'MC crosses ATC at min ATC (point A). MC crosses AVC at min AVC (point B).', ru: 'MC пересекает ATC в минимуме ATC и AVC в минимуме AVC.' },
  { type: 'graph', ascii: `Cost
  |
  |          MC
  |         /\\
  |        /  \\
  |       /    \\_____ ATC
  |      /     /   \\___  A (min ATC)
  |     /     /  \\    \\___ AVC
  |    /     /   B (min AVC)
  |   /     /
  |__/_____/
  0+----+----+----+----+ Q
          B   A` },
  { type: 'h3', en: 'Numerical example', ru: 'Числовой пример' },
  { type: 'table', headers: ['Q', 'TC ($)', 'MC ($)', 'ATC ($)'], rows: [
    ['0', '20', '—', '—'],
    ['1', '30', '10', '30'],
    ['2', '38', '8', '19'],
    ['3', '45', '7', '15'],
    ['4', '54', '9', '13.5'],
    ['5', '65', '11', '13'],
    ['6', '78', '13', '13'],
    ['7', '93', '15', '13.3'],
  ]},
  { type: 'p', en: 'MC falls then rises. ATC falls until MC = ATC (min ATC near Q=5–6), then rises.', ru: 'MC сначала падает, затем растёт. ATC минимальна там, где MC = ATC.' },
  { type: 'hr' },
  { type: 'h2', en: 'Marginal Product (MP) and MC', ru: 'Предельный продукт и MC' },
  { type: 'p', en: 'When MP rises → MC falls; when MP falls (diminishing returns) → MC rises. MC is inversely related to MP.', ru: 'Рост MP → падение MC; падение MP → рост MC.' },
]
