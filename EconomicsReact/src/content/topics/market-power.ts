import type { TopicContent } from '../../components/TopicContent'

const DWL_SVG = `<svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="240"/>
  <line class="axis" x1="50" y1="240" x2="360" y2="240"/>
  <path class="mc" d="M 50 220 L 140 203 L 260 180 L 360 140"/>
  <path class="demand" d="M 50 50 L 140 106 L 260 180 L 360 220"/>
  <path class="dwl-area" d="M 140 106 L 140 203 L 260 180 Z"/>
  <line x1="50" y1="106" x2="140" y2="106" stroke="#e74c3c" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="140" y1="106" x2="140" y2="240" stroke="#e74c3c" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="50" y1="180" x2="260" y2="180" stroke="#27ae60" stroke-width="1" stroke-dasharray="4,3"/>
  <line x1="260" y1="180" x2="260" y2="240" stroke="#27ae60" stroke-width="1" stroke-dasharray="4,3"/>
  <circle cx="140" cy="106" r="4" fill="#e74c3c"/>
  <circle cx="260" cy="180" r="4" fill="#27ae60"/>
  <text x="28" y="110">Pm</text>
  <text x="28" y="184">Pc</text>
  <text x="145" y="252">Qm</text>
  <text x="265" y="252">Qc</text>
  <text x="28" y="18">P</text>
  <text x="358" y="255">Q</text>
  <text x="195" y="158" fill="#e74c3c" font-weight="600">DWL</text>
  <text x="310" y="75">D</text>
  <text x="310" y="155">MC</text>
</svg>`

export const marketPower: TopicContent = [
  { type: 'h2', en: 'Market Power', ru: 'Рыночная власть' },
  { type: 'p', en: 'Ability to set price above marginal cost. Monopoly: one seller. Oligopoly: few sellers.', ru: 'Возможность устанавливать цену выше предельных издержек.' },
  { type: 'h2', en: 'Perfect Competition', ru: 'Совершенная конкуренция' },
  { type: 'p', en: 'Many firms, identical product, free entry/exit. Each firm is a price taker — cannot influence price. Demand for the firm is horizontal at market P.', ru: 'Много фирм, одинаковый товар, свободный вход и выход. Фирма — price taker. Спрос для фирмы горизонтален на уровне P.' },
  { type: 'h3', en: 'Assumptions', ru: 'Условия' },
  { type: 'p', en: 'Many buyers and sellers; homogeneous product; free entry and exit; perfect information; firm faces horizontal demand at P.', ru: 'Много участников; однородный продукт; свободный вход и выход; полная информация; горизонтальный спрос при P.' },
  { type: 'h3', en: 'Profit maximization', ru: 'Максимизация прибыли' },
  { type: 'p', en: 'MR = MC. In perfect competition P = MR, so P = MC at profit-max output. Firm chooses q* where P = MC.', ru: 'MR = MC. При совершенной конкуренции P = MR, поэтому P = MC в точке максимума прибыли.' },
  { type: 'graph', ascii: `Market: P* from S and D.   Firm: horizontal D = P = MR
  P                         P
  |   S                     |     MC
  |   \\  P*                 |    /
  |    \\  *                 |   /  * P = MC
  |     \\/ \\  D             |  /  /|
  |      *   \\              | /  / | ATC
  |           \\             *--+----+--- D = MR = P
  0+----+---+--- Q          0+----+----+ q
       Q*                         q*` },
  { type: 'h3', en: 'Short run vs long run', ru: 'Краткосрочный и долгосрочный период' },
  { type: 'p', en: 'Short run: firm can have profit, zero profit, or loss; produces if P ≥ AVC. Long run: free entry/exit → P = MC = min ATC, zero economic profit.', ru: 'Краткосрочно: возможна прибыль или убыток; производит если P ≥ AVC. Долгосрочно: P = MC = min ATC, экономическая прибыль = 0.' },
  { type: 'h3', en: 'Supply and efficiency', ru: 'Предложение и эффективность' },
  { type: 'p', en: "Firm's supply (short run) = MC above AVC. Market supply = sum of firms' supply. Long-run equilibrium: no deadweight loss, allocative efficiency (P = MC).", ru: 'Предложение фирмы = MC выше AVC. В долгосрочном равновесии нет DWL, P = MC — аллокативная эффективность.' },
  { type: 'h3', en: 'Monopoly', ru: 'Монополия' },
  { type: 'p', en: 'Profit maximization: MR = MC. Price > MC. Deadweight loss. No supply curve (price set by demand and MC).', ru: 'Максимизация прибыли: MR = MC. Цена > MC. Потери общества.' },
  { type: 'h3', en: 'Monopoly Deadweight Loss (DWL)', ru: 'Потери общества от монополии (DWL)' },
  { type: 'p', en: 'Deadweight loss = loss of total surplus (consumer + producer) vs perfect competition. Monopoly produces Qm < Qc and sets Pm > MC. Units between Qm and Qc are not produced even though willingness to pay > MC — society loses that surplus.', ru: 'DWL — сокращение общего благосостояния по сравнению с совершенной конкуренцией. Монополия производит Qm < Qc; единицы между Qm и Qc не выпускаются, хотя готовность платить > MC.' },
  { type: 'p', en: 'On the graph: DWL is the triangle between the demand curve and MC curve from Qm to Qc. Competitive outcome: P = MC, Qc, total surplus max. Monopoly: part of consumer surplus goes to the monopolist, part is lost (DWL).', ru: 'На графике: DWL — треугольник между кривой спроса D и MC от Qm до Qc. При конкуренции P = MC, Qc; при монополии часть излишка переходит к монополисту, часть теряется (DWL).' },
  { type: 'graph', ascii: 'DWL triangle between D and MC', svg: DWL_SVG },
  { type: 'h3', en: 'Oligopoly', ru: 'Олигополия' },
  { type: 'p', en: 'Strategic interdependence. Game theory applies. Collusion possible (cartel) but unstable.', ru: 'Стратегическая взаимозависимость. Возможен сговор (картель).' },
]
