import type { TaskFolder } from '@/entities/folder';

import type { EntityId } from '../../../../lib/sameId';

export type KanbanItemType = {
  id: EntityId;
  index: number;
  folder: TaskFolder;
};
