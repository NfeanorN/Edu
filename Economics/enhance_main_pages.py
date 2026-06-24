#!/usr/bin/env python3
"""Add RU footer (small font) + optional extra EN block to Economics explanation pages."""

from pathlib import Path
import re

ROOT = Path(__file__).parent

RU_CSS = """
        .ru-foot { margin-top: 2.5rem; padding: 1rem 0 0; border-top: 1px dashed #bbb; font-size: 0.78rem; line-height: 1.6; color: #666; }
        .ru-foot h3 { font-size: 0.82rem; color: #888; margin: 0 0 8px; font-weight: 600; }
        .ru-foot p, .ru-foot li { margin: 6px 0; }
        .ru-foot ul { padding-left: 1.2rem; margin: 6px 0; }
"""

# filename -> (extra_en_html or "", ru_html)
PAGES = {
    "Budget_Constraint_Explanation.html": (
        """<h2>Frank shelter &amp; food (Ch. 3)</h2>
<p>M = $100/wk · P<sub>S</sub> = $5/sq yd · P<sub>F</sub> = $10/lb → intercepts: (20, 0) shelter only, (0, 10) food only. Slope = −P<sub>S</sub>/P<sub>F</sub> = −1/2.</p>""",
        """<p><strong>Бюджетное ограничение</strong> P_S·S + P_F·F = M — все доступные комбинации товаров. Наклон = −P_S/P_F = альтернативная стоимость. Frank: shelter и food, M=$100/нед, P_S=$5, P_F=$10 → перехваты (20,0) и (0,10). Сдвиг при падении P_F — поворот наружу по оси food; при росте M — параллельный сдвиг.</p>""",
    ),
    "Intertemporal_Budget_Constraint_Explanation.html": (
        "",
        """<p><strong>Межвременный бюджет</strong> (Frank, гл. 5): C₁ + C₂/(1+r) = Y₁ + Y₂/(1+r). Пример: $50 000 и $60 000, r=20%. Наклон −(1+r). Сбережения S=Y₁−C₁; заём B=C₁−Y₁. PV переводит будущее в «сегодня»; FV — наоборот. Точка (Y₁,Y₂) — endowment без сбережений и займов.</p>""",
    ),
    "Opportunity_Cost_Explanation.html": (
        """<h2>Frank Ch. 1 &amp; 3</h2>
<p>Budget slope −P<sub>S</sub>/P<sub>F</sub> = opp. cost of shelter in food units. Sunk costs (paid rent on empty factory) do not affect current output decision (Ch. 9).</p>""",
        """<p><strong>Альтернативная стоимость</strong> — лучшая отвергнутая альтернатива. Явные (деньги) и неявные (упущенная зарплата) издержки. Наклон бюджета и КПВ = opp. cost. Невозвратные издержки в решениях не учитываем.</p>""",
    ),
    "PPF_Explanation.html": (
        "",
        """<p><strong>КПВ</strong> (Frank, гл. 17): максимум clothing и food при данных ресурсах. Точки на кривой — эффективны. Наклон = MRT = альтернативная стоимость. Эффективность: MRT = MRS. Не guns/butter — clothing/food из учебника.</p>""",
    ),
    "Demand_Explanation.html": (
        """<h2>Algebra (Ch. 2, p. 40)</h2>
<p>If Q<sub>D</sub> = a − bP and Q<sub>S</sub> = c + dP, set Q<sub>D</sub> = Q<sub>S</sub> for equilibrium P* and Q*.</p>""",
        """<p><strong>Спрос</strong> (Frank, гл. 2, лобстеры Hyannis): закон — цена ↓ → Q↑. Таблица рис. 2.1: $20→1000, $8→4000/день. Равновесие рис. 2.5: P*=$8, Q*=4000. Движение по D — изменилась только цена товара. Сдвиг (рис. 2.9) — доход, заменители (крабы), дополняющие (масло).</p>""",
    ),
    "Consumer_Surplus_Explanation.html": (
        """<h2>Frank Ch. 5 — Figure 5.4</h2>
<p>CS = ∫(WTP − P)dQ from 0 to Q* = triangle under D above price. <strong>Total surplus</strong> = CS + PS. Monopoly reduces CS vs competition.</p>""",
        """<p><strong>Излишек потребителя</strong> = WTP − фактическая цена; на графике — треугольник под D и над P. Frank, рис. 5.4. <strong>Резервационная цена</strong> пограничного покупателя = высота D. Общий излишек = CS + PS. Монополия уменьшает CS.</p>""",
    ),
    "Supply_Explanation.html": (
        """<h2>Frank Ch. 2 — lobster supply</h2>
<p>At low prices fishermen stay home; at $20 everyone sails out. Firm supply in Ch. 10 = MC above AVC. Industry supply = sum of firm supplies.</p>""",
        """<p><strong>Предложение</strong>: цена ↑ → Q предложения ↑. Кривая S восходящая. Сдвиги: цена ресурсов, технология, число продавцов, налоги/субсидии. Frank: лобстеры — при высокой цене больше рыбаков. Предложение фирмы (гл. 10) = MC выше AVC.</p>""",
    ),
    "Rational_Choice_Explanation.html": (
        "",
        """<p><strong>Рациональный выбор</strong> Frank: гл. 1 — MB=MC (рис. 1.1, 400 мин); гл. 3 — shelter/food, M=$100, MU/P равны, MRS=P_S/P_F. U(F,S)=F×S. Касание бюджета и кривой безразличия (рис. 3.15).</p>""",
    ),
    "Rational_Choice_Explanation_EN.html": (
        "",
        """<p><strong>Рациональный выбор:</strong> MB=MC (гл. 1); shelter/food M=$100 (гл. 3); правило MU_S/P_S = MU_F/P_F; U=F×S; оптимум — касание бюджета и IC.</p>""",
    ),
    "Elasticities_Explanation.html": (
        "",
        """<p><strong>Эластичность</strong> (Frank, гл. 4): PED = %ΔQ/%ΔP. |ε|&gt;1 эластичный, &lt;1 неэластичный. YED — нормальный/нижний товар. XED — заменители (+) и дополняющие (−). Связь с TR и монополией (MR и ε). Лобстеры и крабы — XED.</p>""",
    ),
    "Production_Cost_Short_Run_Explanation.html": (
        "",
        """<p><strong>Краткосрочные издержки</strong> (Frank, гл. 8–9): K фиксирован. TP, MP_L, AP_L; убывающая отдача. FC+VC=TC; AFC, AVC, ATC, MC. MC пересекает AVC и ATC в минимумах (рис. 9.4). MC=w/MP_L.</p>""",
    ),
    "Production_Function_Explanation.html": (
        "",
        """<p><strong>Производственная функция</strong> (гл. 8): кухня — повара при фиксированной кухне. TP, MP, AP; убывающая отдача труда в КП. Отдача от масштаба — в ДП (гл. 9). MC = w/MP.</p>""",
    ),
    "Cost_Long_Run_Explanation.html": (
        "",
        """<p><strong>Долгосрочные издержки</strong> (гл. 9): изокванты, изокосты C=wL+rK, MRTS=w/r. LRAC — огибающая SR ATC. RTS и форма LRAC → монополия vs много мелких. Пекарня Frank — масштабирование печей и пекарей.</p>""",
    ),
    "Monopoly_Explanation.html": (
        "",
        """<p><strong>Монополия</strong> (гл. 11): один продавец, нет заменителей. MR&lt;P; MR=MC; 5 источников монополии; MR=P(1−1/|ε|); не работать на неэластичном участке. Пример ΔTR: 10×$100→11×$95, MR=$45. DWL. Ценовая дискриминация.</p>""",
    ),
    "Perfect_Competition_Explanation.html": (
        "",
        """<p><strong>Совершенная конкуренция</strong> (гл. 10): price taker, P=MR=MC, закрытие при P&lt;AVC_min, в ДП π=0, P=min LRAC. Пшеница — поднял цену на цент → ушли покупатели. Предложение отрасли SR и LR.</p>""",
    ),
    "Market_Power_Explanation.html": (
        """<h2>Frank market structures</h2>
<table><tr><th>Structure</th><th>Firms</th><th>Price</th></tr>
<tr><td>Competition</td><td>Many</td><td>P=MC</td></tr>
<tr><td>Monopoly</td><td>One</td><td>P&gt;MC</td></tr>
<tr><td>Oligopoly</td><td>Few</td><td>Between</td></tr></table>""",
        """<p><strong>Рыночная власть</strong>: способность держать P выше MC. Структуры: конкуренция, монополия, олигополия (Cournot, Bertrand, Stackelberg — гл. 13). Mark-up связан с эластичностью спроса.</p>""",
    ),
    "Game_Theory_Explanation.html": (
        "",
        """<p><strong>Теория игр</strong> (гл. 12): дилемма заключённых, доминирующая стратегия, равновесие Нэша. Связь с олигополией — стимул сжульничать при сговоре. Последовательные и повторяющиеся игры — гл. 12.</p>""",
    ),
    "Price_Discrimination_Explanation.html": (
        "",
        """<p><strong>Ценовая дискриминация</strong> (гл. 11): P=10−Q, MC=2 → Q*=4, P*=6. 1-я степень: MR=D, нет DWL. 2-я — по объёму; 3-я — по группам. Нужна рыночная власть и отсутствие перепродажи.</p>""",
    ),
    "Externalities_Explanation.html": (
        "",
        """<p><strong>Внешние эффекты</strong> (гл. 16): врез на третьих лиц. Отрицательные — перепроизводство (MSC&gt;MPC). Теорема Коуза при низких транзакционных издержках. Налоги на внешние эффекты, углеродный налог. Трагедия общин.</p>""",
    ),
    "GDP_Macro_Explanation.html": (
        """<h2>Key formulas</h2>
<div class="formula-box" style="background:#eef8f0;border-left:4px solid #27ae60;padding:14px;margin:18px 0">
<p><strong>Y = C + I + G + NX</strong> · GDP deflator = (Nominal GDP / Real GDP)×100 · Inflation ≈ %Δ CPI</p>
</div>
<h2>Types of unemployment</h2>
<ul><li>Frictional — between jobs</li><li>Structural — skills mismatch</li><li>Cyclical — recession</li></ul>""",
        """<p><strong>ВВП</strong> (макро, не Frank): Y = C+I+G+NX. Номинальный — текущие цены; реальный — базовый год. Дефлятор, CPI, безработица, инфляция. Реальный ВВП измеряет объём производства.</p>""",
    ),
    "Consumption_Function_Explanation.html": (
        "",
        """<p><strong>Функция потребления</strong> C=c₀+c₁Y (макро). c₀ — автономное потребление при Y=0. MPC=c₁ — наклон. MPS=1−MPC. Связь с мультипликатором 1/(1−MPC).</p>""",
    ),
    "Goods_Market_Multiplier_Explanation.html": (
        "",
        """<p><strong>Мультипликатор</strong>: ΔY = (1/(1−MPC))×ΔG. Парадокс бережливости: рост MPS → меньше мультипликатор. Равновесие Y=AE на графике 45°. Кейнсианская модель товарного рынка.</p>""",
    ),
    "IS_LM_Explanation.html": (
        "",
        """<p><strong>IS-LM</strong>: IS — товарный рынок, i↓→Y↑. LM — деньги, Y↑→i↑. Пересечение — Y*, i*. Экспансионная политика сдвигает IS или LM. Решение двух уравнений на экзамене.</p>""",
    ),
    "Fiscal_Monetary_Policy_Explanation.html": (
        "",
        """<p><strong>Фискальная политика</strong>: G, T → сдвиг IS. <strong>Денежная</strong>: M, r → LM. ЦБ: инфляция ~2%, продажа облигаций → M↓, r↑. Координация политик в кризис и рецессию.</p>""",
    ),
    "Unemployment_Inflation_Explanation.html": (
        "",
        """<p><strong>Безработица</strong>: фрикционная, структурная, циклическая. <strong>Инфляция</strong>: CPI, GDP deflator. Естественный уровень u. Связь с кривой Филлипса и законом Оукена.</p>""",
    ),
    "Open_Economy_Explanation.html": (
        "",
        """<p><strong>Открытая экономика</strong>: экспорт, импорт, NX. Номинальный и реальный обменный курс. Реальный курс = (e×P_иностр)/P_дом. Влияние на конкурентоспособность экспорта.</p>""",
    ),
    "Okun_Phillips_Explanation.html": (
        "",
        """<p><strong>Оукен</strong>: разрыв ВВП ↔ безработица (~1:2). <strong>Филлипс КП</strong>: u↓→π↑. <strong>Филлипс ДП</strong>: вертикальна — нет компромисса. Стагфляция 1970-х. Макро, не Frank.</p>""",
    ),
    "Okun_Phillips_Explanation_EN.html": (
        "",
        """<p><strong>Оукен:</strong> рост ниже потенциала → u растёт. <strong>Филлипс:</strong> краткосрочный trade-off u–π; долгосрочно вертикальная кривая при естественном u.</p>""",
    ),
    "Exam_Macro_Key_Questions.html": (
        "",
        """<p><strong>Экзамен макро:</strong> C при Y=0 = c₀; YED нормальный/нижний/роскошь; ЦБ продаёт облигации → r↑, Y↓; после рецессии — разрыв, политика стимула; IS-LM — подставить и найти Y*, i*.</p>""",
    ),
    "Exam_Prep_Guide.html": (
        "",
        """<p><strong>Шпаргалка 36 тем:</strong> каждый блок выше — формулировка вопроса, RU+EN, формулы, примеры. Краткие одностраничники с русским внизу — папка <code>Syllabus/</code>. Микро — только Frank; макро — лекции.</p>""",
    ),
    "Frank_Study_Guide_EN.html": (
        "",
        """<p><strong>Кратко:</strong> английский конспект Frank по спросу/предложению (лобстеры Hyannis), издержкам (гл. 8–9), конкуренции (гл. 10), монополии и MR (гл. 11), олигополии Cournot/Bertrand/Stackelberg (гл. 13). Русская версия — <code>Frank_Study_Guide.html</code>.</p>""",
    ),
    "Frank_Study_Guide.html": (
        "",
        """<p><strong>Конспект Frank:</strong> те же темы, что EN-версия — в каждом абзаце RU сверху, EN снизу. Подробные главы — отдельные страницы в <code>Economics/index.html</code>.</p>""",
    ),
}


def inject_css(html: str) -> str:
    if ".ru-foot" in html:
        return html
    return html.replace("</style>", RU_CSS + "\n    </style>", 1)


def inject_content(html: str, extra: str, ru: str) -> str:
    if 'class="ru-foot"' in html:
        return html

    extra_block = f"\n{extra}\n" if extra.strip() else ""
    footer = f'\n<div class="ru-foot"><h3>🇷🇺 По-русски</h3>{ru}</div>\n'

    # Insert before </body>, prefer inside last </div> before body end for wrapped pages
    if extra_block:
        html = html.replace("</body>", extra_block + footer + "</body>", 1)
    else:
        html = html.replace("</body>", footer + "</body>", 1)
    return html


def main():
    updated = 0
    for name, (extra, ru) in PAGES.items():
        path = ROOT / name
        if not path.exists():
            print(f"skip missing: {name}")
            continue
        html = path.read_text(encoding="utf-8")
        new_html = inject_css(html)
        new_html = inject_content(new_html, extra, ru)
        if new_html != html:
            path.write_text(new_html, encoding="utf-8")
            updated += 1
            print(f"updated: {name}")
    print(f"Done. Updated {updated} files.")


if __name__ == "__main__":
    main()
