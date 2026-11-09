import { toDateOnly } from '../../shared/schedule.ts';
import type { TaskDto } from './task.types.ts';

export const toTaskDto = (task: {
  id: string;
  text: string;
  tags: string[];
  completed: boolean;
  taskFolderId: string;
  order: number;
  startDate: Date | null;
  endDate: Date | null;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}): TaskDto => ({
  id: task.id,
  text: task.text,
  tags: task.tags,
  completed: task.completed,
  taskFolderId: task.taskFolderId,
  order: task.order,
  startDate: toDateOnly(task.startDate),
  endDate: toDateOnly(task.endDate),
  priority: task.priority.toLowerCase() as TaskDto['priority'],
  createdAt: task.createdAt.toISOString(),
  updatedAt: task.updatedAt.toISOString(),
});
