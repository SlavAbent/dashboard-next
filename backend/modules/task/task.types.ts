import type { Priority } from '../../shared/schedule.ts';

export type TaskDto = {
  id: string;
  text: string;
  tags: string[];
  completed: boolean;
  taskFolderId: string;
  order: number;
  startDate: string | null;
  endDate: string | null;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  taskFolderId: string;
  text: string;
  tags: string[];
  completed: boolean;
  order: number;
  startDate: string | null;
  endDate: string | null;
  priority: Priority;
};

export type UpdateTaskInput = {
  text?: string;
  tags?: string[];
  completed?: boolean;
  taskFolderId?: string;
  startDate?: string | null;
  endDate?: string | null;
  priority?: Priority;
};

export type MoveTaskInput = {
  taskFolderId: string;
  order: number;
};
