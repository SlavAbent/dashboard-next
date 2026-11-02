# TypeScript: типобезопасность и границы данных

## Основные правила

- Используй `strict` и принятые в проекте compiler options.
- Предпочитай вывод типов, если явная аннотация ничего не улучшает.
- `any` допустим только при документированном внешнем ограничении; обычно используй `unknown`.
- Избегай `!`, `as`, `@ts-ignore` и широких утверждений типов без проверяемого основания.
- Используй `type` / `interface` последовательно с соглашениями проекта.
- Моделируй конечные состояния через union types.
- Используй Utility types по назначаению и там где это действительно нужно.

### Вместо `any`

Плохо:

```ts
function getUserName(user: any) {
  return user.name;
}
```

Хорошо:

```ts
type User = { id: string; name: string };

function getUserName(user: User): string {
  return user.name;
}
```

### `unknown` и сужение типа

```ts
function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Неизвестная ошибка';
}
```

### Nullable значения

Плохо:

```ts
const name = user!.profile!.name;
```

Хорошо, только если fallback соответствует бизнес-правилу:

```ts
const name = user?.profile?.name ?? 'Гость';
```

Если отсутствие профиля — ошибка, обрабатывай её явно, а не маскируй fallback.

### Union types и исчерпывающая обработка

```ts
type TaskStatus = 'planning' | 'upcoming' | 'completed';

type Task = { id: string; status: TaskStatus };
```

Для сложных состояний используй discriminated unions вместо набора независимых boolean-флагов.

### Generics

```ts
function getFirst<T>(items: readonly T[]): T | undefined {
  return items[0];
}
```

Generic должен сохранять полезную связь типов, а не усложнять подпись функции.

## API-границы и runtime-валидация

Типизация `response.json()` не валидирует реальные данные. Рассматривай сетевой ответ как `unknown`, проверяй схему существующим валидатором либо явной проверкой.

```ts
const response = await fetch('/api/users');
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const payload: unknown = await response.json();
// Далее: валидация payload перед использованием.
```

Не доверяй типам данных из URL, форм, localStorage и внешних сервисов.

## Контракты

- Разделяй DTO и внутренние модели, если их жизненный цикл или доступные поля различаются.
- Не раскрывай `passwordHash`, токены и приватные поля в публичном DTO.
- Не изменяй экспортируемые типы без анализа потребителей.
