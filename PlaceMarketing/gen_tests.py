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
            <div class="answer-label">Simple answer (B1 English) / Простой ответ</div>
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
    "<strong>All 7 exam variants</strong> on one page: 14 MCQ (Part I) + 28 brief (Part II) + 21 brief (Part III). "
    "MCQ grouped by variant — click <em>Check answers</em> to score Part I. "
    "Open questions: simple B1 English answers visible below each item. "
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
           "The 4Ps are Product, Price, Place, and Promotion. They work well for normal products in a shop. But a city is not a simple product — it is many things together (life, services, culture). Price is not only money — it is also time and stress. Place means how easy it is to reach the area. So we need more ideas: people, partners, and working with citizens.",
           "4P хороши для обычных товаров, но город — не простой продукт. Цена — не только деньги. Нужны люди, партнёры и совместная работа."),
        oq(PART_II, "b", "Describe the role of public relations in place marketing",
           "Роль PR в place marketing",
           "PR helps people see a place in a good way. It works with newspapers, social media, and local groups. It shares true stories and answers problems in a crisis. It is not the same as advertising — people often trust it more.",
           "PR строит хороший образ места, работает со СМИ и людьми, помогает в кризисе. Люди ему больше доверяют, чем рекламе."),
        oq(PART_II, "c", 'What is the meaning of "value" in marketing',
           'Значение «value» в маркетинге',
           "Value means: what you get minus what you give. You get benefits (useful things, good feelings, status). You give costs (money, time, risk). For a place, tourists, residents, and investors want different benefits.",
           "Ценность = выгоды минус затраты (деньги, время, риск). У туристов, жителей и инвесторов разные выгоды."),
        oq(PART_II, "d", "What the Town Centre Management scheme is?",
           "Что такое Town Centre Management (TCM)?",
           "Town Centre Management means shops, local government, and citizens work together to improve the city centre. They make it cleaner, safer, and more interesting (events, marketing). Money often comes from a Business Improvement District (BID).",
           "TCM — совместная работа бизнеса, власти и жителей над центром города. Часто через BID."),
        oq(PART_III, "1", "Why the Place emerges by the territory?",
           "Почему Place возникает из territory?",
           "Territory is the land and borders on a map. Place is how people feel and think about that area — its meaning and identity. A place appears when people look at the territory and give it meaning.",
           "Territory — земля на карте. Place — как люди её воспринимают и какой смысл ей дают."),
        oq(PART_III, "2", 'Why it is difficult to define the "price" in Place Marketing?',
           "Почему сложно определить «цену» в place marketing?",
           "A place has no simple price tag. You pay money (rent, taxes, cost of living). But you also pay with time (traffic, queues) and stress. Good things like beauty or community are hard to count in money.",
           "Цена места — не только деньги, но и время и стресс. Красота и сообщество сложно посчитать в евро."),
        oq(PART_III, "3", "Describe the 'Living Labs' and their role",
           "Living Labs и их role",
           "Living Labs are places where citizens, government, and business test new ideas in real life — not only on paper. People try solutions together. In place marketing they help people take part and test new policies faster.",
           "Living Labs — тест новых идей в реальной жизни вместе с гражданами, властью и бизнесом."),
    ]

    exam_02_mcq = [MCQ_STRATEGY, MCQ_STANDARDIZATION_C]
    exam_02_open = [
        oq(PART_II, "a", "Please explain the passage from traditional marketing system toward marketing value co-creation driven.",
           "Переход от традиционного маркетинга к value co-creation driven",
           "Old marketing: the company makes a product and sells it to the customer. New idea (co-creation): the company and users create value together. For a place, residents, visitors, and business help shape the city — not only the government.",
           "Раньше: компания продаёт готовый продукт. Теперь: ценность создают вместе с пользователями. Место формируют жители, туристы и бизнес."),
        oq(PART_II, "b", "Market segmentation.", "Сегментация рынка",
           "Segmentation means dividing people into groups with similar needs. In place marketing we have different groups: tourists, investors, students, residents. Each group wants different things, so we speak to them differently.",
           "Делим аудиторию на группы с похожими потребностями: туристы, инвесторы, жители и т.д."),
        oq(PART_II, "c", "Why in place marketing the customer is called user?",
           "Почему в PM клиента называют user?",
           "A user lives in or visits the place every day — they use services, transport, and public spaces. They are not just buying once. They often help create the experience (events, culture). So 'user' is a better word than 'customer'.",
           "Пользователь живёт или часто бывает в месте, пользуется услугами. Он не просто покупает один раз."),
        oq(PART_II, "d", "Why distribution is a critical factor to explain in Place Marketing?",
           "Почему distribution критичен в PM?",
           "Distribution means: can people reach the place? Good roads, trains, airports, buses, and internet matter. If a city is hard to reach, tourists and investors will not come — even if marketing is good.",
           "Distribution = доступность: транспорт, связь, инфраструктура. Без этого люди не приедут."),
        oq(PART_III, "1", "Which is the meaning of 'Place as value proposition'?",
           "Что значит «Place as value proposition»?",
           "It means: the place offers a package of benefits for a group of people. For example: good life, jobs, culture, safety, identity. It is a promise: 'If you come or stay here, you will get these good things.'",
           "Место — это набор выгод для группы людей: жизнь, работа, культура, безопасность."),
        oq(PART_III, "2", "Which are critical factors for a successful Place Marketing strategy?",
           "Критические факторы успешной стратегии PM",
           "You need: a clear vision; leaders who work together; real projects (not only slogans); a honest brand; money; ways to measure success (KPIs); and people taking part in decisions.",
           "Нужны: видение, лидеры, реальные проекты, честный бренд, деньги, KPI, участие людей."),
        oq(PART_III, "3", 'Why it is difficult to define the "product" in Place Marketing?',
           "Почему сложно определить «продукт» в PM?",
           "The 'product' of a place is many things: streets, services, events, people, reputation. It changes over time. Many actors create it together. So you cannot put it in one simple box like a bottle of water.",
           "Продукт места — это всё вместе: пространство, услуги, события, люди, репутация. Его создают многие."),
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
           "Place marketing is not only ads and slogans. It also needs planning, real improvements (parks, transport, services), partnerships, and money. If the place is bad in reality, good advertising will not help for long.",
           "PM — не только реклама. Нужны план, реальные улучшения, партнёры и деньги."),
        oq(PART_II, "b", "Marketing segmentation", "Сегментация в маркетинге",
           "You split the audience into groups with similar needs or behaviour. Then you choose which groups to focus on. For a place: holiday tourists, business visitors, new residents, investors — each is different.",
           "Делим аудиторию на группы, выбираем, на кого работать: туристы, бизнес, жители, инвесторы."),
        oq(PART_II, "c", "Positioning", "Позиционирование",
           "Positioning means: how people see your place compared to other places. You choose one clear idea — for example 'historic city', 'tech hub', or 'beach destination'. You want people to remember this idea.",
           "Позиционирование — как место отличается от других в голове людей. Одна ясная идея."),
        oq(PART_II, "d", "Natural Shopping Center: strengths and weaknesses",
           "Natural Shopping Center: сильные и слабые стороны",
           "Strengths: real local shops, authentic atmosphere, unique experience. Weaknesses: hard to organise everyone together, less money than big malls, parking and access can be difficult, competition from shopping centres.",
           "Плюсы: аутентичность, уникальность. Минусы: сложная координация, мало денег, парковка, конкуренция с ТЦ."),
        oq(PART_III, "1", "Describe how the Universities could adopt a 'onlife' approach and the relations with the place.",
           "Как университеты могут использовать onlife и связь с местом",
           "'Onlife' means online and offline life together. A university can teach online and on campus, use digital tools, but also connect with the city — local projects, events, research that helps the region. The university becomes part of the place brand.",
           "Onlife = онлайн + офлайн. Университет учит гибридно и работает с городом: проекты, события, бренд территории."),
        oq(PART_III, "2", "Which are relationships between Strategy + Substance + Symbolic actions?",
           "Связь Strategy, Substance и Symbolic actions",
           "Strategy = the plan and goals. Substance = real things you build (roads, services, projects). Symbolic = signs, events, advertising, image. All three must match. If you promise a 'green city' (symbol) but the air is dirty (substance), people will not trust you.",
           "Strategy — план. Substance — реальные проекты. Symbolic — реклама и образ. Всё должно совпадать."),
        oq(PART_III, "3", "Nature and role of Key Performance Indicators in Town Centre Management.",
           "KPI в Town Centre Management",
           "KPIs are numbers that show if things are going well — for example: how many people visit, empty shops, safety, money spent, satisfaction. They help partners see progress, change the plan, and get funding.",
           "KPI — цифры успеха: поток людей, пустые магазины, безопасность, траты, удовлетворённость."),
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
           "It is a ranking that shows how people see a country — culture, tourism, business, people, etc. Governments use it to compare countries and improve national place branding.",
           "Рейтинг восприятия страны по разным темам. Помогает сравнивать страны и улучшать бренд."),
        oq(PART_II, "b", "Marketing researches", "Маркетинговые исследования",
           "Research collects information about people who use a place: surveys, interviews, visitor numbers. This helps understand what people want and check if campaigns work.",
           "Сбор данных: опросы, интервью, статистика посещений. Понимаем, что людям нужно."),
        oq(PART_II, "c", "Targeting, positioning and segmentation",
           "Targeting, positioning and segmentation",
           "First segmentation: divide people into groups. Then targeting: choose which groups to focus on. Then positioning: show your place as special for those groups. Example: target young tourists and position the city as 'fun and cheap'.",
           "Сегментация → выбор группы (targeting) → образ для неё (positioning)."),
        oq(PART_II, "d", "The Place Brand is:",
           "Place Brand — это:",
           "A place brand is what people think and feel about a place — not only a logo. It is the promise and the experience. Good branding matches what you say with what people really find there.",
           "Бренд места — что люди думают и чувствуют, не только логотип. Обещание должно совпадать с реальностью."),
        oq(PART_III, "1", "What's about Place Marketing value co-creation driven?",
           "Place Marketing value co-creation driven",
           "People do not only receive a ready place — they help create it. Citizens, business, and government work together on services, events, and the image. Value is built with users, not only for them.",
           "Ценность места создают вместе: граждане, бизнес, власть — не только сверху."),
        oq(PART_III, "2", "Describing the place marketing plan",
           "Place marketing plan",
           "A written plan with: analysis (SWOT, stakeholders), goals, target groups, positioning, actions (events, ads, projects), budget, KPIs, and who is responsible. It turns strategy into concrete steps.",
           "План: анализ, цели, сегменты, positioning, действия, бюджет, KPI, ответственные."),
        oq(PART_III, "3", "What's about relation between technology-knowledge-information diffusion and engagement of the actors and Place Marketing (explain the matrix)",
           "Матрица: технология–знание–диффузия информации и вовлечённость",
           "Imagine a table with two lines: (1) how fast information spreads, (2) how much people take part. High spread + high participation = people co-create together (online + offline). Low on both = passive users. Place marketing picks tools based on where you are on this table.",
           "Две оси: скорость информации и участие людей. Высокие обе → совместное создание. Низкие → пассивные пользователи."),
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
           "Marketing tries to create, share, and exchange value with people. Value = benefits minus costs. For a place, different groups (residents, tourists, investors) see different benefits.",
           "Маркетинг создаёт и обменивает ценность. Ценность = выгоды − затраты. У групп разные выгоды."),
        oq(PART_II, "b", "Describe the difficulties in SWOT analysis interpretation.",
           "Сложности интерпретации SWOT",
           "SWOT lists Strengths, Weaknesses, Opportunities, Threats. Problems: people are subjective; the list gets too long; internal and external factors get mixed; teams forget to turn the list into real actions.",
           "SWOT субъективен, списки длинные, всё смешивается, сложно перейти к действиям."),
        oq(PART_II, "c", "Describe the Town Centre Management's stages.",
           "Этапы Town Centre Management",
           "Typical steps: (1) partners come together, (2) study the city centre (shops, safety, visitors), (3) write a vision and plan, (4) run projects (events, cleaning, marketing), (5) measure results, (6) improve the plan.",
           "Этапы: партнёры → анализ центра → план → проекты → KPI → улучшения."),
        oq(PART_II, "d", "What's about Business Improvement District.",
           "Business Improvement District (BID)",
           "A BID is a zone where local businesses pay extra money (after a vote) for shared improvements: cleaning, security, marketing, events. It helps fund town centre management.",
           "BID — зона, где бизнес платит доп. взнос за уборку, безопасность, маркетинг."),
        oq(PART_III, "1", "Why it is suggested to include the 'education and/or training' in place marketing communication?",
           "Зачем включать education/training в коммуникацию PM?",
           "Good schools and universities attract students, skilled workers, and companies. Education shows the place is modern and open to talent. It is an important part of the place offer.",
           "Образование привлекает студентов, специалистов и компании. Это часть предложения места."),
        oq(PART_III, "2", "Describe the need to consider internal and external stakeholders in defining the place marketing strategy for a place.",
           "Внутренние и внешние стейкхолдеры в стратегии PM",
           "Internal stakeholders live or work there: residents, local business, government — they must agree and help deliver projects. External: tourists, investors, media — they bring demand and spread the image. You need both.",
           "Внутренние (жители, бизнес, власть) — реализуют. Внешние (туристы, инвесторы, СМИ) — спрос и имидж."),
        oq(PART_III, "3", "Please explain the limits in writing a place marketing plan.",
           "Ограничения place marketing plan",
           "Hard to write because: many different organisations decide together; politics changes; the 'product' is hard to measure; people disagree; money is limited; trends change fast; easy to promise too much.",
           "Сложно: много организаций, политика, трудно измерить продукт, мало денег, быстрые изменения."),
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
           "Micro-environment = nearby competitors (other cities/regions), local partners, service providers — things you can partly control. Emergent context = sudden changes (crisis, new technology, pandemic) — hard to predict. Place marketing must watch both.",
           "Микросреда — конкуренты и партнёры рядом. Emergent context — неожиданные изменения (кризис, технологии)."),
        oq(PART_II, "b", "How the demand in place marketing is composed?",
           "Из чего состоит спрос в place marketing?",
           "Demand comes from different groups: tourists, people who want to live there, companies, investors, students. It depends on why they come, the season, competing places, and how easy it is to travel there.",
           "Спрос от туристов, жителей, бизнеса, инвесторов, студентов. Зависит от мотива, сезона, конкурентов, доступности."),
        oq(PART_II, "c", "The relevance of the marketing plan in marketing strategy",
           "Роль marketing plan в стратегии",
           "Strategy says WHERE you want to go. The marketing plan says HOW: goals, actions, budget, timeline, KPIs. Without a plan, strategy is only words on paper.",
           "Стратегия — куда идём. План — как: цели, действия, бюджет, сроки, KPI."),
        oq(PART_II, "d", "Describe the positioning",
           "Опишите positioning",
           "You choose how you want people to see your place compared to others. Example: 'historic and cultural' or 'innovation and startups'. All communication should support this one main idea.",
           "Выбираем главную идею места по сравнению с другими. Вся коммуникация её поддерживает."),
        oq(PART_III, "1", "Explain the difference between place marketing demand driven and place marketing value co-creation driven.",
           "Demand driven vs value co-creation driven в PM",
           "Demand driven: the place already exists — marketing tries to attract more visitors/business to the current offer (like selling a product). Co-creation: users and local people help build and improve the place together — marketing is participation, not only promotion.",
           "Demand driven — продаём то, что уже есть. Co-creation — люди помогают создавать место вместе."),
        oq(PART_III, "2", "Place Marketing strategy: difficulties in the implementation.",
           "Сложности реализации стратегии PM",
           "Many organisations must agree; interests conflict; coordination is weak; politicians change; hard to measure results; brand promise and real life do not match.",
           "Много организаций, конфликты, слабая координация, смена политиков, обещания ≠ реальность."),
        oq(PART_III, "3", "What the Place Branding is?",
           "Что такое Place Branding?",
           "Place branding means managing how people see a place: identity, message, communication, and real experience. Goal: positive, clear image that helps the place compete with others.",
           "Place branding — управление образом места: идентичность, сообщение, опыт, конкуренция с другими."),
    ]

    exam_08_mcq = [MCQ_STRATEGY, MCQ_STANDARDIZATION_C]
    exam_08_open = [
        oq(PART_II, "a", "Describe the SMART city concept.",
           "Концепция SMART city",
           "A smart city uses technology and data to run services better — transport, energy, waste, government online. Life becomes easier for citizens. In place marketing it makes the city attractive for talent and investors.",
           "Smart city — технологии и данные для лучших услуг. Привлекает людей и инвесторов."),
        oq(PART_II, "b", "Market segmentation.", "Сегментация рынка",
           "Divide place users into groups with different needs. Then you can offer and communicate the right message to each group — tourists, residents, companies, etc.",
           "Делим пользователей на группы с разными потребностями — разные сообщения для каждой."),
        oq(PART_II, "c", "Explain the concept of co-production.",
           "Концепция co-production",
           "Co-production means users help make the service or experience, not only use it. Example: residents organise a festival; shop owners improve the street together. The place becomes better because people take part.",
           "Co-production — пользователи помогают создавать услугу/опыт, не только потребляют."),
        oq(PART_II, "d", "Distribution in Place Marketing is a critical factor. Why?",
           "Почему distribution критичен в PM?",
           "Distribution = can people get to the place and use it? Needs transport, airports, roads, digital connection, signs. Without access, marketing messages are useless.",
           "Distribution = можно ли добраться и пользоваться местом. Без доступа реклама бесполезна."),
        oq(PART_III, "1", "Explain the role of the 5 change-generating forces affecting society, companies and territories/places.",
           "5 сил изменений для общества, компаний и территорий",
           "Five big forces of change: (1) globalisation — world competition, (2) technology/digital — internet, AI, (3) environment/sustainability, (4) demographics — ageing, migration, (5) government/policy. They change what people want from places.",
           "5 сил: глобализация, технологии, экология, демография, политика. Меняют спрос на места."),
        oq(PART_III, "2", "Differences between territory and place.",
           "Различия territory и place",
           "Territory = land with borders on a map (official area). Place = how people experience and understand that area — feelings, meaning, identity. You need territory, but place is about people’s minds.",
           "Territory — земля на карте. Place — как люди её переживают и понимают."),
        oq(PART_III, "3", 'Why is it difficult to define the "product" in Place Marketing?',
           "Почему сложно определить product в PM?",
           "The product mixes public and private things: streets, shops, nature, events, reputation. It changes and many people create it. So there is no single clear 'product' like a phone or a car.",
           "Продукт — смесь публичного и частного, меняется, создаётся многими. Нет одного чёткого продукта."),
    ]

    exams = [
        ("01", exam_01_mcq, exam_01_open),
        ("02", exam_02_mcq, exam_02_open),
        ("03", exam_03_mcq, exam_03_open),
        ("04", exam_04_mcq, exam_04_open),
        ("05", exam_05_mcq, exam_05_open),
        ("07", exam_07_mcq, exam_07_open),
        ("08", exam_08_mcq, exam_08_open),
    ]

    combined_mcq, combined_open = build_combined(exams)
    write_page(
        "index.html",
        "Place Marketing — All Exams",
        f"7 variants · {len(combined_mcq)} MCQ + {len(combined_open)} open questions · Univ. Cassino 2021–2022",
        combined_mcq,
        combined_open,
        RULES,
        scoring={"correct": 1, "wrong": 0, "max": None},
    )

    print(f"Generated {ROOT / 'index.html'}")
    import subprocess
    build_script = ROOT / "build_index.mjs"
    if build_script.exists():
        subprocess.run(["node", str(build_script)], cwd=ROOT, check=False)


if __name__ == "__main__":
    main()
