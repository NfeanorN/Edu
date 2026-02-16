import type { TopicContent } from '../../components/TopicContent'

export const marketPower: TopicContent = [
  { type: 'h2', en: 'Market Power', ru: 'Рыночная власть' },
  { type: 'p', en: 'Ability to set price above marginal cost. Monopoly: one seller. Oligopoly: few sellers.', ru: 'Возможность устанавливать цену выше предельных издержек.' },
  { type: 'h3', en: 'Monopoly', ru: 'Монополия' },
  { type: 'p', en: 'Profit maximization: MR = MC. Price > MC. Deadweight loss. No supply curve (price set by demand and MC).', ru: 'Максимизация прибыли: MR = MC. Цена > MC. Потери общества.' },
  { type: 'h3', en: 'Monopoly Deadweight Loss (DWL)', ru: 'Потери общества от монополии (DWL)' },
  { type: 'p', en: 'Deadweight loss = loss of total surplus (consumer + producer) vs perfect competition. Monopoly produces Qm < Qc and sets Pm > MC. Units between Qm and Qc are not produced even though willingness to pay > MC — society loses that surplus.', ru: 'DWL — сокращение общего благосостояния по сравнению с совершенной конкуренцией. Монополия производит Qm < Qc; единицы между Qm и Qc не выпускаются, хотя готовность платить > MC.' },
  { type: 'p', en: 'On the graph: DWL is the triangle between the demand curve and MC curve from Qm to Qc. Competitive outcome: P = MC, Qc, total surplus max. Monopoly: part of consumer surplus goes to the monopolist, part is lost (DWL).', ru: 'На графике: DWL — треугольник между кривой спроса D и MC от Qm до Qc. При конкуренции P = MC, Qc; при монополии часть излишка переходит к монополисту, часть теряется (DWL).' },
  { type: 'graph', ascii: `P
  |     MC
  |    /   DWL triangle (D and MC, Qm to Qc)
  |   / \\
  |  /   \\
  | / P_m *---- D
  |     \\ |  MR
  |      *  Qm   Qc
  0+-----+--+----+---- Q` },
  { type: 'h3', en: 'Oligopoly', ru: 'Олигополия' },
  { type: 'p', en: 'Strategic interdependence. Game theory applies. Collusion possible (cartel) but unstable.', ru: 'Стратегическая взаимозависимость. Возможен сговор (картель).' },
]
