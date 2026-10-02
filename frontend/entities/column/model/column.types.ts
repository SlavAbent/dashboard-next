import type { BoardFolder } from '@/entities/folder';

export type Column = {
  id: string;
  title: string;
  order: number;
  color: string;
};

export type BoardColumn = Column & {
  folders: BoardFolder[];
};
