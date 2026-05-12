import { BoardColumn, Task } from '@/widgets/Board/types';
import { KanbanViewType } from '@/widgets/KanbanView/types';

export const normalizeBoardData = (boardData: KanbanViewType['boardData']) => {
  const columns: Record<string, BoardColumn> = {};
  const tasksMap: Record<string, Task> = {};
  const items: Record<string, number[]> = {};

  for (const col of boardData) {
    columns[col.id] = col;
    items[col.id] = [];

    for (const task of col.tasks) {
      tasksMap[task.id] = task;
      items[col.id].push(task.id);
    }
  }

  return { columns, tasksMap, items };
};
