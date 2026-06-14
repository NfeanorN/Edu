import type { TopicContent } from '../../components/TopicContent'

const SR_PHILLIPS_SVG = `<svg viewBox="0 0 440 280" xmlns="http://www.w3.org/2000/svg">
  <line x1="55" y1="25" x2="55" y2="250" stroke="#333" stroke-width="1.5"/>
  <line x1="55" y1="250" x2="410" y2="250" stroke="#333" stroke-width="1.5"/>
  <text x="22" y="30" font-size="13">π ↑</text>
  <text x="390" y="268" font-size="13">u →</text>
  <path d="M 80 55 Q 220 130 380 215" stroke="#2980b9" stroke-width="2.5" fill="none"/>
  <text x="300" y="200" fill="#2980b9" font-size="12" font-weight="600">SR Phillips</text>
</svg>`

const SR_LR_PHILLIPS_SVG = `<svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
  <line x1="55" y1="25" x2="55" y2="275" stroke="#333" stroke-width="1.5"/>
  <line x1="55" y1="275" x2="430" y2="275" stroke="#333" stroke-width="1.5"/>
  <text x="22" y="30" font-size="13">π ↑</text>
  <text x="410" y="292" font-size="13">u →</text>
  <line x1="230" y1="25" x2="230" y2="275" stroke="#e74c3c" stroke-width="2.5" stroke-dasharray="7,4"/>
  <text x="238" y="45" fill="#e74c3c" font-size="12" font-weight="600">LRPC</text>
  <text x="238" y="292" fill="#e74c3c" font-size="11">u_n</text>
  <path d="M 75 55 Q 210 135 385 220" stroke="#2980b9" stroke-width="2.5" fill="none"/>
  <path d="M 75 95 Q 210 175 385 245" stroke="#2980b9" stroke-width="2" fill="none" stroke-dasharray="6,4"/>
  <text x="340" y="248" fill="#2980b9" font-size="11">SRPC₂ (shift up)</text>
</svg>`

export const okunPhillips: TopicContent = [
  { type: 'p', en: 'Not in Frank (micro textbook). Exam Prep Topic 31 only — no Okun\'s Law, no extra formulas.', ru: 'Не в Frank (микро). Только Exam Prep Topic 31 — без закона Оукена и лишних формул.' },
  { type: 'h2', en: 'Phillips Curve', ru: 'Кривая Филлипса' },
  { type: 'p', en: 'SR: negative slope π ↔ u. LR: vertical at u_n. Stagflation (1970s oil): SR shifts up → π↑ and u↑.', ru: 'SR: отрицательный наклон π ↔ u. LR: вертикаль при u_n. Stagflation (1970-е, нефть): SR вверх → π↑ и u↑.' },
  { type: 'graph', ascii: 'Short-run Phillips curve', svg: SR_PHILLIPS_SVG },
  { type: 'graph', ascii: 'SR and LR Phillips with stagflation shift', svg: SR_LR_PHILLIPS_SVG },
]
