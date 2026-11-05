import type { TaskDto } from './task.types.ts';

export const toTaskDto = (task: {
  id: string;
  text: string;
  tags: string[];
  completed: boolean;
  taskFolderId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}): TaskDto => ({
  id: task.id,
  text: task.text,
  tags: task.tags,
  completed: task.completed,
  taskFolderId: task.taskFolderId,
  order: task.order,
  createdAt: task.createdAt.toISOString(),
  updatedAt: task.updatedAt.toISOString(),
});
