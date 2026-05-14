import {
  BoardColumn,
  Column,
  Task,
} from '@/entities/board/model/types/list-types';

export function groupTasks(tasks: Task[], columns: Column[]): BoardColumn[] {
  const columnsMap: Record<string, BoardColumn> = {};

  for (const column of columns) {
    columnsMap[column.id] = {
      id: column.id,
      title: column.title,
      order: column.order,
      color: column.color,
      tasks: [],
    };
  }

  for (const task of tasks) {
    if (!columnsMap[task.column]) {
      columnsMap[task.column] = {
        id: task.column,
        title: task.column,
        order: 999,
        color: '',
        tasks: [],
      };
    }

    columnsMap[task.column].tasks.push(task);
  }

  return Object.values(columnsMap).sort((a, b) => a.order - b.order);
}
