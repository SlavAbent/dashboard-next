import type { BoardColumn } from '@/entities/column';
import type { TaskFolder } from '@/entities/folder';

export const normalizeBoardData = (boardData: BoardColumn[]) => {
  const columns: Record<string, BoardColumn> = {};
  const tasksMap: Record<string, TaskFolder> = {};
  const items: Record<string, string[]> = {};

  for (const col of boardData) {
    columns[col.id] = col;
    items[col.id] = [];

    for (const folder of col.folders) {
      tasksMap[folder.id] = folder;
      items[col.id].push(folder.id);
    }
  }

  return { columns, tasksMap, items };
};
