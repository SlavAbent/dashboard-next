import { BoardColumn, Task } from '@/widgets/Board/types';

export type KanbanType = {
  column: BoardColumn;
  itemIds: number[];
  tasksMap: Record<number, Task>;
};
