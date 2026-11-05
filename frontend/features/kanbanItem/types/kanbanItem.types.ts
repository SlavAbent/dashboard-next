import type { EntityId } from '@lib/sameId';

import type { TaskFolder } from '@/entities/folder';

export type KanbanItemType = {
  id: EntityId;
  index: number;
  folder: TaskFolder;
};
