import { Task } from '@/entities/task';

export const findTaskById = (tasks: Task[], taskId: string | null) => {
  if (taskId == null) return undefined;

  return tasks.find((task) => task.id === taskId);
};
