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
  <div class="wrap">
    <p class="back"><a href="index.html">← К тестам HRM</a></p>
    <h1>{title_ru}</h1>
    <p class="sub">{title_en}</p>
    {rules_html}
    <form id="test-form">
      <div id="questions"></div>
      {extra_html}
      <div class="actions">
        <button type="submit">Проверить ответы</button>
        <button type="button" class="secondary" id="reset-btn">Сбросить</button>
      </div>
    </form>
    <div id="results">
      <div class="score" id="score-text"></div>
      <p class="score-detail" id="score-detail"></p>
      <p class="warn" id="warn-text" hidden></p>
    </div>
  </div>
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
          <div class="q-num">Вопрос ${{q.num}}</div>
          <div class="q-ru">${{q.ru}}</div>
          <div class="q-en">${{q.en}}</div>
          <div class="opts">
            ${{q.options.map(o => `
              <label class="opt">
                <input type="radio" name="${{q.id}}" value="${{o.id}}" />
                <span>
                  <div class="opt-ru"><strong>${{o.id.toUpperCase()}})</strong> ${{o.ru}}</div>
                  <div class="opt-en">${{o.en}}</div>
                </span>
              </label>`).join('')}}
          </div>
          <div class="feedback" hidden></div>`;
        container.appendChild(card);
      }});
    }}

    function renderOpen() {{
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
    }}

    function renderSna() {{
      if (!SNA_ITEMS.length) return;
      const h = document.createElement('div');
      h.className = 'section-title';
      h.textContent = 'SNA — расчёты';
      container.appendChild(h);
      SNA_ITEMS.forEach((item, idx) => {{
        const block = document.createElement('div');
        block.className = 'open-block';
        block.innerHTML = `
          <div class="q-ru">${{item.ru}}</div>
          <div class="q-en">${{item.en}}</div>
          <input type="text" name="sna_${{idx}}" style="width:100%;padding:0.65rem;border:1px solid #ddd;border-radius:8px;margin-top:0.5rem;" placeholder="Ваш ответ..." />
          <div class="feedback" hidden></div>`;
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
      const warnEl = document.getElementById('warn-text');

      QUESTIONS.forEach((q) => {{
        const card = container.querySelector(`[data-id="${{q.id}}"]`);
        const selected = form.querySelector(`input[name="${{q.id}}"]:checked`);
        card.classList.remove('unanswered', 'correct', 'wrong');
        const fb = card.querySelector('.feedback');
        fb.hidden = true;
        fb.textContent = '';
        card.querySelectorAll('label.opt').forEach((lbl) => {{
          lbl.classList.remove('result-opt');
          lbl.style.background = '';
          lbl.querySelector('input').disabled = false;
        }});
        if (!selected) {{
          unanswered++;
          card.classList.add('unanswered');
        }}
      }});

      if (unanswered > 0) {{
        resultsBox.classList.remove('visible');
        warnEl.hidden = false;
        warnEl.textContent = `Ответьте на все вопросы с вариантами (${{unanswered}} без ответа).`;
        const first = container.querySelector('.q.unanswered');
        if (first) first.scrollIntoView({{ behavior: 'smooth', block: 'center' }});
        return;
      }}
      warnEl.hidden = true;

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
      document.getElementById('warn-text').hidden = true;
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
    <p class="sub" style="font-size:0.92rem;margin-top:-0.75rem">Источник экзамена: <strong>Exam HR _DI (1).pdf</strong> — вопросы 1–15 (HRM) и 1–14 + SNA (DI)</p>
    <ul class="topics">
      <li><a href="01_HRM_Practice_Test.html"><span class="title">01 — HRM Practice Test</span><span class="desc">27 MCQ + открытые вопросы и кейс Kendall Toy (PDF: HRM (2).pdf)</span></a></li>
      <li><a href="02_HRM_Exam_CFU6.html"><span class="title">02 — HRM Exam CFU 6</span><span class="desc">15 MCQ + открытый вопрос Herzberg ← <strong>Exam HR _DI</strong>, стр. 1–3</span></a></li>
      <li><a href="03_Digital_Innovation_Exam_CFU6.html"><span class="title">03 — Digital Innovation Exam CFU 6</span><span class="desc">14 MCQ + SNA (матрица, расчёты, MCQ 16–20) ← <strong>Exam HR _DI</strong>, стр. 4–7</span></a></li>
    </ul>
  </div>
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
              opt("e", "Increase HR budgets considerably", "Значительному росту HR-бюджетов"),
          ], "c", s2, "q22"),
        q(23,
          "The organization core value is:",
          "Ключевая ценность организации (core value):",
          [
              opt("a", "The long term perspective on what the organization will become", "Долгосрочное видение того, чем станет организация"),
              opt("b", "A clear statement indicating how activities are performed within the organization", "Чёткое описание того, как выполняются действия в организации"),
              opt("c", "The set of enduring beliefs and principles moving the organization as a whole", "Набор устойчивых убеждений и принципов, движущих организацию"),
              opt("d", "The basic purpose of the organization and scope of operations and reason to be", "Основная цель организации и причина её существования"),
              opt("e", "None of the other answer is correct", none_ru),
          ], "c", s2, "q23"),
        q(24,
          "The main sources of information for a job analysis:",
          "Основные источники информации для job analysis:",
          [
              opt("a", "Are questionnaires filled in by all employees", "Анкеты всех сотрудников"),
              opt("b", "Are direct observation and diaries of employees", "Прямое наблюдение и дневники сотрудников"),
              opt("c", "None of the other answers is correct", none_ru),
              opt("d", "Interviews with people performing tasks on a daily basis", "Интервью с людьми, ежедневно выполняющими задачи"),
              opt("e", "Are all the techniques mentioned in the options", "Все перечисленные техники"),
          ], "e", s2, "q24"),
        q(25,
          "Behavioral modelling:",
          "Поведенческое моделирование (behavioral modelling):",
          [
              opt("a", "Shows low level of effectiveness", "Имеет низкую эффективность"),
              opt("b", "None of the other answers is correct", none_ru),
              opt("c", "Does not require the approval of managers or peers", "Не требует одобрения менеджеров или коллег"),
              opt("d", "Is a way to shape employees' behavior by showing them how they should behave and making them rehearse those behaviors", "Формирует поведение через демонстрацию и репетицию"),
              opt("e", "Is a way to shape employees' behavior by telling them how they should behave on a daily basis", "Формирует поведение через ежедневные указания"),
          ], "d", s2, "q25"),
        q(26,
          "The maximum amount of freedom for the applicant in determining the course of the discussion is the:",
          "Максимальная свобода кандидата в определении хода беседы — у:",
          [
              opt("a", "Non-directive interview", "Недирективного интервью (non-directive interview)"),
              opt("b", "Behavioral description interview", "Интервью с описанием поведения"),
              opt("c", "Panel interview", "Панельного интервью"),
              opt("d", "Directive interview", "Директивного интервью"),
              opt("e", "None of the other answers is correct", none_ru),
          ], "a", s2, "q26"),
        q(27,
          "A major consideration in implementing training needs is:",
          "Главное при внедрении программы обучения:",
          [
              opt("a", "The instructional methods in implementing a training program", "Методы обучения при реализации программы"),
              opt("b", "To ignore technological advantages in training and rely on the skills of trainers", "Игнорировать технологии и полагаться только на тренеров"),
              opt("c", "None of the other answers is correct", none_ru),
              opt("d", "A limited variety of methods is available for training employees at all levels", "Ограниченный набор методов для всех уровней"),
              opt("e", "If the material is factual, with no emphasis on behavioral component", "Только если материал фактологический"),
          ], "a", s2, "q27"),
    ]

    practice_open = [
        {
            "title_ru": "Открытый вопрос 1",
            "ru": "Опишите компоненты и характеристики job design и job analysis.",
            "en": "Describe the components and characteristics of job design and job analysis.",
            "sample_ru": "Job design (Hackman–Oldham): 1) разнообразие навыков, 2) целостность задачи, 3) значимость задачи, 4) автономия, 5) обратная связь.\n\nJob analysis: название должности, краткое описание, обязанности, KSAO, образование и опыт, физические требования, условия труда, оборудование, связи с другими, стандарты performance.",
        },
        {
            "title_ru": "Открытый вопрос 2",
            "ru": "Определите кривую заработной платы (wage/salary curve) и опишите её структуру. Какие типы кривых возможны и как их интерпретировать?",
            "en": "Define the wage/salary curve and describe its structure. Which kinds can you face and how can you interpret them?",
            "sample_ru": "Wage curve показывает связь относительной ценности должностей и уровня оплаты; строится при job evaluation для справедливой компенсации. Может сравнивать зарплаты компании с рынком. Типы: линейная, ступенчатая, freehand curve при несоответствии рынку.",
        },
        {
            "title_ru": "Открытый вопрос 3",
            "ru": "Что такое enterprise incentive plan? Приведите примеры (profit sharing, stock options и др.), опишите различия и где они применимы.",
            "en": "What is an enterprise incentive plan? Provide examples describing their differences and which setting they fit best.",
            "sample_ru": "Enterprise incentive plans — все сотрудники организации участвуют в выплатах на основе успеха организации (обычно год+). Примеры: profit sharing, stock options, ESOP. Отличаются от индивидуальных/групповых масштабом и горизонтом.",
        },
        {
            "title_ru": "Открытый вопрос 4",
            "ru": "Вы HR-менеджер растущей малой фирмы. Как внедрить performance appraisal и на каких целях системы сфокусироваться?",
            "en": "You are the HR manager of a small growing firm. How would you implement performance appraisal and on which goals would you focus?",
            "sample_ru": "SMART-цели → выбор метода (MBO, рейтинги, 360°) → обучение менеджеров → непрерывная обратная связь → документирование → прозрачность без bias. Цели: развитие, согласование с организацией, обратная связь, справедливость.",
        },
        {
            "title_ru": "Кейс Kendall Toy — вопрос 1",
            "ru": "Почему повышение зарплаты не улучшило productivity?",
            "en": "Why did the salary increase not improve productivity?",
            "sample_ru": "Проблема в дизайне работы (скучная специализация на конвейере), а не в оплате. По Herzberg зарплата — гигиенический фактор, не мотиватор при отсутствии содержания работы.",
        },
        {
            "title_ru": "Кейс Kendall Toy — вопрос 2",
            "ru": "Какие другие подходы может попробовать Kendall для повышения productivity и commitment?",
            "en": "What other approaches might Kendall try to improve productivity and worker commitment?",
            "sample_ru": "Job enrichment/rotation/enlargement, участие сотрудников в улучшениях, команды, обратная связь, пересмотр организации труда.",
        },
        {
            "title_ru": "Кейс Kendall Toy — вопрос 3",
            "ru": "Что бы вы рекомендовали? Отличаются ли рекомендации для стратегии low cost vs highest quality?",
            "en": "Which would you recommend? Do recommendations differ for low cost vs highest quality strategy?",
            "sample_ru": "Обогащение работы + вовлечённость. Low cost — умеренное enrichment + эффективность процессов. Highest quality — сильнее enrichment, обучение, стандарты качества.",
        },
    ]

    exam = [
        q(1, "A fundamental rule of EPC is that:", "Основное правило EPC: событие (event)…",
          [opt("a", "Connectors are only of the OR and XOR kind", "Соединители только OR и XOR"),
           opt("b", "Functions must be directly connected to other functions", "Функции должны быть напрямую связаны друг с другом"),
           opt("c", "Connectors can split a process but cannot make it converge again", "Соединитель может разделить процесс, но не свести ветви снова"),
           opt("d", "An event cannot be directly connected to another event", "Событие не может быть напрямую связано с другим событием"),
           opt("e", "None of the other answers is correct", none_ru)], "d"),
        q(2, "The critical incident method:", "Метод критических инцидентов:",
          [opt("a", "Identifies critical job tasks", "Определяет критические рабочие задачи"),
           opt("b", "Is an investigation conducted by the safety department", "Расследование отдела безопасности"),
           opt("c", "Refers to disagreement between an employer and an employee", "Разногласие работодателя и работника"),
           opt("d", "Refers directly to employees to determine critical tasks", "Обращение к сотрудникам для выявления критических задач"),
           opt("e", "None of the other answers is correct", none_ru)], "a"),
        q(3, "Which of the following relationships is true?", "Какое утверждение о job analysis верно?",
          [opt("a", "Job analysis is a product of job description and specification", "Job analysis — продукт description и specification"),
           opt("b", "Job description and job specification are two products of job analysis", "Job description и job specification — продукты job analysis"),
           opt("c", "Job specification and job analysis are two products of job description", "Job specification и job analysis — продукты job description"),
           opt("d", "Job description is a product of job specification and job analysis", "Job description — продукт specification и job analysis"),
           opt("e", "None of the other answers is correct", none_ru)], "b"),
        q(4, "Job description:", "Описание должности (job description):",
          [opt("a", "Must include career progression opportunities — legal requirement", "Должно включать карьерный рост (юридическое требование)"),
           opt("b", "A comprehensive list of duties, responsibilities, reporting relationships, work conditions, and supervisory responsibilities", "Полный список обязанностей, отчётности, условий труда и надзора"),
           opt("c", "Is the basis from which job analysis is implemented", "Основа, с которой начинается job analysis"),
           opt("d", "Is a list of human requirements such as education and skills", "Список требований к человеку: образование и навыки"),
           opt("e", "None of the other answers is correct", none_ru)], "b"),
        q(5, "Customer pays cash or credit card — which EPC connector?", "Клиент платит наличными или картой. Какой коннектор EPC?",
          [opt("a", "XOR", "XOR"),
           opt("b", "The options OR and AND are both right", "OR и AND оба подходят"),
           opt("c", "AND", "AND"),
           opt("d", "OR", "OR"),
           opt("e", "None of the other answers is correct", none_ru)], "a"),
        q(6, "Employee engagement is:", "Вовлечённость сотрудников (employee engagement):",
          [opt("a", "Frequency of collaboration with peers to accomplish a task", "Частота совместной работы с коллегами"),
           opt("b", "The level of psychological involvement felt by an employee at work", "Уровень психологической вовлечённости на работе"),
           opt("c", "Only affected by the numerosity of tasks", "Зависит только от числа задач"),
           opt("d", "A specific procedure for recruiting within selection", "Процедура рекрутинга в отборе"),
           opt("e", "None of the other answers is correct", none_ru)], "b"),
        q(7, "Strategic HRM postulates that:", "Стратегический HRM постулирует, что:",
          [opt("a", "HRM policies should only focus on short-term projections", "HRM только на краткосрочные прогнозы"),
           opt("b", "HRM should always be directed to improve creativity and flexibility", "HRM всегда направлено на креативность и гибкость"),
           opt("c", "Critical HRM policies must always be designed by top management", "Критические HR-политики всегда разрабатывает топ-менеджмент"),
           opt("d", "HRM policies should produce competencies and behaviors the company needs for its strategic aims", "HRM должно формировать компетенции и поведение для стратегических целей"),
           opt("e", "None of the other answers is correct", none_ru)], "d"),
        q(8, "Job enlargement, job rotation and job enrichment are:", "Расширение, ротация и обогащение работы — это:",
          [opt("a", "Three strategies to redesign specialized jobs to make them more stimulating", "Три стратегии сделать специализированную работу более стимулирующей"),
           opt("b", "Same strategies but they reduce morale and should be avoided", "Те же стратегии, но они снижают моральный дух"),
           opt("c", "Strategies to increase specialization on a single task", "Стратегии повысить специализацию на одной задаче"),
           opt("d", "Only applicable to jobs in highly creative industries", "Применимы только в творческих отраслях"),
           opt("e", "None of the other answers is correct", none_ru)], "a"),
        q(9, "Within recruiting, trend analysis is:", "Trend analysis в рекрутинге:",
          [opt("a", "Company records showing present performance of inside candidates", "Записи о текущей эффективности внутренних кандидатов"),
           opt("b", "Forecast the demand of labor of a specific industry based on past employment needs", "Прогноз спроса на труд в отрасли по прошлым потребностям"),
           opt("c", "Complete picture of employment needs considering changing skill needs", "Полная картина потребностей с учётом навыков"),
           opt("d", "Technique to forecast labor supply for the organization", "Прогноз предложения труда организации"),
           opt("e", "None of the other answers is correct", none_ru)], "b"),
        q(10, "HR managers are usually:", "HR-менеджеры обычно:",
          [opt("a", "Staff managers with authority to issue orders", "Линейные менеджеры с правом отдавать приказы"),
           opt("b", "Line managers with right to advise", "Линейные менеджеры с правом советовать"),
           opt("c", "Staff managers with the right to advise other managers or employees", "Функциональные (staff) менеджеры с правом советовать"),
           opt("d", "Line managers who only advise", "Линейные менеджеры, которые только советуют"),
           opt("e", "None of the other answers is correct", none_ru)], "c"),
        q(11, "Talent management is NOT concerned with:", "Talent management НЕ занимается:",
          [opt("a", "Recruiting employees", "Рекрутингом"),
           opt("b", "Compensating employees", "Компенсацией"),
           opt("c", "Developing employees by training programs", "Развитием через обучение"),
           opt("d", "Managing employees", "Управлением сотрудниками"),
           opt("e", "None of the other answers is correct", none_ru)], "e"),
        q(12, "Work-sampling in employee selection:", "Work-sampling при отборе:",
          [opt("a", "May generate a perception of privacy intrusion", "Может восприниматься как вторжение в личную жизнь"),
           opt("b", "Requires job candidates to perform samples of the job's tasks", "Кандидаты выполняют образцы рабочих задач"),
           opt("c", "Most valid test providing comprehensive picture", "Самый валидный тест обо всём кандидате"),
           opt("d", "Bad predictor, easy to fake", "Плохой предиктор, легко подделать"),
           opt("e", "None of the other answers is correct", none_ru)], "b"),
        q(13, "Candidate order error occurs when:", "Ошибка порядка кандидатов (candidate order error):",
          [opt("a", "Order favors last candidates as interviewers are fatigued", "Порядок в пользу последних (усталость интервьюеров)"),
           opt("b", "Evaluation is biased by exceptionally good or poor candidates interviewed prior", "Оценка искажается из-за очень хороших/плохих кандидатов до этого"),
           opt("c", "Order is not determined using weighted random sampling", "Порядок не определён взвешенной случайной выборкой"),
           opt("d", "Order biases outcomes in favor of first interviewed candidates", "Порядок в пользу первых (свежие интервьюеры)"),
           opt("e", "None of the other answers is correct", none_ru)], "b"),
        q(14, "When applicants are provided realistic job previews:", "Реалистичный предварительный обзор работы (realistic job preview):",
          [opt("a", "They are unlikely to pass the selection test", "Маловероятно пройдут отбор"),
           opt("b", "More likely to turn down offers, but employers have less turnover", "Чаще откажутся от оффера, но текучесть ниже"),
           opt("c", "Company reputation may be negatively affected", "Репутация компании пострадает"),
           opt("d", "Always more satisfied and likely to accept the job offer", "Всегда более довольны и примут оффер"),
           opt("e", "None of the other answers is correct", none_ru)], "d"),
        q(15, "What is Gig-work?", "Что такое Gig-work?",
          [opt("a", "Contracting out HRM tasks that provide negligible value", "Аутсорсинг HR-задач с малым value"),
           opt("b", "On-demand work with fixed hours and autonomous location choice", "Работа по требованию с фиксированными часами и выбором локации"),
           opt("c", "Increasing use of digital data measured in gigabytes for HR", "Использование цифровых данных в гигабайтах для HR"),
           opt("d", "Hybrid work model balancing out-of-office advantages", "Гибридная модель работы вне офиса"),
           opt("e", "None of the other answers is correct", none_ru)], "c"),
    ]

    exam_open = [{
        "title_ru": "Открытый вопрос — Herzberg",
        "ru": "i) Объясните, как факторы Herzberg влияют на мотивацию. ii) Классифицируйте: эргономичная мебель, медстраховка от компании, карьерный рост по результатам.",
        "en": "Explain how Herzberg's factors influence motivation. Classify: ergonomic furniture, health insurance, performance-related advancement.",
        "sample_ru": "Гигиенические факторы (зарплата, условия, страховка) убирают неудовлетворённость, но не мотивируют. Мотиваторы (достижения, признание, рост) дают удовлетворение и мотивацию.\n• Эргономичная мебель — гигиенический фактор (условия труда).\n• Медстраховка — гигиенический фактор (безопасность).\n• Карьерный рост по результатам — мотиватор (признание, рост).",
    }]

    di_section = "Digital Innovation — MCQ"
    di = [
        q(1, "Currently, Artificial Intelligence is at the stage of:", "ИИ сейчас находится на стадии:",
          [opt("a", "Artificial General Intelligence", "AGI (общий интеллект)"),
           opt("b", "Artificial Narrow Intelligence", "ANI (узкий интеллект)"),
           opt("c", "Artificial Super Intelligence", "ASI (сверхинтеллект)"),
           opt("d", "Artificial Natural Intelligence", "ANI (естественный)"),
           opt("e", "None of the other answers is correct", none_ru)], "b", di_section),
        q(2, "AI (Artificial Intelligence) is:", "ИИ (Artificial Intelligence) — это:",
          [opt("a", "Disruptive technology that emerged in November 2022 with ChatGPT", "Дисruptивная технология с ноября 2022 и ChatGPT"),
           opt("b", "Recognizes patterns and self-learns only if developer constantly checks", "Распознаёт паттерны только если разработчик постоянно проверяет"),
           opt("c", "Never going to evolve further", "Никогда не будет развиваться дальше"),
           opt("d", "Any device that perceives its environment and takes actions to maximize success at some goal", "Устройство, воспринимающее среду и действующее для достижения цели"),
           opt("e", "None of the other answers is correct", none_ru)], "d", di_section),
        q(3, "According to Dooley (1997), complex adaptive organization is best suited for:", "По Dooley (1997), сложная адаптивная организация лучше для среды:",
          [opt("a", "Turbulent, low actor numerosity and low actor diversity", "Турбулентной с низкой численностью и разнообразием акторов"),
           opt("b", "One with infrequent technological changes", "С редкими технологическими изменениями"),
           opt("c", "Stable and predictable", "Стабильной и предсказуемой"),
           opt("d", "A stable and analyzable environment", "Стабильной и анализируемой"),
           opt("e", "None of the other answers is correct", none_ru)], "e", di_section),
        q(4, "Solving customer problems is a key activity in the:", "Решение проблем клиентов — ключевая активность в модели:",
          [opt("a", "Value network business model", "Value network"),
           opt("b", "Value shop business model", "Value shop"),
           opt("c", "Value chain business model", "Value chain"),
           opt("d", "Value co-creation business model", "Value co-creation"),
           opt("e", "None of the other answers is correct", none_ru)], "b", di_section),
        q(5, "A Blockchain is:", "Блокчейн — это:",
          [opt("a", "Based on Bitcoin — the two are not divisible", "Неразрывно связан с Bitcoin"),
           opt("b", "Built on independent blocks not related among themselves", "Независимые несвязанные блоки"),
           opt("c", "A ledger of facts replicated across several computers in a peer-to-peer structure", "Реестр фактов, реплицированный на нескольких компьютерах P2P"),
           opt("d", "Less robust when the number of nodes increases", "Менее устойчив при росте числа узлов"),
           opt("e", "None of the other answers is correct", none_ru)], "c", di_section),
        q(6, "According to Rogers (1983), innovation diffusion:", "По Rogers (1983), диффузия инноваций:",
          [opt("a", "Is a special kind of communication", "Особый вид коммуникации"),
           opt("b", "Individuals decide based on perceived usefulness and ease of use", "Автономное решение на основе полезности и простоты (TAM)"),
           opt("c", "Is socially determined with negligible influence of innovation characteristics", "Социально определена, характеристики инновации не важны"),
           opt("d", "Spreads faster in networks with structural equivalence", "Быстрее в сетях со structural equivalence"),
           opt("e", "None of the other answers is correct", none_ru)], "a", di_section),
        q(7, "The study of Dell'Acqua et al. (2023) suggests that:", "Исследование Dell'Acqua et al. (2023):",
          [opt("a", "Software engineering skills always associated with higher performance with AI", "Навыки разработки ПО всегда повышают результат с ИИ"),
           opt("b", "Software engineering skills associated with higher performance only for tasks within the AI capabilities frontier", "Навыки разработки повышают результат только для задач в пределах «границы возможностей ИИ»"),
           opt("c", "Prompt engineering always associated with higher performance", "Prompt engineering всегда повышает результат"),
           opt("d", "Domain skills will become increasingly relevant as AI cannot reproduce them", "Доменные навыки станут ещё важнее, т.к. ИИ их не воспроизводит"),
           opt("e", "None of the other answers is correct", none_ru)], "b", di_section),
        q(8, "In Design Thinking, within the double diamond framework:", "В double diamond design framework:",
          [opt("a", "Convergence is the first stage to align stakeholders on the problem", "Конвергенция — первый этап для согласования проблемы"),
           opt("b", "Divergence occurs first to identify potential solutions", "Дивергенция — первый этап для идей решений"),
           opt("c", "Convergence occurs as both first and third stage", "Конвергенция — первый и третий этап"),
           opt("d", "Divergence is the first and third step, exploring problem and solutions", "Дивергенция — первый и третий этап (проблема и решения)"),
           opt("e", "None of the other answers is correct", none_ru)], "d", di_section),
        q(9, "Considering Value Configuration Models, the Value Network:", "Value Network (модель конфигурации ценности):",
          [opt("a", "Aims to investigate customer problems to propose solutions", "Исследует проблемы клиентов и предлагает решения"),
           opt("b", "Facilitates relationships among customers; broad user base and safe connection flow", "Способствует связям между клиентами; нужна широкая база и безопасный поток"),
           opt("c", "Every digital business is a Network Value model", "Любой digital-бизнес — это Value Network"),
           opt("d", "Has problem solving as the core of its model", "«Решение проблем» в ядре модели"),
           opt("e", "None of the other answers is correct", none_ru)], "b", di_section),
        q(10, "In Rogers's theory, system's norms refer to:", "Нормы системы (Rogers) — это:",
          [opt("a", "Legally accepted behavior guiding members", "Юридически принятое поведение"),
           opt("b", "Degree to which an individual can influence others' attitudes", "Степень влияния на отношения других"),
           opt("c", "Patterned arrangements such as density and numerosity", "Структура связей и численность акторов"),
           opt("d", "Tolerable behavior as a standard, although not legally binding", "Допустимое поведение-стандарт, не обязательное юридически"),
           opt("e", "None of the other answers is correct", none_ru)], "d", di_section),
        q(11, "The Internet is based on which communication protocol?", "Интернет основан на протоколе:",
          [opt("a", "The World Wide Web protocol", "WWW"),
           opt("b", "The SHA256 protocol", "SHA256"),
           opt("c", "The TCP/IP protocol", "TCP/IP"),
           opt("d", "Many protocols because of SEO algorithms", "Множество протоколов из-за SEO"),
           opt("e", "None of the other answers is correct", none_ru)], "c", di_section),
        q(12, "Which is NOT an advantage of cloud computing?", "Что НЕ является преимуществом облачных вычислений?",
          [opt("a", "Instant scalability", "Мгновенная масштабируемость"),
           opt("b", "Pay per use", "Оплата по использованию"),
           opt("c", "Lower initial investment in hardware", "Меньше начальных инвестиций в железо"),
           opt("d", "Low dependence on the service provider", "Низкая зависимость от провайдера"),
           opt("e", "None of the other answers is correct", none_ru)], "d", di_section),
        q(13, "Bitcoins are:", "Биткоины:",
          [opt("a", "Inflationary by design in limited supply", "Инфляционные при ограниченном предложении"),
           opt("b", "Based on a decentralized system", "Основаны на децентрализованной системе"),
           opt("c", "Unlimited in supply", "Неограниченное предложение"),
           opt("d", "Cryptocurrency backed in gold by the UN", "Криптовалюта, обеспеченная золотом ООН"),
           opt("e", "None of the other answers is correct", none_ru)], "b", di_section),
        q(14, "Onlife describes:", "Onlife описывает:",
          [opt("a", "Interactions between real world and social media endanger privacy", "Взаимодействие реального мира и соцсетей угрожает приватности"),
           opt("b", "Real and digital world cannot be divided", "Реальный и цифровой мир нельзя разделить"),
           opt("c", "Future where life solely exists in digital world through VR", "Будущее только в VR"),
           opt("d", "Business model for selling digital objects in VR", "Бизнес-модель продажи цифровых объектов в VR"),
           opt("e", "None of the previous answers is correct", none_ru)], "b", di_section),
    ]

    sna_section = "SNA — MCQ"
    di_sna_mcq = [
        q(16, "What type of matrix is it?", "Какой тип матрицы представлен?",
          [opt("a", "One-mode, directed, weighted", "One-mode, directed, weighted"),
           opt("b", "One-mode, undirected, unweighted", "One-mode, undirected, unweighted"),
           opt("c", "One-mode, directed, unweighted", "One-mode, directed, unweighted"),
           opt("d", "Two-modes, undirected, weighted", "Two-modes, undirected, weighted"),
           opt("e", "None of the other answers is correct", none_ru)], "b", sna_section, "sna16"),
        q(17, "Emax is:", "Emax равен:",
          [opt("a", "72", "72"),
           opt("b", "36", "36"),
           opt("c", "81", "81"),
           opt("d", "56", "56"),
           opt("e", "None of the other answers is correct", none_ru)], "a", sna_section, "sna17"),
        q(18, "The network diameter is:", "Диаметр сети:",
          [opt("a", "3", "3"),
           opt("b", "4", "4"),
           opt("c", "5", "5"),
           opt("d", "6", "6"),
           opt("e", "None of the other answers is correct", none_ru)], "c", sna_section, "sna18"),
        q(19, "The network density is:", "Плотность сети (density):",
          [opt("a", "0.28", "0,28"),
           opt("b", "0.31", "0,31"),
           opt("c", "0.33", "0,33"),
           opt("d", "0.17", "0,17"),
           opt("e", "None of the other answers is correct", none_ru)], "b", sna_section, "sna19"),
        q(20, "Considering the values of Betweenness Centrality:", "Учитывая значения Betweenness Centrality:",
          [opt("a", "I has a higher value than G", "I имеет большее значение, чем G"),
           opt("b", "G has a higher value than F", "G имеет большее значение, чем F"),
           opt("c", "A has a higher value than D", "A имеет большее значение, чем D"),
           opt("d", "A has a higher value than B", "A имеет большее значение, чем B"),
           opt("e", "None of the other answers is correct", none_ru)], "b", sna_section, "sna20"),
    ]

    sna_open = [
        {"ru": "Узлы с наибольшей и наименьшей closeness centrality (укажите узлы и значения).",
         "en": "Node/s with the highest and lowest Closeness (nodes and values).",
         "expected": "B и G — 0.57; I — 0.31",
         "accept": ["b and g 0.57 i 0.31", "b g 0.57 i 0.31", "b & g 0.57 i 0.31"]},
        {"ru": "Betweenness centrality узлов H, B, E и I.",
         "en": "Betweenness of H, B, E and I.",
         "expected": "H=7; B=13.5; E=3; I=0",
         "accept": ["h 7 b 13.5 e 3 i 0", "h=7 b=13.5 e=3 i=0"]},
        {"ru": "Расстояние D(A,H) и D(D,H).",
         "en": "Distance between A and H, and between D and H.",
         "expected": "D(A,H)=4; D(D,H)=2",
         "accept": ["d(a,h)=4 d(d,h)=2", "a-h 4 d-h 2"]},
        {"ru": "Если H — изолированный узел, какова плотность нового графа?",
         "en": "If H were an isolated node, what would be the density of the new graph?",
         "expected": "0.25",
         "accept": ["0,25", "density 0.25", "network density 0.25"]},
    ]

    matrix_html = """
    <div class="section-title">SNA — матрица смежности (9 узлов A–I)</div>
    <div class="matrix-wrap">
      <table class="matrix">
        <tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th></tr>
        <tr><th>A</th><td>—</td><td>3</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><th>B</th><td>3</td><td>—</td><td>1</td><td>3</td><td>1</td><td>4</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><th>C</th><td>1</td><td>1</td><td>—</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><th>D</th><td>0</td><td>3</td><td>0</td><td>—</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
        <tr><th>E</th><td>0</td><td>1</td><td>0</td><td>0</td><td>—</td><td>0</td><td>1</td><td>0</td><td>0</td></tr>
        <tr><th>F</th><td>0</td><td>4</td><td>0</td><td>0</td><td>0</td><td>—</td><td>3</td><td>0</td><td>0</td></tr>
        <tr><th>G</th><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>3</td><td>—</td><td>1</td><td>0</td></tr>
        <tr><th>H</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>—</td><td>1</td></tr>
        <tr><th>I</th><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>—</td></tr>
      </table>
    </div>
    """

    created = []
    (ROOT / "index.html").write_text(INDEX, encoding="utf-8")
    created.append("index.html")

    write_page("01_HRM_Practice_Test.html",
               "HRM — Практический тест",
               "HRM Practice Test — 27 MCQ + open questions / 27 вопросов + открытые",
               practice, practice_open, scoring={"correct": 1, "wrong": 0, "max": None},
               rules_html='<div class="rules">Практический тест: простой подсчёт верных ответов. Открытые вопросы — эталон показывается после проверки.</div>')
    created.append("01_HRM_Practice_Test.html")

    write_page("02_HRM_Exam_CFU6.html",
               "HRM — Экзамен CFU 6",
               "HRM Exam CFU 6 — 15 MCQ + Herzberg / 15 вопросов + открытый",
               exam, exam_open, scoring={"correct": 1, "wrong": -0.2, "max": 15},
               rules_html='<div class="rules">Экзамен: +1 за верный, −0,2 за неверный, 0 за пропуск. Максимум 15 баллов.</div>')
    created.append("02_HRM_Exam_CFU6.html")

    write_page("03_Digital_Innovation_Exam_CFU6.html",
               "Digital Innovation — Экзамен CFU 6",
               "Digital Innovation Exam CFU 6 — 14 MCQ + SNA / 14 MCQ + SNA",
               di + di_sna_mcq, sna_items=sna_open,
               scoring={"correct": 1, "wrong": -0.2, "max": 19},
               rules_html='<div class="rules">Экзамен DI: +1 / −0,2 за MCQ (1–20). SNA-расчёты проверяются по эталону.</div>',
               extra_html=matrix_html)
    created.append("03_Digital_Innovation_Exam_CFU6.html")

    print("Created files:")
    for f in created:
        print(f"  {ROOT / f}")
    return created


if __name__ == "__main__":
    main()
