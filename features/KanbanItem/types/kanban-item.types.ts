import type { TasksFolder } from '@/entities/board/model/types/list-types';
import type { EntityId } from '@/shared/lib/same-id';

export type KanbanItemType = {
  id: EntityId;
  index: number;
  folder: TasksFolder;
};
