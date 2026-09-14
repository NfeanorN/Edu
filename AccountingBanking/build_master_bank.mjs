#!/usr/bin/env node
/** Build 14_Master_Question_Bank.html from template. */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

const opt = (id, en, ru) => ({ id, en, ru });
const q = (num, en, ru, options, correct, section = null, explain_ru = null) => {
  const d = { num, id: `q${num}`, en, ru, options, correct, section };
  if (explain_ru) d.explain_ru = explain_ru;
  return d;
};

const QUESTIONS = [
  q(1, 'A Budget is:', 'Бюджет — это:', [
    opt('a', 'A detailed quantitative plan for acquiring and using financial and other resources over a specified forthcoming time period', 'Детальный количественный план приобретения и использования ресурсов на будущий период'),
    opt('b', 'A system that includes subsystems for planning, measuring and recording results and evaluating performance', 'Система планирования, учёта результатов и оценки эффективности'),
    opt('c', 'The force that moves different people in different ways for different reasons', 'Сила, движущая людей по-разному'),
    opt('d', 'Concerned with the initiation of organized action and stimulating people to work', 'Инициация организованных действий и мотивация людей'),
  ], 'a', 'Management accounting'),
  q(2, 'The Indirect costs are:', 'Косвенные затраты (indirect costs) — это:', [
    opt('a', 'Costs that vary directly and proportionately with changes in the activity level', 'Затраты, меняющиеся пропорционально уровню активности'),
    opt('b', 'Costs that remain the same in total regardless of changes in the activity level', 'Затраты, постоянные в сумме'),
    opt('c', 'Costs that can be easily and conveniently traced to a product or department', 'Затраты, легко относимые на продукт или подразделение'),
    opt('d', 'Costs that must be allocated in order to be assigned to a product or department', 'Затраты, которые нужно распределить, чтобы отнести на продукт или подразделение'),
  ], 'd', 'Management accounting'),
  q(3, 'Diversification is:', 'Диверсификация — это:', [
    opt('a', 'Reduce individual firm-specific credit risk', 'Снижение индивидуального firm-specific кредитного риска'),
    opt('b', 'Reduce systematic credit risk', 'Снижение систематического кредитного риска'),
    opt('c', 'Increase individual firm-specific credit risk', 'Увеличение firm-specific риска'),
    opt('d', 'None of the answers', 'Ни один из ответов'),
  ], 'a', 'Banking & risk'),
  q(4, 'The Banking Recovery and Resolution Directive (BRRD) is related to:', 'Директива BRRD относится:', [
    opt('a', 'The fourth pillar of European Banking Union', 'К 4-му столпу EBU'),
    opt('b', 'The third pillar of European Banking Union', 'К 3-му столпу EBU'),
    opt('c', 'The first pillar of European Banking Union', 'К 1-му столпу EBU'),
    opt('d', 'The second pillar of European Banking Union', 'Ко 2-му столпу EBU'),
  ], 'd', 'EBU & regulation', 'BRRD — часть resolution framework (2-й столп EBU: SRM, bail-in).'),
  q(5, 'In order to evaluate financial instruments we can use:', 'Для оценки финансовых инструментов можно использовать:', [
    opt('a', 'Fair value criteria', 'Критерий справедливой стоимости (fair value)'),
    opt('b', 'Amortized cost criteria', 'Критерий амортизированной стоимости'),
    opt('c', 'Both fair value and amortized cost criteria', 'Оба критерия'),
    opt('d', 'EAD criteria', 'Критерий EAD'),
  ], 'c', 'IFRS & instruments'),
  q(6, 'The definition of syndicated loan:', 'Синдицированный кредит — это:', [
    opt('a', 'It is provided by only one financial institution', 'Предоставляется одной финансовой организацией'),
    opt('b', 'It is provided by a group of financial institutions as opposed to multiple lenders', 'Группой институтов вместо множества кредиторов'),
    opt('c', 'It is provided by a group of financial institutions as opposed to a single lender', 'Группой финансовых институтов, а не одним кредитором'),
    opt('d', 'None of the above', 'Ни один из перечисленных'),
  ], 'c', 'Banking & instruments'),
  q(7, 'In which valuation model is terminal cash flow used?', 'В какой модели оценки используется terminal cash flow?', [
    opt('a', 'Multiples method', 'Метод мультипликаторов'),
    opt('b', 'DCF', 'DCF'),
    opt('c', 'EVA', 'EVA'),
    opt('d', 'None of the answers', 'Ни один из ответов'),
  ], 'b', 'Valuation'),
  q(8, 'Which standard is used to account for non-performing loans (NPLs)?', 'Какой стандарт применяется для учёта NPL?', [
    opt('a', 'IFRS 9', 'IFRS 9'),
    opt('b', 'IFRS 19', 'IFRS 19'),
    opt('c', 'IFRS 1', 'IFRS 1'),
    opt('d', 'None of the above', 'Ни один'),
  ], 'a', 'IFRS & instruments'),
  q(9, "The Financial Institutions' specialness is done by:", 'Особенность финансовых институтов обеспечивается:', [
    opt('a', 'Monitoring cost', 'Затратами на мониторинг'),
    opt('b', 'Liquidity', 'Ликвидностью'),
    opt('c', 'Both of them', 'И тем, и другим'),
    opt('d', 'None of the above', 'Ни один'),
  ], 'c', 'Financial intermediaries'),
  q(10, 'Commercial banks, credit unions, saving institutions are:', 'Коммерческие банки, кредитные союзы, сберегательные институты — это:', [
    opt('a', 'Depository institutions', 'Депозитные институты (depository institutions)'),
    opt('b', 'Specific type of investment banks', 'Особый тип инвестиционных банков'),
    opt('c', 'Mutual funds', 'Паевые фонды'),
    opt('d', 'Securities firms', 'Брокерские компании'),
  ], 'a', 'Bank types'),
  q(11, "It is the document that allows you to read and analyze the bank's financial statements by tracking magnitudes and their evolution to operational and management aspects:", 'Документ для анализа отчётности банка в операционном и управленческом контексте:', [
    opt('a', 'Income statement', 'Отчёт о прибылях и убытках'),
    opt('b', 'Statement of Comprehensive Income', 'Отчёт о совокупном доходе'),
    opt('c', 'Supplementary note', 'Дополнительная записка'),
    opt('d', 'Management report', 'Управленческий отчёт (management report)'),
  ], 'd', 'Bank reporting'),
  q(12, 'The risk that a sudden surge in liability withdrawals may require an FI to liquidate assets in a short period at less than fair market prices is:', 'Риск внезапного оттока обязательств, вынуждающий продавать активы ниже рыночной цены:', [
    opt('a', 'Credit risk', 'Кредитный риск'),
    opt('b', 'Liquidity risk', 'Риск ликвидности'),
    opt('c', 'Market risk', 'Рыночный риск'),
    opt('d', 'Operational risk', 'Операционный риск'),
  ], 'b', 'Banking & risk'),
  q(13, 'A common stock:', 'Обыкновенная акция (common stock):', [
    opt('a', 'Has more voting rights', 'Даёт больше прав голоса'),
    opt('b', 'Has more remuneration rights', 'Даёт больше прав на вознаграждение'),
    opt('c', 'Has more rights in case of default', 'Имеет больше прав при дефолте'),
    opt('d', 'None of the above', 'Ни один'),
  ], 'a', 'Equity & debt'),
  q(14, 'In a syndicated loan:', 'В синдицированном кредите:', [
    opt('a', 'There are several banks that cover the loan', 'Несколько банков покрывают кредит'),
    opt('b', 'There is only one bank that covers the loan', 'Только один банк'),
    opt('c', 'There is always a guarantee', 'Всегда есть гарантия'),
    opt('d', 'We can use only fixed rates', 'Только фиксированные ставки'),
  ], 'a', 'Banking & instruments'),
  q(15, 'In the measurement of credit risk, volatility of earnings:', 'При измерении кредитного риска волатильность прибыли:', [
    opt('a', 'Is a borrower specific factor of qualitative models', 'Фактор заёмщика в качественных моделях'),
    opt('b', 'Is a borrower specific factor of quantitative models', 'Фактор заёмщика в количественных моделях'),
    opt('c', 'Is a market specific factor of qualitative models', 'Рыночный фактор в качественных моделях'),
    opt('d', 'Is a market specific factor of quantitative models', 'Рыночный фактор в количественных моделях'),
  ], 'd', 'Credit risk'),
  q(16, 'The net interest margin is more important in:', 'Чистая процентная маржа (NIM) важнее для:', [
    opt('a', 'Pension funds', 'Пенсионных фондов'),
    opt('b', 'Mutual funds', 'Паевых фондов'),
    opt('c', 'Commercial banks', 'Коммерческих банков'),
    opt('d', 'Investment banks', 'Инвестиционных банков'),
  ], 'c', 'Bank ratios'),
  q(17, 'The intermediation margin is more important in:', 'Маржа посредничества (intermediation margin) важнее для:', [
    opt('a', 'None of the answers', 'Ни один из ответов'),
    opt('b', 'Commercial banks focused on mortgage', 'Ипотечных коммерческих банков'),
    opt('c', 'Commercial banks', 'Коммерческих банков'),
    opt('d', 'Investment banks', 'Инвестиционных банков'),
  ], 'c', 'Bank ratios'),
  q(18, 'The estimated amount of money a bank loses when a borrower defaults on a loan is:', 'Оценочная сумма потерь банка при дефолте заёмщика:', [
    opt('a', 'The probability of default (PD)', 'Вероятность дефолта (PD)'),
    opt('b', 'The expected loss (EL)', 'Ожидаемый убыток (EL)'),
    opt('c', 'The loss given default (LGD)', 'Loss given default (LGD)'),
    opt('d', 'The exposure at default (EAD)', 'Exposure at default (EAD)'),
  ], 'b', 'Credit risk', 'EL = PD × EAD × LGD — ожидаемая потеря при дефолте.'),
  q(19, 'A preferred stock:', 'Привилегированная акция (preferred stock):', [
    opt('a', 'Has more voting rights', 'Больше прав голоса'),
    opt('b', 'Has more remuneration rights', 'Больше прав на вознаграждение (дивиденды)'),
    opt('c', 'Has not remuneration rights', 'Не даёт вознаграждения'),
    opt('d', 'None of the above', 'Ни один'),
  ], 'b', 'Equity & debt'),
  q(20, "Equity investments in banks' reports are in:", 'Инвестиции в акции (equity investments) в отчётности банка отражаются в:', [
    opt('a', 'Assets', 'Активах'),
    opt('b', 'Liabilities', 'Обязательствах'),
    opt('c', "Shareholders' equity", 'Собственном капитале'),
    opt('d', 'None of the above', 'Ни один'),
  ], 'a', 'Bank balance sheet'),
  q(21, "Altman's discriminant function is:", 'Дискриминантная функция Альтмана — это:', [
    opt('a', 'A qualitative measurement of credit risk', 'Качественная мера кредитного риска'),
    opt('b', 'A quantitative measurement of market risk', 'Количественная мера рыночного риска'),
    opt('c', 'A quantitative measurement of credit risk', 'Количественная мера кредитного риска'),
    opt('d', 'A qualitative measurement of market risk', 'Качественная мера рыночного риска'),
  ], 'c', 'Credit risk'),
  q(22, 'Using size, what is the largest group of depository institutions?', 'По размеру, самая крупная группа депозитных институтов:', [
    opt('a', 'Commercial banks', 'Коммерческие банки'),
    opt('b', 'Investment banks', 'Инвестиционные банки'),
    opt('c', 'Credit unions', 'Кредитные союзы'),
    opt('d', 'Mutual funds', 'Паевые фонды'),
  ], 'a', 'Bank types'),
  q(23, '"An economic agent appointed to act on behalf of smaller agents in collecting information and/or investing funds on their behalf" is the definition of:', '«Экономический агент, действующий от имени мелких агентов при сборе информации и/или инвестировании средств» — определение:', [
    opt('a', "Bank's Role as Delegated Monitor", 'Роли банка как делегированного монитора'),
    opt('b', "Bank's Role as information producer", 'Роли банка как производителя информации'),
    opt('c', "Bank's Role for diversification", 'Роли банка в диверсификации'),
    opt('d', 'None of the above', 'Ни один'),
  ], 'a', 'Financial intermediaries'),
  q(24, 'Monetary policy actions include:', 'Действия денежно-кредитной политики включают:', [
    opt('a', 'All the answers', 'Все перечисленные'),
    opt('b', 'Open market operations', 'Операции на открытом рынке'),
    opt('c', 'The choice of the central discount rate', 'Выбор учётной ставки ЦБ'),
    opt('d', 'Setting reserve requirements', 'Установление норм резервирования'),
  ], 'a', 'Monetary policy'),
  q(25, 'They focus on consumer loans funded with member deposits:', 'Ориентированы на потребительские кредиты, финансируемые вкладами членов:', [
    opt('a', 'Credit unions', 'Кредитные союзы (credit unions)'),
    opt('b', 'Commercial banks', 'Коммерческие банки'),
    opt('c', 'Saving institutions', 'Сберегательные институты'),
    opt('d', 'Investment banks', 'Инвестиционные банки'),
  ], 'a', 'Bank types'),
  q(26, 'A loan backed by specific assets of the borrower; if the borrower defaults, the lender has a first lien on those assets:', 'Кредит, обеспеченный конкретными активами заёмщика; при дефолте кредитор имеет первичное право на эти активы:', [
    opt('a', 'Secured loan', 'Обеспеченный кредит (secured loan)'),
    opt('b', 'Unsecured loan', 'Необеспеченный кредит'),
    opt('c', 'Syndicated loan', 'Синдицированный кредит'),
    opt('d', 'None of the above', 'Ни один'),
  ], 'a', 'Credit risk'),
  q(27, 'It arises because of the possibility that promised cash flows on financial claims held by banks will not be paid in full:', 'Возникает из-за возможности, что обещанные денежные потоки по требованиям банка не будут выплачены полностью:', [
    opt('a', 'Credit risk', 'Кредитный риск'),
    opt('b', 'Market risk', 'Рыночный риск'),
    opt('c', 'Sovereign risk', 'Суверенный риск'),
    opt('d', 'Liquidity risk', 'Риск ликвидности'),
  ], 'a', 'Banking & risk'),
  q(28, 'The risk incurred by a bank as a result of activities related to contingent assets and liabilities held off the balance sheet:', 'Риск от внебалансовых условных активов и обязательств:', [
    opt('a', 'Off-balance sheet risk', 'Внебалансовый риск'),
    opt('b', 'Market risk', 'Рыночный риск'),
    opt('c', 'Sovereign risk', 'Суверенный риск'),
    opt('d', 'Liquidity risk', 'Риск ликвидности'),
  ], 'a', 'Banking & risk'),
  q(29, 'An increase in the frequency of the coupons:', 'Увеличение частоты выплаты купонов:', [
    opt('a', 'Reduces the duration', 'Снижает duration'),
    opt('b', 'Increases the duration', 'Увеличивает duration'),
    opt('c', 'Has no effect on the duration', 'Не влияет на duration'),
    opt('d', 'Increases the value of the equity', 'Увеличивает стоимость equity'),
  ], 'a', 'Bonds & duration', 'Чем чаще купоны, тем раньше возвращаются деньги → duration ниже.'),
  q(30, 'Loans to banks are in:', 'Кредиты банкам отражаются в:', [
    opt('a', 'Assets section', 'Разделе активов'),
    opt('b', 'Liabilities section', 'Разделе обязательств'),
    opt('c', 'Expenses in the income statement', 'Расходах в отчёте о прибылях'),
    opt('d', 'Assets section in the income statement', 'Активах в отчёте о прибылях'),
  ], 'a', 'Bank balance sheet'),
  q(31, 'The internal financing of a firm depends directly on:', 'Внутреннее финансирование фирмы напрямую зависит от:', [
    opt('a', 'Total financial debt', 'Общего финансового долга'),
    opt('b', 'Market price', 'Рыночной цены'),
    opt('c', "Firms' profitability", 'Рентабельности фирмы'),
    opt('d', 'None of the above', 'Ни один'),
  ], 'c', 'Corporate finance'),
  q(32, "Bank leverage is the ratio of the value of a bank's assets to the value of its:", 'Банковский leverage — отношение стоимости активов банка к стоимости его:', [
    opt('a', 'Equity (capital)', 'Собственного капитала (equity)'),
    opt('b', 'Profitability', 'Рентабельности'),
    opt('c', 'ROE', 'ROE'),
    opt('d', 'ROA', 'ROA'),
  ], 'a', 'Bank ratios'),

  // New from exam photos 14/07/2026 (only items not already in other files)
  q(33, 'Dual track operation involves', 'Dual track operation включает:', [
    opt('a', 'Only IPO', 'Только IPO'),
    opt('b', 'Only M&A', 'Только M&A'),
    opt('c', 'IPO and M&A', 'IPO и M&A'),
    opt('d', 'IFRS 9', 'IFRS 9'),
  ], 'c', 'Corporate finance / markets'),
  q(34, 'Venture capital is referred to', 'Venture capital относится к:', [
    opt('a', 'Green bond', 'Зелёным облигациям'),
    opt('b', 'Subordinated bond', 'Субординированным облигациям'),
    opt('c', 'Private equity', 'Private equity'),
    opt('d', 'None of the above', 'Ни один'),
  ], 'c', 'Private equity'),
  q(35, 'The bonds issued by the banks are', 'Облигации, выпущенные банками, отражаются:', [
    opt('a', "In the liabilities of the banks' balance sheet", 'В обязательствах баланса банка'),
    opt('b', "In the liabilities of the banks' income statement", 'В обязательствах отчёта о прибылях'),
    opt('c', "In the asset of the banks' income statement", 'В активах отчёта о прибылях'),
    opt('d', "In the asset of the banks' balance sheet", 'В активах баланса банка'),
  ], 'a', 'Bank balance sheet'),
  q(36, 'Which of the following is an exit strategy of Private Equity operators?', 'Что из перечисленного — exit strategy для Private Equity?', [
    opt('a', 'IPO', 'IPO'),
    opt('b', 'Buy-back', 'Buy-back'),
    opt('c', 'All the answers', 'Все ответы'),
    opt('d', 'Write-off', 'Write-off'),
  ], 'c', 'Private equity'),
  q(37, 'EBA', 'EBA — это:', [
    opt('a', 'Is the local authority', 'Местный орган'),
    opt('b', 'Is the European authority related to supervision', 'Европейский орган, связанный с supervision'),
    opt('c', 'Is the European authority related to open market', 'Европейский орган open market'),
    opt('d', 'None of the above', 'Ни один'),
  ], 'b', 'EBU & regulation', 'EBA = European Banking Authority.'),
  q(38, 'According to IFRS 13, what is the best way to evaluate a financial instrument?', 'По IFRS 13 лучший способ оценить финансовый инструмент:', [
    opt('a', 'None of the answers', 'Ни один'),
    opt('b', 'The value on the market', 'Рыночная стоимость'),
    opt('c', 'The value of similar financial instruments', 'Стоимость похожих инструментов'),
    opt('d', 'The accounting value', 'Учётная стоимость'),
  ], 'b', 'IFRS & instruments', 'IFRS 13 fair value: market price (Level 1) is preferred.'),
  q(39, "In the operations of a bank \"Deposits of customers\" are", 'В операциях банка «Deposits of customers» — это:', [
    opt('a', 'Interest bearing asset', 'Процентный актив'),
    opt('b', 'Non-expensive liabilities', 'Недорогие обязательства'),
    opt('c', 'Real asset', 'Реальный актив'),
    opt('d', 'Expensive liabilities', 'Дорогие обязательства'),
  ], 'd', 'Bank balance sheet', 'Вклады клиентов — обязательства; банк платит проценты → expensive liabilities.'),
  q(40, 'The countercyclical capital buffer is linked to', 'Контрциклический буфер капитала связан с:', [
    opt('a', 'The third pillar of EBU', '3-м столпом EBU'),
    opt('b', 'Basel agreements I', 'Basel I'),
    opt('c', 'Capital asset pricing model', 'CAPM'),
    opt('d', 'Basel agreements III', 'Basel III'),
  ], 'd', 'EBU & regulation'),
  q(41, 'In "Buy Now, Pay Later" (BNPL):', 'В Buy Now, Pay Later (BNPL):', [
    opt('a', 'The customer places an order, even if the goods or services are not yet transferred', 'Клиент делает заказ, даже если товар ещё не передан'),
    opt('b', 'The entity receives cash from the customer, regardless of performance', 'Компания получает деньги независимо от исполнения'),
    opt('c', 'Consumers are offered the chance to defer payment in three or four installments, with the merchant paying a fee to the credit provider', 'Оплата частями (3–4 платежа); продавец платит комиссию кредитору'),
    opt('d', 'The contract is signed, before either party performs any obligation', 'Договор подписан до исполнения обязательств'),
  ], 'c', 'IFRS / payments'),
  q(42, 'What is the objective of Managerial Accounting?', 'Цель управленческого учёта (Managerial Accounting):', [
    opt('a', 'To prepare financial statements for external shareholders', 'Готовить отчётность для внешних акционеров'),
    opt('b', 'To provide internal managers with information for planning and decision-making', 'Давать менеджерам информацию для планирования и решений'),
    opt('c', 'To ensure compliance with tax regulations and filing requirements', 'Обеспечивать налоговый compliance'),
    opt('d', 'To report company performance under IFRS for investors', 'Отчитываться по IFRS для инвесторов'),
  ], 'b', 'Management accounting'),
  q(43, 'The Supervision is related', 'Supervision относится:', [
    opt('a', 'To the fourth pillar of European Banking Union', 'К 4-му столпу EBU'),
    opt('b', 'To the third pillar of European Banking Union', 'К 3-му столпу EBU'),
    opt('c', 'To the first pillar of European Banking Union', 'К 1-му столпу EBU'),
    opt('d', 'To the second pillar of European Banking Union', 'Ко 2-му столпу EBU'),
  ], 'c', 'EBU & regulation', '1-й столп EBU = Single Supervisory Mechanism (SSM).'),
];

function replaceJsConst(html, name, value) {
  const marker = `const ${name} = `;
  const start = html.indexOf(marker);
  if (start < 0) return html;
  const valStart = start + marker.length;
  const open = html[valStart];
  const close = open === '[' ? ']' : '}';
  let depth = 0;
  let inStr = false;
  let esc = false;
  let end = valStart;
  for (let i = valStart; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  const semi = html[end] === ';' ? 1 : 0;
  return html.slice(0, valStart) + JSON.stringify(value) + html.slice(end + semi);
}

const templatePath = join(ROOT, '04_Sustainability.html');
let html = readFileSync(templatePath, 'utf8');

html = html
  .replace(/<title>.*?<\/title>/, '<title>Master Question Bank — missing topics</title>')
  .replace(/<h1>.*?<\/h1>/, '<h1>Master Question Bank — missing topics</h1>')
  .replace(
    /<p class="sub">[\s\S]*?<\/p>\s*<div class="rules">[\s\S]*?<\/div>/,
    '<p class="sub">43 MCQ from full course bank · Budget, BRRD, PE exits, BNPL, EBA, IFRS 13</p>\n    <p class="sub"><a href="00_How_To_Solve.html">📘 How to solve tasks — step-by-step guide</a></p>\n    <div class="rules">1 point per correct answer. Topics not covered in separate exams 01–13.</div>',
  );

html = replaceJsConst(html, 'QUESTIONS', QUESTIONS.map(({ ru, explain_ru, options, ...rest }) => ({
  ...rest,
  options: options.map(({ ru: _r, ...o }) => o),
  ...(explain_ru && !/[\u0400-\u04FF]/.test(explain_ru) ? { explain: explain_ru } : {}),
})));

writeFileSync(join(ROOT, '14_Master_Question_Bank.html'), html, 'utf8');
console.log('Wrote 14_Master_Question_Bank.html');
