import type { Task } from '@/entities/board/model/types';

export type KanbanItemType = {
  id: number;
  index: number;
  task: Task;
};
