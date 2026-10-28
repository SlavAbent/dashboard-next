# Frontend Development Guidelines

## 1. Scope

Эти правила применяются к:

- `frontend/`;
- UI-коду и browser-side API в `packages/*/src`;
- Storybook stories и frontend-тестам в `tests/`;
- общим UI-утилитам, которые импортируются frontend-кодом.

Дополнительно соблюдай корневой `AGENTS.md`. Для Route Handlers, Auth.js,
Prisma, server-only функций и Socket.IO применяй также `backend/AGENTS.md`.

Перед изменением UI изучи компонент, его потребителей, публичные экспорты,
stories, тесты, состояния loading/empty/error и фактическую раскладку в браузере.

## 2. Stack and source of truth

- Next.js 15.5, App Router.
- React 18.3.
- TypeScript с корневой strict-проверкой.
- Tailwind CSS 4 и Prettier plugin для сортировки классов.
- shadcn/ui, Radix UI и Base UI — в зависимости от существующего компонента.
- Zustand 5 для клиентского состояния.
- TanStack Query 5 для серверного состояния.
- React Hook Form и Zod для форм/валидации, где они уже используются.
- dnd-kit для drag-and-drop.
- Jest, React Testing Library, Storybook и Playwright для тестов.

Версии и доступные API проверяй в `package.json`; не переноси автоматически
решения из другой версии Next.js, React или библиотеки.

## 3. FSD architecture

Следуй фактическим правилам из `frontend/FSD.md`:

- `app/` — Next.js routes, layouts и providers;
- `widgets/` — крупные композиции страницы;
- `features/` — пользовательские действия и сценарии;
- `entities/` — доменные сущности, их model/api/ui;
- `shared/` — UI-kit, инфраструктура, hooks и утилиты без доменного знания.

Зависимости направлены сверху вниз. Запрещены:

- `shared` → `entities`, `features`, `widgets`;
- `entities` → `features`, `widgets`;
- `features` → `widgets`;
- импорты между widgets ради общих типов или логики.

Используй публичные `index.ts`, если они приняты в слайсе. Не переноси доменную
логику в `shared`. Не создавай новый FSD-слой или слайс ради одного небольшого
файла.

## 4. Workspace packages

`@dashboard/pomodoro`, `@dashboard/clock`, `@dashboard/weather` и
`@dashboard/chat` содержат собственную реализацию в `packages/*/src`.

- Подключай пакет через его публичный импорт `@dashboard/*`.
- Не создавай frontend wrapper, который только реэкспортирует код пакета.
- Пакет не должен импортировать `frontend/` или корневой `lib/`.
- Новые runtime-зависимости объявляй в манифесте соответствующего пакета и только
  при реальной необходимости.
- Сохраняй публичный API и проверяй всех потребителей перед изменением export.
- Server-only export не должен случайно попадать в client bundle.

## 5. React components and hooks

- Используй функциональные компоненты и соблюдай Rules of Hooks.
- Не вызывай hooks условно и не выполняй side effects во время render.
- Не мутируй props, state и данные query cache.
- Используй стабильный `key`, соответствующий идентичности элемента.
- Не дублируй производное состояние; вычисляй его из существующего source of
  truth.
- `useEffect` используй для синхронизации с внешней системой, очищай timers,
  subscriptions, listeners и запросы.
- Учитывай stale closures и гонки асинхронных запросов.
- Не добавляй `memo`, `useMemo` и `useCallback` без установленной причины.
- Разделяй UI, orchestration и бизнес-логику, но не дроби компонент механически.
- Сохраняй читаемый многострочный TSX вместо чрезмерно плотной разметки.

## 6. Next.js boundaries

- Server Components используй по умолчанию там, где не нужна интерактивность.
- Добавляй `'use client'` только для hooks, events и browser APIs.
- Не расширяй client boundary на всю страницу ради небольшого интерактивного
  блока.
- Не передавай secrets, server-only modules или Prisma Client в client code.
- Route Handlers и серверные функции сами выполняют runtime-валидацию и проверку
  прав; скрытая кнопка не является авторизацией.
- Учитывай loading, empty, error и not-found states.
- Перед изменением cache/revalidation проверяй поведение Next.js 15 и текущий
  способ получения данных.
- Не вызывай внутренний HTTP endpoint с сервера без причины, если доступен
  безопасный server-side сервис.

## 7. State and data fetching

### Local and client state

- `useState`/`useReducer` — локальное состояние компонента или сценария.
- Zustand — общее UI-состояние, модалки, фильтры и пользовательские настройки.
- Не копируй серверные сущности в Zustand, если ими уже управляет TanStack Query.

### TanStack Query

- Используй стабильные query keys и единый source of truth для ресурса.
- Проверяй `response.ok` и валидируй недоверенный JSON на границе API.
- Перед optimistic update отменяй конфликтующие активные чтения.
- Сохраняй предыдущий cache для rollback и восстанавливай его при ошибке.
- Используй ответ mutation как подтверждённое состояние сервера; не генерируй
  конкурирующие идентификаторы в нескольких местах.
- Если порядок записей важен, не допускай параллельных конфликтующих mutations.
- Инвалидируй/refetch только необходимые keys и только когда это соответствует
  стратегии актуальности.
- Проверяй loading, error, retry, empty и stale states в UI.

## 8. UI, styling and accessibility

- Переиспользуй существующие `frontend/shared/components` и primitives
  дизайн-системы.
- Используй семантический HTML: `button` для действия, `a` для навигации, `label`
  для поля.
- Интерактивные элементы должны работать с клавиатуры и иметь видимый focus.
- Проверяй normal, hover, focus, active, disabled, loading и error states.
- Сохраняй достаточный contrast и доступное имя элемента.
- Используй существующие Tailwind tokens и patterns; arbitrary values допустимы,
  когда значение действительно уникально.
- Не меняй дизайн за пределами задачи и не допускай непредусмотренный overflow.
- Для адаптивных изменений проверяй минимум 375 px, 768 px и 1440 px, если
  задача затрагивает layout.

## 9. Testing and commands

Команды запускай из корня репозитория:

- `pnpm check` — форматирование, ESLint и TypeScript.
- `pnpm test:unit` — Jest/React Testing Library.
- `pnpm storybook` — локальный Storybook на `6006`.
- `pnpm build:storybook` — проверка production-сборки Storybook.
- `pnpm test:components` — Playwright scenarios из `tests/components`.
- `pnpm test:a11y` — axe scenarios из `tests/a11y`.
- `pnpm test:e2e` — текущие Storybook-based scenarios из `tests/e2e`.
- `pnpm test:snapshots` — semantic snapshots.
- `pnpm test:screenshots` — visual regression.
- `pnpm test:screenshots:update` — осознанное обновление visual baselines.
- `pnpm build` — production build Next.js.

Playwright component/a11y/e2e/visual suites наследуют `baseURL` Storybook
`http://127.0.0.1:6006`. Не называй их проверкой реального приложения на `3000`.
Для пользовательских потоков приложения запусти `pnpm dev`, открой фактический
route и проверь наблюдаемый результат.

Выбирай минимально достаточный набор:

- чистая логика/hook — unit tests;
- компонент — unit или component test, включая важные состояния;
- доступность — `test:a11y` и ручная keyboard-проверка при необходимости;
- визуальное изменение — Storybook + visual regression;
- navigation/integration — реальный browser flow;
- изменение Next.js/config/public exports — добавь production build.

## 10. Definition of done

Frontend-задача завершена, когда:

- реализовано требуемое поведение без несвязанного рефакторинга;
- соблюдены FSD и workspace boundaries;
- проверены loading/empty/error и доступность, если они затронуты;
- выполнены релевантные static, test, browser и build checks;
- visual snapshots обновлены только для ожидаемого изменения;
- в отчёте разделены прошедшие, упавшие и не запускавшиеся проверки.
