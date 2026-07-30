import type { BoardColumn } from '@/entities/column';

export type ColumnCreateType = {
  column: BoardColumn;
  isOpen: boolean;
};
