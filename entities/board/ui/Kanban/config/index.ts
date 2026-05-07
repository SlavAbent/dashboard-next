import { BoardColumn, Task } from '@/widgets/Board/types';
import { KanbanViewType } from '@/entities/board/ui/Kanban/KanbanView/types';

export const normalizeBoardData = (boardData: KanbanViewType['boardData']) => {
  const columns: Record<string, BoardColumn> = {};
  const tasksMap: Record<string, Task> = {};
  const items: Record<string, number[]> = {};
  const taskToColumn: Record<number, string> = {};

  for (const col of boardData) {
    columns[col.id] = col;
    items[col.id] = [];

    for (const task of col.tasks) {
      tasksMap[task.id] = task;
      items[col.id].push(task.id);
      taskToColumn[task.id] = col.id;
    }
  }

  return { columns, tasksMap, items, taskToColumn };
};
