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
    body = body.replace("#7b4397", ACCENT).replace("#6a3784", "#138d75"    ).replace(
        "← К тестам HRM", "← Accounting & Banking tests"
    ).replace("#f3f0f7", "#eef9f6").replace("#f8f5fc", "#eefaf7")
    body = body.replace(
        "mark.wrong-mark {{ background: #fadbd8; padding: 0 4px; border-radius: 3px; }}",
        "mark.wrong-mark {{ background: #fadbd8; padding: 0 4px; border-radius: 3px; }}\n"
        "    .howto {{\n"
        "      margin-top: 0.5rem;\n"
        "      padding: 0.85rem 1rem;\n"
        "      background: #eefaf7;\n"
        "      border-radius: 8px;\n"
        "      border-left: 3px solid #16a085;\n"
        "      font-size: 0.9rem;\n"
        "      white-space: pre-wrap;\n"
        "    }}\n"
        "    .explain {{ margin-top: 0.5rem; font-size: 0.88rem; opacity: 0.95; }}\n"
        "    .answer-label {{ font-weight: 600; color: #16a085; margin-top: 0.75rem; font-size: 0.9rem; }}\n"
        "    .brief-answer {{\n"
        "      margin: 0.65rem 0 0.85rem;\n"
        "      padding: 0.7rem 1rem;\n"
        "      background: #e8f8ef;\n"
        "      border-left: 4px solid #27ae60;\n"
        "      border-radius: 0 8px 8px 0;\n"
        "      font-size: 0.95rem;\n"
        "      line-height: 1.5;\n"
        "    }}\n"
        "    .brief-label {{ font-weight: 600; color: #1e7e45; font-size: 0.82rem; margin-bottom: 0.2rem; }}\n"
        "    .brief-text {{ color: #1a1a2e; }}\n"
        "    .reveal-btn {{ margin-top: 0.6rem; font-size: 0.88rem; padding: 0.45rem 1rem; }}\n"
        "    details.solution {{ margin-top: 0.75rem; font-size: 0.9rem; }}\n"
        "    details.solution summary {{ cursor: pointer; color: #16a085; font-weight: 600; }}",
    )
    body = body.replace(
        "          </div>\n"
        "          <div class=\"feedback\" hidden></div>`;",
        "          </div>\n"
        "          ${{q.explain ? `<details class=\"solution\"><summary>📗 Solution</summary><div class=\"howto\">${{q.explain}}</div></details>` : ''}}\n"
        "          <div class=\"feedback\" hidden></div>`;",
    )
    body = body.replace(
        "fb.textContent = '✓ Correct';",
        "fb.innerHTML = '✓ Correct' + (q.explain ? '<div class=\"explain\">' + q.explain + '</div>' : '');",
    )
    body = body.replace(
        "'</mark>. Correct: <mark class=\"correct-mark\">' + q.correct.toUpperCase() + '</mark>';",
        "'</mark>. Correct: <mark class=\"correct-mark\">' + q.correct.toUpperCase() + '</mark>' +\n"
        "            (q.explain ? '<div class=\"explain\">' + q.explain + '</div>' : '');",
    )
    body = apply_pagination_patches(body)
    return body


def apply_pagination_patches(body):
    """Add 20-question pagination to the HRM test template."""
    from pathlib import Path
    lib = Path(__file__).parent / "lib" / "pagination.mjs"
    text = lib.read_text(encoding="utf-8")
    css = text.split("export const PAGINATION_CSS = `")[1].split("`;", 1)[0]
    js = text.split("export const PAGINATION_JS_STANDARD = `")[1].split("`;", 1)[0]

    if ".paginator-top" not in body:
        body = body.replace("</style>", css + "  </style>")
    if "const PAGE_SIZE = 20;" in body:
        return body

    body = body.replace(
        "const resultsBox = document.getElementById('results');\n",
        "const resultsBox = document.getElementById('results');\n" + js + "\n",
    )
    body = body.replace("QUESTIONS.forEach((q) => {{", "QUESTIONS.forEach((q, idx) => {{")
    body = body.replace(
        "          h.className = 'section-title';\n"
        "          h.textContent = q.section;\n"
        "          container.appendChild(h);",
        "          h.className = 'section-title';\n"
        "          h.dataset.page = String(pageForMcqIndex(idx));\n"
        "          h.textContent = q.section;\n"
        "          container.appendChild(h);",
    )
    body = body.replace(
        "        card.dataset.id = q.id;\n"
        "        card.innerHTML",
        "        card.dataset.id = q.id;\n"
        "        card.dataset.page = String(pageForMcqIndex(idx));\n"
        "        card.innerHTML",
    )
    body = body.replace(
        "          h.className = 'section-title';\n"
        "          h.textContent = sec;\n"
        "          container.appendChild(h);\n"
        "        }}\n"
        "        const block = document.createElement('div');\n"
        "        block.className = 'open-block';",
        "          h.className = 'section-title';\n"
        "          h.dataset.page = String(openItemPage(idx));\n"
        "          h.textContent = sec;\n"
        "          container.appendChild(h);\n"
        "        }}\n"
        "        const block = document.createElement('div');\n"
        "        block.className = 'open-block';\n"
        "        block.dataset.page = String(openItemPage(idx));",
    )
    body = body.replace(
        "      h.className = 'section-title';\n"
        "      h.textContent = 'Open questions';\n"
        "      container.appendChild(h);\n"
        "      OPEN_ITEMS.forEach((item, idx) => {{\n"
        "        const block = document.createElement('div');\n"
        "        block.className = 'open-block';",
        "      h.className = 'section-title';\n"
        "      h.dataset.page = String(openItemPage(0));\n"
        "      h.textContent = 'Open questions';\n"
        "      container.appendChild(h);\n"
        "      OPEN_ITEMS.forEach((item, idx) => {{\n"
        "        const block = document.createElement('div');\n"
        "        block.className = 'open-block';\n"
        "        block.dataset.page = String(openItemPage(idx));",
    )
    body = body.replace(
        "      h.className = 'section-title';\n"
        "      h.textContent = 'SNA — calculations';\n"
        "      container.appendChild(h);\n"
        "      SNA_ITEMS.forEach((item, idx) => {{\n"
        "        const block = document.createElement('div');\n"
        "        block.className = 'open-block';",
        "      h.className = 'section-title';\n"
        "      h.dataset.page = String(mcqPageCount() + openPageCount());\n"
        "      h.textContent = 'SNA — calculations';\n"
        "      container.appendChild(h);\n"
        "      SNA_ITEMS.forEach((item, idx) => {{\n"
        "        const block = document.createElement('div');\n"
        "        block.className = 'open-block';\n"
        "        block.dataset.page = String(mcqPageCount() + openPageCount());",
    )
    body = body.replace(
        "        const first = container.querySelector('.q.unanswered');\n"
        "        if (first) first.scrollIntoView({{ behavior: 'smooth', block: 'center' }});",
        "        const first = container.querySelector('.q.unanswered');\n"
        "        if (first) {{\n"
        "          const p = Number(first.dataset.page);\n"
        "          if (!isNaN(p)) goToPage(p);\n"
        "          first.scrollIntoView({{ behavior: 'smooth', block: 'center' }});\n"
        "        }}",
    )
    body = body.replace(
        "      resultsBox.classList.add('visible');\n"
        "      resultsBox.scrollIntoView({{ behavior: 'smooth', block: 'start' }});",
        "      if (checkingAll) showAllPages();\n"
        "      resultsBox.classList.add('visible');\n"
        "      resultsBox.scrollIntoView({{ behavior: 'smooth', block: 'start' }});",
    )
    body = body.replace(
        "    renderQuestions();\n"
        "    renderOpen();\n"
        "    renderSna();\n"
        "    {{extra_init}}",
        "    renderQuestions();\n"
        "    renderOpen();\n"
        "    renderSna();\n"
        "    setupPagination();\n"
        "    {{extra_init}}",
    )
    body = body.replace(
        "      renderQuestions();\n"
        "      renderOpen();\n"
        "      renderSna();\n"
        "      {{extra_render}}",
        "      renderQuestions();\n"
        "      renderOpen();\n"
        "      renderSna();\n"
        "      setupPagination();\n"
        "      {{extra_render}}",
    )
    return body


TEMPLATE = build_template()


# 00_How_To_Solve.html — standalone guide (edit file directly)

INDEX = """<!doctype html>
<html lang="en">
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
    <p class="sub">Accounting &amp; Banking for SMEs — exams 2024–2026. English only.</p>
    <ul class="topics">
      <li><a href="99_All_Tests.html"><span class="title">★ All tests on one page</span><span class="desc">All MCQ · one page</span></a></li>
      <li><a href="00_How_To_Solve.html"><span class="title">00 — How to Solve</span><span class="desc">Step-by-step: ROE, gap, SoFP, divisions, depreciation</span></a></li>
      <li><a href="15_Part1_Exam_2026_16-06.html"><span class="title">15 — Part 1 Exam (16/06/2026)</span><span class="desc">8 MCQ · photo exam · +1/−1</span></a></li>
      <li><a href="16_Part2_Exam_2026_16-06_Variant_A.html"><span class="title">16 — Part 2 Exam Variant A (16/06/2026)</span><span class="desc">13 MCQ + open · Free Float, PE, EBU</span></a></li>
      <li><a href="01_Part1_Management_Accounting.html"><span class="title">01 — Part 1 (05/06/2024)</span><span class="desc">8 MCQ · management, break-even, DCF</span></a></li>
      <li><a href="06_Part1_IFRS_2025.html"><span class="title">06 — Part 1 IFRS (25/06/2025)</span><span class="desc">IAS 2, Framework, IFRS 15</span></a></li>
      <li><a href="11_Part1_Financial_Statements.html"><span class="title">11 — Part 1: financial statements (Q1–4)</span><span class="desc">Cash flows, current ratio, IAS 7</span></a></li>
      <li><a href="07_Part1_Management_Q5-8.html"><span class="title">07 — Management Q5–8</span><span class="desc">Management functions, direct costs</span></a></li>
      <li><a href="02_Part2_Finance_Banking.html"><span class="title">02 — Part 2 (05/06/2024)</span><span class="desc">18 MCQ · banks, CAPM, EBU</span></a></li>
      <li><a href="08_Part2_Exam_2026_Variant_B.html"><span class="title">08 — Part 2 (25/06/2026, Variant B)</span><span class="desc">18 MCQ · Basel I, IFRS 9, VaR</span></a></li>
      <li><a href="13_Part2_Exam_2026_16-06_Variant_B.html"><span class="title">13 — Part 2 (16/06/2026, Variant B)</span><span class="desc">18 MCQ · delisting, EBU, IFRS 9, VC</span></a></li>
      <li><a href="12_Part2_Exam_Variant_C.html"><span class="title">12 — Part 2 (Variant C, Q7–14)</span><span class="desc">DGS, IFRS 9 Stage 1, call option</span></a></li>
      <li><a href="03_Part2_Calculations.html"><span class="title">03 — Part 2 Calculations</span><span class="desc">ROE, repricing gap, duration · 3 pts each</span></a></li>
      <li><a href="04_Sustainability.html"><span class="title">04 — Sustainability &amp; SROI</span><span class="desc">3 MCQ</span></a></li>
      <li><a href="14_Master_Question_Bank.html"><span class="title">14 — Master Question Bank</span><span class="desc">32 MCQ · missing topics from full course bank</span></a></li>
      <li><a href="09_Statement_of_Financial_Position.html"><span class="title">09 — Statement of Financial Position</span><span class="desc">Uniclam Group Corp. · 2 variants</span></a></li>
      <li><a href="10_Depreciation.html"><span class="title">10 — Depreciation</span><span class="desc">Exercise 3 (8 pts) · straight-line &amp; reducing balance</span></a></li>
      <li><a href="13_Divisions_and_DCF.html"><span class="title">13 — Divisions &amp; DCF</span><span class="desc">Exercise 2 (8 pts) table + Cassino SpA DCF</span></a></li>
    </ul>
  </div>
</body>
</html>
"""


def opt(letter: str, en: str, ru: str = "") -> dict:
    return {"id": letter.lower(), "en": en}


def q(num, en, ru="", options=None, correct=None, section=None, qid=None, explain_ru=None, explain=None):
    d = {
        "num": num,
        "id": qid or f"q{num}",
        "en": en,
        "options": options,
        "correct": correct,
        "section": section,
    }
    if explain:
        d["explain"] = explain
    elif explain_ru and not any("\u0400" <= c <= "\u04FF" for c in explain_ru):
        d["explain"] = explain_ru
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
    # 00_How_To_Solve.html — standalone guide (edit file directly)

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
          explain_ru="Формула: ROE = profit / bank capital.\nШаг 1: подставляем 5 и 50.\nШаг 2: ROE = 5 / 50 = 0,10 = 10% → ответ b).\nЕсли profit до налогов и tax 50%: PAT = 2,5 → ROE = 5%."),
        q(15, "Repricing gap model: Gap -10 mln €; interest rate change 2%. ΔNII = Gap × Δr",
          "Repricing gap: разрыв −10 млн €; изменение ставки 2%. ΔNII = Gap × Δr",
          [opt("a", "-200.000 euro", "−200 000 €"),
           opt("b", "200.000 euro", "200 000 €"),
           opt("c", "-20.000.000 euro", "−20 000 000 €"),
           opt("d", "-50.000 euro", "−50 000 €")], "a",
          explain_ru="Формула: ΔNII = Gap × Δr.\nШаг 1: Gap = −10 000 000 €, Δr = 2% = 0,02.\nШаг 2: ΔNII = −10 000 000 × 0,02 = −200 000 € → ответ a).\nОтрицательный gap: при росте ставок NII падает."),
        q(16, "Which bond has the longest duration?",
          "У какой облигации наибольшая duration?",
          [opt("a", "Maturity 10 years; rate 5%; coupon monthly", "10 лет; 5%; купон ежемесячно"),
           opt("b", "Maturity 5 years; rate 5%; coupon monthly", "5 лет; 5%; купон ежемесячно"),
           opt("c", "Maturity 10 years; rate 5%; coupon annual", "10 лет; 5%; купон ежегодно"),
           opt("d", "Maturity 1 year; rate 5%; coupon monthly", "1 год; 5%; купон ежемесячно")], "c",
          explain_ru="Duration ↑ при: (1) более длинном сроке, (2) более редких купонах.\nСравнение: 10 лет > 5 лет > 1 год.\nПри 10 годах annual купон > monthly (деньги раньше возвращаются при monthly → duration ниже).\nОтвет: c) 10 лет, купон ежегодно."),
        q(17, "Usually, loans to consumers are:",
          "Обычно потребительские кредиты — это:",
          [opt("a", "Interest bearing assets", "Процентные активы"),
           opt("b", "Non interest bearing assets", "Безпроцентные активы"),
           opt("c", "Expensive liabilities", "Дорогие обязательства"),
           opt("d", "Real assets", "Реальные активы")], "a",
          explain_ru="В балансе банка кредиты клиентам — активы, по которым банк получает проценты → interest bearing assets (ответ a)."),
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
         "sample_en": "Collects savings, gives loans, shares risk, matches loan size and time, runs payments, prices information.",
         "sample_ru": "Мобилизация сбережений; кредитование; распределение рисков; трансформация сроков и объёмов; платёжная система; ценообразование информации."},
        {"title_ru": "Теории существования финансовых посредников", "ru": "Explains the theories of the existence of financial intermediaries",
         "en": "Explains the theories of the existence of financial intermediaries",
         "sample_en": "Banks cut costs, spread risk, fix information problems (bad borrowers, moral hazard), change loan length, use expert knowledge.",
         "sample_ru": "Снижение транзакционных издержек; диверсификация риска; асимметрия информации (adverse selection, moral hazard); трансформация сроков; экспертиза."},
        {"title_ru": "Баланс банка и индексы", "ru": "Talk about the balance sheets of banks and the most important indices",
         "en": "Talk about the balance sheets of banks and the most important indices",
         "sample_en": "Assets: loans, securities, reserves. Liabilities: deposits, borrowings. Equity: capital. Ratios: ROE, ROA, NIM, CAR, LCR, NPL.",
         "sample_ru": "Активы: кредиты, ценные бумаги, резервы. Пассивы: депозиты, заимствования. Капитал. Индексы: ROE, ROA, NIM, CAR, LCR, NPL."},
        {"title_ru": "European Banking Union", "ru": "Highlight the main features of the European Banking Union",
         "en": "Highlight the main features of the European Banking Union",
         "sample_en": "Three pillars: (1) Single Supervisory Mechanism (SSM), (2) Single Resolution with bail-in (SRM), (3) Deposit guarantees (DGS).",
         "sample_ru": "3 столпа: (1) единый надзор SSM, (2) resolution и bail-in (SRM), (3) гарантии вкладов (DGS/EDIS)."},
        {"title_ru": "Interest rate risk", "ru": "Talk about interest rate risk",
         "en": "Talk about interest rate risk",
         "sample_en": "When rates change, net interest income and asset values change. Manage with repricing gap, duration, hedging.",
         "sample_ru": "Риск изменения ставок → влияет на NII и стоимость активов/обязательств. Управление: repricing gap, duration, hedging."},
        {"title_ru": "DCF model", "ru": "Explain the DCF model",
         "en": "Explain the DCF model",
         "sample_en": "Forecast free cash flows, discount them (WACC or cost of equity), add terminal value → company value.",
         "sample_ru": "Прогноз FCF → дисконтирование (WACC или Re через CAPM) → terminal value → firm/equity value."},
        {"title_ru": "Debt vs Equity", "ru": "Explain the difference between Debt and Equity",
         "en": "Explain the difference between Debt and Equity",
         "sample_en": "Debt: contractual claim, fixed payments (tax-deductible interest), prior claim in distress, fixed maturity, usually no control. Equity: residual claim, non-deductible dividends, lowest priority, infinite life, management control.",
         "sample_ru": "Долг: договорное требование, фиксированные выплаты (проценты вычитаются из налога), приоритет при банкротстве, срок погашения, обычно без контроля. Equity: остаточное требование, дивиденды не вычитаются, последний приоритет, бессрочно, право контроля."},
        {"title_ru": "SoFP — вариант 1 (5 pts)", "ru": "Uniclam Group Corp. — построить Statement of Financial Position (меньшие суммы)",
         "en": "Build Statement of Financial Position for Uniclam Group Corp. (smaller figures)",
         "sample_en": "Total Assets = 204,850. Equity 66,300 + Non-current liabilities 87,550 + Current liabilities 51,000.",
         "howto_ru": "Шаг 1 — классификация по IFRS:\n  NCA: Goodwill 12 750 + Other intangible 8 500 + PPE 103 700\n  CA: Inventories 37 400 + Trade receivables 23 800 + Cash 18 700\n  Equity: Share capital 25 000 + Retained earnings 41 300\n  NCL: Long-term borrowings 75 000 + Deferred tax 12 550\n  CL: Short-term borrowings 20 000 + Trade payables 28 000 + Current tax 3 000\n\nШаг 2 — суммы:\n  NCA = 124 950 | CA = 79 900 | Total Assets = 204 850\n  Equity = 66 300 | NCL = 87 550 | CL = 51 000 | Total = 204 850 ✓",
         "sample_ru": "Активы 204 850 (NCA 124 950 + CA 79 900). Пассивы: Equity 66 300 + NCL 87 550 + CL 51 000."},
        {"title_ru": "SoFP — вариант 2 (6 pts)", "ru": "Uniclam Group Corp. — SoFP (Exercise 1, 6 points)",
         "en": "Statement of Financial Position — exam version (larger figures)",
         "sample_en": "Total Assets = Total Equity & Liabilities = 614,550. See the filled table above.",
         "howto_ru": "Шаг 1 — классификация (данные с листа):\n  NCA: Goodwill 38 250 + Other intangible 25 500 + PPE 311 100\n  CA: Inventories 112 200 + Trade receivables 71 400 + Cash 56 100\n  Equity: Share capital 153 000 + Retained earnings 45 900\n  NCL: Long-term borrowings 229 500 + Deferred tax 33 150\n  CL: Short-term borrowings 53 550 + Trade payables 76 500 + Current tax 22 950\n\nШаг 2 — суммы:\n  NCA = 374 850 | CA = 239 700 | Total Assets = 614 550\n  Equity = 198 900 | NCL = 262 650 | CL = 153 000 | Total = 614 550 ✓",
         "sample_ru": "См. заполненную таблицу на странице 09 — Exercise 1 (6 pts)."},
        {"title_ru": "Exercise 2 — таблица (2024)", "ru": "Divisions A/B: revenue 108k/72k; indirect per direct labour; selling per revenue; electricity & financial per raw materials.",
         "en": "Division table — 2024 exam version.",
         "sample_en": "Division A: Net Income 33,880. Division B: Net Income 14,840.",
         "howto_ru": "Правила распределения общих затрат:\n  Indirect labour → по direct labour (A:B = 12:24)\n  Selling → по revenue (A:B = 108:72)\n  Electricity, Financial → по raw materials (A:B = 12:6)\n\nDivision A:\n  Indirect = 3 600 × 12/36 = 1 200\n  Selling = 12 000 × 108/180 = 7 200\n  Electricity = 16 800 × 12/18 = 11 200\n  Financial = 24 000 × 12/18 = 16 000\n  Pre-tax = 108 000 − (12 000+1 200+7 200+11 200+16 000+...) = 48 400\n  Tax 30% = 14 520 → Net = 33 880\n\nDivision B: аналогично → Pre-tax 21 200 → Tax 6 360 → Net 14 840",
         "sample_ru": "A: Net Income 33 880. B: Net Income 14 840."},
        {"title_ru": "Exercise 2 — таблица (2025 tablet)", "ru": "Divisions: revenue 144k/120k; indirect/selling/adv/electricity/financial по правилам.",
         "en": "Division table — tablet version with advertising.",
         "sample_en": "Division A: Net Income 32,214. Division B: Net Income 126.",
         "howto_ru": "Шаг 1 — распределение общих затрат:\n  Indirect 8 400 × (direct labour дивизиона / 48)\n  Selling 24 000 × (revenue дивизиона / 264)\n  Advertising 25 000 × (revenue / 264)\n  Electricity 22 400 × (raw materials / 60)\n  Financial 30 000 × (raw materials / 60)\n\nDivision A:\n  Indirect = 8 400 × 16/48 = 2 800\n  Selling = 24 000 × 144/264 = 13 091\n  Advertising = 25 000 × 144/264 = 13 636\n  Electricity = 22 400 × 28/60 = 10 453\n  Financial = 30 000 × 28/60 = 14 000\n  Total costs = 16 000+2 800+28 000+13 091+10 453+14 000+13 636 = 97 980\n  Pre-tax = 144 000 − 97 980 = 46 020\n  Tax = 46 020 × 30% = 13 806\n  Net = 46 020 − 13 806 = 32 214\n\nDivision B:\n  Indirect = 5 600 | Selling = 10 909 | Advertising = 11 364\n  Electricity = 11 947 | Financial = 16 000\n  Total costs = 119 820\n  Pre-tax = 120 000 − 119 820 = 180\n  Tax = 180 × 30% = 54\n  Net = 180 − 54 = 126",
         "sample_ru": "A: Net 32 214. B: Net 126."},
        {"title_ru": "Exercise 3 (8 pts) — DCF Cassino SpA", "ru": "Cassino SpA — DCF, WACC 5%, g 1%",
         "en": "Evaluate Cassino SpA using DCF. WACC 5%, g 1%. Cash flows 2024–2028. Complete discount coefficients, DCFs, and W.",
         "sample_en": "W ≈ 143,858 (sum of discounted cash flows). See page 13 for full table.",
         "howto_ru": "Коэффициент = 1 / (1,05)^n\nDCF = Cash flow × коэффициент\n\n2024: 0,9524 → 23 810\n2025: 0,9070 → 27 211\n2026: 0,8638 → 30 234\n2027: 0,8227 → 31 263\n2028: 0,7835 → 31 341\n\nW = 143 858",
         "sample_ru": "Полная таблица — стр. 13."},
        {"title_ru": "Exercise 3 — production May", "ru": "Omega: production May? Sales May 90k, June 80k, 30% ending inventory.",
         "en": "Budgeted production for May.",
         "sample_en": "Production in May = 87,000 units.",
         "howto_ru": "Формула: Production = Sales + Ending inventory − Beginning inventory\nEnding inv. = 30% × продажи следующего месяца\nBeginning inv. = 30% × продажи текущего месяца\n\nMay:\n  Ending = 0,3 × 80 000 = 24 000\n  Beginning = 0,3 × 90 000 = 27 000\n  Production = 90 000 + 24 000 − 27 000 = 87 000 units",
         "sample_ru": "Production May = 87 000 units"},
        {"title_ru": "Exercise 3 (8 pts) — Depreciation", "ru": "Exercise 3 — амортизация: $160 000, 6 лет, остаточная $28 000",
         "en": "Exercise 3 (8 points). Cost $160,000, life 6 years, residual $28,000. (a) Annual charge straight-line and reducing balance 15%. (b) 6-year schedule for each method.",
         "sample_en": "(a) Straight-line: $22,000 per year. Reducing balance: 15% of carrying value each year. (b) Year 6 NBV = $28,000 (SL) or $60,344 (RB) — see page 10.",
         "howto_ru": "(a) Straight-line: (160 000 − 28 000) / 6 = 22 000 $/год.\nReducing balance: dep = carrying × 15% (carrying = прошлый NBV).\n\n(b) Straight-line — каждый год dep 22 000, cost 160 000, accum растёт, NBV = 160 000 − accum.\nГод 6 NBV = 28 000 (= residual).\n\nReducing balance:\nГод 1: 160 000 × 15% = 24 000 → NBV 136 000\nГод 2: 136 000 × 15% = 20 400 → NBV 115 600\n… Год 6 NBV = 60 344",
         "sample_ru": "Полные таблицы — на стр. 10."},
        {"title_ru": "Depreciation — straight-line", "ru": "Asset $160 000, life 6 years, residual $28 000 — build 6-year schedule (straight-line).",
         "en": "Straight-line depreciation schedule.",
         "sample_en": "Annual depreciation = 22,000. After 6 years NBV = 28,000 (residual value).",
         "howto_ru": "Annual dep = (Cost − Residual) / Life = (160 000 − 28 000) / 6 = 22 000 $/год\n\nКаждый год:\n  Dep. year = 22 000\n  Accum. dep. += 22 000\n  NBV = 160 000 − Accum. dep.\n\nГод 1: dep 22 000, accum 22 000, NBV 138 000\nГод 2: NBV 116 000 | Год 3: 94 000 | Год 4: 72 000 | Год 5: 50 000 | Год 6: 28 000",
         "sample_ru": "Год 6: NBV = 28 000 $ (остаточная стоимость). Полная таблица — на стр. 10."},
        {"title_ru": "Depreciation — reducing balance 15%", "ru": "Reducing balance 15% — 6-year schedule.",
         "en": "Reducing balance depreciation schedule.",
         "sample_en": "Each year: dep = 15% of book value. Year 6 NBV = 60,344.",
         "howto_ru": "Dep_year = Carrying value × 15%\nNBV = Carrying − Dep\nСледующий год: Carrying = предыдущий NBV\n\nГод 1: 160 000 × 15% = 24 000 → NBV 136 000\nГод 2: 136 000 × 15% = 20 400 → NBV 115 600\nГод 3: 17 340 → NBV 98 260\nГод 4: 14 739 → NBV 83 521\nГод 5: 12 528 → NBV 70 993\nГод 6: 10 649 → NBV 60 344",
         "sample_ru": "Год 6: NBV 60 344 $ (не равно residual 28 000 без корректировки)."},
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

    exam_2026_june16_b = [
        q(1, "Delisting can be caused by",
          "Делистинг может быть вызван:",
          [opt("a", "The autonomous decision of the listed company",
               "Самостоятельным решением листинговой компании"),
           opt("b", "Exclusion from the price list by the authorities due to lack of requirements",
               "Исключением регулятором из-за несоответствия требованиям"),
           opt("c", "The acquisition of the company through a public offering",
               "Поглощением компании через публичное предложение"),
           opt("d", "All the answers", "Все перечисленное")], "d",
          explain_ru="Делистинг возможен по решению компании, из-за нарушения требований биржи/регулятора или после сделки (например OPA)."),
        q(2, "The duration is an instrument useful for the evaluation of",
          "Duration полезна для оценки:",
          [opt("a", "Bond", "Облигации"),
           opt("b", "Shares", "Акций"),
           opt("c", "Derivatives", "Производных инструментов"),
           opt("d", "None of the above", "Ни один из перечисленных")], "a"),
        q(3, "Basel I focus on",
          "Basel I фокусируется на:",
          [opt("a", "Interest risk", "Процентном риске"),
           opt("b", "Credit risk", "Кредитном риске"),
           opt("c", "Currency risk", "Валютном риске"),
           opt("d", "None of the above", "Ни один")], "b"),
        q(4, "In the transfer of financial resources between subjects in surplus and in deficit, when the bank takes risks, we are talking about",
          "При передаче ресурсов от субъектов с профицитом к дефициту, когда банк берёт на себя риск, речь о:",
          [opt("a", "Indirect circuit", "Непрямом контуре"),
           opt("b", "Direct circuit", "Прямом контуре"),
           opt("c", "M&A", "M&A"),
           opt("d", "IPO", "IPO")], "a",
          explain_ru="Банк — финансовый посредник → непрямой контур (indirect circuit)."),
        q(5, "The total of the deposits of the customers are",
          "Совокупность депозитов клиентов отражается:",
          [opt("a", "In the liabilities of the banks' balance sheet",
               "В обязательствах баланса банка"),
           opt("b", "In the liabilities of the banks' income statement",
               "В обязательствах отчёта о прибылях"),
           opt("c", "In the asset of the banks' income statement",
               "В активах отчёта о прибылях"),
           opt("d", "In the asset of the banks' balance sheet",
               "В активах баланса банка")], "a"),
        q(6, "In the capital markets service of the investment banks, banks can operate",
          "В услугах капитальных рынков инвестбанки могут работать:",
          [opt("a", "Only in primary markets", "Только на первичном рынке"),
           opt("b", "Only in secondary markets", "Только на вторичном рынке"),
           opt("c", "Both in primary and secondary markets",
               "На первичном и вторичном рынках"),
           opt("d", "Only for IPO", "Только для IPO")], "c"),
        q(7, "Which of the following is a service offered by investment banks?",
          "Какая услуга предоставляется инвестиционными банками?",
          [opt("a", "Asset management", "Управление активами"),
           opt("b", "Corporate finance", "Корпоративные финансы"),
           opt("c", "Risk management", "Управление рисками"),
           opt("d", "All the previous answers", "Все перечисленные")], "d"),
        q(8, "The Deposit Guarantee Schemes Directive is related",
          "Директива о гарантиях вкладов относится:",
          [opt("a", "To the fourth pillar of European Banking Union",
               "К 4-му столпу EBU"),
           opt("b", "To the third pillar of European Banking Union",
               "К 3-му столпу EBU"),
           opt("c", "To the first pillar of European Banking Union",
               "К 1-му столпу EBU"),
           opt("d", "To the second pillar of European Banking Union",
               "Ко 2-му столпу EBU")], "b",
          explain_ru="3-й столп EBU — Deposit Guarantee Schemes (DGS)."),
        q(9, "Usually, venture capitalists buy",
          "Обычно венчурные капиталисты покупают:",
          [opt("a", "Shares of stable companies", "Акции стабильных компаний"),
           opt("b", "Bonds of stable companies", "Облигации стабильных компаний"),
           opt("c", "Shares of young companies with good potential",
               "Акции молодых компаний с хорошим потенциалом"),
           opt("d", "Bonds of young companies with good potential",
               "Облигации молодых компаний с потенциалом")], "c"),
        q(10, "Bail-in is a measure related to",
          "Bail-in относится:",
          [opt("a", "The second pillar of EBU", "Ко 2-му столпу EBU"),
           opt("b", "The first pillar of EBU", "К 1-му столпу EBU"),
           opt("c", "CAPM", "К CAPM"),
           opt("d", "APT", "К APT")], "a",
          explain_ru="Bail-in — инструмент resolution (2-й столп EBU)."),
        q(11, "Stage 1 of IFRS 9 is called",
          "Стадия 1 IFRS 9 называется:",
          [opt("a", "Non-performing", "Non-performing"),
           opt("b", "Performing", "Performing"),
           opt("c", "Under performing", "Under-performing"),
           opt("d", "None of the above", "Ни один")], "b"),
        q(12, "Usually credit risk is more important in",
          "Обычно кредитный риск важнее для:",
          [opt("a", "Commercial banks", "Коммерческих банков"),
           opt("b", "Investment banks", "Инвестиционных банков"),
           opt("c", "Diversified banks", "Диверсифицированных банков"),
           opt("d", "None of the above", "Ни один")], "a"),
        q(13, "The IFRS 9 divide into:",
          "IFRS 9 делится на:",
          [opt("a", "5 stages", "5 стадий"),
           opt("b", "3 stages", "3 стадии"),
           opt("c", "4 stages", "4 стадии"),
           opt("d", "6 stages", "6 стадий")], "b"),
        q(14, "In the perspective of the bank, secured loans",
          "С точки зрения банка, обеспеченные кредиты:",
          [opt("a", "Are safer than unsecured loans", "Безопаснее необеспеченных"),
           opt("b", "Are riskier than unsecured loans", "Рискованнее необеспеченных"),
           opt("c", "Are the only credit instrument available for SMEs",
               "Единственный кредитный инструмент для МСП"),
           opt("d", "None of the above", "Ни один")], "a"),
        q(15, "Credit risk is related to",
          "Кредитный риск связан с:",
          [opt("a", "Probability of default", "Вероятностью дефолта (PD)"),
           opt("b", "Exposure at default", "Exposure at default (EAD)"),
           opt("c", "Loss given default", "Loss given default (LGD)"),
           opt("d", "All the previous answers", "Всем перечисленным")], "d",
          explain_ru="Кредитный риск = PD × EAD × LGD."),
        q(16, "In the perspective of a company, only considering cash flow out, which financial instrument is best?",
          "С точки зрения компании, если учитывать только денежный отток, лучший инструмент:",
          [opt("a", "Shares", "Акции (equity)"),
           opt("b", "Bonds", "Облигации"),
           opt("c", "Debt", "Долг"),
           opt("d", "Derivatives", "Производные инструменты")], "a",
          explain_ru="Equity не требует фиксированных выплат, в отличие от долга/облигаций."),
        q(17, "In the operations of a bank 'Non-financial debts' are",
          "В операциях банка «non-financial debts» — это:",
          [opt("a", "Interest bearing asset", "Процентный актив"),
           opt("b", "Non-expensive liabilities", "Беспроцентные обязательства"),
           opt("c", "Real asset", "Реальный актив"),
           opt("d", "None of the above", "Ни один")], "b",
          explain_ru="В билете: non-expensive liabilities ≈ non-interest-bearing liabilities."),
        q(18, "Which of the following financing instruments for a business provides a secure and predictable cash outflow?",
          "Какой инструмент финансирования даёт предсказуемый денежный отток:",
          [opt("a", "Increase of Equity", "Увеличение equity"),
           opt("b", "Bank debt, like mortgage", "Банковский долг, например ипотека"),
           opt("c", "Increase of share capital", "Увеличение уставного капитала"),
           opt("d", "None of the above", "Ни один")], "b",
          explain_ru="Банковский долг — фиксированные/предсказуемые платежи по графику."),
    ]

    master_bank = [
        q(1, "A Budget is:",
          "Бюджет — это:",
          [opt("a", "A detailed quantitative plan for acquiring and using financial and other resources over a specified forthcoming time period",
               "Детальный количественный план приобретения и использования ресурсов на будущий период"),
           opt("b", "A system that includes subsystems for planning, measuring and recording results and evaluating performance",
               "Система планирования, учёта результатов и оценки эффективности"),
           opt("c", "The force that moves different people in different ways for different reasons",
               "Сила, движущая людей по-разному"),
           opt("d", "Concerned with the initiation of organized action and stimulating people to work",
               "Инициация организованных действий и мотивация людей")], "a",
          section="Management accounting"),
        q(2, "The Indirect costs are:",
          "Косвенные затраты (indirect costs) — это:",
          [opt("a", "Costs that vary directly and proportionately with changes in the activity level",
               "Затраты, меняющиеся пропорционально уровню активности"),
           opt("b", "Costs that remain the same in total regardless of changes in the activity level",
               "Затраты, постоянные в сумме"),
           opt("c", "Costs that can be easily and conveniently traced to a product or department",
               "Затраты, легко относимые на продукт или подразделение"),
           opt("d", "Costs that must be allocated in order to be assigned to a product or department",
               "Затраты, которые нужно распределить, чтобы отнести на продукт или подразделение")], "d",
          section="Management accounting"),
        q(3, "Diversification is:",
          "Диверсификация — это:",
          [opt("a", "Reduce individual firm-specific credit risk", "Снижение индивидуального firm-specific кредитного риска"),
           opt("b", "Reduce systematic credit risk", "Снижение систематического кредитного риска"),
           opt("c", "Increase individual firm-specific credit risk", "Увеличение firm-specific риска"),
           opt("d", "None of the answers", "Ни один из ответов")], "a",
          section="Banking & risk"),
        q(4, "The Banking Recovery and Resolution Directive (BRRD) is related to:",
          "Директива BRRD относится:",
          [opt("a", "The fourth pillar of European Banking Union", "К 4-му столпу EBU"),
           opt("b", "The third pillar of European Banking Union", "К 3-му столпу EBU"),
           opt("c", "The first pillar of European Banking Union", "К 1-му столпу EBU"),
           opt("d", "The second pillar of European Banking Union", "Ко 2-му столпу EBU")], "d",
          explain_ru="BRRD — часть resolution framework (2-й столп EBU: SRM, bail-in).",
          section="EBU & regulation"),
        q(5, "In order to evaluate financial instruments we can use:",
          "Для оценки финансовых инструментов можно использовать:",
          [opt("a", "Fair value criteria", "Критерий справедливой стоимости (fair value)"),
           opt("b", "Amortized cost criteria", "Критерий амортизированной стоимости"),
           opt("c", "Both fair value and amortized cost criteria", "Оба критерия"),
           opt("d", "EAD criteria", "Критерий EAD")], "c",
          section="IFRS & instruments"),
        q(6, "The definition of syndicated loan:",
          "Синдицированный кредит — это:",
          [opt("a", "It is provided by only one financial institution", "Предоставляется одной финансовой организацией"),
           opt("b", "It is provided by a group of financial institutions as opposed to multiple lenders",
               "Группой институтов вместо множества кредиторов"),
           opt("c", "It is provided by a group of financial institutions as opposed to a single lender",
               "Группой финансовых институтов, а не одним кредитором"),
           opt("d", "None of the above", "Ни один из перечисленных")], "c",
          section="Banking & instruments"),
        q(7, "In which valuation model is terminal cash flow used?",
          "В какой модели оценки используется terminal cash flow?",
          [opt("a", "Multiples method", "Метод мультипликаторов"),
           opt("b", "DCF", "DCF"),
           opt("c", "EVA", "EVA"),
           opt("d", "None of the answers", "Ни один из ответов")], "b",
          section="Valuation"),
        q(8, "Which standard is used to account for non-performing loans (NPLs)?",
          "Какой стандарт применяется для учёта NPL?",
          [opt("a", "IFRS 9", "IFRS 9"),
           opt("b", "IFRS 19", "IFRS 19"),
           opt("c", "IFRS 1", "IFRS 1"),
           opt("d", "None of the above", "Ни один")], "a",
          section="IFRS & instruments"),
        q(9, "The Financial Institutions' specialness is done by:",
          "Особенность финансовых институтов обеспечивается:",
          [opt("a", "Monitoring cost", "Затратами на мониторинг"),
           opt("b", "Liquidity", "Ликвидностью"),
           opt("c", "Both of them", "И тем, и другим"),
           opt("d", "None of the above", "Ни один")], "c",
          section="Financial intermediaries"),
        q(10, "Commercial banks, credit unions, saving institutions are:",
          "Коммерческие банки, кредитные союзы, сберегательные институты — это:",
          [opt("a", "Depository institutions", "Депозитные институты (depository institutions)"),
           opt("b", "Specific type of investment banks", "Особый тип инвестиционных банков"),
           opt("c", "Mutual funds", "Паевые фонды"),
           opt("d", "Securities firms", "Брокерские компании")], "a",
          section="Bank types"),
        q(11, "It is the document that allows you to read and analyze the bank's financial statements by tracking magnitudes and their evolution to operational and management aspects:",
          "Документ для анализа отчётности банка в операционном и управленческом контексте:",
          [opt("a", "Income statement", "Отчёт о прибылях и убытках"),
           opt("b", "Statement of Comprehensive Income", "Отчёт о совокупном доходе"),
           opt("c", "Supplementary note", "Дополнительная записка"),
           opt("d", "Management report", "Управленческий отчёт (management report)")], "d",
          section="Bank reporting"),
        q(12, "The risk that a sudden surge in liability withdrawals may require an FI to liquidate assets in a short period at less than fair market prices is:",
          "Риск внезапного оттока обязательств, вынуждающий продавать активы ниже рыночной цены:",
          [opt("a", "Credit risk", "Кредитный риск"),
           opt("b", "Liquidity risk", "Риск ликвидности"),
           opt("c", "Market risk", "Рыночный риск"),
           opt("d", "Operational risk", "Операционный риск")], "b",
          section="Banking & risk"),
        q(13, "A common stock:",
          "Обыкновенная акция (common stock):",
          [opt("a", "Has more voting rights", "Даёт больше прав голоса"),
           opt("b", "Has more remuneration rights", "Даёт больше прав на вознаграждение"),
           opt("c", "Has more rights in case of default", "Имеет больше прав при дефолте"),
           opt("d", "None of the above", "Ни один")], "a",
          section="Equity & debt"),
        q(14, "In a syndicated loan:",
          "В синдицированном кредите:",
          [opt("a", "There are several banks that cover the loan", "Несколько банков покрывают кредит"),
           opt("b", "There is only one bank that covers the loan", "Только один банк"),
           opt("c", "There is always a guarantee", "Всегда есть гарантия"),
           opt("d", "We can use only fixed rates", "Только фиксированные ставки")], "a",
          section="Banking & instruments"),
        q(15, "In the measurement of credit risk, volatility of earnings:",
          "При измерении кредитного риска волатильность прибыли:",
          [opt("a", "Is a borrower specific factor of qualitative models",
               "Фактор заёмщика в качественных моделях"),
           opt("b", "Is a borrower specific factor of quantitative models",
               "Фактор заёмщика в количественных моделях"),
           opt("c", "Is a market specific factor of qualitative models",
               "Рыночный фактор в качественных моделях"),
           opt("d", "Is a market specific factor of quantitative models",
               "Рыночный фактор в количественных моделях")], "d",
          section="Credit risk"),
        q(16, "The net interest margin is more important in:",
          "Чистая процентная маржа (NIM) важнее для:",
          [opt("a", "Pension funds", "Пенсионных фондов"),
           opt("b", "Mutual funds", "Паевых фондов"),
           opt("c", "Commercial banks", "Коммерческих банков"),
           opt("d", "Investment banks", "Инвестиционных банков")], "c",
          section="Bank ratios"),
        q(17, "The intermediation margin is more important in:",
          "Маржа посредничества (intermediation margin) важнее для:",
          [opt("a", "None of the answers", "Ни один из ответов"),
           opt("b", "Commercial banks focused on mortgage", "Ипотечных коммерческих банков"),
           opt("c", "Commercial banks", "Коммерческих банков"),
           opt("d", "Investment banks", "Инвестиционных банков")], "c",
          section="Bank ratios"),
        q(18, "The estimated amount of money a bank loses when a borrower defaults on a loan is:",
          "Оценочная сумма потерь банка при дефолте заёмщика:",
          [opt("a", "The probability of default (PD)", "Вероятность дефолта (PD)"),
           opt("b", "The expected loss (EL)", "Ожидаемый убыток (EL)"),
           opt("c", "The loss given default (LGD)", "Loss given default (LGD)"),
           opt("d", "The exposure at default (EAD)", "Exposure at default (EAD)")], "b",
          explain_ru="EL = PD × EAD × LGD — ожидаемая потеря при дефолте.",
          section="Credit risk"),
        q(19, "A preferred stock:",
          "Привилегированная акция (preferred stock):",
          [opt("a", "Has more voting rights", "Больше прав голоса"),
           opt("b", "Has more remuneration rights", "Больше прав на вознаграждение (дивиденды)"),
           opt("c", "Has not remuneration rights", "Не даёт вознаграждения"),
           opt("d", "None of the above", "Ни один")], "b",
          section="Equity & debt"),
        q(20, "Equity investments in banks' reports are in:",
          "Инвестиции в акции (equity investments) в отчётности банка отражаются в:",
          [opt("a", "Assets", "Активах"),
           opt("b", "Liabilities", "Обязательствах"),
           opt("c", "Shareholders' equity", "Собственном капитале"),
           opt("d", "None of the above", "Ни один")], "a",
          section="Bank balance sheet"),
        q(21, "Altman's discriminant function is:",
          "Дискриминантная функция Альтмана — это:",
          [opt("a", "A qualitative measurement of credit risk", "Качественная мера кредитного риска"),
           opt("b", "A quantitative measurement of market risk", "Количественная мера рыночного риска"),
           opt("c", "A quantitative measurement of credit risk", "Количественная мера кредитного риска"),
           opt("d", "A qualitative measurement of market risk", "Качественная мера рыночного риска")], "c",
          section="Credit risk"),
        q(22, "Using size, what is the largest group of depository institutions?",
          "По размеру, самая крупная группа депозитных институтов:",
          [opt("a", "Commercial banks", "Коммерческие банки"),
           opt("b", "Investment banks", "Инвестиционные банки"),
           opt("c", "Credit unions", "Кредитные союзы"),
           opt("d", "Mutual funds", "Паевые фонды")], "a",
          section="Bank types"),
        q(23, '"An economic agent appointed to act on behalf of smaller agents in collecting information and/or investing funds on their behalf" is the definition of:',
          "«Экономический агент, действующий от имени мелких агентов при сборе информации и/или инвестировании средств» — определение:",
          [opt("a", "Bank's Role as Delegated Monitor", "Роли банка как делегированного монитора"),
           opt("b", "Bank's Role as information producer", "Роли банка как производителя информации"),
           opt("c", "Bank's Role for diversification", "Роли банка в диверсификации"),
           opt("d", "None of the above", "Ни один")], "a",
          section="Financial intermediaries"),
        q(24, "Monetary policy actions include:",
          "Действия денежно-кредитной политики включают:",
          [opt("a", "All the answers", "Все перечисленные"),
           opt("b", "Open market operations", "Операции на открытом рынке"),
           opt("c", "The choice of the central discount rate", "Выбор учётной ставки ЦБ"),
           opt("d", "Setting reserve requirements", "Установление норм резервирования")], "a",
          section="Monetary policy"),
        q(25, "They focus on consumer loans funded with member deposits:",
          "Ориентированы на потребительские кредиты, финансируемые вкладами членов:",
          [opt("a", "Credit unions", "Кредитные союзы (credit unions)"),
           opt("b", "Commercial banks", "Коммерческие банки"),
           opt("c", "Saving institutions", "Сберегательные институты"),
           opt("d", "Investment banks", "Инвестиционные банки")], "a",
          section="Bank types"),
        q(26, "A loan backed by specific assets of the borrower; if the borrower defaults, the lender has a first lien on those assets:",
          "Кредит, обеспеченный конкретными активами заёмщика; при дефолте кредитор имеет первичное право на эти активы:",
          [opt("a", "Secured loan", "Обеспеченный кредит (secured loan)"),
           opt("b", "Unsecured loan", "Необеспеченный кредит"),
           opt("c", "Syndicated loan", "Синдицированный кредит"),
           opt("d", "None of the above", "Ни один")], "a",
          section="Credit risk"),
        q(27, "It arises because of the possibility that promised cash flows on financial claims held by banks will not be paid in full:",
          "Возникает из-за возможности, что обещанные денежные потоки по требованиям банка не будут выплачены полностью:",
          [opt("a", "Credit risk", "Кредитный риск"),
           opt("b", "Market risk", "Рыночный риск"),
           opt("c", "Sovereign risk", "Суверенный риск"),
           opt("d", "Liquidity risk", "Риск ликвидности")], "a",
          section="Banking & risk"),
        q(28, "The risk incurred by a bank as a result of activities related to contingent assets and liabilities held off the balance sheet:",
          "Риск от внебалансовых условных активов и обязательств:",
          [opt("a", "Off-balance sheet risk", "Внебалансовый риск"),
           opt("b", "Market risk", "Рыночный риск"),
           opt("c", "Sovereign risk", "Суверенный риск"),
           opt("d", "Liquidity risk", "Риск ликвидности")], "a",
          section="Banking & risk"),
        q(29, "An increase in the frequency of the coupons:",
          "Увеличение частоты выплаты купонов:",
          [opt("a", "Reduces the duration", "Снижает duration"),
           opt("b", "Increases the duration", "Увеличивает duration"),
           opt("c", "Has no effect on the duration", "Не влияет на duration"),
           opt("d", "Increases the value of the equity", "Увеличивает стоимость equity")], "a",
          explain_ru="Чем чаще купоны, тем раньше возвращаются деньги → duration ниже.",
          section="Bonds & duration"),
        q(30, "Loans to banks are in:",
          "Кредиты банкам отражаются в:",
          [opt("a", "Assets section", "Разделе активов"),
           opt("b", "Liabilities section", "Разделе обязательств"),
           opt("c", "Expenses in the income statement", "Расходах в отчёте о прибылях"),
           opt("d", "Assets section in the income statement", "Активах в отчёте о прибылях")], "a",
          section="Bank balance sheet"),
        q(31, "The internal financing of a firm depends directly on:",
          "Внутреннее финансирование фирмы напрямую зависит от:",
          [opt("a", "Total financial debt", "Общего финансового долга"),
           opt("b", "Market price", "Рыночной цены"),
           opt("c", "Firms' profitability", "Рентабельности фирмы"),
           opt("d", "None of the above", "Ни один")], "c",
          section="Corporate finance"),
        q(32, "Bank leverage is the ratio of the value of a bank's assets to the value of its:",
          "Банковский leverage — отношение стоимости активов банка к стоимости его:",
          [opt("a", "Equity (capital)", "Собственного капитала (equity)"),
           opt("b", "Profitability", "Рентабельности"),
           opt("c", "ROE", "ROE"),
           opt("d", "ROA", "ROA")], "a",
          section="Bank ratios"),
    ]

    guide_link = '<p class="sub"><a href="00_How_To_Solve.html">📘 How to solve tasks — step-by-step guide</a></p>'

    sofp_extra = guide_link + """
    <style>
    table.sofp { border-collapse: collapse; width: 100%; font-size: 0.85rem; margin: 1rem 0; }
    table.sofp th, table.sofp td { border: 1px solid #ccc; padding: 5px 8px; }
    table.sofp th { background: #16a085; color: #fff; text-align: center; }
    table.sofp td.num { text-align: right; white-space: nowrap; }
    table.sofp td.lbl { text-align: left; }
    table.sofp tr.subtotal td { font-weight: 600; background: #f4f8f7; }
    table.sofp tr.total td { font-weight: 700; background: #eefaf7; }
    </style>
    <div class="section-title">Solution: Uniclam Group Corp.</div>
    <p>Classify each line item under IFRS sections, sum subtotals, and check: <strong>Total Assets = Total Equity + Liabilities</strong>.</p>

    <p style="margin-top:1.5rem"><strong>Exercise 1 — variant 1 (5 pts)</strong> · Total Assets = 204,850 €</p>
    <div class="open-block" style="box-shadow:none;overflow-x:auto">
      <table class="sofp">
        <tr><th colspan="2">ASSETS</th><th colspan="2">EQUITY &amp; LIABILITIES</th></tr>
        <tr><td class="lbl" colspan="2"><strong>Non-current assets</strong></td><td class="lbl" colspan="2"><strong>Equity</strong></td></tr>
        <tr><td class="lbl">Goodwill</td><td class="num">12 750</td><td class="lbl">Share capital</td><td class="num">25 000</td></tr>
        <tr><td class="lbl">Other intangible</td><td class="num">8 500</td><td class="lbl">Retained earnings</td><td class="num">41 300</td></tr>
        <tr><td class="lbl">Property, plant &amp; equipment</td><td class="num">103 700</td><td class="lbl"></td><td class="num"></td></tr>
        <tr class="subtotal"><td class="lbl">Total non-current assets</td><td class="num">124 950</td><td class="lbl"><strong>Total equity</strong></td><td class="num">66 300</td></tr>
        <tr><td class="lbl" colspan="2"><strong>Current assets</strong></td><td class="lbl" colspan="2"><strong>Non-current liabilities</strong></td></tr>
        <tr><td class="lbl">Inventories</td><td class="num">37 400</td><td class="lbl">Long-term borrowings</td><td class="num">75 000</td></tr>
        <tr><td class="lbl">Trade receivables</td><td class="num">23 800</td><td class="lbl">Deferred tax</td><td class="num">12 550</td></tr>
        <tr><td class="lbl">Cash</td><td class="num">18 700</td><td class="lbl"></td><td class="num"></td></tr>
        <tr class="subtotal"><td class="lbl">Total current assets</td><td class="num">79 900</td><td class="lbl"><strong>Total non-current liabilities</strong></td><td class="num">87 550</td></tr>
        <tr><td class="lbl"></td><td class="num"></td><td class="lbl" colspan="2"><strong>Current liabilities</strong></td></tr>
        <tr><td class="lbl"></td><td class="num"></td><td class="lbl">Short-term borrowings</td><td class="num">20 000</td></tr>
        <tr><td class="lbl"></td><td class="num"></td><td class="lbl">Trade and other payables</td><td class="num">28 000</td></tr>
        <tr><td class="lbl"></td><td class="num"></td><td class="lbl">Current tax payable</td><td class="num">3 000</td></tr>
        <tr class="subtotal"><td class="lbl"></td><td class="num"></td><td class="lbl"><strong>Total current liabilities</strong></td><td class="num">51 000</td></tr>
        <tr class="total"><td class="lbl"><strong>TOTAL ASSETS</strong></td><td class="num"><strong>204 850</strong></td><td class="lbl"><strong>TOTAL EQUITY &amp; LIABILITIES</strong></td><td class="num"><strong>204 850</strong></td></tr>
      </table>
    </div>

    <p class="q-ru" style="margin-top:1.5rem"><strong>Exercise 1 — вариант 2 (6 pts)</strong> · Total Assets = 614 550 €</p>
    <div class="open-block" style="box-shadow:none;overflow-x:auto">
      <table class="sofp">
        <tr><th colspan="2">ASSETS</th><th colspan="2">EQUITY &amp; LIABILITIES</th></tr>
        <tr><td class="lbl" colspan="2"><strong>Non-current assets</strong></td><td class="lbl" colspan="2"><strong>Equity</strong></td></tr>
        <tr><td class="lbl">Goodwill</td><td class="num">38 250</td><td class="lbl">Share capital</td><td class="num">153 000</td></tr>
        <tr><td class="lbl">Other intangible</td><td class="num">25 500</td><td class="lbl">Retained earnings</td><td class="num">45 900</td></tr>
        <tr><td class="lbl">Property, plant &amp; equipment</td><td class="num">311 100</td><td class="lbl"></td><td class="num"></td></tr>
        <tr class="subtotal"><td class="lbl">Total non-current assets</td><td class="num">374 850</td><td class="lbl"><strong>Total equity</strong></td><td class="num">198 900</td></tr>
        <tr><td class="lbl" colspan="2"><strong>Current assets</strong></td><td class="lbl" colspan="2"><strong>Non-current liabilities</strong></td></tr>
        <tr><td class="lbl">Inventories</td><td class="num">112 200</td><td class="lbl">Long-term borrowings</td><td class="num">229 500</td></tr>
        <tr><td class="lbl">Trade receivables</td><td class="num">71 400</td><td class="lbl">Deferred tax</td><td class="num">33 150</td></tr>
        <tr><td class="lbl">Cash</td><td class="num">56 100</td><td class="lbl"></td><td class="num"></td></tr>
        <tr class="subtotal"><td class="lbl">Total current assets</td><td class="num">239 700</td><td class="lbl"><strong>Total non-current liabilities</strong></td><td class="num">262 650</td></tr>
        <tr><td class="lbl"></td><td class="num"></td><td class="lbl" colspan="2"><strong>Current liabilities</strong></td></tr>
        <tr><td class="lbl"></td><td class="num"></td><td class="lbl">Short-term borrowings</td><td class="num">53 550</td></tr>
        <tr><td class="lbl"></td><td class="num"></td><td class="lbl">Trade and other payables</td><td class="num">76 500</td></tr>
        <tr><td class="lbl"></td><td class="num"></td><td class="lbl">Current tax payable</td><td class="num">22 950</td></tr>
        <tr class="subtotal"><td class="lbl"></td><td class="num"></td><td class="lbl"><strong>Total current liabilities</strong></td><td class="num">153 000</td></tr>
        <tr class="total"><td class="lbl"><strong>TOTAL ASSETS</strong></td><td class="num"><strong>614 550</strong></td><td class="lbl"><strong>TOTAL EQUITY &amp; LIABILITIES</strong></td><td class="num"><strong>614 550</strong></td></tr>
      </table>
    </div>
    """

    dep_extra = guide_link + """
    <style>
    .exam-row {
      display: grid;
      grid-template-columns: minmax(240px, 1fr) minmax(300px, 1.2fr);
      gap: 1.25rem;
      align-items: start;
      margin: 1rem 0 1.5rem;
    }
    .exam-photo {
      margin: 0;
      background: #fafafa;
      border: 1px solid #e0e6ed;
      border-radius: 10px;
      padding: 0.5rem;
    }
    .exam-photo img { width: 100%; height: auto; border-radius: 6px; display: block; }
    .exam-photo figcaption { font-size: 0.82rem; color: #666; text-align: center; margin-top: 0.5rem; }
    @media (max-width: 820px) { .exam-row { grid-template-columns: 1fr; } }
    </style>
    <div class="section-title">Exercise 3 (8 pts) — your exam sheet + solution</div>
    <div class="exam-row">
      <figure class="exam-photo">
        <img src="images/exam-depreciation-exercise3.png" alt="Exam Exercise 3 — Depreciation" />
        <figcaption>Photo from exam · cost $160k, 6 years, residual $28k</figcaption>
      </figure>
      <div>
        <p class="q-en"><strong>(a)</strong> Calculate the annual depreciation charge for each method.</p>
        <div class="brief-answer" style="margin-top:0.5rem">
          <div class="brief-label">Answer (a)</div>
          <div class="brief-text"><strong>Straight-line:</strong> (160,000 − 28,000) ÷ 6 = <strong>$22,000</strong> every year.<br>
          <strong>Reducing balance (15%):</strong> dep = 15% × carrying value (carrying goes down each year).</div>
        </div>
        <p class="q-en" style="margin-top:1rem"><strong>(b)</strong> Build a 6-year schedule: cost, accumulated depreciation, NBV.</p>
        <div class="brief-answer">
          <div class="brief-label">Answer (b)</div>
          <div class="brief-text">Use the tables below. Year 6 NBV = <strong>$28,000</strong> (straight-line, equals residual) or <strong>$60,344</strong> (reducing balance).</div>
        </div>
      </div>
    </div>
    <div class="section-title">(b) Straight-line — 6-year schedule</div>
    <div class="open-block" style="box-shadow:none;overflow-x:auto">
      <table class="matrix">
        <tr><th>Year</th><th>Cost ($)</th><th>Dep. year ($)</th><th>Accum. dep. ($)</th><th>NBV ($)</th></tr>
        <tr><td>1</td><td>160 000</td><td>22 000</td><td>22 000</td><td>138 000</td></tr>
        <tr><td>2</td><td>160 000</td><td>22 000</td><td>44 000</td><td>116 000</td></tr>
        <tr><td>3</td><td>160 000</td><td>22 000</td><td>66 000</td><td>94 000</td></tr>
        <tr><td>4</td><td>160 000</td><td>22 000</td><td>88 000</td><td>72 000</td></tr>
        <tr><td>5</td><td>160 000</td><td>22 000</td><td>110 000</td><td>50 000</td></tr>
        <tr><td>6</td><td>160 000</td><td>22 000</td><td>132 000</td><td>28 000</td></tr>
      </table>
    </div>
    <div class="section-title">(b) Reducing balance 15% — 6-year schedule</div>
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
               rules_html=guide_link + '<div class="rules">3 балла за верный ответ. Раскройте «📗 Решение» под каждым вопросом — там пошаговый расчёт.</div>')

    write_page("04_Sustainability.html",
               "Sustainability, SROI & Efficiency",
               "SROI, Corporate Sustainability, Efficiency",
               sust)

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

    write_page("13_Part2_Exam_2026_16-06_Variant_B.html",
               "Part 2 — Exam 16/06/2026 (Variant B)",
               "18 MCQ — delisting, EBU, IFRS 9, venture capital, bank balance sheet",
               exam_2026_june16_b, scoring={"correct": 1, "wrong": 0, "max": None},
               rules_html=guide_link + '<div class="rules">1 балл за верный ответ. Без штрафа за ошибку. · There are no penalties for wrong answers.</div>')

    write_page("09_Statement_of_Financial_Position.html",
               "Statement of Financial Position",
               "Uniclam Group Corp. — classification exercise",
               [], open_items=[],
               extra_html=sofp_extra)

    write_page("10_Depreciation.html",
               "Depreciation — Exercise 3 (8 pts)",
               "Exam photo + straight-line & reducing balance 15%",
               [], open_items=[],
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

    write_page("14_Master_Question_Bank.html",
               "Master Question Bank — missing topics",
               "32 MCQ from full course bank · Budget, BRRD, syndicated loans, bank ratios, credit risk",
               master_bank, scoring={"correct": 1, "wrong": 0, "max": None},
               rules_html=guide_link + '<div class="rules">1 балл за верный ответ. Темы, которых не было в отдельных экзаменах 01–13.</div>')

    print("Generated AccountingBanking tests in", ROOT)
    import subprocess
    build_script = ROOT / "build_all_tests.mjs"
    if build_script.exists():
        subprocess.run(["node", str(build_script)], cwd=ROOT, check=False)


if __name__ == "__main__":
    main()
