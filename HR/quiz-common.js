function initQuiz(config) {
  const form = document.getElementById("quiz-form");
  const results = document.getElementById("results");
  const scoreEl = document.getElementById("score");
  const listEl = document.getElementById("results-list");
  const resetBtn = document.getElementById("reset-btn");

  config.questions.forEach((q, idx) => {
    const block = document.createElement("section");
    block.className = "q-block";
    block.id = "q-" + q.id;

    const title = document.createElement("h3");
    title.innerHTML =
      "<span class=\"q-num\">" +
      (idx + 1) +
      ".</span> " +
      escapeHtml(q.ru) +
      "<span class=\"q-en\">" +
      escapeHtml(q.en) +
      "</span>";
    block.appendChild(title);

    const opts = document.createElement("div");
    opts.className = "options";
    q.options.forEach((opt) => {
      const label = document.createElement("label");
      label.className = "opt";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = q.id;
      input.value = opt.id;
      input.required = true;
      label.appendChild(input);
      const text = document.createElement("span");
      text.innerHTML =
        "<strong>" +
        opt.id.toUpperCase() +
        ")</strong> " +
        escapeHtml(opt.ru) +
        "<span class=\"opt-en\">" +
        escapeHtml(opt.en) +
        "</span>";
      label.appendChild(text);
      opts.appendChild(label);
    });
    block.appendChild(opts);
    form.appendChild(block);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let correct = 0;
    const rows = [];

    config.questions.forEach((q, idx) => {
      const picked = data.get(q.id);
      const ok = picked === q.correct;
      if (ok) correct++;
      const rightOpt = q.options.find((o) => o.id === q.correct);
      const pickedOpt = q.options.find((o) => o.id === picked);
      rows.push({ q, idx, picked, pickedOpt, ok, rightOpt });
    });

    listEl.innerHTML = "";
    rows.forEach((r) => {
      const li = document.createElement("li");
      li.className = r.ok ? "ok" : "bad";
      li.innerHTML =
        "<div class=\"res-head\">" +
        (r.ok ? "✓ Верно" : "✗ Неверно") +
        " — вопрос " +
        (r.idx + 1) +
        "</div>" +
        "<div class=\"res-q\">" +
        escapeHtml(r.q.ru) +
        "<span class=\"res-en\">" +
        escapeHtml(r.q.en) +
        "</span></div>" +
        "<div class=\"res-pick\">Ваш ответ:<br>" +
        formatAnswer(r.pickedOpt, r.picked) +
        "</div>" +
        (r.ok
          ? ""
          : "<div class=\"res-right\">Правильный ответ:<br>" +
            formatAnswer(r.rightOpt) +
            "</div>");
      listEl.appendChild(li);
    });

    const total = config.questions.length;
    const pct = Math.round((correct / total) * 100);
    scoreEl.textContent =
      "Результат: " + correct + " из " + total + " (" + pct + "%)";
    results.hidden = false;
    results.scrollIntoView({ behavior: "smooth", block: "start" });
    try {
      localStorage.setItem(
        config.storageKey,
        JSON.stringify({
          date: new Date().toISOString(),
          correct,
          total,
          answers: Object.fromEntries(
            config.questions.map((q) => [q.id, data.get(q.id)])
          ),
        })
      );
    } catch (_) {}
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    results.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function formatAnswer(opt, pickedId) {
  if (!opt) {
    return "<em>— не выбрано</em>";
  }
  return (
    "<strong>" +
    (pickedId || opt.id).toUpperCase() +
    ")</strong> " +
    escapeHtml(opt.ru) +
    "<span class=\"res-en\">" +
    escapeHtml(opt.en) +
    "</span>"
  );
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
