import type { TaskFolder } from '@/entities/folder';
import type { EntityId } from '@/shared/lib/sameId';

export type KanbanItemType = {
  id: EntityId;
  index: number;
  folder: TaskFolder;
};
