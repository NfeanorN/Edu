import type { TopicContent } from '../../components/TopicContent'

const OKUN_SVG = `<svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
  <line x1="55" y1="25" x2="55" y2="250" stroke="#333" stroke-width="1.5"/>
  <line x1="55" y1="250" x2="450" y2="250" stroke="#333" stroke-width="1.5"/>
  <text x="18" y="30" font-size="13">Δu ↑</text>
  <text x="360" y="268" font-size="13">GDP g →</text>
  <line x1="80" y1="70" x2="420" y2="210" stroke="#e67e22" stroke-width="2.5"/>
  <text x="350" y="200" fill="#e67e22" font-size="12" font-weight="600">Okun</text>
</svg>`

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
  <path d="M 75 55 Q 210 135 385 220" stroke="#2980b9" stroke-width="2.5" fill="none"/>
  <path d="M 75 95 Q 210 175 385 245" stroke="#2980b9" stroke-width="2" fill="none" stroke-dasharray="6,4"/>
</svg>`

export const okunPhillips: TopicContent = [
  { type: 'p', en: 'Not in Frank. Okun: GDP ↔ unemployment. Phillips: Exam Topic 31.', ru: 'Не в Frank. Okun: ВВП ↔ u. Phillips: Exam #31.' },
  { type: 'h2', en: "Okun's Law", ru: 'Закон Оукена' },
  { type: 'p', en: 'Strong GDP growth → u falls. Recession → u rises. Rule: 1 pp u ≈ 2% output gap.', ru: 'Рост ВВП → u↓. Рецессия → u↑. Правило: 1 pp u ≈ 2% output gap.' },
  { type: 'formula', lines: ['(Y − Y*) / Y* ≈ −2 × (u − u_n)'] },
  { type: 'graph', ascii: "Okun's Law", svg: OKUN_SVG },
  { type: 'hr' },
  { type: 'h2', en: 'Phillips Curve', ru: 'Кривая Филлипса' },
  { type: 'p', en: 'SR: negative slope π ↔ u. LR: vertical at u_n. Stagflation: SR shifts up.', ru: 'SR: π ↔ u. LR: вертикаль. Stagflation: SR вверх.' },
  { type: 'graph', ascii: 'Short-run Phillips', svg: SR_PHILLIPS_SVG },
  { type: 'graph', ascii: 'SR and LR Phillips', svg: SR_LR_PHILLIPS_SVG },
]
