import type { BoardColumn, Task } from '@/entities/board/model/types';

export const normalizeBoardData = (boardData: BoardColumn[]) => {
  const columns: Record<string, BoardColumn> = {};
  const tasksMap: Record<number, Task> = {};
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
