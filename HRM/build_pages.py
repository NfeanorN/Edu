#!/usr/bin/env python3
"""Generate HRM HTML test pages."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).parent

TEMPLATE = """<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title_ru}</title>
  <style>
    * {{ box-sizing: border-box; }}
    body {{
      font-family: "Segoe UI", system-ui, sans-serif;
      line-height: 1.65;
      margin: 0;
      padding: 2rem 1rem 3rem;
      color: #1a1a2e;
      background: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);
      min-height: 100vh;
    }}
    .wrap {{ max-width: 860px; margin: 0 auto; }}
    .back {{ margin-bottom: 1rem; }}
    .back a {{ color: #7b4397; text-decoration: none; }}
    .back a:hover {{ text-decoration: underline; }}
    h1 {{
      color: #2c3e50;
      border-bottom: 4px solid #7b4397;
      padding-bottom: 12px;
      font-size: 1.75rem;
    }}
    .sub {{ color: #555; margin: 0.5rem 0 1.5rem; }}
    .rules {{
      background: #fff;
      border-left: 4px solid #7b4397;
      padding: 1rem 1.25rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
    }}
    .section-title {{
      font-size: 1.15rem;
      color: #7b4397;
      margin: 2rem 0 1rem;
      font-weight: 600;
    }}
    .q {{
      background: #fff;
      border-radius: 10px;
      padding: 1.1rem 1.25rem;
      margin: 1rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
      border: 1px solid #e8ecf1;
    }}
    .q.unanswered {{ border-color: #e74c3c; }}
    .q.correct {{ border-color: #27ae60; background: #f6fff9; }}
    .q.wrong {{ border-color: #e74c3c; background: #fff8f8; }}
    .q-num {{ font-weight: 700; color: #7b4397; margin-bottom: 0.35rem; }}
    .q-ru {{ font-size: 1.02rem; margin-bottom: 0.35rem; }}
    .q-en {{ font-size: 0.88rem; color: #666; margin-bottom: 0.75rem; font-style: italic; }}
    .opts {{ display: grid; gap: 0.45rem; }}
    label.opt {{
      display: flex;
      gap: 0.55rem;
      align-items: flex-start;
      padding: 0.45rem 0.55rem;
      border-radius: 6px;
      cursor: pointer;
    }}
    label.opt:hover {{ background: #f3f0f7; }}
  .result-opt {{ cursor: default; }}
    label.opt input {{ margin-top: 0.25rem; flex-shrink: 0; }}
    .opt-ru {{ font-size: 0.95rem; }}
    .opt-en {{ font-size: 0.82rem; color: #777; }}
    .feedback {{
      margin-top: 0.75rem;
      padding: 0.65rem 0.85rem;
      border-radius: 6px;
      font-size: 0.92rem;
    }}
    .feedback.ok {{ background: #e8f8ef; color: #1e7e45; }}
    .feedback.bad {{ background: #fdecea; color: #c0392b; }}
    .open-block {{
      background: #fff;
      border-radius: 10px;
      padding: 1.1rem 1.25rem;
      margin: 1rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,.08);
    }}
    .open-block textarea {{
      width: 100%;
      min-height: 120px;
      margin-top: 0.5rem;
      padding: 0.65rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.95rem;
      resize: vertical;
    }}
    .sample {{
      margin-top: 0.75rem;
      padding: 0.75rem;
      background: #f8f5fc;
      border-radius: 8px;
      border-left: 3px solid #7b4397;
      font-size: 0.9rem;
      white-space: pre-wrap;
    }}
    .matrix-wrap {{ overflow-x: auto; margin: 1rem 0; }}
    table.matrix {{
      border-collapse: collapse;
      font-size: 0.85rem;
      margin: 0 auto;
    }}
    table.matrix th, table.matrix td {{
      border: 1px solid #ccc;
      padding: 4px 8px;
      text-align: center;
    }}
    table.matrix th {{ background: #7b4397; color: #fff; }}
    .actions {{
      position: sticky;
      bottom: 0;
      background: rgba(245,247,250,.95);
      backdrop-filter: blur(6px);
      padding: 1rem 0;
      margin-top: 1.5rem;
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      align-items: center;
    }}
    button {{
      background: #7b4397;
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 600;
    }}
    button:hover {{ background: #6a3784; }}
    button.secondary {{
      background: #fff;
      color: #7b4397;
      border: 2px solid #7b4397;
    }}
    #results {{
      display: none;
      background: #fff;
      border-radius: 12px;
      padding: 1.25rem 1.5rem;
      margin-top: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,.1);
      border: 2px solid #7b4397;
    }}
    #results.visible {{ display: block; }}
    .score {{ font-size: 1.35rem; font-weight: 700; color: #2c3e50; }}
    .score-detail {{ color: #555; margin-top: 0.35rem; }}
    .warn {{ color: #e74c3c; font-weight: 600; margin-top: 0.5rem; }}
    mark.correct-mark {{ background: #d5f5e3; padding: 0 4px; border-radius: 3px; }}
    mark.wrong-mark {{ background: #fadbd8; padding: 0 4px; border-radius: 3px; }}
  </style>
</head>
<body>
  <motion class="wrap">
    <p class="back"><a href="index.html">← К тестам HRM</a></p>
    <h1>{title_ru}</h1>
    <p class="sub">{title_en}</p>
    {rules_html}
    <form id="test-form">
      <motion id="questions"></motion>
      {extra_html}
      <div class="actions">
        <button type="submit">Проверить ответы</button>
        <button type="button" class="secondary" id="reset-btn">Сбросить</button>
      </motion>
    </form>
    <div id="results">
      <div class="score" id="score-text"></motion>
      <p class="score-detail" id="score-detail"></p>
    </div>
  </motion>
  <script>
    const SCORING = {scoring_json};
    const QUESTIONS = {questions_json};
    const OPEN_ITEMS = {open_json};
    const SNA_ITEMS = {sna_json};

    const form = document.getElementById('test-form');
    const container = document.getElementById('questions');
    const resultsBox = document.getElementById('results');

    function renderQuestions() {{
      container.innerHTML = '';
      let currentSection = '';
      QUESTIONS.forEach((q) => {{
        if (q.section && q.section !== currentSection) {{
          currentSection = q.section;
          const h = document.createElement('div');
          h.className = 'section-title';
          h.textContent = q.section;
          container.appendChild(h);
        }}
        const card = document.createElement('div');
        card.className = 'q';
        card.dataset.id = q.id;
        card.innerHTML = `
          <motion class="q-num">Вопрос ${{q.num}}</motion>
          <motion class="q-ru">${{q.ru}}</motion>
          <motion class="q-en">${{q.en}}</motion>
          <motion class="opts">
            ${{q.options.map(o => `
              <label class="opt">
                <input type="radio" name="${{q.id}}" value="${{o.id}}" />
                <span>
                  <motion class="opt-ru"><strong>${{o.id.toUpperCase()}})</strong> ${{o.ru}}</motion>
                  <motion class="opt-en">${{o.en}}</motion>
                </span>
              </label>`).join('')}}
          </motion>
          <motion class="feedback" hidden></motion>`;
        container.appendChild(card);
      }});
    }}

    function renderOpen() {{
      if (!OPEN_ITEMS.length) return;
      const h = document.createElement('motion');
      h.className = 'section-title';
      h.textContent = 'Открытые вопросы';
      container.appendChild(h);
      OPEN_ITEMS.forEach((item, idx) => {{
        const block = document.createElement('div');
        block.className = 'open-block';
        block.innerHTML = `
          <motion class="q-num">${{item.title_ru}}</motion>
          <motion class="q-ru">${{item.ru}}</motion>
          <motion class="q-en">${{item.en}}</motion>
          <textarea name="open_${{idx}}" placeholder="Ваш ответ..."></textarea>
          <motion class="sample" hidden></motion>`;
        block.querySelector('.sample').textContent = item.sample_ru;
        container.appendChild(block);
      }});
    }}

    function renderSna() {{
      if (!SNA_ITEMS.length) return;
      const h = document.createElement('motion');
      h.className = 'section-title';
      h.textContent = 'SNA — расчёты';
      container.appendChild(h);
      SNA_ITEMS.forEach((item, idx) => {{
        const block = document.createElement('div');
        block.className = 'open-block';
        block.innerHTML = `
          <motion class="q-ru">${{item.ru}}</motion>
          <motion class="q-en">${{item.en}}</motion>
          <input type="text" name="sna_${{idx}}" style="width:100%;padding:0.65rem;border:1px solid #ddd;border-radius:8px;margin-top:0.5rem;" placeholder="Ваш ответ..." />
          <motion class="feedback" hidden></motion>`;
        block.dataset.expected = item.expected;
        block.dataset.accept = JSON.stringify(item.accept || []);
        container.appendChild(block);
      }});
    }}

    function normalize(val) {{
      return String(val || '').trim().toLowerCase().replace(/\\s+/g, ' ');
    }}

    function checkSnaAnswer(expected, accept, user) {{
      const n = normalize(user);
      if (!n) return null;
      const variants = [expected, ...(accept || [])].map(normalize);
      return variants.some(v => n === v || n.includes(v) || v.includes(n));
    }}

    form.addEventListener('submit', (e) => {{
      e.preventDefault();
      let unanswered = 0;
      let correct = 0;
      let wrong = 0;

      QUESTIONS.forEach((q) => {{
        const card = container.querySelector(`[data-id="${{q.id}}"]`);
        const selected = form.querySelector(`input[name="${{q.id}}"]:checked`);
        const fb = card.querySelector('.feedback');
        fb.hidden = false;
        card.classList.remove('unanswered', 'correct', 'wrong');

        if (!selected) {{
          unanswered++;
          card.classList.add('unanswered');
          fb.className = 'feedback bad';
          fb.innerHTML = '⚠️ Ответ не выбран. Правильный: <mark class="correct-mark">' + q.correct.toUpperCase() + '</mark>';
          return;
        }}

        const ok = selected.value === q.correct;
        if (ok) {{
          correct++;
          card.classList.add('correct');
          fb.className = 'feedback ok';
          fb.textContent = '✓ Верно';
        }} else {{
          wrong++;
          card.classList.add('wrong');
          fb.className = 'feedback bad';
          fb.innerHTML = '✗ Неверно. Ваш ответ: <mark class="wrong-mark">' + selected.value.toUpperCase() +
            '</mark>. Правильный: <mark class="correct-mark">' + q.correct.toUpperCase() + '</mark>';
        }}

        card.querySelectorAll('label.opt').forEach((lbl) => {{
          const inp = lbl.querySelector('input');
          lbl.classList.add('result-opt');
          if (inp.value === q.correct) lbl.style.background = '#e8f8ef';
          if (inp.checked && inp.value !== q.correct) lbl.style.background = '#fdecea';
          inp.disabled = true;
        }});
      }});

      container.querySelectorAll('.open-block .sample').forEach(el => {{ el.hidden = false; }});

      container.querySelectorAll('.open-block .feedback').forEach((fb, i) => {{
        const block = fb.closest('.open-block');
        if (!block.dataset.expected) return;
        const inp = block.querySelector('input');
        const ok = checkSnaAnswer(block.dataset.expected, JSON.parse(block.dataset.accept || '[]'), inp.value);
        fb.hidden = false;
        if (ok === null) {{
          fb.className = 'feedback bad';
          fb.innerHTML = '⚠️ Пустой ответ. Эталон: <mark class="correct-mark">' + block.dataset.expected + '</mark>';
        }} else if (ok) {{
          fb.className = 'feedback ok';
          fb.textContent = '✓ Верно';
        }} else {{
          fb.className = 'feedback bad';
          fb.innerHTML = '✗ Неверно. Эталон: <mark class="correct-mark">' + block.dataset.expected + '</mark>';
        }}
      }});

      const total = QUESTIONS.length;
      let score = correct * SCORING.correct + wrong * SCORING.wrong;
      if (SCORING.max !== null) score = Math.max(0, Math.min(SCORING.max, score));

      document.getElementById('score-text').textContent =
        `Результат: ${{correct}} из ${{total}} (${{Math.round(correct/total*100)}}%)`;
      document.getElementById('score-detail').textContent =
        SCORING.correct !== 1 || SCORING.wrong !== 0
          ? `Баллы: ${{score.toFixed(1)}} · Верно: ${{correct}} · Неверно: ${{wrong}} · Без ответа: ${{unanswered}}`
          : `Верно: ${{correct}} · Неверно: ${{wrong}} · Без ответа: ${{unanswered}}`;

      resultsBox.classList.add('visible');
      resultsBox.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
    }});

    document.getElementById('reset-btn').addEventListener('click', () => {{
      form.reset();
      resultsBox.classList.remove('visible');
      renderQuestions();
      renderOpen();
      renderSna();
      {extra_render}
    }});

    renderQuestions();
    renderOpen();
    renderSna();
    {extra_init}
  </script>
</body>
</html>
"""

INDEX = """<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HRM — Тесты / Human Resource Management</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: "Segoe UI", system-ui, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 2rem;
      color: #1a1a2e;
      background: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);
      min-height: 100vh;
    }
    .wrap { max-width: 800px; margin: 0 auto; }
    h1 {
      color: #2c3e50;
      border-bottom: 4px solid #7b4397;
      padding-bottom: 12px;
    }
    .sub { color: #555; }
    .topics { list-style: none; padding: 0; margin: 1.5rem 0; }
    .topics li { margin: 0.6rem 0; }
    .topics a {
      display: block;
      padding: 1rem 1.2rem;
      background: #fff;
      border-radius: 10px;
      text-decoration: none;
      color: #2c3e50;
      border: 1px solid #e0e6ed;
      transition: border-color .2s, box-shadow .2s;
    }
    .topics a:hover {
      border-color: #7b4397;
      box-shadow: 0 4px 12px rgba(123, 67, 151, 0.15);
    }
    .title { font-weight: 600; font-size: 1.05rem; }
    .desc { color: #666; font-size: 0.88rem; margin-top: 4px; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Human Resource Management</h1>
    <p class="sub">Управление персоналом — интерактивные тесты с проверкой ответов и переводом на русский</p>
    <ul class="topics">
      <li><a href="01_HRM_Practice_Test.html"><span class="title">01 — HRM Practice Test</span><span class="desc">27 вопросов с вариантами + открытые вопросы и кейс Kendall Toy (по PDF HRM)</span></a></li>
      <li><a href="02_HRM_Exam_CFU6.html"><span class="title">02 — HRM Exam CFU 6</span><span class="desc">15 MCQ + открытый вопрос по Herzberg (экзамен HR)</span></a></li>
      <li><a href="03_Digital_Innovation_Exam_CFU6.html"><span class="title">03 — Digital Innovation Exam CFU 6</span><span class="desc">14 MCQ по DI + SNA-задание + 5 MCQ по сети (экзамен HR/DI)</span></a></li>
    </ul>
  </motion>
</body>
</html>
"""


def opt(letter: str, en: str, ru: str) -> dict:
    return {"id": letter, "en": en, "ru": ru}


def q(num, en, ru, options, correct, section=None, qid=None):
    return {
        "num": num,
        "id": qid or f"q{num}",
        "en": en,
        "ru": ru,
        "options": options,
        "correct": correct,
        "section": section,
    }


def write_page(filename, title_ru, title_en, questions, open_items=None, sna_items=None,
               rules_html="", extra_html="", extra_init="", extra_render="", scoring=None):
    html = TEMPLATE.format(
        title_ru=title_ru,
        title_en=title_en,
        rules_html=rules_html,
        extra_html=extra_html,
        extra_init=extra_init,
        extra_render=extra_render,
        scoring_json=json.dumps(scoring or {"correct": 1, "wrong": 0, "max": None}),
        questions_json=json.dumps(questions, ensure_ascii=False),
        open_json=json.dumps(open_items or [], ensure_ascii=False),
        sna_json=json.dumps(sna_items or [], ensure_ascii=False),
    )
    html = html.replace("<motion", "<motion").replace("</motion>", "</div>")
    html = html.replace("<motion", "<motion").replace("</motion>", "</motion>")
    # fix accidental motion tags from template escaping
    html = html.replace("<motion", "<div").replace("</motion>", "</motion>")
    (ROOT / filename).write_text(html, encoding="utf-8")


def main():
    none_en = "None of the other answers: answers is correct"
    none_ru = "Ни один из других ответов не верен"
    none = opt("e", none_en, none_ru)

    # --- Practice test from HRM (2).pdf ---
    practice = []

    s1 = "Часть 1 — Стратегический HRM и подбор персонала"
    practice += [
        q(1,
          "HRM's relation to strategic management:",
          "Связь HRM со стратегическим менеджментом:",
          [
              opt("a", "Shows that an investment in HRM is not good expenditure of revenues", "Показывает, что инвестиции в HRM — неэффективные расходы"),
              opt("b", "Strategic management does not concern itself with employees' skills, knowledge, and abilities as HRM does", "Стратегический менеджмент не занимается навыками и знаниями сотрудников, в отличие от HRM"),
              opt("c", "Has grown substantially in the past 10 years", "Значительно усилилась за последние 10 лет"),
              opt("d", "None of the other answers is correct", none_ru),
              opt("e", "Is viewed by 80% of executives as less close today than in the past", "80% топ-менеджеров считают, что связь стала слабее"),
          ], "c", s1),
        q(2,
          "Managing 'human capital' refers to:",
          "Управление «человеческим капиталом» включает:",
          [
              opt("a", "The combination and sum of all the other answers", "Комбинацию и совокупность всех перечисленных элементов"),
              opt("b", "Recruiting the best talent available", "Подбор лучших талантов"),
              opt("c", "Utilizing current knowledge", "Использование текущих знаний"),
              opt("d", "Design policies and systems to align individual goals with the organization's ones", "Разработку политик для согласования целей сотрудников и организации"),
              opt("e", "Providing development assignments", "Предоставление заданий для развития"),
          ], "a", s1),
        q(3,
          "The steps in conducting a needs assessment include all of the following EXCEPT:",
          "Этапы оценки потребностей в обучении включают всё, КРОМЕ:",
          [
              opt("a", "Task analysis", "Анализ задач"),
              opt("b", "Person analysis", "Анализ персонала"),
              opt("c", "Organizational analysis", "Организационный анализ"),
              opt("d", "None of the other answer is correct", none_ru),
              opt("e", "All of the above are part of the needs assessment", "Все перечисленное входит в оценку потребностей"),
          ], "e", s1),
        q(4,
          "Considering Recruiting:",
          "Что верно о рекрутинге:",
          [
              opt("a", "None of the other answers is correct", none_ru),
              opt("b", "It is not only to select appropriate candidates, but also to send the desired information to the job market", "Это не только отбор кандидатов, но и передача нужного имиджа на рынок труда"),
              opt("c", "It is disconnected from the organizational strategic choices", "Не связан со стратегическими решениями организации"),
              opt("d", "Its only target is to reduce hiring costs", "Его единственная цель — снизить затраты на найм"),
              opt("e", "It is a mono-directional communication channel (from candidate towards the company)", "Это односторонний канал (от кандидата к компании)"),
          ], "b", s1),
        q(5,
          "Considering the selection methods:",
          "О методах отбора:",
          [
              opt("a", "Personality tests identify, without possible mistake, the specific personality type of the candidate", "Личностные тесты безошибочно определяют тип личности"),
              opt("b", "In face-to-face interviews it is always better to have only one recruiter", "В интервью всегда лучше один интервьюер"),
              opt("c", "None of the other answers is correct", none_ru),
              opt("d", "Behavioral interviewing is one of the best predictors of future performance", "Поведенческое интервью — один из лучших предикторов будущей эффективности"),
              opt("e", "Group simulations are useful only for creative positions", "Групповые симуляции полезны только для творческих должностей"),
          ], "d", s1),
        q(6,
          "Talent Management:",
          "Talent Management (управление талантами):",
          [
              opt("a", "Is mainly based on the psychological characteristics of potential employees", "Основано главным образом на психологических характеристиках"),
              opt("b", "Was more important in the 80's than today", "Было важнее в 80-х, чем сегодня"),
              opt("c", "None of the other answers is correct", none_ru),
              opt("d", "Is only focused on selecting talented employees", "Сосредоточено только на отборе талантов"),
              opt("e", "Is disconnected from the strategic choices of the organization", "Не связано со стратегическими решениями организации"),
          ], "c", s1),
        q(7,
          "The critical incident method:",
          "Метод критических инцидентов:",
          [
              opt("a", "Refers to a disagreement between an employer and employee", "Описывает конфликт между работодателем и работником"),
              opt("b", "Identifies critical job tasks", "Выявляет критически важные рабочие задачи"),
              opt("c", "Refers directly to employees to determine which tasks are most critical in day-to-day interaction", "Напрямую опрашивает сотрудников о важнейших задачах"),
              opt("d", "Is an investigation by the safety department", "Расследование отдела безопасности"),
              opt("e", "None of the other answers is correct", none_ru),
          ], "b", s1),
        q(8,
          "Job analysis:",
          "Анализ работы (job analysis):",
          [
              opt("a", "Outlines in detail the specific knowledge, skills, abilities required of the person performing the job", "Подробно описывает KSA, необходимые для выполнения работы"),
              opt("b", "None of the other answers is correct", none_ru),
              opt("c", "Is the systematic process of collecting information about all of the parameters of a job", "Систематический сбор информации обо всех параметрах должности"),
              opt("d", "Can be performed only via interviews", "Можно проводить только через интервью"),
              opt("e", "Is a written statement about the overall tasks, duties and responsibilities of a job", "Письменное описание задач, обязанностей и ответственности"),
          ], "c", s1),
        q(9,
          "The organization-specific list of activities, their description and how-to are called:",
          "Организационный перечень видов деятельности с описанием и инструкциями называется:",
          [
              opt("a", "Task inventory", "Task inventory (инвентаризация задач)"),
              opt("b", "None of the other answers is correct", none_ru),
              opt("c", "Job specification", "Job specification (спецификация должности)"),
              opt("d", "Task diary", "Task diary (дневник задач)"),
              opt("e", "Job Analysis", "Job Analysis"),
          ], "a", s1),
        q(10,
          "Job description:",
          "Должностная инструкция (job description):",
          [
              opt("a", "Is a written statement about the overall tasks, duties and responsibilities of a job", "Письменное описание задач, обязанностей и ответственности должности"),
              opt("b", "Is the systematic process of collecting information about all parameters of a job", "Систематический процесс сбора информации о должности"),
              opt("c", "Can be performed only via surveys and direct observation", "Проводится только через опросы и наблюдение"),
              opt("d", "Outlines in detail the KSA required of the person performing the job", "Подробно описывает KSA исполнителя"),
              opt("e", "None of the other answers is correct", none_ru),
          ], "a", s1),
        q(11,
          "Which statement best describes an appraisal interview?",
          "Какое утверждение лучше описывает appraisal interview?",
          [
              opt("a", "They cover few topics during these interviews", "На интервью обсуждают мало тем"),
              opt("b", "An appraisal interview gives a manager the opportunity to discuss a subordinate's performance and explore areas of improvement and growth", "Даёт менеджеру возможность обсудить результаты подчинённого и зоны роста"),
              opt("c", "It is focused on shortcomings of employees and the manager", "Сосредоточено на недостатках сотрудника и менеджера"),
              opt("d", "It establishes a one-way communication", "Строится как односторонняя коммуникация"),
              opt("e", "None of the other answers is correct", none_ru),
          ], "b", s1),
        q(12,
          "MBOs (Managing by Objectives):",
          "MBO (управление по целям):",
          [
              opt("a", "None of the other answers is correct", none_ru),
              opt("b", "Was proposed for the first time by Peter Drucker", "Впервые предложено Питером Дrucker"),
              opt("c", "Goals are set by mutual agreement of employees and manager", "Цели устанавливаются по взаимному согласию сотрудника и менеджера"),
              opt("d", "Is a cycle that starts with line employees and ends with top management", "Цикл начинается с линейных сотрудников и заканчивается топ-менеджментом"),
              opt("e", "They are usually not linked with the objective of the organization", "Обычно не связаны с целями организации"),
          ], "c", s1),
        q(13,
          "Peer appraisals:",
          "Оценка коллегами (peer appraisals):",
          [
              opt("a", "Managers tend not to account them due to poor reliability", "Менеджеры не используют их из-за низкой надёжности"),
              opt("b", "None of the other answers is correct", none_ru),
              opt("c", "Due to friendship they often contain biased information", "Из-за дружбы часто содержат предватые оценки"),
              opt("d", "Usually differ to some degree from ratings by a superior, since peers see different dimensions of performance", "Обычно отличаются от оценки начальника, т.к. видят другие аспекты работы"),
              opt("e", "Are believed to be less valid than appraisals by superiors", "Считаются менее валидными, чем оценки руководителя"),
          ], "d", s1),
        q(14,
          "According to bounded rationality theory:",
          "Согласно теории ограниченной рациональности:",
          [
              opt("a", "When making a decision, we are able to objectively evaluate and select the best alternatives", "Мы можем объективно выбрать лучшую альтернативу"),
              opt("b", "None of the other answers is correct", none_ru),
              opt("c", "Even with constraints we are able to pick the best choice", "Даже с ограничениями мы выбираем лучший вариант"),
              opt("d", "As individuals we can understand and decompose a problem in all its parts", "Мы можем полностью декомпозировать проблему"),
              opt("e", "As individuals and groups we are always able to make the best decisions", "Мы всегда принимаем оптимальные решения"),
          ], "b", s1),
    ]

    s2 = "Часть 2 — Организационные изменения и обучение"
    practice += [
        q(15,
          "Rethinking and redesigning business processes to achieve improvements in cost, quality, service, and speed refers to:",
          "Переосмысление и перепроектирование бизнес-процессов для улучшения стоимости, качества, сервиса и скорости — это:",
          [
              opt("a", "Downsizing", "Сокращение штата (downsizing)"),
              opt("b", "Reengineering", "Реинжиниринг (reengineering)"),
              opt("c", "Outsourcing", "Аутсорсинг"),
              opt("d", "None of the other answers is correct", none_ru),
              opt("e", "Employee leasing", "Аренда персонала"),
          ], "b", s2, "q15"),
        q(16,
          "Which of these statements about cultural change is true?",
          "Какое утверждение об изменении культуры верно?",
          [
              opt("a", "Attitudes, beliefs, values and customs have little or no effect on behavior on the job", "Установки и ценности почти не влияют на поведение на работе"),
              opt("b", "None of the other answers is correct", none_ru),
              opt("c", "HR policies do not need adjustments due to cultural change", "HR-политики не нужно менять из-за культуры"),
              opt("d", "Cultures change very little and maintain the same values for hundreds of years", "Культуры почти не меняются сотнями лет"),
              opt("e", "HRM has become less complex than when employees were concerned primarily with economic survival", "HRM стало проще, чем в эпоху экономического выживания"),
          ], "b", s2, "q16"),
        q(17,
          "Which of the following statements about change is true?",
          "Какое утверждение об изменениях верно?",
          [
              opt("a", "Successful change rarely occurs naturally or easily", "Успешные изменения редко происходят сами собой и легко"),
              opt("b", "Change is temporary and will have little effect on how things are done", "Изменения временны и почти не влияют на работу"),
              opt("c", "Communication has little effect on successful change implementation", "Коммуникация почти не влияет на успех изменений"),
              opt("d", "None of the other answers is correct", none_ru),
              opt("e", "Change projects rarely fail because of people", "Проекты изменений редко проваливаются из-за людей"),
          ], "a", s2, "q17"),
        q(18,
          "The so-called Talent Inventory (skill and management inventories):",
          "Talent Inventory (инвентаризация навыков и кадрового резерва):",
          [
              opt("a", "None of the other answers is correct", none_ru),
              opt("b", "Represents an outdated way of performing HRM", "Устаревший способ ведения HRM"),
              opt("c", "Represents opinions of supervisors about future employment needs", "Мнения руководителей о будущих потребностях"),
              opt("d", "Is part of identifying, developing and tracking key individuals for the organization", "Часть процесса выявления, развития и отслеживания ключевых сотрудников"),
              opt("e", "Is a quantitative approach to forecasting labor demand", "Количественный метод прогноза спроса на труд"),
          ], "d", s2, "q18"),
        q(19,
          "The major disadvantage of flextime is:",
          "Главный недостаток гибкого графика (flextime):",
          [
              opt("a", "Employees feel overwhelmed by fixed hours per week", "Сотрудники перегружены фиксированными часами"),
              opt("b", "Employees might not adjust their schedule", "Сотрудники не готовы менять расписание"),
              opt("c", "It can't be suitable for all types of jobs", "Подходит не для всех видов работ"),
              opt("d", "None of the other answers is correct", none_ru),
              opt("e", "It increases startup and close-down time", "Увеличивает время запуска и закрытия"),
          ], "c", s2, "q19"),
        q(20,
          "The most critical step in reaching a selection decision is:",
          "Самый критичный шаг при принятии решения об отборе:",
          [
              opt("a", "The consideration of irrelevant information about applicants", "Учёт нерелевантной информации о кандидатах"),
              opt("b", "The result of the interview with the manager in the respective unit", "Результат интервью с менеджером подразделения"),
              opt("c", "Measuring what an employee can do, not what he/she will do", "Измерение того, что сотрудник может, а не будет делать"),
              opt("d", "None of the other answers is correct", none_ru),
              opt("e", "The decision to accept or reject an applicant", "Решение принять или отклонить кандидата"),
          ], "e", s2, "q20"),
        q(21,
          "Human Resource Planning:",
          "Кадровое планирование (Human Resource Planning):",
          [
              opt("a", "The basic purpose of the organization and scope of operations", "Базовая цель и сфера деятельности организации"),
              opt("b", "None of the other answers is correct", none_ru),
              opt("c", "Allows the organization to understand what are the needs of the organization", "Позволяет понять потребности организации"),
              opt("d", "Involves procedures for long-term goals and strategies", "Процедуры для долгосрочных целей и стратегий"),
              opt("e", "Is the process of anticipating and making provision for the movement of people into, within, and out of an organization", "Процесс прогнозирования и обеспечения движения людей внутрь, внутри и из организации"),
          ], "e", s2, "q21"),
        q(22,
          "Focusing on core competencies has led companies to:",
          "Фокус на ключевых компетенциях привёл компании к:",
          [
              opt("a", "Outsource their own employees", "Аутсорсингу собственных сотрудников"),
              opt("b", "Have lower employee productivity", "Снижению продуктивности"),
              opt("c", "None of the other answer is correct", none_ru),
              opt("d", "Hire only through temporary staffing services", "Найму только через temp-агентства"),
              opt("ST("e", "Increase HR budgets considerably", "Значительному росту HR-бюджетов"),
          ], "c", s2, "q22"),
    ]
