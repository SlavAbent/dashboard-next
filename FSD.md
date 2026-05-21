# Feature-Sliced Design

## Слои (сверху вниз)

| Слой | Назначение |
|------|----------|
| `app` | Next.js routes, providers |
| `widgets` | Композиция страниц из features и entities |
| `features` | Пользовательские сценарии (действия, модалки) |
| `entities` | Бизнес-сущности (board, navigation, message) |
| `shared` | UI-kit, утилиты, конфиг, API instances |

**Правило импортов:** слой импортирует только из слоёв ниже.

## Домены

### `entities/board`
- `api/` — запросы к json-server (tasks, columns, tasksFolder)
- `model/` — zustand store, типы
- `lib/` — `groupTasksToFolders`, `normalizeBoardData`, счётчики

Публичный API: `@/entities/board` (index.ts)

### `entities/navigation`
Боковое меню приложения (не путать с `TasksFolder` на доске).

### `features/board-modal`
Модалки создания/редактирования папок и задач. Store: `useBoardModalStore`.

### `features/folder-task`
Список задач в папке (без прямой зависимости от board-modal — колбэки из widget).

### `features/folder-actions`
Меню действий над папкой (edit/delete).

## Запрещено

- `shared` → `entities` / `features` / `widgets`
- `entities` → `features` / `widgets`
- `features` → `widgets`
- Импорт между widgets (использовать `entities` для общих типов)

## Запуск

```bash
npm run json-server
npm run dev
```
