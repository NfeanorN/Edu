import type { TopicContent } from '../../components/TopicContent'

const SUPPLY_CURVE_SVG = `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="200"/>
  <line class="axis" x1="50" y1="200" x2="300" y2="200"/>
  <path class="supply" d="M 70 180 L 150 120 L 230 60"/>
  <text x="250" y="75">S</text>
  <text x="28" y="18">P</text>
  <text x="305" y="212">Q</text>
</svg>`

const SUPPLY_DEMAND_EQUIL_SVG = `<svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg">
  <line class="axis" x1="50" y1="20" x2="50" y2="240"/>
  <line class="axis" x1="50" y1="240" x2="360" y2="240"/>
  <path class="supply" d="M 50 80 L 200 130 L 350 180"/>
  <path class="demand" d="M 50 180 L 200 130 L 350 80"/>
  <circle cx="200" cy="130" r="5" fill="#e74c3c" stroke="#c0392b"/>
  <text x="28" y="18">P</text>
  <text x="358" y="255">Q</text>
  <text x="215" y="120" fill="#e74c3c" font-weight="600">E</text>
  <text x="280" y="95">S</text>
  <text x="280" y="165">D</text>
  <text x="200" y="255">Q*</text>
  <text x="28" y="132">P*</text>
</svg>`

export const supply: TopicContent = [
  { type: 'h2', en: 'What is Supply?', ru: 'Что такое предложение?' },
  { type: 'p', en: 'Supply is how much producers are willing and able to sell at different prices. It shows the relationship between price and quantity supplied.', ru: 'Предложение — сколько производители готовы продать при разных ценах.' },
  { type: 'hr' },
  { type: 'h2', en: 'The Supply Curve', ru: 'Кривая предложения' },
  { type: 'h3', en: 'Law of Supply', ru: 'Закон предложения' },
  { type: 'p', en: 'When price goes UP, quantity supplied goes UP. When price goes DOWN, quantity supplied goes DOWN. The supply curve is upward-sloping.', ru: 'Цена растёт — объём предложения растёт. Цена падает — объём предложения падает. Кривая предложения восходящая.' },
  { type: 'graph', ascii: 'Supply curve S', svg: SUPPLY_CURVE_SVG },
  { type: 'hr' },
  { type: 'h2', en: 'Two Types of Changes', ru: 'Два типа изменений' },
  { type: 'h4', en: '1. Movement ALONG the curve', ru: 'Движение ВДОЛЬ кривой' },
  { type: 'p', en: 'Only the price of the product changes. Same curve, different point.', ru: 'Меняется только цена товара.' },
  { type: 'h4', en: '2. SHIFT of the curve', ru: 'Сдвиг кривой' },
  { type: 'p', en: 'Something other than price changes (costs, technology, number of sellers). Shift RIGHT = more supply. Shift LEFT = less supply.', ru: 'Меняются другие факторы. Вправо — больше предложения, влево — меньше.' },
  { type: 'hr' },
  { type: 'h2', en: 'Factors That Shift Supply Schedules (Figure 2.9)', ru: 'Факторы, сдвигающие кривую предложения' },
  { type: 'p', en: 'Technology, input prices, number of firms, expectations about future prices, and weather all affect the position of the supply schedule. (Based on Figure 2.9 from the textbook.)', ru: 'Технология, цены ресурсов, число фирм, ожидания и погода влияют на положение кривой предложения.' },
  { type: 'table', headers: ['Factor', 'Change', 'Shift', 'Why'], rows: [
    ['Technology', 'Improved technology', 'S → RIGHT', 'More output at any price'],
    ['Wages', 'Higher wages', 'S → LEFT', 'Higher labour cost'],
    ['Interest rates', 'Lower interest rates', 'S → RIGHT', 'Cheaper borrowing → more supply'],
    ['Raw materials', 'Higher prices', 'S → LEFT', 'Higher input cost'],
    ['Number of firms', 'More firms', 'S → RIGHT', 'Greater total quantity at each price'],
    ['Expectations', 'Expect higher price later', 'S → LEFT', 'Withhold supply now, sell later'],
    ['Weather', 'Good weather', 'S → RIGHT', 'e.g. better yields in agriculture'],
    ['Weather', 'Bad weather', 'S → LEFT', 'Damage, disruption, higher cost'],
  ]},
  { type: 'h3', en: 'Explanation for each factor', ru: 'Пояснения по каждому фактору' },
  { type: 'h4', en: '1. Technology', ru: 'Технология' },
  { type: 'p', en: 'Improved technology (better equipment, more efficient processes) lets firms produce more at the same cost, or the same output at lower cost. At any given price, producers are willing to supply more → supply curve shifts right.', ru: 'Улучшение технологий позволяет производить больше при тех же затратах или то же количество дешевле. При любой цене производители готовы предложить больший объём → кривая S сдвигается вправо.' },
  { type: 'h4', en: '2. Wages', ru: 'Заработная плата' },
  { type: 'p', en: 'Higher wages raise labour costs. At the same output price, producing becomes less profitable, so firms supply less at each price → supply curve shifts left.', ru: 'Рост зарплат увеличивает издержки на труд. При той же цене продукта производство становится менее выгодным, фирмы сокращают выпуск → S сдвигается влево.' },
  { type: 'h4', en: '3. Interest rates', ru: 'Процентные ставки' },
  { type: 'p', en: 'Lower interest rates make borrowing cheaper (loans for equipment, working capital). Production costs fall; at each price firms supply more → supply shifts right. Higher rates make credit more expensive → supply shifts left.', ru: 'Снижение ставок удешевляет займы (оборудование, оборотный капитал). Издержки падают, при каждой цене выгодно производить больше → S вправо. Рост ставок удорожает кредит → S влево.' },
  { type: 'h4', en: '4. Raw materials', ru: 'Сырьё' },
  { type: 'p', en: 'Higher prices for raw materials and inputs raise costs. At the same output price, firms supply less at each price → supply curve shifts left.', ru: 'Рост цен на сырьё увеличивает издержки. При неизменной цене продукта объём предложения при каждой цене снижается → S сдвигается влево.' },
  { type: 'h4', en: '5. Number of firms', ru: 'Число фирм' },
  { type: 'p', en: 'More firms in the market means a larger total quantity supplied at each price. Market supply is the sum of all sellers’ supplies; when new firms enter, the supply curve shifts right.', ru: 'Чем больше фирм на рынке, тем больше суммарный объём при каждой цене. Рыночная кривая предложения — сумма предложений всех продавцов; при входе новых фирм S сдвигается вправо.' },
  { type: 'h4', en: '6. Expectations', ru: 'Ожидания' },
  { type: 'p', en: 'If producers expect higher prices in the future, they may withhold some output now to sell later at a higher price. Current supply at each price falls → supply curve shifts left.', ru: 'Если производители ожидают рост цен в будущем, они могут придержать часть товара сейчас, чтобы продать позже дороже. Текущее предложение снижается → S сдвигается влево.' },
  { type: 'h4', en: '7–8. Weather', ru: 'Погода' },
  { type: 'p', en: 'Good weather (for agriculture: warmth, moisture, no drought or frost) raises yields and may lower costs → more supplied at each price, supply shifts right. Bad weather (drought, flood, frost) destroys output or raises costs → supply shifts left.', ru: 'Хорошая погода повышает урожайность и может снижать издержки → при каждой цене предлагается больше, S вправо. Плохая погода уничтожает часть урожая или увеличивает издержки → S влево.' },
  { type: 'p', en: 'Rightward shift (S₀ → S₁) = more supply at every price. Leftward shift = less supply. These are shifts of the entire schedule, not movement along the curve.', ru: 'Сдвиг вправо — больше предложения при каждой цене; влево — меньше. Это сдвиг всей кривой, а не движение вдоль неё.' },
  { type: 'hr' },
  { type: 'h2', en: 'Supply and Demand Together', ru: 'Спрос и предложение вместе' },
  { type: 'p', en: 'Market equilibrium: where demand and supply curves intersect. Quantity demanded = quantity supplied at the equilibrium price.', ru: 'Равновесие рынка — пересечение кривых спроса и предложения.' },
  { type: 'graph', ascii: 'Equilibrium E = D ∩ S', svg: SUPPLY_DEMAND_EQUIL_SVG },
]
