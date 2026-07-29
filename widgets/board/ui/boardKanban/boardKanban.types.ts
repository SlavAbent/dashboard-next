import type {
  BoardColumn,
  TaskFolder,
} from '@/entities/board/model/types/list.types';
import type { EntityId } from '@/shared/lib/sameId';

export type BoardKanbanType = {
  column: BoardColumn;
  itemIds: EntityId[];
  tasksMap: Record<string, TaskFolder>;
};
