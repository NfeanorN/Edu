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
    "Open questions: EN + RU sample answers below each item. "
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
           "The 4Ps (product, price, place, promotion) are a classic framework, but for places the 'product' is fuzzy, 'price' is not only monetary, and distribution means territorial accessibility. Extended frameworks add people, partnerships, and co-creation.",
           "4P (product, price, place, promotion) — классическая рамка, но для места «продукт» размыт, цена — не только денежная, distribution — доступность территории. Нужны доп. рамки: people, partnerships, co-creation."),
        oq(PART_II, "b", "Describe the role of public relations in place marketing",
           "Роль PR в place marketing",
           "PR builds the place's image and reputation, works with media and stakeholders, supports events and crisis communication. It complements advertising through trust and earned media.",
           "PR формирует имидж и репутацию места, работает со СМИ и стейкхолдерами, поддерживает события и кризисные коммуникации. Дополняет рекламу — через доверие и earned media."),
        oq(PART_II, "c", 'What is the meaning of "value" in marketing',
           'Значение «value» в маркетинге',
           "Value is the ratio of benefits (functional, emotional, social) to costs (money, time, risk). In place marketing, value differs for residents, tourists, and investors across segments.",
           "Value = соотношение выгод (functional, emotional, social) и затрат (деньги, время, риск). В PM — ценность для резидентов, туристов, инвесторов, отличается у сегментов."),
        oq(PART_II, "d", "What the Town Centre Management scheme is?",
           "Что такое Town Centre Management (TCM)?",
           "TCM is a partnership model for managing a city centre: business, government, and citizens jointly improve attractiveness, safety, and events—often via a BID or local association.",
           "TCM — партнёрская модель управления центром города: бизнес, власть, граждане совместно улучшают привлекательность, безопасность, события. Часто через BID или ассоциации."),
        oq(PART_III, "1", "Why the Place emerges by the territory?",
           "Почему Place возникает из territory?",
           "Territory is the physical/administrative base. Place is a socially constructed perception: meanings, identity, and the observer's experience. A place emerges from the interaction between territory and perception.",
           "Territory — физическая/административная основа. Place — социально сконструированное восприятие: смыслы, идентичность, опыт наблюдателя. Место «рождается» из взаимодействия территории и восприятия."),
        oq(PART_III, "2", 'Why it is difficult to define the "price" in Place Marketing?',
           "Почему сложно определить «цену» в place marketing?",
           "The 'price' of a place is multi-layered: cost of living, taxes, rent, plus non-monetary costs (competition, congestion). Benefits are not always monetised—so price is not money alone.",
           "Цена места многослойна: стоимость жизни, налоги, аренда, но также нематериальные издержки (конкуренция, очереди). Выгоды не всегда монетизируются → price ≠ только money."),
        oq(PART_III, "3", "Describe the 'Living Labs' and their role",
           "Living Labs и их роль",
           "Living Labs are open co-creation platforms where users, government, and business test innovations in a real place context. In PM they support engagement, policy experiments, and faster implementation.",
           "Living Labs — открытые площадки co-creation: пользователи, власть, бизнес тестируют инновации в реальном контексте места. Роль в PM: вовлечение, эксперименты политик, ускорение внедрения."),
    ]

    exam_02_mcq = [MCQ_STRATEGY, MCQ_STANDARDIZATION_C]
    exam_02_open = [
        oq(PART_II, "a", "Please explain the passage from traditional marketing system toward marketing value co-creation driven.",
           "Переход от традиционного маркетинга к value co-creation driven",
           "Shift from one-way value transfer (firm → customer) to joint value creation with users and stakeholders. The place is shaped together with residents, visitors, and business.",
           "От односторонней передачи ценности (firm → customer) к совместному созданию ценности с пользователями/стейкхолдерами. Место проектируется вместе с резидентами, туристами, бизнесом."),
        oq(PART_II, "b", "Market segmentation.", "Сегментация рынка",
           "Dividing the market into homogeneous groups (geography, motives, behaviour). In PM: tourists, investors, talent, residents—each with different value propositions.",
           "Деление рынка на однородные группы (география, мотивы, поведение). В PM: сегменты — туристы, инвесторы, talent, резиденты; разные value propositions."),
        oq(PART_II, "c", "Why in place marketing the customer is called user?",
           "Почему в PM клиента называют user?",
           "The user actively consumes the place experience (living, mobility, services) and is often a co-producer. 'User' stresses ongoing engagement, not a one-off purchase.",
           "Пользователь активно потребляет опыт места (проживание, мобильность, сервисы), часто co-producer. «User» подчёркивает вовлечённость, а не разовую покупку."),
        oq(PART_II, "d", "Why distribution is a critical factor to explain in Place Marketing?",
           "Почему distribution критичен в PM?",
           "Distribution means place accessibility: transport, connectivity, digital channels, infrastructure. Without accessibility the value proposition cannot reach target segments.",
           "Distribution = доступность места: транспорт, connectivity, digital channels, инфраструктура. Без доступности ценностное предложение не достигает целевых сегментов."),
        oq(PART_III, "1", "Which is the meaning of 'Place as value proposition'?",
           "Что значит «Place as value proposition»?",
           "The place as a bundle of benefits for a segment: quality of life, opportunities, identity, services—not just attributes but a promise of value for a specific audience.",
           "Место как пакет выгод для сегмента: качество жизни, возможности, идентичность, сервисы. Не только атрибуты, а обещание ценности для конкретной аудитории."),
        oq(PART_III, "2", "Which are critical factors for a successful Place Marketing strategy?",
           "Критические факторы успешной стратегии PM",
           "Strong vision, stakeholder leadership, alignment of Strategy–Substance–Symbolic, credible brand, measurable KPIs, sustainable funding, and co-creation.",
           "Сильное видение, лидерство стейкхолдеров, согласованность Strategy–Substance–Symbolic, достоверный бренд, измеримые KPI, устойчивое финансирование, co-creation."),
        oq(PART_III, "3", 'Why it is difficult to define the "product" in Place Marketing?',
           "Почему сложно определить «продукт» в PM?",
           "The place product is a hybrid: space, services, events, reputation, people. It is heterogeneous, co-produced, and changes over time—so there is no clear product boundary.",
           "Продукт места — гибрид: пространство, услуги, события, репутация, люди. Неоднороден, совместно производится, меняется во времени → нет чёткой границы «продукта»."),
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
           "PM includes planning, the place product/experience, partnerships, governance, and investment. Communication is only one tool; without substance the strategy fails.",
           "PM включает планирование, продукт/опыт места, партнёрства, governance, инвестиции. Коммуникация лишь один инструмент; без substance стратегия не работает."),
        oq(PART_II, "b", "Marketing segmentation", "Сегментация в маркетинге",
           "Splitting the audience by shared characteristics or needs for targeting. In PM: by visit purpose, resident type, or investment motives.",
           "Разделение аудитории по общим характеристикам/потребностям для таргетинга. В PM — по целям визита, типу резидента, инвестиционным мотивам."),
        oq(PART_II, "c", "Positioning", "Позиционирование",
           "Occupying a distinctive position in the target audience's mind versus competitors. For a place: a unique image and value promise.",
           "Занятие отличительного места в сознании целевой аудитории относительно конкурентов. Для места — уникальный образ и обещание ценности."),
        oq(PART_II, "d", "Natural Shopping Center: strengths and weaknesses",
           "Natural Shopping Center: сильные и слабые стороны",
           "Strengths: authenticity, independent retail mix, experience. Weaknesses: harder coordination, funding challenges, competition from malls, parking/access issues.",
           "Сильные: аутентичность, mix independent retail, experience. Слабые: координация сложнее, финансирование, конкуренция с malls, parking/access."),
        oq(PART_III, "1", "Describe how the Universities could adopt a 'onlife' approach and the relations with the place.",
           "Как университеты могут использовать onlife и связь с местом",
           "Onlife blends online and offline. Universities: hybrid learning, digital services plus campus/city as a living lab, local community engagement, and territorial branding.",
           "Onlife — слияние online/offline. Университет: гибридное обучение, цифровые сервисы + кампус/город как living lab, вовлечение местного сообщества, бренд территории."),
        oq(PART_III, "2", "Which are relationships between Strategy + Substance + Symbolic actions?",
           "Связь Strategy, Substance и Symbolic actions",
           "Strategy sets direction and goals; Substance delivers real projects/infrastructure; Symbolic covers signs, events, and communication. They must align—symbols without substance erode trust.",
           "Strategy — направление и цели; Substance — реальные проекты/инфраструктура; Symbolic — знаки, события, коммуникация. Должны быть согласованы: символы без substance → недоверие."),
        oq(PART_III, "3", "Nature and role of Key Performance Indicators in Town Centre Management.",
           "KPI в Town Centre Management",
           "KPIs track footfall, vacancy, safety, spend, satisfaction. They enable monitoring, partner accountability, plan adjustment, and proof of impact for funding.",
           "KPI измеряют footfall, vacancy, safety, spend, satisfaction. Роль: мониторинг, accountability партнёров, корректировка плана, доказательство эффекта для финансирования."),
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
           "An index of country perception across dimensions (culture, tourism, investment, etc.). Used to benchmark national brand performance and inform place branding policy.",
           "Индекс восприятия страны по измерениям (culture, tourism, investment и др.). Используется для бенчмарка национального бренда и политики place branding."),
        oq(PART_II, "b", "Marketing researches", "Маркетинговые исследования",
           "Collecting data on place users/consumers: surveys, focus groups, flow analytics. Foundation for segmentation, positioning, and campaign evaluation.",
           "Сбор данных о потребителях/пользователях места: опросы, фокус-группы, аналитика потоков. Основа для сегментации, позиционирования и оценки кампаний."),
        oq(PART_II, "c", "Targeting, positioning and segmentation",
           "Targeting, positioning and segmentation",
           "STP: segmentation → target segment choice → positioning for them. In PM applied separately to tourists, residents, and investors.",
           "STP: сегментация → выбор целевых сегментов → позиционирование для них. В PM применяется к туристам, резидентам, инвесторам отдельно."),
        oq(PART_II, "d", "The Place Brand is:",
           "Place Brand — это:",
           "The set of associations and promises about a place; a managed image aligned with real experience. More than logo/slogan—it is equity in the audience's mind.",
           "Совокупность ассоциаций и обещаний о месте; управляемый образ, согласованный с реальным опытом. Отличается от logo/slogan — это equity в сознании аудитории."),
        oq(PART_III, "1", "What's about Place Marketing value co-creation driven?",
           "Place Marketing value co-creation driven",
           "An approach where place value is created jointly with stakeholders (citizens, business, government). Planning, services, and brand are built through participation, not top-down.",
           "Подход, где ценность места создаётся совместно со стейкхолдерами (граждане, бизнес, власть). Планирование, сервисы и бренд — через участие, а не top-down."),
        oq(PART_III, "2", "Describing the place marketing plan",
           "Place marketing plan",
           "A document covering analysis (SWOT, stakeholders), goals, segments, positioning, action mix, budget, KPIs, and governance. Links strategy to operations.",
           "Документ: анализ (SWOT, stakeholders), цели, сегменты, positioning, mix действий, бюджет, KPI, governance. Связывает стратегию и операционные мероприятия."),
        oq(PART_III, "3", "What's about relation between technology-knowledge-information diffusion and engagement of the actors and Place Marketing (explain the matrix)",
           "Матрица: технология–знание–диффузия информации и вовлечённость",
           "Axes: information diffusion (low→high) and actor engagement. High diffusion + high engagement → co-creation and onlife; low → passive users. PM chooses tools by quadrant.",
           "Ось диффузии (низкая→высокая) и вовлечённости акторов. Высокая диффузия + высокая engagement → co-creation и onlife; низкая → пассивные пользователи. PM выбирает инструменты по квадранту."),
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
           "Marketing creates, communicates, and exchanges value. Focus on customer/user value: benefits minus costs. In PM, value differs across stakeholder groups.",
           "Маркетинг создаёт, коммуницирует и обменивает value. Фокус на customer/user value: выгоды минус затраты. В PM — ценность для разных стейкхолдеров."),
        oq(PART_II, "b", "Describe the difficulties in SWOT analysis interpretation.",
           "Сложности интерпретации SWOT",
           "Subjectivity, static snapshots, mixing internal/external factors, list overload without priorities, ignoring S-O/W-T strategy links.",
           "Субъективность, статичность, смешение internal/external, перегруз списками без приоритетов, игнорирование взаимосвязей S-O/W-T стратегий."),
        oq(PART_II, "c", "Describe the Town Centre Management's stages.",
           "Этапы Town Centre Management",
           "Typically: initiation/partnership → centre audit → vision and plan → projects (marketing, safety, events) → KPI monitoring → adjustment.",
           "Обычно: инициация/партнёрство → аудит центра → vision и план → проекты (marketing, safety, events) → мониторинг KPI → корректировка."),
        oq(PART_II, "d", "What's about Business Improvement District.",
           "Business Improvement District (BID)",
           "A zone where businesses vote for an extra levy for improvements (cleaning, security, marketing). A TCM funding model involving the private sector.",
           "Зона, где бизнес голосует за доп. налог/взнос для улучшений (уборка, security, marketing). Модель финансирования TCM с private sector."),
        oq(PART_III, "1", "Why it is suggested to include the 'education and/or training' in place marketing communication?",
           "Зачем включать education/training в коммуникацию PM?",
           "It attracts talent and investors, raises human capital, supports innovation and workforce quality—a key part of the place value proposition.",
           "Привлекает talent и инвесторов, повышает human capital, поддерживает инновации и качество workforce — важный элемент value proposition места."),
        oq(PART_III, "2", "Describe the need to consider internal and external stakeholders in defining the place marketing strategy for a place.",
           "Внутренние и внешние стейкхолдеры в стратегии PM",
           "Internal: residents, business, government—legitimacy and delivery. External: tourists, investors, media—demand and image. Strategy fails without consensus and resources.",
           "Внутренние: резиденты, бизнес, власть — легитимность и реализация. Внешние: туристы, инвесторы, media — спрос и имидж. Стратегия без консенсуса и ресурсов провалится."),
        oq(PART_III, "3", "Please explain the limits in writing a place marketing plan.",
           "Ограничения place marketing plan",
           "Multiple jurisdictions, political cycles, hard-to-measure 'product', stakeholder resistance, limited budgets, fast-changing trends, risk of over-promising.",
           "Несколько юрисдикций, политические циклы, трудно измерить «продукт», сопротивление стейкхолдеров, ограниченный бюджет, быстрая смена трендов, риск over-promising."),
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
           "Micro-environment: competing places, stakeholders, service suppliers. Emergent context: unpredictable trends (crises, technology). PM must adapt to both.",
           "Микросреда: конкуренты-места, stakeholders, suppliers услуг. Emergent context: непредсказуемые тренды (кризисы, технологии). PM должен адаптироваться к обоим."),
        oq(PART_II, "b", "How the demand in place marketing is composed?",
           "Из чего состоит спрос в place marketing?",
           "Demand comes from segments: tourism, residence, business, investment, education. It depends on motives, seasonality, competing places, and accessibility.",
           "Спрос формируют сегменты: tourism, residence, business, investment, education. Зависит от мотивов, сезонности, конкурентных мест, доступности."),
        oq(PART_II, "c", "The relevance of the marketing plan in marketing strategy",
           "Роль marketing plan в стратегии",
           "The plan operationalises strategy: goals, actions, budget, timelines, KPIs. Without a plan, strategy remains a declaration.",
           "План операционализирует стратегию: цели, действия, бюджет, сроки, KPI. Без плана стратегия остаётся декларацией."),
        oq(PART_II, "d", "Describe the positioning",
           "Опишите positioning",
           "Choosing a distinct value proposition in the minds of target users versus alternatives. For a place: key associations (e.g. innovation hub, heritage, lifestyle).",
           "Выбор distinct value proposition в minds of target users vs alternatives. Для места — ключевые ассоциации (e.g. innovation hub, heritage, lifestyle)."),
        oq(PART_III, "1", "Explain the difference between place marketing demand driven and place marketing value co-creation driven.",
           "Demand driven vs value co-creation driven в PM",
           "Demand driven: the place is a product and marketing 'sells' the existing offer. Co-creation: users and stakeholders jointly shape the place experience and value.",
           "Demand driven: место как продукт, маркетинг «продаёт» существующее предложение. Co-creation: пользователи и стейкхолдеры совместно формируют опыт и ценность места."),
        oq(PART_III, "2", "Place Marketing strategy: difficulties in the implementation.",
           "Сложности реализации стратегии PM",
           "Fragmented governance, conflicting interests, poor coordination, short political horizons, measurement difficulties, gap between brand promise and reality.",
           "Фрагментация власти, конфликт интересов, нехватка координации, краткосрочный политический горизонт, сложность измерений, несоответствие brand и reality."),
        oq(PART_III, "3", "What the Place Branding is?",
           "Что такое Place Branding?",
           "Managing a territory's brand: identity, positioning, communication, and experience to build lasting positive associations and competitive advantage.",
           "Управление брендом территории: идентичность, позиционирование, коммуникация, опыт, чтобы создать устойчивые положительные ассоциации и конкурентное преимущество."),
    ]

    exam_08_mcq = [MCQ_STRATEGY, MCQ_STANDARDIZATION_C]
    exam_08_open = [
        oq(PART_II, "a", "Describe the SMART city concept.",
           "Концепция SMART city",
           "A city uses ICT and data to improve service efficiency (mobility, energy, governance), quality of life, and sustainability. In PM it is substance and a draw for talent/investors.",
           "Город использует ICT/данные для эффективности услуг (mobility, energy, governance), качества жизни и устойчивости. В PM — элемент substance и привлекательности для talent/investors."),
        oq(PART_II, "b", "Market segmentation.", "Сегментация рынка",
           "Dividing place users into groups with different needs. Basis for differentiated value propositions and communication channels.",
           "Разделение пользователей места на группы с разными потребностями. Основа для differentiated value propositions и каналов коммуникации."),
        oq(PART_II, "c", "Explain the concept of co-production.",
           "Концепция co-production",
           "The user takes part in producing the service/experience, not only consuming it. In PM: residents and business co-create events, services, and place image.",
           "Пользователь участвует в производстве услуги/опыта (не только потребляет). В PM: жители и бизнес со-создают события, сервисы, имидж места."),
        oq(PART_II, "d", "Distribution in Place Marketing is a critical factor. Why?",
           "Почему distribution критичен в PM?",
           "Without physical and digital accessibility (transport, airports, broadband, wayfinding) target segments cannot access the value proposition.",
           "Без физической и цифровой доступности (транспорт, аэропорты, broadband, wayfinding) целевые сегменты не получают value proposition."),
        oq(PART_III, "1", "Explain the role of the 5 change-generating forces affecting society, companies and territories/places.",
           "5 сил изменений для общества, компаний и территорий",
           "Typically: globalization, technology/digital, sustainability, demographics, governance/policy. They reshape demand for places and require PM strategy adaptation.",
           "Обычно: globalization, technology/digital, sustainability, demographics, governance/policy. Меняют спрос на места и требуют адаптации PM стратегий."),
        oq(PART_III, "2", "Differences between territory and place.",
           "Различия territory и place",
           "Territory is a physical/administrative unit. Place is a socially constructed meaning and experience. Territory is necessary but not sufficient for place.",
           "Territory — физико-административная единица. Place — социально-конструированный смысл и опыт. Territory necessary but not sufficient for place."),
        oq(PART_III, "3", 'Why is it difficult to define the "product" in Place Marketing?',
           "Почему сложно определить product в PM?",
           "The product is a mix of attributes and experiences, public and private, changing over time and co-created by many actors.",
           "Продукт — комплекс атрибутов и переживаний, публичных и частных, меняющийся во времени; co-created многими акторами."),
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


if __name__ == "__main__":
    main()
