import type { BoardTask } from '@/entities/task';
import type { Schedule } from '@/shared/model/schedule';

export type TaskFolder = Schedule & {
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
  startDate?: string | null;
  endDate?: string | null;
  priority?: TaskFolder['priority'];
};

export type BoardFolder = TaskFolder & {
  tasks: BoardTask[];
};
