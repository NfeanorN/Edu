import type { TopicContent } from '../../components/TopicContent'

export const gameTheory: TopicContent = [
  { type: 'h2', en: 'Game Theory', ru: 'Теория игр' },
  { type: 'p', en: 'Studies strategic interaction between players. Payoffs depend on own action and others\' actions.', ru: 'Изучает стратегическое взаимодействие игроков.' },
  { type: 'h3', en: 'Nash Equilibrium', ru: 'Равновесие Нэша' },
  { type: 'p', en: 'No player wants to change strategy given what others do. Each plays best response.', ru: 'Ни один игрок не хочет менять стратегию при заданных действиях других.' },
  { type: 'h3', en: "Prisoners' Dilemma", ru: 'Дилемма заключённых' },
  { type: 'p', en: 'Both defect is Nash equilibrium, but both cooperate would give higher total payoff. Dominant strategy to defect.', ru: 'Оба предают — равновесие Нэша; оба молчат — выгоднее, но доминирует предательство.' },
  { type: 'table', headers: ['', 'Cooperate', 'Defect'], rows: [
    ['Cooperate', '-1,-1', '-3,0'],
    ['Defect', '0,-3', '-2,-2 (Nash)'],
  ]},
]
