# Backend-архитектура: слои и зависимости

## Слои и ответственность
- **Route:** сопоставление URL/HTTP-метода и обработчика, middleware.
- **Controller:** извлечение/проверка HTTP-параметров, перевод результата сервиса в ответ.
- **Service / Use case:** бизнес-инварианты и orchestration.
- **Repository / Data access:** Prisma/SQL и детали хранения.

Структура может быть feature-oriented: `modules/tasks/{routes,controller,service,repository}`. Не смешивай доменную логику и HTTP, даже если папок меньше.

## Пример структуры
```text
src/
  modules/
    tasks/
      task.routes.ts
      task.controller.ts
      task.service.ts
      task.repository.ts
      task.schema.ts
  shared/
    errors/
    config/
```

## Пример контракта
```ts
type CreateTaskInput = { title: string; ownerId: string };

async function createTask(input: CreateTaskInput) {
  if (!input.title.trim()) throw new DomainError('EMPTY_TITLE');
  return taskRepository.create(input);
}
```
Внутри сервиса нет `req`, `res` или HTTP 400: перевод доменной ошибки в HTTP выполняется на границе приложения.

## Когда нужен repository
Хорош, если позволяет изолировать запросы, тестировать бизнес-логику или скрыть сложное хранилище. Для простого CRUD дополнительный интерфейс-посредник, который вызывает ровно один Prisma-метод, может быть неоправданным.

## Важные требования
- Явные зависимости; избегай циклов.
- DTO отделяются от persistence model, когда контракты расходятся.
- Централизуй обработку ошибок.
- Не прячь бизнес-инварианты в контроллерах.
- Обеспечь серверную авторизацию и проверку владельца сущности.
