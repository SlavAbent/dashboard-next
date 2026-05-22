import type {
  BoardColumn,
  TasksFolder,
} from '@/entities/board/model/types/list-types';
import type { EntityId } from '@/shared/lib/same-id';

export type BoardKanbanType = {
  column: BoardColumn;
  itemIds: EntityId[];
  tasksMap: Record<string, TasksFolder>;
};
