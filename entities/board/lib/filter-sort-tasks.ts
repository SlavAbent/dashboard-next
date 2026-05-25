import type { Task } from '@/entities/board/model/types/list-types';
import type {
  TaskFilterOption,
  TaskSortOption,
} from '@/entities/board/model/types/filters.types';

export function filterTasks(tasks: Task[], filter: TaskFilterOption): Task[] {
  switch (filter) {
    case 'open':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
}

export function sortTasks(tasks: Task[], sort: TaskSortOption): Task[] {
  if (sort === 'default') return tasks;

  return [...tasks].sort((a, b) => {
    const comparison = a.text.localeCompare(b.text, 'ru', {
      sensitivity: 'base',
    });

    return sort === 'asc' ? comparison : -comparison;
  });
}

export function applyTaskFiltersAndSort(
  tasks: Task[],
  filter: TaskFilterOption,
  sort: TaskSortOption
): Task[] {
  return sortTasks(filterTasks(tasks, filter), sort);
}
