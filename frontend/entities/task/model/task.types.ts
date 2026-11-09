import type { Schedule } from '@/shared/model/schedule';

export type Task = Schedule & {
  id: string;
  text: string;
  tags: string[];
  completed: boolean;
  taskFolderId: string;
  order: number;
  createdAt: string;
  updatedAt?: string;
};

export type BoardTask = Task;
export type CreateTask = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
