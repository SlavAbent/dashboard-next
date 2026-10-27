# Unit-тесты: Jest и TypeScript

## Основные правила
- Используй существующую конфигурацию Jest, трансформеры и алиасы.
- Мокируй границу зависимости, а не все внутренние функции.
- После каждого теста восстанавливай моки и таймеры, если они менялись.
- Проверяй значения/эффекты, а не только факт вызова.
- Для Promise применяй `resolves`/`rejects` или `await` с проверкой.

## Пример: чистая функция
```ts
type Task = { id: string; completed: boolean };
const completedTasks = (tasks: Task[]) => tasks.filter(task => task.completed);

test('оставляет только завершённые задачи', () => {
  const tasks = [
    { id: '1', completed: false },
    { id: '2', completed: true },
  ];
  expect(completedTasks(tasks)).toEqual([{ id: '2', completed: true }]);
});
```

## Пример: асинхронная ошибка
```ts
test('возвращает ошибку при недоступном API', async () => {
  const api = { load: jest.fn().mockRejectedValue(new Error('offline')) };
  await expect(api.load()).rejects.toThrow('offline');
});
```
Тест выше демонстрирует механику `rejects`, но **не тестирует продукт**, поскольку проверяет только сам mock. В настоящем тесте вызывай тестируемую функцию, в которую внедрён `api`.

## Правильная граница мокирования
```ts
async function loadTitle(api: { getTitle(): Promise<string> }) {
  return (await api.getTitle()).trim();
}

test('удаляет пробелы из ответа API', async () => {
  const api = { getTitle: jest.fn().mockResolvedValue('  Hello  ') };
  await expect(loadTitle(api)).resolves.toBe('Hello');
  expect(api.getTitle).toHaveBeenCalledTimes(1);
});
```

## Таймеры и даты
Если код использует таймеры, применяй fake timers согласно версии Jest и после теста возвращай реальные таймеры. Не используй произвольные `sleep(1000)` для ожидания асинхронного поведения.

## Типичные ошибки
- Забытый `await expect(promise).rejects...`.
- Избыточные snapshot-тесты.
- Один гигантский тест на все ветки.
- Тестирование собственного mock вместо функции продукта.
