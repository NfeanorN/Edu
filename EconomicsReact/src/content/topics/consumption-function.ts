import type { TopicContent } from '../../components/TopicContent'

export const consumptionFunction: TopicContent = [
  { type: 'p', en: 'Source: Exam Prep #11 (MPC, MPS), #30 (slope of C(Y) = MPC). Not in Frank — macro Keynesian model.', ru: 'Источник: Exam Prep #11, #30. Не в Frank — макро Keynesian.' },
  { type: 'h2', en: 'Consumption function', ru: 'Функция потребления' },
  { type: 'formula', lines: ['C = c₀ + c₁Y', 'c₀ = autonomous consumption', 'c₁ = MPC (0 < c₁ < 1)'] },
  { type: 'hr' },
  { type: 'h2', en: 'MPC and MPS', ru: 'MPC и MPS' },
  { type: 'table', headers: ['Term', 'Formula', 'Meaning'], rows: [
    ['MPC', 'ΔC/ΔY = c₁', 'Fraction of extra income spent'],
    ['MPS', 'ΔS/ΔY', 'Fraction of extra income saved'],
  ]},
  { type: 'formula', lines: ['MPC + MPS = 1'] },
  { type: 'p', en: 'Exam example: MPC = 0.8 → +€100 income → +€80 consumption, +€20 saving.', ru: 'Exam: MPC=0,8 → из +€100 дохода €80 на C, €20 на S.' },
  { type: 'hr' },
  { type: 'h2', en: 'Numerical example: C = 100 + 0.8Y', ru: 'Пример: C = 100 + 0,8Y' },
  { type: 'table', headers: ['Y', 'C', 'S'], rows: [
    ['0', '100', '−100'],
    ['500', '500', '0'],
    ['1000', '900', '100'],
    ['1100', '980', '120'],
  ]},
  { type: 'p', en: 'Break-even income where C = Y: Y* = c₀/(1−c₁) = 500.', ru: 'Точка C=Y: Y* = c₀/(1−c₁) = 500.' },
  { type: 'hr' },
  { type: 'h2', en: 'Slope — do not confuse (Exam #30)', ru: 'Наклон — не путать (Exam #30)' },
  { type: 'table', headers: ['Graph', 'Slope', 'MPC?'], rows: [
    ['Budget constraint (2 goods)', '−Pₓ/Pᵧ', 'No'],
    ['Consumption C(Y)', 'MPC = c₁', 'Yes'],
    ['AE = C+I+G', 'MPC', 'Yes → multiplier'],
  ]},
  { type: 'hr' },
  { type: 'h2', en: 'Equilibrium and multiplier', ru: 'Равновесие и мультипликатор' },
  { type: 'formula', lines: ['Z = c₀ + c₁Y + I + G', 'Multiplier = 1/(1−MPC)', 'ΔY = multiplier × ΔG'] },
  { type: 'p', en: 'MPC=0.8 → multiplier=5. ΔG=10 → ΔY=50. See Goods Market & Multiplier.', ru: 'MPC=0,8 → multiplier=5. ΔG=10 → ΔY=50.' },
]
