import type { EntityId } from '@lib/sameId';

import type { BoardColumn } from '@/entities/column';
import type { TaskFolder } from '@/entities/folder';

export type BoardKanbanType = {
  column: BoardColumn;
  itemIds: EntityId[];
  tasksMap: Record<string, TaskFolder>;
};
