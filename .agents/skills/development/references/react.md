# React: компоненты, hooks, state и эффекты

## Компоненты

- Используй функциональные компоненты и семантическую разметку (за исключением классового компонента Error Boundary)
- Соблюдай Rules of Hooks.
- Делай компоненты ответственными за понятную область интерфейса.
- Разделяй компонент при появлении самостоятельной логики или переиспользования, но не дроби механически.

Плохо: один `Dashboard` выполняет HTTP-запросы, фильтрацию, авторизацию, открытие модалок и весь рендеринг.

Лучше:

```tsx
function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <TaskFilters />
      <TaskBoard />
    </DashboardLayout>
  );
}
```

## Custom Hooks

Выделяй повторно используемую stateful-логику; простое чистое вычисление оставляй функцией.

```tsx
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue(prev => !prev);
  return { value, toggle };
}
```

## State

- `useState`: локальное состояние.
- `useReducer`: сложные переходы.
- `Context`: передача значений или зависимостей через дерево; не замена любому store.
- `Zustand`: общий клиентский state, он уже принят в проекте.
- `TanStack Query`: серверные данные, кеш и мутации, если используется в проекте.

Не дублируй серверные данные в Zustand без объективной причины.

### Не храни вычисляемое состояние

Плохо:

```tsx
const [tasks, setTasks] = useState<Task[]>([]);
const [completed, setCompleted] = useState<Task[]>([]);
useEffect(() => {
  setCompleted(tasks.filter(task => task.completed));
}, [tasks]);
```

Лучше:

```tsx
const [tasks, setTasks] = useState<Task[]>([]);
const completed = tasks.filter(task => task.completed);
```

### Иммутабельность

Плохо:

```ts
tasks[0].completed = true;
setTasks(tasks);
```

Лучше:

```ts
setTasks(previous => previous.map(task =>
  task.id === taskId ? { ...task, completed: true } : task
));
```

## Effects

`useEffect` используй для синхронизации с *внешними* системами, не для простого вычисления производных данных. При подписках и таймерах всегда предусматривай очистку.

```tsx
useEffect(() => {
  const onResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);
```

Учитывай актуальные зависимости эффекта и stale closures.

## Производительность

- Не добавляй `useMemo` / `useCallback` / `memo()` ко всему подряд.
- Оптимизируй код после выявления причины лишней работы.
- Для крупных списков оцени виртуализацию.
- Предпочитай устойчивые ключи элементов, а не индекс при изменяющемся порядке.

## Доступность

- Используй `<button>` для действий, `<a>` для навигации.
- Давай полям label, учитывай keyboard navigation и состояния ошибок.
- В тестах ориентируйся на доступное пользователю поведение, а не на CSS-классы.
