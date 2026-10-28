# Repository Guidelines

## 1. Scope and priority

Этот файл действует во всём репозитории. Для более узких областей применяй
дополнительные инструкции:

- frontend и UI-код workspace-пакетов — `frontend/AGENTS.md`;
- backend, API, Auth.js, Socket.IO, Prisma и PostgreSQL — `backend/AGENTS.md`;
- `.agents/skills/*/SKILL.md` — специализированный процесс для разработки,
  ревью, тестирования или архитектурного анализа.

Более специфичные инструкции дополняют общие. Если задача затрагивает несколько
областей, учитывай все соответствующие документы. При противоречии сначала
проверь фактический код, конфигурацию и `package.json`, затем следуй более
специфичному действующему правилу.

Если пользователь просит только анализ, совет, план или ревью, не изменяй файлы.
Перед любыми изменениями изучи связанные модули, типы, тесты и вызывающий код.

## 2. Current architecture

Проект находится в переходном состоянии, поэтому не считай целевую архитектуру
уже реализованной:

- `backend/server.js` — фактический runtime-entrypoint. Он запускает Next.js из
  `frontend/`, создаёт HTTP-сервер и подключает Socket.IO на порту `3000`;
- `backend/db/db.json` обслуживается JSON Server на порту `4001` и пока
  используется частью board/chat-сценариев;
- Prisma и PostgreSQL используются для части серверной инфраструктуры, Auth.js и
  моделей данных, но миграция с JSON Server ещё не завершена;
- `backend/app.ts` — минимальное Express-приложение с health endpoint. Оно не
  подключено к `pnpm backend` и не является рабочим entrypoint;
- серверный код также находится в `frontend/app/api/`, `frontend/auth.ts`,
  корневом `auth.ts`, `lib/prisma.ts` и `packages/chat/src/server.ts`.

Основной стек: Node.js 24+, TypeScript, Next.js 15.5, React 18.3, Express 5,
Prisma 7, PostgreSQL, Socket.IO 4, Zustand 5, TanStack Query 5, Tailwind CSS 4,
Jest 30, Playwright 1.64 и Storybook 10. Фактические версии всегда проверяй в
`package.json`.

## 3. Repository structure

- `frontend/` — Next.js App Router, FSD-слои и frontend-конфигурация.
- `backend/` — custom Next.js/Socket.IO server, Express-заготовка, JSON Server и
  скрипты проверки БД.
- `packages/` — самостоятельные workspace-модули `@dashboard/*` с реализацией в
  `src/` и публичными entrypoints.
- `prisma/` — составная Prisma schema и миграции.
- `lib/` — общие утилиты; часть файлов является server-only.
- `tests/` — Playwright component, a11y, Storybook E2E и visual suites.
- `.storybook/` — конфигурация Storybook.

Перед работой проверяй фактическую структуру: README и инструкции могут отставать
от кода.

## 4. Dependency boundaries

- Используй публичные API `@dashboard/*` и `index.ts`, где они предусмотрены.
- Не используй глубокие импорты из внутренних директорий workspace-пакетов без
  обоснованной необходимости.
- Пакеты не должны импортировать код из `frontend/` или корневого `lib/`.
  Передавай зависимости через публичный контракт либо объявляй их в
  `package.json` пакета.
- Backend не должен зависеть от frontend UI.
- Не создавай циклические зависимости между FSD-слоями и пакетами.
- Не дублируй DTO, доменные типы и бизнес-правила между frontend/backend без
  причины. Общий контракт размещай в подходящем нейтральном модуле.
- Не превращай workspace-пакеты в wrapper-реэкспорты: реализация модуля должна
  оставаться внутри соответствующего `packages/*/src`.

## 5. Package manager and environment

- Единственный package manager проекта — pnpm 11, зафиксированный полем
  `packageManager` в `package.json`.
- Workspace описан в `pnpm-workspace.yaml`, единственный lock-файл —
  `pnpm-lock.yaml`.
- Устанавливай зависимости через `pnpm install`; в CI и воспроизводимых сборках
  используй `pnpm install --frozen-lockfile`.
- Все scripts запускай из корня репозитория через `pnpm <script>`.
- Не создавай `package-lock.json` и не используй `npm install`/`npm run`.
- Не запускай установку зависимостей автоматически, если существующего
  `node_modules` достаточно.
- Не выводи содержимое `.env` и `.env.local`, токены, cookies, строки подключения
  и персональные данные.
- Для Docker используется Colima. Сначала проверь текущее состояние Docker; не
  запускай Colima повторно, если он уже работает.

## 6. Commands

### Development and database

- `pnpm dev` — запускает PostgreSQL, проверяет соединение, затем поднимает
  custom Next.js/Socket.IO server и JSON Server.
- `pnpm backend` — запускает `backend/server.js` на порту `3000`.
- `pnpm json-server` — запускает `backend/db/db.json` на порту `4001`.
- `pnpm db:start` / `pnpm db:stop` — запускает или останавливает PostgreSQL.
- `pnpm db:logs` — показывает логи PostgreSQL.
- `pnpm db:studio` — запускает Prisma Studio.
- `pnpm validate:db` — проверяет доступность настроенной PostgreSQL.

### Static checks and build

- `pnpm check` — `format:check`, ESLint и TypeScript typecheck.
- `pnpm lint` — ESLint без автоматического исправления.
- `pnpm format:check` — проверка форматирования без изменения файлов.
- `pnpm build` — production build Next.js из `frontend/`.
- `pnpm start` — production-запуск `backend/server.js` после build; внешние
  сервисы должны быть запущены отдельно.
- `pnpm build:storybook` — production build Storybook.

`pnpm lint:fix` и `pnpm format` изменяют много файлов. Не запускай их
глобально без необходимости; предпочитай адресное исправление затронутых файлов.

### Tests

- `pnpm test` — только unit-тесты и component Playwright tests.
- `pnpm test:unit` — Jest/React Testing Library.
- `pnpm test:components` — Playwright component scenarios через Storybook.
- `pnpm test:a11y` — axe accessibility scenarios через Storybook.
- `pnpm test:e2e` — текущий Storybook-based E2E-набор; это не полный E2E
  запущенного приложения на порту `3000`.
- `pnpm test:snapshots` — семантические Jest snapshots компонентов.
- `pnpm test:screenshots` — visual regression tests.
- `pnpm test:screenshots:update` — обновляет эталонные изображения; запускай
  только когда визуальные изменения ожидаемы и проверены.
- `pnpm storybook` — Storybook на порту `6006`.

Playwright-конфигурации сами запускают Storybook. Для настоящего пользовательского
сценария приложения сначала запусти необходимые сервисы и проверяй URL `3000`
отдельно.

## 7. Choosing verification

Выбирай проверки пропорционально изменению:

- документация и конфигурация — `format:check` для затронутых файлов,
  `git diff --check` и проверка ссылок/команд;
- TypeScript или общая логика — `pnpm check` и релевантные unit-тесты;
- React-компонент — unit/component tests, а при необходимости a11y и Storybook;
- видимое изменение UI — component, a11y и visual tests; обновляй snapshots только
  после ручной проверки различий;
- пользовательский поток — браузерная проверка фактического результата, а не
  только успешной навигации;
- Next.js/config/dependencies/public API — добавь production build;
- backend/БД — целевые API-тесты, `validate:db` при доступном окружении и проверка
  интеграции с реальными потребителями.

Успешный build не доказывает корректность UI. Не называй статическую или
Storybook-проверку полным E2E всего приложения.

## 8. Coding and change rules

- TypeScript — strict по корневому `tsconfig.json`; не скрывай ошибки через
  `any`, необоснованные assertions и `@ts-ignore`.
- Соблюдай Prettier, ESLint, существующее именование и сортировку импортов.
- Используй отступы в 2 пробела и одинарные кавычки в коде.
- Не добавляй зависимости, абстракции и слои без конкретной необходимости.
- Не выполняй несвязанный рефакторинг, массовое форматирование или переименование.
- Не меняй публичные API, форматы данных и поведение без анализа потребителей.
- Не применяй миграции, destructive SQL или очистку данных без явного разрешения.
- Сохраняй существующие изменения пользователя и проверяй diff перед завершением.

## 9. Completion report

В итоговом отчёте укажи:

1. **Изменения** — что сделано и какие файлы затронуты.
2. **Проверки** — точные команды и фактические результаты.
3. **Проблемы** — известные ошибки, ограничения и то, что не удалось проверить.

Не утверждай, что команда, браузерный сценарий, база данных или MCP-проверка
успешны, если они фактически не выполнялись.
