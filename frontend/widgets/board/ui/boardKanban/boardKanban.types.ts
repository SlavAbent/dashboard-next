import type { BoardColumn } from '@/entities/column';
import type { TaskFolder } from '@/entities/folder';

export type BoardKanbanType = {
  column: BoardColumn;
  itemIds: string[];
  tasksMap: Record<string, TaskFolder>;
};
