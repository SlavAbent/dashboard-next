# Backend Development Guidelines

## 1. Scope

Эти правила применяются не только к `backend/`, но и ко всему server-side коду:

- `backend/server.js`, `backend/app.ts`, `backend/env.ts` и `backend/scripts/`;
- `frontend/app/api/`, `frontend/auth.ts` и корневой `auth.ts`;
- `lib/prisma.ts` и другим server-only утилитам;
- `packages/chat/src/server.ts` и server-side exports пакетов;
- `prisma/`, миграциям и конфигурации PostgreSQL;
- Socket.IO handlers и интеграции с JSON Server.

Дополнительно соблюдай корневой `AGENTS.md`. Если меняется UI-потребитель API,
применяй также `frontend/AGENTS.md`.

Перед изменением проследи полный поток: route/event → validation/auth → service
или handler → storage/external API → DTO/event для клиента.

## 2. Current runtime and migration state

Не предполагается, что Express/Prisma migration уже завершена:

- `pnpm backend` запускает `backend/server.js`;
- `backend/server.js` поднимает Next.js из `frontend/` и Socket.IO на порту
  `3000`;
- Socket.IO аутентифицирует соединение через Auth.js session endpoint;
- часть данных читается/записывается через JSON Server на порту `4001`;
- `frontend/app/api/chat/route.ts` использует server export пакета chat и
  настроенный `BACKEND_URL`;
- Prisma/PostgreSQL уже присутствуют для auth/message моделей и дальнейшей
  миграции;
- `backend/app.ts` содержит Express health endpoint, но текущим startup script не
  импортируется.

Не вноси код только в `backend/app.ts`, ожидая, что он станет доступен в runtime.
Подключение Express-приложения, перенос endpoint и отказ от JSON Server являются
отдельными архитектурными изменениями с проверкой всех потребителей.

## 3. Architecture and module boundaries

Сохраняй существующую архитектуру. При развитии Express/API разделяй
ответственность по реальной сложности:

- route — HTTP method/path и middleware;
- controller/handler — HTTP-вход и формирование ответа;
- service/use case — бизнес-инварианты и orchestration;
- repository/data access — Prisma, SQL или внешний storage;
- validation — runtime-схемы недоверенных данных.

Не создавай все слои механически для простого endpoint. При этом:

- HTTP-объекты не должны проникать в бизнес-логику;
- Prisma/JSON Server details не должны распространяться по UI;
- DTO отделяй от persistence model, когда поля или жизненный цикл различаются;
- server-only зависимости не экспортируй через browser entrypoint пакета;
- сохраняй текущий контракт во время поэтапной миграции либо явно документируй
  breaking change.

## 4. HTTP API and validation

- Используй корректные HTTP methods и status codes.
- Валидируй `params`, `query`, `body`, cookies и ответы внешних сервисов во время
  выполнения; TypeScript не валидирует runtime-ввод.
- Проверяй `response.ok`: `fetch` не выбрасывает ошибку для HTTP 4xx/5xx.
- Не вызывай `response.json()` для ожидаемого пустого `204`.
- Поддерживай предсказуемую форму success/error DTO.
- Различай 400/401/403/404/409/500 согласно принятому контракту.
- Не отдавай stack trace, Prisma/SQL details, токены и внутренние поля клиенту.
- Ограничивай размер строк, массивов, файлов и потенциально больших выборок.
- Учитывай idempotency и повторные запросы для изменяющих операций.

## 5. Authentication and authorization

- Аутентификация и авторизация выполняются на сервере для каждого защищённого
  HTTP-запроса и Socket.IO event.
- Не доверяй `userId`, роли или owner fields из client payload; получай identity
  из проверенной session/socket context.
- Проверяй доступ к конкретному ресурсу, а не только наличие сессии.
- Не считай скрытую UI-кнопку или client guard защитой endpoint.
- Не логируй cookies, session tokens, OAuth secrets и персональные данные.
- Не изменяй Auth.js/session flow без проверки login, protected routes, API и
  Socket.IO handshake.

## 6. Socket.IO

- Валидируй payload каждого входящего event.
- Подтверждай клиенту успех только после успешного сохранения.
- Определи, кому отправляется событие: текущему socket, комнате или всем
  подключённым пользователям.
- Учитывай disconnect/reconnect, повторную доставку, порядок событий и
  дедупликацию.
- Не создавай повторные listeners и очищай связанные ресурсы.
- Не раскрывай приватные данные через broadcast.
- Для важных mutations используй стабильный идентификатор и идемпотентную
  стратегию, если повторная доставка возможна.

## 7. Prisma and PostgreSQL

- Перед изменением изучи составную schema в `prisma/schema` и файлы
  `prisma/*.prisma`, существующие миграции и всех потребителей модели.
- Не применяй migrations, `db push`, reset, seed или destructive SQL без явного
  разрешения.
- Не используй production database для разработки и тестов.
- Для бизнес-инвариантов используй подходящие unique, foreign key, not-null и
  check constraints, когда они поддерживаются текущей моделью.
- Связанные изменения выполняй атомарно. Транзакция не заменяет защиту от
  конкурентных обновлений и проверку идемпотентности.
- Избегай N+1, неограниченных выборок и избыточного `include`; используй
  `select`, pagination и индексы по реальным запросам.
- Raw SQL допускается только с обоснованием и параметризацией.
- При изменении схемы планируй совместимый rollout и влияние на существующие
  данные; предпочитай expand → migrate/backfill → contract.

## 8. JSON Server and migration safety

- `backend/db/db.json` — рабочие данные локального mock backend, а
  `backend/db/db.example.json` — пример структуры.
- Не очищай и не перезаписывай `db.json` без необходимости и понимания, какие
  сценарии используют эти данные.
- При переносе ресурса в Express/Prisma сначала зафиксируй текущие URL, методы,
  DTO, ошибки и поведение сортировки/фильтрации.
- Переводи один ресурс или сценарий за раз и сохраняй совместимость клиента.
- Не оставляй два независимых writable source of truth для одного ресурса без
  явной стратегии синхронизации.
- Удаляй JSON Server path только после перевода всех потребителей и проверок.

## 9. Errors, logging and external calls

- Обрабатывай ожидаемые ошибки явно; не оставляй пустые `catch`.
- Централизуй преобразование доменных/инфраструктурных ошибок в HTTP-ответ, когда
  это соответствует текущей структуре.
- Логируй достаточный context без секретов и полного пользовательского payload.
- Для внешних запросов учитывай timeout, отмену и безопасные retries.
- Не повторяй автоматически неидемпотентную mutation.
- Не скрывай частичную запись: используй транзакцию или компенсирующее поведение
  согласно бизнес-инварианту.

## 10. Commands and verification

Команды запускай из корня репозитория:

- `pnpm backend` — custom Next.js/Socket.IO server на `3000`.
- `pnpm json-server` — JSON Server на `4001`.
- `pnpm db:start` / `pnpm db:stop` — PostgreSQL container.
- `pnpm validate:db` — проверка PostgreSQL connection.
- `pnpm db:logs` — диагностика контейнера.
- `pnpm db:studio` — Prisma Studio; не изменяй данные без разрешения.
- `pnpm check` — format, lint и TypeScript checks.
- `pnpm build` — production build Next.js frontend, который обслуживает custom
  server.

В репозитории пока нет отдельного полного backend integration suite. Поэтому не
подменяй API-проверку успешным typecheck/build. Для затронутого server flow:

1. Проверь happy path и форму DTO/event.
2. Проверь невалидный ввод.
3. Проверь 401/403 и доступ к чужому ресурсу, если применимо.
4. Проверь 404/409 и сбой зависимости.
5. Проверь итоговое состояние storage и отсутствие частичной записи.
6. Для Socket.IO проверь handshake, сохранение, broadcast и reconnect/duplicate
   scenario, если они затронуты.

Изменяющие проверки выполняй только в локальном или специально подготовленном
test environment. Для read-only диагностики БД ограничивай объём данных и не
выводи чувствительные поля.

## 11. Definition of done

Backend-задача завершена, когда:

- изменён фактически используемый runtime path;
- вход валидируется, а authentication/authorization проверены на сервере;
- API/event contract совместим либо изменение явно согласовано;
- storage operation атомарна и безопасна для ожидаемой конкурентности;
- выполнены релевантные static, API, database и integration checks;
- миграции и данные не изменялись без разрешения;
- в отчёте перечислены точные команды, результаты и непроверенные сценарии.
