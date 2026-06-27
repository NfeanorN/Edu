/** Exam-paper style MCQ — exact photo wording + CFU6 + PDF variants */
const none = { id: "e", en: "None of the other answers is correct", ru: "Ни один из других ответов не верен" };
const nonePrev = { id: "e", en: "None of the previous answers is correct", ru: "Ни один из предыдущих ответов не верен" };
const noneF = { id: "f", en: "None of the other answers is correct", ru: "Ни один из других ответов не верен" };
const noneFprev = { id: "f", en: "None of the previous answers is correct", ru: "Ни один из предыдущих ответов не верен" };

/** Q1–8 + Q13 — CFU 6 (Key A) */
export const SET_CFU6 = [
  { en: "Currently, Artificial Intelligence is at the stage of:", ru: "ИИ сейчас находится на стадии:", options: [
    { id: "a", en: "Artificial General Intelligence", ru: "AGI (общий интеллект)" },
    { id: "b", en: "Artificial Narrow Intelligence", ru: "ANI (узкий интеллект)" },
    { id: "c", en: "Artificial Super Intelligence", ru: "ASI (сверхинтеллект)" },
    { id: "d", en: "Artificial Natural Intelligence", ru: "ANI (естественный)" }, none], correct: "b", tip: "Экзамен Q1 = B." },
  { en: "AI (Artificial Intelligence) is:", ru: "ИИ (Artificial Intelligence) — это:", options: [
    { id: "a", en: "Disruptive technology that emerged in November 2022 with ChatGPT", ru: "Дисruptивная технология с ноября 2022 и ChatGPT" },
    { id: "b", en: "Recognizes patterns and self-learns only if developer constantly checks", ru: "Распознаёт паттерны только если разработчик постоянно проверяет" },
    { id: "c", en: "Never going to evolve further", ru: "Никогда не будет развиваться дальше" },
    { id: "d", en: "Any device that perceives its environment and takes actions to maximize success at some goal", ru: "Устройство, воспринимающее среду и действующее для достижения цели" }, none], correct: "d", tip: "Экзамен Q2 = D." },
  { en: "According to Dooley (1997), complex adaptive organization is best suited for:", ru: "По Dooley (1997), сложная адаптивная организация лучше для среды:", options: [
    { id: "a", en: "Turbulent, low actor numerosity and low actor diversity", ru: "Турбулентной с низкой численностью и разнообразием акторов" },
    { id: "b", en: "One with infrequent technological changes", ru: "С редкими технологическими изменениями" },
    { id: "c", en: "Stable and predictable", ru: "Стабильной и предсказуемой" },
    { id: "d", en: "A stable and analyzable environment", ru: "Стабильной и анализируемой" }, none], correct: "e", tip: "Экзамен Q3 = E (ни один). CAO → турбулентная среда." },
  { en: "Solving customer problems is a key activity in the:", ru: "Решение проблем клиентов — ключевая активность в модели:", options: [
    { id: "a", en: "Value network business model", ru: "Value network" },
    { id: "b", en: "Value shop business model", ru: "Value shop" },
    { id: "c", en: "Value chain business model", ru: "Value chain" },
    { id: "d", en: "Value co-creation business model", ru: "Value co-creation" }, none], correct: "b", tip: "Экзамен Q4 = B. Shop = problem solving." },
  { en: "A Blockchain is:", ru: "Блокчейн — это:", options: [
    { id: "a", en: "Based on Bitcoin — the two are not divisible", ru: "Неразрывно связан с Bitcoin" },
    { id: "b", en: "Built on independent blocks not related among themselves", ru: "Независимые несвязанные блоки" },
    { id: "c", en: "A ledger of facts replicated across several computers in a peer-to-peer structure", ru: "Реестр фактов, реплицированный на нескольких компьютерах P2P" },
    { id: "d", en: "Less robust when the number of nodes increases", ru: "Менее устойчив при росте числа узлов" }, none], correct: "c", tip: "Экзамен Q5 = C." },
  { en: "According to Rogers (1983), innovation diffusion:", ru: "По Rogers (1983), диффузия инноваций:", options: [
    { id: "a", en: "Is a special kind of communication", ru: "Особый вид коммуникации" },
    { id: "b", en: "Individuals decide based on perceived usefulness and ease of use", ru: "Автономное решение на основе полезности и простоты (TAM!)" },
    { id: "c", en: "Is socially determined with negligible influence of innovation characteristics", ru: "Социально определена, характеристики инновации не важны" },
    { id: "d", en: "Spreads faster in networks with structural equivalence", ru: "Быстрее в сетях со structural equivalence" }, none], correct: "a", tip: "Экзамен Q6 = A. B = Davis/TAM ловушка." },
  { en: "The study of Dell'Acqua et al. (2023) suggests that:", ru: "Исследование Dell'Acqua et al. (2023):", options: [
    { id: "a", en: "Software engineering skills always associated with higher performance with AI", ru: "Навыки разработки ПО всегда повышают результат с ИИ" },
    { id: "b", en: "Software engineering skills associated with higher performance only for tasks within the AI capabilities frontier", ru: "Навыки разработки повышают результат только в пределах «границы возможностей ИИ»" },
    { id: "c", en: "Prompt engineering always associated with higher performance", ru: "Prompt engineering всегда повышает результат" },
    { id: "d", en: "Domain skills will become increasingly relevant as AI cannot reproduce them", ru: "Доменные навыки станут ещё важнее, т.к. ИИ их не воспроизводит" }, none], correct: "b", tip: "Экзамен Q7 = B. «Always» = ловушка." },
  { en: "In Design Thinking, within the double diamond framework:", ru: "В double diamond design framework:", options: [
    { id: "a", en: "Convergence is the first stage to align stakeholders on the problem", ru: "Конвергенция — первый этап для согласования проблемы" },
    { id: "b", en: "Divergence occurs first to identify potential solutions", ru: "Дивергенция — первый этап для идей решений" },
    { id: "c", en: "Convergence occurs as both first and third stage", ru: "Конвергенция — первый и третий этап" },
    { id: "d", en: "Divergence is the first and third step, exploring problem and solutions", ru: "Дивергенция — первый и третий этап (проблема и решения)" }, none], correct: "d", tip: "Экзамен Q8 = D." },
  { en: "According to the original Technology Acceptance Model (TAM), \"Perceived Ease of Use\" is defined as:", ru: "По оригинальной TAM, «Perceived Ease of Use» — это:", options: [
    { id: "a", en: "The degree to which a person believes that using a particular system would enhance his or her job performance", ru: "Степень, в которой система улучшит работу (это PU!)" },
    { id: "b", en: "The degree to which a person believes that using a particular system would be free of effort", ru: "Степень, в которой системой легко пользоваться (без лишних усилий)" },
    { id: "c", en: "The degree to which a person believes that using a particular system would be fun", ru: "Степень, в которой использование кажется приятным" },
    { id: "d", en: "The degree to which a person believes that using a particular system would be easy to learn", ru: "Степень, в которой систему легко выучить" }, none], correct: "b", tip: "Экзамен Q9 = B." },
  { en: "In the Lean Startup approach, an MVP:", ru: "В Lean Startup подходе MVP:", options: [
    { id: "a", en: "Is just a prototype — the sketch of the product the company is going to offer", ru: "Только прототип / эскиз будущего продукта" },
    { id: "b", en: "Is used to ask competitors what they think of your product idea", ru: "Нужен, чтобы спросить конкурентов их мнение об идее" },
    { id: "c", en: "Is used to build an idea by exposing a fully functional product to the customers", ru: "Полностью готовый продукт для клиентов" },
    { id: "d", en: "Allows for testing an idea by exposing a fully functional version to the customers", ru: "Полностью готовая версия для теста клиентами" },
    { id: "e", en: "Allows for testing an idea by exposing a fully functional version only after a huge initial investment", ru: "Полная версия только после больших затрат" }, noneF], correct: "f", tip: "Экзамен 03 Q10 = F (все a–e неверны на бланке CFU6)." },
  { en: "In the strategic alignment framework, the first divergent phase aims to:", ru: "В strategic alignment framework первая divergent-фаза:", options: [
    { id: "a", en: "Allow actors to identify their competitive advantage", ru: "Помочь акторам найти конкурентное преимущество" },
    { id: "b", en: "Allow actors to converge towards a common solution", ru: "Свести акторов к одному общему решению" },
    { id: "c", en: "Allow a set of actors to share their perspectives to create a set of shared ideas", ru: "Дать акторам обменяться взглядами и создать общие идеи" },
    { id: "d", en: "Allow a set of actors to share their shared ideas", ru: "Дать акторам поделиться уже общими идеями" },
    { id: "e", en: "Allow actors to share ideas by creating coalitions to manipulate the solution so consensus is not genuine", ru: "Создать коалиции для манипуляции решением" }, noneF], correct: "c", tip: "Экзамен Q11 = C." },
  { en: "Encryption is the process of:", ru: "Шифрование (encryption) — это процесс:", options: [
    { id: "a", en: "Sending a message through a very trusted communication channel or messenger", ru: "Отправка через доверенный канал или курьера" },
    { id: "b", en: "Using a VPN in order to avoid data leaks", ru: "Использование VPN" },
    { id: "c", en: "Scrambling the contents of a text/file so that it can't be read without the proper decryption key", ru: "Перемешивание текста/файла — без ключа не прочитать" },
    { id: "d", en: "Hiding the message through an ancient technique; nowadays encryption is not used in digital systems", ru: "Древний способ; сейчас не используется" }, none], correct: "c", tip: "Экзамен Q12 = C." },
  { en: "Which is NOT an advantage of using cloud computing services?", ru: "Что НЕ является преимуществом облачных вычислений?", options: [
    { id: "a", en: "Instant scalability", ru: "Мгновенная масштабируемость" },
    { id: "b", en: "Pay per use", ru: "Оплата по использованию" },
    { id: "c", en: "Lower initial investment in hardware", ru: "Меньше начальных инвестиций в железо" },
    { id: "d", en: "Low dependence on the service provider", ru: "Низкая зависимость от провайдера" }, none], correct: "d", tip: "Экзамен Q13 = D." },
  { en: "Onlife describes:", ru: "Onlife описывает:", options: [
    { id: "a", en: "A condition where social media interactions mainly threaten privacy", ru: "Соцсети в основном угрожают приватности" },
    { id: "b", en: "A future in which human life exists only in digital environments", ru: "Жизнь только в цифровой среде" },
    { id: "c", en: "A condition where real and digital worlds become difficult to separate", ru: "Реальный и цифровой мир трудно разделить" },
    { id: "d", en: "A business model for selling digital objects through online platforms", ru: "БМ продажи цифровых объектов" }, nonePrev], correct: "c", tip: "Экзамен Q14 = C." },
];

/** Q9–14 — exact wording from exam photo (Key A) */
export const SET_PHOTO_9_14 = [
  { en: "According to the original Technology Acceptance Model (TAM), \"Perceived Ease of Use\" is defined as:", ru: "По TAM, «Perceived Ease of Use» (как на бланке):", options: [
    { id: "a", en: "The degree to which a person believes that using a particular system would enhance his or her job performance", ru: "Система улучшит работу (PU — ловушка)" },
    { id: "b", en: "The degree to which a person believes that using a particular system would be free of effort", ru: "Системой легко пользоваться (без лишних усилий)" },
    { id: "c", en: "The degree to which a person believes that a system meets and needs the users' requirements and expectations", ru: "Система отвечает требованиям пользователей" },
    { id: "d", en: "The degree to which a system helps users in achieving a target behavior with the minimum amount of errors", ru: "Минимум ошибок при достижении цели" }, nonePrev], correct: "b", tip: "Фото Q9 = B. A = Perceived Usefulness." },
  { en: "In the Lean Startup approach, an MVP:", ru: "В Lean Startup MVP (формулировка с фото):", options: [
    { id: "a", en: "Is basically just a prototype — the sketch of the product the company is going to build", ru: "Только прототип / эскиз" },
    { id: "b", en: "Is used to understand from competitors what they think of your product or service idea", ru: "Спросить конкурентов" },
    { id: "c", en: "Is a version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort", ru: "Validated learning с минимумом усилий (Eric Ries)" },
    { id: "d", en: "Is a version of a product for testing an idea by exposing a fully functional version of the product to the customers", ru: "Полностью готовый продукт для клиентов" },
    { id: "e", en: "Is a version of a product that is only ready after a huge initial investment in time and money", ru: "Готов только после огромных вложений" }, noneFprev], correct: "c", tip: "На ФОТО Q10 = C (классическое определение MVP). В 03 другие варианты → ответ F." },
  { en: "In the Business Ecosystem framework, the first divergent phase allows the focal firm to:", ru: "Business Ecosystem framework — первая divergent-фаза (с фото):", options: [
    { id: "a", en: "Help other actors to identify their competitive advantage", ru: "Помочь другим найти конкурентное преимущество" },
    { id: "b", en: "Mobilize a set of actors to converge towards a common vision", ru: "Свести акторов к общему vision" },
    { id: "c", en: "Mobilize a set of actors to identify their shared ideas", ru: "Мобилизовать акторов выявить общие идеи" },
    { id: "d", en: "Mobilize a set of actors to converge towards creating coalitions and building a system of mutual value", ru: "Коалиции и взаимная ценность" },
    { id: "e", en: "Allow the firm to explore a system of multiple shared ideas to converge towards a common vision, thereby any contribution from the other actors of the ecosystem is correct", ru: "Длинный вариант про shared ideas → vision" }, noneFprev], correct: "c", tip: "Фото Q11 = C. Похоже на strategic alignment Q11." },
  { en: "Encryption is the process of:", ru: "Encryption (формулировка с фото):", options: [
    { id: "a", en: "Sending to the receiver a message through a very trusted communication channel or messenger", ru: "Доверенный канал / курьер" },
    { id: "b", en: "Using a VPN (virtual private network) in order to avoid data sniffing", ru: "VPN против перехвата" },
    { id: "c", en: "Scrambling the contents of a text/file so that it can't be read without using the proper decryption key", ru: "Scrambling — нужен ключ расшифровки" },
    { id: "d", en: "Hiding the message through a technique well known since ancient times. However, nowadays, encryption is not used in any digital systems", ru: "Древний способ, сейчас не используется" }, none], correct: "c", tip: "Фото Q12 = C." },
  { en: "Which is NOT an advantage of using cloud computing services?", ru: "Что НЕ преимущество cloud (Q13 бланка):", options: [
    { id: "a", en: "Instant scalability", ru: "Мгновенная масштабируемость" },
    { id: "b", en: "Pay per use", ru: "Оплата по использованию" },
    { id: "c", en: "Lower initial investment in hardware", ru: "Меньше вложений в железо" },
    { id: "d", en: "Low dependence on the service provider", ru: "Низкая зависимость от провайдера" }, none], correct: "d", tip: "Q13 = D. Cloud = vendor dependence." },
  { en: "Onlife describes:", ru: "Onlife (формулировка с фото):", options: [
    { id: "a", en: "A condition where social media interactions mainly threaten privacy", ru: "Соцсети угрожают приватности" },
    { id: "b", en: "A future in which human life exists only in digital environments", ru: "Жизнь только в цифре" },
    { id: "c", en: "A condition where real and digital worlds become difficult to separate", ru: "Реальный и цифровой мир трудно разделить" },
    { id: "d", en: "A business model for selling digital objects through online platforms", ru: "БМ продажи цифровых объектов" }, nonePrev], correct: "c", tip: "Фото Q14 = C." },
];

/** Full photo set: Q1–8 CFU + Q9–14 photo exact */
export const SET_PHOTO_FULL = [
  ...SET_CFU6.slice(0, 8),
  ...SET_PHOTO_9_14,
];

/** HR / DI PDF variant (different 14) */
export const SET_HR_VARIANT = [
  ...SET_CFU6.slice(0, 8),
  { en: "Considering Value Configuration Models, the Value Network:", ru: "Value Network (конфигурация ценности):", options: [
    { id: "a", en: "Aims to investigate customer problems to propose solutions", ru: "Исследует проблемы клиентов (это shop)" },
    { id: "b", en: "Main aim is to facilitate relationships among customers; broad user base and safe connection flow", ru: "Связи между клиентами; широкая база пользователей" },
    { id: "c", en: "Every digital business is a Network Value model", ru: "Любой digital-бизнес = network" },
    { id: "d", en: "Has problem solving as the core of its model", ru: "Problem solving в ядре (это shop)" }, none], correct: "b", tip: "PDF вариант Q9 = B." },
  { en: "In Rogers's theory, system's norms refer to:", ru: "System's norms по Rogers:", options: [
    { id: "a", en: "Legally accepted behavior guiding members", ru: "Юридически принятое поведение" },
    { id: "b", en: "Degree to which an individual can influence others' attitudes", ru: "Влияние на отношения других" },
    { id: "c", en: "Patterned arrangements such as density and numerosity", ru: "Плотность и численность акторов" },
    { id: "d", en: "Tolerable behavior as a standard, although not legally binding", ru: "Допустимое поведение-стандарт, не обязательное юридически" }, none], correct: "d", tip: "PDF Q10 = D. Norms = tolerable standard." },
  { en: "The Internet is based on which communication protocol?", ru: "Интернет основан на протоколе:", options: [
    { id: "a", en: "The World Wide Web protocol", ru: "WWW" },
    { id: "b", en: "The SHA256 protocol", ru: "SHA256" },
    { id: "c", en: "The TCP/IP protocol", ru: "TCP/IP" },
    { id: "d", en: "Many protocols because of SEO algorithms", ru: "Много протоколов из-за SEO" }, none], correct: "c", tip: "PDF Q11 = C. WWW ≠ Internet protocol." },
  SET_CFU6[12], // cloud NOT advantage
  { en: "Bitcoins are:", ru: "Bitcoins:", options: [
    { id: "a", en: "Inflationary by design in limited supply", ru: "Инфляционные при ограниченном предложении" },
    { id: "b", en: "Based on a decentralized system", ru: "Основаны на децентрализованной системе" },
    { id: "c", en: "Unlimited in supply", ru: "Неограниченное предложение" },
    { id: "d", en: "Cryptocurrency backed in gold by the UN", ru: "Обеспечены золотом ООН" }, none], correct: "b", tip: "PDF Q13 = B." },
  { en: "Onlife describes:", ru: "Onlife (PDF вариант):", options: [
    { id: "a", en: "Interactions between real world and social media endanger privacy", ru: "Соцсети угрожают приватности" },
    { id: "b", en: "Interactions between real and digital world exist so the two cannot be divided", ru: "Реальный и цифровой мир нельзя разделить" },
    { id: "c", en: "Future where life solely exists in digital world through VR", ru: "Жизнь только в VR" },
    { id: "d", en: "Business model for selling digital objects in virtual environments", ru: "БМ продажи в VR" }, nonePrev], correct: "b", tip: "PDF Q14 = B (формулировка чуть иная, смысл как C)." },
];

/** Extra exam-style traps (photo / PDF patterns) */
export const SET_VARIANTS = [
  { en: "According to the original TAM, \"Perceived Usefulness\" is defined as:", ru: "TAM — Perceived Usefulness (PU):", options: [
    { id: "a", en: "The degree to which using a system would enhance job performance", ru: "Улучшит работу" },
    { id: "b", en: "The degree to which using a system would be free of effort", ru: "Без лишних усилий (это PEOU!)" },
    { id: "c", en: "The degree to which a system meets users' requirements and expectations", ru: "Отвечает требованиям" },
    { id: "d", en: "The degree to which friends recommend the system", ru: "Друзья рекомендуют" }, nonePrev], correct: "a", tip: "PU = performance. Не путай с PEOU (B)." },
  { en: "In Rogers's theory, structural equivalence refers to:", ru: "Structural equivalence по Rogers:", options: [
    { id: "a", en: "Actors occupying similar positions in a network", ru: "Акторы в похожих позициях сети" },
    { id: "b", en: "Perceived ease of use of an innovation", ru: "PEOU инновации" },
    { id: "c", en: "Encryption key exchange protocol", ru: "Протокол обмена ключами" },
    { id: "d", en: "Cloud vendor lock-in", ru: "Зависимость от cloud-провайдера" }, none], correct: "a", tip: "Ловушка из Q6-d: structural equivalence = сеть, не Rogers diffusion definition." },
  { en: "Mediating relationships among customers is the core of:", ru: "Посредничество между клиентами — ядро модели:", options: [
    { id: "a", en: "Value network", ru: "Value network" },
    { id: "b", en: "Value shop", ru: "Value shop" },
    { id: "c", en: "Value chain", ru: "Value chain" },
    { id: "d", en: "BPM process redesign", ru: "BPM redesign" }, none], correct: "a", tip: "Network = связи. Shop = решение проблем." },
  { en: "Efficient transformation of inputs into products characterizes:", ru: "Эффективное преобразование входов в продукты:", options: [
    { id: "a", en: "Value chain", ru: "Value chain" },
    { id: "b", en: "Value shop", ru: "Value shop" },
    { id: "c", en: "Value network", ru: "Value network" },
    { id: "d", en: "Onlife", ru: "Onlife" }, none], correct: "a", tip: "Chain = производство. Shop = диагностика проблем." },
  { en: "The World Wide Web (WWW) is:", ru: "World Wide Web (WWW):", options: [
    { id: "a", en: "A service running on top of the Internet", ru: "Сервис поверх Интернета" },
    { id: "b", en: "The same as the TCP/IP protocol", ru: "То же, что TCP/IP" },
    { id: "c", en: "A blockchain consensus algorithm", ru: "Алгоритм консенсуса блокчейна" },
    { id: "d", en: "A cloud storage provider", ru: "Cloud-провайдер хранения" }, none], correct: "a", tip: "WWW ≠ Internet. TCP/IP = протокол сети." },
  { en: "Bitcoin's supply is:", ru: "Предложение Bitcoin:", options: [
    { id: "a", en: "Capped (limited) by design", ru: "Ограничено по дизайну" },
    { id: "b", en: "Unlimited — infinite coins can be mined forever", ru: "Бесконечное" },
    { id: "c", en: "Controlled by a single central bank", ru: "Контролируется центробанком" },
    { id: "d", en: "Backed by physical gold reserves", ru: "Обеспечено золотом" }, none], correct: "a", tip: "Bitcoin = limited supply + decentralized." },
  { en: "In the double diamond, the SECOND stage is typically:", ru: "В double diamond ВТОРОЙ этап:", options: [
    { id: "a", en: "Convergence — narrowing the problem definition", ru: "Convergence — сужение проблемы" },
    { id: "b", en: "Divergence — exploring more problems", ru: "Divergence — ещё проблемы" },
    { id: "c", en: "Product launch", ru: "Запуск продукта" },
    { id: "d", en: "Blockchain deployment", ru: "Развёртывание блокчейна" }, none], correct: "a", tip: "1 diverge problem → 2 converge problem → 3 diverge solutions → 4 converge." },
  { en: "In strategic alignment, convergent phases aim to:", ru: "Convergent-фазы strategic alignment:", options: [
    { id: "a", en: "Narrow options toward shared alignment", ru: "Сузить варианты к общему alignment" },
    { id: "b", en: "Maximize the number of conflicting ideas", ru: "Максимум конфликтующих идей" },
    { id: "c", en: "Skip stakeholder input", ru: "Пропустить мнение stakeholders" },
    { id: "d", en: "Deploy MVP without customer contact", ru: "MVP без контакта с клиентами" }, none], correct: "a", tip: "Converge = сузить. Diverge = открыть." },
  { en: "Prompt engineering skills, according to Dell'Acqua et al.,:", ru: "Prompt engineering по Dell'Acqua:", options: [
    { id: "a", en: "Always guarantee higher performance in every task", ru: "Всегда повышают результат" },
    { id: "b", en: "Are not always associated with higher performance", ru: "Не всегда связаны с более высоким результатом" },
    { id: "c", en: "Replace all domain expertise permanently", ru: "Навсегда заменяют доменную экспертизу" },
    { id: "d", en: "Eliminate the AI capabilities frontier", ru: "Убирают границу возможностей ИИ" }, none], correct: "b", tip: "Ловушка Q7-c: «always» неверно." },
  { en: "Domain skills, according to Dell'Acqua et al. (exam trap option),:", ru: "Domain skills (ловушка Dell'Acqua Q7-d):", options: [
    { id: "a", en: "Will become irrelevant because AI reproduces them perfectly", ru: "Станут неважны — ИИ всё воспроизводит" },
    { id: "b", en: "Remain important; AI does not fully replace domain expertise", ru: "Остаются важны; ИИ не заменяет экспертизу полностью" },
    { id: "c", en: "Are only useful outside the AI frontier", ru: "Полезны только вне границы ИИ" },
    { id: "d", en: "Are identical to software engineering skills", ru: "То же, что software engineering" }, none], correct: "b", tip: "Вариант d на экзамене — ловушка." },
  { en: "A decentralized ledger replicated across peers best describes:", ru: "Децентрализованный реестр на peer-узлах:", options: [
    { id: "a", en: "Blockchain", ru: "Blockchain" },
    { id: "b", en: "VPN", ru: "VPN" },
    { id: "c", en: "TAM", ru: "TAM" },
    { id: "d", en: "MVP in Lean Startup", ru: "MVP Lean Startup" }, none], correct: "a", tip: "Как Q5 экзамена." },
  { en: "Innovation diffusion as \"special kind of communication\" is:", ru: "Diffusion как «особый вид коммуникации»:", options: [
    { id: "a", en: "Rogers (1983)", ru: "Rogers" },
    { id: "b", en: "Davis TAM", ru: "Davis" },
    { id: "c", en: "Floridi Onlife", ru: "Floridi" },
    { id: "d", en: "Nakamoto", ru: "Nakamoto" }, none], correct: "a", tip: "Rogers Q6." },
  { en: "The infosphere is a concept associated with:", ru: "Infosphere связан с:", options: [
    { id: "a", en: "Floridi and Onlife", ru: "Floridi и Onlife" },
    { id: "b", en: "Rogers diffusion", ru: "Rogers" },
    { id: "c", en: "TCP/IP stack", ru: "TCP/IP" },
    { id: "d", en: "Lean Startup MVP", ru: "MVP" }, none], correct: "a", tip: "Floridi = onlife + infosphere." },
  { en: "Hybrid Intelligence is proposed by:", ru: "Hybrid Intelligence — авторы:", options: [
    { id: "a", en: "Dellermann et al.", ru: "Dellermann et al." },
    { id: "b", en: "Dell'Acqua et al. only", ru: "Только Dell'Acqua" },
    { id: "c", en: "Stabell & Fjeldstad", ru: "Stabell & Fjeldstad" },
    { id: "d", en: "Vom Brocke", ru: "Vom Brocke" }, none], correct: "a", tip: "Human + AI = Dellermann." },
];

export const SETS = [
  { id: "cfu6", label: "Set 1 — CFU 6 Key A (как 03)", questions: SET_CFU6 },
  { id: "photo", label: "Set 2 — Фото Q9–14 (точный текст)", questions: SET_PHOTO_9_14 },
  { id: "photo-full", label: "Set 3 — Фото Q1–8 + Q9–14", questions: SET_PHOTO_FULL },
  { id: "hr", label: "Set 4 — PDF вариант (Value Network, TCP/IP…)", questions: SET_HR_VARIANT },
  { id: "variants", label: "Set 5 — Ловушки и перефразировки (14)", questions: SET_VARIANTS },
  { id: "mvp", label: "Set 6 — MVP definition (Lean Startup)", questions: [
    SET_PHOTO_9_14[1],
    { en: "Eric Ries defines an MVP as:", ru: "Eric Ries определяет MVP как:", options: [
      { id: "a", en: "A version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort", ru: "Validated learning с минимумом усилий" },
      { id: "b", en: "A fully functional product after huge investment", ru: "Полный продукт после огромных вложений" },
      { id: "c", en: "Only a prototype sketch", ru: "Только эскиз" },
      { id: "d", en: "A competitor survey", ru: "Опрос конкурентов" }, none], correct: "a", tip: "Дословно с фото и Lean Startup." },
    { en: "MVP stands for:", ru: "MVP =", options: [
      { id: "a", en: "Minimum Viable Product", ru: "Minimum Viable Product" },
      { id: "b", en: "Maximum Value Proposition", ru: "Maximum Value Proposition" },
      { id: "c", en: "Most Valuable Player", ru: "Most Valuable Player" },
      { id: "d", en: "Minimum Viable Process", ru: "Minimum Viable Process" }, none], correct: "a", tip: "Minimum Viable Product." },
    { en: "Which is NOT the purpose of an MVP?", ru: "Что НЕ цель MVP?", options: [
      { id: "a", en: "Validated learning from customers", ru: "Validated learning от клиентов" },
      { id: "b", en: "Test hypotheses quickly", ru: "Быстро проверить гипотезы" },
      { id: "c", en: "Launch a perfect finished product without customer feedback", ru: "Идеальный продукт без обратной связи" },
      { id: "d", en: "Learn with the least effort", ru: "Учиться с минимумом усилий" }, none], correct: "c", tip: "MVP ≠ perfect product." },
    SET_CFU6[9],
  ]},
];

export const ALL_PHOTO_STYLE = [
  ...SET_CFU6.map((q) => ({ ...q, section: "CFU6" })),
  ...SET_PHOTO_9_14.map((q) => ({ ...q, section: "Photo exact" })),
  ...SET_HR_VARIANT.slice(8).map((q) => ({ ...q, section: "PDF variant" })),
  ...SET_VARIANTS.map((q) => ({ ...q, section: "Traps" })),
];
