import type { TaskFolder } from '@/entities/folder';

export type KanbanItemType = {
  id: string;
  index: number;
  folder: TaskFolder;
};
