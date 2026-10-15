import type { BoardTask } from '@/entities/task';

export type TaskFolder = {
  id: string;
  columnId: string;
  title: string;
  order: number;
};

export type CreateFolder = Omit<TaskFolder, 'id'>;
export type UpdateFolderPayload = {
  title?: string;
  columnId?: string;
  order?: number;
};

export type BoardFolder = TaskFolder & {
  tasks: BoardTask[];
};
