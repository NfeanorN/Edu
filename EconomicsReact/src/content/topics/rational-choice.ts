import type { TopicContent } from '../../components/TopicContent'

const STATIC_EQUILIBRIUM_SVG = `<svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg">
  <line x1="55" y1="25" x2="55" y2="270" stroke="#333" stroke-width="1.5"/>
  <line x1="55" y1="270" x2="430" y2="270" stroke="#333" stroke-width="1.5"/>
  <path d="M 55 40 L 400 270" stroke="#e74c3c" stroke-width="2.5" fill="none"/>
  <path d="M 80 210 Q 185 135 375 105" stroke="#27ae60" stroke-width="2.5" fill="none"/>
  <circle cx="228" cy="148" r="7" fill="#8e44ad" stroke="#fff" stroke-width="1.5"/>
  <text x="238" y="144" font-weight="700" fill="#8e44ad" font-size="13">F</text>
  <text x="300" y="200" fill="#8e44ad" font-size="11" font-weight="600">MRS = P_S/P_F = 1/2</text>
</svg>`

export const rationalChoice: TopicContent = [
  { type: 'p', en: 'Source: Frank, Microeconomics and Behavior, 7th ed. — Ch. 1 (Figure 1.1) and Ch. 3 (shelter & food). Textbook examples only.', ru: 'Источник: Frank, 7th ed. — Ch. 1 (Figure 1.1) и Ch. 3 (shelter & food). Только примеры из учебника.' },
  { type: 'h2', en: 'Ch. 1 — Cost-benefit (Figure 1.1)', ru: 'Ch. 1 — MB = MC (Figure 1.1)' },
  { type: 'p', en: 'Optimum at MB = MC. Example: MC = 4¢/min flat → optimum 400 min/month.', ru: 'Оптимум при MB = MC. Пример: MC = 4¢/min → 400 min/month.' },
  { type: 'h2', en: 'Ch. 3 — Shelter & food (M = $100/wk)', ru: 'Ch. 3 — Жильё и еда (M = $100/нед.)' },
  { type: 'formula', lines: [
    'P_S = $5/sq yd, P_F = $10/lb → 5S + 10F = 100',
    'MRS = P_S/P_F = 1/2 at best bundle F (Figure 3.15)',
    'Rational spending rule: MU_F/P_F = MU_S/P_S',
    'U(F,S) = FS example: (4,3) and (3,4) → 12 utils',
  ]},
  { type: 'graph', ascii: 'Figure 3.15 — tangency at F', svg: STATIC_EQUILIBRIUM_SVG },
  { type: 'p', en: 'Intertemporal choice (C₁, C₂, r) is NOT in Frank — see Exam Prep Topic 8.', ru: 'Межвременный выбор (C₁, C₂, r) не в Frank — см. Exam Prep Topic 8.' },
]
