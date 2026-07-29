import type {
  BoardColumn,
  TaskFolder,
} from '@/entities/board/model/types/list.types';
import type { EntityId } from '@/shared/lib/sameId';
import { toIdString } from '@/shared/lib/sameId';

export const normalizeBoardData = (boardData: BoardColumn[]) => {
  const columns: Record<string, BoardColumn> = {};
  const tasksMap: Record<string, TaskFolder> = {};
  const items: Record<string, EntityId[]> = {};

  for (const col of boardData) {
    columns[col.id] = col;
    items[col.id] = [];

    for (const folder of col.folders) {
      const folderKey = toIdString(folder.id);
      tasksMap[folderKey] = folder;
      items[col.id].push(folder.id);
    }
  }

  return { columns, tasksMap, items };
};
