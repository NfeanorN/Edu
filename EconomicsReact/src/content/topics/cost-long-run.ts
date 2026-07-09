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
  { type: 'hr' },
  { type: 'h2', en: 'Long Run Average Cost (LRAC): Detailed Graph', ru: 'LRAC: детальный график' },
  { type: 'p', en: 'LRAC is the envelope of all short-run ATC curves. Each point = minimum cost at optimal plant size. LRAC touches each ATC at its optimal point.', ru: 'LRAC — огибающая всех ATC. Каждая точка — минимум издержек при оптимальном размере завода.' },
  { type: 'graph', ascii: `Cost per unit ($)
  |
  |  ATC₁        ATC₂        ATC₃
  |   \\          / \\        / \\
  |    \\        /   \\      /   \\
  |     \\      /     \\    /     \\
  |      \\    /       \\  /       \\
  |       \\  /         \\/         \\
  |        \\/           *_________ LRAC
  |
  0+----+----+----+----+----+----+ Q
              ↑
            MES` },
  { type: 'p', en: 'At tangency: LRAC = ATC (optimal plant). Left: LRAC < ATC (expand). Right: LRAC < ATC (contract).', ru: 'В точке касания: LRAC = ATC (оптимальный размер). Слева: расширяться. Справа: сокращаться.' },
  { type: 'h3', en: 'Minimum Efficient Scale (MES)', ru: 'Минимальный эффективный масштаб' },
  { type: 'p', en: 'MES = smallest output where LRAC reaches minimum. Below MES: economies not fully exploited.', ru: 'MES — минимальный объём, где LRAC минимум.' },
  { type: 'hr' },
  { type: 'h2', en: 'Long Run Total Cost (LRTC) and LRMC', ru: 'LRTC и LRMC' },
  { type: 'p', en: 'LRTC = minimum total cost when all inputs variable. LRTC = LRAC × Q. Slope of LRTC = LRMC.', ru: 'LRTC — минимальные общие издержки. Наклон LRTC = LRMC.' },
  { type: 'graph', ascii: `Total Cost ($)
  |
  |                    LRTC
  |                   /
  |                  /
  |                 /
  |                /
  |               /
  0+----+----+----+----+ Q` },
  { type: 'p', en: 'LRMC = ΔLRTC / ΔQ = slope of LRTC. When LRMC < LRAC → LRAC falls. When LRMC > LRAC → LRAC rises. LRMC crosses LRAC at min LRAC (MES).', ru: 'LRMC пересекает LRAC в минимуме LRAC (MES).' },
  { type: 'graph', ascii: `Cost per unit ($)
  |
  |                    LRMC
  |                   /
  |                  /
  |                 /
  |                /
  |               /
  |              /
  |             /
  |            /
  |           /
  |          /
  |         /
  |        /
  |       /
  |      /
  |     /
  |    /
  |   /
  |  /
  | /
  |/_________________ LRAC
  |
  0+----+----+----+----+ Q
              ↑
            MES` },
  { type: 'hr' },
  { type: 'h2', en: 'Sources of Economies and Diseconomies', ru: 'Источники эффекта и антиэффекта масштаба' },
  { type: 'h3', en: 'Economies of Scale', ru: 'Эффект масштаба' },
  { type: 'p', en: 'Specialization, bulk buying, spreading fixed costs (R&D, advertising), technology, financial advantages.', ru: 'Специализация, оптовые закупки, распределение постоянных издержек, технологии, финансирование.' },
  { type: 'h3', en: 'Diseconomies of Scale', ru: 'Антиэффект масштаба' },
  { type: 'p', en: 'Coordination problems, communication issues, bureaucracy, motivation problems in large organizations.', ru: 'Проблемы координации, коммуникации, бюрократия, мотивация.' },
  { type: 'hr' },
  { type: 'h2', en: 'Short Run vs Long Run: Comparison', ru: 'Сравнение краткосрочного и долгосрочного' },
  { type: 'table', headers: ['Aspect', 'Short Run', 'Long Run'], rows: [
    ['Inputs', 'At least one fixed', 'All variable'],
    ['Cost curves', 'ATC, AVC, AFC, MC', 'LRAC, LRMC'],
    ['Fixed costs', 'Yes (FC exists)', 'No (all variable)'],
    ['Plant size', 'Fixed', 'Variable'],
    ['Decision', 'How much to produce', 'Plant size + how much'],
  ]},
]
