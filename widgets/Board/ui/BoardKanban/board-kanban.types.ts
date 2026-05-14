import type { BoardColumn, Task } from '@/entities/board/model/types';

export type BoardKanbanType = {
  column: BoardColumn;
  itemIds: number[];
  tasksMap: Record<number, Task>;
};
