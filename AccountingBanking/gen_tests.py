#!/usr/bin/env python3
"""Generate Accounting & Banking for SMEs HTML tests."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).parent
ACCENT = "#16a085"

TEMPLATE = open(ROOT.parent / "HRM" / "gen_tests.py", encoding="utf-8").read().split('TEMPLATE = """')[1].split('"""', 1)[0]
# Reuse HRM template block via exec below — we build template inline for accent color

def build_template():
    t = Path(ROOT.parent / "HRM" / "gen_tests.py").read_text(encoding="utf-8")
    start = t.index('TEMPLATE = """') + len('TEMPLATE = """')
    end = t.index('"""', start)
    body = t[start:end]
    body = body.replace("#7b4397", ACCENT).replace("#6a3784", "#138d75").replace(
        "← К тестам HRM", "← К тестам Accounting & Banking"
    ).replace("f3f0f7", "#eef9f6").replace("f8f5fc", "#eefaf7").replace("##eef9f6", "#eef9f6")
    body = body.replace(
        "mark.wrong-mark {{ background: #fadbd8; padding: 0 4px; border-radius: 3px; }}",
        "mark.wrong-mark {{ background: #fadbd8; padding: 0 4px; border-radius: 3px; }}\n"
        "    .howto {{\n"
        "      margin-top: 0.75rem;\n"
        "      padding: 0.85rem 1rem;\n"
        "      background: #eefaf7;\n"
        "      border-radius: 8px;\n"
        "      border-left: 3px solid #16a085;\n"
        "      font-size: 0.9rem;\n"
        "      white-space: pre-wrap;\n"
        "    }}\n"
        "    .explain {{ margin-top: 0.5rem; font-size: 0.88rem; opacity: 0.95; }}",
    )
    body = body.replace(
        '<div class="sample" hidden></div>`;',
        '<div class="howto" hidden></div><div class="sample" hidden></div>`;',
    )
    body = body.replace(
        "block.querySelector('.sample').textContent = item.sample_ru;",
        "block.querySelector('.sample').textContent = item.sample_ru || '';\n"
        "        const howtoEl = block.querySelector('.howto');\n"
        "        if (item.howto_ru) howtoEl.textContent = item.howto_ru;\n"
        "        else howtoEl.remove();",
    )
    body = body.replace(
        "container.querySelectorAll('.open-block .sample').forEach(el => {{ el.hidden = false; }});",
        "container.querySelectorAll('.open-block .sample, .open-block .howto').forEach(el => {{ el.hidden = false; }});",
    )
    body = body.replace(
        "fb.textContent = '✓ Верно';",
        "fb.innerHTML = '✓ Верно' + (q.explain_ru ? '<div class=\"explain\">' + q.explain_ru + '</div>' : '');",
    )
    body = body.replace(
        "'</mark>. Правильный: <mark class=\"correct-mark\">' + q.correct.toUpperCase() + '</mark>';",
        "'</mark>. Правильный: <mark class=\"correct-mark\">' + q.correct.toUpperCase() + '</mark>' +\n"
        "            (q.explain_ru ? '<div class=\"explain\">' + q.explain_ru + '</div>' : '');",
    )
    return body


TEMPLATE = build_template()


HOWTO_HTML = """<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Как решать задачи — Accounting &amp; Banking</title>
  <style>
    * {{ box-sizing: border-box; }}
    body {{
      font-family: "Segoe UI", system-ui, sans-serif;
      line-height: 1.65;
      margin: 0;
      padding: 2rem 1rem 3rem;
      color: #1a1a2e;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8f4f1 100%);
    }}
    .wrap {{ max-width: 860px; margin: 0 auto; }}
    .back a {{ color: #16a085; text-decoration: none; }}
    h1 {{ color: #2c3e50; border-bottom: 4px solid #16a085; padding-bottom: 12px; }}
    h2 {{ color: #16a085; margin-top: 2rem; font-size: 1.2rem; }}
    .card {{
      background: #fff;
      border-radius: 10px;
      padding: 1.1rem 1.25rem;
      margin: 1rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
      border: 1px solid #e8ecf1;
    }}
  .card pre {{ background: #f4f8f7; padding: 0.75rem; border-radius: 8px; overflow-x: auto; font-size: 0.88rem; }}
    table {{ border-collapse: collapse; width: 100%; font-size: 0.88rem; margin: 0.5rem 0; }}
    th, td {{ border: 1px solid #ccc; padding: 6px 8px; text-align: right; }}
    th {{ background: #16a085; color: #fff; text-align: center; }}
    td:first-child, th:first-child {{ text-align: center; }}
    .sub {{ color: #555; }}
  </style>
</head>
<body>
  <div class="wrap">
    <p class="back"><a href="index.html">← К списку тестов</a></p>
    <h1>Как решать задачи</h1>
    <p class="sub">Accounting &amp; Banking for SMEs — пошаговые методы для расчётных и практических заданий экзамена.</p>

    <div class="card">
      <h2>1. ROE банка</h2>
      <p><strong>Формула:</strong> ROE = чистая прибыль / собственный капитал (bank capital).</p>
      <pre>Пример: profit = 5, bank capital = 50
ROE = 5 / 50 = 0,10 = 10%  → ответ b)</pre>
      <p>Если в условии прибыль <em>до налогов</em> и tax = 50%: PAT = 5 × (1 − 0,5) = 2,5 → ROE = 5%. Смотрите, дана ли уже <strong>чистая</strong> прибыль.</p>
    </div>

    <div class="card">
      <h2>2. Repricing gap (ΔNII)</h2>
      <pre>ΔNII = Gap × Δr
Gap = −10 000 000 €,  Δr = 2% = 0,02
ΔNII = −10 000 000 × 0,02 = −200 000 €  → ответ a)</pre>
      <p>Отрицательный gap: при росте ставок чистый процентный доход падает.</p>
    </div>

    <div class="card">
      <h2>3. Duration облигации</h2>
      <p>Дольше срок погашения и <strong>реже</strong> купоны → выше duration.</p>
      <p>Ответ: <strong>10 лет, 5%, купон ежегодно</strong> (не ежемесячно).</p>
    </div>

    <div class="card">
      <h2>4. Statement of Financial Position (Uniclam)</h2>
      <p><strong>Шаг 1.</strong> Разнести статьи по классам IFRS:</p>
      <ul>
        <li><strong>NCA:</strong> Goodwill, Other intangible, PPE</li>
        <li><strong>CA:</strong> Inventories, Trade receivables, Cash</li>
        <li><strong>Equity:</strong> Share capital, Retained earnings</li>
        <li><strong>NCL:</strong> Long-term borrowings, Deferred tax</li>
        <li><strong>CL:</strong> Short-term borrowings, Trade payables, Current tax payable</li>
      </ul>
      <p><strong>Шаг 2.</strong> Сложить подразделы → Total Assets = Total Equity + Liabilities.</p>
      <pre>Вариант 1: активы = 204 850 €
  NCA = 12 750 + 8 500 + 103 700 = 124 950
  CA  = 37 400 + 23 800 + 18 700 = 79 900
Пассивы: Equity 66 300 + NCL 87 550 + CL 51 000 = 204 850</pre>
    </div>

    <div class="card">
      <h2>5. Таблица подразделений A / B</h2>
      <p>Общие суммы распределяйте пропорционально:</p>
      <ul>
        <li><strong>Indirect labour</strong> → по direct labour (A : B = 12 : 24)</li>
        <li><strong>Selling (и Advertising)</strong> → по revenue (A : B = 108 : 72)</li>
        <li><strong>Electricity, Financial costs</strong> → по raw materials (A : B = 12 : 6)</li>
      </ul>
      <pre>Pre-tax profit = Revenue − все затраты
Taxes = 30% × Pre-tax profit
Net Income = Pre-tax − Taxes

Пример 2024, Division A:
  Selling = 12 000 × 108/180 = 7 200
  Electricity = 16 800 × 12/18 = 11 200
  Pre-tax = 48 400 → Tax = 14 520 → Net = 33 880 ✓</pre>
    </div>

    <div class="card">
      <h2>6. Производство (inventory 30%)</h2>
      <pre>Ending inventory = 30% × продажи следующего месяца
Beginning inventory = 30% × продажи текущего месяца
Production = Продажи + Ending inv. − Beginning inv.

May: 90 000 + (0,3×80 000) − (0,3×90 000) = 87 000 units</pre>
    </div>

    <div class="card">
      <h2>7. Амортизация — straight-line</h2>
      <pre>Годовая амортизация = (Cost − Residual) / Life
= (160 000 − 28 000) / 6 = 22 000 $/год

Каждый год: Accum. dep. += 22 000; NBV = Cost − Accum. dep.
Год 6: NBV = 28 000 $ (остаточная стоимость)</pre>
      <table>
        <tr><th>Year</th><th>Dep.</th><th>Accum.</th><th>NBV</th></tr>
        <tr><td>1</td><td>22 000</td><td>22 000</td><td>138 000</td></tr>
        <tr><td>2</td><td>22 000</td><td>44 000</td><td>116 000</td></tr>
        <tr><td>3</td><td>22 000</td><td>66 000</td><td>94 000</td></tr>
        <tr><td>4</td><td>22 000</td><td>88 000</td><td>72 000</td></tr>
        <tr><td>5</td><td>22 000</td><td>110 000</td><td>50 000</td></tr>
        <tr><td>6</td><td>22 000</td><td>132 000</td><td>28 000</td></tr>
      </table>
    </div>

    <div class="card">
      <h2>8. Амортизация — reducing balance 15%</h2>
      <pre>Depreciation year n = Carrying value × 15%
NBV = Carrying value − Depreciation</pre>
      <table>
        <tr><th>Year</th><th>Carrying</th><th>Dep.</th><th>Accum.</th><th>NBV</th></tr>
        <tr><td>1</td><td>160 000</td><td>24 000</td><td>24 000</td><td>136 000</td></tr>
        <tr><td>2</td><td>136 000</td><td>20 400</td><td>44 400</td><td>115 600</td></tr>
        <tr><td>3</td><td>115 600</td><td>17 340</td><td>61 740</td><td>98 260</td></tr>
        <tr><td>4</td><td>98 260</td><td>14 739</td><td>76 479</td><td>83 521</td></tr>
        <tr><td>5</td><td>83 521</td><td>12 528</td><td>89 007</td><td>70 993</td></tr>
        <tr><td>6</td><td>70 993</td><td>10 649</td><td>99 656</td><td>60 344</td></tr>
      </table>
      <p>NBV при reducing balance обычно <strong>не</strong> совпадает с residual $28 000 без корректировки в последний год.</p>
    </div>

    <div class="card">
      <h2>9. Call option</h2>
      <p>Покупатель call выигрывает, когда цена актива <strong>растёт</strong> (payoff ↑).</p>
      <p>Если цена <strong>падает</strong> → payoff <strong>ниже</strong> (ответ b), не «выше».</p>
    </div>

    <div class="card">
      <h2>10. European Banking Union — 3 столпа</h2>
      <ol>
        <li><strong>Supervision</strong> (SSM) — надзор</li>
        <li><strong>Resolution</strong> (SRM, bail-in, bad-bank) — урегулирование</li>
        <li><strong>Deposit guarantee</strong> (DGS) — гарантии вкладов</li>
      </ol>
    </div>
  </div>
</body>
</html>
"""

INDEX = """<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Accounting &amp; Banking for SMEs</title>
  <style>
    * {{ box-sizing: border-box; }}
    body {{
      font-family: "Segoe UI", system-ui, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 2rem;
      color: #1a1a2e;
      background: linear-gradient(135deg, #f5f7fa 0%, #e8f4f1 100%);
      min-height: 100vh;
    }}
    .wrap {{ max-width: 800px; margin: 0 auto; }}
    h1 {{
      color: #2c3e50;
      border-bottom: 4px solid #16a085;
      padding-bottom: 12px;
    }}
    .sub {{ color: #555; }}
    .topics {{ list-style: none; padding: 0; margin: 1.5rem 0; }}
    .topics li {{ margin: 0.6rem 0; }}
    .topics a {{
      display: block;
      padding: 1rem 1.2rem;
      background: #fff;
      border-radius: 10px;
      text-decoration: none;
      color: #2c3e50;
      border: 1px solid #e0e6ed;
    }}
    .topics a:hover {{
      border-color: #16a085;
      box-shadow: 0 4px 12px rgba(22, 160, 133, 0.15);
    }}
    .title {{ font-weight: 600; font-size: 1.05rem; }}
    .desc {{ color: #666; font-size: 0.88rem; margin-top: 4px; }}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Accounting &amp; Banking for SMEs</h1>
    <p class="sub">Учёт и банковское дело для МСП — экзамены 2024–2026. RU + EN, проверка ответов.</p>
    <ul class="topics">
      <li><a href="00_How_To_Solve.html"><span class="title">00 — Как решать задачи</span><span class="desc">ROE, gap, SoFP, таблицы, амортизация — пошагово</span></a></li>
      <li><a href="01_Part1_Management_Accounting.html"><span class="title">01 — Part 1 (05/06/2024)</span><span class="desc">8 MCQ · management, break-even, DCF</span></a></li>
      <li><a href="06_Part1_IFRS_2025.html"><span class="title">06 — Part 1 IFRS (25/06/2025)</span><span class="desc">IAS 2, Framework, IFRS 15</span></a></li>
      <li><a href="11_Part1_Financial_Statements.html"><span class="title">11 — Part 1: отчётность (Q1–4)</span><span class="desc">Cash flows, current ratio, IAS 7</span></a></li>
      <li><a href="07_Part1_Management_Q5-8.html"><span class="title">07 — Management Q5–8</span><span class="desc">Функции менеджмента, direct costs</span></a></li>
      <li><a href="02_Part2_Finance_Banking.html"><span class="title">02 — Part 2 (05/06/2024)</span><span class="desc">18 MCQ · банки, CAPM, EBU</span></a></li>
      <li><a href="08_Part2_Exam_2026_Variant_B.html"><span class="title">08 — Part 2 (25/06/2026, Variant B)</span><span class="desc">18 MCQ · Basel I, IFRS 9, VaR</span></a></li>
      <li><a href="12_Part2_Exam_Variant_C.html"><span class="title">12 — Part 2 (Variant C, Q7–14)</span><span class="desc">DGS, IFRS 9 Stage 1, call option</span></a></li>
      <li><a href="03_Part2_Calculations.html"><span class="title">03 — Расчёты Part 2</span><span class="desc">ROE, repricing gap, duration · 3 балла</span></a></li>
      <li><a href="04_Sustainability.html"><span class="title">04 — Sustainability &amp; SROI</span><span class="desc">3 MCQ</span></a></li>
      <li><a href="09_Statement_of_Financial_Position.html"><span class="title">09 — Statement of Financial Position</span><span class="desc">Uniclam Group Corp. · 2 варианта</span></a></li>
      <li><a href="10_Depreciation.html"><span class="title">10 — Depreciation</span><span class="desc">Straight-line и reducing balance 15%</span></a></li>
      <li><a href="05_Open_Questions.html"><span class="title">05 — Открытые вопросы</span><span class="desc">Посредники, баланс банка, DCF, EBU</span></a></li>
    </ul>
  </div>
</body>
</html>
"""


def opt(letter: str, en: str, ru: str) -> dict:
    return {"id": letter.lower(), "en": en, "ru": ru}


def q(num, en, ru, options, correct, section=None, qid=None, explain_ru=None):
    d = {
        "num": num,
        "id": qid or f"q{num}",
        "en": en,
        "ru": ru,
        "options": options,
        "correct": correct,
        "section": section,
    }
    if explain_ru:
        d["explain_ru"] = explain_ru
    return d


def write_static(filename: str, html: str) -> None:
    """Write HTML that is not passed through str.format (CSS uses single braces)."""
    (ROOT / filename).write_text(html.replace("{{", "{").replace("}}", "}"), encoding="utf-8")


def write_page(filename, title_ru, title_en, questions, open_items=None, sna_items=None,
               rules_html="", extra_html="", scoring=None):
    html = TEMPLATE.format(
        title_ru=title_ru,
        title_en=title_en,
        rules_html=rules_html,
        extra_html=extra_html,
        extra_init="",
        extra_render="",
        scoring_json=json.dumps(scoring or {"correct": 1, "wrong": 0, "max": None}),
        questions_json=json.dumps(questions, ensure_ascii=False),
        open_json=json.dumps(open_items or [], ensure_ascii=False),
        sna_json=json.dumps(sna_items or [], ensure_ascii=False),
    )
    (ROOT / filename).write_text(html, encoding="utf-8")


def main():
    write_static("index.html", INDEX)
    write_static("00_How_To_Solve.html", HOWTO_HTML)

    part1 = [
        q(1, "The management of an organization performs three general broad functions:",
          "Менеджмент организации выполняет три общие функции:",
          [opt("a", "Planning, directing and motivating, controlling", "Планирование, руководство и мотивация, контроль"),
           opt("b", "Planning, budgeting and controlling", "Планирование, бюджетирование и контроль"),
           opt("c", "Planning, accounting and controlling", "Планирование, учёт и контроль"),
           opt("d", "Directing and motivating, accounting and controlling", "Руководство, учёт и контроль")], "a"),
        q(2, "Planning involves:",
          "Планирование включает:",
          [opt("a", "Developing objectives and preparing various budgets to achieve these objectives",
               "Разработку целей и подготовку бюджетов для их достижения"),
           opt("b", "Steps taken by management to ensure objectives are attained",
               "Шаги менеджмента для достижения целей"),
           opt("c", "Analysis of accounts and fiscal trends to advise business decisions",
               "Анализ счетов и трендов для принятия решений"),
           opt("d", "Guiding and motivating people to achieve organisational objectives",
               "Руководство и мотивацию людей для достижения целей")], "a"),
        q(3, "For all companies to be efficient and effective it must have 3 levels of managers namely:",
          "Для эффективности компании нужны 3 уровня менеджеров:",
          [opt("a", "Strategic, Accounting and Operational Managers", "Стратегические, учётные и операционные"),
           opt("b", "Strategic, Tactical and Financial Managers", "Стратегические, тактические и финансовые"),
           opt("c", "Strategic, Tactical and Operational Managers", "Стратегические, тактические и операционные"),
           opt("d", "Financial, Accounting and Operational Managers", "Финансовые, учётные и операционные")], "c"),
        q(4, "The Direct costs are:",
          "Прямые затраты (direct costs) — это:",
          [opt("a", "Costs that vary directly and proportionately with changes in activity level",
               "Затраты, меняющиеся пропорционально уровню активности"),
           opt("b", "Costs that remain the same in total regardless of activity level",
               "Затраты, не меняющиеся в сумме при изменении активности"),
           opt("c", "Costs that can be easily and conveniently traced to a product or department",
               "Затраты, которые легко отнести на продукт или подразделение"),
           opt("d", "Costs that must be allocated to be assigned to a product or department",
               "Затраты, которые нужно распределять на продукт или подразделение")], "c"),
        q(5, "The formula for break even analysis is as follows:",
          "Формула точки безубыточности:",
          [opt("a", "Variable costs / (Sales price per unit – Variable cost per unit)",
               "Переменные затраты / (Цена − Переменные затраты на ед.)"),
           opt("b", "(Variable cost + Fixed costs) / Sales price",
               "(Переменные + Постоянные) / Цена продажи"),
           opt("c", "Fixed costs / (Sales price per unit – Variable cost per unit)",
               "Постоянные затраты / (Цена − Переменные затраты на ед.)"),
           opt("d", "Assets / (Revenue – Fixed costs)", "Активы / (Выручка − Постоянные затраты)")], "c"),
        q(6, "Which EU authority has regulatory powers on banking corporate governance matters:",
          "Какой орган ЕС регулирует корпоративное управление банков:",
          [opt("a", "The ECB", "ECB"),
           opt("b", "The EBA", "EBA"),
           opt("c", "The ECB and the EBA", "ECB и EBA"),
           opt("d", "The Basel Committee on Banking Supervision", "Базельский комитет")], "c"),
        q(7, "Within the banking organization, who has the ultimate responsibility over governance, strategy and financial soundness?",
          "Кто несёт окончательную ответственность за governance, стратегию и финансовую устойчивость банка:",
          [opt("a", "The CEO", "CEO"),
           opt("b", "The Board", "Совет директоров (Board)"),
           opt("c", "The CEO and the CFO", "CEO и CFO"),
           opt("d", "The heads of internal control functions", "Руководители внутреннего контроля")], "b"),
        q(8, "Discounted Cash Flow (DCF) analysis is?",
          "Анализ дисконтированных денежных потоков (DCF) — это:",
          [opt("a", "Relative valuation using trading multiples", "Относительная оценка по мультипликаторам"),
           opt("b", "Relative valuation comparing recent M&A transactions", "Сравнение с недавними сделками M&A"),
           opt("c", "A Market approach method", "Рыночный подход"),
           opt("d", "An intrinsic value approach", "Подход внутренней (intrinsic) стоимости")], "d"),
    ]

    part2 = [
        q(1, "In the perspective of investors, which instrument is riskier?",
          "С точки зрения инвестора, какой инструмент рискованнее?",
          [opt("a", "Government bond", "Государственная облигация"),
           opt("b", "Corporate bond", "Корпоративная облигация"),
           opt("c", "Equity share", "Акция (доля в капитале)"),
           opt("d", "Subordinated bond", "Субординированная облигация")], "c"),
        q(2, "In the perspective of firms, which instrument has constant cash outflows?",
          "С точки зрения фирмы, у какого инструмента постоянные денежные выплаты?",
          [opt("a", "Bond with variable rates", "Облигация с плавающей ставкой"),
           opt("b", "Equity", "Акционерный капитал"),
           opt("c", "Bond with fixed rates", "Облигация с фиксированной ставкой"),
           opt("d", "None of the above", "Ни один из перечисленных")], "c"),
        q(3, "About the exchange of money, in the financial system we have:",
          "Об обмене денег в финансовой системе:",
          [opt("a", "Indirect and direct circuit", "Прямой и непрямой контур"),
           opt("b", "Direct circuit only", "Только прямой контур"),
           opt("c", "Indirect circuit only", "Только непрямой контур"),
           opt("d", "None of the above", "Ни один из перечисленных")], "a"),
        q(4, "A credit line on which a borrower can draw and repay many times is:",
          "Кредитная линия, по которой заёмщик может многократно брать и возвращать средства:",
          [opt("a", "Bond", "Облигация"),
           opt("b", "Non revolving loan", "Невозобновляемый кредит"),
           opt("c", "Revolving loan", "Возобновляемый кредит (revolving)"),
           opt("d", "Syndicated loan", "Синдицированный кредит")], "c"),
        q(5, "In the European Banking Union we have:",
          "В Европейском банковском союзе:",
          [opt("a", "1 pillar", "1 столп"),
           opt("b", "5 pillars", "5 столпов"),
           opt("c", "2 pillars", "2 столпа"),
           opt("d", "3 pillars", "3 столпа")], "d"),
        q(6, "The first pillar of the European Banking Union is about:",
          "Первый столп Европейского банковского союза — это:",
          [opt("a", "Sustainability", "Устойчивость"),
           opt("b", "Deposit guarantee schemes", "Схемы гарантирования вкладов"),
           opt("c", "Resolution mechanisms", "Механизмы resolution"),
           opt("d", "Supervision", "Надзор (supervision)")], "d"),
        q(7, "With the stress tests the authority defines:",
          "Стресс-тесты позволяют регулятору определить:",
          [opt("a", "The need of new equity", "Потребность в новом капитале (equity)"),
           opt("b", "The need of new debt", "Потребность в новом долге"),
           opt("c", "The profitability of the banks", "Рентабельность банков"),
           opt("d", "None of the answers", "Ни один из ответов")], "a"),
        q(8, "Ratings are used for the calculation of:",
          "Рейтинги используются для расчёта:",
          [opt("a", "EAD", "EAD"),
           opt("b", "LGD", "LGD"),
           opt("c", "None of the answers", "Ни один из ответов"),
           opt("d", "PD", "PD (вероятность дефолта)")], "d"),
        q(9, "According to CAPM the cost of equity (used in DCF) is determined using:",
          "По CAPM стоимость equity (в DCF) определяется через:",
          [opt("a", "Risk free rate, beta, market risk premium",
               "Безрисковая ставка, бета, рыночная премия за риск"),
           opt("b", "Beta and WACC", "Бета и WACC"),
           opt("c", "WACC", "WACC"),
           opt("d", "Only risk free rate", "Только безрисковая ставка")], "a"),
        q(10, "The repricing model is useful to manage:",
          "Модель переоценки (repricing) полезна для управления:",
          [opt("a", "Interest rate risk", "Процентным риском"),
           opt("b", "Credit risk", "Кредитным риском"),
           opt("c", "Sovereign risk", "Суверенным риском"),
           opt("d", "Mutual funds", "Паевыми фондами")], "a"),
        q(11, "IFRS 9 is useful to determine:",
          "IFRS 9 используется для определения:",
          [opt("a", "Geographical division of assets", "Географического распределения активов"),
           opt("b", "The expected losses", "Ожидаемых потерь (expected losses)"),
           opt("c", "Geographical division of liabilities", "Географического распределения обязательств"),
           opt("d", "Bonis", "Bonis")], "b"),
        q(12, "Repayments from foreign borrowers may be interrupted due to government restrictions — this is:",
          "Риск прерывания платежей иностранных заёмщиков из-за ограничений правительства — это:",
          [opt("a", "Country risk", "Страновой риск (country risk)"),
           opt("b", "Liquidity risk", "Риск ликвидности"),
           opt("c", "Market risk", "Рыночный риск"),
           opt("d", "Operational risk", "Операционный риск")], "a"),
        q(13, "What are the strengths of the DCF?",
          "Сильные стороны DCF:",
          [opt("a", "All the answers", "Все перечисленные"),
           opt("b", "It is scientific", "Научность"),
           opt("c", "It is widely used", "Широкое применение"),
           opt("d", "It is based on cash flows", "Основан на денежных потоках")], "a"),
        q(14, "Which theory introduces moral hazard and adverse selection?",
          "Какая теория вводит moral hazard и adverse selection?",
          [opt("a", "Information asymmetries", "Информационная асимметрия"),
           opt("b", "Uncertainty", "Неопределённость"),
           opt("c", "Intellectual asymmetries", "Интеллектуальная асимметрия"),
           opt("d", "Transaction costs", "Транзакционные издержки")], "a"),
        q(15, "Which activity is specific to investment banks?",
          "Какая деятельность характерна для инвестиционных банков?",
          [opt("a", "M&A support", "Поддержка M&A"),
           opt("b", "Credit intermediation", "Кредитное посредничество"),
           opt("c", "General lending activities", "Обычное кредитование"),
           opt("d", "None of the answers", "Ни один из ответов")], "a"),
        q(16, "The total value of an operating business regardless of capital structure is:",
          "Совокупная стоимость действующего бизнеса независимо от структуры капитала:",
          [opt("a", "Firm value", "Стоимость фирмы (firm value)"),
           opt("b", "Equity value", "Стоимость equity"),
           opt("c", "Net debt", "Чистый долг"),
           opt("d", "None of the answers", "Ни один из ответов")], "a"),
        q(17, "The bail-in:",
          "Bail-in:",
          [opt("a", "Optional choice of bank managers", "Добровольный выбор менеджеров"),
           opt("b", "Related only to customer creditworthiness", "Связан только с кредитоспособностью клиентов"),
           opt("c", "Resolution mechanism of the first pillar of EBU", "Механизм resolution 1-го столпа EBU"),
           opt("d", "Resolution mechanism of the second pillar of EBU",
               "Механизм resolution 2-го столпа EBU")], "d"),
        q(18, "The early interventions of the SRM are used:",
          "Ранние вмешательства SRM применяются:",
          [opt("a", "None of the answers", "Ни один из ответов"),
           opt("b", "After the bail-in", "После bail-in"),
           opt("c", "Before the bail-in", "До bail-in"),
           opt("d", "During the bail-in", "Во время bail-in")], "c"),
    ]

    calc = [
        q(14, "Calculate ROE: bank capital 50; profit 5; (ROE = profit / bank capital)",
          "Рассчитайте ROE: капитал банка 50; прибыль 5; ROE = profit / bank capital",
          [opt("a", "5%", "5%"),
           opt("b", "10%", "10%"),
           opt("c", "25%", "25%"),
           opt("d", "1%", "1%")], "b",
          explain_ru="ROE = 5 / 50 = 10%. Если profit до налогов и tax 50% → 2,5/50 = 5%."),
        q(15, "Repricing gap model: Gap -10 mln €; interest rate change 2%. ΔNII = Gap × Δr",
          "Repricing gap: разрыв −10 млн €; изменение ставки 2%. ΔNII = Gap × Δr",
          [opt("a", "-200.000 euro", "−200 000 €"),
           opt("b", "200.000 euro", "200 000 €"),
           opt("c", "-20.000.000 euro", "−20 000 000 €"),
           opt("d", "-50.000 euro", "−50 000 €")], "a",
          explain_ru="ΔNII = −10 000 000 × 0,02 = −200 000 €."),
        q(16, "Which bond has the longest duration?",
          "У какой облигации наибольшая duration?",
          [opt("a", "Maturity 10 years; rate 5%; coupon monthly", "10 лет; 5%; купон ежемесячно"),
           opt("b", "Maturity 5 years; rate 5%; coupon monthly", "5 лет; 5%; купон ежемесячно"),
           opt("c", "Maturity 10 years; rate 5%; coupon annual", "10 лет; 5%; купон ежегодно"),
           opt("d", "Maturity 1 year; rate 5%; coupon monthly", "1 год; 5%; купон ежемесячно")], "c",
          explain_ru="Больше срок + реже купоны → выше duration (10 лет, annual)."),
        q(17, "Usually, loans to consumers are:",
          "Обычно потребительские кредиты — это:",
          [opt("a", "Interest bearing assets", "Процентные активы"),
           opt("b", "Non interest bearing assets", "Безпроцентные активы"),
           opt("c", "Expensive liabilities", "Дорогие обязательства"),
           opt("d", "Real assets", "Реальные активы")], "a",
          explain_ru="Кредиты клиентам — процентные активы в балансе банка."),
    ]

    sust = [
        q(6, "The SROI indicators:",
          "Показатели SROI:",
          [opt("a", "Relates asset value to cash flows and risk", "Связывает стоимость актива с денежными потоками и риском"),
           opt("b", "Estimates price by comparable assets", "Оценивает цену по сопоставимым активам"),
           opt("c", "Measures monetary social impact relative to investment volume",
               "Измеряет денежный социальный эффект относительно объёма инвестиций"),
           opt("d", "Method of raising capital for startups", "Способ привлечения капитала для стартапов")], "c"),
        q(7, "Corporate Sustainability:",
          "Корпоративная устойчивость (sustainability):",
          [opt("a", "Impact investing with measurable ESG impact", "Инвестиции с измеримым ESG-эффектом"),
           opt("b", "Capacity to safeguard long-term profitability while respecting environment, people and resources",
               "Способность обеспечивать долгосрочную прибыль, уважая среду, людей и ресурсы"),
           opt("c", "Circular economy sharing and recycling model", "Модель циркулярной экономики"),
           opt("d", "Skills and abilities employees bring to operations", "Навыки и способности сотрудников")], "b"),
        q(8, "Efficiency is:",
          "Эффективность (efficiency) — это:",
          [opt("a", "Money needed for stability given assets and liabilities", "Деньги для стабильности при данных активах и обязательствах"),
           opt("b", "Comparison of what is produced with what can be achieved with the same resources",
               "Сравнение фактического результата с тем, что можно достичь при тех же ресурсах"),
           opt("c", "LBO technique using mostly debt", "LBO с преимущественным долгом"),
           opt("d", "Degree to which objectives are achieved", "Степень достижения целей (это effectiveness)")], "b"),
    ]

    open_items = [
        {"title_ru": "Функции финансовой системы", "ru": "Explain the functions of the financial system",
         "en": "Explain the functions of the financial system",
         "sample_ru": "Посредничество, распределение рисков, трансформация сроков и объёмов, платёжная система, ценообразование информации, мобилизация сбережений."},
        {"title_ru": "Теории существования финансовых посредников", "ru": "Explains the theories of the existence of financial intermediaries",
         "en": "Explains the theories of the existence of financial intermediaries",
         "sample_ru": "Снижение транзакционных издержек, диверсификация риска, асимметрия информации (adverse selection, moral hazard), трансформация сроков и объёмов, экспертиза."},
        {"title_ru": "Баланс банка и индексы", "ru": "Talk about the balance sheets of banks and the most important indices",
         "en": "Talk about the balance sheets of banks and the most important indices",
         "sample_ru": "Активы: кредиты, ценные бумаги, резервы. Обязательства: депозиты, заимствования. Капитал. Индексы: ROE, ROA, NIM, CAR (Basel), LCR, NPL ratio."},
        {"title_ru": "European Banking Union", "ru": "Highlight the main features of the European Banking Union",
         "en": "Highlight the main features of the European Banking Union",
         "sample_ru": "3 столпа: (1) единый надзор (SSM), (2) resolution и bail-in (SRM), (3) гарантии вкладов (EDIS)."},
        {"title_ru": "Interest rate risk", "ru": "Talk about interest rate risk",
         "en": "Talk about interest rate risk",
         "sample_ru": "Риск изменения ставок → NII и стоимость активов/обязательств. Управление: repricing gap, duration, hedging."},
        {"title_ru": "DCF model", "ru": "Explain the DCF model",
         "en": "Explain the DCF model",
         "sample_ru": "Прогноз FCF, дисконтирование (WACC / cost of equity через CAPM), terminal value."},
        {"title_ru": "SoFP — вариант 1 (5 pts)", "ru": "Uniclam Group Corp. — построить Statement of Financial Position (меньшие суммы)",
         "en": "Build Statement of Financial Position for Uniclam Group Corp. (smaller figures)",
         "howto_ru": "1) Разнести статьи: NCA (GW, intangibles, PPE), CA (inventory, receivables, cash), Equity, NCL (LT debt, deferred tax), CL (ST debt, payables, current tax).\n2) Сложить каждый блок.\n3) Проверить: Total Assets = Equity + NCL + CL.",
         "sample_ru": "Активы 204 850: NCA 124 950, CA 79 900.\nПассивы: Equity 66 300, NCL 87 550, CL 51 000."},
        {"title_ru": "SoFP — вариант 2 (6 pts)", "ru": "Uniclam Group Corp. — SoFP (большие суммы)",
         "en": "Statement of Financial Position — larger figures version",
         "howto_ru": "Тот же алгоритм, что в варианте 1. Суммы больше, логика классификации та же.",
         "sample_ru": "Активы 615 550: NCA 375 850, CA 239 700.\nПассивы: Equity 198 900, NCL 262 650, CL 153 000."},
        {"title_ru": "Exercise 2 — таблица (2024)", "ru": "Divisions A/B: revenue 108k/72k; indirect per direct labour; selling per revenue; electricity & financial per raw materials.",
         "en": "Division table — 2024 exam version.",
         "howto_ru": "Indirect: 3 600 × (direct_A / 36 000) → A=1 200, B=2 400.\nSelling: 12 000 × (rev_A / 180 000) → A=7 200, B=4 800.\nElectricity: 16 800 × (12/18) → A=11 200, B=5 600.\nFinancial: 24 000 × (12/18) → A=16 000, B=8 000.\nPre-tax = Revenue − все строки; Tax 30%; Net = Pre-tax − Tax.",
         "sample_ru": "Division A: Pre-tax 48 400 → Tax 14 520 → Net Income 33 880.\nDivision B: Pre-tax 21 200 → Tax 6 360 → Net Income 14 840."},
        {"title_ru": "Exercise 2 — таблица (2025 tablet)", "ru": "Divisions: revenue 144k/120k; indirect/selling/adv/electricity/financial по правилам.",
         "en": "Division table — tablet version with advertising.",
         "howto_ru": "Indirect 8 400 по direct labour; Selling 24 000 и Advertising 25 000 по revenue; Electricity 22 400 и Financial 30 000 по raw materials (28k : 32k).",
         "sample_ru": "Division A: Pre-tax 46 020 → Tax 13 806 → Net 32 214.\nDivision B: Pre-tax 180 → Tax 54 → Net 126."},
        {"title_ru": "Exercise 3 — production May", "ru": "Omega: production May? Sales May 90k, June 80k, 30% ending inventory.",
         "en": "Budgeted production for May.",
         "howto_ru": "Ending inv. = 0,3 × June sales.\nBeginning inv. = 0,3 × May sales.\nProduction = Sales + Ending − Beginning.",
         "sample_ru": "Production May = 90 000 + 24 000 − 27 000 = 87 000 units"},
        {"title_ru": "Depreciation — straight-line", "ru": "Asset $160 000, life 6 years, residual $28 000 — build 6-year schedule (straight-line).",
         "en": "Straight-line depreciation schedule.",
         "howto_ru": "Annual dep = (160 000 − 28 000) / 6 = 22 000.\nКаждый год: Accum. += 22 000; NBV = 160 000 − Accum.\nГод 6: NBV = 28 000.",
         "sample_ru": "См. таблицу на странице 10 и в 00_How_To_Solve.html."},
        {"title_ru": "Depreciation — reducing balance 15%", "ru": "Reducing balance 15% — 6-year schedule.",
         "en": "Reducing balance depreciation schedule.",
         "howto_ru": "Dep_year = Carrying × 15%; NBV = Carrying − Dep.\nСледующий год Carrying = предыдущий NBV.",
         "sample_ru": "Год 1: dep 24 000, NBV 136 000. Год 2: dep 20 400, NBV 115 600. …"},
    ]

    part1_fs = [
        q(1, "Which financial statement summarizes payments and receipts for a period?",
          "Какой отчёт отражает поступления и выплаты за период?",
          [opt("a", "Statement of Financial Position", "Отчёт о финансовом положении"),
           opt("b", "Statement of Cash Flows", "Отчёт о движении денежных средств"),
           opt("c", "Statement of Comprehensive Income", "Отчёт о совокупном доходе"),
           opt("d", "Statement of Changes in Equity", "Отчёт об изменениях капитала")], "b",
          explain_ru="Cash Flows = денежные поступления и выплаты за период."),
        q(2, "The current ratio compares:",
          "Коэффициент текущей ликвидности сравнивает:",
          [opt("a", "Current assets to Current liabilities", "Оборотные активы и оборотные обязательства"),
           opt("b", "Total liabilities to Total assets", "Обязательства и активы"),
           opt("c", "Net income to Revenue", "Чистую прибыль и выручку"),
           opt("d", "Inventory to Cost of goods sold", "Запасы и себестоимость")], "a",
          explain_ru="Current ratio = Current assets / Current liabilities."),
        q(3, "Two fundamental qualitative characteristics (IFRS Framework):",
          "Две фундаментальные качественные характеристики:",
          [opt("a", "Comparability and Timeliness", "Сопоставимость и своевременность"),
           opt("b", "Relevance and Faithful Representation", "Уместность и достоверное представление"),
           opt("c", "Verifiability and Understandability", "Проверяемость и понятность"),
           opt("d", "Neutrality and Completeness", "Нейтральность и полнота")], "b"),
        q(4, "Under IAS 7, which is in Financing Activities?",
          "По IAS 7 к финансовой деятельности относится:",
          [opt("a", "Revenues", "Выручка"),
           opt("b", "A sale of an office", "Продажа офиса"),
           opt("c", "A purchase of an office", "Покупка офиса"),
           opt("d", "Payments of dividends", "Выплата дивидендов")], "d",
          explain_ru="Дивиденды — financing; покупка/продажа офиса — investing."),
    ]

    exam_variant_c = [
        q(7, "In the DCF model we have:",
          "В модели DCF:",
          [opt("a", "Asset side and equity side approach", "Подход со стороны активов и equity"),
           opt("b", "Only asset side approach", "Только со стороны активов"),
           opt("c", "Only equity side approach", "Только со стороны equity"),
           opt("d", "Income approach", "Доходный подход")], "a"),
        q(8, "The Deposit Guarantee Schemes Directive is related to:",
          "Директива о гарантиях вкладов относится к:",
          [opt("a", "Fourth pillar of EBU", "4-й столп EBU"),
           opt("b", "Third pillar of EBU", "3-й столп EBU"),
           opt("c", "First pillar of EBU", "1-й столп EBU"),
           opt("d", "Second pillar of EBU", "2-й столп EBU")], "b",
          explain_ru="EBU: 1 надзор, 2 resolution, 3 гарантии вкладов (DGS)."),
        q(9, "Market risk premium is useful to calculate:",
          "Премия за рыночный риск нужна для:",
          [opt("a", "Cost of equity and WACC", "Cost of equity и WACC"),
           opt("b", "Cost of equity", "Cost of equity"),
           opt("c", "Cost of debt", "Cost of debt"),
           opt("d", "Only risk free rate", "Только Rf")], "b",
          explain_ru="CAPM: Re = Rf + β × MRP."),
        q(10, "If price of underlying asset decreases, payoff of call option buyer:",
          "Если цена актива падает, payoff покупателя call:",
          [opt("a", "Higher", "Выше"),
           opt("b", "Lower", "Ниже"),
           opt("c", "Stable", "Стабилен"),
           opt("d", "None of the above", "Ни один")], "b",
          explain_ru="Call: рост цены → выше payoff; падение → ниже."),
        q(11, "Stage 1 of IFRS 9 is called:",
          "Стадия 1 IFRS 9:",
          [opt("a", "Non-performing", "Non-performing"),
           opt("b", "Performing", "Performing"),
           opt("c", "Under performing", "Under performing"),
           opt("d", "None of the above", "Ни один")], "b"),
        q(12, "In bank operations, Loans to companies are:",
          "Кредиты компаниям для банка — это:",
          [opt("a", "Interest bearing assets", "Процентные активы"),
           opt("b", "Non-interest bearing assets", "Безпроцентные активы"),
           opt("c", "Real assets", "Реальные активы"),
           opt("d", "None of the above", "Ни один")], "a"),
        q(13, "SICR (significant increase in credit risk):",
          "SICR:",
          [opt("a", "Activates Stage 2 measurement", "Активирует Stage 2"),
           opt("b", "Activates Stage 4", "Активирует Stage 4"),
           opt("c", "Activates Stage 3", "Активирует Stage 3"),
           opt("d", "Not related to credit risk", "Не связан с кредитным риском")], "a"),
        q(14, "From bank perspective, secured loans:",
          "Обеспеченные кредиты для банка:",
          [opt("a", "Are safer than unsecured loans", "Безопаснее необеспеченных"),
           opt("b", "Are riskier than unsecured", "Рискованнее"),
           opt("c", "Only instrument for SMEs", "Единственный инструмент для МСП"),
           opt("d", "None of the above", "Ни один")], "a"),
    ]

    ifrs_2025 = [
        q(1, "Which costing method is NOT allowed under IAS 2 – Inventory?",
          "Какой метод оценки запасов НЕ разрешён по IAS 2?",
          [opt("a", "Weighted Average", "Средневзвешенная"),
           opt("b", "FIFO", "FIFO"),
           opt("c", "LIFO", "LIFO"),
           opt("d", "Net Realisable Value", "Чистая возможная цена продажи")], "c"),
        q(2, "Which is NOT a purpose of the IASB's Conceptual Framework?",
          "Что НЕ является целью Conceptual Framework IASB?",
          [opt("a", "Assist IASB in preparing IFRS", "Помощь IASB в подготовке IFRS"),
           opt("b", "Assist auditors on IFRS compliance", "Помощь аудиторам в оценке соответствия IFRS"),
           opt("c", "Assist when no IFRS covers an item", "Помощь при отсутствии IFRS по вопросу"),
           opt("d", "Be authoritative when IFRS conflicts with Framework",
               "Быть обязательным при конфликте IFRS и Framework")], "d"),
        q(3, "Two fundamental qualitative characteristics (IFRS Framework):",
          "Две фундаментальные качественные характеристики (IFRS Framework):",
          [opt("a", "Comparability and Timeliness", "Сопоставимость и своевременность"),
           opt("b", "Relevance and Faithful Representation", "Уместность и достоверное представление"),
           opt("c", "Verifiability and Understandability", "Проверяемость и понятность"),
           opt("d", "Neutrality and Completeness", "Нейтральность и полнота")], "b"),
        q(4, "Under IFRS 15, revenue is generally recognised when:",
          "По IFRS 15 выручка обычно признаётся когда:",
          [opt("a", "Customer places an order", "Клиент размещает заказ"),
           opt("b", "Entity receives cash", "Получена оплата"),
           opt("c", "Control of good or service is transferred to customer",
               "Контроль над товаром/услугой передан покупателю"),
           opt("d", "Contract is signed", "Подписан договор")], "c"),
    ]

    mgmt_58 = [
        q(5, "The management performs three general broad functions:",
          "Три общие функции менеджмента:",
          [opt("a", "Planning, directing and motivating, controlling", "Планирование, руководство, контроль"),
           opt("b", "Planning, budgeting and controlling", "Планирование, бюджетирование, контроль"),
           opt("c", "Planning, accounting and controlling", "Планирование, учёт, контроль"),
           opt("d", "Directing, accounting and controlling", "Руководство, учёт, контроль")], "a"),
        q(6, "Planning involves:",
          "Планирование включает:",
          [opt("a", "Developing objectives and preparing budgets", "Цели и бюджеты"),
           opt("b", "Steps to ensure objectives are attained", "Шаги для достижения целей"),
           opt("c", "Analysis of accounts for decisions", "Анализ счетов"),
           opt("d", "Guiding and motivating people", "Руководство и мотивация людей")], "a"),
        q(7, "Three levels of managers:",
          "Три уровня менеджеров:",
          [opt("a", "Strategic, Accounting, Operational", "Стратегические, учётные, операционные"),
           opt("b", "Strategic, Tactical, Financial", "Стратегические, тактические, финансовые"),
           opt("c", "Strategic, Tactical, Operational", "Стратегические, тактические, операционные"),
           opt("d", "Financial, Accounting, Operational", "Финансовые, учётные, операционные")], "c"),
        q(8, "Direct costs are:",
          "Прямые затраты:",
          [opt("a", "Vary proportionately with activity", "Меняются пропорционально активности"),
           opt("b", "Remain same in total", "Постоянны в сумме"),
           opt("c", "Easily traced to product or department", "Легко относятся на продукт/подразделение"),
           opt("d", "Must be allocated", "Требуют распределения")], "c"),
    ]

    exam_2026_b = [
        q(1, "What is the main risk considered by Basel I?",
          "Главный риск в Basel I:",
          [opt("a", "Interest rate risk", "Процентный риск"),
           opt("b", "Market risk", "Рыночный риск"),
           opt("c", "Credit risk", "Кредитный риск"),
           opt("d", "Concentration risk", "Риск концентрации")], "c"),
        q(2, "Duration is useful for the evaluation of:",
          "Duration полезна для оценки:",
          [opt("a", "Bond", "Облигации"),
           opt("b", "Shares", "Акций"),
           opt("c", "Derivatives", "Производных инструментов"),
           opt("d", "None of the above", "Ни один из перечисленных")], "a"),
        q(3, "In the financial system, exchange of money:",
          "В финансовой системе обмен денег:",
          [opt("a", "Indirect and direct circuit", "Прямой и непрямой контур"),
           opt("b", "Direct circuit only", "Только прямой"),
           opt("c", "Indirect circuit only", "Только непрямой"),
           opt("d", "None of the above", "Ни один")], "a"),
        q(4, "Banks operate as credit intermediaries in:",
          "Банки как кредитные посредники действуют в:",
          [opt("a", "Indirect circuit but only for IPO", "Непрямом контуре, только IPO"),
           opt("b", "Direct circuit but only for IPO", "Прямом контуре, только IPO"),
           opt("c", "Direct circuit", "Прямом контуре"),
           opt("d", "Indirect circuit", "Непрямом контуре")], "d"),
        q(5, "Total loans to customers are:",
          "Совокупные кредиты клиентам отражаются:",
          [opt("a", "In liabilities of balance sheet", "В обязательствах баланса"),
           opt("b", "In liabilities of income statement", "В обязательствах отчёта о прибылях"),
           opt("c", "In assets of income statement", "В активах отчёта о прибылях"),
           opt("d", "In assets of banks' balance sheet", "В активах баланса банка")], "d"),
        q(6, "First pillar of European Banking Union:",
          "Первый столп EBU:",
          [opt("a", "Sustainability", "Устойчивость"),
           opt("b", "Deposit guarantee schemes", "Гарантии вкладов"),
           opt("c", "Resolution mechanisms", "Resolution"),
           opt("d", "Supervision", "Надзор")], "d"),
        q(7, "In the DCF model we have:",
          "В модели DCF есть:",
          [opt("a", "Asset side and equity side approach", "Подход со стороны активов и equity"),
           opt("b", "Only asset side approach", "Только со стороны активов"),
           opt("c", "Only equity side approach", "Только со стороны equity"),
           opt("d", "Income approach", "Доходный подход")], "a"),
        q(8, "Value at Risk (VaR) is useful to manage:",
          "VaR используется для управления:",
          [opt("a", "Market risk", "Рыночным риском"),
           opt("b", "Credit risk", "Кредитным риском"),
           opt("c", "Counterpart risk", "Риском контрагента"),
           opt("d", "None of the answers", "Ни один")], "a"),
        q(9, "CAPM cost of equity uses:",
          "Стоимость equity по CAPM:",
          [opt("a", "Risk free rate, beta, market risk premium", "Rf, бета, премия за риск"),
           opt("b", "Beta and WACC", "Бета и WACC"),
           opt("c", "WACC", "WACC"),
           opt("d", "Only risk free rate", "Только Rf")], "a"),
        q(10, "If price of underlying asset increases, payoff of call option buyer:",
          "Если цена базового актива растёт, payoff покупателя call:",
          [opt("a", "Higher", "Выше"),
           opt("b", "Lower", "Ниже"),
           opt("c", "Stable", "Стабилен"),
           opt("d", "None of the above", "Ни один")], "a"),
        q(11, "IFRS 9 is divided into:",
          "IFRS 9 делится на:",
          [opt("a", "5 stages", "5 стадий"),
           opt("b", "3 stages", "3 стадии"),
           opt("c", "4 stages", "4 стадии"),
           opt("d", "6 stages", "6 стадий")], "b"),
        q(12, "Credit risk is more important in:",
          "Кредитный риск важнее для:",
          [opt("a", "Commercial banks", "Коммерческих банков"),
           opt("b", "Investment banks", "Инвестиционных банков"),
           opt("c", "Diversified banks", "Диверсифицированных банков"),
           opt("d", "None of the above", "Ни один")], "a"),
        q(13, "SICR (significant increase in credit risk):",
          "SICR (значительное увеличение кредитного риска):",
          [opt("a", "Activates Stage 2 measurement", "Активирует измерение Stage 2"),
           opt("b", "Activates Stage 4", "Активирует Stage 4"),
           opt("c", "Activates Stage 3", "Активирует Stage 3"),
           opt("d", "Not related to credit risk", "Не связан с кредитным риском")], "a"),
        q(14, "From bank perspective, secured loans:",
          "С точки зрения банка, обеспеченные кредиты:",
          [opt("a", "Are safer than unsecured loans", "Безопаснее необеспеченных"),
           opt("b", "Are riskier than unsecured", "Рискованнее необеспеченных"),
           opt("c", "Only instrument for SMEs", "Единственный инструмент для МСП"),
           opt("d", "None of the above", "Ни один")], "a"),
        q(15, "Activity specific to investment banks:",
          "Деятельность, характерная для инвестбанков:",
          [opt("a", "Issuing listed bonds", "Выпуск листинговых облигаций"),
           opt("b", "Credit intermediation", "Кредитное посредничество"),
           opt("c", "General lending", "Обычное кредитование"),
           opt("d", "None of the answers", "Ни один")], "a"),
        q(16, "Total value of business regardless of capital structure:",
          "Стоимость бизнеса независимо от структуры капитала:",
          [opt("a", "Firm value", "Firm value"),
           opt("b", "Equity value", "Equity value"),
           opt("c", "Net debt", "Net debt"),
           opt("d", "None of the answers", "Ни один")], "a"),
        q(17, "The bad-bank:",
          "Bad-bank:",
          [opt("a", "Optional choice of managers", "Добровольный выбор менеджеров"),
           opt("b", "Related only to customer creditworthiness", "Только кредитоспособность клиентов"),
           opt("c", "Resolution mechanism of first pillar EBU", "Resolution 1-го столпа"),
           opt("d", "Resolution mechanism of second pillar EBU", "Resolution 2-го столпа EBU")], "d"),
        q(18, "Net interest margin % is a:",
          "Net interest margin % — это:",
          [opt("a", "Profitability ratio", "Показатель рентабельности"),
           opt("b", "Efficiency ratio", "Показатель эффективности"),
           opt("c", "Solvency ratio", "Показатель платёжеспособности"),
           opt("d", "Equity ratio", "Показатель equity")], "a"),
    ]

    guide_link = '<p class="sub"><a href="00_How_To_Solve.html">📘 Как решать задачи — пошаговые методы</a></p>'

    sofp_extra = guide_link + """
    <div class="section-title">Эталон: Uniclam Group Corp.</div>
    <div class="open-block" style="box-shadow:none;overflow-x:auto">
      <p class="q-ru"><strong>Вариант 1:</strong> Total Assets = 204 850 €</p>
      <table class="matrix">
        <tr><th colspan="2">Assets</th><th colspan="2">Equity &amp; Liabilities</th></tr>
        <tr><td>NCA</td><td>124 950</td><td>Equity</td><td>66 300</td></tr>
        <tr><td>CA</td><td>79 900</td><td>NCL</td><td>87 550</td></tr>
        <tr><td></td><td></td><td>CL</td><td>51 000</td></tr>
        <tr><th>Total</th><th>204 850</th><th>Total</th><th>204 850</th></tr>
      </table>
      <p class="q-ru" style="margin-top:1rem"><strong>Вариант 2:</strong> Total Assets = 615 550 € (NCA 375 850 + CA 239 700)</p>
    </div>
    """

    dep_extra = guide_link + """
    <div class="section-title">1. Straight-line method</div>
    <div class="open-block" style="box-shadow:none;overflow-x:auto">
      <table class="matrix">
        <tr><th>Year</th><th>Carrying ($)</th><th>Dep. year ($)</th><th>Accum. dep. ($)</th><th>NBV ($)</th></tr>
        <tr><td>1</td><td>160 000</td><td>22 000</td><td>22 000</td><td>138 000</td></tr>
        <tr><td>2</td><td>160 000</td><td>22 000</td><td>44 000</td><td>116 000</td></tr>
        <tr><td>3</td><td>160 000</td><td>22 000</td><td>66 000</td><td>94 000</td></tr>
        <tr><td>4</td><td>160 000</td><td>22 000</td><td>88 000</td><td>72 000</td></tr>
        <tr><td>5</td><td>160 000</td><td>22 000</td><td>110 000</td><td>50 000</td></tr>
        <tr><td>6</td><td>160 000</td><td>22 000</td><td>132 000</td><td>28 000</td></tr>
      </table>
    </div>
    <div class="section-title">2. Reducing-balance method (15%)</div>
    <div class="open-block" style="box-shadow:none;overflow-x:auto">
      <table class="matrix">
        <tr><th>Year</th><th>Carrying ($)</th><th>Dep. year ($)</th><th>Accum. dep. ($)</th><th>NBV ($)</th></tr>
        <tr><td>1</td><td>160 000</td><td>24 000</td><td>24 000</td><td>136 000</td></tr>
        <tr><td>2</td><td>136 000</td><td>20 400</td><td>44 400</td><td>115 600</td></tr>
        <tr><td>3</td><td>115 600</td><td>17 340</td><td>61 740</td><td>98 260</td></tr>
        <tr><td>4</td><td>98 260</td><td>14 739</td><td>76 479</td><td>83 521</td></tr>
        <tr><td>5</td><td>83 521</td><td>12 528</td><td>89 007</td><td>70 993</td></tr>
        <tr><td>6</td><td>70 993</td><td>10 649</td><td>99 656</td><td>60 344</td></tr>
      </table>
    </div>
    """

    write_page("01_Part1_Management_Accounting.html",
               "Part 1 — Management & Accounting",
               "Accounting and Banking for SMEs — Part 1 (05/06/2024)",
               part1, scoring={"correct": 1, "wrong": -1, "max": None},
               rules_html='<div class="rules">+1 за верный, −1 за неверный, за пропуск — 0.</div>')

    write_page("02_Part2_Finance_Banking.html",
               "Part 2 — Finance & Banking (MCQ)",
               "Accounting and Banking for SMEs — Part 2 MCQ",
               part2, scoring={"correct": 1, "wrong": 0, "max": None},
               rules_html='<div class="rules">1 балл за каждый верный ответ.</div>')

    write_page("03_Part2_Calculations.html",
               "Part 2 — Calculations",
               "ROE, repricing gap, duration — 3 points each",
               calc, scoring={"correct": 3, "wrong": 0, "max": 12},
               rules_html='<div class="rules">3 балла за верный ответ. Штрафа за ошибку нет.</div>')

    write_page("04_Sustainability.html",
               "Sustainability, SROI & Efficiency",
               "SROI, Corporate Sustainability, Efficiency",
               sust)

    write_page("05_Open_Questions.html",
               "Open questions & exercises",
               "Open questions — sample answers after check",
               [], open_items=open_items)

    write_page("06_Part1_IFRS_2025.html",
               "Part 1 — IFRS (25/06/2025)",
               "IAS 2, Conceptual Framework, IFRS 15",
               ifrs_2025, scoring={"correct": 1, "wrong": -1, "max": None},
               rules_html='<div class="rules">+1 / −1 · 25 June 2025 exam.</div>')

    write_page("07_Part1_Management_Q5-8.html",
               "Part 1 — Management Q5–8",
               "Break-even, governance, direct costs",
               mgmt_58, scoring={"correct": 1, "wrong": -1, "max": None})

    write_page("08_Part2_Exam_2026_Variant_B.html",
               "Part 2 — Exam 25/06/2026 (Variant B)",
               "18 MCQ — Basel I, IFRS 9, VaR, options",
               exam_2026_b, scoring={"correct": 1, "wrong": 0, "max": None},
               rules_html='<div class="rules">1 балл за верный ответ. Без штрафа за ошибку.</div>')

    write_page("09_Statement_of_Financial_Position.html",
               "Statement of Financial Position",
               "Uniclam Group Corp. — classification exercise",
               [], open_items=[open_items[8], open_items[9]],
               extra_html=sofp_extra)

    write_page("10_Depreciation.html",
               "Depreciation — straight-line & reducing balance",
               "Asset $160k, 6 years, residual $28k",
               [], open_items=[open_items[10], open_items[11]],
               extra_html=dep_extra)

    write_page("11_Part1_Financial_Statements.html",
               "Part 1 — Financial statements (Q1–4)",
               "Cash flows, current ratio, IAS 7",
               part1_fs, scoring={"correct": 1, "wrong": -1, "max": None},
               rules_html=guide_link + '<div class="rules">+1 / −1 за ответ.</div>')

    write_page("12_Part2_Exam_Variant_C.html",
               "Part 2 — Exam Variant C (Q7–14)",
               "DGS pillar, IFRS 9 Stage 1, call options",
               exam_variant_c, scoring={"correct": 1, "wrong": 0, "max": None},
               rules_html=guide_link + '<div class="rules">1 балл за верный ответ.</div>')

    print("Generated AccountingBanking tests in", ROOT)


if __name__ == "__main__":
    main()
