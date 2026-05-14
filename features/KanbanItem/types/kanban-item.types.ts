import type { Task } from '@/entities/board/model/types/list-types';

export type KanbanItemType = {
  id: number;
  index: number;
  task: Task;
};
