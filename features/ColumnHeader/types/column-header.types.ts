import type { BoardColumn } from '@/entities/board/model/types';

export type ColumnHeaderType = {
  column: BoardColumn;
  tasksLength: number;
};
