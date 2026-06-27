/** Digital Innovation practice MCQ bank — exam topics + authors */
const none = { id: "e", en: "None of the other answers is correct", ru: "Ни один из других ответов не верен" };
const noneF = { id: "f", en: "None of the other answers is correct", ru: "Ни один из других ответов не верен" };

export const BANK = [
  // ── AI ──
  { section: "AI", en: "Currently, Artificial Intelligence is at the stage of:", ru: "ИИ сейчас находится на стадии:", options: [
    { id: "a", en: "Artificial General Intelligence (AGI)", ru: "AGI — общий интеллект" },
    { id: "b", en: "Artificial Narrow Intelligence (ANI)", ru: "ANI — узкий интеллект" },
    { id: "c", en: "Artificial Super Intelligence (ASI)", ru: "ASI — сверхинтеллект" },
    { id: "d", en: "Artificial Natural Intelligence", ru: "«Естественный» интеллект" }, none], correct: "b", tip: "Сейчас везде ANI: ChatGPT узкий, не AGI." },
  { section: "AI", en: "AI (Artificial Intelligence) is best defined as:", ru: "ИИ лучше всего определяется как:", options: [
    { id: "a", en: "A disruptive technology that started only in November 2022 with ChatGPT", ru: "Технология, появившаяся только с ChatGPT в 2022" },
    { id: "b", en: "Software that learns only when a developer checks every output", ru: "ПО, которое учится только при проверке разработчиком" },
    { id: "c", en: "Technology that will never evolve further", ru: "Технология, которая больше не развивается" },
    { id: "d", en: "Any device that perceives its environment and acts to maximize success at a goal", ru: "Устройство, воспринимающее среду и действующее для цели" }, none], correct: "d", tip: "Классическое определение ИИ — цель + восприятие среды." },
  { section: "AI", en: "ChatGPT and similar large language models are examples of:", ru: "ChatGPT и похожие LLM — примеры:", options: [
    { id: "a", en: "Artificial General Intelligence", ru: "AGI" },
    { id: "b", en: "Artificial Narrow Intelligence", ru: "ANI — узкий ИИ" },
    { id: "c", en: "Artificial Super Intelligence", ru: "ASI" },
    { id: "d", en: "Non-AI statistical tools with no learning", ru: "Не-ИИ статистика без обучения" }, none], correct: "b", tip: "LLM = узкая задача (текст), не общий интеллект." },
  { section: "AI", en: "According to Dell'Acqua et al. (2023), software engineering skills are associated with higher performance with AI:", ru: "По Dell'Acqua et al. (2023), навыки разработки ПО повышают результат с ИИ:", options: [
    { id: "a", en: "Always, for every type of task", ru: "Всегда, для любых задач" },
    { id: "b", en: "Only for tasks within the AI capabilities frontier", ru: "Только для задач в пределах «границы возможностей ИИ»" },
    { id: "c", en: "Never — domain skills matter more in all cases", ru: "Никогда — всегда важнее доменные навыки" },
    { id: "d", en: "Only when prompt engineering is not used", ru: "Только без prompt engineering" }, none], correct: "b", tip: "Dell'Acqua = граница возможностей ИИ (frontier)." },
  { section: "AI", en: "Dell'Acqua et al. suggest that generative AI can:", ru: "Dell'Acqua et al.: генеративный ИИ может:", options: [
    { id: "a", en: "Replace all human expertise immediately", ru: "Сразу заменить всю экспертизу людей" },
    { id: "b", en: "Level performance by helping weaker performers improve", ru: "Выравнивать результат, помогая слабым сотрудникам" },
    { id: "c", en: "Eliminate the need for any oversight", ru: "Убрать необходимость контроля" },
    { id: "d", en: "Work best without any human input", ru: "Лучше работать без участия человека" }, none], correct: "b", tip: "🇷🇺 AI помогает слабым работать лучше (leveling)." },
  { section: "AI", en: "According to Handa et al. (2025), a key risk of generative AI is:", ru: "По Handa et al. (2025), ключевой риск генеративного ИИ:", options: [
    { id: "a", en: "Hallucinations — confident but wrong outputs", ru: "Галлюцинации — уверенные, но неверные ответы" },
    { id: "b", en: "AI never makes mistakes if trained well", ru: "ИИ не ошибается при хорошем обучении" },
    { id: "c", en: "Human oversight is no longer needed", ru: "Контроль человека больше не нужен" },
    { id: "d", en: "Usability has no effect on adoption", ru: "Удобство не влияет на adoption" }, none], correct: "a", tip: "Handa = hallucinations + нужен human oversight." },
  { section: "AI", en: "Dellermann et al. (2019) argue that the best outcomes come from:", ru: "Dellermann et al. (2019): лучшие результаты даёт:", options: [
    { id: "a", en: "Replacing humans entirely with AI", ru: "Полная замена людей ИИ" },
    { id: "b", en: "Hybrid Intelligence — humans and AI working together", ru: "Hybrid Intelligence — человек + ИИ вместе" },
    { id: "c", en: "Avoiding AI in all knowledge work", ru: "Отказ от ИИ в интеллектуальной работе" },
    { id: "d", en: "Using AI only for entertainment", ru: "ИИ только для развлечений" }, none], correct: "b", tip: "Hybrid Intelligence = Dellermann." },
  { section: "AI", en: "Varone et al. (2025) warn that AI may cause:", ru: "Varone et al. (2025) предупреждают, что ИИ может вызвать:", options: [
    { id: "a", en: "Deskilling — weakening of expertise over time", ru: "Deskilling — ослабление экспертизы со временем" },
    { id: "b", en: "Perfect accuracy in all professional domains", ru: "Идеальную точность во всех сферах" },
    { id: "c", en: "Elimination of all coordination problems", ru: "Исчезновение всех проблем координации" },
    { id: "d", en: "Blockchain-level security in every app", ru: "Безопасность блокчейна в каждом приложении" }, none], correct: "a", tip: "Varone = deskilling / leveling effect." },
  { section: "AI", en: "Crowston & Bolici (2025) focus on how AI changes:", ru: "Crowston & Bolici (2025) — как ИИ меняет:", options: [
    { id: "a", en: "Organizational coordination and workflows", ru: "Координацию в организации и рабочие процессы" },
    { id: "b", en: "Only hardware manufacturing costs", ru: "Только стоимость железа" },
    { id: "c", en: "Blockchain mining difficulty", ru: "Сложность майнинга блокчейна" },
    { id: "d", en: "Rogers' adopter categories", ru: "Категории adopters по Rogers" }, none], correct: "a", tip: "2025 Crowston = coordination + AI в workflows." },
  { section: "AI", en: "Crowston & Bolici (2019) emphasize that technology adoption increases when:", ru: "Crowston & Bolici (2019): adoption растёт, когда:", options: [
    { id: "a", en: "Systems have good usability (HCI)", ru: "Системы удобны (HCI, usability)" },
    { id: "b", en: "Systems are as complex as possible", ru: "Системы максимально сложны" },
    { id: "c", en: "Users never see the interface", ru: "Пользователи не видят интерфейс" },
    { id: "d", en: "Innovation has no observability", ru: "Инновация не наблюдаема" }, none], correct: "a", tip: "2019 Crowston = HCI + usability → adoption." },
  { section: "AI", en: "Which statement about prompt engineering and AI performance is most accurate (exam-style)?", ru: "Какое утверждение о prompt engineering вернее (стиль экзамена)?", options: [
    { id: "a", en: "Prompt engineering always guarantees higher performance in every task", ru: "Prompt engineering всегда повышает результат в любой задаче" },
    { id: "b", en: "Performance depends on task type and whether it is within the AI frontier", ru: "Зависит от задачи и границы возможностей ИИ" },
    { id: "c", en: "Prompt engineering replaces the need for domain knowledge", ru: "Prompt engineering заменяет доменные знания" },
    { id: "d", en: "Only software engineers can write prompts", ru: "Промпты пишут только разработчики" }, none], correct: "b", tip: "Не «always» — смотри Dell'Acqua и границу ИИ." },
  { section: "AI", en: "Which is NOT a typical characteristic of current (narrow) AI?", ru: "Что НЕ характерно для современного (узкого) ИИ?", options: [
    { id: "a", en: "Pattern recognition on specific tasks", ru: "Распознавание паттернов в узких задачах" },
    { id: "b", en: "Learning from data", ru: "Обучение на данных" },
    { id: "c", en: "Human-level reasoning across all domains like a person", ru: "Человеческое мышление во всех сферах сразу" },
    { id: "d", en: "Automation of repetitive cognitive tasks", ru: "Автоматизация рутинных когнитивных задач" }, none], correct: "c", tip: "AGI (все сферы) — это НЕ текущий ИИ." },

  // ── Rogers / TAM / UTAUT ──
  { section: "Adoption — Rogers", en: "According to Rogers (1983), innovation diffusion is:", ru: "По Rogers (1983), диффузия инноваций — это:", options: [
    { id: "a", en: "A special kind of communication through which an innovation spreads", ru: "Особый вид коммуникации, через который распространяется инновация" },
    { id: "b", en: "An individual decision based only on perceived usefulness and ease of use (TAM)", ru: "Индивидуальное решение только по TAM" },
    { id: "c", en: "A process with no social influence", ru: "Процесс без социального влияния" },
    { id: "d", en: "Determined only by price, not perception", ru: "Определяется только ценой" }, none], correct: "a", tip: "Rogers = communication + social spread. TAM = Davis." },
  { section: "Adoption — TAM", en: "In the original TAM, Perceived Ease of Use (PEOU) is:", ru: "В оригинальной TAM, Perceived Ease of Use (PEOU):", options: [
    { id: "a", en: "The degree to which using a system would enhance job performance", ru: "Насколько система улучшит работу (это PU!)" },
    { id: "b", en: "The degree to which using a system would be free of effort", ru: "Насколько системой легко пользоваться (без лишних усилий)" },
    { id: "c", en: "The degree to which using a system would be fun", ru: "Насколько это весело" },
    { id: "d", en: "The degree to which the system is cheap", ru: "Насколько система дешёвая" }, none], correct: "b", tip: "PEOU = free of effort. PU = job performance." },
  { section: "Adoption — TAM", en: "In the original TAM, Perceived Usefulness (PU) is:", ru: "В оригинальной TAM, Perceived Usefulness (PU):", options: [
    { id: "a", en: "The degree to which a person believes using the system improves job performance", ru: "Насколько человек верит, что система улучшит работу" },
    { id: "b", en: "The degree to which using the system is free of effort", ru: "Насколько легко пользоваться (это PEOU!)" },
    { id: "c", en: "The degree to which friends use the system", ru: "Сколько друзей пользуются" },
    { id: "d", en: "The degree to which the vendor advertises the system", ru: "Насколько активно рекламирует вендор" }, none], correct: "a", tip: "PU = performance. PEOU = easy to use." },
  { section: "Adoption — TAM", en: "The Technology Acceptance Model (TAM) was developed by:", ru: "Модель TAM разработана:", options: [
    { id: "a", en: "Rogers (1983)", ru: "Rogers" },
    { id: "b", en: "Davis (1981)", ru: "Davis" },
    { id: "c", en: "Venkatesh et al. (2003) as the first version of TAM", ru: "Venkatesh как первая версия TAM" },
    { id: "d", en: "Floridi (2015)", ru: "Floridi" }, none], correct: "b", tip: "Davis = TAM. Venkatesh = UTAUT." },
  { section: "Adoption — UTAUT", en: "Venkatesh et al. (2003) UTAUT emphasizes that technology acceptance is:", ru: "UTAUT (Venkatesh): принятие технологий:", options: [
    { id: "a", en: "Purely individual with no social or organizational factors", ru: "Чисто индивидуальное, без социальных факторов" },
    { id: "b", en: "Shaped by social influence and facilitating conditions", ru: "Зависит от социального влияния и условий организации" },
    { id: "c", en: "Unrelated to organizational context", ru: "Не связано с организацией" },
    { id: "d", en: "Based only on blockchain trust", ru: "Основано только на доверии к блокчейну" }, none], correct: "b", tip: "UTAUT = social + org factors." },
  { section: "Adoption — Rogers", en: "Rogers' diffusion theory includes adopter categories such as:", ru: "У Rogers есть категории adopters:", options: [
    { id: "a", en: "Innovators, early adopters, early majority, late majority, laggards", ru: "Innovators → early adopters → majorities → laggards" },
    { id: "b", en: "Only price-sensitive and price-insensitive buyers", ru: "Только чувствительные и нечувствительные к цене" },
    { id: "c", en: "Managers, workers, customers, regulators only", ru: "Только менеджеры, работники, клиенты" },
    { id: "d", en: "Cloud users and on-premise users", ru: "Только cloud и on-premise" }, none], correct: "a", tip: "5 категорий Rogers — классика экзамена." },
  { section: "Adoption — Rogers", en: "A free tier for a new AI product mainly supports Rogers' attribute of:", ru: "Бесплатный тариф для нового AI-продукта поддерживает атрибут Rogers:", options: [
    { id: "a", en: "Trialability — ability to try before paying", ru: "Trialability — попробовать до оплаты" },
    { id: "b", en: "Complexity — making the product harder to use", ru: "Complexity — усложнение" },
    { id: "c", en: "Relative disadvantage", ru: "Относительный недостаток" },
    { id: "d", en: "Non-observability", ru: "Ненаблюдаемость" }, none], correct: "a", tip: "Free = trialability + observability → быстрее diffusion." },
  { section: "Adoption — Rogers", en: "Launching a ChatGPT-like product only as $20/month Pro (no free tier) mainly hurts:", ru: "Запуск только Pro $20/мес без free в основном мешает:", options: [
    { id: "a", en: "Trialability and observability, slowing diffusion", ru: "Trialability и observability — diffusion тормозится" },
    { id: "b", en: "Blockchain consensus mechanisms", ru: "Консенсусу блокчейна" },
    { id: "c", en: "Value chain efficiency only", ru: "Только эффективности value chain" },
    { id: "d", en: "Encryption key length", ru: "Длине ключа шифрования" }, none], correct: "a", tip: "Плати сразу = нет try → застревает у innovators." },
  { section: "Adoption — Rogers", en: "Rogers lists innovation characteristics including:", ru: "Rogers перечисляет характеристики инновации:", options: [
    { id: "a", en: "Relative advantage, compatibility, complexity, trialability, observability", ru: "Относит. преимущество, совместимость, сложность, trialability, observability" },
    { id: "b", en: "Only encryption strength and cloud region", ru: "Только шифрование и регион cloud" },
    { id: "c", en: "Only BPM culture and process maps", ru: "Только BPM-культура" },
    { id: "d", en: "Only Bitcoin block size", ru: "Только размер блока Bitcoin" }, none], correct: "a", tip: "5 характеристик Rogers — выучи список." },
  { section: "Adoption — mix", en: "«Individuals decide based on perceived usefulness and ease of use» describes:", ru: "«Решение на основе полезности и простоты» — это:", options: [
    { id: "a", en: "Rogers' diffusion of innovation (1983)", ru: "Rogers diffusion" },
    { id: "b", en: "Davis' Technology Acceptance Model (TAM)", ru: "Davis TAM" },
    { id: "c", en: "Nakamoto's Bitcoin whitepaper", ru: "Nakamoto Bitcoin" },
    { id: "d", en: "Stabell & Fjeldstad value configurations", ru: "Stabell value models" }, none], correct: "b", tip: "PU + PEOU = Davis, НЕ Rogers!" },
  { section: "Adoption — mix", en: "«Innovations spread through social communication and influence» is central to:", ru: "«Инновации распространяются через социальное влияние» — это:", options: [
    { id: "a", en: "Rogers (1983)", ru: "Rogers" },
    { id: "b", en: "Davis TAM only", ru: "Только Davis TAM" },
    { id: "c", en: "Encryption standards", ru: "Стандарты шифрования" },
    { id: "d", en: "Lean Startup MVP definition", ru: "Определение MVP Lean Startup" }, none], correct: "a", tip: "Social spread = Rogers." },
  { section: "Adoption — TAM", en: "According to TAM, users are more likely to adopt technology that is:", ru: "По TAM, пользователи чаще принимают технологию, которая:", options: [
    { id: "a", en: "Perceived as useful AND easy to use", ru: "Воспринимается как полезная И удобная" },
    { id: "b", en: "The most expensive option available", ru: "Самая дорогая на рынке" },
    { id: "c", en: "Impossible to try before buying", ru: "Невозможно попробовать до покупки" },
    { id: "d", en: "Hidden from colleagues (low observability)", ru: "Скрыта от коллег" }, none], correct: "a", tip: "TAM = useful + easy." },

  // ── Value models ──
  { section: "Value models", en: "Solving customer problems is a key activity in the:", ru: "Решение проблем клиентов — ключевая активность в:", options: [
    { id: "a", en: "Value network business model", ru: "Value network" },
    { id: "b", en: "Value shop business model", ru: "Value shop" },
    { id: "c", en: "Value chain business model", ru: "Value chain" },
    { id: "d", en: "Pure pipeline manufacturer with no clients", ru: "Чистый pipeline без клиентов" }, none], correct: "b", tip: "Shop = problem solving (консалтинг, больница)." },
  { section: "Value models", en: "Stabell & Fjeldstad (1998) identify three value configurations:", ru: "Stabell & Fjeldstad (1998): три конфигурации ценности:", options: [
    { id: "a", en: "Value chain, value shop, value network", ru: "Chain, shop, network" },
    { id: "b", en: "B2B, B2C, C2C only", ru: "Только B2B, B2C, C2C" },
    { id: "c", en: "Cloud, on-premise, hybrid only", ru: "Только cloud, on-premise, hybrid" },
    { id: "d", en: "Innovators, early adopters, laggards", ru: "Категории Rogers" }, none], correct: "a", tip: "Chain / Shop / Network — три модели." },
  { section: "Value models", en: "The value chain model focuses on:", ru: "Value chain фокусируется на:", options: [
    { id: "a", en: "Efficient production and delivery of products", ru: "Эффективное производство и доставка" },
    { id: "b", en: "Mediating interactions between many users", ru: "Посредничество между пользователями (это network)" },
    { id: "c", en: "Custom problem diagnosis for each client", ru: "Диагностика проблем клиента (это shop)" },
    { id: "d", en: "Rogers' adopter categories", ru: "Категории Rogers" }, none], correct: "a", tip: "Chain = factory, logistics, product." },
  { section: "Value models", en: "The value network model is closest to:", ru: "Value network ближе всего к:", options: [
    { id: "a", en: "Platforms where value comes from connections between participants", ru: "Платформам, где ценность в связях участников" },
    { id: "b", en: "A single assembly line with no external partners", ru: "Одной линии сборки без партнёров" },
    { id: "c", en: "A consulting firm solving unique cases", ru: "Консалтингу (это shop)" },
    { id: "d", en: "Ancient encryption techniques", ru: "Древнему шифрованию" }, none], correct: "a", tip: "Network = платформа, маркетплейс, связи." },
  { section: "Value models", en: "Network externalities mean:", ru: "Network externalities (сетевые внешние эффекты) — это:", options: [
    { id: "a", en: "A product becomes more valuable as more people use it", ru: "Продукт ценнее, когда им пользуется больше людей" },
    { id: "b", en: "A product becomes less valuable with more users", ru: "Продукт теряет ценность с ростом пользователей" },
    { id: "c", en: "Value depends only on production cost", ru: "Ценность только от себестоимости" },
    { id: "d", en: "Externalities exist only in manufacturing chains", ru: "Только в производственных цепочках" }, none], correct: "a", tip: "Открытый Q15: WhatsApp, Uber, соцсети." },
  { section: "Value models", en: "Fjeldstad & Snow (2018) argue that firms increasingly operate as:", ru: "Fjeldstad & Snow (2018): фирмы всё чаще работают как:", options: [
    { id: "a", en: "Ecosystems and networks rather than only hierarchies", ru: "Экосистемы и сети, а не только иерархии" },
    { id: "b", en: "Isolated value chains with no partners", ru: "Изолированные chain без партнёров" },
    { id: "c", en: "Governments regulating encryption", ru: "Регуляторы шифрования" },
    { id: "d", en: "Single-product shops only", ru: "Только value shop" }, none], correct: "a", tip: "Ecosystems = Fjeldstad & Snow." },
  { section: "Value models", en: "The Business Model Canvas (BMC) is associated with:", ru: "Business Model Canvas связан с:", options: [
    { id: "a", en: "Osterwalder & Pigneur", ru: "Osterwalder & Pigneur" },
    { id: "b", en: "Nakamoto (2008)", ru: "Nakamoto" },
    { id: "c", en: "Dooley (1997) only", ru: "Только Dooley" },
    { id: "d", en: "Vom Brocke BPM culture", ru: "Vom Brocke BPM" }, none], correct: "a", tip: "BMC = Osterwalder." },
  { section: "Value models", en: "A hospital diagnosing and treating unique patient cases fits best:", ru: "Больница с уникальными случаями пациентов — это:", options: [
    { id: "a", en: "Value shop", ru: "Value shop" },
    { id: "b", en: "Value chain mass production", ru: "Value chain массовое производство" },
    { id: "c", en: "Pure value network marketplace", ru: "Чистый value network маркетплейс" },
    { id: "d", en: "Blockchain mining pool", ru: "Пул майнинга" }, none], correct: "a", tip: "Shop = unique problem → solution." },
  { section: "Value models", en: "A car factory with standardized assembly is mainly:", ru: "Автозавод со стандартной сборкой — в основном:", options: [
    { id: "a", en: "Value chain", ru: "Value chain" },
    { id: "b", en: "Value shop", ru: "Value shop" },
    { id: "c", en: "Value network platform", ru: "Value network платформа" },
    { id: "d", en: "UTAUT model", ru: "UTAUT" }, none], correct: "a", tip: "Chain = стандартный продукт, поток." },
  { section: "Value models", en: "Winner-takes-all dynamics on digital platforms relate most to:", ru: "Эффект «победитель получает всё» на платформах связан с:", options: [
    { id: "a", en: "Network externalities and network effects", ru: "Network externalities / network effects" },
    { id: "b", en: "BPM process redesign only", ru: "Только BPM redesign" },
    { id: "c", en: "Double diamond convergence only", ru: "Только convergence double diamond" },
    { id: "d", en: "Industry 1.0 mechanization", ru: "Industry 1.0" }, none], correct: "a", tip: "Van Alstyne + network effects + Q15 open." },

  // ── Blockchain ──
  { section: "Blockchain", en: "A blockchain is:", ru: "Блокчейн — это:", options: [
    { id: "a", en: "Inseparable from Bitcoin — they are the same thing", ru: "Неразрывно то же самое, что Bitcoin" },
    { id: "b", en: "Independent blocks with no links between them", ru: "Независимые блоки без связей" },
    { id: "c", en: "A ledger of facts replicated across computers in a peer-to-peer network", ru: "Реестр фактов, реплицированный в P2P-сети" },
    { id: "d", en: "Less secure when more nodes join the network", ru: "Менее безопасен при росте узлов" }, none], correct: "c", tip: "Ledger + P2P + replication." },
  { section: "Blockchain", en: "Nakamoto (2008) is known for:", ru: "Nakamoto (2008) известен:", options: [
    { id: "a", en: "Introducing Bitcoin and blockchain-based decentralized trust", ru: "Bitcoin и децентрализованное доверие через блокчейн" },
    { id: "b", en: "Creating the Technology Acceptance Model", ru: "Созданием TAM" },
    { id: "c", en: "Defining the Onlife concept", ru: "Концепцией Onlife" },
    { id: "d", en: "Industry 5.0 human-centered manufacturing", ru: "Industry 5.0" }, none], correct: "a", tip: "Nakamoto = Bitcoin + crypto trust." },
  { section: "Blockchain", en: "Zheng et al. (2018) emphasize that blockchain enables:", ru: "Zheng et al. (2018): блокчейн даёт:", options: [
    { id: "a", en: "Secure distributed ledgers and transparent coordination", ru: "Безопасный distributed ledger и прозрачную координацию" },
    { id: "b", en: "Central bank control of all transactions", ru: "Контроль всех транзакций центробанком" },
    { id: "c", en: "Elimination of all cryptography", ru: "Отказ от криптографии" },
    { id: "d", en: "Rogers' early majority adoption", ru: "Early majority по Rogers" }, none], correct: "a", tip: "Zheng = distributed ledger + security." },
  { section: "Blockchain", en: "Trust in public blockchains is primarily created through:", ru: "Доверие в публичном блокчейне создаётся через:", options: [
    { id: "a", en: "Cryptography and consensus among distributed nodes", ru: "Криптографию и консенсус узлов" },
    { id: "b", en: "A single trusted CEO signing each block", ru: "Одного CEO, подписывающего блоки" },
    { id: "c", en: "VPN connections only", ru: "Только VPN" },
    { id: "d", en: "Perceived ease of use (PEOU)", ru: "PEOU из TAM" }, none], correct: "a", tip: "Crypto + consensus, не банк." },
  { section: "Blockchain", en: "Which statement about blockchain is FALSE?", ru: "Какое утверждение о блокчейне ЛОЖНО?", options: [
    { id: "a", en: "Blockchain can exist beyond Bitcoin applications", ru: "Блокчейн может использоваться не только для Bitcoin" },
    { id: "b", en: "Blocks are cryptographically linked in a chain", ru: "Блоки криптографически связаны в цепочку" },
    { id: "c", en: "Blockchain and Bitcoin are completely inseparable — no blockchain without Bitcoin", ru: "Блокчейн и Bitcoin абсолютно неразделимы" },
    { id: "d", en: "Data is replicated across multiple nodes", ru: "Данные реплицируются на узлах" }, none], correct: "c", tip: "Exam trap: Bitcoin ≠ единственный блокчейн." },
  { section: "Blockchain", en: "Adding more honest nodes to a decentralized network generally:", ru: "Добавление честных узлов в децентрализованную сеть обычно:", options: [
    { id: "a", en: "Increases robustness and security", ru: "Повышает устойчивость и безопасность" },
    { id: "b", en: "Makes the ledger less robust (exam wrong answer)", ru: "Снижает устойчивость (ловушка экзамена)" },
    { id: "c", en: "Removes the need for encryption", ru: "Убирает шифрование" },
    { id: "d", en: "Stops all network externalities", ru: "Останавливает network externalities" }, none], correct: "a", tip: "Больше узлов ≠ слабее (вариант d в Q5 — ловушка)." },

  // ── Platforms ──
  { section: "Platforms", en: "Van Alstyne et al. (2016) argue that platforms grow mainly through:", ru: "Van Alstyne et al. (2016): платформы растут через:", options: [
    { id: "a", en: "Network effects — more users create more value", ru: "Network effects — больше пользователей → больше ценности" },
    { id: "b", en: "Eliminating all interactions between users", ru: "Устранение взаимодействий" },
    { id: "c", en: "BPM process maps only", ru: "Только BPM-карты" },
    { id: "d", en: "Making trialability impossible", ru: "Запрет trialability" }, none], correct: "a", tip: "Van Alstyne = network effects." },
  { section: "Platforms", en: "Parker (2016) describes platforms as:", ru: "Parker (2016): платформы — это:", options: [
    { id: "a", en: "Entities that orchestrate interactions and enable value creation", ru: "Оркестраторы взаимодействий и создания ценности" },
    { id: "b", en: "Only hardware manufacturers", ru: "Только производители железа" },
    { id: "c", en: "Only encryption algorithms", ru: "Только алгоритмы шифрования" },
    { id: "d", en: "Only Rogers' laggards", ru: "Только laggards Rogers" }, none], correct: "a", tip: "Parker = orchestrate interactions." },
  { section: "Platforms", en: "Uber and Airbnb are examples of:", ru: "Uber и Airbnb — примеры:", options: [
    { id: "a", en: "Platform / value network businesses", ru: "Платформ / value network" },
    { id: "b", en: "Traditional value chain manufacturers", ru: "Классический value chain" },
    { id: "c", en: "Value shop consulting firms", ru: "Value shop консалтинг" },
    { id: "d", en: "Non-digital onlife concepts", ru: "Не-цифровой onlife" }, none], correct: "a", tip: "Маркетплейс/платформа = network." },
  { section: "Platforms", en: "A messaging app becomes more useful when your friends join. This illustrates:", ru: "Мессенджер полезнее, когда приходят друзья. Это:", options: [
    { id: "a", en: "Direct network externality", ru: "Прямой network externality" },
    { id: "b", en: "Value chain efficiency", ru: "Эффективность value chain" },
    { id: "c", en: "BPM culture failure", ru: "Провал BPM-культуры" },
    { id: "d", en: "Low observability in Rogers' model", ru: "Низкая observability Rogers" }, none], correct: "a", tip: "Классический пример для open Q15." },
  { section: "Platforms", en: "Digital platforms often show winner-takes-all because:", ru: "Платформы часто «победитель получает всё», потому что:", options: [
    { id: "a", en: "Users prefer the platform where others already are (network effects)", ru: "Пользователи идут туда, где уже есть другие (network effects)" },
    { id: "b", en: "Cloud computing has zero vendor dependence", ru: "В cloud нет зависимости от провайдера" },
    { id: "c", en: "Encryption is not used in digital systems", ru: "Шифрование не используется" },
    { id: "d", en: "MVP must be fully functional on day one", ru: "MVP должен быть полностью готов" }, none], correct: "a", tip: "Связка platforms + network externalities." },

  // ── BPM ──
  { section: "BPM", en: "BPM stands for:", ru: "BPM — это:", options: [
    { id: "a", en: "Business Process Management", ru: "Business Process Management — управление бизнес-процессами" },
    { id: "b", en: "Blockchain Payment Module", ru: "Blockchain Payment Module" },
    { id: "c", en: "Basic Platform Marketing", ru: "Basic Platform Marketing" },
    { id: "d", en: "Business Profit Maximization only", ru: "Только максимизация прибыли" }, none], correct: "a", tip: "BPM = процессы, не блокчейн." },
  { section: "BPM", en: "Dumas et al. (2018) argue that organizations improve through:", ru: "Dumas et al. (2018): организации улучшаются через:", options: [
    { id: "a", en: "Continuous BPM and process redesign", ru: "Непрерывный BPM и redesign процессов" },
    { id: "b", en: "Avoiding any process documentation", ru: "Отказ от описания процессов" },
    { id: "c", en: "Rogers' laggard category only", ru: "Только категорию laggards" },
    { id: "d", en: "Removing all culture from the workplace", ru: "Удаление культуры" }, none], correct: "a", tip: "Dumas = optimize processes." },
  { section: "BPM", en: "Vom Brocke & Schmiedel (2011) stress that BPM success depends on:", ru: "Vom Brocke & Schmiedel (2011): успех BPM зависит от:", options: [
    { id: "a", en: "Process-oriented organizational culture", ru: "Process-oriented culture — культуры процессов" },
    { id: "b", en: "Having the most expensive software only", ru: "Только самого дорогого ПО" },
    { id: "c", en: "Blockchain node count", ru: "Числа узлов блокчейна" },
    { id: "d", en: "Eliminating all employee training", ru: "Отказа от обучения" }, none], correct: "a", tip: "Culture = Vom Brocke. Processes = Dumas." },
  { section: "BPM", en: "Without the right culture, BPM initiatives often fail because:", ru: "Без правильной культуры BPM часто проваливается, потому что:", options: [
    { id: "a", en: "People do not adopt process thinking — culture drives success", ru: "Люди не принимают процессное мышление" },
    { id: "b", en: "Blockchain cannot encrypt process maps", ru: "Блокчейн не шифрует карты" },
    { id: "c", en: "TAM PEOU is always zero", ru: "PEOU всегда ноль" },
    { id: "d", en: "Onlife separates digital and physical worlds", ru: "Onlife разделяет миры" }, none], correct: "a", tip: "People determine BPM success." },

  // ── Onlife / digital life ──
  { section: "Onlife", en: "Onlife describes:", ru: "Onlife описывает:", options: [
    { id: "a", en: "A condition where social media only threatens privacy", ru: "Только угрозу приватности в соцсетях" },
    { id: "b", en: "A future where life exists only in digital environments", ru: "Жизнь только в цифре" },
    { id: "c", en: "A condition where real and digital worlds are hard to separate", ru: "Реальный и цифровой мир трудно разделить" },
    { id: "d", en: "A business model for selling digital objects only", ru: "БМ продажи цифровых объектов" }, none], correct: "c", tip: "Floridi Onlife = слияние online/offline." },
  { section: "Onlife", en: "Floridi (2015) is associated with:", ru: "Floridi (2015) связан с:", options: [
    { id: "a", en: "Onlife and the infosphere — digital embedded in everyday life", ru: "Onlife, infosphere — цифра в повседневной жизни" },
    { id: "b", en: "Bitcoin mining algorithms", ru: "Алгоритмами майнинга Bitcoin" },
    { id: "c", en: "UTAUT social influence constructs only", ru: "Только UTAUT" },
    { id: "d", en: "Lean Startup MVP", ru: "MVP Lean Startup" }, none], correct: "a", tip: "Floridi = Onlife + infosphere." },
  { section: "Onlife", en: "The infosphere (Floridi) refers to:", ru: "Infosphere (Floridi) — это:", options: [
    { id: "a", en: "The environment of information and digital interactions we live in", ru: "Среда информации и цифровых взаимодействий" },
    { id: "b", en: "Only the physical atmosphere of Earth", ru: "Только физическая атмосфера Земли" },
    { id: "c", en: "A cloud pricing model", ru: "Модель ценообразования cloud" },
    { id: "d", en: "A type of blockchain consensus", ru: "Тип консенсуса блокчейна" }, none], correct: "a", tip: "Infosphere = информационная среда." },
  { section: "Onlife", en: "Which is NOT a correct description of Onlife?", ru: "Что НЕ является верным описанием Onlife?", options: [
    { id: "a", en: "Online and offline life merge into one experience", ru: "Онлайн и оффлайн сливаются" },
    { id: "b", en: "Digital technologies are embedded in everyday life", ru: "Цифра встроена в повседневность" },
    { id: "c", en: "Humans will live exclusively in VR with no physical world", ru: "Люди живут только в VR без физического мира" },
    { id: "d", en: "Hard to draw a sharp line between 'real' and 'digital'", ru: "Трудно провести границу real/digital" }, none], correct: "c", tip: "Onlife ≠ только цифра (это ловушка Q14-b)." },

  // ── Design / Startup / Alignment ──
  { section: "Design & Startup", en: "In Design Thinking's double diamond framework:", ru: "В double diamond (Design Thinking):", options: [
    { id: "a", en: "Convergence is the first stage", ru: "Convergence — первый этап" },
    { id: "b", en: "Divergence occurs first to find solutions only", ru: "Divergence только для решений в начале" },
    { id: "c", en: "Convergence is both first and third stage", ru: "Convergence — первый и третий" },
    { id: "d", en: "Divergence is the first and third step (problem and solutions)", ru: "Divergence — 1-й и 3-й (проблема и решения)" }, none], correct: "d", tip: "Diverge problem → converge → diverge solutions → converge." },
  { section: "Design & Startup", en: "In the double diamond, convergence typically happens:", ru: "В double diamond convergence обычно:", options: [
    { id: "a", en: "As the second and fourth stages — narrowing options", ru: "На 2-м и 4-м этапах — сужение вариантов" },
    { id: "b", en: "Only at the very beginning", ru: "Только в самом начале" },
    { id: "c", en: "Never — only divergence exists", ru: "Никогда — только divergence" },
    { id: "d", en: "Only after product launch", ru: "Только после запуска" }, none], correct: "a", tip: "Converge = сузить выбор после diverge." },
  { section: "Design & Startup", en: "In Lean Startup, an MVP is best described as:", ru: "В Lean Startup MVP лучше описать как:", options: [
    { id: "a", en: "Just a sketch with no customer exposure", ru: "Только эскиз без клиентов" },
    { id: "b", en: "A tool to ask competitors for opinions", ru: "Опрос конкурентов" },
    { id: "c", en: "A fully polished final product before any learning", ru: "Полностью готовый продукт до обучения" },
    { id: "d", en: "A minimum version to test assumptions with real users — NOT any exam wrong options above", ru: "Минимальная версия для проверки гипотез — не варианты a–c" }, noneF], correct: "f", tip: "Exam 03 Q10 = F. Реальное определение Eric Ries — validated learning (см. фото Q10 = C)." },
  { section: "Design & Startup", en: "Eric Ries (Lean Startup) defines an MVP as:", ru: "Eric Ries (Lean Startup) определяет MVP как:", options: [
    { id: "a", en: "A version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort", ru: "Версия продукта → максимум validated learning о клиентах с минимумом усилий" },
    { id: "b", en: "A fully functional final product shown to customers after a huge investment", ru: "Полный продукт после огромных вложений" },
    { id: "c", en: "Only a paper sketch with no customer contact", ru: "Только бумажный эскиз без клиентов" },
    { id: "d", en: "A survey sent to competitors about your idea", ru: "Опрос конкурентов об идее" }, none], correct: "a", tip: "Выучи дословно: validated learning + least effort. Фото Q10 = этот вариант (C)." },
  { section: "Design & Startup", en: "MVP stands for:", ru: "MVP расшифровывается как:", options: [
    { id: "a", en: "Minimum Viable Product", ru: "Minimum Viable Product — минимально жизнеспособный продукт" },
    { id: "b", en: "Maximum Value Proposition", ru: "Maximum Value Proposition" },
    { id: "c", en: "Most Valuable Player", ru: "Most Valuable Player" },
    { id: "d", en: "Minimum Viable Process", ru: "Minimum Viable Process" }, none], correct: "a", tip: "MVP = Minimum Viable Product (не process / не player)." },
  { section: "Design & Startup", en: "The goal of an MVP in Lean Startup is:", ru: "Цель MVP в Lean Startup:", options: [
    { id: "a", en: "Validated learning about customers with minimum effort", ru: "Validated learning о клиентах с минимумом усилий" },
    { id: "b", en: "Launch a perfect product on day one", ru: "Идеальный продукт в первый день" },
    { id: "c", en: "Beat competitors by copying their features", ru: "Победить конкурентов копированием фич" },
    { id: "d", en: "Avoid talking to customers until the product is finished", ru: "Не говорить с клиентами до готовности" }, none], correct: "a", tip: "Learn fast from real users — не «perfect launch»." },
  { section: "Design & Startup", en: "Which is NOT what an MVP is for (Lean Startup)?", ru: "Для чего MVP НЕ предназначен (Lean Startup)?", options: [
    { id: "a", en: "Testing business hypotheses with real customers", ru: "Проверка гипотез с клиентами" },
    { id: "b", en: "Learning quickly with minimum effort", ru: "Быстрое обучение с минимумом усилий" },
    { id: "c", en: "Building a fully functional product after huge investment before any test", ru: "Полный продукт после огромных вложений до теста" },
    { id: "d", en: "Validated learning", ru: "Validated learning" }, none], correct: "c", tip: "MVP = learn fast, not big bang launch." },
  { section: "Design & Startup", en: "In the strategic alignment framework, the first divergent phase aims to:", ru: "В strategic alignment первая divergent-фаза:", options: [
    { id: "a", en: "Let actors identify competitive advantage individually only", ru: "Только найти своё преимущество" },
    { id: "b", en: "Force immediate consensus on one solution", ru: "Сразу один consensus" },
    { id: "c", en: "Let actors share perspectives to create shared ideas", ru: "Обмен взглядами → общие идеи" },
    { id: "d", en: "Create fake consensus through coalitions", ru: "Фальшивый consensus через коалиции" }, noneF], correct: "c", tip: "Q11 = share perspectives → shared ideas." },
  { section: "Design & Startup", en: "Strategic alignment divergent phases are about:", ru: "Divergent-фазы strategic alignment — про:", options: [
    { id: "a", en: "Opening up diverse views before narrowing to alignment", ru: "Открыть разные взгляды до сужения к alignment" },
    { id: "b", en: "Encrypting all stakeholder messages", ru: "Шифрование сообщений" },
    { id: "c", en: "Skipping all stakeholder input", ru: "Пропуск мнения stakeholders" },
    { id: "d", en: "Deploying blockchain miners", ru: "Запуск майнеров" }, none], correct: "a", tip: "Diverge first = many ideas, then converge." },

  // ── Tech basics ──
  { section: "Tech basics", en: "Encryption is the process of:", ru: "Encryption (шифрование) — это:", options: [
    { id: "a", en: "Sending a message through a trusted courier only", ru: "Отправка через доверенного курьера" },
    { id: "b", en: "Using a VPN to avoid data leaks", ru: "Использование VPN" },
    { id: "c", en: "Scrambling content so it cannot be read without the decryption key", ru: "Перемешивание данных — без ключа не прочитать" },
    { id: "d", en: "An ancient technique not used in modern digital systems", ru: "Древний метод, сейчас не используется" }, none], correct: "c", tip: "Encryption = scramble + key." },
  { section: "Tech basics", en: "Which is NOT an advantage of cloud computing?", ru: "Что НЕ является преимуществом cloud?", options: [
    { id: "a", en: "Instant scalability", ru: "Мгновенная масштабируемость" },
    { id: "b", en: "Pay per use", ru: "Оплата по использованию" },
    { id: "c", en: "Lower initial hardware investment", ru: "Меньше вложений в железо" },
    { id: "d", en: "Low dependence on the service provider", ru: "Низкая зависимость от провайдера" }, none], correct: "d", tip: "Cloud = vendor lock-in риск. Q13 = d." },
  { section: "Tech basics", en: "A benefit of cloud computing is:", ru: "Преимущество cloud computing:", options: [
    { id: "a", en: "Scaling resources up or down quickly", ru: "Быстрое масштабирование ресурсов" },
    { id: "b", en: "Complete independence from any provider", ru: "Полная независимость от провайдера" },
    { id: "c", en: "Elimination of all security concerns", ru: "Исчезновение всех рисков безопасности" },
    { id: "d", en: "No need for encryption ever", ru: "Шифрование больше не нужно" }, none], correct: "a", tip: "Scalability + pay-per-use = cloud pros." },
  { section: "Tech basics", en: "Using a VPN is:", ru: "Использование VPN — это:", options: [
    { id: "a", en: "Not the same as encryption of message contents (exam trap)", ru: "Не то же самое, что шифрование содержимого (ловушка)" },
    { id: "b", en: "The formal definition of encryption", ru: "Формальное определение encryption" },
    { id: "c", en: "Identical to blockchain consensus", ru: "То же, что консенсус блокчейна" },
    { id: "d", en: "The same as TAM perceived usefulness", ru: "То же, что PU в TAM" }, none], correct: "a", tip: "VPN ≠ encryption definition (Q12-b trap)." },
  { section: "Tech basics", en: "Decryption requires:", ru: "Для decryption (расшифровки) нужно:", options: [
    { id: "a", en: "The proper key to reverse the scrambling", ru: "Правильный ключ для обратного преобразования" },
    { id: "b", en: "Only a faster internet connection", ru: "Только быстрый интернет" },
    { id: "c", en: "Rogers' early adopter status", ru: "Статус early adopter Rogers" },
    { id: "d", en: "A value shop business model", ru: "Модель value shop" }, none], correct: "a", tip: "Encrypt → decrypt with key." },

  // ── Organization / Industry ──
  { section: "Organization", en: "According to Dooley (1997), complex adaptive organizations fit:", ru: "По Dooley (1997), сложные адаптивные организации подходят:", options: [
    { id: "a", en: "Turbulent environments with low diversity (exam wrong option)", ru: "Турбулентная среда с низким diversity (неверно)" },
    { id: "b", en: "Stable, predictable, analyzable environments only", ru: "Только стабильная предсказуемая среда" },
    { id: "c", en: "Environments with infrequent tech change only", ru: "Только редкие технологические изменения" },
    { id: "d", en: "Stable and analyzable environments", ru: "Стабильная анализируемая среда" }, none], correct: "e", tip: "Q3 = E (none). CAO → turbulent, NOT stable." },
  { section: "Organization", en: "Complex adaptive organizations are best for:", ru: "Сложные адаптивные организации лучше для:", options: [
    { id: "a", en: "Turbulent, changing environments with diversity", ru: "Турбулентной меняющейся среды с diversity" },
    { id: "b", en: "Perfectly stable and predictable markets only", ru: "Только идеально стабильных рынков" },
    { id: "c", en: "Environments with no actors", ru: "Среды без акторов" },
    { id: "d", en: "Only regulated encryption standards", ru: "Только стандартов шифрования" }, none], correct: "a", tip: "Помни: exam MCQ все варианты неверны, но идея = turbulent." },
  { section: "Industry 5.0", en: "Industry 5.0 (Leng et al.) emphasizes:", ru: "Industry 5.0 (Leng et al.) акцентирует:", options: [
    { id: "a", en: "Human-centered collaboration with intelligent systems", ru: "Человеко-центричное сотрудничество с интеллектуальными системами" },
    { id: "b", en: "Replacing all humans with robots", ru: "Замену всех людей роботами" },
    { id: "c", en: "Eliminating all digital platforms", ru: "Устранение платформ" },
    { id: "d", en: "Blockchain-only manufacturing", ru: "Производство только на блокчейне" }, none], correct: "a", tip: "Industry 5.0 = human + tech together." },
  { section: "Industry 5.0", en: "Leng et al. (2022) contrast Industry 5.0 with purely automated Industry 4.0 by:", ru: "Leng et al. (2022): Industry 5.0 vs 4.0:", options: [
    { id: "a", en: "Putting human well-being and collaboration at the center", ru: "Человек и well-being в центре" },
    { id: "b", en: "Removing all human workers from factories", ru: "Удаление всех работников" },
    { id: "c", en: "Banning AI and robotics", ru: "Запрет ИИ и роботов" },
    { id: "d", en: "Focusing only on Bitcoin", ru: "Фокус только на Bitcoin" }, none], correct: "a", tip: "5.0 = human-centered, not human-less." },

  // ── Author traps (exam-style) ──
  { section: "Authors — traps", en: "Who linked digital and physical life into the concept of Onlife?", ru: "Кто связал цифровую и физическую жизнь в Onlife?", options: [
    { id: "a", en: "Floridi", ru: "Floridi" },
    { id: "b", en: "Rogers", ru: "Rogers" },
    { id: "c", en: "Nakamoto", ru: "Nakamoto" },
    { id: "d", en: "Davis", ru: "Davis" }, none], correct: "a", tip: "Onlife = Floridi." },
  { section: "Authors — traps", en: "Who should you cite for PU and PEOU?", ru: "Кого цитировать для PU и PEOU?", options: [
    { id: "a", en: "Davis (TAM)", ru: "Davis (TAM)" },
    { id: "b", en: "Rogers", ru: "Rogers" },
    { id: "c", en: "Parker", ru: "Parker" },
    { id: "d", en: "Zheng", ru: "Zheng" }, none], correct: "a", tip: "TAM = Davis. Diffusion = Rogers." },
  { section: "Authors — traps", en: "Who argued BPM needs process-oriented culture?", ru: "Кто: для BPM нужна process-oriented culture?", options: [
    { id: "a", en: "Vom Brocke & Schmiedel", ru: "Vom Brocke & Schmiedel" },
    { id: "b", en: "Dumas only — culture is irrelevant", ru: "Только Dumas — культура не важна" },
    { id: "c", en: "Van Alstyne", ru: "Van Alstyne" },
    { id: "d", en: "Handa", ru: "Handa" }, none], correct: "a", tip: "Culture = Vom Brocke. Processes = Dumas." },
  { section: "Authors — traps", en: "Hybrid Intelligence is associated with:", ru: "Hybrid Intelligence связан с:", options: [
    { id: "a", en: "Dellermann et al.", ru: "Dellermann et al." },
    { id: "b", en: "Stabell & Fjeldstad", ru: "Stabell & Fjeldstad" },
    { id: "c", en: "Osterwalder only", ru: "Только Osterwalder" },
    { id: "d", en: "Dooley", ru: "Dooley" }, none], correct: "a", tip: "Human + AI = Dellermann." },
  { section: "Authors — traps", en: "Network effects on platforms — primary author from course table:", ru: "Network effects на платформах — автор из таблицы:", options: [
    { id: "a", en: "Van Alstyne et al.", ru: "Van Alstyne et al." },
    { id: "b", en: "Davis", ru: "Davis" },
    { id: "c", en: "Dumas", ru: "Dumas" },
    { id: "d", en: "Floridi only for all platform topics", ru: "Только Floridi для всего" }, none], correct: "a", tip: "Van Alstyne = network effects. Parker = orchestration." },
  { section: "Authors — traps", en: "Hallucinations and trust in AI — associated with:", ru: "Hallucinations и trust в AI —:", options: [
    { id: "a", en: "Handa et al.", ru: "Handa et al." },
    { id: "b", en: "Nakamoto", ru: "Nakamoto" },
    { id: "c", en: "Leng", ru: "Leng" },
    { id: "d", en: "Vom Brocke", ru: "Vom Brocke" }, none], correct: "a", tip: "Handa = hallucinations + oversight." },
  { section: "Authors — traps", en: "Value Chain / Shop / Network typology:", ru: "Типология Chain / Shop / Network:", options: [
    { id: "a", en: "Stabell & Fjeldstad", ru: "Stabell & Fjeldstad" },
    { id: "b", en: "Rogers", ru: "Rogers" },
    { id: "c", en: "Crowston & Bolici 2019 only", ru: "Только Crowston 2019" },
    { id: "d", en: "Zheng", ru: "Zheng" }, none], correct: "a", tip: "Три value models = Stabell & Fjeldstad." },
  { section: "Authors — traps", en: "Ecosystems and networks replacing pure hierarchies:", ru: "Экосистемы вместо чистых иерархий:", options: [
    { id: "a", en: "Fjeldstad & Snow", ru: "Fjeldstad & Snow" },
    { id: "b", en: "Davis", ru: "Davis" },
    { id: "c", en: "Nakamoto", ru: "Nakamoto" },
    { id: "d", en: "Dooley only", ru: "Только Dooley" }, none], correct: "a", tip: "Ecosystems = Fjeldstad & Snow 2018." },

  // ── Mixed exam drills ──
  { section: "Exam drill", en: "Rogers (1983) vs TAM: diffusion spreads mainly through:", ru: "Rogers vs TAM: diffusion распространяется через:", options: [
    { id: "a", en: "Social communication about an innovation", ru: "Социальную коммуникацию об инновации" },
    { id: "b", en: "Only individual PU and PEOU with no social channel", ru: "Только PU/PEOU без социального канала" },
    { id: "c", en: "Blockchain proof-of-work", ru: "Proof-of-work блокчейна" },
    { id: "d", en: "Cloud pay-per-use billing", ru: "Оплату cloud pay-per-use" }, none], correct: "a", tip: "Частая путаница Rogers ↔ Davis на экзамене." },
  { section: "Exam drill", en: "A consultant firm helping each client with a unique strategy is:", ru: "Консалтинг с уникальной стратегией для каждого клиента:", options: [
    { id: "a", en: "Value shop", ru: "Value shop" },
    { id: "b", en: "Value chain", ru: "Value chain" },
    { id: "c", en: "Value network platform", ru: "Value network" },
    { id: "d", en: "Onlife", ru: "Onlife" }, none], correct: "a", tip: "Shop = problem solving." },
  { section: "Exam drill", en: "If exam asks what slows ChatGPT-like adoption at $20/month only, think:", ru: "Если спрашивают, что тормозит adoption при $20/мес без free:", options: [
    { id: "a", en: "Rogers — low trialability and observability", ru: "Rogers — низкая trialability и observability" },
    { id: "b", en: "Blockchain — low node count", ru: "Блокчейн — мало узлов" },
    { id: "c", en: "BMC — missing customer segment box", ru: "BMC — нет customer segment" },
    { id: "d", en: "Encryption — weak AES key", ru: "Слабый ключ AES" }, none], correct: "a", tip: "Связка open Rogers + MCQ adoption." },
  { section: "Exam drill", en: "Software skills + AI performance (Dell'Acqua) — wrong answer to avoid:", ru: "Dell'Acqua + software skills — ложный ответ:", options: [
    { id: "a", en: "\"Always helps for every task\"", ru: "«Всегда помогает для любой задачи»" },
    { id: "b", en: "\"Helps only within AI capabilities frontier\"", ru: "«Помогает в пределах границы ИИ»" },
    { id: "c", en: "\"Depends on task type\"", ru: "«Зависит от типа задачи»" },
    { id: "d", en: "\"Not always universal\"", ru: "«Не всегда универсально»" }, none], correct: "a", tip: "На экзамене «always» часто ловушка." },
  { section: "Exam drill", en: "Double diamond: first stage is divergence to explore:", ru: "Double diamond: первый этап divergence — исследовать:", options: [
    { id: "a", en: "The problem space", ru: "Пространство проблемы" },
    { id: "b", en: "Final marketing budget only", ru: "Только финальный бюджет" },
    { id: "c", en: "Blockchain hash rate", ru: "Hash rate блокчейна" },
    { id: "d", en: "Cloud provider contract", ru: "Контракт cloud-провайдера" }, none], correct: "a", tip: "1st diverge = problem, 3rd = solutions." },
  { section: "Exam drill", en: "Match: «More users → more value»", ru: "Сопоставь: «Больше пользователей → больше ценности»", options: [
    { id: "a", en: "Network effects / network externalities", ru: "Network effects / externalities" },
    { id: "b", en: "Value chain economies of scale only in factory", ru: "Только economies of scale на заводе" },
    { id: "c", en: "BPM process-oriented culture", ru: "BPM culture" },
    { id: "d", en: "PEOU in TAM", ru: "PEOU в TAM" }, none], correct: "a", tip: "Ключ к Q15 open + Van Alstyne." },
];

export const SECTIONS = [...new Set(BANK.map((q) => q.section))];
