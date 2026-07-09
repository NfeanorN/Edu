import type { TopicContent } from '../../components/TopicContent'

export const fiscalMonetaryPolicy: TopicContent = [
  { type: 'h2', en: 'Fiscal Policy', ru: 'Фискальная политика' },
  { type: 'p', en: 'Government spending (G) and taxes (T). Expansionary: increase G or cut T → AD↑. Contractionary: decrease G or raise T → AD↓.', ru: 'Гос. расходы и налоги. Стимулирующая: G↑ или T↓. Сдерживающая: G↓ или T↑.' },
  { type: 'hr' },
  { type: 'h2', en: 'Interest Rate (i)', ru: 'Процентная ставка' },
  { type: 'p', en: 'Interest rate = price of borrowing (or return on lending). The key variable through which monetary policy affects the economy.', ru: 'Процентная ставка — цена заимствования, главная переменная денежной политики.' },
  { type: 'h3', en: 'Nominal vs Real', ru: 'Номинальная и реальная ставка' },
  { type: 'formula', lines: ['Real interest rate ≈ Nominal rate − Inflation (π).', 'Example: nominal 5%, inflation 2% → real ≈ 3%.'] },
  { type: 'h3', en: 'How i affects the economy', ru: 'Как i влияет на экономику' },
  { type: 'ul', items: [
    { en: 'Higher i → higher cost of borrowing → Investment (I) falls', ru: 'Рост i → меньше инвестиций' },
    { en: 'Higher i → more incentive to save → Consumption (C) often falls', ru: 'Рост i → потребление падает' },
    { en: 'So i↑ → AD↓ → Y↓; i↓ → AD↑ → Y↑', ru: 'i↑ → AD↓; i↓ → AD↑' },
  ]},
  { type: 'h3', en: 'Money market: where i is determined', ru: 'Денежный рынок: откуда берётся i' },
  { type: 'p', en: 'Central bank influences money supply (M). Demand for money L(Y, i): rises with Y, falls with i. Equilibrium M = L(Y, i) determines i. M↑ → i↓; M↓ → i↑. In practice CB often sets a policy rate (key rate).', ru: 'ЦБ влияет на M. Спрос на деньги L(Y,i). Равновесие M = L определяет i. Рост M → i падает. ЦБ задаёт ключевую ставку.' },
  { type: 'graph', ascii: `i
  |
  |  M (supply)
  |  |
  |  |  *  equilibrium i*
  |  | / \\
  |  |/   \\  L(Y,i) demand for money
  |  *     \\
  0+----+----+----+ M, L` },
  { type: 'hr' },
  { type: 'h2', en: 'Monetary Policy', ru: 'Денежно-кредитная политика' },
  { type: 'p', en: 'Central bank: interest rates and money supply. Expansionary: lower i or increase M → AD↑. Contractionary: raise i or reduce M → AD↓.', ru: 'ЦБ: ставка процента и денежная масса. Стимулирующая: i↓ или M↑. Сдерживающая: i↑ или M↓.' },
  { type: 'h2', en: 'Policy Goals', ru: 'Цели политики' },
  { type: 'ul', items: [
    { en: 'Counter recession: expansionary (G↑, T↓, M↑, i↓)', ru: 'Против спада: стимулирующая политика' },
    { en: 'Counter inflation: contractionary (G↓, T↑, M↓, i↑)', ru: 'Против инфляции: сдерживающая политика' },
  ]},
]
