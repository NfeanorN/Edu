"""Extra EN sections + RU footers for syllabus topics (by exam number)."""

# extra: additional HTML (h2 sections, tables, exam steps)
# ru: Russian summary for footer

EXTRAS = {
    1: {
        "extra": """
<h2>Step-by-step (exam)</h2>
<ol>
<li>Define RTS: scale <strong>all</strong> inputs by factor k.</li>
<li>Compare f(kL,kK) to k·f(L,K).</li>
<li>Link to LRAC: increasing RTS → economies of scale → LRAC falls.</li>
</ol>
<div class="warn" style="background:#fff3cd;border-left:4px solid #ffc107;padding:10px 14px;margin:12px 0;border-radius:6px"><strong>⚠️ Do not confuse:</strong> diminishing <em>marginal product</em> (SR, fixed K) vs returns to <em>scale</em> (LR, all inputs).</div>""",
        "ru": """<p><strong>Отдача от масштаба</strong> — что будет с выпуском Q, если увеличить все факторы (L и K) в k раз. Возрастающая: 2× ресурсы → больше чем 2× продукта (LRAC падает). Постоянная: ровно 2×. Убывающая: меньше 2× (LRAC растёт). Только долгий период. Не путать с убывающей предельной отдачей труда при фиксированном капитале (краткий период, кухня Frank Ch. 8).</p>""",
    },
    2: {
        "extra": """
<h2>Comparison table</h2>
<table>
<tr><th></th><th>Short run</th><th>Long run</th></tr>
<tr><td>Fixed input</td><td>At least one (usually K)</td><td>None — all variable</td></tr>
<tr><td>Frank example</td><td>Kitchen size fixed, hire cooks</td><td>Choose plant size, isoquants</td></tr>
<tr><td>Costs</td><td>FC + VC, MC U-shaped</td><td>LRAC envelope</td></tr>
</table>""",
        "ru": """<p><strong>Краткий период:</strong> хотя бы один фактор фиксирован (обычно капитал/завод) — можно менять только рабочих. <strong>Долгий период:</strong> все факторы переменны — выбор размера завода, технологии. «Краткий» — не про календарь, а про то, можно ли сейчас изменить мощность.</p>""",
    },
    3: {
        "extra": """
<h2>Properties (Ch. 9)</h2>
<ul>
<li><strong>Isoquant:</strong> convex to origin, higher = more Q, slope = MRTS = MP<sub>L</sub>/MP<sub>K</sub>.</li>
<li><strong>Isocost:</strong> straight line, slope −w/r; parallel lines = different budgets.</li>
<li><strong>Optimum:</strong> lowest isocost tangent to target isoquant.</li>
</ul>
<h2>Exam phrase</h2>
<p>«With increasing RTS, scaling up lowers <strong>unit cost</strong> because output grows faster than total cost.»</p>""",
        "ru": """<p><strong>Изокванта</strong> — комбинации L и K с одинаковым Q. <strong>Изокоста</strong> C = wL + rK, наклон −w/r. Минимум издержек = касание. При возрастающей отдаче от масштаба увеличение масштаба снижает средние издержки — «больше продукции за меньшую цену на единицу».</p>""",
    },
    4: {
        "extra": """
<h2>Definitions</h2>
<table>
<tr><th>Curve</th><th>Formula idea</th><th>Frank note</th></tr>
<tr><td>MC</td><td>ΔTC/ΔQ</td><td>Crosses AVC, ATC at minima (Fig. 9.4)</td></tr>
<tr><td>AVC</td><td>VC/Q</td><td>Shutdown if P &lt; AVC<sub>min</sub></td></tr>
<tr><td>MR</td><td>ΔTR/ΔQ</td><td>Competition: MR=P; Monopoly: MR&lt;P</td></tr>
</table>
<h2>Linear demand (monopoly)</h2>
<div class="formula">If P = a − bQ then MR = a − 2bQ (twice as steep as D — Fig. 11.5)</div>""",
        "ru": """<p><strong>MC</strong> пересекает AVC и ATC в их минимумах. <strong>MR</strong> у монополиста &lt; P (чтобы продать ещё, надо снизить цену на все единицы). Правило прибыли: MR = MC. У конкурента P = MR = MC. Пример Frank: 11-я единица даёт MR = $45, а не $95.</p>""",
    },
    5: {
        "extra": """
<h2>What shifts the isocost?</h2>
<table>
<tr><th>Change</th><th>Effect on line</th></tr>
<tr><td>Total budget C ↑</td><td>Parallel shift outward</td></tr>
<tr><td>Wage w ↑</td><td>Steeper (labour more expensive)</td></tr>
<tr><td>Rental rate r ↓</td><td>Flatter (capital cheaper)</td></tr>
</table>""",
        "ru": """<p><strong>Изокоста</strong> C = wL + rK — прямая линия. Наклон = −w/r (альтернативная стоимость капитала в единицах труда). Параллельные линии — разные бюджеты. Оптимум производства = касание с изоквантой (как бюджетная линия с кривой безразличия у потребителя).</p>""",
    },
    6: {
        "extra": """
<h2>Key terms (Ch. 12)</h2>
<ul>
<li><strong>Dominant strategy</strong> — best move regardless of rival.</li>
<li><strong>Nash equilibrium</strong> — no player wants to deviate alone.</li>
<li><strong>Prisoner's dilemma</strong> — Nash outcome is worse for both than cooperation.</li>
</ul>
<h2>Oligopoly link (Ch. 13)</h2>
<p>Cournot, Bertrand, Stackelberg = different ways duopolists compete after game-theory logic.</p>""",
        "ru": """<p><strong>Теория игр</strong> — стратегическое поведение (мой выигрыш зависит от действий других). <strong>Дилемма заключённых</strong> (Frank, табл. 12.1): доминирующая стратегия — признаться; равновесие Нэша — оба признаются, хотя обоим выгоднее молчать. Связь с олигополией: фирмы хотят сговориться, но каждая хочет сжульничать.</p>""",
    },
    7: {
        "extra": """
<h2>Indifference curve rules (Ch. 3)</h2>
<ul>
<li>Downward sloping (more-is-better)</li>
<li>Convex to origin (diminishing MRS)</li>
<li>Cannot cross</li>
<li>Higher curve = higher utility</li>
</ul>""",
        "ru": """<p><strong>Функция полезности</strong> U отображает предпочтения. Frank: U(F,S) = F×S. Кривые безразличия: нисходящие, выпуклые, не пересекаются. Убывающая предельная полезность — каждая следующая единица добавляет меньше удовлетворения.</p>""",
    },
    8: {
        "extra": """
<h2>Frank numbers worked</h2>
<p>M₁ = $50,000 · M₂ = $60,000 · r = 20% (0.2)</p>
<div class="formula">
PV budget: C₁ + C₂/1.2 = 50,000 + 60,000/1.2 = <strong>$100,000</strong><br>
FV form: 1.2·C₁ + C₂ = 50,000×1.2 + 60,000 = <strong>$120,000</strong>
</div>
<h2>Intercepts</h2>
<ul>
<li>Max C₁ today (C₂=0): $100,000</li>
<li>Max C₂ if save all: $120,000</li>
<li>Endowment: (50,000 ; 60,000)</li>
</ul>""",
        "ru": """<p><strong>Межвременное бюджетное ограничение</strong> (Frank, гл. 5): C₁ + C₂/(1+r) = Y₁ + Y₂/(1+r). Пример: Y₁=$50 000, Y₂=$60 000, r=20%. PV = $100 000. Наклон = −(1+r). Сбережение если C₁&lt;Y₁; заём если C₁&gt;Y₁. Терпеливый — копит; нетерпеливый — занимает (рис. 5.17).</p>""",
    },
    9: {
        "extra": """
<h2>Full transmission chain</h2>
<ol>
<li>CB raises policy rate</li>
<li>Bank loan rates ↑</li>
<li>C ↓, I ↓, possibly NX ↓</li>
<li>AD ↓ → Y ↓ → inflation pressure ↓</li>
</ol>""",
        "ru": """<p><strong>ЦБ меняет ставку</strong> главным образом для контроля <strong>инфляции</strong> (цель ~2%). Высокая инфляция → повышение r → дорогие кредиты → меньше C и I → ниже спрос → давление на цены снижается. Рецессия → снижение r для стимула.</p>""",
    },
    10: {
        "extra": """
<h2>Components of AD</h2>
<p>Y = C + I + G + NX. Higher r mainly hits <strong>C</strong> (mortgages) and <strong>I</strong> (business loans). Stronger currency can reduce <strong>NX</strong>.</p>""",
        "ru": """<p><strong>Рост процентной ставки</strong> → дороже заимствования → потребление C и инвестиции I падают → совокупный спрос AD ↓ → ВВП Y ↓. Снижение r — обратная цепочка. На графике IS-LM: r↑ → точка равновесия левее (меньше Y).</p>""",
    },
    11: {
        "extra": """
<h2>Example</h2>
<p>ΔY = +€1,000 → if MPC = 0.75, ΔC = €750, ΔS = €250.</p>
<div class="formula">Multiplier = 1/(1−0.75) = <strong>4</strong></div>""",
        "ru": """<p><strong>MPC</strong> = ΔC/ΔY — доля дополнительного дохода, которую тратят. <strong>MPS</strong> = 1−MPC. MPC — наклон функции потребления C = c₀ + c₁Y. Чем выше MPC, тем больше мультипликатор.</p>""",
    },
    12: {
        "extra": """
<h2>Water vs diamonds paradox</h2>
<p>Total utility of water is high, but <strong>marginal</strong> utility of the next glass is low when you are not thirsty — rational choice uses MU/P, not MU alone.</p>""",
        "ru": """<p><strong>Предельная полезность MU</strong> — прирост удовлетворения от ещё одной единицы. Обычно убывает. Рациональное правило: MUₓ/Pₓ = MUᵧ/Pᵧ — сравниваем полезность на последний потраченный евро, а не «максимизируем MU» одного товара.</p>""",
    },
    13: {
        "extra": """
<h2>Vertical interpretation of demand (Ch. 2)</h2>
<p>At Q = 4,000 lobsters/day, the height of the demand curve ($8) is the reservation price of the <strong>marginal buyer</strong> — the buyer who is just willing to purchase at that quantity.</p>""",
        "ru": """<p><strong>Резервационная цена</strong> — максимальная цена, которую вы готовы заплатить. Frank: стерео за $1 — да, за $0.75 — нет. Спрос (лобстеры): при Q=4000 резервационная цена пограничного покупателя = $8. Если P &gt; резервационной цены — не покупаем.</p>""",
    },
    14: {
        "extra": """
<h2>Three cost types (Ch. 1)</h2>
<table>
<tr><th>Type</th><th>Include in decision?</th></tr>
<tr><td>Explicit (tuition paid)</td><td>Yes — opportunity cost of money</td></tr>
<tr><td>Implicit (forgone salary)</td><td>Yes — opportunity cost</td></tr>
<tr><td>Sunk (non-refundable deposit)</td><td><strong>No</strong></td></tr>
</table>""",
        "ru": """<p><strong>Альтернативная стоимость</strong> — ценность лучшей отвергнутой альтернативы. Наклон бюджетной линии shelter/food = −P_S/P_F. Явные vs неявные издержки. <strong>Невозвратные (sunk)</strong> издержки в решениях не учитываем.</p>""",
    },
    15: {
        "extra": """
<h2>Conditions checklist</h2>
<ul>
<li>Many small firms</li>
<li>Homogeneous product</li>
<li>Free entry and exit</li>
<li>Perfect information</li>
<li>Price taker → horizontal demand for one firm</li>
</ul>
<h2>LR vs SR</h2>
<p>SR: may earn π &gt; 0 or π &lt; 0. LR: π = 0 at min LRAC.</p>""",
        "ru": """<p><strong>Совершенная конкуренция</strong> (Frank, гл. 10): много мелких фирм, одинаковый товар, свободный вход. Фирма — price taker: P = MR. Максимум прибыли: P = MC. Закрытие если P &lt; AVC<sub>min</sub>. Долгий период: экономическая прибыль = 0.</p>""",
    },
    16: {
        "extra": """
<h2>Numeric check (Ch. 3)</h2>
<p>If MU<sub>F</sub>/P<sub>F</sub> = 8/10 = 0.8 and MU<sub>S</sub>/P<sub>S</sub> = 3/5 = 0.6 → buy more <strong>food</strong> (higher MU per dollar) until equal.</p>""",
        "ru": """<p><strong>Рациональное правило расходов:</strong> MU_S/P_S = MU_F/P_F, или MRS = P_S/P_F. Пример Frank: M=$100/нед, P_S=$5, P_F=$10. Если MRS &lt; P_S/P_F — покупай больше food, меньше shelter до касания (рис. 3.15).</p>""",
    },
    17: {
        "extra": """
<h2>Loanable funds intuition</h2>
<p>Households save → banks lend → firms invest. If S &gt; I, r falls until equilibrium. If I &gt; S, r rises.</p>""",
        "ru": """<p><strong>Сбережения S</strong> — доход минус потребление. <strong>Инвестиции I</strong> — покупка капитала фирмами. В закрытой экономике в равновесии S = I. S финансирует I через финансовую систему.</p>""",
    },
    18: {
        "extra": """
<h2>Figure 2.1 demand schedule (Frank)</h2>
<table>
<tr><th>P ($)</th><th>Q<sub>D</sub> (000/day)</th></tr>
<tr><td>20</td><td>1</td></tr><tr><td>16</td><td>2</td></tr><tr><td>12</td><td>3</td></tr><tr><td>8</td><td>4</td></tr><tr><td>4</td><td>5</td></tr>
</table>
<h2>Figure 2.9 — demand shifts</h2>
<ul>
<li>Income ↑ → D right (normal good)</li>
<li>Price of substitute (crabs) ↑ → D right for lobsters</li>
<li>Price of complement (butter) ↑ → D left</li>
</ul>
<h2>Surplus & shortage</h2>
<p>P &gt; P* → surplus → price falls. P &lt; P* → shortage → price rises (invisible hand, Ch. 2).</p>""",
        "ru": """<p><strong>Спрос</strong> — закон: цена ↓ → Q↑. <strong>Предложение</strong> — цена ↑ → Q↑. Равновесие (лобстеры Hyannis): P*=$8, Q*=4000/день. Движение по кривой = изменилась только своя цена. Сдвиг кривой = другой фактор (доход, заменители, издержки). Избыток → цена падает; дефицит → цена растёт.</p>""",
    },
    19: {
        "extra": """
<h2>LM curve intuition</h2>
<p>Fixed M<sup>s</sup> + upward L(r,Y) → higher Y requires higher r to clear money market.</p>""",
        "ru": """<p><strong>Рынок денег:</strong> спрос на деньги L(r,Y) ↓ при росте r, ↑ при росте Y. Предложение денег M^s задаёт ЦБ (вертикальная линия). Пересечение определяет равновесную ставку r.</p>""",
    },
    20: {
        "extra": """
<h2>SR ATC envelope</h2>
<p>Each SR ATC is for one plant size. LRAC touches the lowest point on each SR curve — firm picks optimal scale for each output level.</p>""",
        "ru": """<p><strong>LRAC</strong> — огибающая краткосрочных ATC. Форма LRAC предсказывает структуру отрасли: падающая LRAC → монополия/крупные фирмы; растущая → много мелких (Frank, гл. 9).</p>""",
    },
    21: {
        "extra": """
<h2>Exam: CB sells bonds</h2>
<ol>
<li>CB sells bonds → banks pay → reserves ↓</li>
<li>M<sup>s</sup> ↓</li>
<li>r ↑</li>
<li>C, I ↓ → Y ↓</li>
</ol>""",
        "ru": """<p><strong>ЦБ и ставка:</strong> инструменты — ОМО (покупка/продажа облигаций), норма резервирования, ставка рефинансирования. <strong>Продажа облигаций</strong> → денежная масса ↓ → r ↑ → ВВП ↓ → инфляция ↓.</p>""",
    },
    22: {
        "extra": """
<h2>Exam answer in one sentence</h2>
<p>MU is maximized for a single good at zero consumption, but the <strong>consumer optimum</strong> equalizes MU/P across goods at the budget tangency — not max MU of one good.</p>""",
        "ru": """<p>MU одного товара высока только при малом потреблении, но оптимум потребителя — это <strong>максимум общей полезности</strong> при бюджете: MUₓ/Pₓ = MUᵧ/Pᵧ, а не «максимизировать MU» одного товара.</p>""",
    },
    23: {
        "extra": """
<h2>Worked example P = 10 − Q, MC = 2</h2>
<ol>
<li>MR = 10 − 2Q</li>
<li>MR = MC → 10 − 2Q = 2 → Q* = 4</li>
<li>P* = 10 − 4 = <strong>6</strong></li>
<li>π = (P − ATC)×Q (if ATC known)</li>
</ol>""",
        "ru": """<p>Монополист: MR &lt; P. Чтобы продать больше, снижает цену на <strong>все</strong> единицы → ΔTR &lt; цены последней единицы. Линейный спрос: MR в 2 раза круче D. Оптимум: MR = MC, затем P с кривой спроса. Пример: 10×$100 → 11×$95, ΔTR=$45.</p>""",
    },
    24: {
        "extra": """
<h2>Why real GDP?</h2>
<p>Nominal GDP rises if prices rise even with zero extra output. Real GDP holds prices constant to measure <strong>physical output</strong> growth.</p>""",
        "ru": """<p><strong>Номинальный ВВП</strong> — по текущим ценам. <strong>Реальный ВВП</strong> — по ценам базового года (реальный объём). Real = Nominal / дефлятор ВВП. Реальный показывает рост производства, а не только инфляцию.</p>""",
    },
    25: {
        "extra": """
<h2>Buy vs sell bonds</h2>
<table>
<tr><th>CB action</th><th>M<sup>s</sup></th><th>r</th><th>Y</th></tr>
<tr><td>Buy bonds</td><td>↑</td><td>↓</td><td>↑</td></tr>
<tr><td>Sell bonds</td><td>↓</td><td>↑</td><td>↓</td></tr>
</table>""",
        "ru": """<p>ЦБ меняет денежную массу: <strong>покупка облигаций</strong> → M↑, r↓ (экспансия). <strong>Продажа</strong> → M↓, r↑ (сдерживание). Также: резервные требования, ставка дисконта.</p>""",
    },
    26: {
        "extra": """
<h2>How to solve numerically</h2>
<ol>
<li>Write IS: Y = f(i) or Y + ai = b</li>
<li>Write LM: Y − bi = c or M/P = kY − hi</li>
<li>Substitute → find Y*, then i*</li>
</ol>
<p>See <a href="../Exam_Macro_Key_Questions.html#q7">Exam Q&amp;A #7</a> for full worked example.</p>""",
        "ru": """<p><strong>IS</strong> (товарный рынок): отрицательная связь i–Y (ниже ставка → больше Y). <strong>LM</strong> (деньги): положительная связь i–Y. Пересечение = равновесие Y* и i*. На экзамене — подставить две уравнения и решить.</p>""",
    },
    27: {
        "extra": """
<div class="formula">Real exchange rate ≈ (e × P<sub>foreign</sub>) / P<sub>domestic</sub></div>
<p>Higher real rate → foreign goods cheaper relative to home goods.</p>""",
        "ru": """<p><strong>Номинальный курс</strong> — цена иностранной валюты. <strong>Реальный курс</strong> — с поправкой на уровни цен в странах; показывает относительную покупательную способность товаров.</p>""",
    },
    28: {
        "extra": """
<h2>Round-by-round (MPC = 0.8)</h2>
<table>
<tr><th>Round</th><th>Spending</th></tr>
<tr><td>ΔG</td><td>10</td></tr>
<tr><td>ΔC round 2</td><td>8</td></tr>
<tr><td>Round 3</td><td>6.4</td></tr>
<tr><td>Sum</td><td>10 × (1 + 0.8 + 0.64 + …) = 10/0.2 = <strong>50</strong></td></tr>
</table>""",
        "ru": """<p><strong>Мультипликатор</strong> = 1/(1−MPC). ΔG вызывает цепочку потребления → итоговый ΔY больше ΔG. При MPC=0.8 мультипликатор = 5. На графике 45°: сдвиг AE вверх → ΔY &gt; ΔG.</p>""",
    },
    29: {
        "extra": """
<h2>Also: income increase</h2>
<p>If M rises (income ↑) with unchanged prices → <strong>parallel outward shift</strong> of entire budget line (both intercepts rise proportionally).</p>""",
        "ru": """<p>Если <strong>P_F падает</strong> — бюджетная линия поворачивается наружу по оси food (перехват M/P_F растёт). Если растёт доход M — параллельный сдвиг всей линии наружу. Shelter/food, Frank гл. 3.</p>""",
    },
    30: {
        "extra": """
<h2>Autonomous consumption c₀</h2>
<p>Even at Y = 0, households spend c₀ (essentials, borrowing, savings drawdown) — see Exam Q&amp;A #3.</p>""",
        "ru": """<p>C = c₀ + c₁Y. <strong>c₀</strong> — автономное потребление (траты при Y=0). <strong>c₁ = MPC</strong> — наклон прямой C(Y). MPS = 1 − MPC.</p>""",
    },
    31: {
        "extra": """
<h2>Stagflation</h2>
<p>1970s: SR Phillips seemed to break — high unemployment <em>and</em> high inflation → LR Phillips vertical (no long-run trade-off).</p>""",
        "ru": """<p><strong>Закон Оукена:</strong> рост ниже потенциала → безработица растёт (~1% u ↔ 2% разрыв ВВП). <strong>Кривая Филлипса (КП):</strong> в КП u↓ → π↑. В долгом периоде КП вертикальна при естественном уровне u — компромисса нет.</p>""",
    },
    32: {
        "extra": """
<h2>Checklist</h2>
<ol>
<li>Find Q where MR = MC</li>
<li>Read P from demand (monopoly) or take market P (competition)</li>
<li>Compute π = (P − ATC)×Q</li>
<li>SR: if P &lt; AVC<sub>min</sub> → Q = 0 (shutdown)</li>
</ol>""",
        "ru": """<p>Максимум прибыли: <strong>MR = MC</strong> → Q*, затем P* (монополия — с D; конкуренция — P задан). π = (P−ATC)×Q. Краткий период: если P &lt; AVC<sub>min</sub> — закрыться. Монополист не работает на неэластичном участке D.</p>""",
    },
    33: {
        "extra": """
<h2>Degrees (Frank Ch. 11)</h2>
<table>
<tr><th>Degree</th><th>Method</th></tr>
<tr><td>1st (perfect)</td><td>Charge each unit its WTP</td></tr>
<tr><td>2nd</td><td>Different prices by quantity/segment</td></tr>
<tr><td>3rd</td><td>Different groups (student discounts)</td></tr>
</table>""",
        "ru": """<p><strong>Ценовая дискриминация</strong> — один товар по разным ценам. Нужна рыночная власть и невозможность перепродажи. Frank: P=10−Q, MC=2 → без дискриминации Q*=4, P*=6. Степени: 1-я (идеальная), 2-я, 3-я.</p>""",
    },
    34: {
        "extra": """
<h2>Welfare comparison</h2>
<ul>
<li>Single-price monopoly: DWL triangle</li>
<li>Perfect discrimination: no DWL, all CS → firm</li>
<li>Output rises toward competitive level</li>
</ul>""",
        "ru": """<p><strong>Идеальная (1-я степень) дискриминация:</strong> каждая единица по WTP покупателя → MR = D → выпуск до P = MC на последней единице. Нет мёртвого груза; весь излишек потребителя у фирмы. Противоположность одной цены монополиста.</p>""",
    },
    35: {
        "extra": """
<h2>Total vs marginal WTP</h2>
<p>Demand height at each Q = <strong>marginal</strong> WTP of that unit. CS = sum of (WTP − P) for all units bought = triangle under D above P.</p>""",
        "ru": """<p><strong>WTP (готовность платить)</strong> — максимум за единицу. Кривая спроса = предельная WTP. <strong>Излишек потребителя</strong> (рис. 5.4) — площадь между D и ценой P до Q*. Покупатель лобстера за $8 с WTP $20 получает surplus $12.</p>""",
    },
    36: {
        "extra": """
<h2>Entry & exit</h2>
<p>π &gt; 0 → firms enter → S shifts right → P falls. π &lt; 0 → exit → P rises. LR: P = min LRAC, π = 0.</p>""",
        "ru": """<p><strong>КП предложение отрасли</strong> — сумма MC фирм выше AVC. <strong>ДП:</strong> вход/выход фирм → P → min LRAC, π=0. Frank гл. 10: конкуренция в ДП. Падающая LRAC (гл. 9) → тенденция к монополии.</p>""",
    },
}
