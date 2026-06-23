#!/usr/bin/env python3
"""Generate Place Marketing HTML exam pages (Univ. Cassino)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).parent
ACCENT = "#2980b9"
ACCENT_DARK = "#1f6dad"


def build_template() -> str:
    t = Path(ROOT.parent / "HRM" / "gen_tests.py").read_text(encoding="utf-8")
    start = t.index('TEMPLATE = """') + len('TEMPLATE = """')
    end = t.index('"""', start)
    body = t[start:end]

    old_render_open = """    function renderOpen() {{
      if (!OPEN_ITEMS.length) return;
      const h = document.createElement('div');
      h.className = 'section-title';
      h.textContent = 'Открытые вопросы';
      container.appendChild(h);
      OPEN_ITEMS.forEach((item, idx) => {{
        const block = document.createElement('div');
        block.className = 'open-block';
        block.innerHTML = `
          <div class="q-num">${{item.title_ru}}</div>
          <div class="q-ru">${{item.ru}}</div>
          <div class="q-en">${{item.en}}</div>
          <textarea name="open_${{idx}}" placeholder="Ваш ответ..."></textarea>
          <div class="sample" hidden></div>`;
        block.querySelector('.sample').textContent = item.sample_ru;
        container.appendChild(block);
      }});
    }}"""
    new_render_open = """    function renderOpen() {{
      if (!OPEN_ITEMS.length) return;
      let currentPart = '';
      OPEN_ITEMS.forEach((item, idx) => {{
        const part = item.part || 'II';
        if (part !== currentPart) {{
          currentPart = part;
          const h = document.createElement('div');
          h.className = 'section-title';
          h.textContent = part === 'III'
            ? 'Part III — Brief Answers (5 marks) / Развёрнутые ответы'
            : 'Part II — Brief Answers (3 marks) / Краткие ответы';
          container.appendChild(h);
        }}
        const ansEn = item.sample_en || '';
        const ansRu = item.sample_ru || '';
        const block = document.createElement('div');
        block.className = 'open-block';
        block.innerHTML = `
          <div class="q-num">${{item.label ? part + ' ' + item.label : item.title_ru}}</div>
          <div class="q-en">${{item.en}}</div>
          <div class="q-ru">${{item.ru}}</div>
          <div class="answer-box">
            <div class="answer-label">Sample answer / Эталонный ответ</div>
            ${{ansEn ? `<div class="answer-en">${{ansEn}}</div>` : ''}}
            ${{ansRu ? `<div class="answer-ru">${{ansRu}}</div>` : ''}}
          </div>
          <details class="practice-note">
            <summary>Write your own answer / Свой ответ (optional)</summary>
            <textarea name="open_${{idx}}" rows="4" placeholder="Compare with the sample above / Сравните с эталоном"></textarea>
          </details>`;
        container.appendChild(block);
      }});
    }}"""
    if old_render_open not in body:
        raise RuntimeError("HRM template renderOpen block not found")
    body = body.replace(old_render_open, new_render_open)
    body = body.replace(
        "container.querySelectorAll('.open-block .sample').forEach(el => {{ el.hidden = false; }});\n\n",
        "",
    )

    body = body.replace("#7b4397", ACCENT).replace("#6a3784", ACCENT_DARK).replace(
        "← К тестам HRM", "← Back to tests / К списку тестов"
    ).replace("f3f0f7", "eef4fa").replace("f8f5fc", "eef5fc")
    body = body.replace('<html lang="ru">', '<html lang="en">')
    body = body.replace(
        ".q-ru {{ font-size: 1.02rem; margin-bottom: 0.35rem; }}\n"
        "    .q-en {{ font-size: 0.88rem; color: #666; margin-bottom: 0.75rem; font-style: italic; }}",
        ".q-en {{ font-size: 1.02rem; margin-bottom: 0.35rem; }}\n"
        "    .q-ru {{ font-size: 0.88rem; color: #666; margin-bottom: 0.75rem; font-style: italic; }}",
    )
    body = body.replace(
        ".opt-ru {{ font-size: 0.95rem; }}\n    .opt-en {{ font-size: 0.82rem; color: #777; }}",
        ".opt-en {{ font-size: 0.95rem; }}\n    .opt-ru {{ font-size: 0.82rem; color: #777; }}",
    )
    body = body.replace(
        "          <div class=\"q-ru\">${{q.ru}}</div>\n          <div class=\"q-en\">${{q.en}}</div>",
        "          <div class=\"q-en\">${{q.en}}</div>\n          <div class=\"q-ru\">${{q.ru}}</div>",
    )
    body = body.replace(
        "                  <div class=\"opt-ru\"><strong>${{o.id.toUpperCase()}})</strong> ${{o.ru}}</div>\n"
        "                  <div class=\"opt-en\">${{o.en}}</div>",
        "                  <div class=\"opt-en\"><strong>${{o.id.toUpperCase()}})</strong> ${{o.en}}</div>\n"
        "                  <div class=\"opt-ru\">${{o.ru}}</div>",
    )
    body = body.replace(
        "mark.wrong-mark {{ background: #fadbd8; padding: 0 4px; border-radius: 3px; }}",
        "mark.wrong-mark {{ background: #fadbd8; padding: 0 4px; border-radius: 3px; }}\n"
        "    .explain {{ margin-top: 0.5rem; font-size: 0.88rem; opacity: 0.95; }}\n"
        "    .answer-box {{\n"
        "      margin-top: 0.85rem;\n"
        "      padding: 0.9rem 1rem;\n"
        "      background: #eef5fc;\n"
        "      border-radius: 8px;\n"
        "      border-left: 4px solid #2980b9;\n"
        "    }}\n"
        "    .answer-label {{\n"
        "      font-size: 0.78rem;\n"
        "      font-weight: 700;\n"
        "      text-transform: uppercase;\n"
        "      letter-spacing: 0.04em;\n"
        "      color: #2980b9;\n"
        "      margin-bottom: 0.5rem;\n"
        "    }}\n"
        "    .answer-en {{ font-size: 0.95rem; white-space: pre-wrap; line-height: 1.55; }}\n"
        "    .answer-ru {{\n"
        "      font-size: 0.88rem;\n"
        "      color: #555;\n"
        "      margin-top: 0.55rem;\n"
        "      white-space: pre-wrap;\n"
        "      line-height: 1.55;\n"
        "      font-style: italic;\n"
        "    }}\n"
        "    .practice-note {{\n"
        "      margin-top: 0.75rem;\n"
        "      font-size: 0.88rem;\n"
        "      color: #666;\n"
        "    }}\n"
        "    .practice-note summary {{\n"
        "      cursor: pointer;\n"
        "      color: #2980b9;\n"
        "      font-weight: 600;\n"
        "      margin-bottom: 0.35rem;\n"
        "    }}\n"
        "    .practice-note textarea {{\n"
        "      width: 100%;\n"
        "      min-height: 88px;\n"
        "      margin-top: 0.35rem;\n"
        "      padding: 0.65rem;\n"
        "      border: 1px dashed #c5d4e3;\n"
        "      border-radius: 8px;\n"
        "      font-family: inherit;\n"
        "      font-size: 0.92rem;\n"
        "      resize: vertical;\n"
        "      background: #fafbfc;\n"
        "    }}",
    )
    body = body.replace(
        "fb.textContent = '✓ Верно';",
        "fb.innerHTML = '✓ Correct / Верно' + (q.explain_ru ? '<div class=\"explain\">' + q.explain_ru + '</div>' : '');",
    )
    body = body.replace(
        "Проверить ответы",
        "Check answers / Проверить",
    )
    body = body.replace(
        "Сбросить",
        "Reset / Сбросить",
    )
    return body


TEMPLATE = build_template()


def opt(letter: str, en: str, ru: str) -> dict:
    return {"id": letter, "en": en, "ru": ru}


def q(num, en, ru, options, correct, section=None, explain_ru=None):
    return {
        "num": num,
        "id": f"q{num}",
        "en": en,
        "ru": ru,
        "options": options,
        "correct": correct,
        "section": section,
        **({"explain_ru": explain_ru} if explain_ru else {}),
    }


def oq(part: str, label: str, en: str, ru: str, sample_en: str, sample_ru: str) -> dict:
    part_key = "II" if "Part II" in part else "III"
    return {
        "part": part_key,
        "label": label,
        "title_ru": f"{part} — {label}",
        "en": en,
        "ru": ru,
        "sample_en": sample_en,
        "sample_ru": sample_ru,
    }


def write_page(filename, title, subtitle, questions, open_items=None, rules_html="", scoring=None):
    sc = scoring or {"correct": 1, "wrong": 0, "max": len(questions) if questions else None}
    html = TEMPLATE.format(
        title_ru=title,
        title_en=subtitle,
        rules_html=rules_html,
        extra_html="",
        extra_init="",
        extra_render="",
        scoring_json=json.dumps(sc),
        questions_json=json.dumps(questions, ensure_ascii=False),
        open_json=json.dumps(open_items or [], ensure_ascii=False),
        sna_json="[]",
    )
    (ROOT / filename).write_text(html, encoding="utf-8")
    if filename == "index.html":
        p = ROOT / filename
        text = p.read_text(encoding="utf-8")
        text = text.replace(
            '<a href="index.html">← Back to tests / К списку тестов</a>',
            '<a href="../index.html">← Edu materials / К материалам</a>',
        )
        p.write_text(text, encoding="utf-8")


def tag_mcq_for_combined(items: list, variant_id: str) -> list:
    out = []
    for i, item in enumerate(items, 1):
        tagged = {**item}
        tagged["id"] = f"v{variant_id}_mcq{i}"
        qnum = item.get("num")
        if isinstance(qnum, int):
            tagged["num"] = f"Variant {variant_id} · Q{qnum}"
        else:
            tagged["num"] = f"Variant {variant_id} · MCQ {i}"
        tagged["section"] = f"Variant {variant_id} — Part I (MCQ)"
        out.append(tagged)
    return out


def tag_open_for_combined(items: list, variant_id: str) -> list:
    out = []
    for item in items:
        tagged = {**item}
        tagged["label"] = f"Variant {variant_id} · {item['part']} {item['label']}"
        out.append(tagged)
    return out


def build_combined(exams: list) -> tuple[list, list]:
    mcq_all: list = []
    open_all: list = []
    for variant_id, mcq, open_items in exams:
        mcq_all.extend(tag_mcq_for_combined(mcq, variant_id))
        open_all.extend(tag_open_for_combined(open_items, variant_id))
    return mcq_all, open_all


PART_I = "Part I — Multiple Choice (1.5 marks)"
PART_II = "Part II — Brief Answers (3 marks)"
PART_III = "Part III — Brief Answers (5 marks)"

RULES = COMBINED_RULES = (
    '<div class="rules">'
    "<strong>All exam variants</strong> on one page: MCQ (Part I) + brief open questions (Part II & III). "
    "MCQ grouped by variant — click <em>Check answers</em> to score Part I. "
    "Open questions: sample answers visible below each item. "
    "· Все варианты на одной странице. MCQ проверяются кнопкой."
    "</div>"
)

MCQ_STRATEGY = q(
    1,
    "__________ is about matching market opportunities to the organization's resources (what it can do) and objectives (what management wants to do).",
    "__________ — это согласование рыночных возможностей с ресурсами организации и её целями.",
    [
        opt("a", "Marketing communications", "Маркетинговые коммуникации"),
        opt("b", "Market research", "Исследование рынка"),
        opt("c", "Marketing strategy", "Маркетинговая стратегия"),
        opt("d", "Market segmentation", "Сегментация рынка"),
    ],
    "c",
    PART_I,
)

MCQ_STANDARDIZATION_C = q(
    2,
    "The standardization of the offering is:",
    "Стандартизация предложения (offering) — это:",
    [
        opt("a", 'the solution to "sell" your Place in the world', 'решение «продать» место в мире'),
        opt("b", 'the solution to "sell" your Place in your Country', 'решение «продать» место в стране'),
        opt("c", "could be a solution in some situations", "может быть решением в некоторых ситуациях"),
    ],
    "c",
    PART_I,
    explain_ru="Стандартизация не универсальное решение — зависит от целевого рынка и позиционирования.",
)

MCQ_ANALYSIS_C = q(
    2,
    "Place marketing analysis elements:",
    "Элементы анализа place marketing:",
    [
        opt("a", "Place identification, Swot analysis, Positioning, Strategy",
           "Идентификация места, SWOT, позиционирование, стратегия"),
        opt("b", "Place identification, Place reputation analysis, Marketing Mix, control",
           "Идентификация, репутация, marketing mix, контроль"),
        opt("c", "Place identification, Place reputation analysis, Assets analysis, Driver analysis, Swot analysis, Positioning, segmentation and targeting of the Place",
           "Идентификация, репутация, активы, драйверы, SWOT, позиционирование, сегментация и таргетинг"),
    ],
    "c",
    PART_I,
    explain_ru="Полный цикл анализа включает активы, драйверы, репутацию, SWOT и STP.",
)


def main():
    exam_01_mcq = [
        q(1, "Positioning is:",
          "Позиционирование (positioning) — это:",
          [
              opt("a", "a process in which a Company seeks to fix the product price",
                  "процесс фиксации цены продукта"),
              opt("b", "a process in which a Company seeks to establish perceptions of its product offering that are consistent with customers' needs and preferences",
                  "процесс формирования восприятия предложения в соответствии с потребностями клиентов"),
              opt("c", "a process in which a Company seeks to establish perceptions explaining the price and the quality of the product",
                  "процесс объяснения цены и качества продукта"),
          ], "b", PART_I),
        q(2, "Place Marketing is:",
          "Place Marketing — это:",
          [
              opt("a", "Company marketing applied on the territories",
                  "корпоративный маркетинг, применённый к территориям"),
              opt("b", "The strategy of the Place",
                  "стратегия места"),
              opt("c", "The activity, set of institutions and processes for creating, communicating, delivering and exchanging offerings of the place that have value for place stakeholders (target markets) and its community at large",
                  "деятельность и процессы создания, коммуникации и обмена ценностными предложениями места для стейкхолдеров и сообщества"),
          ], "c", PART_I),
    ]
    exam_01_open = [
        oq(PART_II, "a", "4Ps and limits", "4P и их ограничения в place marketing",
           "The 4Ps are Product, Price, Place, and Promotion. They work for standard goods, but a place is a complex service system. Product: not one item — it is infrastructure, services, culture, people, and reputation together (hard to define and package). Price: not only money — also time, stress, and cost of living. Place: access and transport — how users reach and use the area. Promotion: not only ads — also PR, events, and place branding; communication alone fails without real improvements. So the 4Ps are too narrow: place marketing needs partners, stakeholders, and value co-creation (servicescape, servuction).",
           "4P: Product — не один товар, а система (инфраструктура, культура, люди). Price — не только деньги. Place — доступ. Promotion — не только реклама, но PR и events. Нужны партнёры и co-creation."),
        oq(PART_II, "b", "Describe the role of public relations in place marketing",
           "Роль PR в place marketing",
           "PR builds trust in the place brand. It shares true stories (media, social media, local groups), not only paid ads. It spreads knowledge and culture. In co-creation, PR helps connect universities, citizens, and investors so people join place development.",
           "PR строит доверие к бренду места, распространяет знания и культуру, связывает университеты, граждан и инвесторов."),
        oq(PART_II, "c", 'What is the meaning of "value" in marketing',
           'Значение «value» в маркетинге',
           "Value = benefits minus costs. Benefits = jobs, safety, culture, feelings. Costs = money, time, risk. In place marketing (S-D logic) value is co-created: stakeholders integrate resources together, not only 'sold' by government.",
           "Value = выгоды − затраты. В PM ценность co-created: стейкхолдеры создают её вместе (S-D logic)."),
        oq(PART_II, "d", "What the Town Centre Management scheme is?",
           "Что такое Town Centre Management (TCM)?",
           "Town Centre Management (TCM) means local shops, the city government, and citizens work together to improve the city centre — make it cleaner, safer, and bring more visitors. They organise events, marketing, and help shops sell online. Money often comes when businesses in that area agree to pay a small extra fee together for cleaning, security, and promotion. This scheme is called a Business Improvement District (BID).",
           "TCM — магазины, власть и жители улучшают центр. Деньги часто через Business Improvement District (BID): бизнес платит доп. взнос за уборку, охрану и рекламу."),
        oq(PART_III, "1", "Why the Place emerges by the territory?",
           "Почему Place возникает из territory?",
           "Easy memory: territory = house (land, borders on a map). Place = home (feelings, meaning, identity). Place appears when people perceive the territory and give it meaning. Observer + emergent characteristics interact (Bruni).",
           "Territory = house (карта). Place = home (смысл, чувства). Место рождается через восприятие людей."),
        oq(PART_III, "2", 'Why it is difficult to define the "price" in Place Marketing?',
           "Почему сложно определить «цену» в place marketing?",
           "No single price tag. You pay money (rent, taxes, living costs) AND non-money costs: time (traffic), stress, opportunity cost. Good things (beauty, community, quality of life) are hard to measure in euros.",
           "Нет одной цены: деньги + время + стресс. Качество жизни сложно измерить в деньгах."),
        oq(PART_III, "3", "Describe the 'Living Labs' and their role",
           "Living Labs и их role",
           "Living Labs = real-life test zones. Citizens, government, and business try new ideas together (not only on paper). Role in PM: faster participation, citizen-sourcing, test policies and services before full launch.",
           "Living Labs — тест идей в реальной жизни. Участие граждан, быстрая проверка политик и услуг."),
    ]

    exam_02_mcq = [MCQ_STRATEGY, MCQ_STANDARDIZATION_C]
    exam_02_open = [
        oq(PART_II, "a", "Please explain the passage from traditional marketing system toward marketing value co-creation driven.",
           "Переход от традиционного маркетинга к value co-creation driven",
           "Old = demand driven: government 'sells' the place as a ready product. New = value co-creation driven: actors (citizens, firms, government) create wellbeing and quality of life together. Shared purpose, not one-way promotion (Bruni 2021).",
           "Было: продаём готовое место (demand driven). Стало: создаём wellbeing вместе (value co-creation driven)."),
        oq(PART_II, "b", "Market segmentation.", "Сегментация рынка",
           "Split users into groups with similar needs (motives, behaviour). In PM: tourists, investors, students, residents, firms. Each group gets a different message and value proposition.",
           "Делим на группы (туристы, инвесторы, жители…). Каждой — своё сообщение и value proposition."),
        oq(PART_II, "c", "Why in place marketing the customer is called user?",
           "Почему в PM клиента называют user?",
           "User lives in or uses the place daily (transport, services, spaces). Not a one-time buyer. Often co-produces the experience (events, culture, feedback). 'User' fits service logic better than 'customer'.",
           "User живёт/пользуется местом каждый день и часто co-produces опыт. Не разовый покупатель."),
        oq(PART_II, "d", "Why distribution is a critical factor to explain in Place Marketing?",
           "Почему distribution критичен в PM?",
           "Distribution = access: roads, trains, airports, ports, digital connection. Place boundaries are not only admin borders — they follow networks and access (Carrubbo). No access → no tourists, no investors.",
           "Distribution = доступ (транспорт, сеть). Границы места связаны с доступностью, не только с картой."),
        oq(PART_III, "1", "Which is the meaning of 'Place as value proposition'?",
           "Что значит «Place as value proposition»?",
           "Place = package of benefits for target users: jobs, culture, safety, identity, quality of life. Built when stakeholders integrate resources (service logic). Promise: 'Come here → you get these benefits.'",
           "Place = набор выгод (работа, культура, безопасность). Стейкхолдеры создают его вместе."),
        oq(PART_III, "2", "Which are critical factors for a successful Place Marketing strategy?",
           "Критические факторы успешной стратегии PM",
           "Need: clear vision + shared final purpose (wellbeing); strong partnerships; real substance projects; honest brand (identity = image); KPIs; citizen/business participation; money and coordination.",
           "Нужны: видение, wellbeing как цель, партнёры, реальные проекты, честный бренд, KPI, участие, деньги."),
        oq(PART_III, "3", 'Why it is difficult to define the "product" in Place Marketing?',
           "Почему сложно определить «продукт» в PM?",
           "Place product = mix of material + immaterial things: infrastructure, shops, events, people, reputation, networks. Many actors co-create it. It changes over time — not one simple product like a phone.",
           "Продукт места = материальное + нематериальное, co-created многими акторами, меняется."),
    ]

    exam_03_mcq = [
        q(1, "A market orientation recognizes that:",
          "Рыночная ориентация признаёт, что:",
          [
              opt("a", "price is the most important variable for customers",
                  "цена — главная переменная для клиентов"),
              opt("b", "market intelligence relating to current and future customer needs is important",
                  "важна рыночная информация о текущих и будущих потребностях"),
              opt("c", "selling and marketing are essentially the same thing",
                  "продажи и маркетинг — одно и то же"),
              opt("d", "sales depend predominantly on an aggressive sales force",
                  "продажи зависят от агрессивного отдела продаж"),
          ], "b", PART_I),
        MCQ_ANALYSIS_C,
    ]
    exam_03_open = [
        oq(PART_II, "a", "Why place marketing is other than communication?",
           "Почему place marketing — не только коммуникация?",
           "PM is not only ads (symbolic). It needs strategy + substance: real projects (transport, services, events), partnerships, budget. If substance is weak, communication fails — image ≠ reality.",
           "PM ≠ только реклама. Нужны strategy + substance (реальные проекты). Слабая реальность → слабый бренд."),
        oq(PART_II, "b", "Marketing segmentation", "Сегментация в маркетинге",
           "Divide users into groups (needs, motives). Then choose target groups. Example groups: holiday tourists, business visitors, new residents, investors. Different segment → different offer.",
           "Делим на группы → выбираем target. Туристы, бизнес, жители, инвесторы — разные предложения."),
        oq(PART_II, "c", "Positioning", "Позиционирование",
           "Positioning = how your place looks vs competitors in people's minds. Pick ONE clear idea ('historic city', 'tech hub'). All actions and messages must support this idea.",
           "Positioning — одна ясная идея места vs конкуренты. Всё должно её поддерживать."),
        oq(PART_II, "d", "Natural Shopping Center: strengths and weaknesses",
           "Natural Shopping Center: сильные и слабые стороны",
           "Strengths (+): authentic local shops, unique atmosphere, town centre identity. Weaknesses (−): hard to coordinate actors, less budget than malls, parking/access problems, need TCM tools + digital to compete.",
           "Плюсы: аутентичность, уникальность. Минусы: координация, мало денег, парковка, нужен digital/TCM."),
        oq(PART_III, "1", "Describe how the Universities could adopt a 'onlife' approach and the relations with the place.",
           "Как университеты могут использовать onlife и связь с местом",
           "Onlife = online + onplace together (Bruni 2021). University teaches online AND on campus, uses local culture, case studies, and city projects. This makes the university different from pure online schools and strengthens the place brand.",
           "Onlife = online + onplace. Университет + местная культура и проекты → сильнее бренд территории."),
        oq(PART_III, "2", "Which are relationships between Strategy + Substance + Symbolic actions?",
           "Связь Strategy, Substance и Symbolic actions",
           "Strategy = plan and goals. Substance = real projects (infrastructure, services). Symbolic = logo, events, ads, image. All 3 must match. Example: 'green city' (symbol) + dirty air (substance) = no trust.",
           "Strategy (план) + Substance (реальность) + Symbolic (образ). Три должны совпадать."),
        oq(PART_III, "3", "Nature and role of Key Performance Indicators in Town Centre Management.",
           "KPI в Town Centre Management",
           "KPIs = numbers to check progress: footfall, empty shops, sales, safety, satisfaction, digital use. TCM partners use KPIs to improve the plan, show results, and get funding (short + long run).",
           "KPI: поток людей, пустые магазины, продажи, безопасность. Партнёры TCM видят прогресс и получают финансирование."),
    ]

    exam_04_mcq = [
        q(1, "Which of the following is not an element of the marketing mix?",
          "Что НЕ является элементом marketing mix?",
          [
              opt("a", "Distribution", "Distribution (место/дистрибуция)"),
              opt("b", "Product", "Product"),
              opt("c", "Target market", "Target market (целевой рынок)"),
              opt("d", "Pricing", "Pricing"),
          ], "c", PART_I,
          explain_ru="Target market — результат STP, не элемент 4P."),
        MCQ_ANALYSIS_C,
    ]
    exam_04_open = [
        oq(PART_II, "a", "What's about National Brand Index?",
           "National Brand Index",
           "NBI (Anholt) ranks how people see countries: culture, tourism, people, investment, exports. Governments use it to benchmark national place branding and find weak points to improve.",
           "NBI (Anholt) — рейтинг восприятия страны. Помогает улучшать national place branding."),
        oq(PART_II, "b", "Marketing researches", "Маркетинговые исследования",
           "Collect data on place users: surveys, interviews, visitor stats, social listening. Goal: understand needs, test image vs identity gap, check if campaigns work.",
           "Сбор данных (опросы, статистика). Понимаем потребности и проверяем кампании."),
        oq(PART_II, "c", "Targeting, positioning and segmentation",
           "Targeting, positioning and segmentation",
           "Step 1 — Segmentation: split into groups. Step 2 — Targeting: pick priority groups. Step 3 — Positioning: one clear image for them. Example: target students → position as 'university city'.",
           "Segmentation → Targeting → Positioning. Пример: студенты → 'university city'."),
        oq(PART_II, "d", "The Place Brand is:",
           "Place Brand — это:",
           "Place brand = associations people have (Kavaratzis). Not only a logo. Includes identity (what place wants to be) and image (what people see). Best when participatory — actors co-create the brand.",
           "Place brand = ассоциации людей. Identity vs image. Лучше когда participatory/co-created."),
        oq(PART_III, "1", "What's about Place Marketing value co-creation driven?",
           "Place Marketing value co-creation driven",
           "Actors (citizens, firms, government) work together for shared purpose: wellbeing + quality of life. Value is built WITH users (resource integration), not sold TO them like a fixed product.",
           "Акторы создают wellbeing вместе. Value co-created WITH users, не продана им."),
        oq(PART_III, "2", "Describing the place marketing plan",
           "Place marketing plan",
           "Written plan: analysis (SWOT, stakeholders, assets), goals, segments, positioning, actions (events, PR, projects), budget, KPIs, roles. Turns strategy into steps — but limits exist (many actors, politics).",
           "План: анализ, цели, STP, действия, бюджет, KPI. Но сложно из-за многих акторов."),
        oq(PART_III, "3", "What's about relation between technology-knowledge-information diffusion and engagement of the actors and Place Marketing (explain the matrix)",
           "Матрица: технология–знание–диффузия информации и вовлечённость",
           "Matrix: axis 1 = speed of knowledge/information diffusion (technology, data, networks). Axis 2 = actor engagement. High both → co-creation (citizen-sourcing, A4A relations). Low both → passive users. PM picks tools by position on matrix.",
           "Ось 1: скорость знаний/информации. Ось 2: участие. Высокие обе → co-creation. Низкие → пассивность."),
    ]

    exam_05_mcq = [
        q(1, "Four competing philosophies strongly influence the role of marketing and marketing activities within an organization. Which of the following is not a component of market orientation?",
          "Что НЕ является компонентом market orientation?",
          [
              opt("a", "Customer orientation.", "Customer orientation"),
              opt("b", "Profitability orientation.", "Profitability orientation"),
              opt("c", "Marketing orientation.", "Marketing orientation"),
              opt("d", "Competitor orientation.", "Competitor orientation"),
          ], "b", PART_I,
          explain_ru="Market orientation: customer, competitor, interfunctional coordination — не «profitability orientation» как отдельный компонент."),
        q(2, "Which one is right:",
          "Какое утверждение верно:",
          [
              opt("a", "The territory emerges as a place through the perception of an observer and the emergent characteristics of the place, which interact with each other.",
                  "Территория становится местом через восприятие наблюдателя и эмерджентные характеристики места"),
              opt("b", "The territory is a place with specific features interacting with each other.",
                  "Территория — это место с взаимодействующими характеристиками"),
              opt("c", "The territory emerges as a place through the efforts of a strong government body and by the stakeholders investments.",
                  "Место возникает только через усилия власти и инвестиции стейкхолдеров"),
          ], "a", PART_I),
    ]
    exam_05_open = [
        oq(PART_II, "a", "Which is the relationship between marketing and value?",
           "Связь маркетинга и value",
           "Marketing creates, communicates, and exchanges value. Value = benefits − costs (S-D logic). In PM, different stakeholders see different value — residents want quality of life, investors want returns.",
           "Маркетинг создаёт и обменивает value. Value = выгоды − затраты. У стейкхолдеров разная ценность."),
        oq(PART_II, "b", "Describe the difficulties in SWOT analysis interpretation.",
           "Сложности интерпретации SWOT",
           "SWOT = Strengths, Weaknesses, Opportunities, Threats. Problems: subjective lists, too many items, mix internal/external, static snapshot, no clear link to action. Easy to write — hard to use for real strategy.",
           "SWOT субъективен, длинный, смешивает факторы, статичен, плохо переходит в действия."),
        oq(PART_II, "c", "Describe the Town Centre Management's stages.",
           "Этапы Town Centre Management",
           "Easy steps: (1) partners meet, (2) analyse centre (shops, safety, visitors), (3) vision + plan, (4) run projects (events, cleaning, marketing, digital), (5) measure KPIs, (6) improve and repeat.",
           "6 шагов: партнёры → анализ → план → проекты → KPI → улучшение."),
        oq(PART_II, "d", "What's about Business Improvement District.",
           "Business Improvement District (BID)",
           "A Business Improvement District (BID) is a zone in the city centre where local shops and companies vote to pay a small extra tax or fee. They pool this money for shared services: cleaning, security, marketing, and events. It helps finance Town Centre Management — businesses invest together, not alone.",
           "BID — зона, где бизнес голосует за доп. взнос. Деньги идут на уборку, охрану, маркетинг, события. Финансирует TCM."),
        oq(PART_III, "1", "Why it is suggested to include the 'education and/or training' in place marketing communication?",
           "Зачем включать education/training в коммуникацию PM?",
           "Universities and schools attract students, talent, and firms. Education spreads knowledge and culture — key for co-creation and place brand (onlife approach). Shows the place is open and modern.",
           "Образование привлекает студентов и talent, распространяет знания, усиливает бренд места."),
        oq(PART_III, "2", "Describe the need to consider internal and external stakeholders in defining the place marketing strategy for a place.",
           "Внутренние и внешние стейкхолдеры в стратегии PM",
           "Internal: residents, local business, government — they deliver substance and must agree. External: tourists, investors, media — they bring demand and spread image. Strategy needs both (A4A: actors act for the whole system).",
           "Internal реализуют, external дают спрос и имидж. Нужны оба (A4A — для всей системы)."),
        oq(PART_III, "3", "Please explain the limits in writing a place marketing plan.",
           "Ограничения place marketing plan",
           "Limits: many organisations, politics changes, product is complex, variable place boundaries (not only admin map), limited money, fast change (turbulence), actors disagree, easy to over-promise in communication.",
           "Ограничения: много акторов, политика, сложный продукт, переменные границы, turbulence, мало денег."),
    ]

    exam_07_mcq = [
        q(1, "In relationship marketing firms focus on __________ relationships with __________",
          "В relationship marketing фирмы фокусируются на __________ отношениях с __________",
          [
              opt("a", "short-term; customers and suppliers", "краткосрочных; клиентами и поставщиками"),
              opt("b", "long-term; customers and suppliers", "долгосрочных; клиентами и поставщиками"),
              opt("c", "short-term; customers", "краткосрочных; клиентами"),
              opt("d", "long-term; customers", "долгосрочных; клиентами"),
          ], "b", PART_I),
        q(2, "It is the sum of beliefs, ideas, impressions that people have of a brand or a place",
          "Это сумма убеждений, идей и впечатлений о бренде или месте",
          [
              opt("a", "we are talking about identity", "речь об identity (идентичности)"),
              opt("b", "we are talking about image", "речь об image (имидже)"),
              opt("c", "we are talking about positioning", "речь о positioning"),
          ], "b", PART_I,
          explain_ru="Image — восприятие аудитории; identity — то, что место о себе заявляет."),
    ]
    exam_07_open = [
        oq(PART_II, "a", "The role of the micro-environment and the emergent context",
           "Роль микросреды и emergent context",
           "Micro-environment = nearby actors you can partly manage: local firms, partners, competing cities/regions. Emergent context = sudden turbulence (pandemic, crisis, new tech) — unpredictable. PM must adapt to both.",
           "Micro-environment — локальные акторы и конкуренты. Emergent context — внезапные изменения (кризис, tech)."),
        oq(PART_II, "b", "How the demand in place marketing is composed?",
           "Из чего состоит спрос в place marketing?",
           "Demand = sum of different user groups: tourists, residents, firms, investors, students. Depends on motives, season, competing places, access (distribution), and events that attract visitors.",
           "Спрос от туристов, жителей, бизнеса, инвесторов, студентов. Зависит от мотива, сезона, событий, доступа."),
        oq(PART_II, "c", "The relevance of the marketing plan in marketing strategy",
           "Роль marketing plan в стратегии",
           "Strategy = WHERE to go (vision, positioning). Marketing plan = HOW to get there: goals, actions, budget, timeline, KPIs. Without a plan, strategy stays on paper.",
           "Strategy — куда. Plan — как (цели, действия, бюджет, KPI). Без плана стратегия мёртва."),
        oq(PART_II, "d", "Describe the positioning",
           "Опишите positioning",
           "Choose one main idea vs other places ('cultural city', 'innovation hub'). Positioning links identity → image. All communication and substance projects must support this idea.",
           "Одна главная идея vs другие места. Identity → image. Всё должно её поддерживать."),
        oq(PART_III, "1", "Explain the difference between place marketing demand driven and place marketing value co-creation driven.",
           "Demand driven vs value co-creation driven в PM",
           "Demand driven: government promotes existing place assets to attract visitors/business (top-down, like selling a product). Value co-creation driven: actors integrate resources for wellbeing/quality of life together (bottom-up + top-down).",
           "Demand driven — продаём то, что есть (top-down). Co-creation — создаём wellbeing вместе."),
        oq(PART_III, "2", "Place Marketing strategy: difficulties in the implementation.",
           "Сложности реализации стратегии PM",
           "Hard because: many actors, conflicting interests, weak coordination, politics changes, identity ≠ image, turbulence from change-generating forces, hard to measure results.",
           "Много акторов, конфликты, слабая координация, identity ≠ image, turbulence."),
        oq(PART_III, "3", "What the Place Branding is?",
           "Что такое Place Branding?",
           "Place branding = managing identity, image, and communication so people see a clear positive place (Kavaratzis). Best when participatory — citizens and firms co-create the brand, not only top-down logos.",
           "Place branding — управление identity, image, communication. Лучше participatory/co-created."),
    ]

    exam_08_mcq = [MCQ_STRATEGY, MCQ_STANDARDIZATION_C]
    exam_08_open = [
        oq(PART_II, "a", "Describe the SMART city concept.",
           "Концепция SMART city",
           "Smart city uses technology + data to improve services (transport, energy, e-government). Part of service science in place marketing. Makes the city attractive for talent, firms, and quality of life.",
           "Smart city — tech + data для лучших услуг. Привлекает talent и инвесторов."),
        oq(PART_II, "b", "Market segmentation.", "Сегментация рынка",
           "Split place users by similar needs/motives. Groups: tourists, residents, investors, students, firms. Each segment gets its own value proposition and message.",
           "Группы с похожими потребностями → своё сообщение и value proposition."),
        oq(PART_II, "c", "Explain the concept of co-production.",
           "Концепция co-production",
           "Co-production = users help create the service/experience, not only consume it. In places: citizens run events, firms + government renew the area together. Key mechanism of value co-creation.",
           "Co-production — пользователи создают услугу/опыт вместе. Механизм value co-creation."),
        oq(PART_II, "d", "Distribution in Place Marketing is a critical factor. Why?",
           "Почему distribution критичен в PM?",
           "Distribution = physical + digital access (roads, ports, internet). Place boundaries follow networks, not only admin borders. No access → no demand, even with good branding.",
           "Distribution = физический + digital доступ. Без доступа нет спроса."),
        oq(PART_III, "1", "Explain the role of the 5 change-generating forces affecting society, companies and territories/places.",
           "5 сил изменений для общества, компаний и территорий",
           "From Bruni (2021) — 4 forces + turbulence: (1) Technology, (2) Use of data, (3) International networks & service exchange, (4) Knowledge diffusion, (5) Turbulence/complexity (health, environment, markets). They change place value proposition.",
           "5 сил: Technology, Data, Networks, Knowledge diffusion + Turbulence. Меняют value proposition места."),
        oq(PART_III, "2", "Differences between territory and place.",
           "Различия territory и place",
           "Memory trick: territory = house (map, borders, land). Place = home (meaning, feelings, identity). Place emerges when people perceive the territory. Boundaries of place can be wider than admin borders.",
           "Territory = house (карта). Place = home (смысл). Границы place шире admin borders."),
        oq(PART_III, "3", 'Why is it difficult to define the "product" in Place Marketing?',
           "Почему сложно определить product в PM?",
           "Place product = public + private mix (streets, shops, events, reputation, networks). Co-created by many actors. Always changing — not a single standard product like a phone or a car.",
           "Продукт = public + private, co-created, меняется. Не один стандартный товар вроде телефона."),
    ]

    exam_09_mcq = [
        q(10, "In place marketing, the 'Place' element of the marketing mix refers to:",
          "В place marketing элемент «Place» в marketing mix — это:",
          [
              opt("a", "The positioning of a website in global search engines.",
                  "Позиционирование сайта в поисковиках"),
              opt("b", "The spatial context in which it is possible to enjoy the value proposition.",
                  "Пространственный контекст, где можно получить value proposition"),
              opt("c", "The way shops are organized in the city.",
                  "Как организованы магазины в городе"),
              opt("d", "The urban organization of TCM.",
                  "Городская организация TCM"),
          ], "b", PART_I,
          explain_ru="Place = доступ и пространство, где пользователь получает ценность места (distribution)."),
        q(11, "Caroli's first strategy (1999) foresees:",
          "Первая стратегия Caroli (1999) предполагает:",
          [
              opt("a", "The abandonment of the current vocation to attract new industrial sectors.",
                  "Отказ от текущей vocation ради новых отраслей"),
              opt("b", "The optimization of existing resources by reinforcing the current territorial vocation.",
                  "Оптимизацию ресурсов через усиление текущей территориальной vocation"),
              opt("c", "The sale of natural resources to finance local public debt.",
                  "Продажу природных ресурсов для погашения долга"),
              opt("d", "Encouraging citizens to carry on their traditions.",
                  "Сохранение традиций гражданами"),
          ], "b", PART_I,
          explain_ru="Стратегия 1 Caroli: не ломать specialization, а усилить существующую vocation территории."),
        q(12, '"Friction between actors" occurs when:',
          "«Friction between actors» возникает, когда:",
          [
              opt("a", "Individual goals are in strong conflict with the ultimate purpose of the place-system.",
                  "Личные цели конфликтуют с общей целью place-system"),
              opt("b", "Two people actively participate in living labs.",
                  "Двое активно участвуют в living labs"),
              opt("c", "Living labs do not work.",
                  "Living labs не работают"),
              opt("d", "Tourists and residents have the same interests.",
                  "У туристов и жителей одинаковые интересы"),
          ], "a", PART_I,
          explain_ru="Трение — когда цели актора идут против общей цели системы места."),
        q(13, 'According to the Viable Systems Approach (VSA), a system is "viable" if:',
          "По VSA (Viable Systems Approach) система «viable», если:",
          [
              opt("a", "It possesses a high endowment of tangible resources.",
                  "Много материальных ресурсов"),
              opt("b", "It is isolated from global market dynamics to preserve its identity.",
                  "Изолирована от глобального рынка"),
              opt("c", "It is capable of surviving over time by adapting to changes in the context and environment.",
                  "Может выживать, адаптируясь к изменениям среды"),
              opt("d", "It possesses a high endowment of intangible resources.",
                  "Много нематериальных ресурсов"),
          ], "c", PART_I,
          explain_ru="Viable = жизнеспособная система, которая адаптируется к изменениям."),
        q(14, 'What characterizes Quadrant "b" (Medium technology, Medium relationship)?',
          "Что характеризует квадрант «b» (средняя technology, средняя relationship)?",
          [
              opt("a", "A smart city evolving according to value co-creation.",
                  "Smart city с value co-creation"),
              opt("b", "Absence of operational territorial marketing.",
                  "Отсутствие территориального маркетинга"),
              opt("c", "A Demand-driven approach focused on satisfying a specific target.",
                  "Demand-driven подход для конкретного target"),
              opt("d", "A technological dictatorship that limits the real needs of residents.",
                  "Технологическая диктатура"),
          ], "c", PART_I,
          explain_ru="Квадрант b (средняя tech + средние отношения) = demand-driven, продаём место целевой группе."),
        q(15, 'What is the main risk of the presence of "free-riders" in a CCN project?',
          "Главный риск «free-riders» в проекте CCN:",
          [
              opt("a", "The depletion of collective resources due to those who benefit from advantages without contributing.",
                  "Истощение общих ресурсов: пользуются выгодами, но не вносят вклад"),
              opt("b", "An excessive increase in commercial competition among shops in the same center.",
                  "Рост конкуренции между магазинами"),
              opt("c", "The closure of small independent shops in favor of extra-urban shopping malls.",
                  "Закрытие малых магазинов из-за ТЦ"),
              opt("d", "Excessive tax pressure on residential property owners.",
                  "Высокие налоги на жильё"),
          ], "a", PART_I,
          explain_ru="Free-rider = получает пользу от общего проекта, но не платит/не участвует → ресурсы кончаются."),
        q(16, 'Why does territorial innovation require "Inclusion"?',
          "Почему территориальные инновации требуют Inclusion?",
          [
              opt("a", "Because it is a constraint imposed by the regulations and directives of the European Commission.",
                  "Это требование Еврокомиссии"),
              opt("b", "To increase the number of physical participants at technical and political tables.",
                  "Чтобы больше людей сидело за столом переговоров"),
              opt("c", "Because true innovation does not exist without the active and convinced participation of the system of actors.",
                  "Настоящих инноваций нет без активного участия акторов системы"),
              opt("d", "To multiply the decision-making autonomy of primary stakeholders and the government.",
                  "Чтобы умножить автономию стейкхолдеров и власти"),
          ], "c", PART_I,
          explain_ru="Инновация на территории = co-creation; без включения акторов она не работает."),
        q(17, "The role of the University in a place strategy is that of:",
          "Роль университета в place strategy:",
          [
              opt("a", "Catalyst and provider of knowledge for the application of the marketing framework to marketing management.",
                  "Катализатор знаний для marketing management"),
              opt("b", "Catalyst and provider of knowledge for attracting investments.",
                  "Катализатор знаний для привлечения инвестиций"),
              opt("c", "Catalyst and provider of knowledge for brand development.",
                  "Катализатор знаний для бренда"),
              opt("d", "Catalyst and provider of value through the dissemination of knowledge, projects, and human capital.",
                  "Катализатор ценности через знания, проекты и human capital"),
          ], "d", PART_I,
          explain_ru="Университет даёт знания, проекты, кадры — связь с местом (onlife/onplace)."),
        q(18, 'What is meant by "Place Brand Equity"?',
          "Что такое «Place Brand Equity»?",
          [
              opt("a", "The systematic result of the place's image and identity in the minds of stakeholders.",
                  "Результат image и identity в головах стейкхолдеров"),
              opt("b", "The total equity value expressed in euros of the city's brand.",
                  "Стоимость бренда города в евро"),
              opt("c", "The brand of the natural shopping center born from the TCM model.",
                  "Бренд natural shopping center из TCM"),
              opt("d", "The value of the total visitors to the city center.",
                  "Число посетителей центра"),
          ], "a", PART_I,
          explain_ru="Brand equity места = накопленный образ (image + identity), не деньги на счёте."),
        q(19, 'The concept of "Mutuality" implies that actors:',
          "Концепция «Mutuality» означает, что акторы:",
          [
              opt("a", "Participate in the co-design of the marketing plan.",
                  "Участвуют в co-design marketing plan"),
              opt("b", "Help each other to overcome the economic crisis.",
                  "Помогают друг другу пережить кризис"),
              opt("c", "Work for a common ultimate purpose, sharing expectations, risks, and strategic results.",
                  "Работают на общую цель, деля ожидания, риски и результаты"),
              opt("d", "All possess the same annual income level and professional qualification.",
                  "Имеют одинаковый доход и квалификацию"),
          ], "c", PART_I,
          explain_ru="Mutuality = общая финальная цель места; акторы разделяют риски и результаты."),
    ]

    exams = [
        ("01", exam_01_mcq, exam_01_open),
        ("02", exam_02_mcq, exam_02_open),
        ("03", exam_03_mcq, exam_03_open),
        ("04", exam_04_mcq, exam_04_open),
        ("05", exam_05_mcq, exam_05_open),
        ("07", exam_07_mcq, exam_07_open),
        ("08", exam_08_mcq, exam_08_open),
        ("09", exam_09_mcq, []),
    ]

    combined_mcq, combined_open = build_combined(exams)
    n_variants = len(exams)
    rules = (
        '<div class="rules">'
        f"<strong>{n_variants} exam variants</strong> on one page: {len(combined_mcq)} MCQ (Part I) "
        f"+ {len(combined_open)} open questions (Part II & III). "
        "MCQ grouped by variant — click <em>Check answers</em> to score Part I. "
        "Open questions: sample answers visible below each item. "
        "· Все варианты на одной странице. MCQ проверяются кнопкой."
        "</div>"
    )
    write_page(
        "index.html",
        "Place Marketing — All Exams",
        f"{n_variants} variants · {len(combined_mcq)} MCQ + {len(combined_open)} open questions · Univ. Cassino",
        combined_mcq,
        combined_open,
        rules,
        scoring={"correct": 1, "wrong": 0, "max": None},
    )

    print(f"Generated {ROOT / 'index.html'}")
    import subprocess
    build_script = ROOT / "build_index.mjs"
    if build_script.exists():
        subprocess.run(["node", str(build_script)], cwd=ROOT, check=False)


if __name__ == "__main__":
    main()
