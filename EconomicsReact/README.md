# Economics for Business — React

Версия раздела Economics: Vite + React (TSX) + React Router. Стили на SCSS, маршруты — lazy loading. **Весь контент тем реализован React-компонентами** (без HTML/iframe).

## Запуск

1. Установить зависимости:
   ```bash
   npm install
   ```

2. Запустить dev-сервер:
   ```bash
   npm run dev
   ```

3. Сборка:
   ```bash
   npm run build
   ```

## Страницы (маршруты)

- **`/`** — главная: список тем (микро- и макроэкономика).
- **`/topic/:slug`** — страница темы (например `/topic/demand`, `/topic/ppf`). Контент рендерится React-компонентами из `src/content/topics/` и `src/components/TopicContent/`.

Обе страницы подгружаются **lazy** (React.lazy + Suspense).

## Контент тем (18 страниц)

Каждая тема — это данные в `src/content/topics/<slug>.ts` (тип `TopicContent`: блоки h2, h3, p, ul, table, graph, formula, hr) и общий рендер в `TopicContentView`. Список тем — в `src/data/topics.ts`.

Темы: budget-constraint, ppf, demand, rational-choice, elasticities, production-cost-short-run, cost-long-run, market-power, game-theory, price-discrimination, externalities, gdp-macro, goods-market-multiplier, okun-phillips, is-lm, fiscal-monetary-policy, unemployment-inflation, open-economy.

## Структура

- `src/App.tsx` — маршруты, lazy-импорты, Suspense.
- `src/pages/Home.tsx` — главная.
- `src/pages/Topic.tsx` — страница темы: TopicLayout + TopicContentView(blocks).
- `src/components/TopicContent/` — TopicLayout, TopicContentView, типы ContentBlock, стили.
- `src/content/topics/` — по одному файлу контента на тему + index (getTopicContent).
- `src/data/topics.ts` — список тем (slug, title, desc, section).
- Стили: SCSS (index, Home, PageLoader, TopicContent).
