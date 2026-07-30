import type { BoardColumn } from '@/entities/column';
import type { TaskFolder } from '@/entities/folder';
import type { EntityId } from '@/shared/lib/sameId';

export type BoardKanbanType = {
  column: BoardColumn;
  itemIds: EntityId[];
  tasksMap: Record<string, TaskFolder>;
};
