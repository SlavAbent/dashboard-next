import type { BoardColumn } from '@/entities/board/model/types/list-types';

export type ColumnCreateType = {
  column: BoardColumn;
  isOpen: boolean;
};
